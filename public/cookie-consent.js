(function () {
    var KEY = 'lifebook_cookie_consent_v1';
    var GA_ID = window.LIFEBOOK_GA_ID || 'G-54HJLXPDLF';

    function readConsent() {
        try {
            return localStorage.getItem(KEY);
        } catch (e) {
            return null;
        }
    }

    function writeConsent(value) {
        try {
            localStorage.setItem(KEY, value);
        } catch (e) {
            // localStorage 不可用时，本次会话仍然可以正常关闭横幅。
        }
    }

    function loadAnalytics() {
        if (!GA_ID || window.__lifebookGaLoaded) return;
        window.__lifebookGaLoaded = true;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_ID);
    }

    function removeBanner() {
        var banner = document.getElementById('lifebook-cookie-banner');
        if (banner) banner.remove();
        var style = document.getElementById('lifebook-cookie-style');
        if (style) style.remove();
    }

    function showBanner() {
        if (document.getElementById('lifebook-cookie-banner')) return;

        var style = document.createElement('style');
        style.id = 'lifebook-cookie-style';
        style.textContent = [
            '#lifebook-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;}',
            '#lifebook-cookie-banner .lcb-inner{max-width:780px;margin:0 auto;background:#fff;color:#133041;border:1px solid #dbe7ee;border-radius:16px;box-shadow:0 12px 40px rgba(19,48,65,.18);padding:18px 20px;display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;}',
            '#lifebook-cookie-banner .lcb-text{flex:1 1 420px;min-width:260px;}',
            '#lifebook-cookie-banner strong{display:block;font-size:1rem;margin-bottom:4px;}',
            '#lifebook-cookie-banner p{margin:0;font-size:.88rem;line-height:1.6;color:#4e6e7e;}',
            '#lifebook-cookie-banner a{color:#0b6fa4;text-decoration:underline;}',
            '#lifebook-cookie-banner .lcb-actions{display:flex;gap:10px;flex-wrap:wrap;}',
            '#lifebook-cookie-banner .lcb-btn{border:0;border-radius:10px;padding:10px 16px;font-size:.9rem;font-weight:700;cursor:pointer;}',
            '#lifebook-cookie-banner .lcb-primary{background:#133041;color:#fff;}',
            '#lifebook-cookie-banner .lcb-secondary{background:#e4f4fd;color:#133041;}',
            '@media(max-width:600px){#lifebook-cookie-banner{left:10px;right:10px;bottom:10px;}#lifebook-cookie-banner .lcb-inner{padding:16px;}#lifebook-cookie-banner .lcb-actions{width:100%;}#lifebook-cookie-banner .lcb-btn{flex:1;}}'
        ].join('');
        document.head.appendChild(style);

        var banner = document.createElement('div');
        banner.id = 'lifebook-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie 与分析设置');
        banner.innerHTML = [
            '<div class="lcb-inner">',
            '  <div class="lcb-text">',
            '    <strong>Cookie 与分析设置</strong>',
            '    <p>我们使用 Google Analytics 了解页面使用情况，并使用 Google AdSense 展示广告。你可以选择是否允许分析 Cookie；广告 Cookie 由 Google 管理，详见<a href="/privacy#cookies">隐私政策</a>。</p>',
            '  </div>',
            '  <div class="lcb-actions">',
            '    <button type="button" class="lcb-btn lcb-secondary" data-choice="essential">不允许分析</button>',
            '    <button type="button" class="lcb-btn lcb-primary" data-choice="analytics">允许分析</button>',
            '  </div>',
            '</div>'
        ].join('');
        document.body.appendChild(banner);

        banner.addEventListener('click', function (event) {
            var button = event.target.closest('[data-choice]');
            if (!button) return;
            var choice = button.getAttribute('data-choice');
            writeConsent(choice);
            removeBanner();
            if (choice === 'analytics') loadAnalytics();
        });
    }

    function init() {
        var consent = readConsent();
        if (consent === 'analytics') {
            loadAnalytics();
            return;
        }
        if (consent === 'essential') {
            return;
        }
        showBanner();
    }

    window.LifebookConsent = {
        get: readConsent,
        reset: function () {
            try {
                localStorage.removeItem(KEY);
            } catch (e) {}
            window.location.reload();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
