window.ANALOG_QUIZ = {
  title: "模电通关自测",
  subtitle: "24 道题覆盖四章主线；先独立作答，再用解析定位缺口。",
  chapterLabels: {
    devices: "半导体器件",
    amplifiers: "放大电路基本原理",
    frequency: "频率响应",
    "power-amplifiers": "功率放大电路"
  },
  questions: [
    {
      id: "q01",
      chapter: "devices",
      topic: "本征半导体与杂质半导体",
      prompt: "在 N 型半导体中，多数载流子是什么？",
      options: ["自由电子", "空穴", "正离子", "负离子"],
      answer: 0,
      explanation:
        "掺入五价元素后，多余电子成为可参与导电的自由电子，因此电子是多子；空穴是少子。失去电子后的杂质原子是固定在晶格中的正离子，不是载流子。"
    },
    {
      id: "q02",
      chapter: "devices",
      topic: "PN 结偏置",
      prompt: "下列哪一种连接使 PN 结处于正向偏置？",
      options: [
        "P 区接低电位，N 区接高电位",
        "P 区接高电位，N 区接低电位",
        "P 区和 N 区短接",
        "P 区和 N 区都悬空"
      ],
      answer: 1,
      explanation:
        "P 区接高电位、N 区接低电位时，外电场削弱内建电场，扩散增强，PN 结正向导通。反向偏置则相反。"
    },
    {
      id: "q03",
      chapter: "devices",
      topic: "恒压降模型",
      prompt:
        "20 V 电源经 10 kΩ 电阻串联一只硅二极管，按恒压降模型计算，电流最接近多少？",
      options: ["0.70 mA", "1.93 mA", "2.00 mA", "20.0 mA"],
      answer: 1,
      explanation:
        "硅管取 U_D≈0.7 V：I_D=(20−0.7)/10 kΩ=1.93 mA。若题目明确使用理想二极管，才有 I_D=20/10=2.00 mA。"
    },
    {
      id: "q04",
      chapter: "devices",
      topic: "理想二极管状态判断",
      prompt:
        "理想二极管阳极电位为 3 V、阴极电位为 5 V。它的状态和电流分别是？",
      options: ["导通，电流很大", "导通，电流为零", "截止，电流为零", "反向击穿"],
      answer: 2,
      explanation:
        "先假设二极管断开：U_D=U_A−U_K=3−5=−2 V<0，说明它不能正向导通，因此截止。理想截止时电流为零。"
    },
    {
      id: "q05",
      chapter: "devices",
      topic: "稳压管",
      prompt: "稳压管正常稳压时通常工作在哪个区域？",
      options: ["正向导通区", "反向截止区", "反向击穿区", "深度饱和区"],
      answer: 2,
      explanation:
        "稳压管利用反向击穿区的陡峭伏安特性工作。必须串联限流电阻，并把稳压管与负载并联；击穿不等于损坏，但电流不能超过允许值。"
    },
    {
      id: "q06",
      chapter: "devices",
      topic: "三极管放大区",
      prompt: "NPN 型三极管工作在放大区时，电位关系和偏置条件是？",
      options: [
        "U_C>U_B>U_E，发射结反偏、集电结正偏",
        "U_C>U_B>U_E，发射结正偏、集电结反偏",
        "U_E>U_B>U_C，两个结都正偏",
        "U_B>U_C>U_E，两个结都反偏"
      ],
      answer: 1,
      explanation:
        "NPN 管处于放大区时 U_C>U_B>U_E，对应发射结正偏、集电结反偏。PNP 管的电位关系相反，但两项偏置条件不变。"
    },
    {
      id: "q07",
      chapter: "amplifiers",
      topic: "小信号等效条件",
      prompt: "使用三极管微变等效电路前，最基本的条件是？",
      options: [
        "输入信号必须很大",
        "三极管已截止",
        "有合适的静态工作点且交流信号足够小",
        "只保留直流电源，不考虑信号源"
      ],
      answer: 2,
      explanation:
        "微变等效是把 Q 点附近很小一段非线性特性线性化。没有合适 Q 点，或信号摆幅过大进入截止/饱和，都会破坏小信号模型的前提。"
    },
    {
      id: "q08",
      chapter: "amplifiers",
      topic: "直流通路与交流通路",
      prompt: "画交流通路时，耦合电容和理想直流电压源通常怎样处理？",
      options: [
        "电容开路，电压源开路",
        "电容短路，电压源短路",
        "电容短路，电压源开路",
        "电容开路，电压源短路"
      ],
      answer: 1,
      explanation:
        "中频交流通路中，大耦合电容容抗很小，视为短路；理想直流电压源两端交流电压为零，也置零为短路。反观直流通路，电容应视为开路。"
    },
    {
      id: "q09",
      chapter: "amplifiers",
      topic: "共射静态工作点",
      prompt:
        "某基本共射电路 V_CC=12 V，R_b=280 kΩ，R_c=3 kΩ，β=50，取 U_BEQ=0.7 V。U_CEQ 最接近多少？",
      options: ["12.0 V", "5.94 V", "8.94 V", "0.3 V"],
      answer: 1,
      explanation:
        "I_BQ=(12−0.7)/280 kΩ≈40.4 μA，I_CQ=βI_BQ≈2.02 mA，U_CEQ=12−2.02×3≈5.94 V。U_CE 明显大于饱和压降，Q 点在放大区。"
    },
    {
      id: "q10",
      chapter: "amplifiers",
      topic: "共射倒相",
      prompt: "单管共射放大电路的中频电压增益通常具有什么特征？",
      options: [
        "输入、输出同相，且 |A_u|≈1",
        "输入、输出反相，且具有电压放大作用",
        "输入、输出同相，且没有电压放大作用",
        "仅在饱和区才放大"
      ],
      answer: 1,
      explanation:
        "u_i 增大使 i_b、i_c 增大；i_c 增大使 R_c 上的压降增大，而 u_o 从集电极相对地取出，所以 u_o 减小。因此共射电路反相，典型增益为 −βR_L′/r_be。"
    },
    {
      id: "q11",
      chapter: "amplifiers",
      topic: "发射极电阻",
      prompt: "在共射电路中串联发射极电阻 R_e，且不加旁路电容，通常会怎样变化？",
      options: [
        "|A_u| 增大，R_i 减小",
        "|A_u| 减小，R_i 增大",
        "|A_u| 和 R_i 都增大",
        "|A_u| 和 R_i 都不变"
      ],
      answer: 1,
      explanation:
        "R_e 引入电流负反馈，使 r_be+(1+β)R_e 进入增益分母，所以增益下降；同时它把输入回路中的等效电阻抬高，输入电阻增大，并有助于稳定 Q 点。"
    },
    {
      id: "q12",
      chapter: "amplifiers",
      topic: "共集电极",
      prompt: "射极跟随器（共集电极组态）最典型的端口特征是？",
      options: [
        "高输入电阻、低输出电阻，电压增益约等于 1",
        "低输入电阻、高输出电阻，电压增益很大",
        "高输入电阻、高输出电阻，输出反相",
        "没有电流放大作用，输入输出反相"
      ],
      answer: 0,
      explanation:
        "射极跟随器从基极输入、发射极输出，电压增益略小于 1 且同相；由于发射极回路反映到基极要乘 (1+β)，输入电阻大；从输出端看进去阻抗又被除以 (1+β)，输出电阻小。"
    },
    {
      id: "q13",
      chapter: "frequency",
      topic: "−3 dB 点",
      prompt: "放大电路的幅度下降到中频幅度的多少时，对应 −3 dB 截止点？",
      options: ["1/2", "1/√2", "√2", "1/10"],
      answer: 1,
      explanation:
        "20 lg(1/√2)≈−3.01 dB。中频增益为 A_um 时，上下限频率处的幅值约为 0.707|A_um|。"
    },
    {
      id: "q14",
      chapter: "frequency",
      topic: "RC 低通截止频率",
      prompt: "一阶 RC 低通电路 R=1 kΩ、C=160 nF，其截止频率最接近多少？",
      options: ["100 Hz", "995 Hz", "9.95 kHz", "100 kHz"],
      answer: 1,
      explanation:
        "f_H=1/(2πRC)=1/(2π×10³×160×10⁻⁹)≈995 Hz。这是幅值降到 1/√2 的频率，不是任意频率下都完全不变。"
    },
    {
      id: "q15",
      chapter: "frequency",
      topic: "RC 电路的相移",
      prompt: "在各自的截止频率处，RC 高通和低通电路的相移分别是？",
      options: [
        "高通 −45°，低通 +45°",
        "高通 +45°，低通 −45°",
        "两者均为 0°",
        "两者均为 90°"
      ],
      answer: 1,
      explanation:
        "高通 H=1/(1−jf_L/f)，在 f=f_L 时相位为 +45°；低通 H=1/(1+jf/f_H)，在 f=f_H 时相位为 −45°。远离截止频率时才分别趋近 0°/±90°。"
    },
    {
      id: "q16",
      chapter: "frequency",
      topic: "Bode 图斜率",
      prompt: "一阶 RC 高通电路在远低于截止频率的频段，幅频折线斜率约为？",
      options: ["+20 dB/十倍频", "−20 dB/十倍频", "0 dB/十倍频", "+40 dB/十倍频"],
      answer: 0,
      explanation:
        "低频时 |A|≈f/f_L，所以每降低一个十倍频程，增益下降 20 dB；从低到高看，折线以 +20 dB/十倍频上升。转折点的折线近似误差约为 3 dB。"
    },
    {
      id: "q17",
      chapter: "frequency",
      topic: "晶体管高频限制",
      prompt: "共射放大电路高频增益下降，主要是哪组因素造成？",
      options: [
        "耦合电容容抗增大",
        "晶体管结电容与密勒效应",
        "发射极电阻产生直流负反馈",
        "直流电源内阻变小"
      ],
      answer: 1,
      explanation:
        "低频下降通常由串联耦合电容造成；高频下降则由 Cπ、Cμ 等结电容以及 Cμ 的密勒倍增造成。两者不是同一频段、也不是同一原因。"
    },
    {
      id: "q18",
      chapter: "frequency",
      topic: "多级放大电路",
      prompt: "两级具有相近上限频率的放大电路级联后，总通频带通常怎样变化？",
      options: [
        "等于第一级通频带",
        "比第一级更宽",
        "比每一级都窄",
        "只取决于直流电源"
      ],
      answer: 2,
      explanation:
        "各级幅频和相频影响相叠加，附加极点会让高频增益更早下降。两级相同时，总上限频率约为单级的 0.64 倍，因此总通频带比任一单级都窄。"
    },
    {
      id: "q19",
      chapter: "power-amplifiers",
      topic: "甲类功放效率",
      prompt: "单管甲类共射功率放大电路在理想负载线中点条件下，最大效率约为多少？",
      options: ["25%", "50%", "78.5%", "100%"],
      answer: 0,
      explanation:
        "理想条件下，最大交流输出功率为 $P_{omax}=V_{CC}I_{CQ}/4$，而电源功率为 $P_V=V_{CC}I_{CQ}$，所以 $\\eta_{\\max}=25\\%$。若静态点不在负载线中点、考虑饱和压降或偏置损耗，实际效率还会更低。"
    },
    {
      id: "q20",
      chapter: "power-amplifiers",
      topic: "乙类导通角",
      prompt: "理想乙类功率放大器中，每一只晶体管在一个信号周期内的导通角约为多少？",
      options: ["90°", "180°", "270°", "360°"],
      answer: 1,
      explanation:
        "乙类放大器只用一个半周导通，因此单管导通角约为 $180^\\circ$。互补对称结构由 NPN 和 PNP 两管分别承担正、负半周，负载才能得到完整周期。"
    },
    {
      id: "q21",
      chapter: "power-amplifiers",
      topic: "OTL 最大输出功率",
      prompt: "忽略饱和压降时，OTL 乙类互补功放的最大输出功率为？（负载为 $R_L$，单电源为 $V_{CC}$）",
      options: ["$V_{CC}^2/(2R_L)$", "$V_{CC}^2/(4R_L)$", "$V_{CC}^2/(8R_L)$", "$2V_{CC}^2/R_L$"],
      answer: 2,
      explanation:
        "OTL 输出端静态电压为 $V_{CC}/2$，所以最大输出电压幅度约为 $V_{CC}/2$。代入 $P_{omax}=U_{om}^2/(2R_L)$，得到 $P_{omax}=V_{CC}^2/(8R_L)$。"
    },
    {
      id: "q22",
      chapter: "power-amplifiers",
      topic: "交越失真",
      prompt: "互补功放在正、负半周交接处出现交越失真，最直接的改善方法是？",
      options: [
        "提高输入信号频率",
        "给输出管设置少量正向静态偏置",
        "取消输出耦合电容",
        "把负载短路"
      ],
      answer: 1,
      explanation:
        "交越失真的根源是晶体管开启电压造成的过零死区。把电路从纯乙类调整到甲乙类，让输出管在零输入附近微导通，就能让两只管子平滑交接。偏置不能过大，否则静态电流和管耗会明显增加。"
    },
    {
      id: "q23",
      chapter: "power-amplifiers",
      topic: "OCL 静态状态",
      prompt: "OCL 互补功放在正常静态时，负载中的直流电流应接近多少？",
      options: ["零", "电源电流的一半", "最大输出电流", "等于晶体管集电极电流"],
      answer: 0,
      explanation:
        "OCL 采用正、负双电源，静态输出端应接近 0 V，因此负载两端没有直流电压，负载直流电流为零。输出端若偏离 0 V，就说明中点电位或偏置存在问题。"
    },
    {
      id: "q24",
      chapter: "power-amplifiers",
      topic: "复合管电流增益",
      prompt: "两只晶体管组成复合管后，在近似分析中总电流放大倍数通常怎样表示？",
      options: ["$\\beta_1+\\beta_2$", "$\\beta_1-\\beta_2$", "$\\beta_1\\beta_2$", "$\\sqrt{\\beta_1\\beta_2}$"],
      answer: 2,
      explanation:
        "前管的发射极电流近似成为后管的基极电流，经两级电流放大后，总电流增益近似为 $\\beta\\approx\\beta_1\\beta_2$。增加复合管是为了扩大电流驱动能力；其 NPN/PNP 类型由直接接出等效基极的前管决定。"
    }
  ]
};
