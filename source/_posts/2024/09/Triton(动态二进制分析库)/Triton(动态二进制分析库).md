---
title: "Triton(动态二进制分析库)"
date: 2024-09
categories: [Tools]
tags:
  - Triton
---

[https://github.com/jonathansalwan/Triton](https://github.com/jonathansalwan/Triton)



**<font style="color:rgb(68, 68, 68);">Triton</font>**<font style="color:rgb(68, 68, 68);">是一个动态二进制分析库，提供内部组件，允许您构建程序分析工具、自动执行逆向工程、执行软件验证或仅模拟代码。</font>

+ **<font style="color:rgb(68, 68, 68);">动态符号执行</font>**
+ **<font style="color:rgb(68, 68, 68);">动态污点分析</font>**
+ **<font style="color:rgb(68, 68, 68);">x86</font>**<font style="color:rgb(68, 68, 68);">、</font>**<font style="color:rgb(68, 68, 68);">x86-64</font>**<font style="color:rgb(68, 68, 68);">、</font>**<font style="color:rgb(68, 68, 68);">ARM32</font>**<font style="color:rgb(68, 68, 68);">、</font>**<font style="color:rgb(68, 68, 68);">AArch64</font>**<font style="color:rgb(68, 68, 68);">和</font>**<font style="color:rgb(68, 68, 68);">RISC-V 32/64</font>**<font style="color:rgb(68, 68, 68);"> </font><font style="color:rgb(68, 68, 68);">ISA 语义</font><font style="color:rgb(68, 68, 68);">的</font>**<font style="color:rgb(68, 68, 68);">AST 表示</font>**
+ **<font style="color:rgb(68, 68, 68);">表情合成</font>**
+ **<font style="color:rgb(68, 68, 68);">SMT 简化</font>**<font style="color:rgb(68, 68, 68);">通行证</font>
+ **<font style="color:rgb(68, 68, 68);">升级</font>**<font style="color:rgb(68, 68, 68);">至</font>**<font style="color:rgb(68, 68, 68);">LLVM</font>**<font style="color:rgb(68, 68, 68);">以及</font>**<font style="color:rgb(68, 68, 68);">Z3</font>**<font style="color:rgb(68, 68, 68);">并返回</font>
+ **<font style="color:rgb(68, 68, 68);">SMT 求解器</font>**<font style="color:rgb(68, 68, 68);">接口至</font>**<font style="color:rgb(68, 68, 68);">Z3</font>**<font style="color:rgb(68, 68, 68);">和</font>**<font style="color:rgb(68, 68, 68);">Bitwuzla</font>**
+ **<font style="color:rgb(68, 68, 68);">C++</font>**<font style="color:rgb(68, 68, 68);">和</font>**<font style="color:rgb(68, 68, 68);">Python</font>**<font style="color:rgb(68, 68, 68);"> API</font>

<font style="color:rgb(68, 68, 68);"></font>

<!-- 这是一张图片，ocr 内容为：MMU REGISTERS PIN TAINT CONCRETE QEMU INITIAL CONTEXT(OPTIONAL) ANALYSIS EXECUTION GDB IDA LLVM-IR AST DISASS.& 48 B8 88 77 66 55 44 33 22 11 REPRESENTATION LIFTING DESC. SEMA. RAW FILE OPCODES ETC. SMT SOLVERS EXPRESSION SYMBOLIC Z3 BITWUZLA SYNTHESIS EXECUTION INTERFACE MMU REGISTERS -->
![](img/1-493f6273.png)

