import { _ as _sfc_main$1 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$2 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$3 } from './index-B-gxPDkl.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, isRef, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
import '@vueuse/core';
import 'reka-ui';
import 'class-variance-authority';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiLabel = _sfc_main$1;
      const _component_UiInput = _sfc_main$2;
      const _component_UiButton = _sfc_main$3;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="space-y-1"><h2 class="text-lg font-semibold">Sign In</h2><p class="text-sm text-muted-foreground">Enter your credentials to access the system</p></div>`);
      if (unref(auth).error) {
        _push(`<div class="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(auth).error)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2">`);
      _push(ssrRenderComponent(_component_UiLabel, { for: "email" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Email`);
          } else {
            return [
              createTextVNode("Email")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        id: "email",
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        type: "email",
        placeholder: "admin@alnour.com",
        required: "",
        autocomplete: "email"
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(_component_UiLabel, { for: "password" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Password`);
          } else {
            return [
              createTextVNode("Password")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        id: "password",
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        type: "password",
        placeholder: "••••••••",
        required: "",
        autocomplete: "current-password"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "submit",
        class: "w-full",
        disabled: unref(auth).loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(auth).loading) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"${_scopeId}></div> Signing in... </div>`);
            } else {
              _push2(`<span${_scopeId}>Sign In</span>`);
            }
          } else {
            return [
              unref(auth).loading ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex items-center gap-2"
              }, [
                createVNode("div", { class: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
                createTextVNode(" Signing in... ")
              ])) : (openBlock(), createBlock("span", { key: 1 }, "Sign In"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DC1OuE_t.mjs.map
