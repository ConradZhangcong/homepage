# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# 先复制依赖相关文件，利用 Docker 缓存层
COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# --- Production Stage ---
FROM nginx:alpine

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
