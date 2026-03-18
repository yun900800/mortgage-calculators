import { defineConfig } from 'vite';

export default defineConfig({
  // 基准路径，如果你部署在子目录（如 /calc/），请修改这里
  base: './', 
  server: {
    port: 3000,
    open: true // 自动打开浏览器
  },
  build: {
    outDir: 'dist',
    minify: 'terser', // 使用 terser 压缩，代码体积更小
    sourcemap: false, // 生产环境下关闭 sourcemap 防止代码泄露
    rollupOptions: {
      output: {
        // 静态资源分门别类存储，更有利于 CDN 缓存
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    }
  }
});