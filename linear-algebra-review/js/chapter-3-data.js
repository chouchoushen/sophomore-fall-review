(function () {
  "use strict";

  const roadmapFigure = `
    <svg class="la-svg" viewBox="0 0 760 270" role="img" aria-label="第三章知识主线">
      <defs>
        <marker id="chapter-three-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#3f7d79"></path>
        </marker>
      </defs>
      <text class="la-title" x="24" y="31">第三章：从矩阵化简走到方程组求解</text>
      <text class="la-subtitle" x="24" y="53">初等变换是工具，秩是结构指标，秩定理负责判断方程组是否有解。</text>
      <rect class="la-panel la-panel--cool" x="38" y="92" width="142" height="76" rx="9"></rect>
      <rect class="la-panel la-panel--cool" x="220" y="92" width="142" height="76" rx="9"></rect>
      <rect class="la-panel la-panel--warm" x="402" y="92" width="142" height="76" rx="9"></rect>
      <rect class="la-panel la-panel--warm" x="584" y="92" width="138" height="76" rx="9"></rect>
      <text class="la-label--strong" x="109" y="125" text-anchor="middle">初等变换</text>
      <text class="la-label--small" x="109" y="148" text-anchor="middle">交换、倍乘、倍加</text>
      <text class="la-label--strong" x="291" y="125" text-anchor="middle">初等矩阵</text>
      <text class="la-label--small" x="291" y="148" text-anchor="middle">左乘变行、右乘变列</text>
      <text class="la-label--strong" x="473" y="125" text-anchor="middle">矩阵的秩</text>
      <text class="la-label--small" x="473" y="148" text-anchor="middle">非零子式的最高阶数</text>
      <text class="la-label--strong" x="653" y="125" text-anchor="middle">线性方程组</text>
      <text class="la-label--small" x="653" y="148" text-anchor="middle">用秩判断解的情况</text>
      <path class="la-arrow" d="M180,130 H214" marker-end="url(#chapter-three-arrow)"></path>
      <path class="la-arrow" d="M362,130 H396" marker-end="url(#chapter-three-arrow)"></path>
      <path class="la-arrow" d="M544,130 H578" marker-end="url(#chapter-three-arrow)"></path>
      <text class="la-label--small" x="38" y="215">化简不改变方程组的解，也保持矩阵的秩。</text>
      <text class="la-label--small" x="38" y="239">最终目标：把增广矩阵化成行最简形，直接读出主元变量、自由变量和解。</text>
    </svg>
  `;

  window.LINEAR_ALGEBRA_CHAPTER_3 = [
    {
      id: "elementary-transformations",
      number: "3.1",
      title: "矩阵的初等变换",
      english: "Elementary Transformations",
      summary: "通过交换、倍乘和倍加三类操作，把矩阵化成阶梯形或标准形；初等变换不改变矩阵的秩，也保留线性方程组的解集。",
      examFocus: ["三类初等变换", "行等价与列等价", "阶梯形", "行最简形", "矩阵标准形"],
      accent: "indigo",
      introFigure: {
        svg: roadmapFigure,
        title: "第三章知识主线",
        caption: "初等变换、初等矩阵、矩阵的秩与线性方程组构成一条完整的求解链。"
      },
      themes: [
        {
          id: "elementary-transform-actions",
          title: "三类初等变换与矩阵等价",
          summary: "初等变换是最基本的矩阵化简动作；行变换用于解方程组，列变换更多用于研究矩阵结构。",
          cards: [
            {
              id: "elementary-row-operations-definition",
              type: "definition",
              title: "矩阵的三类初等行变换",
              body: [
                "矩阵的初等行变换只有三种：交换两行、把某一行乘以非零常数、把某一行的若干倍加到另一行。",
                "把“行”改为“列”就得到初等列变换；两者统称为矩阵的初等变换。初等变换都可逆，这是它能反复用于化简的根本原因。"
              ],
              formula: String.raw`r_i\leftrightarrow r_j,\qquad k r_i\ (k\ne0),\qquad r_i+k r_j`
            },
            {
              id: "elementary-equivalence",
              type: "definition",
              title: "行等价、列等价与矩阵等价",
              body: [
                "若矩阵 $A$ 经过有限次初等行变换化为 $B$，则称 $A$ 与 $B$ 行等价；只使用列变换时称列等价。",
                "若允许同时使用有限次初等行、列变换，则称 $A$ 与 $B$ 等价。解线性方程组时通常只做行变换，避免改变未知量的对应关系。"
              ],
              formula: String.raw`A\xrightarrow{r}B,\qquad A\xrightarrow{c}B,\qquad A\to B`
            },
            {
              id: "matrix-equivalence-relation",
              type: "property",
              title: "矩阵等价满足等价关系",
              body: [
                "任何矩阵都与自身等价；若 $A$ 与 $B$ 等价，则 $B$ 与 $A$ 等价；若 $A$ 与 $B$ 等价、$B$ 与 $C$ 等价，则 $A$ 与 $C$ 等价。",
                "反向变换只需把交换再做一次、倍乘改为乘以倒数、倍加改为加上相反倍数。"
              ],
              bullets: [
                "自反性：$A\to A$。",
                "对称性：$A\to B$ 可推出 $B\to A$。",
                "传递性：$A\to B,\ B\to C$ 可推出 $A\to C$。"
              ]
            }
          ]
        },
        {
          id: "echelon-standard-form",
          title: "阶梯形、行最简形与标准形",
          summary: "阶梯形用于数非零行，行最简形用于直接读解，标准形用于统一描述矩阵的秩。",
          cards: [
            {
              id: "row-echelon-form",
              type: "definition",
              title: "行阶梯形矩阵",
              body: [
                "每个非零行的首个非零元称为首非零元。若首非零元的列标随行号严格递增，并且零行全部位于非零行下方，就得到行阶梯形矩阵。",
                "行阶梯形不要求首非零元等于 1，也不要求首非零元所在列的其他元素为零。"
              ]
            },
            {
              id: "reduced-row-echelon-form",
              type: "definition",
              title: "行最简形矩阵",
              body: [
                "行阶梯形中，如果每个首非零元都是 1，并且首非零元所在列的其他元素全为 0，就称为行最简形矩阵。",
                "解线性方程组时把增广矩阵化成行最简形，主元列对应基本变量，其余列对应自由变量。"
              ],
              formula: String.raw`\begin{pmatrix}1&0&a&b\\0&1&c&d\\0&0&0&0\end{pmatrix}`
            },
            {
              id: "matrix-standard-form",
              type: "formula",
              title: "矩阵的标准形",
              body: [
                "任何 $m\\times n$ 矩阵经过有限次初等行、列变换，都可化为左上角为单位矩阵、其余全为零的分块矩阵。",
                "标准形中单位矩阵的阶数 $r$ 就是矩阵的秩；因此矩阵的秩可以看作矩阵经初等变换后保留下来的非零“骨架”大小。"
              ],
              formula: String.raw`A\to F=\begin{pmatrix}E_r&O_{r\times(n-r)}\\O_{(m-r)\times r}&O_{(m-r)\times(n-r)}\end{pmatrix}`
            }
          ]
        }
      ]
    },
    {
      id: "elementary-matrices",
      number: "3.2",
      title: "初等矩阵与矩阵化简",
      english: "Elementary Matrices",
      summary: "对单位矩阵做一次初等变换得到初等矩阵；初等矩阵把矩阵变换写成乘法，并给出逆矩阵和矩阵方程的化简方法。",
      examFocus: ["初等矩阵", "左乘与右乘", "逆矩阵", "矩阵可逆判定", "(A|E) 求逆"],
      accent: "forest",
      themes: [
        {
          id: "elementary-matrix-operations",
          title: "初等矩阵及其乘法意义",
          summary: "初等矩阵是初等变换的“代数外壳”：左乘执行同行变换，右乘执行同列变换。",
          cards: [
            {
              id: "elementary-matrix-definition",
              type: "definition",
              title: "初等矩阵",
              body: [
                "对单位矩阵 $E$ 做一次初等变换得到的矩阵称为初等矩阵。三种初等变换分别对应三类初等矩阵。",
                "交换第 $i,j$ 行记作 $E(i,j)$；第 $i$ 行乘以非零数 $k$ 记作 $E(i(k))$；第 $i$ 行加上第 $j$ 行的 $k$ 倍记作 $E(i,j(k))$。"
              ],
              formula: String.raw`E(i,j),\qquad E(i(k)),\qquad E(i,j(k))`
            },
            {
              id: "elementary-matrix-multiplication-rule",
              type: "property",
              title: "左乘变行、右乘变列",
              body: [
                "对 $m\\times n$ 矩阵 $A$ 左乘一个 $m$ 阶初等矩阵，相当于对 $A$ 做同名初等行变换。",
                "对 $A$ 右乘一个 $n$ 阶初等矩阵，相当于对 $A$ 做同名初等列变换。矩阵维数决定初等矩阵的阶数，不能混用。"
              ],
              formula: String.raw`E(i,j)A\ \text{交换 }A\text{ 的第 }i,j\text{ 行},\qquad AE(i,j)\ \text{交换 }A\text{ 的第 }i,j\text{ 列}`
            },
            {
              id: "elementary-matrix-inverse-transpose",
              type: "formula",
              title: "初等矩阵的逆与转置",
              body: [
                "初等矩阵都可逆，逆矩阵仍是同型初等矩阵。交换的逆是自身，倍乘的逆把 $k$ 改为 $1/k$，倍加的逆把 $k$ 改为 $-k$。",
                "初等矩阵转置后仍是初等矩阵；倍加矩阵转置时，行方向与列方向互换。"
              ],
              formula: String.raw`\begin{aligned}
E^{-1}(i,j)&=E(i,j),&
E^{-1}(i(k))&=E(i(1/k)),\\
E^{-1}(i,j(k))&=E(i,j(-k)),&
E^{T}(i,j(k))&=E(j,i(k)).
\end{aligned}`
            }
          ]
        },
        {
          id: "elementary-matrix-computation",
          title: "可逆判定、矩阵求逆与解方程",
          summary: "可逆矩阵可以分解成初等矩阵的乘积；同一串行变换把 A 化为 E 时，也会把 E 化为 A 的逆。",
          cards: [
            {
              id: "invertible-as-elementary-product",
              type: "formula",
              title: "方阵可逆的初等矩阵判定",
              body: [
                "方阵 $A$ 可逆，当且仅当存在有限个初等矩阵 $P_1,\\ldots,P_s$，使 $A=P_1P_2\\cdots P_s$。",
                "等价地，$A$ 可逆当且仅当 $A$ 可仅用初等行变换化为单位矩阵，也就是 $A$ 满秩。"
              ],
              formula: String.raw`A\text{ 可逆}\quad\Longleftrightarrow\quad A=P_1P_2\cdots P_s\quad\Longleftrightarrow\quad A\xrightarrow{r}E`
            },
            {
              id: "inverse-by-row-operations",
              type: "formula",
              title: "用初等行变换求逆矩阵",
              body: [
                "把 $A$ 与同阶单位矩阵横向拼接，对整行同步做初等行变换。",
                "当左半部分被化成 $E$ 时，右半部分就变成 $A^{-1}$。若左半部分出现零行，则 $A$ 不可逆。"
              ],
              formula: String.raw`(A\mid E)\xrightarrow{\text{初等行变换}}(E\mid A^{-1})`
            },
            {
              id: "solve-matrix-equation-row-operations",
              type: "judgment",
              title: "用增广矩阵解 AX=B",
              body: [
                "若 $A$ 可逆，对 $(A\\mid B)$ 只用初等行变换，把左侧化成 $E$，右侧就得到唯一的矩阵解 $X$。",
                "若方程形如 $XA=B$，应先转置为 $A^TX^T=B^T$，再按 $AX=B$ 的方法处理，不能直接把 $B$ 左乘一个逆矩阵。"
              ],
              formula: String.raw`(A\mid B)\xrightarrow{r}(E\mid X),\qquad AX=B\Longrightarrow X=A^{-1}B`
            },
            {
              id: "inverse-column-operation-warning",
              type: "warning",
              title: "求逆时行列变换的使用边界",
              body: [
                "使用 $(A\\mid E)\\to(E\\mid A^{-1})$ 时，只能做初等行变换，因为右侧单位矩阵必须经历与左侧完全相同的行操作。",
                "若改用列变换，应把单位矩阵放在 $A$ 的下方，并对上下两部分同步做列变换。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "matrix-rank",
      number: "3.3",
      title: "矩阵的秩",
      english: "Rank of a Matrix",
      summary: "秩衡量矩阵中真正独立的行或列的数量。它既可由最高阶非零子式定义，也可通过初等变换化成阶梯形后直接数非零行。",
      examFocus: ["k 阶子式", "矩阵的秩", "阶梯形计数", "初等变换不改秩", "秩的不等式"],
      accent: "brick",
      themes: [
        {
          id: "rank-definition",
          title: "子式、秩与满秩",
          summary: "秩的定义强调“最高阶非零子式”；实际计算时通常改用阶梯形的非零行数。",
          cards: [
            {
              id: "kth-order-minor",
              type: "definition",
              title: "k 阶子式",
              body: [
                "在 $m\\times n$ 矩阵中任取 $k$ 行和 $k$ 列，交叉位置的 $k^2$ 个元素按原顺序组成 $k$ 阶行列式，称为矩阵的一个 $k$ 阶子式。",
                "其中要求 $k\\le\\min\\{m,n\\}$。子式只取方阵行列式，因此不会超过矩阵行数与列数中的较小者。"
              ]
            },
            {
              id: "matrix-rank-definition",
              type: "definition",
              title: "矩阵的秩",
              body: [
                "若矩阵中存在非零的 $r$ 阶子式，而所有 $r+1$ 阶子式都为零，则称 $r$ 为矩阵的秩，记作 $r(A)$。",
                "零矩阵的秩规定为 0。对任意 $m\\times n$ 矩阵，都有 $0\\le r(A)\\le\\min\\{m,n\\}$。"
              ],
              formula: String.raw`r(A)=r\quad\Longleftrightarrow\quad \text{最高阶非零子式为 }r\text{ 阶}`
            },
            {
              id: "full-rank-and-reduced-rank",
              type: "judgment",
              title: "满秩矩阵与降秩矩阵",
              body: [
                "对于 $n$ 阶方阵 $A$，若 $r(A)=n$，称 $A$ 为满秩矩阵；若 $r(A)<n$，称 $A$ 为降秩矩阵。",
                "$n$ 阶方阵满秩、行列式非零、可逆三者等价。"
              ],
              formula: String.raw`r(A)=n\quad\Longleftrightarrow\quad |A|\ne0\quad\Longleftrightarrow\quad A^{-1}\text{ 存在}`
            }
          ]
        },
        {
          id: "rank-computation-properties",
          title: "秩的计算与常用性质",
          summary: "先化成行阶梯形，再数非零行；这是最实用的求秩方法。",
          cards: [
            {
              id: "rank-preserved-by-elementary-operations",
              type: "property",
              title: "初等变换不改变矩阵的秩",
              body: [
                "对矩阵做任意有限次初等行变换或列变换，矩阵的秩保持不变。",
                "因此可以先用行变换把矩阵化为行阶梯形，再数非零行数。这个做法比枚举所有子式高效得多。"
              ],
              formula: String.raw`A\to B\quad\Longrightarrow\quad r(A)=r(B)`
            },
            {
              id: "rank-echelon-count",
              type: "example",
              title: "用行阶梯形求秩",
              body: [
                "把矩阵化为行阶梯形后，非零行数就是秩。若最后出现全零行，它不贡献秩；若仍有三个主元位置，则秩为 3。",
                "计算时只需做行变换，不必把首非零元全部化为 1，也不要求化到行最简形。"
              ],
              formula: String.raw`r(A)=\text{行阶梯形中非零行的个数}`,
              example: {
                title: "快速判读",
                body: [
                  "例如一个 $4\\times4$ 矩阵化成阶梯形后有 3 个非零行、1 个零行，则 $r(A)=3$，它是降秩方阵。"
                ]
              }
            },
            {
              id: "rank-basic-properties",
              type: "formula",
              title: "常用秩等式",
              body: [
                "转置不改变秩；左乘或右乘可逆矩阵也不改变秩。",
                "若存在可逆矩阵 $P,Q$，使 $PAQ=B$，则 $A,B$ 等价且秩相同。"
              ],
              formula: String.raw`r(A^T)=r(A),\qquad r(PAQ)=r(A)\quad(P,Q\text{ 可逆})`
            },
            {
              id: "rank-inequalities",
              type: "formula",
              title: "秩的常用不等式",
              body: [
                "矩阵乘积的秩不会超过任一因子的秩；矩阵和的秩不超过两个矩阵秩之和。",
                "这些不等式常用于判断：已知若干矩阵的秩时，估计乘积、和或拼接矩阵的秩。"
              ],
              formula: String.raw`\begin{aligned}
r(A+B)&\le r(A)+r(B),\\
r(AB)&\le\min\{r(A),r(B)\},\\
\max\{r(A),r(B)\}&\le r(A,B)\le r(A)+r(B).
\end{aligned}`
            },
            {
              id: "rank-zero-product",
              type: "judgment",
              title: "AB=O 时的秩约束",
              body: [
                "若 $A$ 为 $m\\times n$ 矩阵、$B$ 为 $n\\times s$ 矩阵，并且 $AB=O$，则 $r(A)+r(B)\\le n$。",
                "这说明 $B$ 的非零列都落在 $A$ 的零空间中；该结论是后续研究齐次方程组基础解系的重要工具。"
              ],
              formula: String.raw`A_{m\times n}B_{n\times s}=O\quad\Longrightarrow\quad r(A)+r(B)\le n`
            }
          ]
        }
      ]
    },
    {
      id: "linear-system-solutions",
      number: "3.4",
      title: "线性方程组的解",
      english: "Solutions of Linear Systems",
      summary: "把线性方程组写成 Ax=b，对增广矩阵做行变换，再比较系数矩阵与增广矩阵的秩，即可判断无解、唯一解或无穷多解。",
      examFocus: ["增广矩阵", "有解判定", "唯一解与无穷多解", "齐次方程组", "参数讨论"],
      accent: "indigo",
      themes: [
        {
          id: "nonhomogeneous-linear-systems",
          title: "非齐次线性方程组",
          summary: "秩定理把“方程是否相容”与矩阵结构直接对应起来。",
          cards: [
            {
              id: "linear-system-matrix-form",
              type: "definition",
              title: "系数矩阵、增广矩阵与矩阵形式",
              body: [
                "把未知量系数排成系数矩阵 $A$，常数项排成列矩阵 $b$，线性方程组可写成 $Ax=b$。",
                "把 $b$ 追加到 $A$ 的右侧得到增广矩阵 $(A,b)$。对增广矩阵做初等行变换，等价于对原方程组做同解变形。"
              ],
              formula: String.raw`Ax=b,\qquad (A,b)=\begin{pmatrix}a_{11}&\cdots&a_{1n}&b_1\\\vdots&&\vdots&\vdots\\a_{m1}&\cdots&a_{mn}&b_m\end{pmatrix}`
            },
            {
              id: "linear-system-rank-criterion",
              type: "formula",
              title: "非齐次方程组有解判定",
              body: [
                "非齐次线性方程组有解，当且仅当系数矩阵的秩等于增广矩阵的秩。",
                "若两者不相等，说明增广列引入了独立约束，方程组无解；若相等，还需比较公共秩与未知量个数 $n$。"
              ],
              formula: String.raw`Ax=b\text{ 有解}\quad\Longleftrightarrow\quad r(A)=r(A,b)`
            },
            {
              id: "linear-system-three-cases",
              type: "judgment",
              title: "无解、唯一解与无穷多解",
              body: [
                "这是线性代数考试最常考的一组判定：先比较系数矩阵与增广矩阵，再与未知量个数比较。",
                "当 $r(A)<r(A,b)$ 时无解；当 $r(A)=r(A,b)=n$ 时唯一解；当 $r(A)=r(A,b)<n$ 时无穷多解。"
              ],
              formula: String.raw`\begin{cases}
r(A)<r(A,b),&\text{无解},\\
r(A)=r(A,b)=n,&\text{唯一解},\\
r(A)=r(A,b)<n,&\text{无穷多解}.
\end{cases}`
            },
            {
              id: "solve-by-augmented-matrix",
              type: "example",
              title: "增广矩阵化行最简形求解",
              body: [
                "只对增广矩阵做初等行变换，把左侧系数部分化成行最简形。",
                "首非零元所在的列对应基本变量，其余列对应自由变量。给自由变量任意赋值，就能写出通解。"
              ],
              formula: String.raw`(A,b)\xrightarrow{\text{初等行变换}}(\text{行最简形})`
            }
          ]
        },
        {
          id: "homogeneous-and-parameter-systems",
          title: "齐次方程组、矩阵方程与参数讨论",
          summary: "齐次方程组永远有零解；有非零解的关键条件是系数矩阵不满列秩。",
          cards: [
            {
              id: "homogeneous-system-solutions",
              type: "definition",
              title: "齐次线性方程组",
              body: [
                "常数项全为零的方程组称为齐次线性方程组，形式为 $Ax=0$。",
                "齐次方程组至少有零解。把系数矩阵化成行阶梯形，主元变量个数就是秩，自由变量个数由 $n-r(A)$ 决定。"
              ],
              formula: String.raw`Ax=0`
            },
            {
              id: "homogeneous-nontrivial-solution",
              type: "formula",
              title: "齐次方程组只有零解或存在非零解",
              body: [
                "若 $r(A)=n$，齐次方程组只有零解；若 $r(A)<n$，就存在非零解，而且解的集合有无穷多个。",
                "对于 $n$ 元齐次方程组，记住：不满秩就有非零解。自由变量个数为 $n-r(A)$。"
              ],
              formula: String.raw`\begin{cases}
r(A)=n,&\text{只有零解},\\
r(A)<n,&\text{有无穷多个非零解}.
\end{cases}`
            },
            {
              id: "matrix-equation-ax-equals-b",
              type: "property",
              title: "矩阵方程 AX=B 的解",
              body: [
                "把 $B$ 的各列视为若干组非齐次方程组的常数项，矩阵方程 $AX=B$ 有解当且仅当 $r(A)=r(A,B)$。",
                "若 $A$ 可逆，解唯一并等于 $A^{-1}B$；若 $A$ 不可逆，则可能无解，也可能有无穷多个矩阵解。"
              ],
              formula: String.raw`AX=B\text{ 有解}\quad\Longleftrightarrow\quad r(A)=r(A,B)`
            },
            {
              id: "parameter-system-cases",
              type: "warning",
              title: "含参数方程组的分情况讨论",
              body: [
                "含参数时先化增广矩阵为阶梯形，再根据含参主元是否为零分情况。不要一开始就给参数赋值，也不要把行变换中的除法除以可能为零的参数。",
                "分情况时始终围绕两个秩展开：出现“左边全零、右边非零”对应无解；两个秩相等且等于未知量个数对应唯一解；两个秩相等但小于未知量个数对应无穷多解。"
              ],
              bullets: [
                "先保留参数，做不会除以未知参数的消元。",
                "找到可能使主元为零的临界参数值。",
                "分别判断 $r(A)$ 与 $r(A,b)$，再写结论。"
              ]
            }
          ]
        }
      ]
    }
  ];
})();
