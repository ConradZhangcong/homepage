# Homepage Roadmap

> **WHAT 层**：每个 Phase 的目标、交付物、Definition of Done。
> WHY 看 `docs/decisions/`。
> 进度看 `MEMORY.md`。
>
> **原则：每个 Phase 有硬性 DoD，不满足不得进下一 Phase。**

---

## 🔴 开发节奏纪律（每次完工必跑）

每完成一项工作，同一轮里必须完成以下相关项：

| # | 文档 | 何时必更 | 更新内容 |
|---|------|---------|---------|
| 1 | `MEMORY.md` | **永远** | 当前状态 + 下一步勾选 + 已完成纪要 |
| 2 | `ROADMAP.md` | 涉及 Phase 进度时 | 当前状态表 + 对应 Phase 子项打勾 |
| 3 | 相关 ADR | 决策有调整时 | 追加修订历史（不改原文） |
| 4 | `docs/anti-patterns.md` | 踩到坑时 | 反模式 + 正确做法 |

**未跑清单 = 本次工作未关门。**

---

## 当前状态

| 项 | 值 |
|---|---|
| 当前 Phase | **Phase 2 · 生长叙事重设计（已完成）** |
| 下一 Phase | 待规划 |
| 上线版本 | 未上线 |
| 最后更新 | 2026-08-01 |

---

## Phase 总览

| Phase | 名称 | 状态 | 时长（预估） | 前置 |
|-------|------|------|-----------|------|
| **0** | 文档基建 | ✅ 完成 | 0.5 天 | — |
| **1** | 主页整体重构 | ✅ 完成 | 1 天 | Phase 0 关门 |
| **2** | 生长叙事重设计 | ✅ 完成 | 1–2 天 | Phase 1 关门 |

---

## Phase 0 · 文档基建

**目标**：建立 AI 协作文档骨架，让任何 AI 助手进入项目都能快速对齐。

**交付物**：
- [x] AGENTS.md
- [x] MEMORY.md
- [x] ROADMAP.md
- [x] docs/decisions/ 目录 + 初始 ADR
- [x] docs/ARCHITECTURE.md 骨架
- [x] CLAUDE.md（Claude Code 配置）
- [x] .cursor/rules/（Cursor 配置）

**Definition of Done**：
- [x] AGENTS.md 有隔离区 + Critical Rules + DoD 清单
- [x] MEMORY.md 有当前状态 + 下一步
- [x] docs/decisions/ 有技术栈选型 ADR

---

## Phase 1 · 主页整体重构

**目标**：将主页从简单的三屏滚动重构为温暖优雅风格的单页连续滚动页面，包含自我介绍、技能图谱、第三方链接。

**交付物**：
- [x] 更新配色方案（暖色调深色底 + 暖白文字）
- [x] 5 个 Section 组件（Hero / About / Skills / Links / Footer）
- [x] 可复用的 AnimateInView 动画组件
- [x] 数据驱动的技能模块（`src/data/skills.ts`）
- [x] 数据驱动的链接模块（`src/data/links.ts`）
- [x] LinkCard 卡片组件
- [x] 滚动驱动动画（fade-in + slide-up + stagger）
- [x] prefers-reduced-motion 支持
- [x] Footer 版权信息 + ICP 备案号

**Definition of Done**：
- [x] `pnpm build` 构建通过
- [x] dev server 正常运行
- [x] 页面结构和视觉效果符合设计方案
- [x] MEMORY.md 同步更新

---

## Phase 2 · 生长叙事重设计

**目标**：将五段式连续滚动主页升级为“种子—扎根—破土—抽枝—成冠—播种”的单页成长叙事，用滚动进度驱动树苗成长，同时保持内容可读、动画流畅和移动端可用。

**交付物**：
- [x] 记录完整视觉与交互设计方案
- [x] Seed / Roots / Sprout / Branches / Canopy / Seeds 六阶段叙事
- [x] 滚动进度驱动的树苗生长视觉
- [x] 方案 C 科技粒子 Canvas 树形与根系网络
- [x] 写实曲线枝干、层级根系与末屏“左文右树”方案 C 构图
- [x] 方案 C 概念图归档至项目设计资产目录
- [x] About、Skills、Links 内容融入成长阶段
- [x] 桌面端沉浸式布局与移动端纵向降级
- [x] `prefers-reduced-motion` 保留滚动成长并关闭自动循环动画
- [x] 成长时间线纯函数及回归测试
- [x] 更新架构与开发进度文档

**Definition of Done**：
- [x] 核心滚动动画使用 Canvas / transform / opacity，不频繁触发布局
- [x] 用户确认当前视觉和滚动体验并同意归档
- [x] reduced-motion 模式保留可控成长过程并关闭自动循环动画
- [x] 测试、`pnpm build`、脚本 Lint 和 Stylelint 全部通过
- [x] MEMORY.md、ROADMAP.md、相关 ADR 和架构文档同步更新

---

## 决策日志

| 日期 | 决策 | 详见 |
|------|------|------|
| 2026-08-01 | Phase 2：以原生滚动进度驱动树苗成长叙事 | `docs/decisions/2026-08-01-growth-narrative.md` |
| 2026-06-03 | 初始化项目文档基建 | — |
| 2026-06-03 | 主页整体重构：温暖优雅风 + 单页连续滚动 | 设计方案 A |
