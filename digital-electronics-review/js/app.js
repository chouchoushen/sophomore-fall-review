(function () {
  "use strict";

  const COURSE = window.ANALOG_COURSE;
  if (!COURSE) {
    throw new Error("Digital electronics course data was not loaded.");
  }

  const TYPE_META = {
    definition: { label: "概念", filter: "概念与器件" },
    formula: { label: "公式", filter: "公式与计算" },
    property: { label: "性质", filter: "规则与性质" },
    judgment: { label: "分析", filter: "分析与判别" },
    application: { label: "器件", filter: "器件与应用" },
    example: { label: "例题", filter: "例题" },
    warning: { label: "易错", filter: "易错提醒" }
  };

  const STORAGE_KEYS = {
    mastered: "digital-electronics-review.mastered.v1",
    openChapter: "digital-electronics-review.open-chapter.v1"
  };

  const state = {
    query: "",
    type: "all",
    mastered: readJson(STORAGE_KEYS.mastered, {}),
    openChapter: null,
    activeChapter: null
  };

  const chapterRoot = document.getElementById("chapterRoot");
  const chapterNav = document.getElementById("chapterNav");
  const typeFilters = document.getElementById("typeFilters");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");

  const allCards = COURSE.chapters.flatMap((chapter) =>
    chapter.themes.flatMap((theme) =>
      theme.cards.map((card) => ({ chapter, theme, card }))
    )
  );
  const allFigures = COURSE.chapters.flatMap((chapter) =>
    chapter.themes.flatMap((theme) =>
      (theme.figures || []).map((figure) => ({ chapter, theme, figure }))
    )
  );

  document.getElementById("totalKnowledge").textContent = allCards.length;
  document.getElementById("totalFigures").textContent = allFigures.length;
  if (window.ANALOG_QUIZ) {
    document.getElementById("totalQuizQuestions").textContent =
      window.ANALOG_QUIZ.questions.length;
  }

  buildSidebar();
  buildTypeFilters();
  renderChapters();
  restoreChapter();
  updateMasteryUI();

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim().toLowerCase();
    clearSearch.hidden = !state.query;
    applyFilters();
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    state.query = "";
    clearSearch.hidden = true;
    searchInput.focus();
    applyFilters();
  });

  document.getElementById("expandAll").addEventListener("click", () => {
    document.querySelectorAll(".chapter").forEach((chapter) =>
      setChapterOpen(chapter, true)
    );
  });

  document.getElementById("collapseAll").addEventListener("click", () => {
    document.querySelectorAll(".chapter").forEach((chapter) =>
      setChapterOpen(chapter, false)
    );
    state.openChapter = null;
    localStorage.removeItem(STORAGE_KEYS.openChapter);
  });

  document.getElementById("resetProgress").addEventListener("click", () => {
    if (!Object.keys(state.mastered).length) return;
    if (!window.confirm("确定清除所有“已掌握”标记吗？")) return;
    state.mastered = {};
    localStorage.removeItem(STORAGE_KEYS.mastered);
    document.querySelectorAll(".knowledge-card").forEach((card) => {
      card.classList.remove("is-mastered");
      const button = card.querySelector(".mastery-button");
      button.classList.remove("is-mastered");
      button.textContent = "标记掌握";
      button.setAttribute("aria-pressed", "false");
    });
    updateMasteryUI();
  });

  window.addEventListener("hashchange", handleHash);
  setupFigureModal();
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("figureModal").hidden) {
      closeFigureModal();
      return;
    }
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      state.query = "";
      clearSearch.hidden = true;
      applyFilters();
      searchInput.blur();
    }
  });

  function buildSidebar() {
    COURSE.chapters.forEach((chapter) => {
      const button = document.createElement("button");
      button.className = "chapter-nav__item";
      button.type = "button";
      button.dataset.chapter = chapter.id;
      button.innerHTML =
        `<span>${chapter.number}</span>` +
        `<span>${chapter.title}</span>` +
        `<span>${countChapterCards(chapter)}</span>`;
      button.addEventListener("click", () => openChapterFromNav(chapter.id));
      chapterNav.appendChild(button);
    });
  }

  function buildTypeFilters() {
    const values = [{ id: "all", label: "全部" }].concat(
      Object.entries(TYPE_META).map(([id, meta]) => ({
        id,
        label: meta.filter
      }))
    );

    values.forEach(({ id, label }) => {
      const button = document.createElement("button");
      button.className = "type-filter";
      button.type = "button";
      button.dataset.type = id;
      button.setAttribute("aria-pressed", id === "all" ? "true" : "false");
      button.innerHTML =
        (id === "all" ? "" : `<i class="dot dot--${id}"></i>`) + label;
      if (id === "all") button.classList.add("is-active");
      button.addEventListener("click", () => {
        state.type = id;
        typeFilters.querySelectorAll(".type-filter").forEach((item) => {
          const active = item.dataset.type === id;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        applyFilters();
      });
      typeFilters.appendChild(button);
    });
  }

  function renderChapters() {
    chapterRoot.innerHTML = COURSE.chapters
      .map((chapter) => renderChapter(chapter))
      .join("");

    chapterRoot.querySelectorAll(".chapter-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const chapter = button.closest(".chapter");
        setChapterOpen(chapter, !chapter.classList.contains("is-open"));
      });
    });

    chapterRoot.querySelectorAll(".mastery-button").forEach((button) => {
      button.addEventListener("click", () => toggleMastery(button.dataset.card));
    });

    renderMath(document.body);
    updateResultCount(allCards.length);
  }

  function renderChapter(chapter) {
    const total = countChapterCards(chapter);
    return `
      <section class="chapter" id="${chapter.id}" data-chapter="${chapter.id}" data-accent="${chapter.accent}">
        <button class="chapter-toggle" type="button" aria-expanded="false" aria-controls="${chapter.id}-panel">
          <span class="chapter__number">${chapter.number}</span>
          <span class="chapter__heading">
            <span class="chapter__kicker">${chapter.english}</span>
            <span class="chapter__title">${chapter.title}</span>
            <span class="chapter__meta">
              <span>${chapter.themes.length} 个主题</span>
              <span>${total} 个知识点</span>
            </span>
          </span>
          <span class="chapter__side">
            <span class="chapter__mastery" data-chapter-mastery="${chapter.id}">0 / ${total}</span>
            <span class="chevron" aria-hidden="true"></span>
          </span>
        </button>
        <div class="chapter-panel" id="${chapter.id}-panel" hidden>
          <div class="chapter-intro">
            <p>
              <span class="chapter-intro__label">本章主线</span>
              ${chapter.summary}
            </p>
            <div class="focus-list" aria-label="重点">
              ${chapter.examFocus.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </div>
          ${chapter.themes.map((theme) => renderTheme(chapter, theme)).join("")}
        </div>
      </section>
    `;
  }

  function renderTheme(chapter, theme) {
    return `
      <section class="theme-block" data-theme="${theme.id}">
        <div class="theme-block__head">
          <div>
            <h3>${theme.title}</h3>
            <p>${theme.summary}</p>
          </div>
          <span class="theme-block__count">${theme.cards.length} 项</span>
        </div>
        ${theme.figures ? renderFigures(theme.figures) : ""}
        <div class="knowledge-grid">
          ${theme.cards.map((card) => renderCard(chapter, theme, card)).join("")}
        </div>
      </section>
    `;
  }

  function renderFigures(figures) {
    return `
      <div class="figure-gallery" aria-label="${figures.length} 张相关笔记图">
        ${figures.map((figure, index) => `
          <button
            class="figure-card"
            type="button"
            data-figure-src="${escapeAttribute(figure.src)}"
            data-figure-title="${escapeAttribute(figure.title)}"
            data-figure-caption="${escapeAttribute(figure.caption || "")}"
            aria-label="放大查看：${escapeAttribute(figure.title)}"
          >
            <span class="figure-card__media">
              <img src="${escapeAttribute(figure.src)}" alt="${escapeAttribute(figure.title)}" loading="lazy">
            </span>
            <span class="figure-card__text">
              <span class="figure-card__index">图 ${String(index + 1).padStart(2, "0")} · 照片笔记</span>
              <strong>${figure.title}</strong>
              <small>${figure.caption || "点击查看原图"}</small>
            </span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderCard(chapter, theme, card) {
    const type = TYPE_META[card.type] ? card.type : "definition";
    const meta = TYPE_META[type];
    const searchText = normalizeSearchText(
      [
        chapter.title,
        theme.title,
        card.title,
        meta.filter,
        stripSearchMarkup((theme.figures || []).map((figure) => `${figure.title} ${figure.caption || ""}`).join(" ")),
        stripSearchMarkup((card.body || []).join(" ")),
        stripSearchMarkup(card.formula || ""),
        stripSearchMarkup((card.bullets || []).join(" ")),
        stripSearchMarkup(card.note || ""),
        stripSearchMarkup(card.example ? `${card.example.title} ${(card.example.body || []).join(" ")}` : "")
      ].join(" ")
    );

    return `
      <article class="knowledge-card" id="${card.id}" data-card="${card.id}" data-type="${type}" data-search="${escapeAttribute(searchText)}">
        <div class="knowledge-card__head">
          <span class="knowledge-type">${meta.label}</span>
          <h4>${card.title}</h4>
          ${card.source ? `<span class="knowledge-source">${card.source}</span>` : ""}
        </div>
        <div class="knowledge-body">
          ${(card.body || []).map((paragraph) => `<p>${protectInlineMath(paragraph)}</p>`).join("")}
          ${card.formula ? `<div class="formula-box">$$${escapeMathSource(card.formula)}$$</div>` : ""}
          ${card.bullets ? `<ul class="knowledge-bullets">${card.bullets.map((item) => `<li>${protectInlineMath(item)}</li>`).join("")}</ul>` : ""}
          ${card.note ? `<div class="card-callout">${protectInlineMath(card.note)}</div>` : ""}
          ${card.example ? renderExample(card.example) : ""}
        </div>
        <button class="mastery-button" type="button" data-card="${card.id}" aria-pressed="false">标记掌握</button>
      </article>
    `;
  }

  function renderExample(example) {
    return `
      <details class="example-details">
        <summary>${example.title}</summary>
        <div class="example-content">
          ${(example.body || []).map((paragraph) => `<p>${protectInlineMath(paragraph)}</p>`).join("")}
          ${example.formula ? `<div class="formula-box">$$${escapeMathSource(example.formula)}$$</div>` : ""}
        </div>
      </details>
    `;
  }

  function setupFigureModal() {
    const modal = document.getElementById("figureModal");
    document.querySelectorAll(".figure-card").forEach((button) => {
      button.addEventListener("click", () => openFigureModal(button));
    });
    document.getElementById("figureModalClose").addEventListener("click", closeFigureModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeFigureModal();
    });
  }

  function openFigureModal(button) {
    const modal = document.getElementById("figureModal");
    const image = document.getElementById("figureModalImage");
    image.src = button.dataset.figureSrc;
    image.alt = button.dataset.figureTitle;
    document.getElementById("figureModalTitle").textContent = button.dataset.figureTitle;
    document.getElementById("figureModalCaption").textContent = button.dataset.figureCaption;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    document.getElementById("figureModalClose").focus();
  }

  function closeFigureModal() {
    const modal = document.getElementById("figureModal");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    document.getElementById("figureModalImage").removeAttribute("src");
  }

  function setChapterOpen(chapter, open, persist = true) {
    if (!chapter) return;
    chapter.classList.toggle("is-open", open);
    const toggle = chapter.querySelector(".chapter-toggle");
    const panel = chapter.querySelector(".chapter-panel");
    toggle.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    if (open) {
      state.activeChapter = chapter.dataset.chapter;
      if (persist) {
        state.openChapter = chapter.dataset.chapter;
        localStorage.setItem(STORAGE_KEYS.openChapter, state.openChapter);
      }
    } else if (state.openChapter === chapter.dataset.chapter) {
      state.openChapter = null;
      if (persist) localStorage.removeItem(STORAGE_KEYS.openChapter);
    }
    updateActiveNav();
  }

  function openChapterFromNav(chapterId) {
    const chapter = document.getElementById(chapterId);
    if (!chapter) return;
    setChapterOpen(chapter, true);
    state.activeChapter = chapterId;
    updateActiveNav();
    chapter.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restoreChapter() {
    const hash = window.location.hash.replace("#", "");
    const saved = localStorage.getItem(STORAGE_KEYS.openChapter);
    const target = hash || saved;
    if (target && document.getElementById(target)) {
      setChapterOpen(document.getElementById(target), true, false);
    }
  }

  function handleHash() {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const chapter = document.getElementById(id);
    if (chapter && chapter.classList.contains("chapter")) {
      openChapterFromNav(id);
    }
  }

  function toggleMastery(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const mastered = !Boolean(state.mastered[cardId]);
    if (mastered) state.mastered[cardId] = true;
    else delete state.mastered[cardId];
    localStorage.setItem(STORAGE_KEYS.mastered, JSON.stringify(state.mastered));

    card.classList.toggle("is-mastered", mastered);
    const button = card.querySelector(".mastery-button");
    button.classList.toggle("is-mastered", mastered);
    button.textContent = mastered ? "已掌握" : "标记掌握";
    button.setAttribute("aria-pressed", String(mastered));
    updateMasteryUI();
  }

  function updateMasteryUI() {
    const total = allCards.length;
    const mastered = allCards.filter(({ card }) => state.mastered[card.id]).length;
    document.getElementById("masteryText").textContent = `${mastered} / ${total}`;
    document.getElementById("masteryBar").style.width =
      `${total ? (mastered / total) * 100 : 0}%`;

    COURSE.chapters.forEach((chapter) => {
      const chapterTotal = countChapterCards(chapter);
      const chapterMastered = chapter.themes
        .flatMap((theme) => theme.cards)
        .filter((card) => state.mastered[card.id]).length;
      const label = document.querySelector(`[data-chapter-mastery="${chapter.id}"]`);
      if (label) label.textContent = `${chapterMastered} / ${chapterTotal}`;
    });

    document.querySelectorAll(".knowledge-card").forEach((card) => {
      const masteredNow = Boolean(state.mastered[card.dataset.card]);
      card.classList.toggle("is-mastered", masteredNow);
      const button = card.querySelector(".mastery-button");
      button.classList.toggle("is-mastered", masteredNow);
      button.textContent = masteredNow ? "已掌握" : "标记掌握";
      button.setAttribute("aria-pressed", String(masteredNow));
    });
  }

  function applyFilters() {
    let visible = 0;

    document.querySelectorAll(".chapter").forEach((chapterNode) => {
      let chapterMatches = 0;
      chapterNode.querySelectorAll(".theme-block").forEach((themeNode) => {
        let themeMatches = 0;
        themeNode.querySelectorAll(".knowledge-card").forEach((card) => {
          const matchesType = state.type === "all" || card.dataset.type === state.type;
          const matchesQuery = !state.query || card.dataset.search.includes(state.query);
          const show = matchesType && matchesQuery;
          card.hidden = !show;
          if (show) {
            visible += 1;
            chapterMatches += 1;
            themeMatches += 1;
          }
        });
        themeNode.hidden = themeMatches === 0;
      });

      chapterNode.hidden = chapterMatches === 0;
      if ((state.query || state.type !== "all") && chapterMatches > 0) {
        setChapterOpen(chapterNode, true, false);
      }
    });

    emptyState.hidden = visible !== 0;
    updateResultCount(visible);
    updateActiveNav();
  }

  function updateResultCount(count) {
    const typeText =
      state.type === "all" ? "全部类型" : TYPE_META[state.type].filter;
    const queryText = state.query ? ` · “${state.query}”` : "";
    resultCount.textContent = `${count} 个结果 · ${typeText}${queryText}`;
  }

  function updateActiveNav() {
    let active = state.activeChapter;
    const visibleOpen = Array.from(document.querySelectorAll(".chapter.is-open:not([hidden])"));
    if (visibleOpen.length) active = visibleOpen[visibleOpen.length - 1].dataset.chapter;
    chapterNav.querySelectorAll(".chapter-nav__item").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.chapter === active);
    });
  }

  function renderMath(root) {
    if (typeof window.renderMathInElement !== "function") {
      window.setTimeout(() => renderMath(root), 50);
      return;
    }
    window.renderMathInElement(root, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }

  function countChapterCards(chapter) {
    return chapter.themes.reduce((sum, theme) => sum + theme.cards.length, 0);
  }

  function escapeMathSource(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function protectInlineMath(value) {
    return String(value).replace(/(\${1,2})([\s\S]*?)\1/g, (_, delimiter, formula) =>
      delimiter + escapeMathSource(formula) + delimiter
    );
  }

  function stripSearchMarkup(value) {
    return String(value)
      .replace(/<\/?(?:strong|em|code|br|span)\b[^>]*>/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeSearchText(value) {
    return value.replace(/\s+/g, " ").toLowerCase();
  }

  function escapeAttribute(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }
})();
