/**
 * 国际化翻译配置
 * 支持语言：英文、中文、日语、韩语、马来语、印地语
 * 扩展点：可添加更多语言用于国际化 SEO
 */
export const translations = {
    en: {
        // 基础信息
        title: 'Mortgage Calculator',
        clearAll: 'Clear All',
        amount: 'Mortgage Amount',
        term: 'Mortgage Term',
        rate: 'Interest Rate',
        type: 'Mortgage Type',

        // 还款方式
        repayment: 'Repayment',
        decreasing: 'Decreasing (Equal Principal)',
        interestOnly: 'Interest Only',

        // 操作按钮
        calculate: 'Calculate Repayments',

        // 结果显示
        resultsTitle: 'Your results',
        resultsDesc:
            'Your results are shown below based on the information you provided. To adjust the results, edit the form and click calculate repayments again.',
        monthlyRepay: 'Your monthly repayments',
        totalRepay: "Total you'll repay over the term",
        emptyTitle: 'Results shown here',
        emptyDesc:
            'Complete the form and click calculate repayments to see what your monthly repayments would be.',

        // 验证
        error: 'This field is required',
        years: 'years',

        // 货币配置
        currencySymbol: '£',
        locale: 'en-GB',
        currencyCode: 'GBP',
        monthUnit: 'Mo.',

        // 高级功能
        targetMonthLabel: 'View Specific Month (Optional)',
        viewMethods: 'View Cal Method',
        specificMonthNote: '(Month {n})',

        // 计算方法说明
        methodsTitle: 'Calculation Methods',
        repaymentMethodDesc: 'Monthly payment stays the same. Interest is higher at the start.',
        decreasingMethodDesc: 'Principal is split equally. Total interest is lower.',
        interestOnlyMethodDesc: 'You only pay interest. Principal remains unchanged.',

        // 提前还款
        advancedTitle: 'Early Repayment Options',
        lumpSumOption: 'Lump Sum',
        monthlyExtraOption: 'Monthly Extra',
        repayAmount: 'Repay Amount',
        repayAtMonth: 'At Month',
        extraMonthly: 'Monthly Extra',
        startFrom: 'StartMonth',
        repayStrategy: 'Repayment Strategy',
        reduceTerm: 'Reduce Term',
        reduceMonthly: 'Reduce Monthly',

        // 结果展示
        totalSaved: 'Interest Saved',
        termShortened: 'Term Shortened',
        remainingBalance: 'Balance at that time:',
        originalTotal: 'Original Total',
        principalLabel: 'Principal',
        interestLabel: 'Interest',
        monthLabel: 'Month',
        balanceLabel: 'Balance',
        totalInterest: 'Total Interest',

        // 底部信息
        disclaimer:
            'Note: The calculation results are for reference only and do not serve as a basis for the actual loan. Please refer to your bank contract for the actual repayment amount.',
        aboutUs: 'About Us',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        footerTitle: 'Mortgage Calculator',

        // 使用指南
        guideTitle: 'How to Use This Calculator',
        step1Title: 'Enter Basic Info',
        step1Desc: 'Fill in the loan amount, term (years), and interest rate in the left form.',
        step2Title: 'Select Payment Type',
        step2Desc:
            'Choose between Repayment (constant payment) or Decreasing (save more interest).',
        step3Title: 'Explore Advanced Options',
        step3Desc: 'Enable early repayment to see how much interest and time you can save.',
        step4Title: 'Review Comparison',
        step4Desc: 'Click calculate to see your monthly payments and total savings instantly.',

        // SEO
        pageTitle: 'Mortgage Calculator 2026 - Early Repayment & Interest Savings Analysis',
        pageDesc:
            'Use our 2026 Mortgage Calculator to compare EMI and Decreasing Principal. Analyze how early repayment and monthly extras can save your interest and shorten your loan term.',

        // FAQ
        faqTitle: 'Frequently Asked Questions',
        faqQ1: 'When is the best time to pay off a mortgage early?',
        faqA1: 'The core principle is Savings > Investment Return. The first 1/3 of the loan term is the golden window. At this stage, the principal balance is high, and interest accumulates quickly; early repayment significantly slashes total interest costs. Also, if your mortgage rate is high (>4.5%) and you lack better investment options, paying early is like getting a guaranteed return.',
        faqQ2: 'Should I shorten the term or reduce the monthly payment?',
        faqA2: 'It depends on your goal: 1. To save most money: Choose Shorten Term. By reducing the borrowing time, you maximize interest savings. 2. For better cash flow: Choose Reduce Monthly Payment. This increases your disposable income each month, perfect for those with upcoming big expenses or job changes.',

        // 知识库
        knowledgeTitle: 'Mortgage Knowledge Base',
        newsTitle: '2026 Interest Rate Trends',
        newsDesc:
            'Rates are stabilizing in 2026. Homeowners should monitor LPR changes. Our calculator helps simulate how rate fluctuations impact your long-term interest cost.',
        mathTitle: 'EMI vs. Decreasing Principal',
        mathDesc:
            'EMI offers stable payments, while Decreasing Principal reduces total interest faster. Use our tool to quantify which method aligns best with your cash flow.',
        inflationTitle: 'Why Not Rush Payments During Inflation?',
        inflationDesc:
            "Inflation is a debtor's friend. As currency value drops, your fixed mortgage debt becomes cheaper to repay over time. Keep your cash for higher-yield investments.",

        // 博客导航
        navBlog: 'Mortgage Guide',
        navStories: 'Mortgage Stories',
        blogTitle: 'Mortgage Knowledge Base',

        // 组合贷款
        loanType: 'Loan Type',
        singleLoan: 'Single Loan',
        combinedLoan: 'Combined Loan',
        commercialLoan: 'Commercial Loan',
        公积金Loan: 'Housing Fund Loan',
        combinedTotal: 'Combined Total'
    },

    zh: {
        // 基础信息
        title: '贷款计算器',
        clearAll: '全部清除',
        amount: '贷款总额',
        term: '贷款期限',
        rate: '年利率',
        type: '还款方式',

        // 还款方式
        repayment: '等额本息',
        decreasing: '等额本金',
        interestOnly: '仅还利息',

        // 操作按钮
        calculate: '计算还款额',

        // 结果显示
        resultsTitle: '计算结果',
        resultsDesc: '下方显示基于您提供的信息计算出的结果。如需调整，请修改表单并重新计算。',
        monthlyRepay: '每月还款额',
        totalRepay: '实际还款总额',
        emptyTitle: '结果在此显示',
        emptyDesc: '填写表格并点击计算还款额查看结果。',

        // 验证
        error: '此项为必填项',
        years: '年',

        // 货币配置
        currencySymbol: '¥',
        locale: 'zh-CN',
        currencyCode: 'CNY',
        monthUnit: '月',

        // 高级功能
        targetMonthLabel: '查看特定月份 (选填)',
        viewMethods: '查看计算方法',
        specificMonthNote: '(第 {n} 个月)',

        // 计算方法说明
        methodsTitle: '计算方法详解',
        repaymentMethodDesc: '每月还款金额固定。前期利息占比大，后期本金占比大。',
        decreasingMethodDesc: '本金每月平摊，利息随本金减少而递减，前期还款压力大。',
        interestOnlyMethodDesc: '每月只还利息，不还本金。总利息支出最高。',

        // 提前还款
        advancedTitle: '提前还款选项 (高级)',
        lumpSumOption: '单次大额冲抵',
        monthlyExtraOption: '每月额外增额',
        repayAmount: '还款金额',
        repayAtMonth: '在第几个月',
        extraMonthly: '每月多还',
        startFrom: '起始月份',
        repayStrategy: '还款策略',
        reduceTerm: '缩短期限',
        reduceMonthly: '减少月供',

        // 结果展示
        totalSaved: '节省利息',
        termShortened: '提前结清时间',
        remainingBalance: '届时剩余本金:',
        originalTotal: '原始还款总额',
        principalLabel: '本金',
        interestLabel: '利息',
        monthLabel: '月份',
        balanceLabel: '余额',
        totalInterest: '总利息',

        // 底部信息
        disclaimer: '注：计算结果仅供参考，不作为贷款依据。实际还款额请以银行合同为准。',
        aboutUs: '关于我们',
        privacyPolicy: '隐私政策',
        termsOfService: '服务协议',
        footerTitle: '房贷计算器',

        // 使用指南
        guideTitle: '如何使用此计算器',
        step1Title: '输入基础贷款信息',
        step1Desc: '在左侧表单填写贷款金额、期限（年）和利率。',
        step2Title: '选择还款模式',
        step2Desc: '选择等额本息（月供固定）或等额本金（省利息）。',
        step3Title: '探索提前还款',
        step3Desc: '开启高级选项，模拟额外还款后的省钱效果。',
        step4Title: '查看详细对比结果',
        step4Desc: '点击计算，右侧即刻显示月供、总额及节省详情。',

        // SEO
        pageTitle: '2026 房贷计算器 - 提前还贷省钱分析 & 等额本金/本息对比',
        pageDesc:
            '使用 2026 最新房贷计算器对比等额本息与等额本金。分析提前还贷、每月额外还款如何帮您节省利息支出并缩短还款年限。',

        // FAQ
        faqTitle: '常见问题解答 (FAQ)',
        faqQ1: '什么时候提前还贷最划算？',
        faqA1: '核心原则是省下的利息 > 投资收益。从时间点看，还款周期的前 1/3 是黄金期。此时本金占比高，利息产生快，提前还款能极大削减总利息。此外，当房贷利率处于高位（如 > 4.5%）且您没有更好的投资渠道时，提前还款相当于获得了一份稳健的高收益。',
        faqQ2: '缩短年限和减少月供哪个更好？',
        faqA2: '这取决于您的目标：1. 追求省钱：选缩短年限。因为借钱时间缩短，利息节省效果最强，通常比减少月供多省下数倍利息。2. 追求生活质量：选减少月供。这能直接增加您每月的可支配现金流，缓解经济压力，适合近期有大额支出或职业变动的人群。',

        // 知识库
        knowledgeTitle: '房贷知识库 & 决策建议',
        newsTitle: '2026年全球利率走势简析',
        newsDesc:
            '进入2026年，全球主要经济体通胀趋于平稳，利率市场进入高位横盘期。对于购房者而言，LPR（贷款市场报价利率）的微调将直接影响月供压力。建议关注宏观政策调控，利用本工具的提前还贷对比功能，实时测算利率变动对总利息的影响。',
        mathTitle: '等额本金与本息的数学差异',
        mathDesc:
            '等额本息（EMI）的数学本质是复利现值公式，前期利息比例极高；而等额本金则是线性递减，本金固定，利息随本金减少而缩减。长期看，等额本金能节省 15%-25% 的利息支出，但前期还款压力大。本工具可以帮您直观量化这种利息差。',
        inflationTitle: '为什么通胀时期不建议过快提前还贷？',
        inflationDesc:
            '通胀是债务人的朋友。在通胀环境下，货币购买力下降，而您的房贷债务是名义固定的。这意味着您在用未来贬值的钱偿还当前的债务。如果您的理财收益率或收入增长率高于贷款利率，保留现金流往往比急于还清贷款更具财务优势。',

        // 博客导航
        navBlog: '房贷指南',
        navStories: '房贷故事',
        blogTitle: '房贷知识库',

        // 组合贷款
        loanType: '贷款类型',
        singleLoan: '单贷',
        combinedLoan: '组合贷',
        commercialLoan: '商业贷款',
        housingFundLoan: '公积金贷款',
        combinedTotal: '合计',
        combinedResultsTitle: '组合贷款结果',
        combinedResultsDesc: '下方显示您的组合贷款计算结果。',
        commercialRepayAmount: '商贷还款金额',
        housingFundRepayAmount: '公积金还款金额'
    },

    // 其他语言可按需添加
    ja: {
        title: '住宅ローン計算機',
        calculate: '返済額を計算',
        amount: 'ローン金額',
        term: '返済期間',
        rate: '金利',
        repayment: '元利均等返済',
        decreasing: '元金均等返済',
        interestOnly: '利子のみ',
        years: '年',
        currencySymbol: '¥',
        locale: 'ja-JP',
        currencyCode: 'JPY',
        loanType: 'ローンタイプ',
        singleLoan: '单一ローン',
        combinedLoan: 'コンビネーション',
        commercialLoan: '商業ローン',
        housingFundLoan: '公积金融資',
        combinedTotal: '合計',
        totalInterest: '総利息'
    },

    ko: {
        title: '주택담보대출 계산기',
        calculate: '상환액 계산',
        amount: '대출 금액',
        term: '대출 기간',
        rate: '금리',
        repayment: '원리금균등상환',
        decreasing: '원금균등상환',
        interestOnly: '이자만상환',
        years: '년',
        currencySymbol: '₩',
        locale: 'ko-KR',
        currencyCode: 'KRW',
        loanType: '대출 유형',
        singleLoan: '단일 대출',
        combinedLoan: '조합 대출',
        commercialLoan: '상업 대출',
        housingFundLoan: '주택공적기금',
        combinedTotal: '총액',
        totalInterest: '총 이자'
    },

    ms: {
        title: 'Kalkulator Gadai Janji',
        calculate: 'Hitung Pembayaran',
        amount: 'Jumlah Pinjaman',
        term: 'Tempoh Pinjaman',
        rate: 'Kadar Faedah',
        repayment: 'Pembayaran Setara',
        decreasing: 'Prinsipal Berkurangan',
        interestOnly: 'Faedah Sahaja',
        years: 'tahun',
        currencySymbol: 'RM',
        locale: 'ms-MY',
        currencyCode: 'MYR',
        loanType: 'Jenis Pinjaman',
        singleLoan: 'Pinjaman Tunggal',
        combinedLoan: 'Pinjaman Gabungan',
        commercialLoan: 'Pinjaman Komersial',
        housingFundLoan: 'Dana rumah',
        combinedTotal: 'Jumlah',
        totalInterest: 'Faedah Jumlah'
    },

    hi: {
        title: 'गृह ऋण कैलकुलेटर',
        calculate: 'भुगतान की गणना करें',
        amount: 'ऋण राशि',
        term: 'ऋण अवधि',
        rate: 'ब्याज दर',
        repayment: 'समान किस्त',
        decreasing: 'कम होती मूल राशि',
        interestOnly: 'ब्याज मात्र',
        years: 'वर्ष',
        currencySymbol: '₹',
        locale: 'hi-IN',
        currencyCode: 'INR',
        loanType: 'ऋण प्रकार',
        singleLoan: 'एकल ऋण',
        combinedLoan: 'संयुक्त ऋण',
        commercialLoan: 'व्यावसायिक ऋण',
        housingFundLoan: 'आवास निधि',
        combinedTotal: 'कुल',
        totalInterest: 'कुल ब्याज'
    }
};
