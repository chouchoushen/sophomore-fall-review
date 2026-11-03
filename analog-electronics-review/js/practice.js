(function () {
  "use strict";

  const BASE_QUIZ = window.ANALOG_QUIZ;
  if (!BASE_QUIZ) {
    throw new Error("Analog electronics quiz data was not loaded.");
  }
  const QUIZ = window.buildWeeklyQuiz
    ? window.buildWeeklyQuiz(BASE_QUIZ)
    : BASE_QUIZ;
  const WEEK_KEY = QUIZ.weekKey || "";

  const STORAGE_KEY = "analog-electronics-review.quiz.v2";
  const root = document.getElementById("quizPanel");
  const chapterFilter = document.getElementById("quizChapterFilter");
  const restartButton = document.getElementById("quizRestart");
  const prevButton = document.getElementById("quizPrev");
  const nextButton = document.getElementById("quizNext");
  const progressText = document.getElementById("quizProgressText");
  const scoreText = document.getElementById("quizScoreText");
  const progressBar = document.getElementById("quizProgressBar");
  const resultPanel = document.getElementById("quizResult");
  const questionRoot = document.getElementById("quizQuestion");
  const quizNav = document.querySelector(".quiz-card__nav");

  let state = restoreState();
  if (state.weekKey !== WEEK_KEY) {
    state = {
      chapter: state.chapter || "all",
      answers: {},
      currentIndex: 0,
      completed: false,
      weekKey: WEEK_KEY
    };
  }
  let filteredQuestions = getFilteredQuestions();
  let currentIndex = Math.min(state.currentIndex || 0, filteredQuestions.length - 1);

  renderChapterFilter();
  renderWeekBadge();
  render();

  chapterFilter.addEventListener("change", () => {
    state.chapter = chapterFilter.value;
    state.currentIndex = 0;
    state.completed = false;
    currentIndex = 0;
    filteredQuestions = getFilteredQuestions();
    persist();
    render();
  });

  restartButton.addEventListener("click", () => {
    const chapter = state.chapter;
    state = { chapter, answers: {}, currentIndex: 0, completed: false, weekKey: WEEK_KEY };
    filteredQuestions = getFilteredQuestions();
    currentIndex = 0;
    persist();
    render();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex -= 1;
    state.completed = false;
    persist();
    render();
  });

  nextButton.addEventListener("click", () => {
    if (!hasAnswered(filteredQuestions[currentIndex])) return;
    if (currentIndex < filteredQuestions.length - 1) {
      currentIndex += 1;
      persist();
      render();
      return;
    }
    state.completed = true;
    persist();
    render();
  });

  function renderChapterFilter() {
    chapterFilter.innerHTML =
      '<option value="all">全部三章 · 18 题</option>' +
      Object.entries(QUIZ.chapterLabels)
        .map(([id, label]) => {
          const count = QUIZ.questions.filter((question) => question.chapter === id).length;
          return `<option value="${escapeAttribute(id)}">${label} · ${count} 题</option>`;
        })
        .join("");
    chapterFilter.value = state.chapter || "all";
  }

  function renderWeekBadge() {
    if (document.getElementById("quizWeekLabel")) return;
    const top = document.querySelector(".quiz-card__top");
    if (!top) return;
    const badge = document.createElement("span");
    badge.id = "quizWeekLabel";
    badge.className = "quiz-week-label";
    badge.textContent = QUIZ.weekLabel || "本周题组";
    top.insertBefore(badge, restartButton);
  }

  function getFilteredQuestions() {
    if (!state.chapter || state.chapter === "all") return QUIZ.questions;
    return QUIZ.questions.filter((question) => question.chapter === state.chapter);
  }

  function render() {
    const answered = filteredQuestions.filter(hasAnswered);
    const correct = answered.filter((question) => state.answers[question.id] === question.answer);
    const percent = filteredQuestions.length
      ? Math.round((answered.length / filteredQuestions.length) * 100)
      : 0;

    progressBar.style.width = `${percent}%`;
    progressText.textContent = `已答 ${answered.length} / ${filteredQuestions.length}`;
    scoreText.textContent = `答对 ${correct.length} 题`;

    if (state.completed) {
      renderResult(correct.length);
      return;
    }

    quizNav.hidden = false;
    resultPanel.hidden = true;
    questionRoot.hidden = false;
    renderQuestion(filteredQuestions[currentIndex]);
  }

  function renderQuestion(question) {
    if (!question) return;
    const selected = state.answers[question.id];
    const answered = Number.isInteger(selected);
    const chapterLabel = QUIZ.chapterLabels[question.chapter];
    const questionNumber =
      filteredQuestions.findIndex((item) => item.id === question.id) + 1;

    questionRoot.innerHTML = `
      <div class="quiz-question__meta">
        <span>${chapterLabel}</span>
        <span>第 ${questionNumber} / ${filteredQuestions.length} 题</span>
        <span>${question.topic}</span>
      </div>
      <h3>${protectInlineMath(question.prompt)}</h3>
      <div class="quiz-options" role="group" aria-label="选择答案">
        ${question.options
          .map((option, index) => {
            const isSelected = selected === index;
            const isCorrect = answered && index === question.answer;
            const isWrong = answered && isSelected && index !== question.answer;
            return `
              <button
                class="quiz-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}"
                type="button"
                data-answer="${index}"
                aria-pressed="${String(isSelected)}"
                ${answered ? "disabled" : ""}
              >
                <span class="quiz-option__key">${String.fromCharCode(65 + index)}</span>
                <span>${protectInlineMath(option)}</span>
              </button>
            `;
          })
          .join("")}
      </div>
      <div class="quiz-feedback" role="status" ${answered ? "" : "hidden"}>
        <strong>${selected === question.answer ? "判断正确" : "这里需要回看"}</strong>
        <p>${protectInlineMath(question.explanation)}</p>
      </div>
    `;

    questionRoot.querySelectorAll(".quiz-option").forEach((button) => {
      button.addEventListener("click", () => {
        if (hasAnswered(question)) return;
        state.answers[question.id] = Number(button.dataset.answer);
        state.currentIndex = currentIndex;
        persist();
        renderMath(questionRoot);
        render();
      });
    });

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = !answered;
    nextButton.textContent =
      currentIndex === filteredQuestions.length - 1 ? "查看结果" : "下一题";

    renderMath(questionRoot);
  }

  function renderResult(correctCount) {
    quizNav.hidden = true;
    questionRoot.hidden = true;
    resultPanel.hidden = false;

    const total = filteredQuestions.length;
    const ratio = total ? correctCount / total : 0;
    const verdict =
      ratio >= 0.9
        ? "主线已经打通"
        : ratio >= 0.75
          ? "基本掌握，仍需补一处缺口"
          : "建议按解析回炉关键模型";
    const chapterStats = Object.entries(QUIZ.chapterLabels)
      .map(([chapterId, label]) => {
        const questions = filteredQuestions.filter((question) => question.chapter === chapterId);
        if (!questions.length) return "";
        const correct = questions.filter(
          (question) => state.answers[question.id] === question.answer
        ).length;
        const pct = Math.round((correct / questions.length) * 100);
        return `
          <a class="quiz-result__chapter" href="#${chapterId}">
            <span>${label}</span>
            <strong>${correct} / ${questions.length}</strong>
            <i><span style="width:${pct}%"></span></i>
          </a>
        `;
      })
      .join("");

    resultPanel.innerHTML = `
      <div class="quiz-result__head">
        <div>
          <span class="eyebrow">SELF CHECK</span>
          <h3>${verdict}</h3>
          <p>本次答对 <strong>${correctCount} / ${total}</strong> 题。点击章节可回到对应知识卡复核。</p>
        </div>
        <div class="quiz-score" style="--score:${Math.round(ratio * 360)}deg">
          <strong>${total ? Math.round(ratio * 100) : 0}%</strong>
          <span>正确率</span>
        </div>
      </div>
      <div class="quiz-result__chapters">${chapterStats}</div>
      <div class="quiz-result__actions">
        <button id="quizReview" class="primary-button" type="button">${correctCount === total ? "逐题回看" : "回看错题解析"}</button>
        <button id="quizRestartInline" class="secondary-button" type="button">重新自测</button>
      </div>
    `;

    document.getElementById("quizReview").addEventListener("click", reviewWrongAnswers);
    document.getElementById("quizRestartInline").addEventListener("click", () => {
      restartButton.click();
    });

    bindChapterLinks(resultPanel);
  }

  function reviewWrongAnswers() {
    state.completed = false;
    const firstWrong = filteredQuestions.findIndex(
      (question) => state.answers[question.id] !== question.answer
    );
    currentIndex = firstWrong >= 0 ? firstWrong : 0;
    persist();
    render();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindChapterLinks(scope) {
    scope.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        const chapter = document.querySelector(link.getAttribute("href"));
        if (!chapter) return;
        window.setTimeout(() => {
          chapter.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      });
    });
  }

  function hasAnswered(question) {
    return Boolean(question) && Number.isInteger(state.answers[question.id]);
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The quiz still works when storage is unavailable.
    }
  }

  function restoreState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== "object") throw new Error("invalid state");
      return {
        chapter: saved.chapter || "all",
        answers: saved.answers || {},
        currentIndex: Number.isInteger(saved.currentIndex) ? saved.currentIndex : 0,
        completed: Boolean(saved.completed),
        weekKey: saved.weekKey || ""
      };
    } catch {
      return { chapter: "all", answers: {}, currentIndex: 0, completed: false, weekKey: "" };
    }
  }

  function renderMath(scope) {
    if (typeof window.renderMathInElement !== "function") {
      window.setTimeout(() => renderMath(scope), 50);
      return;
    }
    window.renderMathInElement(scope, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }

  function protectInlineMath(value) {
    return String(value).replace(/(\${1,2})([\s\S]*?)\1/g, (_, delimiter, formula) =>
      delimiter + escapeMathSource(formula) + delimiter
    );
  }

  function escapeMathSource(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function escapeAttribute(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }
})();
