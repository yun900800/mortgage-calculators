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
        specificMonthNote: "(Month {n})",
        methodsTitle: "Calculation Methods",
        repaymentMethodDesc: "Monthly payment stays the same. Interest is higher at the start.",
        decreasingMethodDesc: "Principal is split equally. Total interest is lower.",
        interestOnlyMethodDesc: "You only pay interest. Principal remains unchanged.",
        advancedTitle: "Early Repayment Options",
        lumpSumOption: "Lump Sum",
        monthlyExtraOption: "Monthly Extra",
        repayAmount: "Repay Amount",
        repayAtMonth: "At Month",
        extraMonthly: "Monthly Extra",
        startFrom: "Start From Month",
        totalSaved: "Interest Saved",
        termShortened: "Term Shortened",
        remainingBalance: "Remaining Balance:",
        principalLabel: "Principal",
        interestLabel: "Interest",
        disclaimer: "Note: The calculation results are for reference only and do not serve as a basis for the actual loan. Please refer to your bank contract for the actual repayment amount.",
        aboutUs: "About Us",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        footerTitle: "Mortgage Calculator",
        guideTitle: "How to Use This Calculator",
        step1Title: "Enter Basic Info",
        step1Desc: "Fill in the loan amount, term (years), and interest rate in the left form.",
        step2Title: "Select Payment Type",
        step2Desc: "Choose between 'Repayment' (constant payment) or 'Decreasing' (save more interest).",
        step3Title: "Explore Advanced Options",
        step3Desc: "Enable early repayment to see how much interest and time you can save.",
        step4Title: "Review Comparison",
        step4Desc: "Click calculate to see your monthly payments and total savings instantly.",
        pageTitle: "Mortgage Calculator 2026 - Early Repayment & Interest Savings Analysis",
        pageDesc: "Use our 2026 Mortgage Calculator to compare EMI and Decreasing Principal. Analyze how early repayment and monthly extras can save your interest and shorten your loan term.",
        faqTitle: "Frequently Asked Questions",
        faqQ1: "When is the best time to pay off a mortgage early?",
        faqA1: "The core principle is 'Savings > Investment Return'. The first 1/3 of the loan term is the golden window. At this stage, the principal balance is high, and interest accumulates quickly; early repayment significantly slashes total interest costs. Also, if your mortgage rate is high (>4.5%) and you lack better investment options, paying early is like getting a guaranteed return.",
        faqQ2: "Should I shorten the term or reduce the monthly payment?",
        faqA2: "It depends on your goal: 1. To save most money: Choose 'Shorten Term'. By reducing the borrowing time, you maximize interest savings. 2. For better cash flow: Choose 'Reduce Monthly Payment'. This increases your disposable income each month, perfect for those with upcoming big expenses or job changes.",
        knowledgeTitle: "Mortgage Knowledge Base",
        newsTitle: "2026 Interest Rate Trends",
        newsDesc: "Rates are stabilizing in 2026. Homeowners should monitor LPR changes. Our calculator helps simulate how rate fluctuations impact your long-term interest cost.",
        mathTitle: "EMI vs. Decreasing Principal",
        mathDesc: "EMI offers stable payments, while Decreasing Principal reduces total interest faster. Use our tool to quantify which method aligns best with your cash flow.",
        inflationTitle: "Why Not Rush Payments During Inflation?",
        inflationDesc: "Inflation is a debtor's friend. As currency value drops, your fixed mortgage debt becomes 'cheaper' to repay over time. Keep your cash for higher-yield investments.",
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
        specificMonthNote: "(第 {n} 个月)",
        methodsTitle: "计算方法详解",
        repaymentMethodDesc: "每月还款金额固定。前期利息占比大，后期本金占比大。",
        decreasingMethodDesc: "本金每月平摊，利息随本金减少而递减，前期还款压力大。",
        interestOnlyMethodDesc: "每月只还利息，不还本金。总利息支出最高。",
        advancedTitle: "提前还款选项 (高级)",
        lumpSumOption: "单次大额冲抵",
        monthlyExtraOption: "每月额外增额",
        repayAmount: "还款金额",
        repayAtMonth: "在第几个月",
        extraMonthly: "每月多还",
        startFrom: "起始月份",
        totalSaved: "节省利息",
        termShortened: "提前结清时间",
        remainingBalance: "该月剩余本金:",
        principalLabel: "本金",
        interestLabel: "利息",
        disclaimer: "注：计算结果仅供参考，不作为贷款依据。实际还款额请以银行合同为准。",
        aboutUs: "关于我们",
        privacyPolicy: "隐私政策",
        termsOfService: "服务协议",
        footerTitle: "房贷计算器",
        guideTitle: "如何使用此计算器",
        step1Title: "输入基础信息",
        step1Desc: "在左侧表单填写贷款金额、期限（年）和利率。",
        step2Title: "选择还款模式",
        step2Desc: "选择“等额本息”（月供固定）或“等额本金”（省利息）。",
        step3Title: "探索提前还款",
        step3Desc: "开启高级选项，模拟额外还款后的省钱效果。",
        step4Title: "查看对比结果",
        step4Desc: "点击计算，右侧即刻显示月供、总额及节省详情。",
        pageTitle: "2026 房贷计算器 - 提前还贷省钱分析 & 等额本金/本息对比",
        pageDesc: "使用 2026 最新房贷计算器对比等额本息与等额本金。分析提前还贷、每月额外还款如何帮您节省利息支出并缩短还款年限。",
        faqTitle: "常见问题解答 (FAQ)",
        faqQ1: "什么时候提前还贷最划算？",
        faqA1: "核心原则是“省下的利息 > 投资收益”。从时间点看，还款周期的前 1/3 是黄金期。此时本金占比高，利息产生快，提前还款能极大削减总利息。此外，当房贷利率处于高位且您没有更好的投资渠道时，提前还款相当于获得了一个稳赚的收益。",
        faqQ2: "缩短年限和减少月供哪个更好？",
        faqA2: "这取决于您的目标：1. 追求极致省钱：选“缩短年限”。借钱时间缩短，利息节省效果最强。 2. 追求现金流：选“减少月供”。这能直接增加每月的可支配支出，提升生活容错率，适合近期有大开支计划的人群。",
        knowledgeTitle: "房贷知识库 & 决策建议",
        newsTitle: "2026年利率走势简析",
        newsDesc: "2026年全球利率进入稳健期。购房者应关注基准利率微调。利用我们的提前还贷功能，您可以实时测算不同利率环境下的最优还款方案。",
        mathTitle: "等额本金与本息的数学差异",
        mathDesc: "等额本息前期利息多，还款压力稳；等额本金本息逐月递减，总利息更省。利用本工具可直观对比两种模式下的总支出差异。",
        inflationTitle: "通胀时期为什么不急于提前还贷？",
        inflationDesc: "通胀会稀释债务价值。如果您手头资金的投资收益高于房贷利率，或者处于高通胀阶段，利用“贬值”的未来货币还债其实更划算。",
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
        specificMonthNote: "({n}ヶ月目)",
        methodsTitle: "計算方法の解説",
        repaymentMethodDesc: "毎月の返済額が一定です。最初は利息の割合が高く、徐々に元金の返済が進みます。",
        decreasingMethodDesc: "元金を均等に返済します。利息は残高に応じて減るため、総返済額は少なくなります。",
        interestOnlyMethodDesc: "毎月利息のみを支払い、元金は減りません。総利息負担が最も大きくなります。",
        advancedTitle: "繰上返済オプション (高度)",
        lumpSumOption: "一括繰上返済",
        monthlyExtraOption: "毎月の増額返済",
        repayAmount: "返済額",
        repayAtMonth: "返済月 (何ヶ月目)",
        extraMonthly: "毎月の増額分",
        startFrom: "開始月",
        totalSaved: "節約された利息",
        termShortened: "短縮された期間",
        remainingBalance: "その月のローン残高:",
        principalLabel: "元金",
        interestLabel: "利息",
        disclaimer: "注：計算結果は参考値であり、実際のローンの根拠となるものではありません。実際の返済額については銀行の契約書をご参照ください。",
        aboutUs: "私たちについて",
        privacyPolicy: "プライバシーポリシー",
        termsOfService: "利用規約",
        footerTitle: "住宅ローン計算機",
        guideTitle: "使い方のガイド",
        step1Title: "基本情報の入力",
        step1Desc: "左側のフォームに借入金額、期間、金利を入力します。",
        step2Title: "返済方式の選択",
        step2Desc: "「元利均等」または「元金均等」を選択します。",
        step3Title: "繰上返済のシミュレーション",
        step3Desc: "高度なオプションを有効にして、利息の節約効果を確認します。",
        step4Title: "結果の比較",
        step4Desc: "計算ボタンをクリックし、節約額と返済期間の短縮を即座に確認します。",
        pageTitle: "2026 住宅ローン計算機 - 繰上返済シミュレーション & 利息節約分析",
        pageDesc: "2026年最新の住宅ローン計算機で元利均等と元金均等を比較。繰上返済や毎月の増額が利息削減と期間短縮にどう影響するか分析します。",
        faqTitle: "よくある質問 (FAQ)",
        faqQ1: "繰上返済はいつ行うのが最も効果的ですか？",
        faqA1: "原則として「早いほど効果が高い」です。返済期間の前半1/3に行うことで、元金が早く減り、その後の利息発生を大幅に抑えることができます。低金利時代でも、投資利回りよりローン金利が高い場合は繰上返済が有利です。",
        faqQ2: "「期間短縮型」と「返済額軽減型」のどちらが良いですか？",
        faqA2: "1. 利息を減らしたいなら「期間短縮型」。総支払額を最小限に抑えられます。2. 毎月の家計を楽にしたいなら「返済額軽減型」。生活のゆとりを優先する場合に適しています。",
        knowledgeTitle: "住宅ローンの知識・アドバイス",
        newsTitle: "2026年の金利動向予測",
        newsDesc: "2026年は金利が安定期に入ると予測されています。繰上返済のタイミングを計るために、最新のLPRや市場動向を注視しましょう。",
        mathTitle: "元利均等と元金均等の数学的な違い",
        mathDesc: "元利均等は支払額が一定で計画が立てやすいですが、元金均等は総利息が少なくなります。当ツールでその差を数値化できます。",
        inflationTitle: "インフレ期に繰上返済を急がない理由",
        inflationDesc: "インフレは債務者にとって有利に働きます。お金の価値が下がるため、固定された負債を将来の「安い」お金で返済する方が合理的な場合があります。",
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
        specificMonthNote: "({n}개월차)",
        methodsTitle: "상환 방식 안내",
        repaymentMethodDesc: "매월 상환액이 일정합니다. 초기에는 이자 비중이 높고 후기로 갈수록 원금 비중이 높아집니다.",
        decreasingMethodDesc: "원금을 매달 균등하게 나누어 갚습니다. 이자가 줄어듦에 따라 총 상환액도 감소합니다.",
        interestOnlyMethodDesc: "매월 이자만 지불하며 원금은 줄어들지 않습니다. 총 이자 비용이 가장 많이 발생합니다.",
        advancedTitle: "중도 상환 옵션 (고급)",
        lumpSumOption: "일시 중도 상환",
        monthlyExtraOption: "매월 추가 상환",
        repayAmount: "상환 금액",
        repayAtMonth: "상환 시점 (개월)",
        extraMonthly: "매월 추가액",
        startFrom: "시작 개월",
        totalSaved: "절약된 이자",
        termShortened: "단축된 기간",
        remainingBalance: "해당 월 잔액:",
        principalLabel: "원금",
        interestLabel: "이자",
        disclaimer: "참고: 계산 결과는 참고용일 뿐이며 실제 대출의 근거가 되지 않습니다. 실제 상환 금액은 은행 계약서를 참조하십시오.",
        aboutUs: "회사 소개",
        privacyPolicy: "개인정보 처리방침",
        termsOfService: "서비스 약관",
        footerTitle: "주택 담보 대출 계산기",
        guideTitle: "계산기 사용 가이드",
        step1Title: "기본 정보 입력",
        step1Desc: "왼쪽 양식에 대출 금액, 기간(년), 이자율을 입력합니다.",
        step2Title: "상환 방식 선택",
        step2Desc: "원리금 균등 또는 원금 균등 상환 방식을 선택합니다.",
        step3Title: "중도 상환 시뮬레이션",
        step3Desc: "고급 옵션을 사용하여 이자 절감 효과를 확인합니다.",
        step4Title: "결과 비교 분석",
        step4Desc: "계산 버튼을 눌러 월 상환액과 총 절약액을 즉시 확인합니다.",
        pageTitle: "2026 주택 담보 대출 계산기 - 중도 상환 및 이자 절감 분석",
        pageDesc: "2026 최신 대출 계산기로 원리금 균등과 원금 균등을 비교하세요. 중도 상환과 추가 납입이 이자 절감 및 기간 단축에 미치는 영향을 분석합니다.",
        faqTitle: "자주 묻는 질문 (FAQ)",
        faqQ1: "중도 상환은 언제 하는 것이 가장 좋나요?",
        faqA1: "이자 비용을 줄이려면 '가능한 한 빨리'가 정답입니다. 대출 초기에는 원금이 많아 이자가 빠르게 쌓이므로, 초기에 상환할수록 전체 이자 부담이 크게 줄어듭니다.",
        faqQ2: "기간 단축형과 금액 감소형 중 무엇을 선택해야 하나요?",
        faqA2: "절대적인 이자 절감액은 '기간 단축형'이 훨씬 큽니다. 반면, 매달 나가는 고정 지출을 줄여 가계에 여유를 두고 싶다면 '금액 감소형'이 유리합니다.",
        knowledgeTitle: "대출 지식 센터",
        newsTitle: "2026년 금리 전망",
        newsDesc: "2026년 금리는 안정화 단계에 진입할 것으로 보입니다. 시장 금리 변화에 맞춰 최적의 상환 전략을 세우는 것이 중요합니다.",
        mathTitle: "원리금 vs 원금 균등 상환의 차이",
        mathDesc: "원리금 균등은 매달 금액이 같아 관리가 쉽고, 원금 균등은 총 이자가 더 적습니다. 본 도구로 그 차이를 직접 확인해 보세요.",
        inflationTitle: "인플레이션 시기에 중도 상환을 서두르지 않는 이유",
        inflationDesc: "인플레이션은 화폐 가치를 떨어뜨려 실질적인 채무 부담을 줄여줍니다. 투자 수익률이 대출 금리보다 높다면 상환보다 자산 운용이 나을 수 있습니다.",
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
        specificMonthNote: "(Bulan {n})",
        methodsTitle: "Kaedah Pengiraan",
        repaymentMethodDesc: "Bayaran bulanan tetap sepanjang tempoh. Faedah lebih tinggi di peringkat awal.",
        decreasingMethodDesc: "Prinsipal dibahagi sama rata. Jumlah faedah keseluruhan adalah lebih rendah.",
        interestOnlyMethodDesc: "Hanya bayar faedah setiap bulan; jumlah prinsipal tidak akan berkurang.",
        advancedTitle: "Pilihan Bayaran Balik Awal",
        lumpSumOption: "Bayaran Sekaligus",
        monthlyExtraOption: "Tambahan Bulanan",
        repayAmount: "Amaun Bayaran",
        repayAtMonth: "Pada Bulan Ke-",
        extraMonthly: "Tambahan Bulanan",
        startFrom: "Bulan Permulaan",
        totalSaved: "Faedah Dijimatkan",
        termShortened: "Tempoh Dipendekkan",
        remainingBalance: "Baki Pinjaman:",
        principalLabel: "Prinsipal",
        interestLabel: "Faedah",
        disclaimer: "Nota: Keputusan pengiraan adalah untuk rujukan sahaja dan tidak berfungsi sebagai asas untuk pinjaman sebenar. Sila rujuk kontrak bank anda untuk jumlah bayaran balik sebenar.",
        aboutUs: "Mengenai Kami",
        privacyPolicy: "Dasar Privasi",
        termsOfService: "Syarat Perkhidmatan",
        footerTitle: "Kalkulator Pinjaman Perumahan",
        guideTitle: "Cara Menggunakan Kalkulator",
        step1Title: "Masukkan Maklumat Asas",
        step1Desc: "Isi jumlah pinjaman, tempoh (tahun), dan kadar faedah dalam borang kiri.",
        step2Title: "Pilih Jenis Bayaran",
        step2Desc: "Pilih antara 'Anuiti' (bayaran tetap) atau 'Prinsipal Sama Rata'.",
        step3Title: "Teroka Pilihan Lanjutan",
        step3Desc: "Aktifkan bayaran balik awal untuk melihat penjimatan faedah.",
        step4Title: "Semak Keputusan",
        step4Desc: "Klik kira untuk melihat bayaran bulanan dan jumlah penjimatan anda.",
        pageTitle: "Kalkulator Pinjaman Perumahan 2026 - Analisis Penjimatan Faedah",
        pageDesc: "Gunakan kalkulator 2026 kami untuk membandingkan kaedah bayaran balik. Analisis bagaimana bayaran tambahan bulanan menjimatkan faedah anda.",
        faqTitle: "Soalan Lazim (FAQ)",
        faqQ1: "Bilakah masa terbaik untuk menyelesaikan pinjaman lebih awal?",
        faqA1: "Masa terbaik adalah pada awal tempoh pinjaman (1/3 pertama). Ini kerana baki prinsipal masih tinggi dan faedah dijana dengan cepat. Menyelesaikan lebih awal menjimatkan faedah maksimum.",
        faqQ2: "Patutkah saya memendekkan tempoh atau mengurangkan bayaran bulanan?",
        faqA2: "Untuk penjimatan wang maksimum, pilih 'Pendekkan Tempoh'. Untuk aliran tunai bulanan yang lebih baik, pilih 'Kurangkan Bayaran Bulanan'.",
        knowledgeTitle: "Pangkalan Pengetahuan Pinjaman",
        newsTitle: "Trend Kadar Faedah 2026",
        newsDesc: "Kadar dijangka stabil pada 2026. Pantau perubahan kadar pasaran untuk merancang strategi bayaran balik terbaik.",
        mathTitle: "Anuiti vs Prinsipal Sama Rata",
        mathDesc: "Anuiti menawarkan kestabilan, manakala Prinsipal Sama Rata menjimatkan lebih banyak faedah secara keseluruhan.",
        inflationTitle: "Kenapa Jangan Terburu-buru Membayar Semasa Inflasi?",
        inflationDesc: "Inflasi mengurangkan nilai hutang. Jika pulangan pelaburan anda lebih tinggi daripada kadar faedah pinjaman, lebih baik simpan tunai untuk pelaburan.",
    },
    hi: {
        title: "ऋण कैलकुलेटर",
        clearAll: "सभी साफ़ करें",
        amount: "ऋण राशि",
        term: "ऋण अवधि",
        rate: "ब्याज दर",
        type: "ऋण का प्रकार",
        repayment: "EMI (मूलधन + ब्याज)",
        interestOnly: "केवल ब्याज",
        calculate: "गणना करें",
        resultsTitle: "आपका परिणाम",
        resultsDesc: "दी गई जानकारी के आधार पर आपके परिणाम नीचे दिए गए हैं।",
        monthlyRepay: "आपकी मासिक किस्त (EMI)",
        totalRepay: "कुल पुनर्भुगतान",
        emptyTitle: "परिणाम यहाँ दिखाई देंगे",
        emptyDesc: "कृपया फॉर्म भरें और अपनी मासिक किस्त देखने के लिए गणना करें पर क्लिक करें।",
        error: "यह फ़ील्ड आवश्यक है",
        years: "वर्ष",
        currencySymbol: "₹", 
        locale: "hi-IN",
        currencyCode: "INR",
        decreasing: "समान मूलधन (Decreasing)",
        targetMonthLabel: "विशिष्ट महीना देखें (वैकल्पिक)",
        monthUnit: "माह",
        viewMethods: "गणना विधि देखें",
        specificMonthNote: "(महीना {n})",
        methodsTitle: "गणना के तरीके",
        repaymentMethodDesc: "पूरे कार्यकाल में मासिक भुगतान स्थिर रहता है। शुरुआत में ब्याज अधिक होता है।",
        decreasingMethodDesc: "मूलधन को समान रूप से विभाजित किया जाता है। कुल ब्याज भुगतान कम होता है।",
        interestOnlyMethodDesc: "आप केवल ब्याज का भुगतान करते हैं; मूल राशि कम नहीं होती है।",
        advancedTitle: "समय से पहले भुगतान",
        lumpSumOption: "एकमुश्त भुगतान",
        monthlyExtraOption: "मासिक अतिरिक्त",
        repayAmount: "भुगतान राशि",
        repayAtMonth: "महीने में",
        extraMonthly: "मासिक अतिरिक्त राशि",
        startFrom: "प्रारंभ महीना",
        totalSaved: "बचाया गया ब्याज",
        termShortened: "अवधि में कमी",
        remainingBalance: "शेष ऋण राशि:",
        principalLabel: "मूलधन",
        interestLabel: "ब्याज",
        disclaimer: "नोट: गणना के परिणाम केवल संदर्भ के लिए हैं। वास्तविक राशि के लिए अपने बैंक से संपर्क करें।",
        aboutUs: "हमारे बारे में",
        privacyPolicy: "गोपनीयता नीति",
        termsOfService: "सेवा की शर्तें",
        footerTitle: "होम लोन कैलकुलेटर",
        guideTitle: "कैलकुलेटर का उपयोग कैसे करें",
        step1Title: "बुनियादी जानकारी भरें",
        step1Desc: "ऋण राशि, अवधि और ब्याज दर दर्ज करें।",
        step2Title: "भुगतान प्रकार चुनें",
        step2Desc: "EMI या समान मूलधन (Decreasing Principal) में से चुनें।",
        step3Title: "समय से पहले भुगतान देखें",
        step3Desc: "अतिरिक्त भुगतान जोड़ने पर होने वाली बचत की गणना करें।",
        step4Title: "परिणाम देखें",
        step4Desc: "गणना करें पर क्लिक करें और अपनी बचत तुरंत देखें।",
        pageTitle: "होम लोन कैलकुलेटर 2026 - ब्याज बचत विश्लेषण",
        pageDesc: "EMI और समान मूलधन की तुलना करें। देखें कि समय से पहले भुगतान से आप कितना ब्याज बचा सकते हैं।",
        faqTitle: "सामान्य प्रश्न (FAQ)",
        faqQ1: "समय से पहले ऋण चुकाने का सबसे अच्छा समय कब है?",
        faqA1: "ऋण की अवधि के पहले 1/3 भाग में भुगतान करना सबसे फायदेमंद होता है, क्योंकि उस समय ब्याज सबसे अधिक लग रहा होता है।",
        faqQ2: "क्या मुझे अवधि कम करनी चाहिए या EMI कम करनी चाहिए?",
        faqA2: "ज्यादा पैसा बचाने के लिए 'अवधि कम करना' बेहतर है। बेहतर मासिक बजट के लिए 'EMI कम करना' चुनें।",
        knowledgeTitle: "ऋण ज्ञान केंद्र",
        newsTitle: "2026 ब्याज दर रुझान",
        newsDesc: "2026 में ब्याज दरें स्थिर रहने की उम्मीद है। बाजार के बदलावों पर नजर रखें।",
        mathTitle: "EMI बनाम समान मूलधन",
        mathDesc: "EMI में भुगतान स्थिर रहता है, जबकि समान मूलधन (Decreasing) में कुल ब्याज कम देना पड़ता है।",
        inflationTitle: "मुद्रास्फीति (Inflation) के दौरान भुगतान क्यों न करें?",
        inflationDesc: "मुद्रास्फीति के समय पैसे की कीमत गिरती है। यदि आपके निवेश पर रिटर्न ऋण की ब्याज दर से अधिक है, तो निवेश करना बेहतर हो सकता है।",
    }
};

