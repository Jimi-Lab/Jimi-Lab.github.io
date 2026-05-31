---
title: "AIxCC总览"
date: 2026-01
categories: [Report]
tags:
  - AIXCC
---

## AIxCC
[https://www.darpa.mil/research/programs/ai-cyber](https://www.darpa.mil/research/programs/ai-cyber)

[https://aicyberchallenge.com/](https://aicyberchallenge.com/)



ASC 比赛

AFC 比赛



网络系统推理结构

[https://github.com/AIxCyberChallenge/example-crs-architecture](https://github.com/AIxCyberChallenge/example-crs-architecture)







每个决赛队伍的获奖视频

[https://www.youtube.com/@ctfradiooo](https://www.youtube.com/@ctfradiooo)



全部获奖的开源项目：

[https://archive.aicyberchallenge.com/](https://archive.aicyberchallenge.com/)



团队的路演介绍：

[https://aicyberchallenge.com/finalist-teams/](https://aicyberchallenge.com/finalist-teams/)





<!-- 这是一张图片，ocr 内容为： -->
![](img/1-89d337b1.png)





<!-- 这是一张图片，ocr 内容为： -->
![](img/2-92a48a7a.png)



<!-- 这是一张图片，ocr 内容为： -->
![](img/3-671da4ae.png)



<!-- 这是一张图片，ocr 内容为： -->
![](img/4-f2ef09de.png)





每个团队的优缺点

[https://blog.trailofbits.com/2025/08/07/aixcc-finals-tale-of-the-tape/](https://blog.trailofbits.com/2025/08/07/aixcc-finals-tale-of-the-tape/)



决赛队伍解析

[https://blog.csdn.net/weixin_42016744/article/details/151661395](https://blog.csdn.net/weixin_42016744/article/details/151661395)







| <font style="color:black;">排名</font> | <font style="color:black;">系统</font> | <font style="color:black;">团队</font> | <font style="color:black;">路线</font> | <font style="color:black;">亮点</font> | <font style="color:black;">缺点</font> | <font style="color:black;">结果</font> |
| :---: | :---: | :---: | --- | --- | --- | --- |
| <font style="color:black;">1</font> | <font style="color:black;">Atlantis</font> | <font style="color:black;">Team Atlanta</font> | <font style="color:black;">混合式架构，将传统程序分析、定向模糊测试、语言特化模型和多组件集成结合起来</font> | <font style="color:black;">1.</font><font style="color:black;">唯一</font><font style="color:black;">一支使用在 </font><font style="color:black;">Llama 7B </font><font style="color:black;">上使用</font><font style="color:black;">经过</font><font style="color:black;">fine-tune</font><font style="color:black;">的</font><font style="color:black;">定制模型，并专门针对 </font><font style="color:black;">C </font><font style="color:black;">语言进行</font><font style="color:black;">大量微调；</font><br/><font style="color:black;">2.</font><font style="color:black;">对</font><font style="color:black;">不同语言与任务采用不同 </font><font style="color:black;">PoV</font><font style="color:black;">生成策略，例如定向模糊测试、</font><font style="color:black;">LLM </font><font style="color:black;">生成定制 </font><font style="color:black;">mutator</font><font style="color:black;">、输入字典等；</font><br/><font style="color:black;">3.</font><font style="color:black;">强调</font><font style="color:black;">多模块集成（</font><font style="color:black;">ensembling</font><font style="color:black;">），通过多路分析引擎提升鲁棒性和多样性；</font><br/><font style="color:black;">4.</font><font style="color:black;">在</font><font style="color:black;">补丁提交上采取保守策略，只在 </font><font style="color:black;">PoV</font><font style="color:black;">与补丁形成高置信匹配时</font><font style="color:black;">提交。</font> | <font style="color:black;">1.</font><font style="color:black;">系统工程</font><font style="color:black;">复杂度高，多组件集成、模型微调、定向分析都会提升实现和维护</font><font style="color:black;">成本；</font><br/><font style="color:black;">2.</font><font style="color:black;">高度</font><font style="color:black;">依赖系统稳定性与工程质量，任何一个环节失效都可能拖累整体</font><font style="color:black;">效果；</font><br/><font style="color:black;">3.</font><font style="color:black;">保守</font><font style="color:black;">补丁策略虽然能保证准确率，但可能错过高风险高收益的</font><font style="color:black;">机会；</font><br/><font style="color:black;">4.</font><font style="color:black;">专门</font><font style="color:black;">针对 </font><font style="color:black;">C </font><font style="color:black;">分析优化的策略，在跨语言泛化上未必同样</font><font style="color:black;">强势；</font><br/><font style="color:black;">5.</font><font style="color:black;">对</font><font style="color:black;">模型、分析器、编排器之间的协同要求极高，调参成本</font><font style="color:black;">很大。</font> | <font style="color:black;">总分：</font><font style="color:black;">392.76</font><br/><font style="color:black;">漏洞发现数量：</font><font style="color:black;">43</font><br/><font style="color:black;">成功补丁数量：</font><font style="color:black;">31</font> |
| <font style="color:black;">2</font> | <font style="color:black;">Buttercup</font> | <font style="color:black;">Trail of Bits</font> | <font style="color:black;">典型的“传统安全工具 </font><font style="color:black;">+ AI </font><font style="color:black;">增强”路线代表</font> | <font style="color:black;">1.</font><font style="color:black;">以</font><font style="color:black;">传统模糊测试、静态分析和漏洞研究方法为</font><font style="color:black;">骨架；</font><br/><font style="color:black;">2.</font><font style="color:black;">利用 </font><font style="color:black;">LLM </font><font style="color:black;">生成高质量 </font><font style="color:black;">seed input </font><font style="color:black;">或 </font><font style="color:black;">Python </font><font style="color:black;">输入生成程序，帮助 </font><font style="color:black;">fuzzing </font><font style="color:black;">更快触达复杂</font><font style="color:black;">路径；</font><br/><font style="color:black;">3.</font><font style="color:black;">通过 </font><font style="color:black;">AI </font><font style="color:black;">理解复杂输入格式，如 </font><font style="color:black;">SQL</font><font style="color:black;">、</font><font style="color:black;">URL</font><font style="color:black;">、路径遍历类</font><font style="color:black;">输入；</font><br/><font style="color:black;">4.</font><font style="color:black;">把 </font><font style="color:black;">AI </font><font style="color:black;">生成的语义化输入纳入 </font><font style="color:black;">coverage-guided fuzzing </font><font style="color:black;">的</font><font style="color:black;">语料库；</font><br/><font style="color:black;">5.</font><font style="color:black;">对 </font><font style="color:black;">PoV</font><font style="color:black;">和补丁进行交叉验证，避免提交低质量</font><font style="color:black;">结果；</font><br/><font style="color:black;">6.</font><font style="color:black;">补丁</font><font style="color:black;">策略偏保守，不轻易提交没有 </font><font style="color:black;">PoV</font><font style="color:black;">支撑的</font><font style="color:black;">修复。</font> | <font style="color:black;">1.</font><font style="color:black;">对 </font><font style="color:black;">fuzzing </font><font style="color:black;">仍然有较强依赖，若目标程序不适合 </font><font style="color:black;">fuzzing</font><font style="color:black;">，效果可能</font><font style="color:black;">受限；</font><br/><font style="color:black;">2.LLM </font><font style="color:black;">更多承担增强角色，而不是完整推理闭环，因此在某些深层语义漏洞上可能不如 </font><font style="color:black;">AI-first </font><font style="color:black;">路线</font><font style="color:black;">激进；</font><br/><font style="color:black;">3.AI </font><font style="color:black;">生成高质量 </font><font style="color:black;">seed </font><font style="color:black;">的效果，仍依赖 </font><font style="color:black;">prompt</font><font style="color:black;">、模型能力和目标格式复杂</font><font style="color:black;">度；</font><br/><font style="color:black;">4.</font><font style="color:black;">保守</font><font style="color:black;">提交策略提高准确率，但可能牺牲部分进攻性</font><font style="color:black;">得分；</font><br/><font style="color:black;">5.</font><font style="color:black;">系统</font><font style="color:black;">整体效率依赖良好的 </font><font style="color:black;">fuzz harness </font><font style="color:black;">和覆盖率反馈，工程门槛不</font><font style="color:black;">低。</font> | <font style="color:black;">总分：</font><font style="color:black;">219.35</font><br/><font style="color:black;">漏洞发现数量：</font><font style="color:black;">28</font><br/><font style="color:black;">成功补丁数量：</font><font style="color:black;">19</font> |
| <font style="color:black;">3</font> | <font style="color:black;">RoboDuck</font> | <font style="color:black;">Theori</font> | <font style="color:black;">“LLM-first”</font><font style="color:black;">路线</font> | <font style="color:black;">1.</font><font style="color:black;">以 </font><font style="color:black;">LLM agent </font><font style="color:black;">作为主要推理引擎；</font><br/><font style="color:black;">2.</font><font style="color:black;">让 </font><font style="color:black;">agent </font><font style="color:black;">按照逆向分析工作流推进，但对 </font><font style="color:black;">agent </font><font style="color:black;">行为做强约束，避免“乱跑”；</font><br/><font style="color:black;">3.</font><font style="color:black;">使用静态分析工具（如 </font><font style="color:black;">Infer</font><font style="color:black;">）先生成大量 </font><font style="color:black;">bug candidate</font><font style="color:black;">；</font><br/><font style="color:black;">4.</font><font style="color:black;">再由 </font><font style="color:black;">LLM agent </font><font style="color:black;">进行语义判断，筛掉误报并聚焦真实漏洞；</font><br/><font style="color:black;">5.</font><font style="color:black;">在 </font><font style="color:black;">PoV</font><font style="color:black;">生成上依赖 </font><font style="color:black;">LLM </font><font style="color:black;">的语义理解能力，尤其适合复杂格式输入；</font><br/><font style="color:black;">6.AI </font><font style="color:black;">生成失败时，再把失败样本转化为 </font><font style="color:black;">fuzzing seed</font><font style="color:black;">，形成反馈闭环；</font><br/><font style="color:black;">7.</font><font style="color:black;">在补丁策略上比前两名更激进，甚至允许在没有 </font><font style="color:black;">PoV</font><font style="color:black;">的情况下按策略提交补丁。</font> | <font style="color:black;">1.LLM-first </font><font style="color:black;">架构天然面临稳定性和可重复性问题；</font><br/><font style="color:black;">2.</font><font style="color:black;">静态分析候选很多，若 </font><font style="color:black;">LLM </font><font style="color:black;">过滤效果不稳定，误报仍可能很高；</font><br/><font style="color:black;">3.</font><font style="color:black;">过于依赖大模型的语义推理能力，对 </font><font style="color:black;">prompt</font><font style="color:black;">、上下文构造、模型质量非常敏感；</font><br/><font style="color:black;">4.</font><font style="color:black;">激进补丁策略可能带来准确率惩罚；</font><br/><font style="color:black;">5.</font><font style="color:black;">在复杂仓库级分析中，</font><font style="color:black;">LLM </font><font style="color:black;">成本、上下文窗口、并发调度都可能成为瓶颈。</font> | <font style="color:black;">总分：</font><font style="color:black;">210.68</font><br/><font style="color:black;">漏洞发现数量：</font><font style="color:black;">34</font><br/><font style="color:black;">成功补丁数量：</font><font style="color:black;">20</font> |
| <font style="color:black;">4</font> | <font style="color:black;">All You Need IS A Fuzzing Brain</font> | <font style="color:black;">All You Need IS A Fuzzing Brain</font> | <font style="color:black;">“LLM-first”</font><font style="color:black;">路线</font> | <font style="color:black;">1.LLM </font><font style="color:black;">被用作主要推理引擎；</font><br/><font style="color:black;">2.</font><font style="color:black;">系统将 </font><font style="color:black;">LLM </font><font style="color:black;">用于漏洞分析、系统决策和代码生成；</font><br/><font style="color:black;">3.Trail of Bits </font><font style="color:black;">的文章提到，该队约 </font><font style="color:black;">`90%` </font><font style="color:black;">的 </font><font style="color:black;">PoV</font><font style="color:black;">通过 </font><font style="color:black;">AI reasoning </font><font style="color:black;">生成；</font><br/><font style="color:black;">4.</font><font style="color:black;">当 </font><font style="color:black;">AI </font><font style="color:black;">方法失败时，传统 </font><font style="color:black;">fuzzing </font><font style="color:black;">用作 </font><font style="color:black;">fallback </font><font style="color:black;">机制。</font> | <font style="color:black;">1.</font><font style="color:black;">路线高度依赖 </font><font style="color:black;">AI </font><font style="color:black;">推理；</font><br/><font style="color:black;">2.</font><font style="color:black;">系统仍保留 </font><font style="color:black;">fuzzing </font><font style="color:black;">作为 </font><font style="color:black;">fallback</font><font style="color:black;">，说明 </font><font style="color:black;">AI </font><font style="color:black;">路线本身并非完全覆盖所有场景。</font> | <font style="color:black;">总分：</font><font style="color:black;">153.70</font><br/><font style="color:black;">漏洞发现数量：</font><font style="color:black;">28</font><br/><font style="color:black;">成功补丁数量：</font><font style="color:black;">14</font> |
| <font style="color:black;">5</font> | <font style="color:black;">ARTIPHISHELL</font> | <font style="color:black;">Shellphish</font> | <font style="color:black;">“传统能力 </font><font style="color:black;">+ AI </font><font style="color:black;">增强”的代表，但更强调 </font><font style="color:black;">fuzzing </font><font style="color:black;">侧的强化。</font> | <font style="color:black;">1.</font><font style="color:black;">以 </font><font style="color:black;">fuzzing </font><font style="color:black;">为核心基础</font><font style="color:black;">设施；</font><br/><font style="color:black;">2.</font><font style="color:black;">利用</font><font style="color:black;">名为 </font><font style="color:black;">`Grammar Guy` </font><font style="color:black;">的模块，让 </font><font style="color:black;">LLM </font><font style="color:black;">生成和演化渐进式 </font><font style="color:black;">grammar</font><font style="color:black;">；</font><br/><font style="color:black;">3.</font><font style="color:black;">根据</font><font style="color:black;">覆盖率反馈持续改进 </font><font style="color:black;">grammar</font><font style="color:black;">，使其更适合复杂输入格式和</font><font style="color:black;">协议；</font><br/><font style="color:black;">4.</font><font style="color:black;">通过 </font><font style="color:black;">AI </font><font style="color:black;">解决传统变异式 </font><font style="color:black;">fuzzing </font><font style="color:black;">对复杂结构化输入不够敏感的</font><font style="color:black;">问题；</font><br/><font style="color:black;">5.</font><font style="color:black;">在</font><font style="color:black;">补丁策略上偏保守，不提交无 </font><font style="color:black;">PoV</font><font style="color:black;">支撑的</font><font style="color:black;">补丁。</font> | <font style="color:black;">1.</font><font style="color:black;">仍</font><font style="color:black;">较依赖 </font><font style="color:black;">fuzzing </font><font style="color:black;">主线，对深层逻辑漏洞未必总有</font><font style="color:black;">优势；</font><br/><font style="color:black;">2.Grammar </font><font style="color:black;">生成虽强，但会消耗大量 </font><font style="color:black;">LLM </font><font style="color:black;">预算；</font><br/><font style="color:black;">3.</font><font style="color:black;">对</font><font style="color:black;">复杂 </font><font style="color:black;">grammar </font><font style="color:black;">的演化过程可能较慢，且质量波动受模型输出</font><font style="color:black;">影响；</font><br/><font style="color:black;">4.</font><font style="color:black;">补丁</font><font style="color:black;">策略较保守，得分上可能不如更激进的</font><font style="color:black;">队伍；</font><br/><font style="color:black;">5.</font><font style="color:black;">把 </font><font style="color:black;">CTF </font><font style="color:black;">经验迁移到大规模真实代码库时，仍需要额外工程</font><font style="color:black;">打磨。</font> | <font style="color:black;">总分：</font><font style="color:black;">135.89</font><br/><font style="color:black;">漏洞发现数量：</font><font style="color:black;">28</font><br/><font style="color:black;">成功补丁数量：</font><font style="color:black;">11</font> |
| <font style="color:black;">6</font> | <font style="color:black;">BugBuster</font> | <font style="color:black;">42-b3yond-6ug</font> | <font style="color:black;">“混合路线 </font><font style="color:black;">+ LLM </font><font style="color:black;">驱动补丁创新”</font> | <font style="color:black;">1.</font><font style="color:black;">以集成工具链形式运行，</font><font style="color:black;">LLM agent </font><font style="color:black;">负责检测、分析和修复；</font><br/><font style="color:black;">2.</font><font style="color:black;">保留传统 </font><font style="color:black;">fuzzing </font><font style="color:black;">作为 </font><font style="color:black;">PoV</font><font style="color:black;">生成核心；</font><br/><font style="color:black;">3.</font><font style="color:black;">结合静态分析报告与 </font><font style="color:black;">SARIF </font><font style="color:black;">机制做验证；</font><br/><font style="color:black;">4.</font><font style="color:black;">采用多 </font><font style="color:black;">fuzzer</font><font style="color:black;">协同和强化学习调度；</font><br/><font style="color:black;">5.</font><font style="color:black;">其最有代表性的技术是“</font><font style="color:black;">super patches”</font><font style="color:black;">，即一个补丁同时修复多个看似无关的漏洞；</font><br/><font style="color:black;">6.</font><font style="color:black;">系统能够识别多个 </font><font style="color:black;">crash </font><font style="color:black;">背后的共同根因，并尝试一次性修补。</font> | <font style="color:black;">1.“super patch” </font><font style="color:black;">很有想象力，但风险也高，修复范围越大，越容易引入副作用；</font><br/><font style="color:black;">2.</font><font style="color:black;">一次修多个漏洞，对根因分析准确性要求极高；</font><br/><font style="color:black;">3.</font><font style="color:black;">多工具链协同会提升系统复杂度和维护难度；</font><br/><font style="color:black;">4.</font><font style="color:black;">强化学习调度、多 </font><font style="color:black;">fuzzer</font><font style="color:black;">编排等能力虽然先进，但也增加工程调试成本；</font><br/><font style="color:black;">5.</font><font style="color:black;">如果补丁过于泛化，可能影响程序原有行为，导致功能正确性问题。</font> | <font style="color:black;">总分：</font><font style="color:black;">105.03</font><br/><font style="color:black;">漏洞发现数量：</font><font style="color:black;">41</font><br/><font style="color:black;">成功补丁数量：</font><font style="color:black;">3</font> |








