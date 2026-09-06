import { _ as __nuxt_component_0 } from './AppShell-24d6oZK5.mjs';
import { defineComponent, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { p as useSeoMeta } from './server.mjs';
import './index-CUpQupPt.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './index-BJ9JiLtz.mjs';
import '@lucide/vue';
import './DropdownMenuTrigger-CfTxy9kg.mjs';
import './Separator-BNaUuv25.mjs';
import './index-DB1fM21W.mjs';
import './NotificationDropdown-Cwb5v5TI.mjs';
import './composables-BEOjn3f_.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
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
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      titleTemplate: "%s | Al Nour"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppShell = __nuxt_component_0;
      _push(ssrRenderComponent(_component_AppShell, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DDhMZs4P.mjs.map
