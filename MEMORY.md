# 开发进度

> 每次开发后必须更新本文件。**未更新 = 本次工作未关门。**
> AI 助手开始新 session 时必须先读这个文件。

---

## 当前状态

**日期**：2026-06-03
**阶段**：Phase 1 · 主页整体重构（已完成）

**正在做**：等待用户确认效果，准备下一步

**下一步**：
- [ ] 用户确认主页视觉效果
- [ ] 根据反馈微调样式/文案
- [ ] 补充个人博客和工具站链接（需用户提供 URL）
- [ ] 考虑将链接数据做成可配置（JSON 文件或远程接口）

---

## 已完成

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
