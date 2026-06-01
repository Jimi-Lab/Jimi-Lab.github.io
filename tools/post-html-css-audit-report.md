# Post HTML/CSS Audit Report

Generated: 2026-06-01T03:29:40.361Z

## Summary

- totalMarkdown: 85
- filesWithRawHtmlOrComments: 60
- filesWithInlineStyle: 2
- filesWithFixedColor: 2
- filesWithFontStyle: 2
- filesWithMeaningfulHtml: 6
- filesWithDangerousTags: 0
- filesWithComments: 56
- totalRawTags: 118
- totalInlineStyleLines: 5

## Priority Labels

- P0-DANGEROUS: script/style/iframe/object/embed/link/meta tags outside code fences. Review first.
- P1-INLINE-CSS-RISK: inline style, fixed colors, or font style tags.
- P2-MANUAL-REVIEW: raw table/img/br/a/u/div/span/font/center tags. Do not delete blindly.
- P3-COMMENTS-ONLY: HTML comments only. Usually invisible on the page.

## Per Article Inventory

| Severity | Article | Raw tags | Inline style lines | Fixed color lines | Preserve-check lines | Comments | Main tags |
|---|---:|---:|---:|---:|---:|---:|---|
| OK | source/_posts/2025/05/某道逆向/某道逆向.md | 18 | 0 | 0 | 0 | 0 | h4:10, h3:8 |
| OK | source/_posts/2025/06/vulnhub-w1r3s/vulnhub-w1r3s.md | 48 | 0 | 0 | 0 | 0 | h4:28, h1:10, h3:8, h2:2 |
| OK | source/_posts/2025/12/Compiler/Compiler.md | 2 | 0 | 0 | 0 | 0 | opt-name:2 |
| P1-INLINE-CSS-RISK | source/_posts/2024/07/控制台打出XSS/控制台打出XSS.md | 18 | 3 | 1 | 0 | 10 | font:18 |
| P1-INLINE-CSS-RISK | source/_posts/2024/07/各种类型上传文件打出XSS/各种类型上传文件打出XSS.md | 6 | 2 | 2 | 0 | 8 | font:4, test:2 |
| P2-MANUAL-REVIEW | source/_posts/2023/04/搭建个人博客/搭建个人博客.md | 1 | 0 | 0 | 1 | 0 | img:1 |
| P2-MANUAL-REVIEW | source/_posts/2024/06/Nacost通过文件打出getshell/Nacost通过文件打出getshell.md | 2 | 0 | 0 | 1 | 7 | u:2 |
| P2-MANUAL-REVIEW | source/_posts/2024/06/Webpack利用/Webpack利用.md | 10 | 0 | 0 | 1 | 9 | u:10 |
| P2-MANUAL-REVIEW | source/_posts/2025/12/钱志云：如何在计算机研究中寻找灵感/钱志云：如何在计算机研究中寻找灵感.md | 10 | 0 | 0 | 5 | 1 | u:10 |
| P3-COMMENTS-ONLY | source/_posts/2023/05/Git完整教程（图+link）/Git完整教程（图+link）.md | 0 | 0 | 0 | 0 | 1 |  |
| P3-COMMENTS-ONLY | source/_posts/2023/09/CWE checker/CWE checker.md | 0 | 0 | 0 | 0 | 1 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/05/CVE-2024-4820/CVE-2024-4820.md | 0 | 0 | 0 | 0 | 4 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/api接口导致各种漏洞（sql盲注、报错注入等）/api接口导致各种漏洞（sql盲注、报错注入等）.md | 0 | 0 | 0 | 0 | 8 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/CNVD通杀 SQL注入/CNVD通杀 SQL注入.md | 0 | 0 | 0 | 0 | 4 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/CNVD通杀垂直越权/CNVD通杀垂直越权.md | 0 | 0 | 0 | 0 | 5 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/CSV注入/CSV注入.md | 0 | 0 | 0 | 0 | 8 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/Druid monitor页面渗透/Druid monitor页面渗透.md | 0 | 0 | 0 | 0 | 4 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/fuzz到sql注入/fuzz到sql注入.md | 0 | 0 | 0 | 0 | 11 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/springboot/springboot.md | 0 | 0 | 0 | 0 | 6 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/06/Swagger/Swagger.md | 0 | 0 | 0 | 0 | 14 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/爆破hash密码/爆破hash密码.md | 0 | 0 | 0 | 0 | 9 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/构造URL参数尝试未授权/构造URL参数尝试未授权.md | 0 | 0 | 0 | 0 | 6 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/逻辑漏洞之垂直越权水平越权未授权/逻辑漏洞之垂直越权水平越权未授权.md | 0 | 0 | 0 | 0 | 7 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/若依/若依.md | 0 | 0 | 0 | 0 | 5 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/水平越权/水平越权.md | 0 | 0 | 0 | 0 | 3 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/针对后台功能点进行挖掘/针对后台功能点进行挖掘.md | 0 | 0 | 0 | 0 | 14 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/07/自动化批量注入/自动化批量注入.md | 0 | 0 | 0 | 0 | 3 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/09/BinAbsInspector(ghidra插件，检测二进制漏洞)/BinAbsInspector(ghidra插件，检测二进制漏洞).md | 0 | 0 | 0 | 0 | 6 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/09/CE修改反恐精英/CE修改反恐精英.md | 0 | 0 | 0 | 0 | 8 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/09/haruspex+semgrep/haruspex+semgrep.md | 0 | 0 | 0 | 0 | 42 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/09/SonarQube/SonarQube.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/09/Triton(动态二进制分析库)/Triton(动态二进制分析库).md | 0 | 0 | 0 | 0 | 1 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/11/beam 分析+erlang反汇编/beam 分析+erlang反汇编.md | 0 | 0 | 0 | 0 | 12 |  |
| P3-COMMENTS-ONLY | source/_posts/2024/11/beam 分析+erlang反汇编+BeamAnalyzer/beam 分析+erlang反汇编+BeamAnalyzer.md | 0 | 0 | 0 | 0 | 12 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/11/谷歌：AI for sec/谷歌：AI for sec.md | 0 | 0 | 0 | 0 | 1 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/11/微软：Analyzing open-source bootloaders _ Finding vulnerability faster with AI/微软：Analyzing open-source bootloaders _ Finding vulnerability faster with AI.md | 0 | 0 | 0 | 0 | 4 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/11/Agent发展趋势/Agent发展趋势.md | 0 | 0 | 0 | 0 | 11 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/11/LLM+MCP+RAG/LLM+MCP+RAG.md | 0 | 0 | 0 | 0 | 13 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/11/scan-x（Sec Agent）/scan-x（Sec Agent）.md | 0 | 0 | 0 | 0 | 9 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/11/VulnBot（web漏挖智能体）/VulnBot（web漏挖智能体）.md | 0 | 0 | 0 | 0 | 3 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/12/diff整个linux文件系统定位漏洞代码/diff整个linux文件系统定位漏洞代码.md | 0 | 0 | 0 | 0 | 9 |  |
| P3-COMMENTS-ONLY | source/_posts/2025/12/Rhabdomancer：ghidra脚本，用于漏洞研究/Rhabdomancer：ghidra脚本，用于漏洞研究.md | 0 | 0 | 0 | 0 | 4 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/01/AIXCC-ButterCup项目详解/AIXCC-ButterCup项目详解.md | 3 | 0 | 0 | 0 | 14 | task_dir:2, container:1 |
| P3-COMMENTS-ONLY | source/_posts/2026/01/AIxCC总览/AIxCC总览.md | 0 | 0 | 0 | 0 | 4 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/02/cve-FH1202-bufferoverflow/cve-FH1202-bufferoverflow.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/02/cve2-FH1202-bufferoverflow/cve2-FH1202-bufferoverflow.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/02/cve3-FH1202-bufferoverflow/cve3-FH1202-bufferoverflow.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/02/The-formexeCommand-function-in-Tenda's-i12-product/The-formexeCommand-function-in-Tenda's-i12-product.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/02/The-formWifiMacFilterGet-function-in-Tenda's-i12-product/The-formWifiMacFilterGet-function-in-Tenda's-i12-product.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/02/The-formwrlSSIDget-function-in-Tenda's-i12-product/The-formwrlSSIDget-function-in-Tenda's-i12-product.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/04/腾讯第二界agent漏挖/腾讯第二界agent漏挖.md | 0 | 0 | 0 | 0 | 12 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/ATT&CK to CVE_ A Large-Scale Automated Knowledge Graph for Threat Intelligence/ATT&CK to CVE_ A Large-Scale Automated Knowledge Graph for Threat Intelligence.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/Can LLM Prompting Serve as a Proxy for Static Analysis in Vulnerability Detection/Can LLM Prompting Serve as a Proxy for Static Analysis in Vulnerability Detection.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/Devign：Effective Vulnerability Identification by learning Comprehensive Program Semantics via Graph Neural Networks/Devign：Effective Vulnerability Identification by learning Comprehensive Program Semantics via Graph Neural Networks.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/KRYSTAL_ Knowledge graph-based framework for tactical attackdiscovery in audit data/KRYSTAL_ Knowledge graph-based framework for tactical attackdiscovery in audit data.md | 0 | 0 | 0 | 0 | 2 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/LLM-BASED MULTI-AGENT BLACKBOARD SYSTEM FOR INFORMATION DISCOVERY IN DATA SCIENCE/LLM-BASED MULTI-AGENT BLACKBOARD SYSTEM FOR INFORMATION DISCOVERY IN DATA SCIENCE.md | 0 | 0 | 0 | 0 | 1 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/memory in the llm era_ modular architectures and strategies in a unified framework [experiment,analysis & benchmark]/memory in the llm era_ modular architectures and strategies in a unified framework [experiment,analysis & benchmark].md | 0 | 0 | 0 | 0 | 6 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/REPOGRAPH：Enhancing AI software engineering with repository-level code graph/REPOGRAPH：Enhancing AI software engineering with repository-level code graph.md | 0 | 0 | 0 | 0 | 1 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/Repository-Level Graph Representation Learning for Enhanced Security Patch Detection/Repository-Level Graph Representation Learning for Enhanced Security Patch Detection.md | 0 | 0 | 0 | 0 | 3 |  |
| P3-COMMENTS-ONLY | source/_posts/2026/05/THINK-ON-GRAPH_ DEEP AND RESPONSIBLE REASON-ING OF LARGE LANGUAGE MODEL ON KNOWLEDGEGRAPH/THINK-ON-GRAPH_ DEEP AND RESPONSIBLE REASON-ING OF LARGE LANGUAGE MODEL ON KNOWLEDGEGRAPH.md | 0 | 0 | 0 | 0 | 2 |  |

