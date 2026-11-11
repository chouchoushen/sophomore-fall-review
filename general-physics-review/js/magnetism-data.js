(function () {
  "use strict";

  const chapter = {
    id: "magnetism",
    number: "11",
    title: "恒定磁场",
    english: "Steady Magnetic Field",
    accent: "amber",
    summary:
      "从电流元激发磁场出发，用毕奥－萨伐尔定律和安培环路定理求典型磁场，再讨论运动电荷、载流导线和磁介质受力。",
    examFocus: [
      "毕奥－萨伐尔定律",
      "安培环路定理",
      "洛伦兹力",
      "安培力与磁矩",
      "磁场强度"
    ],
    themes: [
      {
        id: "magnetic-source",
        title: "电流与毕奥－萨伐尔定律",
        summary:
          "先规定电流方向，再由电流元的矢量叉乘建立磁场；方向与大小分开处理。",
        cards: [
          {
            id: "current-density",
            type: "definition",
            title: "电流、电流密度与连续性",
            body: [
              "电流 $I=\\mathrm dq/\\mathrm dt$ 描述单位时间通过某截面的电荷量；方向规定为正电荷运动方向。",
              "电流密度 $\\vec j$ 是单位时间内穿过垂直于该点正电荷运动方向的单位面积电荷量。对任意截面，$I$ 是 $\\vec j$ 的通量。",
              "恒定电流满足电流连续性；粗细或截面变化时，同一串联导体内各处电流相同，但电流密度不一定相同。"
            ],
            formula: String.raw`\vec j=nq\vec v_d,
\qquad
I=\int_S\vec j\cdot\mathrm d\vec S`
          },
          {
            id: "magnetic-field-definition",
            type: "definition",
            title: "磁感应强度",
            body: [
              "运动电荷、电流和变化电场都能在其周围空间产生磁场。恒定电流产生的磁场不随时间变化，称为恒定磁场。",
              "磁感应强度 $\\vec B$ 由检验运动电荷所受磁场力定义；电荷沿磁场方向运动时磁场力为零，速度与磁场垂直时磁场力最大。",
              "磁感应强度的单位是特斯拉，$1\\,\\mathrm T=1\\,\\mathrm{N\\cdot s/(C\\cdot m)}$。"
            ],
            formula: String.raw`\vec F_{\rm m}=q\vec v\times\vec B`
          },
          {
            id: "biot-savart-law",
            type: "formula",
            title: "毕奥－萨伐尔定律",
            body: [
              "电流元 $I\\mathrm d\\vec l$ 在场点产生的磁场大小与电流、电流元长度成正比，与距离平方成反比。",
              "$\\mathrm d\\vec B$ 垂直于 $\\mathrm d\\vec l$ 和位矢 $\\vec r$ 所确定的平面，方向由右手螺旋或叉乘确定。",
              "总磁场按矢量叠加；实际积分前先判断哪些分量会因对称性相互抵消。"
            ],
            formula: String.raw`\mathrm d\vec B
=\frac{\mu_0}{4\pi}\frac{I\,\mathrm d\vec l\times\hat{\vec r}}{r^2}
=\frac{\mu_0}{4\pi}\frac{I\,\mathrm d\vec l\times\vec r}{r^3},
\qquad
\mu_0=4\pi\times10^{-7}\,\mathrm{N/A^2}`
          },
          {
            id: "finite-straight-wire",
            type: "formula",
            title: "有限长载流直导线",
            figures: [
              {
                src: "./assets/examples/finite-straight-wire.jpg",
                title: "例题：有限长载流直导线的磁场",
                caption:
                  "取电流元并利用几何关系换元，角度决定积分上下限；无限长只是其中一种极限。"
              }
            ],
            body: [
              "设场点到导线的垂直距离为 $r_0$，导线两端分别对应角度 $\\theta_1,\\theta_2$。",
              "角度应按电流正向与从电流元指向场点的位矢之间的夹角统一取值，避免正负号混乱。"
            ],
            formula: String.raw`B=\frac{\mu_0I}{4\pi r_0}
\left(\cos\theta_1-\cos\theta_2\right)`
          },
          {
            id: "straight-wire-limits",
            type: "property",
            title: "无限长、半无限长直导线",
            bullets: [
              "无限长直导线：$\\theta_1=0,\\ \\theta_2=\\pi$，得 $B=\\mu_0I/(2\\pi r_0)$。",
              "从场点垂足开始向一侧延伸的半无限长直导线：$B=\\mu_0I/(4\\pi r_0)$。",
              "半无限长的方向仍由右手螺旋确定，不能只把无限长结果机械除以 2 而不检查端点。",
              "真实导线足够长、场点远离两端时，才可近似为无限长。"
            ]
          },
          {
            id: "circular-loop-axis",
            type: "formula",
            title: "圆电流轴线上的磁场",
            figures: [
              {
                src: "./assets/examples/circular-loop-axis.jpg",
                title: "例题：圆电流轴线上的磁场",
                caption:
                  "将电流元的磁场分解为轴向与垂直分量；直径两端的垂直分量相互抵消，只积分轴向分量。"
              }
            ],
            body: [
              "半径 $R$、电流 $I$ 的圆电流在其轴线上距圆心 $x$ 处的磁场沿轴线方向。",
              "轴线上各点到圆环距离相同，这使积分可以直接化成圆周长。"
            ],
            formula: String.raw`B(x)=\frac{\mu_0IR^2}
{2\left(R^2+x^2\right)^{3/2}}`
          },
          {
            id: "loop-center-and-far-field",
            type: "property",
            title: "圆电流的两个极限",
            body: [
              "圆心处 $x=0$，磁场最大，$B=\\mu_0I/(2R)$。",
              "远处 $x\gg R$ 时，圆电流近似为磁偶极子；圆面积 $S=\\pi R^2$，有 $B\\approx\\mu_0IS/(2\\pi x^3)$。",
              "这两个极限可用于检查圆环轴线公式是否漏掉半径或系数。"
            ],
            formula: String.raw`B(0)=\frac{\mu_0I}{2R},
\qquad
B(x\gg R)\approx\frac{\mu_0IS}{2\pi x^3}`
          },
          {
            id: "magnetic-field-lines",
            type: "property",
            title: "磁感线与磁场叠加",
            figures: [
              {
                src: "./assets/examples/magnetic-field-lines.jpg",
                title: "典型电流的磁感线",
                caption:
                  "圆电流、螺线管和长直导线的右手螺旋关系；磁感线是闭合曲线，没有起点和终点。"
              }
            ],
            body: [
              "磁感线上任一点切线方向表示该处 $\\vec B$ 的方向；磁感线疏密表示磁感应强度大小。",
              "磁感线闭合，不始于磁极、不止于磁极。这与静电场线可始于正电荷、止于负电荷不同。",
              "多个电流元产生磁场时先分别判断方向，再作矢量叠加；同向相加、反向相减。"
            ]
          }
        ]
      },
      {
        id: "magnetic-flux-ampere",
        title: "磁通量与安培环路定理",
        summary:
          "磁通量强调穿出与穿入，安培环路定理强调环路上的切向磁场和所围电流。",
        cards: [
          {
            id: "magnetic-flux",
            type: "definition",
            title: "磁通量",
            body: [
              "穿过面元 $\\mathrm d\\vec S$ 的磁通量为 $\\mathrm d\\Phi=\\vec B\\cdot\\mathrm d\\vec S$。面积矢量方向取该面的法线方向。",
              "均匀磁场穿过平面时，$\\Phi=BS\\cos\\theta$，其中 $\\theta$ 是 $\\vec B$ 与面积法线的夹角。",
              "磁通量是标量，但有正负；闭合曲面的面积矢量统一取外法线。"
            ],
            formula: String.raw`\Phi=\int_S\vec B\cdot\mathrm d\vec S,
\qquad
\Phi=BS\cos\theta\quad\text{(匀强场、平面)}`
          },
          {
            id: "magnetic-gauss-law",
            type: "formula",
            title: "磁场的高斯定理",
            body: [
              "通过任意闭合曲面的净磁通量恒为零：磁感线穿入多少，就从另一处穿出多少。",
              "自然界没有实验上可分离的磁单极子，因此闭合曲面的总磁通量为零。",
              "“总磁通量为零”不代表曲面上每一点的 $\\vec B$ 都是零。"
            ],
            formula: String.raw`\oint_S\vec B\cdot\mathrm d\vec S=0`
          },
          {
            id: "ampere-law",
            type: "formula",
            title: "真空中恒定磁场的安培环路定理",
            body: [
              "磁感应强度沿任意闭合路径的线积分，等于路径所围各恒定电流代数和的 $\\mu_0$ 倍。",
              "它把沿路径的磁场分布与所围电流联系起来，是电流分布具有轴对称或高对称性时求磁场的核心工具。",
              "安培环路定理只说明环路积分由所围电流决定，不代表环路上各点 $\\vec B$ 只由所围电流产生。"
            ],
            formula: String.raw`\oint_L\vec B\cdot\mathrm d\vec l
=\mu_0\sum I_{\rm in}`
          },
          {
            id: "ampere-sign",
            type: "judgment",
            title: "安培环路电流正负号",
            bullets: [
              "先任意规定环路绕行方向，再选择与该绕行方向构成右手螺旋的面积为正法线方向。",
              "电流沿正法线方向穿过环路时取正，反向穿出时取负。",
              "积分路径是假想曲线，可以穿过空间或介质；如果改变绕行方向，线积分与所取正电流同时反号。",
              "只有电流穿过以 $L$ 为边界的任意曲面才计入；未穿过环路的电流不进入右端。"
            ]
          },
          {
            id: "long-solenoid-field",
            type: "formula",
            title: "无限长载流螺线管",
            body: [
              "长直螺线管内部靠近中部的磁场近似均匀，方向沿轴线；理想无限长模型外部磁场趋近于零。",
              "$n=N/L$ 是单位长度匝数。电流加倍或匝密度加倍时，管内磁场同比增大。",
              "靠近端口处存在端部效应，不能继续把 $B=\\mu_0nI$ 当作严格均匀结果。"
            ],
            formula: String.raw`B_{\rm in}=\mu_0nI=\mu_0\frac{NI}{L},
\qquad
B_{\rm out}\approx0`
          },
          {
            id: "toroid-field",
            type: "formula",
            title: "载流螺绕环",
            figures: [
              {
                src: "./assets/examples/toroid-magnetic-field.jpg",
                title: "例题：载流螺绕环内的磁场",
                caption:
                  "在环内取同心圆作为安培环路，只有环内路径围住总电流 $NI$；磁场沿圆周切向。"
              }
            ],
            body: [
              "理想螺绕环的磁场几乎全部集中在环内。在半径 $r$ 的同心圆环路上，磁场大小相同并沿切向。",
              "当环的截面半径远小于中心线半径时，环内磁场可近似看成均匀。",
              "环外取圆形环路时净围住电流为零，因此理想模型中外场近似为零。"
            ],
            formula: String.raw`B(r)=\frac{\mu_0NI}{2\pi r}=\mu_0nI,
\qquad
n=\frac{N}{2\pi r}`
          },
          {
            id: "cylindrical-conductor-field",
            type: "formula",
            title: "无限长载流圆柱体",
            figures: [
              {
                src: "./assets/examples/cylindrical-conductor-field.jpg",
                title: "例题：均匀载流圆柱体内部与外部",
                caption:
                  "半径 $r<R$ 的环路只围住部分电流，半径 $r>R$ 的环路围住全部电流，因此内、外场随 $r$ 的变化不同。"
              },
              {
                src: "./assets/examples/ampere-loop-cylinder-board.jpg",
                title: "课堂推导：圆柱内外分别选环路",
                caption:
                  "先用对称性确定 $B$ 沿切向且大小只随 $r$ 变化，再按环路是否包住全部电流分区讨论。"
              }
            ],
            body: [
              "半径 $R$ 的无限长圆柱导体载有沿轴向均匀分布的电流 $I$。磁场线是以轴线为圆心的同心圆。",
              "圆柱内部电流密度恒定，半径 $r$ 的环路只围住比例 $r^2/R^2$ 的电流，所以 $B$ 随 $r$ 线性增大。",
              "圆柱外部全部电流都在环路内，结果与全部电流集中在轴线上的长直导线相同。"
            ],
            formula: String.raw`B(r)=
\begin{cases}
\dfrac{\mu_0Ir}{2\pi R^2}, & r<R\\[6pt]
\dfrac{\mu_0I}{2\pi r}, & r>R
\end{cases}`
          },
          {
            id: "ampere-misuse",
            type: "warning",
            title: "安培环路定理的常见误用",
            body: [
              "$\\oint_L\\vec B\\cdot\\mathrm d\\vec l=0$ 只说明环路积分结果为零，不能据此断言路径上 $B=0$。",
              "若没有足够的对称性，$B$ 不能从积分号中提出，安培环路定理仍成立，但通常无法直接求出 $B$。",
              "螺线管、螺绕环、圆柱体外部看似 $B\\approx0$，其结论依赖理想模型和磁场集中在特定区域，不是“环外永远无场”的普遍规律。",
              "右手螺旋只负责电流正负和磁场方向，不能替代对磁场对称性的分析。"
            ]
          }
        ]
      },
      {
        id: "magnetic-forces",
        title: "运动电荷、载流导线与磁矩",
        summary:
          "磁场力始终通过叉乘决定方向；先判方向，再用半径、周期、力矩或力的大小公式计算。",
        cards: [
          {
            id: "lorentz-force",
            type: "formula",
            title: "洛伦兹力",
            figures: [
              {
                src: "./assets/examples/lorentz-force-slide.jpg",
                title: "运动电荷在磁场中的受力",
                caption:
                  "正电荷速度由小于 $180^\\circ$ 的方向转向 $\\vec B$ 时，右手四指给出旋转方向，拇指给出磁场力方向。"
              }
            ],
            body: [
              "运动电荷同时处于电场和磁场中时，总电磁力由电场力与磁场力相加。",
              "磁场力垂直于速度，因此磁场力不改变电荷速率，也不做功。负电荷的磁场力方向与正电荷相反。",
              "速度与磁场平行时磁场力为零；垂直时磁场力最大。"
            ],
            formula: String.raw`\vec F=q\left(\vec E+\vec v\times\vec B\right),
\qquad
F_{\rm m}=|q|vB\sin\theta`
          },
          {
            id: "circular-motion",
            type: "formula",
            title: "电荷在均匀磁场中的圆周运动",
            body: [
              "当 $\\vec v\\perp\\vec B$ 时，洛伦兹力始终指向圆心，提供匀速圆周运动的向心力。",
              "半径与速度成正比、与 $|q|B$ 成反比；周期与速率无关，这是回旋加速器的基本依据。",
              "电荷正负只改变旋转方向，不改变半径和周期的大小。"
            ],
            formula: String.raw`R=\frac{mv}{|q|B},
\qquad
T=\frac{2\pi m}{|q|B},
\qquad
f=\frac{|q|B}{2\pi m}`
          },
          {
            id: "helical-motion",
            type: "property",
            title: "速度与磁场斜交：螺旋线",
            body: [
              "把速度分解为平行磁场分量 $v_\\parallel$ 和垂直分量 $v_\\perp$。平行分量不受磁场力，保持匀速；垂直分量形成圆周运动。",
              "两种运动叠加得到螺旋线。一个周期内沿磁场前进的距离称为螺距。",
              "磁场较弱的非均匀区域中，运动电荷可被约束在磁感线附近，形成磁聚焦或磁约束。"
            ],
            formula: String.raw`d=v_\parallel T
=\frac{2\pi m v_\parallel}{|q|B}`
          },
          {
            id: "hall-effect",
            type: "formula",
            title: "霍尔效应",
            body: [
              "载流导体处于垂直电流方向的磁场中时，载流子受洛伦兹力向一侧偏转，形成横向电荷积累和霍尔电场。",
              "达到稳态时横向电场力与磁场力平衡，$qE_{\\rm H}=qvB$。霍尔电压正负可用于判断载流子类型。",
              "霍尔系数 $R_{\\rm H}=1/(nq)$。已知导体尺寸和 $R_{\\rm H}$ 时，可测量磁场或载流子数密度。"
            ],
            formula: String.raw`E_{\rm H}=vB,
\qquad
U_{\rm H}=vbB,
\qquad
U_{\rm H}=\frac{IB}{nqd},
\qquad
R_{\rm H}=\frac1{nq}`
          },
          {
            id: "ampere-force",
            type: "formula",
            title: "安培力",
            body: [
              "载流导线在磁场中受到安培力。电流元受力 $\\mathrm d\\vec F=I\\mathrm d\\vec l\\times\\vec B$。",
              "均匀磁场中一段直导线总安培力 $\\vec F=I\\vec L\\times\\vec B$，其中 $\\vec L$ 沿电流方向。",
              "在均匀磁场中，闭合载流回路所受合安培力为零，但各边仍可能受到使回路转动的力矩。"
            ],
            formula: String.raw`\mathrm d\vec F=I\mathrm d\vec l\times\vec B,
\qquad
\vec F=I\vec L\times\vec B,
\qquad
F=ILB\sin\theta`
          },
          {
            id: "parallel-wires",
            type: "formula",
            title: "两根平行长直导线的相互作用",
            figures: [
              {
                src: "./assets/examples/parallel-wires-force.jpg",
                title: "例题：平行电流之间的安培力",
                caption:
                  "先用安培环路定理求一根导线的磁场，再求另一根导线所受安培力；同向电流相吸，反向电流相斥。"
              },
              {
                src: "./assets/examples/ampere-definition.jpg",
                title: "安培的国际单位制定义",
                caption:
                  "两根相距 $1\\,\\mathrm m$ 的无限长平行直导线，每米受力为 $2\\times10^{-7}\\,\\mathrm{N/m}$ 时的电流规定为 1 A。"
              }
            ],
            body: [
              "导线 1 在距离 $d$ 处产生 $B_1=\\mu_0I_1/(2\\pi d)$，再作用到导线 2 的电流元上。",
              "同向电流之间表现为吸引力，反向电流之间表现为排斥力；判断时先定磁场方向，再作 $I\\mathrm d\\vec l\\times\\vec B$。"
            ],
            formula: String.raw`\frac{F}{L}
=\frac{\mu_0I_1I_2}{2\pi d}`
          },
          {
            id: "magnetic-moment-torque",
            type: "formula",
            title: "磁矩、磁力矩与取向",
            figures: [
              {
                src: "./assets/examples/magnetic-moment-torque.jpg",
                title: "线圈磁矩与磁场方向的三种关系",
                caption:
                  "法线与磁场同向时处于稳定平衡；反向时为不稳定平衡；垂直时磁力矩最大。"
              }
            ],
            body: [
              "面积 $S$、电流 $I$、$N$ 匝的平面线圈定义磁矩 $\\vec m=NIS\\vec e_n$，法线方向由电流右手螺旋确定。",
              "均匀磁场作用在线圈上的合磁力矩 $\\vec M=\\vec m\\times\\vec B$。当 $\\vec m\\parallel\\vec B$ 时力矩为零且稳定；反向时力矩为零但不稳定。",
              "磁偶极子在磁场中的磁势能为 $W=-\\vec m\\cdot\\vec B$；稳定平衡时势能最低。"
            ],
            formula: String.raw`\vec m=NIS\vec e_n,
\qquad
\vec M=\vec m\times\vec B,
\qquad
M=mB\sin\theta,
\qquad
W=-\vec m\cdot\vec B`
          },
          {
            id: "magnetic-force-workflow",
            type: "judgment",
            title: "磁场力题的判断顺序",
            bullets: [
              "先判断粒子电荷正负、速度方向和磁场方向，再用右手叉乘确定受力方向。",
              "运动电荷先看 $v_\parallel$ 与 $v_\perp$：平行不受力，斜交形成螺旋线。",
              "载流导线先取电流元，写出 $\\mathrm d\\vec l\\times\\vec B$；弯曲导线可分段或积分。",
              "线圈题先求磁矩方向和大小，再判断力矩、稳定平衡和势能，不要直接套标量公式。",
              "算完检查单位，并检查 $\\theta=0,\\pi/2,\\pi$ 三个特殊方向。"
            ]
          }
        ]
      },
      {
        id: "magnetic-media",
        title: "磁介质与磁场强度",
        summary:
          "磁介质的磁化产生附加磁场；引入磁化强度 M 和磁场强度 H 后，可把自由电流与复杂磁化电流分开处理。",
        cards: [
          {
            id: "magnetization",
            type: "definition",
            title: "磁化强度与磁化电流",
            figures: [
              {
                src: "./assets/examples/magnetization-ampere-law.jpg",
                title: "磁介质中的安培环路定理",
                caption:
                  "介质中的总磁场由自由电流和磁化电流共同产生；磁化强度线积分用来统一描述磁化电流的贡献。"
              }
            ],
            body: [
              "磁介质在外磁场中发生磁化，可看成大量微小磁矩有序排列。",
              "磁化强度 $\\vec M$ 是单位体积内分子磁矩的矢量和；磁介质内部等效磁化电流与磁化强度的空间变化相关。",
              "介质中的总磁场满足 $\\vec B=\\vec B_0+\\vec B'$，其中 $\\vec B_0$ 由自由电流产生，$\\vec B'$ 由磁化电流产生。"
            ],
            formula: String.raw`\vec M=\frac{\sum_i\vec m_i}{\Delta V},
\qquad
\vec B=\vec B_0+\vec B'`
          },
          {
            id: "magnetic-field-strength",
            type: "formula",
            title: "磁场强度与介质中的安培环路定理",
            body: [
              "引入辅助矢量 $\\vec H=\\vec B/\\mu_0-\\vec M$，称为磁场强度，单位为 $\\mathrm{A/m}$。",
              "在磁介质中，$\\vec H$ 的环路积分只与所围自由电流的代数和有关，为分析介质问题带来便利。",
              "$\\vec H$ 是辅助量，真正决定洛伦兹力和安培力的是磁感应强度 $\\vec B$。"
            ],
            formula: String.raw`\vec H=\frac{\vec B}{\mu_0}-\vec M,
\qquad
\oint_L\vec H\cdot\mathrm d\vec l
=\sum I_{\rm free,\,in}`
          },
          {
            id: "linear-magnetic-media",
            type: "formula",
            title: "线性磁介质",
            figures: [
              {
                src: "./assets/examples/linear-magnetic-media.jpg",
                title: "磁场强度、磁化率与相对磁导率",
                caption:
                  "顺磁质、抗磁质可近似线性；铁磁质的相对磁导率很大且不是常数，通常存在磁滞和饱和。"
              }
            ],
            body: [
              "各向同性线性磁介质中，磁化强度与磁场强度成正比：$\\vec M=\\chi_{\\rm m}\\vec H$，$\\chi_{\\rm m}$ 为磁化率。",
              "相对磁导率 $\\mu_{\\rm r}=1+\\chi_{\\rm m}$，磁导率 $\\mu=\\mu_0\\mu_{\\rm r}$，因此 $\\vec B=\\mu\\vec H$。",
              "顺磁质 $\\mu_{\\rm r}>1$；抗磁质 $\\mu_{\\rm r}<1$；铁磁质 $\\mu_{\\rm r}\\gg1$ 且随磁场历史和温度变化。"
            ],
            formula: String.raw`\vec M=\chi_{\rm m}\vec H,
\qquad
\mu_{\rm r}=1+\chi_{\rm m},
\qquad
\mu=\mu_0\mu_{\rm r},
\qquad
\vec B=\mu\vec H`
          },
          {
            id: "magnetic-media-workflow",
            type: "warning",
            title: "磁介质题的处理边界",
            bullets: [
              "先判断题目给的是自由电流、$\\vec B$、$\\vec H$、磁化率还是相对磁导率，不要混用真空公式。",
              "线性介质才能直接使用 $\\vec B=\\mu\\vec H$；铁磁质不能把 $\\mu_{\\rm r}$ 当作常数。",
              "材料边界处要结合法向 $\\vec B$ 连续和切向 $\\vec H$ 关系处理，具体取决于边界电流条件。",
              "洛伦兹力、安培力和磁通量始终用 $\\vec B$；$\\vec H$ 主要用于含自由电流的环路定理和介质分区计算。"
            ]
          }
        ]
      }
    ]
  };

  window.GENERAL_PHYSICS_MAGNETISM = chapter;
  window.ANALOG_COURSE.subtitle =
    "静电场 · 导体与电介质 · 电容与电场能量 · 恒定磁场";
  window.ANALOG_COURSE.updatedAt = "2026-11-11";
  window.ANALOG_COURSE.chapters.push(chapter);
})();
