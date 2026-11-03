(function () {
  "use strict";

  function getQuizWeekInfo(date) {
    const now = date instanceof Date ? date : new Date();
    const utc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const day = utc.getUTCDay() || 7;
    utc.setUTCDate(utc.getUTCDate() + 4 - day);
    const isoYear = utc.getUTCFullYear();
    const yearStart = new Date(Date.UTC(isoYear, 0, 1));
    const week = Math.ceil((((utc - yearStart) / 86400000) + 1) / 7);

    return {
      key: `${isoYear}-W${String(week).padStart(2, "0")}`,
      isoYear,
      week,
      ordinal: isoYear * 53 + week
    };
  }

  function buildWeeklyQuiz(source, date) {
    const week = getQuizWeekInfo(date);
    const variants = source.weeklyVariants || {};
    let changed = 0;

    const questions = source.questions.map((question) => {
      const candidates = variants[question.id];
      if (!candidates) return { ...question };

      const list =
        typeof candidates === "function"
          ? candidates({ week, weekKey: week.key, weekOrdinal: week.ordinal })
          : candidates;

      if (!Array.isArray(list) || !list.length) return { ...question };

      const index =
        ((week.ordinal + (question.weeklyOffset || 0)) % list.length + list.length) %
        list.length;
      const selected = list[index];
      if (!selected) return { ...question };

      changed += 1;
      return {
        ...question,
        ...selected,
        id: question.id,
        chapter: selected.chapter || question.chapter
      };
    });

    const themes = source.weeklyThemes || [];
    const theme = themes.length
      ? themes[((week.ordinal % themes.length) + themes.length) % themes.length]
      : "教学周轮换题组";

    return {
      ...source,
      questions,
      weekKey: week.key,
      weekTheme: theme,
      weekLabel: `${week.key} · ${theme} · ${changed} 道更新`,
      weekChangedCount: changed
    };
  }

  window.getQuizWeekInfo = getQuizWeekInfo;
  window.buildWeeklyQuiz = buildWeeklyQuiz;
})();
