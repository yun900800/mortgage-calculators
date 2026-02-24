/// 1. 翻译数据配置
const translations = {
    en: {
        title: "Mortgage Calculator",
        clearAll: "Clear All",
        amount: "Mortgage Amount",
        term: "Mortgage Term",
        rate: "Interest Rate",
        type: "Mortgage Type",
        repayment: "Repayment",
        interestOnly: "Interest Only",
        calculate: "Calculate Repayments",
        resultsTitle: "Your results",
        resultsDesc: "Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.",
        monthlyRepay: "Your monthly repayments",
        totalRepay: "Total you'll repay over the term",
        emptyTitle: "Results shown here",
        emptyDesc: "Complete the form and click “calculate repayments” to see what your monthly repayments would be.",
        error: "This field is required",
        years: "years",
        currencySymbol: "£", 
        locale: "en-GB",
        currencyCode: "GBP",
        decreasing: "Decreasing (Equal Principal)",
        targetMonthLabel: "View Specific Month (Optional)",
        monthUnit: "Mo.",
        viewMethods: "View Cal Method",
        specificMonthNote: "(Month {n})"
    },
    zh: {
        title: "贷款计算器",
        clearAll: "全部清除",
        amount: "贷款总额",
        term: "贷款期限",
        rate: "年利率",
        type: "还款方式",
        repayment: "等额本息",
        interestOnly: "仅还利息",
        calculate: "计算还款额",
        resultsTitle: "计算结果",
        resultsDesc: "下方显示基于您提供的信息计算出的结果。如需调整，请修改表单并重新计算。",
        monthlyRepay: "每月还款额",
        totalRepay: "还款总额",
        emptyTitle: "结果在此显示",
        emptyDesc: "填写表格并点击“计算还款额”查看结果。",
        error: "此项为必填项",
        years: "年",
        currencySymbol: "¥", 
        locale: "zh-CN",
        currencyCode: "CNY",
        decreasing: "等额本金",
        targetMonthLabel: "查看特定月份 (选填)",
        monthUnit: "月",
        viewMethods: "查看计算方法",
        specificMonthNote: "(第 {n} 个月)"
    },
    ja: {
        title: "住宅ローン計算機",
        clearAll: "すべてクリア",
        amount: "借入金額",
        term: "借入期間",
        rate: "金利",
        type: "返済方式",
        repayment: "元利均等返済",
        interestOnly: "利息のみ返済",
        calculate: "返済額を計算する",
        resultsTitle: "計算結果",
        resultsDesc: "入力された情報に基づく計算結果は以下の通りです。調整するには、フォームを編集して再度「返済額を計算する」をクリックしてください。",
        monthlyRepay: "毎月の返済額",
        totalRepay: "総返済額",
        emptyTitle: "ここに結果が表示されます",
        emptyDesc: "フォームに入力し、「返済額を計算する」をクリックしてください。",
        error: "この項目は必須です",
        years: "年",
        currencySymbol: "¥", 
        locale: "ja-JP",
        currencyCode: "JPY",
        decreasing: "元金均等返済",
        targetMonthLabel: "特定の月を表示 (任意)",
        monthUnit: "ヶ月",
        viewMethods: "計算方法を確認する",
        specificMonthNote: "({n}ヶ月目)"
    },
    ko: {
        title: "대출 계산기",
        clearAll: "모두 지우기",
        amount: "대출 금액",
        term: "대출 기간",
        rate: "이자율",
        type: "상환 방식",
        repayment: "원리금 균등 상환",
        interestOnly: "이자만 상환",
        calculate: "상환액 계산하기",
        resultsTitle: "계산 결과",
        resultsDesc: "입력하신 정보를 바탕으로 한 결과입니다. 수정하려면 양식을 편집하고 '상환액 계산하기'를 다시 클릭하세요.",
        monthlyRepay: "월 상환액",
        totalRepay: "총 상환액",
        emptyTitle: "결과가 여기에 표시됩니다",
        emptyDesc: "양식을 작성하고 '상환액 계산하기'를 클릭하여 결과를 확인하세요.",
        error: "필수 입력 항목입니다",
        years: "년",
        currencySymbol: "₩", 
        locale: "ko-KR",
        currencyCode: "KRW",
        decreasing: "원금 균등 상환",
        targetMonthLabel: "특정 월 조회 (선택 사항)",
        monthUnit: "월",
        viewMethods: "계산 방법 보기",
        specificMonthNote: "({n}개월차)"
    },
    ms: {
        title: "Kalkulator Pinjaman",
        clearAll: "Padam Semua",
        amount: "Jumlah Pinjaman",
        term: "Tempoh Pinjaman",
        rate: "Kadar Faedah",
        type: "Jenis Pinjaman",
        repayment: "Anuiti (Prinsipal + Faedah)",
        interestOnly: "Faedah Sahaja",
        calculate: "Kira Bayaran Balik",
        resultsTitle: "Keputusan anda",
        resultsDesc: "Keputusan anda ditunjukkan di bawah berdasarkan maklumat yang diberikan. Untuk pelarasan, edit borang dan klik semula “kira bayaran balik”.",
        monthlyRepay: "Bayaran bulanan anda",
        totalRepay: "Jumlah bayaran balik keseluruhan",
        emptyTitle: "Keputusan dipaparkan di sini",
        emptyDesc: "Lengkapkan borang dan klik “kira bayaran balik” untuk melihat keputusan.",
        error: "Ruangan ini diperlukan",
        years: "tahun",
        currencySymbol: "RM", 
        locale: "ms-MY",
        currencyCode: "MYR",
        decreasing: "Prinsipal Sama Rata",
        targetMonthLabel: "Lihat Bulan Tertentu (Pilihan)",
        monthUnit: "Bln",
        viewMethods: "Lihat Kaedah Pengiraan",
        specificMonthNote: "(Bulan {n})"
    },
    hi: {
        title: "ऋण कैलकुलेटर",
        clearAll: "सभी साफ़ करें",
        amount: "ऋण राशि",
        term: "ऋण अवधि",
        rate: "ब्याज दर",
        type: "ऋण का प्रकार",
        repayment: "समान मासिक किस्त (EMI)",
        interestOnly: "केवल ब्याज",
        calculate: "पुनर्भुगतान की गणना करें",
        resultsTitle: "आपका परिणाम",
        resultsDesc: "प्रदान की गई जानकारी के आधार पर आपके परिणाम नीचे दिए गए हैं। सुधार के लिए, फ़ॉर्म संपादित करें और फिर से क्लिक करें।",
        monthlyRepay: "आपका मासिक पुनर्भुगतान",
        totalRepay: "कुल पुनर्भुगतान",
        emptyTitle: "परिणाम यहाँ दिखाए गए हैं",
        emptyDesc: "फॉर्म पूरा करें और परिणाम देखने के लिए बटन पर क्लिक करें।",
        error: "यह फ़ील्ड आवश्यक है",
        years: "वर्ष",
        currencySymbol: "₹", 
        locale: "hi-IN",
        currencyCode: "INR",
        decreasing: "समान मूलधन (Decreasing)",
        targetMonthLabel: "विशिष्ट महीना देखें (वैकल्पिक)",
        monthUnit: "माह",
        viewMethods: "गणना विधि देखें",
        specificMonthNote: "(महीना {n})"
    }
};