// 2. DOM 元素获取
const form = document.querySelector('form');
// 贷款额度、期限、利率输入框
const mortgageAmountInput = document.querySelector('#mortgage-amount');
const mortgageTermInput = document.querySelector('#mortgage-term');
const interestRateInput = document.querySelector('#interest-rate');

// 还款方式单选框
const radioInputs = document.querySelectorAll('input[name="mortgage-type"]');
// 计算按钮
const clearAllBtn = document.querySelector('.clear-all-btn');
// 结果显示容器
const rightContent = document.querySelector('.right-content');

// 每月还款和总还款显示元素
const monthlyPaymentTextContent = document.querySelector('#monthly-repayments');
const totalOverTheTermTextContent = document.querySelector('#total-over-the-term');

// 语言选择下拉菜单
const langSelect = document.querySelector('#lang-select');
// 获取符号显示元素
const currencyDisplay = document.querySelector('#currency-display');
// 1. 获取特定月份的容器
const targetMonthContainer = document.getElementById('target-month-container');

// 高级选项相关元素
const repayToggle = document.getElementById('early-repay-toggle');
// 提前还款模式的输入容器
const advancedPanel = document.getElementById('advanced-panel');
const tabs = document.querySelectorAll('.tab-item');
let activeMode = 'lump-sum';

