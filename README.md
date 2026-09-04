# Agent Template (AG Kit)

Starter repository pre-configured with **AG Kit** — an autonomous multi-agent and skills framework for **Google Antigravity IDE** and **Gemini CLI**.

---

## 📁 Repository Structure

```text
agent-template/
├── .agents/
│   ├── agent/             # Specialized Agent Personas (20 agents)
│   │   ├── orchestrator.md
│   │   ├── frontend-specialist.md
│   │   ├── backend-specialist.md
│   │   ├── devops-engineer.md
│   │   ├── project-planner.md
│   │   └── ...
│   ├── skills/            # On-demand domain skills
│   │   ├── clean-code/
│   │   ├── app-builder/
│   │   ├── frontend-design/
│   │   ├── api-patterns/
│   │   └── ...
│   ├── workflows/         # Guided workflows & slash commands
│   │   ├── create.md (/create)
│   │   ├── plan.md (/plan)
│   │   ├── orchestrate.md (/orchestrate)
│   │   ├── debug.md (/debug)
│   │   └── ...
│   ├── rules/             # Workspace rules & core protocols
│   ├── memory/            # Persistent cross-session memory index
│   └── manifest.json      # AG Kit component manifest
├── .gitignore
└── README.md
```

---

## 🚀 How to Use This Template

### Option 1: Use as a New Project Base
1. Clone or copy this repository:
   ```bash
   git clone <your-repo-url> my-new-project
   cd my-new-project
   ```
2. Initialize your project code inside this folder. The `.agents` directory will automatically be recognized by Antigravity IDE.

### Option 2: Add AG Kit to an Existing Project
Copy the `.agents/` folder directly to the root of your existing project:
```powershell
Copy-Item -Path .\path\to\agent-template\.agents -Destination .\path\to\your-project\.agents -Recurse
```

---

## 🤖 Highlights
- **20 Specialized Agents**: Frontend, Backend, DevOps, Security, Database, QA, Architecture, and more.
- **Dynamic Skill Loading**: Modular skills loaded on-demand to save context tokens.
- **Guided Workflows**: Fast execution with slash commands such as /plan, /create, /orchestrate, /debug, /enhance.
- **Cross-Session Memory**: Retain architectural decisions and coding preferences across sessions.
