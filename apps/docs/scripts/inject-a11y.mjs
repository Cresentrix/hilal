#!/usr/bin/env node
/**
 * Inject an <Accessibility ... /> block into each component doc page,
 * right before the closing </> of the page's default-exported function.
 *
 * Why we match the *first* `</>\n  );\n}` instead of the last:
 *   Some pages (modal, drawer) have helper functions after the default
 *   export. The default export is always declared first, so its closing
 *   sequence is also the first occurrence in the file.
 *
 * Summary strings use HTML entities (&lt; &gt; &quot;) instead of {"..."}
 * JSX literals so attribute-value quotes don't conflict with JSX string
 * delimiters.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'app', 'docs', 'components');

const A11Y = {
  accordion: {
    summary: 'Built on the native &lt;details&gt; element. Each item announces its expanded state and works without JavaScript.',
    keys: [
      { keys: 'Enter / Space', action: 'Toggle the focused item' },
      { keys: 'Tab', action: 'Move between accordion items' },
    ],
  },
  alert: {
    summary: 'Renders with <code>role=&quot;status&quot;</code> for info/success and <code>role=&quot;alert&quot;</code> for danger so screen readers announce immediately.',
    notes: ['The dismiss button is keyboard-focusable and labelled by <code>dismissLabel</code>.'],
  },
  avatar: {
    summary: 'When <code>src</code> is set, pass <code>alt</code> for screen readers. Pure-decorative avatars (initials with no name to convey) should pass <code>alt=&quot;&quot;</code>.',
  },
  badge: {
    summary: 'Decorative by default. For icon-only counts (e.g. notification dots), wrap in an element with an <code>aria-label</code>.',
  },
  bottomnav: {
    summary: 'Renders as <code>&lt;nav aria-label=&quot;Bottom navigation&quot;&gt;</code>. Active items expose <code>aria-current=&quot;page&quot;</code>.',
    keys: [
      { keys: 'Tab', action: 'Move between nav items' },
      { keys: 'Enter', action: 'Activate the focused link' },
    ],
  },
  button: {
    summary: 'Native <code>&lt;button&gt;</code> — full keyboard, screen reader, and form-submit semantics.',
    keys: [
      { keys: 'Space / Enter', action: 'Activate the button' },
    ],
    notes: ['Icon-only buttons must provide an <code>aria-label</code>. Loading buttons set <code>aria-busy</code> while the spinner is visible.'],
  },
  calendar: {
    summary: 'Uses <code>role=&quot;grid&quot;</code> with <code>role=&quot;gridcell&quot;</code> for each day. Disabled days set <code>aria-disabled</code>; the selected day sets <code>aria-selected</code>.',
    keys: [
      { keys: '← / →', action: 'Previous / next day' },
      { keys: '↑ / ↓', action: 'Previous / next week' },
      { keys: 'PgUp / PgDn', action: 'Previous / next month' },
      { keys: 'Home / End', action: 'Start / end of current row' },
      { keys: 'Enter', action: 'Select the focused day' },
    ],
  },
  card: {
    summary: 'Non-interactive by default. Pass <code>interactive</code> and the card surfaces hover + focus styles; in that mode you should wrap it in an <code>&lt;a&gt;</code> or attach <code>onClick</code> + <code>role=&quot;button&quot;</code>.',
  },
  checkbox: {
    summary: 'Native <code>&lt;input type=&quot;checkbox&quot;&gt;</code> wrapped with a label. <code>indeterminate</code> is mapped to the DOM property (not an attribute, per spec).',
    keys: [{ keys: 'Space', action: 'Toggle the checkbox' }],
  },
  combobox: {
    summary: 'Uses <code>role=&quot;combobox&quot;</code> on the input with <code>aria-expanded</code>, <code>aria-controls</code>, and <code>aria-activedescendant</code>. Listbox uses <code>role=&quot;listbox&quot;</code>; options use <code>role=&quot;option&quot;</code> + <code>aria-selected</code>.',
    keys: [
      { keys: '↑ / ↓', action: 'Move through options' },
      { keys: 'Enter', action: 'Commit the focused option' },
      { keys: 'Esc', action: 'Close the listbox' },
      { keys: 'Home / End', action: 'Jump to first / last option' },
    ],
  },
  datepicker: {
    summary: 'Native <code>&lt;input type=&quot;date&quot;&gt;</code> (and friends). Inherits the browser-native picker, keyboard, and validation behavior.',
  },
  drawer: {
    summary: 'Built on the native <code>&lt;dialog&gt;</code> element with <code>showModal()</code> — focus is trapped inside while open, and the rest of the page is inert.',
    keys: [
      { keys: 'Esc', action: 'Close the drawer' },
      { keys: 'Tab / Shift+Tab', action: 'Cycle focus within the drawer' },
    ],
    notes: ['Backdrop click closes by default; pass <code>closeOnBackdrop={false}</code> to require an explicit dismiss.'],
  },
  empty: {
    summary: 'Decorative wrapper; the heading inside uses an <code>h3</code> so it sits below any page-level <code>h1/h2</code>.',
  },
  input: {
    summary: 'Label is associated with the input via <code>htmlFor</code>/<code>id</code>. Hint/error/success messages are linked through <code>aria-describedby</code>; <code>error</code> additionally sets <code>aria-invalid</code>.',
  },
  modal: {
    summary: 'Built on the native <code>&lt;dialog&gt;</code> element with <code>showModal()</code> — focus is trapped inside while open, and the rest of the page is inert.',
    keys: [
      { keys: 'Esc', action: 'Close the modal' },
      { keys: 'Tab / Shift+Tab', action: 'Cycle focus within the modal' },
    ],
    notes: ['Pair <code>ModalTitle</code> with the dialog so the modal is announced by name. <code>ModalClose</code> defaults to <code>aria-label=&quot;Close&quot;</code>.'],
  },
  pagination: {
    summary: 'Rendered as <code>&lt;nav aria-label=&quot;Pagination&quot;&gt;</code>. The current page button carries <code>aria-current=&quot;page&quot;</code>; ellipsis is announced as such.',
    keys: [
      { keys: 'Tab', action: 'Move between page buttons' },
      { keys: 'Enter / Space', action: 'Go to the focused page' },
    ],
  },
  select: {
    summary: 'Native <code>&lt;select&gt;</code>. Inherits the platform-native dropdown, keyboard, and screen-reader behavior.',
  },
  sidebar: {
    summary: 'Renders as <code>&lt;aside&gt;</code>. Sidebar items render as links; the active item carries <code>aria-current=&quot;page&quot;</code>.',
    keys: [
      { keys: 'Tab', action: 'Move through items' },
      { keys: 'Enter', action: 'Activate the focused link' },
    ],
  },
  skeleton: {
    summary: 'Rendered with <code>aria-hidden=&quot;true&quot;</code> — assistive tech announces the real content once it loads, not the placeholder.',
  },
  stepper: {
    summary: 'Rendered as an <code>&lt;ol&gt;</code> with each step in <code>&lt;li&gt;</code>. The current step carries <code>aria-current=&quot;step&quot;</code>.',
  },
  tabs: {
    summary: 'Implements the WAI-ARIA tabs pattern. Tab list uses <code>role=&quot;tablist&quot;</code>; each tab uses <code>role=&quot;tab&quot;</code> with <code>aria-controls</code>; panels use <code>role=&quot;tabpanel&quot;</code>.',
    keys: [
      { keys: '← / →', action: 'Move between tabs (horizontal)' },
      { keys: '↑ / ↓', action: 'Move between tabs (vertical)' },
      { keys: 'Home / End', action: 'Jump to first / last tab' },
      { keys: 'Enter / Space', action: 'Activate the focused tab' },
    ],
  },
  toast: {
    summary: 'Toast region uses <code>role=&quot;region&quot;</code> with <code>aria-label=&quot;Notifications&quot;</code>. Each toast uses <code>role=&quot;status&quot;</code> (assertive for <code>danger</code>) so screen readers announce new toasts as they arrive.',
    keys: [
      { keys: 'Tab', action: 'Focus the dismiss button on a visible toast' },
      { keys: 'Enter / Space', action: 'Dismiss the focused toast' },
    ],
  },
  toggle: {
    summary: 'Rendered with <code>role=&quot;switch&quot;</code> and <code>aria-checked</code> so screen readers announce on/off rather than checked/unchecked.',
    keys: [{ keys: 'Space', action: 'Toggle the switch' }],
  },
  tooltip: {
    summary: 'Tooltip body uses <code>role=&quot;tooltip&quot;</code> and is referenced by the trigger&rsquo;s <code>aria-describedby</code>. Appears on hover and on focus; closes on blur and Esc.',
    keys: [{ keys: 'Esc', action: 'Dismiss while keyboard-focused' }],
  },
};

// Decode HTML entities back to characters and emit JSX-safe summary.
// In JSX, '<' and '>' in plain text need to be entities OR inside braces;
// '&quot;' renders as '"' just fine.
// We keep entities as-is — JSX/React handle them in text content correctly.
function buildBlock(slug) {
  const data = A11Y[slug];
  if (!data) return null;

  // The `summary` is rendered into a JSX fragment as raw HTML-like text.
  // To avoid JSX parsing errors, we render entities via dangerouslySetInnerHTML?
  // No — entities in JSX text are interpreted automatically. The risk is the
  // <code>...</code> tags themselves are JSX elements; we need to handle them
  // by wrapping the summary in a `dangerouslySetInnerHTML` span, OR by parsing
  // out the <code> wrappers as actual JSX. The simplest fix: split the string
  // on <code>/</code> and render each segment as either text or a <code> node.

  const summaryJsx = stringToJsx(data.summary);
  const keysProp = data.keys
    ? `\n        keys={${JSON.stringify(data.keys, null, 8).replace(/\n/g, '\n        ')}}`
    : '';
  const notesProp = data.notes
    ? `\n        notes={[${data.notes.map((n) => `<>${stringToJsx(n)}</>`).join(', ')}]}`
    : '';
  return `      <Accessibility
        summary={<>${summaryJsx}</>}${keysProp}${notesProp}
      />
`;
}

/**
 * Convert a string containing <code>...</code> wrappers + HTML entities into
 * a JSX-safe expression. Entities outside <code> are left as-is (React renders
 * them as text). Inside <code>, we emit a real <code>{'...'}</code> JSX node
 * with the inner content de-entity-encoded so it shows up literally.
 */