// 示例：用户在输入“提前还款月份”时，自动提示他那时还欠多少钱
const monthInput = document.getElementById('monthly-extra-start');
const hintDisplay = document.getElementById('remaining-balance-hint'); // 假设你有个显示提示的标签

/**
 * 核心：获取干净的数字（处理逗号和非数字字符）
 */
function getCleanNumber(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    // 移除逗号并转换为浮点数
    const val = parseFloat(el.value.replace(/,/g, ''));
    return isNaN(val) ? 0 : val;
}

/**
 * 核心：格式化货币显示
 */
function formatCurrency(value) {
    const lang = document.getElementById('lang-select').value;
    const config = translations[lang];
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currencyCode,
    }).format(value);
}

/**
 * 核心：计算特定月份剩余本金
 */
function getRemainingBalance(P, years, annualRate, type, targetMonth) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (targetMonth <= 0) return P;
    if (targetMonth >= n) return 0;

    if (type === 'repayment') {
        const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const balance = P * Math.pow(1 + r, targetMonth) - 
                        (monthlyPayment * (Math.pow(1 + r, targetMonth) - 1)) / r;
        return Math.max(0, balance);
    } else if (type === 'decreasing') {
        return Math.max(0, P - (P / n) * targetMonth);
    } else if (type === 'interest-only') {
        return P; // 仅还利息模式下，本金在最后一月前不变
    }
    return 0;
}

