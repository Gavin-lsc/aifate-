/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // 优化微信浏览器兼容性
  transpilePackages: ['framer-motion'],
  // 确保所有页面都是静态导出
  reactStrictMode: true,
};

module.exports = nextConfig;
