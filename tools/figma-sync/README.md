# @hilal/figma-sync

Internal tool. Pulls token values from the Hilal Figma file and (eventually) writes them to `packages/tokens/src/`.

## Setup

```bash
cp .env.example .env
# fill in FIGMA_TOKEN and FIGMA_FILE_KEY
```

## Run

```bash
pnpm sync:figma
```

## Status

- [x] List pages, dump file content via REST API
- [x] Audit script (Python) — see `api/parse.py`
- [ ] Map Figma node names → DTCG token paths
- [ ] Auto-write to `packages/tokens/src/`

## Why not the Variables API?

The Variables REST API (`/v1/files/:key/variables/local`) is restricted to Enterprise plans. We derive values from rendered node fills and effects instead — same result for codegen.

## Why not the Dev Mode MCP?

The Dev Mode MCP server has a low daily rate limit and is meant for interactive use, not bulk sync. The REST API is more reliable for batch operations.
