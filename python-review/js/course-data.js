window.PYTHON_COURSE = {
  title: "Python 3",
  subtitle: "从能运行的第一行代码，到可以交付的小项目",
  updatedAt: "2026-11-13",
  chapters: [
    {
      id: "getting-started",
      number: "01",
      title: "起步与环境",
      english: "Getting Started",
      accent: "brick",
      summary: "先理解 Python 程序怎样被运行，再建立解释器、脚本、缩进、输入输出和报错阅读的基本习惯。",
      examFocus: ["解释器与脚本", "缩进", "输入输出", "阅读报错"],
      themes: [
        {
          id: "first-program",
          title: "第一段 Python 程序",
          summary: "Python 的核心学习方式不是背语法，而是不断经历“写代码、运行、观察、修改”。",
          cards: [
            {
              id: "python-runtime",
              type: "definition",
              title: "解释器与脚本",
              body: [
                "Python 代码由解释器逐行执行。你可以在交互式 REPL 中试一行代码，也可以把多行代码保存为 <code>.py</code> 文件后运行。",
                "学习阶段建议同时使用两种方式：REPL 适合验证小表达式，脚本适合组织完整程序。"
              ],
              code: String.raw`print("Hello, Python!")
print(2 + 3)`,
              output: String.raw`Hello, Python!
5`
            },
            {
              id: "indentation",
              type: "syntax",
              title: "缩进是语法的一部分",
              body: [
                "Python 用缩进表示代码块。同一个代码块必须使用一致的缩进，推荐统一使用 4 个空格。",
                "冒号通常表示下一层代码块开始，例如 if、for、def、class 和 try。"
              ],
              code: String.raw`score = 80
if score >= 60:
    print("通过")
    print("继续复习")
print("程序结束")`,
              note: "混用 Tab 和空格容易产生 IndentationError。"
            },
            {
              id: "comments",
              type: "syntax",
              title: "注释与命名",
              body: [
                "注释解释“为什么这样做”，而不是重复代码表面在做什么。",
                "变量和函数通常使用英文小写与下划线，例如 <code>study_minutes</code>。"
              ],
              code: String.raw`# 每天至少练习 20 分钟
daily_minutes = 20
weekly_minutes = daily_minutes * 7
print(weekly_minutes)`,
              output: "140"
            },
            {
              id: "print-input",
              type: "syntax",
              title: "print 与 input",
              body: [
                "<code>print()</code> 输出内容；<code>input()</code> 读取一行文本，返回值始终是字符串。",
                "如果需要数字，必须使用 <code>int()</code> 或 <code>float()</code> 转换。"
              ],
              code: String.raw`name = input("你的名字：")
age = int(input("你的年龄："))
print(f"{name} 明年 {age + 1} 岁")`
            },
            {
              id: "reading-errors",
              type: "warning",
              title: "阅读报错从最后一行开始",
              body: [
                "报错信息最后一行给出错误类型和原因，再往上看 Traceback 找到真正出错的代码位置。",
                "常见错误包括 NameError、TypeError、ValueError、IndexError 和 KeyError。"
              ],
              quiz: {
                question: "运行 `age = int(input())` 后输入 `abc`，通常会得到哪类错误？",
                options: ["ValueError", "IndexError", "KeyError"],
                answer: 0,
                explanation: "int() 无法把 abc 转换成整数，因此抛出 ValueError。"
              }
            },
            {
              id: "minute-one-project",
              type: "project",
              title: "练习：自我介绍卡",
              body: [
                "读取姓名、专业和学习目标，然后输出三行格式化文本。",
                "先让程序能运行，再把英文变量名改得更清楚。"
              ],
              code: String.raw`name = input("姓名：")
major = input("专业：")
goal = input("目标：")
print("--- 学习卡 ---")
print(f"姓名：{name}")
print(f"专业：{major}")
print(f"目标：{goal}")`
            }
          ]
        }
      ]
    },
    {
      id: "values-and-operators",
      number: "02",
      title: "变量、类型与表达式",
      english: "Values & Expressions",
      accent: "forest",
      summary: "掌握变量引用、基本类型、类型转换、算术与布尔表达式，为后续数据组织和流程控制打基础。",
      examFocus: ["动态类型", "数字与布尔", "类型转换", "运算符优先级"],
      themes: [
        {
          id: "variables-types",
          title: "变量与基本类型",
          summary: "变量名指向对象；对象有自己的类型，而变量本身不固定类型。",
          cards: [
            {
              id: "variables-are-references",
              type: "definition",
              title: "变量是对象的引用",
              body: [
                "赋值语句把变量名绑定到一个对象。再次赋值只会改变变量指向，不会自动修改之前的对象。",
                "可以使用 <code>id()</code> 观察对象身份，但日常编程不需要依赖具体内存地址。"
              ],
              code: String.raw`a = [1, 2]
b = a
b.append(3)
print(a)
print(a is b)`,
              output: String.raw`[1, 2, 3]
True`
            },
            {
              id: "core-types",
              type: "syntax",
              title: "int、float、bool、str、None",
              body: [
                "整数、浮点数、布尔值、字符串和 None 是最常用的基础对象。",
                "<code>type(value)</code> 查看类型；<code>isinstance(value, 类型)</code> 更适合类型判断。"
              ],
              code: String.raw`values = [42, 3.14, True, "Python", None]
for value in values:
    print(type(value).__name__)`,
              output: String.raw`int
float
bool
str
NoneType`
            },
            {
              id: "type-conversion",
              type: "syntax",
              title: "显式类型转换",
              body: [
                "输入得到字符串，计算通常需要数字；输出有时需要把数字转换为字符串。",
                "转换失败会报错，因此真实程序要做好异常处理。"
              ],
              code: String.raw`count = int("12")
price = float("9.8")
message = "数量：" + str(count)
print(message)
print(count * price)`
            },
            {
              id: "operators",
              type: "syntax",
              title: "算术、比较与逻辑运算",
              body: [
                "<code>//</code> 是整除，<code>%</code> 是余数，<code>**</code> 是乘方。",
                "比较运算返回 bool；<code>and</code>、<code>or</code>、<code>not</code> 组合条件。"
              ],
              code: String.raw`minutes = 137
print(minutes // 60)
print(minutes % 60)
print(0 < minutes < 180)`,
              output: String.raw`2
17
True`
            },
            {
              id: "mutable-reference",
              type: "warning",
              title: "可变对象与复制",
              body: [
                "列表、字典和集合是可变对象。直接赋值 <code>b = a</code> 不会复制内容。",
                "浅复制可使用切片、<code>list()</code> 或 <code>dict.copy()</code>；嵌套结构仍可能需要深复制。"
              ],
              quiz: {
                question: "`a = [1, 2]; b = a; b.append(3)` 后，`a` 是什么？",
                options: ["[1, 2]", "[1, 2, 3]", "运行报错"],
                answer: 1,
                explanation: "a 和 b 指向同一个列表，因此通过 b 修改后 a 也会看到变化。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "strings",
      number: "03",
      title: "字符串处理",
      english: "Strings",
      accent: "indigo",
      summary: "字符串不可变，但提供了切片、格式化、查找、分割、连接和清洗等大量实用方法。",
      examFocus: ["索引切片", "f-string", "常用方法", "编码"],
      themes: [
        {
          id: "string-basics",
          title: "索引、切片与格式化",
          summary: "先把字符串看成字符序列，再学习最常用的格式化与清洗工具。",
          cards: [
            {
              id: "string-index-slice",
              type: "syntax",
              title: "索引与切片",
              body: [
                "索引从 0 开始，负索引从末尾开始。切片遵循“左闭右开”。",
                "<code>text[start:stop:step]</code> 可以省略任意部分。"
              ],
              code: String.raw`text = "Python"
print(text[0])
print(text[-1])
print(text[1:4])
print(text[::-1])`,
              output: String.raw`P
n
yth
nohtyP`
            },
            {
              id: "f-string",
              type: "syntax",
              title: "f-string 格式化",
              body: [
                "f-string 在字符串前加 <code>f</code>，花括号中可直接放入表达式。",
                "格式说明符可以控制小数位、宽度和百分比。"
              ],
              code: String.raw`name = "Lin"
score = 93.456
print(f"{name}: {score:.1f}")
print(f"{score / 100:.0%}")`,
              output: String.raw`Lin: 93.5
93%`
            },
            {
              id: "string-methods",
              type: "syntax",
              title: "常用字符串方法",
              body: [
                "<code>strip()</code> 清理两端空白，<code>split()</code> 分割，<code>join()</code> 连接，<code>replace()</code> 替换。",
                "字符串方法通常返回新字符串，原字符串不变。"
              ],
              code: String.raw`raw = "  apple, banana, pear  "
items = raw.strip().split(",")
print(items)
print(" | ".join(item.strip().title() for item in items))`,
              output: String.raw`['apple', ' banana', ' pear']
Apple | Banana | Pear`
            },
            {
              id: "encoding",
              type: "warning",
              title: "文本编码与中文",
              body: [
                "保存文件时推荐明确使用 UTF-8。读写文本文件时也应指定 <code>encoding=\"utf-8\"</code>。",
                "乱码通常来自“写入时使用一种编码，读取时使用另一种编码”。"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "lists-tuples",
      number: "04",
      title: "列表与元组",
      english: "Lists & Tuples",
      accent: "brick",
      summary: "列表用于可变的有序数据，元组用于通常不修改的有序数据。掌握遍历、筛选、排序与推导式。",
      examFocus: ["增删改查", "切片", "推导式", "元组解包"],
      themes: [
        {
          id: "list-operations",
          title: "列表操作",
          summary: "先把列表作为可修改序列使用，再学习排序、切片和嵌套结构。",
          cards: [
            {
              id: "list-methods",
              type: "syntax",
              title: "列表的常用方法",
              body: [
                "<code>append()</code> 在末尾添加一个元素，<code>extend()</code> 展开一个可迭代对象，<code>insert()</code> 指定位置插入。",
                "<code>remove()</code> 按值删除，<code>pop()</code> 按下标删除并返回值。"
              ],
              code: String.raw`tasks = ["阅读", "听力"]
tasks.append("单词")
tasks.extend(["拼写", "复习"])
done = tasks.pop(0)
print(tasks)
print(done)`,
              output: String.raw`['听力', '单词', '拼写', '复习']
阅读`
            },
            {
              id: "sorting",
              type: "syntax",
              title: "排序与反转",
              body: [
                "<code>sorted()</code> 返回新列表，<code>list.sort()</code> 原地排序。",
                "使用 <code>key=</code> 可以按指定规则排序。"
              ],
              code: String.raw`scores = [("Lin", 92), ("Ann", 98), ("Bob", 75)]
ranked = sorted(scores, key=lambda item: item[1], reverse=True)
print(ranked)`
            },
            {
              id: "list-comprehension",
              type: "syntax",
              title: "列表推导式",
              body: [
                "推导式适合把“遍历 + 条件 + 生成新列表”写在同一行。",
                "如果逻辑很复杂，应改回普通循环，保证可读性。"
              ],
              code: String.raw`values = [3, 8, 11, 20, 27]
squares = [x * x for x in values if x % 2]
print(squares)`,
              output: "[9, 121, 729]"
            },
            {
              id: "tuple-unpacking",
              type: "syntax",
              title: "元组与解包",
              body: [
                "元组不可修改，常用于表示一组固定字段或函数返回多个值。",
                "解包可以直接把序列赋给多个变量。"
              ],
              code: String.raw`point = (3, 5)
x, y = point
print(x, y)
def min_max(values):
    return min(values), max(values)
print(min_max([4, 2, 9]))`
            },
            {
              id: "mutation-iteration",
              type: "warning",
              title: "遍历列表时不要随意删除元素",
              body: [
                "边遍历边删除会让下标和元素位置变化，容易跳过数据。",
                "先生成新列表，或倒序遍历，或遍历副本。"
              ],
              quiz: {
                question: "要从列表中删除所有小于 60 的分数，哪种方式最稳妥？",
                options: ["边遍历边 remove", "重新生成满足条件的新列表", "反复 access 最后一个元素"],
                answer: 1,
                explanation: "推导式或新列表不会破坏正在遍历的原始序列。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "dict-sets",
      number: "05",
      title: "字典与集合",
      english: "Dictionaries & Sets",
      accent: "forest",
      summary: "字典通过键快速查找值，集合用于去重和集合运算。掌握安全访问、计数和分组。",
      examFocus: ["键值访问", "get", "计数", "集合去重"],
      themes: [
        {
          id: "dictionary",
          title: "字典",
          summary: "字典适合保存有名字的数据，也适合做计数表、索引和映射。",
          cards: [
            {
              id: "dict-access",
              type: "syntax",
              title: "读取、更新与安全访问",
              body: [
                "<code>data[key]</code> 在键不存在时抛出 KeyError；<code>data.get(key, default)</code> 可提供默认值。",
                "字典的键必须可哈希，通常使用字符串或数字。"
              ],
              code: String.raw`student = {"name": "Lin", "score": 88}
student["score"] = 92
print(student.get("age", 0))
print(student)`
            },
            {
              id: "dict-counting",
              type: "example",
              title: "用字典统计频次",
              body: [
                "词频统计是字典最典型的应用：以元素为键，以出现次数为值。"
              ],
              code: String.raw`words = ["apple", "pear", "apple", "orange", "pear", "apple"]
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
print(counts)`,
              output: "{'apple': 3, 'pear': 2, 'orange': 1}"
            },
            {
              id: "dict-looping",
              type: "syntax",
              title: "遍历键、值与键值对",
              body: [
                "<code>keys()</code>、<code>values()</code>、<code>items()</code> 分别遍历键、值和键值对。",
                "需要同时拿到键和值时优先使用 <code>items()</code>。"
              ],
              code: String.raw`prices = {"book": 45, "pen": 8, "bag": 120}
for name, price in prices.items():
    if price >= 50:
        print(name, price)`
            },
            {
              id: "sets",
              type: "syntax",
              title: "集合去重与运算",
              body: [
                "集合中的元素唯一且无序，常用于去重、求交集、并集和差集。",
                "集合不能通过下标访问。"
              ],
              code: String.raw`a = {1, 2, 3, 3}
b = {3, 4, 5}
print(a)
print(a & b)
print(a | b)
print(a - b)`
            },
            {
              id: "key-error",
              type: "warning",
              title: "不要用不存在的键直接取值",
              body: [
                "处理外部数据时，不能假设键一定存在。可先使用 <code>in</code> 判断，或使用 <code>get()</code>。"
              ],
              quiz: {
                question: "读取可能不存在的字典键时，最安全的方法是？",
                options: ["data[key]", "data.get(key, default)", "del data[key]"],
                answer: 1,
                explanation: "get 可以在键不存在时返回默认值，不会抛 KeyError。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      number: "06",
      title: "条件与循环",
      english: "Control Flow",
      accent: "indigo",
      summary: "使用 if、for、while、break、continue 和 range 控制程序路径，把数据处理写成可重复的步骤。",
      examFocus: ["if/elif", "for/range", "while", "break/continue"],
      themes: [
        {
          id: "conditions",
          title: "条件判断",
          summary: "条件表达式返回布尔值，Python 把空容器、0、空字符串和 None 视为假。",
          cards: [
            {
              id: "if-elif",
              type: "syntax",
              title: "if、elif、else",
              body: [
                "条件从上到下判断，只执行第一个满足的分支。",
                "范围判断可以使用连续比较，例如 <code>60 <= score < 80</code>。"
              ],
              code: String.raw`score = 76
if score >= 90:
    level = "优秀"
elif score >= 75:
    level = "良好"
elif score >= 60:
    level = "及格"
else:
    level = "需复习"
print(level)`,
              output: "良好"
            },
            {
              id: "truthiness",
              type: "property",
              title: "真值与假值",
              body: [
                "Python 的条件不要求一定是 bool。空列表、空字典、空字符串、0 和 None 都会按假处理。",
                "但依赖隐式真值时要保证含义清楚。"
              ],
              code: String.raw`for value in [0, 1, "", "text", [], [0]]:
    print(repr(value), bool(value))`
            }
          ]
        },
        {
          id: "loops",
          title: "循环与流程控制",
          summary: "for 遍历序列，while 根据条件重复；break 提前结束，continue 跳到下一轮。",
          cards: [
            {
              id: "for-range",
              type: "syntax",
              title: "for 与 range",
              body: [
                "for 适合已经知道要遍历什么的情况。",
                "<code>range(start, stop, step)</code> 生成整数序列，stop 不包含。"
              ],
              code: String.raw`for number in range(1, 6):
    print(number, number ** 2)`
            },
            {
              id: "while-break",
              type: "syntax",
              title: "while、break 与 continue",
              body: [
                "while 适合“条件满足就一直重复”的场景。",
                "一定要让循环条件最终有机会变为假，否则会死循环。"
              ],
              code: String.raw`total = 0
while True:
    text = input("数字，输入 q 结束：")
    if text == "q":
        break
    number = int(text)
    if number < 0:
        continue
    total += number
print(total)`
            },
            {
              id: "enumerate-zip",
              type: "example",
              title: "同时使用 enumerate 与 zip",
              body: [
                "<code>enumerate()</code> 同时得到下标和元素，<code>zip()</code> 同时遍历多个序列。"
              ],
              code: String.raw`names = ["Lin", "Ann", "Bob"]
scores = [92, 98, 75]
for rank, (name, score) in enumerate(zip(names, scores), start=1):
    print(rank, name, score)`
            },
            {
              id: "infinite-loop",
              type: "warning",
              title: "检查循环变量是否更新",
              body: [
                "while 内忘记更新变量、条件永远为真，或 break 位于错误分支，都会造成死循环。"
              ],
              quiz: {
                question: "`i = 0` 后写 `while i < 3: print(i)`，缺少什么？",
                options: ["break", "修改 i", "return"],
                answer: 1,
                explanation: "i 永远保持 0，循环条件始终为真。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "functions",
      number: "07",
      title: "函数",
      english: "Functions",
      accent: "brick",
      summary: "把重复逻辑封装成函数：参数负责输入，返回值负责输出，作用域控制变量可见范围。",
      examFocus: ["def/return", "默认参数", "作用域", "*args/**kwargs", "类型标注"],
      themes: [
        {
          id: "function-basics",
          title: "定义与调用",
          summary: "函数名描述动作，参数表达需要的数据，return 返回结果。",
          cards: [
            {
              id: "def-return",
              type: "syntax",
              title: "def 与 return",
              body: [
                "没有 return 的函数默认返回 None；return 会立即结束函数。",
                "函数应尽量只做一件清楚的事。"
              ],
              code: String.raw`def average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

print(average([80, 90, 100]))`,
              output: "90.0"
            },
            {
              id: "default-keyword",
              type: "syntax",
              title: "默认参数与关键字参数",
              body: [
                "默认参数必须放在普通参数之后；调用时可使用参数名提高可读性。",
                "不要使用可变对象作为默认参数。"
              ],
              code: String.raw`def make_label(name, score, passed=True):
    status = "通过" if passed else "未通过"
    return f"{name}: {score}，{status}"

print(make_label("Lin", 86))`
            },
            {
              id: "args-kwargs",
              type: "syntax",
              title: "*args 与 **kwargs",
              body: [
                "<code>*args</code> 收集位置参数为元组，<code>**kwargs</code> 收集关键字参数为字典。",
                "优先使用明确参数；只有在函数确实需要接收任意数量参数时才使用它们。"
              ],
              code: String.raw`def summary(title, *scores, **meta):
    print(title, sum(scores) / len(scores))
    print(meta)

summary("Math", 80, 90, 100, term="fall")`
            },
            {
              id: "scope",
              type: "property",
              title: "局部与全局作用域",
              body: [
                "函数内赋值的变量默认是局部变量。读取全局变量可以，但修改前必须声明 global，通常应避免。",
                "更好的方式是通过参数传入、通过返回值传出。"
              ]
            },
            {
              id: "type-hints",
              type: "syntax",
              title: "类型标注",
              body: [
                "类型标注不会自动限制运行时类型，但能帮助编辑器、读者和静态检查工具。"
              ],
              code: String.raw`def parse_scores(lines: list[str]) -> list[int]:
    return [int(line) for line in lines if line.strip()]

print(parse_scores(["80", "", "95"]))`
            },
            {
              id: "mutable-default",
              type: "warning",
              title: "可变默认参数只创建一次",
              body: [
                "`def add(item, target=[])` 的默认列表会跨调用共享，容易产生意外状态。",
                "应改为 `target=None`，在函数内部创建新列表。"
              ],
              quiz: {
                question: "函数默认参数应避免直接写成哪种值？",
                options: ["None", "整数", "可变列表或字典"],
                answer: 2,
                explanation: "默认参数只计算一次，可变对象会在多次调用间共享。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "files-data",
      number: "08",
      title: "文件、路径与数据",
      english: "Files & Data",
      accent: "forest",
      summary: "学会安全读写文本、JSON 与 CSV，使用 pathlib 管理路径，并处理不同编码。",
      examFocus: ["with open", "UTF-8", "JSON", "CSV", "pathlib"],
      themes: [
        {
          id: "file-io",
          title: "文本文件读写",
          summary: "with 语句负责自动关闭文件，是文件操作的基本写法。",
          cards: [
            {
              id: "with-open",
              type: "syntax",
              title: "with open 读写文本",
              body: [
                "读取用 <code>r</code>，写入覆盖用 <code>w</code>，追加用 <code>a</code>。",
                "务必明确编码为 UTF-8。"
              ],
              code: String.raw`from pathlib import Path

path = Path("notes.txt")
path.write_text("Python\n复习\n", encoding="utf-8")

with path.open("a", encoding="utf-8") as file:
    file.write("完成练习\n")

print(path.read_text(encoding="utf-8"))`
            },
            {
              id: "pathlib",
              type: "syntax",
              title: "用 pathlib 管理路径",
              body: [
                "优先使用 pathlib.Path，而不是手工拼接字符串。",
                "Path 提供 exists、suffix、stem、parent、mkdir 等实用成员。"
              ],
              code: String.raw`from pathlib import Path

path = Path("data") / "scores.csv"
print(path.name)
print(path.suffix)
print(path.parent)`
            }
          ]
        },
        {
          id: "structured-data",
          title: "JSON 与 CSV",
          summary: "JSON 适合嵌套结构，CSV 适合表格数据；两者都需要注意类型转换。",
          cards: [
            {
              id: "json",
              type: "syntax",
              title: "JSON 序列化与读取",
              body: [
                "<code>json.dumps()</code> 把对象转为 JSON 字符串，<code>json.loads()</code> 把文本解析为 Python 对象。",
                "ensure_ascii=False 可以保留中文。"
              ],
              code: String.raw`import json

data = {"name": "Lin", "scores": [80, 92]}
text = json.dumps(data, ensure_ascii=False)
print(text)
print(json.loads(text)["scores"])`
            },
            {
              id: "csv",
              type: "syntax",
              title: "CSV 读写与类型转换",
              body: [
                "CSV 读出的每个字段都是字符串，需要自行转换为整数或浮点数。",
                "DictReader 可以把每行转换为以表头为键的字典。"
              ],
              code: String.raw`import csv
from io import StringIO

text = "name,score\nLin,88\nAnn,95\n"
rows = list(csv.DictReader(StringIO(text)))
for row in rows:
    print(row["name"], int(row["score"]))`
            },
            {
              id: "relative-path",
              type: "warning",
              title: "相对路径依赖当前工作目录",
              body: [
                "脚本中的相对路径取决于运行时所在目录，不一定取决于脚本文件位置。",
                "需要稳定定位时，以脚本的 <code>__file__</code> 或 Path(__file__).parent 为基准。"
              ],
              quiz: {
                question: "读取 CSV 后 `row['score']` 的类型通常是什么？",
                options: ["int", "str", "float"],
                answer: 1,
                explanation: "CSV 文件没有数据类型，csv 模块读出字段时都是字符串。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "errors-modules",
      number: "09",
      title: "异常、模块与依赖",
      english: "Errors & Modules",
      accent: "indigo",
      summary: "程序必须处理失败路径。学习 try/except、主动抛出异常、模块导入、虚拟环境与第三方包。",
      examFocus: ["异常类型", "try/except", "模块", "venv/pip"],
      themes: [
        {
          id: "exceptions",
          title: "异常处理",
          summary: "只捕获你能够处理的异常，并让错误信息保留足够上下文。",
          cards: [
            {
              id: "try-except",
              type: "syntax",
              title: "try、except、else、finally",
              body: [
                "try 放可能失败的代码；except 捕获预期异常；else 在没有异常时运行；finally 总会运行。",
                "不要写裸 except 吞掉所有问题。"
              ],
              code: String.raw`while True:
    text = input("整数：")
    try:
        number = int(text)
    except ValueError:
        print("输入不是整数")
    else:
        print("平方", number ** 2)
        break`
            },
            {
              id: "raise",
              type: "syntax",
              title: "主动抛出异常",
              body: [
                "当输入违反函数约定时，可以 raise ValueError 或自定义异常，让调用者明确处理。"
              ],
              code: String.raw`def set_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    return age

try:
    set_age(-1)
except ValueError as error:
    print(error)`
            }
          ]
        },
        {
          id: "modules-packages",
          title: "模块、虚拟环境与 pip",
          summary: "模块拆分代码，虚拟环境隔离项目依赖。",
          cards: [
            {
              id: "import-module",
              type: "syntax",
              title: "导入模块",
              body: [
                "标准库无需安装，直接 import。第三方包先用 pip 安装。",
                "避免使用 `from module import *`，它会污染命名空间。"
              ],
              code: String.raw`import random
from statistics import mean

values = [random.randint(1, 10) for _ in range(5)]
print(values)
print(mean(values))`
            },
            {
              id: "venv",
              type: "project",
              title: "每个项目单独建立虚拟环境",
              body: [
                "虚拟环境把项目依赖与系统 Python 隔离，避免不同项目互相影响。",
                "Windows 常用命令如下；Linux/macOS 的激活命令不同。"
              ],
              code: String.raw`python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install requests
pip freeze > requirements.txt`
            },
            {
              id: "exception-scope",
              type: "warning",
              title: "except 范围过大会掩盖错误",
              body: [
                "捕获 Exception 后静默 pass，会让真正的问题消失。",
                "只捕获预期异常；无法处理的错误应让程序暴露出来。"
              ],
              quiz: {
                question: "函数约定年龄不能为负数，最适合主动做什么？",
                options: ["raise ValueError", "print 后继续", "忽略"],
                answer: 0,
                explanation: "主动抛出异常能让调用者明确知道输入违反约定。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "object-oriented",
      number: "10",
      title: "面向对象",
      english: "Object-Oriented Python",
      accent: "brick",
      summary: "用类把数据与行为组织在一起，理解实例、方法、继承、组合、特殊方法和 dataclass。",
      examFocus: ["class/init", "实例属性", "继承与组合", "__str__", "dataclass"],
      themes: [
        {
          id: "classes",
          title: "类与实例",
          summary: "类定义对象的共同结构，实例保存具体数据。",
          cards: [
            {
              id: "class-init",
              type: "syntax",
              title: "class 与 __init__",
              body: [
                "<code>__init__</code> 在创建实例时初始化属性。<code>self</code> 指向当前实例。",
                "方法是定义在类中的函数。"
              ],
              code: String.raw`class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def passed(self):
        return self.score >= 60

student = Student("Lin", 88)
print(student.passed())`
            },
            {
              id: "inheritance-composition",
              type: "property",
              title: "继承与组合",
              body: [
                "继承表达“是一种”，组合表达“包含一个”。",
                "优先考虑组合，因为它通常能减少耦合。"
              ],
              code: String.raw`class Engine:
    def start(self):
        return "engine started"

class Car:
    def __init__(self):
        self.engine = Engine()

print(Car().engine.start())`
            },
            {
              id: "special-methods",
              type: "syntax",
              title: "特殊方法与 dataclass",
              body: [
                "<code>__str__</code> 控制面向用户的文本表示，<code>__len__</code> 支持 len()。",
                "dataclass 自动生成初始化等样板代码。"
              ],
              code: String.raw`from dataclasses import dataclass

@dataclass
class Book:
    title: str
    pages: int

book = Book("Python", 320)
print(book)`
            },
            {
              id: "class-attribute",
              type: "warning",
              title: "区分类属性与实例属性",
              body: [
                "可变类属性会被所有实例共享。需要在 __init__ 中为每个实例创建独立列表或字典。"
              ],
              quiz: {
                question: "组合关系通常表示什么？",
                options: ["一个对象包含另一个对象", "两个类必须同名", "只能继承不能实例化"],
                answer: 0,
                explanation: "组合通过成员对象复用行为，通常比继承更灵活。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "advanced-tools",
      number: "11",
      title: "进阶工具箱",
      english: "Iterators, Generators & Decorators",
      accent: "forest",
      summary: "理解可迭代对象、迭代器、生成器、推导式、装饰器和上下文管理器，写出更简洁可靠的 Python。",
      examFocus: ["迭代协议", "yield", "装饰器", "with"],
      themes: [
        {
          id: "iterators-generators",
          title: "迭代器与生成器",
          summary: "生成器按需产生数据，不必一次把所有结果放入内存。",
          cards: [
            {
              id: "iterable-protocol",
              type: "definition",
              title: "可迭代对象与迭代器",
              body: [
                "能被 for 遍历的对象是可迭代对象；迭代器通过 __next__() 一次给出一个元素。",
                "iter() 获取迭代器，next() 获取下一个值，耗尽后抛 StopIteration。"
              ],
              code: String.raw`items = iter([10, 20])
print(next(items))
print(next(items))`
            },
            {
              id: "generator-yield",
              type: "syntax",
              title: "yield 生成器",
              body: [
                "函数中出现 yield 后成为生成器函数。每次 next() 执行到 yield 暂停，下一次继续。",
                "生成器适合处理大文件、流式数据和无限序列。"
              ],
              code: String.raw`def take_even(numbers):
    for number in numbers:
        if number % 2 == 0:
            yield number

print(list(take_even(range(10))))`
            }
          ]
        },
        {
          id: "decorators-context",
          title: "装饰器与上下文管理器",
          summary: "装饰器包装函数行为，with 管理资源生命周期。",
          cards: [
            {
              id: "decorator",
              type: "syntax",
              title: "函数装饰器",
              body: [
                "装饰器接收函数并返回新函数，常用于日志、计时、权限和缓存。",
                "使用 functools.wraps 保留原函数元数据。"
              ],
              code: String.raw`from functools import wraps

def logged(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("调用", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@logged
def add(a, b):
    return a + b

print(add(2, 3))`
            },
            {
              id: "context-manager",
              type: "syntax",
              title: "with 与上下文管理器",
              body: [
                "上下文管理器保证进入时准备资源、离开时清理资源，即使中途发生异常。",
                "文件、锁、数据库连接都属于典型资源。"
              ],
              code: String.raw`from contextlib import contextmanager

@contextmanager
def section(title):
    print("开始", title)
    try:
        yield
    finally:
        print("结束", title)

with section("学习"):
    print("正在写代码")`
            },
            {
              id: "generator-note",
              type: "warning",
              title: "生成器只能消耗一次",
              body: [
                "生成器遍历结束后不会自动重置。需要重复使用时，应重新创建生成器或保存为列表。"
              ],
              quiz: {
                question: "函数中出现哪个关键字后会成为生成器函数？",
                options: ["return", "yield", "raise"],
                answer: 1,
                explanation: "yield 会保存函数局部执行状态，使函数成为生成器。"
              }
            }
          ]
        }
      ]
    },
    {
      id: "projects",
      number: "12",
      title: "综合项目实战",
      english: "Build Real Programs",
      accent: "indigo",
      summary: "把语法组合成真正可用的程序：命令行学习记录、词频分析、CSV 报告、网络请求、爬虫与 Flask 小服务。",
      examFocus: ["命令行程序", "数据分析", "requests", "爬虫", "Flask"],
      themes: [
        {
          id: "local-projects",
          title: "本地文件与命令行项目",
          summary: "先做不依赖网络的工具，完整练习输入、数据、文件与输出。",
          cards: [
            {
              id: "study-tracker",
              type: "project",
              title: "项目：命令行学习记录",
              body: [
                "每次输入学习分钟数，程序累计时间并保存到 JSON。再次启动时读取原记录。",
                "重点：循环、异常处理、文件读写与数据结构组合。"
              ],
              code: String.raw`import json
from pathlib import Path

path = Path("study.json")
data = json.loads(path.read_text("utf-8")) if path.exists() else {"minutes": 0}

while True:
    text = input("学习分钟数，q 结束：")
    if text == "q":
        break
    try:
        data["minutes"] += int(text)
    except ValueError:
        print("请输入整数")

path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
print("累计", data["minutes"], "分钟")`
            },
            {
              id: "word-frequency",
              type: "project",
              title: "项目：英文词频分析",
              body: [
                "读取文本，统一大小写，提取单词，用字典计数，再按出现次数排序。",
                "这是字典、正则表达式和排序的综合练习。"
              ],
              code: String.raw`import re
from collections import Counter

text = "Python is useful. Python is readable."
words = re.findall(r"[a-z]+", text.lower())
counts = Counter(words)
print(counts.most_common(3))`
            },
            {
              id: "csv-report",
              type: "project",
              title: "项目：CSV 成绩统计",
              body: [
                "读取 CSV，转换数值，计算平均分和最高分，再生成简洁报告。",
                "不要把所有逻辑塞进一个表达式，按读取、转换、统计、输出拆成函数。"
              ],
              code: String.raw`import csv
from io import StringIO
from statistics import mean

text = "name,score\nLin,88\nAnn,95\nBob,72\n"
rows = list(csv.DictReader(StringIO(text)))
scores = [int(row["score"]) for row in rows]

print("平均", mean(scores))
print("最高", max(scores))
print("人数", len(scores))`
            }
          ]
        },
        {
          id: "network-projects",
          title: "网络、爬虫与 Web",
          summary: "理解 HTTP 请求和页面结构，但不绕过网站权限、不抓取隐私数据。",
          cards: [
            {
              id: "requests-json",
              type: "project",
              title: "项目：调用 JSON API",
              body: [
                "使用 requests 发送 HTTP 请求，检查状态码，再解析 JSON。",
                "必须设置超时并处理网络异常。"
              ],
              code: String.raw`import requests

try:
    response = requests.get(
        "https://api.github.com/repos/python/cpython",
        timeout=10,
    )
    response.raise_for_status()
    data = response.json()
    print(data["full_name"], data["stargazers_count"])
except requests.RequestException as error:
    print("请求失败：", error)`
            },
            {
              id: "crawler-basics",
              type: "project",
              title: "项目：遵守规则的网页抓取",
              body: [
                "抓取前检查 robots.txt、服务条款、频率限制和页面结构。",
                "示例使用 BeautifulSoup 读取标题；真实项目应加入延迟、缓存和错误处理。"
              ],
              code: String.raw`import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url, timeout=10)
response.raise_for_status()
soup = BeautifulSoup(response.text, "html.parser")
print(soup.title.get_text(strip=True))`
            },
            {
              id: "flask-hello",
              type: "project",
              title: "项目：最小 Flask 网站",
              body: [
                "Flask 用路由把 URL 映射到 Python 函数。先完成最小服务，再逐步加入模板、表单和数据库。",
                "开发环境不要使用 debug=True 暴露到公网。"
              ],
              code: String.raw`from flask import Flask

app = Flask(__name__)

@app.get("/")
def home():
    return "<h1>Hello from Flask</h1>"

if __name__ == "__main__":
    app.run(debug=True)`
            },
            {
              id: "security-warning",
              type: "warning",
              title: "不要运行来源不明的脚本",
              body: [
                "Python 可以读写文件、启动程序并访问网络。不要直接运行陌生脚本，也不要硬编码密码、令牌或个人信息。"
              ],
              quiz: {
                question: "调用网络 API 时，哪个习惯最重要？",
                options: ["忽略状态码", "设置超时并处理异常", "无限重试"],
                answer: 1,
                explanation: "超时和异常处理能避免程序卡死，并让失败原因可见。"
              }
            }
          ]
        }
      ]
    }
  ]
};