## Detail By Article

### source/_posts/2025/05/某道逆向/某道逆向.md

- Title: 某道逆向（翻译软件）
- Severity: OK
- Tag summary: h4:10, h3:8
- Examples:
  - L16 <h3> <h3 id="Pawto">开始分析</h3>
  - L16 <h3> <h3 id="Pawto">开始分析</h3>
  - L27 <h3> <h3 id="LTkUz">逆sign</h3>
  - L27 <h3> <h3 id="LTkUz">逆sign</h3>
  - L28 <h4> <h4 id="QQ0to">1. 搜索 sign</h4>

### source/_posts/2025/06/vulnhub-w1r3s/vulnhub-w1r3s.md

- Title: vulnhub-w1r3s
- Severity: OK
- Tag summary: h4:28, h1:10, h3:8, h2:2
- Examples:
  - L25 <h1> <h1 id="Qj6sX">端口扫描</h1>
  - L25 <h1> <h1 id="Qj6sX">端口扫描</h1>
  - L82 <h3> <h3 id="cQiN1">端口分析</h3>
  - L82 <h3> <h3 id="cQiN1">端口分析</h3>
  - L93 <h4> <h4 id="Tobc4">nmap 漏洞扫描脚本</h4>

### source/_posts/2025/12/Compiler/Compiler.md

