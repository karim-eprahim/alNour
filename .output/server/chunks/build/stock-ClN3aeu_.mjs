import { _ as _sfc_main$1 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-y5B8zlzY.mjs';
import { _ as _sfc_main$6, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$8, a as _sfc_main$2, b as _sfc_main$4$1, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-f7ALV9Yi.mjs';
import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Search, PackageOpen, Package } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
import '@vueuse/core';
import './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stock",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const search = ref("");
    const filteredCustodies = computed(() => {
      if (!search.value) return store.custodies;
      const q = search.value.toLowerCase();
      return store.custodies.filter(
        (c) => c.product.name.toLowerCase().includes(q) || c.product.nameAr.toLowerCase().includes(q) || c.product.sku.toLowerCase().includes(q)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$2;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$1;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">My Stock</h1><p class="text-sm text-muted-foreground">Products currently in your custody</p></div></div><div class="relative">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Search products...",
        class: "pl-9"
      }, null, _parent));
      _push(`</div>`);
      if (unref(store).loading) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(filteredCustodies).length === 0) {
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center gap-4 py-12" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(PackageOpen), { class: "size-12 text-muted-foreground/60" }, null, _parent3, _scopeId2));
                    _push3(`<div class="text-center"${_scopeId2}><p class="text-lg font-medium"${_scopeId2}>No stock</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(search) ? "No products match your search" : "You have no products in custody. Visit the warehouse to load stock.")}</p></div>`);
                  } else {
                    return [
                      createVNode(unref(PackageOpen), { class: "size-12 text-muted-foreground/60" }),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("p", { class: "text-lg font-medium" }, "No stock"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(search) ? "No products match your search" : "You have no products in custody. Visit the warehouse to load stock."), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "flex flex-col items-center gap-4 py-12" }, {
                  default: withCtx(() => [
                    createVNode(unref(PackageOpen), { class: "size-12 text-muted-foreground/60" }),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("p", { class: "text-lg font-medium" }, "No stock"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(search) ? "No products match your search" : "You have no products in custody. Visit the warehouse to load stock."), 1)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!--[--><div class="hidden lg:block">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiTable, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Product`);
                                          } else {
                                            return [
                                              createTextVNode("Product")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`SKU`);
                                          } else {
                                            return [
                                              createTextVNode("SKU")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Quantity`);
                                          } else {
                                            return [
                                              createTextVNode("Quantity")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Selling Price`);
                                          } else {
                                            return [
                                              createTextVNode("Selling Price")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Total Value`);
                                          } else {
                                            return [
                                              createTextVNode("Total Value")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Product")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("SKU")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Quantity")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Selling Price")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Total Value")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Product")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("SKU")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Quantity")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Selling Price")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Total Value")
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiTableBody, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(filteredCustodies), (item) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: item.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="flex items-center gap-3"${_scopeId6}><div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"${_scopeId6}>`);
                                              _push7(ssrRenderComponent(unref(Package), { class: "size-5 text-muted-foreground" }, null, _parent7, _scopeId6));
                                              _push7(`</div><div${_scopeId6}><p class="text-sm font-medium"${_scopeId6}>${ssrInterpolate(item.product.name)}</p><p class="text-xs text-muted-foreground"${_scopeId6}>${ssrInterpolate(item.product.nameAr)}</p></div></div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "flex items-center gap-3" }, [
                                                  createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted" }, [
                                                    createVNode(unref(Package), { class: "size-5 text-muted-foreground" })
                                                  ]),
                                                  createVNode("div", null, [
                                                    createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product.name), 1),
                                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product.nameAr), 1)
                                                  ])
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(item.product.sku)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(item.product.sku), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(item.quantity.toFixed(1))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(item.quantity.toFixed(1)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(item.product.sellingPrice?.toFixed(2) || "—")}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-semibold" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate((item.quantity * (item.product.sellingPrice || 0)).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-3" }, [
                                                createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted" }, [
                                                  createVNode(unref(Package), { class: "size-5 text-muted-foreground" })
                                                ]),
                                                createVNode("div", null, [
                                                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product.name), 1),
                                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product.nameAr), 1)
                                                ])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.product.sku), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.quantity.toFixed(1)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-semibold" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCustodies), (item) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-3" }, [
                                              createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted" }, [
                                                createVNode(unref(Package), { class: "size-5 text-muted-foreground" })
                                              ]),
                                              createVNode("div", null, [
                                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product.name), 1),
                                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product.nameAr), 1)
                                              ])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.product.sku), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.quantity.toFixed(1)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-semibold" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Product")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("SKU")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Quantity")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selling Price")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Total Value")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiTableBody, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCustodies), (item) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-3" }, [
                                            createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted" }, [
                                              createVNode(unref(Package), { class: "size-5 text-muted-foreground" })
                                            ]),
                                            createVNode("div", null, [
                                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product.name), 1),
                                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product.nameAr), 1)
                                            ])
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.product.sku), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.quantity.toFixed(1)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right font-semibold" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiTable, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Product")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("SKU")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Quantity")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Selling Price")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Total Value")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiTableBody, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCustodies), (item) => {
                                return openBlock(), createBlock(_component_UiTableRow, {
                                  key: item.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-3" }, [
                                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted" }, [
                                            createVNode(unref(Package), { class: "size-5 text-muted-foreground" })
                                          ]),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product.name), 1),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product.nameAr), 1)
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.product.sku), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.quantity.toFixed(1)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right font-semibold" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "p-0" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiTable, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Product")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("SKU")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Quantity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Selling Price")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Total Value")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTableBody, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCustodies), (item) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: item.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted" }, [
                                          createVNode(unref(Package), { class: "size-5 text-muted-foreground" })
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product.name), 1),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product.nameAr), 1)
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.product.sku), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right font-medium" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.quantity.toFixed(1)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right font-semibold" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
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
        _push(`</div><div class="grid gap-3 lg:hidden"><!--[-->`);
        ssrRenderList(unref(filteredCustodies), (item) => {
          _push(ssrRenderComponent(_component_UiCard, {
            key: item.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex items-start gap-3 p-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Package), { class: "size-6 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="min-w-0 flex-1"${_scopeId2}><p class="text-sm font-medium truncate"${_scopeId2}>${ssrInterpolate(item.product.name)}</p><p class="text-xs text-muted-foreground truncate"${_scopeId2}>${ssrInterpolate(item.product.nameAr)}</p><div class="mt-2 flex items-center justify-between"${_scopeId2}><span class="text-xs text-muted-foreground"${_scopeId2}>Qty: <strong${_scopeId2}>${ssrInterpolate(item.quantity.toFixed(1))}</strong></span><span class="text-xs text-muted-foreground"${_scopeId2}>Price: <strong${_scopeId2}>${ssrInterpolate(item.product.sellingPrice?.toFixed(2) || "—")}</strong></span></div><p class="mt-1 text-sm font-semibold"${_scopeId2}>Total: ${ssrInterpolate((item.quantity * (item.product.sellingPrice || 0)).toFixed(2))}</p></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted" }, [
                          createVNode(unref(Package), { class: "size-6 text-muted-foreground" })
                        ]),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(item.product.name), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground truncate" }, toDisplayString(item.product.nameAr), 1),
                          createVNode("div", { class: "mt-2 flex items-center justify-between" }, [
                            createVNode("span", { class: "text-xs text-muted-foreground" }, [
                              createTextVNode("Qty: "),
                              createVNode("strong", null, toDisplayString(item.quantity.toFixed(1)), 1)
                            ]),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, [
                              createTextVNode("Price: "),
                              createVNode("strong", null, toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                            ])
                          ]),
                          createVNode("p", { class: "mt-1 text-sm font-semibold" }, "Total: " + toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardContent, { class: "flex items-start gap-3 p-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted" }, [
                        createVNode(unref(Package), { class: "size-6 text-muted-foreground" })
                      ]),
                      createVNode("div", { class: "min-w-0 flex-1" }, [
                        createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(item.product.name), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground truncate" }, toDisplayString(item.product.nameAr), 1),
                        createVNode("div", { class: "mt-2 flex items-center justify-between" }, [
                          createVNode("span", { class: "text-xs text-muted-foreground" }, [
                            createTextVNode("Qty: "),
                            createVNode("strong", null, toDisplayString(item.quantity.toFixed(1)), 1)
                          ]),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, [
                            createTextVNode("Price: "),
                            createVNode("strong", null, toDisplayString(item.product.sellingPrice?.toFixed(2) || "—"), 1)
                          ])
                        ]),
                        createVNode("p", { class: "mt-1 text-sm font-semibold" }, "Total: " + toDisplayString((item.quantity * (item.product.sellingPrice || 0)).toFixed(2)), 1)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/stock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stock-ClN3aeu_.mjs.map
