window.ANALOG_COURSE = {
  title: "数字电子技术",
  subtitle: "逻辑代数 · 组合逻辑 · 常用数字器件",
  updatedAt: "2026-11-04",
  chapters: [
    {
      id: "logic-algebra",
      number: "01",
      title: "数制与逻辑代数",
      english: "Number Systems & Boolean Algebra",
      accent: "cyan",
      summary: "先把十进制、二进制和十六进制互转，再用逻辑代数和卡诺图把表达式压到最简。",
      examFocus: ["数制转换", "逻辑运算", "布尔恒等式", "最小项", "卡诺图"],
      themes: [
        {
          id: "number-systems",
          title: "数制与转换",
          summary: "数字电路用二进制表达状态，八进制和十六进制只是便于书写的压缩方式。",
          cards: [
            {
              id: "digital-characteristics",
              type: "definition",
              title: "数字电路的特点",
              body: [
                "数字电路用离散电平表示 0、1，便于存储、处理和集成。",
                "相对模拟电路，数字电路抗干扰能力较强、可靠性较高，但随着速度提升，时序、功耗和布线问题仍然存在。"
              ]
            },
            {
              id: "common-number-systems",
              type: "definition",
              title: "二、八、十、十六进制",
              bullets: [
                "二进制基数 2，数字 0、1，常记作 $(N)_2$。",
                "八进制基数 8，数字 0～7。",
                "十进制基数 10，数字 0～9。",
                "十六进制基数 16，数字 0～9 与 A～F。"
              ]
            },
            {
              id: "binary-to-decimal",
              type: "formula",
              title: "任意进制转十进制",
              body: [
                "按位权展开：整数部分从小数点向左依次是 $R^0,R^1,\\ldots$，小数部分从右依次是 $R^{-1},R^{-2},\\ldots$。"
              ],
              formula: String.raw`(N)_R=\sum_i d_iR^i`
            },
            {
              id: "binary-conversion-example",
              type: "example",
              title: "例题：二进制转十进制",
              body: [
                "把 $(101101.01)_2$ 按权展开。",
                "$101101.01_2=32+8+4+1+0.25=45.25$。"
              ]
            },
            {
              id: "decimal-integer-conversion",
              type: "judgment",
              title: "十进制整数转二进制",
              body: [
                "整数反复除以 2，记录余数；从最后一个余数向前读。",
                "例如 $13_{10}=1101_2$：余数依次为 1、0、1、1，反向读出。"
              ]
            },
            {
              id: "group-conversion",
              type: "formula",
              title: "二、八、十六进制分组转换",
              body: [
                "二进制与八进制按每 3 位分组，与十六进制按每 4 位分组，从小数点向两侧分组，不足位补 0。",
                "分组后每组独立转换，不改变基数之间的大小关系。"
              ]
            }
          ]
        },
        {
          id: "logic-basics",
          title: "逻辑变量与基本运算",
          summary: "逻辑变量只取 0 或 1；与、或、非构成全部二值逻辑的基础。",
          cards: [
            {
              id: "logic-variables",
              type: "definition",
              title: "逻辑变量与状态赋值",
              body: [
                "逻辑变量用字母表示，只取 0、1 两个值；0、1 表示两种互斥状态，并不等同于普通数值大小。",
                "可以约定开关闭合为 1、断开为 0，灯亮为 1、灭为 0，但约定改变会影响函数写法。"
              ]
            },
            {
              id: "logic-and",
              type: "definition",
              title: "与逻辑（AND）",
              body: [
                "所有条件同时成立时输出才为 1。逻辑乘写作 $AB$ 或 $A\\cdot B$。",
                "$0\\cdot0=0$，$0\\cdot1=0$，$1\\cdot0=0$，$1\\cdot1=1$。"
              ]
            },
            {
              id: "logic-or",
              type: "definition",
              title: "或逻辑（OR）",
              body: [
                "只要有一个条件成立，输出就为 1。逻辑加写作 $A+B$。",
                "$0+0=0$，$0+1=1$，$1+0=1$，$1+1=1$。"
              ]
            },
            {
              id: "logic-not",
              type: "definition",
              title: "非逻辑（NOT）",
              body: [
                "输出状态与输入状态相反，写作 $\\overline A$、$A'$ 或 $\\neg A$。",
                "$\\overline0=1$，$\\overline1=0$。"
              ]
            },
            {
              id: "compound-gates",
              type: "application",
              title: "复合逻辑：与非、或非、异或、同或",
              formula: String.raw`\mathrm{NAND}:\overline{AB},
\qquad
\mathrm{NOR}:\overline{A+B},
\qquad
A\oplus B=\overline AB+A\overline B,
\qquad
A\odot B=AB+\overline A\,\overline B`
            },
            {
              id: "truth-table",
              type: "definition",
              title: "真值表",
              body: [
                "把输入变量的所有取值组合及对应输出列成表，$n$ 个变量共有 $2^n$ 行。",
                "真值表能直接定义逻辑函数，也是分析和设计组合逻辑电路的基本入口。"
              ]
            }
          ]
        },
        {
          id: "boolean-laws",
          title: "布尔恒等式与三大规则",
          summary: "化简要靠恒等式、代入、反演和对偶规则，而不是把逻辑式当普通代数式。",
          cards: [
            {
              id: "basic-identities",
              type: "formula",
              title: "0-1 律、同一律与互补律",
              formula: String.raw`A+0=A,
\quad A\cdot1=A,
\quad A+1=1,
\quad A\cdot0=0,
\quad A+A=A,
\quad A\cdot A=A,
\quad A+\overline A=1,
\quad A\overline A=0`
            },
            {
              id: "commutative-associative",
              type: "formula",
              title: "交换律与结合律",
              formula: String.raw`A+B=B+A,
\qquad AB=BA,
\qquad
(A+B)+C=A+(B+C),
\qquad
(AB)C=A(BC)`
            },
            {
              id: "distributive-law",
              type: "formula",
              title: "分配律",
              formula: String.raw`A(B+C)=AB+AC,
\qquad
A+BC=(A+B)(A+C)`
            },
            {
              id: "demorgan",
              type: "formula",
              title: "德摩根定律",
              body: [
                "对多变量同样成立：先把整个表达式取反，再逐项取反并把与、或互换。",
                "反演时保持原来的运算优先级，必要时加括号。"
              ],
              formula: String.raw`\overline{A+B}=\overline A\,\overline B,
\qquad
\overline{AB}=\overline A+\overline B`
            },
            {
              id: "absorption",
              type: "formula",
              title: "吸收与冗余项",
              formula: String.raw`A+AB=A,
\qquad
A(A+B)=A,
\qquad
A+\overline AB=A+B,
\qquad
AB+\overline AC+BC=AB+\overline AC`
            },
            {
              id: "substitution-rule",
              type: "property",
              title: "代入规则",
              body: [
                "若一个恒等式成立，把式中任一变量用另一个逻辑函数整体替代，等式仍然成立。",
                "代入时要保持原运算关系和括号范围，不能只替换局部。"
              ]
            },
            {
              id: "duality-rule",
              type: "property",
              title: "对偶规则",
              body: [
                "把表达式中的与、或互换，0、1 互换，保持变量和优先级不变，得到对偶式。",
                "若原式成立，其对偶式也成立；求对偶时变量不取反。"
              ],
              formula: String.raw`F=A+B \longleftrightarrow F^D=AB`
            }
          ]
        },
        {
          id: "canonical-forms",
          title: "最小项、最大项与标准式",
          summary: "每个最小项只对应一个输入组合，是连接真值表、卡诺图和与或式的标准坐标。",
          cards: [
            {
              id: "minterm",
              type: "definition",
              title: "最小项",
              body: [
                "$n$ 个变量的最小项是每个变量以原变量或反变量出现一次的逻辑乘积，共 $2^n$ 个。",
                "任一最小项只有一种输入组合使其取 1；任意两个不同最小项之积恒为 0。"
              ]
            },
            {
              id: "minterm-index",
              type: "formula",
              title: "最小项编号",
              body: [
                "把输入组合按变量顺序写成二进制，原变量取 1、反变量取 0，再换算成十进制，就是最小项下标。",
                "例如 $A,B,C$ 中 $A\\overline B C$ 对应 $101_2=5$，记作 $m_5$。"
              ]
            },
            {
              id: "standard-sop",
              type: "formula",
              title: "标准与或式",
              body: [
                "把逻辑函数为 1 的各最小项相加，可写成 $\\sum m_i$ 形式。",
                "标准与或式可能不是最简式，设计时通常还要继续化简。"
              ],
              formula: String.raw`F=\sum_i m_i`
            },
            {
              id: "maxterm",
              type: "definition",
              title: "最大项",
              body: [
                "最大项是每个变量以原变量或反变量出现一次的逻辑和；任一最大项只有一种输入组合使其为 0。",
                "最大项编号与补变量的取值约定相反：原变量对应 0，反变量对应 1。"
              ]
            },
            {
              id: "standard-pos",
              type: "formula",
              title: "标准或与式",
              body: [
                "函数为 0 的输入组合对应最大项，把最大项相乘得到标准或与式。",
                "同一个逻辑函数可以在标准与或式和标准或与式之间转换。"
              ],
              formula: String.raw`F=\prod_j M_j`
            },
            {
              id: "canonical-conversion",
              type: "judgment",
              title: "从真值表写标准式",
              bullets: [
                "输出为 1 的行写原变量/反变量乘积，得到最小项。",
                "把所有输出为 1 的最小项相加。",
                "若写最大项式，则找输出为 0 的行，并按最大项规则写和式。",
                "最后可用其中一个输入组合代回验证。"
              ]
            }
          ]
        },
        {
          id: "karnaugh-map",
          title: "卡诺图化简",
          summary: "卡诺图把真值表按 Gray 码排列，让相邻格只相差一个变量。",
          cards: [
            {
              id: "kmap-layout",
              type: "definition",
              title: "卡诺图的构成",
              body: [
                "每个格子对应一个最小项；横向和纵向变量编码一改一，因此物理相邻和边界相邻通常都是逻辑相邻。",
                "二变量有 4 格，三变量 8 格，四变量 16 格；四变量图的四角也彼此相邻。"
              ]
            },
            {
              id: "kmap-adjacency",
              type: "judgment",
              title: "相邻与合并",
              figures: [
                {
                  src: "./assets/source/combinational-logic/kmap-eight-minterms.jpg",
                  title: "8 个最小项的合并",
                  caption: "教材图 1.2.5：上下两行各 4 格合成 8 格组，分别消去三个变量得到 B 或 B̄。"
                }
              ],
              body: [
                "两个相邻 1 格合并消去一个变量；4 个一组消去两个变量；8 个一组消去三个变量。",
                "可合并的格数必须是 $2^k$，圈内每个变量都应能以原、反形式成对出现。"
              ]
            },
            {
              id: "kmap-rules",
              type: "property",
              title: "画圈规则",
              figures: [
                {
                  src: "./assets/source/combinational-logic/kmap-pair-quad-groups.jpg",
                  title: "两个与四个最小项的合并",
                  caption: "教材图 1.2.3：横向、纵向、边界与四角相邻都能组成 2 格或 4 格圈。"
                }
              ],
              bullets: [
                "所有为 1 的最小项都必须至少被一个圈覆盖。",
                "圈尽可能大、数量尽可能少，允许重叠和跨越边界。",
                "每个圈中 1 的个数为 $2^k$，不能只圈 3 个或 5 个格。",
                "优先保留能覆盖至少一个新格的大圈。"
              ]
            },
            {
              id: "don't-care",
              type: "formula",
              title: "无关项",
              body: [
                "某些输入组合在系统中不会出现，或输出可任意取值，这些最小项记为 $d_i$ 或 $'X'$。",
                "无关项可当作 1 用来扩大圈，也可当作 0 忽略；最终结果必须在合法输入上仍正确。"
              ],
              formula: String.raw`F=\sum m_i+\sum d_j`
            },
            {
              id: "kmap-example",
              type: "example",
              title: "例题：Σm(1,3,5,7)",
              body: [
                "三变量函数 $F(A,B,C)=\\sum m(1,3,5,7)$，下标分别为 001、011、101、111。",
                "四个格子可连成一个 4 格组；所有取值中 $A$、$B$ 都成对变化，只有 $C=1$ 保持不变。"
              ],
              example: {
                title: "结果",
                body: ["所以 $F=C$。"],
                formula: String.raw`F(A,B,C)=\sum m(1,3,5,7)=C`
              }
            },
            {
              id: "kmap-fallback",
              type: "warning",
              title: "卡诺图常见的丢解",
              body: [
                "只合并明显的水平相邻格，忘记上下边界和四角相邻。",
                "为了减少圈数漏掉某个 1，或把圈内的变量同时以原、反形式保留。",
                "无关项可以简化，但最后必须代回真正关心的输入组合检查。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "combinational-logic",
      number: "02",
      title: "组合逻辑分析与设计",
      english: "Combinational Logic",
      accent: "coral",
      summary: "组合逻辑没有记忆，输出只由当前输入决定；分析与设计正好沿着真值表与表达式互相转换。",
      examFocus: ["逻辑门", "组合逻辑分析", "设计步骤", "加法器", "补码"],
      themes: [
        {
          id: "logic-analysis",
          title: "逻辑门与组合逻辑分析",
          summary: "从电路输入开始逐级写中间函数，最后整理成真值表或最简表达式。",
          cards: [
            {
              id: "logic-gates",
              type: "definition",
              title: "基本逻辑门符号",
              figures: [
                {
                  src: "./assets/source/combinational-logic/logic-gate-symbols.jpg",
                  title: "七种逻辑运算的符号",
                  caption: "教材图 1.1.2：与、或、非、与非、或非、异或和同或的国际符号、曾用符号及特定外形符号。"
                },
                {
                  src: "./assets/source/combinational-logic/logic-diagram-simplified-symbols.jpg",
                  title: "逻辑图的简化画法",
                  caption: "教材图 4.7.3：中大规模集成电路中与门、或门和缓冲器的简化符号。"
                }
              ],
              body: [
                "与门、或门、非门是基本门；与非门、或非门、异或门和同或门由基本运算组合得到。",
                "看图时先确认输入端的反相小圈，再判断是“与非”还是“与”。国际符号与教材曾用符号表达同一逻辑功能，不能把外形不同误认为逻辑不同。"
              ]
            },
            {
              id: "combinational-definition",
              type: "definition",
              title: "组合逻辑电路",
              body: [
                "任意时刻的输出只由该时刻输入决定，与之前状态无关。",
                "同一组输入反复出现，输出应保持不变；电路本身不需要存储元件。"
              ]
            },
            {
              id: "analysis-steps",
              type: "judgment",
              title: "组合逻辑分析方法",
              bullets: [
                "从输入到输出逐级写中间变量。",
                "把各级表达式合并，得到输出函数。",
                "必要时用恒等式或卡诺图化简。",
                "列真值表核对功能，不能只看最外层门。"
              ]
            },
            {
              id: "analysis-example",
              type: "example",
              title: "例题：从逻辑图反推功能",
              figures: [
                {
                  src: "./assets/source/combinational-logic/analysis-parity-circuit.jpg",
                  title: "电路分析与中间表达式",
                  caption: "课堂例 4.1.1：每一级由与非门组成异或结构，逐级得到 W、X、Y 的表达式。"
                },
                {
                  src: "./assets/source/combinational-logic/analysis-parity-output.jpg",
                  title: "输出函数 Y 的展开",
                  caption: "课堂例 4.1.1：从 X 和 D 得到 Y 的八个最小项，可进一步分析四变量奇偶性。"
                },
                {
                  src: "./assets/source/combinational-logic/analysis-parity-truth-table.jpg",
                  title: "四变量奇偶检验真值表",
                  caption: "课堂例 4.1.1：输入 A、B、C、D 中 1 的个数为奇数时 Y=1，否则 Y=0。"
                }
              ],
              body: [
                "输入为四位二进制代码 $A,B,C,D$。逐级把相邻两位送入异或结构：$W=A\\oplus B$，$X=W\\oplus C$，最终 $Y=X\\oplus D$。",
                "异或满足交换律和结合律，所以 $Y=A\\oplus B\\oplus C\\oplus D$；逐个扫描真值表可知，输入中 1 的个数为奇数时输出 1。"
              ],
              example: {
                title: "功能与结论",
                body: [
                  "$Y=1$ 表示四位输入中 1 的个数为奇数，因此该电路实现奇校验位生成。",
                  "异或树把逐级比较展开成多输入奇偶判断；交换输入顺序不会改变最终函数。"
                ],
                formula: String.raw`Y=A\oplus B\oplus C\oplus D`
              }
            },
            {
              id: "logic-family",
              type: "property",
              title: "逻辑门系列",
              body: [
                "常见门电路按器件工艺分为 TTL、CMOS、ECL 等；教材题目常用 TTL/CMOS 说明阈值、速度和带载能力。",
                "同一逻辑功能可由不同工艺实现，不能把逻辑符号与具体电平画法混为一谈。"
              ]
            },
            {
              id: "multisim",
              type: "application",
              title: "Multisim 与逻辑仿真",
              body: [
                "Multisim 可搭建门电路、观察波形并验证真值表。",
                "仿真输入应覆盖边界组合，尤其是无关项、译码器使能端和竞争冒险。"
              ]
            }
          ]
        },
        {
          id: "combinational-design",
          title: "组合逻辑设计",
          summary: "从文字要求出发，列真值表、写标准式、化简，再选择门电路实现。",
          cards: [
            {
              id: "design-flow",
              type: "judgment",
              title: "组合逻辑设计四步",
              bullets: [
                "明确输入、输出及有效电平，给变量命名。",
                "列真值表，包含所有实际可能输入。",
                "写标准与或式并用逻辑代数或卡诺图化简。",
                "选择合适门器件实现，检查扇出、反相和时序。"
              ]
            },
            {
              id: "design-majority-example",
              type: "example",
              title: "例题：三人表决器",
              figures: [
                {
                  src: "./assets/source/combinational-logic/design-majority-setup.jpg",
                  title: "三人表决器的变量与状态赋值",
                  caption: "课堂例 4.1.2：输入 A、B、C 用 1 表示高电平；输出 Y 表示三者中的多数电平。"
                },
                {
                  src: "./assets/source/combinational-logic/design-majority-simplification.jpg",
                  title: "表决器真值表、化简与与非实现",
                  caption: "课堂例 4.1.2：四个 1 最小项合并成 BC+AC+AB，再用双重反演转成与非–与非结构。"
                }
              ],
              body: [
                "三人各投一票，输入为 $A,B,C$，至少两人同意时输出 $F=1$。",
                "真值表为 011、101、110、111 四个组合，写最小项后圈卡诺图。"
              ],
              example: {
                title: "化简",
                body: [
                  "四个最小项两两合并，可得到 $AB+AC+BC$。",
                  "若只允许与非门，可用两次反演把与或式转换为与非–与非结构。"
                ],
                formula: String.raw`F=AB+AC+BC`
              }
            },
            {
              id: "nand-realization",
              type: "formula",
              title: "与非门实现与或式",
              body: [
                "先写与或式，再对整体取两次反：一次用德摩根把内部或变成与非，另一次恢复逻辑。",
                "实现前先确认输入反变量是否已有现成反相信号。"
              ],
              formula: String.raw`F=AB+CD
=\overline{\overline{AB}\cdot\overline{CD}}`
            },
            {
              id: "sop-pos-choice",
              type: "judgment",
              title: "与或式还是或与式",
              body: [
                "输出为 1 的最小项少时通常写与或式；输出为 0 的行少时，或与式可能更简。",
                "选择门电路后还要考虑反相器数量、扇出和可用的标准封装，不只看代数式长度。"
              ]
            },
            {
              id: "design-constraint",
              type: "warning",
              title: "设计题的条件约束",
              body: [
                "“用与非门实现”“只能用二输入门”“输入只提供原变量”等条件会改变最终电路。",
                "题目要求芯片型号时，应先查看功能表和使能端，不能只把逻辑框图画出来。"
              ]
            }
          ]
        },
        {
          id: "binary-arithmetic",
          title: "二进制算术、补码与加法器",
          summary: "组合逻辑最早的典型应用是算术运算；减法通过补码转成加法。",
          cards: [
            {
              id: "binary-addition",
              type: "formula",
              title: "二进制加减乘除",
              body: [
                "加法和十进制类似，遵循“逢二进一”；减法遵循“借一当二”。",
                "乘法和除以 $2^k$ 可通过移位实现，是硬件算术的重要基础。"
              ]
            },
            {
              id: "signed-representations",
              type: "definition",
              title: "原码、反码、补码",
              body: [
                "原码用最高位表示符号，其余位表示绝对值；正数的反码、补码与原码相同。",
                "负数的反码是原码数值位逐位取反；补码是反码末位加 1。"
              ]
            },
            {
              id: "twos-complement-formula",
              type: "formula",
              title: "补码的位权定义",
              body: [
                "$n$ 位补码中最高位的权为 $-2^{n-1}$，其余位权仍为正。",
                "对于负数 $x$，其补码也等于 $2^n+x$ 的二进制表示。"
              ],
              formula: String.raw`X_{\rm 2's}=2^n+X\quad(n\text{ 位})`
            },
            {
              id: "twos-complement-example",
              type: "example",
              title: "例题：8 位补码表示 −5",
              body: [
                "原码为 $10000101$，数值位取反得反码 $11111010$，末位加 1 得补码 $11111011$。",
                "其最高位权为 $-128$，其余位权和为 $123$，因此数值为 $-5$。"
              ]
            },
            {
              id: "half-adder",
              type: "formula",
              title: "半加器",
              body: [
                "半加器只处理两个一位二进制数，输出本位和及进位。",
                "异或得到和，与门得到进位。"
              ],
              formula: String.raw`S=A\oplus B,
\qquad
C=AB`
            },
            {
              id: "full-adder",
              type: "formula",
              title: "全加器",
              body: [
                "全加器接收两个本位输入和低位进位，输出本位和及向高位的进位。",
                "和是两个输入与进位三者的奇偶性，进位是三者中至少两个为 1。"
              ],
              formula: String.raw`S=A\oplus B\oplus C_i,
\qquad
C_o=AB+AC_i+BC_i`
            },
            {
              id: "multibit-adder",
              type: "application",
              title: "串行进位与超前进位",
              body: [
                "串行进位加法器结构简单，但高位必须等待低位进位，延迟随位数增加。",
                "超前进位加法器同时生成进位信号，速度更快但电路更复杂。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "devices",
      number: "03",
      title: "常用组合逻辑器件",
      english: "Digital Building Blocks",
      accent: "lime",
      summary: "编码、译码、数据选择、ROM、校验和比较器，本质上都是经过设计的组合逻辑函数。",
      examFocus: ["优先编码器", "译码器", "数据选择器", "ROM", "竞争冒险"],
      themes: [
        {
          id: "encoders-decoders",
          title: "编码器与译码器",
          summary: "编码器把有效输入压缩成二进制码，译码器把二进制码展开成单个有效输出。",
          cards: [
            {
              id: "encoder-definition",
              type: "definition",
              title: "编码器",
              body: [
                "编码器把多个有效输入中的一个映射成较短的二进制代码。",
                "$2^n$ 个输入通常对应 $n$ 位输出；普通编码器要求同一时刻只有一个输入有效。"
              ]
            },
            {
              id: "binary-encoder",
              type: "formula",
              title: "8 线–3 线二进制编码器",
              figures: [
                {
                  src: "./assets/source/combinational-logic/binary-encoder-table.jpg",
                  title: "8 线–3 线普通编码器编码表",
                  caption: "普通编码器要求同一时刻只有一个输入有效；I0～I7 分别对应 000～111。"
                }
              ],
              body: [
                "若最高位输入为 $I_7$、最低位为 $I_0$，正常工作时只有一个输入为 1。",
                "每个输出都收集对应二进制位为 1 的输入。"
              ],
              formula: String.raw`Y_2=I_4+I_5+I_6+I_7,
\qquad
Y_1=I_2+I_3+I_6+I_7,
\qquad
Y_0=I_1+I_3+I_5+I_7`
            },
            {
              id: "priority-encoder",
              type: "definition",
              title: "优先编码器",
              figures: [
                {
                  src: "./assets/source/combinational-logic/priority-encoder-table.jpg",
                  title: "8 线–3 线优先编码器",
                  caption: "课堂图片：优先顺序为 I7→I0，高位有效后低位可用 ×（无关项）表示。"
                }
              ],
              body: [
                "优先级编码器允许多个输入同时有效，但只编码优先级最高的一个。",
                "最高优先输入会屏蔽其他输入；商用芯片常带输入使能、输出使能和扩展端。"
              ]
            },
            {
              id: "decoder-definition",
              type: "definition",
              title: "译码器",
              body: [
                "译码器把输入代码转换为至多一个有效输出，可用于地址选择、显示驱动和逻辑函数发生。",
                "一个 $n$ 位高有效二进制译码器有 $2^n$ 个输出，每个输出对应一个最小项。"
              ]
            },
            {
              id: "binary-decoder",
              type: "formula",
              title: "3 线–8 线二进制译码器",
              figures: [
                {
                  src: "./assets/source/combinational-logic/binary-decoder-table.jpg",
                  title: "3 线–8 线译码器真值表与函数式",
                  caption: "课堂图片：输入 A2A1A0 的每个组合只使对应输出 Yi 为 1，输出函数正好是一个最小项。"
                }
              ],
              body: [
                "高有效输出时，$Y_i$ 等于对应输入最小项；低有效输出时还要整体取反。",
                "使能端无效时，所有有效输出会被强制为非有效电平。"
              ],
              formula: String.raw`Y_i=m_i,
\qquad
i=0,1,\ldots,7`
            },
            {
              id: "decoder-function",
              type: "application",
              title: "用译码器实现逻辑函数",
              body: [
                "译码器输出天然对应最小项，外加与非/或门即可组合成任意与或式或或与式。",
                "使用低有效译码器时，通常用与非门合并目标最小项。"
              ]
            }
          ]
        },
        {
          id: "mux-demux",
          title: "数据选择器与分配器",
          summary: "选择器按地址从多路数据中取一路，分配器按地址把一路数据送到某个输出。",
          cards: [
            {
              id: "multiplexer",
              type: "definition",
              title: "数据选择器",
              body: [
                "数据选择器（MUX）有 $2^n$ 个数据输入、$n$ 个选择控制端和 1 个输出。",
                "选择控制端形成地址，决定哪一个数据输入接到输出。"
              ]
            },
            {
              id: "four-to-one-mux",
              type: "formula",
              title: "4 选 1 数据选择器",
              formula: String.raw`Y=\overline{A_1}\,\overline{A_0}D_0
+\overline{A_1}A_0D_1
+A_1\overline{A_0}D_2
+A_1A_0D_3`
            },
            {
              id: "mux-function",
              type: "application",
              title: "用数据选择器实现组合逻辑",
              figures: [
                {
                  src: "./assets/source/combinational-logic/mux-logic-example.jpg",
                  title: "用 4 选 1 数据选择器实现多数函数",
                  caption: "课堂例 4.6.1：把 A、B 接地址端，配置 D0=0、D1=D2=C、D3=1，实现 F=AB+BC+AC。"
                }
              ],
              body: [
                "把函数变量端接到选择控制端，将真值表每个地址对应的输出值接到数据端，可把一个函数值表直接变成 MUX 实现。",
                "若变量多于选择端，可将某些变量接在数据端，构成“数据端函数”。本例用 74LS153 的一半，把多数表决函数压缩到三个不同数据端取值。"
              ]
            },
            {
              id: "demultiplexer",
              type: "definition",
              title: "数据分配器",
              body: [
                "数据分配器（DEMUX）把一路输入分配到 $2^n$ 个输出中的指定一路。",
                "未选中的输出保持无效电平；其结构与带地址控制的译码器相近。"
              ]
            },
            {
              id: "one-to-four-demux",
              type: "formula",
              title: "1 线–4 线数据分配器",
              formula: String.raw`Y_0=\overline{A_1}\,\overline{A_0}D,
\quad
Y_1=\overline{A_1}A_0D,
\quad
Y_2=A_1\overline{A_0}D,
\quad
Y_3=A_1A_0D`
            }
          ]
        },
        {
          id: "rom-parity-comparator",
          title: "ROM、校验器与数值比较器",
          summary: "这些器件都可由最小项、异或树或比较逻辑实现，关键是明确地址、位宽和有效电平。",
          cards: [
            {
              id: "rom-structure",
              type: "definition",
              title: "ROM 的基本结构",
              figures: [
                {
                  src: "./assets/source/combinational-logic/rom-basic-structure.jpg",
                  title: "ROM 的外部结构",
                  caption: "教材图 4.7.1：n 位地址输入选择 2ⁿ 个存储单元，每个单元输出 b 位数据。"
                },
                {
                  src: "./assets/source/combinational-logic/rom-internal-structure.jpg",
                  title: "ROM 的内部结构",
                  caption: "教材图 4.7.2：地址译码器产生字线，字线选中存储单元后由位线读出数据。"
                }
              ],
              body: [
                "ROM 由地址译码器、字线和存储阵列组成；地址选中某条字线，读出该地址对应的数据字。",
                "从逻辑函数角度看，ROM 就是按每个地址预存对应输出值的查找表。"
              ],
              formula: String.raw`\text{容量}=2^n\times b\ \text{位}`
            },
            {
              id: "rom-function",
              type: "application",
              title: "ROM 与查找表",
              figures: [
                {
                  src: "./assets/source/combinational-logic/rom-logic-structure.jpg",
                  title: "ROM 的逻辑结构",
                  caption: "教材图 4.7.4：与阵列形成全部最小项，或阵列按需相加，得到多个输出的标准与或式。"
                }
              ],
              body: [
                "输入的地址位可视为逻辑自变量，数据位就是对应函数值。",
                "与阵列/或阵列可分别提供最小项选择和输出组合，适合实现多输出组合函数。"
              ]
            },
            {
              id: "parity-generator",
              type: "formula",
              title: "奇偶校验位",
              figures: [
                {
                  src: "./assets/source/combinational-logic/parity-check-basic.jpg",
                  title: "两位输入的奇偶检验",
                  caption: "课堂图片：F=P1⊕P2；输入中 1 的个数为奇数时 F=1，为偶数时 F=0。"
                },
                {
                  src: "./assets/source/combinational-logic/parity-check-tree.jpg",
                  title: "9 位奇偶检验的串联与树形结构",
                  caption: "教材图 4.5.1：异或满足交换律和结合律，既可串联，也可组成树形结构缩短最长路径。"
                }
              ],
              body: [
                "偶校验时，用数据位的异或和作为校验位，使加上校验位后的总 1 个数为偶数。",
                "奇校验给偶校验位取反；接收端重新异或，偶校验结果 0 表示正常。",
                "校验只能检测奇数个位错误，不能纠错。位宽较大时可用树形异或结构，功能不变而级数更少。"
              ],
              formula: String.raw`P=d_1\oplus d_2\oplus\cdots\oplus d_n`
            },
            {
              id: "comparator-definition",
              type: "definition",
              title: "数值比较器",
              body: [
                "数值比较器比较两个二进制数，输出大于、等于、小于三种结果。",
                "从最高位到最低位逐位比较；高位已经决定大小时，低位不再影响结果。"
              ]
            },
            {
              id: "one-bit-comparator",
              type: "formula",
              title: "一位数值比较器",
              figures: [
                {
                  src: "./assets/source/combinational-logic/comparator-one-bit.jpg",
                  title: "一位数值比较器的两种实现",
                  caption: "教材图 4.5.4、4.5.5：输出 Li、Gi、Mi 分别表示小于、大于和相等，可用与非门与反相器实现。"
                }
              ],
              formula: String.raw`A>B=A\overline B,
\qquad
A=B=A\odot B,
\qquad
A<B=\overline AB`
            },
            {
              id: "multi-bit-comparator",
              type: "judgment",
              title: "多位比较的级联",
              body: [
                "比较高、低位时，低位比较结果不能覆盖高位已经作出的大小判断。",
                "级联输入用于多位芯片扩展，应按芯片功能表处理大于、等于、小于三个级联端。"
              ]
            }
          ]
        },
        {
          id: "hazards",
          title: "竞争与冒险",
          summary: "输入到输出的不同路径延迟不同，可能在稳态切换时产生窄脉冲。",
          cards: [
            {
              id: "race",
              type: "definition",
              title: "竞争",
              body: [
                "同一输入信号经过不同路径到达门电路，或不同输入同时改变，都可能造成门级暂态竞争。",
                "竞争本身不一定产生错误输出；只有当竞争导致非预期脉冲时才称为冒险。"
              ]
            },
            {
              id: "hazard-types",
              type: "definition",
              title: "静态冒险与动态冒险",
              body: [
                "静态 1 冒险：理论上输出应保持 1，却在切换瞬间出现短暂 0。",
                "静态 0 冒险：理论上输出应保持 0，却短暂出现 1；动态冒险则是输出应在一次跳变时多次翻转。"
              ]
            },
            {
              id: "consensus-hazard",
              type: "formula",
              title: "用冗余项消除静态 1 冒险",
              figures: [
                {
                  src: "./assets/source/combinational-logic/decoder-hazard.jpg",
                  title: "译码器中的竞争冒险",
                  caption: "课堂图片：输入代码切换时，原变量与反变量路径延迟不同，输出端可能产生窄干扰脉冲。"
                }
              ],
              body: [
                "当函数化简为 $AB+\\overline AC$ 时，$A$ 改变而 $B=C=1$ 的两条路径可能存在暂态空档。",
                "加入一致性项 $BC$ 可以覆盖这个空档，使输出保持稳定。译码器地址切换时也可能因反相器延迟产生暂态尖峰，应结合时序和使能控制排查。"
              ],
              formula: String.raw`F=AB+\overline AC+BC`
            },
            {
              id: "hazard-warning",
              type: "warning",
              title: "冒险排查",
              body: [
                "检查某个变量及其反变量是否同时出现在不同路径，并考虑布尔化简中被消去的项。",
                "消除静态冒险通常会增加冗余项或加滤波/时序约束，但可能增加面积和功耗。"
              ]
            }
          ]
        }
      ]
    }
  ]
};
