window.ANALOG_QUIZ = {
  title: "数字电子技术通关自测",
  subtitle: "18 道题覆盖数制、逻辑代数、组合逻辑设计与常用器件；每题附诊断解析。",
  chapterLabels: {
    "logic-algebra": "数制与逻辑代数",
    "combinational-logic": "组合逻辑分析与设计",
    devices: "常用组合逻辑器件"
  },
  questions: [
    {
      id: "q01",
      chapter: "logic-algebra",
      topic: "数制转换",
      prompt: "十进制数 13 的二进制表示是？",
      options: ["1011", "1101", "1110", "1001"],
      answer: 1,
      explanation:
        "$13=8+4+1=1101_2$。可以用反复除以 2 取余验证：13→6 余 1，6→3 余 0，3→1 余 1，1→0 余 1，逆序读出 1101。"
    },
    {
      id: "q02",
      chapter: "logic-algebra",
      topic: "十六进制",
      prompt: "二进制数 $1011$ 对应的十六进制数字是？",
      options: ["9", "A", "B", "D"],
      answer: 2,
      explanation:
        "$1011_2=8+2+1=11_{10}$，十六进制中 10～15 写作 A～F，因此 11 写成 B。"
    },
    {
      id: "q03",
      chapter: "logic-algebra",
      topic: "德摩根定律",
      prompt: "$\\overline{AB}$ 等价于？",
      options: ["$\\overline A\\,\\overline B$", "$\\overline A+\\overline B$", "$A+B$", "$AB$"],
      answer: 1,
      explanation:
        "德摩根定律把与取反变成两个反相变量相加：$\\overline{AB}=\\overline A+\\overline B$。"
    },
    {
      id: "q04",
      chapter: "logic-algebra",
      topic: "吸收律",
      prompt: "$A+AB$ 的最简结果是？",
      options: ["$A$", "$AB$", "$A+B$", "$\\overline A$"],
      answer: 0,
      explanation:
        "$A+AB=A(1+B)=A\\cdot1=A$。条件 $A$ 成立时，后面的 $AB$ 已经不再改变输出。"
    },
    {
      id: "q05",
      chapter: "logic-algebra",
      topic: "最小项编号",
      prompt: "三变量 $A,B,C$ 的最小项 $A B\\overline C$ 对应哪个编号？",
      options: ["$m_3$", "$m_4$", "$m_6$", "$m_7$"],
      answer: 2,
      explanation:
        "按 $A,B,C$ 顺序，原变量记 1、反变量记 0：$A B\\overline C=110_2=6$，所以是 $m_6$。"
    },
    {
      id: "q06",
      chapter: "logic-algebra",
      topic: "卡诺图",
      prompt: "三变量函数 $F(A,B,C)=\\sum m(1,3,5,7)$ 化简为？",
      options: ["$A$", "$B$", "$C$", "$A+B$"],
      answer: 2,
      explanation:
        "四个最小项全部对应 $C=1$，其他变量 $A,B$ 都成对变化并可消去，所以 $F=C$。"
    },
    {
      id: "q07",
      chapter: "combinational-logic",
      topic: "组合逻辑定义",
      prompt: "组合逻辑电路最核心的特征是？",
      options: [
        "输出只取决于当前输入",
        "输出只取决于上一时刻状态",
        "电路一定包含触发器",
        "输出由时钟单独决定"
      ],
      answer: 0,
      explanation:
        "组合逻辑没有记忆，任意时刻输出只由该时刻输入决定；触发器、计数器等含记忆元件，属于时序逻辑。"
    },
    {
      id: "q08",
      chapter: "combinational-logic",
      topic: "半加器",
      prompt: "半加器两个一位输入 $A,B$ 的和与进位分别是？",
      options: [
        "$S=A+B,\\quad C=AB$",
        "$S=A\\oplus B,\\quad C=AB$",
        "$S=AB,\\quad C=A\\oplus B$",
        "$S=A\\odot B,\\quad C=A+B$"
      ],
      answer: 1,
      explanation:
        "半加器无低位进位，本位和为异或 $S=A\\oplus B$，仅在 1+1 时产生进位 $C=AB$。"
    },
    {
      id: "q09",
      chapter: "combinational-logic",
      topic: "全加器",
      prompt: "全加器的和输出 $S$ 是三个输入 $A,B,C_i$ 的？",
      options: ["与", "或", "三变量奇偶性（异或）", "多数表决"],
      answer: 2,
      explanation:
        "$S=A\\oplus B\\oplus C_i$，即三个输入中 1 的个数为奇数时输出 1；进位则是三者多数为 1。"
    },
    {
      id: "q10",
      chapter: "combinational-logic",
      topic: "补码",
      prompt: "8 位补码表示 −5，正确编码是？",
      options: ["10000101", "11111010", "11111011", "11111000"],
      answer: 2,
      explanation:
        "−5 的原码为 10000101，反码为 11111010，末位加 1 得补码 11111011。"
    },
    {
      id: "q11",
      chapter: "combinational-logic",
      topic: "设计流程",
      prompt: "组合逻辑设计的正确起始步骤通常是？",
      options: [
        "直接画门电路",
        "先确定输入输出并写真值表",
        "先选芯片封装",
        "先测竞争冒险"
      ],
      answer: 1,
      explanation:
        "需求先变成逻辑变量与真值表，然后才能写标准式、化简并选择门器件实现。直接画图容易遗漏输入组合。"
    },
    {
      id: "q12",
      chapter: "combinational-logic",
      topic: "逻辑函数实现",
      prompt: "三人表决器（至少两人同意输出 1）的最简与或式是？",
      options: ["$A+B+C$", "$ABC$", "$AB+AC+BC$", "$A\\oplus B\\oplus C$"],
      answer: 2,
      explanation:
        "至少两人为 1 的四种组合两两合并，得到两两乘积之和：$AB+AC+BC$。"
    },
    {
      id: "q13",
      chapter: "devices",
      topic: "译码器",
      prompt: "一个高有效 3 线–8 线二进制译码器的各输出通常对应？",
      options: ["输入变量之和", "输入变量的各个最小项", "输入信号的异或", "输出反馈"],
      answer: 1,
      explanation:
        "3 个输入共形成 8 个最小项，每个输出对应一个输入组合。低有效译码器只是把输出电平整体取反。"
    },
    {
      id: "q14",
      chapter: "devices",
      topic: "编码器",
      prompt: "8 线–3 线普通编码器中，输入 $I_5=1$（其他输入无效）时，输出 $Y_2Y_1Y_0$ 是？",
      options: ["011", "100", "101", "110"],
      answer: 2,
      explanation:
        "输入编号 5 写成 3 位二进制是 $101$，所以 $Y_2=1,Y_1=0,Y_0=1$。"
    },
    {
      id: "q15",
      chapter: "devices",
      topic: "数据选择器",
      prompt: "4 选 1 数据选择器的选择控制端 $A_1A_0=10$ 时，输出接到哪一路数据？",
      options: ["$D_0$", "$D_1$", "$D_2$", "$D_3$"],
      answer: 2,
      explanation:
        "地址 $10_2=2$，因此选择 $D_2$；MUX 的输出等于当前地址对应数据输入。"
    },
    {
      id: "q16",
      chapter: "devices",
      topic: "ROM",
      prompt: "从组合逻辑函数的角度看，ROM 最接近？",
      options: ["随机触发器阵列", "按地址保存输出值的查找表", "只产生时钟信号的器件", "只有反相器"],
      answer: 1,
      explanation:
        "输入地址选择一个字线，数据阵列返回该地址预存的输出字。因此 ROM 可以作为按真值表或最小项存储逻辑函数的查找表。"
    },
    {
      id: "q17",
      chapter: "devices",
      topic: "奇偶校验",
      prompt: "偶校验位 $P$ 通常如何由数据位得到？",
      options: ["所有数据位异或", "所有数据位相与", "所有数据位相加后取反", "最高位复制"],
      answer: 0,
      explanation:
        "偶校验位通常取 $P=d_1\\oplus\\cdots\\oplus d_n$，使添加校验位后整组 1 的总数为偶数。接收端再异或，结果为 0 表示未检测到奇数位错误。"
    },
    {
      id: "q18",
      chapter: "devices",
      topic: "竞争冒险",
      prompt: "静态 1 冒险通常表现为？",
      options: [
        "输出本应保持 1，却出现短暂 0",
        "输出本应保持 0，却永久变成 1",
        "所有输入同时冻结",
        "电源完全断开"
      ],
      answer: 0,
      explanation:
        "静态 1 冒险是输出应保持 1，却因不同路径延迟出现短暂 0 脉冲。静态 0 冒险相反。"
    }
  ]
};
