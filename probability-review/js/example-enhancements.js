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

  function diagram(title, caption, viewBox, content) {
    return {
      title,
      caption,
      svg: `
        <svg viewBox="${viewBox}" role="img" aria-label="${title}">
          <title>${title}</title>
          ${content}
        </svg>`
    };
  }

  const pmfTable = String.raw`
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

  const jointPmfTable = String.raw`
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

  update("multiplication-chain", {
    example: {
      title: "课堂例题：三次落下都未打破",
      body: [
        "第一次落下时打破的概率为 $1/2$；若第一次未打破，第二次打破的概率为 $7/10$；若前两次都未打破，第三次打破的概率为 $9/10$。求三次落下后仍未打破的概率。",
        "令 $A_i$ 表示第 $i$ 次落下未打破。先把“连续未打破”写成三个事件的交，再按第一次、第二次、第三次的顺序乘条件概率。",
        "<strong>解：</strong>$P(A_1)=1/2$，$P(A_2\\mid A_1)=3/10$，$P(A_3\\mid A_1A_2)=1/10$，所以 $P(A_1A_2A_3)=3/200$。"
      ],
      figures: [
        diagram(
          "三次落下的条件概率树",
          "沿“未打破”分支连续读取条件概率，它与多事件乘法公式一一对应。",
          "0 0 680 330",
          `
          <path class="diagram-guide" d="M82 165H188M217 118L335 64M217 212L335 266M365 64L493 38M365 64L493 90M365 266L493 238M365 266L493 292"/>
          <circle class="diagram-point" cx="82" cy="165" r="5"/>
          <circle class="diagram-node" cx="202" cy="118" r="18"/>
          <circle class="diagram-node" cx="202" cy="212" r="18"/>
          <circle class="diagram-node" cx="350" cy="64" r="18"/>
          <circle class="diagram-node" cx="350" cy="266" r="18"/>
          <circle class="diagram-node" cx="508" cy="38" r="18"/>
          <circle class="diagram-node" cx="508" cy="90" r="18"/>
          <circle class="diagram-node" cx="508" cy="238" r="18"/>
          <circle class="diagram-point" cx="508" cy="292" r="7"/>
          <text class="diagram-text diagram-text--strong" x="28" y="155">开始</text>
          <text class="diagram-text" x="230" y="112">未破</text>
          <text class="diagram-text--small diagram-text" x="236" y="132">1/2</text>
          <text class="diagram-text" x="230" y="205">已破</text>
          <text class="diagram-text--small diagram-text" x="236" y="225">1/2</text>
          <text class="diagram-text" x="374" y="56">未破</text>
          <text class="diagram-text--small diagram-text" x="374" y="78">3/10</text>
          <text class="diagram-text" x="374" y="259">已破</text>
          <text class="diagram-text--small diagram-text" x="374" y="281">7/10</text>
          <text class="diagram-text" x="532" y="31">未破</text>
          <text class="diagram-text--small diagram-text" x="532" y="53">1/10</text>
          <text class="diagram-text" x="532" y="83">已破</text>
          <text class="diagram-text--small diagram-text" x="532" y="105">9/10</text>
          <text class="diagram-text diagram-text--strong" x="532" y="232">三次未破</text>
          <text class="diagram-text--small diagram-text" x="532" y="254">概率 3/200</text>
          <text class="diagram-text--small diagram-text" x="532" y="311">第三次已破</text>
          `
        )
      ]
    }
  });

  update("bayes-example", {
    title: "工厂次品来源：全概率与贝叶斯",
    source: "课堂例题",
    body: [
      "三家工厂供货份额分别为 $15\\%$、$80\\%$、$5\\%$，次品率分别为 $2\\%$、$1\\%$、$3\\%$。产品混合后随机取一只。",
      "<strong>第一问：</strong>先按来源拆分，得到任取一只为次品的概率 $P(A)=0.0125$。",
      "<strong>第二问：</strong>已知取到次品，再比较三个来源分支对次品总量的贡献，得到来自三家工厂的后验概率分别为 $0.24$、$0.64$、$0.12$。"
    ],
    formula: String.raw`\begin{aligned}
P(A)&=0.15\times0.02+0.80\times0.01+0.05\times0.03=0.0125,\\
P(B_1\mid A)&=0.24,\qquad P(B_2\mid A)=0.64,\qquad P(B_3\mid A)=0.12.
\end{aligned}`,
    example: {
      title: "课堂结构图：从供货份额反推次品来源",
      body: [
        "先用每一家工厂的供货份额乘以各自次品率，三条分支的贡献相加得到次品总概率。",
        "贝叶斯公式再把这个总概率作为公共分母，比较哪一条来源分支贡献最大。"
      ],
      figures: [
        diagram(
          "三家工厂的次品来源分支",
          "市场份额决定先验权重，次品率决定每条分支对次品的贡献。",
          "0 0 720 360",
          `
          <rect class="diagram-area" x="24" y="42" width="208" height="244" rx="16"/>
          <rect class="diagram-node" x="36" y="62" width="184" height="56" rx="10"/>
          <rect class="diagram-node" x="36" y="136" width="184" height="56" rx="10"/>
          <rect class="diagram-node" x="36" y="210" width="184" height="56" rx="10"/>
          <text class="diagram-text diagram-text--strong" x="56" y="86">厂 1</text>
          <text class="diagram-text" x="56" y="107">份额 15% · 次品率 2%</text>
          <text class="diagram-text diagram-text--strong" x="56" y="160">厂 2</text>
          <text class="diagram-text" x="56" y="181">份额 80% · 次品率 1%</text>
          <text class="diagram-text diagram-text--strong" x="56" y="234">厂 3</text>
          <text class="diagram-text" x="56" y="255">份额 5% · 次品率 3%</text>
          <path class="diagram-axis" d="M220 112H330M220 164H330M220 238H330"/>
          <rect class="diagram-node" x="340" y="120" width="132" height="88" rx="44"/>
          <text class="diagram-text diagram-text--strong" x="378" y="156">任取一件</text>
          <text class="diagram-text" x="377" y="181">为次品 A</text>
          <path class="diagram-axis" d="M472 164H558"/>
          <rect class="diagram-area" x="565" y="35" width="130" height="260" rx="16"/>
          <text class="diagram-text diagram-text--strong" x="589" y="72">来源概率</text>
          <text class="diagram-text" x="589" y="111">厂 1：0.24</text>
          <text class="diagram-text" x="589" y="172">厂 2：0.64</text>
          <text class="diagram-text" x="589" y="233">厂 3：0.12</text>
          <text class="diagram-text--small diagram-text" x="589" y="268">合计 1.00</text>
          `
        )
      ]
    }
  });

  update("pmf", {
    source: "课堂例题",
    example: {
      title: "课堂例题：从袋中取白球",
      body: [
        "袋中有 5 个球，其中 2 个白球、3 个红球。任取 3 个，令 $X$ 为取到的白球数。",
        "$X$ 的可能取值为 $0,1,2$。按组合数分别计数后，对应概率为 $0.1,0.6,0.3$；三个概率之和为 1。",
        "分布律也可以画成竖线图：横轴排列取值，竖线高度表示概率。"
      ],
      figures: [
        diagram(
          "取白球数的分布律",
          "竖线高度依次为 0.1、0.6、0.3，直观显示 X=1 最可能。",
          "0 0 560 330",
          `
          <path class="diagram-grid-line" d="M84 52H520M84 112H520M84 172H520M84 232H520"/>
          <path class="diagram-axis" d="M84 278H536M116 52V278"/>
          <path class="diagram-axis" d="M520 271L536 278L520 285M109 66L116 52L123 66"/>
          <path class="diagram-curve diagram-curve--teal" d="M190 278V238"/>
          <path class="diagram-curve" d="M306 278V112"/>
          <path class="diagram-curve diagram-curve--gold" d="M422 278V172"/>
          <circle class="diagram-point" cx="190" cy="238" r="6"/>
          <circle class="diagram-point" cx="306" cy="112" r="6"/>
          <circle class="diagram-point" cx="422" cy="172" r="6"/>
          <text class="diagram-text" x="184" y="305">0</text>
          <text class="diagram-text" x="300" y="305">1</text>
          <text class="diagram-text" x="416" y="305">2</text>
          <text class="diagram-text--small diagram-text" x="166" y="228">0.1</text>
          <text class="diagram-text--small diagram-text" x="282" y="101">0.6</text>
          <text class="diagram-text--small diagram-text" x="398" y="161">0.3</text>
          <text class="diagram-math" x="515" y="305">x</text>
          <text class="diagram-math" x="91" y="43">P</text>
          `
        )
      ]
    }
  });

  update("distribution-function", {
    source: "课堂例题",
    body: [
      "分布函数给出随机变量落在 $(-\\infty,x]$ 内的概率，适用于任意类型随机变量。",
      "对连续型分布函数，利用两端的极限确定待定系数，在区间内部用概率差求区间概率，再逐段求导得到概率密度。"
    ],
    example: {
      title: "课堂例题：由分段分布函数求系数、概率与密度",
      body: [
        "设连续型随机变量 $X$ 的分布函数在 $x\\le-a$ 时为 0，在 $-a<x\\le a$ 时为 $A+B\\arcsin(x/a)$，在 $x>a$ 时为 1。",
        "利用左端极限为 0、右端极限为 1，解得 $A=1/2$、$B=1/\\pi$。",
        "因而 $P(-a<X<a/2)=F(a/2)-F(-a)=2/3$；对区间内部求导，得到 $f(x)=1/(\\pi\\sqrt{a^2-x^2})$，其中 $-a<x<a$。"
      ],
      figures: [
        diagram(
          "反正弦型连续分布函数",
          "曲线从 0 连续上升到 1；两端与中间段在 ±a 处衔接。",
          "0 0 620 320",
          `
          <path class="diagram-grid-line" d="M105 64H512M105 134H512M105 204H512"/>
          <path class="diagram-axis" d="M105 270H548M268 42V292"/>
          <path class="diagram-guide" d="M175 270V254M431 270V54"/>
          <path class="diagram-curve" d="M175 254C215 245 240 204 268 160C297 115 325 66 360 56C385 49 410 52 431 54"/>
          <path class="diagram-axis" d="M105 270H175M431 54H512"/>
          <text class="diagram-math" x="166" y="296">-a</text>
          <text class="diagram-math" x="423" y="296">a</text>
          <text class="diagram-math" x="274" y="297">0</text>
          <text class="diagram-math" x="526" y="294">x</text>
          <text class="diagram-math" x="76" y="60">1</text>
          <text class="diagram-math" x="72" y="165">1/2</text>
          <text class="diagram-text diagram-text--small" x="271" y="154">F(x)</text>
          <circle class="diagram-point" cx="268" cy="160" r="5"/>
          `
        )
      ]
    }
  });

  update("density-properties", {
    source: "课堂例题",
    example: {
      title: "课堂例题：由分段密度求常数、分布函数与区间概率",
      body: [
        "已知密度在 $0\\le x<3$ 上为 $kx$，在 $3\\le x\\le4$ 上为 $2-x/2$，其余位置为 0。",
        "利用全轴面积为 1，得 $k=1/6$。分段积分得到分布函数：前一段从原点增长，后一段达到 1。",
        "最后用 $P(1<X\\le7/2)=F(7/2)-F(1)$，结果为 $41/48$。"
      ],
      figures: [
        diagram(
          "分段概率密度与区间面积",
          "密度在 0 到 3 线性上升，在 3 到 4 线性下降；曲线下总面积为 1。",
          "0 0 620 320",
          `
          <path class="diagram-grid-line" d="M92 57H552M92 112H552M92 167H552M92 222H552"/>
          <path class="diagram-actual" d="M92 222H552"/>
          <path class="diagram-axis" d="M92 270H552M118 42V288"/>
          <path class="diagram-axis" d="M544 263L552 270L544 277M111 56L118 42L125 56"/>
          <path class="diagram-curve" d="M118 222L394 78L526 222"/>
          <path class="diagram-area" d="M118 222L394 78L526 222Z"/>
          <path class="diagram-guide" d="M394 78V222M118 222V78M526 222V78"/>
          <text class="diagram-math" x="110" y="291">0</text>
          <text class="diagram-math" x="383" y="291">3</text>
          <text class="diagram-math" x="516" y="291">4</text>
          <text class="diagram-math" x="544" y="292">x</text>
          <text class="diagram-math" x="67" y="228">0</text>
          <text class="diagram-math" x="53" y="84">1/2</text>
          <text class="diagram-text diagram-text--small" x="278" y="153">面积 = 1</text>
          `
        )
      ]
    }
  });

  update("normal", {
    source: "课堂图示",
    body: [
      "正态分布的密度曲线是关于 $x=\\mu$ 对称的钟形曲线，特点是“两头小、中间大、左右对称”。",
      "均值 $\\mu$ 决定图形的中心位置；标准差 $\\sigma$ 决定峰形的陡峭程度，$\\sigma$ 越小峰越尖。"
    ],
    example: {
      title: "课堂结构图：均值和标准差如何改变曲线",
      body: [
        "左图固定标准差、只改变均值，曲线整体左右平移，形状不变。",
        "右图固定均值、只改变标准差，曲线仍以同一位置为中心；标准差越小越集中、峰越高。"
      ],
      figures: [
        diagram(
          "不同参数的正态密度曲线",
          "左侧改变 μ，曲线平移；右侧改变 σ，曲线陡缓变化。",
          "0 0 760 340",
          `
          <path class="diagram-axis" d="M40 250H350M195 60V270"/>
          <path class="diagram-curve diagram-curve--blue" d="M62 245C100 240 115 205 140 150C158 110 172 84 186 78C210 70 226 115 240 165C255 210 278 239 336 246"/>
          <path class="diagram-curve" d="M88 246C128 241 143 211 164 161C181 120 194 93 207 88C229 81 244 121 259 169C273 211 293 240 331 246"/>
          <path class="diagram-curve diagram-curve--gold" d="M123 246C156 241 168 216 185 173C200 135 211 109 220 104C241 97 254 130 266 174C281 217 298 242 330 246"/>
          <text class="diagram-math" x="332" y="276">x</text>
          <text class="diagram-math" x="201" y="55">f(x)</text>
          <text class="diagram-text--small diagram-text" x="137" y="274">μ₁</text>
          <text class="diagram-text--small diagram-text" x="202" y="274">μ₂</text>
          <text class="diagram-text--small diagram-text" x="218" y="274">μ₃</text>
          <path class="diagram-guide" d="M380 56V275"/>
          <path class="diagram-axis" d="M414 250H728M520 60V270"/>
          <path class="diagram-curve diagram-curve--blue" d="M432 245C467 238 480 204 497 148C508 113 516 84 521 79C536 73 546 110 556 158C568 208 589 240 612 246C650 249 681 248 711 246"/>
          <path class="diagram-curve" d="M438 246C475 243 492 228 508 185C516 164 518 133 522 116C531 93 538 94 544 117C550 139 553 171 562 198C577 236 609 244 709 246"/>
          <path class="diagram-curve diagram-curve--gold" d="M443 246C480 245 499 242 514 225C526 210 521 166 523 144C527 112 534 107 540 135C545 160 540 209 552 226C571 245 613 246 707 246"/>
          <text class="diagram-math" x="704" y="276">x</text>
          <text class="diagram-math" x="525" y="55">f(x)</text>
          <text class="diagram-text--small diagram-text" x="529" y="103">σ=0.7</text>
          <text class="diagram-text--small diagram-text" x="552" y="153">σ=1</text>
          <text class="diagram-text--small diagram-text" x="564" y="218">σ=2</text>
          `
        )
      ]
    }
  });

  update("standard-normal", {
    source: "课堂图示",
    example: {
      title: "课堂结构图：标准正态的对称性",
      body: [
        "$\\Phi(0)=0.5$，所以标准正态密度曲线在 0 左侧的面积恰好占一半。",
        "曲线关于 0 对称，因此 $\\Phi(-x)=1-\\Phi(x)$。"
      ],
      figures: [
        diagram(
          "标准正态分布的对称面积",
          "左侧阴影面积为 0.5；左右镜像的两个尾部面积相等。",
          "0 0 620 330",
          `
          <path class="diagram-axis" d="M70 262H568M310 46V286"/>
          <path class="diagram-area" d="M88 260C122 258 158 243 186 215C218 183 250 109 286 94L310 92V260Z"/>
          <path class="diagram-curve" d="M88 260C130 258 168 239 198 204C231 166 262 104 294 95C306 92 315 92 326 95C359 104 389 166 422 204C452 239 490 258 532 260"/>
          <path class="diagram-guide" d="M310 286V92"/>
          <text class="diagram-math" x="544" y="286">x</text>
          <text class="diagram-math" x="321" y="307">0</text>
          <text class="diagram-math" x="267" y="125">0.5</text>
          <text class="diagram-math" x="335" y="125">0.5</text>
          <path class="diagram-guide" d="M412 152V260M444 152V260"/>
          <text class="diagram-text--small diagram-text" x="395" y="145">对称尾部</text>
          `
        )
      ]
    }
  });

  update("monotone-transform", {
    source: "课堂例题",
    example: {
      title: "课堂例题：线性函数 Y=2X+8 的密度",
      body: [
        "设 $f_X(x)=x/8$，其中 $0<x<4$，其他位置为 0。求 $Y=2X+8$ 的概率密度。",
        "反函数为 $x=(y-8)/2$，并且 $0<x<4$ 对应 $8<y<16$。再代入单调变换公式，乘以导数绝对值 $1/2$。",
        "<strong>结果：</strong>$f_Y(y)=(y-8)/32$，其中 $8<y<16$。"
      ],
      figures: [
        diagram(
          "线性变换的区间对应",
          "X 的开区间 (0,4) 被完整映射到 Y 的开区间 (8,16)。",
          "0 0 680 290",
          `
          <path class="diagram-axis" d="M55 82H614M55 82V98M614 82V98"/>
          <path class="diagram-axis" d="M115 82V132M505 82V132"/>
          <text class="diagram-text" x="92" y="52">X 的取值</text>
          <text class="diagram-math" x="103" y="58">0</text>
          <text class="diagram-math" x="494" y="58">4</text>
          <text class="diagram-text diagram-text--small" x="274" y="68">(0, 4)</text>
          <path class="diagram-axis" d="M115 168L505 264"/>
          <path class="diagram-guide" d="M115 132L115 168M505 132L505 264"/>
          <text class="diagram-text diagram-text--strong" x="269" y="223">Y = 2X + 8</text>
          <path class="diagram-axis" d="M55 278H614M115 262V294M505 262V294"/>
          <text class="diagram-text" x="92" y="246">Y 的取值</text>
          <text class="diagram-math" x="95" y="320">8</text>
          <text class="diagram-math" x="493" y="320">16</text>
          <text class="diagram-text diagram-text--small" x="275" y="308">(8, 16)</text>
          `
        )
      ]
    }
  });

  update("cdf-transform", {
    source: "课堂例题",
    example: {
      title: "课堂例题：X² 与 2X+3 的分布",
      body: [
        "设 $X$ 的密度为 $f_X(x)=x^3e^{-x^2}$，其中 $x\\ge0$，其他位置为 0。",
        "对 $Y=X^2$，先求 $F_Y(y)=P(X\\le\\sqrt y)$，再对 $y$ 求导；对 $Y=2X+3$，利用单调函数的反函数代入。",
        "<strong>结果：</strong>$Y=X^2$ 的密度为 $\\frac12ye^{-y}\\ (y\\ge0)$；$Y=2X+3$ 的密度为 $\\frac{(y-3)^3}{16}e^{-(y-3)^2/4}\\ (y\\ge3)$。"
      ],
      figures: [
        diagram(
          "两种随机变量函数的分支",
          "左分支为多对一映射的典型入口；右分支是可直接反解的线性变换。",
          "0 0 700 330",
          `
          <rect class="diagram-node" x="24" y="116" width="150" height="88" rx="16"/>
          <text class="diagram-text diagram-text--strong" x="57" y="151">已知 X</text>
          <text class="diagram-text--small diagram-text" x="57" y="175">密度仅定义在 x ≥ 0</text>
          <path class="diagram-axis" d="M174 160H273M174 196H273"/>
          <rect class="diagram-node" x="283" y="62" width="160" height="100" rx="16"/>
          <text class="diagram-text diagram-text--strong" x="306" y="94">Y = X²</text>
          <text class="diagram-text" x="306" y="120">先平方，再开方</text>
          <text class="diagram-text--small diagram-text" x="306" y="143">分布函数法</text>
          <rect class="diagram-node" x="283" y="184" width="160" height="100" rx="16"/>
          <text class="diagram-text diagram-text--strong" x="306" y="216">Y = 2X + 3</text>
          <text class="diagram-text" x="306" y="242">反函数 x=(y−3)/2</text>
          <text class="diagram-text--small diagram-text" x="306" y="265">单调变换</text>
          <path class="diagram-axis" d="M443 112H532M443 234H532"/>
          <rect class="diagram-area" x="542" y="55" width="132" height="112" rx="14"/>
          <text class="diagram-text diagram-text--strong" x="560" y="90">f_Y(y)</text>
          <text class="diagram-text" x="560" y="116">½ y e⁻ʸ</text>
          <text class="diagram-text--small diagram-text" x="560" y="142">y ≥ 0</text>
          <rect class="diagram-area" x="542" y="190" width="132" height="112" rx="14"/>
          <text class="diagram-text diagram-text--strong" x="560" y="225">f_Y(y)</text>
          <text class="diagram-text" x="560" y="251">(y−3)³/16 · e^…</text>
          <text class="diagram-text--small diagram-text" x="560" y="277">y ≥ 3</text>
          `
        )
      ]
    }
  });

  update("joint-cdf-properties", {
    source: "课堂图示",
    body: [
      "$F(x,y)$ 的函数值就是随机点落在以 $(x,y)$ 为右上角的左下方区域内的概率。",
      "<strong>四条性质：</strong>分别对 $x,y$ 单调不减；对 $x,y$ 分别右连续；函数值在 $[0,1]$ 内且沿负无穷方向趋于 0、在 $(+\\infty,+\\infty)$ 处趋于 1；任意矩形的四个角点交替相减结果非负。"
    ],
    example: {
      title: "课堂结构图：联合分布函数的几何区域",
      body: [
        "固定右上角 $(x,y)$，向左、向下延伸到负无穷，得到的左下区域就是事件 $X\\le x,\\ Y\\le y$。",
        "求矩形上的概率时，需要把四个角点按交替正负号组合，避免把整块左下区域直接相减。"
      ],
      figures: [
        diagram(
          "联合分布函数的左下区域",
          "紫色区域表示 X≤x、Y≤y；点 (x,y) 是区域右上角。",
          "0 0 600 340",
          `
          <rect class="diagram-area" x="90" y="54" width="278" height="194" rx="4"/>
          <path class="diagram-axis" d="M70 280H540M226 42V310"/>
          <path class="diagram-axis" d="M540 280H556"/>
          <path class="diagram-axis" d="M226 42V26"/>
          <circle class="diagram-point" cx="368" cy="54" r="7"/>
          <text class="diagram-math" x="382" y="47">(x, y)</text>
          <text class="diagram-math" x="211" y="306">O</text>
          <text class="diagram-math" x="543" y="306">x</text>
          <text class="diagram-math" x="242" y="36">y</text>
          <text class="diagram-text diagram-text--strong" x="154" y="158">X ≤ x</text>
          <text class="diagram-text diagram-text--strong" x="154" y="183">Y ≤ y</text>
          <path class="diagram-guide" d="M368 54V280M90 248H540"/>
          `
        )
      ]
    }
  });

  update("joint-pmf", {
    source: "课堂图示",
    example: {
      title: "课堂结构图：联合分布列表的矩阵表示",
      body: [
        "行对应 $X$ 的取值，列对应 $Y$ 的取值，格内填写联合概率 $p_{ij}$。",
        "最后一行与最后一列通常放边缘概率。整张表的所有 $p_{ij}$ 非负且总和为 1。",
        jointPmfTable
      ]
    }
  });

  update("joint-density", {
    source: "课堂例题",
    example: {
      title: "课堂例题：指数型联合密度与三角形区域",
      body: [
        "设联合密度为 $f(x,y)=ke^{-(2x+y)}$，其中 $x>0,\\ y>0$，其他位置为 0。",
        "<strong>（1）</strong>利用全平面二重积分为 1，得到 $k=2$。",
        "<strong>（2）</strong>求落入 $D=\\{x+y<1\\}$ 的概率，积分区域是坐标轴和直线 $x+y=1$ 围成的三角形，结果为 $(1-e^{-1})^2\\approx0.3996$。",
        "<strong>（3）</strong>当 $x>0,y>0$ 时，联合分布函数为 $(1-e^{-2x})(1-e^{-y})$；其余位置为 0。"
      ],
      figures: [
        diagram(
          "三角形积分区域 D",
          "先固定 x，再从 y=0 积到 y=1−x；x 的范围从 0 到 1。",
          "0 0 560 340",
          `
          <path class="diagram-area" d="M108 282L452 282L108 76Z"/>
          <path class="diagram-axis" d="M84 282H508M108 52V310"/>
          <path class="diagram-axis" d="M500 275L508 282L500 289M101 66L108 52L115 66"/>
          <path class="diagram-guide" d="M452 282V94"/>
          <text class="diagram-math" x="468" y="311">x</text>
          <text class="diagram-math" x="121" y="309">O</text>
          <text class="diagram-math" x="406" y="310">1</text>
          <text class="diagram-math" x="78" y="88">1</text>
          <text class="diagram-text diagram-text--strong" x="220" y="218">D</text>
          <text class="diagram-text" x="273" y="112">x + y = 1</text>
          `
        )
      ]
    }
  });

  update("marginal-pmf-x", {
    source: "课堂例题",
    body: [
      "固定 $X=x_i$，把所有可能的 $Y$ 取值对应的联合概率相加。矩阵表示中就是该行求和。",
      "同理，固定 $Y=y_j$ 并按列求和，就得到 $Y$ 的边缘分布。"
    ],
    example: {
      title: "课堂例题：由联合分布表求两个边缘分布",
      body: [
        "给定二维离散随机变量的联合分布表，按行相加得到 $X$ 的边缘概率，按列相加得到 $Y$ 的边缘概率。",
        "右下角的合计为 1，可用于检查表格中的概率是否有遗漏。",
        pmfTable
      ]
    }
  });

  update("marginal-density-x", {
    source: "课堂例题",
    example: {
      title: "课堂例题：三角区域上的两个边缘密度",
      body: [
        "设联合密度为 $f(x,y)=cy(2-x)$，其中 $0\\le x\\le1,\\ 0\\le y\\le x$，其他位置为 0。",
        "先由归一化积分得到 $c=24/5$。再分别固定 $x$ 对 $y$ 积分、固定 $y$ 对 $x$ 积分。",
        "<strong>结果：</strong>$f_X(x)=\\frac{12}{5}x^2(2-x)$，$f_Y(y)=\\frac{24}{5}y(\\frac32-2y+\\frac{y^2}{2})$，均定义在 $[0,1]$ 上。"
      ],
      figures: [
        diagram(
          "三角形联合支撑区域",
          "区域由 0≤x≤1、0≤y≤x 确定。求 X 的边缘密度时，y 的上界是 x；求 Y 的边缘密度时，x 的下界是 y。",
          "0 0 560 340",
          `
          <path class="diagram-area" d="M112 278L428 278L428 66Z"/>
          <path class="diagram-axis" d="M84 278H504M112 46V310"/>
          <path class="diagram-axis" d="M496 271L504 278L496 285M105 60L112 46L119 60"/>
          <path class="diagram-guide" d="M428 278V86M112 66H446"/>
          <text class="diagram-math" x="468" y="308">x</text>
          <text class="diagram-math" x="78" y="74">1</text>
          <text class="diagram-math" x="116" y="310">O</text>
          <text class="diagram-math" x="382" y="310">1</text>
          <text class="diagram-text" x="170" y="166">y ≤ x</text>
          <text class="diagram-text diagram-text--strong" x="280" y="235">联合支撑区</text>
          `
        )
      ]
    }
  });

  const jointChapter = course.chapters.find((chapter) => chapter.id === "joint");
  if (jointChapter) {
    jointChapter.themes = jointChapter.themes.filter(
      (theme) => theme.id !== "joint-functions"
    );
  }
})();
