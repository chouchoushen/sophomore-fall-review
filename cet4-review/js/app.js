(function () {
  "use strict";

  const DATA = window.CET4_DATA;
  const EXAMS = window.CET4_EXAMS || [];
  const AUDIO_TIMINGS = window.CET4_AUDIO_TIMINGS || {};
  const AUDIO_CACHE_VERSION = "20261113-natural-examples";
  const EXTRA_VOCABULARY = window.CET4_EXTRA_VOCABULARY || [];
  const WORD_BANK = window.CET4_WORD_BANK || [];
  const EXAMPLE_OVERRIDES = window.CET4_EXAMPLE_OVERRIDES || {};
  const RELATION_OVERRIDES = window.CET4_RELATION_OVERRIDES || {};
  const MEMORY_DATA = window.CET4_MEMORY_DATA || {};
  const WORD_LEXICON = window.CET4_WORD_LEXICON || {};
  if (!DATA) throw new Error("CET-4 content data was not loaded.");

  DATA.vocabulary.push(...EXTRA_VOCABULARY);
  const CORE_WORD_KEYS = new Set(DATA.vocabulary.map((item) => item.word));
  DATA.vocabulary.forEach((item) => {
    item.isCore = true;
  });

  DATA.vocabulary.push(
    ...WORD_BANK.filter(([word]) => !CORE_WORD_KEYS.has(word)).map(
      ([
        word,
        meaning,
        partText,
        topic,
        collocations = [],
        ipa = "",
        example = "",
        exampleZh = "",
        exampleKind = "sentence",
        synonyms = [],
        similar = [],
        forms = {},
        memory = null
      ]) => ({
        word,
        ipa,
        part: String(partText).split(/\s+/).filter(Boolean),
        level: "四级扩展",
        meaning: compactMeaning(meaning),
        topic: topic || "综合表达",
        synonyms,
        similar,
        forms,
        memory,
        example: EXAMPLE_OVERRIDES[word]?.[0] || example,
        exampleZh: EXAMPLE_OVERRIDES[word]?.[1] || exampleZh,
        exampleKind: EXAMPLE_OVERRIDES[word]?.[2] || exampleKind,
        collocations,
        isCore: false
      })
    )
  );
  DATA.vocabulary.forEach((item) => {
    item.exampleKind = item.exampleKind || "sentence";
    item.memory = MEMORY_DATA[item.word] || item.memory || {
      type: "context",
      collocations: item.collocations || []
    };
    if (!item.similar?.length && RELATION_OVERRIDES[item.word]?.similar?.length) {
      item.similar = RELATION_OVERRIDES[item.word].similar;
    }
  });

  const WORD_KEY = "cet4-review.mastered.v1";
  const DAILY_WORD_HISTORY_KEY = "cet4-review.daily-100-history.v1";
  const DAILY_WORD_COUNT = 100;
  const DAILY_REVIEW_COUNT = 6;
  const SPELLING_GROUP_SIZE = 10;
  const DAILY_SELECTION_VERSION = 2;
  const DAILY_REVIEW_POSITIONS = [9, 24, 39, 54, 69, 84];
  const wordMap = new Map(DATA.vocabulary.map((item) => [item.word, item]));
  const globalFormToWord = buildGlobalFormMap();
  const ASSOCIATION_MEMORY = {
    thread: "through（通过）+ read（阅读）：通过阅读理清“思路” = 线、脉络、思路",
    classroom: "class（班级、课堂）+ room（房间）：上课的房间 = 教室",
    breakfast: "break（打破）+ fast（禁食）：打破一夜的禁食 = 早餐",
    weekend: "week（星期）+ end（末尾）：一周的末尾 = 周末",
    notebook: "note（笔记）+ book（本子）：记笔记的本子 = 笔记本",
    sunlight: "sun（太阳）+ light（光）：太阳发出的光 = 日光"
  };
  let dailyWordHistory = readJson(DAILY_WORD_HISTORY_KEY, {});
  let wordDailyEditions = new Map();
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
    "学习",
    "心情",
    "工作",
    "交流",
    "变化",
    "社会",
    "建筑与空间",
    "环境",
    "科技与创新",
    "效率"
  ];
  const WORD_TOPICS = {
    allocate: "工作",
    anticipate: "心情",
    assess: "学习",
    compensate: "社会",
    conserve: "环境",
    crucial: "心情",
    decline: "变化",
    demonstrate: "交流",
    derive: "学习",
    diminish: "变化",
    encounter: "社会",
    enhance: "变化",
    evaluate: "学习",
    facilitate: "工作",
    generate: "环境",
    hesitate: "心情",
    illustrate: "交流",
    impose: "社会",
    indicate: "交流",
    inevitable: "心情",
    interpret: "学习",
    maintain: "建筑与空间",
    modify: "建筑与空间",
    obtain: "工作",
    participate: "社会",
    perceive: "学习",
    persist: "心情",
    preserve: "建筑与空间",
    prohibit: "社会",
    retain: "学习",
    reveal: "交流",
    sustain: "环境",
    transform: "建筑与空间",
    vary: "变化",
    efficient: "效率",
    essential: "心情",
    flexible: "变化",
    significant: "交流",
    accessible: "建筑与空间",
    prioritize: "工作",
    consume: "环境",
    effective: "效率",
    increasingly: "效率",
    ultimately: "效率",
    effectively: "效率",
    readily: "心情"
  };
  let articleOffset = 0;
  let dailyReadingExam = null;
  let dailyListeningExam = null;
  let wordQuery = "";
  let wordPos = "all";
  let wordMemory = "all";
  let activeDay = 0;
  let activeDailyDateKey = null;
  let dailyWordGroupMode = "part";
  let currentDailyWordEntries = [];
  let spellingSession = null;
  let spellingAdvanceTimer = 0;
  let spellingSpeechTimer = 0;
  let visibleWordCount = 0;
  let quickWordResults = [];
  let quickWordActiveIndex = 0;
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
  activeDailyDateKey = dateKey;
  ensureDailyWordSet(now);
  rebuildWordDailyEditionMap();

  renderDailyArticle();
  renderWordList();
  queueMicrotask(renderRootGlossary);
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
    document.getElementById("articleTitle").innerHTML = linkifyEnglishWords(article.title);
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

    document.querySelectorAll("#articleWords [data-word]").forEach((button) => {
      button.addEventListener("click", () => openWord(button.dataset.word));
    });
    renderDailyEditions();
    renderDailyReviewWords();
  }

  function ensureDailyWordSet(date) {
    const currentKey = dateToKey(date);
    const keys = [...new Set([...Object.keys(dailyWordHistory), currentKey])].sort();
    const learnedBeforeToday = new Set();
    let changed = false;

    keys.forEach((key) => {
      const stored = dailyWordHistory[key];
      const editionDate = dateFromKey(key) || date;
      const seed = Number.isFinite(stored?.seed)
        ? stored.seed
        : Math.floor(
            Date.UTC(
              editionDate.getFullYear(),
              editionDate.getMonth(),
              editionDate.getDate()
            ) / 86400000
          );
      const article =
        DATA.articles.find((item) => item.id === stored?.articleId) ||
        DATA.articles[seed % DATA.articles.length];
      const focusTopic =
        stored?.focusTopic || TOPIC_ORDER[seed % TOPIC_ORDER.length];

      if (
        stored?.selectionVersion === DAILY_SELECTION_VERSION &&
        Array.isArray(stored.newWords) &&
        Array.isArray(stored.reviewWords) &&
        Array.isArray(stored.words) &&
        new Set(stored.words).size === stored.words.length
      ) {
        stored.newWords.forEach((word) => learnedBeforeToday.add(word));
        return;
      }

      const reviewWords =
        learnedBeforeToday.size > 0
          ? pickDailyWords(
              [...learnedBeforeToday],
              seed + 701,
              DAILY_REVIEW_COUNT
            )
          : [];
      const newWords = pickDailyWords(
        DATA.vocabulary
          .filter((item) => !learnedBeforeToday.has(item.word))
          .map((item) => item.word),
        seed + 97,
        DAILY_WORD_COUNT - reviewWords.length
      );
      const fallbackWords =
        newWords.length + reviewWords.length < DAILY_WORD_COUNT
          ? pickDailyWords(
              DATA.vocabulary
                .map((item) => item.word)
                .filter(
                  (word) =>
                    !newWords.includes(word) && !reviewWords.includes(word)
                ),
              seed + 1301,
              DAILY_WORD_COUNT - newWords.length - reviewWords.length
            )
          : [];

      dailyWordHistory[key] = {
        date: key,
        seed,
        focusTopic,
        articleId: article.id,
        newWords,
        reviewWords,
        fallbackWords,
        words: interleaveReviewWords(
          [...newWords, ...fallbackWords],
          reviewWords
        ),
        selectionVersion: DAILY_SELECTION_VERSION
      };
      newWords.forEach((word) => learnedBeforeToday.add(word));
      changed = true;
    });

    if (changed || !dailyWordHistory[currentKey]) {
      localStorage.setItem(
        DAILY_WORD_HISTORY_KEY,
        JSON.stringify(dailyWordHistory)
      );
    }
    return dailyWordHistory[currentKey];
  }

  function dateToKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function compactMeaning(value) {
    const seen = new Set();
    return String(value)
      .split(/[；;]/)
      .flatMap((part) => part.split(/[，,]/))
      .map((part) => part.trim())
      .filter((part) => {
        if (!part || seen.has(part)) return false;
        seen.add(part);
        return true;
      })
      .join("；");
  }

  const ROOT_GLOSSARY_GROUPS = [
    {
      title: "高频前缀",
      items: [
        ["pre-", "在前；预先", "predict, prepare, prevent"],
        ["pro-", "向前；向外；支持", "proceed, promote, project"],
        ["re-", "再次；返回", "review, recover, reproduce"],
        ["in- / im-", "不；进入", "incorrect, import, involve"],
        ["un-", "不；相反动作", "unable, unfair, undo"],
        ["dis-", "分开；否定", "disagree, disconnect, display"],
        ["sub-", "在下；次级", "submarine, subway, subtitle"],
        ["inter-", "之间；相互", "international, interact, interrupt"],
        ["trans-", "横跨；转变", "transport, transform, translate"],
        ["ex-", "向外；以前", "export, exclude, former"],
        ["co- / com- / con-", "共同；加强", "cooperate, combine, connect"],
        ["de-", "向下；去除；相反", "decline, decrease, decode"],
        ["over- / under-", "过度、在上；不足、在下", "overload, overlook, underground"],
        ["auto-", "自己；自动", "automatic, automobile, autonomy"],
        ["bio- / geo- / tele-", "生命；地球；远", "biology, geography, telephone"],
        ["anti- / mis-", "反对；错误", "antibody, antiwar, misunderstand"]
      ]
    },
    {
      title: "高频后缀",
      items: [
        ["-ment", "名词：行为、结果或状态", "management, development, agreement"],
        ["-tion / -sion", "名词：行为或结果", "education, information, decision"],
        ["-ness", "名词：性质或状态", "happiness, weakness, awareness"],
        ["-ity", "名词：性质或状态", "ability, activity, security"],
        ["-ance / -ence", "名词：状态或行为", "importance, difference, confidence"],
        ["-able / -ible", "形容词：能够……的", "acceptable, flexible, visible"],
        ["-ful / -less", "形容词：充满……；没有……", "useful, careful, careless"],
        ["-ous / -ive", "形容词：具有……性质", "famous, dangerous, creative"],
        ["-al / -ic", "形容词：与……有关的", "natural, cultural, academic"],
        ["-ly", "副词：以……方式", "quickly, carefully, finally"],
        ["-er / -or / -ist", "名词：人、工具或执行者", "teacher, actor, scientist"],
        ["-ize / -ise / -en", "动词：使……；变成……", "modernize, organize, strengthen"],
        ["-ship / -hood", "名词：身份或关系", "friendship, leadership, childhood"],
        ["-ward / -wise", "方向或方式", "forward, backward, likewise"]
      ]
    },
    {
      title: "核心词根",
      items: [
        ["spec / spect / spic", "看；观察；向下偷看后引申为怀疑", "inspect, respect, suspect, suspicious"],
        ["vis / vid", "看；看见", "visible, vision, video, evidence"],
        ["dict", "说；断言", "predict, dictate, dictionary"],
        ["duc / duct", "引导；带来", "produce, introduce, conduct"],
        ["port", "携带；运送", "transport, import, portable"],
        ["form", "形状；形成", "inform, transform, uniform"],
        ["mit / miss", "送；放出", "submit, transmit, mission"],
        ["cap / cept / ceive", "拿；抓；接受", "capture, accept, receive"],
        ["tain / ten", "握住；保持", "maintain, contain, retain"],
        ["pos / pon", "放置", "compose, deposit, component"],
        ["tract", "拉；拖", "attract, contract, tractor"],
        ["ject", "投；扔", "project, reject, inject"],
        ["struct", "建造", "construct, structure, instruct"],
        ["scrib / script", "写", "describe, subscribe, manuscript"],
        ["graph", "写；记录", "paragraph, photograph, biography"],
        ["mot / mov", "移动", "motion, motivate, remove"],
        ["vert / vers", "转", "convert, reverse, version"],
        ["log", "词；语言；道理", "logic, dialogue, biology"],
        ["phon", "声音", "telephone, microphone, symphony"]
      ]
    }
  ];

  const CHINESE_SIMILAR_GROUPS = [
    ["提高", "提升", "增加", "改善", "加强", "增强", "促进", "上升"],
    ["减少", "降低", "下降", "削减", "减弱", "缩小"],
    ["重要", "关键", "必要", "核心", "重大", "主要"],
    ["改变", "变化", "转变", "调整", "修改", "转换"],
    ["认为", "相信", "觉得", "主张", "假定", "判断"],
    ["获得", "得到", "取得", "获取", "赢得", "取得"],
    ["帮助", "协助", "支持", "促进", "有利于"],
    ["困难", "难题", "挑战", "障碍", "问题", "艰难"],
    ["快速", "迅速", "加快", "速度", "立即", "很快"],
    ["开心", "高兴", "快乐", "愉快", "满意", "幸福"],
    ["生气", "愤怒", "恼火", "不满", "发怒"],
    ["担心", "焦虑", "忧虑", "不安", "害怕"],
    ["漂亮", "美丽", "好看", "优美", "迷人"],
    ["普通", "一般", "常见", "平常", "常规"],
    ["明显", "清楚", "显著", "突出", "显而易见"],
    ["使用", "利用", "采用", "应用", "运用"],
    ["保持", "维持", "保存", "保留", "持续"],
    ["建立", "创建", "设立", "成立", "构建"],
    ["影响", "作用", "效果", "冲击", "改变"],
    ["选择", "挑选", "决定", "选项", "替代"]
  ];

  function formEntries(item) {
    return Object.entries(item.forms || {}).flatMap(([pos, values]) =>
      (Array.isArray(values) ? values : [values])
        .filter(Boolean)
        .map((value) => ({
          pos,
          label: partLabel(pos),
          value: String(value)
        }))
    );
  }

  function compactList(values, count = 2) {
    return (values || []).filter(Boolean).slice(0, count);
  }

  function renderDailyWordHints(item) {
    const forms = formEntries(item)
      .slice(0, 2)
      .map((form) => `${form.label} ${form.value}`);
    const memoryMark =
      item.memory?.type === "roots"
        ? "根"
        : item.memory?.type === "collocation"
          ? "记"
          : "境";
    const groups = [
      {
        label: memoryMark,
        values: [item.memory?.breakdown || item.memory?.note || ""]
      },
      { label: "形", values: compactList(item.similar, 2) },
      { label: "搭", values: compactList(item.collocations, 2) },
      { label: "变", values: forms }
    ];
    if (!groups.some((group) => group.values.length)) return "";
    return `
      <span class="daily-word-item__hints">
        ${groups.map((group) => `
          <span title="${escapeAttr(group.values.join(" · ") || "暂无")}">
            <b>${group.label}</b>${escapeHtml(group.values.join(" · ") || "—")}
          </span>
        `).join("")}
      </span>
    `;
  }

  function renderRootGlossary() {
    const root = document.getElementById("rootGlossaryContent");
    if (!root) return;
    root.innerHTML = ROOT_GLOSSARY_GROUPS.map((group) => `
      <section class="root-glossary__group">
        <h3>${escapeHtml(group.title)}</h3>
        <div class="root-glossary__grid">
          ${group.items.map(([form, meaning, examples]) => `
            <article>
              <strong>${escapeHtml(form)}</strong>
              <span>${escapeHtml(meaning)}</span>
              <small>${escapeHtml(examples)}</small>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  function normalizeEnglishQuery(value) {
    return String(value || "").toLowerCase().replace(/[^a-z -]/g, "").trim();
  }

  function searchVocabulary(query) {
    const value = String(query || "").trim();
    if (!value) return [];
    const isChinese = /[\u3400-\u9fff]/.test(value);
    const english = normalizeEnglishQuery(value);
    const groups = isChinese
      ? CHINESE_SIMILAR_GROUPS.filter((group) =>
          group.some((term) => term.includes(value) || value.includes(term))
        )
      : [];
    const queryChars = [...new Set(
      value.replace(/[的地得了和与或是一在有为；，、]/g, "")
    )];

    return DATA.vocabulary
      .map((item) => {
        let score = 0;
        if (isChinese) {
          const meaning = `${item.meaning} ${(item.synonyms || []).join(" ")}`;
          if (meaning.includes(value)) score += 1200;
          for (const group of groups) {
            for (const term of group) {
              if (meaning.includes(term)) score += 260;
            }
          }
          const shared = queryChars.filter((char) => meaning.includes(char)).length;
          score += shared * 35;
          if (score) score -= Math.max(0, item.meaning.length - 18);
        } else {
          const word = item.word.toLowerCase();
          if (word === english) score = 5000;
          else if (word.startsWith(english)) score = 3200 - word.length;
          else if (word.includes(english)) score = 2400 - word.indexOf(english) * 10;
          else if (english.length >= 2) {
            let index = 0;
            for (const char of word) {
              if (char === english[index]) index += 1;
              if (index === english.length) break;
            }
            if (index === english.length) score = 900 - word.length;
          }
        }
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort(
        (left, right) =>
          right.score - left.score ||
          left.item.word.length - right.item.word.length ||
          left.item.word.localeCompare(right.item.word)
      )
      .slice(0, 8)
      .map((entry) => entry.item);
  }

  function renderQuickWordResults(query) {
    const root = document.getElementById("dailyWordQuickResults");
    quickWordResults = searchVocabulary(query);
    quickWordActiveIndex = 0;
    root.hidden = !query || !quickWordResults.length;
    document.getElementById("dailyWordQuickInput")
      ?.setAttribute("aria-expanded", String(!root.hidden));
    if (!query) {
      root.innerHTML = "";
      document.getElementById("dailyWordQuickInput")
        ?.removeAttribute("aria-activedescendant");
      return;
    }
    if (!quickWordResults.length) {
      root.innerHTML = `<p class="quick-word-empty">没有找到相近单词，试试更短的关键词。</p>`;
      return;
    }
    root.innerHTML = quickWordResults.map((item, index) => `
      <button class="quick-word-result${index === 0 ? " is-active" : ""}"
        type="button" role="option" aria-selected="${index === 0}"
        data-quick-word="${escapeAttr(item.word)}" id="quick-word-option-${index}">
        <span><strong>${escapeHtml(item.word)}</strong><small>${escapeHtml(item.ipa || "")}</small></span>
        <em>${escapeHtml(item.part.join(" "))} ${escapeHtml(item.meaning)}</em>
      </button>
    `).join("");
  }

  function moveQuickWordSelection(direction) {
    if (!quickWordResults.length) return;
    quickWordActiveIndex =
      (quickWordActiveIndex + direction + quickWordResults.length) %
      quickWordResults.length;
    document.querySelectorAll(".quick-word-result").forEach((button, index) => {
      const active = index === quickWordActiveIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    const active = document.getElementById(`quick-word-option-${quickWordActiveIndex}`);
    active?.scrollIntoView({ block: "nearest" });
    document.getElementById("dailyWordQuickInput")
      ?.setAttribute("aria-activedescendant", active?.id || "");
  }

  function closeQuickWordResults(clear = false) {
    const root = document.getElementById("dailyWordQuickResults");
    if (!root) return;
    root.hidden = true;
    document.getElementById("dailyWordQuickInput")
      ?.setAttribute("aria-expanded", "false");
    document.getElementById("dailyWordQuickInput")
      ?.removeAttribute("aria-activedescendant");
    if (clear) {
      const input = document.getElementById("dailyWordQuickInput");
      if (input) input.value = "";
      quickWordResults = [];
    }
  }

  function dateFromKey(key) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  function hashText(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function pickDailyWords(pool, seed, count) {
    return [...new Set(pool)]
      .map((word) => ({ word, order: hashText(`${seed}:${word}`) }))
      .sort(
        (left, right) =>
          left.order - right.order || left.word.localeCompare(right.word)
      )
      .slice(0, Math.max(0, count))
      .map((entry) => entry.word);
  }

  function interleaveReviewWords(newWords, reviewWords) {
    const words = [...newWords];
    reviewWords.forEach((word, index) => {
      const position = Math.min(
        words.length,
        DAILY_REVIEW_POSITIONS[index] ?? words.length
      );
      words.splice(position, 0, word);
    });
    return words;
  }

  function rebuildWordDailyEditionMap() {
    wordDailyEditions = new Map();
    Object.values(dailyWordHistory).forEach((edition) => {
      edition.words.forEach((word) => {
        if (!wordDailyEditions.has(word)) wordDailyEditions.set(word, []);
        if (!wordDailyEditions.get(word).includes(edition.date)) {
          wordDailyEditions.get(word).push(edition.date);
        }
      });
    });
    wordDailyEditions.forEach((dates) => dates.sort().reverse());
  }

  function groupDailyWordEntries(entries, mode) {
    const groups = new Map();
    entries.forEach((entry) => {
      const part = entry.item.part[0] || "其他";
      const topic = WORD_TOPICS[entry.item.word] || entry.item.topic || "其他情景";
      const key = mode === "part" ? part : topic;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    });

    if (mode === "part") {
      return POS_META
        .map((part) => ({
          label: part.label,
          entries: groups.get(part.id) || []
        }))
        .filter((group) => group.entries.length);
    }

    const orderedTopics = [
      ...TOPIC_ORDER,
      ...[...groups.keys()].filter((topic) => !TOPIC_ORDER.includes(topic))
    ];
    return orderedTopics
      .map((topic) => ({
        label: topic,
        entries: groups.get(topic) || []
      }))
      .filter((group) => group.entries.length);
  }

  function renderDailyReviewWords() {
    const root = document.getElementById("dailyVocabReview");
    if (!root) return;

    const editions = Object.values(dailyWordHistory)
      .sort((left, right) => right.date.localeCompare(left.date));
    const edition =
      dailyWordHistory[activeDailyDateKey] ||
      dailyWordHistory[dateKey] ||
      editions[0];
    if (!edition) return;
    activeDailyDateKey = edition.date;
    const article = DATA.articles.find((item) => item.id === edition.articleId);
    const articleWords = new Set(article?.words || []);
    const reviewWords = new Set(edition.reviewWords || []);
    const entries = edition.words.map((wordKey) => {
      const item = wordMap.get(wordKey);
      const kind = reviewWords.has(wordKey)
        ? "历史复习"
        : articleWords.has(wordKey)
          ? "文章关联"
          : "今日新词";
      return { item, kind };
    }).filter(({ item }) => item);
    currentDailyWordEntries = entries;
    const newWordCount = entries.filter(
      ({ kind }) => kind !== "历史复习"
    ).length;
    const reviewWordCount = entries.length - newWordCount;
    const partCounts = {
      "n.": entries.filter(({ item }) => item.part.includes("n.")).length,
      "v.": entries.filter(({ item }) => item.part.includes("v.")).length,
      "adj.": entries.filter(({ item }) => item.part.includes("adj.")).length,
      "adv.": entries.filter(({ item }) => item.part.includes("adv.")).length
    };
    const grouped = groupDailyWordEntries(entries, dailyWordGroupMode);
    const formatDay = (value) => `${value.slice(5, 7)}月${value.slice(8, 10)}日`;
    root.innerHTML = `
      <div class="daily-word-review__head">
        <div>
          <p class="eyebrow">DAILY 100 · ${escapeHtml(edition.date)}</p>
          <h3 id="dailyVocabTitle">${edition.date === dateKey ? "今日 100 词" : `${formatDay(edition.date)} · 100 词`}</h3>
          <p>当天以 ${newWordCount} 个新词为主，并从过去词中安排 ${reviewWordCount} 个间隔复习；同一天不重复。关联文章《${escapeHtml(article?.title || "")}》，情景重点是“${escapeHtml(edition.focusTopic)}”。</p>
        </div>
        <div class="daily-word-review__stats">
          <span><strong>${entries.length}</strong>学习项</span>
          <span><strong>${newWordCount}</strong>今日新词</span>
          <span><strong>${reviewWordCount}</strong>历史复习</span>
          <span><strong>${partCounts["n."]}</strong>名词</span>
          <span><strong>${partCounts["v."]}</strong>动词</span>
          <span><strong>${partCounts["adj."] + partCounts["adv."]}</strong>形/副</span>
        </div>
        <button class="spelling-practice-open" type="button" data-open-spelling>
          ⌨ 拼写本期百词
        </button>
      </div>
      <div class="daily-word-group-modes" role="group" aria-label="百词分类方式">
        <button class="${dailyWordGroupMode === "part" ? "is-active" : ""}" type="button"
          data-daily-group-mode="part" aria-pressed="${dailyWordGroupMode === "part"}">按词性</button>
        <button class="${dailyWordGroupMode === "topic" ? "is-active" : ""}" type="button"
          data-daily-group-mode="topic" aria-pressed="${dailyWordGroupMode === "topic"}">按情景</button>
      </div>
      <div class="daily-word-editions" role="group" aria-label="百词分期册">
        ${editions.map((item) => `
          <button class="daily-word-edition${item.date === edition.date ? " is-active" : ""}${item.date === dateKey ? " is-current" : ""}"
            type="button" data-daily-date="${item.date}" aria-pressed="${item.date === edition.date}">
            <span>${escapeHtml(item.date.slice(5))}</span>
            <strong>${escapeHtml(item.focusTopic)}</strong>
            <em>${item.newWords?.length || 100} 新 · ${item.reviewWords?.length || 0} 复</em>
          </button>
        `).join("")}
      </div>
      <div class="daily-word-groups">
        ${grouped.map((group) => `
          <section class="daily-word-group">
            <div class="daily-word-group__head">
              <h4>${escapeHtml(group.label)}</h4>
              <span>${group.entries.length} 项</span>
            </div>
            <div class="daily-word-grid">
              ${group.entries.map(({ item, kind }) => {
                const memory = MEMORY_META[item.memory?.type || "context"];
                return `
                  <div class="daily-word-item${mastered.has(item.word) ? " is-mastered" : ""}">
                    <button class="daily-word-item__open" type="button"
                      data-daily-word="${escapeAttr(item.word)}"
                      aria-label="查看 ${escapeAttr(item.word)} 的释义和记忆方式">
                      <span class="daily-word-item__main">
                        <strong>${escapeHtml(item.word)}</strong>
                        <small>${item.part.map(escapeHtml).join(" ")} ${escapeHtml(item.meaning)}</small>
                      </span>
                      <span class="daily-word-item__tags">
                        <em>${escapeHtml(kind)}</em>
                        <i class="memory-badge memory-badge--${escapeAttr(item.memory?.type || "context")}">${escapeHtml(memory.short)}</i>
                        ${mastered.has(item.word) ? '<b aria-label="已掌握">✓</b>' : ""}
                      </span>
                      ${renderDailyWordHints(item)}
                    </button>
                    <button class="daily-word-item__audio" type="button"
                      data-word-audio="${escapeAttr(item.word)}"
                      aria-label="朗读单词 ${escapeAttr(item.word)}" title="朗读单词">🔊</button>
                  </div>
                `;
              }).join("")}
            </div>
          </section>
        `).join("")}
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

  function ensureSpellingPanel() {
    let panel = document.getElementById("spellingPractice");
    if (panel) return panel;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="spelling-practice" id="spellingPractice" hidden>
        <section class="spelling-practice__card" role="dialog" aria-modal="true" aria-labelledby="spellingPracticeTitle">
          <button class="spelling-practice__close" type="button" aria-label="关闭拼写练习">×</button>
          <header class="spelling-practice__head">
            <p class="eyebrow">DAILY 100 · SPELLING</p>
            <h2 id="spellingPracticeTitle">今日百词拼写</h2>
            <p id="spellingGroupStatus"></p>
          </header>
          <div class="spelling-practice__progress" aria-hidden="true"><i></i></div>
          <div class="spelling-practice__prompt">
            <span id="spellingPart"></span>
            <strong id="spellingMeaning"></strong>
          </div>
          <button class="spelling-practice__audio" type="button" data-spelling-audio>🔊 再听一次</button>
          <label class="spelling-practice__input">
            <span>输入英文拼写</span>
            <input id="spellingAnswer" type="text" autocomplete="off" autocorrect="off"
              autocapitalize="none" spellcheck="false" inputmode="text">
          </label>
          <button class="spelling-practice__check" type="button">检查拼写</button>
          <div class="spelling-practice__feedback" id="spellingFeedback" role="status" aria-live="polite"></div>
          <p class="spelling-practice__hint">每 10 词一组。拼错后停留在当前词，拼对后该词会在本组末尾再次出现。</p>
        </section>
      </div>
    `);
    panel = document.getElementById("spellingPractice");
    const input = panel.querySelector("#spellingAnswer");
    panel.querySelector(".spelling-practice__close").addEventListener("click", closeSpellingPractice);
    panel.querySelector("[data-spelling-audio]").addEventListener("click", () => {
      const item = currentSpellingItem();
      if (item) playVocabularyAudio(item.word, "word");
    });
    panel.querySelector(".spelling-practice__check").addEventListener("click", checkSpellingAnswer);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        checkSpellingAnswer();
      }
    });
    panel.addEventListener("click", (event) => {
      if (event.target === panel) closeSpellingPractice();
    });
    return panel;
  }

  function openSpellingPractice() {
    const items = currentDailyWordEntries.map(({ item }) => item).filter(Boolean);
    if (!items.length) return;
    if (!spellingSession || spellingSession.key !== activeDailyDateKey) {
      const groups = [];
      for (let index = 0; index < items.length; index += SPELLING_GROUP_SIZE) {
        groups.push(items.slice(index, index + SPELLING_GROUP_SIZE));
      }
      spellingSession = {
        key: activeDailyDateKey,
        groups,
        total: items.length,
        groupIndex: 0,
        queue: [...groups[0]],
        index: 0,
        retryRound: 0,
        nextRetry: new Set(),
        currentHadError: false,
        locked: false,
        complete: false
      };
    }
    const panel = ensureSpellingPanel();
    closeWord();
    panel.hidden = false;
    document.body.classList.add("spelling-open");
    renderSpellingQuestion(true);
  }

  function closeSpellingPractice() {
    const panel = document.getElementById("spellingPractice");
    if (!panel) return;
    window.clearTimeout(spellingAdvanceTimer);
    window.clearTimeout(spellingSpeechTimer);
    spellingAdvanceTimer = 0;
    spellingSpeechTimer = 0;
    panel.hidden = true;
    document.body.classList.remove("spelling-open");
  }

  function currentSpellingItem() {
    if (!spellingSession || spellingSession.complete) return null;
    return spellingSession.queue[spellingSession.index] || null;
  }

  function renderSpellingQuestion(autoSpeak = true) {
    const panel = ensureSpellingPanel();
    const session = spellingSession;
    if (!session || panel.hidden) return;
    if (session.complete) {
      panel.querySelector("#spellingGroupStatus").textContent =
        `已完成 ${session.total} 个单词`;
      panel.querySelector(".spelling-practice__progress i").style.width = "100%";
      panel.querySelector("#spellingPart").textContent = "";
      panel.querySelector("#spellingMeaning").textContent = "今日百词拼写全部完成";
      panel.querySelector("[data-spelling-audio]").hidden = true;
      panel.querySelector(".spelling-practice__input").hidden = true;
      panel.querySelector(".spelling-practice__check").hidden = true;
      panel.querySelector("#spellingFeedback").className = "spelling-practice__feedback is-correct";
      panel.querySelector("#spellingFeedback").textContent = "所有分组和重拼词均已完成。";
      return;
    }
    const item = currentSpellingItem();
    if (!item) {
      advanceSpellingGroup();
      return;
    }
    session.locked = false;
    session.currentHadError = false;
    const groupNumber = session.groupIndex + 1;
    const retryText = session.retryRound
      ? ` · 重拼第 ${session.retryRound} 轮`
      : "";
    panel.querySelector("#spellingGroupStatus").textContent =
      `第 ${groupNumber} / ${session.groups.length} 组 · ` +
      `${session.index + 1} / ${session.queue.length}${retryText}`;
    panel.querySelector(".spelling-practice__progress i").style.width =
      `${session.queue.length ? (session.index / session.queue.length) * 100 : 0}%`;
    panel.querySelector("#spellingPart").textContent =
      item.part.map((part) => part).join(" ");
    panel.querySelector("#spellingMeaning").textContent = item.meaning;
    const input = panel.querySelector("#spellingAnswer");
    const audioButton = panel.querySelector("[data-spelling-audio]");
    input.hidden = false;
    audioButton.hidden = false;
    panel.querySelector(".spelling-practice__input").hidden = false;
    panel.querySelector(".spelling-practice__check").hidden = false;
    input.value = "";
    input.disabled = false;
    input.focus({ preventScroll: true });
    const feedback = panel.querySelector("#spellingFeedback");
    feedback.className = "spelling-practice__feedback";
    feedback.textContent = "";
    if (autoSpeak) {
      window.clearTimeout(spellingSpeechTimer);
      const expected = item.word;
      spellingSpeechTimer = window.setTimeout(() => {
        if (
          currentSpellingItem()?.word === expected &&
          !panel.hidden
        ) {
          playVocabularyAudio(expected, "word");
        }
      }, 180);
    }
  }

  function checkSpellingAnswer() {
    const session = spellingSession;
    const item = currentSpellingItem();
    if (!session || !item || session.locked || session.complete) return;
    const panel = document.getElementById("spellingPractice");
    const input = panel.querySelector("#spellingAnswer");
    const feedback = panel.querySelector("#spellingFeedback");
    const normalize = (value) =>
      String(value || "")
        .trim()
        .toLowerCase()
        .replaceAll("’", "'")
        .replace(/\s+/g, " ");
    if (normalize(input.value) !== normalize(item.word)) {
      session.currentHadError = true;
      feedback.className = "spelling-practice__feedback is-wrong";
      feedback.innerHTML =
        `拼写错误，正确拼写是：<strong>${escapeHtml(item.word)}</strong>`;
      input.focus({ preventScroll: true });
      input.select();
      return;
    }
    if (session.currentHadError) session.nextRetry.add(item.word);
    session.locked = true;
    input.disabled = true;
    feedback.className = "spelling-practice__feedback is-correct";
    feedback.textContent = "拼写正确。";
    window.clearTimeout(spellingAdvanceTimer);
    spellingAdvanceTimer = window.setTimeout(() => {
      session.index += 1;
      if (session.index < session.queue.length) {
        renderSpellingQuestion(true);
        return;
      }
      if (session.nextRetry.size) {
        const retryWords = new Set(session.nextRetry);
        session.nextRetry.clear();
        session.queue = [...retryWords]
          .map((word) => wordMap.get(word))
          .filter(Boolean);
        session.retryRound += 1;
        session.index = 0;
        renderSpellingQuestion(true);
        return;
      }
      advanceSpellingGroup();
    }, 650);
  }

  function advanceSpellingGroup() {
    const session = spellingSession;
    if (!session) return;
    const panel = ensureSpellingPanel();
    if (session.groupIndex + 1 >= session.groups.length) {
      session.complete = true;
      renderSpellingQuestion(false);
      return;
    }
    const feedback = panel.querySelector("#spellingFeedback");
    feedback.className = "spelling-practice__feedback is-correct";
    feedback.textContent = "本组已全部拼对，正在进入下一组。";
    window.clearTimeout(spellingAdvanceTimer);
    spellingAdvanceTimer = window.setTimeout(() => {
      session.groupIndex += 1;
      session.queue = [...session.groups[session.groupIndex]];
      session.index = 0;
      session.retryRound = 0;
      session.nextRetry.clear();
      renderSpellingQuestion(true);
    }, 900);
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
    let audio = useAudio
      ? new Audio(`./audio/${audioKey}.mp3?v=${AUDIO_CACHE_VERSION}`)
      : null;
    if (audio) {
      audio.preload = "metadata";
      audio.autoplay = false;
    }

    toolbar.innerHTML = `
      <div class="reader-toolbar" role="group" aria-label="${escapeAttr(label)}朗读进度">
        <button class="reader-play" type="button">▶ 播放朗读</button>
        <button class="reader-stop" type="button" disabled>停止</button>
        <input class="reader-progress" type="range" min="0" max="${lastIndex}" value="0" step="1"
          aria-label="调整${escapeAttr(label)}阅读进度">
        <output class="reader-position" aria-label="当前朗读到第几个单词">1 / ${tokens.length}</output>
        <span class="reader-audio-tag">${useAudio ? "四级考试声线 · Guy" : "浏览器朗读"}</span>
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

    function updateVisual(index, _shouldScroll = false, showReadingPosition = true) {
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
      const playbackSession = session;
      audio.play().then(() => {
        if (
          playbackSession !== session ||
          mode !== "speaking" ||
          activeReader !== reader
        ) {
          audio.pause();
          return;
        }
        runFrameLoop();
      }).catch(() => {
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
      configureEnglishUtterance(utterance, 0.78);

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
          const playbackSession = session;
          audio.play().then(() => {
            if (
              playbackSession !== session ||
              mode !== "speaking" ||
              activeReader !== reader
            ) {
              audio.pause();
              return;
            }
            runFrameLoop();
          }).catch(() => {
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
          const lookupKey = normalizeLookupKey(match[0]);
          const lookupWord = `<span class="inline-word-link" data-lookup-word="${escapeAttr(lookupKey)}" data-lookup-display="${escapeAttr(match[0])}">${escapeHtml(match[0])}</span>`;
          const marked = wordKey
            ? `<mark data-word="${escapeAttr(wordKey)}">${lookupWord}</mark>`
            : lookupWord;
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

  function normalizeLookupKey(value) {
    return String(value)
      .toLowerCase()
      .replaceAll("’", "'")
      .replace(/^[^a-z]+|[^a-z'-]+$/g, "");
  }

  function buildGlobalFormMap() {
    const formMap = new Map();
    DATA.vocabulary.forEach((item) => {
      formMap.set(item.word.toLowerCase(), item.word);
      Object.values(item.forms || {}).forEach((formValue) => {
        const forms = Array.isArray(formValue) ? formValue : [formValue];
        forms.filter(Boolean).forEach((form) =>
          formMap.set(String(form).toLowerCase(), item.word)
        );
      });
      if ((item.part || []).includes("v.")) {
        inflectedVerbForms(item.word).forEach((form) =>
          formMap.set(form.toLowerCase(), item.word)
        );
      }
    });
    return formMap;
  }

  function lookupCandidates(word) {
    const key = normalizeLookupKey(word);
    const candidates = new Set([key]);
    const irregular = {
      am: "be", is: "be", are: "be", was: "be", were: "be", been: "be",
      has: "have", had: "have", does: "do", did: "do", done: "do",
      went: "go", gone: "go", made: "make", said: "say", saw: "see",
      seen: "see", took: "take", taken: "take", came: "come",
      became: "become", began: "begin", begun: "begin", brought: "bring",
      bought: "buy", thought: "think", found: "find", left: "leave",
      kept: "keep", built: "build", sent: "send", spent: "spend",
      held: "hold", stood: "stand", understood: "understand", felt: "feel",
      met: "meet", paid: "pay", ran: "run", grew: "grow", grown: "grow",
      knew: "know", known: "know", children: "child", men: "man",
      women: "woman", better: "good", best: "good", worse: "bad",
      worst: "bad", chose: "choose", forbidden: "forbid", gave: "give",
      meant: "mean", thrown: "throw", written: "write"
    };
    if (key.endsWith("'s")) candidates.add(key.slice(0, -2));
    if (irregular[key]) candidates.add(irregular[key]);
    const suffixRules = [
      ["ies", ["y"]],
      ["ied", ["y"]],
      ["ing", ["", "e"]],
      ["ed", ["", "e"]],
      ["es", ["", "e"]],
      ["s", [""]],
      ["er", ["", "e"]],
      ["est", ["", "e"]],
      ["ly", [""]],
      ["ally", ["al"]],
      ["ness", [""]],
      ["ment", [""]],
      ["tion", ["t", "te"]],
      ["ation", ["ate"]]
    ];
    suffixRules.forEach(([suffix, replacements]) => {
      if (!key.endsWith(suffix)) return;
      const stem = key.slice(0, -suffix.length);
      replacements.forEach((replacement) => candidates.add(stem + replacement));
    });
    return [...candidates].filter(Boolean);
  }

  function resolveWordLookup(value) {
    const key = normalizeLookupKey(value);
    for (const candidate of lookupCandidates(key)) {
      const directItem = wordMap.get(candidate);
      const mappedWord = globalFormToWord.get(candidate);
      const item = directItem || (mappedWord ? wordMap.get(mappedWord) : null);
      if (item) {
        return {
          queryKey: key,
          baseKey: item.word,
          isForm: key !== item.word.toLowerCase(),
          item,
          ipa: item.ipa,
          meaning: `${item.part.map((part) => part).join(" ")} ${item.meaning}`.trim()
        };
      }
      if (WORD_LEXICON[candidate]) {
        return {
          queryKey: key,
          baseKey: candidate,
          isForm: key !== candidate,
          item: null,
          ipa: "",
          meaning: WORD_LEXICON[candidate]
        };
      }
    }
    return {
      queryKey: key,
      baseKey: key,
      isForm: false,
      item: null,
      ipa: "",
      meaning: "暂未收录独立释义，请结合上下文理解。"
    };
  }

  function linkifyEnglishWords(value, extraClass = "") {
    const source = String(value || "");
    const wordPattern = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;
    let cursor = 0;
    let html = "";
    for (const match of source.matchAll(wordPattern)) {
      html += escapeHtml(source.slice(cursor, match.index));
      const lookupKey = normalizeLookupKey(match[0]);
      html +=
        `<span class="inline-word-link${extraClass ? ` ${extraClass}` : ""}" ` +
        `data-lookup-word="${escapeAttr(lookupKey)}" ` +
        `data-lookup-display="${escapeAttr(match[0])}">${escapeHtml(match[0])}</span>`;
      cursor = match.index + match[0].length;
    }
    return html + escapeHtml(source.slice(cursor));
  }

  function linkifyDrawerWords(root) {
    if (!root) return;
    root.querySelectorAll(
      ".detail-grid dd, .word-memory p, .word-example p, .word-example > span, .word-association, .lookup-only__meaning"
    ).forEach((element) => {
      if (element.dataset.lookupLinked === "true") return;
      element.innerHTML = linkifyEnglishWords(element.textContent, "inline-word-link--drawer");
      element.dataset.lookupLinked = "true";
    });
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
    const accumulatedWords = new Set(wordDailyEditions.keys());
    const visible = DATA.vocabulary.filter((item) => {
      const accumulated = item.isCore || accumulatedWords.has(item.word);
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
      const text = `${item.word} ${item.meaning} ${(item.synonyms || []).join(" ")} ${WORD_TOPICS[item.word] || item.topic || ""} ${memoryText}`.toLowerCase();
      return accumulated && partMatch && memoryMatch && dayMatch && (!query || text.includes(query));
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
          (item) => (WORD_TOPICS[item.word] || item.topic || "交流") === topic
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
              ${item.ipa ? `<span class="word-card__ipa">${escapeHtml(item.ipa)}</span>` : ""}
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
                ${dailyEditions.slice(0, 5).map((day) => `<i title="${escapeAttr(day)}">${escapeHtml(day.slice(5))}</i>`).join("")}
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
          ${item.example ? `<button type="button" data-example-audio="${escapeAttr(item.word)}">▶ 朗读例句</button>` : ""}
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
        <span><strong>${Object.keys(dailyWordHistory).length}</strong>百词天数</span>
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
    hideWordMeaningPopover();
    const memoryType = item.memory?.type || "context";
    const memory = MEMORY_META[memoryType];
    const association = ASSOCIATION_MEMORY[item.word];
    const forms = Object.entries(item.forms || {})
      .filter(([, value]) => value)
      .map(([pos, value]) => {
        const values = (Array.isArray(value) ? value : [value]).filter(Boolean);
        return values.length
          ? `<dt>${partLabel(pos)}</dt><dd>${values.map(escapeHtml).join(" · ")}</dd>`
          : "";
      })
      .join("");
    const derivedRelations = [...new Set([
      ...Object.values(item.forms || {}).flatMap((value) =>
        Array.isArray(value) ? value : [value]
      ),
      ...(item.memory?.family || []),
      ...(item.similar || [])
    ].filter(Boolean).filter((word) =>
      String(word).toLowerCase() !== item.word.toLowerCase()
    ))];
    const synonymRow = item.synonyms?.length
      ? `<dt>近义词</dt><dd>${item.synonyms.map(escapeHtml).join(" · ")}</dd>`
      : derivedRelations.length
        ? `<dt>相关词</dt><dd>${derivedRelations.slice(0, 6).map(escapeHtml).join(" · ")}</dd>`
        : "";
    const similarRow = item.similar?.length
      ? `<dt>形近词</dt><dd>${item.similar.map(escapeHtml).join(" · ")}</dd>`
      : derivedRelations.length
        ? `<dt>词族形式</dt><dd>${derivedRelations.slice(0, 6).map(escapeHtml).join(" · ")}</dd>`
        : "";
    const detailRows = [
      synonymRow,
      similarRow,
      `<dt>百词日期</dt><dd>${(wordDailyEditions.get(item.word) || []).slice(0, 12).map((day) => day.slice(5)).join(" · ") || "尚未进入每日百词"}</dd>`,
      forms
    ].join("");
    const exampleLabel =
      item.exampleKind === "usage"
        ? "真实用法"
        : item.exampleKind === "collocation"
          ? "高频搭配"
        : item.exampleKind === "context"
          ? "语境例句"
          : "CET-4 例句";

    document.getElementById("wordDrawerContent").innerHTML = `
      <article class="word-detail">
        <p class="eyebrow">${item.isCore ? "CET-4 HIGH-FREQUENCY" : "CET-4 EXTENDED BANK"}</p>
        <h2>${escapeHtml(item.word)}</h2>
        <span class="ipa">${item.ipa ? `${escapeHtml(item.ipa)} · ` : ""}${item.part.map(escapeHtml).join(" ")}</span>
        <div class="word-detail__meaning">${escapeHtml(item.meaning)}</div>
        ${association ? `<p class="word-association"><strong>联想助记</strong>${escapeHtml(association)}</p>` : ""}
        <div class="word-memory">
          <span class="memory-badge memory-badge--${escapeAttr(memoryType)}">${escapeHtml(memory.label)}</span>
          ${item.memory?.breakdown ? `<p><strong>构词拆解</strong>${escapeHtml(item.memory.breakdown)}</p>` : ""}
          ${item.memory?.note ? `<p><strong>记忆提示</strong>${escapeHtml(item.memory.note)}</p>` : ""}
          ${item.memory?.family?.length ? `<p><strong>同族词</strong>${item.memory.family.map(escapeHtml).join(" · ")}</p>` : ""}
          ${item.memory?.collocations?.length ? `<p><strong>高频搭配</strong>${item.memory.collocations.map(escapeHtml).join(" · ")}</p>` : ""}
        </div>
        <dl class="detail-grid">
          ${detailRows}
        </dl>
        ${item.example ? `<div class="word-example">
          <strong class="word-example__label">${exampleLabel}</strong>
          <p>${escapeHtml(item.example)}</p>
          ${item.exampleZh ? `<span>${escapeHtml(item.exampleZh)}</span>` : ""}
        </div>` : ""}
        <div class="reading-card__footer">
          <button class="reading-button" type="button" data-drawer-word-audio="${escapeAttr(item.word)}">▶ 朗读单词</button>
          ${item.example ? `<button class="reading-button" type="button" data-drawer-example-audio="${escapeAttr(item.word)}">▶ 朗读例句</button>` : ""}
          <button class="reading-button" type="button" data-master-word="${escapeAttr(item.word)}">
            ${mastered.has(item.word) ? "已掌握" : "标记掌握"}
          </button>
        </div>
      </article>
    `;
    const drawer = document.getElementById("wordDrawer");
    const backdrop = document.getElementById("wordDrawerBackdrop");
    backdrop.hidden = false;
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
    linkifyDrawerWords(drawer);
  }

  function openWordLookup(anchor) {
    const entry = resolveWordLookup(anchor.dataset.lookupWord);
    if (entry.item) {
      openWord(entry.item.word);
      return;
    }
    const display = anchor.dataset.lookupDisplay || entry.queryKey;
    document.getElementById("wordDrawerContent").innerHTML = `
      <article class="word-detail lookup-only">
        <p class="eyebrow">CET-4 FULL-SITE LOOKUP</p>
        <h2>${escapeHtml(display)}</h2>
        <p class="lookup-only__meta">
          ${entry.isForm
            ? `词形还原：${escapeHtml(entry.queryKey)} → ${escapeHtml(entry.baseKey)}`
            : "点击正文任意英文单词后显示的词义"}
        </p>
        <div class="lookup-only__meaning">${escapeHtml(entry.meaning)}</div>
      </article>
    `;
    const drawer = document.getElementById("wordDrawer");
    document.getElementById("wordDrawerBackdrop").hidden = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    linkifyDrawerWords(drawer);
    hideWordMeaningPopover();
  }

  function showWordMeaningPopover(anchor) {
    const entry = resolveWordLookup(anchor.dataset.lookupWord);
    const popover = document.getElementById("wordMeaningPopover");
    const display = anchor.dataset.lookupDisplay || entry.queryKey;
    popover.innerHTML = `
      <div class="word-meaning-popover__head">
        <strong>${escapeHtml(display)}</strong>
        <button type="button" class="word-meaning-popover__audio"
          data-popover-audio="${escapeAttr(display)}"
          data-popover-display="${escapeAttr(display)}"
          aria-label="朗读 ${escapeAttr(display)}">🔊 朗读</button>
      </div>
      <span>${entry.isForm
        ? `${escapeHtml(entry.queryKey)} → ${escapeHtml(entry.baseKey)}`
        : "轻量词义"}</span>
      <p>${escapeHtml(entry.meaning)}</p>
    `;
    popover.hidden = false;
    popover.classList.remove("is-below");
    const rect = anchor.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - popoverRect.width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - popoverRect.width - 12));
    let top = rect.top - popoverRect.height - 10;
    if (top < 8) {
      top = rect.bottom + 10;
      popover.classList.add("is-below");
    }
    const arrowX = Math.max(
      14,
      Math.min(rect.left + rect.width / 2 - left - 5, popoverRect.width - 24)
    );
    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
    popover.style.setProperty("--popover-arrow-x", `${Math.round(arrowX)}px`);
  }

  function hideWordMeaningPopover() {
    const popover = document.getElementById("wordMeaningPopover");
    if (!popover) return;
    popover.hidden = true;
    popover.innerHTML = "";
  }

  function closeWord() {
    const drawer = document.getElementById("wordDrawer");
    const backdrop = document.getElementById("wordDrawerBackdrop");
    hideWordMeaningPopover();
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
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
    document.querySelectorAll(".daily-word-item").forEach((item) => {
      const opener = item.querySelector("[data-daily-word]");
      if (opener?.dataset.dailyWord !== word) return;
      const isMastered = mastered.has(word);
      item.classList.toggle("is-mastered", isMastered);
      const tags = item.querySelector(".daily-word-item__tags");
      let check = tags?.querySelector("b");
      if (isMastered && tags && !check) {
        check = document.createElement("b");
        check.setAttribute("aria-label", "已掌握");
        check.textContent = "✓";
        tags.appendChild(check);
      } else if (!isMastered) {
        check?.remove();
      }
    });
    renderWordBookSummary(visibleWordCount, getWordDays());
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
      <span><strong>今日阅读</strong> · ${escapeHtml(mock.reading.label)} · ${linkifyEnglishWords(mock.reading.reading.title)}</span>
      <span><strong>今日听力</strong> · ${escapeHtml(mock.listening.label)} · ${linkifyEnglishWords(mock.listening.listening.title)}</span>
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
        ${renderExamPanel(mock.reading.reading, "READING", "daily-reading", false, mock.reading.label)}
        ${renderExamPanel(mock.listening.listening, "LISTENING", "daily-listening", true, mock.listening.label)}
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
          label: listening ? `${exam.label || exam.year} 模拟听力原文` : `${exam.label || exam.year} 阅读文章`,
          audioKey: `exam-${exam.mockId || exam.year}-${listening ? "listening" : "reading"}`
        })
      );
    });
  }

  function renderExamPanel(content, type, panelId, listening, examLabel) {
    return `
      <section class="exam-panel" id="${escapeAttr(panelId)}" data-exam-kind="${listening ? "listening" : "reading"}" data-exam-label="${escapeAttr(examLabel)}">
        <div class="exam-panel__head">
          <h3>${linkifyEnglishWords(content.title)}</h3>
          <span class="exam-type">${escapeHtml(examLabel)} · ${type}</span>
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
          : `<p>${index + 1}. ${linkifyEnglishWords(question.prompt)}</p>`}
        ${question.options
          .map(
            (option, optionIndex) => `
              <label class="exam-option">
                <input type="radio" name="${escapeAttr(panelId)}-${index}" value="${optionIndex}">
                <span>${String.fromCharCode(65 + optionIndex)}. ${linkifyEnglishWords(option)}</span>
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
    const quickInput = document.getElementById("dailyWordQuickInput");
    const quickResults = document.getElementById("dailyWordQuickResults");
    const quickClear = document.getElementById("dailyWordQuickClear");
    quickInput.addEventListener("input", () => {
      quickClear.hidden = !quickInput.value.trim();
      renderQuickWordResults(quickInput.value);
    });
    quickInput.addEventListener("focus", () => {
      if (quickInput.value.trim()) renderQuickWordResults(quickInput.value);
    });
    quickInput.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        moveQuickWordSelection(event.key === "ArrowDown" ? 1 : -1);
        return;
      }
      if (event.key === "Enter" && quickWordResults.length) {
        event.preventDefault();
        const item = quickWordResults[quickWordActiveIndex];
        if (item) openWord(item.word);
        closeQuickWordResults();
        quickInput.blur();
        return;
      }
      if (event.key === "Escape") {
        closeQuickWordResults();
      }
    });
    quickClear.addEventListener("click", () => {
      quickClear.hidden = true;
      closeQuickWordResults(true);
      quickInput.focus();
    });
    quickResults.addEventListener("click", (event) => {
      const button = event.target.closest("[data-quick-word]");
      if (!button) return;
      openWord(button.dataset.quickWord);
      closeQuickWordResults();
      quickInput.blur();
    });
    document.addEventListener("click", (event) => {
      if (!document.getElementById("dailyWordQuick").contains(event.target)) {
        closeQuickWordResults();
      }
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
      if (event.target.closest("[data-open-spelling]")) {
        openSpellingPractice();
        return;
      }
      const audioButton = event.target.closest("[data-word-audio]");
      if (audioButton) {
        playVocabularyAudio(audioButton.dataset.wordAudio, "word");
        return;
      }
      const modeButton = event.target.closest("[data-daily-group-mode]");
      if (modeButton) {
        dailyWordGroupMode = modeButton.dataset.dailyGroupMode;
        renderDailyReviewWords();
        return;
      }
      const dateButton = event.target.closest("[data-daily-date]");
      if (dateButton) {
        activeDailyDateKey = dateButton.dataset.dailyDate;
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
    document.addEventListener("click", (event) => {
      const popoverAudio = event.target.closest("[data-popover-audio]");
      if (popoverAudio) {
        event.preventDefault();
        event.stopPropagation();
        playLookupPronunciation(
          popoverAudio.dataset.popoverAudio,
          popoverAudio.dataset.popoverDisplay
        );
        return;
      }
      const anchor = event.target.closest("[data-lookup-word]");
      if (anchor) {
        event.preventDefault();
        event.stopPropagation();
        if (anchor.closest("#wordDrawer")) {
          showWordMeaningPopover(anchor);
        } else {
          openWordLookup(anchor);
        }
        return;
      }
      if (!event.target.closest("#wordMeaningPopover")) {
        hideWordMeaningPopover();
      }
    });
    document.getElementById("wordDrawerClose").addEventListener("click", closeWord);
    document.getElementById("wordDrawerBackdrop").addEventListener("click", closeWord);
    document.getElementById("wordDrawer").addEventListener("click", (event) => {
      if (event.target.id === "wordDrawer") closeWord();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideWordMeaningPopover();
        closeWord();
      }
    });
    window.addEventListener("scroll", hideWordMeaningPopover, {
      passive: true,
      capture: true
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopSpeaking();
    });
    window.addEventListener("pagehide", stopSpeaking);
  }

  function preferredEnglishVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const priorities = [
      /Microsoft.*(Aria|Ava|Jenny|Guy).*Online.*Natural/i,
      /Microsoft.*(Aria|Ava|Jenny|Guy).*Natural/i,
      /Google US English/i,
      /Samantha/i,
      /Microsoft.*English.*United States/i,
      /^en-US$/i
    ];
    for (const pattern of priorities) {
      const voice = voices.find(
        (candidate) =>
          pattern.test(candidate.name) ||
          pattern.test(candidate.voiceURI) ||
          pattern.test(candidate.lang)
      );
      if (voice) return voice;
    }
    return voices.find((candidate) => /^en[-_]/i.test(candidate.lang)) || null;
  }

  function configureEnglishUtterance(utterance, rate) {
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1;
    const voice = preferredEnglishVoice();
    if (voice) utterance.voice = voice;
  }

  function speak(text, rate = 0.78) {
    if (!("speechSynthesis" in window)) {
      window.alert("当前浏览器不支持语音朗读。");
      return;
    }
    activeReader?.stop();
    activeReader = null;
    stopVocabularyAudio();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    configureEnglishUtterance(utterance, rate);
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
    if (!fallback) return;
    const fallbackRate = kind === "word" ? 0.82 : 0.74;
    const fileName = item.word.replace(/[^a-z0-9_-]/gi, "_");
    const source =
      kind === "word"
        ? `./audio/words/${fileName}.mp3?v=${AUDIO_CACHE_VERSION}`
        : `./audio/examples/${fileName}.mp3?v=${AUDIO_CACHE_VERSION}`;
    vocabularyAudio = new Audio(source);
    if (kind === "example") vocabularyAudio.playbackRate = 0.94;
    vocabularyAudio.play().catch(() => {
      vocabularyAudio = null;
      speak(fallback, fallbackRate);
    });
  }

  function playLookupPronunciation(wordKey, display) {
    const exactKey = normalizeLookupKey(display || wordKey);
    const item = wordMap.get(exactKey);
    if (item) {
      playVocabularyAudio(item.word, "word");
      return;
    }
    speak(display || wordKey, 0.82);
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