/**
 * 更新 UI 上的余额提示
 */
function updateBalanceHint() {
    const P = getCleanNumber('mortgage-amount');
    const years = getCleanNumber('mortgage-term');
    const rate = getCleanNumber('interest-rate');
    const type = document.querySelector('input[name="mortgage-type"]:checked').value;
    
    // 根据当前选中的 Tab 决定取哪个月份
    // activeMode 变量应该在你切换 Tab 的逻辑中维护 ('lump-sum' 或 'monthly-extra')
    let targetMonth = 0;
    if (activeMode === 'lump-sum') {
        targetMonth = parseInt(document.getElementById('lump-sum-month').value);
    } else {
        targetMonth = parseInt(document.getElementById('monthly-extra-start').value);
    }

    const hintElement = document.getElementById('remaining-balance-hint');
    
    if (!P || !years || !rate || isNaN(targetMonth) || targetMonth <= 0) {
        hintElement.innerText = "";
        return;
    }

    const balance = getRemainingBalance(P, years, rate, type, targetMonth);
    const lang = document.getElementById('lang-select').value;
    const label = translations[lang].remainingBalance || "Remaining:";

    hintElement.innerText = `${label} ${formatCurrency(balance)}`;
}

// 1. 监听基础表单变化（如果改了总金额，余额提示也要变）
['mortgage-amount', 'mortgage-term', 'interest-rate'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateBalanceHint);
});

