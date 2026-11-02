(function () {
  "use strict";

  const course = window.PROBABILITY_COURSE;
  if (!course) return;

  const allCards = course.chapters.flatMap((chapter) =>
    chapter.themes.flatMap((theme) => theme.cards)
  );

  function card(id) {
    const match = allCards.find((item) => item.id === id);
    if (!match) throw new Error(`Missing probability card: ${id}`);
    return match;
  }

  function update(id, patch) {
    Object.assign(card(id), patch);
  }

  const jointMarginalTable = String.raw`
    <div class="table-scroll">
      <table class="probability-table">
        <thead>
          <tr><th>X \ Y</th><th>−1</th><th>1</th><th>2</th><th>p<sub>i·</sub></th></tr>
        </thead>
        <tbody>
          <tr><th>0</th><td>1/12</td><td>0</td><td>1/4</td><td>1/3</td></tr>
          <tr><th>1</th><td>1/6</td><td>1/12</td><td>1/12</td><td>1/3</td></tr>
          <tr><th>3</th><td>1/4</td><td>1/12</td><td>0</td><td>1/3</td></tr>
          <tr><th>p<sub>·j</sub></th><td>1/2</td><td>1/6</td><td>1/3</td><td>1</td></tr>
        </tbody>
      </table>
    </div>`;

  const jointPmfTemplate = String.raw`
    <div class="table-scroll">
      <table class="probability-table">
        <thead>
          <tr><th>X \ Y</th><th>y₁</th><th>y₂</th><th>…</th><th>p<sub>i·</sub></th></tr>
        </thead>
        <tbody>
          <tr><th>x₁</th><td>p₁₁</td><td>p₁₂</td><td>…</td><td>p₁·</td></tr>
          <tr><th>x₂</th><td>p₂₁</td><td>p₂₂</td><td>…</td><td>p₂·</td></tr>
          <tr><th>⋮</th><td>⋮</td><td>⋮</td><td>⋱</td><td>⋮</td></tr>
          <tr><th>p<sub>·j</sub></th><td>p·₁</td><td>p·₂</td><td>…</td><td>1</td></tr>
        </tbody>
      </table>
    </div>`;

  update("joint-cdf-properties", {
    source: "照片笔记 · 二维随机变量性质",
    body: [
      "$F(x,y)$ 的函数值就是随机点落在以 $(x,y)$ 为右上角的左下方区域内的概率。",
      "<strong>① 单调性：</strong>$F(x,y)$ 分别对 $x$ 和 $y$ 单调不减。",
      "<strong>② 右连续性：</strong>$F(x,y)$ 对 $x,y$ 都是右连续的。",
      "<strong>③ 有界与极限：</strong>$0\\le F(x,y)\\le1$；沿任一条轴趋于负无穷时分布函数为 0；在 $(+\\infty,+\\infty)$ 处趋于 1。",
      "<strong>④ 矩形增量非负：</strong>对任意 $x_1\\le x_2$、$y_1\\le y_2$，四个角点交替相减所得概率不小于 0。"
    ],
    formula: String.raw`\begin{aligned}
&x_1<x_2\Rightarrow F(x_1,y)\le F(x_2,y),\\
&y_1<y_2\Rightarrow F(x,y_1)\le F(x,y_2),\\
&F(x+0,y)=F(x,y),\quad F(x,y+0)=F(x,y),\\
&F(x_2,y_2)-F(x_1,y_2)-F(x_2,y_1)+F(x_1,y_1)\ge0.
\end{aligned}`
  });

  update("joint-pmf", {
    source: "照片笔记 · 离散型二维随机变量分布列",
    body: [
      "离散型二维随机变量由全部可能取值点及对应联合概率构成。所有联合概率非负且总和为 1。",
      "分布列可以写成矩阵表格：行对应 $X$ 的取值，列对应 $Y$ 的取值，格内是 $p_{ij}$。"
    ],
    example: {
      title: "联合分布列表的矩阵表示",
      body: [
        "所有 $(x_i,y_j)$ 的联合概率格共同组成分布列，全部格子的概率之和必须为 1。",
        jointPmfTemplate,
        "表中 $p_{i\\cdot}$ 是第 $i$ 行的和，$p_{\\cdot j}$ 是第 $j$ 列的和；它们分别对应 $X$ 与 $Y$ 的边缘概率。"
      ]
    }
  });

  update("joint-density", {
    source: "照片笔记 · 连续型二维随机变量例题",
    body: [
      "若存在非负函数 $f(x,y)$，使联合分布函数等于二重积分，则 $f(x,y)$ 为联合概率密度。",
      "概率等于联合密度在对应平面区域上的二重积分。"
    ],
    example: {
      title: "联合密度：常数、三角形区域概率与联合分布函数",
      body: [
        "设 $f(x,y)=k e^{-(2x+y)}$，其中 $x>0,y>0$，其他位置为 0。",
        "<strong>（1）确定常数：</strong>利用全平面二重积分为 1，得到 $k=2$。",
        "<strong>（2）求 $D=\\{x+y<1\\}$ 上的概率：</strong>积分区域为 $x=0,y=0,x+y=1$ 围成的三角形。",
        "<strong>（3）求联合分布函数：</strong>当 $x>0,y>0$ 时逐层积分；其余位置为 0。"
      ],
      formula: String.raw`\begin{aligned}
k&=2,\\
P((X,Y)\in D)&=\int_0^1\int_0^{1-x}2e^{-(2x+y)}\,dy\,dx
=(1-e^{-1})^2\approx0.3996,\\
F(x,y)&=
\begin{cases}
(1-e^{-2x})(1-e^{-y}),&x>0,\ y>0,\\
0,&\text{其他}.
\end{cases}
\end{aligned}`
    }
  });

  update("marginal-pmf-x", {
    source: "照片笔记 · 边缘概率函数例题",
    example: {
      title: "由联合分布表求两个边缘分布",
      body: [
        "按行求和得到 $X$ 的边缘分布，按列求和得到 $Y$ 的边缘分布。",
        jointMarginalTable,
        "因此 $X$ 与 $Y$ 的边缘概率都分别为表中的最后一行和最后一列。"
      ]
    }
  });

  update("marginal-density-x", {
    source: "照片笔记 · 边缘概率密度例题",
    example: {
      title: "三角区域上的联合密度与两个边缘密度",
      body: [
        "设 $f(x,y)=cy(2-x)$，其中 $0\\le x\\le1,\\ 0\\le y\\le x$，其他位置为 0。",
        "由归一化条件得到 $5c/24=1$，所以 $c=24/5=4.8$。",
        "再分别对 $y$ 和 $x$ 积分，得到两个边缘密度。"
      ],
      formula: String.raw`\begin{aligned}
f_X(x)&=\frac{12}{5}x^2(2-x),&&0\le x\le1,\\
f_Y(y)&=\frac{24}{5}y\left(\frac32-2y+\frac{y^2}{2}\right),&&0\le y\le1.
\end{aligned}`
    }
  });

  update("pmf", {
    source: "照片笔记 · 离散型随机变量表示方式",
    example: {
      title: "表格、图形与摸球模型",
      body: [
        "离散型分布律可以把取值 $x_k$ 按从小到大排列成表格，也可以用竖线图表示每个取值的概率。",
        "摸球例：袋中共有 5 个球，其中 2 个白球、3 个红球，任取 3 个，令 $X$ 为取到的白球数。",
        "$X$ 可能取 $0,1,2$，对应概率分别为 $1/10,6/10,3/10$。"
      ],
      formula: String.raw`P(X=k)=\frac{C_2^kC_3^{3-k}}{C_5^3},\qquad k=0,1,2`
    }
  });

  update("distribution-function", {
    source: "照片笔记 · 连续型随机变量例题",
    example: {
      title: "由分段分布函数求系数、概率与密度",
      body: [
        "利用 $F(-a+0)=0$ 与 $F(a+0)=1$ 确定 $A,B$，得到 $A=1/2,\\ B=1/\\pi$。",
        "于是 $P(-a<X<a/2)=F(a/2)-F(-a)=2/3$。",
        "对区间内部的分布函数求导，得到概率密度。"
      ],
      formula: String.raw`F(x)=
\begin{cases}
0,&x\le-a,\\
\dfrac12+\dfrac1\pi\arcsin\dfrac xa,&-a<x\le a,\\
1,&x>a.
\end{cases}
\qquad
f(x)=
\begin{cases}
\dfrac1{\pi\sqrt{a^2-x^2}},&-a<x<a,\\
0,&\text{其他}.
\end{cases}`
    }
  });

  update("density-properties", {
    source: "照片笔记 · 连续型随机变量例题",
    example: {
      title: "由分段密度求常数、分布函数与区间概率",
      body: [
        "设概率密度在 $0\\le x<3$ 上为 $kx$，在 $3\\le x<4$ 上为 $2-x/2$，其余为 0。",
        "利用全轴积分为 1，得 $k=1/6$。",
        "分段积分可得到分布函数，再用 $P(1<X\\le7/2)=F(7/2)-F(1)$ 求概率。"
      ],
      formula: String.raw`\begin{aligned}
F(x)&=
\begin{cases}
0,&x<0,\\
\dfrac{x^2}{12},&0\le x<3,\\
2x-\dfrac{x^2}{4}-3,&3\le x<4,\\
1,&x\ge4,
\end{cases}\\
P\left(1<X\le\frac72\right)&=\frac{41}{48}.
\end{aligned}`
    }
  });

  update("normal", {
    source: "照片笔记 · 正态分布定义",
    body: [
      "正态分布的密度曲线是关于 $x=\\mu$ 对称的钟形曲线，特点是“两头小、中间大、左右对称”。",
      "均值 $\\mu$ 决定图形的中心位置；标准差 $\\sigma$ 决定峰形的陡峭程度，$\\sigma$ 越小峰越尖。",
      "参数满足 $\\sigma>0$，记为 $X\\sim N(\\mu,\\sigma^2)$。"
    ]
  });

  update("standard-normal", {
    source: "照片笔记 · 标准正态分布",
    body: [
      "$\\mu=0,\\sigma=1$ 的正态分布称为标准正态分布 $N(0,1)$。",
      "其密度函数常用 $\\phi(x)$ 表示，分布函数用 $\\Phi(x)$ 表示。",
      "标准正态分布关于 0 对称，因此 $\\Phi(0)=0.5$，且 $\\Phi(-x)=1-\\Phi(x)$。"
    ],
    formula: String.raw`\phi(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},
\qquad
\Phi(x)=\int_{-\infty}^{x}\frac1{\sqrt{2\pi}}e^{-t^2/2}\,dt`
  });

  update("monotone-transform", {
    source: "照片笔记 · 一维随机变量函数的密度",
    example: {
      title: "线性函数 $Y=2X+8$",
      body: [
        "设 $X$ 的密度为 $f_X(x)=x/8$（$0<x<4$），其他位置为 0。",
        "反函数为 $x=(y-8)/2$，且 $Y$ 的有效范围是 $8<y<16$。"
      ],
      formula: String.raw`f_Y(y)=\frac12f_X\left(\frac{y-8}{2}\right)
=\frac{y-8}{32},\qquad8<y<16`
    }
  });

  update("cdf-transform", {
    source: "照片笔记 · 密度函数计算",
    example: {
      title: "由分布函数法计算 $Y=X^2$ 与 $Y=2X+3$",
      body: [
        "设 $f_X(x)=xe^{-x}$（$x\\ge0$），其他位置为 0。",
        "对 $Y=X^2$，先求 $F_Y(y)=P(X\\le\\sqrt y)$，再对 $y$ 求导。",
        "对 $Y=2X+3$，可把 $X=(Y-3)/2$ 代入密度变换公式。"
      ],
      formula: String.raw`\begin{aligned}
f_{X^2}(y)&=\frac12e^{-\sqrt y},&&y>0,\\
f_{2X+3}(y)&=\frac{y-3}{4}e^{-(y-3)/2},&&y>3.
\end{aligned}`
    }
  });

  update("multiplication-chain", {
    source: "照片笔记 · 条件概率",
    example: {
      title: "玻璃杯三次落下均未打破",
      body: [
        "第一次落下打破概率为 $1/2$；若第一次未打破，第二次落下打破概率为 $7/10$；若前两次均未打破，第三次落下打破概率为 $9/10$。",
        "令 $A_i$ 表示第 $i$ 次落下未打破，求 $P(A_1A_2A_3)$。",
        "按乘法公式依次乘各次条件概率。"
      ],
      formula: String.raw`\begin{aligned}
P(A_1A_2A_3)
&=P(A_1)P(A_2\mid A_1)P(A_3\mid A_1A_2)\\
&=\left(1-\frac12\right)
\left(1-\frac7{10}\right)
\left(1-\frac9{10}\right)
=\frac3{200}.
\end{aligned}`
    }
  });

  update("bayes-example", {
    source: "照片笔记 · 全概率与贝叶斯",
    title: "工厂次品来源：全概率与贝叶斯",
    body: [
      "三家工厂的供货份额分别为 $P(B_1)=0.15$、$P(B_2)=0.80$、$P(B_3)=0.05$。",
      "对应次品率为 $P(A\\mid B_1)=0.02$、$P(A\\mid B_2)=0.01$、$P(A\\mid B_3)=0.03$。",
      "先用全概率公式求任取一只为次品的概率，再用贝叶斯公式反推次品分别来自三家工厂的概率。"
    ],
    formula: String.raw`\begin{aligned}
P(A)&=0.15\times0.02+0.80\times0.01+0.05\times0.03=0.0125,\\
P(B_1\mid A)&=0.24,\qquad P(B_2\mid A)=0.64,\qquad P(B_3\mid A)=0.12.
\end{aligned}`
  });

  update("bivariate-uniform", {
    source: "原提纲仅出现标题，具体内容待补充",
    body: [
      "你提供的图片中只出现了“二维均匀分布与正态分布”这一标题，没有展开定义或公式。"
    ],
    formula: ""
  });

  update("bivariate-normal", {
    source: "原提纲仅出现标题，具体内容待补充",
    body: [
      "你提供的图片中只出现了标题，没有给出二维正态分布的具体定义。"
    ],
    formula: ""
  });

  const jointChapter = course.chapters.find((chapter) => chapter.id === "joint");
  if (jointChapter) {
    jointChapter.themes = jointChapter.themes.filter(
      (theme) => theme.id !== "joint-functions"
    );
  }
})();