- Title: Compiler
- Severity: OK
- Tag summary: opt-name:2
- Examples:
  - L586 <opt-name> gcc 的优化模块可通过`-fno-<opt-name>`关闭（如`-fno-tree-ccp`关闭 ccp 优化）；
  - L588 <opt-name> 遍历所有可用的`-fno-<opt-name>` flags，找到 “关闭该优化后违规消失” 的 flag → 对应的优化模块就是 culprit 优化。

### source/_posts/2024/07/控制台打出XSS/控制台打出XSS.md

- Title: 控制台打出XSS
- Severity: P1-INLINE-CSS-RISK
- Tag summary: font:18
- Yuque <font style> lines: 9, 51, 91
- Inline style/CSS lines: 9, 51, 91
- Fixed color/background lines: 51
- Layout/text HTML lines: 9, 51, 91
- HTML comment lines: 42, 60, 65, 70, 84, 103, 110, 127, 132, 137
- Examples:
  - L9 <font> **<font style="background-color:#ccc1d9;">Xss有效载荷：</font>**
  - L9 <font> **<font style="background-color:#ccc1d9;">Xss有效载荷：</font>**
  - L51 <font> **<font style="color:#c00000;background-color:#b8cce4;">个人笔记：</font>**
  - L51 <font> **<font style="color:#c00000;background-color:#b8cce4;">个人笔记：</font>**
  - L91 <font> **<font style="background-color:#b8cce4;">靶机</font>****<font style="background-color:#b8cce4;">pikachu</font>****<font style="background-color:#b8cce4

