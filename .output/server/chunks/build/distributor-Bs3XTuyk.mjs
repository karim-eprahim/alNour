import { _ as _sfc_main$4 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$5, b as _sfc_main$6, a as _sfc_main$3$1 } from './index-CrCihSp0.mjs';
import { defineComponent, withCtx, renderSlot, ref, mergeProps, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$3, k as useColorMode, u as useAuthStore, a as useRoute, h as cn } from './server.mjs';
import { LogOut, Menu, Sun, Moon, LayoutDashboard, Package, PlusCircle, DollarSign, User, Users, ClipboardList, Receipt, Undo2 } from '@lucide/vue';
import { u as useSeoMeta } from './composables-puMHkxAm.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const useDistributorNavigation = () => {
  const route = useRoute();
  const desktopNav = [
    { title: "Dashboard", icon: LayoutDashboard, to: "/distributor" },
    { title: "My Stock", icon: Package, to: "/distributor/stock" },
    { title: "Customers", icon: Users, to: "/distributor/customers" },
    { title: "Orders", icon: ClipboardList, to: "/distributor/orders" },
    { title: "Invoices", icon: Receipt, to: "/distributor/invoices" },
    { title: "Payments", icon: DollarSign, to: "/distributor/payments" },
    { title: "Returns", icon: Undo2, to: "/distributor/returns" },
    { title: "Profile", icon: User, to: "/distributor/profile" }
  ];
  const mobileNav = [
    { title: "Dashboard", icon: LayoutDashboard, to: "/distributor" },
    { title: "Stock", icon: Package, to: "/distributor/stock" },
    { title: "New Sale", icon: PlusCircle, to: "/distributor/customers" },
    { title: "Payments", icon: DollarSign, to: "/distributor/payments" },
    { title: "Profile", icon: User, to: "/distributor/profile" }
  ];
  function isActive(path) {
    if (!path) return false;
    if (path === "/distributor") return route.path === "/distributor";
    return route.path.startsWith(path);
  }
  return { desktopNav, mobileNav, isActive };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DistributorBottomNav",
  __ssrInlineRender: true,
  setup(__props) {
    const { mobileNav, isActive } = useDistributorNavigation();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t bg-background px-2 pb-safe lg:hidden" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(mobileNav), (item) => {
        _push(`<button class="${ssrRenderClass(unref(cn)(
          "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-colors",
          unref(isActive)(item.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
        ))}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "size-5" }, null), _parent);
        _push(`<span>${ssrInterpolate(item.title)}</span></button>`);
      });
      _push(`<!--]--></nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/distributor/DistributorBottomNav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$2, { __name: "DistributorBottomNav" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DistributorShell",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark, toggle: toggleColorMode } = useColorMode();
    const auth = useAuthStore();
    useRoute();
    const { desktopNav, isActive } = useDistributorNavigation();
    const sidebarOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$4;
      const _component_UiAvatar = _sfc_main$5;
      const _component_UiAvatarImage = _sfc_main$6;
      const _component_UiAvatarFallback = _sfc_main$3$1;
      const _component_DistributorBottomNav = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen bg-background" }, _attrs))}><aside class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar lg:flex"><div class="flex h-14 items-center gap-2 border-b border-sidebar-border px-4"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold"> N </div><span class="font-semibold text-sidebar-foreground">Distributor</span></div><nav class="flex-1 space-y-1 overflow-y-auto p-3"><!--[-->`);
      ssrRenderList(unref(desktopNav), (item) => {
        _push(`<button class="${ssrRenderClass(unref(cn)(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          unref(isActive)(item.to) ? "bg-sidebar-accent text-sidebar-primary font-semibold" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        ))}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "size-4 shrink-0" }, null), _parent);
        _push(`<span class="flex-1 text-left truncate">${ssrInterpolate(item.title)}</span></button>`);
      });
      _push(`<!--]--></nav><div class="border-t border-sidebar-border p-3"><button class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "size-4 shrink-0" }, null, _parent));
      _push(`<span>Sign Out</span></button></div></aside>`);
      if (unref(sidebarOpen)) {
        _push(`<div class="fixed inset-0 z-20 bg-black/50 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass(unref(cn)(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-sidebar transition-transform duration-300 lg:hidden",
        unref(sidebarOpen) ? "translate-x-0" : "-translate-x-full"
      ))}"><div class="flex h-14 items-center gap-2 border-b border-sidebar-border px-4"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold"> N </div><span class="font-semibold text-sidebar-foreground">Distributor</span></div><nav class="flex-1 space-y-1 overflow-y-auto p-3"><!--[-->`);
      ssrRenderList(unref(desktopNav), (item) => {
        _push(`<button class="${ssrRenderClass(unref(cn)(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          unref(isActive)(item.to) ? "bg-sidebar-accent text-sidebar-primary font-semibold" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        ))}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "size-4 shrink-0" }, null), _parent);
        _push(`<span class="flex-1 text-left truncate">${ssrInterpolate(item.title)}</span></button>`);
      });
      _push(`<!--]--></nav></aside><div class="flex flex-1 flex-col pb-16 lg:pb-0 lg:ml-64"><header class="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4 lg:px-6">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0 lg:hidden",
        onClick: ($event) => sidebarOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Menu), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Menu), { class: "size-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-1.5 text-sm text-muted-foreground"><span class="hidden sm:inline">Distributor</span><span class="hidden sm:inline">/</span><span class="font-medium text-foreground">${ssrInterpolate(unref(desktopNav).find((n) => unref(isActive)(n.to))?.title || "Dashboard")}</span></div><div class="flex-1"></div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8",
        onClick: unref(toggleColorMode)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isDark)) {
              _push2(ssrRenderComponent(unref(Sun), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Moon), { class: "size-4" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(isDark) ? (openBlock(), createBlock(unref(Sun), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(Moon), {
                key: 1,
                class: "size-4"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiAvatar, { class: "size-7" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiAvatarImage, {
              src: unref(auth).user?.avatar ?? "",
              alt: unref(auth).user?.name ?? ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiAvatarFallback, { class: "bg-primary text-primary-foreground text-xs" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(auth).user?.name?.charAt(0) || "U")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(auth).user?.name?.charAt(0) || "U"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiAvatarImage, {
                src: unref(auth).user?.avatar ?? "",
                alt: unref(auth).user?.name ?? ""
              }, null, 8, ["src", "alt"]),
              createVNode(_component_UiAvatarFallback, { class: "bg-primary text-primary-foreground text-xs" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(auth).user?.name?.charAt(0) || "U"), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header><main class="flex-1 p-4 lg:p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      _push(ssrRenderComponent(_component_DistributorBottomNav, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/distributor/DistributorShell.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "DistributorShell" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "distributor",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      titleTemplate: "%s | Distributor | Al Nour"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DistributorShell = __nuxt_component_0;
      const _component_UiToaster = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_DistributorShell, null, {
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
      _push(ssrRenderComponent(_component_UiToaster, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/distributor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=distributor-Bs3XTuyk.mjs.map
