window.ANALOG_QUIZ = {
  title: "普通物理学通关自测",
  subtitle: "26 道题覆盖静电场、导体与电介质、电容与能量、恒定磁场；每题均附诊断解析。",
  chapterLabels: {
    field: "静电场",
    conductors: "导体与电介质",
    capacitance: "电容与电场能量"
  },
  questions: [
    {
      id: "q01",
      chapter: "field",
      topic: "电荷量子化",
      prompt: "下列关于电荷的描述，哪一项正确？",
      options: [
        "任何带电体的电荷量都可以取任意连续值",
        "孤立系统的电荷代数和守恒",
        "摩擦起电创造了新的电荷",
        "正电荷的质量一定大于负电荷"
      ],
      answer: 1,
      explanation:
        "孤立系统的电荷代数和守恒；摩擦起电只是电荷转移。宏观带电体的电荷量可视为连续，但微观上电荷量子化为 $q=ne$。"
    },
    {
      id: "q02",
      chapter: "field",
      topic: "库仑定律",
      prompt: "真空中两个点电荷的距离增大为原来的 3 倍，静电力大小变为原来的多少？",
      options: ["3 倍", "1/3", "9 倍", "1/9"],
      answer: 3,
      explanation:
        "库仑力与距离平方成反比，$F\\propto1/r^2$。距离变为原来的 3 倍，力变为 $1/3^2=1/9$。"
    },
    {
      id: "q03",
      chapter: "field",
      topic: "点电荷电场",
      prompt: "一个正点电荷产生的电场，在空间中任意一点的方向是？",
      options: ["沿径向指向正电荷", "沿径向背离正电荷", "绕电荷形成闭合圆环", "处处相同"],
      answer: 1,
      explanation:
        "正点电荷的电场沿径向向外。放入该场的正检验电荷所受电场力与场强同向，也会被排斥。"
    },
    {
      id: "q04",
      chapter: "field",
      topic: "高斯定理",
      prompt: "通过任意闭合曲面的电通量，只由什么决定？",
      options: [
        "曲面外电荷的总量",
        "曲面内电荷的净量",
        "曲面的面积和形状",
        "曲面上的电势平均值"
      ],
      answer: 1,
      explanation:
        "高斯定理为 $\\oint\\vec E\\cdot d\\vec S=Q_{\\rm in}/\\varepsilon_0$。面外电荷的电场线穿入又穿出，总通量为零。"
    },
    {
      id: "q05",
      chapter: "field",
      topic: "带电球面",
      prompt: "均匀带电球面内部各点的电场强度是？",
      options: ["与半径成正比", "与半径平方成反比", "处处为零", "等于球面外场强"],
      answer: 2,
      explanation:
        "对球内任一点取同心球面，内部净电荷为零，因此电通量为零；由球对称性可得球内 $E=0$。"
    },
    {
      id: "q06",
      chapter: "field",
      topic: "电势与场强",
      prompt: "关于静电场中的电势和电场强度，下列说法正确的是？",
      options: [
        "电势为零处场强一定为零",
        "场强为零处电势一定为零",
        "电场线指向电势降低的方向",
        "沿电场线移动正电荷时电势能一定增大"
      ],
      answer: 2,
      explanation:
        "电场线指向电势降低的方向。电势与场强没有必然数量对应关系；正电荷沿电场线方向运动时，电场力做正功，电势能减少。"
    },
    {
      id: "q07",
      chapter: "conductors",
      topic: "导体静电平衡",
      prompt: "实心导体达到静电平衡后，其内部电场强度和电势分别怎样？",
      options: [
        "场强为零，导体内部等势",
        "场强不为零，各处电势相同",
        "场强为零，电势从中心到表面逐渐降低",
        "场强与位置成正比，电势为零"
      ],
      answer: 0,
      explanation:
        "若导体内部场强不为零，自由电荷会继续移动，无法达到静电平衡。内部任意两点电势差为零，整个导体是等势体。"
    },
    {
      id: "q08",
      chapter: "conductors",
      topic: "导体电荷分布",
      prompt: "实心导体静电平衡后，净电荷主要分布在？",
      options: ["导体内部中心", "导体表面", "整个体积内均匀分布", "无法分布"],
      answer: 1,
      explanation:
        "若导体内部存在净电荷，就会产生内部电通量并对应非零场强。由于平衡时内部 $E=0$，净电荷只能分布在表面。"
    },
    {
      id: "q09",
      chapter: "conductors",
      topic: "空腔导体",
      prompt: "空腔内放入 $+q$ 电荷，达到平衡后，空腔内表面感应电荷应为？",
      options: ["$+q$", "$-q$", "$+2q$", "零"],
      answer: 1,
      explanation:
        "在导体材料内部取包围空腔的闭合高斯面，材料内部 $E=0$，总通量为零，所以内表面总感应电荷必须与腔内电荷等量异号，为 $-q$。"
    },
    {
      id: "q10",
      chapter: "conductors",
      topic: "静电屏蔽",
      prompt: "闭合空腔导体能够屏蔽外部静电场，关键原因是？",
      options: [
        "导体电阻很大",
        "导体内部自由电荷重新分布，内部合场强为零",
        "空腔内完全没有电场线概念",
        "导体表面一定不带电"
      ],
      answer: 1,
      explanation:
        "导体的自由电荷在外场作用下重新分布，抵消导体内部的外场。闭合导体的材料区域 $E=0$，因此外部静电场无法进入空腔。"
    },
    {
      id: "q11",
      chapter: "conductors",
      topic: "介质中的电场",
      prompt: "均匀线性介质完全填满原真空场区后，若自由电荷分布保持不变，介质中的合场强最接近？",
      options: ["$\\varepsilon_r E_0$", "$E_0/\\varepsilon_r$", "$E_0$", "无法确定"],
      answer: 1,
      explanation:
        "完全均匀极化时，介质极化电荷产生的附加场与自由电荷的场反向，使合场减弱。$E=E_0/\\varepsilon_r$。"
    },
    {
      id: "q12",
      chapter: "conductors",
      topic: "有介质高斯定理",
      prompt: "有介质时，电位移矢量 $\\vec D$ 的闭合曲面积分等于？",
      options: [
        "面内总净电荷除以 $\\varepsilon_0$",
        "面内自由电荷的代数和",
        "面外自由电荷的总和",
        "电势差"
      ],
      answer: 1,
      explanation:
        "有介质高斯定理为 $\\oint_S\\vec D\\cdot d\\vec S=Q_{\\rm free,in}$。束缚电荷已经通过 $\\vec D$ 纳入，不再重复计入右端。"
    },
    {
      id: "q13",
      chapter: "capacitance",
      topic: "电容的定义",
      prompt: "一个电容器所带电荷量增加，而几何结构与介质不变，它的电容将？",
      options: ["增大", "减小", "保持不变", "先增大后减小"],
      answer: 2,
      explanation:
        "$C=Q/U$ 是定义关系，但电容由几何、相对位置和介质决定。在几何和介质不变时，即使电压和电荷改变，电容也不变。"
    },
    {
      id: "q14",
      chapter: "capacitance",
      topic: "平行板电容器",
      prompt: "平行板面积增大为原来的 2 倍、间距不变，电容量将？",
      options: ["减半", "保持不变", "增大为 2 倍", "增大为 4 倍"],
      answer: 2,
      explanation:
        "平行板电容 $C=\\varepsilon S/d$。间距和介质不变时，$C$ 与面积 $S$ 成正比，因此增大为 2 倍。"
    },
    {
      id: "q15",
      chapter: "capacitance",
      topic: "圆柱形电容器",
      prompt: "同轴圆柱电容器的电容主要由哪个关系决定？",
      options: [
        "$C\\propto (R_2-R_1)$",
        "$C\\propto 1/\\ln(R_2/R_1)$",
        "$C\\propto (R_2/R_1)^2$",
        "$C$ 与长度无关"
      ],
      answer: 1,
      explanation:
        "同轴圆柱电容为 $C=2\\pi\\varepsilon L/\\ln(R_2/R_1)$。它与轴向长度成正比，与内外半径比的自然对数成反比。"
    },
    {
      id: "q16",
      chapter: "capacitance",
      topic: "电容串联",
      prompt: "两个电容分别为 2 μF 和 3 μF，串联后的等效电容是多少？",
      options: ["1.2 μF", "5 μF", "0.83 μF", "6 μF"],
      answer: 0,
      explanation:
        "串联：$1/C_{\\rm eq}=1/2+1/3$，所以 $C_{\\rm eq}=6/5=1.2\\,\\mu\\mathrm F$。串联等效电容小于任一单个电容。"
    },
    {
      id: "q17",
      chapter: "capacitance",
      topic: "隔离电容插入介质",
      prompt:
        "先断开电源，再让均匀介质完全填满平行板电容器，电压降为原来的 $1/\\varepsilon_r$。此时能量怎样变化？",
      options: [
        "能量不变",
        "能量增大为 $\\varepsilon_r$ 倍",
        "能量减小为原来的 $1/\\varepsilon_r$",
        "能量变为零"
      ],
      answer: 2,
      explanation:
        "断开电源后电荷守恒，$Q$ 不变，能量用 $W=Q^2/(2C)$。介质使 $C$ 变为 $\\varepsilon_rC_0$，所以能量变为 $W_0/\\varepsilon_r$。"
    },
    {
      id: "q18",
      chapter: "capacitance",
      topic: "能量密度",
      prompt: "均匀介质中电场强度为 $E$，电场能量密度是多少？",
      options: ["$\\varepsilon E$", "$\\frac12\\varepsilon E^2$", "$\\varepsilon E^2$", "$\\frac12Q^2$"],
      answer: 1,
      explanation:
        "线性各向同性介质中电场能量密度为 $w_e=\\frac12\\varepsilon E^2$。总能量等于能量密度对电场所在空间积分。"
    }
  ]
};
