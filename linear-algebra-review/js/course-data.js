(function () {
  "use strict";

  function laSvg(id, title, subtitle, content, height = 330) {
    return `
      <svg class="la-svg" viewBox="0 0 760 ${height}" role="img" aria-label="${title}">
        <defs>
          <marker id="${id}-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="#3f7d79"></path>
          </marker>
          <marker id="${id}-arrow-warm" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="#b56545"></path>
          </marker>
        </defs>
        <text class="la-title" x="24" y="31">${title}</text>
        <text class="la-subtitle" x="24" y="53">${subtitle}</text>
        ${content}
      </svg>
    `;
  }

  function detMatrix({
    x,
    y,
    rows,
    cellW = 82,
    cellH = 48,
    classes = {},
    gap = 0,
    label = ""
  }) {
    const columns = Math.max(...rows.map((row) => row.length));
    const width = columns * (cellW + gap) - gap;
    const height = rows.length * (cellH + gap) - gap;
    let markup = "";
    if (label) {
      markup += `<text class="la-label--strong" x="${x - 34}" y="${y - 18}">${label}</text>`;
    }
    rows.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        const key = `${rowIndex},${columnIndex}`;
        const className = classes[key] || "la-cell";
        markup += `
          <rect class="${className}" x="${x + columnIndex * (cellW + gap)}"
            y="${y + rowIndex * (cellH + gap)}" width="${cellW}" height="${cellH}" rx="5"></rect>
          <text class="la-label" x="${x + columnIndex * (cellW + gap) + cellW / 2}"
            y="${y + rowIndex * (cellH + gap) + cellH / 2 + 5}"
            text-anchor="middle">${value}</text>
        `;
      });
    });
    markup += `
      <path class="la-bracket" d="M${x - 10},${y} H${x - 22} V${y + height} H${x - 10}"></path>
      <path class="la-bracket" d="M${x + width + 10},${y} H${x + width + 22} V${y + height} H${x + width + 10}"></path>
    `;
    return { markup, width, height };
  }

  const inversionFigure = laSvg(
    "inversion-map",
    "排列 42315 的逆序计数",
    "逐个检查 pᵢ 前面比它大的数，t₂…t₅ 分别为 1、1、3、0。",
    `
      <g>
        ${[
          ["4", 1, "1"],
          ["2", 2, "1"],
          ["3", 3, "1"],
          ["1", 4, "3"],
          ["5", 5, "0"]
        ].map(([value, index, count], itemIndex) => {
          const cx = 110 + itemIndex * 125;
          return `
            <circle cx="${cx}" cy="132" r="30" fill="${value === "1" ? "#f6e8df" : "#eef7f4"}"
              stroke="${value === "1" ? "#b56545" : "#6e9f8e"}" stroke-width="1.6"></circle>
            <text class="la-label--strong" x="${cx}" y="138" text-anchor="middle">${value}</text>
            <text class="la-label--small" x="${cx}" y="177" text-anchor="middle">p${"₂₃₄₅"[itemIndex]}</text>
            <text class="la-label--small" x="${cx}" y="199" text-anchor="middle">t${"₂₃₄₅"[itemIndex]} = ${count}</text>
          `;
        }).join("")}
        <path class="la-arrow la-arrow--warm" d="M113,230 Q210,282 300,230"></path>
        <path class="la-arrow la-arrow--warm" d="M113,250 Q270,330 425,250"></path>
        <path class="la-arrow la-arrow--warm" d="M235,250 Q320,315 425,250"></path>
        <text class="la-label--strong" x="532" y="160">τ(42315)</text>
        <text class="la-label--strong" x="532" y="190">= 1+1+3+0 = 5</text>
        <text class="la-label--small" x="532" y="218">奇数个逆序 ⇒ 奇排列</text>
      </g>
    `,
    330
  );

  const twoByTwoFigure = laSvg(
    "two-by-two",
    "二阶行列式的对角线法则",
    "主对角线乘积减去副对角线乘积。实线为正项，虚线为负项。",
    `
      ${detMatrix({
        x: 220,
        y: 98,
        rows: [["a₁₁", "a₁₂"], ["a₂₁", "a₂₂"]],
        cellW: 112,
        cellH: 64
      }).markup}
      <path class="la-arrow" d="M245,116 L425,235"></path>
      <path class="la-arrow la-arrow--warm la-arrow--dash" d="M425,116 L245,235"></path>
      <text class="la-label--small" x="255" y="255">a₁₁a₂₂</text>
      <text class="la-label--small" x="390" y="255">− a₁₂a₂₁</text>
      <text class="la-label--strong" x="548" y="150">D = a₁₁a₂₂ − a₁₂a₂₁</text>
      <text class="la-label--small" x="548" y="181">例：|3 2; −2 5|</text>
      <text class="la-label--small" x="548" y="208">= 3·5 − 2·(−2) = 19</text>
    `,
    285
  );

  const threeByThreeFigure = laSvg(
    "three-by-three",
    "三阶行列式：六条对角线",
    "向右补出前两列后，三条主线取正，三条副线取负。",
    `
      ${detMatrix({
        x: 112,
        y: 84,
        rows: [
          ["2", "1", "0"],
          ["−1", "3", "2"],
          ["1", "0", "4"]
        ],
        cellW: 74,
        cellH: 50
      }).markup}
      <g opacity=".42">
        ${detMatrix({
          x: 346,
          y: 84,
          rows: [["2", "1", "0"], ["−1", "3", "2"], ["1", "0", "4"]],
          cellW: 74,
          cellH: 50
        }).markup}
      </g>
      <path class="la-arrow" d="M125,94 L425,224"></path>
      <path class="la-arrow" d="M199,94 L499,224"></path>
      <path class="la-arrow" d="M273,94 L573,224"></path>
      <path class="la-arrow la-arrow--warm la-arrow--dash" d="M421,94 L149,224"></path>
      <path class="la-arrow la-arrow--warm la-arrow--dash" d="M495,94 L223,224"></path>
      <path class="la-arrow la-arrow--warm la-arrow--dash" d="M569,94 L297,224"></path>
      <text class="la-label--strong" x="590" y="126">D</text>
      <text class="la-label--small" x="590" y="154">正：2·3·4 + 1·2·1 + 0·(−1)·0</text>
      <text class="la-label--small" x="590" y="178">负：0·3·1 + 2·2·0 + 1·(−1)·4</text>
      <text class="la-label--strong" x="590" y="210">D = 30</text>
    `,
    280
  );

  const triangularFigure = laSvg(
    "triangular",
    "下三角行列式等于对角线乘积",
    "主对角线上方全为 0 时，只有“全取主对角线”的乘积项可能非零。",
    `
      ${detMatrix({
        x: 180,
        y: 84,
        rows: [
          ["2", "0", "0", "0"],
          ["3", "4", "0", "0"],
          ["1", "2", "3", "0"],
          ["2", "0", "1", "5"]
        ],
        cellW: 82,
        cellH: 46,
        classes: {
          "0,1": "la-cell--zero",
          "0,2": "la-cell--zero",
          "0,3": "la-cell--zero",
          "1,2": "la-cell--zero",
          "1,3": "la-cell--zero",
          "2,3": "la-cell--zero",
          "0,0": "la-cell--keep",
          "1,1": "la-cell--keep",
          "2,2": "la-cell--keep",
          "3,3": "la-cell--keep"
        }
      }).markup}
      <path class="la-arrow" d="M212,106 Q360,215 500,242" marker-end="url(#triangular-arrow)"></path>
      <text class="la-label--strong" x="558" y="132">D = a₁₁a₂₂a₃₃a₄₄</text>
      <text class="la-label--small" x="558" y="161">= 2 · 4 · 3 · 5</text>
      <text class="la-label--strong" x="558" y="192">= 120</text>
      <text class="la-label--small" x="558" y="222">上三角行列式同理</text>
    `,
    310
  );

  const rowOperationFigure = laSvg(
    "row-operation",
    "用行变换把行列式化成上三角",
    "每一步都记录是否换行、是否提出公因子；最后再乘回被提出的因子。",
    `
      <g>
        ${detMatrix({
          x: 72,
          y: 100,
          rows: [["1", "2", "3", "4"], ["2", "3", "4", "1"], ["0", "1", "2", "3"], ["1", "2", "1", "2"]],
          cellW: 57,
          cellH: 42
        }).markup}
        <path class="la-arrow" d="M320,146 H385" marker-end="url(#row-operation-arrow)"></path>
        <text class="la-label--small" x="322" y="126">r₂−2r₁</text>
        <text class="la-label--small" x="322" y="178">r₄−r₁</text>
        ${detMatrix({
          x: 420,
          y: 100,
          rows: [["1", "2", "3", "4"], ["0", "−1", "−2", "−7"], ["0", "1", "2", "3"], ["0", "0", "−2", "−2"]],
          cellW: 57,
          cellH: 42,
          classes: { "1,0": "la-cell--zero", "2,0": "la-cell--zero", "3,0": "la-cell--zero" }
        }).markup}
      </g>
      <text class="la-label--small" x="72" y="79">原行列式 D</text>
      <text class="la-label--small" x="420" y="79">第一次化简</text>
      <text class="la-label--small" x="72" y="290">注意：行加法不改变值；交换两行要变号；整行乘 k 后要补回因子。</text>
    `,
    310
  );

  const cofactorFigure = laSvg(
    "cofactor",
    "余子式与代数余子式",
    "划去 aᵢⱼ 所在行和列得到余子式 Mᵢⱼ；再乘 (−1)ⁱ⁺ʲ 得到 Aᵢⱼ。",
    `
      ${detMatrix({
        x: 104,
        y: 92,
        rows: [["a₁₁", "a₁₂", "a₁₃"], ["a₂₁", "a₂₂", "a₂₃"], ["a₃₁", "a₃₂", "a₃₃"]],
        cellW: 86,
        cellH: 52,
        classes: { "0,1": "la-cell--focus" }
      }).markup}
      <path class="la-delete" d="M100,76 H390"></path>
      <path class="la-delete" d="M272,76 V264"></path>
      <text class="la-label--small" x="104" y="66">划去第 1 行和第 2 列</text>
      ${detMatrix({
        x: 474,
        y: 116,
        rows: [["a₂₁", "a₂₃"], ["a₃₁", "a₃₃"]],
        cellW: 94,
        cellH: 54,
        label: "M₁₂"
      }).markup}
      <text class="la-label--strong" x="410" y="246">A₁₂ = (−1)¹⁺²M₁₂ = −M₁₂</text>
      <text class="la-label--small" x="104" y="292">符号棋盘：+ − + ／ − + − ／ + − +</text>
    `,
    315
  );

  const cramerFigure = laSvg(
    "cramer",
    "克莱姆法则：替换第 i 列",
    "Dᵢ 保持其它列不变，只把系数矩阵的第 i 列替换成常数项列。",
    `
      ${detMatrix({
        x: 70,
        y: 98,
        rows: [["a₁₁", "a₁₂"], ["a₂₁", "a₂₂"]],
        cellW: 82,
        cellH: 48,
        label: "D"
      }).markup}
      ${detMatrix({
        x: 302,
        y: 98,
        rows: [["b₁", "a₁₂"], ["b₂", "a₂₂"]],
        cellW: 82,
        cellH: 48,
        classes: { "0,0": "la-cell--focus", "1,0": "la-cell--focus" },
        label: "D₁"
      }).markup}
      ${detMatrix({
        x: 534,
        y: 98,
        rows: [["a₁₁", "b₁"], ["a₂₁", "b₂"]],
        cellW: 82,
        cellH: 48,
        classes: { "0,1": "la-cell--focus", "1,1": "la-cell--focus" },
        label: "D₂"
      }).markup}
      <path class="la-arrow la-arrow--warm" d="M220,132 Q322,68 410,132" marker-end="url(#cramer-arrow-warm)"></path>
      <path class="la-arrow la-arrow--warm" d="M452,132 Q560,69 650,132" marker-end="url(#cramer-arrow-warm)"></path>
      <text class="la-label--strong" x="242" y="239">x₁ = D₁ / D</text>
      <text class="la-label--strong" x="485" y="239">x₂ = D₂ / D</text>
      <text class="la-label--small" x="70" y="286">前提：D ≠ 0。D=0 时不能直接套克莱姆公式。</text>
    `,
    315
  );

  const laplaceFigure = laSvg(
    "laplace",
    "拉普拉斯分块展开",
    "取定若干行后，所有 k 阶子式与其代数余子式的乘积之和等于原行列式。",
    `
      <text class="la-label--strong" x="48" y="118">D =</text>
      <rect class="la-panel" x="120" y="80" width="210" height="180" rx="10"></rect>
      <rect class="la-panel la-panel--cool" x="142" y="102" width="80" height="118" rx="7"></rect>
      <rect class="la-panel la-panel--warm" x="228" y="230" width="80" height="18" rx="5"></rect>
      <rect class="la-panel la-panel--warm" x="228" y="102" width="80" height="118" rx="7"></rect>
      <text class="la-label" x="182" y="168" text-anchor="middle">D₁</text>
      <text class="la-label" x="268" y="168" text-anchor="middle">0</text>
      <text class="la-label" x="182" y="251" text-anchor="middle">C</text>
      <text class="la-label" x="268" y="251" text-anchor="middle">D₂</text>
      <path class="la-arrow" d="M372,167 H458" marker-end="url(#laplace-arrow)"></path>
      <text class="la-label--strong" x="492" y="149">D = D₁ · D₂</text>
      <text class="la-label--small" x="492" y="180">上三角分块：右上块为 0</text>
      <text class="la-label--small" x="492" y="207">下三角分块：左下块为 0，同理</text>
      <text class="la-label--small" x="48" y="300">图中 D₁ 为 k 阶方阵，D₂ 为 n−k 阶方阵，C 可为任意矩阵。</text>
    `,
    320
  );

  window.LINEAR_ALGEBRA_COURSE = {
    title: "线性代数",
    subtitle: "排列、逆序数、行列式与克莱姆法则的一条计算主线",
    updatedAt: "2026-11-12",
    chapters: [
      {
        id: "permutations",
        number: "1.1",
        title: "排列与逆序数",
        english: "Permutations & Inversions",
        accent: "brick",
        summary: "先建立排列、标准排列、逆序与逆序数的语言，再理解对换为什么一定改变排列的奇偶性。",
        examFocus: ["n 阶排列个数", "逆序数逐项计数", "奇偶排列", "对换性质"],
        themes: [
          {
            id: "permutation-foundation",
            title: "排列、标准排列与逆序数",
            summary: "排列是带次序的数组；逆序数把“次序打乱了多少”转化为一个可计算的整数。",
            cards: [
              {
                id: "n-order-permutation",
                type: "definition",
                title: "n 阶排列",
                body: [
                  "由 $1,2,\\ldots,n$ 这 $n$ 个互不相同的数组成的有序数组 $p_1p_2\\cdots p_n$，称为一个 <strong>n 阶排列</strong>。",
                  "把 $1,2,\\ldots,n$ 按自然次序排成的排列 $12\\cdots n$，称为<strong>标准排列</strong>或自然排列。"
                ],
                note: "“排列”强调次序。数字集合相同而次序不同，仍属于不同排列。"
              },
              {
                id: "permutation-count",
                type: "formula",
                title: "n 阶排列的总数",
                body: [
                  "第 1 位有 $n$ 种选择，第 2 位有 $n-1$ 种选择，依此类推。"
                ],
                formula: String.raw`N_n=n(n-1)(n-2)\cdots2\cdot1=n!`
              },
              {
                id: "inversion-definition",
                type: "definition",
                title: "逆序与逆序数",
                body: [
                  "在排列 $p_1p_2\\cdots p_n$ 中，如果较大的数排在较小的数前面，就称这两个数组成一个<strong>逆序</strong>。",
                  "排列中全部逆序的个数称为该排列的<strong>逆序数</strong>，记作 $\\tau(p_1p_2\\cdots p_n)$。"
                ],
                formula: String.raw`\tau(p_1p_2\cdots p_n)=t_2+t_3+\cdots+t_n=\sum_{i=2}^{n}t_i`
              },
              {
                id: "inversion-counting",
                type: "formula",
                title: "逐项计数法",
                body: [
                  "对每个 $p_i$（从第 2 位开始）向右看，只需数出它<strong>左边</strong>比它大的数，得到 $t_i$。",
                  "把所有 $t_i$ 相加即可。这个算法比枚举所有数对更不容易漏项。"
                ],
                bullets: [
                  "标准排列 $12\\cdots n$ 的每个 $t_i$ 都为 0，因此逆序数为 0。",
                  "逆序数越小，排列越接近标准排列。"
                ]
              },
              {
                id: "permutation-parity",
                type: "judgment",
                title: "奇排列与偶排列",
                body: [
                  "若 $\\tau(p_1p_2\\cdots p_n)$ 为偶数，则称为<strong>偶排列</strong>；若为奇数，则称为<strong>奇排列</strong>。",
                  "标准排列的逆序数为 0，因此标准排列是偶排列。"
                ],
                formula: String.raw`\tau(p)=\tau(q)\pmod 2 \iff p,q\text{ 同奇偶}`
              },
              {
                id: "inversion-example",
                type: "example",
                title: "课堂例：计算 42315 与 53412 的逆序数",
                body: [
                  "$42315$：$t_2=1$，$t_3=1$，$t_4=3$，$t_5=0$，所以 $\\tau=5$，是奇排列。",
                  "$53412$：$t_2=1$，$t_3=1$，$t_4=3$，$t_5=3$，所以 $\\tau=8$，是偶排列。"
                ],
                formula: String.raw`\tau(42315)=1+1+3+0=5,\qquad
\tau(53412)=1+1+3+3=8`,
                figures: [
                  {
                    title: "逐项统计 tᵢ",
                    caption: "每个 tᵢ 只统计该元素左侧比它大的数。",
                    svg: inversionFigure
                  }
                ]
              }
            ]
          },
          {
            id: "transpositions",
            title: "对换与奇偶性",
            summary: "对换是一次“只交换两个位置”的操作；它不会保持排列的奇偶性，而是必然把奇偶性翻转。",
            cards: [
              {
                id: "transposition-definition",
                type: "definition",
                title: "对换与相邻对换",
                body: [
                  "在排列中只交换任意两个元素的位置，其余元素位置不变，这种操作称为<strong>对换</strong>。",
                  "交换相邻两个元素的对换称为<strong>相邻对换</strong>。"
                ]
              },
              {
                id: "transposition-parity",
                type: "property",
                title: "性质：一次对换改变奇偶性",
                body: [
                  "任意一个排列经过一次对换后，奇排列变成偶排列，偶排列变成奇排列。",
                  "因此连续做 $k$ 次对换后，排列与原来的奇偶关系由 $k$ 的奇偶性决定。"
                ],
                formula: String.raw`p\overset{\text{一次对换}}{\longrightarrow}q
\quad\Rightarrow\quad \tau(p)\not\equiv\tau(q)\pmod 2`
              },
              {
                id: "transpositions-to-standard",
                type: "property",
                title: "化到标准排列所需对换次数的奇偶性",
                body: [
                  "偶排列化成标准排列，所需对换次数为偶数；奇排列化成标准排列，所需对换次数为奇数。",
                  "证明思路：标准排列的逆序数为 0；每做一次对换，逆序数的奇偶性翻转一次。"
                ]
              },
              {
                id: "adjacent-swap-example",
                type: "example",
                title: "相邻对换如何改变逆序数",
                body: [
                  "$42315$ 的逆序数为 5。交换相邻的 $2,3$ 得到 $43215$，逆序数变为 6。",
                  "$53412$ 的逆序数为 8。交换相邻的 $3,4$ 得到 $54312$，逆序数变为 9。"
                ],
                formula: String.raw`5\ \text{（奇）}\longrightarrow 6\ \text{（偶）},\qquad
8\ \text{（偶）}\longrightarrow 9\ \text{（奇）}`
              },
              {
                id: "parity-warning",
                type: "warning",
                title: "不要用“看起来乱不乱”判断奇偶性",
                body: [
                  "奇偶性只由逆序数的奇偶性决定，与数字大小、排列看起来是否“整齐”无关。",
                  "考试中先逐项算 $t_i$，再判奇偶；求符号 $(-1)^{\\tau}$ 时直接使用逆序数奇偶即可。"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "determinant-definition",
        number: "1.2",
        title: "n 阶行列式的定义",
        english: "Definition of Determinants",
        accent: "forest",
        summary: "从消元法解二元一次方程组出发，依次建立二阶、三阶和 n 阶行列式的定义与计算方法。",
        examFocus: ["二阶对角线法则", "三阶六项展开", "n 阶置换定义", "三角与对角行列式"],
        themes: [
          {
            id: "low-order-determinants",
            title: "二阶与三阶行列式",
            summary: "低阶行列式是后续所有性质与展开定理的具体模型。",
            cards: [
              {
                id: "two-equations-elimination",
                type: "definition",
                title: "二阶行列式的消元来源",
                body: [
                  "解二元一次方程组时，分别消去一个未知数，两个方程解的分母都会出现同一个表达式 $a_{11}a_{22}-a_{12}a_{21}$。",
                  "为了便于记忆，把这个四个数排成的数表所确定的表达式定义为二阶行列式。"
                ],
                formula: String.raw`\begin{aligned}
a_{11}x_1+a_{12}x_2&=b_1,\\
a_{21}x_1+a_{22}x_2&=b_2.
\end{aligned}`
              },
              {
                id: "second-order-definition",
                type: "definition",
                title: "二阶行列式",
                body: [
                  "四个数排成二行二列的数表，所确定的表达式 $a_{11}a_{22}-a_{12}a_{21}$ 称为二阶行列式。",
                  "元素 $a_{ij}$ 的第一个下标 $i$ 是行标，第二个下标 $j$ 是列标。"
                ],
                formula: String.raw`D=\begin{vmatrix}
a_{11}&a_{12}\\a_{21}&a_{22}
\end{vmatrix}=a_{11}a_{22}-a_{12}a_{21}`
              },
              {
                id: "second-order-diagonal",
                type: "property",
                title: "二阶行列式的对角线法则",
                body: [
                  "主对角线从左上到右下，副对角线从右上到左下。二阶行列式等于主对角线乘积减去副对角线乘积。"
                ],
                example: {
                  title: "计算二阶行列式",
                  body: [
                    "$\\begin{vmatrix}3&2\\\\-2&5\\end{vmatrix}=3\\times5-2\\times(-2)=19$。"
                  ],
                  figures: [
                    {
                      title: "主对角线与副对角线",
                      caption: "实线项取正，虚线项取负。",
                      svg: twoByTwoFigure
                    }
                  ]
                }
              },
              {
                id: "two-variable-cramer",
                type: "formula",
                title: "二阶方程组的行列式解",
                body: [
                  "当系数行列式 $D\\ne0$ 时，用常数项分别替换对应未知数的系数列，得到 $D_1,D_2$。"
                ],
                formula: String.raw`x_1=\frac{D_1}{D},\qquad x_2=\frac{D_2}{D}`
              },
              {
                id: "two-by-two-system-example",
                type: "example",
                title: "解二元一次方程组",
                body: [
                  "方程组为 $3x_1+x_2=5,\\ 2x_1-4x_2=-6$。",
                  "$D=-14$，$D_1=-14$，$D_2=-28$，所以 $x_1=1,x_2=2$。"
                ],
                formula: String.raw`\begin{aligned}
D&=\begin{vmatrix}3&1\\2&-4\end{vmatrix}=-14,\\
D_1&=\begin{vmatrix}5&1\\-6&-4\end{vmatrix}=-14,\\
D_2&=\begin{vmatrix}3&5\\2&-6\end{vmatrix}=-28.
\end{aligned}`
              },
              {
                id: "third-order-definition",
                type: "definition",
                title: "三阶行列式",
                body: [
                  "$3^2=9$ 个数排成三行三列的数表，所确定的六个乘积项代数和称为三阶行列式。",
                  "每项都从不同行、不同列各取一个元素相乘，项数为 $3!=6$。"
                ],
                formula: String.raw`\begin{vmatrix}
a_{11}&a_{12}&a_{13}\\
a_{21}&a_{22}&a_{23}\\
a_{31}&a_{32}&a_{33}
\end{vmatrix}
=\sum_{p\in S_3}(-1)^{\tau(p)}
a_{1p_1}a_{2p_2}a_{3p_3}`
              },
              {
                id: "third-order-diagonal",
                type: "property",
                title: "三阶行列式的对角线法则",
                body: [
                  "将前两列依次补在右侧，三条实线方向对应正项，三条虚线方向对应负项。",
                  "对角线法则只适用于二阶和三阶，四阶及以上必须使用性质或展开定理。"
                ],
                example: {
                  title: "三阶对角线展开",
                  body: [
                    "对矩阵 $(2,1,0;-1,3,2;1,0,4)$，正项和为 $26$，负项和为 $-4$，所以 $D=30$。"
                  ],
                  figures: [
                    {
                      title: "补列后的六条对角线",
                      caption: "三条实线项相加，再减去三条虚线项。",
                      svg: threeByThreeFigure
                    }
                  ]
                }
              }
            ]
          },
          {
            id: "general-definition",
            title: "n 阶行列式与特殊结构",
            summary: "n 阶行列式的置换定义统一了低阶公式；三角、对角和副对角结构可化为元素乘积。",
            cards: [
              {
                id: "n-order-definition",
                type: "definition",
                title: "n 阶行列式",
                body: [
                  "$n^2$ 个数排成 $n$ 行 $n$ 列的数表，并记为一个以竖线包围的符号。",
                  "它的展开式是对所有 $n$ 阶排列求和：每项从不同行、不同列取 $n$ 个元素，符号由列标排列的逆序数决定。"
                ],
                formula: String.raw`D=\begin{vmatrix}
a_{11}&a_{12}&\cdots&a_{1n}\\
a_{21}&a_{22}&\cdots&a_{2n}\\
\vdots&\vdots&&\vdots\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{vmatrix}
=\sum_{p_1p_2\cdots p_n}(-1)^{\tau(p_1p_2\cdots p_n)}
a_{1p_1}a_{2p_2}\cdots a_{np_n}`
              },
              {
                id: "term-structure",
                type: "property",
                title: "n 阶行列式展开式的结构",
                body: [
                  "展开式共有 $n!$ 项。",
                  "每一项由 $n$ 个元素相乘组成，且这些元素来自不同行、不同列。",
                  "当列标排列为偶排列时取正号，为奇排列时取负号。",
                  "也可以固定列标、按行标排列的奇偶性取号；两种定义只差一次转置，所得行列式相同。"
                ],
                formula: String.raw`\#\{\text{项}\}=n!,\qquad
\operatorname{sgn}(p)=(-1)^{\tau(p)}`
              },
              {
                id: "one-order-warning",
                type: "warning",
                title: "一阶行列式不是绝对值",
                body: [
                  "特别地，当 $n=1$ 时，$|a_{11}|=a_{11}$。这里的竖线表示一阶行列式，不要与实数的绝对值混淆。"
                ]
              },
              {
                id: "triangular-determinant",
                type: "formula",
                title: "上三角与下三角行列式",
                body: [
                  "主对角线一侧全为 0 的行列式称为三角行列式。其值等于主对角线元素之积。"
                ],
                formula: String.raw`D_{\text{upper}}=
D_{\text{lower}}=\prod_{i=1}^{n}a_{ii}`,
                example: {
                  title: "下三角行列式等于 120",
                  body: [
                    "主对角线上方全为 0，只有取遍主对角线元素的乘积项可能非零。"
                  ],
                  figures: [
                    {
                      title: "三角结构的非零路径",
                      caption: "灰色格为 0；只有主对角线乘积存活。",
                      svg: triangularFigure
                    }
                  ]
                }
              },
              {
                id: "diagonal-determinants",
                type: "formula",
                title: "对角行列式与副对角行列式",
                body: [
                  "普通对角行列式等于对角线元素乘积。",
                  "副对角行列式还需乘以排列 $n(n-1)\\cdots1$ 的符号 $(-1)^{n(n-1)/2}$。"
                ],
                formula: String.raw`\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
=\prod_{i=1}^{n}\lambda_i,\qquad
D_{\text{anti}}=(-1)^{\frac{n(n-1)}2}\prod_{i=1}^{n}\lambda_i`
              }
            ]
          }
        ]
      },
      {
        id: "determinant-properties",
        number: "1.3",
        title: "行列式的性质",
        english: "Properties of Determinants",
        accent: "indigo",
        summary: "行列式的性质把复杂行列式化为三角形或简单结构。核心是转置不变、换行变号、提公因子、可加性和倍加不变。",
        examFocus: ["转置不变", "换行变号", "提取公因子", "倍加不变", "化三角计算"],
        themes: [
          {
            id: "basic-properties",
            title: "五条核心性质",
            summary: "行列、列在行列式中的地位相同；后续所有行变换规则和列变换规则完全对应。",
            cards: [
              {
                id: "transpose-invariance",
                type: "property",
                title: "性质 1：转置不改变行列式",
                body: [
                  "把行列式的每一行依次改写为每一列，得到转置行列式 $D^T$。",
                  "行列互换不改变全部乘积项及其符号，因此 $D^T=D$。"
                ],
                formula: String.raw`D^T=D`
              },
              {
                id: "swap-sign",
                type: "property",
                title: "性质 2：交换两行或两列，行列式变号",
                body: [
                  "交换行列式的任意两行（或两列），新行列式等于原来的相反数。",
                  "由此可得：若存在两行完全相同，交换这两行后行列式不变，但同时应变号，于是 $D=-D$，所以 $D=0$。"
                ],
                formula: String.raw`r_i\leftrightarrow r_j:\quad D\mapsto-D`
              },
              {
                id: "row-factor",
                type: "property",
                title: "性质 3：一行或一列的公因子可提出",
                body: [
                  "数 $k$ 乘行列式的某一行（或某一列）的所有元素，等于用 $k$ 乘整个行列式。",
                  "如果一行（列）的所有元素都有公因子，可以把公因子提到行列式外。"
                ],
                formula: String.raw`|ka_{ij}|_{i=1}^{n}=k|a_{ij}|_{i=1}^{n}`
              },
              {
                id: "proportional-rows",
                type: "judgment",
                title: "两行或两列成比例，行列式为零",
                body: [
                  "先由性质 3 把比例系数提出，再利用两行相同则行列式为零。",
                  "特别地，有两行（列）相同或有零行（列），行列式也为零。"
                ],
                formula: String.raw`r_i=k\,r_j\quad(i\ne j)\Rightarrow D=0`
              },
              {
                id: "additive-property",
                type: "property",
                title: "性质 4：某一行可拆成两项之和",
                body: [
                  "如果某一行（列）的每个元素都由两个数相加组成，则行列式可拆成两个行列式之和。",
                  "拆分时其它行（列）保持不动，只拆分目标行（列）。"
                ],
                formula: String.raw`\begin{vmatrix}
\cdots&\cdots&\cdots\\
b_j+c_j&d_j+e_j&f_j+g_j\\
\cdots&\cdots&\cdots
\end{vmatrix}
=
\begin{vmatrix}
\cdots&\cdots&\cdots\\
b_j&d_j&f_j\\
\cdots&\cdots&\cdots
\end{vmatrix}
+
\begin{vmatrix}
\cdots&\cdots&\cdots\\
c_j&e_j&g_j\\
\cdots&\cdots&\cdots
\end{vmatrix}`
              },
              {
                id: "row-addition",
                type: "property",
                title: "性质 5：倍加变换不改变行列式",
                body: [
                  "把某一行（列）的 $k$ 倍加到另一行（列）的对应元素上，行列式的值不变。",
                  "这是化上三角行列式最常用的操作。"
                ],
                formula: String.raw`r_i\leftarrow r_i+k r_j,\quad i\ne j
\qquad\Rightarrow\qquad D\text{ 不变}`
              },
              {
                id: "operation-notation",
                type: "definition",
                title: "三种行列变换记号",
                body: [
                  "$r_i\\leftrightarrow r_j$：交换第 $i,j$ 行；交换一次乘 $-1$。",
                  "$k r_i$：第 $i$ 行全部乘 $k$；若要在外面补回，整个行列式乘 $1/k$。",
                  "$r_i+k r_j$：第 $j$ 行的 $k$ 倍加到第 $i$ 行；行列式不变。"
                ],
                note: "列变换把 $r$ 换成 $c$ 即可，规则完全相同。"
              }
            ]
          },
          {
            id: "property-computation",
            title: "用性质计算行列式",
            summary: "行列式化简的目标通常是制造零、提出公因子并化为三角形，而不是盲目套展开式。",
            cards: [
              {
                id: "row-reduction-workflow",
                type: "formula",
                title: "化三角形计算流程",
                body: [
                  "先用倍加变换消去主对角线下方元素；若需要换行，记录一次负号；若整行提过公因子，最后补乘回去。",
                  "化成上三角后，用主对角线元素乘积得到结果。"
                ],
                example: {
                  title: "倍加变换制造零",
                  body: [
                    "本例只使用倍加变换，因此行列式的值始终不变。"
                  ],
                  figures: [
                    {
                      title: "行变换结构图",
                      caption: "每一步标记所执行的行变换。",
                      svg: rowOperationFigure
                    }
                  ]
                }
              },
              {
                id: "row-reduction-example",
                type: "example",
                title: "四阶行列式化三角",
                body: [
                  "$\\begin{vmatrix}-1&3&1&2\\\\2&2&4&0\\\\-1&2&0&3\\\\1&1&3&5\\end{vmatrix}$",
                  "先提出第二行公因子 2，再用倍加变换消去第一列下方的 2、−1、1；接着制造第二、三列零。",
                  "最后得到三角结构，非对角元素按照对角线乘积计算；过程中换过一次行，所以补乘 $-1$。"
                ],
                formula: String.raw`D=-2\cdot(-1)\cdot(-1)\cdot(-1)\cdot11=22`
              },
              {
                id: "swap-reduction-example",
                type: "example",
                title: "练习：倍加与换行混合使用",
                body: [
                  "对行列式 $\\begin{vmatrix}1&2&3&4\\\\2&3&4&1\\\\0&1&2&3\\\\1&2&1&2\\end{vmatrix}$，先作 $r_2-2r_1$、$r_4-r_1$，再作 $r_3+r_2$。",
                  "随后交换第 3、4 行并继续化为三角行列式。每次换行都要记录一个负号。",
                  "最终得到主对角线乘积 $-8$ 的变化结果，故 $D=8$。"
                ],
                formula: String.raw`r_i\leftarrow r_i+kr_j:\ D\text{ 不变};\qquad
r_i\leftrightarrow r_j:\ D\mapsto-D`
              },
              {
                id: "circulant-example",
                type: "example",
                title: "行列和相同的 n 阶行列式",
                body: [
                  "矩阵主对角线全为 $x$，其余位置全为 $a$。先把所有列加到第一列，再将其它列减去第一列。",
                  "第一列提出公因子 $x+(n-1)a$，剩余部分化为下三角，可得到闭式结果。"
                ],
                formula: String.raw`D_n=
\begin{vmatrix}
x&a&a&\cdots&a\\
a&x&a&\cdots&a\\
a&a&x&\cdots&a\\
\vdots&\vdots&\vdots&&\vdots\\
a&a&a&\cdots&x
\end{vmatrix}
=[x+(n-1)a](x-a)^{n-1}`
              },
              {
                id: "anti-diagonal-block-example",
                type: "example",
                title: "副对角分块行列式",
                body: [
                  "对于右上块和左下块中各行各列交错排列的 $2n$ 阶行列式，把对称列相加可以制造对角块结构。",
                  "课堂例题的矩阵只有 $a,b$ 两条交错对角线，其余位置为零；列相加与相减后化为两个三角分块，结果为 $(a^2-b^2)^n$。"
                ],
                formula: String.raw`D_{2n}=(a+b)^n(a-b)^n=(a^2-b^2)^n`
              },
              {
                id: "property-example-warning",
                type: "warning",
                title: "提公因子只提一行，不要提遍全矩阵",
                body: [
                  "若整个矩阵每个元素都乘 $k$，则 $n$ 阶行列式会乘 $k^n$，因为每一行都可以各提出一个 $k$。",
                  "$|kA|=k^n|A|$，而“只有一行乘 $k$”才是 $|B|=k|A|$。"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "cofactor-expansion",
        number: "1.4",
        title: "按行（列）展开",
        english: "Cofactor Expansion",
        accent: "brick",
        summary: "把高阶行列式降为低阶行列式：先定义余子式和代数余子式，再掌握按一行展开、异行乘积为零与拉普拉斯定理。",
        examFocus: ["余子式", "代数余子式符号", "按行展开", "范德蒙德行列式", "拉普拉斯定理"],
        themes: [
          {
            id: "cofactors",
            title: "余子式与代数余子式",
            summary: "代数余子式 = 余子式 × 位置决定的符号。",
            cards: [
              {
                id: "minor-definition",
                type: "definition",
                title: "余子式",
                body: [
                  "在 $n$ 阶行列式中，划去元素 $a_{ij}$ 所在的第 $i$ 行和第 $j$ 列，剩下元素保持原次序组成的 $n-1$ 阶行列式，称为 $a_{ij}$ 的余子式，记作 $M_{ij}$。"
                ]
              },
              {
                id: "cofactor-definition",
                type: "definition",
                title: "代数余子式",
                body: [
                  "余子式再乘位置符号 $(-1)^{i+j}$，得到代数余子式 $A_{ij}$。",
                  "符号呈现棋盘规律，不是简单的“奇数行全负”或“偶数列全正”。"
                ],
                formula: String.raw`A_{ij}=(-1)^{i+j}M_{ij}`,
                example: {
                  title: "划去第 1 行第 2 列",
                  body: [
                    "$A_{12}=(-1)^{1+2}M_{12}=-M_{12}$。"
                  ],
                  figures: [
                    {
                      title: "余子式和符号棋盘",
                      caption: "虚线表示被划去的行和列。",
                      svg: cofactorFigure
                    }
                  ]
                }
              },
              {
                id: "cofactor-expansion-theorem",
                type: "formula",
                title: "按任意一行或一列展开",
                body: [
                  "$n$ 阶行列式等于任意一行（列）的各元素与其对应代数余子式乘积之和。",
                  "实际计算时，优先选择零元素最多的一行或一列。"
                ],
                formula: String.raw`D=\sum_{j=1}^{n}a_{ij}A_{ij}
=\sum_{i=1}^{n}a_{ij}A_{ij}`
              },
              {
                id: "alien-cofactor-sum",
                type: "judgment",
                title: "异行或异列的代数余子式乘积和为零",
                body: [
                  "第 $i$ 行的元素乘第 $s$ 行对应位置的代数余子式，当 $i\\ne s$ 时总和为 0。",
                  "列也有相同结论。这是解方程组与验证克莱姆公式的关键。"
                ],
                formula: String.raw`\sum_{j=1}^{n}a_{ij}A_{sj}=\begin{cases}
D,&i=s,\\0,&i\ne s.
\end{cases}`
              },
              {
                id: "cofactor-four-by-four-example",
                type: "example",
                title: "四阶行列式的展开降阶",
                body: [
                  "$D=\\begin{vmatrix}3&1&-1&2\\\\-5&1&3&-4\\\\2&0&1&-1\\\\1&-5&3&-3\\end{vmatrix}$。",
                  "先用列变换制造某一行的大量零，再沿该行展开；随后继续对三阶、二阶行列式展开。",
                  "$D=40$。"
                ]
              }
            ]
          },
          {
            id: "laplace",
            title: "拉普拉斯定理与分块行列式",
            summary: "一次取 k 行展开，可以把矩阵分块结构的行列式直接化成若干小行列式的乘积。",
            cards: [
              {
                id: "k-order-minor",
                type: "definition",
                title: "k 阶子式与代数余子式",
                body: [
                  "在 $n$ 阶行列式中任选 $k$ 行和 $k$ 列，交叉处元素保持原次序构成一个 $k$ 阶行列式 $N$，称为原行列式的 $k$ 阶子式。",
                  "划去这些行、列后余下元素构成 $n-k$ 阶余子式 $M$；再乘符号 $(-1)^{\\sum i_r+\\sum j_r}$，得到代数余子式。"
                ]
              },
              {
                id: "laplace-theorem",
                type: "formula",
                title: "拉普拉斯定理",
                body: [
                  "取定 $k$ 行，用这些行中所有 $k$ 阶子式分别乘其代数余子式，再把乘积相加，结果等于原行列式。"
                ],
                formula: String.raw`D=\sum N_i A_i`
              },
              {
                id: "block-triangular",
                type: "formula",
                title: "上三角或下三角分块行列式",
                body: [
                  "若右上分块为 0，或左下分块为 0，则行列式等于两个对角分块行列式的乘积。",
                  "证明可由按前 $k$ 行或前 $k$ 列使用拉普拉斯定理得到。"
                ],
                formula: String.raw`\det\begin{pmatrix}A&0\\C&B\end{pmatrix}
=\det A\cdot\det B,\qquad
\det\begin{pmatrix}A&C\\0&B\end{pmatrix}
=\det A\cdot\det B`,
                example: {
                  title: "分块结构的直接计算",
                  body: [
                    "只要非对角那一块整体为 0，就不需要展开整个大矩阵。"
                  ],
                  figures: [
                    {
                      title: "上三角分块",
                      caption: "右上块为 0，行列式拆分两个小行列式。",
                      svg: laplaceFigure
                    }
                  ]
                }
              },
              {
                id: "laplace-four-by-four-example",
                type: "example",
                title: "用拉普拉斯定理计算四阶行列式",
                body: [
                  "取第一、二行，列出所有非零的二阶子式及其代数余子式。",
                  "$N_1=16,N_2=-5,N_3=-30$，对应代数余子式为 $A_1=10,A_2=12,A_3=0$。",
                  "所以 $D=N_1A_1+N_2A_2+N_3A_3=160-60+0=100$。"
                ],
                formula: String.raw`D=16\cdot10+(-5)\cdot12+(-30)\cdot0=100`
              },
              {
                id: "block-five-by-five-example",
                type: "example",
                title: "五阶分块行列式的拆解",
                body: [
                  "课堂例 6 的五阶行列式可根据零块拆成两个小行列式的乘积。",
                  "分块后只需分别计算一个三阶行列式和一个二阶行列式，再相乘即可。"
                ],
                formula: String.raw`D=
\begin{vmatrix}2&0&1\\1&2&1\\0&1&2\end{vmatrix}
\begin{vmatrix}3&5\\2&4\end{vmatrix}
=7\cdot2=14`
              },
              {
                id: "vandermonde",
                type: "formula",
                title: "范德蒙德行列式",
                body: [
                  "从第 $n$ 行起逐行减去上一行的 $x_1$ 倍，再按第一列展开，可得范德蒙德行列式。",
                  "当且仅当 $x_1,x_2,\\ldots,x_n$ 互不相同时，范德蒙德行列式不为 0。"
                ],
                formula: String.raw`V_n=
\begin{vmatrix}
1&1&\cdots&1\\
x_1&x_2&\cdots&x_n\\
x_1^2&x_2^2&\cdots&x_n^2\\
\vdots&\vdots&&\vdots\\
x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
\end{vmatrix}
=\prod_{1\le j<i\le n}(x_i-x_j)`
              },
              {
                id: "expansion-warning",
                type: "warning",
                title: "展开时别忘了位置符号",
                body: [
                  "沿第 $i$ 行展开时，每一项是 $a_{ij}A_{ij}$，而 $A_{ij}$ 已包含 $(-1)^{i+j}$。",
                  "常见错误是先展开低阶行列式，最后统一乘错号；应按棋盘符号逐个核对。"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "cramers-rule",
        number: "1.5",
        title: "克莱姆法则",
        english: "Cramer's Rule",
        accent: "forest",
        summary: "当 n 个方程、n 个未知量的线性方程组系数行列式不为 0 时，可直接用行列式表示唯一解。",
        examFocus: ["系数行列式", "常数列替换", "唯一解公式", "齐次方程组非零解"],
        themes: [
          {
            id: "cramer-rule",
            title: "克莱姆法则与解的表示",
            summary: "D 是系数矩阵的行列式；Dᵢ 只替换第 i 列。",
            cards: [
              {
                id: "cramer-theorem",
                type: "formula",
                title: "克莱姆法则",
                body: [
                  "对于含有 $n$ 个未知量的 $n$ 个线性方程的方程组，如果系数行列式 $D\\ne0$，则方程组有且仅有唯一解。"
                ],
                formula: String.raw`x_i=\frac{D_i}{D},\qquad i=1,2,\ldots,n`
              },
              {
                id: "cramer-replacement",
                type: "definition",
                title: "$D_i$ 的构造",
                body: [
                  "把系数行列式 $D$ 的第 $i$ 列替换为方程组右端常数项 $b_1,b_2,\\ldots,b_n$，其它列保持不变，所得行列式记为 $D_i$。",
                  "不要同时改动多列；一次只替换一个未知数对应的列。"
                ],
                example: {
                  title: "二阶情形的列替换",
                  body: [
                    "$D_1$ 替换第 1 列，$D_2$ 替换第 2 列。"
                  ],
                  figures: [
                    {
                      title: "D、D₁、D₂ 的关系",
                      caption: "橙色格表示被常数项替换的位置。",
                      svg: cramerFigure
                    }
                  ]
                }
              },
              {
                id: "cramer-proof-idea",
                type: "formula",
                title: "证明思路：用异行代数余子式消元",
                body: [
                  "把 $D_i$ 沿第 $i$ 列展开，常数项与对应代数余子式相乘。",
                  "再利用异行代数余子式之和为 0，可验证 $x_i=D_i/D$ 确实满足原方程组。"
                ]
              },
              {
                id: "cramer-example-3",
                type: "example",
                title: "含参数 λ、μ 的齐次方程组",
                body: [
                  "方程组为 $\\lambda x_1+x_2+x_3=0,\\ x_1+\\mu x_2+x_3=0,\\ x_1+2\\mu x_2+x_3=0$。",
                  "齐次方程组有非零解的必要条件是系数行列式 $D=0$。",
                  "对第二、三行作差化零，可得到 $D=-\\mu(\\lambda-1)$。因此 $\\mu=0$ 或 $\\lambda=1$ 时存在非零解。"
                ]
              },
              {
                id: "homogeneous-theorem",
                type: "judgment",
                title: "齐次方程组和非零解",
                body: [
                  "齐次线性方程组总有零解。",
                  "当系数行列式 $D\\ne0$ 时，仅有零解。",
                  "当齐次方程组有非零解时，必有 $D=0$。注意：$D=0$ 是必要条件，使用前还要确认方程组确为齐次。"
                ],
                formula: String.raw`\text{非零解}\quad\Longrightarrow\quad D=0`
              }
            ]
          },
          {
            id: "cramer-boundaries",
            title: "适用边界与综合例题",
            summary: "克莱姆法则只直接回答“D≠0 时唯一解”；D=0 时必须另作方程组判定。",
            cards: [
              {
                id: "cramer-four-variable",
                type: "example",
                title: "四元方程组的行列式求解",
                body: [
                  "先计算系数行列式 $D$，若 $D\\ne0$，再分别用常数项替换每一列计算 $D_1,D_2,D_3,D_4$。",
                  "课堂结果：$D=-2$，$D_1=-2$，$D_2=4$，$D_3=0$，$D_4=-1$，所以 $x_1=1,x_2=-2,x_3=0,x_4=1/2$。"
                ]
              },
              {
                id: "parameter-exercise",
                type: "example",
                title: "参数 k 为何值时齐次方程组有非零解",
                body: [
                  "四个方程的系数行列式含参数 $k$。因为方程组是齐次的，非零解要求 $D=0$。",
                  "对系数矩阵作行、列倍加变换，尽量制造零；图中化简得到 $D=-3(5k-5)$，因此 $k=1$。"
                ]
              },
              {
                id: "cramer-order",
                type: "warning",
                title: "克莱姆法则不是万能解方程法",
                body: [
                  "只有当方程个数等于未知量个数且 $D\\ne0$ 时，才可直接给出唯一解。",
                  "若 $D=0$，不能贸然写 $x_i=D_i/D$，也不能直接断言无解；需要继续研究方程组或矩阵的秩。"
                ]
              },
              {
                id: "determinant-summary",
                type: "warning",
                title: "整章计算流程",
                body: [
                  "先判行列式的阶数和结构；优先寻找三角、分块、零行或成比例行。",
                  "用行列性质制造零并化三角形；需要展开时选零最多的行或列，严格核对 $(-1)^{i+j}$。",
                  "遇到线性方程组，先算 $D$；只有 $D\\ne0$ 时才进入克莱姆法则。"
                ]
              }
            ]
          }
        ]
      }
    ]
  };
})();
