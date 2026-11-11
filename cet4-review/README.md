# 英语四级每日复习站

一个独立的 CET-4 静态学习网站，包含：

1. 每日轮换的约 200 词四级风格原创英文文章，按“现象—分析—建议”组织内容，并自然复现高频词汇。
2. 4,443 个四级词卡组成词汇总库；每天生成 100 个不重复学习项，通常为 94 个新词和 6 个过去词复习，同时按词性和情景（如心情、建筑与空间）分类。历史百词按真实日期累积，旧版记录会自动迁移。
3. 扩展词库优先使用四级词表中的真实双语例句，缺少完整例句时使用具体固定搭配语境；词汇支持音标、词性、语义主题和记忆方式筛选。
4. 十套历年真题主题改写的阅读和听力模拟每天独立轮换。阅读调整为约 280～336 词并包含 5 题；长对话和短文听力调整为约 150～260 词并包含 4 题，增加推理、态度和隐含信息判断。
5. 文章、模拟阅读和含题干的模拟听力使用接近参考四级听力的 Guy 成人声线与考试旁白速度，并保留逐词时间轴高亮。听力稿中的角色标签不作为语音朗读；音频仅在用户点击播放按钮后开始。单词和例句 MP3 仍分别使用 Aria 与 Ava，不受文章声线调整影响。
6. 十期每日文章的词目建立出处台账，每张词卡标注出现期号，并可按每日文章筛选合订本。
7. 每日百词展示形近词、固定搭配和名词/动词/形容词/副词等形式变化，并提供英文前缀连续联想和中文近义查词。
8. 单词详情支持点击抽屉外遮罩关闭，同时保留关闭按钮和 Escape 键。
9. 词卡默认使用构词记忆：4,260 个扩展词提供词根、前缀、后缀、合成词或词族拆解；其余词条使用固定搭配。页面附 49 条高频词根词缀速查。
10. 词卡掌握进度保存在本地。

## 记忆方法参考

- Bowers & Kirby, *Effects of morphological instruction on vocabulary acquisition*: https://doi.org/10.1007/s11145-009-9172-z
- Carpenter, Pan & Butler, *The science of effective learning with spacing and retrieval practice*: https://doi.org/10.1038/s44159-022-00089-1
- Mulder et al., *Context, word, and student predictors in second language vocabulary learning*: https://doi.org/10.1017/s0142716418000504

## 扩展词表来源

- 扩展词义数据来自 KyleBing 的 [english-vocabulary](https://github.com/KyleBing/english-vocabulary)，使用 BSD 3-Clause License。
- 本站只截取 CET4 词条中的单词、词性、中文释义和少量搭配，并重新生成页面所需的数据格式；许可原文见 `data/licenses/KyleBing-english-vocabulary-LICENSE.txt`。

## 版权说明

历年考试真题的整篇阅读与听力内容可能受版权保护。本站在近年四级常见主题基础上重新编写文章、题目、选项、解析和听力稿，不整篇复制原试卷。

## 查看

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\view.ps1
```

默认地址：`http://127.0.0.1:8772/`

整个目录可直接部署为静态网站。
