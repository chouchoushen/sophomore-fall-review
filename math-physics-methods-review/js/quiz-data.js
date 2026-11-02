window.ANALOG_QUIZ = {
  title: "数学物理方法通关自测",
  subtitle: "18 道题覆盖复数、解析函数、洛朗级数、奇点和留数；每题附诊断解析。",
  chapterLabels: {
    complex: "复数与复变函数",
    analytic: "解析函数与复积分",
    residues: "奇点、留数与积分应用",
    pde: "数学物理方程与定解条件"
  },
  questions: [
    {
      id: "q01",
      chapter: "complex",
      topic: "复数的模",
      prompt: "复数 $z=3+4i$ 的模是多少？",
      options: ["1", "5", "7", "25"],
      answer: 1,
      explanation:
        "$|z|=\\sqrt{3^2+4^2}=5$。注意 $z\\overline z=25$ 是模的平方，不是模本身。"
    },
    {
      id: "q02",
      chapter: "complex",
      topic: "复数的极坐标",
      prompt: "两个非零复数相乘时，模和辐角分别怎样变化？",
      options: [
        "模相加，辐角相乘",
        "模相乘，辐角相加",
        "模相除，辐角相减",
        "模不变，辐角不变"
      ],
      answer: 1,
      explanation:
        "设 $z_1=r_1e^{i\\theta_1}$、$z_2=r_2e^{i\\theta_2}$，则 $z_1z_2=r_1r_2e^{i(\\theta_1+\\theta_2)}$，所以模相乘、辐角相加。"
    },
    {
      id: "q03",
      chapter: "complex",
      topic: "欧拉公式",
      prompt: "$i=e^{i\\pi/2}$ 代入欧拉公式后，正确的是？",
      options: [
        "$e^{i\\pi/2}=0+i$",
        "$e^{i\\pi/2}=1+i$",
        "$e^{i\\pi/2}=-1$",
        "$e^{i\\pi/2}=1$"
      ],
      answer: 0,
      explanation:
        "$e^{i\\pi/2}=\\cos(\\pi/2)+i\\sin(\\pi/2)=0+i=i$。"
    },
    {
      id: "q04",
      chapter: "complex",
      topic: "复数方根",
      prompt: "非零复数的 $n$ 次方根通常有多少个不同的值？",
      options: ["1 个", "$n$ 个", "2 个", "无限多个"],
      answer: 1,
      explanation:
        "除 $z=0$ 外，$z^n=w$ 有 $n$ 个不同的根，它们在复平面上等角分布在同一个圆上；不能只取主值。"
    },
    {
      id: "q05",
      chapter: "complex",
      topic: "复对数",
      prompt: "复对数通常具有多值性，根本原因是？",
      options: [
        "$z$ 的实部不唯一",
        "$e^w$ 以 $2\\pi i$ 为周期",
        "所有复数模相等",
        "$e^w$ 永远为零"
      ],
      answer: 1,
      explanation:
        "指数函数满足 $e^{w+2\\pi i}=e^w$，所以多个不同的 $w$ 可能对应同一个 $e^w$。复对数因此相差 $2\\pi i$ 的整数倍。"
    },
    {
      id: "q06",
      chapter: "complex",
      topic: "复极限",
      prompt: "若 $f(z)$ 沿两条不同路径趋近 $z_0$ 得到不同极限，可以推出？",
      options: [
        "复极限存在但不连续",
        "复极限不存在",
        "函数在 $z_0$ 解析",
        "只有其中一条路径有效"
      ],
      answer: 1,
      explanation:
        "复极限存在要求从所有方向、所有路径趋近都得到同一个值。两条路径结果不同足以否定极限存在。"
    },
    {
      id: "q07",
      chapter: "analytic",
      topic: "柯西–黎曼方程",
      prompt: "若 $f(z)=u(x,y)+iv(x,y)$，下列哪组条件是柯西–黎曼方程？",
      options: [
        "$u_x=v_x,\\quad u_y=v_y$",
        "$u_x=v_y,\\quad u_y=-v_x$",
        "$u_x=-v_y,\\quad u_y=v_x$",
        "$u_x=u_y,\\quad v_x=v_y$"
      ],
      answer: 1,
      explanation:
        "柯西–黎曼方程为 $u_x=v_y$、$u_y=-v_x$。在偏导连续等条件下，它是复可导性的核心判别条件。"
    },
    {
      id: "q08",
      chapter: "analytic",
      topic: "解析函数的导数",
      prompt: "解析函数 $f=u+iv$ 的导数不能写成下列哪一项？",
      options: ["$u_x+iv_x$", "$v_y-iu_y$", "$u_y+iv_y$", "$v_y+iv_x$"],
      answer: 2,
      explanation:
        "正确形式包括 $u_x+iv_x$、$v_y-iu_y$ 等。项 $u_y+iv_y$ 通常不表示 $f'(z)$。"
    },
    {
      id: "q09",
      chapter: "analytic",
      topic: "柯西积分定理",
      prompt: "若 $f$ 在单连通区域内解析，沿区域内任一条简单闭合路径的积分通常为？",
      options: ["$2\\pi i$", "$f(0)$", "零", "无穷大"],
      answer: 2,
      explanation:
        "柯西积分定理给出 $\\oint_\\gamma f(z)dz=0$。条件是函数在由路径围成的区域内解析。"
    },
    {
      id: "q10",
      chapter: "analytic",
      topic: "柯西积分公式",
      prompt: "柯西积分公式 $f(z_0)=\\frac1{2\\pi i}\\oint f(z)/(z-z_0)dz$ 中，$z_0$ 必须在哪里？",
      options: [
        "闭合曲线外部",
        "闭合曲线内部且曲线上解析",
        "只能在原点",
        "可以任意位于曲线上"
      ],
      answer: 1,
      explanation:
        "公式要求 $z_0$ 位于简单闭合曲线内部，$f$ 在曲线及其内部解析；曲线默认取逆时针方向。"
    },
    {
      id: "q11",
      chapter: "analytic",
      topic: "泰勒级数收敛半径",
      prompt: "以某点为中心的泰勒级数，其收敛半径通常由什么决定？",
      options: [
        "函数的实部是否为常数",
        "中心到最近奇点的距离",
        "曲线的起点和终点",
        "留数的符号"
      ],
      answer: 1,
      explanation:
        "圆盘内解析时，收敛半径延伸到最近的奇点。不能跨过奇点继续使用同一个圆盘展开。"
    },
    {
      id: "q12",
      chapter: "analytic",
      topic: "洛朗级数",
      prompt: "洛朗级数中，$1/(z-z_0)$ 的系数对应什么？",
      options: ["泰勒系数", "函数的阶数", "$z_0$ 处的留数", "收敛半径"],
      answer: 2,
      explanation:
        "洛朗级数写成 $\\sum a_n(z-z_0)^n$，$a_{-1}$ 正是 $z_0$ 处的留数。"
    },
    {
      id: "q13",
      chapter: "residues",
      topic: "孤立奇点",
      prompt: "函数在 $z_0$ 的洛朗展开只有有限多个负次幂项，最高负幂为 $(z-z_0)^{-3}$。$z_0$ 是？",
      options: ["可去奇点", "三阶极点", "本性奇点", "二阶零点"],
      answer: 1,
      explanation:
        "最高负幂为 $-3$ 且系数非零，主要部分为有限项，所以 $z_0$ 是三阶极点。"
    },
    {
      id: "q14",
      chapter: "residues",
      topic: "简单极点",
      prompt: "$f(z)=\\dfrac{e^z}{z}$ 在 $z=0$ 的留数是多少？",
      options: ["0", "1", "$e$", "$2\\pi i$"],
      answer: 1,
      explanation:
        "$z=0$ 是简单极点，$\\operatorname{Res}_0 f=\\lim_{z\\to0} z f(z)=\\lim e^z=1$。"
    },
    {
      id: "q15",
      chapter: "residues",
      topic: "高阶极点留数",
      prompt: "$f(z)=\\dfrac{\\cos z}{4z^3}$ 在 $z=0$ 的留数是多少？",
      options: ["$1/4$", "$-1/8$", "$0$", "$1/3$"],
      answer: 1,
      explanation:
        "$\\cos z=1-z^2/2+\\cdots$，所以 $f(z)=1/(4z^3)-1/(8z)+\\cdots$，负一次幂系数为 $-1/8$。"
    },
    {
      id: "q16",
      chapter: "residues",
      topic: "留数定理",
      prompt: "逆时针闭合曲线内只有两个奇点，留数分别为 1 和 2，积分为？",
      options: ["$3$", "$3\\pi i$", "$6\\pi i$", "$2\\pi i$"],
      answer: 2,
      explanation:
        "留数定理：$\\oint f dz=2\\pi i(1+2)=6\\pi i$。不能漏掉 $2\\pi i$。"
    },
    {
      id: "q17",
      chapter: "residues",
      topic: "无穷远点",
      prompt: "无穷远点留数化为 $w=0$ 时，正确形式是？",
      options: [
        "$\\operatorname{Res}_{0}f(1/w)$",
        "$-\\operatorname{Res}_{0}[f(1/w)/w^2]$",
        "$\\operatorname{Res}_{0}wf(1/w)$",
        "$2\\pi i\\operatorname{Res}_{0}f(w)$"
      ],
      answer: 1,
      explanation:
        "$z=1/w$ 时 $dz=-dw/w^2$，并考虑无穷远点的方向，得到 $\\operatorname{Res}_{\\infty}f=-\\operatorname{Res}_{0}[f(1/w)/w^2]$。"
    },
    {
      id: "q18",
      chapter: "residues",
      topic: "实积分",
      prompt: "用上半平面留数计算 $\\int_{-\\infty}^{\\infty}\\frac{dx}{1+x^2}$，结果是？",
      options: ["$\\pi/2$", "$\\pi$", "$2\\pi$", "$2\\pi i$"],
      answer: 1,
      explanation:
        "上半平面只有 $z=i$，留数为 $1/(2i)$，因此积分 $=2\\pi i\\cdot1/(2i)=\\pi$。"
    },
    {
      id: "q19",
      chapter: "pde",
      topic: "三类典型方程",
      prompt: "下列哪一个是描述温度随时间扩散的方程？",
      options: [
        "$u_{tt}=a^2u_{xx}$",
        "$u_t=Du_{xx}$",
        "$\\Delta u=0$",
        "$u_{xx}+u_{yy}=0$"
      ],
      answer: 1,
      explanation:
        "热传导方程含一阶时间导数 $u_t$，形式为 $u_t=Du_{xx}$。含 $u_{tt}$ 的是波动方程，没有时间导数的是稳态方程。"
    },
    {
      id: "q20",
      chapter: "pde",
      topic: "波动方程初始条件",
      prompt: "一维波动方程 $u_{tt}=a^2u_{xx}$ 通常需要几个时间初始条件？",
      options: ["0 个", "1 个", "2 个", "3 个"],
      answer: 2,
      explanation:
        "方程对时间的最高阶是二阶，需要两个独立初始条件：初始位移 $u(x,0)$ 和初始速度 $u_t(x,0)$。"
    },
    {
      id: "q21",
      chapter: "pde",
      topic: "热方程初始条件",
      prompt: "一维热传导方程 $u_t=Du_{xx}$ 通常需要哪类时间初始条件？",
      options: [
        "初始温度分布 $u(x,0)$ 一个条件",
        "初始温度和初始升温速度两个条件",
        "完全不需要初始条件",
        "只需要初始空间导数"
      ],
      answer: 0,
      explanation:
        "$u_t$ 只含一阶时间导数，因此给出初始温度 $u(x,0)$ 即可；不需要额外给 $u_t(x,0)$。"
    },
    {
      id: "q22",
      chapter: "pde",
      topic: "Poisson 与 Laplace",
      prompt: "泊松方程 $\\Delta V=-\\rho_e/\\varepsilon$ 在没有自由电荷时退化为？",
      options: [
        "$V_t=DV_{xx}$",
        "$\\Delta V=0$",
        "$V_{tt}=a^2\\Delta V$",
        "$V=0$ everywhere"
      ],
      answer: 1,
      explanation:
        "当自由电荷密度 $\\rho_e=0$ 时，右端为零，泊松方程变成拉普拉斯方程 $\\Delta V=0$。"
    },
    {
      id: "q23",
      chapter: "pde",
      topic: "第二类边界条件",
      prompt: "热传导问题中，绝热边界通常写成哪一类边界条件？",
      options: [
        "$u=0$",
        "$\\partial u/\\partial n=0$",
        "$u+\alpha\\partial u/\\partial n=0$",
        "不需要任何边界条件"
      ],
      answer: 1,
      explanation:
        "绝热表示没有法向热量流，而热流与温度的法向导数相关，因此 $\\partial u/\\partial n=0$，属于第二类边界条件。"
    },
    {
      id: "q24",
      chapter: "pde",
      topic: "第三类边界条件",
      prompt: "边界上给出 $\\alpha u+\\beta\\partial u/\\partial n=\\mu(t)$ 属于？",
      options: ["第一类边界条件", "第二类边界条件", "第三类边界条件", "初始条件"],
      answer: 2,
      explanation:
        "同时含函数值与法向导数的线性组合称为第三类边界条件，也常称 Robin 条件。"
    }
  ]
};
