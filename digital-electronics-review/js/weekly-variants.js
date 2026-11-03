(function () {
  "use strict";

  const quiz = window.ANALOG_QUIZ;
  if (!quiz) return;

  function pick(items, weekOrdinal) {
    return [items[weekOrdinal % items.length]];
  }

  quiz.weeklyThemes = [
    "数制与逻辑化简",
    "组合逻辑分析设计",
    "算术与补码",
    "典型器件与冒险"
  ];

  quiz.weeklyVariants = {
    q01({ weekOrdinal }) {
      const values = [13, 21, 26, 37, 45, 58, 73, 90];
      const value = values[weekOrdinal % values.length];
      const binary = value.toString(2);
      const altA = (value + 1).toString(2);
      const altB = (value - 1).toString(2);
      return [{
        topic: "十进制转二进制",
        prompt: `十进制数 ${value} 的二进制表示是？`,
        options: [altA, binary, altB, `1${binary}`],
        answer: 1,
        explanation: `${value} 的二进制为 ${binary}。可用除以 2 取余并逆序读取验证。`
      }];
    },
    q02({ weekOrdinal }) {
      const values = [9, 10, 11, 12, 13, 14, 15, 7];
      const value = values[weekOrdinal % values.length];
      const binary = value.toString(2).padStart(4, "0");
      const hex = value.toString(16).toUpperCase();
      const wrong = [((value + 1) % 16).toString(16).toUpperCase(), ((value + 2) % 16).toString(16).toUpperCase(), ((value + 7) % 16).toString(16).toUpperCase()];
      return [{
        topic: "二进制转十六进制",
        prompt: `二进制数 $${binary}_2$ 对应的十六进制数字是？`,
        options: [wrong[0], hex, wrong[1], wrong[2]],
        answer: 1,
        explanation: `$${binary}_2=${value}_{10}$，十六进制中写作 ${hex}。`
      }];
    },
    q03({ weekOrdinal }) {
      return pick([
        {
          topic: "德摩根定律",
          prompt: "$\\overline{AB}$ 等价于？",
          options: ["$\\overline A\\,\\overline B$", "$\\overline A+\\overline B$", "$A+B$", "$AB$"],
          answer: 1,
          explanation: "德摩根定律把与取反变成两个反相变量相加。"
        },
        {
          topic: "德摩根定律",
          prompt: "$\\overline{A+B}$ 等价于？",
          options: ["$A+B$", "$\\overline A\\,\\overline B$", "$\\overline A+\\overline B$", "$AB$"],
          answer: 1,
          explanation: "或取反后，运算由或变为与，同时每个变量取反。"
        },
        {
          topic: "反演规则",
          prompt: "对逻辑式 $F=AB+C$ 使用反演规则，正确结果是？",
          options: ["$AB+C$", "$(\\overline A+\\overline B)\\overline C$", "$\\overline A\\,\\overline B+\\overline C$", "$A+B+C$"],
          answer: 1,
          explanation: "反演时与、或互换，原变量与反变量互换，并保持原优先级。"
        },
        {
          topic: "对偶规则",
          prompt: "逻辑式 $F=A+BC$ 的对偶式是？",
          options: ["$A+BC$", "$A(B+C)$", "$\\overline A+\\overline B\\,\\overline C$", "$AB+C$"],
          answer: 1,
          explanation: "对偶时只把与、或互换，0、1 互换，变量本身不取反。"
        }
      ], weekOrdinal);
    },
    q05({ weekOrdinal }) {
      const items = [
        { terms: "A B\\overline C", index: 6 },
        { terms: "\\overline A B C", index: 3 },
        { terms: "A\\overline B\\overline C", index: 4 },
        { terms: "\\overline A\\,\\overline B C", index: 1 }
      ];
      const item = items[weekOrdinal % items.length];
      return [{
        topic: "最小项编号",
        prompt: `三变量 $A,B,C$ 的最小项 $${item.terms}$ 对应哪个编号？`,
        options: [`$m_${(item.index + 1) % 8}$`, `$m_${item.index}$`, `$m_${(item.index + 2) % 8}$`, `$m_${(item.index + 5) % 8}$`],
        answer: 1,
        explanation: "按 $A,B,C$ 顺序，原变量记 1、反变量记 0，再把三位二进制换成十进制。"
      }];
    },
    q06({ weekOrdinal }) {
      const items = [
        { set: "{1,3,5,7}", result: "C", distractors: ["A", "B", "\\overline A"], explain: "四项都满足 $C=1$，A、B 成对变化。" },
        { set: "{0,1,4,5}", result: "\\overline B", distractors: ["B", "C", "A"], explain: "四项都满足 $B=0$。" },
        { set: "{2,3,6,7}", result: "B", distractors: ["\\overline B", "C", "A"], explain: "四项都满足 $B=1$。" },
        { set: "{0,2,4,6}", result: "\\overline C", distractors: ["C", "\\overline B", "A"], explain: "四项都满足 $C=0$。" }
      ];
      const item = items[weekOrdinal % items.length];
      return [{
        topic: "卡诺图化简",
        prompt: `三变量函数 $F(A,B,C)=\\sum m${item.set}$ 化简为？`,
        options: [`$${item.distractors[0]}$`, `$${item.result}$`, `$${item.distractors[1]}$`, `$${item.distractors[2]}$`],
        answer: 1,
        explanation: item.explain
      }];
    },
    q09({ weekOrdinal }) {
      return pick([
        {
          topic: "全加器求和",
          prompt: "全加器的和输出 $S$ 是三个输入 $A,B,C_i$ 的？",
          options: ["逻辑与", "奇偶性（异或）", "多数表决", "逻辑或"],
          answer: 1,
          explanation: "$S=A\\oplus B\\oplus C_i$，三个输入中 1 的个数为奇数时输出 1。"
        },
        {
          topic: "全加器进位",
          prompt: "全加器的进位输出 $C_o$ 表示三个输入中的什么？",
          options: ["至少两个为 1", "全部为 0", "恰好一个为 1", "输入完全相同"],
          answer: 0,
          explanation: "$C_o=AB+AC_i+BC_i$，即三个输入中至少两个为 1 时产生进位。"
        },
        {
          topic: "半加器",
          prompt: "半加器的本位和与进位分别是？",
          options: ["$S=A+B,\\ C=AB$", "$S=A\\oplus B,\\ C=AB$", "$S=AB,\\ C=A+B$", "$S=A,\\ C=B$"],
          answer: 1,
          explanation: "半加器没有低位进位，和由异或产生，进位由与产生。"
        },
        {
          topic: "串行进位",
          prompt: "串行进位加法器的主要缺点是？",
          options: ["无法做加法", "高位必须等待低位进位，延迟随位数增加", "不能使用全加器", "只能处理负数"],
          answer: 1,
          explanation: "进位逐级传递形成较长延迟，位数越多，高位得到结果越晚。"
        }
      ], weekOrdinal);
    },
    q10({ weekOrdinal }) {
      const values = [-3, -4, -7, -10];
      const value = values[weekOrdinal % values.length];
      const magnitude = Math.abs(value);
      const trueBits = (value + 256).toString(2).padStart(8, "0");
      const signBits = "1" + magnitude.toString(2).padStart(7, "0");
      const ones = "1" + magnitude.toString(2).padStart(7, "0").split("").map((b) => b === "0" ? "1" : "0").join("");
      return [{
        topic: "补码表示",
        prompt: `8 位补码表示 ${value}，正确编码是？`,
        options: [signBits, ones, trueBits, (value + 128).toString(2).padStart(8, "0")],
        answer: 2,
        explanation: `负数 ${value} 的补码为 $2^8${value}=${value + 256}$，二进制为 ${trueBits}。`
      }];
    },
    q11({ weekOrdinal }) {
      return pick([
        {
          topic: "组合设计起点",
          prompt: "组合逻辑设计最合理的起始步骤是？",
          options: ["先焊门电路", "先定义输入输出并写真值表", "先选芯片封装", "先查找冒险"],
          answer: 1,
          explanation: "先明确逻辑变量和输出，再列真值表，之后才能写标准式和化简。"
        },
        {
          topic: "设计流程",
          prompt: "由真值表得到最简门电路之前，通常还必须完成？",
          options: ["测量电源纹波", "写逻辑表达式并化简", "先加触发器", "删除输出"],
          answer: 1,
          explanation: "真值表可以写成最小项表达式，再用逻辑代数或卡诺图化简。"
        },
        {
          topic: "与非门实现",
          prompt: "用与非门实现与或式时，常用哪条恒等式辅助转换？",
          options: ["德摩根定律", "欧姆定律", "基尔霍夫电压定律", "牛顿第二定律"],
          answer: 0,
          explanation: "通过两次取反和德摩根定律，可把与或结构转换为与非–与非结构。"
        },
        {
          topic: "无关项设计",
          prompt: "卡诺图中的无关项在设计中可以怎样使用？",
          options: ["必须全部当作 0", "为扩大圈可当作 1，也可忽略", "必须全部当作 1", "会删除整个函数"],
          answer: 1,
          explanation: "无关项可以灵活选择 0 或 1，以得到更简单且合法的函数。"
        }
      ], weekOrdinal);
    },
    q13({ weekOrdinal }) {
      return pick([
        {
          topic: "高有效译码器",
          prompt: "高有效 3 线–8 线二进制译码器的一个输出对应？",
          options: ["某个输入变量", "一个输入最小项", "所有输入之和", "输出反馈"],
          answer: 1,
          explanation: "3 个输入形成 8 个最小项，每个输出对应其中一个组合。"
        },
        {
          topic: "低有效译码器",
          prompt: "若译码器输出为低电平有效，未选中输出通常是什么状态？",
          options: ["低电平", "高电平", "高阻态", "交替翻转"],
          answer: 1,
          explanation: "低有效输出只有被选中的一路为 0，其余未选中输出为 1。"
        },
        {
          topic: "译码器使能端",
          prompt: "译码器使能端无效时，输出通常会怎样？",
          options: ["继续正常译码", "全部强制到非有效电平", "随机变化", "全部进入高阻态且与型号无关"],
          answer: 1,
          explanation: "使能端无效时芯片被禁止，输出按功能表统一置为非有效电平。"
        },
        {
          topic: "译码器实现函数",
          prompt: "用高有效译码器实现与或式时，通常需要哪些附加门？",
          options: ["触发器", "或门或与非门", "仅电容", "整流器"],
          answer: 1,
          explanation: "把目标最小项对应的译码输出合并即可，高有效输出常用或门；低有效输出常用与非门。"
        }
      ], weekOrdinal);
    },
    q18({ weekOrdinal }) {
      return pick([
        {
          topic: "静态 1 冒险",
          prompt: "静态 1 冒险通常表现为？",
          options: ["应保持 1，却出现短暂 0", "应保持 0，却永久为 1", "输入全部冻结", "电源断开"],
          answer: 0,
          explanation: "不同路径延迟使输出在稳定到 1 之前出现短暂 0 脉冲。"
        },
        {
          topic: "静态 0 冒险",
          prompt: "静态 0 冒险通常表现为？",
          options: ["应保持 0，却出现短暂 1", "应保持 1，却永久为 0", "两个输出同时短路", "没有变化"],
          answer: 0,
          explanation: "静态 0 冒险是理论输出保持 0，却因竞争短暂跳到 1。"
        },
        {
          topic: "冗余项消除冒险",
          prompt: "化简式为 $F=AB+\\overline AC$ 时，加入哪个冗余项可消除静态 1 冒险？",
          options: ["$BC$", "$AB$", "$\\overline A\\,\\overline B$", "$C$"],
          answer: 0,
          explanation: "一致项 $BC$ 覆盖 A 变化时的暂态空档，可消除该静态 1 冒险。"
        },
        {
          topic: "竞争与冒险",
          prompt: "竞争一定会导致错误输出吗？",
          options: ["一定会", "不一定，只有产生非预期脉冲时才是冒险", "永远不会", "仅在直流时发生"],
          answer: 1,
          explanation: "竞争描述信号到达时间不同；竞争是否形成冒险取决于是否产生错误稳态或暂态脉冲。"
        }
      ], weekOrdinal);
    }
  };
})();