// 2. 监听还款方式单选框
document.querySelectorAll('input[name="mortgage-type"]').forEach(radio => {
    radio.addEventListener('change', updateBalanceHint);
});

// 3. 监听两个模式的月份输入
document.getElementById('lump-sum-month').addEventListener('input', updateBalanceHint);
document.getElementById('monthly-extra-start').addEventListener('input', updateBalanceHint);

// --- 开关控制 ---
repayToggle.addEventListener('change', () => {
    advancedPanel.classList.toggle('collapsed', !repayToggle.checked);
});

// --- Tab 切换 ---
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeMode = tab.dataset.mode;
        document.getElementById('lump-sum-fields').classList.toggle('hidden', activeMode !== 'lump-sum');
        document.getElementById('monthly-extra-fields').classList.toggle('hidden', activeMode !== 'monthly-extra');
    });
});


/**
 * 计算在第 n 个月还款后的剩余本金
 * @param {number} P - 贷款原始本金
 * @param {number} years - 贷款年限
 * @param {number} annualRate - 年利率 (如 5.5)
 * @param {string} type - 还款方式 ('repayment', 'decreasing', 'interest-only')
 * @param {number} targetMonth - 目标月份
 * @returns {number} - 第 n 个月还款后的余额
 */
function getRemainingBalance(P, years, annualRate, type, targetMonth) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    let balance = P;
    
    // 如果目标月份为0，直接返回初始本金
    if (targetMonth <= 0) return P;

    if (type === 'repayment') {
        // 等额本息：使用复利公式直接计算剩余本金（比循环更快）
        const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        balance = P * Math.pow(1 + r, targetMonth) - 
                  (monthlyPayment * (Math.pow(1 + r, targetMonth) - 1)) / r;
    } else if (type === 'decreasing') {
        // 等额本金：剩余本金 = 总本金 - 已还本金
        const principalPerMonth = P / n;
        balance = P - (principalPerMonth * targetMonth);
    } else if (type === 'interest-only') {
        // 仅还利息：除非是最后一个月，否则本金永远不变
        balance = (targetMonth >= n) ? 0 : P;
    }

    return Math.max(0, balance); // 确保余额不为负数
}

