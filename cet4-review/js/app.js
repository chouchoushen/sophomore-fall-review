(function () {
  "use strict";

  const DATA = window.CET4_DATA;
  const EXAMS = window.CET4_EXAMS || [];
  const AUDIO_TIMINGS = window.CET4_AUDIO_TIMINGS || {};
  const EXTRA_VOCABULARY = window.CET4_EXTRA_VOCABULARY || [];
  const MEMORY_DATA = window.CET4_MEMORY_DATA || {};
  const DAILY_WORD_SETS = window.CET4_DAILY_WORD_SETS || [];
  if (!DATA) throw new Error("CET-4 content data was not loaded.");

  DATA.vocabulary.push(...EXTRA_VOCABULARY);
  DATA.vocabulary.forEach((item) => {
    item.memory = MEMORY_DATA[item.word] || { type: "context" };
  });

  const WORD_KEY = "cet4-review.mastered.v1";
  const wordMap = new Map(DATA.vocabulary.map((item) => [item.word, item]));
  const wordDailyEditions = new Map();
  DAILY_WORD_SETS.forEach((edition) => {
    edition.words.forEach((word) => {
      if (!wordDailyEditions.has(word)) wordDailyEditions.set(word, []);
      wordDailyEditions.get(word).push(edition.number);
    });
  });
  const mastered = new Set(readJson(WORD_KEY, []));
  const MEMORY_META = {
    roots: { label: "词根构词", short: "词根" },
    collocation: { label: "搭配记忆", short: "搭配" },
    context: { label: "语境记忆", short: "语境" }
  };
  const POS_META = [
    { id: "n.", label: "名词", volume: "卷一", description: "人物、事物与抽象概念" },
    { id: "v.", label: "动词", volume: "卷二", description: "行为、判断与变化过程" },
    { id: "adj.", label: "形容词", volume: "卷三", description: "性质、状态与程度" },
    { id: "adv.", label: "副词", volume: "卷四", description: "方式、时间与趋势" }
  ];
  const TOPIC_ORDER = [
    "学习与认知",
    "情绪与态度",
    "计划与工作",
    "交流与表达",
    "变化与调整",
    "社会与协作",
    "城市与空间",
    "环境与资源",
    "效率与趋势"
  ];
  const WORD_TOPICS = {
    allocate: "计划与工作",
    anticipate: "情绪与态度",
    assess: "学习与认知",
    compensate: "社会与协作",
    conserve: "环境与资源",
    crucial: "情绪与态度",
    decline: "变化与调整",
    demonstrate: "交流与表达",
    derive: "学习与认知",
    diminish: "变化与调整",
    encounter: "社会与协作",
    enhance: "变化与调整",
    evaluate: "学习与认知",
    facilitate: "计划与工作",
    generate: "环境与资源",
    hesitate: "情绪与态度",
    illustrate: "交流与表达",
    impose: "社会与协作",
    indicate: "交流与表达",
    inevitable: "情绪与态度",
    interpret: "学习与认知",
    maintain: "城市与空间",
    modify: "城市与空间",
    obtain: "计划与工作",
    participate: "社会与协作",
    perceive: "学习与认知",
    persist: "情绪与态度",
    preserve: "城市与空间",
    prohibit: "社会与协作",
    retain: "学习与认知",
    reveal: "交流与表达",
    sustain: "环境与资源",
    transform: "城市与空间",
    vary: "变化与调整",
    efficient: "效率与趋势",
    essential: "情绪与态度",
    flexible: "变化与调整",
    significant: "交流与表达",
    accessible: "城市与空间",
    prioritize: "计划与工作",
    consume: "环境与资源",
    effective: "效率与趋势",
    increasingly: "效率与趋势",
    ultimately: "效率与趋势",
    effectively: "效率与趋势",
    readily: "情绪与态度"
  };
  let articleOffset = 0;
  let dailyReadingExam = null;
  let dailyListeningExam = null;
  let wordQuery = "";
  let wordPos = "all";
  let wordMemory = "all";
  let activeDay = 0;
  let activeWordEdition = null;
  let visibleWordCount = 0;
  let currentArticle = null;
  let articleReader = null;
  let examReaders = [];
  let activeReader = null;
  let vocabularyAudio = null;

  const now = new Date();
  const dayIndex = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  document.getElementById("headerDate").textContent = dateKey;
  document.getElementById("vocabularyCount").textContent = DATA.vocabulary.length;

  renderDailyArticle();
  renderWordList();
  renderMockLabels();
  renderExam();
  bindEvents();

  function renderDailyArticle() {
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
      label: "今日文章",
      audioKey: `article-${article.id}`
    });

    document.querySelectorAll("#articleBody mark, #articleWords [data-word]").forEach((button) => {
      button.addEventListener("click", () => openWord(button.dataset.word));
    });
    renderDailyEditions();
    renderDailyReviewWords();
  }

  function renderDailyReviewWords() {
    const root = document.getElementById("dailyVocabReview");
    if (!root || !DAILY_WORD_SETS.length) return;

    const todayEdition = (dayIndex % DAILY_WORD_SETS.length) + 1;
    const selectedNumber = activeWordEdition || todayEdition;
    const edition =
      DAILY_WORD_SETS.find((item) => item.number === selectedNumber) ||
      DAILY_WORD_SETS[0];
    activeWordEdition = edition.number;
    const article = DATA.articles.find((item) => item.id === edition.articleId);
    const articleWords = new Set(article?.words || []);
    const seen = new Set();
    const entries = edition.words.map((wordKey) => {
      const item = wordMap.get(wordKey);
      const kind = seen.has(wordKey)
        ? "复习复现"
        : articleWords.has(wordKey)
          ? "文章关联"
          : "新增累积";
      seen.add(wordKey);
      return { item, kind };
    }).filter(({ item }) => item);
    const partCounts = {
      "n.": entries.filter(({ item }) => item.part.includes("n.")).length,
      "v.": entries.filter(({ item }) => item.part.includes("v.")).length,
      "adj.": entries.filter(({ item }) => item.part.includes("adj.")).length,
      "adv.": entries.filter(({ item }) => item.part.includes("adv.")).length
    };
    root.innerHTML = `
      <div class="daily-word-review__head">
        <div>
          <p class="eyebrow">DAILY 100 · EDITION ${String(edition.number).padStart(2, "0")}</p>
          <h3 id="dailyVocabTitle">${edition.number === todayEdition ? "今日 100 词" : edition.title}</h3>
          <p>${escapeHtml(edition.title)}以${edition.focusLabel}为重点，关联文章《${escapeHtml(article?.title || "")}》。每期 100 个学习项都会归档，重复词用于间隔复习。</p>
        </div>
        <div class="daily-word-review__stats">
          <span><strong>${entries.length}</strong>学习项</span>
          <span><strong>${partCounts["n."]}</strong>名词</span>
          <span><strong>${partCounts["v."]}</strong>动词</span>
          <span><strong>${partCounts["adj."] + partCounts["adv."]}</strong>形/副</span>
        </div>
      </div>
      <div class="daily-word-editions" role="group" aria-label="百词分期册">
        ${DAILY_WORD_SETS.map((item) => `
          <button class="daily-word-edition${item.number === edition.number ? " is-active" : ""}${item.number === todayEdition ? " is-current" : ""}"
            type="button" data-daily-edition="${item.number}" aria-pressed="${item.number === edition.number}">
            <span>${String(item.number).padStart(2, "0")}</span>
            <strong>${escapeHtml(item.focusLabel)}</strong>
            <em>100 词</em>
          </button>
        `).join("")}
      </div>
      <div class="daily-word-grid">
        ${entries.map(({ item, kind }, index) => {
          const memory = MEMORY_META[item.memory?.type || "context"];
          return `
            <div class="daily-word-item${mastered.has(item.word) ? " is-mastered" : ""}">
              <button class="daily-word-item__open" type="button"
                data-daily-word="${escapeAttr(item.word)}"
                aria-label="查看 ${escapeAttr(item.word)} 的释义和记忆方式">
                <span class="daily-word-item__index">${String(index + 1).padStart(3, "0")}</span>
                <span class="daily-word-item__main">
                  <strong>${escapeHtml(item.word)}</strong>
                  <small>${item.part.map(escapeHtml).join(" ")} ${escapeHtml(item.meaning)}</small>
                </span>
                <span class="daily-word-item__tags">
                  <em>${escapeHtml(kind)}</em>
                  <i class="memory-badge memory-badge--${escapeAttr(item.memory?.type || "context")}">${escapeHtml(memory.short)}</i>
                  ${mastered.has(item.word) ? '<b aria-label="已掌握">✓</b>' : ""}
                </span>
              </button>
              <button class="daily-word-item__audio" type="button"
                data-word-audio="${escapeAttr(item.word)}"
                aria-label="朗读单词 ${escapeAttr(item.word)}" title="朗读单词">🔊</button>
            </div>
          `;
        }).join("")}
      </div>
      <p class="daily-word-review__method">
        记忆建议：先用语境判断词义，再用词根拆解或固定搭配建立线索，最后按间隔复现。相关资料：
        <a href="https://doi.org/10.1007/s11145-009-9172-z" target="_blank" rel="noopener">词法教学研究</a>
        ·
        <a href="https://doi.org/10.1038/s44159-022-00089-1" target="_blank" rel="noopener">间隔与检索练习</a>
        ·
        <a href="https://doi.org/10.1017/s0142716418000504" target="_blank" rel="noopener">语境线索研究</a>
      </p>
    `;
  }

  function createSpeechReader({ body, toolbar, text, targetWords = [], label, audioKey }) {
    const rendered = renderReadableText(text, targetWords);
    body.innerHTML = rendered.html;
    const tokens = rendered.tokens.map((token) => ({
      ...token,
      element: body.querySelector(`[data-reader-index="${token.index}"]`)
    }));
    const lastIndex = Math.max(0, tokens.length - 1);
    const timing = AUDIO_TIMINGS[audioKey];
    const timedTokens =
      timing && Array.isArray(timing.tokens) && timing.tokens.length === tokens.length
        ? timing.tokens
        : null;
    let useAudio = Boolean(timedTokens && audioKey);
    let audio = useAudio ? new Audio(`./audio/${audioKey}.mp3`) : null;
    if (audio) audio.preload = "metadata";

    toolbar.innerHTML = `
      <div class="reader-toolbar" role="group" aria-label="${escapeAttr(label)}朗读进度">
        <button class="reader-play" type="button">▶ 播放朗读</button>
        <button class="reader-stop" type="button" disabled>停止</button>
        <input class="reader-progress" type="range" min="0" max="${lastIndex}" value="0" step="1"
          aria-label="调整${escapeAttr(label)}阅读进度">
        <output class="reader-position" aria-label="当前朗读到第几个单词">1 / ${tokens.length}</output>
        <span class="reader-audio-tag">${useAudio ? "自然美音 · Ava" : "浏览器朗读"}</span>
      </div>
    `;

    const playButton = toolbar.querySelector(".reader-play");
    const stopButton = toolbar.querySelector(".reader-stop");
    const range = toolbar.querySelector(".reader-progress");
    const position = toolbar.querySelector(".reader-position");
    const audioTag = toolbar.querySelector(".reader-audio-tag");
    let currentIndex = 0;
    let mode = "idle";
    let session = 0;
    let utterance = null;
    let hasReadPosition = false;
    let frameId = 0;
    let fallbackTimer = 0;
    let lastBoundaryAt = 0;
    let isScrubbing = false;

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
      const previousIndex = currentIndex;
      currentIndex = Math.max(0, Math.min(Number(index) || 0, lastIndex));
      if (showReadingPosition) hasReadPosition = true;
      if (hasReadPosition) {
        if (previousIndex !== currentIndex) {
          tokens[previousIndex]?.element?.classList.remove("is-reading");
        }
        tokens[currentIndex]?.element?.classList.add("is-reading");
      }
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
          behavior: "smooth",
          inline: "nearest"
        });
      }
    }

    function stopFrameLoop() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    }

    function findWordAtTime(time) {
      if (!timedTokens?.length) return 0;
      let low = 0;
      let high = timedTokens.length - 1;
      let found = 0;
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        if (timedTokens[middle].start <= time) {
          found = middle;
          low = middle + 1;
        } else {
          high = middle - 1;
        }
      }
      return found;
    }

    function syncAudioPosition() {
      if (!audio || !timedTokens || mode !== "speaking" || isScrubbing) return;
      const nextIndex = findWordAtTime(audio.currentTime + 0.025);
      if (nextIndex !== currentIndex) updateVisual(nextIndex, true);
    }

    function runFrameLoop() {
      stopFrameLoop();
      const tick = () => {
        if (mode !== "speaking") {
          frameId = 0;
          return;
        }
        syncAudioPosition();
        frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
    }

    function clearFallbackTimer() {
      if (fallbackTimer) window.clearInterval(fallbackTimer);
      fallbackTimer = 0;
    }

    function cancelSpeech() {
      session += 1;
      utterance = null;
      clearFallbackTimer();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }

    function startTimedAudio(index = currentIndex) {
      if (!audio || !timedTokens) return;
      if (activeReader && activeReader !== reader) activeReader.stop();
      stopVocabularyAudio();
      cancelSpeech();
      const safeIndex = Math.max(0, Math.min(index, lastIndex));
      audio.currentTime = Math.max(0, timedTokens[safeIndex].start - 0.02);
      updateVisual(safeIndex, true);
      mode = "speaking";
      activeReader = reader;
      audio.play().then(runFrameLoop).catch(() => {
        useAudio = false;
        audioTag.textContent = "浏览器朗读";
        mode = "idle";
        activeReader = null;
        updateVisual(currentIndex, false);
      });
    }

    function startBrowserSpeech(index = currentIndex) {
      if (!tokens.length || !("speechSynthesis" in window)) {
        window.alert("当前浏览器不支持语音朗读。");
        return;
      }

      if (activeReader && activeReader !== reader) activeReader.stop();
      stopVocabularyAudio();
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
        lastBoundaryAt = performance.now();
        updateVisual(currentIndex, true);
        fallbackTimer = window.setInterval(() => {
          if (mode !== "speaking" || voiceSession !== session) return;
          if (performance.now() - lastBoundaryAt < 520) return;
          const estimatedIndex = Math.min(lastIndex, currentIndex + 1);
          if (estimatedIndex > currentIndex) updateVisual(estimatedIndex, true);
        }, 320);
      };
      utterance.onboundary = (event) => {
        if (voiceSession !== session || typeof event.charIndex !== "number") return;
        lastBoundaryAt = performance.now();
        updateVisual(findWordAt(sourceStart + event.charIndex), true);
      };
      utterance.onend = () => {
        if (voiceSession !== session) return;
        clearFallbackTimer();
        mode = "finished";
        activeReader = null;
        updateVisual(lastIndex, false);
      };
      utterance.onerror = (event) => {
        if (voiceSession !== session || ["canceled", "interrupted"].includes(event.error)) {
          return;
        }
        clearFallbackTimer();
        mode = "idle";
        activeReader = null;
        updateVisual(currentIndex, false);
      };

      mode = "speaking";
      activeReader = reader;
      updateVisual(currentIndex, false);
      window.speechSynthesis.speak(utterance);
    }

    function startFrom(index = currentIndex) {
      if (useAudio) startTimedAudio(index);
      else startBrowserSpeech(index);
    }

    const reader = {
      start() {
        if (mode === "paused" && useAudio && audio) {
          audio.play().then(runFrameLoop).catch(() => {
            useAudio = false;
            audioTag.textContent = "浏览器朗读";
            startFrom(currentIndex);
          });
          mode = "speaking";
          updateVisual(currentIndex, false);
          return;
        }
        if (mode === "paused" && "speechSynthesis" in window) {
          window.speechSynthesis.resume();
          mode = "speaking";
          lastBoundaryAt = performance.now();
          updateVisual(currentIndex, false);
          return;
        }
        if (mode === "finished") currentIndex = 0;
        startFrom(currentIndex);
      },
      pause() {
        if (mode !== "speaking") return;
        if (useAudio && audio) {
          audio.pause();
          stopFrameLoop();
        } else if ("speechSynthesis" in window) {
          window.speechSynthesis.pause();
          clearFallbackTimer();
        }
        mode = "paused";
        updateVisual(currentIndex, false);
      },
      stop() {
        if (audio) {
          audio.pause();
          audio.currentTime = timedTokens?.[currentIndex]?.start || 0;
        }
        stopFrameLoop();
        cancelSpeech();
        mode = "idle";
        if (activeReader === reader) activeReader = null;
        updateVisual(currentIndex, false);
      },
      searchFrom(index) {
        updateVisual(index, true);
      },
      seek(index) {
        const safeIndex = Math.max(0, Math.min(Number(index) || 0, lastIndex));
        const wasPlaying = mode === "speaking";
        isScrubbing = false;
        updateVisual(safeIndex, true);
        if (useAudio && audio && timedTokens) {
          audio.currentTime = Math.max(0, timedTokens[safeIndex].start - 0.02);
          if (wasPlaying) audio.play().then(runFrameLoop).catch(() => {});
        } else if (wasPlaying || mode === "paused") {
          startBrowserSpeech(safeIndex);
        }
      },
      destroy() {
        if (activeReader === reader) activeReader = null;
        stopFrameLoop();
        cancelSpeech();
        if (audio) {
          audio.pause();
          audio.removeAttribute("src");
          audio.load();
          audio = null;
        }
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
    range.addEventListener("input", () => {
      isScrubbing = true;
      reader.searchFrom(Number(range.value));
    });
    range.addEventListener("change", () => reader.seek(Number(range.value)));

    if (audio) {
      audio.addEventListener("play", () => {
        mode = "speaking";
        activeReader = reader;
        updateVisual(currentIndex, false);
        runFrameLoop();
      });
      audio.addEventListener("pause", () => {
        if (mode !== "speaking") return;
        stopFrameLoop();
        mode = "paused";
        updateVisual(currentIndex, false);
      });
      audio.addEventListener("ended", () => {
        stopFrameLoop();
        mode = "finished";
        activeReader = null;
        updateVisual(lastIndex, false);
      });
      audio.addEventListener("error", () => {
        useAudio = false;
        audioTag.textContent = "浏览器朗读";
        stopFrameLoop();
        if (mode === "speaking") {
          mode = "idle";
          activeReader = null;
          updateVisual(currentIndex, false);
        }
      });
      audio.addEventListener("loadedmetadata", () => {
        position.title = `音频时长 ${Math.round(audio.duration)} 秒`;
      });
    }

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
        const wordPattern = /\p{L}+(?:['’–-]\p{L}+)*/gu;
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
    const daysByWord = getWordDays();
    const visible = DATA.vocabulary.filter((item) => {
      const partMatch = wordPos === "all" || item.part.includes(wordPos);
      const memoryType = item.memory?.type || "context";
      const memoryMatch = wordMemory === "all" || memoryType === wordMemory;
      const dayMatch =
        !activeDay || (daysByWord.get(item.word) || []).includes(activeDay);
      const memoryText = [
        MEMORY_META[memoryType]?.label || "",
        item.memory?.note || "",
        item.memory?.breakdown || "",
        ...(item.memory?.family || []),
        ...(item.memory?.collocations || [])
      ].join(" ");
      const text = `${item.word} ${item.meaning} ${item.synonyms.join(" ")} ${WORD_TOPICS[item.word] || item.topic || ""} ${memoryText}`.toLowerCase();
      return partMatch && memoryMatch && dayMatch && (!query || text.includes(query));
    });
    visibleWordCount = visible.length;

    renderWordBookSummary(visible.length, daysByWord);
    const searchExpanded = Boolean(query) || wordPos !== "all" || wordMemory !== "all" || activeDay > 0;
    const activeParts =
      wordPos === "all"
        ? POS_META
        : POS_META.filter((part) => part.id === wordPos);
    const volumes = activeParts.map((part) => {
      const partWords = visible.filter((item) => item.part.includes(part.id));
      const topics = TOPIC_ORDER.map((topic) => ({
        name: topic,
        words: partWords.filter(
          (item) => (WORD_TOPICS[item.word] || item.topic || "交流与表达") === topic
        )
      })).filter((topic) => topic.words.length);
      const fallbackWords = partWords.filter(
        (item) => !TOPIC_ORDER.includes(WORD_TOPICS[item.word] || item.topic)
      );
      if (fallbackWords.length) {
        topics.push({ name: "综合表达", words: fallbackWords });
      }
      return {
        ...part,
        words: partWords,
        topics
      };
    }).filter((volume) => volume.words.length);

    document.getElementById("wordList").innerHTML = volumes
      .map(
        (volume) => `
          <details class="word-volume" ${searchExpanded ? "open" : ""}>
            <summary>
              <span class="word-volume__number">${volume.volume}</span>
              <span class="word-volume__title">
                <strong>${volume.label}</strong>
                <small>${volume.description}</small>
              </span>
              <span class="word-volume__count">${volume.words.length} 词</span>
            </summary>
            <div class="word-volume__body">
              ${volume.topics.map(
                (topic) => `
                  <details class="word-topic" ${searchExpanded ? "open" : ""}>
                    <summary>
                      <strong>${topic.name}</strong>
                      <span>${topic.words.length} 个词</span>
                    </summary>
                    <div class="word-topic__grid">
                      ${topic.words.map((item) => renderWordCard(item, daysByWord)).join("")}
                    </div>
                  </details>
                `
              ).join("")}
            </div>
          </details>
        `
      )
      .join("");

    document.getElementById("wordEmpty").hidden = visible.length > 0;
  }

  function renderWordCard(item, daysByWord) {
    const days = daysByWord.get(item.word) || [];
    const dailyEditions = wordDailyEditions.get(item.word) || [];
    const topic = WORD_TOPICS[item.word] || item.topic || "综合表达";
    const memoryType = item.memory?.type || "context";
    const memory = MEMORY_META[memoryType];
    return `
      <article class="word-card" id="word-${escapeAttr(item.word)}" data-card="${escapeAttr(item.word)}" data-memory="${escapeAttr(memoryType)}">
        <div class="word-card__main">
          <div>
            <div class="word-card__headline">
              <h3>${escapeHtml(item.word)}</h3>
              <span class="word-card__ipa">${escapeHtml(item.ipa)}</span>
            </div>
            <p class="word-card__meaning">${item.part.map(escapeHtml).join(" ")} ${escapeHtml(item.meaning)}</p>
            <div class="word-card__context">
              <span class="word-card__topic">${escapeHtml(topic)}</span>
              <span class="memory-badge memory-badge--${escapeAttr(memoryType)}">${escapeHtml(memory.label)}</span>
              <span class="word-card__days">
                ${days.length
                  ? days.map((day) => `<i title="收录于第 ${String(day).padStart(2, "0")} 期">${String(day).padStart(2, "0")}</i>`).join("")
                  : `<i class="is-pending">待入篇</i>`}
              </span>
            </div>
            ${dailyEditions.length ? `
              <div class="word-card__daily-editions">
                <span>百词期号</span>
                ${dailyEditions.slice(0, 5).map((day) => `<i>${String(day).padStart(2, "0")}</i>`).join("")}
                ${dailyEditions.length > 5 ? `<em>+${dailyEditions.length - 5}</em>` : ""}
              </div>
            ` : ""}
          </div>
          <button class="master-word${mastered.has(item.word) ? " is-mastered" : ""}" type="button" data-master-word="${escapeAttr(item.word)}">
            ${mastered.has(item.word) ? "已掌握" : "标记掌握"}
          </button>
        </div>
        ${item.memory?.note ? `<p class="word-card__memory">${escapeHtml(item.memory.note)}</p>` : ""}
        <div class="word-card__actions">
          <button type="button" data-open-word="${escapeAttr(item.word)}">全部释义与词形</button>
          <button type="button" data-word-audio="${escapeAttr(item.word)}">▶ 朗读单词</button>
          <button type="button" data-example-audio="${escapeAttr(item.word)}">▶ 朗读例句</button>
        </div>
      </article>
    `;
  }

  function getWordDays() {
    const daysByWord = new Map();
    DATA.articles.forEach((article, index) => {
      article.words.forEach((word) => {
        if (!daysByWord.has(word)) daysByWord.set(word, []);
        daysByWord.get(word).push(index + 1);
      });
    });
    return daysByWord;
  }

  function renderWordBookSummary(visibleCount, daysByWord) {
    const dailyWords = new Set([...daysByWord.keys()]);
    const selectedEdition = activeDay ? DATA.articles[activeDay - 1] : null;
    document.getElementById("wordBookSummary").innerHTML = `
      <div class="word-book__lead">
        <p class="eyebrow">CET-4 VOCABULARY BANK</p>
        <strong>${selectedEdition ? `第 ${String(activeDay).padStart(2, "0")} 期 · ${escapeHtml(selectedEdition.topic)}` : "四级词汇总库"}</strong>
        <span>${selectedEdition ? escapeHtml(selectedEdition.title) : "词性、主题、词根构词、固定搭配和语境例句共同组成每日复习线索。"}</span>
      </div>
      <div class="word-book__stats">
        <span><strong>${visibleCount}</strong>当前筛选</span>
        <span><strong>${DATA.vocabulary.length}</strong>词库总量</span>
        <span><strong>${dailyWords.size}</strong>文章重点</span>
        <span><strong>${DAILY_WORD_SETS.length}</strong>百词分期</span>
        <span><strong>${mastered.size}</strong>已掌握</span>
      </div>
    `;
  }

  function renderDailyEditions() {
    const root = document.getElementById("dailyEditions");
    const daysByWord = getWordDays();
    const dailyWords = new Set([...daysByWord.keys()]);
    root.innerHTML = `
      <div class="daily-editions__head">
        <div>
          <p class="eyebrow">DAILY WORD LEDGER</p>
          <h3>每日词目存档</h3>
        </div>
        <span>共 ${dailyWords.size} 个已出现词目</span>
      </div>
      <div class="daily-edition-track" role="group" aria-label="按每日文章筛选词汇">
        <button class="daily-edition${activeDay === 0 ? " is-active" : ""}" type="button"
          data-word-day="0" aria-pressed="${activeDay === 0}">
          <span class="daily-edition__index">ALL</span>
          <strong>全部十期</strong>
          <small>查看完整合订本</small>
        </button>
        ${DATA.articles.map((article, index) => {
          const day = index + 1;
          return `
            <button class="daily-edition${activeDay === day ? " is-active" : ""}${article.id === currentArticle?.id ? " is-current" : ""}"
              type="button" data-word-day="${day}" aria-pressed="${activeDay === day}">
              <span class="daily-edition__index">${String(day).padStart(2, "0")}</span>
              <strong>${escapeHtml(article.topic)}</strong>
              <small>${escapeHtml(article.title)}</small>
              <em>${article.words.length} 词</em>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function openWord(wordKey) {
    const item = wordMap.get(wordKey);
    if (!item) return;
    const memoryType = item.memory?.type || "context";
    const memory = MEMORY_META[memoryType];
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
        <div class="word-memory">
          <span class="memory-badge memory-badge--${escapeAttr(memoryType)}">${escapeHtml(memory.label)}</span>
          ${item.memory?.breakdown ? `<p><strong>构词拆解</strong>${escapeHtml(item.memory.breakdown)}</p>` : ""}
          ${item.memory?.note ? `<p><strong>记忆提示</strong>${escapeHtml(item.memory.note)}</p>` : ""}
          ${item.memory?.family?.length ? `<p><strong>同族词</strong>${item.memory.family.map(escapeHtml).join(" · ")}</p>` : ""}
          ${item.memory?.collocations?.length ? `<p><strong>高频搭配</strong>${item.memory.collocations.map(escapeHtml).join(" · ")}</p>` : ""}
        </div>
        <dl class="detail-grid">
          <dt>近义词</dt><dd>${item.synonyms.map(escapeHtml).join(" · ")}</dd>
          <dt>形近词</dt><dd>${item.similar.map(escapeHtml).join(" · ")}</dd>
          <dt>百词期号</dt><dd>${(wordDailyEditions.get(item.word) || []).slice(0, 12).map((day) => String(day).padStart(2, "0")).join(" · ") || "尚未进入百词分期"}</dd>
          ${forms}
        </dl>
        <div class="word-example">
          ${escapeHtml(item.example)}
          <span>${escapeHtml(item.exampleZh)}</span>
        </div>
        <div class="reading-card__footer">
          <button class="reading-button" type="button" data-drawer-word-audio="${escapeAttr(item.word)}">▶ 朗读单词</button>
          <button class="reading-button" type="button" data-drawer-example-audio="${escapeAttr(item.word)}">▶ 朗读例句</button>
          <button class="reading-button" type="button" data-master-word="${escapeAttr(item.word)}">
            ${mastered.has(item.word) ? "已掌握" : "标记掌握"}
          </button>
        </div>
      </article>
    `;
    const drawer = document.getElementById("wordDrawer");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    drawer.querySelectorAll("[data-drawer-word-audio]").forEach((button) =>
      button.addEventListener("click", () =>
        playVocabularyAudio(button.dataset.drawerWordAudio, "word")
      )
    );
    drawer.querySelectorAll("[data-drawer-example-audio]").forEach((button) =>
      button.addEventListener("click", () =>
        playVocabularyAudio(button.dataset.drawerExampleAudio, "example")
      )
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
    document.querySelectorAll("[data-master-word]").forEach((button) => {
      if (button.dataset.masterWord !== word) return;
      button.classList.toggle("is-mastered", mastered.has(word));
      button.textContent = mastered.has(word) ? "已掌握" : "标记掌握";
    });
    renderWordBookSummary(visibleWordCount, getWordDays());
    renderDailyReviewWords();
    if (document.getElementById("wordDrawer").classList.contains("is-open")) {
      openWord(word);
    }
  }

  function getDailyMock() {
    if (!EXAMS.length) return null;
    return {
      reading: EXAMS[dayIndex % EXAMS.length],
      listening: EXAMS[(dayIndex + 1) % EXAMS.length]
    };
  }

  function renderMockLabels() {
    const root = document.getElementById("yearTabs");
    const mock = getDailyMock();
    if (!mock) {
      root.innerHTML = "";
      return;
    }
    root.innerHTML = `
      <span><strong>今日阅读</strong> · ${mock.reading.year} · ${escapeHtml(mock.reading.reading.title)}</span>
      <span><strong>今日听力</strong> · ${mock.listening.year} · ${escapeHtml(mock.listening.listening.title)}</span>
    `;
  }

  function buildListeningText(content) {
    const questions = content.questions.map(
      (question, index) => `Question ${index + 1}. ${question.prompt}`
    );
    return [content.script, ...questions].join("\n\n");
  }

  function renderExam() {
    examReaders.forEach((reader) => reader.destroy());
    examReaders = [];
    const mock = getDailyMock();
    const root = document.getElementById("examContent");
    if (!mock) {
      root.innerHTML = "";
      return;
    }
    dailyReadingExam = mock.reading;
    dailyListeningExam = mock.listening;

    root.innerHTML = `
      <div class="exam-pack">
        ${renderExamPanel(mock.reading.reading, "READING", "daily-reading", false, mock.reading.year)}
        ${renderExamPanel(mock.listening.listening, "LISTENING", "daily-listening", true, mock.listening.year)}
      </div>
    `;
    root.querySelectorAll("[data-submit-exam]").forEach((button) =>
      button.addEventListener("click", () => submitExam(button.dataset.submitExam))
    );

    root.querySelectorAll(".exam-panel").forEach((panel) => {
      const listening = panel.dataset.examKind === "listening";
      const exam = listening ? dailyListeningExam : dailyReadingExam;
      const content = listening ? exam.listening : exam.reading;
      examReaders.push(
        createSpeechReader({
          body: panel.querySelector("[data-reader-body]"),
          toolbar: panel.querySelector("[data-reader-toolbar]"),
          text: listening ? buildListeningText(content) : content.passage,
          label: listening ? `${exam.year} 模拟听力原文` : `${exam.year} 阅读文章`,
          audioKey: `exam-${exam.year}-${listening ? "listening" : "reading"}`
        })
      );
    });
  }

  function renderExamPanel(content, type, panelId, listening, examYear) {
    return `
      <section class="exam-panel" id="${escapeAttr(panelId)}" data-exam-kind="${listening ? "listening" : "reading"}" data-exam-year="${examYear}">
        <div class="exam-panel__head">
          <h3>${escapeHtml(content.title)}</h3>
          <span class="exam-type">${examYear} · ${type} · 原创改编</span>
        </div>
        <div data-reader-toolbar></div>
        ${
          listening
            ? `
              <details class="transcript" open>
                <summary>听力稿与朗读题干 · 播放时逐词高亮</summary>
                <div class="exam-passage transcript-copy" data-reader-body></div>
              </details>
            `
            : `<div class="exam-passage" data-reader-body></div>`
        }
        <div class="exam-questions">
          ${content.questions.map((question, index) => renderQuestion(question, panelId, index, listening)).join("")}
        </div>
        <button class="submit-exam" type="button" data-submit-exam="${escapeAttr(panelId)}">提交本篇答案</button>
      </section>
    `;
  }

  function renderQuestion(question, panelId, index, listening) {
    return `
      <div class="exam-question" data-question="${index}">
        ${listening
          ? `<p class="exam-question__cue">第 ${index + 1} 题 · 题干已在听力音频中朗读</p>`
          : `<p>${index + 1}. ${escapeHtml(question.prompt)}</p>`}
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
    const panel = document.getElementById(panelId);
    const content = panel.dataset.examKind === "reading"
      ? dailyReadingExam.reading
      : dailyListeningExam.listening;
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
      activeDay = 0;
      renderDailyArticle();
    });
    document.getElementById("dailyEditions").addEventListener("click", (event) => {
      const button = event.target.closest("[data-word-day]");
      if (!button) return;
      activeDay = Number(button.dataset.wordDay);
      renderWordList();
      renderDailyEditions();
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
    document.getElementById("wordMemoryFilters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-memory]");
      if (!button) return;
      wordMemory = button.dataset.memory;
      document.querySelectorAll("#wordMemoryFilters button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderWordList();
    });
    document.getElementById("dailyVocabReview").addEventListener("click", (event) => {
      const audioButton = event.target.closest("[data-word-audio]");
      if (audioButton) {
        playVocabularyAudio(audioButton.dataset.wordAudio, "word");
        return;
      }
      const editionButton = event.target.closest("[data-daily-edition]");
      if (editionButton) {
        activeWordEdition = Number(editionButton.dataset.dailyEdition);
        renderDailyReviewWords();
        return;
      }
      const button = event.target.closest("[data-daily-word]");
      if (button) openWord(button.dataset.dailyWord);
    });
    document.getElementById("wordList").addEventListener("click", (event) => {
      const open = event.target.closest("[data-open-word]");
      const master = event.target.closest("[data-master-word]");
      const wordAudio = event.target.closest("[data-word-audio]");
      const exampleAudio = event.target.closest("[data-example-audio]");
      if (open) openWord(open.dataset.openWord);
      if (master) toggleMastery(master.dataset.masterWord);
      if (wordAudio) playVocabularyAudio(wordAudio.dataset.wordAudio, "word");
      if (exampleAudio) {
        playVocabularyAudio(exampleAudio.dataset.exampleAudio, "example");
      }
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
    stopVocabularyAudio();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = .88;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    stopVocabularyAudio();
    if (activeReader) {
      activeReader.stop();
      activeReader = null;
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function stopVocabularyAudio() {
    if (!vocabularyAudio) return;
    vocabularyAudio.pause();
    vocabularyAudio.currentTime = 0;
    vocabularyAudio = null;
  }

  function playVocabularyAudio(wordKey, kind) {
    const item = wordMap.get(wordKey);
    if (!item) return;
    activeReader?.stop();
    activeReader = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    stopVocabularyAudio();
    const fallback = kind === "word" ? item.word : item.example;
    const source =
      kind === "word"
        ? `./audio/words/${encodeURIComponent(item.word)}.mp3`
        : `./audio/examples/${encodeURIComponent(item.word)}.mp3`;
    vocabularyAudio = new Audio(source);
    vocabularyAudio.play().catch(() => {
      vocabularyAudio = null;
      speak(fallback);
    });
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
    return (text.match(/\p{L}+(?:['’–-]\p{L}+)*/gu) || []).length;
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
