(function () {
  "use strict";

  const quiz = window.ANALOG_QUIZ;
  if (!quiz) return;

  function pick(items, weekOrdinal) {
    return [items[weekOrdinal % items.length]];
  }

  quiz.weeklyThemes = [
    "复数与解析性",
    "级数与留数",
    "复积分计算",
    "数学物理方程"
  ];

  quiz.weeklyVariants = {
    q01({ weekOrdinal }) {
      const triples = [[3, 4], [5, 12], [8, 15], [7, 24], [9, 40], [20, 21]];
      const [a, b] = triples[weekOrdinal % triples.length];
      const mod = Math.hypot(a, b);
      return [{
        topic: "复数的模",
        prompt: `复数 $z=${a}+${b}i$ 的模是多少？`,
        options: [`${Math.abs(a - b)}`, `${mod}`, `${a + b}`, `${a * a + b * b}`],
        answer: 1,
        explanation: `$|z|=\\sqrt{${a}^2+${b}^2}=${mod}$。`
      }];
    },
    q02({ weekOrdinal }) {
      return pick([
        {
          topic: "复数乘法",
          prompt: "两个非零复数相乘时，模和辐角分别怎样变化？",
          options: ["模相加，辐角相乘", "模相乘，辐角相加", "模相除，辐角相减", "两者都不变"],
          answer: 1,
          explanation: "$r_1e^{i\\theta_1}\\cdot r_2e^{i\\theta_2}=r_1r_2e^{i(\\theta_1+\\theta_2)}$。"
        },
        {
          topic: "复数除法",
          prompt: "两个非零复数相除时，模和辐角分别怎样变化？",
          options: ["模相加，辐角相减", "模相除，辐角相减", "模相乘，辐角相加", "模相减，辐角相除"],
          answer: 1,
          explanation: "除法在指数形式中使模相除、辐角相减。"
        },
        {
          topic: "棣莫弗公式",
          prompt: "复数 $z=re^{i\\theta}$ 的 n 次幂等于？",
          options: ["$nre^{i\\theta}$", "$r^ne^{in\\theta}$", "$r^ne^{i\\theta/n}$", "$re^{in\\theta}$"],
          answer: 1,
          explanation: "棣莫弗公式给出 $z^n=r^ne^{in\\theta}$。"
        },
        {
          topic: "辐角多值性",
          prompt: "非零复数的辐角有什么特点？",
          options: ["唯一确定", "相差 $2\\pi$ 整数倍的无穷多个值", "只能取正值", "与模相等"],
          answer: 1,
          explanation: "绕原点增加一整圈不改变复数，因此辐角有 $2k\\pi$ 的多值性。"
        }
      ], weekOrdinal);
    },
    q04({ weekOrdinal }) {
      const values = [2, 3, 4, 5];
      const n = values[weekOrdinal % values.length];
      return [{
        topic: "复数方根",
        prompt: `非零复数的 ${n} 次方根有多少个不同的值？`,
        options: ["1 个", `${n} 个`, `${n + 1} 个`, "无限多个"],
        answer: 1,
        explanation: `除零外，$z^${n}=w$ 有 ${n} 个根，均匀分布在复平面的一个圆上。`
      }];
    },
    q07({ weekOrdinal }) {
      return pick([
        {
          topic: "柯西–黎曼方程",
          prompt: "函数 $f=u+iv$ 的柯西–黎曼方程是？",
          options: ["$u_x=v_x,\\ u_y=v_y$", "$u_x=v_y,\\ u_y=-v_x$", "$u_x=-v_y,\\ u_y=v_x$", "$u_x=u_y,\\ v_x=v_y$"],
          answer: 1,
          explanation: "正确条件是 $u_x=v_y$、$u_y=-v_x$。"
        },
        {
          topic: "解析函数导数",
          prompt: "解析函数的一个常用导数是？",
          options: ["$u_y+iv_y$", "$u_x+iv_x$", "$u_x-iu_y$", "$u_y-iv_x$"],
          answer: 1,
          explanation: "$f'(z)=u_x+iv_x$，利用 C–R 还可写成其他等价形式。"
        },
        {
          topic: "调和函数",
          prompt: "解析函数的实部和虚部满足？",
          options: ["$\\Delta u=1$", "$\\Delta u=\\Delta v=0$", "$\\Delta u=\\Delta v=1$", "没有关系"],
          answer: 1,
          explanation: "解析函数的实部和虚部都是调和函数，即二维拉普拉斯为零。"
        },
        {
          topic: "解析性判别",
          prompt: "仅满足柯西–黎曼方程是否一定解析？",
          options: ["一定", "不一定，还需要可微性等条件", "永不解析", "只与函数值有关"],
          answer: 1,
          explanation: "C–R 条件必须结合可微性；考试中常通过偏导连续等条件保证充分性。"
        }
      ], weekOrdinal);
    },
    q11({ weekOrdinal }) {
      const items = [
        { func: "1/(z-3)", center: "0", radius: "3", distractors: ["1", "2"], explain: "最近奇点为 z=3。" },
        { func: "1/[(z-1)(z-4)]", center: "0", radius: "1", distractors: ["2", "5"], explain: "中心到最近奇点 z=1 的距离为 1。" },
        { func: "1/(z^2+4)", center: "0", radius: "2", distractors: ["1", "4"], explain: "奇点在 z=±2i，距离中心为 2。" },
        { func: "e^z", center: "0", radius: "∞", distractors: ["2", "3"], explain: "整函数在全平面解析，没有有限奇点。" }
      ];
      const item = items[weekOrdinal % items.length];
      return [{
        topic: "泰勒级数收敛半径",
        prompt: `函数 $f(z)=${item.func}$ 以 $z_0=${item.center}$ 为中心展开，通常收敛半径是？`,
        options: ["0", item.radius, item.distractors[0], item.distractors[1]],
        answer: 1,
        explanation: item.explain
      }];
    },
    q14({ weekOrdinal }) {
      const values = [2, 3, -1, 4];
      const a = values[weekOrdinal % values.length];
      const denominator = a >= 0 ? `z-${a}` : `z+${Math.abs(a)}`;
      return [{
        topic: "简单极点留数",
        prompt: `$f(z)=\\dfrac{z}{${denominator}}$ 在 $z=${a}$ 的留数是多少？`,
        options: ["0", `${a}`, `${a + 2}`, `${a + 4}`],
        answer: 1,
        explanation: `$\\operatorname{Res}_{${a}}f=\\lim_{z\\to${a}}z=${a}$。`
      }];
    },
    q15({ weekOrdinal }) {
      const denominators = [2, 4, 6, 8];
      const d = denominators[weekOrdinal % denominators.length];
      const residue = -1 / (2 * d);
      return [{
        topic: "高阶极点留数",
        prompt: `$f(z)=\\dfrac{\\cos z}{${d}z^3}$ 在 $z=0$ 的留数是多少？`,
        options: [`${(1 / d).toFixed(3)}`, `−${(1 / (2 * d)).toFixed(3)}`, "0", `−${(1 / d).toFixed(3)}`],
        answer: 1,
        explanation: `$\\cos z=1-z^2/2+\\cdots$，除以 ${d}z^3 后 $1/z$ 项系数为 $-1/(2\\times${d})$。`
      }];
    },
    q17({ weekOrdinal }) {
      return pick([
        {
          topic: "无穷远点留数",
          prompt: "无穷远点留数化为 $w=0$ 时的正确形式是？",
          options: ["$\\operatorname{Res}_0 f(1/w)$", "$-\\operatorname{Res}_0[f(1/w)/w^2]$", "$\\operatorname{Res}_0 wf(1/w)$", "$2\\pi i\\operatorname{Res}_0f(w)$"],
          answer: 1,
          explanation: "$z=1/w$ 时 $dz=-dw/w^2$，再考虑无穷远方向即得负号和分母 $w^2$。"
        },
        {
          topic: "扩充平面留数和",
          prompt: "函数在扩充平面上只有有限个孤立奇点时，所有留数的代数和是？",
          options: ["$2\\pi i$", "0", "1", "无穷大"],
          answer: 1,
          explanation: "所有有限奇点与无穷远点的留数代数和为零。"
        },
        {
          topic: "留数概念",
          prompt: "有限点 $z_0$ 处的留数等于洛朗级数中的哪个系数？",
          options: ["常数项 $a_0$", "负一次幂系数 $a_{-1}$", "一次项 $a_1$", "最高负幂系数"],
          answer: 1,
          explanation: "留数的定义就是 $a_{-1}$。"
        },
        {
          topic: "留数定理方向",
          prompt: "沿顺时针闭合路径使用留数定理时，积分结果怎样调整？",
          options: ["不需要调整", "整体增加负号", "除以 $2\\pi i$", "取共轭"],
          answer: 1,
          explanation: "留数定理默认逆时针方向；顺时针路径会使积分整体变号。"
        }
      ], weekOrdinal);
    },
    q19({ weekOrdinal }) {
      return pick([
        {
          topic: "热传导方程",
          prompt: "描述温度随时间扩散的典型方程是？",
          options: ["$u_{tt}=a^2u_{xx}$", "$u_t=Du_{xx}$", "$\\Delta u=0$", "$V_{tt}=\\Delta V$"],
          answer: 1,
          explanation: "热传导含一阶时间导数，形式为 $u_t=Du_{xx}$ 或 $u_t=D\\Delta u$。"
        },
        {
          topic: "波动方程",
          prompt: "描述弦振动传播的典型方程是？",
          options: ["$u_t=Du_{xx}$", "$u_{tt}=a^2u_{xx}$", "$\\Delta V=-\\rho_e/\\varepsilon$", "$u=0$"],
          answer: 1,
          explanation: "波动方程含二阶时间导数 $u_{tt}$，描述惯性振荡和传播。"
        },
        {
          topic: "拉普拉斯方程",
          prompt: "无自由电荷的稳态静电场电势满足？",
          options: ["$V_t=DV_{xx}$", "$\\Delta V=0$", "$V_{tt}=a^2\\Delta V$", "$\\Delta V=1$"],
          answer: 1,
          explanation: "泊松方程在电荷密度为零时退化为拉普拉斯方程。"
        },
        {
          topic: "泊松方程",
          prompt: "有自由电荷密度 $\\rho_e$ 的稳态电势方程是？",
          options: ["$\\Delta V=0$", "$\\Delta V=-\\rho_e/\\varepsilon$", "$V_t=D\\Delta V$", "$V_{tt}=a^2\\Delta V$"],
          answer: 1,
          explanation: "泊松方程把电势曲率与自由电荷密度联系起来。"
        }
      ], weekOrdinal);
    },
    q20({ weekOrdinal }) {
      const orders = [1, 2, 3, 4];
      const n = orders[weekOrdinal % orders.length];
      return [{
        topic: "初始条件数量",
        prompt: `若方程对时间 t 的最高阶导数是 ${n} 阶，通常需要几个独立时间初始条件？`,
        options: [`${n + 1} 个`, `${n} 个`, `${n + 2} 个`, "0 个"],
        answer: 1,
        explanation: `n 阶时间导数通常对应 n 个独立初始条件。例如二阶波动方程需要初始位移和初始速度两个条件。`
      }];
    },
    q23({ weekOrdinal }) {
      return pick([
        {
          topic: "第一类边界条件",
          prompt: "边界上直接给出 $u=g(t)$，属于哪类边界条件？",
          options: ["Neumann 条件", "Dirichlet 条件", "Robin 条件", "初始条件"],
          answer: 1,
          explanation: "直接固定未知函数值属于第一类 Dirichlet 条件。"
        },
        {
          topic: "第二类边界条件",
          prompt: "边界上给出法向导数 $\\partial u/\\partial n=g$，属于哪类边界条件？",
          options: ["Dirichlet 条件", "Neumann 条件", "Robin 条件", "初值条件"],
          answer: 1,
          explanation: "固定法向导数属于第二类 Neumann 条件，热问题中常表示指定热流。"
        },
        {
          topic: "绝热边界",
          prompt: "热传导问题中，绝热边界通常写成？",
          options: ["$u=0$", "$\\partial u/\\partial n=0$", "$u=1$", "不需要边界条件"],
          answer: 1,
          explanation: "绝热表示无法向热流，因此温度法向导数为零。"
        },
        {
          topic: "第三类边界条件",
          prompt: "边界条件 $\\alpha u+\\beta\\partial u/\\partial n=\\mu$ 属于？",
          options: ["第一类", "第二类", "第三类 Robin", "初始条件"],
          answer: 2,
          explanation: "同时含函数值和法向导数的线性组合属于第三类 Robin 条件。"
        }
      ], weekOrdinal);
    }
  };
})();
