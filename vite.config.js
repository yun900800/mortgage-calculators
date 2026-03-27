import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    // 基准路径，如果你部署在子目录（如 /calc/），请修改这里
    base: './',
    server: {
        port: 3000,
        open: true, // 自动打开浏览器
        middleware: (req, res, next) => {
            // 博客页面：/blog/xxx -> /blog/xxx.html
            const blogMatch = req.url.match(/^\/blog\/(.+)$/);
            if (blogMatch) {
                const htmlPath = path.join(process.cwd(), 'public', 'blog', blogMatch[1] + '.html');
                if (fs.existsSync(htmlPath)) {
                    req.url = '/blog/' + blogMatch[1] + '.html';
                }
            }
            // 其他页面
            const pageMap = {
                '/about': '/about.html',
                '/privacy': '/privacy.html',
                '/terms': '/terms.html'
            };
            if (pageMap[req.url]) {
                const htmlPath = path.join(process.cwd(), 'public', pageMap[req.url]);
                if (fs.existsSync(htmlPath)) {
                    req.url = pageMap[req.url];
                }
            }
            next();
        }
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
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    }
});
