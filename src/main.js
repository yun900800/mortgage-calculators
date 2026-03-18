// 1. 引入全局样式 (Vite 会自动处理打包)
import './css/styles.css';
import './css/mobile.css';

// 2. 引入 App 控制器
import App from './js/App.js';

// 3. 启动应用
// 这样做的好处是：如果你未来想给页面加个 Loading 动画，
// 或者在初始化前做权限检查，都可以在这里统一处理。
document.addEventListener('DOMContentLoaded', () => {
    window.mortgageApp = new App();
});

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('guide-sidebar');
  const openBtn = document.getElementById('mobile-guide-btn');
  const closeBtn = document.getElementById('close-sidebar');

  // 打开逻辑
  const openMenu = (e) => {
    e.stopPropagation(); // 防止点击穿透
    sidebar.classList.add('active');
    // 开启菜单时，禁止背景滚动（可选，提升体验）
    document.body.style.overflow = 'hidden';
  };

  // 关闭逻辑
  const closeMenu = (e) => {
    if (e) e.stopPropagation();
    sidebar.classList.remove('active');
    // 恢复背景滚动
    document.body.style.overflow = '';
  };

  // 绑定事件
  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // 点击侧边栏外部区域自动关闭
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
      closeMenu();
    }
  });
});