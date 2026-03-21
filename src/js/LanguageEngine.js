/**
 * RESPONSIBILITY: Localization and translation.
 * EXTENSION POINT: Support more languages or currency formats.
 */
export default class LanguageEngine {
    constructor(translations) {
        this.translations = translations;

        // 逻辑优先级：1. 本地存储 > 2. 根节点 lang 属性 > 3. 浏览器语言 > 4. 默认 'en'
        const savedLang = localStorage.getItem('preferred-lang');
        const browserLang = navigator.language.split('-')[0];

        this.lang =
            savedLang ||
            document.documentElement.lang ||
            (translations[browserLang] ? browserLang : 'en');

        // 初始化时同步到 HTML 标签
        document.documentElement.lang = this.lang;
    }

    setLanguage(lang) {
        if (!this.translations[lang]) return; // 安全检查

        this.lang = lang;
        document.documentElement.lang = lang;

        // --- 核心添加：保存到 localStorage ---
        localStorage.setItem('preferred-lang', lang);

        this.updateStaticTexts();
    }

    t(key) {
        return this.translations[this.lang][key] || key;
    }

    updateStaticTexts() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach((el) => {
            const key = el.getAttribute('data-i18n');
            el.innerText = this.t(key);
        });
    }

    formatCurrency(amount) {
        const config = this.translations[this.lang];
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currencyCode
        }).format(amount);
    }
}