// --- 核心计算引擎 (逐月迭代) ---
function runCalculation(P, years, annualRate, type, extra) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    let balance = P;
    let totalInterest = 0;
    let month = 0;
    let baseM = 0;

    // 计算标准月供用于基准对比
    if (type === 'repayment') {
        baseM = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (type === 'interest-only') {
        baseM = P * r;
    } else {
        baseM = (P / n) + (P * r); // 等额本金首月
    }

    while (balance > 0.01 && month < n + 1) {
        month++;
        let interest = balance * r;
        let principal = 0;

        if (type === 'repayment') {
            principal = baseM - interest;
        } else if (type === 'decreasing') {
            principal = P / n;
        } else if (type === 'interest-only') {
            principal = (month === n) ? balance : 0;
        }

        balance -= principal;

        // 注入提前还款逻辑
        if (extra.active) {
            if (extra.mode === 'lump-sum' && month === extra.lumpMonth) balance -= extra.lumpAmount;
            if (extra.mode === 'monthly-extra' && month >= extra.startMonth) balance -= extra.monthlyExtra;
        }

        totalInterest += interest;
        if (balance < 0) balance = 0;
    }

    return { monthly: baseM, total: totalInterest + P, actualMonths: month };
}


/**
 * 核心：更新语言和格式
 * @param {string} lang 语言代码
 * @param {boolean} saveToStorage 是否存入本地缓存
 */
function updateLanguage(lang, saveToStorage = true) {
    const config = translations[lang];
    if (!config) return;
    document.documentElement.lang = lang;

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

    // 2. 【新增】动态更新浏览器标签页标题
    document.title = config.pageTitle;

    // 3. 【新增】动态更新 Meta Description (对社交媒体分享友好)
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', config.pageDesc);
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

    updateTargetMonthVisibility();
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

// 定义切换显示状态的函数
function updateTargetMonthVisibility() {
    // 获取当前被选中的还款方式
    const selectedType = document.querySelector('input[name="mortgage-type"]:checked');
    
    if (selectedType && selectedType.value === 'decreasing') {
        targetMonthContainer.style.display = 'block'; // 或者 'flex'，取决于你的布局
    } else {
        targetMonthContainer.style.display = 'none';
        // 隐藏时清空输入值，防止影响计算结果
        document.getElementById('target-month').value = ''; 
    }
}

// 修改你原有的 radioInputs 监听器
radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
        removeError(radio);
        updateTargetMonthVisibility(); // 每次切换单选框时检查一次
    });
});
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

/**
 * 计算贷款数据
 * @param {number} amount - 贷款总额 (P)
 * @param {number} term - 期限 (年)
 * @param {number} rate - 年利率 (%)
 * @param {string} type - 还款类型
 * @param {number} targetMonth - 目标月份 (t)
 * @returns {Object} - 包含月供详情和总额的对象
 */
// function calculate(amount, term, rate, type, targetMonth = 1) {
//     const monthlyInterestRate = rate / 12 / 100; // r
//     const numberOfPayments = term * 12;          // n
    
//     let monthlyPayment = 0; // 当月总还款额
//     let principal = 0;      // 当月应还本金
//     let interest = 0;       // 当月应还利息
//     let totalRepay = 0;     // 整个期限的总还款额

//     // 确保目标月份在有效范围内
//     targetMonth = Math.max(1, Math.min(targetMonth, numberOfPayments));

//     if (type === 'repayment') {
//         // --- 1. 等额本息 (Standard EMI) ---
//         // 公式: M = P * [r(1+r)^n] / [(1+r)^n - 1]
//         monthlyPayment = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
//                          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
//         // 计算第 t 个月的利息: 当前剩余本金 * 月利率
//         // 第 t 个月的剩余本金 = P(1+r)^(t-1) - M[(1+r)^(t-1) - 1]/r
//         const remainingBalanceBefore = amount * Math.pow(1 + monthlyInterestRate, targetMonth - 1) - 
//                                      (monthlyPayment * (Math.pow(1 + monthlyInterestRate, targetMonth - 1) - 1)) / monthlyInterestRate;
        
