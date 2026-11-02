window.PROBABILITY_COURSE = {
  title: "概率论",
  subtitle: "从事件语言到多维分布，一条可以反复查阅的知识主线",
  updatedAt: "2026-11-01",
  chapters: [
    {
      id: "events",
      number: "01",
      title: "随机事件与概率",
      english: "Events & Probability",
      accent: "brick",
      summary: "先建立样本空间、事件与概率语言，再掌握古典概型、条件概率、全概率、贝叶斯公式和独立性。",
      examFocus: ["事件运算", "古典概型", "条件概率", "全概率与贝叶斯", "事件独立性"],
      themes: [
        {
          id: "event-language",
          title: "随机试验与事件语言",
          summary: "概率论的第一层工作，是把自然语言中的“可能发生”翻译成集合与事件运算。",
          cards: [
            {
              id: "random-trial",
              type: "definition",
              title: "随机现象与随机试验",
              body: [
                "在一定条件下可能出现不同结果，且试验前无法确定具体结果的现象，称为<strong>随机现象</strong>。",
                "满足可重复、结果已知但不可预判、每次只出现一个结果的试验，称为<strong>随机试验</strong>，通常记为 $E$。"
              ],
              bullets: [
                "“结果可能不同”不等于“结果完全不可描述”。",
                "概率研究的是结果的总体规律，不负责预测某一次实验的确定结果。"
              ]
            },
            {
              id: "sample-space",
              type: "definition",
              title: "样本点与样本空间",
              body: [
                "随机试验的每一个不可再分结果称为<strong>样本点</strong>，记作 $\\omega$。",
                "所有样本点组成的集合称为<strong>样本空间</strong>。"
              ],
              formula: String.raw`\Omega=\{\omega_1,\omega_2,\ldots\}`
            },
            {
              id: "random-events",
              type: "definition",
              title: "随机事件、基本事件、必然事件与不可能事件",
              body: [
                "样本空间的子集称为<strong>随机事件</strong>。事件发生，当且仅当试验结果落在该子集中。",
                "只含一个样本点的事件称为<strong>基本事件</strong>；样本空间 $\\Omega$ 是必然事件；空集 $\\varnothing$ 是不可能事件。"
              ],
              example: {
                title: "掷一枚骰子",
                body: [
                  "样本空间是 $\\Omega=\\{1,2,3,4,5,6\\}$。",
                  "事件 $A=\\{2,4,6\\}$ 表示“掷出偶数”；事件 $B=\\{1,2\\}$ 表示“点数不超过 2”。"
                ]
              }
            },
            {
              id: "event-relations",
              type: "definition",
              title: "包含、相等、和、交与差",
              body: [
                "$A\\subset B$：$A$ 发生必然导致 $B$ 发生。若二者互相包含，则 $A=B$。",
                "$A\\cup B$：至少一个发生；$A\\cap B$ 或 $AB$：同时发生；$A-B$：$A$ 发生而 $B$ 不发生。"
              ],
              formula: String.raw`A-B=A\cap \overline B`
            },
            {
              id: "exclusive-opposite",
              type: "judgment",
              title: "互斥事件与对立事件",
              body: [
                "若 $AB=\\varnothing$，称 $A,B$ <strong>互斥</strong>：二者不能同时发生。",
                "若 $AB=\\varnothing$ 且 $A\\cup B=\\Omega$，称 $A,B$ <strong>对立</strong>。对立一定互斥，但互斥不一定对立。"
              ],
              formula: String.raw`A\cap\overline A=\varnothing,\qquad A\cup\overline A=\Omega`
            },
            {
              id: "de-morgan",
              type: "formula",
              title: "事件运算的德摩根律",
              body: [
                "“交不发生”等价于“至少一个不发生”；“并不发生”等价于“全部不发生”。"
              ],
              formula: String.raw`\overline{A\cap B}=\overline A\cup\overline B,\qquad
\overline{A\cup B}=\overline A\cap\overline B`
            }
          ]
        },
        {
          id: "probability-measure",
          title: "概率、古典概型与几何概型",
          summary: "频率描述经验规律，公理定义保证数学结构，古典与几何概型提供两种最常用的计算路径。",
          cards: [
            {
              id: "frequency",
              type: "definition",
              title: "频率",
              body: [
                "在 $n$ 次重复试验中，事件 $A$ 发生 $m$ 次，则 $m/n$ 称为事件 $A$ 的频率。",
                "频率依赖具体试验；随着试验次数增大，它通常稳定在某个值附近。"
              ],
              formula: String.raw`f_n(A)=\frac{m}{n},\qquad 0\le f_n(A)\le 1`
            },
            {
              id: "probability-axioms",
              type: "definition",
              title: "概率的公理化定义",
              body: [
                "概率是定义在事件域上的集合函数：非负性保证概率不为负；规范性规定必然事件概率为 1；可列可加性处理互不相容事件。"
              ],
              formula: String.raw`P(A)\ge0,\quad P(\Omega)=1,\quad
P\left(\bigcup_{i=1}^{\infty}A_i\right)=\sum_{i=1}^{\infty}P(A_i)`
            },
            {
              id: "probability-properties",
              type: "property",
              title: "概率的基本性质",
              body: [
                "概率具有补事件、单调性和可加性。若 $A\\subset B$，则 $P(B-A)=P(B)-P(A)$。"
              ],
              formula: String.raw`P(\varnothing)=0,\quad P(\overline A)=1-P(A),
\quad A\subset B\Rightarrow P(A)\le P(B)`
            },
            {
              id: "addition-formula",
              type: "formula",
              title: "加法公式",
              body: [
                "两个事件的和事件概率不能直接把两个概率相加，因为交集会被重复计算。"
              ],
              formula: String.raw`P(A\cup B)=P(A)+P(B)-P(AB)`
            },
            {
              id: "classical-probability",
              type: "formula",
              title: "古典概型",
              body: [
                "若样本空间只有有限个等可能样本点，则事件 $A$ 的概率等于 $A$ 包含的样本点数除以样本点总数。"
              ],
              formula: String.raw`P(A)=\frac{|A|}{|\Omega|}`
            },
            {
              id: "counting",
              type: "formula",
              title: "排列与组合",
              body: [
                "有顺序地选取用排列；不考虑顺序地选取用组合。古典概型题目的关键通常是判断“选取是否分顺序”。"
              ],
              formula: String.raw`A_n^k=\frac{n!}{(n-k)!},\qquad C_n^k=\frac{n!}{k!(n-k)!}`
            },
            {
              id: "ball-model",
              type: "judgment",
              title: "摸球模型：有放回与无放回",
              body: [
                "有放回时，每次摸球后总体保持不变，适合二项分布；无放回时，总体持续减少，适合超几何分布。",
                "依次抽取并记录顺序时考虑排列；一次性取出一组球时使用组合。"
              ]
            },
            {
              id: "geometric-probability",
              type: "formula",
              title: "几何概型",
              body: [
                "样本空间是长度、面积或体积有限的几何区域，且样本点均匀分布。事件概率等于事件区域度量与总区域度量之比。"
              ],
              formula: String.raw`P(A)=\frac{L(A)}{L(\Omega)}`
            },
            {
              id: "zero-probability",
              type: "warning",
              title: "概率为 0 不等于不可能",
              body: [
                "连续型随机变量取某个单点的概率为 0，但该点仍可能被取到。",
                "同理，概率为 1 不一定等于必然事件。不能由概率值反向断言集合是否为空。"
              ]
            }
          ]
        },
        {
          id: "conditional-probability",
          title: "条件概率、全概率与贝叶斯",
          summary: "已知部分信息后概率如何更新，是概率论最重要的计算链条之一。",
          cards: [
            {
              id: "conditional-definition",
              type: "definition",
              title: "条件概率",
              body: [
                "在事件 $A$ 已发生的条件下，事件 $B$ 发生的条件概率，是把样本空间收缩到 $A$ 后重新计算比例。"
              ],
              formula: String.raw`P(B\mid A)=\frac{P(AB)}{P(A)},\qquad P(A)>0`
            },
            {
              id: "multiplication",
              type: "formula",
              title: "乘法公式",
              body: [
                "条件概率公式移项后可连续展开，用于处理“先发生 A，再在 A 条件下发生 B”的串联事件。"
              ],
              formula: String.raw`P(AB)=P(A)P(B\mid A)`
            },
            {
              id: "multiplication-chain",
              type: "formula",
              title: "多事件乘法公式",
              body: [
                "多个事件同时发生的概率，可以按发生顺序逐层乘以条件概率。"
              ],
              formula: String.raw`P(A_1A_2\cdots A_n)
=P(A_1)P(A_2\mid A_1)\cdots P(A_n\mid A_1\cdots A_{n-1})`
            },
            {
              id: "partition",
              type: "definition",
              title: "完备事件组与样本空间划分",
              body: [
                "若 $B_1,\\ldots,B_n$ 两两互斥，并且它们的并为整个样本空间，则它们构成一个<strong>完备事件组</strong>或样本空间划分。",
                "全概率公式和贝叶斯公式通常都需要一个合理的划分。"
              ],
              formula: String.raw`B_iB_j=\varnothing\ (i\ne j),\qquad
\bigcup_{i=1}^nB_i=\Omega`
            },
            {
              id: "total-probability",
              type: "formula",
              title: "全概率公式",
              body: [
                "当直接求 $P(A)$ 困难时，先按不同来源或情景 $B_i$ 分类，再把每种情景下的贡献相加。"
              ],
              formula: String.raw`P(A)=\sum_{i=1}^{n}P(A\mid B_i)P(B_i)`
            },
            {
              id: "bayes",
              type: "formula",
              title: "贝叶斯公式",
              body: [
                "已知结果 $A$ 发生，反推它来自哪个原因 $B_i$。分子是对应分支的概率，分母是结果的总概率。"
              ],
              formula: String.raw`P(B_i\mid A)=
\frac{P(A\mid B_i)P(B_i)}
{\sum_{j=1}^{n}P(A\mid B_j)P(B_j)}`
            },
            {
              id: "bayes-example",
              type: "example",
              title: "贝叶斯公式：检测阳性不等于患病概率",
              body: [
                "某病患病率 $1\\%$，检测灵敏度 $95\\%$，假阳性率 $5\\%$。若某人检测阳性，需要比较“真阳性”与“全部阳性”的概率。"
              ],
              formula: String.raw`P(D\mid +)=
\frac{0.95\times0.01}
{0.95\times0.01+0.05\times0.99}
\approx16.1\%`
            }
          ]
        },
        {
          id: "independence",
          title: "事件独立性与伯努利概型",
          summary: "独立性描述信息不改变概率；伯努利概型是把重复独立试验压缩成一个公式。",
          cards: [
            {
              id: "independent-events",
              type: "definition",
              title: "两个事件相互独立",
              body: [
                "若一个事件是否发生不改变另一个事件的条件概率，则两个事件相互独立。",
                "等价地，联合发生的概率等于各自概率的乘积。"
              ],
              formula: String.raw`P(AB)=P(A)P(B),\qquad P(B\mid A)=P(B)\quad(P(A)>0)`
            },
            {
              id: "complement-independence",
              type: "property",
              title: "独立事件的补事件仍独立",
              body: [
                "若 $A,B$ 独立，则 $\\overline A,B$；$A,\\overline B$；$\\overline A,\\overline B$ 也分别独立。"
              ]
            },
            {
              id: "pairwise-vs-mutual",
              type: "warning",
              title: "两两独立不推出相互独立",
              body: [
                "三个事件两两满足乘积公式，并不意味着三者联合满足乘积公式。",
                "相互独立要求所有非空子集的联合概率都等于对应边缘概率的乘积。"
              ],
              formula: String.raw`P(ABC)=P(A)P(B)P(C)`
            },
            {
              id: "bernoulli-trials",
              type: "formula",
              title: "n 重伯努利试验",
              body: [
                "每次试验只有“成功/失败”两种结果，成功概率恒为 $p$，各次试验相互独立。",
                "在 $n$ 次试验中恰好成功 $k$ 次的概率由二项分布给出。"
              ],
              formula: String.raw`P_n(k)=C_n^k p^k(1-p)^{n-k},\qquad k=0,1,\ldots,n`
            }
          ]
        }
      ]
    },
    {
      id: "variables",
      number: "02",
      title: "随机变量及其分布",
      english: "Random Variables & Distributions",
      accent: "forest",
      summary: "把随机结果映射成数值，用分布函数、概率分布或概率密度完整描述随机规律。",
      examFocus: ["分布函数", "二项/泊松/正态", "密度函数", "标准化", "随机变量函数"],
      themes: [
        {
          id: "rv-foundation",
          title: "随机变量与分布函数",
          summary: "随机变量把样本空间映射到实数轴，分布函数则统一描述离散与连续两类变量。",
          cards: [
            {
              id: "rv-definition",
              type: "definition",
              title: "随机变量",
              body: [
                "设随机试验的样本空间为 $\\Omega$。若对每个样本点 $\\omega\\in\\Omega$，都有唯一实数 $X(\\omega)$ 与之对应，则称 $X$ 是<strong>随机变量</strong>。",
                "随机变量是“样本空间到实数”的函数，它的取值遵循一定概率规律。"
              ],
              formula: String.raw`X:\Omega\to\mathbb R`
            },
            {
              id: "rv-classification",
              type: "judgment",
              title: "离散型与非离散型",
              body: [
                "取值只有有限个或可列无限个的随机变量称为<strong>离散型随机变量</strong>。",
                "能连续充满某个区间的随机变量称为<strong>连续型随机变量</strong>。非离散型不全是连续型，但基础课程主要研究这两类。"
              ]
            },
            {
              id: "distribution-function",
              type: "definition",
              title: "分布函数",
              body: [
                "分布函数给出随机变量落在 $(-\\infty,x]$ 内的概率，适用于任意类型随机变量。"
              ],
              formula: String.raw`F_X(x)=P(X\le x),\qquad x\in\mathbb R`
            },
            {
              id: "cdf-properties",
              type: "property",
              title: "分布函数的四条性质",
              body: [
                "分布函数有界、单调不减、右连续，并在负无穷处趋于 0、正无穷处趋于 1。"
              ],
              formula: String.raw`0\le F(x)\le1,\quad F(-\infty)=0,\quad F(+\infty)=1`
            },
            {
              id: "cdf-interval",
              type: "formula",
              title: "用分布函数求区间概率",
              body: [
                "注意左端是否取等号。标准写法 $P(x_1<X\\le x_2)$ 可直接由两个分布函数值相减。"
              ],
              formula: String.raw`P(x_1<X\le x_2)=F(x_2)-F(x_1)`
            },
            {
              id: "pmf",
              type: "definition",
              title: "离散型随机变量的概率分布律",
              body: [
                "离散型随机变量由每个可能取值及其概率完整描述。所有概率非负且总和为 1。"
              ],
              formula: String.raw`P(X=x_k)=p_k,\qquad p_k\ge0,\qquad \sum_k p_k=1`
            },
            {
              id: "density",
              type: "definition",
              title: "概率密度函数",
              body: [
                "若存在非负函数 $f(x)$，使分布函数可写成其变上限积分，则 $f(x)$ 是概率密度函数。",
                "密度值本身不是概率；密度曲线在区间上的面积才是概率。"
              ],
              formula: String.raw`F(x)=\int_{-\infty}^{x}f(t)\,dt`
            },
            {
              id: "density-properties",
              type: "property",
              title: "概率密度的充要条件",
              body: [
                "非负且全轴积分为 1，是判断一个函数能否作为概率密度的充要条件。"
              ],
              formula: String.raw`f(x)\ge0,\qquad \int_{-\infty}^{+\infty}f(x)\,dx=1`
            }
          ]
        },
        {
          id: "discrete-distributions",
          title: "常见离散型分布",
          summary: "先识别试验结构，再匹配分布名称和参数，最后代入概率公式。",
          cards: [
            {
              id: "zero-one",
              type: "formula",
              title: "0–1 分布与两点分布",
              body: [
                "一次试验只有成功和失败两种结果，用 1 表示成功、0 表示失败。"
              ],
              formula: String.raw`P(X=k)=p^k(1-p)^{1-k},\qquad k=0,1`
            },
            {
              id: "binomial",
              type: "formula",
              title: "二项分布",
              body: [
                "$n$ 次独立重复试验，每次成功概率为 $p$。随机变量表示成功次数，则 $X\\sim B(n,p)$。"
              ],
              formula: String.raw`P(X=k)=C_n^k p^k(1-p)^{n-k},\qquad k=0,1,\ldots,n`
            },
            {
              id: "poisson",
              type: "formula",
              title: "泊松分布",
              body: [
                "泊松分布描述单位时间、面积或空间内稀有事件发生次数。参数 $\\lambda$ 是平均发生次数。"
              ],
              formula: String.raw`P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!},\qquad k=0,1,2,\ldots`
            },
            {
              id: "poisson-theorem",
              type: "property",
              title: "泊松定理：二项分布的稀有事件近似",
              body: [
                "当试验次数 $n$ 很大、单次成功概率 $p$ 很小，而 $np$ 保持适中时，二项概率可用泊松概率近似。"
              ],
              formula: String.raw`C_n^k p_n^k(1-p_n)^{n-k}\to
\frac{\lambda^k e^{-\lambda}}{k!},\qquad \lambda=np_n`
            },
            {
              id: "geometric",
              type: "formula",
              title: "几何分布",
              body: [
                "独立重复试验中，随机变量表示“第一次成功前失败的次数加一”，即首次成功所需的试验次数。"
              ],
              formula: String.raw`P(X=k)=(1-p)^{k-1}p,\qquad k=1,2,\ldots`
            },
            {
              id: "hypergeometric",
              type: "formula",
              title: "超几何分布",
              body: [
                "从含 $M$ 个目标对象、$N-M$ 个非目标对象的总体中，无放回抽取 $n$ 个，成功个数 $X$ 服从超几何分布。"
              ],
              formula: String.raw`P(X=k)=\frac{C_M^k C_{N-M}^{n-k}}{C_N^n}`
            },
            {
              id: "discrete-choice",
              type: "judgment",
              title: "离散分布的选择标准",
              body: [
                "一次二选一：0–1；固定次数中成功几次且独立：二项；单位时间稀有事件次数：泊松；等待第一次成功：几何；无放回抽样：超几何。"
              ]
            }
          ]
        },
        {
          id: "continuous-distributions",
          title: "常见连续型分布",
          summary: "均匀、指数、正态三种分布构成连续型概率的核心模型。",
          cards: [
            {
              id: "uniform",
              type: "formula",
              title: "均匀分布",
              body: [
                "随机变量在有限区间内等可能地取值，记为 $X\\sim U[a,b]$。"
              ],
              formula: String.raw`f(x)=
\begin{cases}
\dfrac1{b-a},&a\le x\le b,\\[4pt]
0,&\text{其他}.
\end{cases}`
            },
            {
              id: "uniform-cdf",
              type: "formula",
              title: "均匀分布的分布函数",
              formula: String.raw`F(x)=
\begin{cases}
0,&x<a,\\[3pt]
\dfrac{x-a}{b-a},&a\le x<b,\\[6pt]
1,&x\ge b.
\end{cases}`
            },
            {
              id: "exponential",
              type: "formula",
              title: "指数分布",
              body: [
                "指数分布常用于描述等待时间，例如设备寿命、顾客到达间隔。参数 $\\lambda>0$。"
              ],
              formula: String.raw`f(x)=
\begin{cases}
\lambda e^{-\lambda x},&x>0,\\
0,&x\le0.
\end{cases}`
            },
            {
              id: "exponential-memoryless",
              type: "property",
              title: "指数分布的无记忆性",
              body: [
                "已经等待了 $s$ 时间，并不会改变还需继续等待的条件分布。指数分布是连续型分布中具有无记忆性的典型分布。"
              ],
              formula: String.raw`P(X>s+t\mid X>s)=P(X>t)`
            },
            {
              id: "normal",
              type: "formula",
              title: "正态分布",
              body: [
                "正态分布由均值 $\\mu$ 和方差 $\\sigma^2$ 决定，密度曲线关于 $x=\\mu$ 对称，并在 $\\mu$ 处达到最高点。"
              ],
              formula: String.raw`f(x)=\frac1{\sqrt{2\pi}\sigma}
\exp\left[-\frac{(x-\mu)^2}{2\sigma^2}\right]`
            },
            {
              id: "standard-normal",
              type: "definition",
              title: "标准正态分布",
              body: [
                "$\\mu=0,\\sigma=1$ 的正态分布称为标准正态分布，其分布函数记为 $\\Phi(x)$。",
                "标准正态分布关于 0 对称，因此有 $\\Phi(0)=0.5$。"
              ],
              formula: String.raw`\Phi(-x)=1-\Phi(x)`
            },
            {
              id: "normal-standardization",
              type: "formula",
              title: "一般正态分布标准化",
              body: [
                "若 $X\\sim N(\\mu,\\sigma^2)$，先减去均值，再除以标准差，即可化为标准正态变量。"
              ],
              formula: String.raw`Z=\frac{X-\mu}{\sigma}\sim N(0,1)`
            },
            {
              id: "normal-probability",
              type: "formula",
              title: "正态分布区间概率",
              formula: String.raw`P(a<X\le b)=
\Phi\left(\frac{b-\mu}{\sigma}\right)-
\Phi\left(\frac{a-\mu}{\sigma}\right)`
            }
          ]
        },
        {
          id: "rv-functions",
          title: "随机变量函数的分布",
          summary: "已知 X 的分布，求 Y=g(X) 的分布。核心是判断映射是否一一对应，以及是否存在多对一合并。",
          cards: [
            {
              id: "discrete-transform",
              type: "definition",
              title: "离散型随机变量的函数",
              body: [
                "枚举 $X$ 的全部取值并计算 $Y=g(X)$。若多个 $X$ 取值映射到同一个 $Y$ 值，需要把对应概率相加。"
              ],
              formula: String.raw`P(Y=y)=\sum_{x:\,g(x)=y}P(X=x)`
            },
            {
              id: "cdf-transform",
              type: "formula",
              title: "分布函数法",
              body: [
                "这是最通用的方法：先写出 $F_Y(y)=P(g(X)\\le y)$，把事件转换成关于 $X$ 的不等式，再使用 $X$ 的分布。"
              ],
              formula: String.raw`F_Y(y)=P(g(X)\le y)`
            },
            {
              id: "monotone-transform",
              type: "formula",
              title: "严格单调变换的密度",
              body: [
                "若 $y=g(x)$ 严格单调且反函数为 $x=h(y)$，密度需要通过反函数和导数绝对值进行变换。"
              ],
              formula: String.raw`f_Y(y)=f_X(h(y))\left|h'(y)\right|`
            },
            {
              id: "affine-example",
              type: "example",
              title: "线性变换 $Y=2X+1$",
              body: [
                "反函数为 $x=(y-1)/2$，导数为 $dx/dy=1/2$。",
                "所以 $f_Y(y)=\\frac12 f_X((y-1)/2)$。若 $X\\sim U[0,1]$，则 $Y\\sim U[1,3]$。"
              ]
            },
            {
              id: "merge-probability",
              type: "warning",
              title: "多对一映射要合并概率",
              body: [
                "例如 $Y=X^2$ 对 $X=1$ 与 $X=-1$ 会给出同一个 $Y=1$。此时不能直接套单调反函数公式，必须把两段概率合并。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "joint",
      number: "03",
      title: "多维随机变量及其分布",
      english: "Multivariate Random Variables",
      accent: "indigo",
      summary: "把多个随机变量放在同一个概率空间中，研究联合规律、边缘规律、条件规律与独立性。",
      examFocus: ["联合分布函数", "联合密度", "边缘分布", "条件分布", "独立性"],
      themes: [
        {
          id: "joint-foundation",
          title: "二维随机变量与联合分布",
          summary: "二维随机变量把每个样本点映射成有序实数对；联合分布描述两个变量共同取值的规律。",
          cards: [
            {
              id: "two-dimensional-rv",
              type: "definition",
              title: "二维随机变量",
              body: [
                "若对每个样本点 $\\omega\\in\\Omega$，都有有序实数对 $(X(\\omega),Y(\\omega))$ 与之对应，则 $(X,Y)$ 称为二维随机变量。",
                "$(X,Y)$ 的分布不仅包含两个变量各自的规律，还包含它们共同变化的关联信息。"
              ]
            },
            {
              id: "joint-cdf",
              type: "definition",
              title: "联合分布函数",
              body: [
                "二维随机变量同时落入左下方区域的概率，称为联合分布函数。"
              ],
              formula: String.raw`F(x,y)=P(X\le x,\ Y\le y)`
            },
            {
              id: "joint-cdf-properties",
              type: "property",
              title: "联合分布函数的性质",
              body: [
                "联合分布函数关于每个变量分别单调不减、分别右连续；在每一条轴上趋于 0，在正无穷处趋于 1。",
                "矩形概率由四个角点的联合分布函数值交替相减得到。"
              ],
              formula: String.raw`P(x_1<X\le x_2,\ y_1<Y\le y_2)
=F(x_2,y_2)-F(x_1,y_2)-F(x_2,y_1)+F(x_1,y_1)`
            },
            {
              id: "joint-pmf",
              type: "definition",
              title: "离散型二维随机变量的联合分布律",
              body: [
                "离散型二维随机变量由全部可能取值点及对应联合概率构成。所有联合概率非负且总和为 1。"
              ],
              formula: String.raw`p_{ij}=P(X=x_i,Y=y_j),\qquad
p_{ij}\ge0,\qquad\sum_i\sum_jp_{ij}=1`
            },
            {
              id: "joint-density",
              type: "definition",
              title: "连续型二维随机变量与联合概率密度",
              body: [
                "若存在非负函数 $f(x,y)$，使联合分布函数等于二重积分，则 $f(x,y)$ 为联合概率密度。",
                "概率等于密度曲面在区域上的体积。"
              ],
              formula: String.raw`F(x,y)=\int_{-\infty}^{x}\int_{-\infty}^{y}f(u,v)\,du\,dv`
            },
            {
              id: "joint-density-properties",
              type: "property",
              title: "联合密度的性质",
              formula: String.raw`f(x,y)\ge0,\qquad
\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}f(x,y)\,dx\,dy=1`
            },
            {
              id: "region-probability",
              type: "formula",
              title: "二维区域概率",
              body: [
                "求连续型二维随机变量落入平面区域 $D$ 的概率，就是求联合密度在 $D$ 上的二重积分。"
              ],
              formula: String.raw`P((X,Y)\in D)=\iint_D f(x,y)\,dx\,dy`
            }
          ]
        },
        {
          id: "marginal-distribution",
          title: "边缘分布",
          summary: "联合分布中只看一个变量时，另一个变量已被“汇总”掉，得到边缘分布。",
          cards: [
            {
              id: "marginal-pmf-x",
              type: "formula",
              title: "离散情形：X 的边缘分布",
              body: [
                "固定 $X=x_i$，把所有可能的 $Y$ 取值对应的联合概率相加。矩阵表示中就是该行求和。"
              ],
              formula: String.raw`p_{i\cdot}=P(X=x_i)=\sum_j p_{ij}`
            },
            {
              id: "marginal-pmf-y",
              type: "formula",
              title: "离散情形：Y 的边缘分布",
              formula: String.raw`p_{\cdot j}=P(Y=y_j)=\sum_i p_{ij}`
            },
            {
              id: "marginal-density-x",
              type: "formula",
              title: "连续情形：X 的边缘密度",
              body: [
                "对联合密度关于 $y$ 积分，把 $y$ 的影响汇总掉，得到 $X$ 的边缘密度。"
              ],
              formula: String.raw`f_X(x)=\int_{-\infty}^{+\infty}f(x,y)\,dy`
            },
            {
              id: "marginal-density-y",
              type: "formula",
              title: "连续情形：Y 的边缘密度",
              formula: String.raw`f_Y(y)=\int_{-\infty}^{+\infty}f(x,y)\,dx`
            },
            {
              id: "marginal-warning",
              type: "warning",
              title: "边缘分布不等于联合分布",
              body: [
                "两个边缘分布只描述各自变量，丢掉了变量之间的关联。",
                "已知 $f_X(x)$ 与 $f_Y(y)$ 一般不能还原 $f(x,y)$；只有再加上独立性等额外条件才可以。"
              ]
            }
          ]
        },
        {
          id: "joint-common",
          title: "二维均匀、正态与条件分布",
          summary: "在联合分布已知后，可以把其中一个变量固定，研究另一个变量的条件规律。",
          cards: [
            {
              id: "bivariate-uniform",
              type: "definition",
              title: "二维均匀分布",
              body: [
                "若二维随机变量在平面区域 $D$ 上均匀分布，其联合密度在 $D$ 内为常数，在区域外为 0。"
              ],
              formula: String.raw`f(x,y)=
\begin{cases}
\dfrac1{S_D},&(x,y)\in D,\\[5pt]
0,&(x,y)\notin D.
\end{cases}`
            },
            {
              id: "bivariate-normal",
              type: "definition",
              title: "二维正态分布",
              body: [
                "二维正态分布由两个均值、两个标准差以及相关系数 $\\rho$ 决定。",
                "$\\rho=0$ 时，二维正态变量相互独立。二维正态的等高线通常是椭圆。"
              ]
            },
            {
              id: "conditional-pmf",
              type: "definition",
              title: "离散型条件分布律",
              body: [
                "在 $Y=y_j$ 且其边缘概率大于 0 的条件下，$X$ 的条件概率等于对应点的联合概率除以 $Y$ 的边缘概率。"
              ],
              formula: String.raw`P(X=x_i\mid Y=y_j)=\frac{p_{ij}}{p_{\cdot j}}`
            },
            {
              id: "conditional-density",
              type: "definition",
              title: "连续型条件密度",
              body: [
                "当 $f_Y(y)>0$ 时，用联合密度除以 $Y$ 的边缘密度，得到给定 $Y=y$ 后 $X$ 的条件密度。"
              ],
              formula: String.raw`f_{X\mid Y}(x\mid y)=\frac{f(x,y)}{f_Y(y)}`
            },
            {
              id: "conditional-note",
              type: "warning",
              title: "条件密度在基础考试中通常不是主线",
              body: [
                "应会写定义并理解“固定一个变量后看另一个变量”，但不必把大量时间放在复杂条件密度的积分技巧上。"
              ]
            }
          ]
        },
        {
          id: "joint-independence",
          title: "随机变量的相互独立性",
          summary: "联合规律能否由两个边缘规律相乘得到，是独立性的核心判断。",
          cards: [
            {
              id: "joint-independent-definition",
              type: "definition",
              title: "二维随机变量相互独立",
              body: [
                "若 $X,Y$ 的联合分布函数恒等于两个边缘分布函数的乘积，则称 $X,Y$ 相互独立。"
              ],
              formula: String.raw`F(x,y)=F_X(x)F_Y(y)\qquad\forall x,y`
            },
            {
              id: "independent-pmf",
              type: "judgment",
              title: "离散型独立判据",
              formula: String.raw`p_{ij}=p_{i\cdot}p_{\cdot j}\qquad\forall i,j`
            },
            {
              id: "independent-density",
              type: "judgment",
              title: "连续型独立判据",
              body: [
                "若联合密度可分解成一个只含 $x$ 的非负函数与一个只含 $y$ 的非负函数的乘积，并且支撑区域是矩形，则两个变量独立。"
              ],
              formula: String.raw`f(x,y)=f_X(x)f_Y(y)\quad\text{a.e.}`
            },
            {
              id: "triangular-support",
              type: "example",
              title: "三角支撑区域通常不独立",
              body: [
                "若联合密度只在 $0<y<x<1$ 内非零，则 $X,Y$ 的可取范围互相限制。",
                "支撑集不是矩形时，通常可以直接判断不独立；若想严谨验证，仍需检查联合分布或密度能否分解。"
              ]
            },
            {
              id: "independent-functions",
              type: "property",
              title: "独立变量的函数仍独立",
              body: [
                "若 $X,Y$ 相互独立，则 $g(X)$ 与 $h(Y)$ 也相互独立。",
                "联合分布可分解、边缘分布可还原，是独立性带来的核心计算便利。"
              ]
            }
          ]
        },
        {
          id: "joint-functions",
          title: "补充：二维随机变量函数的分布",
          summary: "图片主线停在独立性；这一组保留考试常见的和、最大值和最小值，方便后续扩展。",
          cards: [
            {
              id: "sum-discrete",
              type: "formula",
              title: "离散型：和的分布",
              body: [
                "若 $Z=X+Y$，枚举所有满足 $x+y=z$ 的取值组合，并累加联合概率。"
              ],
              formula: String.raw`P(Z=z)=\sum_xP(X=x,Y=z-x)`
            },
            {
              id: "sum-independent",
              type: "formula",
              title: "独立离散变量之和",
              formula: String.raw`P(Z=z)=\sum_xP(X=x)P(Y=z-x)`
            },
            {
              id: "convolution",
              type: "formula",
              title: "连续型：卷积公式",
              body: [
                "当 $X,Y$ 独立且联合密度可分离时，$Z=X+Y$ 的密度是边缘密度的卷积。"
              ],
              formula: String.raw`f_Z(z)=\int_{-\infty}^{+\infty}f_X(x)f_Y(z-x)\,dx`
            },
            {
              id: "max-min",
              type: "formula",
              title: "独立变量的最大值与最小值",
              body: [
                "最大值不超过 $z$，等价于每个变量都不超过 $z$；最小值大于 $z$，等价于每个变量都大于 $z$。"
              ],
              formula: String.raw`F_{\max}(z)=F_X(z)F_Y(z),\qquad
P(\min>z)=P(X>z)P(Y>z)`
            },
            {
              id: "joint-function-note",
              type: "warning",
              title: "先画支撑区域，再做积分",
              body: [
                "二维函数分布最容易错的不是积分本身，而是没有根据联合密度的非零区域确定新变量的有效范围。"
              ]
            }
          ]
        }
      ]
    }
  ]
};
