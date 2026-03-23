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

    // 创建遮罩层
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // 打开逻辑
    const openMenu = (e) => {
        if (e) e.stopPropagation();
        sidebar?.classList.add('active');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // 关闭逻辑
    const closeMenu = (e) => {
        if (e) e.stopPropagation();
        sidebar?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    };

    // 绑定事件
    openBtn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // ESC 键关闭侧边栏
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar?.classList.contains('active')) {
            closeMenu();
        }
    });

    // 点击侧边栏外部区域自动关闭 (仅在移动端)
    const isMobile = () => window.innerWidth <= 1600;
    document.addEventListener('click', (e) => {
        if (
            isMobile() &&
            sidebar?.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            e.target !== openBtn
        ) {
            closeMenu();
        }
    });

    // 窗口大小改变时确保侧边栏关闭
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            closeMenu();
        }
    });

    // Tab 切换逻辑
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');

    const switchTab = (tabName) => {
        tabContents.forEach((content) => {
            content.classList.toggle('active', content.dataset.content === tabName);
        });
        sidebarTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
    };

    sidebarTabs.forEach((tab) => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
});
