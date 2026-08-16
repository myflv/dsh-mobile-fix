var module={exports:{}};var exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var STYLES = `
/* 1) Narrow width axis: override the layout variables declared on the
      element carrying [data-phase] (ConversationRoot); !important wins over
      the CSS Module declaration on the same element and children inherit. */
@media (max-width: 700px) {
  [data-phase] {
    --dsh-chat-content-width: 100% !important;
    --dsh-composer-card-max-width: 100% !important;
    --dsh-composer-side-clearance: 10px !important;
  }
}

/* 2) Model trigger: the composer tool row is an anonymous size container
      (PermissionSelect already collapses via @container). Cap the model chip
      by row width; on phones also tighten row gaps and hide the effort label
      (the popover still offers efforts). Structure: span 1 = model name,
      span 2 = effort, last = chevron. */
[data-composer-card] button[aria-haspopup='menu'] > span:first-child {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@container (max-width: 560px) and (min-width: 461px) {
  [data-composer-card] button[aria-haspopup='menu'] { max-width: 180px; }
}
@container (max-width: 460px) and (min-width: 361px) {
  [data-composer-card] button[aria-haspopup='menu'] { max-width: 140px; }
}
@container (max-width: 360px) {
  [data-composer-card] > div:last-child { gap: 8px; }
  [data-composer-card] > div:last-child > div:first-child { gap: 10px; }
  [data-composer-card] > div:last-child > div:nth-child(2) { gap: 8px; }
  [data-composer-card] button[aria-haspopup='menu'] > span:nth-child(2) { display: none; }
  [data-composer-card] button[aria-haspopup='menu'] { max-width: 128px; }
}

/* 3) Session header on narrow screens: allow the breadcrumb nav to shrink
      and the tablist to scroll horizontally. */
@media (max-width: 700px) {
  [data-phase] nav { min-width: 0; }
  [data-phase] [role='tablist'] {
    gap: 18px;
    overflow-x: auto;
  }
}

/* 4) Model popover on narrow screens, split by conversation phase:
   - Conversation detail ([data-phase='active']): the composer seat is sticky
     at the viewport bottom, so a fixed bottom sheet lands right above the
     composer \u2014 anchored, feels native.
   - New conversation ([data-phase='hero']): the composer is vertically
     centered (scrollBody justify-content:center), so a fixed bottom sheet
     would land at the viewport bottom, far away from the model chip. Keep
     the default popover anchored to the trigger (absolute, opens just above
     the model chip) and cap its height so the centered column never clips
     the top of the list; overflow-y:auto scrolls the rest internally. */
@media (max-width: 480px) {
  [data-phase='active'] [data-composer-card] button[aria-haspopup='menu'] + [role='menu'] {
    position: fixed;
    left: 8px;
    right: 8px;
    bottom: calc(var(--dsh-composer-height, 120px) - 76px);
    width: auto;
    max-width: none;
  }

  /* New conversation: composer vertically centered, so keep the default
     popover anchored to the model chip instead of a viewport-bottom sheet;
     cap its height so the centered column never clips the top of the list,
     overflow-y:auto scrolls the rest internally. */
  [data-phase='hero'] [data-composer-card] button[aria-haspopup='menu'] + [role='menu'] {
    max-height: min(360px, calc(50vh - 190px));
    overflow-y: auto;
  }
}
`;
var inject = [];
function apply(ctx) {
  ctx.effect(() => {
    const tag = document.createElement("style");
    tag.dataset.plugin = "@myflv/dsh-mobile-fix";
    tag.dataset.pluginCss = "@myflv/dsh-mobile-fix/mobile.css";
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => {
      tag.remove();
    };
  }, "@myflv/dsh-mobile-fix: inject mobile stylesheet");
}
window.__ModuleLoader__?.load({
  id: "@myflv/dsh-mobile-fix",
  factory: () => ({ inject, apply })
});
//# sourceMappingURL=client.js.map
