(function () {
  "use strict";

  const COURSE = window.XI_COURSE;
  if (!COURSE) {
    throw new Error("Xi general course data was not loaded.");
  }

  const TYPE_META = {
    definition: { label: "概念", filter: "概念与定位" },
    structure: { label: "结构", filter: "体系与结构" },
    judgment: { label: "判断", filter: "判断与关系" },
    significance: { label: "意义", filter: "历史与意义" },
    requirement: { label: "要求", filter: "根本保证" },
    warning: { label: "易错", filter: "易错提醒" }
  };

  const STORAGE_KEYS = {
    mastered: "xi-general-review.mastered.v1",
    openChapter: "xi-general-review.open-chapter.v1"
  };

  const state = {
    query: "",
    type: "all",
    mastered: readJson(STORAGE_KEYS.mastered, {}),
    activeTheme: null
  };

  const chapterRoot = document.getElementById("chapterRoot");
  const chapterNav = document.getElementById("chapterNav");
  const typeFilters = document.getElementById("typeFilters");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");

  const allThemes = COURSE.chapters.flatMap((chapter) =>
    chapter.themes.map((theme) => ({ chapter, theme }))
  );
  const allCards = allThemes.flatMap(({ chapter, theme }) =>
    theme.cards.map((card) => ({ chapter, theme, card }))
  );

  document.getElementById("totalChapters").textContent = COURSE.chapters.length;
  document.getElementById("totalThemes").textContent = allThemes.length;
  document.getElementById("totalKnowledge").textContent = allCards.length;

  buildSidebar();
  buildTypeFilters();
  renderChapters();
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
    document.querySelectorAll(".chapter").forEach((chapter) => {
      setChapterOpen(chapter, true);
    });
  });

  document.getElementById("collapseAll").addEventListener("click", () => {
    document.querySelectorAll(".chapter").forEach((chapter) => {
      setChapterOpen(chapter, false);
    });
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

  document.addEventListener("keydown", (event) => {
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
      const chapterButton = document.createElement("button");
      chapterButton.className = "chapter-nav__item chapter-nav__item--main";
      chapterButton.type = "button";
      chapterButton.dataset.chapter = chapter.id;
      chapterButton.innerHTML =
        `<span>${chapter.number}</span>` +
        `<span>${chapter.title}</span>` +
        `<span>${countChapterCards(chapter)}</span>`;
      chapterButton.addEventListener("click", () => {
        const node = document.getElementById(chapter.id);
        if (!node) return;
        setChapterOpen(node, true);
        node.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      chapterNav.appendChild(chapterButton);
    });

    allThemes.forEach(({ theme }) => {
      const button = document.createElement("button");
      button.className = "theme-nav__item";
      button.type = "button";
      button.dataset.theme = theme.id;
      button.innerHTML =
        `<span>${theme.title.replace(/^[一二三四五六七八九十]+、/, "")}</span>` +
        `<small>${theme.cards.length}</small>`;
      button.addEventListener("click", () => {
        const themeNode = document.querySelector(`[data-theme="${theme.id}"]`);
        if (!themeNode) return;
        const chapter = themeNode.closest(".chapter");
        if (chapter) setChapterOpen(chapter, true);
        state.activeTheme = theme.id;
        updateActiveTheme();
        themeNode.scrollIntoView({ behavior: "smooth", block: "start" });
      });
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

    chapterRoot.querySelectorAll(".chapter").forEach((chapter) => {
      setChapterOpen(chapter, true, false);
    });

    chapterRoot.querySelectorAll(".chapter-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const chapter = button.closest(".chapter");
        setChapterOpen(chapter, !chapter.classList.contains("is-open"));
      });
    });

    chapterRoot.querySelectorAll(".mastery-button").forEach((button) => {
      button.addEventListener("click", () => toggleMastery(button.dataset.card));
    });

    updateResultCount(allCards.length);
  }

  function renderChapter(chapter) {
    const total = countChapterCards(chapter);
    return `
      <section class="chapter is-open" id="${chapter.id}" data-chapter="${chapter.id}" data-accent="${chapter.accent}">
        <button class="chapter-toggle" type="button" aria-expanded="true" aria-controls="${chapter.id}-panel">
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
        <div class="chapter-panel" id="${chapter.id}-panel">
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
            <p class="theme-block__question">${theme.subtitle}</p>
            <h3>${theme.title}</h3>
            <p>${theme.summary}</p>
          </div>
          <span class="theme-block__count">${theme.cards.length} 项</span>
        </div>
        <div class="knowledge-grid">
          ${theme.cards.map((card) => renderCard(chapter, theme, card)).join("")}
        </div>
      </section>
    `;
  }

  function renderCard(chapter, theme, card) {
    const type = TYPE_META[card.type] ? card.type : "definition";
    const meta = TYPE_META[type];
    const searchText = normalizeSearchText(
      [
        chapter.title,
        theme.title,
        theme.subtitle,
        card.title,
        meta.filter,
        ...(card.body || []),
        ...(card.bullets || []),
        card.note || ""
      ].join(" ")
    );

    return `
      <article class="knowledge-card" id="${card.id}" data-card="${card.id}" data-type="${type}" data-search="${escapeAttribute(searchText)}">
        <div class="knowledge-card__head">
          <span class="knowledge-type">${meta.label}</span>
          <h4>${card.title}</h4>
        </div>
        <div class="knowledge-body">
          ${(card.body || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
          ${card.bullets ? `
            <ul class="knowledge-bullets">
              ${card.bullets.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          ` : ""}
          ${card.note ? `<div class="card-callout">${card.note}</div>` : ""}
        </div>
        <button class="mastery-button" type="button" data-card="${card.id}" aria-pressed="false">标记掌握</button>
      </article>
    `;
  }

  function setChapterOpen(chapter, open, persist = true) {
    if (!chapter) return;
    chapter.classList.toggle("is-open", open);
    const toggle = chapter.querySelector(".chapter-toggle");
    const panel = chapter.querySelector(".chapter-panel");
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    if (panel) panel.hidden = !open;

    if (open && persist) {
      localStorage.setItem(STORAGE_KEYS.openChapter, chapter.dataset.chapter);
    } else if (!open) {
      localStorage.removeItem(STORAGE_KEYS.openChapter);
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
          const matchesType =
            state.type === "all" || card.dataset.type === state.type;
          const matchesQuery =
            !state.query || card.dataset.search.includes(state.query);
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
  }

  function updateResultCount(count) {
    const typeText =
      state.type === "all" ? "全部类型" : TYPE_META[state.type].filter;
    const queryText = state.query ? ` · “${state.query}”` : "";
    resultCount.textContent = `${count} 个结果 · ${typeText}${queryText}`;
  }

  function updateActiveTheme() {
    chapterNav.querySelectorAll(".theme-nav__item").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.theme === state.activeTheme);
    });
  }

  function countChapterCards(chapter) {
    return chapter.themes.reduce((sum, theme) => sum + theme.cards.length, 0);
  }

  function normalizeSearchText(value) {
    return value.replace(/\s+/g, " ").toLowerCase();
  }

  function escapeAttribute(value) {
    return String(value)
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
