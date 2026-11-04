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
      summary: "从载流子运动理解 PN 结与二极管，再建立三极管的结构、偏置和特性曲线。",
      examFocus: ["二极管模型", "限幅与钳位", "稳压管", "三极管结构", "输出特性"],
      themes: [
        {
          id: "semiconductor-basics",
          title: "半导体与 PN 结",
          summary: "载流子的扩散、漂移和复合构成二极管单向导电性的物理基础。",
          figures: [
            {
              src: "./assets/figures/diode-characteristic.webp",
              title: "二极管伏安特性与方程",
              caption: "照片笔记：正向特性、反向特性、击穿与 PN 结电流方程"
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
              src: "./assets/figures/diode-models.webp",
              title: "二极管等效模型",
              caption: "照片笔记：理想模型、恒压降模型、折线模型与图解分析"
            },
            {
              src: "./assets/figures/diode-waveforms.webp",
              title: "二极管应用波形",
              caption: "照片笔记：整流、限幅和钳位电路的输出波形"
            },
            {
              src: "./assets/figures/zener-regulator.webp",
              title: "稳压管与稳压电路",
              caption: "照片笔记：稳压管特性、限流电阻与稳压电路"
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
              figures: [{ src: "./assets/figures/diode-models.webp", title: "二极管等效模型", caption: "对照理想、恒压降与折线模型。" }],
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
              body: [
                "把二极管的伏安特性与外部电路方程画在同一坐标中，两条曲线的交点就是工作点。"
              ],
              formula: String.raw`i_D=\frac{V_{DD}-u_D}{R}`
            },
            {
              id: "diode-model-example",
              type: "example",
              title: "20 V 电源、10 kΩ 电阻与硅二极管",
              body: [
                "理想模型：$U_D=0$，所以 $I_D=20/10=2\\,\\mathrm{mA}$。",
                "恒压降模型：$U_D=0.7\\,\\mathrm V$，所以 $I_D=(20-0.7)/10=1.93\\,\\mathrm{mA}$。"
              ]
            },
            {
              id: "rectifier",
              type: "application",
              title: "二极管整流",
              figures: [{ src: "./assets/figures/diode-waveforms.webp", title: "整流波形与二极管状态", caption: "输入半周、导通状态与输出波形对应。" }],
              body: [
                "输入正半周时二极管导通，输出跟随输入；负半周截止，输出接近 0。",
                "这正是二极管把交流变成单向脉动电压的基础。"
              ]
            },
            {
              id: "limiter",
              type: "application",
              title: "限幅电路",
              body: [
                "当输入超过参考电压使二极管导通时，输出被钳在导通电压附近；未导通时输出跟随输入。",
                "分析关键是先确认阴极、阳极和参考电压，再判断输入达到多少时二极管状态发生改变。"
              ]
            },
            {
              id: "clamper",
              type: "application",
              title: "钳位电路",
              body: [
                "利用二极管和电容改变波形的直流基准。二极管先导通时给电容快速充电，随后改变输出的上下边界。",
                "多个二极管同时存在时，要判断哪个先导通，因为先导通者会改变其余二极管的端电压。"
              ]
            },
            {
              id: "zener",
              type: "property",
              title: "稳压管",
              figures: [{ src: "./assets/figures/zener-regulator.webp", title: "稳压管稳压电路", caption: "限流电阻、稳压管和负载的位置关系。" }],
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
              body: [
                "输入在 $10\\sim15\\,\\mathrm V$ 间变化，负载在 $600\\,\\Omega\\sim1\\,\\mathrm{k\\Omega}$ 间变化；$U_Z=6\\,\\mathrm V$，$I_{Z\\min}=5\\,\\mathrm{mA}$，$I_{Z\\max}=50\\,\\mathrm{mA}$。",
                "取 $R$ 的最小值保证最大输入、最小负载电流时稳压管电流不超限；取 $R$ 的最大值保证最小输入、最大负载电流时稳压管仍能工作。"
              ],
              example: {
                title: "展开计算",
                body: [
                  "$I_{L\\min}=6\\,\\mathrm V/1\\,\\mathrm{k\\Omega}=6\\,\\mathrm{mA}$，故 $R_{\\min}=(15-6)/(50+6)=161\\,\\Omega$。",
                  "$I_{L\\max}=6\\,\\mathrm V/600\\,\\Omega=10\\,\\mathrm{mA}$，故 $R_{\\max}=(10-6)/(5+10)=267\\,\\Omega$。",
                  "可选 $200\\,\\Omega$ 标准电阻，并核对额定功耗；若 $R_{\\min}>R_{\\max}$，说明给定电流与负载范围不能同时满足。"
                ],
                formula: String.raw`R_{\min}=\frac{U_{I\max}-U_Z}{I_{Z\max}+I_{L\min}},
\qquad
R_{\max}=\frac{U_{I\min}-U_Z}{I_{Z\min}+I_{L\max}}`
              },
              source: "据第 1 章稳压管例题重算"
            }
          ]
        },
        {
          id: "transistor",
          title: "双极型三极管",
          summary: "三极管通过基极电流控制集电极电流，结构和偏置共同决定是否具有放大作用。",
          figures: [
            {
              src: "./assets/figures/transistor-structure.webp",
              title: "三极管结构与载流子运动",
              caption: "照片笔记：NPN/PNP 结构、发射结与集电结、内部载流子运动"
            },
            {
              src: "./assets/figures/transistor-curves.webp",
              title: "三极管输出特性与安全工作区",
              caption: "照片笔记：放大区、饱和区、截止区及极限参数"
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
              figures: [{ src: "./assets/figures/transistor-curves.webp", title: "三极管输出特性", caption: "放大、饱和、截止和安全工作区。" }],
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
      summary: "围绕单管共射电路，掌握静态工作点、动态等效电路、三种组态和多级耦合。",
      examFocus: ["静态工作点", "微变等效", "电压放大倍数", "输入输出电阻", "三种组态"],
      themes: [
        {
          id: "amplifier-metrics",
          title: "放大的概念与技术指标",
          summary: "放大的本质是直流电源能量受输入信号控制，而不是凭空产生能量。",
          figures: [
            {
              src: "./assets/figures/amplifier-metrics.webp",
              title: "放大电路技术指标",
              caption: "照片笔记：放大倍数、输入电阻与输出电阻模型"
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
              formula: String.raw`\dot A_u=\frac{\dot U_o}{\dot U_i},
\qquad
\dot A_i=\frac{\dot I_o}{\dot I_i}`
            },
            {
              id: "input-resistance",
              type: "formula",
              title: "输入电阻",
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
              src: "./assets/figures/common-emitter-circuit.webp",
              title: "单管共射与阻容耦合电路",
              caption: "照片笔记：共射原理电路、耦合电容与负载"
            },
            {
              src: "./assets/figures/static-load-line.webp",
              title: "图解法与静态工作点",
              caption: "照片笔记：输入回路估算和输出回路直流负载线"
            },
            {
              src: "./assets/figures/amplifier-waveforms.webp",
              title: "共射放大电路波形",
              caption: "照片笔记：交直流叠加、倒相和动态负载线"
            },
            {
              src: "./assets/figures/h-parameter-equivalent.webp",
              title: "h 参数与微变等效电路",
              caption: "照片笔记：三极管简化参数模型和放大电路交流等效"
            },
            {
              src: "./assets/figures/emitter-resistor-circuit.webp",
              title: "发射极电阻与负反馈",
              caption: "照片笔记：接发射极电阻时的增益、输入电阻和输出电阻"
            },
            {
              src: "./assets/figures/stable-bias-circuit.webp",
              title: "分压式工作点稳定电路",
              caption: "照片笔记：基极分压、射极电阻和旁路电容"
            }
          ],
          cards: [
            {
              id: "simple-ce",
              type: "definition",
              title: "基本共射放大电路",
              body: [
                "$V_{BB}+R_b$ 为发射结提供正向偏置，$V_{CC}+R_c$ 使集电结反偏并把集电极电流变化转换为电压变化。",
                "缺点是使用双电源，且输入、输出存在直流耦合。"
              ]
            },
            {
              id: "rc-coupling",
              type: "definition",
              title: "阻容耦合",
              body: [
                "耦合电容隔断直流，防止信号源和负载改变静态工作点；对交流信号近似短路。"
              ]
            },
            {
              id: "dc-ac-path",
              type: "judgment",
              title: "直流通路与交流通路",
              body: [
                "画直流通路时，大电容视为开路，交流信号源置零。",
                "画交流通路时，大电容和理想直流电压源视为短路，理想电流源视为开路。"
              ]
            },
            {
              id: "static-estimate",
              type: "formula",
              title: "静态工作点估算",
              figures: [{ src: "./assets/figures/static-load-line.webp", title: "直流负载线与 Q 点", caption: "用输出负载线定位静态工作点。" }],
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
              formula: String.raw`U_{CE}=V_{CC}-I_C R_c`
            },
            {
              id: "dynamic-load-line",
              type: "formula",
              title: "交流负载线",
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
              figures: [{ src: "./assets/figures/amplifier-waveforms.webp", title: "共射电路各点波形", caption: "输入与输出的反相关系。" }],
              body: [
                "$u_i$ 增大使 $i_B,i_C$ 增大，而 $u_o=u_{CE}=V_{CC}-i_C R_c$ 减小。",
                "因此共射电路输出与输入反相。"
              ]
            },
            {
              id: "h-parameters",
              type: "formula",
              title: "三极管简化 h 参数模型",
              figures: [{ src: "./assets/figures/h-parameter-equivalent.webp", title: "h 参数小信号模型", caption: "输入电阻 rbe 与受控电流源 βib 的连接。" }],
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
              figures: [{ src: "./assets/figures/emitter-resistor-circuit.webp", title: "带发射极电阻的共射电路", caption: "观察反馈电阻的连接位置。" }],
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
              figures: [{ src: "./assets/figures/stable-bias-circuit.webp", title: "分压式稳定偏置电路", caption: "R_e 与旁路电容的连接关系。" }],
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
              body: [
                "基本共射电路取 $V_{CC}=12\\,\\mathrm V$，$R_b=300\\,\\mathrm{k\\Omega}$，$R_c=3\\,\\mathrm{k\\Omega}$，$R_L=6\\,\\mathrm{k\\Omega}$，$\\beta=50$，取 $U_{BEQ}=0.7\\,\\mathrm V$、$r_{bb'}=300\\,\\Omega$。",
                "先求 Q 点，再令 $R_L'=R_c\\parallel R_L=2\\,\\mathrm{k\\Omega}$，最后计算 $A_u$、$R_i$、$R_o$。"
              ],
              example: {
                title: "展开完整计算",
                body: [
                  "$I_{BQ}=(12-0.7)/300\\,\\mathrm{k\\Omega}\\approx37.7\\,\\mu\\mathrm A$，所以 $I_{CQ}\\approx1.88\\,\\mathrm{mA}$，$U_{CEQ}\\approx6.35\\,\\mathrm V$，说明工作在放大区。",
                  "$r_{be}\\approx300\\,\\Omega+(1+50)\\times26\\,\\mathrm{mV}/1.88\\,\\mathrm{mA}\\approx1.01\\,\\mathrm{k\\Omega}$。",
                  "$A_u\\approx-50\\times2\\,\\mathrm{k\\Omega}/1.01\\,\\mathrm{k\\Omega}\\approx-99$；$R_i\\approx R_b\\parallel r_{be}\\approx1.0\\,\\mathrm{k\\Omega}$，$R_o\\approx R_c=3\\,\\mathrm{k\\Omega}$。"
                ],
                formula: String.raw`I_{CQ}\approx1.88\,\mathrm{mA},
\qquad U_{CEQ}\approx6.35\,\mathrm V,
\qquad \dot A_u\approx-99`
              },
              source: "据第 2 章课堂例题重算"
            }
          ]
        },
        {
          id: "three-configurations",
          title: "共射、共集与共基",
          summary: "三种组态都可用同一套晶体管微变模型分析，差别主要集中在公共端、相位、端口电阻和用途。",
          figures: [
            {
              src: "./assets/figures/three-configurations.webp",
              title: "三种基本放大组态",
              caption: "照片笔记：共射、共集和共基放大电路及等效电路"
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
              id: "cb-config",
              type: "property",
              title: "共基极组态",
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
              src: "./assets/figures/multistage-amplifier.webp",
              title: "多级放大与差分电路",
              caption: "照片笔记：阻容耦合、直接耦合、零点漂移与差分放大"
            }
          ],
          cards: [
            {
              id: "coupling-types",
              type: "definition",
              title: "三种级间耦合方式",
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
              figures: [{ src: "./assets/figures/multistage-amplifier.webp", title: "多级放大电路", caption: "级间连接与逐级加载关系。" }],
              formula: String.raw`\dot A_u=\dot A_{u1}\dot A_{u2}\cdots\dot A_{un}`
            },
            {
              id: "direct-coupling",
              type: "warning",
              title: "直接耦合的静态工作点问题",
              body: [
                "前一级集电极电位会影响下一级基极电位，级数越多，电位配置越困难。",
                "可用发射极电阻、稳压管或二极管等电平移动措施，但要权衡增益损失、动态范围和噪声。"
              ]
            },
            {
              id: "zero-drift",
              type: "warning",
              title: "零点漂移",
              body: [
                "输入为零时，直接耦合放大电路的输出仍可能随时间缓慢变化。温度变化引起的漂移称为温漂。",
                "可通过直流负反馈、热敏元件补偿或差分放大电路抑制。"
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
          figures: [
            {
              src: "./assets/figures/full-bode-plot.webp",
              title: "完整频率响应与波特图",
              caption: "照片笔记：中频增益、上下限频率和相频特性"
            }
          ],
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
              formula: String.raw`A(\mathrm{dB})=20\lg|A|`
            },
            {
              id: "bode",
              type: "definition",
              title: "Bode 图",
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
          figures: [
            {
              src: "./assets/figures/rc-high-pass.webp",
              title: "RC 高通电路与波特图",
              caption: "照片笔记：高通传输函数、幅频折线、相频和近似误差"
            },
            {
              src: "./assets/figures/rc-low-pass.webp",
              title: "RC 低通电路与波特图",
              caption: "照片笔记：低通传输函数和幅频、相频近似"
            }
          ],
          cards: [
            {
              id: "rc-high-pass",
              type: "formula",
              title: "RC 高通传输函数",
              formula: String.raw`\dot A_u=\frac{1}{1-\mathrm j f_L/f},
\qquad
f_L=\frac1{2\pi RC}`
            },
            {
              id: "rc-high-magnitude",
              type: "property",
              title: "RC 高通幅频与相频",
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
              formula: String.raw`\dot A_u=\frac{1}{1+\mathrm j f/f_H},
\qquad
f_H=\frac1{2\pi RC}`
            },
            {
              id: "rc-low-magnitude",
              type: "property",
              title: "RC 低通幅频与相频",
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
          figures: [
            {
              src: "./assets/figures/hybrid-pi-model.webp",
              title: "混合 π 等效电路",
              caption: "照片笔记：晶体管结构示意与高频混合 π 等效电路"
            }
          ],
          cards: [
            {
              id: "beta-frequency",
              type: "formula",
              title: "共射电流放大系数随频率变化",
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
              figures: [{ src: "./assets/figures/hybrid-pi-model.webp", title: "混合 π 高频模型", caption: "结电容与受控源的高频连接。" }],
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
              src: "./assets/figures/single-stage-bode.webp",
              title: "阻容耦合共射电路的分频段模型",
              caption: "照片笔记：中频、低频、高频等效电路与完整波特图"
            }
          ],
          cards: [
            {
              id: "midband",
              type: "property",
              title: "中频段",
              body: [
                "耦合电容容抗很小，可视为短路；结电容容抗很大，可视为开路。",
                "中频电压增益近似不随频率变化。"
              ]
            },
            {
              id: "low-frequency",
              type: "property",
              title: "低频段",
              figures: [{ src: "./assets/figures/single-stage-bode.webp", title: "低频等效电路", caption: "耦合电容对应的高通环节。" }],
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
          figures: [
            {
              src: "./assets/figures/multistage-bode.webp",
              title: "多级放大电路波特图",
              caption: "照片笔记：多级幅频、相频叠加与总通频带变窄"
            }
          ],
          cards: [
            {
              id: "multistage-gain-log",
              type: "formula",
              title: "多级增益与对数增益",
              formula: String.raw`\dot A_u=\prod_i\dot A_{ui},
\qquad
20\lg|A_u|=\sum_i20\lg|A_{ui}|`
            },
            {
              id: "multistage-phase",
              type: "formula",
              title: "多级总相位移",
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
