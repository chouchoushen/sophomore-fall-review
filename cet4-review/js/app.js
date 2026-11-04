(function () {
  "use strict";

  const DATA = window.CET4_DATA;
  const EXAMS = window.CET4_EXAMS || [];
  if (!DATA) throw new Error("CET-4 content data was not loaded.");

  const WORD_KEY = "cet4-review.mastered.v1";
  const wordMap = new Map(DATA.vocabulary.map((item) => [item.word, item]));
  const mastered = new Set(readJson(WORD_KEY, []));
  let articleOffset = 0;
  let activeExamYear = EXAMS[0]?.year || null;
  let wordQuery = "";
  let wordPos = "all";
  let currentArticle = null;
  let articleReader = null;
  let examReaders = [];
  let activeReader = null;

  const now = new Date();
  const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  document.getElementById("headerDate").textContent = dateKey;

  renderDailyArticle();
  renderWordList();
  renderYearTabs();
  renderExam();
  bindEvents();

  function renderDailyArticle() {
    const dayIndex = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
    const articleIndex = (dayIndex + articleOffset) % DATA.articles.length;
    const article = DATA.articles[articleIndex];
    currentArticle = article;
    articleReader?.destroy();

    document.getElementById("articleDate").textContent = articleOffset
      ? `复习文章 · ${dateKey}`
      : `今日 · ${dateKey}`;
    document.getElementById("articleTopic").textContent = article.topic;
    document.getElementById("articleWordCount").textContent = `${countWords(article.body)} words`;
    document.getElementById("articleTitle").textContent = article.title;
    document.getElementById("articleSummary").textContent = article.summaryZh;
    document.getElementById("articleWords").innerHTML = article.words
      .map((word) => {
        const item = wordMap.get(word);
        return item
          ? `<button class="target-chip" type="button" data-word="${escapeAttr(word)}">${escapeAttr(word)} · ${escapeAttr(item.meaning.split("；")[0])}</button>`
          : "";
      })
      .join("");

    articleReader = createSpeechReader({
      body: document.getElementById("articleBody"),
      toolbar: document.getElementById("articleReaderToolbar"),
      text: article.body,
      targetWords: article.words,
      label: "今日文章"
    });

    document.querySelectorAll("#articleBody mark, #articleWords [data-word]").forEach((button) => {
      button.addEventListener("click", () => openWord(button.dataset.word));
    });
  }

  function createSpeechReader({ body, toolbar, text, targetWords = [], label }) {
    const rendered = renderReadableText(text, targetWords);
    body.innerHTML = rendered.html;
    const tokens = rendered.tokens.map((token) => ({
      ...token,
      element: body.querySelector(`[data-reader-index="${token.index}"]`)
    }));
    const lastIndex = Math.max(0, tokens.length - 1);

    toolbar.innerHTML = `
      <div class="reader-toolbar" role="group" aria-label="${escapeAttr(label)}朗读进度">
        <button class="reader-play" type="button">▶ 播放朗读</button>
        <button class="reader-stop" type="button" disabled>停止</button>
        <input class="reader-progress" type="range" min="0" max="${lastIndex}" value="0" step="1"
          aria-label="调整${escapeAttr(label)}阅读进度">
        <output class="reader-position" aria-label="当前朗读到第几个单词">1 / ${tokens.length}</output>
      </div>
    `;

    const playButton = toolbar.querySelector(".reader-play");
    const stopButton = toolbar.querySelector(".reader-stop");
    const range = toolbar.querySelector(".reader-progress");
    const position = toolbar.querySelector(".reader-position");
    let currentIndex = 0;
    let mode = "idle";
    let session = 0;
    let utterance = null;
    let hasReadPosition = false;

    function findWordAt(charIndex) {
      let low = 0;
      let high = tokens.length - 1;
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const token = tokens[middle];
        if (charIndex < token.start) high = middle - 1;
        else if (charIndex >= token.end) low = middle + 1;
        else return middle;
      }
      return Math.min(low, lastIndex);
    }

    function updateVisual(index, shouldScroll = false, showReadingPosition = true) {
      currentIndex = Math.max(0, Math.min(Number(index) || 0, lastIndex));
      if (showReadingPosition) hasReadPosition = true;
      tokens.forEach((token, tokenIndex) => {
        token.element?.classList.toggle(
          "is-reading",
          hasReadPosition && tokenIndex === currentIndex
        );
      });
      range.value = String(currentIndex);
      range.style.setProperty(
        "--reader-progress",
        `${tokens.length > 1 ? (currentIndex / lastIndex) * 100 : 100}%`
      );
      position.textContent = tokens.length
        ? `${currentIndex + 1} / ${tokens.length}`
        : "0 / 0";

      playButton.textContent =
        mode === "speaking"
          ? "⏸ 暂停"
          : mode === "paused"
            ? "▶ 继续"
            : mode === "finished"
              ? "↻ 重新朗读"
              : "▶ 播放朗读";
      stopButton.disabled = mode === "idle" || mode === "finished";

      if (shouldScroll) {
        tokens[currentIndex]?.element?.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
      }
    }

    function cancelSpeech() {
      session += 1;
      utterance = null;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }

    function startFrom(index = currentIndex) {
      if (!tokens.length || !("speechSynthesis" in window)) {
        window.alert("当前浏览器不支持语音朗读。");
        return;
      }

      if (activeReader && activeReader !== reader) activeReader.stop();
      cancelSpeech();
      const sourceStart = tokens[Math.max(0, Math.min(index, lastIndex))].start;
      updateVisual(index, false);
      const voiceSession = session;
      utterance = new SpeechSynthesisUtterance(text.slice(sourceStart));
      utterance.lang = "en-US";
      utterance.rate = 0.88;
      utterance.pitch = 1;

      utterance.onstart = () => {
        if (voiceSession !== session) return;
        activeReader = reader;
        mode = "speaking";
        updateVisual(currentIndex, true);
      };
      utterance.onboundary = (event) => {
        if (voiceSession !== session || typeof event.charIndex !== "number") return;
        updateVisual(findWordAt(sourceStart + event.charIndex), true);
      };
      utterance.onend = () => {
        if (voiceSession !== session) return;
        mode = "finished";
        activeReader = null;
        updateVisual(lastIndex, false);
      };
      utterance.onerror = (event) => {
        if (voiceSession !== session || ["canceled", "interrupted"].includes(event.error)) {
          return;
        }
        mode = "idle";
        activeReader = null;
        updateVisual(currentIndex, false);
      };

      mode = "speaking";
      activeReader = reader;
      updateVisual(currentIndex, false);
      window.speechSynthesis.speak(utterance);
    }

    const reader = {
      start() {
        if (mode === "paused" && "speechSynthesis" in window) {
          window.speechSynthesis.resume();
          mode = "speaking";
          updateVisual(currentIndex, false);
          return;
        }
        if (mode === "finished") currentIndex = 0;
        startFrom(currentIndex);
      },
      pause() {
        if (mode !== "speaking" || !("speechSynthesis" in window)) return;
        window.speechSynthesis.pause();
        mode = "paused";
        updateVisual(currentIndex, false);
      },
      stop() {
        cancelSpeech();
        mode = "idle";
        if (activeReader === reader) activeReader = null;
        updateVisual(currentIndex, false);
      },
      searchFrom(index) {
        updateVisual(index, true);
      },
      seek(index) {
        const wasActive = mode === "speaking" || mode === "paused";
        updateVisual(index, true);
        if (wasActive) startFrom(currentIndex);
      },
      destroy() {
        if (activeReader === reader) activeReader = null;
        cancelSpeech();
        mode = "idle";
      },
      get currentIndex() {
        return currentIndex;
      }
    };

    playButton.addEventListener("click", () => {
      if (mode === "speaking") reader.pause();
      else reader.start();
    });
    stopButton.addEventListener("click", () => reader.stop());
    range.addEventListener("input", () => reader.searchFrom(Number(range.value)));
    range.addEventListener("change", () => reader.seek(Number(range.value)));
    updateVisual(0, false, false);
    return reader;
  }

  function renderReadableText(text, targetWords) {
    const formToWord = createTargetWordMap(targetWords);
    const tokens = [];
    const paragraphs = [];
    let paragraphStart = 0;

    for (const separator of text.matchAll(/\n+/g)) {
      paragraphs.push({
        text: text.slice(paragraphStart, separator.index),
        start: paragraphStart
      });
      paragraphStart = separator.index + separator[0].length;
    }
    paragraphs.push({ text: text.slice(paragraphStart), start: paragraphStart });

    const html = paragraphs
      .filter((paragraph) => paragraph.text.length)
      .map((paragraph) => {
        const wordPattern = /\b[A-Za-z]+(?:['’–-][A-Za-z]+)*\b/g;
        let cursor = 0;
        let paragraphHtml = "";
        for (const match of paragraph.text.matchAll(wordPattern)) {
          paragraphHtml += escapeHtml(paragraph.text.slice(cursor, match.index));
          const wordKey = formToWord.get(match[0].toLowerCase());
          const marked = wordKey
            ? `<mark data-word="${escapeAttr(wordKey)}">${escapeHtml(match[0])}</mark>`
            : escapeHtml(match[0]);
          const index = tokens.length;
          tokens.push({
            index,
            start: paragraph.start + match.index,
            end: paragraph.start + match.index + match[0].length
          });
          paragraphHtml += `<span class="read-token${wordKey ? " read-token--target" : ""}" data-reader-index="${index}">${marked}</span>`;
          cursor = match.index + match[0].length;
        }
        paragraphHtml += escapeHtml(paragraph.text.slice(cursor));
        return `<p>${paragraphHtml}</p>`;
      })
      .join("");

    return { html, tokens };
  }

  function createTargetWordMap(targetWords) {
    const formToWord = new Map();
    targetWords.forEach((key) => {
      const word = wordMap.get(key);
      if (!word) return;
      formToWord.set(word.word.toLowerCase(), key);
      Object.values(word.forms || {}).forEach((form) => {
        if (form) formToWord.set(String(form).toLowerCase(), key);
      });
      if ((word.part || []).includes("v.")) {
        inflectedVerbForms(word.word).forEach((form) =>
          formToWord.set(form.toLowerCase(), key)
        );
      }
    });
    return formToWord;
  }

  function renderWordList() {
    const query = wordQuery.trim().toLowerCase();
    const visible = DATA.vocabulary.filter((item) => {
      const partMatch = wordPos === "all" || item.part.includes(wordPos);
      const text = `${item.word} ${item.meaning} ${item.synonyms.join(" ")}`.toLowerCase();
      return partMatch && (!query || text.includes(query));
    });

    document.getElementById("wordList").innerHTML = visible
      .map(
        (item) => `
          <article class="word-card">
            <div class="word-card__main">
              <div>
                <div class="word-card__headline">
                  <h3>${escapeHtml(item.word)}</h3>
                  <span class="word-card__ipa">${escapeHtml(item.ipa)}</span>
                </div>
                <p class="word-card__meaning">${item.part.map(escapeHtml).join(" ")} ${escapeHtml(item.meaning)}</p>
                <span class="word-card__level">${escapeHtml(item.level)}</span>
              </div>
              <button class="master-word${mastered.has(item.word) ? " is-mastered" : ""}" type="button" data-master-word="${escapeAttr(item.word)}">
                ${mastered.has(item.word) ? "已掌握" : "标记掌握"}
              </button>
            </div>
            <div class="word-card__actions">
              <button type="button" data-open-word="${escapeAttr(item.word)}">全部释义与词形</button>
              <button type="button" data-speak="${escapeAttr(item.example)}">朗读例句</button>
            </div>
          </article>
        `
      )
      .join("");

    document.getElementById("wordEmpty").hidden = visible.length > 0;
  }

  function openWord(wordKey) {
    const item = wordMap.get(wordKey);
    if (!item) return;
    const forms = Object.entries(item.forms || {})
      .filter(([, value]) => value)
      .map(([pos, value]) => `<dt>${partLabel(pos)}</dt><dd>${escapeHtml(value)}</dd>`)
      .join("");

    document.getElementById("wordDrawerContent").innerHTML = `
      <article class="word-detail">
        <p class="eyebrow">CET-4 HIGH-FREQUENCY</p>
        <h2>${escapeHtml(item.word)}</h2>
        <span class="ipa">${escapeHtml(item.ipa)} · ${item.part.map(escapeHtml).join(" ")}</span>
        <div class="word-detail__meaning">${escapeHtml(item.meaning)}</div>
        <dl class="detail-grid">
          <dt>近义词</dt><dd>${item.synonyms.map(escapeHtml).join(" · ")}</dd>
          <dt>形近词</dt><dd>${item.similar.map(escapeHtml).join(" · ")}</dd>
          ${forms}
        </dl>
        <div class="word-example">
          ${escapeHtml(item.example)}
          <span>${escapeHtml(item.exampleZh)}</span>
        </div>
        <div class="reading-card__footer">
          <button class="reading-button" type="button" data-drawer-speak="${escapeAttr(item.example)}">▶ 朗读例句</button>
          <button class="reading-button" type="button" data-master-word="${escapeAttr(item.word)}">
            ${mastered.has(item.word) ? "已掌握" : "标记掌握"}
          </button>
        </div>
      </article>
    `;
    const drawer = document.getElementById("wordDrawer");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    drawer.querySelectorAll("[data-drawer-speak]").forEach((button) =>
      button.addEventListener("click", () => speak(button.dataset.drawerSpeak))
    );
    drawer.querySelectorAll("[data-master-word]").forEach((button) =>
      button.addEventListener("click", () => toggleMastery(button.dataset.masterWord))
    );
  }

  function closeWord() {
    const drawer = document.getElementById("wordDrawer");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }

  function toggleMastery(word) {
    if (mastered.has(word)) mastered.delete(word);
    else mastered.add(word);
    localStorage.setItem(WORD_KEY, JSON.stringify([...mastered]));
    renderWordList();
    if (document.getElementById("wordDrawer").classList.contains("is-open")) {
      openWord(word);
    }
  }

  function renderYearTabs() {
    const tabs = document.getElementById("yearTabs");
    tabs.innerHTML = EXAMS.map(
      (exam) => `
        <button type="button" role="tab" data-year="${exam.year}" aria-selected="${exam.year === activeExamYear}">
          ${escapeHtml(exam.label)}
        </button>
      `
    ).join("");
    tabs.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("is-active", Number(button.dataset.year) === activeExamYear);
      button.addEventListener("click", () => {
        activeExamYear = Number(button.dataset.year);
        tabs.querySelectorAll("button").forEach((item) => {
          const active = Number(item.dataset.year) === activeExamYear;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        renderExam();
      });
    });
  }

  function renderExam() {
    examReaders.forEach((reader) => reader.destroy());
    examReaders = [];
    const exam = EXAMS.find((item) => item.year === activeExamYear);
    const root = document.getElementById("examContent");
    if (!exam) {
      root.innerHTML = "";
      return;
    }

    root.innerHTML = `
      <div class="exam-pack">
        ${renderExamPanel(exam.reading, "READING", `${exam.year}-reading`)}
        ${renderExamPanel(exam.listening, "LISTENING", `${exam.year}-listening`, true)}
      </div>
    `;
    root.querySelectorAll("[data-submit-exam]").forEach((button) =>
      button.addEventListener("click", () => submitExam(button.dataset.submitExam))
    );

    root.querySelectorAll(".exam-panel").forEach((panel) => {
      const listening = panel.dataset.examKind === "listening";
      const content = listening ? exam.listening : exam.reading;
      examReaders.push(
        createSpeechReader({
          body: panel.querySelector("[data-reader-body]"),
          toolbar: panel.querySelector("[data-reader-toolbar]"),
          text: listening ? content.script : content.passage,
          label: listening ? `${exam.year} 模拟听力原文` : `${exam.year} 阅读文章`
        })
      );
    });
  }

  function renderExamPanel(content, type, panelId, listening) {
    return `
      <section class="exam-panel" id="${escapeAttr(panelId)}" data-exam-kind="${listening ? "listening" : "reading"}">
        <div class="exam-panel__head">
          <h3>${escapeHtml(content.title)}</h3>
          <span class="exam-type">${type} · 原创改编</span>
        </div>
        <div data-reader-toolbar></div>
        ${
          listening
            ? `
              <details class="transcript" open>
                <summary>听力原文 · 播放时逐词高亮</summary>
                <div class="exam-passage transcript-copy" data-reader-body></div>
              </details>
            `
            : `<div class="exam-passage" data-reader-body></div>`
        }
        <div class="exam-questions">
          ${content.questions.map((question, index) => renderQuestion(question, panelId, index)).join("")}
        </div>
        <button class="submit-exam" type="button" data-submit-exam="${escapeAttr(panelId)}">提交本篇答案</button>
      </section>
    `;
  }

  function renderQuestion(question, panelId, index) {
    return `
      <div class="exam-question" data-question="${index}">
        <p>${index + 1}. ${escapeHtml(question.prompt)}</p>
        ${question.options
          .map(
            (option, optionIndex) => `
              <label class="exam-option">
                <input type="radio" name="${escapeAttr(panelId)}-${index}" value="${optionIndex}">
                <span>${String.fromCharCode(65 + optionIndex)}. ${escapeHtml(option)}</span>
              </label>
            `
          )
          .join("")}
        <div class="question-feedback" hidden></div>
      </div>
    `;
  }

  function submitExam(panelId) {
    const exam = EXAMS.find((item) => item.year === activeExamYear);
    const content = panelId.endsWith("reading") ? exam.reading : exam.listening;
    const panel = document.getElementById(panelId);
    let correct = 0;

    panel.querySelectorAll(".exam-question").forEach((questionNode, index) => {
      const selected = questionNode.querySelector("input:checked");
      const question = content.questions[index];
      const isCorrect = selected && Number(selected.value) === question.answer;
      if (isCorrect) correct += 1;
      const feedback = questionNode.querySelector(".question-feedback");
      feedback.hidden = false;
      feedback.className = `question-feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
      feedback.textContent = `${isCorrect ? "正确" : "需要回看"}。答案：${String.fromCharCode(65 + question.answer)}。${question.explanation}`;
    });

    const button = panel.querySelector("[data-submit-exam]");
    button.textContent = `得分 ${correct} / ${content.questions.length} · 再交一次`;
  }

  function bindEvents() {
    document.getElementById("heroSpeak").addEventListener("click", () => {
      document.getElementById("dailyArticle").scrollIntoView({ behavior: "smooth" });
      articleReader?.start();
    });
    document.getElementById("nextArticle").addEventListener("click", () => {
      articleOffset = (articleOffset + 1) % DATA.articles.length;
      renderDailyArticle();
    });
    document.getElementById("wordSearch").addEventListener("input", (event) => {
      wordQuery = event.target.value;
      document.getElementById("clearWordSearch").hidden = !wordQuery;
      renderWordList();
    });
    document.getElementById("clearWordSearch").addEventListener("click", () => {
      wordQuery = "";
      document.getElementById("wordSearch").value = "";
      document.getElementById("clearWordSearch").hidden = true;
      renderWordList();
    });
    document.getElementById("wordFilters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-pos]");
      if (!button) return;
      wordPos = button.dataset.pos;
      document.querySelectorAll("#wordFilters button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      renderWordList();
    });
    document.getElementById("wordList").addEventListener("click", (event) => {
      const open = event.target.closest("[data-open-word]");
      const master = event.target.closest("[data-master-word]");
      const speakButton = event.target.closest("[data-speak]");
      if (open) openWord(open.dataset.openWord);
      if (master) toggleMastery(master.dataset.masterWord);
      if (speakButton) speak(speakButton.dataset.speak);
    });
    document.getElementById("wordDrawerClose").addEventListener("click", closeWord);
    document.getElementById("wordDrawer").addEventListener("click", (event) => {
      if (event.target.id === "wordDrawer") closeWord();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeWord();
    });
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      window.alert("当前浏览器不支持语音朗读。");
      return;
    }
    activeReader?.stop();
    activeReader = null;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = .88;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if (activeReader) {
      activeReader.stop();
      activeReader = null;
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function partLabel(pos) {
    return { noun: "名词", verb: "动词", adjective: "形容词", adverb: "副词" }[pos] || pos;
  }

  function inflectedVerbForms(verb) {
    if (verb.endsWith("y") && verb.length > 2) {
      const stem = verb.slice(0, -1);
      return [`${stem}ies`, `${stem}ied`, `${verb}ing`];
    }
    if (verb.endsWith("e")) {
      const stem = verb.slice(0, -1);
      return [`${verb}s`, `${stem}ed`, `${stem}ing`];
    }
    return [`${verb}s`, `${verb}ed`, `${verb}ing`];
  }

  function countWords(text) {
    return (text.match(/\b[A-Za-z]+(?:['-][A-Za-z]+)?\b/g) || []).length;
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("'", "&#39;");
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
})();
