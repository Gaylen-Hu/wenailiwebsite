#!/bin/bash
# 检查环境变量脚本
echo "=== 检查 OSS 相关环境变量 ==="
echo "APOS_S3_KEY: ${APOS_S3_KEY:-未设置}"
echo "APOS_S3_SECRET: ${APOS_S3_SECRET:-未设置}"
echo "APOS_S3_BUCKET: ${APOS_S3_BUCKET:-未设置}"
echo "APOS_S3_REGION: ${APOS_S3_REGION:-未设置}"
echo "APOS_S3_ENDPOINT: ${APOS_S3_ENDPOINT:-未设置}"
echo "APOS_CDN_URL: ${APOS_CDN_URL:-未设置}"
echo ""
echo "=== 检查其他环境变量 ==="
echo "APOS_BASE_URL: ${APOS_BASE_URL:-未设置}"
echo "APOS_MONGODB_URI: ${APOS_MONGODB_URI:-未设置}"
echo "NODE_ENV: ${NODE_ENV:-未设置}"

