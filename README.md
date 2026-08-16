# @myflv/dsh-mobile-fix

A pure-CSS overlay plugin for the **dsh web** GUI ([deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)) that polishes narrow/mobile viewports:

1. **Width axis** — narrow screens redefine the layout variables so the message column, composer card, docks and stats line shrink together.
2. **Model trigger** — the composer model chip caps its width by the tool-row container (180/140/128px tiers); on phones the effort label hides and row gaps tighten so the model name gets more room.
3. **Session header** — breadcrumbs shrink and the tablist scrolls horizontally on narrow screens.
4. **Model popover** — split by conversation phase. In a conversation
   (`[data-phase='active']`, composer docked at the bottom) the model menu
   becomes a fixed bottom sheet sitting right above the composer; in a new
   conversation (`[data-phase='hero']`, composer vertically centered) the menu
   stays anchored to the model chip and scrolls internally instead of clipping.

All rules live inside `@media (max-width: …)` / `@container` queries, so **desktop is untouched**.

## Install

```sh
dsh plugin --profile web add @myflv/dsh-mobile-fix
dsh web
```

The bundle patch inserts a browser-plugin row (`dsh.client`, platform `web`); the browser half is served at `/plugins/@myflv/dsh-mobile-fix/client.js`.

## Build

```sh
npm install
npm run build   # emits lib/index.js (node half) + lib/client.js (browser half)
```

## How it works

The browser half injects one `<style>` tag at `apply` time and removes it on unload. Selectors target stable hooks only — `data-*` attributes, ARIA roles, semantic tags — never hashed CSS Module classes, and avoid `:has()` for older mobile WebViews. The bundle follows the client-modules contract: CJS with a top-level `window.__ModuleLoader__.load({ id, factory })` handoff where `id` equals the package name.
