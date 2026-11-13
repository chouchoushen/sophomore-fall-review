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

  const matrixMapFigure = laSvg(
    "matrix-map",
    "矩阵的坐标：先看行，再看列",
    "m×n 矩阵有 m 行、n 列；aᵢⱼ 表示第 i 行与第 j 列的交叉位置。",
    `
      ${["j=1", "j=2", "j=3", "j=4"].map((label, index) =>
        `<text class="la-label--small" x="${88 + index * 82 + 37}" y="91" text-anchor="middle">${label}</text>`
      ).join("")}
      ${["i=1", "i=2", "i=3"].map((label, index) =>
        `<text class="la-label--small" x="59" y="${126 + index * 50}">${label}</text>`
      ).join("")}
      ${detMatrix({
        x: 88,
        y: 102,
        rows: [["a₁₁", "a₁₂", "a₁₃", "a₁₄"], ["a₂₁", "a₂₂", "a₂₃", "a₂₄"], ["a₃₁", "a₃₂", "a₃₃", "a₃₄"]],
        cellW: 82,
        cellH: 50,
        classes: { "1,2": "la-cell--focus", "0,0": "la-cell--keep", "2,3": "la-cell--keep" }
      }).markup}
      <path class="la-arrow la-arrow--warm" d="M252,154 H435" marker-end="url(#matrix-map-arrow-warm)"></path>
      <text class="la-label--strong" x="455" y="123">A = (aᵢⱼ)ₘₓₙ</text>
      <text class="la-label--small" x="455" y="158">高亮：a₂₃ = 第 2 行、第 3 列</text>
      <text class="la-label--small" x="455" y="190">元素全为实数 → 实矩阵</text>
      <text class="la-label--small" x="455" y="218">元素含复数 → 复矩阵</text>
      <text class="la-label--small" x="88" y="278">矩阵是一个整体，不是单个数字；行数写在前面，列数写在后面。</text>
    `,
    300
  );

  const equalityFigure = laSvg(
    "matrix-equality",
    "两个矩阵相等：同型且每个位置都相等",
    "先比较行数和列数，再逐项比较。任何一项不等，两个矩阵就不相等。",
    `
      ${detMatrix({
        x: 126,
        y: 108,
        rows: [["2", "4"], ["5", "a"]],
        cellW: 80,
        cellH: 52,
        classes: { "1,1": "la-cell--focus" },
        label: "A"
      }).markup}
      <text class="la-label--strong" x="334" y="167">=</text>
      ${detMatrix({
        x: 390,
        y: 108,
        rows: [["2", "c"], ["d", "7"]],
        cellW: 80,
        cellH: 52,
        classes: { "0,1": "la-cell--focus", "1,0": "la-cell--focus", "1,1": "la-cell--focus" },
        label: "B"
      }).markup}
      <text class="la-label--strong" x="590" y="135">a = 7</text>
      <text class="la-label--strong" x="590" y="169">c = 4</text>
      <text class="la-label--strong" x="590" y="203">d = 5</text>
      <text class="la-label--small" x="126" y="265">A 与 B 都是 2×2 矩阵，因此先满足“同型”，再令对应元素相等。</text>
    `,
    290
  );

  const matrixProductFigure = laSvg(
    "matrix-product",
    "矩阵乘法：左矩阵的行 × 右矩阵的列",
    "A 的列数必须等于 B 的行数；结果保留 A 的行数和 B 的列数。",
    `
      ${detMatrix({
        x: 64,
        y: 94,
        rows: [["2", "3"], ["1", "−2"], ["3", "1"]],
        cellW: 66,
        cellH: 43,
        classes: { "0,0": "la-cell--keep", "0,1": "la-cell--keep" },
        label: "A₃ₓ₂"
      }).markup}
      <text class="la-label--strong" x="213" y="134">×</text>
      ${detMatrix({
        x: 252,
        y: 94,
        rows: [["1", "−2"], ["2", "−1"]],
        cellW: 66,
        cellH: 43,
        classes: { "0,0": "la-cell--keep", "1,0": "la-cell--keep" },
        label: "B₂ₓ₂"
      }).markup}
      <text class="la-label--strong" x="416" y="134">=</text>
      ${detMatrix({
        x: 452,
        y: 94,
        rows: [["8", "−7"], ["−3", "0"], ["5", "−7"]],
        cellW: 66,
        cellH: 43,
        classes: { "0,0": "la-cell--focus" },
        label: "C₃ₓ₂"
      }).markup}
      <path class="la-arrow la-arrow--warm" d="M183,206 Q350,278 502,154" marker-end="url(#matrix-product-arrow-warm)"></path>
      <text class="la-label--strong" x="64" y="250">c₁₁ = 2·1 + 3·2 = 8</text>
      <text class="la-label--small" x="64" y="278">左行与右列对应元素相乘后求和</text>
    `,
    300
  );

  const transposeFigure = laSvg(
    "transpose-map",
    "转置：行列互换，不是把每个元素取倒数",
    "Aᵀ 的第 i 行第 j 列等于 A 的第 j 行第 i 列。",
    `
      ${detMatrix({
        x: 98,
        y: 105,
        rows: [["2", "−3", "1"], ["4", "0", "−1"]],
        cellW: 76,
        cellH: 48,
        classes: { "0,1": "la-cell--focus", "1,1": "la-cell--focus" },
        label: "A₂ₓ₃"
      }).markup}
      <path class="la-arrow" d="M390,154 H475" marker-end="url(#transpose-map-arrow)"></path>
      ${detMatrix({
        x: 528,
        y: 84,
        rows: [["2", "4"], ["−3", "0"], ["1", "−1"]],
        cellW: 76,
        cellH: 48,
        classes: { "1,0": "la-cell--focus", "1,1": "la-cell--focus" },
        label: "Aᵀ₃ₓ₂"
      }).markup}
      <text class="la-label--small" x="98" y="245">第 1 行 [2, −3, 1] 变成第 1 列</text>
      <text class="la-label--small" x="528" y="300">(AB)ᵀ = BᵀAᵀ，乘积顺序要倒过来</text>
    `,
    320
  );

  const inverseMapFigure = laSvg(
    "inverse-map",
    "逆矩阵：把线性变换抵消回去",
    "A 可逆等价于 |A|≠0；A⁻¹ 是唯一满足 AA⁻¹=A⁻¹A=E 的矩阵。",
    `
      ${detMatrix({
        x: 112,
        y: 116,
        rows: [["3", "2"], ["7", "5"]],
        cellW: 82,
        cellH: 54,
        label: "A"
      }).markup}
      <text class="la-label--strong" x="306" y="160">×</text>
      ${detMatrix({
        x: 348,
        y: 116,
        rows: [["5", "−2"], ["−7", "3"]],
        cellW: 82,
        cellH: 54,
        label: "A⁻¹"
      }).markup}
      <text class="la-label--strong" x="548" y="160">= E</text>
      <text class="la-label--strong" x="112" y="252">|A| = 3·5 − 2·7 = 1 ≠ 0</text>
      <text class="la-label--small" x="112" y="284">|A|=0 时不存在逆矩阵；此时称为奇异矩阵。</text>
    `,
    305
  );

  const inverseFormulaFigure = laSvg(
    "inverse-formula",
    "伴随矩阵法：A⁻¹ = A* / |A|",
    "先确认 |A|≠0，再求所有代数余子式并转置成伴随矩阵。",
    `
      ${detMatrix({
        x: 94,
        y: 112,
        rows: [["a", "b"], ["c", "d"]],
        cellW: 82,
        cellH: 52,
        label: "A"
      }).markup}
      <path class="la-arrow" d="M276,158 H360" marker-end="url(#inverse-formula-arrow)"></path>
      ${detMatrix({
        x: 402,
        y: 112,
        rows: [["d", "−b"], ["−c", "a"]],
        cellW: 82,
        cellH: 52,
        label: "A*"
      }).markup}
      <text class="la-label--strong" x="606" y="131">A⁻¹</text>
      <text class="la-label--strong" x="606" y="165">= A* / |A|</text>
      <text class="la-label--small" x="94" y="250">二阶：主对角线互换，副对角线变号，再除以 ad−bc。</text>
      <text class="la-label--small" x="94" y="280">高阶：逐个求代数余子式，按转置位置放入伴随矩阵。</text>
    `,
    300
  );

  const blockMatrixFigure = laSvg(
    "block-matrix",
    "分块矩阵：把大矩阵拆成小矩阵",
    "纵向、横向同时切分后，每个子块可以像“元素”一样参与运算。",
    `
      <rect class="la-panel" x="86" y="88" width="340" height="196" rx="10"></rect>
      <path class="la-delete" d="M256,88 V284"></path>
      <path class="la-delete" d="M86,186 H426"></path>
      <rect class="la-panel la-panel--cool" x="100" y="102" width="142" height="70" rx="7"></rect>
      <rect class="la-panel la-panel--warm" x="270" y="102" width="142" height="70" rx="7"></rect>
      <rect class="la-panel la-panel--warm" x="100" y="200" width="142" height="70" rx="7"></rect>
      <rect class="la-panel" x="270" y="200" width="142" height="70" rx="7"></rect>
      <text class="la-label" x="171" y="144" text-anchor="middle">A₁₁</text>
      <text class="la-label" x="341" y="144" text-anchor="middle">A₁₂</text>
      <text class="la-label" x="171" y="242" text-anchor="middle">A₂₁</text>
      <text class="la-label" x="341" y="242" text-anchor="middle">A₂₂</text>
      <text class="la-label--strong" x="488" y="135">A = (Aᵢⱼ)₂ₓ₂</text>
      <text class="la-label--small" x="488" y="171">加法要求对应子块同型</text>
      <text class="la-label--small" x="488" y="201">乘法要求内部分块尺寸匹配</text>
      <text class="la-label--small" x="488" y="231">转置时子块本身也要转置</text>
    `,
    300
  );

  const blockInverseFigure = laSvg(
    "block-inverse",
    "分块三角矩阵：行列式与逆矩阵",
    "块三角结构可以把高阶逆矩阵拆成较低阶矩阵的逆。",
    `
      <rect class="la-panel" x="90" y="88" width="250" height="190" rx="10"></rect>
      <path class="la-delete" d="M220,88 V278"></path>
      <path class="la-delete" d="M90,183 H340"></path>
      <text class="la-label" x="155" y="141" text-anchor="middle">A</text>
      <text class="la-label" x="280" y="141" text-anchor="middle">O</text>
      <text class="la-label" x="155" y="240" text-anchor="middle">C</text>
      <text class="la-label" x="280" y="240" text-anchor="middle">B</text>
      <text class="la-label--strong" x="392" y="124">|D| = |A|·|B|</text>
      <text class="la-label--strong" x="392" y="170">D⁻¹ =</text>
      <rect class="la-panel la-panel--cool" x="478" y="185" width="100" height="60" rx="6"></rect>
      <rect class="la-panel" x="590" y="185" width="100" height="60" rx="6"></rect>
      <rect class="la-panel la-panel--warm" x="478" y="258" width="100" height="60" rx="6"></rect>
      <rect class="la-panel la-panel--cool" x="590" y="258" width="100" height="60" rx="6"></rect>
      <text class="la-label" x="528" y="221" text-anchor="middle">A⁻¹</text>
      <text class="la-label" x="640" y="221" text-anchor="middle">O</text>
      <text class="la-label" x="528" y="294" text-anchor="middle">−B⁻¹CA⁻¹</text>
      <text class="la-label" x="640" y="294" text-anchor="middle">B⁻¹</text>
    `,
    345
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
      },
      {
        id: "matrix-concepts",
        number: "2.1",
        title: "矩阵的概念与特殊矩阵",
        english: "Matrices & Special Forms",
        accent: "forest",
        summary: "从实际问题中的数表抽象出矩阵，统一行列位置、同型与相等的语言，再识别行矩阵、列矩阵、方阵、对角矩阵、单位矩阵和三角矩阵。",
        examFocus: ["矩阵的阶", "元素 aᵢⱼ", "同型与相等", "特殊矩阵识别"],
        introFigure: {
          svg: matrixMapFigure,
          title: "矩阵的行、列与元素位置",
          caption: "位置由“第 i 行、第 j 列”共同确定；矩阵的阶写作 m×n。"
        },
        themes: [
          {
            id: "matrix-foundation",
            title: "从数表到矩阵",
            summary: "矩阵不是简单的数字堆叠，而是把二维数据、线性方程组和线性变换压缩成同一个整体对象。",
            cards: [
              {
                id: "matrix-definition",
                type: "definition",
                title: "矩阵的定义",
                body: [
                  "由 $m\\times n$ 个数 $a_{ij}$ 排成 $m$ 行、$n$ 列的数表，称为一个 <strong>m×n 矩阵</strong>。",
                  "常用大写字母 $A,B,C$ 表示矩阵，并可简写为 $A=(a_{ij})_{m\\times n}$，其中 $a_{ij}$ 是第 $i$ 行第 $j$ 列的元素。"
                ],
                note: "“行列”顺序固定：$m$ 行在前、$n$ 列在后。$3\\times4$ 矩阵和 $4\\times3$ 矩阵不是同型矩阵。"
              },
              {
                id: "matrix-element-index",
                type: "formula",
                title: "元素的两个下标",
                body: [
                  "第一个下标表示行号，第二个下标表示列号。读数时先向下找行，再向右找列。",
                  "矩阵的某一行对应一个横向数据组；某一列对应一个纵向数据组。"
                ],
                formula: String.raw`A=\begin{pmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&&\vdots\\a_{m1}&a_{m2}&\cdots&a_{mn}\end{pmatrix}`
              },
              {
                id: "matrix-real-complex",
                type: "definition",
                title: "实矩阵与复矩阵",
                body: [
                  "所有元素都是实数的矩阵称为<strong>实矩阵</strong>；含有复数元素的矩阵称为<strong>复矩阵</strong>。",
                  "本章的说理和计算默认矩阵元素为实数；涉及共轭时再切换到复矩阵。"
                ]
              },
              {
                id: "matrix-equality",
                type: "judgment",
                title: "同型矩阵与矩阵相等",
                body: [
                  "两个矩阵的行数相同、列数也相同，称它们为<strong>同型矩阵</strong>。",
                  "同型矩阵 $A=(a_{ij})$、$B=(b_{ij})$ 若每个对应元素都相等，即 $a_{ij}=b_{ij}$，才有 $A=B$。"
                ],
                formula: String.raw`A=B\quad\Longleftrightarrow\quad A\text{ 与 }B\text{ 同型，且 }a_{ij}=b_{ij}\ (\forall i,j)`,
                example: {
                  title: "由矩阵相等确定未知元素",
                  body: [
                    "若两个 $2\\times2$ 矩阵相等，对应位置分别列方程，可直接读出未知量。"
                  ],
                  formula: String.raw`\begin{pmatrix}2&4\\5&a\end{pmatrix}=\begin{pmatrix}2&c\\d&7\end{pmatrix}\Rightarrow a=7,\ c=4,\ d=5`,
                  figures: [{
                    svg: equalityFigure,
                    title: "逐位置比较矩阵",
                    caption: "同型只是前提，逐项相等才使两个矩阵相等。"
                  }]
                }
              },
              {
                id: "matrix-from-equations",
                type: "property",
                title: "线性方程组对应系数矩阵",
                body: [
                  "把线性方程组的未知量系数按方程顺序排列，得到<strong>系数矩阵</strong>。一行对应一个方程，一列对应一个未知量。",
                  "把常数列追加到系数矩阵最后一列，得到<strong>增广矩阵</strong>。后续化简方程组时，增广矩阵是主要工具。"
                ],
                formula: String.raw`\begin{cases}a_{11}x_1+\cdots+a_{1n}x_n=b_1\\\vdots\\a_{m1}x_1+\cdots+a_{mn}x_n=b_m\end{cases}\quad\leadsto\quad\left(\begin{array}{ccc|c}a_{11}&\cdots&a_{1n}&b_1\\\vdots&&\vdots&\vdots\\a_{m1}&\cdots&a_{mn}&b_m\end{array}\right)`
              },
              {
                id: "matrix-data-example",
                type: "example",
                title: "商店与产品数量的矩阵表示",
                body: [
                  "若行表示商店、列表示产品，则 $a_{ij}$ 表示第 $i$ 个商店中第 $j$ 种产品的数量。",
                  "这种“行代表一类对象、列代表另一类属性”的约定必须写清楚，否则同一个矩阵可以有不同解释。"
                ],
                bullets: [
                  "行和列不是装饰，它们带有实际含义。",
                  "交换两行会交换对象顺序，矩阵元素位置也随之改变。",
                  "矩阵相等必须连同行列含义和对应位置一起比较。"
                ]
              }
            ]
          },
          {
            id: "special-matrices",
            title: "常见特殊矩阵",
            summary: "特殊矩阵通过行数、列数或零元素分布获得，是识别运算规律和简化计算的关键。",
            cards: [
              {
                id: "row-column-matrices",
                type: "definition",
                title: "行矩阵与列矩阵",
                body: [
                  "只有一行的矩阵称为<strong>行矩阵</strong>，形如 $1\\times n$；只有一列的矩阵称为<strong>列矩阵</strong>，形如 $m\\times1$。",
                  "列矩阵也常写成列向量，但矩阵与向量在不同语境中的角色要区分。"
                ],
                formula: String.raw`A=(a_{11},a_{12},\ldots,a_{1n}),\qquad B=\begin{pmatrix}b_{11}\\b_{21}\\\vdots\\b_{m1}\end{pmatrix}`
              },
              {
                id: "zero-square-matrices",
                type: "definition",
                title: "零矩阵与方阵",
                body: [
                  "所有元素都为零的矩阵称为<strong>零矩阵</strong>，记作 $O$。不同阶的零矩阵统写为 $O$，但参与运算时必须与另一矩阵同型。",
                  "行数等于列数的矩阵称为<strong>方阵</strong>或 n 阶方阵。只有方阵才谈主对角线、行列式和逆矩阵。"
                ]
              },
              {
                id: "diagonal-matrix",
                type: "definition",
                title: "对角矩阵",
                body: [
                  "除主对角线以外，其余元素全为零的方阵称为<strong>对角矩阵</strong>。对角元素允许有零或非零。",
                  "对角矩阵记作 $\\operatorname{diag}(a_{11},a_{22},\\ldots,a_{nn})$。它的乘法可逐分量处理，计算量很小。"
                ],
                formula: String.raw`A=\operatorname{diag}(\lambda_1,\lambda_2,\ldots,\lambda_n)=\begin{pmatrix}\lambda_1&&&\\&\lambda_2&&\\&&\ddots&\\&&&\lambda_n\end{pmatrix}`
              },
              {
                id: "scalar-identity-matrix",
                type: "definition",
                title: "数量矩阵与单位矩阵",
                body: [
                  "主对角线元素全等于同一个数 $a$ 的对角矩阵称为<strong>数量矩阵</strong>，且 $aE$ 与任意同阶矩阵相乘都可交换。",
                  "主对角线元素全为 $1$ 的数量矩阵称为<strong>单位矩阵</strong>，记作 $E$ 或 $I$。"
                ],
                formula: String.raw`\operatorname{diag}(a,a,\ldots,a)=aE,\qquad EA=AE=A`
              },
              {
                id: "triangular-matrix",
                type: "definition",
                title: "上三角矩阵与下三角矩阵",
                body: [
                  "主对角线下方全为零的方阵称为<strong>上三角矩阵</strong>；主对角线上方全为零的方阵称为<strong>下三角矩阵</strong>。",
                  "三角矩阵的行列式等于主对角线元素乘积，这是后续快速计算行列式的重要入口。"
                ],
                formula: String.raw`|A|=a_{11}a_{22}\cdots a_{nn}\quad\text{（上、下三角矩阵均成立）}`
              },
              {
                id: "special-matrix-checklist",
                type: "warning",
                title: "特殊矩阵识别顺序",
                body: [
                  "先判断是不是方阵；不是方阵时，只能讨论行矩阵、列矩阵、零矩阵等。",
                  "确认方阵后，再看零元素分布：非对角全零是对角矩阵，某侧全零是三角矩阵，对角线全为一是单位矩阵。"
                ],
                bullets: [
                  "“对角矩阵一定是方阵”，但“方阵不一定是对角矩阵”。",
                  "单位矩阵一定是数量矩阵；数量矩阵不一定是单位矩阵。",
                  "三角矩阵不要求对角元非零。"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "matrix-operations",
        number: "2.2",
        title: "矩阵的运算",
        english: "Matrix Operations",
        accent: "indigo",
        summary: "矩阵加法与数乘按位置进行，矩阵乘法按“左行乘右列”进行；还要掌握乘法不可交换、方阵的幂、转置、对称矩阵和方阵行列式。",
        examFocus: ["同型才可相加", "乘法维数匹配", "AB≠BA", "转置反序", "|AB|=|A||B|"],
        introFigure: {
          svg: matrixProductFigure,
          title: "矩阵乘法的行列匹配",
          caption: "左矩阵的第 i 行与右矩阵的第 j 列做内积，得到乘积矩阵的 (i,j) 元素。"
        },
        themes: [
          {
            id: "matrix-linear-operations",
            title: "加法、减法与数乘",
            summary: "线性运算只在同型矩阵之间按对应位置进行，因此比矩阵乘法更接近普通数的加法。",
            cards: [
              {
                id: "matrix-addition",
                type: "definition",
                title: "矩阵加法",
                body: [
                  "两个 $m\\times n$ 同型矩阵相加，把对应位置元素相加，所得矩阵仍为 $m\\times n$。",
                  "不同型的矩阵不能相加。"
                ],
                formula: String.raw`(A+B)_{ij}=a_{ij}+b_{ij}`
              },
              {
                id: "matrix-scalar-multiplication",
                type: "definition",
                title: "数与矩阵相乘",
                body: [
                  "数 $k$ 与矩阵 $A$ 相乘时，把 $k$ 乘到矩阵的每一个元素上，得到与 $A$ 同型的矩阵。",
                  "$kA=Ak$ 只说明数与矩阵的顺序无关，不代表任意两个矩阵乘法可交换。"
                ],
                formula: String.raw`(kA)_{ij}=k\,a_{ij}`
              },
              {
                id: "matrix-negative-subtraction",
                type: "definition",
                title: "负矩阵与矩阵减法",
                body: [
                  "$-A=(-1)A$ 称为矩阵 $A$ 的负矩阵。矩阵减法定义为 $A-B=A+(-B)$。",
                  "减法仍然要求 $A$、$B$ 同型。"
                ],
                formula: String.raw`A-B=A+(-B),\qquad (A-B)_{ij}=a_{ij}-b_{ij}`
              },
              {
                id: "matrix-linear-operation-laws",
                type: "property",
                title: "线性运算规律",
                body: [
                  "矩阵加法满足交换律、结合律；数乘与加法满足分配律；零矩阵和负矩阵分别是加法的零元与逆元。",
                  "这些规律成立的前提是参与运算的同型矩阵存在。"
                ],
                bullets: [
                  "$A+B=B+A$",
                  "$(A+B)+C=A+(B+C)$",
                  "$k(A+B)=kA+kB$",
                  "$(k+l)A=kA+lA$",
                  "$A+O=A$，$A+(-A)=O$"
                ]
              },
              {
                id: "scalar-zero-product",
                type: "judgment",
                title: "由 kA=O 能推出什么",
                body: [
                  "若 $k$ 是数、$A$ 是矩阵且 $kA=O$，则 $k=0$ 或 $A=O$。",
                  "注意：这条规律说的是“数与矩阵相乘”。矩阵乘法 $AB=O$ 不能推出 $A=O$ 或 $B=O$。"
                ],
                formula: String.raw`kA=O\quad\Longrightarrow\quad k=0\ \text{或}\ A=O`
              },
              {
                id: "matrix-equation-basic",
                type: "example",
                title: "解含未知矩阵的线性方程",
                body: [
                  "把未知矩阵 $X$ 像普通未知量一样移项，再利用数乘和同型加法计算。",
                  "先用等式两边同减已知矩阵，再除以系数 2。"
                ],
                formula: String.raw`2X+3B=C\quad\Longrightarrow\quad X=\frac12(C-3B)`
              }
            ]
          },
          {
            id: "matrix-multiplication",
            title: "矩阵乘法、幂与多项式",
            summary: "矩阵乘法来自线性变换的复合，因此维数匹配、顺序敏感、分配与结合规律都与普通数乘法不同。",
            cards: [
              {
                id: "matrix-product-motivation",
                type: "property",
                title: "矩阵乘法为什么是左行乘右列",
                body: [
                  "设列向量 $x$ 先经过变换 $B$ 得到 $Bx$，再经过变换 $A$，结果为 $A(Bx)$。",
                  "若把复合变换记作 $AB$，就必须定义成矩阵乘法，使得 $(AB)x=A(Bx)$。这解释了“行乘列”的求和规则。"
                ]
              },
              {
                id: "matrix-product-compatibility",
                type: "judgment",
                title: "矩阵乘法的维数条件",
                body: [
                  "$A$ 的列数必须等于 $B$ 的行数，$AB$ 才有意义。",
                  "若 $A$ 是 $m\\times l$ 矩阵，$B$ 是 $l\\times n$ 矩阵，则 $AB$ 是 $m\\times n$ 矩阵。"
                ],
                formula: String.raw`(m\times l)(l\times n)\longrightarrow(m\times n)`
              },
              {
                id: "matrix-product-entry",
                type: "formula",
                title: "乘积元素的求和公式",
                body: [
                  "乘积矩阵第 $i$ 行第 $j$ 列元素，等于左矩阵第 $i$ 行与右矩阵第 $j$ 列的对应元素乘积之和。"
                ],
                formula: String.raw`c_{ij}=\sum_{k=1}^{l}a_{ik}b_{kj}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{il}b_{lj}`,
                example: {
                  title: "3×2 矩阵乘 2×2 矩阵",
                  body: [
                    "左矩阵两列、右矩阵两行，维数匹配，乘积为 $3\\times2$ 矩阵。",
                    "以 $c_{11}$ 为例：$2\\cdot1+3\\cdot2=8$。"
                  ],
                  figures: [{
                    svg: matrixProductFigure,
                    title: "矩阵乘法的数值计算",
                    caption: "逐项计算时始终遵循“左行乘右列”。"
                  }]
                }
              },
              {
                id: "matrix-product-noncommutative",
                type: "warning",
                title: "矩阵乘法一般不可交换",
                body: [
                  "即使 $AB$ 与 $BA$ 都有意义，一般也有 $AB\\ne BA$。",
                  "有些情况下 $AB$ 有意义而 $BA$ 根本没定义，不能用普通数的交换律处理矩阵乘法。"
                ],
                formula: String.raw`AB\ne BA\quad\text{（一般情形）}`
              },
              {
                id: "matrix-zero-cancellation",
                type: "warning",
                title: "零积与非消去性",
                body: [
                  "矩阵乘法中，$AB=O$ 不能推出 $A=O$ 或 $B=O$。",
                  "类似地，$AB=AC$ 一般也不能消去 $A$ 得到 $B=C$。只有 $A$ 可逆时，才能两边左乘 $A^{-1}$。"
                ],
                bullets: [
                  "$AB=O\\nRightarrow A=O$ 或 $B=O$。",
                  "$AB=AC\\nRightarrow B=C$。",
                  "矩阵乘法没有普通数的“消去律”。"
                ]
              },
              {
                id: "matrix-product-laws",
                type: "property",
                title: "矩阵乘法的运算规律",
                body: [
                  "在维数允许时，矩阵乘法满足结合律、分配律和单位矩阵恒等律。",
                  "乘法顺序不能随便交换，但括号可以先结合。"
                ],
                bullets: [
                  "$(AB)C=A(BC)$",
                  "$A(B+C)=AB+AC$",
                  "$(B+C)A=BA+CA$",
                  "$EA=AE=A$（$E$ 为相应阶单位矩阵）",
                  "$k(AB)=(kA)B=A(kB)$"
                ]
              },
              {
                id: "square-matrix-powers",
                type: "definition",
                title: "方阵的幂",
                body: [
                  "只有方阵才能自乘。$A^k$ 表示 $k$ 个 $A$ 相乘，并约定 $A^0=E$。",
                  "若 $k,l$ 是非负整数，则 $A^kA^l=A^{k+l}$，$(A^k)^l=A^{kl}$。"
                ],
                formula: String.raw`A^k=\underbrace{A\,A\cdots A}_{k\text{ 个}},\qquad A^0=E`
              },
              {
                id: "matrix-power-warning",
                type: "warning",
                title: "一般 (AB)^k≠A^kB^k",
                body: [
                  "因为矩阵乘法不可交换，$(AB)^2=ABAB$，通常不能整理成 $A^2B^2$。",
                  "若已知 $A$ 与 $B$ 可交换，即 $AB=BA$，才可进一步合并幂。"
                ],
                formula: String.raw`(AB)^k=A^kB^k\quad\text{仅在某些可交换情形下成立，不能默认使用}`
              },
              {
                id: "matrix-polynomial",
                type: "definition",
                title: "矩阵多项式",
                body: [
                  "把方阵 $A$ 代入多项式 $f(x)=a_mx^m+\\cdots+a_1x+a_0$ 时，常数项要替换成 $a_0E$，保证每一项都是同阶方阵。",
                  "矩阵多项式常用于构造逆矩阵和证明矩阵恒等式。"
                ],
                formula: String.raw`f(A)=a_mA^m+\cdots+a_1A+a_0E`
              }
            ]
          },
          {
            id: "transpose-determinant",
            title: "转置、对称与方阵行列式",
            summary: "转置交换行列，对称矩阵要求转置后不变；方阵行列式把整个方阵映成一个数，并与乘法保持联系。",
            cards: [
              {
                id: "matrix-transpose",
                type: "definition",
                title: "转置矩阵及其性质",
                body: [
                  "把 $A$ 的第 $i$ 行换成第 $i$ 列，得到转置矩阵 $A^T$。$m\\times n$ 矩阵转置后变为 $n\\times m$。",
                  "乘积转置时顺序反转：$(AB)^T=B^TA^T$。"
                ],
                formula: String.raw`(A^T)_{ij}=a_{ji},\qquad (AB)^T=B^TA^T`,
                example: {
                  title: "转置的行列互换",
                  body: [
                    "$2\\times3$ 矩阵转置后成为 $3\\times2$ 矩阵，原第一行成为新第一列。"
                  ],
                  figures: [{
                    svg: transposeFigure,
                    title: "矩阵转置示意",
                    caption: "每个元素移动到行列下标互换的位置。"
                  }]
                }
              },
              {
                id: "transpose-properties",
                type: "property",
                title: "转置的运算性质",
                body: [
                  "转置对加法、数乘保持结构；遇到乘积时反序。"
                ],
                bullets: [
                  "$(A^T)^T=A$",
                  "$(A+B)^T=A^T+B^T$",
                  "$(kA)^T=kA^T$",
                  "$(AB)^T=B^TA^T$",
                  "$(A_1A_2\\cdots A_k)^T=A_k^T\\cdots A_2^TA_1^T$"
                ]
              },
              {
                id: "symmetric-matrix",
                type: "definition",
                title: "对称矩阵",
                body: [
                  "若 n 阶方阵满足 $A^T=A$，称 $A$ 为<strong>对称矩阵</strong>。其关于主对角线对称的两个元素相等。",
                  "任意矩阵 $A$，$A^TA$ 与 $AA^T$ 都是对称矩阵；两个对称矩阵之和、差仍对称，但乘积不一定对称。"
                ],
                formula: String.raw`A^T=A\quad\Longleftrightarrow\quad a_{ij}=a_{ji}`
              },
              {
                id: "square-matrix-determinant",
                type: "definition",
                title: "方阵的行列式",
                body: [
                  "方阵 $A$ 的元素按原位置构成的行列式，称为方阵 $A$ 的行列式，记作 $|A|$ 或 $\\det A$。",
                  "方阵是数表，行列式是一个数；$|A|$ 不是把矩阵“变成”矩阵，而是给方阵附加一个数值。"
                ],
                formula: String.raw`|A|=\det A`
              },
              {
                id: "determinant-product-rule",
                type: "formula",
                title: "方阵行列式的三条乘法规则",
                body: [
                  "转置不改变行列式；数乘整个 n 阶方阵时，每一行都提出该数，因此提出 $n$ 次；乘积的行列式等于行列式相乘。"
                ],
                formula: String.raw`|A^T|=|A|,\qquad |kA|=k^n|A|,\qquad |AB|=|A||B|`,
                note: "注意 $|A+B|\\ne|A|+|B|$。行列式对矩阵乘法友好，但对矩阵加法不按元素展开。"
              },
              {
                id: "complex-conjugate-matrix",
                type: "definition",
                title: "共轭矩阵",
                body: [
                  "对复矩阵 $A$ 的每个元素取共轭，得到共轭矩阵 $\\overline A$。",
                  "共轭与加法、数乘和乘法相容，但数乘时标量也要共轭。"
                ],
                formula: String.raw`\overline{A+B}=\overline A+\overline B,\qquad \overline{AB}=\overline A\,\overline B,\qquad \overline{kA}=\overline k\,\overline A`
              }
            ]
          }
        ]
      },
      {
        id: "inverse-matrices",
        number: "2.3",
        title: "逆矩阵",
        english: "Inverse Matrices",
        accent: "brick",
        summary: "可逆矩阵相当于可逆线性变换；核心判定是 |A|≠0，核心公式是 A⁻¹=A*/|A|，并能用逆矩阵解矩阵方程。",
        examFocus: ["逆矩阵定义", "|A|≠0", "伴随矩阵", "二阶逆公式", "矩阵方程"],
        introFigure: {
          svg: inverseMapFigure,
          title: "逆矩阵与可逆判定",
          caption: "逆矩阵抵消原变换；方阵不可逆时对应线性变换发生信息压缩。"
        },
        themes: [
          {
            id: "inverse-foundation",
            title: "定义、唯一性与基本性质",
            summary: "逆矩阵必须与原矩阵双向相乘都得到单位矩阵；可逆与行列式非零是同一件事。",
            cards: [
              {
                id: "inverse-definition",
                type: "definition",
                title: "逆矩阵的定义",
                body: [
                  "设 $A$ 是 n 阶方阵。若存在 n 阶方阵 $B$，使 $AB=BA=E$，则称 $A$ 可逆，并称 $B$ 是 $A$ 的逆矩阵，记作 $A^{-1}$。",
                  "可逆矩阵必须先是方阵。"
                ],
                formula: String.raw`AA^{-1}=A^{-1}A=E`
              },
              {
                id: "inverse-unique",
                type: "property",
                title: "逆矩阵若存在则唯一",
                body: [
                  "若 $B$、$C$ 都是 $A$ 的逆矩阵，则 $B=BE=B(AC)=(BA)C=EC=C$。",
                  "因此写 $A^{-1}$ 不会产生歧义。"
                ]
              },
              {
                id: "inverse-determinant-criterion",
                type: "formula",
                title: "可逆的充要条件",
                body: [
                  "n 阶方阵 $A$ 可逆，当且仅当 $|A|\\ne0$。",
                  "若 $A$ 可逆，则 $|A||A^{-1}|=|E|=1$，所以 $|A^{-1}|=1/|A|$。"
                ],
                formula: String.raw`A\text{ 可逆}\quad\Longleftrightarrow\quad |A|\ne0`
              },
              {
                id: "singular-nonsingular",
                type: "definition",
                title: "非奇异矩阵与奇异矩阵",
                body: [
                  "行列式非零的方阵称为<strong>非奇异矩阵</strong>；行列式为零的方阵称为<strong>奇异矩阵</strong>。",
                  "非奇异矩阵可逆；奇异矩阵不可逆。"
                ]
              },
              {
                id: "inverse-properties",
                type: "property",
                title: "逆矩阵的运算性质",
                body: [
                  "逆矩阵遇到数乘、转置和乘积时都有固定规律；其中乘积逆的顺序必须反转。"
                ],
                bullets: [
                  "$(A^{-1})^{-1}=A$",
                  "$(kA)^{-1}=k^{-1}A^{-1}$，$k\\ne0$",
                  "$(AB)^{-1}=B^{-1}A^{-1}$",
                  "$(A_1A_2\\cdots A_m)^{-1}=A_m^{-1}\\cdots A_2^{-1}A_1^{-1}$",
                  "$(A^T)^{-1}=(A^{-1})^T$"
                ]
              },
              {
                id: "inverse-one-side-check",
                type: "judgment",
                title: "验证逆矩阵只检查一侧够不够",
                body: [
                  "若 $A,B$ 都是同阶方阵且 $AB=E$，则由 $|A||B|=1$ 可得 $|A|\\ne0$，所以 $A$ 可逆。",
                  "于是 $B=EB=(A^{-1}A)B=A^{-1}(AB)=A^{-1}$。因此对同阶方阵，验证 $AB=E$ 或 $BA=E$ 的一侧就足够。"
                ]
              }
            ]
          },
          {
            id: "adjugate-inverse",
            title: "伴随矩阵与逆矩阵计算",
            summary: "先把代数余子式按转置位置排成伴随矩阵，再除以行列式，就得到逆矩阵。",
            cards: [
              {
                id: "adjugate-matrix",
                type: "definition",
                title: "伴随矩阵",
                body: [
                  "设 $A_{ij}$ 是元素 $a_{ij}$ 的代数余子式。把代数余子式按“转置位置”排成矩阵，称为 $A$ 的伴随矩阵，记作 $A^*$。",
                  "伴随矩阵第 i 行第 j 列放的是 $A_{ji}$，不是 $A_{ij}$。"
                ],
                formula: String.raw`A^*=\begin{pmatrix}A_{11}&A_{21}&\cdots&A_{n1}\\A_{12}&A_{22}&\cdots&A_{n2}\\\vdots&\vdots&&\vdots\\A_{1n}&A_{2n}&\cdots&A_{nn}\end{pmatrix}`
              },
              {
                id: "inverse-adjugate-formula",
                type: "formula",
                title: "伴随矩阵法求逆",
                body: [
                  "若 $|A|\\ne0$，则 $A$ 可逆，并且 $A^{-1}=A^*/|A|$。",
                  "使用前先算行列式。若 $|A|=0$，伴随矩阵仍然可以存在，但不能用它构造逆矩阵。"
                ],
                formula: String.raw`A^{-1}=\frac{1}{|A|}A^*`,
                example: {
                  title: "二阶矩阵的逆公式",
                  body: [
                    "二阶情形可以直接交换主对角线、把副对角线变号，再除以 $ad-bc$。"
                  ],
                  formula: String.raw`\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}`,
                  figures: [{
                    svg: inverseFormulaFigure,
                    title: "二阶伴随矩阵结构",
                    caption: "主对角线交换，副对角线变号。"
                  }]
                }
              },
              {
                id: "inverse-2x2-check",
                type: "example",
                title: "用二阶公式快速求逆",
                body: [
                  "对 $A=\\begin{pmatrix}3&2\\\\7&5\\end{pmatrix}$，先算 $|A|=15-14=1$。",
                  "交换主对角线，副对角线变号，得到 $A^{-1}=\\begin{pmatrix}5&-2\\\\-7&3\\end{pmatrix}$。"
                ],
                formula: String.raw`\begin{pmatrix}3&2\\7&5\end{pmatrix}^{-1}=\begin{pmatrix}5&-2\\-7&3\end{pmatrix}`
              },
              {
                id: "inverse-3x3-procedure",
                type: "example",
                title: "三阶矩阵求逆的固定流程",
                body: [
                  "先用行列式判断是否可逆；再逐个计算九个数对应的代数余子式；按转置位置组成伴随矩阵；最后整体除以 $|A|$。",
                  "符号最容易在这里出错，建议画 3×3 符号棋盘：第一行 + − +，第二行 − + −，第三行 + − +。"
                ],
                formula: String.raw`A^{-1}=\frac1{|A|}\begin{pmatrix}A_{11}&A_{21}&A_{31}\\A_{12}&A_{22}&A_{32}\\A_{13}&A_{23}&A_{33}\end{pmatrix}`
              },
              {
                id: "adjugate-determinant",
                type: "formula",
                title: "伴随矩阵的行列式",
                body: [
                  "由 $AA^*=|A|E$ 可推出 $|A^*|=|A|^{n-1}$。",
                  "当 $|A|\\ne0$ 时，也可以从 $A^*=|A|A^{-1}$ 两边取行列式验证。"
                ],
                formula: String.raw`|A^*|=|A|^{\,n-1}`
              },
              {
                id: "inverse-transpose-combination",
                type: "judgment",
                title: "逆与转置可以先做哪一个",
                body: [
                  "可逆矩阵的转置也可逆，并且先转置再求逆与先求逆再转置结果相同：$(A^T)^{-1}=(A^{-1})^T$。",
                  "这说明逆运算与转置运算可交换，但与矩阵乘法整体交换时仍需逆序。"
                ]
              }
            ]
          },
          {
            id: "matrix-equations",
            title: "逆矩阵解方程与结构应用",
            summary: "矩阵方程不能随手“除 A”，必须明确从左乘还是右乘逆矩阵；特殊恒等式可反向构造逆矩阵。",
            cards: [
              {
                id: "solve-axb",
                type: "example",
                title: "解矩阵方程 AXB=C",
                body: [
                  "若 $A,B$ 都可逆，则先在左边乘 $A^{-1}$，再在右边乘 $B^{-1}$。",
                  "注意顺序不能互换，也不能把逆矩阵当成数字随意除数。"
                ],
                formula: String.raw`AXB=C\quad\Longrightarrow\quad X=A^{-1}CB^{-1}`
              },
              {
                id: "solve-ax-equals-b",
                type: "judgment",
                title: "AX=B 与 XA=B 的解法不同",
                body: [
                  "若 $A$ 可逆，$AX=B$ 左乘 $A^{-1}$，得到 $X=A^{-1}B$。",
                  "若 $A$ 可逆，$XA=B$ 右乘 $A^{-1}$，得到 $X=BA^{-1}$。左右位置由未知矩阵在乘积中的位置决定。"
                ]
              },
              {
                id: "inverse-from-polynomial",
                type: "example",
                title: "由矩阵恒等式构造逆矩阵",
                body: [
                  "若已知 $A^2-3A+4E=O$，可把它整理为 $A(A-E)=3E$，于是 $A$ 可逆。",
                  "一般做法是把含目标矩阵的因子凑到一侧，右侧化成非零数量乘单位矩阵。"
                ],
                formula: String.raw`A^2-3A+4E=O\quad\Longrightarrow\quad A\cdot\frac{A-E}{3}=E\quad\Longrightarrow\quad A^{-1}=\frac{A-E}{3}`
              },
              {
                id: "inverse-power-diagonal",
                type: "formula",
                title: "对角矩阵的幂与逆",
                body: [
                  "对角矩阵的乘法只作用在对应对角元素上，因此幂和逆都可逐项计算。",
                  "这一结构是后续矩阵对角化的核心动机：若能把矩阵化成相似对角矩阵，就能快速求高次幂。"
                ],
                formula: String.raw`\Lambda^m=\operatorname{diag}(\lambda_1^m,\ldots,\lambda_n^m),\qquad \Lambda^{-1}=\operatorname{diag}(\lambda_1^{-1},\ldots,\lambda_n^{-1})`
              },
              {
                id: "inverse-similarity-preview",
                type: "example",
                title: "利用 AP=PΛ 计算 Aⁿ",
                body: [
                  "若 $P$ 可逆且 $AP=P\\Lambda$，则 $A=P\\Lambda P^{-1}$，从而 $A^n=P\\Lambda^nP^{-1}$。",
                  "当 $\\Lambda$ 为对角矩阵时，计算 $\\Lambda^n$ 只需把每个对角元素分别取 n 次幂。",
                  "这个公式本节先会推导即可，完整对角化理论将在后续章节展开。"
                ],
                formula: String.raw`A=P\Lambda P^{-1}\quad\Longrightarrow\quad A^n=P\Lambda^nP^{-1}`
              },
              {
                id: "inverse-summary",
                type: "warning",
                title: "求逆检查清单",
                body: [
                  "先确认是方阵，再判断 $|A|\\ne0$；计算伴随矩阵时检查转置位置和符号；最后可用 $AA^{-1}=E$ 做抽检。",
                  "如果题目只需要判断可逆性，通常算行列式最快；如果还要求逆，再继续算伴随矩阵或使用特殊结构公式。"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "block-matrices",
        number: "2.4",
        title: "分块矩阵",
        english: "Block Matrices",
        summary: "把矩阵切成子块后，许多高阶运算可以按低阶矩阵处理；重点是分块方式匹配、块乘法相容和分块三角结构。",
        examFocus: ["子块与分块", "分块乘法条件", "分块转置", "分块对角", "分块三角逆"],
        accent: "forest",
        introFigure: {
          svg: blockMatrixFigure,
          title: "矩阵的分块结构",
          caption: "分块方式可以变化，但子块的尺寸必须与后续运算相容。"
        },
        themes: [
          {
            id: "block-foundation",
            title: "分块、加法与乘法",
            summary: "子块是矩阵内部的小矩阵；分块运算看起来像普通矩阵运算，但每个位置都要满足对应的维数条件。",
            cards: [
              {
                id: "block-matrix-definition",
                type: "definition",
                title: "分块矩阵与子块",
                body: [
                  "用若干纵线和横线把矩阵 $A$ 切成多个小矩阵，每个小矩阵称为<strong>子块</strong>。",
                  "以子块为元素得到的矩阵称为<strong>分块矩阵</strong>。同一个矩阵可以按不同方式分块，应根据运算结构选择。"
                ]
              },
              {
                id: "block-addition-scalar",
                type: "property",
                title: "分块加法与数乘",
                body: [
                  "两个同型矩阵如果采用完全相同的分块方式，则对应子块相加即可。",
                  "数与分块矩阵相乘，把数乘到每一个子块上。"
                ],
                formula: String.raw`A+B=\begin{pmatrix}A_{11}+B_{11}&\cdots&A_{1s}+B_{1s}\\\vdots&&\vdots\\A_{r1}+B_{r1}&\cdots&A_{rs}+B_{rs}\end{pmatrix}`
              },
              {
                id: "block-multiplication",
                type: "judgment",
                title: "分块乘法的匹配条件",
                body: [
                  "把 $A,B$ 分块后，左矩阵每一行的纵向分法与右矩阵每一列的纵向分法必须对应，保证每个内层子块乘积有定义。",
                  "外层按普通矩阵乘法进行，内层按子矩阵加法和乘法进行。"
                ],
                formula: String.raw`C_{ij}=\sum_{k=1}^{s}A_{ik}B_{kj}`
              },
              {
                id: "block-transpose",
                type: "formula",
                title: "分块矩阵转置",
                body: [
                  "分块矩阵转置时，先像普通矩阵一样交换子块的行列位置，再把每一个子块本身转置。",
                  "只交换子块位置、忘记子块内部转置，是常见错误。"
                ],
                formula: String.raw`\begin{pmatrix}A&B\\C&D\end{pmatrix}^{T}=\begin{pmatrix}A^T&C^T\\B^T&D^T\end{pmatrix}`
              }
            ]
          },
          {
            id: "special-block-matrices",
            title: "分块对角与分块三角矩阵",
            summary: "零子块把高阶矩阵解耦成若干低阶问题；分块对角行列式相乘，分块三角逆可用回代公式。",
            cards: [
              {
                id: "block-diagonal-matrix",
                type: "definition",
                title: "分块对角矩阵",
                body: [
                  "非对角位置全为零矩阵、对角位置为方阵的分块矩阵，称为分块对角矩阵。",
                  "加法、数乘、乘法、转置、行列式和求逆都可以逐块进行。"
                ],
                formula: String.raw`A=\operatorname{diag}(A_1,A_2,\ldots,A_m)`
              },
              {
                id: "block-diagonal-inverse",
                type: "formula",
                title: "分块对角矩阵的行列式与逆",
                body: [
                  "行列式等于各对角子块行列式的乘积。",
                  "当每个对角子块都可逆时，分块对角矩阵可逆，其逆矩阵由各子块的逆组成。"
                ],
                formula: String.raw`|A|=\prod_{i=1}^{m}|A_i|,\qquad A^{-1}=\operatorname{diag}(A_1^{-1},\ldots,A_m^{-1})`
              },
              {
                id: "block-triangular-determinant",
                type: "formula",
                title: "分块三角矩阵的行列式",
                body: [
                  "分块上三角或分块下三角矩阵的行列式，等于对角两个方阵行列式的乘积。",
                  "$C$ 的取值不影响行列式结果。"
                ],
                formula: String.raw`\begin{vmatrix}A&O\\C&B\end{vmatrix}=|A||B|,\qquad \begin{vmatrix}A&C\\O&B\end{vmatrix}=|A||B|`
              },
              {
                id: "block-triangular-inverse",
                type: "example",
                title: "分块下三角矩阵求逆",
                body: [
                  "设 $A,B$ 都可逆。通过把逆矩阵也写成同形状分块矩阵，并逐块比较 $DD^{-1}=E$，可得左下块为 $-B^{-1}CA^{-1}$。",
                  "这一公式把高阶求逆转化为两个低阶求逆和若干矩阵乘法，是工程计算和结构分析中常见的降阶思路。"
                ],
                formula: String.raw`\begin{pmatrix}A&O\\C&B\end{pmatrix}^{-1}=\begin{pmatrix}A^{-1}&O\\-B^{-1}CA^{-1}&B^{-1}\end{pmatrix}`,
                example: {
                  title: "分块三角求逆结构",
                  body: [
                    "不为零的 $C$ 只会修正逆矩阵的左下块；右上块仍为零。"
                  ],
                  figures: [{
                    svg: blockInverseFigure,
                    title: "分块三角矩阵的逆",
                    caption: "行列式只看两个对角块，逆矩阵需要额外处理左下耦合块。"
                  }]
                }
              }
            ]
          }
        ]
      }
    ]
  };
})();
