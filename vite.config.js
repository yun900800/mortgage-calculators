import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    // 基准路径，如果你部署在子目录（如 /calc/），请修改这里
    base: '/',
    plugins: [
        {
            name: 'clean-urls',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const url = req.url.split('?')[0];
                    // 博客列表页：/blog 或 /blog/ -> /blog/index.html
                    if (url === '/blog' || url === '/blog/') {
                        req.url = '/blog/index.html';
                    } else {
                        // 博客文章：/blog/xxx -> /blog/xxx.html
                        const blogMatch = url.match(/^\/blog\/(.+)$/);
                        if (blogMatch) {
                            const htmlPath = path.join(process.cwd(), 'public', 'blog', blogMatch[1] + '.html');
                            if (fs.existsSync(htmlPath)) {
                                req.url = '/blog/' + blogMatch[1] + '.html';
                            }
                        }
                    }
                    // 其他页面：/about -> /about.html
                    const pageMap = {
                        '/about': '/about.html',
                        '/privacy': '/privacy.html',
                        '/terms': '/terms.html',
                        '/contact': '/contact.html'
                    };
                    if (pageMap[url]) {
                        const htmlPath = path.join(process.cwd(), 'public', pageMap[url]);
                        if (fs.existsSync(htmlPath)) {
                            req.url = pageMap[url];
                        }
                    }
                    next();
                });
            }
        }
    ],
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
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    }
});
