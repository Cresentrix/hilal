#!/usr/bin/env python3
"""Parse the Figma node dump and extract a design-system audit."""
import json, re, sys, os
from collections import Counter, defaultdict

DUMP = '.figma-api/raw/nodes-pages.json'
OUT_DIR = '.figma-api/report'
os.makedirs(OUT_DIR, exist_ok=True)

with open(DUMP) as f:
    data = json.load(f)

PAGES = {pid: p['document'] for pid, p in data['nodes'].items()}

def walk(node, depth=0):
    yield depth, node
    for c in node.get('children', []) or []:
        yield from walk(c, depth + 1)

# ---------- Foundations: extract token values from the actual displayed text ----------
foundations = PAGES['0:1']
foundations_nodes = list(walk(foundations))

# Collect every TEXT node with its visible characters
text_nodes = [(n, d) for d, n in foundations_nodes if n.get('type') == 'TEXT']
texts = [n.get('characters', '') for n, _ in text_nodes if n.get('characters')]

# Hex colors in the foundations page
hex_pat = re.compile(r'#[0-9A-Fa-f]{3,8}\b')
hexes = []
for c in texts:
    hexes.extend(hex_pat.findall(c))
hex_counter = Counter(hexes)

# Token names with slashes (radius/base/100, color/blue/500, etc.)
slash_token_pat = re.compile(r'\b[a-z][a-z0-9]*(?:/[a-z0-9._-]+)+', re.I)
slash_tokens = []
for c in texts:
    slash_tokens.extend(slash_token_pat.findall(c))
slash_counter = Counter(slash_tokens)

# Specifically look for token-like text that names base or semantic tokens
def classify_token(name):
    parts = name.split('/')
    cat = parts[0].lower() if parts else ''
    return cat

token_groups = defaultdict(set)
for tok in slash_counter:
    cat = classify_token(tok)
    token_groups[cat].add(tok)

# ---------- Component inventory ----------
def collect_components(page):
    """Find every COMPONENT and COMPONENT_SET node."""
    components = []
    sets = []
    for d, n in walk(page):
        if n.get('type') == 'COMPONENT_SET':
            sets.append(n)
        elif n.get('type') == 'COMPONENT':
            components.append(n)
    return components, sets

web_comps, web_sets = collect_components(PAGES['15:2'])
mob_comps, mob_sets = collect_components(PAGES['15:4'])
pattern_comps, pattern_sets = collect_components(PAGES['15:3'])
template_comps, template_sets = collect_components(PAGES['15:6'])

def summarize_component_set(cs):
    """Pull variant info from a COMPONENT_SET."""
    name = cs.get('name', '')
    children = cs.get('children', []) or []
    # variant children are COMPONENT nodes whose name encodes variants like "State=Hover, Size=Md"
    variants = []
    for c in children:
        if c.get('type') == 'COMPONENT':
            variants.append(c.get('name', ''))
    # parse variant property keys
    props = defaultdict(set)
    for vname in variants:
        for kv in vname.split(','):
            kv = kv.strip()
            if '=' in kv:
                k, v = kv.split('=', 1)
                props[k.strip()].add(v.strip())
    return {
        'id': cs.get('id'),
        'name': name,
        'variant_count': len(variants),
        'props': {k: sorted(v) for k, v in props.items()},
    }

# ---------- Output report ----------
report = {
    'file': data['name'],
    'lastModified': data['lastModified'],
    'pages': {pid: {'name': p['name'], 'children': len(p.get('children', []) or [])} for pid, p in PAGES.items()},
    'foundations': {
        'unique_hex_colors': len(set(hexes)),
        'top_hex_colors': hex_counter.most_common(20),
        'unique_slash_tokens': len(slash_counter),
        'token_categories': {k: len(v) for k, v in token_groups.items()},
    },
    'components': {
        'web': {
            'individual_components': len(web_comps),
            'component_sets': len(web_sets),
            'sets_detail': [summarize_component_set(cs) for cs in web_sets],
        },
        'mobile': {
            'individual_components': len(mob_comps),
            'component_sets': len(mob_sets),
            'sets_detail': [summarize_component_set(cs) for cs in mob_sets],
        },
        'patterns': {
            'individual_components': len(pattern_comps),
            'component_sets': len(pattern_sets),
        },
        'templates': {
            'individual_components': len(template_comps),
            'component_sets': len(template_sets),
        },
    },
    'all_token_names': sorted(slash_counter.keys()),
    'all_hex_colors_sorted': sorted(set(hexes)),
}

with open(f'{OUT_DIR}/audit.json', 'w') as f:
    json.dump(report, f, indent=2)

# ---------- Human-readable summary ----------
print(f"\n{'='*70}\nDESIGN SYSTEM AUDIT — {data['name']}\n{'='*70}")
print(f"Last modified: {data['lastModified']}\n")
print(f"--- Pages ---")
for pid, p in PAGES.items():
    print(f"  {pid:8s} {p['name']:28s} {len(p.get('children',[]) or [])} children")

print(f"\n--- Foundations / Tokens ---")
print(f"  unique hex colors visible: {len(set(hexes))}")
print(f"  unique slash-style token names: {len(slash_counter)}")
print(f"  token categories:")
for cat, items in sorted(token_groups.items(), key=lambda x: -len(x[1])):
    print(f"    {cat:30s} {len(items)} tokens")

print(f"\n--- Web Components ({len(web_sets)} sets, {len(web_comps)} singletons) ---")
for cs in sorted([summarize_component_set(c) for c in web_sets], key=lambda x: x['name']):
    props_str = ', '.join(f"{k}({len(v)})" for k, v in cs['props'].items())
    print(f"  [{cs['variant_count']:3d}v]  {cs['name']:50s}  props: {props_str}")
if web_comps:
    print(f"  ---singleton components (no variants)---")
    for c in web_comps[:30]:
        if c.get('parent') is None or True:  # we lose parent info; just list names
            print(f"  [  -]  {c.get('name')}")

print(f"\n--- Mobile Components ({len(mob_sets)} sets, {len(mob_comps)} singletons) ---")
for cs in sorted([summarize_component_set(c) for c in mob_sets], key=lambda x: x['name']):
    props_str = ', '.join(f"{k}({len(v)})" for k, v in cs['props'].items())
    print(f"  [{cs['variant_count']:3d}v]  {cs['name']:50s}  props: {props_str}")

print(f"\n--- Patterns: {len(pattern_sets)} sets, {len(pattern_comps)} singletons ---")
print(f"--- Templates: {len(template_sets)} sets, {len(template_comps)} singletons ---")

print(f"\nReport written to {OUT_DIR}/audit.json")
