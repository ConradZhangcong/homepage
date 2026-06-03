# 部署指南

## 技术栈

- **框架**: Vite + React 18 + TypeScript
- **包管理**: pnpm
- **容器化**: Docker（多阶段构建）
- **Web 服务**: Nginx

## 项目结构（部署相关）

```
homepage/
├── Dockerfile          # 多阶段构建：node 编译 → nginx 托管
├── nginx.conf          # Nginx 配置：SPA 路由、gzip、缓存
├── .dockerignore       # 排除 node_modules、.git 等加速构建
└── dist/               # 构建产物（自动生成）
```

## 本地构建与运行

```bash
# 构建镜像
docker build -t homepage .

# 运行容器（映射到宿主机 80 端口）
docker run -d --name homepage -p 80:80 homepage

# 访问 http://localhost 验证
```

## 服务器部署

### 1. 上传代码

```bash
# 方式一：git clone
git clone <仓库地址> /opt/homepage

# 方式二：rsync
rsync -avz --exclude node_modules --exclude dist ./ user@server:/opt/homepage
```

### 2. 构建并运行

```bash
cd /opt/homepage
docker build -t homepage .
docker run -d --name homepage -p 80:80 homepage
```

### 3. 绑定域名（HTTPS）

域名 DNS 添加 A 记录指向服务器 IP，然后用反向代理处理 HTTPS。

**推荐方案：Caddy（自动签发证书）**

```bash
# 安装 Caddy
sudo apt install caddy        # Debian/Ubuntu
# 或
brew install caddy             # macOS

# 编辑 /etc/caddy/Caddyfile
your-domain.com {
    reverse_proxy localhost:80
}

# 启动
sudo systemctl restart caddy
```

**备选方案：Nginx 反向代理 + Let's Encrypt**

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:80;
    }
}
```

## 更新部署

```bash
cd /opt/homepage
git pull
docker build -t homepage .
docker stop homepage && docker rm homepage
docker run -d --name homepage -p 80:80 homepage
```

## Dockerfile 说明

采用两阶段构建，最终镜像只包含 nginx + 静态文件，体积约 40MB：

```dockerfile
# 阶段 1：用 node 编译
FROM node:20-alpine AS builder
# ... pnpm install && pnpm build

# 阶段 2：用 nginx 托管
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
```

## nginx.conf 关键配置

| 配置项 | 作用 |
|--------|------|
| `try_files $uri $uri/ /index.html` | SPA 路由回退，避免刷新 404 |
| `location /assets` | Vite 构建产物带 hash，可长期缓存 |
| `gzip on` | 启用压缩，减少传输体积 |
