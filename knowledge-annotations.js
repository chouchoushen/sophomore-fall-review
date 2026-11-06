(function () {
  "use strict";

  const STORAGE_PREFIX = "review-card-annotations.v1:";
  const TEMPLATE = [
    "概念：",
    "性质：",
    "公式/定理：",
    "例题：",
    "易错点："
  ].join("\n");
  const siteKey = window.location.pathname.split("/").filter(Boolean)[0] || "site";
  const storageKey = `${STORAGE_PREFIX}${siteKey}`;
  let annotations = readAnnotations();
  let scanQueued = false;

  const style = document.createElement("style");
  style.textContent = `
    .knowledge-annotation {
      margin-top: .85rem;
      padding-top: .7rem;
      border-top: 1px dashed var(--rule, var(--line, #d9dee6));
    }

    .knowledge-annotation > summary {
      display: flex;
      align-items: center;
      gap: .45rem;
      color: var(--muted, #66717d);
      cursor: pointer;
      font: 700 .68rem/1.5 var(--sans, "Microsoft YaHei", sans-serif);
      list-style: none;
    }

    .knowledge-annotation > summary::-webkit-details-marker {
      display: none;
    }

    .knowledge-annotation > summary::before {
      content: "✎";
      display: grid;
      place-items: center;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      background: var(--blue-soft, var(--red-soft, #eef2fa));
      color: var(--blue, var(--red, #3157bc));
      font-size: .68rem;
    }

    .knowledge-annotation__state {
      margin-left: auto;
      color: var(--faint, #929ca6);
      font: 500 .58rem var(--mono, Consolas, monospace);
    }

    .knowledge-annotation__body {
      display: grid;
      gap: .5rem;
      margin-top: .55rem;
    }

    .knowledge-annotation textarea {
      width: 100%;
      min-height: 6.2rem;
      padding: .65rem .7rem;
      resize: vertical;
      border: 1px solid var(--rule, var(--line, #d9dee6));
      border-radius: 6px;
      outline: none;
      background: color-mix(in srgb, var(--surface, #fff) 94%, var(--blue-soft, #eef2fa));
      color: var(--ink, inherit);
      font: .74rem/1.75 var(--sans, "Microsoft YaHei", sans-serif);
    }

    .knowledge-annotation textarea:focus {
      border-color: var(--blue, var(--red, #3157bc));
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--blue, var(--red, #3157bc)) 13%, transparent);
    }

    .knowledge-annotation__actions {
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
      align-items: center;
    }

    .knowledge-annotation button {
      padding: .34rem .52rem;
      border: 1px solid var(--rule, var(--line, #d9dee6));
      border-radius: 4px;
      background: var(--surface, #fff);
      color: var(--blue, var(--red, #3157bc));
      cursor: pointer;
      font: 700 .6rem var(--sans, "Microsoft YaHei", sans-serif);
    }

    .knowledge-annotation button:hover {
      border-color: var(--blue, var(--red, #3157bc));
    }

    .knowledge-annotation__hint {
      color: var(--faint, #929ca6);
      font-size: .56rem;
      line-height: 1.55;
    }

    @media (max-width: 600px) {
      .knowledge-annotation textarea {
        min-height: 7.5rem;
        font-size: 16px;
      }
    }

    @media print {
      .knowledge-annotation__actions,
      .knowledge-annotation__hint,
      .knowledge-annotation__state {
        display: none !important;
      }

      .knowledge-annotation textarea {
        min-height: auto;
        overflow: visible;
        border: 0;
        background: transparent;
      }
    }
  `;
  document.head.appendChild(style);

  function readAnnotations() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey));
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }

  function writeAnnotations() {
    localStorage.setItem(storageKey, JSON.stringify(annotations));
  }

  function cardKey(card) {
    return card.id || card.dataset.card || `anonymous-${Array.from(document.querySelectorAll(".knowledge-card")).indexOf(card)}`;
  }

  function mountAnnotation(card) {
    if (card.querySelector(":scope > .knowledge-annotation")) return;
    const key = cardKey(card);
    const value = annotations[key] || "";
    const details = document.createElement("details");
    details.className = "knowledge-annotation";
    details.open = Boolean(value);
    details.innerHTML = `
      <summary>
        <span>我的批注 · 可修改概念、性质、例题等</span>
        <span class="knowledge-annotation__state">${value ? "已有批注" : "未填写"}</span>
      </summary>
      <div class="knowledge-annotation__body">
        <textarea aria-label="当前知识点批注" maxlength="8000"
          placeholder="可直接补充或修改概念、性质、公式、例题、易错点等。输入后自动保存。"></textarea>
        <div class="knowledge-annotation__actions">
          <button type="button" data-annotation-template>插入结构模板</button>
          <button type="button" data-annotation-clear>清空批注</button>
          <span class="knowledge-annotation__hint">仅保存在当前浏览器</span>
        </div>
      </div>
    `;
    const textarea = details.querySelector("textarea");
    const state = details.querySelector(".knowledge-annotation__state");
    const templateButton = details.querySelector("[data-annotation-template]");
    const clearButton = details.querySelector("[data-annotation-clear]");
    let saveTimer = 0;

    textarea.value = value;

    function save(status = "已自动保存") {
      window.clearTimeout(saveTimer);
      const nextValue = textarea.value;
      if (nextValue.trim()) annotations[key] = nextValue;
      else delete annotations[key];
      writeAnnotations();
      details.open = true;
      state.textContent = nextValue.trim() ? status : "未填写";
    }

    function queueSave() {
      state.textContent = "正在保存…";
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => save(), 320);
    }

    textarea.addEventListener("input", queueSave);
    textarea.addEventListener("blur", () => save());
    templateButton.addEventListener("click", () => {
      const current = textarea.value.trim();
      textarea.value = current ? `${current}\n\n${TEMPLATE}` : TEMPLATE;
      details.open = true;
      textarea.focus();
      save("模板已插入");
    });
    clearButton.addEventListener("click", () => {
      if (!textarea.value || !window.confirm("确定清空这条批注吗？")) return;
      textarea.value = "";
      save("已清空");
    });

    card.appendChild(details);
  }

  function scan() {
    scanQueued = false;
    document.querySelectorAll(".knowledge-card").forEach(mountAnnotation);
  }

  function queueScan() {
    if (scanQueued) return;
    scanQueued = true;
    window.requestAnimationFrame(scan);
  }

  scan();
  const observer = new MutationObserver(queueScan);
  observer.observe(document.body, { childList: true, subtree: true });
})();
