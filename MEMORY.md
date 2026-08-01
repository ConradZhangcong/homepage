# 开发进度

> 每次开发后必须更新本文件。**未更新 = 本次工作未关门。**
> AI 助手开始新 session 时必须先读这个文件。

---

## 当前状态

**日期**：2026-08-01
**阶段**：Phase 2 · 生长叙事重设计（已归档）

**正在做**：当前版本已获用户确认并归档，暂无进行中的开发项

**下一步**：
- [x] 用户确认“种子—扎根—破土—抽枝—成冠—播种”设计方向
- [x] 在 ROADMAP 与 ADR 中记录 Phase 2 方案
- [x] 实现滚动成长场景和六阶段页面内容
- [x] 补充成长时间线测试与无障碍降级
- [x] 完成测试、构建和 Lint
- [x] 在用户 Chrome 中复现并修复“整棵树静态显示”问题
- [x] 修复连字符 CSS Module 类名未挂载的问题
- [x] 生成三种精细视觉方向并确认方案 C（科技粒子树）
- [x] 使用 Canvas 粒子系统替换粗糙的 CSS 树形
- [x] 将枝干与根系升级为有机曲线、分层粗细和树皮高光
- [x] 将最后一屏调整为方案 C 的“左侧内容、右侧主体树”构图
- [x] 用户确认当前视觉效果并归档 Phase 2
- [x] 将方案 C 概念图保存到项目设计资产目录
- [ ] 后续按新反馈开启下一轮微调

---

## 已完成

- 2026-08-01 Phase 2 归档
  - 用户确认当前版本先行收口，Phase 2 标记为完成
  - 方案 C 原始概念图保存至 `docs/assets/concepts/particle-tree-concept-c.png`
  - 概念图仅作为设计参考，生产页面继续使用 Canvas 动态绘制
- 2026-08-01 Phase 2 方案 C 写实精修
  - 枝干和根系改为渐进绘制的二次贝塞尔曲线，增加主干、主根、侧枝和细根的粗细层级
  - 使用土壤棕渐变、树皮细高光、椭圆叶片与发光根节点，在自然形态上保留科技粒子感
  - 树形在成冠阶段居中展示，进入 Seeds 末屏后平滑向右归位并放大，左侧保留联系内容
  - 新增末屏树形锚点测试；10 项测试、脚本 Lint、Stylelint 与生产构建通过
- 2026-08-01 Phase 2 科技粒子树升级
  - 用户从自然写实、半透明 3D、科技粒子三种方向中选择方案 C
  - 使用确定性递归算法生成数百条枝干与根系，以及数百个叶冠和根网粒子
  - Canvas 根据滚动成长状态逐段绘制，不把概念图直接作为静态背景
  - 保留 reduced-motion 的用户滚动控制，关闭自动粒子呼吸
  - 新增粒子树确定性、复杂度和线段显现区间测试
- 2026-08-01 Phase 2 首次浏览器验收修复
  - 根因一：浏览器启用 reduced-motion 时旧逻辑直接输出完整树形，页面看起来像静态背景
  - 根因二：多个 kebab-case CSS Module 类名被错误地用 camelCase 访问，运行时样式未挂载
  - 现在 reduced-motion 仍保留用户滚动直接控制的生长过程，只关闭自动循环动画
  - 参照 United Carriers 的固定场景 + 滚动进度模式，首屏改为左侧主标题、右侧种子，并增加进度轨道
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
