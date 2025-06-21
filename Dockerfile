# 使用官方 Node.js 作为构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package.json ./
RUN npm install

# 拷贝项目文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 使用更轻量的运行环境
FROM node:20-alpine AS runner

# 设置运行时环境变量
ENV NODE_ENV=production

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# 设置工作目录
WORKDIR /app

# 只复制必要的构建产物
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 设置权限
USER nextjs

# 启动命令
CMD ["npm", "start"]
