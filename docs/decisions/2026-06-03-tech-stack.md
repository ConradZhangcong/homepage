# ADR 2026-06-03 — 技术栈选型

**Status**：Accepted

## Context

项目初始化，需要确定主要技术栈。

## Decision

使用 React + TypeScript + SCSS + Vite。

样式规范使用 Stylelint 进行检查，配置了属性顺序（`order/properties-order`）、现代颜色函数语法（`color-function-notation`）和百分比 alpha 值（`alpha-value-notation`）等规则。每次修改样式文件后需运行 stylelint 验证。

## Alternatives

初始化时未做详细对比，后续重大变更需补充 ADR。

## Consequences

- 技术栈确定后，核心框架变更需要新的 ADR
- React 生态丰富，组件化开发效率高
- TypeScript 提供类型安全，减少运行时错误
- Vite 作为构建工具，开发体验快
