---
title: "Dialyzer(静态分析代码)"
date: 2024-09
categories: [Tools]
tags:
  - Dialyzer
---

[https://www.erlang.org/doc/apps/dialyzer/dialyzer_chapter.html](https://www.erlang.org/doc/apps/dialyzer/dialyzer_chapter.html)

[https://cloud.tencent.com/developer/section/1122977](https://cloud.tencent.com/developer/section/1122977)

#### 简介：
Dialyzer从调试编译的BEAM字节码或Erlang源代码开始分析。报告差异的文件和行号以及差异是关于什么的指示。Dialyzer基于成功典型的概念进行分析，这种概念允许发出合理的警告（没有误报）。

#### Dialyzer的核心功能
Dialyzer 的目标是通过静态分析帮助开发人员识别潜在的错误和不一致之处，而无需运行代码。它主要用于以下几类检查：

**类型错误：**检查函数参数和返回值是否符合预期类型。

**不可达代码：**检查由于编程错误导致的死代码。

**冗余检查：**识别冗余的测试和无用的代码。



#### Persistent Lookup Table (PLT)
Dialyzer 使用一个称为 **Persistent Lookup Table (PLT)** 的机制来存储分析结果。通过该表格，Dialyzer 能够在后续的分析中避免重复工作，从而提高效率。PLT 存储了关于被分析应用程序的所有类型信息。

**PLT的构建与管理**

Dialyzer 推荐在使用前构建一个包含 Erlang/OTP 应用的 PLT，您可以通过以下命令来构建 PLT：

```plain
bash


复制代码
dialyzer --build_plt --apps erts kernel stdlib mnesia
```

+ `--apps` 选项用于指定要包含在 PLT 中的应用程序。
+ PLT 文件默认保存在 `user_cache` 目录下，但也可以使用 `--plt` 和 `--output_plt` 选项来指定 PLT 文件的位置。

PLT 文件可以添加、删除或更新：

+ **添加应用程序**：将某个应用程序添加到现有的 PLT 中：

```plain
bash


复制代码
dialyzer --add_to_plt --apps compiler --output_plt my.plt
```

+ **删除应用程序**：从 PLT 中删除某个应用程序：

```plain
bash


复制代码
dialyzer --remove_from_plt --plt my.plt --apps compiler
```

+ **检查 PLT 一致性**：当代码发生更改后，可以使用以下命令来确保 PLT 一致性：

```plain
bash


复制代码
dialyzer --check_plt --plt my.plt
```

**获取 PLT 信息**

要查看 PLT 的信息，可以使用 `--plt_info` 命令：

```plain
bash


复制代码
dialyzer --plt_info --plt my.plt
```

#### Dialyzer 类型推断示例
1. **参数不重叠的示例**：

假设你有以下代码：

```plain
erlang


复制代码
-spec foo(boolean()) -> string().
foo(N) -> integer_to_list(N).
```

Dialyzer 推断 `foo/1` 的类型是 `integer() -> string()`，但函数规范声明它是 `boolean() -> string()`。由于这两者不重叠，Dialyzer 会发出警告：

```plain
php


复制代码
some_module.erl:7:2: Invalid type specification for function some_module:foo/1.
The success typing is some_module:foo
      (integer()) -> string()
But the spec is some_module:foo
      (boolean()) -> string()
They do not overlap in the 1st argument
```

2. **返回值不重叠的示例**：

另一个例子是返回值类型不匹配：

```plain
erlang


复制代码
-spec bar(a | b) -> atom().
bar(a) -> <<"a">>;
bar(b) -> <<"b">>.
```

Dialyzer 会推断返回值类型是二进制（`binary()`），而规范要求返回值为 `atom()`。因此，Dialyzer 会发出警告：

```plain
rust


复制代码
some_module.erl:11:2: Invalid type specification for function some_module:bar/1.
The success typing is some_module:bar
      ('a' | 'b') -> <<_:8>>
But the spec is some_module:bar
      ('a' | 'b') -> atom()
The return types do not overlap
```

3. **规范和推断类型的交集**：

假设你有以下规范和实现：

```plain
erlang


复制代码
-spec baz(a | b) -> non_neg_integer().
baz(b) -> -1;
baz(c) -> 0;
baz(d) -> 1.
```

Dialyzer 会推断 `baz/1` 的类型是 `b | c | d -> -1 | 0 | 1`。由于函数规范要求返回 `non_neg_integer()`，交集是 `0 | 1`。在这种情况下，Dialyzer 会信任规范并将返回类型限制为 `0 | 1`。

如果后续代码调用：

```plain
erlang


复制代码
call_baz1(A) -> case baz(A) of
    -1 -> negative;
    0 -> zero;
    1 -> positive
end.
```

由于 `baz/1` 只会返回 `0` 或 `1`，Dialyzer 会警告：

```plain
lua


复制代码
some_module.erl:25:9: The pattern
      -1 can never match the type
      0 | 1
```

### 使用Dialyzer的好处
1. **早期发现错误**：Dialyzer 可以在开发阶段通过静态分析提前发现潜在的错误，而不需要运行程序。
2. **无需完整的类型注解**：即使没有提供完整的类型规格，Dialyzer 也能推断出类型并识别问题。
3. **跨模块分析**：它可以分析整个代码库，发现跨模块的数据流问题和潜在的运行时错误。

### 总结
Dialyzer 是 Erlang 中强大的静态分析工具，适用于查找潜在的类型错误、死代码和冗余测试。通过使用 PLT 和函数规格，Dialyzer 能够提供深入的分析，帮助开发人员提高代码质量并减少运行时错误。对于没有强制要求的类型注解，它仍然能够通过推断提供有用的警告。































