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
  const SITE_KEYS = [
    "probability-review",
    "analog-electronics-review",
    "digital-electronics-review",
    "general-physics-review",
    "math-physics-methods-review",
    "xi-general-review"
  ];
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const siteKey = SITE_KEYS.find((key) => pathSegments.includes(key)) ||
    pathSegments.at(-1) ||
    "site";
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

    .annotation-sync-button {
      position: fixed;
      right: max(.9rem, env(safe-area-inset-right));
      bottom: max(4.2rem, calc(env(safe-area-inset-bottom) + 4.2rem));
      z-index: 2147482999;
      padding: .62rem .82rem;
      border: 1px solid #b9c9e8;
      border-radius: 999px;
      background: var(--surface, #fff);
      box-shadow: 0 8px 24px rgba(22, 48, 82, .17);
      color: var(--blue, var(--red, #3157bc));
      cursor: pointer;
      font: 700 .68rem/1.2 var(--sans, "Microsoft YaHei", sans-serif);
    }

    .annotation-sync-button:hover {
      border-color: var(--blue, var(--red, #3157bc));
    }

    .annotation-sync-modal {
      position: fixed;
      inset: 0;
      z-index: 2147483010;
      display: grid;
      place-items: center;
      padding: 1rem;
      background: rgba(15, 25, 38, .58);
      backdrop-filter: blur(4px);
    }

    .annotation-sync-modal[hidden] {
      display: none !important;
    }

    .annotation-sync-dialog {
      width: min(42rem, 100%);
      max-height: min(42rem, calc(100vh - 2rem));
      padding: 1rem;
      overflow-y: auto;
      border-radius: 10px;
      background: var(--surface, #fff);
      color: var(--ink, #202936);
      box-shadow: 0 24px 70px rgba(9, 22, 37, .28);
    }

    .annotation-sync-dialog__head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;
      margin-bottom: .65rem;
    }

    .annotation-sync-dialog h3 {
      margin: 0;
      font-size: 1.1rem;
    }

    .annotation-sync-dialog p {
      margin: .35rem 0 0;
      color: var(--muted, #66717d);
      font-size: .68rem;
      line-height: 1.7;
    }

    .annotation-sync-close {
      border: 0;
      background: transparent;
      color: var(--muted, #66717d);
      cursor: pointer;
      font-size: 1.35rem;
    }

    .annotation-sync-code {
      width: 100%;
      min-height: 8rem;
      padding: .65rem;
      resize: vertical;
      border: 1px solid var(--rule, var(--line, #d9dee6));
      border-radius: 6px;
      background: #fbfcfe;
      color: var(--ink, #202936);
      font: .58rem/1.6 var(--mono, Consolas, monospace);
      word-break: break-all;
    }

    .annotation-sync-actions {
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
      margin-top: .6rem;
    }

    .annotation-sync-actions button {
      padding: .42rem .62rem;
      border: 1px solid var(--rule, var(--line, #d9dee6));
      border-radius: 4px;
      background: var(--surface, #fff);
      color: var(--blue, var(--red, #3157bc));
      cursor: pointer;
      font: 700 .64rem var(--sans, "Microsoft YaHei", sans-serif);
    }

    .annotation-sync-status {
      min-height: 1.4rem;
      margin-top: .55rem;
      color: var(--green, #23725b);
      font-size: .64rem;
    }

    @media (max-width: 600px) {
      .knowledge-annotation textarea {
        min-height: 7.5rem;
        font-size: 16px;
      }

      .annotation-sync-button {
        bottom: max(3.9rem, calc(env(safe-area-inset-bottom) + 3.9rem));
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

      .annotation-sync-button,
      .annotation-sync-modal {
        display: none !important;
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

  function readSiteAnnotations(key) {
    try {
      const value = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${key}`));
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }

  function collectAllAnnotations() {
    const sites = {};
    SITE_KEYS.forEach((key) => {
      sites[key] = readSiteAnnotations(key);
    });
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      sites
    };
  }

  function bytesToBase64Url(bytes) {
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary)
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replace(/=+$/, "");
  }

  function base64UrlToBytes(value) {
    const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  }

  async function encodeSyncPayload(payload) {
    const bytes = new TextEncoder().encode(JSON.stringify(payload));
    if (!("CompressionStream" in window)) {
      return `RAW:${bytesToBase64Url(bytes)}`;
    }
    const compressedStream = new Blob([bytes])
      .stream()
      .pipeThrough(new CompressionStream("gzip"));
    const compressed = new Uint8Array(
      await new Response(compressedStream).arrayBuffer()
    );
    return `GZ:${bytesToBase64Url(compressed)}`;
  }

  async function decodeSyncPayload(code) {
    const trimmed = String(code || "").trim();
    const separator = trimmed.indexOf(":");
    if (separator < 0) throw new Error("同步码格式不正确");
    const format = trimmed.slice(0, separator);
    const bytes = base64UrlToBytes(trimmed.slice(separator + 1));
    let decoded = bytes;
    if (format === "GZ") {
      if (!("DecompressionStream" in window)) {
        throw new Error("当前浏览器不支持解压同步码");
      }
      const decompressedStream = new Blob([bytes])
        .stream()
        .pipeThrough(new DecompressionStream("gzip"));
      decoded = new Uint8Array(
        await new Response(decompressedStream).arrayBuffer()
      );
    } else if (format !== "RAW") {
      throw new Error("同步码版本不受支持");
    }
    const payload = JSON.parse(new TextDecoder().decode(decoded));
    if (payload.version !== 1 || !payload.sites) {
      throw new Error("同步码内容无效");
    }
    return payload;
  }

  function importPayload(payload) {
    let imported = 0;
    SITE_KEYS.forEach((key) => {
      const incoming = payload.sites[key] || {};
      if (!incoming || typeof incoming !== "object") return;
      const current = readSiteAnnotations(key);
      const merged = { ...current, ...incoming };
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(merged));
      imported += Object.keys(incoming).length;
    });
    annotations = readAnnotations();
    refreshMountedAnnotations();
    return imported;
  }

  function refreshMountedAnnotations() {
    document
      .querySelectorAll(".knowledge-card > .knowledge-annotation")
      .forEach((details) => {
        const card = details.parentElement;
        const key = cardKey(card);
        const value = annotations[key] || "";
        const textarea = details.querySelector("textarea");
        const state = details.querySelector(".knowledge-annotation__state");
        textarea.value = value;
        details.open = Boolean(value);
        state.textContent = value ? "已有批注" : "未填写";
      });
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
          <span class="knowledge-annotation__hint">本机自动保存；可跨设备同步</span>
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

  function createSyncUi() {
    if (document.querySelector("[data-annotation-sync]")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "annotation-sync-button";
    button.dataset.annotationSync = "";
    button.textContent = "批注同步";
    button.title = "生成或导入六站批注同步码";

    const modal = document.createElement("div");
    modal.className = "annotation-sync-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <section class="annotation-sync-dialog" role="dialog" aria-modal="true" aria-labelledby="annotationSyncTitle">
        <div class="annotation-sync-dialog__head">
          <div>
            <h3 id="annotationSyncTitle">六站批注跨设备同步</h3>
            <p>同步码包含概率论、模电、数电、普物、数理方法和习概，不包含英语四级。同步不经过服务器，请自行把同步码发到手机，再在手机上导入。</p>
          </div>
          <button class="annotation-sync-close" type="button" data-sync-close aria-label="关闭">×</button>
        </div>
        <textarea class="annotation-sync-code" data-sync-code
          placeholder="点击“生成全部批注”，复制同步码；或在手机粘贴电脑发来的同步码后点击“导入”。"></textarea>
        <div class="annotation-sync-actions">
          <button type="button" data-sync-generate>生成全部批注</button>
          <button type="button" data-sync-copy>复制同步码</button>
          <button type="button" data-sync-import>导入同步码</button>
          <button type="button" data-sync-export>下载 JSON</button>
          <button type="button" data-sync-choose>导入 JSON</button>
          <input type="file" accept="application/json,.json" data-sync-file hidden>
        </div>
        <div class="annotation-sync-status" data-sync-status aria-live="polite"></div>
      </section>
    `;

    document.body.append(button, modal);
    const code = modal.querySelector("[data-sync-code]");
    const status = modal.querySelector("[data-sync-status]");
    const fileInput = modal.querySelector("[data-sync-file]");

    function setStatus(message, isError = false) {
      status.textContent = message;
      status.style.color = isError ? "#a33a32" : "";
    }

    function close() {
      modal.hidden = true;
    }

    button.addEventListener("click", () => {
      modal.hidden = false;
      setStatus("");
      code.focus();
    });
    modal.querySelector("[data-sync-close]").addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) close();
    });

    modal.querySelector("[data-sync-generate]").addEventListener("click", async () => {
      setStatus("正在生成同步码…");
      try {
        code.value = await encodeSyncPayload(collectAllAnnotations());
        setStatus("同步码已生成，可复制后发送到手机。");
      } catch (error) {
        setStatus(`生成失败：${error.message}`, true);
      }
    });

    modal.querySelector("[data-sync-copy]").addEventListener("click", async () => {
      if (!code.value) {
        code.value = await encodeSyncPayload(collectAllAnnotations());
      }
      try {
        await navigator.clipboard.writeText(code.value);
        setStatus("同步码已复制到剪贴板。");
      } catch {
        code.focus();
        code.select();
        setStatus("请按 Ctrl+C 或长按复制已选中的同步码。");
      }
    });

    modal.querySelector("[data-sync-import]").addEventListener("click", async () => {
      setStatus("正在导入同步码…");
      try {
        const count = importPayload(await decodeSyncPayload(code.value));
        setStatus(`已导入 ${count} 条批注。`);
      } catch (error) {
        setStatus(`导入失败：${error.message}`, true);
      }
    });

    modal.querySelector("[data-sync-export]").addEventListener("click", () => {
      const payload = collectAllAnnotations();
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `复习批注-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus("批注 JSON 已开始下载。");
    });

    modal.querySelector("[data-sync-choose]").addEventListener("click", () => {
      fileInput.click();
    });
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        const payload = JSON.parse(await file.text());
        if (payload.version !== 1 || !payload.sites) {
          throw new Error("文件内容无效");
        }
        const count = importPayload(payload);
        setStatus(`已从 JSON 导入 ${count} 条批注。`);
      } catch (error) {
        setStatus(`导入失败：${error.message}`, true);
      } finally {
        fileInput.value = "";
      }
    });
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
  createSyncUi();
  const observer = new MutationObserver(queueScan);
  observer.observe(document.body, { childList: true, subtree: true });
})();
