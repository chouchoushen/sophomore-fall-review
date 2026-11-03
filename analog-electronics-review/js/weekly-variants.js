(function () {
  "use strict";

  const quiz = window.ANALOG_QUIZ;
  if (!quiz) return;

  function pick(items, weekOrdinal) {
    return [items[weekOrdinal % items.length]];
  }

  quiz.weeklyThemes = [
    "器件判断与偏置",
    "工作点与反馈",
    "频率与失真",
    "综合电路分析"
  ];

  quiz.weeklyVariants = {
    q03({ weekOrdinal }) {
      const cases = [
        { v: 12, r: 5 },
        { v: 15, r: 8 },
        { v: 18, r: 6 },
        { v: 21, r: 10 }
      ];
      const item = cases[weekOrdinal % cases.length];
      const id = (item.v - 0.7) / item.r;
      const ideal = item.v / item.r;
      return [{
        topic: "恒压降模型计算",
        prompt: `${item.v} V 电源经 ${item.r} kΩ 电阻串联一只硅二极管，按恒压降模型计算，电流最接近多少？`,
        options: [`${ideal.toFixed(2)} mA`, `${id.toFixed(2)} mA`, `${(id / 2).toFixed(2)} mA`, `${(id * 2).toFixed(2)} mA`],
        answer: 1,
        explanation: `硅管取 $U_D≈0.7\\,\\mathrm V$，所以 $I_D=(${item.v}−0.7)/${item.r}=${id.toFixed(2)}\\,\\mathrm{mA}$。`
      }];
    },
    q06({ weekOrdinal }) {
      const items = [
        {
          topic: "NPN 放大区",
          prompt: "NPN 型三极管工作在放大区时，正确的电位关系和偏置是？",
          options: ["发射结反偏、集电结反偏", "U_C>U_B>U_E，发射结正偏、集电结反偏", "两个 PN 结都正偏", "U_E>U_B>U_C"],
          answer: 1,
          explanation: "NPN 放大区要求发射结正偏、集电结反偏，典型电位关系为 $U_C>U_B>U_E$。"
        },
        {
          topic: "PNP 放大区",
          prompt: "PNP 型三极管处于放大区时，典型电位关系是？",
          options: ["U_C>U_B>U_E", "U_E>U_B>U_C", "U_B>U_E>U_C", "三个电位相等"],
          answer: 1,
          explanation: "PNP 放大仍是发射结正偏、集电结反偏，因此典型关系为 $U_E>U_B>U_C$。"
        },
        {
          topic: "饱和区判断",
          prompt: "三极管进入饱和区后，最符合实际的特征是？",
          options: ["I_C 完全不受基极控制且始终为零", "集电结转为正偏，U_CE 接近饱和压降", "发射结变为反偏", "I_B 必须为零"],
          answer: 1,
          explanation: "饱和时两个结均正偏，$U_{CE}$ 很小，$I_C$ 不再严格满足 $\\beta I_B$。"
        },
        {
          topic: "截止区判断",
          prompt: "NPN 三极管处于截止区的典型条件是？",
          options: ["U_BE 明显超过导通电压", "发射结不能正向导通，I_B≈0、I_C≈0", "集电结正偏且电流很大", "U_CE 必须为零"],
          answer: 1,
          explanation: "截止区发射结未正偏，基极电流和集电极电流都接近零。"
        }
      ];
      return pick(items, weekOrdinal);
    },
    q09({ weekOrdinal }) {
      const cases = [
        { vcc: 12, rb: 280, rc: 3, beta: 50 },
        { vcc: 15, rb: 300, rc: 3, beta: 60 },
        { vcc: 20, rb: 510, rc: 5, beta: 80 },
        { vcc: 10, rb: 220, rc: 2, beta: 40 }
      ];
      const item = cases[weekOrdinal % cases.length];
      const ib = (item.vcc - 0.7) / item.rb;
      const ic = item.beta * ib;
      const uce = item.vcc - ic * item.rc;
      return [{
        topic: "共射静态工作点",
        prompt: `某基本共射电路 V_CC=${item.vcc} V，R_b=${item.rb} kΩ，R_c=${item.rc} kΩ，β=${item.beta}，取 U_BEQ=0.7 V。U_CEQ 最接近多少？`,
        options: [`${item.vcc.toFixed(1)} V`, `${uce.toFixed(2)} V`, `${(uce / 2).toFixed(2)} V`, "0.30 V"],
        answer: 1,
        explanation: `$I_{BQ}=(${item.vcc}−0.7)/${item.rb}\\approx${(ib * 1000).toFixed(1)}\\,\\mu A$，$I_{CQ}=${item.beta}I_{BQ}\\approx${(ic * 1000).toFixed(2)}\\,\\mathrm{mA}$，所以 $U_{CEQ}\\approx${uce.toFixed(2)}\\,\\mathrm V$。`
      }];
    },
    q10({ weekOrdinal }) {
      const items = [
        {
          topic: "共射倒相",
          prompt: "单管共射放大电路的中频电压增益通常具有什么特征？",
          options: ["同相且 |A_u|≈1", "输出反相，并具有电压放大作用", "同相但没有电压放大作用", "只在截止区放大"],
          answer: 1,
          explanation: "输入增加使 $i_C$ 增加，集电极电压下降，因此共射电路输出反相，典型增益为 $-\\beta R_L'/r_{be}$。"
        },
        {
          topic: "集电极电阻作用",
          prompt: "共射电路中集电极电阻 R_c 的主要作用之一是？",
          options: ["桥接输入和输出形成短路", "把集电极电流变化转换为输出电压变化", "让发射结反偏", "使基极电流恒为零"],
          answer: 1,
          explanation: "$u_{CE}=V_{CC}-i_C R_C$，所以 $R_C$ 把 $i_C$ 的变化转换为 $u_o$ 的变化。"
        },
        {
          topic: "交直流叠加",
          prompt: "共射放大器中 $u_{BE}=U_{BEQ}+u_{be}$ 表示？",
          options: ["只有交流信号", "直流工作点电压与交流小信号的叠加", "两个直流电压相加", "基极和集电极电压相等"],
          answer: 1,
          explanation: "$U_{BEQ}$ 是静态偏置，$u_{be}$ 是交流变化量，总瞬时量为两者叠加。"
        },
        {
          topic: "截止失真",
          prompt: "共射放大器静态工作点过低时，输入大信号最容易出现哪种失真？",
          options: ["截止失真", "对称无失真", "仅相频失真", "电源短路"],
          answer: 0,
          explanation: "工作点过低时，输入负半周可能使三极管进入截止区，形成顶部被削掉的截止失真。",
          correctPosition: 0
        }
      ];
      const item = items[weekOrdinal % items.length];
      return [item];
    },
    q11({ weekOrdinal }) {
      const items = [
        {
          topic: "未旁路 Re",
          prompt: "共射电路串联 R_e 且不接旁路电容，通常怎样变化？",
          options: ["|A_u| 增大，R_i 减小", "|A_u| 减小，R_i 增大", "二者都增大", "二者都不变"],
          answer: 1,
          explanation: "$R_e$ 引入电流负反馈，使增益下降，同时把输入电阻近似提高 $(1+\\beta)R_e$。"
        },
        {
          topic: "旁路电容",
          prompt: "在发射极电阻两端并联大旁路电容 C_e，中频交流分析中主要作用是？",
          options: ["把交流侧的 R_e 近似短路", "把直流侧的 R_e 断开", "让三极管截止", "消除直流电源"],
          answer: 0,
          explanation: "大电容在中频交流下近似短路，可保留 R_e 的直流稳定作用，同时避免交流增益被严重降低。"
        },
        {
          topic: "温度稳定",
          prompt: "发射极电阻 R_e 能稳定静态工作点，主要因为？",
          options: ["它使基极电流恒定为零", "它把 I_E 变化转换成负反馈电压", "它让集电结正偏", "它使交流信号完全消失"],
          answer: 1,
          explanation: "温度导致 $I_E$ 增加时，$R_e$ 上压降增大，使发射结电压减小，从而抑制 $I_E$ 继续增加。"
        },
        {
          topic: "电流负反馈",
          prompt: "发射极电阻对交流信号形成的反馈类型是？",
          options: ["电压正反馈", "电流负反馈", "无反馈", "仅直流正反馈"],
          answer: 1,
          explanation: "输出电流变化在 R_e 上产生反馈电压并控制输入回路，因此属于电流负反馈。"
        }
      ];
      return pick(items, weekOrdinal);
    },
    q12({ weekOrdinal }) {
      const items = [
        {
          topic: "共集电极端口",
          prompt: "射极跟随器的输入和输出端分别是？",
          options: ["发射极输入、集电极输出", "基极输入、发射极输出", "集电极输入、基极输出", "两个端口都在集电极"],
          answer: 1,
          explanation: "共集电极组态从基极输入、发射极输出，集电极交流接地。"
        },
        {
          topic: "射极跟随器增益",
          prompt: "射极跟随器的中频电压增益通常怎样？",
          options: ["远大于 1 且反相", "略小于 1 且同相", "恰等于 0", "为负且趋近 −∞"],
          answer: 1,
          explanation: "射极跟随器电压增益接近 1、电压跟随且同相，同时具有电流放大能力。"
        },
        {
          topic: "阻抗特点",
          prompt: "共集电极电路最典型的阻抗特征是？",
          options: ["低输入电阻、高输出电阻", "高输入电阻、低输出电阻", "输入输出电阻都为零", "输入输出电阻都无穷大"],
          answer: 1,
          explanation: "$(1+\\beta)$ 倍增使输入电阻较大，而输出端看进去的电阻被 $(1+\\beta)$ 除小。"
        },
        {
          topic: "射随器用途",
          prompt: "射极跟随器最适合用于？",
          options: ["高电压增益首级", "电压缓冲和增强带载能力", "产生大电压反相", "高频功率放大"],
          answer: 1,
          explanation: "接近 1 的同相电压增益与低输出电阻，使其适合作为电压缓冲级或驱动负载。"
        }
      ];
      return pick(items, weekOrdinal);
    },
    q14({ weekOrdinal }) {
      const cases = [
        { r: 1000, c: 160e-9 },
        { r: 2200, c: 100e-9 },
        { r: 10000, c: 10e-9 },
        { r: 500, c: 330e-9 }
      ];
      const item = cases[weekOrdinal % cases.length];
      const fc = 1 / (2 * Math.PI * item.r * item.c);
      const rLabel = item.r >= 1000 ? `${item.r / 1000} kΩ` : `${item.r} Ω`;
      const cLabel = `${Math.round(item.c * 1e9)} nF`;
      return [{
        topic: "RC 低通截止频率",
        prompt: `一阶 RC 低通电路 R=${rLabel}、C=${cLabel}，其截止频率最接近多少？`,
        options: [`${(fc * 10).toFixed(0)} Hz`, `${fc.toFixed(0)} Hz`, `${(fc / 10).toFixed(0)} Hz`, `${(fc * 100).toFixed(0)} Hz`],
        answer: 1,
        explanation: `$f_H=1/(2\\pi RC)\\approx${fc.toFixed(0)}\\,\\mathrm{Hz}$。`
      }];
    },
    q16({ weekOrdinal }) {
      const items = [
        {
          topic: "RC 高通斜率",
          prompt: "一阶 RC 高通电路在远低于截止频率处，幅频折线斜率约为？",
          options: ["+20 dB/十倍频", "−20 dB/十倍频", "0 dB/十倍频", "+40 dB/十倍频"],
          answer: 0,
          explanation: "低频时 $|A|\\approx f/f_L$，每升高一个十倍频程增益增加 20 dB。"
        },
        {
          topic: "RC 低通斜率",
          prompt: "一阶 RC 低通电路在远高于截止频率处，幅频折线斜率约为？",
          options: ["+20 dB/十倍频", "−20 dB/十倍频", "0 dB/十倍频", "−40 dB/十倍频"],
          answer: 1,
          explanation: "高频时 $|A|\\approx f_H/f$，频率每升高一个十倍频程增益下降 20 dB。"
        },
        {
          topic: "转折点误差",
          prompt: "一阶 RC 幅频折线在截止频率处相对真实曲线的误差约为？",
          options: ["−1 dB", "−3 dB", "−6 dB", "0 dB"],
          answer: 1,
          explanation: "截止点真实幅值为最大值的 $1/\\sqrt2$，对应约 −3 dB。"
        },
        {
          topic: "高通截止相移",
          prompt: "RC 高通电路在截止频率处的相移约为？",
          options: ["+45°", "−45°", "0°", "−90°"],
          answer: 0,
          explanation: "RC 高通在 $f=f_L$ 时相位为 $+45^\\circ$，低频端趋近 +90°。"
        }
      ];
      return pick(items, weekOrdinal);
    },
    q18({ weekOrdinal }) {
      const items = [
        {
          topic: "多级带宽",
          prompt: "两级相近带宽的放大器级联后，总通频带通常怎样？",
          options: ["比每一级都宽", "比每一级都窄", "等于第一级", "完全不变"],
          answer: 1,
          explanation: "各级附加极点使高频衰减更早发生，级联后的总通频带变窄。"
        },
        {
          topic: "多级对数增益",
          prompt: "多级放大器的总电压增益分贝值怎样计算？",
          options: ["各级分贝值相乘", "各级分贝值相加", "只取最大一级", "各级分贝值相除"],
          answer: 1,
          explanation: "复数增益相乘，取对数后变成分贝相加，相位则代数相加。"
        },
        {
          topic: "多级相移",
          prompt: "多级放大器的总相移与各级相移的关系是？",
          options: ["相移相乘", "相移代数相加", "相移恒为零", "只取第一级"],
          answer: 1,
          explanation: "级联系统的总相位等于各级相位之和。"
        },
        {
          topic: "直接耦合低频",
          prompt: "直接耦合放大器的下限频率通常可以怎样？",
          options: ["接近 0 Hz", "必然非常高", "等于上限频率", "无法确定且无穷大"],
          answer: 0,
          explanation: "直接耦合没有级间耦合电容，理想情况下可以放大直流和极低频信号。"
        }
      ];
      return pick(items, weekOrdinal);
    }
  };
})();
