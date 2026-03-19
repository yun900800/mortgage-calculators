/**
 * 应用入口文件
 * 负责初始化应用和绑定全局事件
 */

// 1. 引入模块化样式 (Vite 会自动处理打包)
import './css/variables.css';
import './css/base.css';
import './css/layout.css';
import './css/components.css';
import './css/results.css';
import './css/responsive.css';
import './css/mobile.css';

// 2. 引入 App 控制器
import App from './js/App.js';

// 3. 启动应用
document.addEventListener('DOMContentLoaded', () => {
    window.mortgageApp = new App();
});

// 4. 侧边栏菜单事件
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('guide-sidebar');
    const openBtn = document.getElementById('mobile-guide-btn');
    const closeBtn = document.getElementById('close-sidebar');

    // 打开逻辑
    const openMenu = (e) => {
        e.stopPropagation();
        sidebar?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // 关闭逻辑
    const closeMenu = (e) => {
        if (e) e.stopPropagation();
        sidebar?.classList.remove('active');
        document.body.style.overflow = '';
    };

    // 绑定事件
    openBtn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);

    // 点击侧边栏外部区域自动关闭
    document.addEventListener('click', (e) => {
        if (sidebar?.classList.contains('active') && !sidebar.contains(e.target)) {
            closeMenu();
        }
    });
});
