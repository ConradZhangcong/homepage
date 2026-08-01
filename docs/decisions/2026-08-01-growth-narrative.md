# ADR 2026-08-01 — 树苗成长滚动叙事

**Status**：Accepted

## Context

Phase 1 已完成暖色深色背景、五段式单页内容和基于 IntersectionObserver 的入场动画。新版希望让页面下滑本身成为体验核心，以树苗扎根、发芽和成长表达“从前端工程走向 AI Agent”的个人方向，同时保持个人主页的内容可读性、性能和克制感。

## Decision

### 叙事结构

主页升级为六个连续成长阶段：

1. **Seed｜种子**：名字与主张 `Rooted in Frontend. Growing with AI.`，种子随首次滚动苏醒。
2. **Roots｜扎根**：根系承载 About 内容，以 Frontend Craft 和 AI Exploration 表达能力来源。
3. **Sprout｜破土**：通过地表和色温变化呈现 `Think clearly / Build carefully / Ship continuously` 的工作方式。
4. **Branches｜抽枝**：技能组映射为主干、分枝与叶片，继续读取 `src/data/skills.ts`。
5. **Canopy｜成冠**：外部链接成为树冠中的内容卡片，继续读取 `src/data/links.ts`，不虚构项目。
6. **Seeds｜播种**：以 `Still growing.` 收束，并保留版权与备案信息。

### 视觉方向

- 采用“夜色森林—土壤暖光—清晨嫩芽”的连续色彩变化。
- 核心色为夜色绿 `#07110d`、土壤棕 `#17110b`、暖白 `#f2f0e7`、枝叶绿 `#6fa56f` 和嫩芽高光 `#b8d986`。
- 树形视觉由 CSS/Canvas/语义化 DOM 组合完成，不引入成品插画或模型生成 SVG。
- 内容层级优先于装饰；动画关闭时仍呈现完整页面和完整树形。

### 动画与性能

- 使用标准化的全局滚动进度驱动成长时间线。
- 滚动监听只记录目标值，视觉更新由 `requestAnimationFrame` 合并。
- 成长阶段、区间映射与插值逻辑写成无副作用纯函数。
- 动画主要改变 `transform`、`opacity`、CSS 自定义属性与 Canvas 绘制进度，避免滚动期间频繁触发布局。
- 保留 IntersectionObserver 处理独立内容入场，不增加 GSAP、WebGL 或粒子引擎依赖。

### 响应式与无障碍

- 桌面端使用居中的连续成长场景和分侧内容编排。
- 移动端转为自然纵向时间线，缩减装饰密度并避免长时间 sticky。
- `prefers-reduced-motion: reduce` 下直接显示完整树形与内容，关闭连续生长、漂浮和视差。
- Canvas 仅作装饰并从辅助技术中隐藏；实际内容保留语义化标题、段落和链接。

### 测试策略

- 为滚动边界归一化、阶段区间映射、插值和 reduced-motion 状态补充测试。
- 测试重点放在纯函数和可验证状态，不对具体动画帧截图做脆弱断言。

## Alternatives

- **继续使用独立 Section 入场动画**：实现简单，但无法形成“一棵树持续成长”的整体叙事。
- **引入 GSAP ScrollTrigger**：时间线能力成熟，但当前需求可由原生能力实现，新增体积和依赖维护成本不划算。
- **使用 WebGL/Three.js 生成 3D 树木**：视觉冲击更强，但对个人主页而言性能、可访问性和移动端成本过高。
- **预制视频或逐帧图片**：视觉稳定，但响应式、交互同步、体积和 reduced-motion 降级较差。

## Consequences

- 页面形成统一、可识别的个人视觉叙事，并与“Frontend → AI Agent”定位直接关联。
- 现有技能和链接数据可以继续复用，避免虚构内容和不必要的数据迁移。
- 需要新增滚动进度控制、树形场景和测试基础设施，复杂度高于 Phase 1 的一次性入场动画。
- 必须持续关注移动端绘制成本、滚动同步和 reduced-motion 降级质量。