// 2. DOM 元素获取
const form = document.querySelector('form');
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');
const radioInputs = document.querySelectorAll('input[name="mortgage-type"]');
const clearAllBtn = document.querySelector('.clear-all-btn');
const rightContent = document.querySelector('.right-content');
const monthlyPaymentTextContent = document.querySelector('#monthly-repayments');
const totalOverTheTermTextContent = document.querySelector('#total-over-the-term');
const langSelect = document.querySelector('#lang-select');
// 获取符号显示元素
const currencyDisplay = document.querySelector('#currency-display');


/**
 * 核心：更新语言和格式
 * @param {string} lang 语言代码
 * @param {boolean} saveToStorage 是否存入本地缓存
 */
function updateLanguage(lang, saveToStorage = true) {
    const config = translations[lang];
    if (!config) return;

    // 1. 更新所有带有 data-i18n 的文字
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (config[key]) el.innerText = config[key];
    });

    // 2. 更新输入框前的货币符号
    if (currencyDisplay) currencyDisplay.innerText = config.currencySymbol;

    // 3. 更新下拉菜单的选中项（如果是从缓存加载的情况）
    langSelect.value = lang;

    // 4. 持久化保存
    if (saveToStorage) {
        localStorage.setItem('preferred-lang', lang);
    }

    // 5. 如果已经有了计算结果，切换语言时自动重新计算以更新结果的货币格式
    const amount = document.querySelector('#mortgage-amount').value;
    const isResultVisible = !document.querySelector('.after-results-container').classList.contains('hidden');
    if (amount && isResultVisible) {
        // 模拟提交表单以刷新计算结果显示
        form.dispatchEvent(new Event('submit'));
    }
}

langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// 页面加载时的初始化逻辑
window.addEventListener('DOMContentLoaded', () => {
    // 优先级：1. 本地缓存 2. 浏览器语言 3. 默认英文
    const savedLang = localStorage.getItem('preferred-lang');
    const browserLang = navigator.language.split('-')[0]; // 取 'zh-CN' 中的 'zh'
    
    const initialLang = savedLang || (translations[browserLang] ? browserLang : 'en');
    
    updateLanguage(initialLang, false); // 初始化不需要再次保存
});

// 4. 输入处理逻辑 (保留你原本的格式化功能)
mortgageAmountInput.addEventListener('input', () => {
    let value = mortgageAmountInput.value.replace(/,/g, '');
    if (isNaN(value) || value === "") {
        mortgageAmountInput.value = "";
    } else {
        mortgageAmountInput.value = new Intl.NumberFormat('en-US').format(value);
    }
    removeError(mortgageAmountInput);
});

mortgageTermInput.addEventListener('input', () => removeError(mortgageTermInput));
interestRateInput.addEventListener('input', () => removeError(interestRateInput));
radioInputs.forEach(radio => radio.addEventListener('change', () => removeError(radio)));

function removeError(input) {
    const parent = input.closest('.mortgage-amount-container, .mortgage-term-container, .interest-rate-container, .mortgage-type-container');
    const errorMsg = parent.querySelector('.error-msg');
    const inputContainer = parent.querySelector('.input-container');
    if (errorMsg) {
        errorMsg.remove();
        if (inputContainer) inputContainer.classList.remove('error-div');
    }
}

// 5. 校验与错误处理
function setErrorFor(input) {
    const parent = input.closest('.mortgage-amount-container, .mortgage-term-container, .interest-rate-container, .mortgage-type-container');
    if (parent.querySelector('.error-msg')) return; // 避免重复添加

    const spanMsg = document.createElement('span');
    spanMsg.classList.add('error-msg');
    spanMsg.innerText = translations[langSelect.value].error;
    
    const inputContainer = parent.querySelector('.input-container');
    if (inputContainer) {
        inputContainer.classList.add('error-div');
        inputContainer.after(spanMsg);
    } else {
        // 针对 radio 类型
        parent.appendChild(spanMsg);
    }
}

function checkInputs() {
    let isValid = true;
    const amount = mortgageAmountInput.value.replace(/,/g, '');
    const term = mortgageTermInput.value;
    const rate = interestRateInput.value;
    const typeChecked = document.querySelector('input[name="mortgage-type"]:checked');

    if (!amount) { setErrorFor(mortgageAmountInput); isValid = false; }
    if (!term) { setErrorFor(mortgageTermInput); isValid = false; }
    if (!rate) { setErrorFor(interestRateInput); isValid = false; }
    if (!typeChecked) { setErrorFor(radioInputs[0]); isValid = false; }

    if (!isValid) return null;

    return [parseFloat(amount), parseInt(term), parseFloat(rate), typeChecked.value];
}

