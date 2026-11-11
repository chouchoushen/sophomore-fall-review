(function () {
  "use strict";

  const quiz = window.ANALOG_QUIZ;
  if (!quiz) return;

  function pick(items, weekOrdinal) {
    return [items[weekOrdinal % items.length]];
  }

  quiz.weeklyThemes = [
    "库仑场与高斯定理",
    "导体的电荷分布",
    "介质中的电场",
    "电容与能量",
    "恒定磁场与安培环路"
  ];

  quiz.weeklyVariants = {
    q02({ weekOrdinal }) {
      const factors = [2, 3, 4, 5];
      const n = factors[weekOrdinal % factors.length];
      const result = 1 / (n * n);
      return [{
        topic: "库仑力与距离",
        prompt: `真空中两个点电荷的距离增大为原来的 ${n} 倍，静电力大小变为原来的多少？`,
        options: [`${n * n} 倍`, `1/${n * n}`, `1/${n}`, `${n} 倍`],
        answer: 1,
        explanation: `库仑力与距离平方成反比，因此变为 $1/${n}^2=1/${n * n}$。`
      }];
    },
    q03({ weekOrdinal }) {
      return pick([
        {
          topic: "正点电荷场",
          prompt: "一个正点电荷产生的电场，在空间中的方向是？",
          options: ["沿径向指向电荷", "沿径向背离电荷", "绕电荷形成闭合圆环", "处处向右"],
          answer: 1,
          explanation: "正点电荷的电场线从电荷出发，沿径向向外。"
        },
        {
          topic: "负点电荷场",
          prompt: "一个负点电荷产生的电场，在空间中的方向是？",
          options: ["沿径向背离电荷", "沿径向指向电荷", "处处为零", "沿等势面切线"],
          answer: 1,
          explanation: "负点电荷吸引正检验电荷，因此电场方向沿径向指向该负电荷。"
        },
        {
          topic: "场强定义",
          prompt: "电场强度的方向定义为？",
          options: ["负检验电荷受力方向", "正检验电荷受力方向", "电势升高方向", "任意规定均可"],
          answer: 1,
          explanation: "电场强度方向与放在该点的正检验电荷所受电场力方向相同。"
        },
        {
          topic: "导体表面电场",
          prompt: "静电平衡导体表面外侧的电场方向通常？",
          options: ["与表面平行", "垂直于导体表面", "必为零", "与表面成 45°"],
          answer: 1,
          explanation: "若有切向分量，自由电荷会继续移动；平衡时表面外侧电场垂直表面。"
        }
      ], weekOrdinal);
    },
    q04({ weekOrdinal }) {
      return pick([
        {
          topic: "高斯定理通量",
          prompt: "通过任意闭合曲面的电通量主要由什么决定？",
          options: ["曲面外电荷总量", "曲面内净电荷", "曲面面积", "曲面形状和材质"],
          answer: 1,
          explanation: "高斯定理指出闭合电通量等于面内净电荷除以 $\\varepsilon_0$。"
        },
        {
          topic: "高斯面电场",
          prompt: "高斯面内没有净电荷时，可以推出什么？",
          options: ["面上处处 E=0", "面上总电通量为零", "面外没有电荷", "电势处处为零"],
          answer: 1,
          explanation: "这只说明闭合曲面的总电通量为零；面上各点场强仍可能由面外电荷产生。"
        },
        {
          topic: "面上 E=0 的高斯面",
          prompt: "高斯面上电场大小至少为？",
          options: ["面的面积", "可能为零", "面的形状", "面的边界长度"],
          answer: 1,
          explanation: "高斯面上的电场可以为零。若高斯面内无电荷且存在球对称，球面内所有点都可能 $E=0$。"
        },
        {
          topic: "闭合曲面外电荷",
          prompt: "闭合曲面外的电荷对该曲面的总电通量贡献是？",
          options: ["可能为正也可能为负", "零", "总为正", "总为负"],
          answer: 1,
          explanation: "面外电荷的电场线一条穿入就会再穿出，净电通量为零。"
        }
      ], weekOrdinal);
    },
    q05({ weekOrdinal }) {
      return pick([
        {
          topic: "球面内部场强",
          prompt: "均匀带电球面内部各点的电场强度是？",
          options: ["与半径成正比", "处处为零", "与 $1/r^2$ 成正比", "等于表面场强"],
          answer: 1,
          explanation: "取同心球高斯面，内部无电荷，由球对称性得球内 $E=0$。"
        },
        {
          topic: "球面外部场强",
          prompt: "均匀带电球面外部的电场等效于？",
          options: ["无限长直线的场", "电荷集中于球心的点电荷场", "均匀场", "零场"],
          answer: 1,
          explanation: "球外 $E=Q/(4\\pi\\varepsilon_0r^2)$，等效为球心点电荷。"
        },
        {
          topic: "实心球内部",
          prompt: "均匀带电实心球内部，场强与半径 r 的关系是？",
          options: ["$E\\propto r^2$", "$E\\propto r$", "$E\\propto1/r$", "球内恒为零"],
          answer: 1,
          explanation: "球内高斯面只包围半径 r 内的电荷，$Q_{in}\\propto r^3$，所以 $E=Q_{in}/(4\\pi\\varepsilon_0r^2)\\propto r$。"
        },
        {
          topic: "导体球内部",
          prompt: "处于静电平衡的实心导体球内部场强是？",
          options: ["沿半径向外", "处处为零", "沿半径向内", "等于表面场强"],
          answer: 1,
          explanation: "静电平衡时导体内没有净电场，否则自由电荷继续运动。"
        }
      ], weekOrdinal);
    },
    q09({ weekOrdinal }) {
      const charges = [2, 3, 4, 5];
      const q = charges[weekOrdinal % charges.length];
      return [{
        topic: "空腔导体感应电荷",
        prompt: `空腔内放入 $+${q}q$ 电荷，空腔内表面达到平衡后的总感应电荷为？`,
        options: [`$+${q}q$`, `$-${q}q$`, "零", `$+2\\times${q}q$`],
        answer: 1,
        explanation: "在导体材料内取包围空腔的高斯面，其内部合场强为零，因此内表面总电荷与腔内电荷等量异号。"
      }];
    },
    q11({ weekOrdinal }) {
      return pick([
        {
          topic: "介质中的电场",
          prompt: "均匀介质完全填满原真空场区且自由电荷固定时，合场强怎样？",
          options: ["变为 $\\varepsilon_rE_0$", "变为 $E_0/\\varepsilon_r$", "不变", "恒为零"],
          answer: 1,
          explanation: "介质极化场与原场反向，使合场减弱到 $E_0/\\varepsilon_r$。"
        },
        {
          topic: "相对电容率",
          prompt: "真空的相对电容率 $\\varepsilon_r$ 等于多少？",
          options: ["0", "1", "无穷大", "$\\varepsilon_0$"],
          answer: 1,
          explanation: "$\\varepsilon_r=\\varepsilon/\\varepsilon_0$，真空时为 1。"
        },
        {
          topic: "有介质高斯定理",
          prompt: "$\\oint\\vec D\\cdot d\\vec S$ 等于什么？",
          options: ["面内总电荷", "面内自由电荷", "面外电荷", "电势差"],
          answer: 1,
          explanation: "D 的闭合通量只由面内自由电荷决定，束缚电荷已包含在 D 中。"
        },
        {
          topic: "极化电荷",
          prompt: "电介质极化产生的束缚电荷特点是？",
          options: ["可像自由电子一样穿过介质", "不能宏观自由移动，但会产生电场", "永远为零", "只出现在真空中"],
          answer: 1,
          explanation: "束缚电荷只能在微观尺度位移，不能长途自由移动，但会形成附加电场。"
        }
      ], weekOrdinal);
    },
    q14({ weekOrdinal }) {
      const cases = [
        { s: 0.01, d: 0.001, er: 1 },
        { s: 0.02, d: 0.001, er: 2 },
        { s: 0.01, d: 0.002, er: 4 },
        { s: 0.03, d: 0.0005, er: 1 }
      ];
      const item = cases[weekOrdinal % cases.length];
      const eps0 = 8.854e-12;
      const cap = item.er * eps0 * item.s / item.d;
      return [{
        topic: "平行板电容量",
        prompt: `平行板面积 S=${item.s} m²、间距 d=${item.d} m，介质相对电容率 ε_r=${item.er}。电容量最接近多少？`,
        options: [`${(cap / 10 * 1e12).toFixed(0)} pF`, `${(cap * 1e12).toFixed(0)} pF`, `${(cap * 10 * 1e12).toFixed(0)} pF`, `${(cap * 100 * 1e12).toFixed(0)} pF`],
        answer: 1,
        explanation: `$C=\\varepsilon_0\\varepsilon_rS/d\\approx${(cap * 1e12).toFixed(0)}\\,\\mathrm{pF}$。`
      }];
    },
    q16({ weekOrdinal }) {
      const pairs = [[2, 3], [4, 6], [5, 20], [8, 8]];
      const [a, b] = pairs[weekOrdinal % pairs.length];
      const eq = a * b / (a + b);
      return [{
        topic: "电容串联",
        prompt: `两个电容器分别为 ${a} μF 和 ${b} μF，串联后的等效电容是多少？`,
        options: [`${(a + b).toFixed(2)} μF`, `${eq.toFixed(2)} μF`, `${(eq / 2).toFixed(2)} μF`, `${(eq * 3).toFixed(2)} μF`],
        answer: 1,
        explanation: `$C_{\\rm eq}=(${a}\\times${b})/(${a}+${b})=${eq.toFixed(2)}\\,\\mu F$。`
      }];
    },
    q17({ weekOrdinal }) {
      return pick([
        {
          topic: "隔离电容插入介质",
          prompt: "先断开电源，再让均匀介质完全填满平行板电容器。电荷和电压分别怎样？",
          options: ["Q 减小，U 不变", "Q 不变，U 减小", "Q 增大，U 不变", "两者都增大"],
          answer: 1,
          explanation: "断开电源后 Q 固定；介质使 C 增大，所以 U=Q/C 减小。"
        },
        {
          topic: "接电池插入介质",
          prompt: "保持与电池连接再插入介质，电压和电荷分别怎样？",
          options: ["U 不变，Q 增大", "U 减小，Q 不变", "两者都减小", "两者守恒"],
          answer: 0,
          explanation: "电池维持 U 不变；介质使 C 增大，因此 Q=CU 增大。"
        },
        {
          topic: "固定电荷能量",
          prompt: "断开电源后插入介质，为什么电场能量减小？",
          options: ["电荷消失", "电容增大且 $W=Q^2/(2C)$", "电压增大为无穷", "电场密度必为零"],
          answer: 1,
          explanation: "Q 不变而 C 增大，因此 $W=Q^2/(2C)$ 减小。"
        },
        {
          topic: "固定电压能量",
          prompt: "保持电压不变插入介质，为什么储能增大？",
          options: ["电容减小", "电容增大且 $W=CU^2/2$", "电荷变为零", "电压必为零"],
          answer: 1,
          explanation: "U 不变而 C 增大，因此电场能量增大；电池同时补充了电荷。"
        }
      ], weekOrdinal);
    }
  };
})();
