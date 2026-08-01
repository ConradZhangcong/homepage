# 反模式记录

记录项目里踩过的坑、错误的做法、走过的弯路。

**每次踩坑后在这里补充，防止 AI 和团队重蹈覆辙。**

---

## 格式

```markdown
### [日期] [简短标题]

**场景**：什么情况下遇到的
**错误做法**：做了什么
**后果**：导致什么问题
**正确做法**：应该怎么做
```

---

## 记录

### 2026-08-01 用 camelCase 访问连字符 CSS Module 类名

**场景**：组件样式使用 `.hero-panel`、`.progress-rail` 等连字符类名，TSX 中却写成 `styles.heroPanel`、`styles.progressRail`。
**错误做法**：假设 Vite CSS Modules 会默认把 kebab-case 类名额外导出为 camelCase 属性。
**后果**：TypeScript 因通用模块声明不会报错，但运行时类名为 `undefined`，对应布局、根系、进度条和隐藏状态全部失效。
**正确做法**：连字符类名必须使用 `styles["hero-panel"]` 形式访问；测试会扫描并阻止同类错误再次进入。

### 2026-06-03 SCSS 模块文件中使用 @use 导致构建失败

**场景**：重构主页时，在 CSS Modules 文件（如 `HeroSection.module.scss`）中使用 `@use "../styles/variable" as *` 引入变量。
**错误做法**：在模块 SCSS 文件顶部写了 `@use` 语句。
**后果**：Vite 构建报错 `@use rules must be written before any other rules`，因为 Vite 配置了 `additionalData: @import variable.scss` 会在每个 SCSS 文件开头自动注入，导致 `@use` 排在 `@import` 之后。
**正确做法**：不要在模块 SCSS 文件中写 `@use` 或 `@import`，直接使用变量即可，Vite 的 `additionalData` 已经全局注入了。

### 2026-06-03 Prettier 格式与 JSX 单行文本冲突

**场景**：在 JSX 中写短文本内容时，prettier 要求保持单行。
**错误做法**：将短 JSX 文本拆成多行（如 `<p>\n  text\n</p>`）。
**后果**：eslint-plugin-prettier 报错，构建失败。
**正确做法**：短文本保持单行（如 `<p>text</p>`），或者让 prettier 自动格式化（`pnpm prettier --write`）。
