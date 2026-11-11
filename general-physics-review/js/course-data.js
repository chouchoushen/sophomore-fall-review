window.ANALOG_COURSE = {
  title: "普通物理学",
  subtitle: "静电场 · 导体与电介质 · 电容与电场能量 · 恒定磁场",
  updatedAt: "2026-11-11",
  chapters: [
    {
      id: "field",
      number: "09",
      title: "静电场",
      english: "Electrostatic Field",
      accent: "violet",
      summary: "从库仑定律建立电场，再用叠加、电场线、高斯定理和电势四条语言描述同一静电场。",
      examFocus: ["库仑定律", "场强叠加", "高斯定理", "电势与电势差", "等势面"],
      themes: [
        {
          id: "charge-coulomb",
          title: "电荷、库仑定律与电场",
          summary: "先明确电荷和参考方向，再由单位检验电荷定义电场。",
          cards: [
            {
              id: "charge-basics",
              type: "definition",
              title: "电荷守恒与量子化",
              body: [
                "自然界存在正、负两种电荷，同种电荷相斥、异种电荷相吸。",
                "孤立系统电荷代数和保持不变；宏观带电过程只是电荷转移，并没有创造电荷。",
                "电荷量是离散的，任何带电体的电荷量都满足 $q=ne$，其中 $e\\approx1.60\\times10^{-19}\\,\\mathrm C$。"
              ]
            },
            {
              id: "coulomb-law",
              type: "formula",
              title: "库仑定律与矢量方向",
              body: [
                "真空中两个点电荷之间的静电力沿连线作用，大小与电荷量乘积成正比、与距离平方成反比。",
                "计算题先规定参考方向，再代入电荷正负号。库仑力仍满足牛顿第三定律。"
              ],
              formula: String.raw`\vec F_{12}
=\frac1{4\pi\varepsilon_0}
\frac{q_1q_2}{r_{12}^2}\hat{\vec r}_{12},
\qquad
k=\frac1{4\pi\varepsilon_0}\approx8.99\times10^9\,\mathrm{N\cdot m^2/C^2}`
            },
            {
              id: "electrostatic-superposition",
              type: "judgment",
              title: "静电力的叠加",
              body: [
                "多个电荷同时对同一个电荷作用时，合力等于各库仑力的矢量和：$\\vec F=\\sum_i\\vec F_i$。",
                "矢量叠加不能把大小直接相加；应先分解到坐标轴，再分别求分量。"
              ]
            },
            {
              id: "electric-field-definition",
              type: "definition",
              title: "电场强度",
              body: [
                "电场是电荷周围空间中的特殊物质，对场中电荷施力。",
                "电场强度定义为单位正检验电荷所受的力，方向与该正电荷所受电场力方向相同。",
                "电场由场源电荷及空间位置决定，与检验电荷 $q_0$ 是否存在无关。"
              ],
              formula: String.raw`\vec E=\frac{\vec F}{q_0}`
            },
            {
              id: "point-charge-field",
              type: "formula",
              title: "点电荷电场",
              body: [
                "正点电荷的电场沿径向向外，负点电荷的电场沿径向指向电荷。",
                "位置矢量应取从场源电荷指向场点的方向。"
              ],
              formula: String.raw`\vec E=\frac1{4\pi\varepsilon_0}
\frac{Q}{r^2}\hat{\vec r}`
            },
            {
              id: "field-superposition",
              type: "judgment",
              title: "场强叠加原理",
              body: [
                "多个电荷产生的总电场等于各电荷单独存在时产生电场的矢量和。",
                "连续带电体可将电荷元 $\\mathrm dq$ 的电场作积分；矢量积分前先判断对称分量是否相互抵消。"
              ],
              formula: String.raw`\vec E(\vec r)=\sum_i\vec E_i(\vec r),
\qquad
\mathrm d\vec E=\frac1{4\pi\varepsilon_0}
\frac{\mathrm dq}{r^2}\hat{\vec r}`
            },
            {
              id: "field-lines",
              type: "property",
              title: "电场线",
              body: [
                "电场线上任一点切线方向表示该点场强方向；电场线的疏密定性表示场强大小。",
                "电场线从正电荷出发、终止于负电荷，或在无穷远处开始/结束；静电场的电场线不相交。",
                "通过垂直于电场线的单位面积电场线数与该处场强成正比。"
              ]
            }
          ]
        },
        {
          id: "flux-gauss",
          title: "电通量与高斯定理",
          summary: "把“穿过曲面的电场线数量”写成通量，再根据对称性选高斯面。",
          cards: [
            {
              id: "electric-flux",
              type: "definition",
              title: "电通量",
              body: [
                "通过面元的电通量为 $\\mathrm d\\Phi_E=\\vec E\\cdot\\mathrm d\\vec S$，面积矢量方向取曲面法线。",
                "电场线穿出闭合曲面时通量为正，穿入时为负；穿过闭合曲面的总通量要看净穿出量。"
              ],
              formula: String.raw`\Phi_E=\int_S\vec E\cdot\mathrm d\vec S`
            },
            {
              id: "uniform-flux",
              type: "formula",
              title: "匀强电场穿过平面",
              body: [
                "若平面面积为 $S$，法线与电场夹角为 $\\theta$，则 $\\Phi_E=ES\\cos\\theta$。",
                "$\\theta=0$ 时通量最大；$\\theta=90^\\circ$ 时电场线与平面平行，通量为零。"
              ],
              formula: String.raw`\Phi_E=ES\cos\theta`
            },
            {
              id: "gauss-law",
              type: "formula",
              title: "真空中高斯定理",
              body: [
                "通过任意闭合曲面的电通量只由曲面内包围的净电荷决定，与曲面外电荷无关。",
                "$\\varepsilon_0$ 是真空电容率，约为 $8.85\\times10^{-12}\\,\\mathrm{F/m}$。"
              ],
              formula: String.raw`\oint_S\vec E\cdot\mathrm d\vec S
=\frac{Q_{\rm in}}{\varepsilon_0}`
            },
            {
              id: "closed-surface-flux",
              type: "property",
              title: "闭合曲面的通量性质",
              body: [
                "闭合曲面外的电荷，其电场线穿入后再穿出，对总电通量贡献为零。",
                "高斯定理计算通量只关心包围的净电荷，但高斯面上任一点的电场仍由空间所有电荷共同决定。",
                "规定面积矢量指向闭合曲面外侧，电通量的正负才有统一含义。"
              ]
            },
            {
              id: "gauss-choice",
              type: "judgment",
              title: "怎样选择高斯面",
              figures: [
                {
                  src: "./assets/examples/gauss-application-steps.jpg",
                  title: "高斯定理应用步骤",
                  caption: "先分析对称性，再选合适的高斯面，最后用高斯定理计算。"
                }
              ],
              bullets: [
                "球对称：选同心球面，$\\vec E$ 沿径向且面上大小相等。",
                "轴对称：选同轴圆柱面，只计算侧面通量。",
                "面对称：选穿过平板的对称柱面或盒面。",
                "高斯面必须闭合；对称性不足时，高斯定理仍成立，但通常不能直接求出场强。"
              ]
            },
            {
              id: "gauss-superposition",
              type: "warning",
              title: "高斯定理的常见误用",
              body: [
                "“高斯面内没有电荷”只说明净电通量为零，不说明高斯面处 $E=0$。",
                "高斯定理中的 $Q_{\\rm in}$ 必须带正负号计算净电荷。",
                "只有当电荷分布具有足够对称性，才能由通量公式直接解出每个场点的场强大小。"
              ]
            },
            {
              id: "field-work",
              type: "property",
              title: "静电场是保守场",
              body: [
                "静电力做功只与始末位置有关，与路径无关；沿任意闭合路径电场力做功为零。",
                "这是定义电势能、电势以及路径无关积分的基础。"
              ],
              formula: String.raw`W_{A\to B}=q\int_A^B\vec E\cdot\mathrm d\vec l,
\qquad
\oint\vec E\cdot\mathrm d\vec l=0`
            }
          ]
        },
        {
          id: "symmetric-fields",
          title: "对称带电体的电场",
          summary: "用高斯定理或叠加结果，处理球、线、平面、圆环和圆盘。",
          cards: [
            {
              id: "spherical-shell-field",
              type: "judgment",
              title: "均匀带电球面",
              figures: [
                {
                  src: "./assets/examples/charged-shell-field.jpg",
                  title: "例题：均匀带电球面的场强",
                  caption: "用同心球面高斯面分别讨论球内与球外，并对照 E-r 曲线。"
                }
              ],
              body: [
                "球面内部各点场强为零，外部等效于电荷全部集中在球心的点电荷。",
                "均匀带电实心球内部，由半径 $r$ 外的球壳贡献相抵消，只受半径 $r$ 内电荷影响。"
              ],
              formula: String.raw`E(r)=
\begin{cases}
0, & r<R\\
\dfrac{Q}{4\pi\varepsilon_0r^2}, & r>R
\end{cases}`
            },
            {
              id: "solid-sphere-field",
              type: "formula",
              title: "均匀带电实心球",
              formula: String.raw`E(r)=
\begin{cases}
\dfrac{\rho r}{3\varepsilon_0}, & r<R\\[4pt]
\dfrac{\rho R^3}{3\varepsilon_0r^2}
=\dfrac{Q}{4\pi\varepsilon_0r^2}, & r>R
\end{cases}`
            },
            {
              id: "infinite-line-field",
              type: "formula",
              title: "无限长均匀带电直线",
              figures: [
                {
                  src: "./assets/examples/infinite-line-gauss-setup.jpg",
                  title: "例题：无限长均匀带电直线（建立高斯面）",
                  caption: "由轴对称性选取同轴闭合圆柱面，上、下底面通量为零。"
                },
                {
                  src: "./assets/examples/infinite-line-gauss-result.jpg",
                  title: "例题：无限长均匀带电直线（完成计算）",
                  caption: "只保留柱面通量，与圆柱内包围的电荷联立得到场强。"
                }
              ],
              body: [
                "取半径为 $r$、高为 $h$ 的同轴闭合圆柱面；上下底面通量为零，只剩侧面通量。",
                "电场方向沿垂直直线的径向，大小只与到轴线的距离有关。"
              ],
              formula: String.raw`E=\frac{\lambda}{2\pi\varepsilon_0 r}`
            },
            {
              id: "finite-line-field",
              type: "formula",
              title: "有限长均匀带电直线",
              figures: [
                {
                  src: "./assets/examples/finite-line-field.jpg",
                  title: "例题：有限长均匀带电直线的场强",
                  caption: "取电荷元后分解 dx、dy 分量，利用两端角度的对称关系完成积分。"
                }
              ],
              body: [
                "设场点到直线的垂足为原点，线密度为 $\\lambda$，垂距为 $a$；上、下端相对垂直方向的夹角大小为 $\\beta,\\alpha$。",
                "垂直于直线分量直接相加，平行分量要看两端夹角差；对称时平行分量相互抵消。"
              ],
              formula: String.raw`E_\perp=\frac{k\lambda}{a}(\sin\beta+\sin\alpha),
\qquad
E_\parallel=\frac{k\lambda}{a}(\cos\alpha-\cos\beta)`
            },
            {
              id: "infinite-plane-field",
              type: "formula",
              title: "无限大均匀带电平面",
              figures: [
                {
                  src: "./assets/examples/infinite-plane-field.jpg",
                  title: "例题：无限大均匀带电平面的场强",
                  caption: "利用平面对称性选取穿板柱面，两底面积各计一次通量。"
                }
              ],
              body: [
                "均匀平面两侧的电场垂直于平面、方向背离正电荷或指向负电荷。",
                "场强大小与离平面距离无关；这是无限大理想模型的结论。"
              ],
              formula: String.raw`E=\frac{\sigma}{2\varepsilon_0}`
            },
            {
              id: "parallel-planes-field",
              type: "formula",
              title: "两块反向带电的无限大平行平面",
              body: [
                "两板间两份场强同向叠加，外侧两份场强反向抵消。",
                "单位面积电荷为 $\\sigma$ 时，板间场强为 $\\sigma/\\varepsilon_0$，理想模型外侧为零。"
              ],
              formula: String.raw`E_{\rm in}=\frac{\sigma}{\varepsilon_0},
\qquad
E_{\rm out}=0`
            },
            {
              id: "ring-disc-field",
              type: "formula",
              title: "圆环与圆盘轴线上的电场",
              figures: [
                {
                  src: "./assets/examples/ring-field-from-potential.jpg",
                  title: "例题：由电势求圆环轴线上的电场",
                  caption: "先利用已知电势，再通过电势梯度求轴线上的电场分量。"
                }
              ],
              formula: String.raw`E_{\rm ring}
=\frac{kQx}{(x^2+R^2)^{3/2}},
\qquad
E_{\rm disk}
=\frac{\sigma}{2\varepsilon_0}
\left(1-\frac{x}{\sqrt{x^2+R^2}}\right)`
            }
          ]
        },
        {
          id: "electric-potential",
          title: "电势能、电势与等势面",
          summary: "用电场线判断场强方向，再用高低电势和能量解释带电粒子的运动。",
          cards: [
            {
              id: "potential-energy",
              type: "definition",
              title: "静电势能",
              body: [
                "电场力做功等于电势能增量的负值：保守力做正功，系统电势能减少。",
                "电势能属于电荷与场源电荷组成的系统；说“某电荷的电势能”时必须说明参考点。"
              ],
              formula: String.raw`W_{A\to B}=E_{pA}-E_{pB},
\qquad
\Delta E_p=-W`
            },
            {
              id: "electric-potential",
              type: "formula",
              title: "电势的定义",
              body: [
                "某点电势等于单位正电荷从该点移到电势零点时，静电力所做的功。",
                "常用无穷远作为有限带电体的电势零点；无限长线、无限大面不能默认取无穷远为零。"
              ],
              formula: String.raw`V_A=\frac{E_{pA}}q
=-\int_{\infty}^{A}\vec E\cdot\mathrm d\vec l`
            },
            {
              id: "potential-difference",
              type: "formula",
              title: "电势差",
              figures: [
                {
                  src: "./assets/examples/line-potential-reference.jpg",
                  title: "例题：无限长带电直线取电势零点",
                  caption: "无限长模型不能取无穷远为零，改选距轴线 rB 的 B 点作为参考点。"
                },
                {
                  src: "./assets/examples/charged-sphere-potential-difference.jpg",
                  title: "例题：带电球面内外的电势差",
                  caption: "沿径向积分场强，分别检验球外与球内两点间的电势差。"
                }
              ],
              formula: String.raw`U_{AB}=V_A-V_B
=\int_A^B\vec E\cdot\mathrm d\vec l`
            },
            {
              id: "point-potential",
              type: "formula",
              title: "点电荷电势",
              figures: [
                {
                  src: "./assets/examples/charged-ring-potential.jpg",
                  title: "例题：均匀带电圆环轴线上的电势",
                  caption: "取电荷元 dq，按标量电势叠加后得到轴线上一点的电势。"
                }
              ],
              body: [
                "取无穷远为电势零点。正电荷周围电势为正，负电荷周围电势为负。",
                "电势是标量，多个电荷的电势按代数和叠加，不需要矢量分解。"
              ],
              formula: String.raw`V=\frac1{4\pi\varepsilon_0}\frac Qr,
\qquad
V=\sum_i\frac1{4\pi\varepsilon_0}\frac{Q_i}{r_i}`
            },
            {
              id: "field-from-potential",
              type: "formula",
              title: "由电势求电场",
              body: [
                "电场沿电势降低最快的方向，大小等于电势在该方向下降率的最大值。",
                "在均匀场或近似均匀场中，可用 $E=U/d$ 估算大小，但这一步依赖方向与均匀性。"
              ],
              formula: String.raw`\vec E=-\nabla V`
            },
            {
              id: "equipotential",
              type: "property",
              title: "等势面",
              body: [
                "等势面上各点电势相等，沿等势面移动电荷时静电力不做功。",
                "电场线处处垂直于等势面，并指向电势降低的方向。",
                "等势面越密，场强越大；电势与场强无必然大小对应，电势为零处场强不一定为零。"
              ]
            },
            {
              id: "charged-sphere-potential",
              type: "formula",
              title: "均匀带电球面的电势",
              figures: [
                {
                  src: "./assets/examples/charged-sphere-potential-profile.jpg",
                  title: "例题：均匀带电球面内外的电势分布",
                  caption: "球内为等势区，球外与点电荷电势相同，并给出 V-r 曲线。"
                },
                {
                  src: "./assets/examples/concentric-shell-potential.jpg",
                  title: "例题：同心带电球壳的电势",
                  caption: "分三个径向区域积分，并分别讨论球内、夹层和球外区域。"
                }
              ],
              formula: String.raw`V(r)=
\begin{cases}
\dfrac{Q}{4\pi\varepsilon_0R}, & r\le R\\[5pt]
\dfrac{Q}{4\pi\varepsilon_0r}, & r>R
\end{cases}`
            }
          ]
        }
      ]
    },
    {
      id: "conductors",
      number: "10·A",
      title: "导体与电介质",
      english: "Conductors & Dielectrics",
      accent: "emerald",
      summary: "导体靠自由电荷重新分布达到静电平衡；电介质靠束缚电荷极化削弱场强。",
      examFocus: ["静电平衡", "空腔导体", "静电屏蔽", "介质极化", "有介质高斯定理"],
      themes: [
        {
          id: "conductor-equilibrium",
          title: "导体的静电平衡",
          summary: "自由电荷移动直到导体内场强为零，此时整个导体成为等势体。",
          cards: [
            {
              id: "equilibrium-conditions",
              type: "judgment",
              title: "静电平衡条件",
              body: [
                "导体内部任意一点的合场强为零，否则自由电子仍会定向移动。",
                "导体表面外侧场强垂直于表面，否则电场切向分量会驱动表面电荷移动。"
              ]
            },
            {
              id: "conductor-equipotential",
              type: "property",
              title: "导体是等势体",
              body: [
                "导体内任意两点场强为零，因此两点间电势差为零，整个导体的体积是等势体。",
                "导体表面是等势面；表面附近电场线与表面垂直。"
              ]
            },
            {
              id: "surface-field",
              type: "formula",
              title: "导体表面场强与面电荷密度",
              body: [
                "在表面取一个很小的扁盒形高斯面，只有外侧通量，得到 $E=\\sigma/\\varepsilon_0$。",
                "该式中的 $\\sigma$ 是当地局部面电荷密度；曲率较大处电荷更密集、附近场强更强。"
              ],
              formula: String.raw`E_{\rm surface}=\frac{\sigma}{\varepsilon_0}`
            },
            {
              id: "solid-conductor-charge",
              type: "property",
              title: "实心导体的电荷分布",
              body: [
                "达到静电平衡后，实心导体内部没有净电荷，净电荷只能分布在导体表面。",
                "若假想内部存在净电荷，就会产生穿过内部高斯面的电通量，从而违背内部 $E=0$。"
              ]
            },
            {
              id: "curvature-charge",
              type: "warning",
              title: "尖端放电",
              body: [
                "相同电势下，导体曲率半径越小，表面电荷密度通常越大，附近场强越强。",
                "场强足够大时可使空气电离，形成尖端放电。避雷针和高压设备圆角设计都与此有关。"
              ]
            },
            {
              id: "conductor-example",
              type: "example",
              title: "例题：球形导体的表面场强",
              body: [
                "半径为 $R$ 的孤立导体球带总电荷 $Q$，求球外紧邻表面的场强。",
                "球外电场等效为球心点电荷；表面面电荷密度为 $\\sigma=Q/(4\\pi R^2)$，可直接验证 $E=\\sigma/\\varepsilon_0$。"
              ],
              example: {
                title: "展开",
                body: [
                  "$E(R)=Q/(4\\pi\\varepsilon_0R^2)$。",
                  "$\\sigma=Q/(4\\pi R^2)$，所以 $\\sigma/\\varepsilon_0=Q/(4\\pi\\varepsilon_0R^2)$。",
                  "只要 $Q>0$，场强方向沿径向向外；$Q<0$ 时方向沿径向向内。"
                ]
              }
            }
          ]
        },
        {
          id: "cavity-shielding",
          title: "空腔导体与静电屏蔽",
          summary: "用“导体内部无净电荷”和“电荷守恒”判断内外表面电荷。",
          cards: [
            {
              id: "empty-cavity",
              type: "property",
              title: "空腔中没有电荷",
              body: [
                "空腔内表面没有净电荷，导体上的净电荷全部分布在外表面。",
                "空腔内部无电荷时，腔内无电场；外部电场也不会进入空腔。"
              ]
            },
            {
              id: "cavity-induced-charge",
              type: "formula",
              title: "空腔内有电荷时的感应电荷",
              body: [
                "腔内放电荷 $+q$，空腔内表面感应出 $-q$；根据导体总电荷守恒，外表面还会出现相应的 $+q$ 变化。",
                "若外表面总面积分布复杂，应写“外表面总电荷增加 $q$”，而不是断言每一点都增加同一面密度。"
              ],
              formula: String.raw`Q_{\rm inner}=-q,
\qquad
Q_{\rm outer}=Q_{\rm conductor}+q`
            },
            {
              id: "grounded-shell",
              type: "judgment",
              title: "接地空腔导体",
              body: [
                "接地后导体外层可通过大地与电荷交换，外表面额外电荷可被中和。",
                "腔内电荷产生的内表面感应电荷仍由局部电场要求决定；腔内电荷和外部空间之间的场被导体屏蔽。"
              ]
            },
            {
              id: "electrostatic-shielding",
              type: "application",
              title: "静电屏蔽",
              body: [
                "闭合空腔导体可隔离外部静电场对腔内的影响，使腔体内部不受外场影响。",
                "若腔内存在电荷，导体也能阻止该电荷的电场泄漏到外部；实际屏蔽常采用接地金属外壳。"
              ]
            },
            {
              id: "cavity-gauss-check",
              type: "warning",
              title: "空腔问题的验算",
              bullets: [
                "在导体材料内部取闭合高斯面，总通量必须为零。",
                "腔内表面总电荷必须与腔内总电荷等量异号。",
                "导体整体电荷守恒，外表面电荷负责补齐总电量。",
                "接地会改变外表面电荷，但不改变腔内局部的感应规律。"
              ]
            }
          ]
        },
        {
          id: "dielectrics",
          title: "电介质与极化",
          summary: "电介质没有可自由移动的宏观电荷；外加电场使正负电荷中心发生相对位移。",
          cards: [
            {
              id: "dielectric-definition",
              type: "definition",
              title: "电介质",
              body: [
                "电介质是理想的绝缘体，内部没有能够宏观自由移动的电荷。",
                "电介质中的电荷只能在原子或分子尺度发生微小位移或取向，形成极化电荷。"
              ]
            },
            {
              id: "polar-nonpolar",
              type: "property",
              title: "无极分子与有极分子",
              body: [
                "无极分子的正负电荷中心原本重合，外场使它们发生相对位移，称为位移极化。",
                "有极分子本来具有固有电偶极矩，外场使分子偶极矩趋于转向，称为取向极化。"
              ]
            },
            {
              id: "dielectric-field",
              type: "formula",
              title: "介质中的电场",
              body: [
                "均匀介质完全充满原本真空的场区时，极化电荷产生反向附加场，使合场减弱。",
                "该简化关系要求介质均匀、线性、各向同性，并且几何填充条件适用。"
              ],
              formula: String.raw`E=\frac{E_0}{\varepsilon_r},
\qquad
\varepsilon=\varepsilon_0\varepsilon_r`
            },
            {
              id: "relative-permittivity",
              type: "definition",
              title: "相对电容率",
              body: [
                "真空 $\\varepsilon_r=1$；空气近似为 1；常见介质的 $\\varepsilon_r>1$。",
                "$\\varepsilon_r$ 是无量纲量，描述介质极化削弱电场的程度。"
              ]
            },
            {
              id: "polarization",
              type: "formula",
              title: "极化强度",
              body: [
                "极化强度是单位体积内电偶极矩的矢量和，反映介质极化程度。",
                "线性各向同性介质中极化强度与合场成正比，比例系数为极化率 $\\chi_e$。"
              ],
              formula: String.raw`\vec P=\frac{\sum\vec p_i}{\Delta V},
\qquad
\vec P=\varepsilon_0\chi_e\vec E,
\qquad
\varepsilon_r=1+\chi_e`
            },
            {
              id: "bound-charge",
              type: "property",
              title: "极化电荷与自由电荷",
              body: [
                "极化产生的束缚电荷不能沿介质宏观移动，但同样会产生电场。",
                "介质内部相邻偶极的异号电荷常相互抵消，净效应主要表现为介质表面出现面束缚电荷。",
                "极化电荷总量可为零，但局部面电荷密度不为零。"
              ]
            },
            {
              id: "dielectric-breakdown",
              type: "warning",
              title: "介质击穿",
              body: [
                "介质能承受的场强有上限，超过击穿场强后绝缘性被破坏，可能出现放电。",
                "击穿看的是介质内部场强，不只是两端电压；厚度不同，可承受电压也不同。"
              ]
            }
          ]
        },
        {
          id: "d-gauss",
          title: "电位移与有介质高斯定理",
          summary: "用 D 把高斯面的通量直接与自由电荷联系，避免逐项追踪束缚电荷。",
          cards: [
            {
              id: "electric-displacement",
              type: "formula",
              title: "电位移矢量",
              formula: String.raw`\vec D=\varepsilon_0\vec E+\vec P
=\varepsilon_0\varepsilon_r\vec E=\varepsilon\vec E`
            },
            {
              id: "d-flux",
              type: "definition",
              title: "电位移通量",
              formula: String.raw`\Phi_D=\int_S\vec D\cdot\mathrm d\vec S`
            },
            {
              id: "gauss-d",
              type: "formula",
              title: "有介质时的高斯定理",
              body: [
                "闭合曲面的电位移通量只等于面内自由电荷的代数和，束缚电荷已隐含在 $\\vec D$ 中。",
                "计算 $\\vec D$ 时可利用自由电荷对称性，再由 $\\vec E=\\vec D/\\varepsilon$ 求介质中场强。"
              ],
              formula: String.raw`\oint_S\vec D\cdot\mathrm d\vec S=Q_{\rm free,\,in}`
            },
            {
              id: "d-gauss-choice",
              type: "warning",
              title: "D 与 E 不要混用",
              body: [
                "电位移高斯定理右端用自由电荷，电通量高斯定理右端用的是高斯面内总净电荷。",
                "$\\vec D$ 的单位是 $\\mathrm{C/m^2}$；只有在均匀线性介质中才可用 $\\vec D=\\varepsilon\\vec E$。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "capacitance",
      number: "10·B",
      title: "电容与电场能量",
      english: "Capacitance & Field Energy",
      accent: "amber",
      summary: "从几何、介质和连接方式计算电容，再由电荷与电势求电场能量。",
      examFocus: ["平行板电容", "柱形与球形电容", "串并联", "介质插入", "能量密度"],
      themes: [
        {
          id: "capacitor-basics",
          title: "电容的基本定义",
          summary: "电容表示导体系统储存电荷的能力，是几何、介质和相对位置的属性。",
          cards: [
            {
              id: "capacitor-definition",
              type: "definition",
              title: "电容器",
              body: [
                "电容器由两个带有等量异号电荷的导体组成，两个导体称为极板。",
                "极板间电势差与所带电荷成正比，比例常数就是电容。"
              ]
            },
            {
              id: "capacitance",
              type: "formula",
              title: "电容",
              body: [
                "电容只由导体几何形状、相对位置和介质决定，与是否带电、带多少电无关。",
                "电容单位法拉：$1\\,\\mathrm F=1\\,\\mathrm{C/V}=10^6\\,\\mu\\mathrm F=10^{12}\\,\\mathrm{pF}$。"
              ],
              formula: String.raw`C=\frac Q{|U|}`
            },
            {
              id: "capacitor-field",
              type: "property",
              title: "极板间的电场",
              body: [
                "理想平行板电容器的边缘效应忽略后，极板间可近似为匀强电场。",
                "电场方向由正极板指向负极板，极板间电势差满足 $U=Ed$。"
              ]
            },
            {
              id: "charge-ratio",
              type: "warning",
              title: "电荷与电压的分配",
              body: [
                "同一回路中电容器串联时，直接串联的极板通常带等量异号电荷。",
                "不能只根据电容大小直接猜电荷或电压；应结合连接方式列电荷守恒与电压关系。"
              ]
            },
            {
              id: "capacitance-example",
              type: "example",
              title: "例题：平行板的电容量",
              body: [
                "平行板面积 $S=1.0\\times10^{-2}\\,\\mathrm{m^2}$，间距 $d=1.0\\,\\mathrm{mm}$。先求空气电容器，再把介质相对电容率改为 4。"
              ],
              example: {
                title: "展开",
                body: [
                  "空气近似真空：$C_0=\\varepsilon_0S/d\\approx8.85\\times10^{-11}\\,\\mathrm F=88.5\\,\\mathrm{pF}$。",
                  "介质完全充满时 $C=\\varepsilon_rC_0\\approx3.54\\times10^{-10}\\,\\mathrm F=354\\,\\mathrm{pF}$。",
                  "若介质只填一部分，不能直接乘 $\\varepsilon_r$，应把介质和空气各自视为串联或并联部分。"
                ],
                formula: String.raw`C_0=\frac{\varepsilon_0S}{d}
\approx8.85\times10^{-11}\,\mathrm F`
              }
            },
            {
              id: "capacitance-check",
              type: "judgment",
              title: "算完电容后的快速检查",
              bullets: [
                "面积增大，电容通常增大。",
                "板间距增大，电容通常减小。",
                "插入相对电容率大于 1 的介质，整个场区被填满时电容增大。",
                "检查单位：$\\varepsilon$ 为 $\\mathrm{F/m}$，乘面积除长度后应仍是法拉。"
              ]
            }
          ]
        },
        {
          id: "capacitor-geometry",
          title: "三种典型电容器的几何计算",
          summary: "先求电场与电势差，再用 C=Q/U；不同几何只改变场和积分方式。",
          cards: [
            {
              id: "parallel-plate-capacitor",
              type: "formula",
              title: "平行板电容器",
              figures: [
                {
                  src: "./assets/examples/parallel-plate-capacitor-setup.jpg",
                  title: "例题：平行板电容器（建立场强）",
                  caption: "由有介质高斯定理写出极板间电位移与场强，再积分求电势差。"
                },
                {
                  src: "./assets/examples/parallel-plate-capacitor-result.jpg",
                  title: "例题：平行板电容器（得到电容）",
                  caption: "将电势差代入电容定义式，并整理面积、间距与介质的关系。"
                }
              ],
              body: [
                "忽略边缘效应，两板间场强 $E=\\sigma/\\varepsilon$，电势差 $U=Ed$。",
                "介质必须完全、均匀填充板间场区时，公式才可直接使用。"
              ],
              formula: String.raw`C=\frac{\varepsilon_0\varepsilon_r S}{d}
=\frac{\varepsilon S}{d}`
            },
            {
              id: "cylindrical-capacitor",
              type: "formula",
              title: "圆柱形电容器",
              figures: [
                {
                  src: "./assets/examples/cylindrical-capacitor.jpg",
                  title: "例题：圆柱形电容器",
                  caption: "同轴圆柱面之间的径向场积分得到电势差，再求单位长度电容。"
                }
              ],
              body: [
                "同轴圆柱半径分别为 $R_1<R_2$，长度为 $L$，且 $L$ 远大于半径差。",
                "由圆柱形高斯面得 $E(r)=\\lambda/(2\\pi\\varepsilon r)$，再从 $R_1$ 积分到 $R_2$。"
              ],
              formula: String.raw`C=\frac{2\pi\varepsilon_0\varepsilon_r L}
{\ln(R_2/R_1)}`
            },
            {
              id: "spherical-capacitor",
              type: "formula",
              title: "球形电容器",
              figures: [
                {
                  src: "./assets/examples/spherical-capacitor.jpg",
                  title: "例题：球形电容器",
                  caption: "同心球壳之间的径向场按 1/r² 变化，积分后得到球形电容。"
                }
              ],
              body: [
                "由内外两个同心导体球面构成，内外半径为 $R_1<R_2$。",
                "介质填满两球之间的区域时，场强仍按径向 $1/r^2$ 变化。"
              ],
              formula: String.raw`C=\frac{4\pi\varepsilon_0\varepsilon_r R_1R_2}
{R_2-R_1}`
            },
            {
              id: "isolated-sphere",
              type: "formula",
              title: "孤立导体球",
              body: [
                "把另一极板视为半径趋于无穷的球面，孤立导体球的电容为 ${R_2\\to\\infty}$ 的极限。",
                "孤立导体球的电势取无穷远为零。"
              ],
              formula: String.raw`C=4\pi\varepsilon_0\varepsilon_r R`
            },
            {
              id: "geometry-unified",
              type: "judgment",
              title: "三种几何的统一算法",
              bullets: [
                "利用对称性先求 $\\vec E(r)$。",
                "由 $U=\\int_-^+\\vec E\\cdot\\mathrm d\\vec l$ 求极板间电势差。",
                "最后代入 $C=Q/U$，消去 $Q$ 或 $\\sigma$。",
                "球形、柱形公式都要核对半径大小和长度/半径近似条件。"
              ]
            },
            {
              id: "partial-dielectric",
              type: "warning",
              title: "介质只填一部分",
              body: [
                "介质未完全填满时，插入方式决定等效模型。平行于极板分层通常要按串联处理；沿同一电场方向分区通常按并联处理。",
                "核心是保证每个区域的电场、电势差和电荷分配满足边界关系，不能只凭“插入介质电容增大”一刀切。"
              ]
            }
          ]
        },
        {
          id: "capacitor-networks",
          title: "串并联与介质插入",
          summary: "串联看电荷相同，并联看电压相同；接入电池前后要区分谁保持不变。",
          cards: [
            {
              id: "series-capacitors",
              type: "formula",
              title: "电容串联",
              body: [
                "串联电容器电量相同，等效电容反而小于其中任一电容。"
              ],
              formula: String.raw`\frac1{C_{\rm eq}}
=\frac1{C_1}+\frac1{C_2}+\cdots,
\qquad
C_{\rm eq}=\frac{C_1C_2}{C_1+C_2}\ \text{(两只)}`
            },
            {
              id: "parallel-capacitors",
              type: "formula",
              title: "电容并联",
              body: [
                "并联电容器电压相同，总电荷相加，等效电容等于各电容之和。"
              ],
              formula: String.raw`C_{\rm eq}=C_1+C_2+\cdots`
            },
            {
              id: "isolated-dielectric",
              type: "formula",
              title: "孤立电容插入介质：电荷不变",
              body: [
                "先断开电源再插入介质，极板电荷来不及改变，$Q$ 保持不变。",
                "完全充满介质后电容变为 $\\varepsilon_rC_0$，电压和场强降为原来的 $1/\\varepsilon_r$。"
              ],
              formula: String.raw`Q=Q_0,
\qquad
C=\varepsilon_rC_0,
\qquad
U=\frac{U_0}{\varepsilon_r},
\qquad
E=\frac{E_0}{\varepsilon_r}`
            },
            {
              id: "battery-dielectric",
              type: "formula",
              title: "接在电池上插入介质：电压不变",
              body: [
                "保持与电池连接时，极板间电压由电池维持不变。",
                "介质的极化削弱原电场，要保持相同电压，极板必须补充自由电荷，因此 $Q$ 增大为 $\\varepsilon_rQ_0$。"
              ],
              formula: String.raw`U=U_0,
\qquad
C=\varepsilon_rC_0,
\qquad
Q=\varepsilon_rQ_0`
            },
            {
              id: "breakdown",
              type: "formula",
              title: "介质击穿电压",
              body: [
                "$E_b$ 为介质击穿场强。平行板近似匀强场时，最大允许电压可由 $U_b=E_bd$ 估计。",
                "圆柱、球形电容内部场强不均匀，最大场强出现在内表面附近，不能用平均场强代替。"
              ],
              formula: String.raw`U_b=E_bd\quad\text{(平行板近似)}`
            }
          ]
        },
        {
          id: "field-energy",
          title: "电场能量与能量密度",
          summary: "能量既可由电荷和电容计算，也可理解为储存在电场所在空间。",
          cards: [
            {
              id: "capacitor-energy",
              type: "formula",
              title: "电容器的储能",
              formula: String.raw`W_e=\frac{Q^2}{2C}
=\frac12CU^2
=\frac12QU`
            },
            {
              id: "energy-density",
              type: "formula",
              title: "电场能量密度",
              body: [
                "单位体积内的电场能量称为能量密度。均匀场中总能量等于能量密度乘体积。",
                "在线性各向同性介质中，能量密度也可写成 $\\frac12\\vec D\\cdot\\vec E$。"
              ],
              formula: String.raw`w_e=\frac12\varepsilon E^2
=\frac12\frac{D^2}{\varepsilon}
=\frac12\vec D\cdot\vec E`
            },
            {
              id: "parallel-plate-energy",
              type: "formula",
              title: "平行板电容的能量",
              body: [
                "平行板场区体积为 $V=Sd$，直接乘能量密度也能得到 $\\frac12CU^2$。",
                "这体现了能量不是集中在极板上，而是分布在整个电场空间。"
              ],
              formula: String.raw`W_e=\frac12\varepsilon E^2Sd
=\frac12CU^2`
            },
            {
              id: "energy-work",
              type: "judgment",
              title: "插入介质时能量怎样变化",
              bullets: [
                "电池断开、电荷固定：插入介质使 $C$ 增大，$W=Q^2/(2C)$ 减小，减少的能量主要来自介质受到的电场吸力做功。",
                "电池连接、电压固定：插入介质使 $C$ 增大，$W=CU^2/2$ 增大，同时电池要补充电荷并参与能量交换。",
                "判断前必须先明确哪一个是约束条件：固定 $Q$、固定 $U$，还是通过电阻缓慢变化。"
              ]
            }
          ]
        }
      ]
    }
  ]
};
