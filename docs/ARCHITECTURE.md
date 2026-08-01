# 系统架构

> 本文描述 Homepage 的整体架构、模块划分、数据流和关键设计决策。
> 详细的决策理由见 `docs/decisions/`。

---

## 高层架构

```
Browser → Vite Dev Server → React App (SPA)
                                ↓
                        HomePage → Growth Story
                                ↓
                  Scroll Timeline → CSS Growth Variables
                                ↓
                  TreeScene + Skills/Links Data
                                ↓
                          SCSS Modules + CSS Variables
```

---

## 模块说明

| 模块 | 路径 | 职责 |
|------|------|------|
| 入口 | `src/main.tsx` | React 根节点挂载，加载全局样式 |
| 路由 | `src/App.tsx` | BrowserRouter 配置 |
| 主页 | `src/pages/home/index.tsx` | 组合六阶段成长叙事和语义化内容 |
| 数据层 | `src/data/` | 技能和链接的静态数据，后期可替换为 API |
| 成长时间线 | `src/pages/home/growthTimeline.ts` | 将全局进度映射为各生长阶段的纯函数 |
| 滚动协调 | `src/pages/home/useScrollGrowth.ts` | 用 requestAnimationFrame 合并滚动更新并写入 CSS 变量 |
| 场景组件 | `src/pages/home/components/TreeScene.tsx` | 以装饰性 DOM/CSS 呈现树苗成长，不承载正文语义 |
| 链接组件 | `src/pages/home/components/LinkCard.tsx` | 渲染树冠中的外部链接卡片 |
| 样式 | `src/styles/` | 全局样式、SCSS 变量、动画 keyframes |
| 静态资源 | `src/assets/` | favicon、图标等 |

---

## 数据流

### 页面加载

```
浏览器请求 → Vite 服务 → React 渲染
  → HomePage 组合 Seed / Roots / Sprout / Branches / Canopy / Seeds
    → TreeScene 读取容器上的 CSS 成长变量
    → Branches 读取 src/data/skills.ts → 渲染技能分组
    → Canopy 读取 src/data/links.ts → 渲染 LinkCard 列表
    → Seeds 收束叙事并展示联系入口、版权和备案号
```

### 滚动动画

```
scroll / resize 事件 → requestAnimationFrame 合并更新
  → 计算主页标准化滚动进度
  → growthTimeline 生成 roots / sprout / trunk / branches / canopy / seeds
  → 写入主页 CSS 自定义属性 → TreeScene 使用 transform / opacity 绘制成长
  → prefers-reduced-motion 时直接写入完整成长状态
```

---

## 关键设计决策

| 决策 | 选择 | 详见 |
|------|------|------|
| 技术栈 | React + TS + SCSS + Vite | `docs/decisions/2026-06-03-tech-stack.md` |
| 布局方式 | 单页连续滚动（移除 scroll-snap） | Phase 1 设计方案 |
| 动画方案 | 原生滚动进度 + requestAnimationFrame + CSS 变量 | `docs/decisions/2026-08-01-growth-narrative.md` |
| 树形方案 | 语义化 DOM 与 CSS 图形，场景对辅助技术隐藏 | `docs/decisions/2026-08-01-growth-narrative.md` |
| 数据驱动 | 技能和链接独立为 TS 模块 | 方便后期替换为可配置数据源 |

---

## 外部依赖

| 依赖 | 用途 | 版本约束 |
|------|------|---------|
| react | UI 框架 | ^18.1.0 |
| react-dom | React DOM 渲染 | ^18.1.0 |
| react-router-dom | 路由 | ^6.15.0 |
| classnames | 条件类名 | ^2.3.1 |
| vite | 构建工具 | ^2.9.10 |
| sass | SCSS 预处理 | ^1.52.3 |
| typescript | 类型检查 | ^4.7.3 |

---

## 样式架构

- **全局变量**：`src/styles/variable.scss`（通过 Vite additionalData 自动注入所有 SCSS 文件）
- **CSS Modules**：每个组件对应一个 `.module.scss` 文件，类名自动生成唯一标识
- **动画**：React Hook 负责滚动协调，纯函数计算阶段进度，CSS 负责视觉变换
- **响应式**：760px 以下停用 sticky 叙事，转为自然纵向内容卡片
- **无障碍**：实际内容使用 section、标题和链接；TreeScene 为纯装饰并设置 `aria-hidden`