// --- 步骤 1: 修改计算函数，只返回纯数字 ---
function calculate(amount, term, rate, type, targetMonth = 1) {
    const monthlyInterestRate = rate / 12 / 100;
    const numberOfPayments = term * 12;
    let monthlyPayment;
    let totalRepay;

    // 限制月份范围
    targetMonth = Math.max(1, Math.min(targetMonth, numberOfPayments));

    if (type === 'repayment') {
        // 等额本息：每月固定
        monthlyPayment = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        totalRepay = monthlyPayment * numberOfPayments;
    } else if (type === 'decreasing') {
        // 等额本金：每月本金固定，利息递减
        const monthlyPrincipal = amount / numberOfPayments;
        // 第 m 个月利息 = [贷款本金 - 累计已还本金] * 月利率
        const interestForSpecificMonth = (amount - (targetMonth - 1) * monthlyPrincipal) * monthlyInterestRate;
        monthlyPayment = monthlyPrincipal + interestForSpecificMonth;
        
        // 总利息 = [(首月利息 + 末月利息) / 2] * 期数
        const totalInterest = (numberOfPayments + 1) * amount * monthlyInterestRate / 2;
        totalRepay = amount + totalInterest;
    } else {
        // 仅还利息
        monthlyPayment = amount * monthlyInterestRate;
        totalRepay = (monthlyPayment * numberOfPayments) + amount;
    }

    return [monthlyPayment, totalRepay];
}

// --- 步骤 2: 修改显示函数，统一处理格式化 ---
function showResults(monthly, total, targetMonth = 1) {
    const lang = langSelect.value;
    const config = translations[lang];
    const typeChecked = document.querySelector('input[name="mortgage-type"]:checked').value;
    const currencyCode = getCurrencyCode(lang);

    document.querySelector('.before-results-container').classList.add('hidden');
    document.querySelector('.after-results-container').classList.remove('hidden');
    
    const formatter = new Intl.NumberFormat(config.locale, {
        style: 'currency', currency: currencyCode,
        minimumFractionDigits: 2, maximumFractionDigits: 2
    });

    // 处理标题文字：如果是等额本金，显示具体月份
    let labelText = config.monthlyRepay;
    if (typeChecked === 'decreasing') {
        labelText += " " + config.specificMonthNote.replace('{n}', targetMonth);
    }
    document.querySelector('.results-monthly-repayments span').innerText = labelText;

    document.querySelector('#monthly-repayments').innerText = formatter.format(monthly);
    document.querySelector('#total-over-the-term').innerText = formatter.format(total);
}

// --- 步骤 3: 辅助函数确认 ---
function getCurrencyCode(lang) {
    const codes = { en: 'GBP', zh: 'CNY', ja: 'JPY', ko: 'KRW', ms: 'MYR', hi: 'INR' };
    return codes[lang] || 'GBP';
}

// --- 步骤 4: 提交监听 ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = checkInputs(); // [amount, term, rate, type]
    const targetMonthInput = document.getElementById('target-month').value;
    const targetMonth = parseInt(targetMonthInput) || 1;

    if (data) {
        // data 展开后是 amount, term, rate, type，最后传入 targetMonth
        const [monthly, total] = calculate(...data, targetMonth);
        showResults(monthly, total, targetMonth);
    }
});

clearAllBtn.addEventListener('click', () => {
    form.reset();
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.error-div').forEach(el => el.classList.remove('error-div'));
    document.querySelector('.before-results-container').classList.remove('hidden');
    document.querySelector('.after-results-container').classList.add('hidden');
    rightContent.classList.remove('after-reset');
});