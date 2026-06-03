---
title: "2026-Pwn2Own"
date: 2026-06-03
categories: [Report]
tags:
  - Pwn2Own
---

## Key Notes：
+ In Pwn2Own Berlin, researchers found unique 0 day across ten targets categories, with payouts totaling US$1,298,250, a new event record
+ AI sub-categories(coding Agents, Local Inference, AI Databases, NVIDIA)dominated the first day. Products including OPENAI Codex , LiteLLM, LM studio, and NVIDIA Megatron Bridge all fell, each exploited at the boundary where the AI product unconditionally trusts an external tool or protoclo (the "trust boundary" problem)
+ classic enterprise bugs persisted. Microsoft Exchange(system rce), sharepoint(pre-authentication RCE), and Edge(four-bug sandbox escape) all fell to well-understood vulnerability classes. Vmware ESXI produced a cross-tenant guest-to-host escape with multi-tenant infrastructure implications.
+ TrendAI shipped nine TrendAI TippingPoint filters by May 19(ahead of venfor patches), covering LiteLLM, EDGE, Exchange, and SharePoint vulnerabilities. Endpoint-layer detection via TrendAI Vision One is the recommended control for AI-category vulnerabilities where wire-level inspection is not viable.





## The leaderboard
The DEVCORE Research Team tool the master of pwn title decisively, with 50.5 points and US$505,000 in prize money.

STARLabs SG finished second with 25 points and US$242,500, and Out f Bounds claimed third with 12.75 points and US$95,750 

