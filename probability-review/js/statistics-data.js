(function () {
  "use strict";

  const course = window.PROBABILITY_COURSE;
  if (!course) {
    throw new Error("Probability course data must load before the statistics chapter.");
  }

  course.updatedAt = "2026-11-18";
  course.subtitle = "从事件与随机变量出发，进一步用样本推断总体";
  course.chapters.push({
    id: "mathematical-statistics",
    number: "05",
    title: "数理统计基础",
    english: "Mathematical Statistics",
    accent: "indigo",
    summary:
      "数理统计从有限的样本观察推断总体规律。先区分总体与样本，再构造统计量，最后利用卡方、t、F 分布研究统计量的抽样规律。",
    examFocus: [
      "总体与简单随机样本",
      "经验分布函数",
      "常用统计量",
      "卡方、t、F 分布",
      "正态总体抽样分布定理"
    ],
    themes: [
      {
        id: "population-and-sample",
        title: "总体、样本与经验分布",
        summary:
          "总体是研究对象的全部可能观察值；样本是从总体中抽出的有限个观察值。统计的任务是用有限信息推断总体。",
        cards: [
          {
            id: "statistics-purpose",
            type: "definition",
            title: "数理统计研究什么",
            body: [
              "现实中通常只能观察有限个对象，却希望推断全部对象的规律。数理统计研究怎样有效收集、整理和分析这些有限资料。",
              "统计推断主要包括两类任务：参数估计和假设检验。前者根据数据估计未知参数，后者根据数据判断关于参数的命题是否合理。"
            ]
          },
          {
            id: "population-individual",
            type: "definition",
            title: "总体、个体与容量",
            body: [
              "总体是研究对象的某项数量指标的全部可能观察值；每一个可能观察值称为个体。",
              "总体包含的个体个数称为容量。容量有限是有限总体，容量无限是无限总体。"
            ],
            example: {
              title: "两个直观例子",
              body: [
                "某工厂生产的一批灯泡的寿命构成一个总体，每一只灯泡的寿命是一个个体。",
                "某校全部男生身高的所有可能取值构成总体，每名男生的身高是一次个体观察。"
              ]
            }
          },
          {
            id: "sample-observation",
            type: "definition",
            title: "样本与样本观察值",
            body: [
              "从总体中抽取的一部分个体称为样本。抽样前，每个 $X_i$ 都是随机变量，所以样本 $(X_1,\\ldots,X_n)$ 是一个 $n$ 维随机变量。",
              "完成观察后得到具体数 $(x_1,\\ldots,x_n)$，称为样本的一次观察值。公式中的大写 $X_i$ 和小写 $x_i$ 要区分。"
            ]
          },
          {
            id: "simple-random-sample",
            type: "definition",
            title: "简单随机样本",
            body: [
              "若 $X_1,\\ldots,X_n$ 相互独立，并且都与总体 $X$ 有相同分布，则称它们为容量为 $n$ 的简单随机样本。",
              "独立表示一次抽样结果不影响另一次；同分布表示每次抽取都来自同一个总体。"
            ],
            formula: String.raw`X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}X`
          },
          {
            id: "sample-joint-distribution",
            type: "formula",
            title: "样本的联合分布",
            body: [
              "独立且同分布，使联合分布等于各次观察的分布直接相乘。",
              "若总体分布函数为 $F$，样本的联合分布函数就是各 $F(x_i)$ 的乘积；若总体密度为 $f$，联合密度也是乘积。"
            ],
            formula: String.raw`F^*(x_1,\ldots,x_n)=\prod_{i=1}^nF(x_i),
\qquad
f^*(x_1,\ldots,x_n)=\prod_{i=1}^nf(x_i)`
          },
          {
            id: "empirical-distribution-function",
            type: "formula",
            title: "经验分布函数：用频率近似概率",
            body: [
              "把样本从小到大排列为 $x_1\\le\\cdots\\le x_n$。经验分布函数 $F_n(x)$ 统计样本中不超过 $x$ 的比例。",
              "它是一条阶梯函数：小于最小值时为 0，越过一个样本值就增加 $1/n$，达到最大值后为 1。"
            ],
            formula: String.raw`F_n(x)=
\begin{cases}
0, & x<x_1,\\
\dfrac{k}{n}, & x_k\le x<x_{k+1},\\
1, & x_n\le x.
\end{cases}`
          },
          {
            id: "empirical-convergence",
            type: "property",
            title: "样本越大，经验分布越接近总体分布",
            body: [
              "对任意实数 $x$，当样本容量趋于无穷时，$F_n(x)$ 以概率 1 一致收敛到总体分布函数 $F(x)$。",
              "这为“用样本推断总体”提供了理论基础：样本足够大时，样本中的累计频率可以近似总体概率。"
            ]
          }
        ]
      },
      {
        id: "statistics-and-moments",
        title: "统计量与常用统计量",
        summary:
          "统计量只能由样本和已知量组成，不能含有未知参数。样本均值、方差和矩是最常用的统计量。",
        cards: [
          {
            id: "statistic-definition",
            type: "definition",
            title: "统计量：不能含未知参数",
            body: [
              "若 $g(X_1,\\ldots,X_n)$ 只由样本决定，不含有未知参数，则称它是一个统计量。",
              "统计量本身是随机变量；把样本观察值代入后得到的具体数值称为统计量的观察值。已知参数可以出现在统计量中，未知参数不可以。"
            ],
            formula: String.raw`T=g(X_1,\ldots,X_n)`
          },
          {
            id: "sample-mean",
            type: "formula",
            title: "样本均值：总体平均水平的估计",
            body: [
              "样本均值是最常用的位置统计量，反映样本中心。",
              "若总体均值为 $\\mu$，方差为 $\\sigma^2$，则 $E(\\bar X)=\\mu$，$D(\\bar X)=\\sigma^2/n$。"
            ],
            formula: String.raw`\bar X=\frac1n\sum_{i=1}^nX_i`
          },
          {
            id: "sample-variance",
            type: "formula",
            title: "样本方差为什么除以 $n-1$",
            body: [
              "样本方差衡量样本围绕样本均值的波动。使用 $n-1$ 后，$S^2$ 的期望等于总体方差 $\\sigma^2$，因此它是无偏估计。",
              "若除以 $n$，得到的是 $S_n^2$。它的期望为 $(n-1)\\sigma^2/n$，通常偏小。"
            ],
            formula: String.raw`S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2,
\qquad
S=\sqrt{S^2}`
          },
          {
            id: "sample-moments",
            type: "formula",
            title: "样本原点矩与中心矩",
            body: [
              "$k$ 阶原点矩用样本值 $X_i^k$ 的平均描述总体原点矩；$k$ 阶中心矩用 $(X_i-\\bar X)^k$ 的平均描述围绕样本均值的矩。",
              "一阶原点矩就是样本均值；二阶中心矩与样本方差只差系数。"
            ],
            formula: String.raw`A_k=\frac1n\sum_{i=1}^nX_i^k,
\qquad
B_k=\frac1n\sum_{i=1}^n(X_i-\bar X)^k`
          },
          {
            id: "statistic-expectations",
            type: "property",
            title: "常用统计量的期望",
            body: [
              "无偏性是在说：重复抽样很多次，统计量的平均值等于要估计的总体参数。",
              "只要样本独立同分布，$\\bar X$ 的期望就是总体均值，方差缩小为原来的 $1/n$。"
            ],
            formula: String.raw`E(\bar X)=\mu,
\qquad
D(\bar X)=\frac{\sigma^2}{n},
\qquad
E(S^2)=\sigma^2`
          },
          {
            id: "sample-variance-identity",
            type: "formula",
            title: "样本方差的快捷计算式",
            body: [
              "计算题中直接展开 $(X_i-\\bar X)^2$，常常比逐个减均值更省力。",
              "平方和分解是证明样本方差期望、构造统计量时的常用代数步骤。"
            ],
            formula: String.raw`\sum_{i=1}^n(X_i-\bar X)^2
=\sum_{i=1}^nX_i^2-n\bar X^2`
          },
          {
            id: "sample-stat-convergence",
            type: "property",
            title: "大样本下统计量会逼近总体参数",
            body: [
              "当 $n\\to\\infty$ 时，样本均值依概率收敛到总体均值，样本方差也依概率收敛到总体方差。",
              "样本 $k$ 阶原点矩在总体 $k$ 阶矩存在的条件下，也依概率收敛到总体矩。"
            ]
          }
        ]
      },
      {
        id: "sampling-distributions",
        title: "卡方、t 与 F 分布",
        summary:
          "这三个分布都由标准正态变量派生，是研究样本均值与样本方差抽样规律的核心工具。",
        cards: [
          {
            id: "chi-square-definition",
            type: "definition",
            title: "卡方分布：标准正态平方和",
            body: [
              "若 $X_1,\\ldots,X_n$ 相互独立且都服从 $N(0,1)$，它们的平方和服从自由度为 $n$ 的卡方分布。",
              "自由度可以理解为独立信息量的个数。卡方变量非负。"
            ],
            formula: String.raw`\chi^2=X_1^2+\cdots+X_n^2
\sim\chi^2(n)`
          },
          {
            id: "chi-square-properties",
            type: "property",
            title: "卡方分布的均值、方差与可加性",
            body: [
              "自由度越大，卡方分布整体向右移动并变宽。",
              "两个独立卡方变量相加，自由度直接相加。"
            ],
            formula: String.raw`E(\chi_n^2)=n,
\qquad
D(\chi_n^2)=2n,
\qquad
\chi_{n_1}^2+\chi_{n_2}^2\sim\chi^2(n_1+n_2)`
          },
          {
            id: "chi-square-normal-sample",
            type: "formula",
            title: "正态样本的离差平方和",
            body: [
              "若 $X_i\\sim N(\\mu,\\sigma^2)$，先把 $X_i$ 标准化，再平方求和，可得到卡方变量。",
              "注意这里减的是真实均值 $\\mu$，所以自由度仍是 $n$。"
            ],
            formula: String.raw`\frac1{\sigma^2}\sum_{i=1}^n(X_i-\mu)^2
\sim\chi^2(n)`
          },
          {
            id: "t-distribution",
            type: "definition",
            title: "t 分布：标准正态除以卡方根",
            body: [
              "设 $X\\sim N(0,1)$，$Y\\sim\\chi^2(n)$，且二者相互独立，则 $T=X/\\sqrt{Y/n}$ 服从 $t(n)$。",
              "t 分布关于 0 对称，尾部比标准正态更重，适合总体方差未知、需要用样本标准差替代的情形。"
            ],
            formula: String.raw`T=\frac{X}{\sqrt{Y/n}}\sim t(n)`
          },
          {
            id: "t-properties",
            type: "property",
            title: "t 分布与正态分布的关系",
            body: [
              "自由度为 $n$ 的 t 分布密度关于 0 对称；当 $n\\to\\infty$ 时趋近标准正态分布。",
              "自由度较小时尾部更厚。样本量大于约 45 时，可与标准正态分位数作较粗的近似。"
            ],
            formula: String.raw`f_T(-x)=f_T(x),
\qquad
t(n)\to N(0,1)`
          },
          {
            id: "f-distribution",
            type: "definition",
            title: "F 分布：两个卡方之比的标准化",
            body: [
              "若 $U\\sim\\chi^2(n_1)$ 与 $V\\sim\\chi^2(n_2)$ 独立，则各自除以自由度后的比值服从 $F(n_1,n_2)$。",
              "F 变量非负，两个自由度分别来自分子和分母。"
            ],
            formula: String.raw`F=\frac{U/n_1}{V/n_2}\sim F(n_1,n_2)`
          },
          {
            id: "f-properties",
            type: "property",
            title: "F 分布的倒数与分位数",
            body: [
              "交换分子、分母的自由度，F 变量取倒数。",
              "因此较小分位数常常通过较大分位数的倒数计算。"
            ],
            formula: String.raw`F\sim F(n_1,n_2)\Rightarrow\frac1F\sim F(n_2,n_1),
\qquad
F_{1-\alpha}(n_1,n_2)=\frac1{F_\alpha(n_2,n_1)}`
          }
        ]
      },
      {
        id: "normal-sampling-theorems",
        title: "正态总体的抽样分布定理",
        summary:
          "只要总体是正态分布，样本均值、样本方差就能组合出卡方、t 和 F 统计量。",
        cards: [
          {
            id: "normal-sample-mean-variance-theorem",
            type: "formula",
            title: "样本均值与样本方差的三条基本结论",
            body: [
              "样本均值仍是正态变量，但方差缩小为 $\\sigma^2/n$。",
              "对正态总体，样本均值与样本方差相互独立；离差平方和标准化后服从卡方分布。"
            ],
            formula: String.raw`\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right),
\qquad
\bar X\perp S^2,
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2(n-1)`
          },
          {
            id: "one-sample-t-theorem",
            type: "formula",
            title: "单样本 t 统计量",
            body: [
              "当总体方差未知时，用样本标准差 $S$ 替代 $\\sigma$。",
              "标准化后的分子服从标准正态，分母由卡方变量开根号并除以自由度，因此得到 $t(n-1)$。"
            ],
            formula: String.raw`T=\frac{\bar X-\mu}{S/\sqrt n}\sim t(n-1)`
          },
          {
            id: "two-sample-t-theorem",
            type: "formula",
            title: "两个独立正态样本的合并 t 检验",
            body: [
              "两个正态总体方差相同但未知时，可以用合并样本方差估计共同方差。",
              "自由度等于两组样本容量之和减 2。"
            ],
            formula: String.raw`T=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}
{S_{12}\sqrt{1/n+1/m}}\sim t(n+m-2)`
          },
          {
            id: "pooled-variance",
            type: "formula",
            title: "合并样本方差",
            body: [
              "合并方差按各自离差平方和相加，再除以两个样本方差自由度之和。",
              "它不是两个样本方差的简单算术平均，而是按自由度加权。"
            ],
            formula: String.raw`S_{12}^2=
\frac{(n-1)S_1^2+(m-1)S_2^2}{n+m-2}`
          },
          {
            id: "variance-ratio-f-theorem",
            type: "formula",
            title: "两个正态样本的方差比",
            body: [
              "两个样本方差分别标准化后都服从卡方分布，二者相除得到 F 分布。",
              "分子、分母中总体方差的排列不能写反。"
            ],
            formula: String.raw`F=\frac{S_1^2\sigma_2^2}{S_2^2\sigma_1^2}
\sim F(n-1,m-1)`
          },
          {
            id: "sampling-theorem-choice",
            type: "judgment",
            title: "看到题目怎样选分布",
            bullets: [
              "涉及样本均值的标准化且 $\\sigma$ 已知：用标准正态分布。",
              "涉及样本均值但 $\\sigma$ 未知：用单样本 t 分布。",
              "涉及一个样本的离差平方和：用卡方分布。",
              "涉及两个正态样本均值之差：考虑合并 t 分布。",
              "涉及两个样本方差之比：考虑 F 分布。"
            ]
          }
        ]
      },
      {
        id: "statistics-examples",
        title: "典型例题与解题流程",
        summary:
          "统计题先判断哪些量只是样本函数，再确认总体是否正态，最后把目标统计量改写为卡方、t 或 F 的标准结构。",
        cards: [
          {
            id: "identify-statistic-example",
            type: "example",
            title: "例题：哪些表达式能叫统计量",
            body: [
              "设 $X_1,\\ldots,X_n$ 来自 $N(\\mu,\\sigma^2)$，且 $\\mu$ 未知、$\\sigma^2$ 已知。",
              "判断标准只有一个：表达式能否完全由样本和已知参数算出。只要出现未知的 $\\mu$，就不是统计量。"
            ],
            example: {
              title: "逐个判断",
              body: [
                "$(X_1+X_n)/2$ 只含样本，是统计量。",
                "$(X_1+\\cdots+X_n)/n-\\mu$ 含有未知 $\\mu$，不是统计量。",
                "$(X_1+X_n)^2/\\sigma^2$ 中 $\\sigma^2$ 已知，是统计量。",
                "$((X_1+\\cdots+X_n)-n\\mu)/(\\sqrt n\\sigma)$ 含有未知 $\\mu$，不是统计量。"
              ]
            }
          },
          {
            id: "sample-variance-unbiased-example",
            type: "example",
            title: "例题：证明样本方差无偏",
            body: [
              "关键是使用恒等式 $\\sum(X_i-\\bar X)^2=\\sum X_i^2-n\\bar X^2$，再分别计算两项期望。",
              "因为 $E(X_i^2)=D(X_i)+[E(X_i)]^2=\\sigma^2+\\mu^2$，而 $E(\\bar X^2)=\\sigma^2/n+\\mu^2$，相减得到 $(n-1)\\sigma^2$。"
            ],
            example: {
              title: "分母为什么是 $n-1$",
              body: [
                "除以 $n-1$ 后，期望正好等于 $\\sigma^2$。",
                "除以 $n$ 得到的二阶中心矩期望是 $(n-1)\\sigma^2/n$，因此通常低估总体方差。"
              ],
              formula: String.raw`E(S^2)=\sigma^2,
\qquad
E(S_n^2)=\frac{n-1}{n}\sigma^2`
            }
          },
          {
            id: "t-statistic-example",
            type: "example",
            title: "例题：把复杂表达式认成 t 分布",
            body: [
              "看到形如“标准正态变量除以独立卡方变量除以自由度的平方根”的式子，就考虑 t 分布。",
              "先分别把分子标准化为 $N(0,1)$，把平方和变形为卡方，再检查二者是否独立。"
            ],
            example: {
              title: "常用识别路径",
              body: [
                "若含样本均值与样本标准差，通常指向 t 统计量。",
                "若含若干独立标准正态变量的平方和，通常先转到卡方分布。"
              ]
            }
          },
          {
            id: "pooled-variance-example",
            type: "example",
            title: "例题：合并样本方差的期望",
            body: [
              "两个样本方差分别无偏，因此按自由度加权后仍无偏。",
              "这解释了为什么合并 t 统计量中可以使用同一个总体方差 $\\sigma^2$。"
            ],
            example: {
              title: "期望计算",
              body: [
                "分子期望为 $(n_1-1)\\sigma^2+(n_2-1)\\sigma^2$。",
                "再除以 $n_1+n_2-2$，结果仍为 $\\sigma^2$。"
              ]
            }
          },
          {
            id: "statistics-answer-template",
            type: "judgment",
            title: "数理统计题的五步顺序",
            bullets: [
              "先分清总体参数、样本随机变量和具体观察值。",
              "判断表达式是否为统计量：有没有未知参数。",
              "确认总体是否正态，并区分方差已知还是未知。",
              "把目标式改写成标准正态、卡方、t 或 F 的定义形式。",
              "最后检查自由度、独立性、方差比方向和分位数符号。"
            ]
          },
          {
            id: "statistics-common-errors",
            type: "warning",
            title: "本章最容易混淆的地方",
            bullets: [
              "把样本随机变量 $X_i$ 与观察值 $x_i$ 混为一谈。",
              "统计量中出现未知参数仍误判为统计量。",
              "样本方差误写为除以 $n$，导致期望和无偏性错误。",
              "忘记 t 分布比标准正态尾部更厚，小样本不能直接当正态。",
              "F 分布两个自由度顺序写反，或分位数倒数关系用反。",
              "正态总体定理中的独立性条件被遗漏。"
            ]
          }
        ]
      }
    ]
  });
})();
