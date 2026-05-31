---
title: "CWE checker"
date: 2023-09
categories: [Tools]
tags:
  - cwe checker
---

cwe_checker 是一套用于检测常见错误类别（例如空指针取消引用和缓冲区溢出）的检查工具。这些错误类别正式称为常见弱点枚举(CWE)。这些检查基于各种分析技术，从简单的启发式方法到基于抽象解释的数据流分析。其主要目标是帮助分析师快速找到潜在的易受攻击的代码路径。

#### 检测列表：检测原理
+ [<font style="color:rgb(31, 35, 40);">CWE-78</font>](https://cwe.mitre.org/data/definitions/78.html)<font style="color:rgb(31, 35, 40);">：操作系统命令注入（目前在标准运行中已禁用）</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-119</font>](https://cwe.mitre.org/data/definitions/119.html)<font style="color:rgb(31, 35, 40);">(</font><font style="color:rgb(0, 0, 0);">缓冲区溢出</font><font style="color:rgb(31, 35, 40);">)及其变体</font>[<font style="color:rgb(31, 35, 40);">CWE-125</font>](https://cwe.mitre.org/data/definitions/125.html)<font style="color:rgb(31, 35, 40);">(</font><font style="color:rgb(0, 0, 0);">越界读取)</font><font style="color:rgb(31, 35, 40);">和</font>[<font style="color:rgb(31, 35, 40);">CWE-787</font>](https://cwe.mitre.org/data/definitions/787.html)<font style="color:rgb(31, 35, 40);">(</font><font style="color:rgb(0, 0, 0);">越界写入)</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-134</font>](https://cwe.mitre.org/data/definitions/134.html)<font style="color:rgb(31, 35, 40);">：使用外部控制格式字符串</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-190</font>](https://cwe.mitre.org/data/definitions/190.html)<font style="color:rgb(31, 35, 40);">：整数溢出或回绕</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-215</font>](https://cwe.mitre.org/data/definitions/215.html)<font style="color:rgb(31, 35, 40);">：对</font><font style="color:rgb(0, 0, 0);">调试信息的暴露信息进行检查。</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-243</font>](https://cwe.mitre.org/data/definitions/243.html)<font style="color:rgb(31, 35, 40);">：</font><font style="color:rgb(0, 0, 0);">在不改变工作目录的情况下创建 chroot Jail</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-332</font>](https://cwe.mitre.org/data/definitions/332.html)<font style="color:rgb(31, 35, 40);">：PRNG 中的熵不足</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-337</font>](https://cwe.mitre.org/data/definitions/337.html)<font style="color:rgb(31, 35, 40);">：伪随机数生成器（PRNG）中的可预测种子</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-367</font>](https://cwe.mitre.org/data/definitions/367.html)<font style="color:rgb(31, 35, 40);">：检查时间使用时间 (TOCTOU) 竞争条件</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-416</font>](https://cwe.mitre.org/data/definitions/416.html)<font style="color:rgb(31, 35, 40);">：释放后使用及其变体</font>[<font style="color:rgb(31, 35, 40);">CWE-415</font>](https://cwe.mitre.org/data/definitions/415.html)<font style="color:rgb(31, 35, 40);">：双重释放</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-426</font>](https://cwe.mitre.org/data/definitions/426.html)<font style="color:rgb(31, 35, 40);">：不受信任的搜索路径</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-467</font>](https://cwe.mitre.org/data/definitions/467.html)<font style="color:rgb(31, 35, 40);">：在指针类型上使用sizeof()</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-476</font>](https://cwe.mitre.org/data/definitions/476.html)<font style="color:rgb(31, 35, 40);">：空指针取消引用</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-560</font>](https://cwe.mitre.org/data/definitions/560.html)<font style="color:rgb(31, 35, 40);">：umask() 与 chmod-style 参数的使用</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-676</font>](https://cwe.mitre.org/data/definitions/676.html)<font style="color:rgb(31, 35, 40);">：潜在危险功能的使用</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-782</font>](https://cwe.mitre.org/data/definitions/782.html)<font style="color:rgb(31, 35, 40);">：暴露 IOCTL，访问控制不足</font>
+ [<font style="color:rgb(31, 35, 40);">CWE-789</font>](https://cwe.mitre.org/data/definitions/789.html)<font style="color:rgb(31, 35, 40);">：大小值过大的内存分配</font>



#### 使用：
1.拉取docker镜像

<font style="color:rgb(31, 35, 40);">docker pull ghcr.io/fkie-cad/cwe_checker:latest</font>

<font style="color:rgb(31, 35, 40);">2.运行</font>

<font style="color:rgb(31, 35, 40);">docker run --rm -v /PATH/TO/BINARY:/input ghcr.io/fkie-cad/cwe_checker /input</font>



#### <font style="color:rgb(31, 35, 40);">特点：</font>
+ <font style="color:rgb(31, 35, 40);">设置起来非常简单，只需构建 Docker 容器！</font>
+ <font style="color:rgb(31, 35, 40);">它分析了几种 CPU 架构的 ELF 二进制文件，包括 x86、ARM、MIPS 和 PPC</font>
+ <font style="color:rgb(31, 35, 40);">由于其基于插件的架构，它具有可扩展性</font>
+ <font style="color:rgb(31, 35, 40);">它是可配置的，例如将分析应用于新的 API</font>
+ <font style="color:rgb(31, 35, 40);">查看 Ghidra 中注释的结果</font>
+ <font style="color:rgb(31, 35, 40);">cwe_checker 可以作为插件集成到FACT中</font>

<font style="color:rgb(31, 35, 40);"></font>

<font style="color:rgb(31, 35, 40);"></font>

<font style="color:rgb(31, 35, 40);">docker运行工具后，</font>

<!-- 这是一张图片，ocr 内容为：-(ROOT@KALI)-[/HOME/KALI/CWE-CHECKER] 54_CRB_LINUX_IOSD_VXE-UNIVERSALK9-MS GHCR.IO/FKIE-C #DOCKER RUN --RM -V /HOME/KALI/CWE-CHECKER://X86_64_C AD/CWE_CHECKER /X86_64_CRB_LINUX_IOSD_VXE-UNIVERSALK9-MS ERTOR; INVALID VALUE /K80,64-CRB,LINUX,JOSD.LINUX IOS P VXE-UNIVERSALK9-MS IS NOT A FILE. FOR MORE INFORMATION TRY '--HELP' -->
![](img/1-0a02b51a.png)

<font style="color:rgb(31, 35, 40);">说被测elf不是一个文件</font>

<font style="color:rgb(31, 35, 40);"></font>

<font style="color:rgb(31, 35, 40);">如何绕过文件的检测策略直接启用检测</font>

<font style="color:rgb(31, 35, 40);"></font>

