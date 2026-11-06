window.ANALOG_POWER_AMPLIFIER_CHAPTER = {
  id: "power-amplifiers",
  number: "04",
  title: "功率放大电路",
  english: "Power Amplifiers",
  accent: "forest",
  summary: "在大信号条件下，由直流电源向负载提供足够的输出功率，同时兼顾效率、失真与晶体管安全工作区。",
  examFocus: ["甲/乙/甲乙类", "OTL 与 OCL", "最大输出功率", "效率", "交越失真", "复合管接法", "等效参数", "复合互补"],
  themes: [
    {
      id: "power-basics",
      title: "功放目标、分类与分析边界",
      summary: "功率放大电路首先解决“带得动负载”的问题；输出电压、电流幅度、效率和非线性失真必须同时考虑。",
      figures: [
        {
          src: "./assets/source/power-amplifiers/chapter-outline.jpg",
          title: "功率放大电路知识提纲",
          caption: "图片提纲：功放特点、效率、工作类别、OTL、OCL 与复合互补电路"
        }
      ],
      cards: [
        {
          id: "power-stage-purpose",
          type: "definition",
          title: "功率放大电路的职责",
          body: [
            "功率放大电路通常位于多级放大器的输出级，直接驱动扬声器、电动机等负载。它的核心任务不是追求电压增益，而是向负载提供足够大的输出功率。",
            "负载得到的交流功率来自直流电源。输入信号只负责控制晶体管的工作状态，并按信号规律把电源能量转换为负载所需功率。"
          ]
        },
        {
          id: "power-output-definition",
          type: "formula",
          title: "输出功率与最大输出功率",
          body: [
            "正弦稳态下，若 $U_o$、$I_o$ 取有效值且二者同相，则输出功率等于电压有效值与电流有效值的乘积。",
            "用峰值表示时，$U_{om}$、$I_{om}$ 分别为输出电压、电流的最大值。最大输出功率必须同时满足晶体管不饱和、不截止的条件。"
          ],
          formula: String.raw`\begin{aligned}
P_o&=U_oI_o=\frac{U_{om}I_{om}}2\\
&=\frac{U_{om}^2}{2R_L}=\frac{I_{om}^2R_L}{2}
\end{aligned}`
        },
        {
          id: "power-efficiency",
          type: "formula",
          title: "功率放大电路的效率",
          body: [
            "效率是负载得到的有功功率与直流电源提供功率之比。提高效率意味着减少晶体管和偏置电路的功率损耗。",
            "计算效率时必须先区分输出功率 $P_o$ 与电源平均功率 $P_V$，不能把晶体管耗散功率直接当作电源功率。"
          ],
          formula: String.raw`\eta=\frac{P_o}{P_V},\qquad P_T=P_V-P_o`
        },
        {
          id: "power-large-signal",
          type: "warning",
          title: "大信号分析不能直接套小信号模型",
          body: [
            "功放管的工作点会在较大范围内移动，可能接近截止区和饱和区。输入、输出波形不再是围绕一个静态点的小幅度变化。",
            "因此功放重点使用图解分析、负载线和分段工作状态；微变等效电路不能独立承担最大摆幅、削波与交越失真的分析。"
          ]
        },
        {
          id: "power-classification",
          type: "definition",
          title: "按输出结构分类：OTL 与 OCL",
          body: [
            "<strong>OTL</strong> 采用单电源，并在输出端通过大电容耦合负载；输出中点静态电压通常为 $V_{CC}/2$。",
            "<strong>OCL</strong> 采用正、负双电源，输出端直接连接负载，不需要输出耦合电容。"
          ]
        },
        {
          id: "power-operating-classes",
          type: "property",
          title: "甲类、乙类、甲乙类与丙类",
          bullets: [
            "<strong>甲类</strong>：整个周期导通，导通角 $360^\\circ$，失真小，但静态功耗大，理想最大效率约 50%。",
            "<strong>乙类</strong>：半个周期导通，导通角约 $180^\\circ$，静态电流近似为零，效率高，但存在交越失真。",
            "<strong>甲乙类</strong>：导通角介于 $180^\\circ$ 与 $360^\\circ$ 之间，用较小静态电流兼顾效率和失真。",
            "<strong>丙类</strong>：导通角小于 $180^\\circ$，效率高但失真大，通常需要谐振网络恢复波形。"
          ]
        },
        {
          id: "power-class-choice",
          type: "judgment",
          title: "互补功放为何常选甲乙类",
          body: [
            "纯乙类虽然效率最高，但晶体管的开启电压会造成正、负半周交接处的一段死区，导致交越失真。",
            "甲乙类给输出管加上很小的正向静态偏置，使两只晶体管在零输入附近仍能接续导通，从而基本消除交越失真。"
          ]
        }
      ]
    },
    {
      id: "class-a-power",
      title: "甲类电压放大电路的功率分析",
      summary: "即使静态工作点放在负载线中点，单管甲类共射电路的理想最大效率也只有 25%，因此主要用于小功率或高保真场景。",
      figures: [
        {
          src: "./assets/source/power-amplifiers/class-a-power-analysis.jpg",
          title: "甲类共射电路的功率与效率",
          caption: "图片推导：负载线、电源功率、最大交流输出功率与最大管耗"
        }
      ],
      cards: [
        {
          id: "class-a-voltage-stage",
          type: "application",
          title: "把共射放大电路当作甲类功放",
          body: [
            "普通共射放大电路在输入信号的整个周期内都保持导通，因此按工作状态属于甲类。",
            "当静态工作点正好位于直流负载线中点时，忽略饱和压降，输出电压幅度最大可取 $V_{CC}/2$，对应的最大电流幅度约为 $I_{CQ}$。"
          ]
        },
        {
          id: "class-a-power-formulas",
          type: "formula",
          title: "甲类最大输出功率与效率",
          body: [
            "无信号时电源已经持续提供 $P_V=V_{CC}I_{CQ}$。负载线中点条件下，最大交流输出功率为 $V_{CC}I_{CQ}/4$。",
            "所以理想最大效率为 25%。实际电路还要扣除饱和压降、偏置损耗等，效率更低。"
          ],
          formula: String.raw`\begin{aligned}
P_{omax}&=\frac{U_{cem}I_{cm}}2=\frac{V_{CC}I_{CQ}}4\\
\eta_{\max}&=\frac14=25\%
\end{aligned}`
        },
        {
          id: "class-a-dissipation",
          type: "formula",
          title: "甲类最大管耗出现在无交流输入时",
          body: [
            "没有交流输入时，负载不获得交流功率，直流电源提供的功率几乎全部消耗在晶体管和偏置回路中。",
            "因此选管时不能只看有信号时的输出功率，还必须校核静态管耗是否超过 $P_{CM}$。"
          ],
          formula: String.raw`P_{T\max}=P_V=V_{CC}I_{CQ}\qquad(\text{理想甲类分析})`
        },
        {
          id: "class-a-power-warning",
          type: "warning",
          title: "甲类效率低的原因",
          body: [
            "甲类晶体管始终有较大静态电流，即使没有输入信号也持续消耗电源功率。",
            "为了获得较小的失真，必须把工作点放在放大区中部；这类电路适合前置级、小功率输出或高保真场合，不适合大功率效率优先的场景。"
          ]
        }
      ]
    },
    {
      id: "otl-class-b",
      title: "OTL 乙类互补对称电路与交越失真",
      summary: "NPN 与 PNP 两管分别承担正、负半周，单电源通过输出电容向负载供电；纯乙类在过零附近会出现交越失真。",
      figures: [
        {
          src: "./assets/source/power-amplifiers/otl-class-b.jpg",
          title: "OTL 乙类互补对称电路",
          caption: "图片电路：VT1 承担正半周，VT2 承担负半周，负载电流在整个周期内近似连续"
        }
      ],
      cards: [
        {
          id: "otl-class-b-operation",
          type: "application",
          title: "OTL 乙类互补管怎样轮流工作",
          body: [
            "输入正半周时，上方的 NPN 管 $VT_1$ 导通，电流经输出电容流向负载；输入负半周时，下方的 PNP 管 $VT_2$ 导通，负载电流反向。",
            "两只晶体管互为补充，使负载两端得到一个完整周期。因采用单电源，输出电容既隔直流又承担交流耦合作用。"
          ]
        },
        {
          id: "otl-class-b-power",
          type: "formula",
          title: "OTL 乙类最大输出功率",
          body: [
            "理想条件下，输出中点静态电压为 $V_{CC}/2$，输出电压最大幅度约为 $V_{CC}/2$。",
            "把 $U_{om}=V_{CC}/2$ 代入正弦功率公式，即得到 OTL 乙类的最大输出功率；理想效率的极限仍为 $\\pi/4\\approx78.5\\%$。"
          ],
          formula: String.raw`\begin{aligned}
P_{omax}&=\frac{(V_{CC}/2)^2}{2R_L}=\frac{V_{CC}^2}{8R_L}\\
\eta_{\max}&\approx\frac\pi4\approx78.5\%
\end{aligned}`
        },
        {
          id: "crossover-distortion-cause",
          type: "warning",
          title: "交越失真来自过零附近的死区",
          figures: [
            {
              src: "./assets/source/power-amplifiers/crossover-distortion.jpg",
              title: "交越失真的死区电压分析",
              caption: "图片波形：输入过零附近，两管都未有效导通，输出出现平顶死区"
            }
          ],
          body: [
            "晶体管需要约 0.6～0.7 V 的正向基射电压才明显导通。输入信号在零附近时，两只管子都暂时不能有效导通，输出电压不能连续跟随输入变化。",
            "这种发生在正、负半周交接处的波形畸变称为<strong>交越失真</strong>。它不是截止失真，也不是频率响应造成的幅度失真。"
          ]
        },
        {
          id: "ideal-versus-actual-waveform",
          type: "judgment",
          title: "理想乙类与实际乙类波形对照",
          figures: [
            {
              src: "./assets/source/power-amplifiers/crossover-waveforms.jpg",
              title: "乙类互补电路的理想与实际电流",
              caption: "图片对照：理想情况负载电流连续；实际情况在过零处出现断续和交越失真"
            }
          ],
          body: [
            "理想模型中，两只晶体管在过零处瞬时交接，$i_{C1}$ 与 $i_{C2}$ 分别补足正、负半周，负载电流仍为正弦波。",
            "实际器件存在开启电压和有限的电流变化能力，负半周开始前、正半周结束后都会有一段电流接近零，于是负载波形在过零附近出现缺口。"
          ]
        }
      ]
    },
    {
      id: "otl-class-ab",
      title: "OTL 甲乙类偏置、例题与安全校核",
      summary: "在互补管的两个基极之间加入二极管和电阻，为晶体管提供少量静态正偏，从而消除交越失真；同时必须防止偏置支路开路导致静态电流失控。",
      figures: [
        {
          src: "./assets/source/power-amplifiers/otl-class-ab.jpg",
          title: "OTL 甲乙类互补输出级",
          caption: "图片电路：R、VD1、VD2 提供小幅静态偏置，使输出管在零输入附近微导通"
        }
      ],
      cards: [
        {
          id: "otl-static-bias",
          type: "formula",
          title: "甲乙类静态偏置",
          body: [
            "电阻 $R$、二极管 $VD_1$ 和 $VD_2$ 串联在两输出管基极之间，为两管提供一个小而稳定的直流偏压。",
            "静态偏置应略大于两管的开启电压，使输出级在零输入附近仍有很小的静态电流。偏置过大虽然能压住交越失真，却会显著增加静态管耗。"
          ],
          formula: String.raw`U_{B1B2}=I_RR+U_{D1}+U_{D2}\approx U_{BE1}+U_{BE2}`
        },
        {
          id: "otl-capacitor-voltage",
          type: "formula",
          title: "OTL 输出电容的静态电压",
          body: [
            "单电源 OTL 的输出中点应稳定在电源电压的一半，否则正、负半周可用的输出摆幅不对称。",
            "电容足够大时，其两端静态电压等于输出中点电压；调整上偏置电阻可以改变该中点电压。"
          ],
          formula: String.raw`U_C=U_{OQ}\approx\frac{V_{CC}}2`
        },
        {
          id: "otl-example",
          type: "example",
          title: "例题：OTL 中点电压与偏置开路后的安全性",
          figures: [
            {
              src: "./assets/source/power-amplifiers/otl-example.jpg",
              title: "OTL 甲乙类电路例题",
              caption: "图片题目与计算：静态电容电压、偏置电流、集电极电流和管耗校核"
            }
          ],
          body: [
            "已知 $V_{CC}=10\\,\\mathrm V$、$R_2=1.2\\,\\mathrm{k\\Omega}$、$R_L=16\\,\\Omega$，输出电容足够大。静态时电容两端电压应为 $V_{CC}/2=5\\,\\mathrm V$，可通过调整 $R_1$ 达到要求。",
            "取 $R_1=1.2\\,\\mathrm{k\\Omega}$、$\\beta=50$、$U_{BE}=0.7\\,\\mathrm V$。若偏置支路中的电阻 $R$ 或某个二极管开路，两输出管获得过大的静态偏置，集电极电流和管耗会迅速增大。"
          ],
          example: {
            title: "展开计算与判断",
            body: [
              "$I_{B1}=I_{B2}\\approx(V_{CC}-2U_{BE})/(R_1+R_2)\\approx3.58\\,\\mathrm{mA}$。",
              "$I_{C1}=I_{C2}=\\beta I_B\\approx179\\,\\mathrm{mA}$，每只晶体管承受约 $V_{CC}/2$。",
              "$P_{T1}=P_{T2}\\approx179\\,\\mathrm{mA}\\times5\\,\\mathrm V\\approx896\\,\\mathrm{mW}$，远大于 $P_{CM}=200\\,\\mathrm{mW}$，因此三极管可能被烧毁。"
            ],
            formula: String.raw`P_T=I_CU_{CE}\approx179\,\mathrm{mA}\times5\,\mathrm V\approx896\,\mathrm{mW}>200\,\mathrm{mW}`
          },
          source: "据第 4 章 OTL 例题整理"
        },
        {
          id: "otl-bias-failure",
          type: "warning",
          title: "偏置电路故障会放大静态电流",
          body: [
            "功放管的 $I_{CM}$、$P_{CM}$ 和反向击穿电压都必须校核。静态偏置一旦失控，即使没有输入信号，也可能因管耗过大而损坏器件。",
            "分析偏置开路、二极管反接等故障时，先判断两管基极间的等效偏压，再估算静态电流和 $P_T=I_CU_{CE}$。"
          ]
        }
      ]
    },
    {
      id: "ocl-power",
      title: "OCL 互补对称电路与功率校核",
      summary: "OCL 使用正、负双电源，输出端无需耦合电容；最大输出幅度可按 $V_{CC}$ 估算，理想乙类效率仍为 78.5%。",
      figures: [
        {
          src: "./assets/source/power-amplifiers/ocl-class-b-ab.jpg",
          title: "OCL 乙类与甲乙类互补电路",
          caption: "图片电路：左侧为 OCL 乙类，右侧通过 R、VD1、VD2 加入甲乙类偏置"
        }
      ],
      cards: [
        {
          id: "ocl-topology",
          type: "application",
          title: "OCL 双电源互补结构",
          body: [
            "OCL 使用 $+V_{CC}$ 与 $-V_{CC}$ 两组电源。正半周由 NPN 管从正电源向负载供电，负半周由 PNP 管从负电源吸收电流。",
            "静态时输出端应接近 0 V，负载中直流电流为零，因此不需要输出耦合电容。OCL 的低频响应优于 OTL。"
          ]
        },
        {
          id: "ocl-power-formulas",
          type: "formula",
          title: "OCL 互补对称电路的最大功率和电源最大功率",
          body: [
            "忽略饱和压降时，最大输出电压幅度 $U_{om}\\approx V_{CC}$，所以最大输出功率为 $V_{CC}^2/(2R_L)$。",
            "全周期由两只管子分担时，电源在最大输出条件下的平均功率为 $2V_{CC}^2/(\\pi R_L)$，最大效率仍为 $\\pi/4$。"
          ],
          formula: String.raw`\begin{aligned}
P_{omax}&=\frac{V_{CC}^2}{2R_L}\\
P_{V\max}&=\frac{2V_{CC}^2}{\pi R_L}\\
\eta_{\max}&=\frac{P_{omax}}{P_{V\max}}=\frac\pi4
\end{aligned}`
        },
        {
          id: "ocl-example-1",
          type: "example",
          title: "例题 1：OCL 静态电流、交越失真与偏置故障",
          figures: [
            {
              src: "./assets/source/power-amplifiers/ocl-example-1.jpg",
              title: "OCL 甲乙类电路故障分析例题",
              caption: "图片题目与答案：静态负载电流、偏置调整、二极管极性反接及支路开路"
            }
          ],
          body: [
            "静态时输出端接近 0 V，负载 $R_L$ 两端没有直流电压，所以静态负载电流为零。",
            "出现交越失真时，说明输出管静态偏置不足。本题通过增大 $R$ 来调整偏置电压。若 $VD_1$ 或 $VD_2$ 极性接反，或 $VD_1$、$VD_2$、$R_2$ 中任一元件开路，偏置支路都会失去正常约束，可能使晶体管静态电流急剧增大并烧毁器件。"
          ],
          source: "据第 4 章 OCL 例题 1 整理"
        },
        {
          id: "ocl-example-2",
          type: "example",
          title: "例题 2：由管耗反求电源功率",
          figures: [
            {
              src: "./assets/source/power-amplifiers/ocl-example-2.jpg",
              title: "OCL 最大效率与电源功率例题",
              caption: "图片推导：两管总耗散 2 W，由最大效率反求电源平均功率"
            }
          ],
          body: [
            "理想乙类 OCL 达到最大输出时，每只晶体管耗散 $1\\,\\mathrm W$，两管总耗散 $P_T=2\\,\\mathrm W$。",
            "最大效率时 $\\eta_{\\max}=\\pi/4$，同时 $\\eta=(P_V-P_T)/P_V$，由此可反求电源提供的平均功率。"
          ],
          example: {
            title: "展开计算",
            body: [
              "$P_T=2\\times1\\,\\mathrm W=2\\,\\mathrm W$。",
              "$\\eta_{\\max}=(P_V-P_T)/P_V=\\pi/4$，所以 $P_V=P_T/(1-\\pi/4)\\approx9.3\\,\\mathrm W$。"
            ],
            formula: String.raw`P_V=\frac{P_T}{1-\pi/4}=\frac{2}{1-\pi/4}\approx9.3\,\mathrm W`
          },
          source: "据第 4 章 OCL 例题 2 整理"
        },
        {
          id: "otl-ocl-comparison",
          type: "judgment",
          title: "OTL 与 OCL 的快速区分",
          bullets: [
            "OTL：单电源，输出端有大耦合电容；静态输出中点约为 $V_{CC}/2$；最大输出幅度约为 $V_{CC}/2$。",
            "OCL：正负双电源，负载直接连接输出端；静态输出接近 0 V；理想最大输出幅度约为 $V_{CC}$。",
            "同样负载与电源幅度下，OCL 可得到更大的最大输出功率；OTL 省去一组负电源，但低频响应受输出电容限制。"
          ]
        }
      ]
    },
    {
      id: "composite-power",
      title: "复合互补对称功率放大电路",
      summary: "复合管把两级晶体管级联等效为一只高电流增益器件；直接接出等效基极的晶体管是前管，复合管类型与前管相同。连接时还须保证前后级电流方向一致、两管都处于放大区。",
      cards: [
        {
          id: "composite-connection-rules",
          type: "judgment",
          title: "复合管正确接法：先认基极与前管",
          figures: [
            {
              src: "./assets/source/power-amplifiers/composite-transistor-rules.jpg",
              title: "同型复合管的构成条件",
              caption: "前后两级必须满足电流方向一致、发射结正偏、集电结反偏"
            },
            {
              src: "./assets/source/power-amplifiers/composite-transistor-mixed.jpg",
              title: "异型复合管的两种接法",
              caption: "谁直接接出等效基极，谁就是前管；复合管类型与前管相同"
            }
          ],
          body: [
            "判断复合管时，先找哪只晶体管的基极直接作为复合管等效基极：这只管就在前，另一只管在后。复合管不是把任意两只晶体管串起来就能成立。",
            "前管是什么类型，复合管就是什么类型：NPN 在前，等效为 NPN；PNP 在前，等效为 PNP。前管的输出电流还必须与后管基极输入电流的实际方向一致，并且两管都要满足发射结正偏、集电结反偏。"
          ],
          bullets: [
            "前管判据：哪只管的基极直接作为复合管等效基极，哪只管就在前。",
            "类型判据：前管为 NPN，复合管就是 NPN 型；前管为 PNP，复合管就是 PNP 型。",
            "连接判据：前管输出电流必须与后管基极输入电流方向一致，不能用方向相反的集电极电流代替。",
            "偏置判据：两管都应工作在放大区；任何一只进入截止或饱和，都不能直接套用复合管参数。"
          ],
          note: "审题顺序是“先认基极、再定前后、由前管定类型”，最后才检查电流方向和偏置。只看末级功率管判断类型是常见错误。"
        },
        {
          id: "composite-output-stage",
          type: "application",
          title: "复合 OCL 输出级在整机中的位置",
          figures: [
            {
              src: "./assets/source/power-amplifiers/composite-ocl.jpg",
              title: "复合 OCL 互补输出功放",
              caption: "前置推动级、基射电压扩大电路和复合输出管共同完成大电流驱动"
            }
          ],
          body: [
            "$T_1$ 是电压推动级，为后级提供足够的电压摆幅；$T_2$、$R_1$、$R_2$ 构成基射电压扩大电路。",
            "$T_3$、$T_4$ 与 $T_5$、$T_6$ 组成两组复合管，分别承担正、负半周的大电流输出。设置复合管的目的，是扩大末级电流的驱动能力。"
          ],
          formula: String.raw`U_{CE2}\approx U_{BE2}\frac{R_1+R_2}{R_2}`
        },
        {
          id: "composite-transistor-purpose",
          type: "application",
          title: "为什么功放输出级常用复合管",
          figures: [
            {
              src: "./assets/source/power-amplifiers/composite-transistors.jpg",
              title: "复合 NPN 与复合 PNP 管",
              caption: "电路中增加复合管，是为了扩大电流驱动能力；等效类型由前管决定"
            }
          ],
          body: [
            "功放输出级需要向低阻负载提供较大的输出电流，而前级能够提供的输出电流较小。增加复合管的目的，是扩大电流驱动能力：前级的小电流经过两级放大，控制更大的末级输出电流。",
            "从外部看，复合管仍可等效成一只 NPN 或 PNP 管，但它的电流放大能力更高。设计时要重点检查以下四项。"
          ],
          bullets: [
            "放大能力：等效电流放大系数是否足够大，能把前级的小电流放大到负载所需电流。",
            "输入特性：等效输入电阻是否合适，会不会给前一级造成过重负担。",
            "功率安全：末级功率管能否承受最大电流、最高电压、允许功耗和散热要求。",
            "两半周配对：上下两组复合管的放大能力、饱和压降等是否接近，避免输出波形正负半周不对称。"
          ]
        },
        {
          id: "composite-equivalent-parameters",
          type: "formula",
          title: "同型与异型复合管的等效参数",
          figures: [
            {
              src: "./assets/source/power-amplifiers/composite-transistor-parameters.jpg",
              title: "复合管类型与输入电阻结论",
              caption: "同型复合管保留原类型；异型复合管类型与第一只晶体管相同"
            }
          ],
          body: [
            "两类复合管的电流增益都可近似写成 $\\beta\\approx\\beta_1\\beta_2$，但输入电阻并不相同：同型组合中第二只管的 $r_{be2}$ 经过 $(1+\\beta_1)$ 折算，异型组合中工程近似常直接取第一只管的 $r_{be1}$。",
            "使用前要先判断连接属于同型还是异型；把两个公式混用，是复合管计算题最常见的错误。"
          ],
          formula: String.raw`\begin{aligned}
\text{same-type}:&\quad \beta\approx\beta_1\beta_2,\;
r_{be}\approx r_{be1}+(1+\beta_1)r_{be2}\\
\text{mixed-type}:&\quad \beta\approx\beta_1\beta_2,\;
r_{be}\approx r_{be1}
\end{aligned}`,
          note: "$\\beta$ 是按电流放大关系得到的近似值；实际器件还要受漏电流、工作电流、温度和末级大电流下 $\\beta$ 下降的影响。"
        },
        {
          id: "composite-recognition-example",
          type: "example",
          title: "课堂例题：判断四个复合管接法",
          figures: [
            {
              src: "./assets/source/power-amplifiers/composite-transistor-recognition.jpg",
              title: "复合管正确性判断例题",
              caption: "检查前后级电流方向，判断等效类型，并写出 β 与 rbe"
            }
          ],
          body: [
            "判断顺序分为三步：先找直接接出等效基极的前管，由前管确定复合管类型；再检查前管输出电流能否成为后管的有效基极输入；最后选择对应的等效参数公式。"
          ],
          bullets: [
            "(a) 不正确：$i_{E1}$ 与第二只管所需 $i_{B2}$ 的实际方向不一致。",
            "(b) 不正确：用 $i_{C1}$ 充当第二只管的输入，电流方向接续错误。",
            "(c) 正确：PNP 在前、NPN 在后，等效为 PNP，且 $\\beta\\approx\\beta_1\\beta_2$、$r_{be}\\approx r_{be1}$。",
            "(d) 不正确：$i_{E1}$ 与第二只管所需 $i_{B2}$ 的实际方向不一致。"
          ],
          note: "本题只有 (c) 成立。等效基极 B 接第一只管的基极，等效发射极 E、集电极 C 按异型复合管关系合并。",
          source: "据第四章课堂例题整理"
        },
        {
          id: "composite-complementary-topology",
          type: "application",
          title: "复合互补输出级的两种拓扑",
          figures: [
            {
              src: "./assets/source/power-amplifiers/composite-complementary-topology.jpg",
              title: "复合管组成的互补对称输出级",
              caption: "比较两类复合互补拓扑：末级器件能否方便地实现互补配对"
            }
          ],
          body: [
            "复合互补输出级让上方等效 NPN 管负责正半周、下方等效 PNP 管负责负半周。这样，前置级只需提供较小控制电流，负载仍能获得完整周期的较大电流。",
            "左图中两组输出复合管分别由同型管级联，末级直接使用 NPN 与 PNP 两种不同器件。大功率互补管在 $\\beta$、饱和压降、温度特性和高频响应上往往不完全一致，正负半周很难做到理想对称。",
            "右图通过重新安排复合连接并引入 $R_{e1}$、$R_{e2}$，采用准互补思路，使末级功率器件更便于选用同型管配对，同时对外仍表现为上下两组等效互补管。"
          ],
          bullets: [
            "判断类型看直接接出等效基极的前管，而不是只看末级功率管。",
            "判断互补功能看上下两组复合管对外是否形成 NPN/PNP 互补关系。",
            "判断对称性还要比较两组的等效 $\\beta$、$r_{be}$、饱和压降和静态偏置。"
          ]
        },
        {
          id: "composite-design-check",
          type: "warning",
          title: "复合互补管的工程检查清单",
          bullets: [
            "先判极性：由直接接出等效基极的前管确定类型，再确认后管被正确偏置。",
            "再估参数：同型组合用 $r_{be1}+(1+\\beta_1)r_{be2}$，异型组合近似用 $r_{be1}$。",
            "再核安全：末级承受几乎全部负载电流和电压摆幅，必须核对 $I_{CM}$、$U_{(BR)CEO}$、$P_{CM}$ 和散热。",
            "最后看对称：两组增益、饱和压降或输入电阻不一致，会造成中点偏移、交越失真和正负半周削波不对称。"
          ],
          note: "复合管的高 $\\beta$ 只能说明“更容易被前级驱动”，不能代替输出功率、耐压、最大电流和热设计校核。"
        }
      ]
    },
    {
      id: "power-summary",
      title: "全章总结与解题串联",
      summary: "从结构判断开始，依次确定 OTL/OCL、甲/乙/甲乙类、最大输出幅度、电源功率、效率和管耗，最后检查交越失真与安全裕量。",
      figures: [
        {
          src: "./assets/source/power-amplifiers/chapter-summary.jpg",
          title: "功率放大电路全章总结图",
          caption: "图片汇总：甲类功率分析、OTL/OCL 互补电路、交越失真、例题与复合互补管"
        }
      ],
      cards: [
        {
          id: "power-formula-chain",
          type: "formula",
          title: "功放核心公式链",
          body: [
            "最大输出功率由可用的电压幅度和负载共同决定；效率由输出功率与电源功率共同决定；管耗则由二者之差得到。",
            "OTL 的可用幅度约为 $V_{CC}/2$，OCL 约为 $V_{CC}$。公式中的 $V_{CC}$ 对 OCL 指单侧电源幅值，不是正、负电源相加。"
          ],
          formula: String.raw`\begin{aligned}
P_{omax}&=\frac{U_{om}^2}{2R_L}\\
\eta&=\frac{P_o}{P_V}\\
P_T&=P_V-P_o
\end{aligned}`
        },
        {
          id: "power-answer-workflow",
          type: "judgment",
          title: "功放题的落笔顺序",
          bullets: [
            "先看电源数和输出电容：单电源且有电容通常是 OTL；双电源、负载直连通常是 OCL。",
            "再判断工作类别：是否存在静态偏置、是否有交越失真，据此区分乙类与甲乙类。",
            "确定最大输出电压幅度，计算 $P_{omax}$；再算 $P_V$、$\\eta$ 和每只管子的 $P_T$。",
            "最后校核 $P_T<P_{CM}$、电流和反向电压是否安全，并说明饱和压降、偏置故障和交越失真带来的影响。"
          ]
        }
      ]
    }
  ]
};
