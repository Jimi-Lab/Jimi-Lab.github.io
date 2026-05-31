---
title: Anthropic Agent Skills
date: 2026-01-12
categories: [AI]
tags:
  - Anthropic
  - Agent
  - Agent Skills
  - 渐进式信息披露
  - Anthropic
---




# Anthropic Agent Skills：Agent 能力扩展的开放标准与产业实践

---

**关键词**：Agent, Agent Skills, 渐进式信息披露, Anthropic

---

## 目录

1. [引言与背景](#1-引言与背景)
2. [核心设计理念](#2-核心设计理念)
3. [技术架构与实现](#3-技术架构与实现)
4. [SKILL.md 规范详解](#4-skillmd-规范详解)
5. [2025 年产业采纳与生态发展](#5-2025-年产业采纳与生态发展)
6. [企业级部署实践](#6-企业级部署实践)
7. [安全领域应用与研究](#7-安全领域应用与研究)
8. [开放标准战略分析](#8-开放标准战略分析)
9. [局限性与挑战](#9-局限性与挑战)
10. [未来研究方向](#10-未来研究方向)
11. [结论](#11-结论)

---

## 1. 引言与背景

### 1.1 问题的提出

随着大型语言模型（LLM）能力的指数级提升，我们已经能够构建与完整计算环境交互的通用 AI Agent。Claude Code、GitHub Copilot、OpenAI Codex 等工具展示了 Agent 在代码生成、系统操作、复杂任务执行方面的潜力。然而，这些通用 Agent 面临一个核心挑战：

**如何让 Agent 获得特定领域的专业知识和组织上下文，同时保持可组合性、可扩展性和跨平台可移植性？**

传统方法存在以下根本性局限：

| 传统方法 | 核心问题 | 后果 |
|---------|---------|------|
| **专用 Agent 构建** | 为每个用例开发独立 Agent | 知识孤岛、维护成本高 |
| **System Prompt 膨胀** | 将所有知识塞入系统提示词 | 上下文窗口耗尽、token 成本高 |
| **硬编码工作流** | 将流程固化在代码中 | 缺乏灵活性、难以迁移 |
| **文档外挂** | 提供大量参考文档 | Agent 难以有效定位和利用 |

### 1.2 Agent Skills 的提出

Anthropic 于 **2024 年 10 月**首次推出 Agent Skills，并在 **2024 年 12 月 18 日**将其作为开放标准发布（agentskills.io）。该技术代表了一种**范式转变**：

```
传统范式：多个专用 Agent，各自为政
         ↓
新型范式：通用 Agent + 模块化专业知识库
```

**核心洞察**：将专业知识、工作流程和组织上下文打包成**可发现、可动态加载、跨平台可移植**的资源包，Agent 根据任务需要按需加载。

### 1.3 时间线与里程碑

| 时间 | 事件 | 意义 |
|------|------|------|
| 2024年10月16日 | Agent Skills 发布 | 首次引入技能概念 |
| 2024年12月18日 | 开放标准发布 | agentskills.io 上线 |
| 2024年12月18日 | GitHub Copilot 采纳 | 微软在 VS Code 中集成 |
| 2024年12月20日 | OpenAI Codex 支持 | OpenAI 正式文档化支持 |
| 2025年全年 | 生态爆发式增长 | 25,000+ 社区技能，多平台支持 |

---

## 2. 核心设计理念

### 2.1 渐进式信息披露（Progressive Disclosure）

这是 Agent Skills 最关键的设计原则，也是其能够实现"近乎无界上下文扩展"的理论基础。

#### 类比：技术手册的组织结构

```
┌─────────────────────────────────────────┐
│   技术手册目录（元数据）               │  ← 始终可见
│   • 第1章：系统架构                    │     (~20 tokens/skill)
│   • 第2章：API 参考                    │
│   • 第3章：故障排除                    │
├─────────────────────────────────────────┤
│   选定章节内容（指令）                 │  ← 需要时加载
│   2.1 REST API 设计规范                │     (~5k tokens)
│   2.2 认证机制                         │
│   2.3 错误处理                         │
├─────────────────────────────────────────┤
│   详细附录（资源）                     │  ← 按需引用
│   附录 A：示例代码                     │     (动态 tokens)
│   附录 B：配置模板                     │
│   附录 C：测试数据集                   │
└─────────────────────────────────────────┘
```

#### 三层加载机制

**Layer 1: 元数据层（Metadata）**
- **何时加载**：Agent 启动时始终加载
- **包含内容**：技能名称、简短描述（< 1024 字符）
- **Token 消耗**：约 10-20 tokens/技能
- **作用**：帮助 Agent 快速判断是否需要该技能

**Layer 2: 指令层（Instructions）**
- **何时加载**：Agent 决定使用该技能时
- **包含内容**：SKILL.md 的主体内容（Markdown）
- **Token 消耗**：建议 < 5000 tokens，可更多
- **作用**：提供详细的任务执行指导

**Layer 3: 资源层（Resources）**

- **何时加载**：Agent 执行过程中按需
- **包含内容**：脚本、模板、参考文档、数据文件
- **Token 消耗**：完全动态，仅加载实际使用的部分
- **作用**：支持复杂操作和确定性执行

#### 数学模型

设有 $N$ 个技能，每个技能的元数据为 $m_i$，指令为 $c_i$，资源集合为 $R_i$。

传统方法的上下文消耗：
$$C_{\text{traditional}} = \sum_{i=1}^{N} (m_i + c_i + |R_i|)$$

Agent Skills 的实际消耗（假设仅激活 $k$ 个技能，访问 $r$ 个资源）：
$$C_{\text{skills}} = \sum_{i=1}^{N} m_i + \sum_{j=1}^{k} c_j + \sum_{l=1}^{r} |R_l|$$

其中 $k \ll N$，$r \ll \sum |R_i|$，因此 $C_{\text{skills}} \ll C_{\text{traditional}}$。

**关键优势**：技能可包含的上下文量实际上是**无界的**（unbounded），因为大部分内容在不需要时不占用上下文窗口。

### 2.2 工具 vs 技能：本质区别

| 维度 | 传统工具（Tools/Functions） | Agent Skills |
|------|----------------------------|--------------|
| **执行模式** | 调用后立即执行，返回结果 | 加载知识到上下文，准备 Agent 执行 |
| **作用对象** | 外部系统或数据源 | Agent 的认知和工作流程 |
| **上下文影响** | 不修改 Agent 行为模式 | 临时扩展 Agent 的专业能力 |
| **类比** | 使用外部计算器 | 学习数学知识 |
| **示例** | `search_web(query)` | 加载"如何进行学术文献综述"的指导 |

**关键洞察**：技能不是让 Agent "调用某个功能"，而是让 Agent "学会如何做某件事"。

### 2.3 设计哲学：Simple but Powerful

Anthropic 在设计 Agent Skills 时遵循的核心原则：

1. **文件系统优先**：基于标准文件系统，无需新协议
2. **Markdown 为王**：人类可读，机器可解析
3. **渐进式加载**：避免上下文窗口拥堵
4. **可组合性**：技能可以相互组合和引用
5. **跨平台移植**：一次编写，到处运行

---

## 3. 技术架构与实现

### 3.1 系统架构概览

```
┌───────────────────────────────────────────────────────────────┐
│                     Agent 启动阶段（T0）                       │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ System Prompt + 所有技能元数据                        │    │
│  │ • pdf-processing: "Extract, fill PDFs..." (15 tokens)│    │
│  │ • code-review: "Review code security..." (18 tokens) │    │
│  │ • data-viz: "Create charts and graphs..." (16 tokens)│    │
│  │ ... (共 100 个技能)                                   │    │
│  │ 总消耗：~2,000 tokens                                 │    │
│  └──────────────────────────────────────────────────────┘    │
│                            ↓                                   │
│                    用户消息："Review this code for SQL injection"
└───────────────────────────────────────────────────────────────┘
                             ↓
┌───────────────────────────────────────────────────────────────┐
│                    技能发现阶段（T1）                         │
│  Agent 扫描可用技能的描述：                                    │
│  • pdf-processing: ❌ 不匹配（PDF相关）                       │
│  • code-review: ✅ 匹配（包含"security"关键词）               │
│  • data-viz: ❌ 不匹配（可视化相关）                          │
│                                                                │
│  决策：激活 code-review 技能                                  │
└───────────────────────────────────────────────────────────────┘
                             ↓
┌───────────────────────────────────────────────────────────────┐
│                    技能激活阶段（T2）                         │
│  Agent 使用 bash_read_file 工具：                             │
│  > read_file(".claude/skills/code-review/SKILL.md")          │
│                                                                │
│  加载内容示例：                                                │
│  ```markdown                                                   │
│  # Code Security Review                                       │
│  ## Process                                                    │
│  1. Check for SQL injection: look for string concatenation... │
│  2. Verify input validation: ensure all user inputs...        │
│  3. Review authentication: check session management...        │
│  ```                                                           │
│  新增消耗：~3,500 tokens                                       │
└───────────────────────────────────────────────────────────────┘
                             ↓
┌───────────────────────────────────────────────────────────────┐
│                   资源按需加载（T3，可选）                    │
│  Agent 读取 SKILL.md 后发现：                                 │
│  "For SQL injection patterns, see references/sqli-patterns.md"│
│                                                                │
│  Agent 决定需要额外信息：                                      │
│  > read_file("code-review/references/sqli-patterns.md")      │
│  新增消耗：~1,500 tokens                                       │
└───────────────────────────────────────────────────────────────┘
                             ↓
┌───────────────────────────────────────────────────────────────┐
│                      任务执行（T4）                           │
│  Agent 基于加载的知识执行代码审查                             │
│  总上下文消耗：~7,000 tokens                                  │
│  （相比将所有技能内容预加载节省了 >90% 的 tokens）           │
└───────────────────────────────────────────────────────────────┘
```

### 3.2 Prompt 注入机制详解

Agent Skills 的核心实现是**基于提示的元工具架构**（Prompt-based Meta-tool Architecture）：

```python
# 简化的实现概念（伪代码）
class SkillManager:
    def __init__(self, skills_directory):
        self.skills = {}
        self.load_metadata_only(skills_directory)
    
    def load_metadata_only(self, directory):
        """启动时仅加载元数据，轻量级"""
        for skill_folder in os.listdir(directory):
            yaml_frontmatter = extract_yaml(f"{skill_folder}/SKILL.md")
            self.skills[yaml_frontmatter['name']] = {
                'name': yaml_frontmatter['name'],
                'description': yaml_frontmatter['description'],
                'path': skill_folder,
                'loaded': False  # 指令内容尚未加载
            }
    
    def activate_skill(self, skill_name):
        """动态激活技能 = 将指令注入为新的用户消息"""
        skill = self.skills[skill_name]
        
        # 1. 读取完整的 SKILL.md 文件
        full_content = read_file(f"{skill['path']}/SKILL.md")
        metadata, instructions = parse_skill_md(full_content)
        
        # 2. 关键步骤：将指令作为"用户消息"注入对话
        #    （而非修改系统提示词，保持系统提示不变）
        skill_message = {
            "role": "user",  # 注意：角色是 user，不是 system
            "content": f"""
[SKILL ACTIVATED: {skill_name}]
Base Directory: {skill['path']}

{instructions}

[END SKILL INSTRUCTIONS]

Now, continue with the original task using this guidance.
"""
        }
        
        # 3. 修改执行上下文（如果指定）
        if 'model' in metadata:
            switch_model(metadata['model'])
        if 'allowed-tools' in metadata:
            restrict_tools(metadata['allowed-tools'])
        
        # 4. 将技能激活消息插入对话历史
        conversation.insert_before_last_user_message(skill_message)
        
        # 5. Agent 现在"知道"如何执行任务
        skill['loaded'] = True
        return continue_generation()
```

**关键点**：
- 技能内容以**用户消息**的形式注入，而非系统提示
- 这允许在不重启 Agent 的情况下动态加载多个技能
- Agent 将技能指令视为"来自用户的额外上下文"

### 3.3 上下文窗口动态管理

**案例研究**：假设有 100 个可用技能

```
启动时 (T0):
┌─────────────────────────────────────────┐
│ Context Window: 200,000 tokens         │
├─────────────────────────────────────────┤
│ System Prompt: 500 tokens              │
│ 100 Skills Metadata: 2,000 tokens      │  ← 每个 ~20 tokens
│ Available: 197,500 tokens              │
└─────────────────────────────────────────┘

激活 pdf-processing 技能后 (T1):
┌─────────────────────────────────────────┐
│ Context Window: 200,000 tokens         │
├─────────────────────────────────────────┤
│ System Prompt: 500 tokens              │
│ 100 Skills Metadata: 2,000 tokens      │
│ pdf-processing/SKILL.md: 4,000 tokens  │  ← 新增
│ User Message: 300 tokens               │
│ Available: 193,200 tokens              │
└─────────────────────────────────────────┘

按需加载资源 (T2):
┌─────────────────────────────────────────┐
│ Context Window: 200,000 tokens         │
├─────────────────────────────────────────┤
│ System Prompt: 500 tokens              │
│ 100 Skills Metadata: 2,000 tokens      │
│ pdf-processing/SKILL.md: 4,000 tokens  │
│ references/form-filling.md: 2,500 tokens│  ← 新增
│ User Message: 300 tokens               │
│ Agent Response (so far): 1,000 tokens  │
│ Available: 189,700 tokens              │
└─────────────────────────────────────────┘
```

**效率对比**：
- 传统方法（预加载所有内容）：~450,000 tokens（超出窗口！）
- Agent Skills：~10,300 tokens（仅 2.3% 的消耗）

### 3.4 执行环境能力矩阵

| 环境 | 文件系统访问 | 代码执行 | 包安装 | 网络访问 | 适用场景 |
|------|-------------|----------|--------|----------|----------|
| **claude.ai** | ✅ 临时沙箱 | ✅ Python/JS/Bash | ✅ pip/npm | ⚠️ 可配置 | 个人使用、快速原型 |
| **Claude Code** | ✅ 完整本地 | ✅ 全语言 | ✅ 全局（需谨慎） | ✅ 完全开放 | 开发工作流、企业集成 |
| **Claude API** | ❌ 无 | ✅ 预装环境 | ❌ 无 | ❌ 无 | 生产服务、受控环境 |
| **GitHub Copilot** | ✅ VS Code 工作区 | ✅ 通过终端 | ✅ 通过终端 | ✅ | IDE 集成开发 |
| **OpenAI Codex** | ✅ 项目目录 | ✅ 多语言 | ✅ | ✅ | CLI 编码助手 |

---

## 4. SKILL.md 规范详解

### 4.1 完整文件结构

```markdown
---
# ============ 必需字段 ============
name: vulnerability-scanner
description: Scan code for security vulnerabilities using OWASP Top 10 as baseline. Identifies SQL injection, XSS, CSRF, and auth issues. Use when analyzing application code or conducting security reviews.

# ============ 可选字段 ============
license: MIT
metadata:
  author: security-team@company.com
  version: "2.1.0"
  category: security
  tags: [security, OWASP, vulnerability, code-review]
  
  # 强制使用特定模型（可选）
  model: claude-opus-4-20250514
  
  # 限制可用工具（可选，用于安全隔离）
  allowed-tools:
    - bash_read_file
    - bash_list_directory
    # 注意：不包含 bash_execute，防止执行任意代码
  
  # 自定义元数据（产品特定）
  requires:
    - python: ">=3.8"
    - packages: [bandit, semgrep]
  estimated_runtime: "5-10 minutes"
  complexity: medium
---

# Vulnerability Scanner Skill

## 📋 概述

本技能使用 OWASP Top 10 作为基准扫描代码中的安全漏洞。支持多种编程语言，集成主流静态分析工具，提供详细的漏洞报告和修复建议。

## 🎯 使用场景

**触发条件**：
- 用户提到"安全审查"、"漏洞扫描"、"代码审计"
- 需要检查特定的漏洞类型（SQL注入、XSS等）
- Pull Request 合并前的自动化检查

**不适用于**：
- 动态应用测试（需要运行时环境）
- 渗透测试（需要实际攻击向量）
- 合规性审计（需要特定框架）

## 🔍 扫描流程

### 第一步：环境准备
1. 确认项目根目录
2. 识别编程语言和框架
3. 检查依赖文件（requirements.txt, package.json等）

### 第二步：静态分析
运行以下工具组合：
- **Python**: Bandit + Semgrep
- **JavaScript**: ESLint security插件
- **Java**: SpotBugs + Find Security Bugs
- **通用**: CodeQL queries

​```bash
# Python 扫描示例
python scripts/scan_python.py --target ./src --output scan_results.json
```

### 第三步：结果整理
解析工具输出，按照以下格式组织：
```json
{
  "summary": {
    "total_findings": 42,
    "critical": 2,
    "high": 8,
    "medium": 15,
    "low": 17
  },
  "findings": [...]
}
```

### 第四步：生成报告
使用模板 `templates/report.md` 生成人类可读的报告。

## 📊 输出格式

### 控制台输出
```
🔍 Security Scan Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Critical: 2 issues found
  High:     8 issues found
  Medium:   15 issues found
  Low:      17 issues found

📝 Detailed report saved to: security_report.md
```

### Markdown 报告
参考 `references/report-template.md` 了解完整格式。

## 🚨 漏洞类别

### A01: SQL Injection
**检测模式**：
- 字符串拼接构建SQL查询
- 缺少参数化查询
- ORM使用不当

**示例（Python）**：
```python
# ❌ 不安全
query = f"SELECT * FROM users WHERE id = {user_id}"

# ✅ 安全
query = "SELECT * FROM users WHERE id = ?"
cursor.execute(query, (user_id,))
```

### A02: 认证失效
检查项：
- [ ] 密码强度策略
- [ ] 会话管理
- [ ] 多因素认证
- [ ] 密码存储（bcrypt/argon2）

[... 其他 OWASP Top 10 类别 ...]

## 🔧 高级配置

### 自定义规则
在 `config/custom-rules.yaml` 中添加：
```yaml
custom_patterns:
  - id: CUSTOM001
    pattern: |
      eval($_POST['code'])
    severity: CRITICAL
    message: "Remote code execution via eval()"
```

### 忽略规则
创建 `.vulnerability-ignore` 文件：
```
# 格式：<文件路径>:<规则ID>:<原因>
src/legacy/old_api.py:B201:已计划重构
```

## 📚 参考资源

- `references/owasp-top10.md` - OWASP Top 10 详细说明
- `references/cwe-catalog.md` - CWE 漏洞分类
- `scripts/scan_*.py` - 各语言扫描脚本
- `templates/report.md` - 报告模板
- `config/tool-configs/` - 工具配置文件

## ⚙️ 故障排除

### 问题：工具未安装
```bash
# 自动安装依赖
python scripts/install_tools.py
```

### 问题：扫描超时
增加 `config/settings.yaml` 中的超时设置：
```yaml
timeouts:
  per_file: 30  # 秒
  total: 600    # 秒
```

## 📈 性能优化

- 使用 `--parallel` 标志启用多核扫描
- 排除 `node_modules/`、`vendor/` 等目录
- 缓存扫描结果（`--cache` 标志）

## 🔒 安全注意事项

⚠️ **重要**：
- 本技能仅进行静态分析，不执行代码
- 扫描结果可能包含误报，需人工审查
- 切勿在生产环境运行未验证的扫描脚本

---

**版本历史**：
- v2.1.0 (2025-12): 添加 JavaScript 支持
- v2.0.0 (2025-06): 重构为技能格式
- v1.0.0 (2024-10): 初始版本
```

### 4.2 YAML Frontmatter 字段规范

#### 必需字段

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `name` | string | • 最大 64 字符<br>• 仅 `[a-z0-9-]`<br>• 不能以 `-` 开头或结尾 | 技能的唯一标识符，用于代码引用 |
| `description` | string | • 最大 1024 字符<br>• 非空<br>• 应包含关键词 | **最关键字段**：Agent 判断是否激活技能的依据 |

#### 可选但推荐的字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `license` | string | 许可证 | `MIT`, `Apache-2.0`, `./LICENSE` |
| `metadata.author` | string | 作者 | `security-team@company.com` |
| `metadata.version` | string | 语义化版本 | `2.1.0` |
| `metadata.category` | string | 分类 | `security`, `data-science`, `creative` |
| `metadata.tags` | array | 标签 | `["security", "OWASP", "python"]` |

#### 高级字段（执行控制）

| 字段 | 类型 | 说明 | 用途 |
|------|------|------|------|
| `metadata.model` | string | 强制使用特定模型 | 需要高推理能力的技能可指定 Opus |
| `metadata.allowed-tools` | array | 限制可用工具列表 | 安全隔离，防止技能滥用工具 |
| `metadata.requires` | object | 依赖声明 | 环境检查、包要求 |

### 4.3 Description 编写最佳实践

**核心原则**：Description 是技能被发现的唯一机会。

#### ❌ 差的 Description 示例

​```yaml
description: Helps with security stuff
```
**问题**：
- 过于宽泛，Agent 无法判断何时适用
- 缺少关键词，难以匹配用户意图
- 没有明确的使用场景

#### ✅ 优秀的 Description 示例

```yaml
description: Scan Python, JavaScript, and Java code for OWASP Top 10 vulnerabilities including SQL injection, XSS, CSRF, insecure authentication, and sensitive data exposure. Integrates Bandit, ESLint security,
```