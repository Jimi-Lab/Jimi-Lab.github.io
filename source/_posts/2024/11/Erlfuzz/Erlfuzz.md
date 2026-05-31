---
title: "Erlfuzz"
date: 2024-11
categories: [逆向]
tags:
  - Erlfuzzx
  - Tools
---

[https://gitcode.com/gh_mirrors/er/erlfuzz/overview](https://gitcode.com/gh_mirrors/er/erlfuzz/overview)



#### 简介：
erlfuzz 是一个用于对 Erlang 编译器和虚拟机进行模糊测试的工具，目的是自动化发现潜在的编译和运行时错误。它生成随机的 Erlang 程序，并通过这些程序对相关工具（如 Erlang 编译器 erlc、虚拟机 BEAM、以及静态分析工具如 Dialyzer 等）进行测试。



#### 主要功能
模糊测试：生成随机 Erlang 程序，并用于测试 Erlang 编译器（erlc）和虚拟机（BEAM）的健壮性。

生成和最小化测试用例：可以生成可能导致崩溃的最小化测试用例，帮助开发者定位问题。

多平台：支持 Linux 和 macOS



#### 安装和构建
**依赖**：

Rust（包括 Cargo）

一些额外的 Linux 工具：`parallel`, `timeout`, `ulimit`

**构建命令**： 在有网络的计算机上执行以下命令构建：

```plain
bash


复制代码
cargo build --release
```

#### 使用方法
**基本用法**： 可以使用提供的脚本进行模糊测试。通过以下命令运行模糊测试：

```plain
bash


复制代码
mkdir -p out
mkdir -p interesting
seq 1000000 | parallel --line-buffer "./target/release/erlfuzz fuzz -c ./scripts/run_erl_debug.sh --tmp-directory out --interesting-directory interesting test{}"
```

这将使用 `parallel` 工具并行运行模糊测试，使用计算机上的所有核心。如果需要限制核心数（例如 5 核），可以添加 `-j 5` 参数。

**其他工具脚本**： `erlfuzz` 还可以与其他工具（如 `erlfmt`, `dialyzer`, `eqwalizer` 等）结合使用，进行相应的模糊测试。每个工具可能需要额外的选项来避免在错误报告中出现不确定性数字（如时间戳、进程 ID 等）。

#### 调试和日志
+ 如果 `erlfuzz` 本身出现问题，可以通过设置 `RUST_LOG=debug` 或 `RUST_LOG=trace` 环境变量来获得详细的日志。
+ 可以调整不同模块的日志级别。例如：

```plain
bash

复制代码
RUST_LOG="warn,erlfuzz::reducer=info"
```



#### 测试用例最小化
通过以下命令，可以减少已生成的测试用例的大小：

```plain
bash


复制代码
./target/release/erlfuzz reduce -c ./scripts/run_erl_debug.sh --tmp-directory out --minimized-directory minimized --seed 3137934125722527840 foobar
```

这将使用给定的种子值减少测试用例的大小。



#### erlfuzz 已经发现了 Erlang 和相关工具中的一些问题，并列出了具体的 GitHub 问题链接，帮助开发者查找和定位可能的错误：
<font style="color:rgb(37, 43, 58);">BEAM VM:</font>

+ [https://github.com/erlang/otp/issues/6634](https://github.com/erlang/otp/issues/6634)
+ [https://github.com/erlang/otp/issues/6645](https://github.com/erlang/otp/issues/6645)
+ [https://github.com/erlang/otp/issues/6655](https://github.com/erlang/otp/issues/6655)
+ [https://github.com/erlang/otp/issues/6701](https://github.com/erlang/otp/issues/6701)
+ [https://github.com/erlang/otp/issues/6717](https://github.com/erlang/otp/issues/6717)
+ [https://github.com/erlang/otp/pull/6838](https://github.com/erlang/otp/pull/6838)
+ [https://github.com/erlang/otp/pull/6839](https://github.com/erlang/otp/pull/6839)
+ [https://github.com/erlang/otp/issues/7282](https://github.com/erlang/otp/issues/7282)

<font style="color:rgb(37, 43, 58);">erlc:</font>

+ [https://github.com/erlang/otp/issues/6163](https://github.com/erlang/otp/issues/6163)
+ [https://github.com/erlang/otp/issues/6164](https://github.com/erlang/otp/issues/6164)
+ [https://github.com/erlang/otp/issues/6169](https://github.com/erlang/otp/issues/6169)
+ [https://github.com/erlang/otp/issues/6183](https://github.com/erlang/otp/issues/6183)
+ [https://github.com/erlang/otp/issues/6184](https://github.com/erlang/otp/issues/6184)
+ [https://github.com/erlang/otp/issues/6409](https://github.com/erlang/otp/issues/6409)
+ [https://github.com/erlang/otp/issues/6410](https://github.com/erlang/otp/issues/6410)
+ [https://github.com/erlang/otp/issues/6418](https://github.com/erlang/otp/issues/6418)
+ [https://github.com/erlang/otp/issues/6426](https://github.com/erlang/otp/issues/6426)
+ [https://github.com/erlang/otp/issues/6427](https://github.com/erlang/otp/issues/6427)
+ [https://github.com/erlang/otp/issues/6444](https://github.com/erlang/otp/issues/6444)
+ [https://github.com/erlang/otp/issues/6445](https://github.com/erlang/otp/issues/6445)
+ [https://github.com/erlang/otp/issues/6458](https://github.com/erlang/otp/issues/6458)
+ [https://github.com/erlang/otp/pull/6415#issuecomment-1312012344](https://github.com/erlang/otp/pull/6415#issuecomment-1312012344)
+ [https://github.com/erlang/otp/issues/6467](https://github.com/erlang/otp/issues/6467)
+ [https://github.com/erlang/otp/issues/6468](https://github.com/erlang/otp/issues/6468)
+ [https://github.com/erlang/otp/pull/6415#issuecomment-1314007288](https://github.com/erlang/otp/pull/6415#issuecomment-1314007288)
+ [https://github.com/erlang/otp/pull/6415#issuecomment-1315158928](https://github.com/erlang/otp/pull/6415#issuecomment-1315158928)
+ [https://github.com/erlang/otp/issues/6474](https://github.com/erlang/otp/issues/6474)
+ [https://github.com/erlang/otp/pull/6415#issuecomment-1318539291](https://github.com/erlang/otp/pull/6415#issuecomment-1318539291)
+ [https://github.com/erlang/otp/pull/6415#issuecomment-1325303532](https://github.com/erlang/otp/pull/6415#issuecomment-1325303532)
+ [https://github.com/erlang/otp/pull/6415#issuecomment-1326240668](https://github.com/erlang/otp/pull/6415#issuecomment-1326240668)
+ [https://github.com/erlang/otp/issues/6458#issuecomment-1326618218](https://github.com/erlang/otp/issues/6458#issuecomment-1326618218)
+ [https://github.com/erlang/otp/issues/6515](https://github.com/erlang/otp/issues/6515)
+ [https://github.com/erlang/otp/issues/6551](https://github.com/erlang/otp/issues/6551)
+ [https://github.com/erlang/otp/issues/6552](https://github.com/erlang/otp/issues/6552)
+ [https://github.com/erlang/otp/issues/6553](https://github.com/erlang/otp/issues/6553)
+ [https://github.com/erlang/otp/issues/6552#issuecomment-1353135450](https://github.com/erlang/otp/issues/6552#issuecomment-1353135450)
+ [https://github.com/erlang/otp/pull/6559#issuecomment-1354514130](https://github.com/erlang/otp/pull/6559#issuecomment-1354514130)
+ [https://github.com/erlang/otp/issues/6568](https://github.com/erlang/otp/issues/6568)
+ [https://github.com/erlang/otp/issues/6571](https://github.com/erlang/otp/issues/6571)
+ [https://github.com/erlang/otp/issues/6572](https://github.com/erlang/otp/issues/6572)
+ [https://github.com/erlang/otp/issues/6593](https://github.com/erlang/otp/issues/6593)
+ [https://github.com/erlang/otp/issues/6599](https://github.com/erlang/otp/issues/6599)
+ [https://github.com/erlang/otp/issues/6601](https://github.com/erlang/otp/issues/6601)
+ [https://github.com/erlang/otp/issues/6602](https://github.com/erlang/otp/issues/6602)
+ [https://github.com/erlang/otp/issues/6603](https://github.com/erlang/otp/issues/6603)
+ [https://github.com/erlang/otp/issues/6604](https://github.com/erlang/otp/issues/6604)
+ [https://github.com/erlang/otp/issues/6612](https://github.com/erlang/otp/issues/6612)
+ [https://github.com/erlang/otp/issues/6613](https://github.com/erlang/otp/issues/6613)
+ [https://github.com/erlang/otp/pull/6619#issuecomment-1368995152](https://github.com/erlang/otp/pull/6619#issuecomment-1368995152)
+ [https://github.com/erlang/otp/issues/6630](https://github.com/erlang/otp/issues/6630)
+ [https://github.com/erlang/otp/issues/6633](https://github.com/erlang/otp/issues/6633)
+ [https://github.com/erlang/otp/issues/6643](https://github.com/erlang/otp/issues/6643)
+ [https://github.com/erlang/otp/issues/6648](https://github.com/erlang/otp/issues/6648)
+ [https://github.com/erlang/otp/pull/6651#issuecomment-1377177470](https://github.com/erlang/otp/pull/6651#issuecomment-1377177470)
+ [https://github.com/erlang/otp/pull/6651#issuecomment-1377216462](https://github.com/erlang/otp/pull/6651#issuecomment-1377216462)
+ [https://github.com/erlang/otp/issues/6660](https://github.com/erlang/otp/issues/6660)
+ [https://github.com/erlang/otp/pull/6727#issuecomment-1418853979](https://github.com/erlang/otp/pull/6727#issuecomment-1418853979)
+ [https://github.com/erlang/otp/issues/6835](https://github.com/erlang/otp/issues/6835)
+ [https://github.com/erlang/otp/issues/6847](https://github.com/erlang/otp/issues/6847)
+ [https://github.com/erlang/otp/issues/6848](https://github.com/erlang/otp/issues/6848)
+ [https://github.com/erlang/otp/issues/6851](https://github.com/erlang/otp/issues/6851)
+ [https://github.com/erlang/otp/issues/6960](https://github.com/erlang/otp/issues/6960)
+ [https://github.com/erlang/otp/issues/6962](https://github.com/erlang/otp/issues/6962)
+ [https://github.com/erlang/otp/pull/6974](https://github.com/erlang/otp/pull/6974)
+ [https://github.com/erlang/otp/issues/7011](https://github.com/erlang/otp/issues/7011)
+ [https://github.com/erlang/otp/issues/7128](https://github.com/erlang/otp/issues/7128)
+ [https://github.com/erlang/otp/issues/7142](https://github.com/erlang/otp/issues/7142)
+ [https://github.com/erlang/otp/issues/7145](https://github.com/erlang/otp/issues/7145)
+ [https://github.com/erlang/otp/issues/7147](https://github.com/erlang/otp/issues/7147)
+ [https://github.com/erlang/otp/issues/7168](https://github.com/erlang/otp/issues/7168)
+ [https://github.com/erlang/otp/issues/7170](https://github.com/erlang/otp/issues/7170)
+ [https://github.com/erlang/otp/issues/7171](https://github.com/erlang/otp/issues/7171)
+ [https://github.com/erlang/otp/issues/7178](https://github.com/erlang/otp/issues/7178)
+ [https://github.com/erlang/otp/issues/7179](https://github.com/erlang/otp/issues/7179)
+ [https://github.com/erlang/otp/issues/7180](https://github.com/erlang/otp/issues/7180)
+ [https://github.com/erlang/otp/pull/7207](https://github.com/erlang/otp/pull/7207)
+ [https://github.com/erlang/otp/pull/7222](https://github.com/erlang/otp/pull/7222)
+ [https://github.com/erlang/otp/issues/7248](https://github.com/erlang/otp/issues/7248)
+ [https://github.com/erlang/otp/issues/7251](https://github.com/erlang/otp/issues/7251)
+ [https://github.com/erlang/otp/issues/7252](https://github.com/erlang/otp/issues/7252)
+ [https://github.com/erlang/otp/pull/7271](https://github.com/erlang/otp/pull/7271)
+ [https://github.com/erlang/otp/pull/7283](https://github.com/erlang/otp/pull/7283)
+ [https://github.com/erlang/otp/pull/7281#issuecomment-1562404185](https://github.com/erlang/otp/pull/7281#issuecomment-1562404185)
+ [https://github.com/erlang/otp/pull/7340](https://github.com/erlang/otp/pull/7340)
+ [https://github.com/erlang/otp/issues/7354](https://github.com/erlang/otp/issues/7354)
+ [https://github.com/erlang/otp/issues/7370](https://github.com/erlang/otp/issues/7370)
+ [https://github.com/erlang/otp/pull/7448#issuecomment-1618443949](https://github.com/erlang/otp/pull/7448#issuecomment-1618443949)
+ [https://github.com/erlang/otp/issues/7467](https://github.com/erlang/otp/issues/7467)
+ [https://github.com/erlang/otp/issues/7468](https://github.com/erlang/otp/issues/7468)
+ [https://github.com/erlang/otp/pull/7448#issuecomment-1621245246](https://github.com/erlang/otp/pull/7448#issuecomment-1621245246)
+ [https://github.com/erlang/otp/issues/7477](https://github.com/erlang/otp/issues/7477)
+ [https://github.com/erlang/otp/issues/7478](https://github.com/erlang/otp/issues/7478)
+ [https://github.com/erlang/otp/pull/7489#issuecomment-1633795558](https://github.com/erlang/otp/pull/7489#issuecomment-1633795558)
+ [https://github.com/erlang/otp/issues/7494](https://github.com/erlang/otp/issues/7494)
+ [https://github.com/erlang/otp/issues/7504](https://github.com/erlang/otp/issues/7504)
+ [https://github.com/erlang/otp/pull/7527#issue-1833154980](https://github.com/erlang/otp/pull/7527#issue-1833154980)
+ [https://github.com/erlang/otp/issues/7901](https://github.com/erlang/otp/issues/7901)
+ [https://github.com/erlang/otp/pull/7902#issuecomment-1825299276](https://github.com/erlang/otp/pull/7902#issuecomment-1825299276)
+ [https://github.com/erlang/otp/pull/7902#issuecomment-1825301929](https://github.com/erlang/otp/pull/7902#issuecomment-1825301929)

<font style="color:rgb(37, 43, 58);">dialyzer:</font>

+ [https://github.com/erlang/otp/issues/6419](https://github.com/erlang/otp/issues/6419)
+ [https://github.com/erlang/otp/issues/6473](https://github.com/erlang/otp/issues/6473)
+ [https://github.com/erlang/otp/issues/6518](https://github.com/erlang/otp/issues/6518)
+ [https://github.com/erlang/otp/issues/6580](https://github.com/erlang/otp/issues/6580)
+ [https://github.com/erlang/otp/issues/7138](https://github.com/erlang/otp/issues/7138)
+ [https://github.com/erlang/otp/issues/7153](https://github.com/erlang/otp/issues/7153)
+ [https://github.com/erlang/otp/issues/7181](https://github.com/erlang/otp/issues/7181)
+ [https://github.com/erlang/otp/issues/7325](https://github.com/erlang/otp/issues/7325)

<font style="color:rgb(37, 43, 58);">erlfmt:</font>

+ [https://github.com/WhatsApp/erlfmt/issues/338](https://github.com/WhatsApp/erlfmt/issues/338)

<font style="color:rgb(37, 43, 58);">eqWAlizer:</font>

+ [https://github.com/WhatsApp/eqwalizer/commit/56634681d5de33819c371285ff5682d58384518b](https://github.com/WhatsApp/eqwalizer/commit/56634681d5de33819c371285ff5682d58384518b)
+ [https://github.com/WhatsApp/eqwalizer/commit/a253f6ee5c202d683c2719d325fd31acc46221a3](https://github.com/WhatsApp/eqwalizer/commit/a253f6ee5c202d683c2719d325fd31acc46221a3)
+ [https://github.com/WhatsApp/eqwalizer/commit/d8afa8e7cc27a115570198539128cffd16e16866](https://github.com/WhatsApp/eqwalizer/commit/d8afa8e7cc27a115570198539128cffd16e16866)
+ [https://github.com/WhatsApp/eqwalizer/commit/75de28b27345b7796cf4c39a460d93b1070e02ac](https://github.com/WhatsApp/eqwalizer/commit/75de28b27345b7796cf4c39a460d93b1070e02ac)
+ [https://github.com/WhatsApp/eqwalizer/commit/ae608820ec08c2108e438a92b9d7a0fdf999a06b](https://github.com/WhatsApp/eqwalizer/commit/ae608820ec08c2108e438a92b9d7a0fdf999a06b)
+ [https://github.com/WhatsApp/eqwalizer/commit/904449753e68388bc5b33f8b12217b6af6978bf7](https://github.com/WhatsApp/eqwalizer/commit/904449753e68388bc5b33f8b12217b6af6978bf7)

<font style="color:rgb(37, 43, 58);">inferl:</font>

+ [https://github.com/facebook/infer/commit/dbdcf4863ee2751a6b671f072850b29b4916bf5b](https://github.com/facebook/infer/commit/dbdcf4863ee2751a6b671f072850b29b4916bf5b)
+ [https://github.com/facebook/infer/commit/5453911ea7a69dfb66f2cb697976eeeb9c30b176](https://github.com/facebook/infer/commit/5453911ea7a69dfb66f2cb697976eeeb9c30b176)

<font style="color:rgb(37, 43, 58);">Gradualizer</font>

+ [https://github.com/josefs/Gradualizer/issues/542](https://github.com/josefs/Gradualizer/issues/542)
+ [https://github.com/josefs/Gradualizer/issues/543](https://github.com/josefs/Gradualizer/issues/543)
+ [https://github.com/josefs/Gradualizer/issues/544](https://github.com/josefs/Gradualizer/issues/544)
+ [https://github.com/josefs/Gradualizer/issues/545](https://github.com/josefs/Gradualizer/issues/545)





