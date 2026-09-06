import { _ as _sfc_main$6, b as _sfc_main$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4 } from './CardTitle-CZp9i7Kv.mjs';
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { User, BadgeCheck, Mail, Phone, MapPin } from '@lucide/vue';
import { b as useAuthStore } from './server.mjs';
import { u as useDistributorStore } from './store-vpQQl8Ls.mjs';
import { storeToRefs } from 'pinia';
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
import 'vue-router';
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import '@vueuse/core';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const store = useDistributorStore();
    const { user } = storeToRefs(auth);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Profile</h1><p class="text-sm text-muted-foreground">Your distributor account details</p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-4"${_scopeId2}><div class="flex size-14 items-center justify-center rounded-full bg-primary/10"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(User), { class: "size-7 text-primary" }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(user)?.name || "Distributor")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(user)?.name || "Distributor"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="inline-flex items-center gap-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(BadgeCheck), { class: "size-3" }, null, _parent4, _scopeId3));
                        _push4(` DISTRIBUTOR </span>`);
                      } else {
                        return [
                          createVNode("span", { class: "inline-flex items-center gap-1" }, [
                            createVNode(unref(BadgeCheck), { class: "size-3" }),
                            createTextVNode(" DISTRIBUTOR ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "flex size-14 items-center justify-center rounded-full bg-primary/10" }, [
                        createVNode(unref(User), { class: "size-7 text-primary" })
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(user)?.name || "Distributor"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createVNode("span", { class: "inline-flex items-center gap-1" }, [
                              createVNode(unref(BadgeCheck), { class: "size-3" }),
                              createTextVNode(" DISTRIBUTOR ")
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(user)?.email) {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Mail), { class: "size-4 text-muted-foreground shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span class="truncate"${_scopeId2}>${ssrInterpolate(unref(user).email)}</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(user)?.phone) {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Phone), { class: "size-4 text-muted-foreground shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>${ssrInterpolate(unref(user).phone)}</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(user)?.address) {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MapPin), { class: "size-4 text-muted-foreground shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span class="truncate"${_scopeId2}>${ssrInterpolate(unref(user).address)}</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(user)?.email ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(Mail), { class: "size-4 text-muted-foreground shrink-0" }),
                      createVNode("span", { class: "truncate" }, toDisplayString(unref(user).email), 1)
                    ])) : createCommentVNode("", true),
                    unref(user)?.phone ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(Phone), { class: "size-4 text-muted-foreground shrink-0" }),
                      createVNode("span", null, toDisplayString(unref(user).phone), 1)
                    ])) : createCommentVNode("", true),
                    unref(user)?.address ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(MapPin), { class: "size-4 text-muted-foreground shrink-0" }),
                      createVNode("span", { class: "truncate" }, toDisplayString(unref(user).address), 1)
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "flex size-14 items-center justify-center rounded-full bg-primary/10" }, [
                      createVNode(unref(User), { class: "size-7 text-primary" })
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(user)?.name || "Distributor"), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createVNode("span", { class: "inline-flex items-center gap-1" }, [
                            createVNode(unref(BadgeCheck), { class: "size-3" }),
                            createTextVNode(" DISTRIBUTOR ")
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx(() => [
                  unref(user)?.email ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center gap-2 text-sm"
                  }, [
                    createVNode(unref(Mail), { class: "size-4 text-muted-foreground shrink-0" }),
                    createVNode("span", { class: "truncate" }, toDisplayString(unref(user).email), 1)
                  ])) : createCommentVNode("", true),
                  unref(user)?.phone ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex items-center gap-2 text-sm"
                  }, [
                    createVNode(unref(Phone), { class: "size-4 text-muted-foreground shrink-0" }),
                    createVNode("span", null, toDisplayString(unref(user).phone), 1)
                  ])) : createCommentVNode("", true),
                  unref(user)?.address ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex items-center gap-2 text-sm"
                  }, [
                    createVNode(unref(MapPin), { class: "size-4 text-muted-foreground shrink-0" }),
                    createVNode("span", { class: "truncate" }, toDisplayString(unref(user).address), 1)
                  ])) : createCommentVNode("", true)
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
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Stock Overview`);
                      } else {
                        return [
                          createTextVNode("Stock Overview")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Items currently in your custody`);
                      } else {
                        return [
                          createTextVNode("Items currently in your custody")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Stock Overview")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Items currently in your custody")
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
                  if (!unref(store).custody) {
                    _push3(`<div class="text-sm text-muted-foreground italic"${_scopeId2}> No custody data available </div>`);
                  } else {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(store).custody.items, (item) => {
                      _push3(`<div class="flex items-center justify-between border-b pb-2 text-sm last:border-0 last:pb-0"${_scopeId2}><span class="truncate"${_scopeId2}>${ssrInterpolate(item.product.name)}</span><span class="font-semibold shrink-0 ml-2"${_scopeId2}>${ssrInterpolate(Number(item.quantity).toFixed(1))}</span></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    !unref(store).custody ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-sm text-muted-foreground italic"
                    }, " No custody data available ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(store).custody.items, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-center justify-between border-b pb-2 text-sm last:border-0 last:pb-0"
                        }, [
                          createVNode("span", { class: "truncate" }, toDisplayString(item.product.name), 1),
                          createVNode("span", { class: "font-semibold shrink-0 ml-2" }, toDisplayString(Number(item.quantity).toFixed(1)), 1)
                        ]);
                      }), 128))
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx(() => [
                      createTextVNode("Stock Overview")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Items currently in your custody")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  !unref(store).custody ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-sm text-muted-foreground italic"
                  }, " No custody data available ")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(store).custody.items, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "flex items-center justify-between border-b pb-2 text-sm last:border-0 last:pb-0"
                      }, [
                        createVNode("span", { class: "truncate" }, toDisplayString(item.product.name), 1),
                        createVNode("span", { class: "font-semibold shrink-0 ml-2" }, toDisplayString(Number(item.quantity).toFixed(1)), 1)
                      ]);
                    }), 128))
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-Cw6V4SYM.mjs.map
