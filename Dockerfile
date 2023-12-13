# 选择一个基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制项目文件到工作目录
COPY . /app

# 使用pnpm 安装依赖
RUN npm install -g pnpm
RUN pnpm install
# 构建项目
RUN pnpm build

# 选择一个运行时镜像
FROM nginx:latest

# 将构建的静态文件复制到 Nginx 服务的目录
COPY --from=0 /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 50000

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
