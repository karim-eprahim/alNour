import { defineComponent, ref, computed, watch, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, withModifiers, createCommentVNode, createTextVNode, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderAttrs } from 'vue/server-renderer';
import { XIcon, Loader2, ChevronsUpDownIcon, CheckIcon, SearchIcon } from '@lucide/vue';
import { useDebounceFn, reactiveOmit } from '@vueuse/core';
import { _ as _sfc_main$i } from './index-OEEPQgbM.mjs';
import { useForwardPropsEmits, ComboboxRoot, useForwardProps, ComboboxAnchor, ComboboxTrigger, ComboboxPortal, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxViewport, ComboboxGroup, ComboboxLabel, ComboboxItem, ComboboxItemIndicator, ComboboxSeparator } from 'reka-ui';
import { h as cn } from './server.mjs';
import { cva } from 'class-variance-authority';
import { _ as _sfc_main$j } from './Input-DA89G3IO.mjs';
import { _ as _sfc_main$k } from './Textarea-BYfzemxZ.mjs';

const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "Combobox",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    resetSearchTermOnBlur: { type: Boolean },
    resetSearchTermOnSelect: { type: Boolean },
    openOnFocus: { type: Boolean },
    openOnClick: { type: Boolean },
    ignoreFilter: { type: Boolean },
    resetModelValueOnClear: { type: Boolean },
    modelValue: {},
    defaultValue: {},
    multiple: { type: Boolean },
    dir: {},
    disabled: { type: Boolean },
    highlightOnHover: { type: Boolean },
    by: { type: [String, Function] },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "highlight", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxRoot), mergeProps({ "data-slot": "combobox" }, unref(forwarded), _attrs), {
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/Combobox.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "ComboboxAnchor",
  __ssrInlineRender: true,
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxAnchor), mergeProps({ "data-slot": "combobox-anchor" }, unref(forwarded), {
        class: unref(cn)("", props.class)
      }, _attrs), {
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
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxAnchor.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "ComboboxEmpty",
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
      _push(ssrRenderComponent(unref(ComboboxEmpty), mergeProps({ "data-slot": "combobox-empty" }, unref(delegatedProps), {
        class: unref(cn)("text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex", props.class)
      }, _attrs), {
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxEmpty.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ComboboxGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] },
    heading: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxGroup), mergeProps({ "data-slot": "combobox-group" }, unref(delegatedProps), {
        class: unref(cn)("overflow-hidden text-foreground", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.heading) {
              _push2(ssrRenderComponent(unref(ComboboxLabel), { class: "text-muted-foreground px-2 py-1.5 text-xs" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.heading)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.heading), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              __props.heading ? (openBlock(), createBlock(unref(ComboboxLabel), {
                key: 0,
                class: "text-muted-foreground px-2 py-1.5 text-xs"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.heading), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxGroup.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "InputGroup",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "input-group",
        role: "group",
        class: unref(cn)(
          "border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-disabled:bg-input/50 dark:has-disabled:bg-input/80 h-8 rounded-lg border transition-colors in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroup.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "InputGroupAddon",
  __ssrInlineRender: true,
  props: {
    align: { default: "inline-start" },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": props.align,
        class: unref(cn)(unref(inputGroupAddonVariants)({ align: props.align }), props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupAddon.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "InputGroupButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "ghost" },
    size: { default: "xs" },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$i), mergeProps({
        type: "button",
        "data-size": props.size,
        variant: props.variant,
        class: unref(cn)(unref(inputGroupButtonVariants)({ size: props.size }), props.class)
      }, _attrs), {
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupButton.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "InputGroupInput",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$j), mergeProps({
        "data-slot": "input-group-control",
        class: unref(cn)(
          "rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1",
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupInput.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "InputGroupText",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "text-muted-foreground gap-2 text-sm [&_svg:not([class*=size-])]:size-4 flex items-center [&_svg]:pointer-events-none",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupText.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "InputGroupTextarea",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$k), mergeProps({
        "data-slot": "input-group-control",
        class: unref(cn)(
          "rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1 resize-none",
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input-group/InputGroupTextarea.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const inputGroupAddonVariants = cva(
  "text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*=size-])]:size-4 flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        "inline-start": "pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem] order-first",
        "inline-end": "pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem] order-last",
        "block-start": "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start",
        "block-end": "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
const inputGroupButtonVariants = cva(
  "gap-2 text-sm flex items-center shadow-none",
  {
    variants: {
      size: {
        "xs": "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*=size-])]:size-3.5",
        "sm": "",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ComboboxInput",
  __ssrInlineRender: true,
  props: {
    displayValue: { type: Function },
    modelValue: {},
    autoFocus: { type: Boolean },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$d), mergeProps({ class: __props.class }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SearchIcon), { class: "size-4 shrink-0 opacity-50" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SearchIcon), { class: "size-4 shrink-0 opacity-50" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxInput), mergeProps({
              "data-slot": "combobox-input",
              class: unref(cn)("flex-1 outline-hidden disabled:cursor-not-allowed disabled:opacity-50", props.class)
            }, { ..._ctx.$attrs, ...unref(forwarded) }), null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode(unref(SearchIcon), { class: "size-4 shrink-0 opacity-50" })
                ]),
                _: 1
              }),
              createVNode(unref(ComboboxInput), mergeProps({
                "data-slot": "combobox-input",
                class: unref(cn)("flex-1 outline-hidden disabled:cursor-not-allowed disabled:opacity-50", props.class)
              }, { ..._ctx.$attrs, ...unref(forwarded) }), null, 16, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxInput.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ComboboxItem",
  __ssrInlineRender: true,
  props: {
    textValue: {},
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxItem), mergeProps({ "data-slot": "combobox-item" }, unref(forwarded), {
        class: unref(cn)("data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*=size-])]:size-4 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", props.class)
      }, _attrs), {
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxItem.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ComboboxItemIndicator",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxItemIndicator), mergeProps({ "data-slot": "combobox-item-indicator" }, unref(forwarded), {
        class: unref(cn)("pointer-events-none absolute right-2 flex size-4 items-center justify-center", props.class)
      }, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxItemIndicator.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ComboboxList",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    position: { default: "popper" },
    bodyLock: { type: Boolean },
    hideWhenEmpty: { type: Boolean },
    memoDependencies: {},
    side: {},
    sideOffset: { default: 4 },
    sideFlip: { type: Boolean },
    align: { default: "center" },
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    hideShiftedArrow: { type: Boolean },
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    dir: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxContent), mergeProps({ "data-slot": "combobox-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
              class: unref(cn)("bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 max-h-72 min-w-36 overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-translucent group/combobox-content z-50 w-(--reka-combobox-trigger-width)", props.class)
            }), {
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
          } else {
            return [
              createVNode(unref(ComboboxContent), mergeProps({ "data-slot": "combobox-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
                class: unref(cn)("bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 max-h-72 min-w-36 overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-translucent group/combobox-content z-50 w-(--reka-combobox-trigger-width)", props.class)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxList.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ComboboxSeparator",
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
      _push(ssrRenderComponent(unref(ComboboxSeparator), mergeProps({ "data-slot": "combobox-separator" }, unref(delegatedProps), {
        class: unref(cn)("bg-border -mx-1 my-1 h-px", props.class)
      }, _attrs), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxSeparator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ComboboxTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxTrigger), mergeProps({ "data-slot": "combobox-trigger" }, unref(forwarded), {
        class: unref(cn)("[&_svg:not([class*=size-])]:size-4", props.class),
        tabindex: "0"
      }, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxTrigger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ComboboxViewport",
  __ssrInlineRender: true,
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ComboboxViewport), mergeProps({ "data-slot": "combobox-viewport" }, unref(forwarded), {
        class: unref(cn)("no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0", props.class)
      }, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/combobox/ComboboxViewport.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CACHE_TTL = 5 * 60 * 1e3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LookupCombobox",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    endpoint: { type: [Function, null], default: null },
    items: { default: null },
    labelKey: { default: "name" },
    valueKey: { default: "id" },
    placeholder: { default: "Select..." },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    emptyMessage: { default: "No results found." },
    autoSelectSingle: { type: Boolean, default: false },
    includeAll: { type: Boolean, default: false },
    allLabel: { default: "All" },
    allValue: { default: "all" },
    debounceMs: { default: 300 },
    cacheKey: { default: "" },
    queryParams: { default: () => ({}) },
    minSearchLength: { default: 2 },
    clearable: { type: Boolean, default: false },
    class: {}
  },
  emits: ["update:modelValue", "search", "opened", "closed", "loadMore"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = ref(false);
    const searchQuery = ref("");
    const internalLoading = ref(false);
    const loadingMore = ref(false);
    const lookupItems = ref([]);
    const cursor = ref(null);
    const hasMore = ref(false);
    const loadMoreSentinel = ref(null);
    let observer = null;
    const isRemote = computed(() => !!props.endpoint);
    computed(() => !!props.items && !isRemote.value);
    const lookupCache = /* @__PURE__ */ new Map();
    function getCacheKey(params) {
      const base = props.cacheKey || (props.endpoint ? props.endpoint.name : "lookup");
      const sorted = Object.keys(params).sort().reduce((acc, k) => {
        if (params[k] !== void 0 && params[k] !== null && params[k] !== "") {
          acc[k] = params[k];
        }
        return acc;
      }, {});
      return `${base}:${JSON.stringify(sorted)}`;
    }
    function checkCache(params) {
      if (!props.cacheKey) return null;
      const key = getCacheKey(params);
      const entry = lookupCache.get(key);
      if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
        return { items: entry.items, nextCursor: entry.nextCursor };
      }
      return null;
    }
    function setCache(params, data) {
      if (!props.cacheKey) return;
      const key = getCacheKey(params);
      lookupCache.set(key, { ...data, timestamp: Date.now() });
    }
    function normalizeItem(item) {
      if (item && typeof item.value === "string" && typeof item.label === "string") {
        return {
          value: item.value,
          label: item.label,
          subtitle: item.subtitle || void 0,
          disabled: item.disabled || false
        };
      }
      return {
        value: String(item[props.valueKey] ?? ""),
        label: item[props.labelKey] ?? String(item[props.valueKey] ?? ""),
        subtitle: item.subtitle || void 0,
        disabled: item.disabled || false
      };
    }
    const processedItems = computed(() => {
      if (isRemote.value) return lookupItems.value;
      if (props.items) return props.items.map(normalizeItem);
      return [];
    });
    const displayItems = computed(() => {
      let items = processedItems.value;
      if (props.includeAll) {
        items = [{ value: props.allValue, label: props.allLabel }, ...items];
      }
      return items;
    });
    const selectedItem = computed(() => {
      return displayItems.value.find((i) => i.value === String(props.modelValue)) || null;
    });
    const loadingState = computed(() => {
      return props.loading || internalLoading.value;
    });
    const displayText = computed(() => {
      if (selectedItem.value) return selectedItem.value.label;
      if (props.modelValue) return String(props.modelValue);
      return props.placeholder;
    });
    watch([processedItems, () => props.loading, () => props.autoSelectSingle], () => {
      if (!props.loading && props.autoSelectSingle && processedItems.value.length === 1 && !props.modelValue) {
        const firstItem = processedItems.value[0];
        if (firstItem) emit("update:modelValue", firstItem.value);
      }
    }, { immediate: true });
    async function fetchItems(isLoadMore = false) {
      if (!props.endpoint) return;
      const params = {
        take: 20,
        ...props.queryParams
      };
      if (searchQuery.value && searchQuery.value.length >= props.minSearchLength) {
        params.q = searchQuery.value;
      }
      const loadMoreCursor = isLoadMore ? cursor.value : void 0;
      if (loadMoreCursor) {
        params.cursor = loadMoreCursor;
      }
      if (!isLoadMore && !loadMoreCursor) {
        const cached = checkCache(params);
        if (cached) {
          lookupItems.value = cached.items;
          cursor.value = cached.nextCursor;
          hasMore.value = !!cached.nextCursor;
          return;
        }
      }
      if (isLoadMore) {
        loadingMore.value = true;
      } else {
        internalLoading.value = true;
      }
      if (isLoadMore) {
        emit("loadMore");
      } else {
        emit("search", searchQuery.value);
      }
      try {
        const response = await props.endpoint(params);
        const newItems = response.items.map(normalizeItem);
        if (isLoadMore) {
          lookupItems.value = [...lookupItems.value, ...newItems];
        } else {
          lookupItems.value = newItems;
        }
        cursor.value = response.nextCursor;
        hasMore.value = !!response.nextCursor;
        if (!isLoadMore && !loadMoreCursor) {
          setCache(params, { items: lookupItems.value, nextCursor: response.nextCursor });
        }
      } catch (error) {
        console.error("LookupCombobox fetch failed:", error);
      } finally {
        if (isLoadMore) {
          loadingMore.value = false;
        } else {
          internalLoading.value = false;
        }
      }
    }
    const debouncedFetch = useDebounceFn((query) => {
      if (props.endpoint) {
        cursor.value = null;
        lookupItems.value = [];
        fetchItems();
      }
    }, props.debounceMs);
    watch(searchQuery, (val) => {
      if (isRemote.value) {
        if (val.length >= props.minSearchLength || val.length === 0) {
          debouncedFetch(val);
        }
      }
    });
    const selectedItemObj = computed({
      get: () => selectedItem.value,
      set: (item) => {
        if (!item) {
          emit("update:modelValue", null);
          return;
        }
        const normalized = normalizeItem(item);
        emit("update:modelValue", normalized.value);
      }
    });
    function onOpenChange(isOpen) {
      open.value = isOpen;
      if (isOpen) {
        searchQuery.value = "";
        emit("opened");
        if (isRemote.value && lookupItems.value.length === 0) {
          fetchItems();
        }
      } else {
        emit("closed");
      }
    }
    function handleClear(event) {
      event.stopPropagation();
      emit("update:modelValue", null);
    }
    function itemComparator(a, b) {
      if (!a || !b) return a === b;
      return String(a.value) === String(b.value);
    }
    watch(loadMoreSentinel, (el) => {
      if (observer) observer.disconnect();
      if (!el) return;
      observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore.value && !loadingMore.value && !internalLoading.value) {
          fetchItems(true);
        }
      }, { rootMargin: "200px" });
      observer.observe(el);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$h), mergeProps({
        modelValue: selectedItemObj.value,
        "onUpdate:modelValue": ($event) => selectedItemObj.value = $event,
        "search-term": searchQuery.value,
        "onUpdate:searchTerm": ($event) => searchQuery.value = $event,
        by: itemComparator,
        "should-filter": false,
        open: open.value,
        "onUpdate:open": onOpenChange,
        disabled: __props.disabled
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              class: props.class,
              "as-child": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), {
                    "as-child": "",
                    disabled: __props.disabled || loadingState.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), {
                          variant: "outline",
                          role: "combobox",
                          disabled: __props.disabled || loadingState.value,
                          class: "w-full justify-between gap-2 font-normal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="${ssrRenderClass(selectedItem.value ? "text-foreground" : "text-muted-foreground")}"${_scopeId4}>${ssrInterpolate(displayText.value)}</span><div class="flex items-center gap-1"${_scopeId4}>`);
                              if (__props.clearable && selectedItem.value) {
                                _push5(ssrRenderComponent(unref(XIcon), {
                                  class: "size-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground",
                                  onClick: handleClear
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (loadingState.value) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "size-4 shrink-0 animate-spin text-muted-foreground" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" }, null, _parent5, _scopeId4));
                              }
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("span", {
                                  class: selectedItem.value ? "text-foreground" : "text-muted-foreground"
                                }, toDisplayString(displayText.value), 3),
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  __props.clearable && selectedItem.value ? (openBlock(), createBlock(unref(XIcon), {
                                    key: 0,
                                    class: "size-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground",
                                    onClick: withModifiers(handleClear, ["stop"])
                                  })) : createCommentVNode("", true),
                                  loadingState.value ? (openBlock(), createBlock(unref(Loader2), {
                                    key: 1,
                                    class: "size-4 shrink-0 animate-spin text-muted-foreground"
                                  })) : (openBlock(), createBlock(unref(ChevronsUpDownIcon), {
                                    key: 2,
                                    class: "size-4 shrink-0 opacity-50"
                                  }))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$i), {
                            variant: "outline",
                            role: "combobox",
                            disabled: __props.disabled || loadingState.value,
                            class: "w-full justify-between gap-2 font-normal"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: selectedItem.value ? "text-foreground" : "text-muted-foreground"
                              }, toDisplayString(displayText.value), 3),
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                __props.clearable && selectedItem.value ? (openBlock(), createBlock(unref(XIcon), {
                                  key: 0,
                                  class: "size-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground",
                                  onClick: withModifiers(handleClear, ["stop"])
                                })) : createCommentVNode("", true),
                                loadingState.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 1,
                                  class: "size-4 shrink-0 animate-spin text-muted-foreground"
                                })) : (openBlock(), createBlock(unref(ChevronsUpDownIcon), {
                                  key: 2,
                                  class: "size-4 shrink-0 opacity-50"
                                }))
                              ])
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), {
                      "as-child": "",
                      disabled: __props.disabled || loadingState.value
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), {
                          variant: "outline",
                          role: "combobox",
                          disabled: __props.disabled || loadingState.value,
                          class: "w-full justify-between gap-2 font-normal"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: selectedItem.value ? "text-foreground" : "text-muted-foreground"
                            }, toDisplayString(displayText.value), 3),
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              __props.clearable && selectedItem.value ? (openBlock(), createBlock(unref(XIcon), {
                                key: 0,
                                class: "size-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground",
                                onClick: withModifiers(handleClear, ["stop"])
                              })) : createCommentVNode("", true),
                              loadingState.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 1,
                                class: "size-4 shrink-0 animate-spin text-muted-foreground"
                              })) : (openBlock(), createBlock(unref(ChevronsUpDownIcon), {
                                key: 2,
                                class: "size-4 shrink-0 opacity-50"
                              }))
                            ])
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { placeholder: __props.placeholder }, null, _parent3, _scopeId2));
                  if (loadingState.value && lookupItems.value.length === 0 && isRemote.value) {
                    _push3(`<div class="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Loader2), { class: "size-4 animate-spin" }, null, _parent3, _scopeId2));
                    _push3(` Loading... </div>`);
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(__props.emptyMessage)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(__props.emptyMessage), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$1), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$e), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(displayItems.value, (item) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$6), {
                                    key: item.value,
                                    value: item,
                                    disabled: item.disabled
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<span${_scopeId5}>${ssrInterpolate(item.label)}</span>`);
                                        if (item.subtitle) {
                                          _push6(`<span class="text-muted-foreground ml-2 text-xs"${_scopeId5}>${ssrInterpolate(item.subtitle)}</span>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(ssrRenderComponent(unref(_sfc_main$5), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(CheckIcon), { class: "size-4" }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(CheckIcon), { class: "size-4" })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode("span", null, toDisplayString(item.label), 1),
                                          item.subtitle ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-muted-foreground ml-2 text-xs"
                                          }, toDisplayString(item.subtitle), 1)) : createCommentVNode("", true),
                                          createVNode(unref(_sfc_main$5), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(CheckIcon), { class: "size-4" })
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(displayItems.value, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$6), {
                                      key: item.value,
                                      value: item,
                                      disabled: item.disabled
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, toDisplayString(item.label), 1),
                                        item.subtitle ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-muted-foreground ml-2 text-xs"
                                        }, toDisplayString(item.subtitle), 1)) : createCommentVNode("", true),
                                        createVNode(unref(_sfc_main$5), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(CheckIcon), { class: "size-4" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1032, ["value", "disabled"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          if (loadingMore.value) {
                            _push4(`<div class="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(Loader2), { class: "size-4 animate-spin" }, null, _parent4, _scopeId3));
                            _push4(` Loading more... </div>`);
                          } else if (hasMore.value) {
                            _push4(`<div class="h-px"${_scopeId3}></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode(unref(_sfc_main$e), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(displayItems.value, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$6), {
                                    key: item.value,
                                    value: item,
                                    disabled: item.disabled
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", null, toDisplayString(item.label), 1),
                                      item.subtitle ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-muted-foreground ml-2 text-xs"
                                      }, toDisplayString(item.subtitle), 1)) : createCommentVNode("", true),
                                      createVNode(unref(_sfc_main$5), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(CheckIcon), { class: "size-4" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["value", "disabled"]);
                                }), 128))
                              ]),
                              _: 1
                            }),
                            loadingMore.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground"
                            }, [
                              createVNode(unref(Loader2), { class: "size-4 animate-spin" }),
                              createTextVNode(" Loading more... ")
                            ])) : hasMore.value ? (openBlock(), createBlock("div", {
                              key: 1,
                              ref_key: "loadMoreSentinel",
                              ref: loadMoreSentinel,
                              class: "h-px"
                            }, null, 512)) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { placeholder: __props.placeholder }, null, 8, ["placeholder"]),
                    loadingState.value && lookupItems.value.length === 0 && isRemote.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
                    }, [
                      createVNode(unref(Loader2), { class: "size-4 animate-spin" }),
                      createTextVNode(" Loading... ")
                    ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode(unref(_sfc_main$f), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.emptyMessage), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(displayItems.value, (item) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: item.value,
                                  value: item,
                                  disabled: item.disabled
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, toDisplayString(item.label), 1),
                                    item.subtitle ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-muted-foreground ml-2 text-xs"
                                    }, toDisplayString(item.subtitle), 1)) : createCommentVNode("", true),
                                    createVNode(unref(_sfc_main$5), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(CheckIcon), { class: "size-4" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["value", "disabled"]);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          loadingMore.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground"
                          }, [
                            createVNode(unref(Loader2), { class: "size-4 animate-spin" }),
                            createTextVNode(" Loading more... ")
                          ])) : hasMore.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            ref_key: "loadMoreSentinel",
                            ref: loadMoreSentinel,
                            class: "h-px"
                          }, null, 512)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ], 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$g), {
                class: props.class,
                "as-child": ""
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$2), {
                    "as-child": "",
                    disabled: __props.disabled || loadingState.value
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), {
                        variant: "outline",
                        role: "combobox",
                        disabled: __props.disabled || loadingState.value,
                        class: "w-full justify-between gap-2 font-normal"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            class: selectedItem.value ? "text-foreground" : "text-muted-foreground"
                          }, toDisplayString(displayText.value), 3),
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            __props.clearable && selectedItem.value ? (openBlock(), createBlock(unref(XIcon), {
                              key: 0,
                              class: "size-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground",
                              onClick: withModifiers(handleClear, ["stop"])
                            })) : createCommentVNode("", true),
                            loadingState.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 1,
                              class: "size-4 shrink-0 animate-spin text-muted-foreground"
                            })) : (openBlock(), createBlock(unref(ChevronsUpDownIcon), {
                              key: 2,
                              class: "size-4 shrink-0 opacity-50"
                            }))
                          ])
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { placeholder: __props.placeholder }, null, 8, ["placeholder"]),
                  loadingState.value && lookupItems.value.length === 0 && isRemote.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
                  }, [
                    createVNode(unref(Loader2), { class: "size-4 animate-spin" }),
                    createTextVNode(" Loading... ")
                  ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(unref(_sfc_main$f), null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.emptyMessage), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$e), null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(displayItems.value, (item) => {
                              return openBlock(), createBlock(unref(_sfc_main$6), {
                                key: item.value,
                                value: item,
                                disabled: item.disabled
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(item.label), 1),
                                  item.subtitle ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-muted-foreground ml-2 text-xs"
                                  }, toDisplayString(item.subtitle), 1)) : createCommentVNode("", true),
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CheckIcon), { class: "size-4" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["value", "disabled"]);
                            }), 128))
                          ]),
                          _: 1
                        }),
                        loadingMore.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground"
                        }, [
                          createVNode(unref(Loader2), { class: "size-4 animate-spin" }),
                          createTextVNode(" Loading more... ")
                        ])) : hasMore.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          ref_key: "loadMoreSentinel",
                          ref: loadMoreSentinel,
                          class: "h-px"
                        }, null, 512)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/LookupCombobox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "LookupCombobox" });

export { __nuxt_component_3 as _ };
//# sourceMappingURL=LookupCombobox-KK7k7FV7.mjs.map
