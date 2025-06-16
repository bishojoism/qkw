# 1. 使用官方 Bun 镜像作为构建阶段
FROM oven/bun:1.1.13 AS builder

# 2. 设置工作目录
WORKDIR /app

# 3. 复制依赖文件并安装依赖
COPY bun.lock package.json tsconfig.json next.config.js ./
COPY . .

# 4. 安装依赖并构建
RUN bun install --frozen-lockfile
RUN bun run build

# 5. 使用更小的镜像进行运行
FROM oven/bun:1.1.13-slim AS runner

WORKDIR /app

# 6. 复制构建产物和依赖
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# 7. 暴露端口（Next.js 默认端口）
EXPOSE 3000

# 8. 启动命令
CMD ["bun", "next", "start"]
