window.ANALOG_COURSE = {
  title: "模拟电子技术",
  subtitle: "半导体器件、放大电路与频率响应",
  updatedAt: "2026-11-04",
  chapters: [
    {
      id: "devices",
      number: "01",
      title: "半导体器件",
      english: "Semiconductor Devices",
      accent: "indigo",
      summary: "从 PN 结和二极管伏安特性出发，走通模型分析、图解法及整流、限幅、钳位、稳压应用，再建立三极管的载流子运动、输出特性与安全工作区。",
      examFocus: ["二极管模型", "图解法", "限幅与钳位", "稳压管", "三极管输出特性", "安全工作区"],
      themes: [
        {
          id: "semiconductor-basics",
          title: "半导体与 PN 结",
          summary: "载流子的扩散、漂移和复合构成二极管单向导电性的物理基础。",
          figures: [
            {
              src: "./assets/source/semiconductor-devices/diode-iv-characteristic.jpg",
              title: "二极管伏安特性",
              caption: "教材图：正向特性、死区电压、反向特性与反向击穿"
            }
          ],
          cards: [
            {
              id: "semiconductor-types",
              type: "definition",
              title: "本征半导体、N 型与 P 型半导体",
              body: [
                "纯净、不含杂质的半导体称为<strong>本征半导体</strong>。自由电子和空穴成对出现，浓度相等。",
                "掺入五价元素形成 N 型半导体，电子是多子；掺入三价元素形成 P 型半导体，空穴是多子。"
              ],
              bullets: [
                "多子浓度由掺杂决定，受温度影响相对较小。",
                "少子浓度很低，但对温度非常敏感。"
              ]
            },
            {
              id: "diffusion-drift",
              type: "definition",
              title: "扩散与漂移",
              body: [
                "<strong>扩散</strong>由载流子浓度差推动；<strong>漂移</strong>由电场力推动。",
                "PN 结中扩散与漂移最终形成动态平衡，空间电荷区称为耗尽层。"
              ]
            },
            {
              id: "pn-junction",
              type: "property",
              title: "PN 结与单向导电性",
              body: [
                "P 区接正、N 区接负时为正向偏置：内电场削弱，扩散增强，形成较大的正向电流。",
                "P 区接负、N 区接正时为反向偏置：内电场增强，扩散受抑制，只留下很小的反向饱和电流。"
              ]
            },
            {
              id: "diode-vi",
              type: "property",
              title: "二极管伏安特性",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-iv-characteristic.jpg",
                  title: "二极管的正向与反向特性",
                  caption: "正向电压超过死区电压后电流快速上升；反向区先保持很小的反向电流，达到击穿电压后急剧增大。"
                }
              ],
              body: [
                "正向电压超过死区电压后，正向电流近似指数增长；导通后端电压变化较小。",
                "反向电压较小时反向电流近似恒定；超过反向击穿电压后电流急剧增加。击穿不等于立即损坏。"
              ]
            },
            {
              id: "diode-equation",
              type: "formula",
              title: "PN 结伏安方程",
              formula: String.raw`i_D=I_S\left(e^{u_D/U_T}-1\right),
\qquad U_T\approx26\,\mathrm{mV}\quad(300\mathrm K)`
            },
            {
              id: "diode-parameters",
              type: "property",
              title: "二极管主要参数",
              bullets: [
                "最大整流电流 $I_F$：长期工作时允许通过的最大正向平均电流。",
                "最高反向工作电压 $U_R$：通常低于击穿电压。",
                "反向电流 $I_R$：越小越好。",
                "最高工作频率 $f_M$：受 PN 结结电容限制。"
              ]
            }
          ]
        },
        {
          id: "diode-circuits",
          title: "二极管模型与电路分析",
          summary: "先判断导通状态，再用理想模型、恒压降模型或图解法计算。",
          figures: [
            {
              src: "./assets/source/semiconductor-devices/diode-static-models-example.jpg",
              title: "二极管静态工作情况分析",
              caption: "第 1 章例 1.2.1：同一电路分别用理想模型和恒压降模型计算"
            },
            {
              src: "./assets/source/semiconductor-devices/diode-graphical-example.jpg",
              title: "二极管图解分析",
              caption: "第 1 章例 1.2.2：器件伏安特性与负载线的交点确定工作点"
            },
            {
              src: "./assets/source/semiconductor-devices/zener-design-problem.jpg",
              title: "稳压管限流电阻设计",
              caption: "第 1 章例 1.2.6：已知输入、负载和稳压管电流范围，选择限流电阻"
            }
          ],
          cards: [
            {
              id: "ideal-model",
              type: "judgment",
              title: "理想二极管模型",
              body: [
                "导通时视为短路，压降为 0；截止时视为开路，电流为 0。",
                "适合判断电路通断方向或题目明确说明为理想二极管时。"
              ]
            },
            {
              id: "constant-drop-model",
              type: "formula",
              title: "恒压降模型",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-static-models-example.jpg",
                  title: "理想模型与恒压降模型",
                  caption: "例 1.2.1 的三种等效电路与计算结果。"
                }
              ],
              body: [
                "导通后认为二极管端电压近似不变。未说明材料时通常按硅管处理。"
              ],
              formula: String.raw`U_D\approx0.7\,\mathrm V\ \text{(硅)},
\qquad U_D\approx0.2\,\mathrm V\ \text{(锗)}`
            },
            {
              id: "piecewise-diode-model",
              type: "formula",
              title: "折线模型",
              body: [
                "把导通后的伏安特性近似为一条斜直线：$U_{on}$ 表示导通门槛，$r_D$ 表示工作点附近的小斜率电阻。",
                "恒压降模型相当于令 $r_D=0$；理想模型还进一步令 $U_{on}=0$。"
              ],
              formula: String.raw`u_D\approx U_{on}+r_Di_D\quad(i_D>0)`
            },
            {
              id: "diode-small-signal",
              type: "formula",
              title: "二极管小信号电阻",
              body: [
                "先在直流通路求 $I_{DQ}$，再用该工作点处的切线斜率代替二极管。小信号条件要求交流摆幅很小。",
                "令 $I_{DQ}$ 以 mA 为单位时，$26\\,\\mathrm{mV}/I_{DQ}(\\mathrm{mA})$ 直接得到欧姆数；非理想因子 $n$ 需按器件模型保留。"
              ],
              formula: String.raw`r_d=\left.\frac{\mathrm du_D}{\mathrm di_D}\right|_{I_{DQ}}
\approx\frac{nU_T}{I_{DQ}},
\qquad
n\approx1,\quad U_T\approx26\,\mathrm{mV}`
            },
            {
              id: "diode-graphical",
              type: "formula",
              title: "图解法与负载线",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-graphical-example.jpg",
                  title: "图解法确定静态工作点",
                  caption: "例 1.2.2：伏安特性曲线与 $i_D=(V_{DD}-u_D)/R$ 的交点为 Q 点。"
                }
              ],
              body: [
                "把二极管的伏安特性与外部电路方程画在同一坐标中，两条曲线的交点就是工作点。"
              ],
              formula: String.raw`i_D=\frac{V_{DD}-u_D}{R}`
            },
            {
              id: "diode-graphical-example",
              type: "example",
              title: "图解法例题：1.5 V 电源与 1 kΩ 电阻",
              body: [
                "由电路约束可写出 $I_D=(1.5-U_D)/1$，其中电流以 mA 为单位。把这条负载线与二极管实际伏安特性画在同一坐标中，交点就是工作点。",
                "由图可得 $U_D\\approx0.7\\,\\mathrm V$、$I_D\\approx0.8\\,\\mathrm{mA}$。图解法保留器件的非线性，不把二极管强行替换成固定压降。"
              ],
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-graphical-example.jpg",
                  title: "二极管图解法例题",
                  caption: "例 1.2.2：负载线与二极管伏安特性的交点 Q 给出电压和电流。"
                }
              ],
              source: "据第 1 章例 1.2.2 整理"
            },
            {
              id: "diode-model-example",
              type: "example",
              title: "20 V 电源、10 kΩ 电阻与硅二极管",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-static-models-example.jpg",
                  title: "二极管静态分析例题",
                  caption: "例 1.2.1：原电路、理想模型电路和恒压降模型电路。"
                }
              ],
              body: [
                "理想模型：$U_D=0$，所以 $I_D=20/10=2\\,\\mathrm{mA}$。",
                "恒压降模型：$U_D=0.7\\,\\mathrm V$，所以 $I_D=(20-0.7)/10=1.93\\,\\mathrm{mA}$。"
              ],
              source: "据第 1 章例 1.2.1 整理"
            },
            {
              id: "rectifier",
              type: "application",
              title: "二极管整流",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-rectifier-example.jpg",
                  title: "二极管半波整流电路与波形",
                  caption: "例 1.2.3：正半周导通、负半周截止，输出为单向脉动电压。"
                }
              ],
              body: [
                "输入正半周时二极管导通，输出跟随输入；负半周截止，输出接近 0。",
                "这正是二极管把交流变成单向脉动电压的基础。"
              ],
              source: "据第 1 章例 1.2.3 整理"
            },
            {
              id: "limiter",
              type: "application",
              title: "限幅电路",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-limiter-example.jpg",
                  title: "二极管限幅电路与输出波形",
                  caption: "例 1.2.4：输入超过 8 V 时二极管导通，输出被限制在 8 V。"
                }
              ],
              body: [
                "当输入超过参考电压使二极管导通时，输出被钳在导通电压附近；未导通时输出跟随输入。",
                "分析关键是先确认阴极、阳极和参考电压，再判断输入达到多少时二极管状态发生改变。"
              ],
              source: "据第 1 章例 1.2.4 整理"
            },
            {
              id: "clamper",
              type: "application",
              title: "钳位电路",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/diode-clamp-example.jpg",
                  title: "二极管钳位与多管状态判断",
                  caption: "第 1 章例 1.2.5：先假设全部二极管断开，再判断哪个二极管优先导通。"
                }
              ],
              body: [
                "本题中两个二极管先按断开处理，可得 $V_{D1}=5\\,\\mathrm V$、$V_{D2}=2\\,\\mathrm V$，因此 $D_1$ 先导通，并把输出节点钳在 $V_0=0\\,\\mathrm V$。",
                "此后 $D_2$ 承受反向电压而截止。这里 $D_1$ 起钳位作用，$D_2$ 起隔离作用；判断多管电路时必须先比较各管正偏程度，再回代检查状态。"
              ],
              source: "据第 1 章例 1.2.5 整理"
            },
            {
              id: "zener",
              type: "property",
              title: "稳压管",
              body: [
                "稳压管工作在反向击穿区，只要反向电流受到限制，端电压就能保持近似稳定。",
                "必须与负载并联，并串联限流电阻，既保证稳压管有工作电流，又避免烧毁。"
              ],
              formula: String.raw`U_Z\approx\text{常数},\qquad
I_Z=I_R-I_L`
            },
            {
              id: "special-diodes",
              type: "definition",
              title: "发光、光电、变容与激光二极管",
              body: [
                "发光二极管将电能转换为光能；光电二极管把光信号转换为电信号；变容二极管的结电容随反向电压变化；激光二极管用于相干光源。"
              ]
            },
            {
              id: "diode-switch",
              type: "application",
              title: "二极管开关与多管状态判断",
              body: [
                "理想二极管导通时近似短路，截止时近似开路，因此可与电阻组成受输入电平控制的开关。",
                "多个二极管都可能导通时，先比较各管在全部断开假设下的正向电压；正偏最大的通常先导通，并改变其余二极管的端电压。",
                "得到状态后必须回代检查：导通管电流应非负，截止管应保持反偏。"
              ]
            },
            {
              id: "zener-design-example",
              type: "example",
              title: "例题：选择稳压管的限流电阻",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/zener-design-problem.jpg",
                  title: "稳压管限流电阻设计题",
                  caption: "例 1.2.6：求稳压管动态电阻并选择限流电阻。"
                },
                {
                  src: "./assets/source/semiconductor-devices/zener-design-solution.jpg",
                  title: "稳压管限流电阻计算过程",
                  caption: "例 1.2.6 解答：动态电阻、稳压管电流和限流电阻上下限。"
                }
              ],
              body: [
                "输入在 $10\\sim15\\,\\mathrm V$ 间变化，负载在 $600\\,\\Omega\\sim1\\,\\mathrm{k\\Omega}$ 间变化；$U_Z=6\\,\\mathrm V$，$I_{Z\\min}=5\\,\\mathrm{mA}$，$I_{Z\\max}=50\\,\\mathrm{mA}$，$\\Delta U_Z=0.3\\,\\mathrm V$。",
                "取 $R$ 的最小值保证最大输入、最小负载电流时稳压管电流不超限；取 $R$ 的最大值保证最小输入、最大负载电流时稳压管仍能工作。"
              ],
              example: {
                title: "展开计算",
                body: [
                  "$\\Delta I_Z=50-5=45\\,\\mathrm{mA}$，动态电阻 $r_Z=\\Delta U_Z/\\Delta I_Z\\approx6.7\\,\\Omega$。",
                  "$I_{L\\min}=6\\,\\mathrm V/1\\,\\mathrm{k\\Omega}=6\\,\\mathrm{mA}$，故 $R_{\\min}=(15-6)/(50+6)=161\\,\\Omega$。",
                  "$I_{L\\max}=6\\,\\mathrm V/600\\,\\Omega=10\\,\\mathrm{mA}$，故 $R_{\\max}=(10-6)/(5+10)=267\\,\\Omega$。",
                  "可选 $200\\,\\Omega$ 标准电阻，并核对额定功耗；若 $R_{\\min}>R_{\\max}$，说明给定电流与负载范围不能同时满足。"
                ],
                formula: String.raw`R_{\min}=\frac{U_{I\max}-U_Z}{I_{Z\max}+I_{L\min}},
\qquad
R_{\max}=\frac{U_{I\min}-U_Z}{I_{Z\min}+I_{L\max}}`
              },
              source: "据第 1 章稳压管例题重算"
            },
            {
              id: "zener-series-example",
              type: "example",
              title: "例题：两只稳压管串联可得到几种电压",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/zener-series-example.jpg",
                  title: "两只稳压管串联的四种接法",
                  caption: "例 1.2.7：分别按反向稳压和正向导通组合计算四个输出电压。"
                }
              ],
              body: [
                "已知 $U_{Z1}=6\\,\\mathrm V$、$U_{Z2}=8\\,\\mathrm V$，两只稳压管的正向导通压降均为 $U_D=0.6\\,\\mathrm V$。两只器件串联时，各自可能处于反向稳压状态或正向导通状态。",
                "四种组合分别为：$U_Z=6+8=14\\,\\mathrm V$；$U_Z=0.6+0.6=1.2\\,\\mathrm V$；$U_Z=6+0.6=6.6\\,\\mathrm V$；$U_Z=0.6+8=8.6\\,\\mathrm V$。"
              ],
              source: "据第 1 章例 1.2.7 整理"
            }
          ]
        },
        {
          id: "transistor",
          title: "双极型三极管",
          summary: "三极管通过基极电流控制集电极电流，结构和偏置共同决定是否具有放大作用。",
          figures: [
            {
              src: "./assets/source/semiconductor-devices/bjt-carrier-motion.jpg",
              title: "三极管内部载流子运动",
              caption: "第 1 章：发射区发射电子、基区输运与复合、集电区收集载流子"
            },
            {
              src: "./assets/source/semiconductor-devices/bjt-output-characteristic.jpg",
              title: "三极管输出特性",
              caption: "第 1 章：饱和区、放大区、截止区及饱和压降"
            },
            {
              src: "./assets/source/semiconductor-devices/bjt-safe-operating-area.jpg",
              title: "三极管安全工作区",
              caption: "第 1 章：由 $P_{CM}$、$I_{CM}$ 与 $U_{(BR)CEO}$ 确定过损耗、过电流和击穿区"
            }
          ],
          cards: [
            {
              id: "bjt-structure",
              type: "definition",
              title: "三极管的结构与类型",
              body: [
                "三极管分为 NPN 和 PNP 两类，内部有发射区、基区、集电区三个区域，以及发射极、基极、集电极三个电极。",
                "两个 PN 结分别称为发射结和集电结。"
              ]
            },
            {
              id: "bjt-internal-condition",
              type: "property",
              title: "放大的内部条件",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/bjt-carrier-motion.jpg",
                  title: "三极管内部载流子输运",
                  caption: "发射结正偏发射电子，大部分电子穿过薄基区后被反偏集电结收集。"
                }
              ],
              body: [
                "发射区掺杂浓度高，便于发射载流子。",
                "基区很薄、掺杂浓度低，使大部分载流子能继续扩散到集电区。",
                "集电区面积较大，便于收集载流子。"
              ]
            },
            {
              id: "bjt-bias-condition",
              type: "judgment",
              title: "放大的外部条件",
              body: [
                "发射结正偏、集电结反偏时，三极管工作在放大区。",
                "NPN 的正常放大电位关系为 $U_C>U_B>U_E$；PNP 为 $U_E>U_B>U_C$。"
              ]
            },
            {
              id: "bjt-current",
              type: "formula",
              title: "电流分配与放大系数",
              formula: String.raw`I_E=I_B+I_C,\qquad
\beta=\frac{I_C}{I_B},\qquad
\alpha=\frac{I_C}{I_E}`
            },
            {
              id: "bjt-alpha-beta",
              type: "formula",
              title: "α 与 β 的关系",
              formula: String.raw`\beta=\frac{\alpha}{1-\alpha},
\qquad
\alpha=\frac{\beta}{1+\beta}`
            },
            {
              id: "bjt-input-curve",
              type: "property",
              title: "输入特性",
              body: [
                "输入特性描述 $i_B$ 与 $u_{BE}$ 的关系。它近似为发射结的正向伏安特性。",
                "$u_{CE}$ 增大后曲线右移，但超过一定值后基本重合。"
              ]
            },
            {
              id: "bjt-output-regions",
              type: "judgment",
              title: "输出特性的三个区域",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/bjt-output-characteristic.jpg",
                  title: "三极管输出特性的三个区域",
                  caption: "饱和区、放大区和截止区的偏置条件与电流关系。"
                }
              ],
              body: [
                "<strong>放大区</strong>：发射结正偏、集电结反偏，$i_C=\\beta i_B$。",
                "<strong>饱和区</strong>：两个结均正偏，$i_C$ 不再由 $\\beta i_B$ 决定；硅管饱和压降约 0.3 V。",
                "<strong>截止区</strong>：发射结无法正常导通，$i_B\\approx0$，$i_C\\approx0$。"
              ]
            },
            {
              id: "bjt-saturation-current",
              type: "formula",
              title: "临界饱和判断",
              formula: String.raw`I_{CS}\approx\frac{V_{CC}}{R_C},
\qquad i_C<I_{CS}\ \text{时工作在放大区侧}`
            },
            {
              id: "bjt-safety",
              type: "warning",
              title: "三极管的安全工作区",
              figures: [
                {
                  src: "./assets/source/semiconductor-devices/bjt-safe-operating-area.jpg",
                  title: "三极管安全工作区",
                  caption: "$I_{CM}$、$P_{CM}$ 和 $U_{(BR)CEO}$ 共同给出安全工作边界。"
                }
              ],
              body: [
                "$I_{CM}$、$P_{CM}$ 和 $U_{(BR)CEO}$ 共同限定安全工作区。",
                "使用时不能超过最大集电极电流、最大耗散功率或集射反向击穿电压。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "amplifiers",
      number: "02",
      title: "放大电路基本原理",
      english: "Amplifier Fundamentals",
      accent: "forest",
      summary: "从放大倍数和端口电阻出发，依次掌握共射电路、图解与微变等效分析、分压偏置稳定工作点、共集与共基组态，以及多级放大器的耦合和零点漂移。",
      examFocus: ["静态工作点", "图解法", "微变等效", "分压偏置", "共射/共集/共基", "多级耦合"],
      themes: [
        {
          id: "amplifier-metrics",
          title: "放大的概念与技术指标",
          summary: "放大的本质是直流电源能量受输入信号控制，而不是凭空产生能量。",
          figures: [
            {
              src: "./assets/source/amplifier-fundamentals/amplifier-metrics.jpg",
              title: "放大电路技术指标测试模型",
              caption: "第 2 章 2.2：电压、电流放大倍数及输入、输出电阻的定义模型"
            }
          ],
          cards: [
            {
              id: "amplification-essence",
              type: "definition",
              title: "放大的本质",
              body: [
                "放大电路用小功率输入信号控制直流电源向负载输出较大的功率。",
                "主要放大元件是双极型三极管或场效应管，前提是三极管工作在合适的静态工作点。"
              ]
            },
            {
              id: "signal-notation",
              type: "warning",
              title: "大小写与交直流符号",
              body: [
                "大写字母通常表示直流量，小写字母表示交流量或总瞬时量。",
                "例如 $u_{BE}=U_{BEQ}+u_{be}$：总瞬时量等于静态直流量加交流变化量。"
              ]
            },
            {
              id: "gain",
              type: "formula",
              title: "电压与电流放大倍数",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/amplifier-metrics.jpg",
                  title: "放大倍数与端口指标",
                  caption: "输入量除以输入量、输出量除以输出量；增益均按相量定义。"
                }
              ],
              formula: String.raw`\dot A_u=\frac{\dot U_o}{\dot U_i},
\qquad
\dot A_i=\frac{\dot I_o}{\dot I_i}`
            },
            {
              id: "input-resistance",
              type: "formula",
              title: "输入电阻",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/amplifier-metrics.jpg",
                  title: "输入电阻与信号源分压",
                  caption: "$R_i$ 把放大电路等效为信号源负载，影响实际输入电压。"
                }
              ],
              body: [
                "输入电阻把放大电路等效为信号源的负载。电压源驱动时希望输入电阻大，以减少分压。"
              ],
              formula: String.raw`R_i=\frac{\dot U_i}{\dot I_i},
\qquad
\dot U_i=\frac{R_i}{R_s+R_i}\dot U_s`
            },
            {
              id: "output-resistance",
              type: "formula",
              title: "输出电阻",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/amplifier-metrics.jpg",
                  title: "输出电阻与负载效应",
                  caption: "$R_o$ 把输出端等效为带内阻的电压源，影响带负载能力。"
                }
              ],
              body: [
                "输出电阻把放大电路等效为带内阻的信号源。电压输出时希望输出电阻小，以增强带载能力。"
              ],
              formula: String.raw`R_o=\left.\frac{\dot U_o}{\dot I_o}\right|_{\dot U_s=0,\ R_L=\infty}`
            },
            {
              id: "bandwidth",
              type: "formula",
              title: "通频带",
              formula: String.raw`f_{BW}=f_H-f_L`
            },
            {
              id: "max-output",
              type: "formula",
              title: "最大输出与效率",
              body: [
                "最大输出幅度要求输出波形没有明显失真；效率等于最大输出功率与直流电源提供功率之比。"
              ],
              formula: String.raw`\eta=\frac{P_{om}}{P_V}`
            }
          ]
        },
        {
          id: "common-emitter",
          title: "单管共射放大电路",
          summary: "共射电路同时具有电压和电流放大作用，输出与输入反相。",
          figures: [
            {
              src: "./assets/source/amplifier-fundamentals/common-emitter-principle.jpg",
              title: "单管共射放大电路的组成",
              caption: "第 2 章 2.3.1：三极管、电源、集电极电阻和基极偏置的作用"
            },
            {
              src: "./assets/source/amplifier-fundamentals/rc-coupled-common-emitter.jpg",
              title: "阻容耦合单管共射电路",
              caption: "第 2 章图 2.3.2：输入、输出耦合电容及负载电阻"
            },
            {
              src: "./assets/source/amplifier-fundamentals/dc-load-line.jpg",
              title: "直流负载线与静态工作点",
              caption: "第 2 章图 2.4.3：输出特性与直流负载线相交得到 Q 点"
            },
            {
              src: "./assets/source/amplifier-fundamentals/graphical-waveform-method.jpg",
              title: "共射电路的图解波形分析",
              caption: "第 2 章：输入、输出特性上的工作点移动，以及反相和最大不失真幅度"
            },
            {
              src: "./assets/source/amplifier-fundamentals/ce-voltage-current-waveforms.jpg",
              title: "共射电路电压电流波形",
              caption: "第 2 章图 2.4.6：交直流并存、电压放大和输出倒相"
            },
            {
              src: "./assets/source/amplifier-fundamentals/simplified-h-model.jpg",
              title: "晶体管简化 h 参数模型",
              caption: "第 2 章图 2.4.11：用 $r_{be}$ 与受控电流源表示晶体管"
            },
            {
              src: "./assets/source/amplifier-fundamentals/ac-micro-equivalent-circuit.jpg",
              title: "共射电路的交流通路与微变等效",
              caption: "第 2 章：原电路、交流通路和微变等效电路的对应关系"
            },
            {
              src: "./assets/source/amplifier-fundamentals/emitter-resistor-example.jpg",
              title: "带发射极电阻的共射电路",
              caption: "第 2 章图 2.4.14：$R_e$ 对增益和输入、输出电阻的影响"
            },
            {
              src: "./assets/source/amplifier-fundamentals/divider-bias-circuit.jpg",
              title: "分压式工作点稳定电路",
              caption: "第 2 章图 2.5.2：$R_{b1}$、$R_{b2}$、$R_e$ 与旁路电容"
            }
          ],
          cards: [
            {
              id: "simple-ce",
              type: "definition",
              title: "基本共射放大电路",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-emitter-principle.jpg",
                  title: "基本共射电路的组成",
                  caption: "VT 是放大元件，$V_{CC}$ 提供能量，$R_c$ 完成电流到电压的转换。"
                }
              ],
              body: [
                "$V_{BB}+R_b$ 为发射结提供正向偏置，$V_{CC}+R_c$ 使集电结反偏并把集电极电流变化转换为电压变化。",
                "缺点是使用双电源，且输入、输出存在直流耦合。"
              ]
            },
            {
              id: "rc-coupling",
              type: "definition",
              title: "阻容耦合",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/rc-coupled-common-emitter.jpg",
                  title: "阻容耦合共射电路",
                  caption: "$C_1$、$C_2$ 隔直通交，$R_L$ 为负载电阻。"
                }
              ],
              body: [
                "耦合电容隔断直流，防止信号源和负载改变静态工作点；对交流信号近似短路。"
              ]
            },
            {
              id: "dc-ac-path",
              type: "judgment",
              title: "直流通路与交流通路",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/ac-micro-equivalent-circuit.jpg",
                  title: "从原电路到微变等效电路",
                  caption: "先画交流通路，再把晶体管替换为简化 h 参数模型。"
                }
              ],
              body: [
                "画直流通路时，大电容视为开路，交流信号源置零。",
                "画交流通路时，大电容和理想直流电压源视为短路，理想电流源视为开路。"
              ]
            },
            {
              id: "static-estimate",
              type: "formula",
              title: "静态工作点估算",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/qpoint-graphical-example.jpg",
                  title: "图解确定静态工作点",
                  caption: "第 2 章例题：由 $I_{BQ}$ 选定特性曲线，再由负载线交点得到 $I_{CQ}$、$U_{CEQ}$。"
                }
              ],
              formula: String.raw`I_{BQ}\approx\frac{V_{CC}-U_{BEQ}}{R_b},
\qquad
I_{CQ}=\beta I_{BQ},
\qquad
U_{CEQ}=V_{CC}-I_{CQ}R_c`
            },
            {
              id: "dc-load-line",
              type: "formula",
              title: "直流负载线",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/dc-load-line.jpg",
                  title: "直流负载线的两个截距",
                  caption: "$i_C=0$ 时 $u_{CE}=V_{CC}$；$u_{CE}=0$ 时 $i_C=V_{CC}/R_c$。"
                }
              ],
              formula: String.raw`U_{CE}=V_{CC}-I_C R_c`
            },
            {
              id: "dynamic-load-line",
              type: "formula",
              title: "交流负载线",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/graphical-gain-example.jpg",
                  title: "用图解法求电压放大倍数",
                  caption: "例：由输入、输出特性上的变化量之比计算 $A_u$。"
                }
              ],
              body: [
                "交流输出端负载为 $R_c\\parallel R_L$，交流负载线经过静态工作点，斜率为 $-1/R_L'$。"
              ],
              formula: String.raw`R_L'=R_c\parallel R_L,\qquad
\Delta u_{CE}=-R_L'\Delta i_C`
            },
            {
              id: "ce-waveform",
              type: "property",
              title: "共射电路的倒相作用",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/ce-voltage-current-waveforms.jpg",
                  title: "共射电路各点波形",
                  caption: "$u_i$ 与 $u_o$ 反相，$i_B$、$i_C$ 与 $u_{CE}$ 均在静态值上叠加交流量。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/graphical-waveform-method.jpg",
                  title: "图解波形与最大不失真幅度",
                  caption: "输入信号推动 Q 点在特性曲线上移动，可读出输出波形、反相和失真边界。"
                }
              ],
              body: [
                "$u_i$ 增大使 $i_B,i_C$ 增大，而 $u_o=u_{CE}=V_{CC}-i_C R_c$ 减小。",
                "因此共射电路输出与输入反相。"
              ]
            },
            {
              id: "h-parameters",
              type: "formula",
              title: "三极管简化 h 参数模型",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/simplified-h-model.jpg",
                  title: "简化 h 参数等效电路",
                  caption: "输入侧用 $r_{be}$，输出侧用受控电流源 $\\beta\\Delta i_B$。"
                }
              ],
              formula: String.raw`u_{be}=r_{be}i_b,
\qquad
i_c=\beta i_b`
            },
            {
              id: "rbe",
              type: "formula",
              title: "输入电阻 rbe 的估算",
              formula: String.raw`r_{be}=r_{bb'}+(1+\beta)\frac{26\,\mathrm{mV}}{I_{EQ}}
\approx300\Omega+(1+\beta)\frac{26\,\mathrm{mV}}{I_{EQ}}`
            },
            {
              id: "ce-gain",
              type: "formula",
              title: "共射电压放大倍数",
              formula: String.raw`\dot A_u=\frac{\dot U_o}{\dot U_i}
\approx-\frac{\beta R_L'}{r_{be}}`
            },
            {
              id: "source-gain",
              type: "formula",
              title: "源电压放大倍数",
              formula: String.raw`\dot A_{us}=\frac{R_i}{R_i+R_s}\dot A_u`
            },
            {
              id: "ce-resistance",
              type: "formula",
              title: "共射输入、输出电阻",
              formula: String.raw`R_i\approx R_b\parallel r_{be}\approx r_{be},
\qquad
R_o\approx R_c`
            },
            {
              id: "emitter-resistor",
              type: "formula",
              title: "发射极电阻 Re 的影响",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/emitter-resistor-example.jpg",
                  title: "带发射极电阻的共射电路",
                  caption: "先画微变等效电路，再把 $R_e$ 上的电流影响计入输入回路。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/emitter-resistor-gain.jpg",
                  title: "发射极电阻对电压增益的影响",
                  caption: "$(1+\\beta)R_e$ 进入增益分母，使 $|A_u|$ 降低。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/emitter-resistor-ports.jpg",
                  title: "发射极电阻对输入、输出电阻的影响",
                  caption: "$R_i$ 明显增大，$R_o$ 仍近似等于 $R_c$。"
                }
              ],
              body: [
                "$R_e$ 引入电流负反馈，降低电压增益，但能提高输入电阻、稳定工作点。"
              ],
              formula: String.raw`\dot A_u\approx
-\frac{\beta R_L'}{r_{be}+(1+\beta)R_e}`
            },
            {
              id: "divider-bias",
              type: "property",
              title: "分压式偏置与工作点稳定",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/divider-bias-circuit.jpg",
                  title: "分压式偏置电路",
                  caption: "$R_{b1}$、$R_{b2}$ 固定基极电位，$R_e$ 把 $I_E$ 的变化转化为负反馈；$C_e$ 在交流中旁路 $R_e$。"
                }
              ],
              body: [
                "温度升高使 $I_C$ 增大时，$R_e$ 上的压降增大，发射结电压减小，从而抑制 $I_C$ 继续增加。",
                "旁路电容 $C_e$ 在交流通路中短路 $R_e$，使交流增益不被过度降低。"
              ],
              formula: String.raw`U_{BQ}\approx\frac{R_{b2}}{R_{b1}+R_{b2}}V_{CC},
\qquad
I_{CQ}\approx I_{EQ}\approx\frac{U_{BQ}-U_{BEQ}}{R_e}`
            },
            {
              id: "ce-design-example",
              type: "example",
              title: "例题：共射电路的 Q 点、增益与端口电阻",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/qpoint-graphical-example.jpg",
                  title: "共射电路 Q 点图解法",
                  caption: "$R_b=280\\,\\mathrm{k\\Omega}$、$R_c=3\\,\\mathrm{k\\Omega}$、$V_{CC}=12\\,\\mathrm V$。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/graphical-gain-example.jpg",
                  title: "由特性曲线求电压放大倍数",
                  caption: "$R_L=3\\,\\mathrm{k\\Omega}$ 时交流负载电阻为 $1.5\\,\\mathrm{k\\Omega}$。"
                }
              ],
              body: [
                "基本共射电路取 $V_{CC}=12\\,\\mathrm V$，$R_b=280\\,\\mathrm{k\\Omega}$，$R_c=3\\,\\mathrm{k\\Omega}$，$R_L=3\\,\\mathrm{k\\Omega}$，$\\beta=50$，取 $U_{BEQ}=0.7\\,\\mathrm V$、$r_{bb'}=300\\,\\Omega$。",
                "先用图解法或公式估算 Q 点，再令 $R_L'=R_c\\parallel R_L=1.5\\,\\mathrm{k\\Omega}$，最后计算 $A_u$、$R_i$、$R_o$。"
              ],
              example: {
                title: "展开完整计算",
                body: [
                  "$I_{BQ}=(12-0.7)/280\\,\\mathrm{k\\Omega}\\approx40\\,\\mu\\mathrm A$，所以 $I_{CQ}\\approx2\\,\\mathrm{mA}$，$U_{CEQ}\\approx6\\,\\mathrm V$，说明工作在放大区。",
                  "$r_{be}\\approx300\\,\\Omega+(1+50)\\times26\\,\\mathrm{mV}/2\\,\\mathrm{mA}\\approx0.963\\,\\mathrm{k\\Omega}$。",
                  "$A_u\\approx-50\\times1.5\\,\\mathrm{k\\Omega}/0.963\\,\\mathrm{k\\Omega}\\approx-78$，与图解法约 $-75$ 一致；$R_i\\approx0.96\\,\\mathrm{k\\Omega}$，$R_o\\approx3\\,\\mathrm{k\\Omega}$。"
                ],
                formula: String.raw`I_{CQ}\approx2\,\mathrm{mA},
\qquad U_{CEQ}\approx6\,\mathrm V,
\qquad \dot A_u\approx-78`
              },
              source: "据第 2 章图 2.4.3 与图解法例题重算"
            },
            {
              id: "equivalent-method-steps",
              type: "judgment",
              title: "微变等效电路法的步骤",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/equivalent-method-steps.jpg",
                  title: "等效电路法的四个步骤",
                  caption: "先求静态工作点，再确定微变参数、画等效电路并列方程。"
                }
              ],
              bullets: [
                "先用图解法或近似估算法确定 Q 点。",
                "求出工作点处的 $\\beta$ 与 $r_{be}$。",
                "先画三极管微变模型，再补齐交流通路中的其余元件。",
                "列电路方程，根据定义求 $A_u$、$R_i$ 和 $R_o$。"
              ]
            }
          ]
        },
        {
          id: "three-configurations",
          title: "共射、共集与共基",
          summary: "三种组态都可用同一套晶体管微变模型分析，差别主要集中在公共端、相位、端口电阻和用途。",
          figures: [
            {
              src: "./assets/source/amplifier-fundamentals/common-collector-circuit.jpg",
              title: "共集电极放大电路",
              caption: "第 2 章 2.6.1：基极输入、发射极输出、集电极交流接地"
            },
            {
              src: "./assets/source/amplifier-fundamentals/common-base-circuit.jpg",
              title: "共基极放大电路",
              caption: "第 2 章 2.6.2：发射极输入、集电极输出、基极交流接地"
            }
          ],
          cards: [
            {
              id: "ce-config",
              type: "property",
              title: "共射组态",
              body: [
                "输入在基极、输出在集电极、发射极交流接地。",
                "电压和电流均有放大作用，输出反相，输入电阻中等，输出电阻约等于 $R_c$。"
              ]
            },
            {
              id: "cc-config",
              type: "property",
              title: "共集电极与射极跟随器",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-collector-circuit.jpg",
                  title: "共集电极电路与等效电路",
                  caption: "基极输入、发射极输出，集电极是交流公共端。"
                }
              ],
              body: [
                "基极输入、发射极输出、集电极交流接地。",
                "电压增益略小于 1 且同相，输入电阻大、输出电阻小，适合电压跟随和带负载。"
              ],
              formula: String.raw`\dot A_u\approx1,
\qquad
R_i\approx R_b\parallel\left[r_{be}+(1+\beta)(R_e\parallel R_L)\right],
\qquad
R_o\approx R_e\parallel\frac{r_{be}+(R_s\parallel R_b)}{1+\beta}`
            },
            {
              id: "cc-qpoint",
              type: "formula",
              title: "共集电极电路的静态工作点",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-collector-qpoint.jpg",
                  title: "共集电极电路直流通路与 Q 点",
                  caption: "直流通路中电容开路，$R_e$ 上同时有 $I_B$ 与 $I_C$。"
                }
              ],
              body: [
                "从基极回路看，发射极电流在 $R_e$ 上产生的压降会折算到基极，因此基极回路的等效电阻包含 $(1+\\beta)R_e$。",
                "求得 $I_{BQ}$ 后继续计算 $I_{CQ}$ 与 $U_{CEQ}$。"
              ],
              formula: String.raw`I_{BQ}=\frac{V_{CC}-U_{BEQ}}{R_b+(1+\beta)R_e},
\qquad I_{CQ}\approx\beta I_{BQ},
\qquad U_{CEQ}\approx V_{CC}-I_{CQ}R_e`
            },
            {
              id: "cc-dynamic",
              type: "judgment",
              title: "共集电极电路的交流通路",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-collector-dynamic.jpg",
                  title: "共集电极电路动态分析",
                  caption: "耦合电容短路、直流电源接地后，输入在基极、输出在发射极。"
                }
              ],
              body: [
                "交流通路中，$R_e$ 与负载 $R_L$ 并联形成发射极等效负载 $R_e'=R_e\\parallel R_L$。",
                "输出取自发射极，因此 $U_o=I_eR_e'$；它与输入电压同相。"
              ]
            },
            {
              id: "cc-gain",
              type: "formula",
              title: "共集电极电路的增益",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-collector-gain.jpg",
                  title: "共集电极电路的电流与电压增益",
                  caption: "输出电流方向与输入电流相反，因此电流增益为 $- (1+\\beta)$。"
                }
              ],
              body: [
                "输入电压由 $r_{be}$ 上的电压和发射极等效电阻上的电压串联组成，所以电压增益小于 1 但接近 1。",
                "$A_i$ 的幅值约为 $1+\\beta$，说明射极跟随器具有明显的电流放大作用。"
              ],
              formula: String.raw`\dot A_i=-(1+\beta),
\qquad
\dot A_u=\frac{(1+\beta)R_e'}{r_{be}+(1+\beta)R_e'}\approx1,
\qquad R_e'=R_e\parallel R_L`
            },
            {
              id: "cc-resistance",
              type: "formula",
              title: "共集电极电路的输入、输出电阻",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-collector-input-resistance.jpg",
                  title: "共集电极电路的输入电阻",
                  caption: "$R_e'$ 通过 $(1+\\beta)$ 倍折算到基极，因此输入电阻很大。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/common-collector-output-resistance.jpg",
                  title: "共集电极电路的输出电阻",
                  caption: "从发射极看入时，基极回路电阻被 $(1+\\beta)$ 除小，因此输出电阻很小。"
                }
              ],
              formula: String.raw`R_i=R_b\parallel\left[r_{be}+(1+\beta)(R_e\parallel R_L)\right],
\qquad
R_o=R_e\parallel\frac{r_{be}+(R_s\parallel R_b)}{1+\beta}`
            },
            {
              id: "cb-config",
              type: "property",
              title: "共基极组态",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-circuit.jpg",
                  title: "共基极原理电路与实际电路",
                  caption: "发射极输入、集电极输出、基极交流接地。"
                }
              ],
              body: [
                "发射极输入、集电极输出、基极交流接地。",
                "没有电流放大作用，但有电压放大作用，输出与输入同相，输入电阻小、输出电阻大。"
              ],
              formula: String.raw`\dot A_u\approx+\frac{\beta R_L'}{r_{be}},
\qquad
R_i\approx R_e\parallel\frac{r_{be}}{1+\beta},
\qquad
R_o\approx R_c`
            },
            {
              id: "cb-qpoint",
              type: "formula",
              title: "共基极电路的静态工作点",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-qpoint.jpg",
                  title: "共基极实际电路与直流通路",
                  caption: "基极由 $R_{b1}$、$R_{b2}$ 分压固定，发射极电流主要由 $R_e$ 决定。"
                }
              ],
              body: [
                "用分压近似得到基极直流电位，再减去发射结压降得到 $R_e$ 两端电压。",
                "集电极电位由 $R_c$ 上的压降决定；$I_{BQ}$ 再由 $I_{EQ}/(1+\\beta)$ 得到。"
              ],
              formula: String.raw`I_{EQ}\approx\frac{U_{BQ}-U_{BEQ}}{R_e},
\qquad I_{BQ}=\frac{I_{EQ}}{1+\beta},
\qquad U_{CEQ}\approx V_{CC}-I_{CQ}R_c-I_{EQ}R_e`
            },
            {
              id: "cb-dynamic",
              type: "judgment",
              title: "共基极电路的交流通路",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-dynamic.jpg",
                  title: "共基极电路动态分析",
                  caption: "交流通路与微变等效电路中，基极是输入输出的公共端。"
                }
              ],
              body: [
                "从发射极输入、从集电极输出。输入电流 $I_i=-I_e$，输出电流 $I_o=I_c$。",
                "输出电压与输入电压同相，这一点与共射组态相反。"
              ]
            },
            {
              id: "cb-current-gain",
              type: "formula",
              title: "共基极电流放大倍数",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-current-gain.jpg",
                  title: "共基极电流放大倍数",
                  caption: "$A_i=I_o/I_i=I_c/(-I_e)=-\\alpha$，幅值略小于 1。"
                }
              ],
              formula: String.raw`\dot A_i=-\alpha,
\qquad \alpha=\frac{\beta}{1+\beta}<1`
            },
            {
              id: "cb-voltage-gain",
              type: "formula",
              title: "共基极电压放大倍数",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-voltage-gain.jpg",
                  title: "共基极电压放大倍数",
                  caption: "电压增益为正，说明输入与输出同相。"
                }
              ],
              formula: String.raw`\dot A_u=\frac{\dot U_o}{\dot U_i}
\approx+\frac{\beta R_L'}{r_{be}},
\qquad R_L'=R_c\parallel R_L`
            },
            {
              id: "cb-resistance",
              type: "formula",
              title: "共基极输入、输出电阻",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-input-resistance.jpg",
                  title: "共基极输入电阻",
                  caption: "$r_{be}$ 从发射极看入时被 $(1+\\beta)$ 除小，因此输入电阻很低。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/common-base-output-resistance.jpg",
                  title: "共基极输出电阻",
                  caption: "考虑集电极负载时 $R_o=R_c\\parallel r_{cb}\\approx R_c$，输出电阻较大。"
                }
              ],
              formula: String.raw`R_i=R_e\parallel\frac{r_{be}}{1+\beta},
\qquad
R_o=R_c\parallel r_{cb}\approx R_c`
            },
            {
              id: "config-compare",
              type: "judgment",
              title: "三种组态速判",
              bullets: [
                "需要电压增益：优先共射。",
                "需要高输入电阻、低输出电阻：共集。",
                "需要低输入电阻、高频或同相电压放大：共基。"
              ]
            }
          ]
        },
        {
          id: "multistage",
          title: "多级放大电路",
          summary: "多级电路提高总增益，但级间耦合会影响静态工作点、低频响应和零点漂移。",
          figures: [
            {
              src: "./assets/source/amplifier-fundamentals/rc-coupled-multistage.jpg",
              title: "阻容耦合多级放大电路",
              caption: "第 2 章图 2.8.1：两级共射电路通过耦合电容连接"
            },
            {
              src: "./assets/source/amplifier-fundamentals/direct-coupled-multistage.jpg",
              title: "直接耦合多级放大电路",
              caption: "第 2 章图 2.8.2：能放大直流和缓变信号，但存在 Q 点牵连与零漂"
            },
            {
              src: "./assets/source/amplifier-fundamentals/direct-coupling-level-shift.jpg",
              title: "直接耦合的电平移动措施",
              caption: "第 2 章：发射极电阻、稳压管和二极管等方式调整后级静态电位"
            },
            {
              src: "./assets/source/amplifier-fundamentals/zero-drift-compensation.jpg",
              title: "零点漂移的抑制",
              caption: "第 2 章图 2.8.6：直流负反馈、热敏元件补偿和差分放大"
            }
          ],
          cards: [
            {
              id: "coupling-types",
              type: "definition",
              title: "三种级间耦合方式",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/rc-coupled-multistage.jpg",
                  title: "阻容耦合多级放大器",
                  caption: "级间电容隔断直流，因此各级 Q 点相互独立。"
                }
              ],
              body: [
                "阻容耦合隔离各级直流工作点，但不能放大直流和极低频信号。",
                "直接耦合能放大直流和变化缓慢的信号，便于集成，但存在级间静态工作点牵连与零点漂移。",
                "变压器耦合可进行阻抗匹配，但体积大、低频特性差。"
              ]
            },
            {
              id: "multistage-gain",
              type: "formula",
              title: "多级电压放大倍数",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/rc-coupled-multistage.jpg",
                  title: "两级阻容耦合放大电路",
                  caption: "后一级输入电阻作为前一级负载，增益需逐级计算。"
                }
              ],
              formula: String.raw`\dot A_u=\dot A_{u1}\dot A_{u2}\cdots\dot A_{un}`
            },
            {
              id: "direct-coupling",
              type: "warning",
              title: "直接耦合的静态工作点问题",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/direct-coupled-multistage.jpg",
                  title: "两级直接耦合放大电路",
                  caption: "前级集电极直接连接后级基极，静态电位和温度漂移会逐级传递。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/direct-coupling-level-shift.jpg",
                  title: "直接耦合的电平移动措施",
                  caption: "通过发射极电阻、稳压管或二极管调整后级基极电位。"
                }
              ],
              body: [
                "前一级集电极电位会影响下一级基极电位，级数越多，电位配置越困难。",
                "可用发射极电阻、稳压管或二极管等电平移动措施，但要权衡增益损失、动态范围和噪声。"
              ]
            },
            {
              id: "zero-drift",
              type: "warning",
              title: "零点漂移",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/zero-drift-compensation.jpg",
                  title: "热敏元件补偿零漂",
                  caption: "利用温度敏感元件反向补偿晶体管参数随温度的变化。"
                }
              ],
              body: [
                "输入为零时，直接耦合放大电路的输出仍可能随时间缓慢变化。温度变化引起的漂移称为温漂。",
                "可通过直流负反馈、热敏元件补偿或差分放大电路抑制。"
              ]
            },
            {
              id: "direct-coupling-design",
              type: "judgment",
              title: "直接耦合的电平配置",
              figures: [
                {
                  src: "./assets/source/amplifier-fundamentals/direct-coupling-level-shift.jpg",
                  title: "直接耦合的几种电平移动电路",
                  caption: "比较发射极电阻、稳压管和二极管方案对静态电位、增益和动态范围的影响。"
                },
                {
                  src: "./assets/source/amplifier-fundamentals/direct-coupling-fixes.jpg",
                  title: "直接耦合实例与改进电路",
                  caption: "用稳压管或发射极电阻降低后级集电极静态电位，同时尽量保留增益。"
                }
              ],
              bullets: [
                "直接级联时，前级集电极电压成为后级基极输入偏置。",
                "$R_{e2}$ 可保证后级有合适工作点，但会降低后级增益。",
                "稳压管方案动态电阻较小、增益损失较小，但会增加噪声并缩小输出动态范围。",
                "实际电路要综合静态电位、增益、动态范围、噪声与集成难度选择电平移动方式。"
              ]
            },
            {
              id: "differential",
              type: "formula",
              title: "差分放大与共模抑制",
              body: [
                "差分放大电路放大差模信号，抑制左右两侧共同变化的共模信号。",
                "共模抑制比越大，对温漂和共模干扰的抑制能力越强。"
              ],
              formula: String.raw`K_{CMR}=\left|\frac{A_{ud}}{A_{uc}}\right|`
            }
          ]
        }
      ]
    },
    {
      id: "frequency",
      number: "03",
      title: "放大电路频率响应",
      english: "Frequency Response",
      accent: "brick",
      summary: "电容和结电容使增益成为频率函数，用 Bode 图分析低频、中频、高频段与带宽。",
      examFocus: ["幅频/相频", "RC 电路", "Bode 图", "晶体管频率参数", "增益带宽积"],
      themes: [
        {
          id: "frequency-basics",
          title: "频率响应与 Bode 图",
          summary: "放大倍数不仅有大小，还有随频率变化的相位。",
          cards: [
            {
              id: "frequency-response",
              type: "definition",
              title: "频率响应",
              body: [
                "放大电路中的电容和晶体管结电容具有频率相关的电抗，因此放大倍数是频率的函数。",
                "频率响应包括幅频特性和相频特性。"
              ],
              formula: String.raw`\dot A_u(f)=|A_u(f)|\angle\varphi(f)`
            },
            {
              id: "cutoff-bandwidth",
              type: "property",
              title: "上限频率、下限频率与通频带",
              body: [
                "中频增益下降到 $0.707|A_{um}|$（即 -3 dB）时，分别对应下限频率 $f_L$ 和上限频率 $f_H$。",
                "通频带是上下限频率之间的频率范围。"
              ],
              formula: String.raw`f_{BW}=f_H-f_L`
            },
            {
              id: "amplitude-distortion",
              type: "warning",
              title: "幅频失真",
              body: [
                "不同频率成分的增益不同，导致输出波形中各次谐波比例改变，称为幅频失真。"
              ]
            },
            {
              id: "phase-distortion",
              type: "warning",
              title: "相频失真",
              body: [
                "不同频率成分通过电路后的相位移不同，使各谐波的时间关系改变，称为相频失真。"
              ]
            },
            {
              id: "decibel",
              type: "formula",
              title: "分贝与对数频率特性",
              figures: [
                {
                  src: "./assets/source/frequency-response/bode-decibel-table.jpg",
                  title: "增益与分贝的对应关系",
                  caption: "课堂幻灯片表 3-1：幅值取倒数、减半、0.707、1、√2 与整数倍时对应的分贝值。"
                }
              ],
              formula: String.raw`A(\mathrm{dB})=20\lg|A|`
            },
            {
              id: "bode",
              type: "definition",
              title: "Bode 图",
              figures: [
                {
                  src: "./assets/source/frequency-response/bode-slope-examples.jpg",
                  title: "幅频折线综合判读",
                  caption: "课堂例题图：由中频平台、转折频率和 ±20 dB/十倍频斜率读出完整幅频特性。"
                }
              ],
              body: [
                "Bode 图是横轴取对数频率的幅频、相频折线图。",
                "一阶 RC 电路在远离转折频率时可用 20 dB/十倍频的渐近直线近似。"
              ]
            }
          ]
        },
        {
          id: "rc-frequency",
          title: "RC 高通与低通电路",
          summary: "高通决定下限频率，低通决定上限频率；两者是一阶系统 Bode 图的原型。",
          cards: [
            {
              id: "rc-high-pass",
              type: "formula",
              title: "RC 高通传输函数",
              figures: [
                {
                  src: "./assets/source/frequency-response/rc-high-pass-model.jpg",
                  title: "RC 高通电路与传输函数",
                  caption: "课堂幻灯片图 3.1.2：输入接串联 C、R，输出取自 R；下限截止频率 f_L=1/(2πRC)。"
                }
              ],
              body: [
                "电容 C 与电阻 R 串联，输出电压取自 R。高频时电容接近短路，增益趋近 1；低频时容抗增大，输出明显减小。",
                "因此 RC 高通的转折频率对应放大电路的下限频率 $f_L$，也是低频增益下降的根源。"
              ],
              formula: String.raw`\dot A_u=\frac{1}{1-\mathrm j f_L/f},
\qquad
f_L=\frac1{2\pi RC}`
            },
            {
              id: "rc-high-magnitude",
              type: "property",
              title: "RC 高通幅频与相频",
              figures: [
                {
                  src: "./assets/source/frequency-response/rc-high-pass-magnitude.jpg",
                  title: "RC 高通实际幅频特性",
                  caption: "课堂幻灯片图 3.1.4(a)：实际曲线在 f_L 处比折线近似低 3 dB。"
                },
                {
                  src: "./assets/source/frequency-response/rc-high-pass-phase.jpg",
                  title: "RC 高通相频特性",
                  caption: "课堂幻灯片图 3.1.4(b)：低频段产生 0°～90° 的超前相移，折线在 0.1f_L 与 10f_L 处误差约 5.71°。"
                }
              ],
              bullets: [
                "$f\\gg f_L$：增益约为 0 dB，相位约为 0°。",
                "$f=f_L$：增益约为 -3 dB，相位约为 +45°。",
                "$f\\ll f_L$：幅频斜率约为 +20 dB/十倍频，相位趋近 +90°。"
              ]
            },
            {
              id: "rc-low-pass",
              type: "formula",
              title: "RC 低通传输函数",
              figures: [
                {
                  src: "./assets/source/frequency-response/rc-low-pass-model.jpg",
                  title: "RC 低通电路与传输函数",
                  caption: "课堂幻灯片图 3.1.5：输入接串联 R、C，输出取自 C；上限截止频率 f_H=1/(2πRC)。"
                }
              ],
              body: [
                "电阻 R 与电容 C 串联，输出电压取自 C。低频时电容接近开路，增益趋近 1；高频时容抗减小，输出被旁路。",
                "所以 RC 低通的转折频率对应放大电路的上限频率 $f_H$，也是高频增益下降的根源。"
              ],
              formula: String.raw`\dot A_u=\frac{1}{1+\mathrm j f/f_H},
\qquad
f_H=\frac1{2\pi RC}`
            },
            {
              id: "rc-low-magnitude",
              type: "property",
              title: "RC 低通幅频与相频",
              figures: [
                {
                  src: "./assets/source/frequency-response/rc-low-pass-bode.jpg",
                  title: "RC 低通幅频与相频特性",
                  caption: "课堂幻灯片图 3.1.6：幅频在 f_H 处下降 3 dB，高频段以 -20 dB/十倍频下降并产生 0°～-90° 滞后相移。"
                }
              ],
              bullets: [
                "$f\\ll f_H$：增益约为 0 dB，相位约为 0°。",
                "$f=f_H$：增益约为 -3 dB，相位约为 -45°。",
                "$f\\gg f_H$：幅频斜率约为 -20 dB/十倍频，相位趋近 -90°。"
              ]
            },
            {
              id: "bode-error",
              type: "warning",
              title: "折线近似误差",
              body: [
                "幅频折线在转折频率处与真实曲线相差约 3 dB。",
                "相频折线在 $0.1f_c$ 与 $10f_c$ 处的最大误差约为 5.71°。"
              ]
            }
          ]
        },
        {
          id: "transistor-frequency",
          title: "晶体管高频参数与混合 π 模型",
          summary: "结电容使三极管的电流放大能力随频率下降，密勒效应进一步恶化输入高频响应。",
          cards: [
            {
              id: "beta-frequency",
              type: "formula",
              title: "共射电流放大系数随频率变化",
              figures: [
                {
                  src: "./assets/source/frequency-response/transistor-beta-bode.jpg",
                  title: "β 的对数幅频与相频特性",
                  caption: "课堂幻灯片图 3.2.1：低于 fβ 时 β 近似不变，高于 fβ 后以 -20 dB/十倍频下降。"
                }
              ],
              formula: String.raw`\dot\beta(f)=\frac{\beta_0}{1+\mathrm j f/f_\beta}`
            },
            {
              id: "frequency-parameters",
              type: "property",
              title: "fβ、fT、fα 的关系",
              body: [
                "$f_\\beta$ 是 $|\\beta|$ 降到低频值 $1/\\sqrt2$ 时的共射截止频率。",
                "$f_T$ 是 $|\\beta|=1$ 的特征频率，通常用于评价晶体管高频能力。",
                "$f_\\alpha$ 是共基电流增益降到 $1/\\sqrt2$ 的共基截止频率。"
              ],
              formula: String.raw`f_T\approx\beta_0f_\beta,
\qquad
f_\alpha=(1+\beta_0)f_\beta,
\qquad
f_\beta<f_T<f_\alpha`
            },
            {
              id: "hybrid-pi",
              type: "definition",
              title: "混合 π 等效电路",
              figures: [
                {
                  src: "./assets/source/frequency-response/hybrid-pi-equivalent.jpg",
                  title: "晶体管混合 π 型等效电路",
                  caption: "课堂幻灯片图 3.3.1：基区体电阻、发射结电阻、结电容和受控电流源共同构成高频小信号模型。"
                }
              ],
              body: [
                "用基区体电阻、发射结电阻、结电容和受控电流源描述晶体管的高频小信号行为。",
                "基极与发射极之间的电容 $C_{\\pi}$ 和集电结电容 $C_{\\mu}$ 是限制高频增益的主要因素。"
              ]
            },
            {
              id: "transconductance",
              type: "formula",
              title: "跨导与结电容",
              formula: String.raw`g_m=\frac{I_{EQ}}{26\,\mathrm{mV}},
\qquad
C_\pi\approx\frac{g_m}{2\pi f_T}`
            },
            {
              id: "miller",
              type: "formula",
              title: "密勒效应",
              body: [
                "跨接在输入和输出之间的 $C_{\\mu}$ 会被放大为输入端更大的等效电容，使上限频率降低。"
              ],
              formula: String.raw`C_i\approx C_\pi+(1+|K|)C_\mu,
\qquad
K=\frac{\dot U_{ce}}{\dot U_{b'e}}`
            }
          ]
        },
        {
          id: "single-stage-frequency",
          title: "单管共射放大电路的频率响应",
          summary: "中频看增益，低频看耦合电容，高频看结电容与密勒电容。",
          figures: [
            {
              src: "./assets/source/frequency-response/rc-coupled-common-emitter.jpg",
              title: "阻容耦合单管共射放大电路",
              caption: "课堂幻灯片图 3.3.5：C1 为输入耦合电容，C2 与下级输入电阻共同决定输出侧高通环节。"
            }
          ],
          cards: [
            {
              id: "midband",
              type: "property",
              title: "中频段",
              figures: [
                {
                  src: "./assets/source/frequency-response/midband-equivalent.jpg",
                  title: "中频段等效电路",
                  caption: "课堂幻灯片图 3.3.6：C1 视为交流短路，极间电容视为交流断路，得到中频增益模型。"
                }
              ],
              body: [
                "耦合电容容抗很小，可视为短路；结电容容抗很大，可视为开路。",
                "中频电压增益近似不随频率变化。"
              ]
            },
            {
              id: "low-frequency",
              type: "property",
              title: "低频段",
              figures: [
                {
                  src: "./assets/source/frequency-response/low-frequency-equivalent.jpg",
                  title: "低频段等效电路",
                  caption: "课堂幻灯片图 3.3.7：保留输入耦合电容 C1，它与 Rs、Ri 构成 RC 高通环节。"
                }
              ],
              body: [
                "耦合电容的容抗增大，分走一部分输入电压，导致增益下降。",
                "输入耦合电容和输出耦合电容分别形成 RC 高通环节；实际下限频率由更靠近中频、数值更高的那个转折频率决定。",
                "课堂主图中的简化计算只列输入耦合项；若题目给出 $C_2$，还要检查输出端转折频率。"
              ],
              formula: String.raw`f_{L1}\approx\frac1{2\pi(R_s+R_i)C_1},
\qquad
f_{L2}\approx\frac1{2\pi(R_o+R_L)C_2},
\qquad
f_L\approx\max(f_{L1},f_{L2})`
            },
            {
              id: "high-frequency",
              type: "property",
              title: "高频段",
              figures: [
                {
                  src: "./assets/source/frequency-response/high-frequency-equivalent.jpg",
                  title: "高频段等效电路",
                  caption: "课堂幻灯片图 3.3.9：考虑极间电容，并用戴维南定理化简为输入侧 RC 低通网络。"
                }
              ],
              body: [
                "晶体管结电容和密勒等效电容使基极电流不能完全跟随输入电压变化，导致增益下降。",
                "高频响应可等效为 RC 低通网络。"
              ],
              formula: String.raw`f_H\approx\frac1{2\pi R'C_i}`
            },
            {
              id: "bode-drawing",
              type: "judgment",
              title: "完整 Bode 图的画法",
              figures: [
                {
                  src: "./assets/source/frequency-response/complete-bode-construction.jpg",
                  title: "完整 Bode 图的绘制步骤",
                  caption: "课堂幻灯片：先求中频增益、f_L 和 f_H；幅频用三段直线，相频用五段直线近似。"
                },
                {
                  src: "./assets/source/frequency-response/complete-bode-plot.jpg",
                  title: "完整幅频与相频 Bode 图",
                  caption: "课堂幻灯片图 3.3.10：中频平台位于 f_L 与 f_H 之间，两侧分别以 ±20 dB/十倍频变化。"
                }
              ],
              bullets: [
                "先求中频增益、下限频率和上限频率。",
                "幅频：中频为水平线；向低频以 +20 dB/十倍频延伸；向高频以 -20 dB/十倍频下降。",
                "相频：由低频、中频、高频三段及两个转折区组成，共五段近似直线。"
              ]
            },
            {
              id: "gain-bandwidth",
              type: "formula",
              title: "增益带宽积",
              body: [
                "共射电路的中频增益与上限频率近似成反比：提高增益通常会牺牲带宽。"
              ],
              formula: String.raw`|A_{usm}|f_H\approx\text{常数}`
            },
            {
              id: "frequency-bode-example",
              type: "example",
              title: "例题：由 Bode 图反写频率特性",
              figures: [
                {
                  src: "./assets/source/frequency-response/bode-response-example.jpg",
                  title: "由 Bode 图反写频率特性",
                  caption: "课堂例题原图：中频增益 40 dB、f_L=100 Hz、f_H=10⁵ Hz，中频段相移为 -180°。"
                }
              ],
              body: [
                "某放大电路的中频增益为 $40\\,\\mathrm{dB}$，即 $|A_{um}|=100$；下限频率为 $100\\,\\mathrm{Hz}$，上限频率为 $100\\,\\mathrm{kHz}$，中频段附加相移为 $-180^\\circ$。",
                "低频段按高通因子处理，高频段按低通因子处理，最后把 $\\pm180^\\circ$ 的反相与两个 RC 转折项的相移合并。"
              ],
              example: {
                title: "展开表达式与相频",
                body: [
                  "复频特性写成 $\\dot A_u=-100/[(1-\\mathrm j100/f)(1+\\mathrm j f/10^5)]$。",
                  "相角为 $\\varphi(f)=-180^\\circ+\\arctan(100/f)-\\arctan(f/10^5)$；在 $f=100\\,\\mathrm{Hz}$ 与 $f=100\\,\\mathrm{kHz}$ 处，幅值均比中频低约 $3\\,\\mathrm{dB}$。"
                ],
                formula: String.raw`\dot A_u=\frac{-100}
{\left(1-\mathrm j\frac{100}{f}\right)
\left(1+\mathrm j\frac{f}{10^5}\right)}`
              },
              source: "据第 3 章 Bode 图例题重算"
            }
          ]
        },
        {
          id: "multistage-frequency",
          title: "多级与直接耦合放大电路的频率响应",
          summary: "多级增益相乘，对数幅频相加、相位相加；总通频带必然变窄。",
          cards: [
            {
              id: "multistage-gain-log",
              type: "formula",
              title: "多级增益与对数增益",
              figures: [
                {
                  src: "./assets/source/frequency-response/multistage-magnitude.jpg",
                  title: "两级放大电路的幅频特性",
                  caption: "课堂幻灯片图 3.4.1：各级幅频折线相加，级联后上下限频率同时向中频收缩。"
                }
              ],
              formula: String.raw`\dot A_u=\prod_i\dot A_{ui},
\qquad
20\lg|A_u|=\sum_i20\lg|A_{ui}|`
            },
            {
              id: "multistage-phase",
              type: "formula",
              title: "多级总相位移",
              figures: [
                {
                  src: "./assets/source/frequency-response/multistage-phase.jpg",
                  title: "两级放大电路的相频特性",
                  caption: "课堂幻灯片：多级相移逐级相加，级联后的总相移范围扩大。"
                }
              ],
              formula: String.raw`\varphi=\sum_i\varphi_i`
            },
            {
              id: "multistage-band",
              type: "formula",
              title: "多级通频带近似",
              formula: String.raw`\frac1{f_H}\approx1.1\sqrt{\frac1{f_{H1}^2}+\frac1{f_{H2}^2}+\cdots},
\qquad
f_L\approx1.1\sqrt{f_{L1}^2+f_{L2}^2+\cdots}`
            },
            {
              id: "multistage-band-warning",
              type: "warning",
              title: "级数越多，通频带越窄",
              body: [
                "每一级都会贡献增益衰减和相位移。级联后总带宽一定小于其中任意一级的带宽。"
              ]
            },
            {
              id: "direct-coupled-frequency",
              type: "property",
              title: "直接耦合的低频响应",
              figures: [
                {
                  src: "./assets/source/frequency-response/direct-coupled-response.jpg",
                  title: "直接耦合共射电路的频率响应",
                  caption: "课堂幻灯片图 3.3.13：没有耦合电容的低频限制，幅频只有高频端的上限频率转折。"
                }
              ],
              body: [
                "直接耦合没有级间耦合电容，因此低频增益不会因耦合电容下降，下限频率可以接近 0。",
                "其频率限制主要来自晶体管结电容和电路寄生电容。"
              ]
            }
          ]
        }
      ]
    }
  ]
};