### source/_posts/2024/07/各种类型上传文件打出XSS/各种类型上传文件打出XSS.md

- Title: 各种类型上传文件打出XSS
- Severity: P1-INLINE-CSS-RISK
- Tag summary: font:4, test:2
- Yuque <font style> lines: 10, 76
- Inline style/CSS lines: 10, 76
- Fixed color/background lines: 10, 76
- Layout/text HTML lines: 10, 76
- HTML comment lines: 82, 87, 92, 101, 110, 123, 132, 137
- Examples:
  - L10 <font> **<font style="color:#c00000;background-color:#b8cce4;">师傅笔记：</font>**
  - L10 <font> **<font style="color:#c00000;background-color:#b8cce4;">师傅笔记：</font>**
  - L70 <test> <test></test>
  - L70 <test> <test></test>
  - L76 <font> **<font style="color:#c00000;background-color:#b8cce4;">个人笔记：</font>**

### source/_posts/2023/04/搭建个人博客/搭建个人博客.md

- Title: 搭建个人博客
- Severity: P2-MANUAL-REVIEW
- Tag summary: img:1
- Preserve-check raw HTML lines: 138
- Examples:
  - L138 <img> <img src = "img/background.png">

### source/_posts/2024/06/Nacost通过文件打出getshell/Nacost通过文件打出getshell.md

- Title: Nacost通过文件打出getshell
- Severity: P2-MANUAL-REVIEW
- Tag summary: u:2
- Preserve-check raw HTML lines: 120
- HTML comment lines: 103, 136, 183, 190, 195, 214, 243
- Examples:
  - L120 <u> "exp": 1682308800_<u>（这个为时间戳，要大于当前时间）</u>_
  - L120 <u> "exp": 1682308800_<u>（这个为时间戳，要大于当前时间）</u>_

### source/_posts/2024/06/Webpack利用/Webpack利用.md