//         interest = Math.max(0, remainingBalanceBefore * monthlyInterestRate);
//         principal = monthlyPayment - interest;
//         totalRepay = monthlyPayment * numberOfPayments;

//     } else if (type === 'decreasing') {
//         // --- 2. 等额本金 (Equal Principal) ---
//         // 每月本金固定
//         principal = amount / numberOfPayments;
        
//         // 第 t 个月利息 = [贷款本金 - (t-1) * 每月本金] * 月利率
//         interest = (amount - (targetMonth - 1) * principal) * monthlyInterestRate;
//         monthlyPayment = principal + interest;
        
//         // 总还款额 = 本金 + 总利息
//         const totalInterest = ((amount * monthlyInterestRate + (amount / numberOfPayments) * monthlyInterestRate) / 2) * numberOfPayments;
//         totalRepay = amount + totalInterest;

//     } else if (type === 'interest-only') {
//         // --- 3. 仅还利息 (Interest Only) ---
//         interest = amount * monthlyInterestRate;
//         // 除了最后一个月还本金，其余月份本金为 0
//         principal = (targetMonth === numberOfPayments) ? amount : 0;
//         monthlyPayment = interest + principal;
//         totalRepay = (interest * numberOfPayments) + amount;
//     }

//     // 返回对象，方便解构使用
//     return [
//         monthlyPayment, 
//         totalRepay,
//         principal, 
//         interest
//     ];
// }

// 修改后的 calculate 函数，兼容你原来的 [monthly, total, principal, interest] 返回格式
function calculate(P, years, annualRate, type, targetMonth, extra = { active: false }) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    let balance = P;
    let totalInterest = 0;
    
    // 用于存储“特定月份”的数据（对应你原来的逻辑）
    let targetMonthly = 0;
    let targetPrincipal = 0;
    let targetInterest = 0;

    // 预计算初始月供（用于 UI 显示首月或标准值）
    let firstMonthPayment = 0;
    if (type === 'repayment') {
        firstMonthPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (type === 'interest-only') {
        firstMonthPayment = P * r;
    } else {
        firstMonthPayment = (P / n) + (P * r);
    }

    // 逐月模拟计算
    for (let month = 1; month <= 600; month++) {
        if (balance <= 0) break;

        let interest = balance * r;
        let principal = 0;

        // 1. 确定本月基础还本金额
        if (type === 'repayment') {
            let standardM = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            principal = Math.min(balance, standardM - interest);
        } else if (type === 'decreasing') {
            principal = Math.min(balance, P / n);
        } else if (type === 'interest-only') {
            principal = (month === n) ? balance : 0;
        }

        // 2. 记录特定月份的数据 (保留你原来的逻辑)
        if (month === targetMonth) {
            targetInterest = interest;
            targetPrincipal = principal;
            targetMonthly = principal + interest;
        }

        // 3. 执行常规还本
        balance -= principal;

        // 4. 提前还款逻辑注入
        if (extra.active) {
            if (extra.mode === 'lump-sum' && month === extra.lumpMonth) {
                balance -= extra.lumpAmount;
            }
            if (extra.mode === 'monthly-extra' && month >= extra.startMonth) {
                balance -= extra.monthlyExtra;
            }
        }

        totalInterest += interest;
        if (balance < 0) balance = 0;
        
        // 记录实际还清的月份
        var actualEndMonth = month;
    }

    // 返回格式：[月供, 总还款额, 选中月本金, 选中月利息, 实际还款月数, 总利息]
    // 这样不会破坏你原来的 showResults 调用
    return [
        targetMonth === 1 ? firstMonthPayment : targetMonthly, 
        totalInterest + P, 
        targetPrincipal, 
        targetInterest,
        actualEndMonth,
        totalInterest
    ];
}

// 修改函数签名，增加 principal 和 interest 参数
function showResults(monthly, total, targetMonth = 1, principal, interest) {
    const lang = langSelect.value;
    const config = translations[lang];
    const typeChecked = document.querySelector('input[name="mortgage-type"]:checked').value;
    const currencyCode = getCurrencyCode(lang);

    document.querySelector('.before-results-container').classList.add('hidden');
    document.querySelector('.after-results-container').classList.remove('hidden');
    
    const formatter = new Intl.NumberFormat(config.locale, {
        style: 'currency', 
        currency: currencyCode,
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
    });

    // 1. 处理标题文字（等额本金显示具体月份）
    let labelText = config.monthlyRepay;
    if (typeChecked === 'decreasing') {
        labelText += " " + config.specificMonthNote.replace('{n}', targetMonth);
    }
    document.querySelector('#monthly-label').innerText = labelText;

    // 2. 赋值主金额
    document.querySelector('#monthly-repayments').innerText = formatter.format(monthly);
    document.querySelector('#total-over-the-term').innerText = formatter.format(total);

    // 3. 赋值拆分后的本金和利息 (新增逻辑)
    if (principal !== undefined && interest !== undefined) {
        document.querySelector('#monthly-principal').innerText = formatter.format(principal);
        document.querySelector('#monthly-interest').innerText = formatter.format(interest);
    }
}

// --- 步骤 3: 辅助函数确认 ---
function getCurrencyCode(lang) {
    const codes = { en: 'GBP', zh: 'CNY', ja: 'JPY', ko: 'KRW', ms: 'MYR', hi: 'INR' };
    return codes[lang] || 'GBP';
}

// --- 步骤 4: 提交监听 ---
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const data = checkInputs(); // 原有的校验逻辑 [amount, term, rate, type]
    
//     // 获取特定月份输入
//     const targetMonthInput = document.getElementById('target-month');
//     let targetMonth = parseInt(targetMonthInput.value);

