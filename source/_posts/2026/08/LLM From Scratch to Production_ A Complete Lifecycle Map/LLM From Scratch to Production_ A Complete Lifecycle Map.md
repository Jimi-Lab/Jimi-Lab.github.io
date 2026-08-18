---
title: "LLM From Scratch to Production_ A Complete Lifecycle Map"
date: 2026-08-12
categories: [Report]
tags:
  - AI
  - LLM
  - Lifecycle Map
---





## LLM From Scratch to Production: A Complete Lifecycle Map  

```plain

================================================================================
                     从 0 到可部署 LLM：完整生命周期
================================================================================


┌─────────────────────────────────────────────────────────────────────────────┐
│ 0. 目标定义 / Scaling Planning                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 决定：                                                                      │
│                                                                             │
│ • 模型用途：通用 / Code / Math / Security / Agent / Multilingual           │
│ • Dense 还是 MoE                                                           │
│ • 目标参数规模：1B / 7B / 32B / 70B / 200B+                               │
│ • 训练 Token Budget                                                        │
│ • Context Length                                                           │
│ • GPU / 训练 FLOPs / 时间 / 成本预算                                       │
│ • 数据规模和数据配比                                                       │
│                                                                             │
│ 常通过小模型实验 + Scaling Law 决定最终 recipe                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼

================================================================================
                            第一阶段：DATA
================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. 原始数据采集 Raw Data Collection                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Web Crawl                                                                   │
│ Books                                                                       │
│ Wikipedia                                                                   │
│ Papers                                                                      │
│ GitHub / Source Code                                                        │
│ StackOverflow / Forums                                                      │
│ Math / STEM                                                                 │
│ 多语言语料                                                                  │
│ 对话数据                                                                    │
│ 合成数据 Synthetic Data                                                    │
│ 专业领域数据                                                                │
│                                                                             │
│                     ↓ Raw Corpus                                            │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. 数据清洗 / Curating                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ① 格式清洗                                                                  │
│    HTML / JS / Boilerplate 删除                                             │
│    Unicode Normalize                                                        │
│    Language Detection                                                       │
│                                                                             │
│ ② 去重 Deduplication                                                        │
│    Exact Dedup                                                              │
│    Near Dedup                                                               │
│    Semantic Dedup                                                           │
│                                                                             │
│ ③ 质量过滤 Quality Filtering                                               │
│    Heuristic Filter                                                         │
│    Classifier / LLM Quality Score                                           │
│                                                                             │
│ ④ 内容过滤                                                                  │
│    Spam                                                                     │
│    NSFW                                                                     │
│    Malware / Low-quality                                                    │
│                                                                             │
│ ⑤ 隐私与合规                                                                │
│    PII                                                                      │
│    License                                                                  │
│    Copyright                                                                │
│                                                                             │
│ ⑥ Benchmark Decontamination                                                 │
│    防止测试集泄漏到训练集                                                   │
│                                                                             │
│ ⑦ Data Mixture                                                             │
│    Web : Code : Math : Academic : Multilingual : ...                        │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
                             Curated Corpus

================================================================================
                        第二阶段：TOKEN REPRESENTATION
================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. Tokenizer                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Curated Text                                                                │
│      │                                                                      │
│      ▼                                                                      │
│ 训练 / 选择 Tokenizer                                                      │
│                                                                             │
│ BPE / SentencePiece / Unigram 等                                            │
│                                                                             │
│ 决定：                                                                      │
│ • Vocabulary Size                                                          │
│ • Special Tokens                                                           │
│ • BOS / EOS / PAD                                                           │
│ • Chat Control Tokens                                                       │
│                                                                             │
│ 文本                                                                        │
│ "我喜欢打篮球"                                                             │
│      ↓                                                                      │
│ Tokens                                                                      │
│ ["我","喜欢","打","篮球"]                                                   │
│      ↓                                                                      │
│ Token IDs                                                                   │
│ [1234, 8123, 726, 19283]                                                    │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. Pretraining Dataset Construction                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Token IDs                                                                   │
│      ↓                                                                      │
│ Sequence Packing                                                            │
│      ↓                                                                      │
│ 固定训练长度，例如 4K / 8K tokens                                          │
│      ↓                                                                      │
│ Shuffle                                                                     │
│      ↓                                                                      │
│ Batch / Micro-batch                                                         │
│      ↓                                                                      │
│ Train / Validation Split                                                    │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼

================================================================================
                         第三阶段：MODEL DESIGN
================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. 定义模型架构 Model Architecture                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Decoder-only Transformer                                                    │
│                                                                             │
│ ├── Vocabulary Size                                                        │
│ ├── Number of Layers                  32 / 80 / ...                         │
│ ├── Hidden Size                       d_model                               │
│ ├── Attention Heads                                                        │
│ ├── KV Heads                           MHA / GQA / MQA                      │
│ ├── Head Dimension                                                          │
│ ├── FFN Intermediate Size                                                   │
│ ├── Activation                         SwiGLU / GELU                        │
│ ├── Normalization                      RMSNorm                             │
│ ├── Positional Encoding                RoPE                                │
│ ├── Context Length                                                          │
│ ├── Dense / MoE                                                             │
│ │      ├── Number of Experts                                               │
│ │      ├── Top-K Experts                                                   │
│ │      └── Router                                                          │
│ └── Weight Tying / LM Head                                                  │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼

┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. 创建并初始化全部 Trainable Parameters                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Embedding Matrix                                                            │
│                                                                             │
│ Layer 0                                                                     │
│ ├── Wq⁰                                                                     │
│ ├── Wk⁰                                                                     │
│ ├── Wv⁰                                                                     │
│ ├── Wo⁰                                                                     │
│ ├── FFN W1⁰ W2⁰ W3⁰                                                       │
│ └── Norm Parameters                                                        │
│                                                                             │
│ Layer 1                                                                     │
│ ├── Wq¹ Wk¹ Wv¹ Wo¹                                                       │
│ └── FFN                                                                     │
│                                                                             │
│ ...                                                                         │
│                                                                             │
│ Layer N                                                                     │
│                                                                             │
│ LM Head                                                                     │
│                                                                             │
│ Dense：普通 FFN                                                             │
│ MoE：Router Weight + N 套 Expert FFN Weights                               │
│                                                                             │
│ 此时这些 Weight 基本还是随机初始化 → 模型什么都不会                        │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼


================================================================================
                       第四阶段：PRETRAINING
================================================================================


                          一批 Token IDs
                                │
                                ▼
                         Embedding Lookup
                                │
                                ▼
                               X⁰
                                │
                                ▼
                  ┌─────────────────────────┐
                  │ Transformer Layer 0     │
                  │                         │
                  │ X × Wq⁰ → Q            │
                  │ X × Wk⁰ → K            │
                  │ X × Wv⁰ → V            │
                  │                         │
                  │ Q,K,V                   │
                  │   ↓                     │
                  │ Causal Attention        │
                  │   ↓                     │
                  │ × Wo                    │
                  │   ↓                     │
                  │ Residual + Norm         │
                  │   ↓                     │
                  │ FFN                     │
                  │ W1 W2 W3                │
                  │   ↓                     │
                  │ Residual                │
                  └────────────┬────────────┘
                               │
                               ▼
                              X¹
                               │
                               ▼
                          Layer 1
                               │
                              ...
                               │
                               ▼
                          Layer N
                               │
                               ▼
                       Final Hidden States
                               │
                               ▼
                           LM Head
                               │
                               ▼
                            Logits


================================================================================
            第五阶段：Loss → Backward → Optimizer
================================================================================

                     FORWARD
                        │
                        ▼
                     Logits
                        │
                        ▼
              Softmax / Cross Entropy
                        │
                        ▼
                       Loss
                        │
                        │
====================== BACKWARD ==============================================
                        │
                        ▼

                  ∂L / ∂LMHead
                        ↑
                  ∂L / ∂Layer N
                        ↑
                        ...
                        ↑
                  ∂L / ∂Layer 1
                        ↑
                  ∂L / ∂Layer 0
                        ↑
                  ∂L / ∂Embedding

                        │
                        ▼
             每个 trainable parameter
                 得到 Gradient
                        │
                        ▼
                    Optimizer
                 Adam / AdamW ...
                        │
                        ▼

              更新所有 Trainable Weights

                   简化理解：

              W ← W - η ∂L/∂W

                        │
                        ▼
              Learning-rate Schedule
                        │
                        ▼
                 下一 Micro/Batch
                        │
                        ▼
              再次 Forward...


================================================================================
                     第六阶段： DISTRIBUTED TRAINING SYSTEM
================================================================================

                          大模型
                            │
          ┌─────────────────┼──────────────────┐
          ▼                 ▼                  ▼
     Data Parallel     Tensor Parallel    Pipeline Parallel
       DP / FSDP             TP                  PP
          │                  │                   │
          └──────────────────┼───────────────────┘
                             │
                       Sequence Parallel
                       Expert Parallel
                         (for MoE)
                             │
                             ▼
                       Thousands GPUs

GPU
│
├── Parameters
├── Gradients
├── Optimizer States
├── Activations
└── Communication Buffers



Training Step
    │
    ├──────────────► Training Loss
    │
    ├──────────────► Validation Loss
    │
    ├──────────────► Learning Rate
    │
    ├──────────────► Gradient Norm
    │
    ├──────────────► Throughput
    │
    └──────────────► GPU Utilization
    │
    ▼

每 N steps
    │
    ├── Save Checkpoint
    └── Evaluation

    
================================================================================
                           第七阶段：BASE MODEL
================================================================================

          海量 Raw Text
                │
                ↓
           Pretraining
                │
                ↓

      ┌────────────────────────┐
      │       Base LLM         │
      │                        │
      │ 会语言                 │
      │ 有世界知识             │
      │ 会一定程度代码         │
      │ 会一定程度推理         │
      │                        │
      │ 但未必善于聊天         │
      │ 未必听指令             │
      │ 未必安全               │
      └────────────────────────┘
      




================================================================================
                 第八阶段:MID-TRAINING / CONTINUED PRETRAINING
================================================================================

Base Model
   │
   ├── Domain Continued Pretraining
   │      Code / Security / Medical / Math
   │
   ├── Knowledge-intensive Training
   │
   ├── Long-context Training
   │
   ├── Context Extension
   │
   ├── Multilingual Enhancement
   │
   └── Reasoning-oriented Data
            │
            ▼
       Stronger Base Model



================================================================================
                       第九阶段：POST-TRAINING DATA
================================================================================

                   Prompt / Instruction
                           │
        ┌──────────────────┼─────────────────────┐
        ▼                  ▼                     ▼
 Human Written        Synthetic Data       Model-generated
        │                  │                     │
        ▼                  ▼                     ▼
 Instructions        Reasoning Traces        Responses
        │                  │                     │
        └──────────────────┼─────────────────────┘
                           ▼
                       Filtering
                           │
                           ▼
                     Quality Checking
                           │
                           ▼
                 Instruction Dataset


同时可能构造：

Prompt
  │
  ├── Response A
  └── Response B
          │
          ▼
 Human / Judge Preference
          │
          ▼
 Preferred / Rejected Dataset





 ================================================================================
                          第十阶段：POST-TRAINING
================================================================================


                         Base Model
                             │
                             ▼

                 ┌────────────────────┐
                 │ SFT                │
                 │ Supervised         │
                 │ Fine-Tuning        │
                 └─────────┬──────────┘
                           │
                           ▼
                     Instruct Model
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼

     Preference Alignment          Reasoning Training

     DPO / IPO / ORPO ...          SFT Reasoning Trace
             │                           │
             ▼                           ▼
     Preference Model                  RL / RLVR
             │                      GRPO/PPO/... 
             │                           │
             └─────────────┬─────────────┘
                           │
                           ▼
                      Aligned Model

                           │
                           ▼
                    General / Safety RL



================================================================================
                         第十一阶段：Safety Alignment
================================================================================

Training-side
│
├── Safety SFT
├── Preference Alignment
├── Safety RL
├── Adversarial Data
└── Refusal / Helpfulness balancing


Model-side
│
├── Safety Model / Guard Model
├── Input Moderation
└── Output Moderation


Evaluation-side
│
├── Jailbreak
├── Prompt Injection
├── Harmful Content
├── Privacy
├── Memorization
├── Bias
└── Red Teaming






================================================================================
                         第十二阶段：EVALUATION
================================================================================

Capability
├── Knowledge
├── Math
├── Coding
├── Reasoning
├── Science
├── Multilingual
├── Long Context
└── Instruction Following


Alignment
├── Helpfulness
├── Safety
├── Truthfulness
└── Refusal Quality


Agent
├── Tool Use
├── Function Calling
├── Web
├── Coding Agent
└── Long-horizon Tasks


Systems
├── Throughput
├── TTFT
├── TPOT
├── Latency
├── VRAM
└── Cost


Robustness / Security
├── Jailbreak
├── Prompt Injection
├── Data Leakage
├── Backdoor
├── Model Extraction
└── Runtime Attacks



================================================================================
                        第十三阶段：MODEL ARTIFACT
================================================================================

训练后的参数
    │
    ▼
Checkpoint Conversion
    │
    ▼

model.safetensors
config.json
tokenizer.json
tokenizer_config.json
generation_config.json
chat_template
...
    │
    ▼
Model Repository




================================================================================
                     第十四阶段：INFERENCE OPTIMIZATION
================================================================================

Final Model
    │
    ├── Precision
    │    FP32
    │    BF16
    │    FP16
    │    FP8
    │
    ├── Quantization
    │    INT8
    │    INT4
    │    GPTQ
    │    AWQ
    │    GGUF
    │
    ├── Model Compression
    │    Distillation
    │    Pruning
    │
    ├── Kernel Optimization
    │    FlashAttention
    │    Fused Kernels
    │
    └── Distributed Inference
         Tensor Parallel
         Pipeline Parallel
         Expert Parallel



================================================================================
                         第十五阶段：LLM SERVING
================================================================================

                    Client Request
                          │
                          ▼
                   API / Scheduler
                          │
                          ▼
                     Tokenizer
                          │
                          ▼
                    Token IDs
                          │
                          ▼
                  ┌─────────────────┐
                  │   GPU Runtime   │
                  │                 │
                  │ Model Weights   │
                  │ KV Cache        │
                  │ Activations     │
                  │ CUDA Kernels    │
                  └────────┬────────┘
                           │
                           ▼
                        Logits
                           │
                           ▼
                 Sampling / Decoding
                           │
                           ▼
                      Next Token
                           │
                           └─────┐
                                 │
                          Autoregressive
                             Loop

Serving Engine：                             
  vLLM
  SGLang
  TensorRT-LLM
  llama.cpp
  Transformers
  ...


Serving Optimization：
    Requests
       │
       ▼
    Scheduler
       │
       ├── Continuous Batching
       │
       ├── Prefix Caching
       │
       ├── KV Cache Management
       │
       ├── Paged Attention
       │
       ├── Speculative Decoding
       │
       └── Pre-fill / Decode Optimization
       │
       ▼
    GPU(s)




================================================================================
                       第十六阶段：PRODUCTION / LLMOps
================================================================================

Model
  │
  ▼
Deploy
  │
  ▼
Monitor
  │
  ├── Latency
  ├── Cost
  ├── GPU Utilization
  ├── Failure Rate
  ├── Quality
  ├── Safety incidents
  ├── Abuse
  └── Distribution Drift
  │
  ▼
Collect Feedback
  │
  ▼
New Data
  │
  ▼
SFT / RL / Continued Training
  │
  └────────────────────────────► New Model Version
```