- Title: Webpack利用
- Severity: P2-MANUAL-REVIEW
- Tag summary: u:10
- Preserve-check raw HTML lines: 52
- HTML comment lines: 27, 64, 69, 80, 87, 92, 105, 110, 117
- Examples:
  - L52 <u> 支持自动模糊提取对应目标站点的API以及API对应的参数内容，并支持对：<u>未授权访问、敏感信息泄露、</u><u>CORS</u><u>、</u><u>SQL</u><u>注入、水平越权、弱口令、任意文件上传</u>七大漏洞进行模糊高效的快速检测。
  - L52 <u> 支持自动模糊提取对应目标站点的API以及API对应的参数内容，并支持对：<u>未授权访问、敏感信息泄露、</u><u>CORS</u><u>、</u><u>SQL</u><u>注入、水平越权、弱口令、任意文件上传</u>七大漏洞进行模糊高效的快速检测。
  - L52 <u> 支持自动模糊提取对应目标站点的API以及API对应的参数内容，并支持对：<u>未授权访问、敏感信息泄露、</u><u>CORS</u><u>、</u><u>SQL</u><u>注入、水平越权、弱口令、任意文件上传</u>七大漏洞进行模糊高效的快速检测。
  - L52 <u> 支持自动模糊提取对应目标站点的API以及API对应的参数内容，并支持对：<u>未授权访问、敏感信息泄露、</u><u>CORS</u><u>、</u><u>SQL</u><u>注入、水平越权、弱口令、任意文件上传</u>七大漏洞进行模糊高效的快速检测。
  - L52 <u> 支持自动模糊提取对应目标站点的API以及API对应的参数内容，并支持对：<u>未授权访问、敏感信息泄露、</u><u>CORS</u><u>、</u><u>SQL</u><u>注入、水平越权、弱口令、任意文件上传</u>七大漏洞进行模糊高效的快速检测。

### source/_posts/2025/12/钱志云：如何在计算机研究中寻找灵感/钱志云：如何在计算机研究中寻找灵感.md

- Title: 钱志云：如何在计算机研究中寻找灵感
- Severity: P2-MANUAL-REVIEW
- Tag summary: u:10
- Preserve-check raw HTML lines: 82, 110, 145, 179-180
- HTML comment lines: 44
- Examples:
  - L82 <u> 高层次的想法是，如果你**拥有独特的专业知识、技术、系统**，甚至是**数据集**（<u>其他人无法轻易复制</u>），你就可以利用它，用它来寻找有趣的问题来解决（我们很幸运，计算机科学领域有这么多实际问题）。
  - L82 <u> 高层次的想法是，如果你**拥有独特的专业知识、技术、系统**，甚至是**数据集**（<u>其他人无法轻易复制</u>），你就可以利用它，用它来寻找有趣的问题来解决（我们很幸运，计算机科学领域有这么多实际问题）。
  - L110 <u> 一个研究想法往往始于一个小小的观察。经过一番挖掘，你就能知道它是否能发展成一个值得发表的完整想法。**现在需要决定的是：**<u>你应该花多少时间去探究它，以及在放弃之前应该花多少时间去探究。</u>
  - L110 <u> 一个研究想法往往始于一个小小的观察。经过一番挖掘，你就能知道它是否能发展成一个值得发表的完整想法。**现在需要决定的是：**<u>你应该花多少时间去探究它，以及在放弃之前应该花多少时间去探究。</u>
  - L145 <u> 他们是研究灵感的重要来源。尽管行业比学术界更足智多谋，但在解决技术问题时，行业有着不同的优先级和思维方式。例如，他们对可靠的解决方案更感兴趣，而不太可能投资高风险的解决方案。学术界的好处在于，我们不必一次性 100% 解决问题，而且**学术研究本质上是探索性的**。事实上，从某种意义上说，你可以自行

### source/_posts/2023/05/Git完整教程（图+link）/Git完整教程（图+link）.md

- Title: Git完整教程（图+link）
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 17

### source/_posts/2023/09/CWE checker/CWE checker.md

- Title: CWE checker
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 57

### source/_posts/2024/05/CVE-2024-4820/CVE-2024-4820.md

- Title: CVE-2024-4820
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 23, 91, 95, 99

### source/_posts/2024/06/api接口导致各种漏洞（sql盲注、报错注入等）/api接口导致各种漏洞（sql盲注、报错注入等）.md

- Title: api接口导致各种漏洞（sql盲注、报错注入等）
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 30, 37, 48, 63, 68, 85, 100, 109