//     // --- 新增校验逻辑 ---
//     if (data) {
//         const [amount, term, rate, type] = data;
//         const totalMonths = term * 12;

//         // 如果用户选择了“等额本金”模式且输入了月份
//         if (type === 'decreasing' && targetMonthInput.value !== "") {
//             // 如果月份小于等于 0 或者不是数字
//             if (isNaN(targetMonth) || targetMonth <= 0) {
//                 alert("Please enter a valid month (greater than 0)"); // 这里可以换成你更美观的报错提示
//                 targetMonthInput.focus();
//                 return;
//             }
//             // 进阶校验：如果月份超过了总还款期限
//             if (targetMonth > totalMonths) {
//                 alert(`The month cannot exceed the total term (${totalMonths} months)`);
//                 targetMonthInput.focus();
//                 return;
//             }
//         } else {
//             // 非等额本金模式或未输入时，默认按第 1 个月计算
//             targetMonth = 1;
//         }

//         // 执行计算和显示
//         // 执行计算：现在 result 是一个数组 [monthly, total, principal, interest]
//         const result = calculate(...data, targetMonth);
        
//         // 使用数组索引取值，或者使用解构赋值：
//         const [monthly, total, principal, interest] = result;

//         // 调用显示函数
//         showResults(
//             monthly, 
//             total, 
//             targetMonth, 
//             principal, 
//             interest
//         );
//     }
// });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = checkInputs();
    //     // 获取特定月份输入
    const targetMonthInput = document.getElementById('target-month');
    let targetMonth = parseInt(targetMonthInput.value);
    if (data) {
        const P = getCleanNumber('mortgage-amount');
        const years = getCleanNumber('mortgage-term');
        const rate = getCleanNumber('interest-rate');
        const type = document.querySelector('input[name="mortgage-type"]:checked').value;
        let targetMonth = parseInt(targetMonthInput.value) || 1;

        // 提前还款数据
        const isAdvanced = document.getElementById('early-repay-toggle').checked;
        const extraData = {
            active: isAdvanced,
            mode: activeMode,
            lumpAmount: getCleanNumber('lump-sum-amount'),
            lumpMonth: parseInt(document.getElementById('lump-sum-month').value) || 1,
            monthlyExtra: getCleanNumber('monthly-extra-amount'),
            startMonth: parseInt(document.getElementById('monthly-extra-start').value) || 1
        };

        // 1. 计算常规（用于对比）
        const normalRes = calculate(P, years, rate, type, targetMonth, { active: false });
        
        // 2. 计算当前（可能带提前还款）
        const currentRes = calculate(P, years, rate, type, targetMonth, extraData);

        // 调用显示函数 (传入两个数组进行对比)
        showDetailedResults(currentRes, normalRes, isAdvanced);
    }
});

function showDetailedResults(current, normal, isAdvanced) {
    // 解构数组 (对应上面的返回顺序)
    const [monthly, total, principal, interest, actualMonths, totalInt] = current;
    const [,,, , normalMonths, normalInt] = normal;

    // 更新你原本的 UI 元素
    monthlyPaymentTextContent.innerText = formatCurrency(monthly);
    totalOverTheTermTextContent.innerText = formatCurrency(total);
    
    // 更新你原来的本金/利息标签
    if (document.getElementById('monthly-principal')) {
        document.getElementById('monthly-principal').innerText = formatCurrency(principal);
        document.getElementById('monthly-interest').innerText = formatCurrency(interest);
    }

    // 动态统计对比
    let summaryDiv = document.getElementById('comparison-summary');
    if (!summaryDiv) {
        summaryDiv = document.createElement('div');
        summaryDiv.id = 'comparison-summary';
        summaryDiv.className = 'comparison-box';
        totalOverTheTermTextContent.parentElement.appendChild(summaryDiv);
    }

    if (isAdvanced) {
        const lang = langSelect.value;
        const config = translations[lang];
        const moneySaved = normalInt - totalInt;

        if (moneySaved > 0) {
            summaryDiv.innerHTML = `
                <div class="save-item highlight-save">
                    <span class="save-label">🎉 ${config.totalSaved}:</span>
                    <span class="save-value">${formatCurrency(moneySaved)}</span>
                </div>
                <div class="save-item">
                    <span>⏳ ${config.termShortened}:</span>
                    <span>${normalMonths - actualMonths} ${config.monthUnit}</span>
                </div>
            `;
            summaryDiv.style.display = 'block';
        }
    } else {
        summaryDiv.style.display = 'none';
    }

    // 面板切换逻辑保持不变
    document.querySelector('.before-results-container').classList.add('hidden');
    document.querySelector('.after-results-container').classList.remove('hidden');
    rightContent.classList.add('after-reset');
}

clearAllBtn.addEventListener('click', () => {
    form.reset();
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.error-div').forEach(el => el.classList.remove('error-div'));
    document.querySelector('.before-results-container').classList.remove('hidden');
    document.querySelector('.after-results-container').classList.add('hidden');
    rightContent.classList.remove('after-reset');
});

document.getElementById('target-month').addEventListener('input', function() {
    if (this.value !== "" && this.value < 1) {
        this.value = 1; // 自动强制纠正为 1
    }
});


function animateNumber(element, finalValue, isCurrency = true) {
    let start = 0;
    const duration = 1000; // 动画持续1秒
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = start + (finalValue - start) * progress;
        
        element.textContent = isCurrency ? formatCurrency(currentValue) : Math.floor(currentValue);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

// 在 calculate 函数内调用：
// 找到显示月供和总额的元素，改用动画
const monthlyEl = document.getElementById('monthly-repayments');
const totalEl = document.getElementById('total-repayments');

animateNumber(monthlyEl, monthlyPayment);
animateNumber(totalEl, totalPayment);
