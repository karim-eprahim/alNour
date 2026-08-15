import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$7, d as _sfc_main$3$1, a as _sfc_main$4$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$8 } from './RadioGroupItem-yMIpcpyE.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, computed, resolveComponent, unref, openBlock, createBlock, Fragment, renderList, resolveDynamicComponent, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { j as useTheme, d as cn } from './server.mjs';
import { Sun, Moon, Monitor, LayoutDashboard, ShoppingCart, Users, Boxes, ArrowUp, ArrowDown, Plus, Check } from '@lucide/vue';
import { u as useColorMode } from './composables-K6fOgyxT.mjs';
import { _ as _sfc_main$9 } from './index-BJ9JiLtz.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import '@vueuse/core';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ThemeCard",
  __ssrInlineRender: true,
  props: {
    theme: {},
    selected: { type: Boolean },
    dark: { type: Boolean }
  },
  setup(__props) {
    const labels = {
      emerald: "Emerald",
      blue: "Blue",
      violet: "Violet",
      orange: "Orange"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-theme": __props.theme,
        class: unref(cn)(
          "group relative flex h-full cursor-pointer flex-col gap-3 rounded-lg border bg-card p-3 transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          __props.dark && "dark",
          __props.selected ? "border-primary ring-2 ring-ring ring-offset-2 ring-offset-background" : "border-border hover:bg-accent/50"
        )
      }, _attrs))}><div class="flex overflow-hidden rounded-md border border-border"><div class="flex w-6 shrink-0 flex-col gap-1 bg-sidebar p-1"><div class="h-1 w-full rounded-sm bg-sidebar-primary"></div><div class="h-1 w-full rounded-sm bg-sidebar-accent"></div><div class="h-1 w-4 rounded-sm bg-sidebar-accent"></div></div><div class="flex-1 space-y-1 bg-card p-1.5"><div class="h-2 w-8 rounded-sm bg-primary"></div><div class="h-1 w-full rounded-sm bg-muted"></div><div class="h-1 w-3/4 rounded-sm bg-muted"></div><div class="h-1 w-2/3 rounded-sm bg-accent"></div></div></div><div class="flex items-center justify-between"><span class="text-sm font-medium text-foreground">${ssrInterpolate(labels[__props.theme])}</span>`);
      if (__props.selected) {
        _push(`<span class="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">`);
        _push(ssrRenderComponent(unref(Check), { class: "size-3" }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<span class="size-5" aria-hidden="true"></span>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/ThemeCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$5, { __name: "ThemeCard" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ThemePicker",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme, setTheme, themes } = useTheme();
    const colorMode = useColorMode();
    const isDark = computed(() => colorMode.value === "dark");
    function onSelect(value) {
      setTheme(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiRadioGroup = _sfc_main$1$2;
      const _component_UiRadioGroupItem = _sfc_main$8;
      const _component_Label = resolveComponent("Label");
      const _component_ThemeCard = __nuxt_component_2;
      _push(ssrRenderComponent(_component_UiRadioGroup, mergeProps({
        "model-value": unref(theme),
        class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        "onUpdate:modelValue": onSelect
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(themes), (t) => {
              _push2(`<div class="relative"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UiRadioGroupItem, {
                id: t,
                value: t,
                class: "sr-only"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Label, {
                for: t,
                class: "block cursor-pointer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_ThemeCard, {
                      theme: t,
                      selected: unref(theme) === t,
                      dark: unref(isDark)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_ThemeCard, {
                        theme: t,
                        selected: unref(theme) === t,
                        dark: unref(isDark)
                      }, null, 8, ["theme", "selected", "dark"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(themes), (t) => {
                return openBlock(), createBlock("div", {
                  key: t,
                  class: "relative"
                }, [
                  createVNode(_component_UiRadioGroupItem, {
                    id: t,
                    value: t,
                    class: "sr-only"
                  }, null, 8, ["id", "value"]),
                  createVNode(_component_Label, {
                    for: t,
                    class: "block cursor-pointer"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ThemeCard, {
                        theme: t,
                        selected: unref(theme) === t,
                        dark: unref(isDark)
                      }, null, 8, ["theme", "selected", "dark"])
                    ]),
                    _: 2
                  }, 1032, ["for"])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/ThemePicker.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$4, { __name: "ThemePicker" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ColorModePicker",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const options = [
      { value: "light", label: "Light", icon: Sun },
      { value: "dark", label: "Dark", icon: Moon },
      { value: "system", label: "System", icon: Monitor }
    ];
    const isSelected = (value) => colorMode?.preference === value;
    function onSelect(value) {
      colorMode.preference = value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiRadioGroup = _sfc_main$1$2;
      _push(ssrRenderComponent(_component_UiRadioGroup, mergeProps({
        "model-value": unref(colorMode)?.preference,
        class: "grid grid-cols-1 gap-2 sm:grid-cols-3",
        "onUpdate:modelValue": onSelect
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(options, (opt) => {
              _push2(`<label${ssrRenderAttr("for", `color-mode-${opt.value}`)} class="${ssrRenderClass([
                "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors",
                isSelected(opt.value) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(opt.icon), { class: "size-4" }, null), _parent2, _scopeId);
              _push2(`<span${_scopeId}>${ssrInterpolate(opt.label)}</span></label>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(options, (opt) => {
                return createVNode("label", {
                  key: opt.value,
                  for: `color-mode-${opt.value}`,
                  class: [
                    "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors",
                    isSelected(opt.value) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  ]
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(opt.icon), { class: "size-4" })),
                  createVNode("span", null, toDisplayString(opt.label), 1)
                ], 10, ["for"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/ColorModePicker.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$3, { __name: "ColorModePicker" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RadiusPicker",
  __ssrInlineRender: true,
  setup(__props) {
    const { radius, setRadius } = useTheme();
    const options = [
      { value: "compact", label: "Compact" },
      { value: "default", label: "Default" },
      { value: "rounded", label: "Rounded" }
    ];
    const isSelected = (value) => radius.value === value;
    function onSelect(value) {
      if (value === "compact" || value === "default" || value === "rounded") {
        setRadius(value);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiRadioGroup = _sfc_main$1$2;
      _push(ssrRenderComponent(_component_UiRadioGroup, mergeProps({
        "model-value": unref(radius),
        class: "grid grid-cols-1 gap-2 sm:grid-cols-3",
        "onUpdate:modelValue": onSelect
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(options, (opt) => {
              _push2(`<label${ssrRenderAttr("for", `radius-${opt.value}`)} class="${ssrRenderClass([
                "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors",
                isSelected(opt.value) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ])}"${_scopeId}><span${_scopeId}>${ssrInterpolate(opt.label)}</span></label>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(options, (opt) => {
                return createVNode("label", {
                  key: opt.value,
                  for: `radius-${opt.value}`,
                  class: [
                    "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors",
                    isSelected(opt.value) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  ]
                }, [
                  createVNode("span", null, toDisplayString(opt.label), 1)
                ], 10, ["for"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/RadiusPicker.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$2, { __name: "RadiusPicker" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppearancePreview",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarItems = [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Orders", icon: ShoppingCart },
      { label: "Customers", icon: Users },
      { label: "Inventory", icon: Boxes }
    ];
    const kpis = [
      { label: "Revenue", value: "$24,500", change: "+12.4%", up: true },
      { label: "Orders", value: "1,284", change: "+3.2%", up: true },
      { label: "Customers", value: "392", change: "+1.1%", up: true },
      { label: "Expenses", value: "$3,120", change: "-4.8%", up: false }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiBadge = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex overflow-hidden rounded-lg border border-border bg-background shadow-sm" }, _attrs))}><div class="hidden w-36 shrink-0 flex-col border-r border-border bg-sidebar p-2.5 sm:flex"><div class="mb-2.5 flex items-center gap-1.5 px-1"><div class="flex size-4 items-center justify-center rounded bg-sidebar-primary text-[8px] font-bold text-sidebar-primary-foreground"> N </div><span class="text-[10px] font-semibold text-sidebar-foreground">Al Nour</span></div><div class="space-y-0.5"><!--[-->`);
      ssrRenderList(sidebarItems, (item) => {
        _push(`<div class="${ssrRenderClass(unref(cn)(
          "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px]",
          item.active ? "bg-sidebar-accent font-medium text-sidebar-foreground" : "text-sidebar-foreground/60"
        ))}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), {
          class: "size-3",
          "aria-hidden": "true"
        }, null), _parent);
        _push(`<span>${ssrInterpolate(item.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="flex-1 space-y-2.5 p-3"><div class="grid grid-cols-2 gap-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(kpis, (kpi) => {
        _push(`<div class="rounded-md border border-border bg-card p-2"><p class="text-[9px] text-muted-foreground">${ssrInterpolate(kpi.label)}</p><p class="text-xs font-semibold text-foreground">${ssrInterpolate(kpi.value)}</p><p class="${ssrRenderClass(unref(cn)("flex items-center text-[9px] font-medium", kpi.up ? "text-primary" : "text-destructive"))}">`);
        if (kpi.up) {
          _push(ssrRenderComponent(unref(ArrowUp), {
            class: "mr-0.5 size-2.5",
            "aria-hidden": "true"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(ArrowDown), {
            class: "mr-0.5 size-2.5",
            "aria-hidden": "true"
          }, null, _parent));
        }
        _push(` ${ssrInterpolate(kpi.change)}</p></div>`);
      });
      _push(`<!--]--></div><div class="flex items-center justify-between gap-2"><span class="text-[10px] font-medium text-foreground">Recent Orders</span><div class="flex items-center gap-1.5">`);
      _push(ssrRenderComponent(_component_UiBadge, {
        variant: "secondary",
        class: "text-[9px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`12 new`);
          } else {
            return [
              createTextVNode("12 new")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[9px] font-medium text-primary-foreground">`);
      _push(ssrRenderComponent(unref(Plus), {
        class: "size-2.5",
        "aria-hidden": "true"
      }, null, _parent));
      _push(` Create Order </span></div></div><div class="space-y-1.5 rounded-md border border-border bg-card p-2.5"><!--[-->`);
      ssrRenderList(3, (row) => {
        _push(`<div class="flex items-center gap-2"><span class="h-1.5 w-16 rounded-sm bg-muted"></span><span class="h-1.5 flex-1 rounded-sm bg-muted-foreground/15"></span><span class="size-1.5 rounded-full bg-primary"></span></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/AppearancePreview.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$1, { __name: "AppearancePreview" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "appearance",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_ThemePicker = __nuxt_component_5;
      const _component_ColorModePicker = __nuxt_component_6;
      const _component_RadiusPicker = __nuxt_component_7;
      const _component_AppearancePreview = __nuxt_component_8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Appearance",
        description: "Customize the look and feel of your workspace."
      }, null, _parent));
      _push(`<div class="space-y-6">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Theme`);
                      } else {
                        return [
                          createTextVNode("Theme")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Choose a color theme for your workspace. The whole application updates instantly.`);
                      } else {
                        return [
                          createTextVNode("Choose a color theme for your workspace. The whole application updates instantly.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Theme")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Choose a color theme for your workspace. The whole application updates instantly.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ThemePicker, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ThemePicker)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Theme")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Choose a color theme for your workspace. The whole application updates instantly.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_ThemePicker)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid gap-6 lg:grid-cols-2">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Appearance Mode`);
                      } else {
                        return [
                          createTextVNode("Appearance Mode")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Choose between light, dark, or system appearance.`);
                      } else {
                        return [
                          createTextVNode("Choose between light, dark, or system appearance.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Appearance Mode")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Choose between light, dark, or system appearance.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ColorModePicker, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ColorModePicker)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Appearance Mode")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Choose between light, dark, or system appearance.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_ColorModePicker)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Border Radius`);
                      } else {
                        return [
                          createTextVNode("Border Radius")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Adjust the roundness of cards, buttons, and surfaces.`);
                      } else {
                        return [
                          createTextVNode("Adjust the roundness of cards, buttons, and surfaces.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Border Radius")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Adjust the roundness of cards, buttons, and surfaces.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RadiusPicker, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RadiusPicker)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Border Radius")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Adjust the roundness of cards, buttons, and surfaces.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_RadiusPicker)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Live Preview`);
                      } else {
                        return [
                          createTextVNode("Live Preview")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`See how the current theme, mode, and radius look together.`);
                      } else {
                        return [
                          createTextVNode("See how the current theme, mode, and radius look together.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Live Preview")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("See how the current theme, mode, and radius look together.")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppearancePreview, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppearancePreview)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Live Preview")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("See how the current theme, mode, and radius look together.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppearancePreview)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/appearance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=appearance-B1A0KmZf.mjs.map
