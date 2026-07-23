import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as _sfc_main$6, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { ArrowLeft } from '@lucide/vue';
import 'class-variance-authority';
import 'reka-ui';
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
import '@vueuse/core';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payments",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_PageHeader = PageHeader;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/invoices")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "size-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Payments",
        description: "View all payments on the invoices page"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "py-12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EmptyState, {
                    title: "Payments are tracked per invoice",
                    description: "Go to the invoices page to view and record payments for each invoice",
                    action: "View Invoices",
                    onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/invoices")
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EmptyState, {
                      title: "Payments are tracked per invoice",
                      description: "Go to the invoices page to view and record payments for each invoice",
                      action: "View Invoices",
                      onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/invoices")
                    }, null, 8, ["onAction"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "py-12" }, {
                default: withCtx(() => [
                  createVNode(_component_EmptyState, {
                    title: "Payments are tracked per invoice",
                    description: "Go to the invoices page to view and record payments for each invoice",
                    action: "View Invoices",
                    onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/invoices")
                  }, null, 8, ["onAction"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payments-iSzkQDbC.mjs.map
