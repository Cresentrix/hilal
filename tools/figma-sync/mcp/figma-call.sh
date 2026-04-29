#!/usr/bin/env bash
# Thin wrapper around the Figma Dev Mode MCP server (http://127.0.0.1:3845/mcp).
# Usage:
#   figma-call.sh <tool_name> '<json_args>'
# Example:
#   figma-call.sh get_metadata '{"nodeId":"15:5"}'
set -euo pipefail

TOOL="${1:?tool name required}"
ARGS="${2:-}"
if [[ -z "$ARGS" ]]; then ARGS='{}'; fi
ENDPOINT="http://127.0.0.1:3845/mcp"

# 1. initialize and capture the session id from response headers
INIT_HEADERS=$(mktemp)
curl -s -D "$INIT_HEADERS" -o /dev/null -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  --max-time 10 \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"cdsbridge","version":"1"}}}'

SESSION=$(awk 'BEGIN{IGNORECASE=1} /^mcp-session-id:/ {gsub(/\r/,"",$2); print $2}' "$INIT_HEADERS")
rm -f "$INIT_HEADERS"

if [[ -z "$SESSION" ]]; then
  echo "ERROR: no mcp-session-id returned" >&2
  exit 1
fi

# 2. send initialized notification
curl -s -o /dev/null -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "mcp-session-id: $SESSION" \
  --max-time 10 \
  -d '{"jsonrpc":"2.0","method":"notifications/initialized"}'

# 3. call the tool, strip the SSE "event:" / "data:" framing, return JSON
PAYLOAD=$(jq -nc --arg name "$TOOL" --argjson args "$ARGS" \
  '{jsonrpc:"2.0",id:2,method:"tools/call",params:{name:$name,arguments:$args}}')

curl -s -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "mcp-session-id: $SESSION" \
  --max-time 60 \
  -d "$PAYLOAD" \
  | awk '/^data: /{sub(/^data: /,""); print}'
