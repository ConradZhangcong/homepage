# 开发进度

> 每次开发后必须更新本文件。**未更新 = 本次工作未关门。**
> AI 助手开始新 session 时必须先读这个文件。

---

## 当前状态

**日期**：2026-08-01
**阶段**：Phase 2 · 生长叙事重设计（进行中）

**正在做**：Phase 2 首版实现完成，等待用户进行视觉体验确认

**下一步**：
- [x] 用户确认“种子—扎根—破土—抽枝—成冠—播种”设计方向
- [x] 在 ROADMAP 与 ADR 中记录 Phase 2 方案
- [x] 实现滚动成长场景和六阶段页面内容
- [x] 补充成长时间线测试与无障碍降级
- [x] 完成测试、构建和 Lint
- [ ] 用户确认桌面端与移动端视觉效果
- [ ] 根据体验反馈微调树形比例、滚动节奏和文案

---

## 已完成

- 2026-08-01 Phase 2 生长叙事首版实现
  - 原生滚动进度通过 requestAnimationFrame 驱动根系、嫩芽、主干、分枝、树冠和落种
  - 将 About、工作原则、Skills、Links 和 Footer 重组为六阶段连续叙事
  - 使用 CSS/语义化 DOM 绘制树形，不新增动画依赖
  - 移动端改为自然纵向阅读，并支持 reduced-motion 完整静态树形
  - 新增成长时间线纯函数测试；5 项测试、脚本 Lint、Stylelint 与生产构建通过
- 2026-08-01 确认 Phase 2 生长叙事设计
  - 核心概念：Rooted in Craft, Growing with Intelligence
  - 使用滚动进度串联 Seed / Roots / Sprout / Branches / Canopy / Seeds
  - 采用原生浏览器能力、CSS 与 Canvas/DOM 绘制，不引入大型动画依赖
  - 桌面端使用沉浸式连续叙事，移动端和 reduced-motion 提供完整降级
- 2026-06-03 主页整体重构（Phase 1）
  - 改为单页连续滚动布局（移除 scroll-snap）
  - 温暖优雅风格：深色底 + 暖白文字 + 蓝紫强调色
  - 5 个 Section：Hero / About / Skills / Links / Footer
  - 滚动驱动动画（fade-in + slide-up + stagger）
  - 数据驱动的技能和链接模块（`src/data/`）
  - 可复用组件：AnimateInView、LinkCard
  - Footer 增加版权信息和 ICP 备案号
  - 支持 prefers-reduced-motion
- 2026-06-03 初始化 AI 文档基建（AGENTS.md、MEMORY.md、ROADMAP.md、ADR 目录、ARCHITECTURE 骨架）

---

## 注意事项 / 已知地雷

> AI 助手开始新 session 时必读这部分

- **SCSS @use 冲突**：Vite 配置了 `additionalData` 全局注入 `@import variable.scss`，所以模块 SCSS 文件里不能再写 `@use`，否则构建报错。直接使用变量即可，无需 import/use。
- **Prettier 格式**：项目启用了 eslint-plugin-prettier，单行 JSX 文本不能换行，否则构建失败。
- **Stylelint 检查**：每次修改 SCSS/CSS 文件后必须运行 stylelint 检查，确保属性顺序、颜色函数语法等符合规范。
