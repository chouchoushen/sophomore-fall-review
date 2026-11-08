(function () {
  "use strict";

  const vocabulary = [
    ...window.CET4_DATA.vocabulary,
    ...(window.CET4_EXTRA_VOCABULARY || [])
  ];
  const articles = window.CET4_DATA.articles;
  const partMeta = [
    { id: "n.", label: "名词", theme: "人物、事物与抽象概念" },
    { id: "v.", label: "动词", theme: "行为、判断与变化过程" },
    { id: "adj.", label: "形容词", theme: "性质、状态与程度" },
    { id: "adv.", label: "副词", theme: "方式、时间与趋势" }
  ];
  const wordMap = new Map(vocabulary.map((item) => [item.word, item]));
  const step = 37;

  function buildEdition(editionIndex) {
    const article = articles[editionIndex % articles.length];
    const part = partMeta[editionIndex % partMeta.length];
    const slots = [];

    article.words.forEach((word) => {
      if (wordMap.has(word)) slots.push(word);
    });

    vocabulary
      .filter((item) => item.part.includes(part.id))
      .slice(editionIndex % 3, (editionIndex % 3) + 10)
      .forEach((item) => slots.push(item.word));

    let offset = 0;
    const start = (editionIndex * 19 + 7) % vocabulary.length;
    while (slots.length < 100) {
      const item = vocabulary[(start + offset * step) % vocabulary.length];
      slots.push(item.word);
      offset += 1;
    }

    return {
      id: `daily-word-${String(editionIndex + 1).padStart(2, "0")}`,
      number: editionIndex + 1,
      title: `百词第 ${String(editionIndex + 1).padStart(2, "0")} 期`,
      focusPart: part.id,
      focusLabel: part.label,
      focusTheme: part.theme,
      articleId: article.id,
      words: slots.slice(0, 100)
    };
  }

  window.CET4_DAILY_WORD_SETS = Array.from({ length: 30 }, (_, index) =>
    buildEdition(index)
  );
})();
