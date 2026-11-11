(function () {
  "use strict";

  if (!window.ANALOG_QUIZ) {
    throw new Error("General physics quiz data must load before magnetism questions.");
  }

  window.ANALOG_QUIZ.chapterLabels.magnetism = "恒定磁场";
  window.ANALOG_QUIZ.subtitle =
    "26 道题覆盖静电场、导体与电介质、电容与能量、恒定磁场；每题均附诊断解析。";

  window.ANALOG_QUIZ.questions.push(
    {
      id: "q19",
      chapter: "magnetism",
      topic: "毕奥－萨伐尔定律",
      prompt: "电流元 $I\\mathrm d\\vec l$ 在场点产生的磁场微元 $\\mathrm d\\vec B$ 的方向是？",
      options: [
        "沿电流元 $\\mathrm d\\vec l$ 的方向",
        "沿从电流元指向场点的位矢方向",
        "同时垂直于 $\\mathrm d\\vec l$ 和位矢 $\\vec r$",
        "始终与电流元平行且反向"
      ],
      answer: 2,
      explanation:
        "$\\mathrm d\\vec B\\propto I\\mathrm d\\vec l\\times\\vec r$。叉乘结果同时垂直于电流元和位矢，具体指向可用右手螺旋判断。"
    },
    {
      id: "q20",
      chapter: "magnetism",
      topic: "圆电流轴线",
      prompt: "圆电流的电流变为原来的 2 倍，同时圆半径减为原来的一半，圆心处磁感应强度变为原来的多少？",
      options: ["原来的 1/4", "原来的 1/2", "原来的 2 倍", "原来的 4 倍"],
      answer: 3,
      explanation:
        "圆心处 $B=\\mu_0I/(2R)$。电流变为 2 倍给 $\\times2$，半径减半又给 $\\times2$，总共变为 $4$ 倍。"
    },
    {
      id: "q21",
      chapter: "magnetism",
      topic: "磁场高斯定理",
      prompt: "通过任意闭合曲面的净磁通量总是？",
      options: ["等于曲面内总电流", "等于曲面内总磁荷", "恒为零", "取决于曲面形状"],
      answer: 2,
      explanation:
        "磁场高斯定理为 $\\oint_S\\vec B\\cdot\\mathrm d\\vec S=0$，因为磁感线闭合，穿入闭合曲面的磁感线必定在另一处穿出。"
    },
    {
      id: "q22",
      chapter: "magnetism",
      topic: "长直螺线管",
      prompt: "理想无限长螺线管每米有 1000 匝，通有 2 A 电流，管内磁感应强度约为多少？",
      options: [
        "$2.51\\times10^{-3}\\,\\mathrm T$",
        "$5.03\\times10^{-3}\\,\\mathrm T$",
        "$8.00\\times10^{-4}\\,\\mathrm T$",
        "$1.26\\times10^{-2}\\,\\mathrm T$"
      ],
      answer: 0,
      explanation:
        "$B=\\mu_0nI=(4\\pi\\times10^{-7})(1000)(2)\\approx2.51\\times10^{-3}\\,\\mathrm T$。"
    },
    {
      id: "q23",
      chapter: "magnetism",
      topic: "载流圆柱体",
      prompt: "无限长圆柱导体中电流沿截面均匀分布。在圆柱内部，磁感应强度大小随半径 $r$ 怎样变化？",
      options: [
        "与 $1/r$ 成正比",
        "与 $r$ 成正比",
        "与 $1/r^2$ 成正比",
        "与 $r^2$ 成正比"
      ],
      answer: 1,
      explanation:
        "圆柱内部 $B(r)=\\mu_0Ir/(2\\pi R^2)$，因此在 $r<R$ 时 $B\\propto r$；到圆柱外部才变为 $B\\propto1/r$。"
    },
    {
      id: "q24",
      chapter: "magnetism",
      topic: "圆周运动半径",
      prompt: "带电粒子垂直进入均匀磁场，若只把粒子的速度增大到原来的 2 倍，其圆周运动半径将？",
      options: ["变为原来的 1/4", "变为原来的 1/2", "变为原来的 2 倍", "保持不变"],
      answer: 2,
      explanation:
        "半径 $R=mv/(|q|B)$。同一粒子和同一磁场中，$R$ 与速度 $v$ 成正比，所以速度加倍时半径也加倍。"
    },
    {
      id: "q25",
      chapter: "magnetism",
      topic: "磁矩与力矩",
      prompt: "平面载流线圈的磁矩 $\\vec m$ 与均匀磁场 $\\vec B$ 成什么角度时，磁力矩大小最大？",
      options: ["$0^\\circ$", "$45^\\circ$", "$90^\\circ$", "$180^\\circ$"],
      answer: 2,
      explanation:
        "磁力矩 $M=mB\\sin\\theta$，在 $\\theta=90^\\circ$ 时最大。$0^\\circ$ 为稳定平衡，$180^\\circ$ 为不稳定平衡，两种情况下力矩都为零。"
    },
    {
      id: "q26",
      chapter: "magnetism",
      topic: "磁场强度",
      prompt: "在线性磁介质中，关于磁场强度 $\\vec H$ 的说法正确的是？",
      options: [
        "$\\vec H$ 就是介质中的磁感应强度 $\\vec B$",
        "$\\oint\\vec H\\cdot\\mathrm d\\vec l$ 只与所围自由电流有关",
        "$\\vec H$ 只由磁化电流决定",
        "洛伦兹力公式应直接使用 $\\vec H$"
      ],
      answer: 1,
      explanation:
        "磁介质中的安培环路定理为 $\\oint\\vec H\\cdot\\mathrm d\\vec l=\\sum I_{\\rm free,in}$。$\\vec H$ 是辅助量，洛伦兹力和安培力仍由 $\\vec B$ 决定。"
    }
  );
})();
