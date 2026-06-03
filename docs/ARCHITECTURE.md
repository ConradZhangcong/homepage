# 系统架构

> 本文描述 Homepage 的整体架构、模块划分、数据流和关键设计决策。
> 详细的决策理由见 `docs/decisions/`。

---

## 高层架构

```
Browser → Vite Dev Server → React App (SPA)
                                ↓
                          Pages → Section Components
                                ↓
                          Data Layer (skills, links)
                                ↓
                          SCSS Modules + CSS Variables
```

---

## 模块说明

| 模块 | 路径 | 职责 |
|------|------|------|
| 入口 | `src/main.tsx` | React 根节点挂载，加载全局样式 |
| 路由 | `src/App.tsx` | BrowserRouter 配置 |
| 主页 | `src/pages/home/` | 首页所有 Section 组件 |
| 数据层 | `src/data/` | 技能和链接的静态数据，后期可替换为 API |
| 共享组件 | `src/pages/home/components/` | AnimateInView（滚动动画）、LinkCard（链接卡片） |
| 样式 | `src/styles/` | 全局样式、SCSS 变量、动画 keyframes |
| 静态资源 | `src/assets/` | favicon、图标等 |

---

## 数据流

### 页面加载

```
浏览器请求 → Vite 服务 → React 渲染
  → HomePage 组合 5 个 Section
    → HeroSection（静态文案 + 背景光晕动画）
    → AboutSection（静态文案）
    → SkillsSection → 读取 src/data/skills.ts → 渲染标签组
    → LinksSection → 读取 src/data/links.ts → 渲染 LinkCard 列表
    → FooterSection（版权 + 备案号）
```

### 滚动动画

```
IntersectionObserver 监听 → 元素进入视口 → 添加 visible class
  → CSS transition 触发 fade-in + slide-up
  → 同组元素通过 delay prop 实现 stagger 效果
```

---

## 关键设计决策

| 决策 | 选择 | 详见 |
|------|------|------|
| 技术栈 | React + TS + SCSS + Vite | `docs/decisions/2026-06-03-tech-stack.md` |
| 布局方式 | 单页连续滚动（移除 scroll-snap） | Phase 1 设计方案 |
| 动画方案 | 纯 CSS transition + IntersectionObserver | 无额外依赖 |
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
- **动画**：IntersectionObserver 触发 class 切换，CSS transition 执行动画
- **响应式**：媒体查询断点 640px