### source/_posts/2024/06/CNVD通杀 SQL注入/CNVD通杀 SQL注入.md

- Title: CNVD通杀 SQL注入
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 28, 45, 50, 55

### source/_posts/2024/06/CNVD通杀垂直越权/CNVD通杀垂直越权.md

- Title: CNVD通杀垂直越权
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 11, 28, 37, 48, 61

### source/_posts/2024/06/CSV注入/CSV注入.md

- Title: CSV注入
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 17, 34, 41, 46, 53, 58, 65, 70

### source/_posts/2024/06/Druid monitor页面渗透/Druid monitor页面渗透.md

- Title: Druid monitor页面渗透
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 56, 61, 80, 91

### source/_posts/2024/06/fuzz到sql注入/fuzz到sql注入.md

- Title: fuzz到sql注入
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 45, 56, 65, 76, 85, 96, 101, 110, 125, 134, 139

### source/_posts/2024/06/springboot/springboot.md

- Title: springboot
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 11, 16, 23, 50, 65, 78

### source/_posts/2024/06/Swagger/Swagger.md

- Title: Swagger
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 86, 91, 96, 101, 108, 113, 128, 139, 168, 173, 182, 187, 200, 205

### source/_posts/2024/07/爆破hash密码/爆破hash密码.md

- Title: 爆破hash密码
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 10, 22, 31, 54, 67, 72, 77, 82, 87

### source/_posts/2024/07/构造URL参数尝试未授权/构造URL参数尝试未授权.md

- Title: 构造URL参数尝试未授权
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 30, 49, 56, 63, 68, 73

### source/_posts/2024/07/逻辑漏洞之垂直越权水平越权未授权/逻辑漏洞之垂直越权水平越权未授权.md

- Title: 逻辑漏洞之垂直越权水平越权未授权
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 73, 82, 87, 92, 97, 112, 117

### source/_posts/2024/07/若依/若依.md

- Title: 若依
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 9, 78, 89, 94, 101

### source/_posts/2024/07/水平越权/水平越权.md

- Title: 水平越权
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 43, 54, 65

### source/_posts/2024/07/针对后台功能点进行挖掘/针对后台功能点进行挖掘.md

- Title: 针对后台功能点进行挖掘
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 21, 24, 27, 36, 51, 56, 71, 76, 81, 90, 95, 100, 107, 112

### source/_posts/2024/07/自动化批量注入/自动化批量注入.md

- Title: 自动化批量注入
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 20, 25, 30

### source/_posts/2024/09/BinAbsInspector(ghidra插件，检测二进制漏洞)/BinAbsInspector(ghidra插件，检测二进制漏洞).md

- Title: BinAbsInspector(ghidra插件，检测二进制漏洞)
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 33, 50, 176, 183, 198, 201

### source/_posts/2024/09/CE修改反恐精英/CE修改反恐精英.md

- Title: CE修改反恐精英
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 12, 19, 38, 43, 46, 51, 56, 61

### source/_posts/2024/09/haruspex+semgrep/haruspex+semgrep.md

- Title: haruspex+semgrep
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 24, 33, 40, 57-60, 68, 83, 122, 143, 175, 194, 206, 216, 230, 240, 252, 286, 298, 310, 319, 364, 380, 390, 398, 408, 416, 426, 434, 442, 450, 464, 474, 480, 488, 496, 502, 510, 518, 528, 536

### source/_posts/2024/09/SonarQube/SonarQube.md

- Title: SonarQube
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 22, 33

### source/_posts/2024/09/Triton(动态二进制分析库)/Triton(动态二进制分析库).md

- Title: Triton(动态二进制分析库)
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 26

### source/_posts/2024/11/beam 分析+erlang反汇编/beam 分析+erlang反汇编.md

- Title: beam 分析+erlang反汇编
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 34, 41, 48, 65, 74, 85, 98, 101, 104, 113, 118, 138

### source/_posts/2024/11/beam 分析+erlang反汇编+BeamAnalyzer/beam 分析+erlang反汇编+BeamAnalyzer.md

