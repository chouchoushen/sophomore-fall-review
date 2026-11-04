(function () {
  "use strict";

  const course = window.PROBABILITY_COURSE;
  if (!course) {
    throw new Error("Probability course data must load before the numerical characteristics chapter.");
  }

  course.updatedAt = "2026-11-04";
  course.subtitle = "从事件语言到多维分布，再用数字特征概括随机规律";
  course.chapters.push({
    id: "numerical-characteristics",
    number: "04",
    title: "随机变量的数字特征",
    english: "Numerical Characteristics",
    accent: "indigo",
    summary:
      "用数学期望描述平均水平，用方差描述离散程度，再用协方差和相关系数描述两个随机变量之间的线性联系。",
    examFocus: [
      "数学期望",
      "常见分布的数字特征",
      "方差及性质",
      "协方差与相关系数",
      "不相关与独立"
    ],
    introFigure: {
      src: "./assets/numerical-characteristics/chapter-overview.jpg",
      title: "随机变量的数字特征 · 章节导览",
      caption:
        "按数学期望、二维函数期望、期望性质、方差公式与性质、协方差和相关系数整理的章节总览。"
    },
    themes: [
      {
        id: "mathematical-expectation",
        title: "数学期望",
        summary:
          "数学期望把随机变量的取值按概率加权平均；离散型用求和，连续型用积分。",
        cards: [
          {
            id: "num-expectation-basics",
            type: "definition",
            title: "数学期望的定义",
            body: [
              "离散型随机变量以每个取值的概率加权求和；连续型随机变量以概率密度为权重作积分。无论哪种形式，数学期望刻画的都是随机变量的长期平均水平。",
              "若相应的绝对和或绝对积分收敛，则称数学期望存在。计算时先确认随机变量的类型、取值范围与概率分布。"
            ],
            formula: String.raw`E(X)=\sum_k x_kp_k,
\qquad
E(X)=\int_{-\infty}^{+\infty}xf(x)\,\mathrm dx`
          },
          {
            id: "num-zero-one-binomial-expectation",
            type: "formula",
            title: "0–1 分布与二项分布的期望",
            body: [
              "0–1 分布的期望等于成功概率 $p$；二项分布可看作 $n$ 次独立 0–1 试验之和，因此期望为 $np$。"
            ],
            formula: String.raw`X\sim B(1,p):E(X)=p,
\qquad
X\sim B(n,p):E(X)=np`,
            example: {
              title: "课堂例题与推导",
              body: [
                "先由期望定义计算 0–1 分布，再利用二项式系数的恒等式完成二项分布期望的求和推导。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/expectation-zero-one.jpg",
                  title: "例 2：0–1 分布的数学期望",
                  caption: "按 $P(X=1)=p$、$P(X=0)=1-p$ 直接代入期望定义。"
                },
                {
                  src: "./assets/numerical-characteristics/expectation-binomial.jpg",
                  title: "例 3：二项分布的数学期望",
                  caption: "从二项分布律出发，整理组合数并利用二项式定理得到 $np$。"
                }
              ]
            }
          },
          {
            id: "num-poisson-expectation",
            type: "formula",
            title: "泊松分布的期望",
            body: [
              "泊松分布的期望等于参数 $\\lambda$。求和时利用指数函数的泰勒展开，将剩余级数化为 $e^{\\lambda}$。"
            ],
            formula: String.raw`X\sim P(\lambda):E(X)=\lambda`,
            example: {
              title: "课堂例题与推导",
              body: [
                "利用 $\\sum_{k=1}^{\\infty}\\lambda^{k-1}/(k-1)!=e^{\\lambda}$ 完成泊松分布期望的化简。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/expectation-poisson.jpg",
                  title: "例 4：泊松分布的数学期望",
                  caption: "从泊松分布律代入期望定义，并通过级数展开得到参数 $\\lambda$。"
                }
              ]
            }
          },
          {
            id: "num-continuous-common-expectation",
            type: "formula",
            title: "均匀分布与指数分布的期望",
            body: [
              "均匀分布 $R(a,b)$ 的期望落在区间中点；参数为 $\\lambda$ 的指数分布期望为 $1/\\lambda$。两者都应由对应密度函数积分得到。",
              "积分时尤其要正确写出密度函数的非零区间。"
            ],
            formula: String.raw`X\sim R(a,b):E(X)=\frac{a+b}{2},
\qquad
X\sim E(\lambda):E(X)=\frac1{\lambda}`,
            example: {
              title: "课堂例题与推导",
              body: [
                "分别对均匀密度和指数密度作积分，观察均匀分布的期望为什么正好是区间中点。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/expectation-uniform.jpg",
                  title: "例 7：均匀分布的数学期望",
                  caption: "将均匀密度代入期望定义，积分结果正好位于区间中点。"
                },
                {
                  src: "./assets/numerical-characteristics/expectation-exponential.jpg",
                  title: "例 8：指数分布的数学期望",
                  caption: "利用分部积分，由指数密度求得期望 $1/\\lambda$。"
                }
              ]
            }
          },
          {
            id: "num-normal-expectation",
            type: "formula",
            title: "正态分布的期望",
            body: [
              "正态分布 $N(\\mu,\\sigma^2)$ 的第一个参数 $\\mu$ 就是数学期望。积分时令 $t=(x-\\mu)/\\sigma$，再分别处理偶函数项与奇函数项。"
            ],
            formula: String.raw`X\sim N(\mu,\sigma^2):E(X)=\mu`,
            example: {
              title: "课堂例题与推导",
              body: [
                "先写出正态分布密度并代入期望定义，再用标准化变量拆分积分，奇函数在整个实轴上的积分为零。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/expectation-normal-setup.jpg",
                  title: "例 9：正态分布的数学期望（建立积分）",
                  caption: "把正态密度代入期望定义，准备作变量代换。"
                },
                {
                  src: "./assets/numerical-characteristics/expectation-normal-result.jpg",
                  title: "例 9：正态分布的数学期望（完成计算）",
                  caption: "拆分积分后得到 $\\mu$，说明正态分布的第一个参数就是均值。"
                }
              ]
            }
          },
          {
            id: "num-function-expectation",
            type: "formula",
            title: "二维随机变量函数的期望",
            body: [
              "求 $E[g(X,Y)]$ 时，不必先求出 $g(X,Y)$ 的边缘分布，可以直接用 $(X,Y)$ 的联合分布对 $g(x,y)$ 加权。",
              "离散型使用联合分布律的双重求和；连续型使用联合概率密度的二重积分。"
            ],
            formula: String.raw`E[g(X,Y)]=\sum_i\sum_j g(x_i,y_j)p_{ij},
\qquad
E[g(X,Y)]=\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}
g(x,y)f(x,y)\,\mathrm dx\,\mathrm dy`,
            example: {
              title: "课堂定义与适用范围",
              body: [
                "离散与连续两种定义并列，积分和求和的权重都来自联合分布。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/expectation-two-dimensional-function.jpg",
                  title: "二维随机变量函数的数学期望",
                  caption: "离散型按联合分布律求和，连续型按联合密度积分。"
                }
              ]
            }
          },
          {
            id: "num-expectation-properties",
            type: "property",
            title: "数学期望的性质",
            body: [
              "常数、数乘、加法和独立性是化简期望计算的四条主线。",
              "对任意随机变量都有线性性；乘积期望拆成乘积则额外要求 $X,Y$ 相互独立。"
            ],
            formula: String.raw`E(C)=C,\qquad E(CX)=CE(X),\qquad
E(X+Y)=E(X)+E(Y),
\qquad
X\perp Y\Rightarrow E(XY)=E(X)E(Y)`,
            example: {
              title: "课堂证明",
              body: [
                "四条性质都由期望定义推出，线性性对离散型和连续型随机变量都成立。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/expectation-properties-1.jpg",
                  title: "期望性质：常数与数乘",
                  caption: "证明 $E(C)=C$ 与 $E(CX)=CE(X)$。"
                },
                {
                  src: "./assets/numerical-characteristics/expectation-properties-2.jpg",
                  title: "期望性质：线性性与独立性",
                  caption: "验证加法线性性；只有相互独立时才能把乘积的期望拆开。"
                }
              ]
            }
          }
        ]
      },
      {
        id: "variance-and-moments",
        title: "方差与常见数字特征",
        summary:
          "方差描述随机变量围绕期望的波动大小；常见分布的均值和方差可以直接用于快速判断与验算。",
        cards: [
          {
            id: "num-variance-definition",
            type: "definition",
            title: "方差的定义与计算公式",
            body: [
              "方差定义为随机变量与其数学期望之差的平方的期望，反映取值围绕均值的稳定程度。",
              "计算时常用 $D(X)=E(X^2)-[E(X)]^2$，通常比直接按定义展开更方便。"
            ],
            formula: String.raw`D(X)=E\left[(X-E(X))^2\right]
=E(X^2)-[E(X)]^2`,
            note:
              "方差非负；标准差为 $\\sqrt{D(X)}$，与随机变量本身具有相同量纲。"
          },
          {
            id: "num-variance-properties",
            type: "property",
            title: "方差的性质",
            body: [
              "常数没有波动；乘常数时，平方会提到方差外面；相互独立随机变量的和或差，其方差等于各变量方差之和。",
              "若 $X,Y$ 不独立，两个变量线性组合的方差还必须加入协方差交叉项。"
            ],
            formula: String.raw`D(C)=0,\qquad D(CX)=C^2D(X),
\qquad
X\perp Y\Rightarrow D(X\pm Y)=D(X)+D(Y)`,
            example: {
              title: "课堂证明与推广",
              body: [
                "从方差定义和期望线性性出发，可以证明常数、数乘以及独立随机变量和差的性质；最后一条给出方差为零与几乎必然取常数的关系。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/variance-properties-1.jpg",
                  title: "方差性质：常数与数乘",
                  caption: "证明 $D(C)=0$ 与 $D(CX)=C^2D(X)$。"
                },
                {
                  src: "./assets/numerical-characteristics/variance-properties-2.jpg",
                  title: "方差性质：独立变量之和",
                  caption: "通过展开平方项证明 $D(X\\pm Y)=D(X)+D(Y)$。"
                },
                {
                  src: "./assets/numerical-characteristics/variance-properties-3.jpg",
                  title: "方差性质：推广与零方差判定",
                  caption: "推广到多个独立变量，并说明 $D(X)=0$ 等价于 $X$ 几乎必然取常数。"
                }
              ]
            }
          },
          {
            id: "num-common-distribution-moments",
            type: "property",
            title: "常见分布的均值与方差",
            body: [
              "0–1、二项、泊松、超几何、均匀、指数和正态分布的均值与方差应能直接识别。",
              "做综合题时先用分布类型检查参数关系，再由定义计算题中额外要求的协方差或相关系数。"
            ],
            formula: String.raw`B(1,p):\ p,\ p(1-p)
\qquad
B(n,p):\ np,\ np(1-p)
\qquad
P(\lambda):\ \lambda,\ \lambda`,
            example: {
              title: "离散型与连续型分布对照表",
              body: [
                "两张表分别列出离散型与连续型常见分布的概率函数、均值和方差，适合作为综合题的最后核对。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/common-distributions-discrete.jpg",
                  title: "离散型分布的数字特征",
                  caption: "0–1、二项、泊松和超几何分布的概率函数、均值与方差。"
                },
                {
                  src: "./assets/numerical-characteristics/common-distributions-continuous.jpg",
                  title: "连续型分布的数字特征",
                  caption: "均匀、指数和正态分布的密度函数、均值与方差。"
                }
              ]
            }
          }
        ]
      },
      {
        id: "covariance-correlation",
        title: "协方差与相关系数",
        summary:
          "协方差保留两个随机变量偏离各自均值的同向或反向信息，相关系数再把这种联系标准化。",
        cards: [
          {
            id: "num-covariance-definition",
            type: "definition",
            title: "协方差的定义",
            body: [
              "协方差描述两个随机变量的线性联动方向：同向偏离为正，反向偏离为负。",
              "平方展开后得到最常用的计算式 $\\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)$。"
            ],
            formula: String.raw`\operatorname{Cov}(X,Y)
=E\left[(X-E(X))(Y-E(Y))\right]
=E(XY)-E(X)E(Y)`
          },
          {
            id: "num-correlation-coefficient",
            type: "definition",
            title: "相关系数",
            body: [
              "相关系数用两个随机变量的标准差对协方差作标准化，取值满足 $|\\rho_{XY}|\\le1$。",
              "它只衡量线性相关程度；$|\\rho_{XY}|$ 越接近 1，线性关系越强。"
            ],
            formula: String.raw`\rho_{XY}
=\frac{\operatorname{Cov}(X,Y)}
{\sqrt{D(X)}\sqrt{D(Y)}}`
          },
          {
            id: "num-independence-uncorrelated",
            type: "warning",
            title: "不相关与相互独立",
            body: [
              "$\\rho_{XY}=0$ 或 $\\operatorname{Cov}(X,Y)=0$ 只说明两个变量不线性相关；相互独立则要求联合分布能够分解。",
              "独立一定不相关，但不相关通常不能推出独立。只有联合正态等特殊情形，不相关才与独立等价。"
            ],
            bullets: [
              "$X,Y$ 相互独立 $\\Rightarrow \\operatorname{Cov}(X,Y)=0$。",
              "$\\operatorname{Cov}(X,Y)=0$ 不一定能推出 $X,Y$ 相互独立。",
              "一般随机变量线性组合的方差：$D(aX+bY)=a^2D(X)+b^2D(Y)+2ab\\operatorname{Cov}(X,Y)$。"
            ],
            example: {
              title: "协方差与相关系数计算示例",
              body: [
                "先用联合分布表求边缘分布与各项期望，再计算协方差和相关系数；同时对照“独立”与“不相关”的区别。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/covariance-worked-example.jpg",
                  title: "协方差与相关系数的板书计算",
                  caption:
                    "包含离散二维随机变量的期望、方差、协方差、相关系数，以及独立性与不相关性的判断。"
                }
              ]
            }
          },
          {
            id: "num-exercise-4-20",
            type: "example",
            title: "例题 4.20：三角形区域上的数字特征",
            body: [
              "随机变量 $(X,Y)$ 在区域 $G=\\{(x,y)\\mid 0<x<1,\\ 0<y<x\\}$ 上服从均匀分布，求 $E(X)$、$D(X)$、$\\operatorname{Cov}(X,Y)$ 和 $\\rho_{XY}$。",
              "由于支撑区域是三角形而不是矩形，$X$ 与 $Y$ 的取值相互限制，不能仅凭边缘分布判断二者独立。"
            ],
            example: {
              title: "题面与板书解答",
              body: [
                "先由区域面积确定联合密度 $f(x,y)=2$，再分别求边缘密度、二阶矩、协方差和相关系数。",
                "板书中还补充了 $P(X+Y<1)$ 与独立性判断。"
              ],
              figures: [
                {
                  src: "./assets/numerical-characteristics/exercise-4-20-problem.jpg",
                  title: "4.20 题面（仅截取本题）",
                  caption: "三角形均匀分布，求期望、方差、协方差与相关系数。"
                },
                {
                  src: "./assets/numerical-characteristics/exercise-4-20-solution.jpg",
                  title: "4.20 板书解答",
                  caption:
                    "依次求边缘分布、$E(X),E(X^2),E(Y),E(Y^2),E(XY)$、协方差和相关系数。"
                }
              ]
            }
          }
        ]
      }
    ]
  });
})();
