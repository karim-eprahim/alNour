import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as _sfc_main$a } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$b } from './Input-pgd-3rGf.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$4$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { defineComponent, ref, reactive, watch, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogPortal, DialogContent, DialogClose, DialogTitle, DialogDescription, DialogOverlay, DialogTrigger } from 'reka-ui';
import { Plus, Search, ArrowUpDown, Phone, MapPin, Pencil, Wallet, ShoppingCart, Receipt, XIcon } from '@lucide/vue';
import { reactiveOmit } from '@vueuse/core';
import { n as navigateTo, c as cn } from './server.mjs';
import { _ as _sfc_main$c } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$d } from './Textarea-B_fNd96X.mjs';
import { u as useCustomersStore } from './store-KONj_zbv.mjs';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Sheet",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean },
    unmountOnHide: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps({ "data-slot": "sheet" }, unref(forwarded), _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/Sheet.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "SheetClose",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogClose), mergeProps({ "data-slot": "sheet-close" }, props, _attrs), {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetClose.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SheetOverlay",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogOverlay), mergeProps({
        "data-slot": "sheet-overlay",
        class: unref(cn)("bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", props.class)
      }, unref(delegatedProps), _attrs), {
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetOverlay.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SheetContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] },
    side: { default: "right" },
    showCloseButton: { type: Boolean, default: true },
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class", "side", "showCloseButton");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps({
              "data-slot": "sheet-content",
              "data-side": __props.side,
              class: unref(cn)("bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10", props.class)
            }, { ..._ctx.$attrs, ...unref(forwarded) }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  if (__props.showCloseButton) {
                    _push3(ssrRenderComponent(unref(DialogClose), {
                      "data-slot": "sheet-close",
                      "as-child": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$a), {
                            variant: "ghost",
                            class: "absolute top-3 right-3",
                            size: "icon-sm"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(XIcon), null, null, _parent5, _scopeId4));
                                _push5(`<span class="sr-only"${_scopeId4}>Close</span>`);
                              } else {
                                return [
                                  createVNode(unref(XIcon)),
                                  createVNode("span", { class: "sr-only" }, "Close")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$a), {
                              variant: "ghost",
                              class: "absolute top-3 right-3",
                              size: "icon-sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(XIcon)),
                                createVNode("span", { class: "sr-only" }, "Close")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    __props.showCloseButton ? (openBlock(), createBlock(unref(DialogClose), {
                      key: 0,
                      "data-slot": "sheet-close",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$a), {
                          variant: "ghost",
                          class: "absolute top-3 right-3",
                          size: "icon-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(XIcon)),
                            createVNode("span", { class: "sr-only" }, "Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$7),
              createVNode(unref(DialogContent), mergeProps({
                "data-slot": "sheet-content",
                "data-side": __props.side,
                class: unref(cn)("bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10", props.class)
              }, { ..._ctx.$attrs, ...unref(forwarded) }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  __props.showCloseButton ? (openBlock(), createBlock(unref(DialogClose), {
                    key: 0,
                    "data-slot": "sheet-close",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$a), {
                        variant: "ghost",
                        class: "absolute top-3 right-3",
                        size: "icon-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(XIcon)),
                          createVNode("span", { class: "sr-only" }, "Close")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 3
              }, 16, ["data-side", "class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SheetDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogDescription), mergeProps({
        "data-slot": "sheet-description",
        class: unref(cn)("text-muted-foreground text-sm", props.class)
      }, unref(delegatedProps), _attrs), {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetDescription.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SheetFooter",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sheet-footer",
        class: unref(cn)("gap-2 p-4 mt-auto flex flex-col", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetFooter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SheetHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sheet-header",
        class: unref(cn)("gap-0.5 p-4 flex flex-col", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SheetTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps({
        "data-slot": "sheet-title",
        class: unref(cn)("text-foreground text-base font-medium cn-font-heading", props.class)
      }, unref(delegatedProps), _attrs), {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetTitle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SheetTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps({ "data-slot": "sheet-trigger" }, props, _attrs), {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sheet/SheetTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contacts",
  __ssrInlineRender: true,
  setup(__props) {
    const customersStore = useCustomersStore();
    const search = ref("");
    const page = ref(1);
    const sortField = ref("name");
    const sortDir = ref("asc");
    const showCreateSheet = ref(false);
    const showEditSheet = ref(false);
    const editingCustomer = ref(null);
    const form = reactive({ name: "", phone: "", address: "" });
    const formSaving = ref(false);
    async function load() {
      await customersStore.fetchCustomers({ search: search.value || void 0, page: page.value, limit });
    }
    watch([search, page], load);
    const filteredCustomers = computed(() => {
      let list = [...customersStore.customers];
      const field = sortField.value;
      const dir = sortDir.value === "asc" ? 1 : -1;
      list.sort((a, b) => {
        const aVal = field === "name" ? a.name : field === "balance" ? a.balance || 0 : new Date(a.createdAt).getTime();
        const bVal = field === "name" ? b.name : field === "balance" ? b.balance || 0 : new Date(b.createdAt).getTime();
        if (typeof aVal === "string") return aVal.localeCompare(bVal) * dir;
        return (aVal - bVal) * dir;
      });
      return list;
    });
    function openCreate() {
      form.name = "";
      form.phone = "";
      form.address = "";
      showCreateSheet.value = true;
    }
    function openEdit(customer) {
      editingCustomer.value = customer;
      form.name = customer.name;
      form.phone = customer.phone || "";
      form.address = customer.address || "";
      showEditSheet.value = true;
    }
    async function handleCreate() {
      if (!form.name.trim()) return;
      formSaving.value = true;
      try {
        await customersStore.createCustomer({ name: form.name.trim(), phone: form.phone || void 0, address: form.address || void 0 });
        toast.success("Customer created");
        showCreateSheet.value = false;
      } catch (err) {
        toast.error(err?.message || "Failed to create customer");
      } finally {
        formSaving.value = false;
      }
    }
    async function handleUpdate() {
      if (!editingCustomer.value || !form.name.trim()) return;
      formSaving.value = true;
      try {
        await customersStore.updateCustomer(editingCustomer.value.id, { name: form.name.trim(), phone: form.phone || void 0, address: form.address || void 0 });
        toast.success("Customer updated");
        showEditSheet.value = false;
        editingCustomer.value = null;
      } catch (err) {
        toast.error(err?.message || "Failed to update customer");
      } finally {
        formSaving.value = false;
      }
    }
    function viewDetails(id) {
      navigateTo(`/distributor/contacts/${id}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = PageHeader;
      const _component_UiButton = _sfc_main$a;
      const _component_UiInput = _sfc_main$b;
      const _component_LoadingState = __nuxt_component_1;
      const _component_Users = resolveComponent("Users");
      const _component_UiCard = _sfc_main$6$1;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiSheet = _sfc_main$9;
      const _component_UiSheetContent = _sfc_main$6;
      const _component_UiSheetHeader = _sfc_main$3;
      const _component_UiSheetTitle = _sfc_main$2;
      const _component_UiSheetDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$c;
      const _component_UiTextarea = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Customers",
        description: "Manage your customers and their balances"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              size: "sm",
              onClick: openCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` New Customer `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" New Customer ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, {
                size: "sm",
                onClick: openCreate
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" New Customer ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative mb-4">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Search customers...",
        class: "pl-9"
      }, null, _parent));
      _push(`</div>`);
      if (unref(customersStore).loading) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(customersStore).customers.length === 0) {
        _push(`<div class="text-center py-12 text-sm text-muted-foreground">`);
        _push(ssrRenderComponent(_component_Users, { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }, null, _parent));
        _push(`<p>No customers found</p></div>`);
      } else {
        _push(`<!--[--><div class="hidden sm:block"><div class="rounded-lg border"><div class="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground"><div class="col-span-3 flex cursor-pointer items-center gap-1 select-none"> Name `);
        _push(ssrRenderComponent(unref(ArrowUpDown), { class: "size-3" }, null, _parent));
        _push(`</div><div class="col-span-2">Phone</div><div class="col-span-3">Address</div><div class="col-span-1 flex cursor-pointer items-center gap-1 justify-end select-none"> Balance `);
        _push(ssrRenderComponent(unref(ArrowUpDown), { class: "size-3" }, null, _parent));
        _push(`</div><div class="col-span-1 text-center">Orders</div><div class="col-span-1 text-center">Invoices</div><div class="col-span-1"></div></div><!--[-->`);
        ssrRenderList(unref(filteredCustomers), (c) => {
          _push(`<div class="grid grid-cols-12 gap-2 border-b px-4 py-3 text-sm transition-colors hover:bg-accent/50 cursor-pointer last:border-0 items-center"><div class="col-span-3 font-medium truncate">${ssrInterpolate(c.name)}</div><div class="col-span-2 flex items-center gap-1 truncate text-muted-foreground">`);
          _push(ssrRenderComponent(unref(Phone), { class: "size-3 shrink-0" }, null, _parent));
          _push(`${ssrInterpolate(c.phone || "—")}</div><div class="col-span-3 flex items-center gap-1 truncate text-muted-foreground">`);
          _push(ssrRenderComponent(unref(MapPin), { class: "size-3 shrink-0" }, null, _parent));
          _push(`${ssrInterpolate(c.address || "—")}</div><div class="${ssrRenderClass([(c.balance || 0) > 0 ? "text-green-600" : (c.balance || 0) < 0 ? "text-red-600" : "", "col-span-1 text-right font-semibold"])}">${ssrInterpolate((c.balance || 0).toFixed(2))}</div><div class="col-span-1 text-center text-muted-foreground">${ssrInterpolate(c._count?.salesOrders || 0)}</div><div class="col-span-1 text-center text-muted-foreground">${ssrInterpolate(c._count?.invoices || 0)}</div><div class="col-span-1 flex justify-end">`);
          _push(ssrRenderComponent(_component_UiButton, {
            variant: "ghost",
            size: "icon",
            class: "size-7",
            onClick: ($event) => openEdit(c)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Pencil), { class: "size-3.5" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Pencil), { class: "size-3.5" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div><div class="grid gap-2 sm:hidden"><!--[-->`);
        ssrRenderList(unref(filteredCustomers), (c) => {
          _push(ssrRenderComponent(_component_UiCard, {
            key: c.id,
            class: "cursor-pointer transition-colors hover:bg-accent/50",
            onClick: ($event) => viewDetails(c.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-start justify-between"${_scopeId2}><div class="min-w-0 flex-1"${_scopeId2}><p class="text-sm font-medium truncate"${_scopeId2}>${ssrInterpolate(c.name)}</p>`);
                      if (c.phone) {
                        _push3(`<p class="text-xs text-muted-foreground truncate"${_scopeId2}>${ssrInterpolate(c.phone)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="flex items-center gap-1 shrink-0 ml-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Wallet), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(`<span class="${ssrRenderClass([(c.balance || 0) > 0 ? "text-green-600" : (c.balance || 0) < 0 ? "text-red-600" : "", "text-sm font-semibold"])}"${_scopeId2}>${ssrInterpolate((c.balance || 0).toFixed(2))}</span></div></div>`);
                      if (c.address) {
                        _push3(`<div class="mt-1 flex items-center gap-1 text-xs text-muted-foreground"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(MapPin), { class: "size-3 shrink-0" }, null, _parent3, _scopeId2));
                        _push3(`${ssrInterpolate(c.address)}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="mt-2 flex items-center gap-3 text-xs text-muted-foreground"${_scopeId2}><span class="flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(ShoppingCart), { class: "size-3" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(c._count?.salesOrders || 0)} orders</span><span class="flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Receipt), { class: "size-3" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(c._count?.invoices || 0)} invoices</span></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(c.name), 1),
                            c.phone ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-muted-foreground truncate"
                            }, toDisplayString(c.phone), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 shrink-0 ml-2" }, [
                            createVNode(unref(Wallet), { class: "size-4 text-muted-foreground" }),
                            createVNode("span", {
                              class: ["text-sm font-semibold", (c.balance || 0) > 0 ? "text-green-600" : (c.balance || 0) < 0 ? "text-red-600" : ""]
                            }, toDisplayString((c.balance || 0).toFixed(2)), 3)
                          ])
                        ]),
                        c.address ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 flex items-center gap-1 text-xs text-muted-foreground"
                        }, [
                          createVNode(unref(MapPin), { class: "size-3 shrink-0" }),
                          createTextVNode(toDisplayString(c.address), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-2 flex items-center gap-3 text-xs text-muted-foreground" }, [
                          createVNode("span", { class: "flex items-center gap-1" }, [
                            createVNode(unref(ShoppingCart), { class: "size-3" }),
                            createTextVNode(" " + toDisplayString(c._count?.salesOrders || 0) + " orders", 1)
                          ]),
                          createVNode("span", { class: "flex items-center gap-1" }, [
                            createVNode(unref(Receipt), { class: "size-3" }),
                            createTextVNode(" " + toDisplayString(c._count?.invoices || 0) + " invoices", 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardContent, { class: "p-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start justify-between" }, [
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(c.name), 1),
                          c.phone ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-muted-foreground truncate"
                          }, toDisplayString(c.phone), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center gap-1 shrink-0 ml-2" }, [
                          createVNode(unref(Wallet), { class: "size-4 text-muted-foreground" }),
                          createVNode("span", {
                            class: ["text-sm font-semibold", (c.balance || 0) > 0 ? "text-green-600" : (c.balance || 0) < 0 ? "text-red-600" : ""]
                          }, toDisplayString((c.balance || 0).toFixed(2)), 3)
                        ])
                      ]),
                      c.address ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 flex items-center gap-1 text-xs text-muted-foreground"
                      }, [
                        createVNode(unref(MapPin), { class: "size-3 shrink-0" }),
                        createTextVNode(toDisplayString(c.address), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-2 flex items-center gap-3 text-xs text-muted-foreground" }, [
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(unref(ShoppingCart), { class: "size-3" }),
                          createTextVNode(" " + toDisplayString(c._count?.salesOrders || 0) + " orders", 1)
                        ]),
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(unref(Receipt), { class: "size-3" }),
                          createTextVNode(" " + toDisplayString(c._count?.invoices || 0) + " invoices", 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><!--]-->`);
      }
      _push(ssrRenderComponent(_component_UiSheet, {
        open: unref(showCreateSheet),
        "onUpdate:open": ($event) => showCreateSheet.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiSheetContent, {
              side: "right",
              class: "w-full sm:max-w-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSheetHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSheetTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`New Customer`);
                            } else {
                              return [
                                createTextVNode("New Customer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new customer to your list`);
                            } else {
                              return [
                                createTextVNode("Add a new customer to your list")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("New Customer")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new customer to your list")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name *`);
                      } else {
                        return [
                          createTextVNode("Name *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    placeholder: "Customer name",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    placeholder: "Phone number",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Address`);
                      } else {
                        return [
                          createTextVNode("Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    modelValue: unref(form).address,
                    "onUpdate:modelValue": ($event) => unref(form).address = $event,
                    placeholder: "Address",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(formSaving) || !unref(form).name.trim(),
                    onClick: handleCreate
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(formSaving) ? "Creating..." : "Create Customer")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Creating..." : "Create Customer"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UiSheetHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiSheetTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("New Customer")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new customer to your list")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6 space-y-4" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Customer name",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "Phone number",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          modelValue: unref(form).address,
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          placeholder: "Address",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(formSaving) || !unref(form).name.trim(),
                        onClick: handleCreate
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Creating..." : "Create Customer"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiSheetContent, {
                side: "right",
                class: "w-full sm:max-w-md"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiSheetHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSheetTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("New Customer")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new customer to your list")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mt-6 space-y-4" }, [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        placeholder: "Customer name",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).phone,
                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                        placeholder: "Phone number",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        modelValue: unref(form).address,
                        "onUpdate:modelValue": ($event) => unref(form).address = $event,
                        placeholder: "Address",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(formSaving) || !unref(form).name.trim(),
                      onClick: handleCreate
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formSaving) ? "Creating..." : "Create Customer"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiSheet, {
        open: unref(showEditSheet),
        "onUpdate:open": ($event) => showEditSheet.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiSheetContent, {
              side: "right",
              class: "w-full sm:max-w-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSheetHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSheetTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Customer`);
                            } else {
                              return [
                                createTextVNode("Edit Customer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update customer information`);
                            } else {
                              return [
                                createTextVNode("Update customer information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Customer")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update customer information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name *`);
                      } else {
                        return [
                          createTextVNode("Name *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    placeholder: "Customer name",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    placeholder: "Phone number",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Address`);
                      } else {
                        return [
                          createTextVNode("Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    modelValue: unref(form).address,
                    "onUpdate:modelValue": ($event) => unref(form).address = $event,
                    placeholder: "Address",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(formSaving) || !unref(form).name.trim(),
                    onClick: handleUpdate
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(formSaving) ? "Saving..." : "Save Changes")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Saving..." : "Save Changes"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UiSheetHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiSheetTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Customer")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update customer information")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6 space-y-4" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Customer name",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "Phone number",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          modelValue: unref(form).address,
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          placeholder: "Address",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(formSaving) || !unref(form).name.trim(),
                        onClick: handleUpdate
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Saving..." : "Save Changes"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiSheetContent, {
                side: "right",
                class: "w-full sm:max-w-md"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiSheetHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSheetTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Customer")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update customer information")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mt-6 space-y-4" }, [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        placeholder: "Customer name",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).phone,
                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                        placeholder: "Phone number",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        modelValue: unref(form).address,
                        "onUpdate:modelValue": ($event) => unref(form).address = $event,
                        placeholder: "Address",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(formSaving) || !unref(form).name.trim(),
                      onClick: handleUpdate
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formSaving) ? "Saving..." : "Save Changes"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/contacts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contacts-DQlUStJB.mjs.map
