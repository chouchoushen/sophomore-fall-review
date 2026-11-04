# 大二上复习资料

六个独立复习网站的总入口：

| 课程 | 目录 | 内容 |
| --- | --- | --- |
| 概率论 | `../probability-review/` | 事件、随机变量与多维分布 |
| 模拟电子技术 | `../analog-electronics-review/` | 器件、放大电路、频率响应与功率放大 |
| 数字电子技术 | `../digital-electronics-review/` | 逻辑代数与组合逻辑 |
| 普通物理学 | `../general-physics-review/` | 静电场、电介质与电容 |
| 数学物理方法 | `../math-physics-methods-review/` | 复变函数、留数与数学物理方程 |
| 英语四级 | `../cet4-review/` | 每日文章、高频词汇与四年题库 |

## 总入口功能

- 六门课程卡片式导航和关键词搜索。
- 按电类、数理、统计、语言筛选。
- 汇总各课程保存在浏览器中的“已掌握”进度。
- 显示最近进入的课程、总掌握进度和最需要补的课程。
- 四个自测站按 ISO 教学周自动轮换部分概念题和计算参数，每周一更新。
- 所有课程共用同一个静态服务器，保证相对链接和本地进度正常。

## 启动

双击 `start.cmd`，或运行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\view.ps1
```

默认地址：`http://127.0.0.1:8771/`

服务器根目录自动设为上一级 `outputs`，因此五个课程站点都能在同一个网址下访问。