function stringToJsx(input) {
  const parts = input.split(/(<code>[\s\S]*?<\/code>)/g);
  return parts.map((part) => {
    const m = part.match(/^<code>([\s\S]*?)<\/code>$/);
    if (!m) return part;
    const inner = decodeEntities(m[1]);
    // Use a JSX expression with a JS string literal so any characters work.
    return `<code>{${JSON.stringify(inner)}}</code>`;
  }).join('');
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

function inject(filePath, slug) {
  const src = fs.readFileSync(filePath, 'utf8');
  if (src.includes("from '../../../_components/Accessibility'")) {
    return 'skipped (already injected)';
  }
  const block = buildBlock(slug);
  if (!block) return `skipped (no a11y content for "${slug}")`;

  // Add import after FrameworkTabs.
  let next = src.replace(
    /(import\s*\{\s*FrameworkTabs\s*\}\s*from\s*'[^']+';)/,
    `$1\nimport { Accessibility } from '../../../_components/Accessibility';`,
  );

  // Find the FIRST occurrence of "</>\n  );\n}" — that's the page's main
  // exported function's close (helpers come after and have the same shape).
  const re = /(\s+<\/>\s*\n\s*\);\s*\n\}\s*\n?)/;
  const match = next.match(re);
  if (!match) return 'skipped (could not find outer close)';
  const idx = next.indexOf(match[0]);
  next = next.slice(0, idx) + `\n${block}    </>\n  );\n}\n` + next.slice(idx + match[0].length);

  fs.writeFileSync(filePath, next, 'utf8');
  return 'injected';
}

const entries = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of entries) {
  const file = path.join(ROOT, slug, 'page.tsx');
  if (!fs.existsSync(file)) continue;
  const result = inject(file, slug);
  console.log(`${slug.padEnd(12)} ${result}`);
}