- Title: beam 分析+erlang反汇编+BeamAnalyzer
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 35, 42, 49, 66, 75, 86, 99, 102, 105, 114, 119, 139

### source/_posts/2025/11/谷歌：AI for sec/谷歌：AI for sec.md

- Title: 谷歌：AI for sec
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 44

### source/_posts/2025/11/微软：Analyzing open-source bootloaders _ Finding vulnerability faster with AI/微软：Analyzing open-source bootloaders _ Finding vulnerability faster with AI.md

- Title: 微软：Analyzing open-source bootloaders _ Finding vulnerability faster with AI
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 30, 54, 92, 111

### source/_posts/2025/11/Agent发展趋势/Agent发展趋势.md

- Title: Agent发展趋势
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 77, 94, 150, 172, 221, 275, 296, 310, 331, 338, 345

### source/_posts/2025/11/LLM+MCP+RAG/LLM+MCP+RAG.md

- Title: LLM+MCP+RAG
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 17, 28, 37, 42, 49, 71, 74, 101, 104, 107, 125, 128, 145

### source/_posts/2025/11/scan-x（Sec Agent）/scan-x（Sec Agent）.md

- Title: scan-x（Sec Agent）
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 28, 52, 75, 108, 119, 135, 157, 200, 205

### source/_posts/2025/11/VulnBot（web漏挖智能体）/VulnBot（web漏挖智能体）.md

- Title: VulnBot（web漏挖智能体）
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 44, 67, 79

### source/_posts/2025/12/diff整个linux文件系统定位漏洞代码/diff整个linux文件系统定位漏洞代码.md

- Title: diff整个linux文件系统定位漏洞代码
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 18, 21, 31, 34, 286, 614, 619, 626, 635

### source/_posts/2025/12/Rhabdomancer：ghidra脚本，用于漏洞研究/Rhabdomancer：ghidra脚本，用于漏洞研究.md

- Title: Rhabdomancer：ghidra脚本，用于漏洞研究
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 15, 20, 23-24

### source/_posts/2026/01/AIXCC-ButterCup项目详解/AIXCC-ButterCup项目详解.md

- Title: AIXCC-ButterCup项目详解
- Severity: P3-COMMENTS-ONLY
- Tag summary: task_dir:2, container:1
- HTML comment lines: 45, 50, 871, 877, 886, 980, 983, 989, 995, 998, 1001, 1006, 1178, 1744
- Examples:
  - L1576 <container> + `docker cp <container>:/src -> <task_dir>/container_src_dir`
  - L1576 <task_dir> + `docker cp <container>:/src -> <task_dir>/container_src_dir`
  - L1583 <task_dir> + `_rebase_path()`：把`<task_dir>/container_src_dir/...`重映射为容器视角`/src/...`（对外返回统一容器绝对路径）。

### source/_posts/2026/01/AIxCC总览/AIxCC总览.md

- Title: AIxCC总览
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 52, 59, 64, 69

### source/_posts/2026/02/cve-FH1202-bufferoverflow/cve-FH1202-bufferoverflow.md

- Title: cve-FH1202-bufferoverflow
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 19, 42

### source/_posts/2026/02/cve2-FH1202-bufferoverflow/cve2-FH1202-bufferoverflow.md

- Title: cve2-FH1202-bufferoverflow
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 22, 46

### source/_posts/2026/02/cve3-FH1202-bufferoverflow/cve3-FH1202-bufferoverflow.md

- Title: cve3-FH1202-bufferoverflow
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 24, 50

### source/_posts/2026/02/The-formexeCommand-function-in-Tenda's-i12-product/The-formexeCommand-function-in-Tenda's-i12-product.md

- Title: The formexeCommand function in Tenda's i12 product has a stack overflow
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 32, 59

### source/_posts/2026/02/The-formWifiMacFilterGet-function-in-Tenda's-i12-product/The-formWifiMacFilterGet-function-in-Tenda's-i12-product.md

- Title: The formWifiMacFilterGet function in Tenda's i12 product has a buffer overflow
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 30, 57

