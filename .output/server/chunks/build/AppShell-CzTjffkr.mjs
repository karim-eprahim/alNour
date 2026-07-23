import { _ as _sfc_main$6 } from './index-OEEPQgbM.mjs';
import { defineComponent, mergeProps, unref, readonly, computed, ref, withCtx, openBlock, createBlock, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, Fragment, renderList, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { reactiveOmit } from '@vueuse/core';
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui';
import { h as cn, j as useState, b as usePermissions, a as useRoute, k as useColorMode, u as useAuthStore, n as navigateTo } from './server.mjs';
import { _ as _sfc_main$7 } from './index-DcmArl0H.mjs';
import { PanelLeftClose, PanelLeft, ChevronDown, LogOut, Menu, User, Bell, Sun, Moon, Settings, LayoutDashboard, BarChart3, Shield, ShoppingBag, Warehouse, Truck, Briefcase, Factory, ArrowRightLeft, Users, DollarSign, MapPin, RefreshCw, ClipboardList } from '@lucide/vue';
import { _ as _sfc_main$d, a as _sfc_main$8, b as _sfc_main$b, c as _sfc_main$8$1, d as _sfc_main$5$1, e as _sfc_main$9 } from './DropdownMenuTrigger-dnC_q6qg.mjs';
import { _ as _sfc_main$a } from './Separator-VisxwrOM.mjs';
import { _ as _sfc_main$5$2, b as _sfc_main$c, a as _sfc_main$3$1 } from './index-CrCihSp0.mjs';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ScrollBar",
  __ssrInlineRender: true,
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaScrollbar), mergeProps({
        "data-slot": "scroll-area-scrollbar",
        "data-orientation": __props.orientation
      }, unref(delegatedProps), {
        class: unref(cn)("data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none p-px transition-colors select-none", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaThumb), {
              "data-slot": "scroll-area-thumb",
              class: "rounded-full relative flex-1 bg-border"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaThumb), {
                "data-slot": "scroll-area-thumb",
                class: "rounded-full relative flex-1 bg-border"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/scroll-area/ScrollBar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ScrollArea",
  __ssrInlineRender: true,
  props: {
    type: {},
    dir: {},
    scrollHideDelay: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaRoot), mergeProps({ "data-slot": "scroll-area" }, unref(delegatedProps), {
        class: unref(cn)("relative", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaViewport), {
              "data-slot": "scroll-area-viewport",
              class: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ScrollAreaCorner), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaViewport), {
                "data-slot": "scroll-area-viewport",
                class: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(_sfc_main$5),
              createVNode(unref(ScrollAreaCorner))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/scroll-area/ScrollArea.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useSidebar = () => {
  const collapsed = useState("sidebar-collapsed", () => false);
  const isMobileOpen = useState("sidebar-mobile-open", () => false);
  function toggle() {
    collapsed.value = !collapsed.value;
  }
  function openMobile() {
    isMobileOpen.value = true;
  }
  function closeMobile() {
    isMobileOpen.value = false;
  }
  return {
    collapsed: readonly(collapsed),
    isMobileOpen: readonly(isMobileOpen),
    toggle,
    openMobile,
    closeMobile
  };
};
const useNavigation = () => {
  const navigation = [
    { title: "Dashboard", icon: LayoutDashboard, to: "/" },
    { title: "Inventory Dashboard", icon: BarChart3, to: "/inventory", permission: { module: "INVENTORY", action: "READ" } },
    { title: "Users & Permissions", icon: Shield, to: "/users", permission: { module: "USERS", action: "READ" } },
    {
      title: "Products",
      icon: ShoppingBag,
      to: "/products",
      permission: { module: "PRODUCTS", action: "READ" }
    },
    { title: "Warehouses", icon: Warehouse, to: "/warehouses", permission: { module: "WAREHOUSES", action: "READ" } },
    {
      title: "Suppliers & Purchases",
      icon: Truck,
      permission: { module: "PURCHASES", action: "READ" },
      children: [
        { title: "Suppliers", to: "/suppliers", permission: { module: "SUPPLIERS", action: "READ" } },
        { title: "Purchases", to: "/purchases", permission: { module: "PURCHASES", action: "READ" } },
        { title: "Weight Tickets", to: "/purchases/weight-tickets", permission: { module: "PURCHASES", action: "READ" } },
        { title: "Purchases Report", to: "/purchases/report", permission: { module: "PURCHASES", action: "READ" } }
      ]
    },
    {
      title: "Workers",
      icon: Briefcase,
      permission: { module: "WORKERS", action: "READ" },
      children: [
        { title: "All Workers", to: "/workers", permission: { module: "WORKERS", action: "READ" } },
        { title: "Attendance", to: "/workers/attendance", permission: { module: "WORKERS", action: "READ" } },
        { title: "Advances", to: "/workers/advances", permission: { module: "WORKERS", action: "READ" } }
      ]
    },
    {
      title: "Production",
      icon: Factory,
      permission: { module: "PRODUCTION", action: "READ" },
      children: [
        { title: "Batches", to: "/production", permission: { module: "PRODUCTION", action: "READ" } },
        { title: "New Batch", to: "/production/new", permission: { module: "PRODUCTION", action: "CREATE" } },
        { title: "Reports", to: "/production/report", permission: { module: "PRODUCTION", action: "READ" } }
      ]
    },
    {
      title: "Stock",
      icon: ArrowRightLeft,
      permission: { module: "INVENTORY", action: "READ" },
      children: [
        { title: "Stock Overview", to: "/stock", permission: { module: "INVENTORY", action: "READ" } },
        { title: "Stock Movements", to: "/stock/movements", permission: { module: "INVENTORY", action: "READ" } },
        { title: "Transfers", to: "/stock/transfers", permission: { module: "INVENTORY", action: "CREATE" } }
      ]
    },
    {
      title: "Sales",
      icon: Users,
      permission: { module: "SALES", action: "READ" },
      children: [
        { title: "Customers", to: "/customers", permission: { module: "SALES", action: "READ" } },
        { title: "Distributors", to: "/customers/distributors", permission: { module: "SALES", action: "READ" } },
        { title: "Orders", to: "/sales/orders", permission: { module: "SALES", action: "READ" } },
        { title: "Invoices", to: "/sales/invoices", permission: { module: "SALES", action: "READ" } },
        { title: "Payments", to: "/sales/payments", permission: { module: "SALES", action: "READ" } }
      ]
    },
    { title: "Expenses", icon: DollarSign, to: "/expenses", permission: { module: "EXPENSES", action: "READ" } },
    { title: "GPS Tracking", icon: MapPin, to: "/gps-tracking", permission: { module: "GPS", action: "READ" } },
    { title: "Sync Queue", icon: RefreshCw, to: "/sync-queue", permission: { module: "SYSTEM", action: "READ" } },
    { title: "Audit Logs", icon: ClipboardList, to: "/audit-logs", permission: { module: "AUDIT", action: "READ" } }
  ];
  return { navigation };
};
const transitionClass = "transition-all duration-300 ease-in-out";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { collapsed, toggle, closeMobile, isMobileOpen } = useSidebar();
    const { navigation } = useNavigation();
    const { has } = usePermissions();
    const route = useRoute();
    function isNavVisible(item) {
      if (item.permission && !has(`${item.permission.module}.${item.permission.action}`)) {
        return false;
      }
      if (item.children) {
        return item.children.some((child) => isNavVisible(child));
      }
      return true;
    }
    function filterNav(items) {
      return items.reduce((acc, item) => {
        if (!isNavVisible(item)) return acc;
        if (item.children) {
          const visibleChildren = filterNav(item.children);
          if (visibleChildren.length === 0) return acc;
          acc.push({ ...item, children: visibleChildren });
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    }
    const visibleNavigation = computed(() => filterNav(navigation));
    const openGroups = ref([]);
    function toggleGroup(title) {
      const idx = openGroups.value.indexOf(title);
      if (idx === -1) {
        openGroups.value.push(title);
      } else {
        openGroups.value.splice(idx, 1);
      }
    }
    function isActive(path) {
      if (!path) return false;
      return route.path === path || route.path.startsWith(path + "/");
    }
    function isGroupActive(item) {
      if (item.children) {
        return item.children.some((child) => isActive(child.to));
      }
      return isActive(item.to);
    }
    function navigateToItem(item) {
      if (item.to) {
        closeMobile();
        navigateTo(item.to);
      }
    }
    const sidebarWidth = computed(() => collapsed.value ? "w-16" : "w-64");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$6;
      const _component_UiScrollArea = _sfc_main$4;
      const _component_UiBadge = _sfc_main$7;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "fixed left-0 top-0 z-30 flex h-screen flex-col bg-sidebar border-r border-sidebar-border",
          unref(sidebarWidth),
          transitionClass,
          unref(isMobileOpen) ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )
      }, _attrs))}><div class="flex h-14 items-center justify-between px-3 border-b border-sidebar-border">`);
      if (!unref(collapsed)) {
        _push(`<div class="flex items-center gap-2 font-semibold text-sidebar-foreground truncate"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold"> N </div><span class="truncate">Al Nour</span></div>`);
      } else {
        _push(`<div class="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold"> N </div>`);
      }
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-7 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0",
        onClick: unref(toggle)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(collapsed)) {
              _push2(ssrRenderComponent(unref(PanelLeftClose), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(PanelLeft), { class: "size-4" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              !unref(collapsed) ? (openBlock(), createBlock(unref(PanelLeftClose), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(PanelLeft), {
                key: 1,
                class: "size-4"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiScrollArea, { class: "flex-1 px-2 py-3" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<nav class="flex flex-col gap-1"${_scopeId}><!--[-->`);
            ssrRenderList(unref(visibleNavigation), (item) => {
              _push2(`<!--[-->`);
              if (item.children) {
                _push2(`<div${_scopeId}><button class="${ssrRenderClass(unref(cn)(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                  "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                  isGroupActive(item) && "text-sidebar-primary font-semibold bg-sidebar-accent",
                  unref(collapsed) && "justify-center px-0"
                ))}"${_scopeId}>`);
                if (item.icon) {
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "size-4 shrink-0" }, null), _parent2, _scopeId);
                } else {
                  _push2(`<!---->`);
                }
                if (!unref(collapsed)) {
                  _push2(`<span class="flex-1 text-left truncate"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (!unref(collapsed) && item.children) {
                  _push2(ssrRenderComponent(unref(ChevronDown), {
                    class: unref(cn)(
                      "size-3.5 shrink-0 transition-transform text-sidebar-foreground/40",
                      unref(openGroups).includes(item.title) && "rotate-180"
                    )
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
                if (!unref(collapsed)) {
                  _push2(`<div class="${ssrRenderClass(unref(cn)(
                    "overflow-hidden transition-all duration-200",
                    unref(openGroups).includes(item.title) ? "max-h-96" : "max-h-0"
                  ))}"${_scopeId}><div class="ml-6 mt-0.5 flex flex-col gap-0.5 border-l border-sidebar-border pl-2"${_scopeId}><!--[-->`);
                  ssrRenderList(item.children, (child) => {
                    _push2(`<button class="${ssrRenderClass(unref(cn)(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors text-left",
                      "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                      isActive(child.to) && "text-sidebar-primary font-medium bg-sidebar-accent/60"
                    ))}"${_scopeId}><span class="truncate"${_scopeId}>${ssrInterpolate(child.title)}</span>`);
                    if (child.badge) {
                      _push2(ssrRenderComponent(_component_UiBadge, {
                        variant: "secondary",
                        class: "ml-auto h-5 rounded-full px-1.5 text-[10px] font-medium"
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`${ssrInterpolate(child.badge)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(child.badge), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</button>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<button class="${ssrRenderClass(unref(cn)(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                  "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                  isActive(item.to) && "text-sidebar-primary font-semibold bg-sidebar-accent",
                  unref(collapsed) && "justify-center px-0"
                ))}"${_scopeId}>`);
                if (item.icon) {
                  ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "size-4 shrink-0" }, null), _parent2, _scopeId);
                } else {
                  _push2(`<!---->`);
                }
                if (!unref(collapsed)) {
                  _push2(`<span class="flex-1 text-left truncate"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></nav>`);
          } else {
            return [
              createVNode("nav", { class: "flex flex-col gap-1" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleNavigation), (item) => {
                  return openBlock(), createBlock(Fragment, {
                    key: item.title
                  }, [
                    item.children ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("button", {
                        class: unref(cn)(
                          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                          "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                          isGroupActive(item) && "text-sidebar-primary font-semibold bg-sidebar-accent",
                          unref(collapsed) && "justify-center px-0"
                        ),
                        onClick: ($event) => unref(collapsed) ? navigateToItem(item) : toggleGroup(item.title)
                      }, [
                        item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                          key: 0,
                          class: "size-4 shrink-0"
                        })) : createCommentVNode("", true),
                        !unref(collapsed) ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: "flex-1 text-left truncate"
                        }, toDisplayString(item.title), 1)) : createCommentVNode("", true),
                        !unref(collapsed) && item.children ? (openBlock(), createBlock(unref(ChevronDown), {
                          key: 2,
                          class: unref(cn)(
                            "size-3.5 shrink-0 transition-transform text-sidebar-foreground/40",
                            unref(openGroups).includes(item.title) && "rotate-180"
                          )
                        }, null, 8, ["class"])) : createCommentVNode("", true)
                      ], 10, ["onClick"]),
                      !unref(collapsed) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: unref(cn)(
                          "overflow-hidden transition-all duration-200",
                          unref(openGroups).includes(item.title) ? "max-h-96" : "max-h-0"
                        )
                      }, [
                        createVNode("div", { class: "ml-6 mt-0.5 flex flex-col gap-0.5 border-l border-sidebar-border pl-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child) => {
                            return openBlock(), createBlock("button", {
                              key: child.title,
                              class: unref(cn)(
                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors text-left",
                                "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                                isActive(child.to) && "text-sidebar-primary font-medium bg-sidebar-accent/60"
                              ),
                              onClick: ($event) => navigateToItem(child)
                            }, [
                              createVNode("span", { class: "truncate" }, toDisplayString(child.title), 1),
                              child.badge ? (openBlock(), createBlock(_component_UiBadge, {
                                key: 0,
                                variant: "secondary",
                                class: "ml-auto h-5 rounded-full px-1.5 text-[10px] font-medium"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(child.badge), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ], 10, ["onClick"]);
                          }), 128))
                        ])
                      ], 2)) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("button", {
                      key: 1,
                      class: unref(cn)(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                        "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                        isActive(item.to) && "text-sidebar-primary font-semibold bg-sidebar-accent",
                        unref(collapsed) && "justify-center px-0"
                      ),
                      onClick: ($event) => navigateToItem(item)
                    }, [
                      item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                        key: 0,
                        class: "size-4 shrink-0"
                      })) : createCommentVNode("", true),
                      !unref(collapsed) ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: "flex-1 text-left truncate"
                      }, toDisplayString(item.title), 1)) : createCommentVNode("", true)
                    ], 10, ["onClick"]))
                  ], 64);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-t border-sidebar-border p-2"><button class="${ssrRenderClass(unref(cn)(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground hover:bg-sidebar-accent",
        unref(collapsed) && "justify-center px-0"
      ))}">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "size-4 shrink-0" }, null, _parent));
      if (!unref(collapsed)) {
        _push(`<span>Sign Out</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></aside>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$3, { __name: "Sidebar" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const { openMobile } = useSidebar();
    const { isDark, toggle: toggleColorMode } = useColorMode();
    const auth = useAuthStore();
    const roles = ["Super Admin", "Admin", "Manager", "Supervisor", "Operator"];
    const currentRole = ref("Super Admin");
    const notifications = ref([
      { id: 1, title: "Low stock alert", description: "Charcoal grade A is below minimum", time: "5m ago" },
      { id: 2, title: "Production batch complete", description: "Batch #PB-2024-089 completed", time: "1h ago" },
      { id: 3, title: "New order received", description: "Order #INV-2024-456 from Distributor Co.", time: "2h ago" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$6;
      const _component_UiDropdownMenu = _sfc_main$d;
      const _component_UiDropdownMenuTrigger = _sfc_main$8;
      const _component_UiDropdownMenuContent = _sfc_main$b;
      const _component_UiDropdownMenuLabel = _sfc_main$8$1;
      const _component_UiDropdownMenuSeparator = _sfc_main$5$1;
      const _component_UiDropdownMenuItem = _sfc_main$9;
      const _component_UiSeparator = _sfc_main$a;
      const _component_UiAvatar = _sfc_main$5$2;
      const _component_UiAvatarImage = _sfc_main$c;
      const _component_UiAvatarFallback = _sfc_main$3$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background px-4 lg:px-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0 lg:hidden",
        onClick: unref(openMobile)
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
      _push(`<div class="flex-1"></div><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UiDropdownMenu, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "ghost",
                    size: "sm",
                    class: "h-8 gap-1.5 px-2 text-xs font-medium"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(User), { class: "size-3.5" }, null, _parent4, _scopeId3));
                        _push4(`<span class="hidden sm:inline"${_scopeId3}>${ssrInterpolate(unref(currentRole))}</span>`);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "size-3 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(User), { class: "size-3.5" }),
                          createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(currentRole)), 1),
                          createVNode(unref(ChevronDown), { class: "size-3 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiButton, {
                      variant: "ghost",
                      size: "sm",
                      class: "h-8 gap-1.5 px-2 text-xs font-medium"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(User), { class: "size-3.5" }),
                        createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(currentRole)), 1),
                        createVNode(unref(ChevronDown), { class: "size-3 opacity-50" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiDropdownMenuContent, {
              align: "end",
              class: "w-44"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDropdownMenuLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Switch Role`);
                      } else {
                        return [
                          createTextVNode("Switch Role")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(roles, (role) => {
                    _push3(ssrRenderComponent(_component_UiDropdownMenuItem, {
                      key: role,
                      class: unref(cn)(role === unref(currentRole) && "bg-accent font-medium"),
                      onClick: ($event) => currentRole.value = role
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(role)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(role), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(_component_UiDropdownMenuLabel, null, {
                      default: withCtx(() => [
                        createTextVNode("Switch Role")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDropdownMenuSeparator),
                    (openBlock(), createBlock(Fragment, null, renderList(roles, (role) => {
                      return createVNode(_component_UiDropdownMenuItem, {
                        key: role,
                        class: unref(cn)(role === unref(currentRole) && "bg-accent font-medium"),
                        onClick: ($event) => currentRole.value = role
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(role), 1)
                        ]),
                        _: 2
                      }, 1032, ["class", "onClick"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_UiButton, {
                    variant: "ghost",
                    size: "sm",
                    class: "h-8 gap-1.5 px-2 text-xs font-medium"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(User), { class: "size-3.5" }),
                      createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(currentRole)), 1),
                      createVNode(unref(ChevronDown), { class: "size-3 opacity-50" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiDropdownMenuContent, {
                align: "end",
                class: "w-44"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiDropdownMenuLabel, null, {
                    default: withCtx(() => [
                      createTextVNode("Switch Role")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuSeparator),
                  (openBlock(), createBlock(Fragment, null, renderList(roles, (role) => {
                    return createVNode(_component_UiDropdownMenuItem, {
                      key: role,
                      class: unref(cn)(role === unref(currentRole) && "bg-accent font-medium"),
                      onClick: ($event) => currentRole.value = role
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(role), 1)
                      ]),
                      _: 2
                    }, 1032, ["class", "onClick"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiSeparator, {
        orientation: "vertical",
        class: "mx-1 h-6"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiDropdownMenu, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "ghost",
                    size: "icon",
                    class: "size-8 relative"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Bell), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(`<span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground"${_scopeId3}>${ssrInterpolate(unref(notifications).length)}</span>`);
                      } else {
                        return [
                          createVNode(unref(Bell), { class: "size-4" }),
                          createVNode("span", { class: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground" }, toDisplayString(unref(notifications).length), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiButton, {
                      variant: "ghost",
                      size: "icon",
                      class: "size-8 relative"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Bell), { class: "size-4" }),
                        createVNode("span", { class: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground" }, toDisplayString(unref(notifications).length), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiDropdownMenuContent, {
              align: "end",
              class: "w-72"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDropdownMenuLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Notifications`);
                      } else {
                        return [
                          createTextVNode("Notifications")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<div class="max-h-72 overflow-y-auto"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(notifications), (n) => {
                    _push3(`<button class="flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent"${_scopeId2}><span class="font-medium"${_scopeId2}>${ssrInterpolate(n.title)}</span><span class="text-xs text-muted-foreground line-clamp-1"${_scopeId2}>${ssrInterpolate(n.description)}</span><span class="text-[10px] text-muted-foreground/60"${_scopeId2}>${ssrInterpolate(n.time)}</span></button>`);
                  });
                  _push3(`<!--]--></div>`);
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuItem, { class: "justify-center text-xs font-medium text-primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` View all notifications `);
                      } else {
                        return [
                          createTextVNode(" View all notifications ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiDropdownMenuLabel, null, {
                      default: withCtx(() => [
                        createTextVNode("Notifications")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDropdownMenuSeparator),
                    createVNode("div", { class: "max-h-72 overflow-y-auto" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (n) => {
                        return openBlock(), createBlock("button", {
                          key: n.id,
                          class: "flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
                        }, [
                          createVNode("span", { class: "font-medium" }, toDisplayString(n.title), 1),
                          createVNode("span", { class: "text-xs text-muted-foreground line-clamp-1" }, toDisplayString(n.description), 1),
                          createVNode("span", { class: "text-[10px] text-muted-foreground/60" }, toDisplayString(n.time), 1)
                        ]);
                      }), 128))
                    ]),
                    createVNode(_component_UiDropdownMenuSeparator),
                    createVNode(_component_UiDropdownMenuItem, { class: "justify-center text-xs font-medium text-primary" }, {
                      default: withCtx(() => [
                        createTextVNode(" View all notifications ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_UiButton, {
                    variant: "ghost",
                    size: "icon",
                    class: "size-8 relative"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Bell), { class: "size-4" }),
                      createVNode("span", { class: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground" }, toDisplayString(unref(notifications).length), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiDropdownMenuContent, {
                align: "end",
                class: "w-72"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiDropdownMenuLabel, null, {
                    default: withCtx(() => [
                      createTextVNode("Notifications")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuSeparator),
                  createVNode("div", { class: "max-h-72 overflow-y-auto" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (n) => {
                      return openBlock(), createBlock("button", {
                        key: n.id,
                        class: "flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
                      }, [
                        createVNode("span", { class: "font-medium" }, toDisplayString(n.title), 1),
                        createVNode("span", { class: "text-xs text-muted-foreground line-clamp-1" }, toDisplayString(n.description), 1),
                        createVNode("span", { class: "text-[10px] text-muted-foreground/60" }, toDisplayString(n.time), 1)
                      ]);
                    }), 128))
                  ]),
                  createVNode(_component_UiDropdownMenuSeparator),
                  createVNode(_component_UiDropdownMenuItem, { class: "justify-center text-xs font-medium text-primary" }, {
                    default: withCtx(() => [
                      createTextVNode(" View all notifications ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
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
      _push(ssrRenderComponent(_component_UiSeparator, {
        orientation: "vertical",
        class: "mx-1 h-6"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiDropdownMenu, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "ghost",
                    size: "sm",
                    class: "h-8 gap-2 px-1.5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiAvatar, { class: "size-7" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiAvatarImage, {
                                src: unref(auth).user?.avatar ?? "",
                                alt: unref(auth).user?.name ?? ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiAvatarFallback, { class: "bg-primary text-primary-foreground text-xs" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(auth).user?.name?.charAt(0) || "U")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(auth).user?.name?.charAt(0) || "U"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        if (unref(auth).user) {
                          _push4(`<div class="hidden text-left md:block"${_scopeId3}><p class="text-xs font-medium leading-tight"${_scopeId3}>${ssrInterpolate(unref(auth).user.name)}</p><p class="text-[10px] text-muted-foreground leading-tight"${_scopeId3}>${ssrInterpolate(unref(auth).user.email)}</p></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "hidden size-3 opacity-50 md:block" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiAvatar, { class: "size-7" }, {
                            default: withCtx(() => [
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
                            ]),
                            _: 1
                          }),
                          unref(auth).user ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "hidden text-left md:block"
                          }, [
                            createVNode("p", { class: "text-xs font-medium leading-tight" }, toDisplayString(unref(auth).user.name), 1),
                            createVNode("p", { class: "text-[10px] text-muted-foreground leading-tight" }, toDisplayString(unref(auth).user.email), 1)
                          ])) : createCommentVNode("", true),
                          createVNode(unref(ChevronDown), { class: "hidden size-3 opacity-50 md:block" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiButton, {
                      variant: "ghost",
                      size: "sm",
                      class: "h-8 gap-2 px-1.5"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiAvatar, { class: "size-7" }, {
                          default: withCtx(() => [
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
                          ]),
                          _: 1
                        }),
                        unref(auth).user ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "hidden text-left md:block"
                        }, [
                          createVNode("p", { class: "text-xs font-medium leading-tight" }, toDisplayString(unref(auth).user.name), 1),
                          createVNode("p", { class: "text-[10px] text-muted-foreground leading-tight" }, toDisplayString(unref(auth).user.email), 1)
                        ])) : createCommentVNode("", true),
                        createVNode(unref(ChevronDown), { class: "hidden size-3 opacity-50 md:block" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiDropdownMenuContent, {
              align: "end",
              class: "w-48"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDropdownMenuLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col"${_scopeId3}><span${_scopeId3}>${ssrInterpolate(unref(auth).user?.name || "User")}</span><span class="text-xs font-normal text-muted-foreground"${_scopeId3}>${ssrInterpolate(unref(auth).user?.email || "user@example.com")}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col" }, [
                            createVNode("span", null, toDisplayString(unref(auth).user?.name || "User"), 1),
                            createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, toDisplayString(unref(auth).user?.email || "user@example.com"), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuItem, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(User), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Profile `);
                      } else {
                        return [
                          createVNode(unref(User), { class: "size-4" }),
                          createTextVNode(" Profile ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuItem, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Settings), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Settings `);
                      } else {
                        return [
                          createVNode(unref(Settings), { class: "size-4" }),
                          createTextVNode(" Settings ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuItem, {
                    variant: "destructive",
                    onClick: ($event) => unref(auth).logout()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(LogOut), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Sign Out `);
                      } else {
                        return [
                          createVNode(unref(LogOut), { class: "size-4" }),
                          createTextVNode(" Sign Out ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiDropdownMenuLabel, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col" }, [
                          createVNode("span", null, toDisplayString(unref(auth).user?.name || "User"), 1),
                          createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, toDisplayString(unref(auth).user?.email || "user@example.com"), 1)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDropdownMenuSeparator),
                    createVNode(_component_UiDropdownMenuItem, null, {
                      default: withCtx(() => [
                        createVNode(unref(User), { class: "size-4" }),
                        createTextVNode(" Profile ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDropdownMenuItem, null, {
                      default: withCtx(() => [
                        createVNode(unref(Settings), { class: "size-4" }),
                        createTextVNode(" Settings ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDropdownMenuSeparator),
                    createVNode(_component_UiDropdownMenuItem, {
                      variant: "destructive",
                      onClick: ($event) => unref(auth).logout()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(LogOut), { class: "size-4" }),
                        createTextVNode(" Sign Out ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_UiButton, {
                    variant: "ghost",
                    size: "sm",
                    class: "h-8 gap-2 px-1.5"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UiAvatar, { class: "size-7" }, {
                        default: withCtx(() => [
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
                        ]),
                        _: 1
                      }),
                      unref(auth).user ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "hidden text-left md:block"
                      }, [
                        createVNode("p", { class: "text-xs font-medium leading-tight" }, toDisplayString(unref(auth).user.name), 1),
                        createVNode("p", { class: "text-[10px] text-muted-foreground leading-tight" }, toDisplayString(unref(auth).user.email), 1)
                      ])) : createCommentVNode("", true),
                      createVNode(unref(ChevronDown), { class: "hidden size-3 opacity-50 md:block" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiDropdownMenuContent, {
                align: "end",
                class: "w-48"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiDropdownMenuLabel, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", null, toDisplayString(unref(auth).user?.name || "User"), 1),
                        createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, toDisplayString(unref(auth).user?.email || "user@example.com"), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuSeparator),
                  createVNode(_component_UiDropdownMenuItem, null, {
                    default: withCtx(() => [
                      createVNode(unref(User), { class: "size-4" }),
                      createTextVNode(" Profile ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuItem, null, {
                    default: withCtx(() => [
                      createVNode(unref(Settings), { class: "size-4" }),
                      createTextVNode(" Settings ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuSeparator),
                  createVNode(_component_UiDropdownMenuItem, {
                    variant: "destructive",
                    onClick: ($event) => unref(auth).logout()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(LogOut), { class: "size-4" }),
                      createTextVNode(" Sign Out ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "Navbar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t bg-background px-4 lg:px-6" }, _attrs))}><div class="flex h-12 items-center justify-between text-xs text-muted-foreground"><p>© ${ssrInterpolate(unref(year))} Al Nour Charcoal. All rights reserved.</p><p class="hidden sm:block">v1.0.0</p></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "Footer" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppShell",
  __ssrInlineRender: true,
  setup(__props) {
    const { collapsed, isMobileOpen } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = __nuxt_component_0$1;
      const _component_Navbar = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Sidebar, null, null, _parent));
      if (unref(isMobileOpen)) {
        _push(`<div class="fixed inset-0 z-20 bg-black/50 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(cn)(
        "flex flex-1 flex-col transition-all duration-300 ease-in-out",
        unref(collapsed) ? "lg:ml-16" : "lg:ml-64"
      ))}">`);
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<main class="flex-1 p-4 lg:p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppShell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "AppShell" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppShell-CzTjffkr.mjs.map
