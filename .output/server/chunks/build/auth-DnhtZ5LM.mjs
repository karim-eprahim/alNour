import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeoMeta } from './composables-puMHkxAm.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import '@lucide/vue';
import '@vueuse/core';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      titleTemplate: "%s | Al Nour"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4" }, _attrs))}><div class="absolute inset-0 overflow-hidden pointer-events-none"><div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div><div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div></div><div class="relative w-full max-w-sm"><div class="mb-8 text-center"><div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20"><span class="text-lg font-bold text-primary-foreground">N</span></div><h1 class="text-xl font-semibold tracking-tight">Al Nour Charcoal</h1><p class="mt-1 text-sm text-muted-foreground">Enterprise Management System</p></div><div class="rounded-xl border bg-card p-6 shadow-sm">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><p class="mt-6 text-center text-xs text-muted-foreground"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Al Nour Charcoal. All rights reserved. </p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-DnhtZ5LM.mjs.map
