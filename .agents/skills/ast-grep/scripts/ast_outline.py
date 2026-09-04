#!/usr/bin/env python3
"""
ast_outline.py — Structural Code Outline Extractor (Token-Efficient Outline).

Extracts classes, interfaces, function signatures, decorators, and line ranges
from source code files without requiring reading full file bodies. Saves up to 90% tokens.
"""

import os
import sys
import ast
import re
from pathlib import Path

# Safe utf-8 output on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


def outline_python(file_path: Path, content: str) -> list[str]:
    lines = []
    try:
        tree = ast.parse(content, filename=str(file_path))
    except Exception as e:
        return [f"[Syntax Error parsing Python AST: {e}]"]

    # Module docstring
    doc = ast.get_docstring(tree)
    if doc:
        first_line = doc.strip().split("\n")[0]
        lines.append(f"📄 Doc: {first_line}")

    for node in tree.body:
        if isinstance(node, ast.ClassDef):
            bases = [ast.unparse(b) for b in node.bases] if hasattr(ast, "unparse") else []
            base_str = f"({', '.join(bases)})" if bases else ""
            lines.append(f"\n🏷️ class {node.name}{base_str} [L{node.lineno}-L{node.end_lineno or node.lineno}]:")
            for item in node.body:
                if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    prefix = "async def" if isinstance(item, ast.AsyncFunctionDef) else "def"
                    args = [a.arg for a in item.args.args]
                    lines.append(f"   ⚙️ {prefix} {item.name}({', '.join(args)}) [L{item.lineno}-L{item.end_lineno or item.lineno}]")
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            prefix = "async def" if isinstance(node, ast.AsyncFunctionDef) else "def"
            args = [a.arg for a in node.args.args]
            lines.append(f"⚙️ {prefix} {node.name}({', '.join(args)}) [L{node.lineno}-L{node.end_lineno or node.lineno}]")

    return lines


def outline_js_ts(content: str) -> list[str]:
    lines = []
    raw_lines = content.splitlines()

    # Pattern for TS/JS: interfaces, types, classes, functions, exports
    patterns = [
        (r"^(export\s+)?(interface|type)\s+([A-Za-z0-9_]+)", "🔷"),
        (r"^(export\s+)?(default\s+)?class\s+([A-Za-z0-9_]+)", "🏷️"),
        (r"^(export\s+)?(async\s+)?function\s+([A-Za-z0-9_]+)\s*(\([^\)]*\))", "⚙️"),
        (r"^(export\s+)?(const|let)\s+([A-Za-z0-9_]+)\s*=\s*(async\s*)?\([^\)]*\)\s*=>", "⚡"),
    ]

    for idx, line in enumerate(raw_lines, 1):
        stripped = line.strip()
        if not stripped or stripped.startswith("//") or stripped.startswith("/*"):
            continue
        for pat, icon in patterns:
            m = re.search(pat, stripped)
            if m:
                # Clean snippet
                snippet = stripped.split("{")[0].strip()
                if len(snippet) > 80:
                    snippet = snippet[:77] + "..."
                lines.append(f"{icon} [L{idx}] {snippet}")
                break

    return lines


def generate_outline(target_file: str) -> str:
    path = Path(target_file)
    if not path.is_file():
        return f"Error: File '{target_file}' not found."

    try:
        content = path.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        return f"Error reading file: {e}"

    ext = path.suffix.lower()
    total_lines = len(content.splitlines())
    header = f"=== Structural Outline: {path.name} ({total_lines} lines) ==="

    if ext == ".py":
        items = outline_python(path, content)
    elif ext in [".ts", ".tsx", ".js", ".jsx", ".mjs"]:
        items = outline_js_ts(content)
    else:
        # Fallback generic outline
        items = []
        for idx, line in enumerate(content.splitlines(), 1):
            if re.match(r"^\s*(fn|func|def|class|struct|interface|pub\s+fn)\s+", line):
                items.append(f"⚙️ [L{idx}] {line.strip()[:80]}")

    if not items:
        return f"{header}\n(No top-level symbols detected)"

    body = "\n".join(items)
    return f"{header}\n{body}\n========================================"


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ast_outline.py <file-path>")
        sys.exit(1)

    result = generate_outline(sys.argv[1])
    print(result)
