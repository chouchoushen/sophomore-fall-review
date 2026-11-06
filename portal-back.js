(function () {
  "use strict";

  if (document.querySelector("[data-portal-return]")) return;

  const style = document.createElement("style");
  style.textContent = `
    .portal-return {
      position: fixed;
      right: max(.9rem, env(safe-area-inset-right));
      bottom: max(.9rem, env(safe-area-inset-bottom));
      z-index: 2147483000;
      display: inline-flex;
      align-items: center;
      gap: .42rem;
      padding: .68rem .9rem;
      border: 1px solid rgba(255, 255, 255, .24);
      border-radius: 999px;
      background: #17324b;
      box-shadow: 0 10px 30px rgba(13, 28, 43, .28);
      color: #fff;
      font: 700 14px/1.2 "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif;
      letter-spacing: .01em;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      transition: transform .16s ease, box-shadow .16s ease, background-color .16s ease;
    }

    .portal-return:hover,
    .portal-return:focus-visible {
      background: #244b6d;
      box-shadow: 0 13px 34px rgba(13, 28, 43, .34);
      color: #fff;
      text-decoration: none;
      transform: translateY(-2px);
    }

    .portal-return:focus-visible {
      outline: 3px solid rgba(231, 189, 103, .9);
      outline-offset: 3px;
    }

    .portal-return__arrow {
      font-size: 17px;
      line-height: 1;
    }

    @media (max-width: 600px) {
      .portal-return {
        right: max(.7rem, env(safe-area-inset-right));
        bottom: max(.7rem, env(safe-area-inset-bottom));
        padding: .62rem .8rem;
        font-size: 13px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .portal-return {
        transition: none;
      }
    }

    @media print {
      .portal-return {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const link = document.createElement("a");
  link.className = "portal-return";
  link.dataset.portalReturn = "";
  link.href = new URL("../", window.location.href).href;
  link.title = "返回大二上复习资料总入口";
  link.setAttribute("aria-label", "返回大二上复习资料总入口");
  link.innerHTML = '<span class="portal-return__arrow" aria-hidden="true">←</span><span>返回总入口</span>';
  document.body.appendChild(link);
})();
