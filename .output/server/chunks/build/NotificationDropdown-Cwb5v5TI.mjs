import { _ as _sfc_main$d, a as _sfc_main$1, b as _sfc_main$b, c as _sfc_main$8, d as _sfc_main$5, e as _sfc_main$9 } from './DropdownMenuTrigger-CfTxy9kg.mjs';
import { _ as _sfc_main$2 } from './index-CUpQupPt.mjs';
import { defineComponent, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { e as useNotificationStore, b as useAuthStore, d as cn } from './server.mjs';
import { Bell, X } from '@lucide/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotificationDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const notificationStore = useNotificationStore();
    const auth = useAuthStore();
    function formatTime(date) {
      const now = /* @__PURE__ */ new Date();
      const then = new Date(date);
      const diffMs = now.getTime() - then.getTime();
      const diffMins = Math.floor(diffMs / 6e4);
      const diffHours = Math.floor(diffMs / 36e5);
      const diffDays = Math.floor(diffMs / 864e5);
      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    }
    async function markAsRead(notification) {
      if (!notification.readAt) {
        await notificationStore.markAsRead(notification.id);
      }
    }
    async function markAllAsRead() {
      await notificationStore.markAllAsRead();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiDropdownMenu = _sfc_main$d;
      const _component_UiDropdownMenuTrigger = _sfc_main$1;
      const _component_UiButton = _sfc_main$2;
      const _component_UiDropdownMenuContent = _sfc_main$b;
      const _component_UiDropdownMenuLabel = _sfc_main$8;
      const _component_UiDropdownMenuSeparator = _sfc_main$5;
      const _component_UiDropdownMenuItem = _sfc_main$9;
      _push(ssrRenderComponent(_component_UiDropdownMenu, _attrs, {
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
                        if (unref(notificationStore).unreadCount > 0) {
                          _push4(`<span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white"${_scopeId3}>${ssrInterpolate(unref(notificationStore).unreadCount > 99 ? "99+" : unref(notificationStore).unreadCount)}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(Bell), { class: "size-4" }),
                          unref(notificationStore).unreadCount > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white"
                          }, toDisplayString(unref(notificationStore).unreadCount > 99 ? "99+" : unref(notificationStore).unreadCount), 1)) : createCommentVNode("", true)
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
                        unref(notificationStore).unreadCount > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white"
                        }, toDisplayString(unref(notificationStore).unreadCount > 99 ? "99+" : unref(notificationStore).unreadCount), 1)) : createCommentVNode("", true)
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
              class: "w-80"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between px-2 py-2"${_scopeId2}>`);
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
                  if (unref(notificationStore).unreadCount > 0) {
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "ghost",
                      size: "icon",
                      class: "size-6",
                      onClick: markAllAsRead
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(X), { class: "size-3.5" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(X), { class: "size-3.5" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<div class="max-h-80 overflow-y-auto"${_scopeId2}>`);
                  if (unref(notificationStore).items.length === 0 && !unref(notificationStore).loading) {
                    _push3(`<div class="px-4 py-6 text-center text-sm text-muted-foreground"${_scopeId2}> No notifications </div>`);
                  } else if (unref(notificationStore).loading) {
                    _push3(`<div class="px-4 py-6 text-center text-sm text-muted-foreground"${_scopeId2}> Loading... </div>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(notificationStore).items, (n) => {
                      _push3(`<button class="${ssrRenderClass([
                        "flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                        unref(cn)(!n.readAt && "bg-accent/50")
                      ])}"${_scopeId2}><div class="flex items-start justify-between gap-2"${_scopeId2}><span class="font-medium flex-1"${_scopeId2}>${ssrInterpolate(n.title)}</span><span class="text-[10px] text-muted-foreground/60 whitespace-nowrap"${_scopeId2}>${ssrInterpolate(formatTime(n.createdAt))}</span></div><span class="text-xs text-muted-foreground line-clamp-2"${_scopeId2}>${ssrInterpolate(n.message)}</span></button>`);
                    });
                    _push3(`<!--]-->`);
                  }
                  if (unref(notificationStore).hasMore && !unref(notificationStore).loading) {
                    _push3(`<div class="px-4 py-2 text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "ghost",
                      size: "sm",
                      class: "w-full",
                      onClick: unref(notificationStore).loadMore
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Load more `);
                        } else {
                          return [
                            createTextVNode(" Load more ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiDropdownMenuItem, {
                    class: "justify-center text-xs font-medium text-primary",
                    onClick: ($event) => unref(auth).userRole === "DISTRIBUTOR" ? _ctx.$router.push("distributor/notifications") : _ctx.$router.push("/notifications")
                  }, {
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
                    createVNode("div", { class: "flex items-center justify-between px-2 py-2" }, [
                      createVNode(_component_UiDropdownMenuLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Notifications")
                        ]),
                        _: 1
                      }),
                      unref(notificationStore).unreadCount > 0 ? (openBlock(), createBlock(_component_UiButton, {
                        key: 0,
                        variant: "ghost",
                        size: "icon",
                        class: "size-6",
                        onClick: markAllAsRead
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(X), { class: "size-3.5" })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_UiDropdownMenuSeparator),
                    createVNode("div", { class: "max-h-80 overflow-y-auto" }, [
                      unref(notificationStore).items.length === 0 && !unref(notificationStore).loading ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "px-4 py-6 text-center text-sm text-muted-foreground"
                      }, " No notifications ")) : unref(notificationStore).loading ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "px-4 py-6 text-center text-sm text-muted-foreground"
                      }, " Loading... ")) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(notificationStore).items, (n) => {
                        return openBlock(), createBlock("button", {
                          key: n.id,
                          onClick: ($event) => markAsRead(n),
                          class: [
                            "flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                            unref(cn)(!n.readAt && "bg-accent/50")
                          ]
                        }, [
                          createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                            createVNode("span", { class: "font-medium flex-1" }, toDisplayString(n.title), 1),
                            createVNode("span", { class: "text-[10px] text-muted-foreground/60 whitespace-nowrap" }, toDisplayString(formatTime(n.createdAt)), 1)
                          ]),
                          createVNode("span", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(n.message), 1)
                        ], 10, ["onClick"]);
                      }), 128)),
                      unref(notificationStore).hasMore && !unref(notificationStore).loading ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "px-4 py-2 text-center"
                      }, [
                        createVNode(_component_UiButton, {
                          variant: "ghost",
                          size: "sm",
                          class: "w-full",
                          onClick: unref(notificationStore).loadMore
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Load more ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_UiDropdownMenuSeparator),
                    createVNode(_component_UiDropdownMenuItem, {
                      class: "justify-center text-xs font-medium text-primary",
                      onClick: ($event) => unref(auth).userRole === "DISTRIBUTOR" ? _ctx.$router.push("distributor/notifications") : _ctx.$router.push("/notifications")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" View all notifications ")
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
                    size: "icon",
                    class: "size-8 relative"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Bell), { class: "size-4" }),
                      unref(notificationStore).unreadCount > 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white"
                      }, toDisplayString(unref(notificationStore).unreadCount > 99 ? "99+" : unref(notificationStore).unreadCount), 1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiDropdownMenuContent, {
                align: "end",
                class: "w-80"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between px-2 py-2" }, [
                    createVNode(_component_UiDropdownMenuLabel, null, {
                      default: withCtx(() => [
                        createTextVNode("Notifications")
                      ]),
                      _: 1
                    }),
                    unref(notificationStore).unreadCount > 0 ? (openBlock(), createBlock(_component_UiButton, {
                      key: 0,
                      variant: "ghost",
                      size: "icon",
                      class: "size-6",
                      onClick: markAllAsRead
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "size-3.5" })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode(_component_UiDropdownMenuSeparator),
                  createVNode("div", { class: "max-h-80 overflow-y-auto" }, [
                    unref(notificationStore).items.length === 0 && !unref(notificationStore).loading ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "px-4 py-6 text-center text-sm text-muted-foreground"
                    }, " No notifications ")) : unref(notificationStore).loading ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-4 py-6 text-center text-sm text-muted-foreground"
                    }, " Loading... ")) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(notificationStore).items, (n) => {
                      return openBlock(), createBlock("button", {
                        key: n.id,
                        onClick: ($event) => markAsRead(n),
                        class: [
                          "flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                          unref(cn)(!n.readAt && "bg-accent/50")
                        ]
                      }, [
                        createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                          createVNode("span", { class: "font-medium flex-1" }, toDisplayString(n.title), 1),
                          createVNode("span", { class: "text-[10px] text-muted-foreground/60 whitespace-nowrap" }, toDisplayString(formatTime(n.createdAt)), 1)
                        ]),
                        createVNode("span", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(n.message), 1)
                      ], 10, ["onClick"]);
                    }), 128)),
                    unref(notificationStore).hasMore && !unref(notificationStore).loading ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "px-4 py-2 text-center"
                    }, [
                      createVNode(_component_UiButton, {
                        variant: "ghost",
                        size: "sm",
                        class: "w-full",
                        onClick: unref(notificationStore).loadMore
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Load more ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode(_component_UiDropdownMenuSeparator),
                  createVNode(_component_UiDropdownMenuItem, {
                    class: "justify-center text-xs font-medium text-primary",
                    onClick: ($event) => unref(auth).userRole === "DISTRIBUTOR" ? _ctx.$router.push("distributor/notifications") : _ctx.$router.push("/notifications")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" View all notifications ")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/NotificationDropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NotificationDropdown = Object.assign(_sfc_main, { __name: "NotificationDropdown" });

export { NotificationDropdown as N };
//# sourceMappingURL=NotificationDropdown-Cwb5v5TI.mjs.map
