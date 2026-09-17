# 🔌 External Integrations & MCP Guide (AG Kit)

> **Zero-Friction Philosophy**: This template is designed to work **100% out of the box with ZERO required external tools or MCPs**. All third-party tools and MCP servers are strictly optional.

---

## 📊 Status & Requirement Matrix

| Tool / MCP | Type | Mandatory? | Primary Purpose | Agent Default Fallback (When Not Installed) |
| :--- | :--- | :--- | :--- | :--- |
| **Node.js** (>= 18) | Runtime | 🟡 **Recommended** | Runs template CLI (`npx @trongtin1/agent-template`), IDE safety hooks | If copying only `.agents/`, Agent reads rules normally without runtime |
| **Python 3** (>= 3.10) | Runtime | 🟡 **Recommended** | Runs internal scripts in `.agents/scripts/` (`code_outline.py`, `worklog.py`, `validate_kit.py`) | Agent uses native IDE `grep_search` / `grep` and bounded `view_file` |
| **Context7 MCP** (`@upstash/context7-mcp`) | MCP Server | ⚪ **OPTIONAL (Zero Requirement)** | Fetches live official documentation for modern libraries (Next.js 15, Tailwind v4, etc.) | Agent automatically falls back to `search_web`, `read_url_content`, or pre-trained knowledge |
| **CodeGraph** (`codegraph_explore`) | MCP Server / CLI | ⚪ **OPTIONAL (Zero Requirement)** | Analyzes semantic symbol call graphs for very large codebases | Agent automatically skips if `.codegraph/` is absent, using `code_outline.py` + `grep_search` |
| **Playwright** | Python Library | ⚪ **OPTIONAL (Zero Requirement)** | Executes automated headless Chromium tests & captures UI screenshots | Agent verifies with unit tests, dev preview commands, or manual user review |

---

## 🛠️ Installation & Configuration Details

### 1. Context7 MCP (Live Library Documentation)
- **Is it mandatory?**: ❌ **No.** Agents operate 100% normally without Context7.
- **When to use it?**: When working with fast-evolving frameworks or recent releases (e.g., Next.js 15 App Router, Tailwind CSS v4) where you want the Agent to pull authoritative, up-to-date documentation to prevent obsolete syntax or hallucinations.
- **How to install & configure**:
  1. Register a free account at [Upstash Context7](https://context7.com/) to obtain an `API Key`.
  2. Open `.agents/mcp_config.json` and replace `YOUR_API_KEY` with your actual key:
     ```json
     {
       "mcpServers": {
         "context7": {
           "command": "npx",
           "args": [
             "-y",
             "@upstash/context7-mcp",
             "--api-key",
             "ctx7_live_xxxxxxxxxxxx"
           ]
         }
       }
     }
     ```
  3. Apply the configuration to your Antigravity / Gemini IDE environment:
     ```bash
     node .agents/hooks/sync-mcp.mjs --apply
     ```
  4. Restart the IDE or chat session to activate the tool.

---

### 2. CodeGraph (Semantic Graph for Large Codebases)
- **Is it mandatory?**: ❌ **No.** By global rule, the Agent only accesses CodeGraph if the repository already contains an active `.codegraph/` directory. If absent, the Agent never prompts or requires installation.
- **When to use it?**: For large repositories (> 100,000 lines of code, deep inheritance hierarchies, dynamic dispatch) where text grep alone struggles to track call chains.
- **How to install (Optional)**:
  1. Install the `codegraph` binary following instructions from `colbymchenry/codegraph`.
  2. In the repository root, run the indexer:
     ```bash
     codegraph index .
     ```
  3. The `.codegraph/` directory is created. The Agent will then prioritize `codegraph_explore` or `codegraph explore` before falling back to grep.

---

### 3. Playwright Runner (E2E Web UI Testing)
- **Is it mandatory?**: ❌ **No.**
- **When to use it?**: When running `/verify` or when you want the Agent to automatically launch headless Chromium, check browser console errors, and capture verification screenshots without consuming subagent API quota.
- **How to install (Optional)**:
  ```bash
  pip install playwright
  playwright install chromium
  ```
- **How to run**:
  ```bash
  python .agents/skills/webapp-testing/scripts/playwright_runner.py http://localhost:3000 --screenshot
  ```

---

### 4. Built-in Core Utilities (Zero External Installation)
The template comes pre-packaged with self-contained Python utilities that work immediately across any environment:
- **`code_outline.py`** (`.agents/scripts/code_outline.py`):
  - Uses Python's built-in `ast` and `re` standard library modules.
  - **Zero pip dependencies required**.
  - Extracts classes, function signatures, docstrings, and line bounds (`[L...-L...]`) to enforce the Surgical Token Diet.
- **`worklog.py`** (`.agents/scripts/worklog.py`):
  - Automatically records and synchronizes daily session worklogs into `docs/worklog/YYYY-MM-DD.md`.
  - Pure standard library Python with zero external dependencies.

---

## 🤖 Agent Behavior Protocol

1. **Never Block on Missing Tools**:
   - If an optional MCP or external tool is absent from the host machine, the Agent **MUST NEVER HALT**, throw blocking errors, or demand that the user install it.
   - The Agent must automatically degrade gracefully to the corresponding fallback mechanism (`grep_search`, `code_outline.py`, `search_web`, or standard linters/compilers).
2. **Provide Installation Guidance Only When Asked**:
   - When the user explicitly requests MCP installation or capability extensions, the Agent references this guide (`docs/MCP_GUIDE.md`) to provide exact configuration steps.
3. **API Key Safety Guard**:
   - `.agents/mcp_config.json` contains a safe placeholder `"YOUR_API_KEY"`. The `sync-mcp.mjs` script automatically blocks `--apply` if unresolved placeholders are detected, preventing empty or corrupt configs from overriding user environments.
