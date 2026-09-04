---
name: code-review-graph
description: High-performance semantic code intelligence using colbymchenry/codegraph (Rust-powered). Provides surgical context for AI via MCP.
when_to_use: "ALWAYS use this for codebase analysis. The user requires AUTOMATIC graph usage on every command."
allowed-tools: Read, Grep, Glob, Bash, Agent
version: 2.0.0
---

# CodeGraph (Rust Kernel Edition)

> This project uses `colbymchenry/codegraph` for structural code analysis via MCP.

## 🔴 AUTOMATIC EXECUTION MANDATE (USER PREFERENCE)

The user has explicitly requested: **"Với mỗi lệnh tôi yêu cầu agents thì nó có tự động graph cho tôi" (For every command, automatically graph for me).**
Therefore, you MUST automatically ensure the graph is ready and utilize it for every architectural or coding task:

1. **Check Initialization:** Run `Test-Path .codegraph` (Windows PowerShell) in the project root.
2. **Auto-Install & Init if missing:** 
   - If `codegraph` CLI is not installed, install it quietly: `irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex`
   - Wire it to the agent: `codegraph install`
   - Initialize the project: `codegraph init`
3. **Query the Graph:** Once initialized, the MCP server is active. Rely on the `codegraph_explore` MCP tool to fetch surgical context instead of using `grep` or reading files blindly.

## Key Features
- **Native Rust Kernel**: Lightning fast, supports 20+ languages.
- **Auto-Sync**: Watches files natively and stays fresh without manual syncs.
- **Surgical Context**: Gives the exact code and relationships in one call.

## Commands Reference
- Connect to Agent: `codegraph install`
- Initialize Project: `codegraph init`
- Web UI Viewer: `codegraph ui`
- Upgrade: `codegraph upgrade`

## Workflow for Agents
- Do not ask for permission to initialize or use the graph. Do it automatically.
- Let CodeGraph find the call paths, dependencies, and blast radius.
- Trust the graph index. If a file was just edited, the native watcher updates the index in under 1 second.
