(function () {
  "use strict";

  const SITES = [
    {
      id: "probability",
      name: "概率论",
      href: "./probability-review/",
      total: 90,
      key: "probability-review.mastered.v1"
    },
    {
      id: "analog",
      name: "模拟电子技术",
      href: "./analog-electronics-review/",
      total: 132,
      key: "analog-electronics-review.mastered.v1"
    },
    {
      id: "digital",
      name: "数字电子技术",
      href: "./digital-electronics-review/",
      total: 70,
      key: "digital-electronics-review.mastered.v1"
    },
    {
      id: "physics",
      name: "普通物理学",
      href: "./general-physics-review/",
      total: 71,
      key: "general-physics-review.mastered.v1"
    },
    {
      id: "math",
      name: "数学物理方法",
      href: "./math-physics-methods-review/",
      total: 88,
      key: "math-physics-methods-review.mastered.v1"
    },
    {
      id: "cet4",
      name: "英语四级",
      href: "./cet4-review/",
      total: 46,
      key: "cet4-review.mastered.v1"
    },
    {
      id: "xi",
      name: "习概",
      href: "./xi-general-review/",
      total: 60,
      key: "xi-general-review.mastered.v1"
    }
  ];

  const LAST_VISITED_KEY = "sophomore-fall-review.last-visited.v1";
  const cards = Array.from(document.querySelectorAll(".course-card"));
  const searchInput = document.getElementById("courseSearch");
  const clearSearch = document.getElementById("clearSearch");
  const filterButtons = Array.from(document.querySelectorAll(".filters button"));
  const emptyState = document.getElementById("emptyState");
  const continueButton = document.getElementById("continueButton");
  const resumeButton = document.getElementById("resumeButton");
  const weakestButton = document.getElementById("weakestButton");

  let activeFilter = "all";
  let query = "";
  let progress = readProgress();

  renderWeeklyLabel();
  renderProgress();
  renderResume();
  bindNavigation();
  bindSearch();

  function renderWeeklyLabel() {
    const label = document.getElementById("weeklyUpdateLabel");
    if (!label || typeof window.getQuizWeekInfo !== "function") return;
    const week = window.getQuizWeekInfo();
    label.textContent = `${week.key} 教学周题组`;
  }

  function readProgress() {
    return SITES.map((site) => {
      const saved = readJson(site.key, {});
      const mastered = Object.keys(saved).filter((id) => Boolean(saved[id])).length;
      return {
        ...site,
        mastered: Math.min(mastered, site.total),
        ratio: site.total ? Math.min(mastered / site.total, 1) : 0
      };
    });
  }

  function renderProgress() {
    let totalMastered = 0;
    let totalCards = 0;

    progress.forEach((site) => {
      totalMastered += site.mastered;
      totalCards += site.total;
      const label = document.querySelector(`[data-progress-label="${site.id}"]`);
      const bar = document.querySelector(`[data-progress-bar="${site.id}"]`);
      if (label) label.textContent = `${site.mastered} / ${site.total}`;
      if (bar) bar.style.width = `${site.ratio * 100}%`;
    });

    document.getElementById("totalCards").textContent = totalCards;
    document.getElementById("totalMastered").textContent = totalMastered;
    document.getElementById("totalMasteryBar").style.width =
      `${totalCards ? (totalMastered / totalCards) * 100 : 0}%`;

    const weakest = progress.reduce((result, site) =>
      site.ratio < result.ratio ? site : result
    );
    document.getElementById("weakestTitle").textContent =
      `${weakest.name} · ${Math.round(weakest.ratio * 100)}%`;
    weakestButton.disabled = false;
    weakestButton.dataset.siteId = weakest.id;
  }

  function renderResume() {
    const savedId = localStorage.getItem(LAST_VISITED_KEY);
    const site = SITES.find((item) => item.id === savedId);
    if (!site) return;

    document.getElementById("resumeTitle").textContent = `继续复习 ${site.name}`;
    document.getElementById("resumeText").textContent =
      "最近一次进入的课程已记录，可以从原来的知识主线继续。";
    continueButton.textContent = `继续 ${site.name}`;
    continueButton.dataset.siteId = site.id;
  }

  function bindNavigation() {
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        localStorage.setItem(LAST_VISITED_KEY, card.dataset.site);
      });
    });

    continueButton.addEventListener("click", () => {
      openSite(continueButton.dataset.siteId || "probability");
    });

    resumeButton.addEventListener("click", () => {
      const siteId = continueButton.dataset.siteId;
      if (siteId) {
        openSite(siteId);
        return;
      }
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
    });

    weakestButton.addEventListener("click", () => {
      if (weakestButton.dataset.siteId) openSite(weakestButton.dataset.siteId);
    });
  }

  function openSite(siteId) {
    const site = SITES.find((item) => item.id === siteId);
    if (!site) return;
    localStorage.setItem(LAST_VISITED_KEY, site.id);
    window.location.href = site.href;
  }

  function bindSearch() {
    searchInput.addEventListener("input", () => {
      query = searchInput.value.trim().toLowerCase();
      clearSearch.hidden = query.length === 0;
      applyFilters();
    });

    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      query = "";
      clearSearch.hidden = true;
      searchInput.focus();
      applyFilters();
    });

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        applyFilters();
      });
    });
  }

  function applyFilters() {
    let visible = 0;
    cards.forEach((card) => {
      const categoryMatches =
        activeFilter === "all" || card.dataset.category === activeFilter;
      const queryMatches =
        !query || card.dataset.search.toLowerCase().includes(query);
      card.hidden = !(categoryMatches && queryMatches);
      if (!card.hidden) visible += 1;
    });
    emptyState.hidden = visible !== 0;
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }
})();
