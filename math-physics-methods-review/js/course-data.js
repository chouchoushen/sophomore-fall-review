window.ANALOG_COURSE = {
  title: "数学物理方法",
  subtitle: "复变函数 · 解析函数 · 奇点与留数",
  updatedAt: "2026-11-01",
  chapters: [
    {
      id: "complex",
      number: "01",
      title: "复数与复变函数",
      english: "Complex Numbers & Functions",
      accent: "blue",
      summary: "先掌握复数的代数、三角和指数表示，再理解多值函数、区域、极限和连续性。",
      examFocus: ["复数四则运算", "辐角与指数形式", "乘方开方", "复变函数极限"],
      themes: [
        {
          id: "complex-algebra",
          title: "复数的表示与运算",
          summary: "同一个复数可以在直角坐标、极坐标和指数形式之间自由切换。",
          cards: [
            {
              id: "complex-definition",
              type: "definition",
              title: "复数与实部、虚部",
              body: [
                "形如 $z=x+iy$ 的数称为复数，其中 $x,y\\in\\mathbb R$，且 $i^2=-1$。",
                "$x=\\operatorname{Re}z$ 为实部，$y=\\operatorname{Im}z$ 为虚部，$\\operatorname{Im}z$ 是实数，不带 $i$。"
              ]
            },
            {
              id: "complex-operations",
              type: "formula",
              title: "复数四则运算",
              body: [
                "加减法分别处理实部和虚部；乘法按多项式展开并使用 $i^2=-1$。",
                "除法时分子、分母同乘分母的共轭复数，使分母实数化。"
              ],
              formula: String.raw`z_1z_2=(x_1x_2-y_1y_2)
+i(x_1y_2+x_2y_1),
\qquad
\frac{z_1}{z_2}
=\frac{z_1\overline{z_2}}{|z_2|^2}`
            },
            {
              id: "complex-conjugate",
              type: "formula",
              title: "共轭复数",
              body: [
                "复平面上，共轭复数关于实轴对称。共轭满足加减乘除的可分配规律。",
                "$z\\overline z=x^2+y^2$ 为非负实数。"
              ],
              formula: String.raw`\overline z=x-iy,
\qquad
z\overline z=|z|^2`
            },
            {
              id: "complex-modulus",
              type: "formula",
              title: "模与辐角",
              body: [
                "模是复数到原点的距离；辐角是实轴正方向到向量 $Oz$ 的角。",
                "非零复数的辐角有无限多个，相差 $2\\pi$ 的整数倍；通常在指定区间取主值。"
              ],
              formula: String.raw`|z|=\sqrt{x^2+y^2},
\qquad
\arg z=\theta+2k\pi,
\qquad
-\pi<\operatorname{Arg}z\le\pi`
            },
            {
              id: "polar-form",
              type: "formula",
              title: "三角形式与指数形式",
              body: [
                "$r=|z|$，$\\theta$ 可取任意一个辐角。乘法时模相乘、辐角相加；除法时模相除、辐角相减。"
              ],
              formula: String.raw`z=r(\cos\theta+i\sin\theta)=re^{i\theta}`
            },
            {
              id: "euler-formula",
              type: "formula",
              title: "欧拉公式",
              formula: String.raw`e^{i\theta}=\cos\theta+i\sin\theta,
\qquad
\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}2,
\qquad
\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}`
            },
            {
              id: "de-moivre",
              type: "formula",
              title: "棣莫弗公式与复幂",
              formula: String.raw`z^n=r^n(\cos n\theta+i\sin n\theta)
=r^ne^{in\theta}`
            },
            {
              id: "complex-roots",
              type: "formula",
              title: "复数的 n 次方根",
              body: [
                "非零复数的 $n$ 次方根有 $n$ 个互不相同的值，在复平面上均匀分布在半径为 $r^{1/n}$ 的圆上。",
                "方根是多值函数，不能只写主值。"
              ],
              formula: String.raw`z_k
=r^{1/n}
\exp\left[i\left(\frac{\theta+2k\pi}{n}\right)\right],
\qquad
k=0,1,\ldots,n-1`
            }
          ]
        },
        {
          id: "elementary-complex-functions",
          title: "初等复变函数",
          summary: "指数函数保持解析性，三角函数由指数函数定义，对数与幂函数通常具有多值性。",
          cards: [
            {
              id: "complex-exponential",
              type: "formula",
              title: "复指数函数",
              body: [
                "复指数函数在全平面解析，以 $2\\pi i$ 为纯虚周期。",
                "特别地，$e^z$ 对任意复数都不等于零。"
              ],
              formula: String.raw`e^z=e^{x+iy}=e^x(\cos y+i\sin y),
\qquad
e^{z+2\pi i}=e^z`
            },
            {
              id: "complex-trig",
              type: "formula",
              title: "复三角函数",
              body: [
                "复三角函数用指数函数定义，并在全平面解析。",
                "与实函数不同，$|\\sin z|$、$|\\cos z|$ 在复平面内可以无界。"
              ],
              formula: String.raw`\sin z=\frac{e^{iz}-e^{-iz}}{2i},
\qquad
\cos z=\frac{e^{iz}+e^{-iz}}2`
            },
            {
              id: "complex-log",
              type: "formula",
              title: "复对数函数",
              body: [
                "复对数是指数函数的反函数，因为 $e^w$ 以 $2\\pi i$ 为周期，所以对数有多值。",
                "$\\operatorname{Log}$ 通常表示取主值的对数，$z=0$ 不在定义域内。"
              ],
              formula: String.raw`\operatorname{Log}z=\ln|z|+i\arg z
=\ln|z|+i(\operatorname{Arg}z+2k\pi)`
            },
            {
              id: "log-derivative",
              type: "formula",
              title: "主值对数的导数",
              body: [
                "在去掉负实轴（或另取一条从原点出发的支割线）的区域上，主值对数解析。",
                "支割线用来阻止绕原点一周后辐角跳变。"
              ],
              formula: String.raw`\frac{\mathrm d}{\mathrm dz}\operatorname{Log}z=\frac1z`
            },
            {
              id: "complex-power",
              type: "formula",
              title: "一般复幂",
              body: [
                "一般复幂由复对数定义，通常多值；选择对数分支后才得到单值解析分支。"
              ],
              formula: String.raw`z^\alpha=e^{\alpha\operatorname{Log}z}`
            },
            {
              id: "multivalued-warning",
              type: "warning",
              title: "多值函数与分支",
              body: [
                "对数、方根和一般复幂可能在绕某个奇点一周后改变函数值，这类函数需要说明采用哪一支。",
                "主值只是规则地选取一个分支，并不消灭函数的其他值。"
              ]
            }
          ]
        },
        {
          id: "complex-sets-limits",
          title: "区域、极限与连续性",
          summary: "复变函数的极限要求从复平面所有方向趋近时得到同一个复数。",
          cards: [
            {
              id: "complex-neighborhood",
              type: "definition",
              title: "邻域与去心邻域",
              body: [
                "以 $z_0$ 为圆心、$\\varepsilon$ 为半径的开圆盘称为 $z_0$ 的 $\\varepsilon$ 邻域。",
                "去掉圆心 $z_0$ 本身后称为去心邻域，常用于讨论极限和孤立奇点。"
              ],
              formula: String.raw`0<|z-z_0|<\varepsilon`
            },
            {
              id: "open-closed-set",
              type: "definition",
              title: "开集、闭集与区域",
              body: [
                "开集不含边界；闭集包含全部边界点。",
                "连通开集称为区域；区域连同全部边界称为闭区域。区域不能分成两个不相交的非空开集。"
              ]
            },
            {
              id: "complex-limit",
              type: "formula",
              title: "复变函数的极限",
              body: [
                "若 $z$ 从任意方向趋近 $z_0$ 时，$f(z)$ 都趋近同一个复数 $A$，才记作极限为 $A$。",
                "复极限存在当且仅当实部、虚部的二元函数极限分别存在。"
              ],
              formula: String.raw`\lim_{z\to z_0}f(z)=A`
            },
            {
              id: "complex-limit-forms",
              type: "property",
              title: "常见极限形式",
              bullets: [
                "$0/0$：先因式分解、共轭有理化或洛朗展开。",
                "$\\infty/\\infty$：比较主导项，必要时做 $z=1/w$ 变换。",
                "$\\infty\\cdot0$、$\\infty-\\infty$：先通分或改写成统一分式。",
                "复变函数没有实数中的左右极限，但路径检验仍然是必要步骤。"
              ]
            },
            {
              id: "complex-continuity",
              type: "definition",
              title: "连续性",
              body: [
                "$f(z)$ 在 $z_0$ 连续需要：函数在 $z_0$ 有定义、极限存在且两者相等。",
                "复变函数可以写成 $f(z)=u(x,y)+iv(x,y)$；连续等价于 $u,v$ 在该点同时连续。"
              ],
              formula: String.raw`\lim_{z\to z_0}f(z)=f(z_0)`
            },
            {
              id: "limit-path-warning",
              type: "warning",
              title: "路径检验",
              body: [
                "如果沿两条不同路径趋近得到不同极限，就能判定极限不存在。",
                "只验证一条路径相等不能证明复极限存在；必须证明所有趋近方式。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "analytic",
      number: "02",
      title: "解析函数与复积分",
      english: "Analytic Functions & Integrals",
      accent: "teal",
      summary: "柯西–黎曼方程把复可导变成强约束；解析函数的环路积分和积分公式又由此展开。",
      examFocus: ["柯西–黎曼方程", "解析判别", "柯西积分定理", "柯西积分公式"],
      themes: [
        {
          id: "derivative-cr",
          title: "复导数与柯西–黎曼方程",
          summary: "复可导不仅要求偏导存在，还要求不同方向的差分极限完全一致。",
          cards: [
            {
              id: "complex-derivative",
              type: "definition",
              title: "复导数",
              body: [
                "若差商在 $z_0$ 的极限存在，且与 $\\Delta z$ 的趋近方向无关，则复导数存在。",
                "复可导比实二元函数可微更强，不能只检查偏导是否分别存在。"
              ],
              formula: String.raw`f'(z_0)
=\lim_{\Delta z\to0}
\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}`
            },
            {
              id: "cr-equations",
              type: "formula",
              title: "柯西–黎曼条件",
              body: [
                "设 $f=u+iv$。若 $u,v$ 在一点可微且满足 C-R 条件，则 $f$ 在该点复可导。",
                "在区域内满足 C-R 条件并具有连续偏导时，可以判定解析。"
              ],
              formula: String.raw`u_x=v_y,
\qquad
u_y=-v_x`
            },
            {
              id: "derivative-forms",
              type: "formula",
              title: "用实部和虚部表示导数",
              formula: String.raw`f'(z)=u_x+iv_x
=v_y-iu_y`
            },
            {
              id: "analytic-definition",
              type: "definition",
              title: "解析函数",
              body: [
                "若 $f$ 在 $z_0$ 的某邻域内处处可导，则称 $f$ 在 $z_0$ 解析。",
                "单点复可导不等于在该点解析；解析是邻域性质。整个平面处处解析的函数称为整函数。"
              ]
            },
            {
              id: "analytic-rules",
              type: "property",
              title: "解析函数的四则运算",
              body: [
                "两个解析函数的和、差、积仍解析；分母不为零时，商也解析。",
                "解析函数的复合仍解析，这与实数函数的可导运算规则形式相同。"
              ]
            },
            {
              id: "harmonic-function",
              type: "formula",
              title: "解析函数的实部与虚部",
              body: [
                "解析函数的实部和虚部都是调和函数，并互为共轭调和函数。",
                "反过来，在单连通区域内，若 $u$ 调和，可求虚部 $v$ 使 $u+iv$ 解析。"
              ],
              formula: String.raw`\Delta u=u_{xx}+u_{yy}=0,
\qquad
\Delta v=v_{xx}+v_{yy}=0`
            },
            {
              id: "harmonic-conjugate",
              type: "formula",
              title: "由实部求共轭虚部",
              body: [
                "先由 $v_y=u_x$ 对 $y$ 积分，再利用 $v_x=-u_y$ 确定关于 $x$ 的待定函数。"
              ],
              formula: String.raw`v(x,y)=\int u_x(x,y)\,\mathrm dy+\phi(x),
\qquad
\phi'(x)=-u_y-\frac{\partial}{\partial x}\int u_x\,\mathrm dy`
            },
            {
              id: "cr-warning",
              type: "warning",
              title: "C-R 条件的充分性",
              body: [
                "只满足 C-R 方程不一定解析；还需要相应的可微性条件。常见考试题型中，说明 $u,v$ 偏导连续后，再用 C-R 判别更稳妥。"
              ]
            }
          ]
        },
        {
          id: "complex-integrals",
          title: "复积分、柯西定理与积分公式",
          summary: "解析函数沿闭合路径的积分为零；积分公式把函数值变成边界积分。",
          figures: [
            {
              src: "./assets/source/analytic-functions-figures.jpg",
              title: "解析函数与复积分图示",
              caption: "课堂与笔记图片：复数运算、极限、解析函数和积分桥接图"
            }
          ],
          cards: [
            {
              id: "complex-contour-integral",
              type: "definition",
              title: "复积分",
              body: [
                "复积分沿有向曲线进行，路径中取小线段 $\\mathrm dz$，被积函数可含复值。",
                "起点和终点相同但方向相反的路径积分相差一个负号。"
              ],
              formula: String.raw`\int_\gamma f(z)\,\mathrm dz
=\lim_{n\to\infty}
\sum_{k=1}^n f(\xi_k)(z_k-z_{k-1})`
            },
            {
              id: "integral-properties",
              type: "property",
              title: "复积分的基本性质",
              bullets: [
                "线性性：$\\int_\\gamma(\\alpha f+\\beta g)\\,\\mathrm dz=\\alpha\\int_\\gamma f\\,\\mathrm dz+\\beta\\int_\\gamma g\\,\\mathrm dz$。",
                "换向会改变符号：$\\int_{-\\gamma}f\\,\\mathrm dz=-\\int_\\gamma f\\,\\mathrm dz$。",
                "路径可分段积分相加。",
                "反向闭合路径与正向路径的积分互为相反数。"
              ]
            },
            {
              id: "ml-estimate",
              type: "formula",
              title: "ML 积分估计",
              body: [
                "若 $|f(z)|\\le M$ 在曲线 $\\gamma$ 上成立，且曲线长度为 $L$，则积分模不超过 $ML$。",
                "这是证明大圆弧积分趋于零和估计误差时最常用的工具。"
              ],
              formula: String.raw`\left|\int_\gamma f(z)\,\mathrm dz\right|
\le ML`
            },
            {
              id: "cauchy-theorem",
              type: "formula",
              title: "柯西积分定理",
              body: [
                "解析函数在单连通区域内的任意闭合路径积分为零。",
                "若区域不是单连通，可挖去洞或把路径变形，只要变形过程不跨过奇点。"
              ],
              formula: String.raw`\oint_\gamma f(z)\,\mathrm dz=0`
            },
            {
              id: "cauchy-integral-formula",
              type: "formula",
              title: "柯西积分公式",
              body: [
                "$f$ 在简单闭合曲线 $\\gamma$ 及其内部解析，$z_0$ 在曲线内部，则函数值可由边界积分求出。",
                "方向默认逆时针；顺时针要加负号。"
              ],
              formula: String.raw`f(z_0)
=\frac1{2\pi i}
\oint_\gamma\frac{f(z)}{z-z_0}\,\mathrm dz`
            },
            {
              id: "cauchy-derivative-formula",
              type: "formula",
              title: "高阶导数的柯西公式",
              body: [
                "解析函数具有任意阶导数，高阶导数仍由边界积分表示。",
                "分母的幂次决定求导阶数；$n=1$ 时即柯西积分公式。"
              ],
              formula: String.raw`f^{(n)}(z_0)
=\frac{n!}{2\pi i}
\oint_\gamma
\frac{f(z)}{(z-z_0)^{n+1}}\,\mathrm dz`
            },
            {
              id: "contour-deformation",
              type: "judgment",
              title: "闭合路径变形",
              body: [
                "被积函数在两条路径围成的环形区域解析时，两条同向边界积分相等，但内圈与外圈作为区域边界时方向相反。",
                "计算多奇点的闭合积分时，可把大回路拆成围绕每个奇点的小回路，并分别判断方向。"
              ]
            }
          ]
        },
        {
          id: "series-laurent",
          title: "复数项级数、泰勒级数与洛朗级数",
          summary: "圆盘内用泰勒级数，去心圆环内用洛朗级数；负次幂是判断奇点的关键。",
          figures: [
            {
              src: "./assets/source/complex-analysis-outline.jpg",
              title: "复变函数论提纲",
              caption: "笔记：级数、泰勒展开、洛朗展开、孤立奇点与留数"
            }
          ],
          cards: [
            {
              id: "complex-series",
              type: "definition",
              title: "复数项级数",
              body: [
                "复级数可拆成实部级数和虚部级数；两部分都收敛时，复级数收敛。",
                "绝对收敛意味着 $\\sum|z_n|$ 收敛；绝对收敛一定收敛。"
              ],
              formula: String.raw`\sum_{n=0}^\infty z_n
=\sum_{n=0}^\infty x_n
+i\sum_{n=0}^\infty y_n`
            },
            {
              id: "series-tests",
              type: "formula",
              title: "比值与根值判别法",
              body: [
                "对幂级数，比值法得到收敛半径；根值法也常能直接给出半径。",
                "边界上的收敛性需单独判断，不能由 $|z-z_0|=R$ 直接下结论。"
              ],
              formula: String.raw`R=\lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right|,
\qquad
R=\lim_{n\to\infty}\frac1{\sqrt[n]{|a_n|}}`
            },
            {
              id: "abel-theorem",
              type: "judgment",
              title: "阿贝尔定理与收敛圆",
              body: [
                "幂级数在某个 $z_1$ 收敛，则在更靠近展开中心的圆盘内绝对收敛；若在某点发散，则在外侧更远处也发散。",
                "由此存在收敛半径 $R$；圆内必定绝对收敛，圆外必定发散，圆周上的敛散性要另作判断。"
              ]
            },
            {
              id: "taylor-series",
              type: "formula",
              title: "泰勒展开",
              body: [
                "若 $f$ 在圆盘内解析，则可在圆盘内展开成以 $z_0$ 为中心的泰勒级数。",
                "展开半径由到最近奇点的距离决定。"
              ],
              formula: String.raw`f(z)=\sum_{n=0}^\infty a_n(z-z_0)^n,
\qquad
a_n=\frac{f^{(n)}(z_0)}{n!}`
            },
            {
              id: "standard-expansions",
              type: "formula",
              title: "常用泰勒展开",
              formula: String.raw`e^z=\sum_{n=0}^\infty\frac{z^n}{n!},
\qquad
\sin z=\sum_{n=0}^\infty(-1)^n\frac{z^{2n+1}}{(2n+1)!},
\qquad
\cos z=\sum_{n=0}^\infty(-1)^n\frac{z^{2n}}{(2n)!},
\qquad
\frac1{1-z}=\sum_{n=0}^\infty z^n\ (|z|<1)`
            },
            {
              id: "more-standard-expansions",
              type: "formula",
              title: "对数与二项式展开",
              body: [
                "这里的 $\\alpha$ 可以是任意复数，广义二项式系数按 $\\binom{\\alpha}{n}=\\alpha(\\alpha-1)\\cdots(\\alpha-n+1)/n!$ 计算。",
                "两个展开的通常收敛范围都是 $|z|<1$；边界行为需具体判断。"
              ],
              formula: String.raw`\ln(1+z)
=\sum_{n=1}^{\infty}(-1)^{n-1}\frac{z^n}{n},
\qquad |z|<1,
\qquad
(1+z)^\alpha
=\sum_{n=0}^{\infty}\binom{\alpha}{n}z^n,
\qquad |z|<1`
            },
            {
              id: "laurent-series",
              type: "formula",
              title: "洛朗级数",
              body: [
                "在圆环 $R_1<|z-z_0|<R_2$ 内解析的函数可展开为含正、负次幂的洛朗级数。",
                "负次幂部分称为主要部分，正次幂部分称为解析部分；系数由沿环形区域内闭合路径的积分给出。"
              ],
              formula: String.raw`f(z)=\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n,
\qquad
a_n=\frac1{2\pi i}
\oint_\gamma\frac{f(\zeta)}{(\zeta-z_0)^{n+1}}\,\mathrm d\zeta`
            },
            {
              id: "laurent-region",
              type: "judgment",
              title: "同一个函数可在不同圆环展开",
              body: [
                "洛朗展开式依赖所选圆环；奇点会把平面分成不同解析环带。",
                "计算留数时只关心局部展开中 $z-z_0$ 的负一次幂系数，其他系数不必全部求完。"
              ]
            },
            {
              id: "laurent-warning",
              type: "warning",
              title: "不要把洛朗展开写成泰勒展开",
              body: [
                "只要展开中心是奇点，或展开区域是去心圆环，就可能出现负次幂。",
                "若错误地忽略负次幂，最终留数和闭合积分都会出错。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "residues",
      number: "03",
      title: "奇点、留数与积分应用",
      english: "Singularities & Residue Theory",
      accent: "gold",
      summary: "用洛朗级数的负次幂分类奇点，用负一次幂系数计算留数，再把留数定理用于闭合积分和实积分。",
      examFocus: ["孤立奇点分类", "极点阶数", "留数计算", "留数定理", "上半平面实积分"],
      themes: [
        {
          id: "singularity-types",
          title: "孤立奇点与分类",
          summary: "奇点类型由去心邻域内洛朗级数的主要部分决定。",
          figures: [
            {
              src: "./assets/source/isolated-singularities-slide.jpg",
              title: "孤立奇点定义与分类",
              caption: "课堂幻灯片：可去奇点、m 阶极点、本性奇点和洛朗级数主要部分"
            }
          ],
          cards: [
            {
              id: "isolated-singularity",
              type: "definition",
              title: "孤立奇点",
              body: [
                "若 $f(z)$ 在 $z_0$ 的某个去心邻域内解析，但在 $z_0$ 本身不解析，则 $z_0$ 是孤立奇点。",
                "若奇点周围任意小邻域内都有其他奇点，就不是孤立奇点，不能直接套用留数公式。"
              ]
            },
            {
              id: "removable-singularity",
              type: "property",
              title: "可去奇点",
              body: [
                "去心邻域内解析，且洛朗展开没有负次幂项。",
                "函数在该点的极限存在且有限；通过补充定义可把奇点去掉，其留数为零。"
              ],
              formula: String.raw`f(z)=\sum_{n=0}^{\infty}a_n(z-z_0)^n,
\qquad
\lim_{z\to z_0}f(z)\in\mathbb C`
            },
            {
              id: "pole",
              type: "property",
              title: "极点",
              body: [
                "洛朗展开的主要部分只有有限多个负次幂项，最高负幂为 $z-z_0$ 的 $m$ 次，则称为 $m$ 阶极点。",
                "$m$ 阶极点在局部展开中的最负项为 $a_{-m}(z-z_0)^{-m}$，并且 $z\\to z_0$ 时 $|f(z)|\\to\\infty$。"
              ],
              formula: String.raw`f(z)=\sum_{n=-m}^{\infty}a_n(z-z_0)^n,
\qquad a_{-m}\ne0`
            },
            {
              id: "essential-singularity",
              type: "property",
              title: "本性奇点",
              body: [
                "洛朗展开的主要部分含有无限多个负次幂项。",
                "本性奇点附近函数值的极限通常不存在且不为无穷，不能像极点那样用有限阶导数公式直接处理。"
              ],
              formula: String.raw`f(z)=\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n
\quad\text{(negative powers are infinite)}`
            },
            {
              id: "zero-order",
              type: "formula",
              title: "零点阶数与极点",
              body: [
                "若 $\\phi(z)$ 在 $z_0$ 有 $n$ 阶零点，$\\psi(z)$ 有 $m$ 阶零点，则 $f=\\phi/\\psi$ 在 $z_0$ 附近可能出现极点或可去奇点。",
                "具体由分子、分母零点阶数之差判断。"
              ],
              formula: String.raw`\phi(z)=(z-z_0)^n\phi_1(z),
\qquad
\psi(z)=(z-z_0)^m\psi_1(z),
\qquad
f(z)=(z-z_0)^{n-m}\frac{\phi_1(z)}{\psi_1(z)}`
            },
            {
              id: "quotient-singularity",
              type: "warning",
              title: "分式函数的分类",
              body: [
                "若分子的零点阶数 $n$ 不低于分母的零点阶数 $m$，分式通常可去或解析。",
                "若 $n<m$，则 $z_0$ 是 $m-n$ 阶极点。"
              ]
            },
            {
              id: "infinity-singularity",
              type: "definition",
              title: "无穷远点的奇点分类",
              body: [
                "研究 $f(z)$ 在 $\\infty$ 的性质时，令 $w=1/z$，等价于研究 $F(w)=f(1/w)$ 在 $w=0$ 的奇点类型。",
                "无穷远点不是普通有限点，必须通过这个变换判断。"
              ]
            }
          ]
        },
        {
          id: "residue-calculations",
          title: "留数的定义与计算",
          summary: "留数就是局部洛朗展开中 $1/(z-z_0)$ 的系数；计算题优先判断极点阶数。",
          figures: [
            {
              src: "./assets/source/residue-theory-notes.jpg",
              title: "留数理论笔记",
              caption: "笔记：留数定义、留数定理、无穷远点留数与实积分"
            }
          ],
          cards: [
            {
              id: "residue-definition",
              type: "definition",
              title: "留数",
              body: [
                "若 $f(z)$ 在 $z_0$ 的去心邻域内解析，则 $z_0$ 处的留数等于洛朗展开中 $z-z_0$ 的负一次幂系数。",
                "留数是一个复数，不一定等于函数在奇点处的值。"
              ],
              formula: String.raw`\operatorname{Res}_{z=z_0}f(z)=a_{-1}`
            },
            {
              id: "simple-pole",
              type: "formula",
              title: "简单极点留数",
              body: [
                "若 $z_0$ 是一阶极点，则可直接用根式乘回主部取极限。",
                "若 $f=P/Q$，且 $Q(z_0)=0$、$Q'(z_0)\\ne0$，常用 $P(z_0)/Q'(z_0)$。"
              ],
              formula: String.raw`\operatorname{Res}_{z=z_0}f(z)
=\lim_{z\to z_0}(z-z_0)f(z)
=\frac{P(z_0)}{Q'(z_0)}`
            },
            {
              id: "m-pole-residue",
              type: "formula",
              title: "m 阶极点留数",
              body: [
                "若 $z_0$ 是 $m$ 阶极点，需要先乘 $(z-z_0)^m$，再求 $m-1$ 阶导数。",
                "很多题目直接洛朗展开比高阶求导更快；尤其是低阶极点。"
              ],
              formula: String.raw`\operatorname{Res}_{z=z_0}f(z)
=\frac1{(m-1)!}
\lim_{z\to z_0}
\frac{\mathrm d^{m-1}}{\mathrm dz^{m-1}}
\left[(z-z_0)^m f(z)\right]`
            },
            {
              id: "higher-residue-example",
              type: "example",
              title: "例题：三阶极点与二阶极点",
              body: [
                "分别计算 $f_1(z)=\\dfrac{\\cos z}{4z^3}$ 与 $f_2(z)=\\dfrac{\\sin z}{4z^3}$ 在 $z=0$ 的留数。",
                "先看分子在 $z=0$ 的行为：$\\cos z$ 不取零，$\\sin z$ 有一阶零点。"
              ],
              example: {
                title: "展开验证",
                body: [
                  "f1 的洛朗展开：$\\frac1{4z^3}(1-\\frac{z^2}{2!}+\\cdots)=\\frac1{4z^3}-\\frac1{8z}+\\cdots$，所以留数为 $-\\frac18$。",
                  "$f_2(z)=\\frac1{4z^3}(z-\\frac{z^3}{3!}+\\cdots)=\\frac1{4z^2}-\\frac1{24}+\\cdots$，没有 $1/z$ 项，所以留数为 $0$。"
                ],
                formula: String.raw`\operatorname{Res}_{0}f_1=-\frac18,
\qquad
\operatorname{Res}_{0}f_2=0`
              }
            },
            {
              id: "residue-theorem",
              type: "formula",
              title: "留数定理",
              body: [
                "若 $f$ 在简单闭合曲线内部除有限个孤立奇点外解析，在闭合曲线上解析且方向为逆时针，则积分等于各奇点留数之和的 $2\\pi i$ 倍。",
                "若曲线为顺时针，积分整体多一个负号。"
              ],
              formula: String.raw`\oint_\gamma f(z)\,\mathrm dz
=2\pi i\sum_{k=1}^n\operatorname{Res}_{z=z_k}f(z)`
            },
            {
              id: "residue-infinity",
              type: "formula",
              title: "无穷远点留数",
              body: [
                "无穷远点留数通过 $w=1/z$ 化为有限点的留数，符号不可漏掉。",
                "在某些实积分或全平面求和问题中，无穷远点留数可以替代逐个计算有限奇点。"
              ],
              formula: String.raw`\operatorname{Res}_{z=\infty}f(z)
=-\operatorname{Res}_{w=0}\left(\frac1{w^2}f\left(\frac1w\right)\right)`
            },
            {
              id: "extended-residue-sum",
              type: "formula",
              title: "扩充平面留数总和",
              body: [
                "若函数在扩充平面上只有有限个孤立奇点，则所有有限奇点和无穷远点的留数代数和为零。",
                "可以用这个关系检验多个留数的计算结果。"
              ],
              formula: String.raw`\sum_{k}\operatorname{Res}_{z=z_k}f(z)
+\operatorname{Res}_{z=\infty}f(z)=0`
            },
            {
              id: "residue-warning",
              type: "warning",
              title: "留数计算的三个易错点",
              bullets: [
                "没有先判断奇点阶数，套错高阶公式。",
                "闭合曲线方向为顺时针却忘记负号。",
                "无穷远点留数使用 $f(1/w)$ 时漏除 $w^2$。"
              ]
            }
          ]
        },
        {
          id: "real-integral-applications",
          title: "用留数计算实积分",
          summary: "把实轴上的积分补成上半平面的大闭合路径，再只收集上半平面的留数。",
          figures: [
            {
              src: "./assets/source/residue-examples.jpg",
              title: "留数定理计算例题",
              caption: "课堂例题：复合极点留数与闭合积分"
            }
          ],
          cards: [
            {
              id: "real-line-integral",
              type: "formula",
              title: "实轴上的有理积分",
              body: [
                "若 $f(x)$ 在实轴无奇点，在上半平面只有有限个孤立奇点，并且在大半圆上满足使弧积分趋于零的条件，则实轴积分等于上半平面留数和的 $2\\pi i$ 倍。",
                "常见条件是 $|z f(z)|\\to0$ 一致；具体题目要先说明补成大回路的弧积分消失。"
              ],
              formula: String.raw`\int_{-\infty}^{\infty}f(x)\,\mathrm dx
=2\pi i\sum_{\operatorname{Im}z_k>0}
\operatorname{Res}_{z=z_k}f(z)`
            },
            {
              id: "upper-half-plane-choice",
              type: "judgment",
              title: "选择上半平面还是下半平面",
              body: [
                "实轴积分通常选择上半平面，因为闭合路径的边界方向容易统一。",
                "若选择下半平面，要与顺时针方向一起调整符号。"
              ]
            },
            {
              id: "residue-circle-example",
              type: "example",
              title: "例题：圆内留数积分",
              body: [
                "计算 $I=\\displaystyle\\oint_{|z|=2}\\frac{e^z}{z(z-1)^2}\\,\\mathrm dz$。",
                "$z=0$ 是简单极点，$z=1$ 是二阶极点，二者都在 $|z|=2$ 内。"
              ],
              example: {
                title: "展开计算",
                body: [
                  "$\\operatorname{Res}_{0}f=\\lim_{z\\to0}e^z/(z-1)^2=1$。",
                  "$\\operatorname{Res}_{1}f=\\frac1{(2-1)!}\\lim_{z\\to1}\\frac{\\mathrm d}{\\mathrm dz}\\frac{e^z}{z}=0$。",
                  "所以 $I=2\\pi i(1+0)=2\\pi i$。"
                ],
                formula: String.raw`I=2\pi i`
              }
            },
            {
              id: "rational-integral-example",
              type: "example",
              title: "例题：∫ dx/(1+x²)",
              body: [
                "用上半平面的大闭合路径计算 $\\displaystyle\\int_{-\\infty}^{\\infty}\\frac{\\mathrm dx}{1+x^2}$。",
                "被积函数在 $z=\\pm i$ 有简单极点，只有 $z=i$ 在上半平面。"
              ],
              example: {
                title: "展开计算",
                body: [
                  "$\\operatorname{Res}_{z=i}\\frac1{1+z^2}=\\frac1{2i}$。",
                  "所以积分 $=2\\pi i\\cdot\\frac1{2i}=\\pi$。",
                  "实函数直接积分也得到 $\\arctan x$ 从 $-\\infty$ 到 $\\infty$ 的结果为 $\\pi$，可作为交叉检查。"
                ]
              }
            },
            {
              id: "trig-integral-scope",
              type: "warning",
              title: "含三角函数的无穷积分",
              body: [
                "当前这份课堂笔记把含有三角函数的无穷积分标为不考，因此本页重点保留有理函数的实轴积分。",
                "若后续课程扩展该题型，需要额外使用约当引理（Jordan lemma）判断大圆弧上的积分。"
              ]
            },
            {
              id: "residue-integral-checklist",
              type: "judgment",
              title: "实积分留数法检查表",
              bullets: [
                "实轴上有无极小圆绕开的奇点？",
                "上半平面极点是否全部找到？",
                "大圆弧积分为什么趋于零？",
                "闭合方向、留数求和和 $2\\pi i$ 系数是否一致？",
                "最后用对称性、正性或数值符号检查结果。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "pde",
      number: "04",
      title: "数学物理方程与定解条件",
      english: "PDEs & Well-Posed Problems",
      accent: "rose",
      summary: "先由物理守恒或运动规律建立波动、热传导和静电场方程，再用初始条件与边界条件确定唯一物理过程。",
      examFocus: ["三类典型方程", "初始条件数量", "三类边界条件", "定解问题的完整表述"],
      themes: [
        {
          id: "pde-models",
          title: "三类典型数学物理方程",
          summary: "同一个未知函数 u 可以表示位移、温度或电势；偏微分方程描述它在空间和时间中怎样变化。",
          figures: [
            {
              src: "./assets/source/pde-definition-notes.jpg",
              title: "定解问题物理内容笔记",
              caption: "笔记：弦振动、热传导、泊松方程以及初始条件和边界条件"
            },
            {
              src: "./assets/source/pde-examples-figures.jpg",
              title: "三类方程与初始条件图示",
              caption: "课堂图片：弦振动、热传导、泊松方程和初始条件例题"
            }
          ],
          cards: [
            {
              id: "pde-definition",
              type: "definition",
              title: "什么是偏微分方程",
              body: [
                "偏微分方程（PDE）是含有未知多元函数及其偏导数的方程。这里的未知函数通常写成 $u(x,t)$、$V(x,y,z)$ 等。",
                "“解 PDE”不是只找到一个代数数，而是找到满足方程、定义域以及附加条件的函数。",
                "物理方程只描述一般规律；要确定某个具体过程，还必须告诉系统一开始是什么状态，以及边界上受什么控制。"
              ]
            },
            {
              id: "wave-equation-model",
              type: "formula",
              title: "弦振动方程：描述传播与振荡",
              body: [
                "细长柔软弦作小幅横振动时，可以只研究横向位移 $u(x,t)$。对小振幅、小斜率且张力近似恒定，得到一维波动方程。",
                "$a$ 是波速：$a^2=T/\\rho$；$T$ 为张力，$\\rho$ 为线密度。$f$ 表示单位质量所受外力折算后的强迫项。",
                "没有外力时 $f=0$，称齐次波动方程；初始扰动会分成向左右传播的两列波。"
              ],
              formula: String.raw`u_{tt}=a^2u_{xx}+f,
\qquad
a^2=\frac{T}{\rho}`
            },
            {
              id: "wave-equation-3d",
              type: "formula",
              title: "三维波动方程",
              body: [
                "在三维介质中，拉普拉斯算子 $\\Delta u=u_{xx}+u_{yy}+u_{zz}$ 表示所有空间方向的曲率效应。",
                "$F$ 是单位体积外力，$\\rho$ 是体密度，则强迫项近似为 $F/\\rho$。"
              ],
              formula: String.raw`u_{tt}=a^2\Delta u+f,
\qquad
f=\frac{F}{\rho}`
            },
            {
              id: "heat-equation-model",
              type: "formula",
              title: "热传导方程：描述扩散与趋于均匀",
              body: [
                "均匀细杆侧面绝热、温度只沿长度方向变化时，温度 $u(x,t)$ 由热传导方程描述。",
                "热量总是从高温区流向低温区，因此温度曲线的凹性决定该点温度升高还是降低；这体现扩散、平滑效应。",
                "$c_p$ 为定压比热容，$\\rho$ 为密度，$k$ 为热导率，$F$ 为单位体积热源功率。"
              ],
              formula: String.raw`u_t=D u_{xx}+f,
\qquad
D=\frac{k}{\rho c_p},
\qquad
f=\frac{F}{\rho c_p}`
            },
            {
              id: "heat-equation-3d",
              type: "formula",
              title: "三维热传导方程",
              formula: String.raw`u_t=D\Delta u+f`
            },
            {
              id: "poisson-equation",
              type: "formula",
              title: "泊松方程：描述稳态场",
              body: [
                "在介电常数为 $\\varepsilon$ 的空间中，由电荷体密度 $\\rho_e$ 产生静电场，电势 $V$ 满足泊松方程。",
                "该方程没有时间导数，描述的是已经稳定的电势分布，而不是随时间演化的过程。",
                "符号与电势和电荷的约定有关；本课程采用正电荷密度对应负拉普拉斯项的形式。"
              ],
              formula: String.raw`\Delta V=-\frac{\rho_e}{\varepsilon}`
            },
            {
              id: "laplace-equation",
              type: "formula",
              title: "拉普拉斯方程：无自由电荷的稳态场",
              body: [
                "当区域中没有自由电荷 $\\rho_e=0$ 时，泊松方程退化为拉普拉斯方程。",
                "在没有源的空区域，电势由边界上的取值控制；内部不会自行产生新的极值。"
              ],
              formula: String.raw`\Delta V=0`
            },
            {
              id: "three-pdes-comparison",
              type: "judgment",
              title: "三类方程一眼区分",
              bullets: [
                "$u_{tt}=a^2\\Delta u+f$：二阶时间导数，波动方程，有惯性、会来回振荡。",
                "$u_t=D\\Delta u+f$：一阶时间导数，热传导方程，随时间扩散和平滑。",
                "$\\Delta u=-\\rho_e/\\varepsilon$：没有时间导数，泊松方程，求稳态场。",
                "$\\Delta u=0$：无源稳态场，是泊松方程的特例。"
              ]
            }
          ]
        },
        {
          id: "initial-boundary-conditions",
          title: "为什么需要定解条件",
          summary: "PDE 给出普遍规律，初始条件和边界条件挑选出某个具体物理过程。",
          cards: [
            {
              id: "why-conditions",
              type: "definition",
              title: "定解问题",
              body: [
                "只写 PDE 通常不足以确定唯一解。例如同一条弦，不同初始形状会形成完全不同的波形。",
                "“定解问题” = 偏微分方程 + 定义域 + 初始条件 + 边界条件。有时还可能有接口条件、无穷远条件或周期性条件。",
                "条件既不能少到留下大量可能解，也不能彼此矛盾到没有解。具体需要哪些条件，由物理过程和方程结构决定。"
              ]
            },
            {
              id: "initial-condition-count",
              type: "judgment",
              title: "初始条件要写几个",
              body: [
                "如果方程对时间 $t$ 的最高阶导数是 $n$，就需要 $n$ 个独立的初始条件。",
                "二阶时间导数需要初始函数值和初始一阶时间导数；一阶时间导数只需要初始函数值。",
                "这里的“初始”必须是随时间演化的问题；泊松、拉普拉斯这类稳态问题没有时间变量，也就没有时间初始条件。"
              ]
            },
            {
              id: "wave-initial",
              type: "formula",
              title: "波动方程：需要形状和速度",
              body: [
                "$u(x,0)$ 给出弦一开始的形状；$u_t(x,0)$ 给出每一点一开始的竖直速度。",
                "只给初始形状不够，因为相同的弯形可能正在向上、向下或静止运动。"
              ],
              formula: String.raw`u(x,0)=\varphi(x),
\qquad
u_t(x,0)=\psi(x)`
            },
            {
              id: "heat-initial",
              type: "formula",
              title: "热传导方程：只需初始温度",
              body: [
                "热方程只出现一阶时间导数，因此一个初始温度分布就能确定之后温度的演化。",
                "热方程本身决定冷却或升温速度，不需要额外指定“初始升温速度”。"
              ],
              formula: String.raw`u(x,0)=\varphi(x)`
            },
            {
              id: "steady-no-initial",
              type: "warning",
              title: "稳态方程没有时间初值",
              body: [
                "泊松方程和拉普拉斯方程描述已经稳定的场，时间不进入方程，因此不能写 $V(x,y,0)$ 作为初值。",
                "这些问题的“挑选信息”主要来自边界电势、边界法向导数或导体电位等空间边界条件。"
              ]
            },
            {
              id: "boundary-condition-role",
              type: "definition",
              title: "边界条件控制外界影响",
              body: [
                "边界条件说明系统与外界怎样交换信息：端点是否固定、温度是否维持、边界是否绝热、是否有热流。",
                "空间二阶方程通常需要每个空间方向的边界信息；一个一维区间 $0<x<l$ 通常要在 $x=0$ 与 $x=l$ 两端各给出一项边界条件。"
              ]
            },
            {
              id: "initial-boundary-together",
              type: "judgment",
              title: "初始与边界的分工",
              bullets: [
                "初始条件回答：$t=0$ 时系统在哪里、怎样运动。",
                "边界条件回答：在整个时间过程中，系统的端点受到什么约束。",
                "PDE 回答：区域内部怎样随时间或空间变化。",
                "三者共同组成一个明确的物理问题。"
              ]
            }
          ]
        },
        {
          id: "boundary-types",
          title: "三类边界条件与完整例题",
          summary: "固定函数值、固定法向导数、给出两者组合，对应三类最常见的线性边界条件。",
          cards: [
            {
              id: "dirichlet-condition",
              type: "formula",
              title: "第一类边界条件：固定 u",
              body: [
                "边界上直接指定未知函数的取值，称为 Dirichlet 条件。",
                "弦的端点位移固定、杆端温度维持恒定、导体表面电势固定，都属于第一类条件。"
              ],
              formula: String.raw`u(0,t)=\mu_1(t),
\qquad
u(l,t)=\mu_2(t)`
            },
            {
              id: "neumann-condition",
              type: "formula",
              title: "第二类边界条件：固定法向导数",
              body: [
                "边界上指定 $u$ 的外法向导数 $\\partial u/\\partial n$，称为 Neumann 条件。",
                "对热传导，法向导数对应边界热流；$\\partial u/\\partial n=0$ 表示绝热，没有热量穿过边界。"
              ],
              formula: String.raw`\left.\frac{\partial u}{\partial n}\right|_{\partial\Omega}
=g(t)`
            },
            {
              id: "robin-condition",
              type: "formula",
              title: "第三类边界条件：函数值与导数组合",
              body: [
                "边界上同时涉及 $u$ 与其法向导数，通常写成两者线性组合，称为 Robin 条件。",
                "牛顿冷却边界中，边界热流与物体表面和环境温度之差有关，就会出现这种组合。"
              ],
              formula: String.raw`\left(
\alpha u+\beta\frac{\partial u}{\partial n}
\right)_{\partial\Omega}=\mu(t)`
            },
            {
              id: "boundary-physical",
              type: "judgment",
              title: "看到物理条件先翻译数学条件",
              bullets: [
                "“端点固定” → $u=0$（第一类）。",
                "“端点温度保持为 $T_0$” → $u=T_0$（第一类）。",
                "“侧面绝热” → 法向热流为零，即 $\\partial u/\\partial n=0$（第二类）。",
                "“与外界按牛顿定律散热” → 温度与法向梯度成线性关系（第三类）。"
              ]
            },
            {
              id: "wave-well-posed-example",
              type: "example",
              title: "完整例子：两端固定的弦",
              body: [
                "长度 $l$ 的弦两端固定，给初始形状和初始速度，求 $u(x,t)$。",
                "这里 PDE 描述弦内部振动，两个空间端点的边界条件描述固定端，两个初始条件描述 $t=0$ 的状态。"
              ],
              example: {
                title: "完整写出定解问题",
                body: [
                  "$0<x<l,\\ t>0$：$u_{tt}=a^2u_{xx}$。",
                  "边界：$u(0,t)=u(l,t)=0$。",
                  "初始：$u(x,0)=\\varphi(x)$，$u_t(x,0)=\\psi(x)$。",
                  "其中初始形状和速度还应在端点处满足与固定边界相容的条件。"
                ],
                formula: String.raw`\begin{cases}
u_{tt}=a^2u_{xx}, & 0<x<l,\ t>0,\\
u(0,t)=u(l,t)=0, & t\ge0,\\
u(x,0)=\varphi(x),\quad u_t(x,0)=\psi(x), & 0\le x\le l.
\end{cases}`
              }
            },
            {
              id: "heat-well-posed-example",
              type: "example",
              title: "完整例子：两端温度固定的细杆",
              body: [
                "细杆 $0<x<l$，两端温度分别维持在 $T_1,T_2$，初始温度为 $\\varphi(x)$。"
              ],
              example: {
                title: "完整写出定解问题",
                body: [
                  "内部满足 $u_t=Du_{xx}$。",
                  "两端 $u(0,t)=T_1$，$u(l,t)=T_2$。",
                  "初始仅需 $u(x,0)=\\varphi(x)$；热方程是一阶时间方程。"
                ],
                formula: String.raw`\begin{cases}
u_t=Du_{xx}, & 0<x<l,\ t>0,\\
u(0,t)=T_1,\quad u(l,t)=T_2, & t\ge0,\\
u(x,0)=\varphi(x), & 0\le x\le l.
\end{cases}`
              }
            },
            {
              id: "poisson-boundary-example",
              type: "example",
              title: "完整例子：区域内的静电场",
              body: [
                "在区域 $\\Omega$ 内给定自由电荷密度 $\\rho_e$，边界电势已知。",
                "因为没有时间演化，只需泊松方程和空间边界条件，不写初始条件。"
              ],
              example: {
                title: "完整写出边值问题",
                body: [
                  "$\\Delta V=-\\rho_e/\\varepsilon$ in $\\Omega$。",
                  "$V=V_0$ on $\\partial\\Omega$。",
                  "这是第一类边值问题；若边界给的是法向电场 $\\partial V/\\partial n$，则属于第二类。"
                ]
              }
            },
            {
              id: "conditions-common-errors",
              type: "warning",
              title: "定解问题常见错误",
              bullets: [
                "波动方程只写一个初始条件，漏掉初始速度。",
                "给热方程多写一个初始温度变化率。",
                "给泊松方程硬加时间初始条件。",
                "在区间两端漏写边界条件，或把绝热误写成温度为零。",
                "边界条件和初始条件在角落处相互矛盾，例如固定弦端却有非零初始位移。"
              ]
            }
          ]
        }
      ]
    }
  ]
};