### source/_posts/2026/02/The-formwrlSSIDget-function-in-Tenda's-i12-product/The-formwrlSSIDget-function-in-Tenda's-i12-product.md

- Title: The formwrlSSIDget function in Tenda's i12 product has a stack overflow
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 29, 58

### source/_posts/2026/04/腾讯第二界agent漏挖/腾讯第二界agent漏挖.md

- Title: 腾讯第二界agent漏挖
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 20, 23, 28, 33, 46, 53, 56, 61, 66, 94, 97, 102

### source/_posts/2026/05/ATT&CK to CVE_ A Large-Scale Automated Knowledge Graph for Threat Intelligence/ATT&CK to CVE_ A Large-Scale Automated Knowledge Graph for Threat Intelligence.md

- Title: ATT&CK to CVE_ A Large-Scale Automated Knowledge Graph for Threat Intelligence
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 41, 48

### source/_posts/2026/05/Can LLM Prompting Serve as a Proxy for Static Analysis in Vulnerability Detection/Can LLM Prompting Serve as a Proxy for Static Analysis in Vulnerability Detection.md

- Title: Can LLM Prompting Serve as a Proxy for Static Analysis in Vulnerability Detection
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 34, 56

### source/_posts/2026/05/Devign：Effective Vulnerability Identification by learning Comprehensive Program Semantics via Graph Neural Networks/Devign：Effective Vulnerability Identification by learning Comprehensive Program Semantics via Graph Neural Networks.md

- Title: Devign：Effective Vulnerability Identification by learning Comprehensive Program Semantics via Graph Neural Networks
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 31, 50

### source/_posts/2026/05/KRYSTAL_ Knowledge graph-based framework for tactical attackdiscovery in audit data/KRYSTAL_ Knowledge graph-based framework for tactical attackdiscovery in audit data.md

- Title: KRYSTAL_ Knowledge graph-based framework for tactical attackdiscovery in audit data
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 18, 21

### source/_posts/2026/05/LLM-BASED MULTI-AGENT BLACKBOARD SYSTEM FOR INFORMATION DISCOVERY IN DATA SCIENCE/LLM-BASED MULTI-AGENT BLACKBOARD SYSTEM FOR INFORMATION DISCOVERY IN DATA SCIENCE.md

- Title: LLM-BASED MULTI-AGENT BLACKBOARD SYSTEM FOR INFORMATION DISCOVERY IN DATA SCIENCE
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 47

### source/_posts/2026/05/memory in the llm era_ modular architectures and strategies in a unified framework [experiment,analysis & benchmark]/memory in the llm era_ modular architectures and strategies in a unified framework [experiment,analysis & benchmark].md

- Title: memory in the llm era_ modular architectures and strategies in a unified framework [experiment,analysis & benchmark]
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 41, 48, 58, 68, 111, 125

### source/_posts/2026/05/REPOGRAPH：Enhancing AI software engineering with repository-level code graph/REPOGRAPH：Enhancing AI software engineering with repository-level code graph.md

- Title: REPOGRAPH：Enhancing AI software engineering with repository-level code graph
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 31

### source/_posts/2026/05/Repository-Level Graph Representation Learning for Enhanced Security Patch Detection/Repository-Level Graph Representation Learning for Enhanced Security Patch Detection.md

- Title: Repository-Level Graph Representation Learning for Enhanced Security Patch Detection
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 27, 30, 33

### source/_posts/2026/05/THINK-ON-GRAPH_ DEEP AND RESPONSIBLE REASON-ING OF LARGE LANGUAGE MODEL ON KNOWLEDGEGRAPH/THINK-ON-GRAPH_ DEEP AND RESPONSIBLE REASON-ING OF LARGE LANGUAGE MODEL ON KNOWLEDGEGRAPH.md

- Title: THINK-ON-GRAPH DEEP AND RESPONSIBLE REASON-ING OF LARGE LANGUAGE MODEL ON KNOWLEDGEGRAPH
- Severity: P3-COMMENTS-ONLY
- Tag summary: none
- HTML comment lines: 32, 41

