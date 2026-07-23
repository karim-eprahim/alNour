import { _ as _sfc_main$9, a as _sfc_main$6, b as _sfc_main$3, c as _sfc_main$1, d as _sfc_main$5, e as _sfc_main$4 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$2 } from './index-B-gxPDkl.mjs';
import { defineComponent, useModel, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { AlertTriangle } from '@lucide/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: { default: "Are you sure?" },
    description: { default: "This action cannot be undone." },
    confirmText: { default: "Confirm" },
    cancelText: { default: "Cancel" },
    variant: { default: "destructive" },
    loading: { type: Boolean, default: false }
  }, {
    "open": { type: Boolean, ...{ required: true } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirm", "cancel"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const open = useModel(__props, "open");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6;
      const _component_UiDialogHeader = _sfc_main$3;
      const _component_UiDialogTitle = _sfc_main$1;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiDialogFooter = _sfc_main$4;
      const _component_UiButton = _sfc_main$2;
      _push(ssrRenderComponent(_component_UiDialog, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(AlertTriangle), { class: "size-5 text-destructive" }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_component_UiDialogTitle, { class: "text-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, { class: "text-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.description)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10" }, [
                            createVNode(unref(AlertTriangle), { class: "size-5 text-destructive" })
                          ]),
                          createVNode(_component_UiDialogTitle, { class: "text-center" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, { class: "text-center" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.description), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDialogFooter, { class: "gap-2 sm:justify-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => emit("cancel")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.cancelText)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.cancelText), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiButton, {
                          variant: __props.variant === "destructive" ? "destructive" : "default",
                          disabled: __props.loading,
                          onClick: ($event) => emit("confirm")
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.loading ? "Processing..." : __props.confirmText)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.loading ? "Processing..." : __props.confirmText), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => emit("cancel")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.cancelText), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            variant: __props.variant === "destructive" ? "destructive" : "default",
                            disabled: __props.loading,
                            onClick: ($event) => emit("confirm")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.loading ? "Processing..." : __props.confirmText), 1)
                            ]),
                            _: 1
                          }, 8, ["variant", "disabled", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10" }, [
                          createVNode(unref(AlertTriangle), { class: "size-5 text-destructive" })
                        ]),
                        createVNode(_component_UiDialogTitle, { class: "text-center" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, { class: "text-center" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.description), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDialogFooter, { class: "gap-2 sm:justify-center" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => emit("cancel")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.cancelText), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          variant: __props.variant === "destructive" ? "destructive" : "default",
                          disabled: __props.loading,
                          onClick: ($event) => emit("confirm")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.loading ? "Processing..." : __props.confirmText), 1)
                          ]),
                          _: 1
                        }, 8, ["variant", "disabled", "onClick"])
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10" }, [
                        createVNode(unref(AlertTriangle), { class: "size-5 text-destructive" })
                      ]),
                      createVNode(_component_UiDialogTitle, { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.title), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.description), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDialogFooter, { class: "gap-2 sm:justify-center" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        onClick: ($event) => emit("cancel")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.cancelText), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        variant: __props.variant === "destructive" ? "destructive" : "default",
                        disabled: __props.loading,
                        onClick: ($event) => emit("confirm")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.loading ? "Processing..." : __props.confirmText), 1)
                        ]),
                        _: 1
                      }, 8, ["variant", "disabled", "onClick"])
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/ConfirmDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_20 = Object.assign(_sfc_main, { __name: "ConfirmDialog" });

export { __nuxt_component_20 as _ };
//# sourceMappingURL=ConfirmDialog-B8hxYJp1.mjs.map
