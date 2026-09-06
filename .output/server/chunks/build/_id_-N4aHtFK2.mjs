import { _ as _sfc_main$2 } from './index-CUpQupPt.mjs';
import { _ as _sfc_main$3 } from './index-BJ9JiLtz.mjs';
import { _ as _sfc_main$6, a as _sfc_main$4, b as _sfc_main$1$1, c as _sfc_main$5 } from './CardTitle-CZp9i7Kv.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, resolveDynamicComponent, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrRenderClass } from 'vue/server-renderer';
import { a as useRoute, n as navigateTo, _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$8, a as _sfc_main$7, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-BnIov8Zr.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$3, d as _sfc_main$5$2, e as _sfc_main$4$2 } from './DialogTrigger-C62yxjGQ.mjs';
import { _ as _sfc_main$1$4, a as _sfc_main$a } from './RadioGroupItem-yMIpcpyE.mjs';
import { _ as _sfc_main$b } from './Input-BT7sGQjY.mjs';
import { _ as _sfc_main$c } from './Label-C-S6OHzh.mjs';
import { _ as _sfc_main$a$1, a as _sfc_main$1$5, b as _sfc_main$d, c as _sfc_main$9$1, d as _sfc_main$7$2 } from './SelectValue-CvBB3u-2.mjs';
import { CircleCheck, Truck, PackageCheck, ArrowLeft, AlertTriangle, CircleX, Satellite, Phone, MapPin, CalendarDays, PackageX, RotateCcw } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { o as orderStatusVariant, a as orderStatusLabel, p as priorityVariant, d as deliveryResultVariant, b as deliveryResultLabel } from './orderColumns-BCbVFJ6U.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useDistributorStore } from './store-vpQQl8Ls.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
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
import 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';
import './nuxt-link-CAjNCayq.mjs';

function buildDirectionsUrl(latitude, longitude) {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CustomerLocationMap",
  __ssrInlineRender: true,
  props: {
    customerName: {},
    address: {},
    latitude: {},
    longitude: {}
  },
  setup(__props) {
    const props = __props;
    const mapEl = ref(null);
    const hasLocation = computed(() => props.latitude != null && props.longitude != null);
    async function ensureMap() {
      if (!mapEl.value || true) return;
    }
    watch(hasLocation, () => {
      ensureMap();
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasLocation)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          ref_key: "mapEl",
          ref: mapEl,
          class: "customer-location-map-root h-full w-full"
        }, _attrs))} data-v-6b7be613></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full min-h-40 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground" }, _attrs))} data-v-6b7be613> Customer location is not available. </div>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/map/CustomerLocationMap.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-6b7be613"]]), { __name: "CustomerLocationMap" });
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
function useDistributorTracking() {
  const trackingId = ref(null);
  const status = ref("idle");
  const currentLocation = ref(null);
  const error = ref(null);
  const lastSentAt = ref(null);
  const positionsSent = ref(0);
  let watcherId = null;
  let sendTimer = null;
  function supportsGeolocation() {
    return false;
  }
  function cleanupWatchers() {
    if (watcherId !== null && supportsGeolocation()) {
      (void 0).geolocation.clearWatch(watcherId);
    }
    watcherId = null;
    if (sendTimer) {
      clearInterval(sendTimer);
      sendTimer = null;
    }
  }
  function startGpsWatcher() {
    {
      error.value = "Geolocation is not supported by this browser/device.";
      return;
    }
  }
  function start(trackingSessionId) {
    cleanupWatchers();
    trackingId.value = trackingSessionId;
    currentLocation.value = null;
    lastSentAt.value = null;
    positionsSent.value = 0;
    error.value = null;
    startGpsWatcher();
    sendTimer = setInterval();
    status.value = "tracking";
  }
  function stop() {
    cleanupWatchers();
    status.value = "stopped";
  }
  return {
    trackingId,
    status,
    currentLocation,
    error,
    lastSentAt,
    positionsSent,
    start,
    stop
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const store = useDistributorStore();
    const {
      trackingId,
      status: trackingStatus,
      currentLocation,
      error: trackingError,
      lastSentAt,
      positionsSent,
      start: startTracking,
      stop: stopTracking
    } = useDistributorTracking();
    const actionLoading = ref(false);
    const showDeliveryDialog = ref(false);
    const deliveryForm = reactive({
      result: "FULL",
      items: [],
      partialDeliveryReason: "",
      cancelReason: "",
      paidAmount: 0,
      paymentMethod: "CASH"
    });
    const order = computed(() => store.currentOrder);
    const availableActions = computed(() => {
      const status = order.value?.status;
      const actions = [];
      if (status === "ASSIGNED") actions.push({ key: "ACCEPTED", label: "Accept Order", icon: CircleCheck });
      if (status === "ACCEPTED") actions.push({ key: "OUT_FOR_DELIVERY", label: "Start Delivery", icon: Truck });
      if (status === "OUT_FOR_DELIVERY") actions.push({ key: "DELIVER", label: "Confirm Delivery", icon: PackageCheck });
      return actions;
    });
    const nextActionLabel = computed(() => {
      const first = availableActions.value[0];
      return first?.label ?? null;
    });
    const partialDeliveryReasons = ["Customer Refused Remaining Quantity", "Out Of Stock", "Damaged Goods", "Other"];
    const cancelReasons = ["Customer Refused", "Duplicate Order", "Wrong Order", "Other"];
    function syncTrackingFromOrder() {
      const o = order.value;
      const session = o?.tracking;
      if (o?.status === "OUT_FOR_DELIVERY" && session?.status === "ACTIVE") {
        if (trackingId.value !== session.id) {
          startTracking(session.id);
        }
      } else if (trackingStatus.value === "tracking") {
        stopTracking();
      }
    }
    const showTracking = computed(() => order.value?.tracking?.status === "ACTIVE");
    function seedDeliveryForm() {
      const o = order.value;
      if (!o) return;
      deliveryForm.result = "FULL";
      deliveryForm.items = o.items.map((item) => ({ productId: item.product.id, quantity: Number(item.quantity) }));
      deliveryForm.partialDeliveryReason = "";
      deliveryForm.cancelReason = "";
      deliveryForm.paidAmount = 0;
      deliveryForm.paymentMethod = "CASH";
    }
    function openDeliveryDialog() {
      seedDeliveryForm();
      showDeliveryDialog.value = true;
    }
    function deliveredTotal() {
      const o = order.value;
      if (!o) return 0;
      return deliveryForm.items.reduce((sum, item) => {
        const original = o.items.find((it) => it.product.id === item.productId);
        return sum + (item.quantity || 0) * (original ? Number(original.unitPrice) : 0);
      }, 0);
    }
    async function handleAction(key) {
      if (!order.value) return;
      if (key === "DELIVER") {
        openDeliveryDialog();
        return;
      }
      actionLoading.value = true;
      try {
        await store.updateOrderStatus(order.value.id, key);
        toast.success(`Order ${order.value.orderNumber} updated`);
        await store.fetchOrder(order.value.id);
        syncTrackingFromOrder();
      } catch (err) {
        toast.error(err?.message || "Failed to update order");
      } finally {
        actionLoading.value = false;
      }
    }
    async function submitDelivery() {
      if (!order.value) return;
      const { result, items, partialDeliveryReason, cancelReason, paidAmount, paymentMethod } = deliveryForm;
      if ((result === "FULL" || result === "PARTIAL") && paidAmount > deliveredTotal()) {
        toast.error("Paid amount cannot exceed the delivery total");
        return;
      }
      if (result === "PARTIAL") {
        const invalid = items.some((item) => item.quantity < 0 || item.quantity > Number(order.value.items.find((it) => it.product.id === item.productId).quantity));
        if (invalid) {
          toast.error("Delivered quantity must be between 0 and the ordered quantity");
          return;
        }
        if (items.every((item) => item.quantity === Number(order.value.items.find((it) => it.product.id === item.productId).quantity))) {
          toast.error("Delivered quantities match the full order. Use Full Delivery instead.");
          return;
        }
      }
      actionLoading.value = true;
      try {
        await store.confirmDelivery(order.value.id, {
          result,
          items: result === "PARTIAL" ? items : void 0,
          partialDeliveryReason: result === "PARTIAL" ? partialDeliveryReason || void 0 : void 0,
          cancelReason: result === "CANCELLED" ? cancelReason || void 0 : void 0,
          paidAmount: (result === "FULL" || result === "PARTIAL") && paidAmount > 0 ? paidAmount : void 0,
          paymentMethod
        });
        toast.success(`Delivery confirmed`);
        showDeliveryDialog.value = false;
        await store.fetchOrder(order.value.id);
        syncTrackingFromOrder();
      } catch (err) {
        toast.error(err?.message || "Failed to confirm delivery");
      } finally {
        actionLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      const _component_UiBadge = _sfc_main$3;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_CustomerLocationMap = __nuxt_component_6;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$7;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$2;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiRadioGroup = _sfc_main$1$4;
      const _component_UiRadioGroupItem = _sfc_main$a;
      const _component_UiInput = _sfc_main$b;
      const _component_UiLabel = _sfc_main$c;
      const _component_UiSelect = _sfc_main$a$1;
      const _component_UiSelectTrigger = _sfc_main$1$5;
      const _component_UiSelectValue = _sfc_main$d;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$2;
      const _component_UiDialogFooter = _sfc_main$4$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/orders")
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
      if (unref(order)) {
        _push(ssrRenderComponent(PageHeader, {
          title: unref(order).orderNumber,
          description: `Created ${new Date(unref(order).createdAt).toLocaleDateString()}`
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiBadge, {
                variant: unref(orderStatusVariant)(unref(order).status),
                class: "text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(orderStatusLabel)(unref(order).status))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(orderStatusLabel)(unref(order).status)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiBadge, {
                variant: unref(priorityVariant)(unref(order).priority),
                class: "text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(order).priority)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(order).priority), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(order).deliveryResult !== "NONE") {
                _push2(ssrRenderComponent(_component_UiBadge, {
                  variant: unref(deliveryResultVariant)(unref(order).deliveryResult),
                  class: "text-xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(deliveryResultLabel)(unref(order).deliveryResult))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(deliveryResultLabel)(unref(order).deliveryResult)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_UiBadge, {
                  variant: unref(orderStatusVariant)(unref(order).status),
                  class: "text-xs"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(orderStatusLabel)(unref(order).status)), 1)
                  ]),
                  _: 1
                }, 8, ["variant"]),
                createVNode(_component_UiBadge, {
                  variant: unref(priorityVariant)(unref(order).priority),
                  class: "text-xs"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(order).priority), 1)
                  ]),
                  _: 1
                }, 8, ["variant"]),
                unref(order).deliveryResult !== "NONE" ? (openBlock(), createBlock(_component_UiBadge, {
                  key: 0,
                  variant: unref(deliveryResultVariant)(unref(order).deliveryResult),
                  class: "text-xs"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(deliveryResultLabel)(unref(order).deliveryResult)), 1)
                  ]),
                  _: 1
                }, 8, ["variant"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(order)) {
        _push(`<!--[-->`);
        if (unref(order).deliveryResult === "PARTIAL" && unref(order).partialDeliveryReason) {
          _push(`<div class="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">`);
          _push(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 shrink-0" }, null, _parent));
          _push(`<span>Partial delivery reason: <span class="font-medium">${ssrInterpolate(unref(order).partialDeliveryReason)}</span></span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(order).deliveryResult === "CANCELLED" && unref(order).cancelReason) {
          _push(`<div class="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">`);
          _push(ssrRenderComponent(unref(CircleX), { class: "size-4 shrink-0" }, null, _parent));
          _push(`<span>Cancel reason: <span class="font-medium">${ssrInterpolate(unref(order).cancelReason)}</span></span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(showTracking)) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}><span class="relative flex size-2.5"${_scopeId2}><span class="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"${_scopeId2}></span><span class="relative inline-flex size-2.5 rounded-full bg-green-500"${_scopeId2}></span></span><p class="text-sm font-medium"${_scopeId2}>GPS tracking active</p>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: "success",
                        class: "ml-auto text-[10px]"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`OUT_FOR_DELIVERY`);
                          } else {
                            return [
                              createTextVNode("OUT_FOR_DELIVERY")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      if (unref(currentLocation)) {
                        _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Satellite), { class: "size-4 shrink-0 text-muted-foreground" }, null, _parent3, _scopeId2));
                        _push3(`<span class="tabular-nums"${_scopeId2}>${ssrInterpolate(unref(currentLocation).latitude.toFixed(6))}, ${ssrInterpolate(unref(currentLocation).longitude.toFixed(6))}</span>`);
                        if (unref(currentLocation).accuracy != null) {
                          _push3(`<span class="text-xs text-muted-foreground"${_scopeId2}> ±${ssrInterpolate(Math.round(unref(currentLocation).accuracy))}m </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(trackingError)) {
                        _push3(`<div class="flex items-center gap-2 text-sm text-destructive"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 shrink-0" }, null, _parent3, _scopeId2));
                        _push3(`<span${_scopeId2}>${ssrInterpolate(unref(trackingError))}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"${_scopeId2}>`);
                      if (unref(lastSentAt)) {
                        _push3(`<span${_scopeId2}> Last location sent: ${ssrInterpolate(new Date(unref(lastSentAt)).toLocaleTimeString())}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(positionsSent) > 0) {
                        _push3(`<span${_scopeId2}>${ssrInterpolate(unref(positionsSent))} update(s) sent</span>`);
                      } else {
                        _push3(`<span${_scopeId2}>Waiting for first GPS fix…</span>`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("span", { class: "relative flex size-2.5" }, [
                            createVNode("span", { class: "absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" }),
                            createVNode("span", { class: "relative inline-flex size-2.5 rounded-full bg-green-500" })
                          ]),
                          createVNode("p", { class: "text-sm font-medium" }, "GPS tracking active"),
                          createVNode(_component_UiBadge, {
                            variant: "success",
                            class: "ml-auto text-[10px]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("OUT_FOR_DELIVERY")
                            ]),
                            _: 1
                          })
                        ]),
                        unref(currentLocation) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2 text-sm"
                        }, [
                          createVNode(unref(Satellite), { class: "size-4 shrink-0 text-muted-foreground" }),
                          createVNode("span", { class: "tabular-nums" }, toDisplayString(unref(currentLocation).latitude.toFixed(6)) + ", " + toDisplayString(unref(currentLocation).longitude.toFixed(6)), 1),
                          unref(currentLocation).accuracy != null ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-xs text-muted-foreground"
                          }, " ±" + toDisplayString(Math.round(unref(currentLocation).accuracy)) + "m ", 1)) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        unref(trackingError) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center gap-2 text-sm text-destructive"
                        }, [
                          createVNode(unref(AlertTriangle), { class: "size-4 shrink-0" }),
                          createVNode("span", null, toDisplayString(unref(trackingError)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" }, [
                          unref(lastSentAt) ? (openBlock(), createBlock("span", { key: 0 }, " Last location sent: " + toDisplayString(new Date(unref(lastSentAt)).toLocaleTimeString()), 1)) : createCommentVNode("", true),
                          unref(positionsSent) > 0 ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(positionsSent)) + " update(s) sent", 1)) : (openBlock(), createBlock("span", { key: 2 }, "Waiting for first GPS fix…"))
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardContent, { class: "space-y-2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("span", { class: "relative flex size-2.5" }, [
                          createVNode("span", { class: "absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" }),
                          createVNode("span", { class: "relative inline-flex size-2.5 rounded-full bg-green-500" })
                        ]),
                        createVNode("p", { class: "text-sm font-medium" }, "GPS tracking active"),
                        createVNode(_component_UiBadge, {
                          variant: "success",
                          class: "ml-auto text-[10px]"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("OUT_FOR_DELIVERY")
                          ]),
                          _: 1
                        })
                      ]),
                      unref(currentLocation) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 text-sm"
                      }, [
                        createVNode(unref(Satellite), { class: "size-4 shrink-0 text-muted-foreground" }),
                        createVNode("span", { class: "tabular-nums" }, toDisplayString(unref(currentLocation).latitude.toFixed(6)) + ", " + toDisplayString(unref(currentLocation).longitude.toFixed(6)), 1),
                        unref(currentLocation).accuracy != null ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-xs text-muted-foreground"
                        }, " ±" + toDisplayString(Math.round(unref(currentLocation).accuracy)) + "m ", 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      unref(trackingError) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-2 text-sm text-destructive"
                      }, [
                        createVNode(unref(AlertTriangle), { class: "size-4 shrink-0" }),
                        createVNode("span", null, toDisplayString(unref(trackingError)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" }, [
                        unref(lastSentAt) ? (openBlock(), createBlock("span", { key: 0 }, " Last location sent: " + toDisplayString(new Date(unref(lastSentAt)).toLocaleTimeString()), 1)) : createCommentVNode("", true),
                        unref(positionsSent) > 0 ? (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(positionsSent)) + " update(s) sent", 1)) : (openBlock(), createBlock("span", { key: 2 }, "Waiting for first GPS fix…"))
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
          _push(`<!---->`);
        }
        _push(`<div class="grid gap-6 lg:grid-cols-2"><div class="space-y-6">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Customer`);
                        } else {
                          return [
                            createTextVNode("Customer")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Customer")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-2 text-sm" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="font-medium"${_scopeId2}>${ssrInterpolate(unref(order).customer.name)}</p><p class="flex items-center gap-2 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Phone), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(order).customer.phone || "—")}</p><p class="flex items-center gap-2 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MapPin), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(order).customer.address || "—")}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "font-medium" }, toDisplayString(unref(order).customer.name), 1),
                      createVNode("p", { class: "flex items-center gap-2 text-muted-foreground" }, [
                        createVNode(unref(Phone), { class: "size-3.5" }),
                        createTextVNode(" " + toDisplayString(unref(order).customer.phone || "—"), 1)
                      ]),
                      createVNode("p", { class: "flex items-center gap-2 text-muted-foreground" }, [
                        createVNode(unref(MapPin), { class: "size-3.5" }),
                        createTextVNode(" " + toDisplayString(unref(order).customer.address || "—"), 1)
                      ])
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
                        createTextVNode("Customer")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-2 text-sm" }, {
                  default: withCtx(() => [
                    createVNode("p", { class: "font-medium" }, toDisplayString(unref(order).customer.name), 1),
                    createVNode("p", { class: "flex items-center gap-2 text-muted-foreground" }, [
                      createVNode(unref(Phone), { class: "size-3.5" }),
                      createTextVNode(" " + toDisplayString(unref(order).customer.phone || "—"), 1)
                    ]),
                    createVNode("p", { class: "flex items-center gap-2 text-muted-foreground" }, [
                      createVNode(unref(MapPin), { class: "size-3.5" }),
                      createTextVNode(" " + toDisplayString(unref(order).customer.address || "—"), 1)
                    ])
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
                          _push4(`Delivery Location`);
                        } else {
                          return [
                            createTextVNode("Delivery Location")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Delivery Location")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm"${_scopeId2}><p class="font-medium"${_scopeId2}>${ssrInterpolate(unref(order).customer.name)}</p><p class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(order).customer.address || "—")}</p></div>`);
                    _push3(ssrRenderComponent(_component_CustomerLocationMap, {
                      "customer-name": unref(order).customer.name,
                      address: unref(order).customer.address,
                      latitude: unref(order).customer.latitude ?? null,
                      longitude: unref(order).customer.longitude ?? null,
                      class: "h-56 w-full overflow-hidden rounded-lg border"
                    }, null, _parent3, _scopeId2));
                    if (unref(order).customer.latitude != null && unref(order).customer.longitude != null) {
                      _push3(`<a${ssrRenderAttr("href", unref(buildDirectionsUrl)(unref(order).customer.latitude, unref(order).customer.longitude))} target="_blank" rel="noopener noreferrer" class="block w-full"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, { class: "w-full" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(MapPin), { class: "size-4" }, null, _parent4, _scopeId3));
                            _push4(` Navigate to Customer `);
                          } else {
                            return [
                              createVNode(unref(MapPin), { class: "size-4" }),
                              createTextVNode(" Navigate to Customer ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</a>`);
                    } else {
                      _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Customer location is not available.</p>`);
                    }
                  } else {
                    return [
                      createVNode("div", { class: "text-sm" }, [
                        createVNode("p", { class: "font-medium" }, toDisplayString(unref(order).customer.name), 1),
                        createVNode("p", { class: "text-muted-foreground" }, toDisplayString(unref(order).customer.address || "—"), 1)
                      ]),
                      createVNode(_component_CustomerLocationMap, {
                        "customer-name": unref(order).customer.name,
                        address: unref(order).customer.address,
                        latitude: unref(order).customer.latitude ?? null,
                        longitude: unref(order).customer.longitude ?? null,
                        class: "h-56 w-full overflow-hidden rounded-lg border"
                      }, null, 8, ["customer-name", "address", "latitude", "longitude"]),
                      unref(order).customer.latitude != null && unref(order).customer.longitude != null ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: unref(buildDirectionsUrl)(unref(order).customer.latitude, unref(order).customer.longitude),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "block w-full"
                      }, [
                        createVNode(_component_UiButton, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(unref(MapPin), { class: "size-4" }),
                            createTextVNode(" Navigate to Customer ")
                          ]),
                          _: 1
                        })
                      ], 8, ["href"])) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-sm text-muted-foreground"
                      }, "Customer location is not available."))
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
                        createTextVNode("Delivery Location")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-sm" }, [
                      createVNode("p", { class: "font-medium" }, toDisplayString(unref(order).customer.name), 1),
                      createVNode("p", { class: "text-muted-foreground" }, toDisplayString(unref(order).customer.address || "—"), 1)
                    ]),
                    createVNode(_component_CustomerLocationMap, {
                      "customer-name": unref(order).customer.name,
                      address: unref(order).customer.address,
                      latitude: unref(order).customer.latitude ?? null,
                      longitude: unref(order).customer.longitude ?? null,
                      class: "h-56 w-full overflow-hidden rounded-lg border"
                    }, null, 8, ["customer-name", "address", "latitude", "longitude"]),
                    unref(order).customer.latitude != null && unref(order).customer.longitude != null ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: unref(buildDirectionsUrl)(unref(order).customer.latitude, unref(order).customer.longitude),
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "block w-full"
                    }, [
                      createVNode(_component_UiButton, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(unref(MapPin), { class: "size-4" }),
                          createTextVNode(" Navigate to Customer ")
                        ]),
                        _: 1
                      })
                    ], 8, ["href"])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-sm text-muted-foreground"
                    }, "Customer location is not available."))
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
                          _push4(`Delivery Information`);
                        } else {
                          return [
                            createTextVNode("Delivery Information")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Delivery Information")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-2 text-sm" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CalendarDays), { class: "size-3.5 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-muted-foreground"${_scopeId2}>Expected Delivery</span><span class="ml-auto font-medium"${_scopeId2}>${ssrInterpolate(unref(order).expectedDeliveryDate ? new Date(unref(order).expectedDeliveryDate).toLocaleDateString() : "—")}</span></div><div class="border-t pt-2"${_scopeId2}><p class="text-xs font-medium text-muted-foreground mb-1"${_scopeId2}>Delivery Notes</p><p class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(order).deliveryNotes || "—")}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(CalendarDays), { class: "size-3.5 text-muted-foreground" }),
                        createVNode("span", { class: "text-muted-foreground" }, "Expected Delivery"),
                        createVNode("span", { class: "ml-auto font-medium" }, toDisplayString(unref(order).expectedDeliveryDate ? new Date(unref(order).expectedDeliveryDate).toLocaleDateString() : "—"), 1)
                      ]),
                      createVNode("div", { class: "border-t pt-2" }, [
                        createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-1" }, "Delivery Notes"),
                        createVNode("p", { class: "text-muted-foreground" }, toDisplayString(unref(order).deliveryNotes || "—"), 1)
                      ])
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
                        createTextVNode("Delivery Information")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-2 text-sm" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(unref(CalendarDays), { class: "size-3.5 text-muted-foreground" }),
                      createVNode("span", { class: "text-muted-foreground" }, "Expected Delivery"),
                      createVNode("span", { class: "ml-auto font-medium" }, toDisplayString(unref(order).expectedDeliveryDate ? new Date(unref(order).expectedDeliveryDate).toLocaleDateString() : "—"), 1)
                    ]),
                    createVNode("div", { class: "border-t pt-2" }, [
                      createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-1" }, "Delivery Notes"),
                      createVNode("p", { class: "text-muted-foreground" }, toDisplayString(unref(order).deliveryNotes || "—"), 1)
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
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Products`);
                        } else {
                          return [
                            createTextVNode("Products")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Products")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
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
                                            _push7(`Unit Price`);
                                          } else {
                                            return [
                                              createTextVNode("Unit Price")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Total`);
                                          } else {
                                            return [
                                              createTextVNode("Total")
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
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Quantity")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Unit Price")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Total")
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
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Quantity")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Unit Price")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Total")
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
                                ssrRenderList(unref(order).items, (item) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: item.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<p class="text-sm font-medium"${_scopeId6}>${ssrInterpolate(item.product?.name || "—")}</p><p class="text-xs text-muted-foreground"${_scopeId6}>${ssrInterpolate(item.product?.sku)}</p>`);
                                            } else {
                                              return [
                                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product?.name || "—"), 1),
                                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product?.sku), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(Number(item.quantity).toFixed(3))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(Number(item.unitPrice).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(Number(item.totalPrice).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product?.name || "—"), 1),
                                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product?.sku), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(order).items, (item) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product?.name || "—"), 1),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product?.sku), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Quantity")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Unit Price")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Total")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(order).items, (item) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: item.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product?.name || "—"), 1),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product?.sku), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                    _push3(`<div class="flex justify-between border-t px-4 py-3 text-sm font-semibold"${_scopeId2}><span${_scopeId2}>Total Amount</span><span class="tabular-nums"${_scopeId2}>${ssrInterpolate(Number(unref(order).totalAmount).toFixed(2))}</span></div>`);
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
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Quantity")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Unit Price")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Total")
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
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(order).items, (item) => {
                                return openBlock(), createBlock(_component_UiTableRow, {
                                  key: item.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product?.name || "—"), 1),
                                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product?.sku), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                      }),
                      createVNode("div", { class: "flex justify-between border-t px-4 py-3 text-sm font-semibold" }, [
                        createVNode("span", null, "Total Amount"),
                        createVNode("span", { class: "tabular-nums" }, toDisplayString(Number(unref(order).totalAmount).toFixed(2)), 1)
                      ])
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
                        createTextVNode("Products")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
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
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Quantity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Unit Price")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Total")
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(order).items, (item) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: item.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.product?.name || "—"), 1),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.product?.sku), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                    }),
                    createVNode("div", { class: "flex justify-between border-t px-4 py-3 text-sm font-semibold" }, [
                      createVNode("span", null, "Total Amount"),
                      createVNode("span", { class: "tabular-nums" }, toDisplayString(Number(unref(order).totalAmount).toFixed(2)), 1)
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
        if (unref(availableActions).length && unref(availableActions)[0]) {
          _push(`<div class="flex justify-end">`);
          _push(ssrRenderComponent(_component_UiButton, {
            disabled: unref(actionLoading),
            onClick: ($event) => handleAction(unref(availableActions)[0].key)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(availableActions)[0].icon), { class: "size-4" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(unref(actionLoading) ? "Processing..." : unref(nextActionLabel))}`);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(availableActions)[0].icon), { class: "size-4" })),
                  createTextVNode(" " + toDisplayString(unref(actionLoading) ? "Processing..." : unref(nextActionLabel)), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showDeliveryDialog),
        "onUpdate:open": ($event) => showDeliveryDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "max-h-[90vh] overflow-y-auto sm:max-w-lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Confirm Delivery`);
                            } else {
                              return [
                                createTextVNode("Confirm Delivery")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record the outcome of this delivery`);
                            } else {
                              return [
                                createTextVNode("Record the outcome of this delivery")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Confirm Delivery")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record the outcome of this delivery")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiRadioGroup, {
                    modelValue: unref(deliveryForm).result,
                    "onUpdate:modelValue": ($event) => unref(deliveryForm).result = $event,
                    class: "grid gap-3 sm:grid-cols-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label class="${ssrRenderClass([unref(deliveryForm).result === "FULL" ? "border-primary bg-primary/5" : "hover:bg-muted", "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiRadioGroupItem, {
                          id: "dr-full",
                          value: "FULL",
                          class: "mt-0.5"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}><span class="flex items-center gap-2 font-medium"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(PackageCheck), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Full Delivery</span><span class="mt-1 block text-xs text-muted-foreground"${_scopeId3}>Customer received the entire order</span></span></label><label class="${ssrRenderClass([unref(deliveryForm).result === "PARTIAL" ? "border-primary bg-primary/5" : "hover:bg-muted", "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiRadioGroupItem, {
                          id: "dr-partial",
                          value: "PARTIAL",
                          class: "mt-0.5"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}><span class="flex items-center gap-2 font-medium"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(PackageX), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Partial Delivery</span><span class="mt-1 block text-xs text-muted-foreground"${_scopeId3}>Customer received only part of the order</span></span></label><label class="${ssrRenderClass([unref(deliveryForm).result === "FAILED" ? "border-primary bg-primary/5" : "hover:bg-muted", "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiRadioGroupItem, {
                          id: "dr-failed",
                          value: "FAILED",
                          class: "mt-0.5"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}><span class="flex items-center gap-2 font-medium"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(RotateCcw), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Failed Delivery</span><span class="mt-1 block text-xs text-muted-foreground"${_scopeId3}>Attempt failed — will be re-delivered</span></span></label><label class="${ssrRenderClass([unref(deliveryForm).result === "CANCELLED" ? "border-primary bg-primary/5" : "hover:bg-muted", "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiRadioGroupItem, {
                          id: "dr-cancelled",
                          value: "CANCELLED",
                          class: "mt-0.5"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}><span class="flex items-center gap-2 font-medium"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CircleX), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Cancelled</span><span class="mt-1 block text-xs text-muted-foreground"${_scopeId3}>Customer refused or cancelled the order</span></span></label>`);
                      } else {
                        return [
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "FULL" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-full",
                              value: "FULL",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(PackageCheck), { class: "size-4" }),
                                createTextVNode(" Full Delivery")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer received the entire order")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "PARTIAL" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-partial",
                              value: "PARTIAL",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(PackageX), { class: "size-4" }),
                                createTextVNode(" Partial Delivery")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer received only part of the order")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "FAILED" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-failed",
                              value: "FAILED",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(RotateCcw), { class: "size-4" }),
                                createTextVNode(" Failed Delivery")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Attempt failed — will be re-delivered")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "CANCELLED" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-cancelled",
                              value: "CANCELLED",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(CircleX), { class: "size-4" }),
                                createTextVNode(" Cancelled")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer refused or cancelled the order")
                            ])
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(deliveryForm).result === "PARTIAL") {
                    _push3(`<div${_scopeId2}><p class="mb-2 text-sm font-medium"${_scopeId2}>Delivered Quantities</p><div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(order)?.items, (item) => {
                      _push3(`<div class="flex items-center gap-3 rounded-lg border p-2"${_scopeId2}><div class="min-w-0 flex-1"${_scopeId2}><p class="truncate text-sm font-medium"${_scopeId2}>${ssrInterpolate(item.product?.name)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Ordered: ${ssrInterpolate(Number(item.quantity).toFixed(3))}</p></div>`);
                      _push3(ssrRenderComponent(_component_UiInput, {
                        type: "number",
                        min: "0",
                        max: Number(item.quantity),
                        step: "0.001",
                        class: "w-28 text-right",
                        "model-value": unref(deliveryForm).items.find((d) => d.productId === item.product.id)?.quantity ?? 0,
                        "onUpdate:modelValue": (v) => {
                          const idx = unref(deliveryForm).items.findIndex((d) => d.productId === item.product.id);
                          const found = unref(deliveryForm).items[idx];
                          if (found) found.quantity = Number(v);
                        }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div><div class="mt-3 space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { for: "partialReason" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Reason (optional)`);
                        } else {
                          return [
                            createTextVNode("Reason (optional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiSelect, {
                      modelValue: unref(deliveryForm).partialDeliveryReason,
                      "onUpdate:modelValue": ($event) => unref(deliveryForm).partialDeliveryReason = $event
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "partialReason" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Select a reason" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(partialDeliveryReasons, (r) => {
                                  _push5(ssrRenderComponent(_component_UiSelectItem, {
                                    key: r,
                                    value: r
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(r)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(r), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(partialDeliveryReasons, (r) => {
                                    return createVNode(_component_UiSelectItem, {
                                      key: r,
                                      value: r
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(r), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiSelectTrigger, { id: "partialReason" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(partialDeliveryReasons, (r) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: r,
                                    value: r
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(r), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(deliveryForm).result === "CANCELLED") {
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { for: "cancelReason" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Reason (optional)`);
                        } else {
                          return [
                            createTextVNode("Reason (optional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiSelect, {
                      modelValue: unref(deliveryForm).cancelReason,
                      "onUpdate:modelValue": ($event) => unref(deliveryForm).cancelReason = $event
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "cancelReason" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Select a reason" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(cancelReasons, (r) => {
                                  _push5(ssrRenderComponent(_component_UiSelectItem, {
                                    key: r,
                                    value: r
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(r)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(r), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(cancelReasons, (r) => {
                                    return createVNode(_component_UiSelectItem, {
                                      key: r,
                                      value: r
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(r), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiSelectTrigger, { id: "cancelReason" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(cancelReasons, (r) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: r,
                                    value: r
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(r), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(deliveryForm).result === "FULL" || unref(deliveryForm).result === "PARTIAL") {
                    _push3(`<div class="rounded-lg border p-4 space-y-3"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Payment Collected</p><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { for: "paidAmount" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Paid Amount`);
                        } else {
                          return [
                            createTextVNode("Paid Amount")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      id: "paidAmount",
                      modelValue: unref(deliveryForm).paidAmount,
                      "onUpdate:modelValue": ($event) => unref(deliveryForm).paidAmount = $event,
                      type: "number",
                      min: "0",
                      step: "0.01",
                      placeholder: "0.00"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { for: "payMethod" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Payment Method`);
                        } else {
                          return [
                            createTextVNode("Payment Method")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiSelect, {
                      modelValue: unref(deliveryForm).paymentMethod,
                      "onUpdate:modelValue": ($event) => unref(deliveryForm).paymentMethod = $event
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "payMethod" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectValue, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectValue)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CASH" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Cash`);
                                    } else {
                                      return [
                                        createTextVNode("Cash")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Bank Transfer`);
                                    } else {
                                      return [
                                        createTextVNode("Bank Transfer")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CHECK" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Check`);
                                    } else {
                                      return [
                                        createTextVNode("Check")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Cash")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bank Transfer")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Check")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiSelectTrigger, { id: "payMethod" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cash")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bank Transfer")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Check")
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
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(deliveryForm).result === "PARTIAL" ? "Delivered Total" : "Invoice Total")}</span><span class="font-semibold tabular-nums"${_scopeId2}>${ssrInterpolate(deliveredTotal().toFixed(2))}</span></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(deliveryForm).result === "FAILED") {
                    _push3(`<div class="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 mt-0.5 shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>No invoice will be created. You can attempt delivery again later.</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showDeliveryDialog.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancel`);
                            } else {
                              return [
                                createTextVNode("Cancel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          disabled: unref(actionLoading),
                          onClick: submitDelivery
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(actionLoading) ? "Processing..." : "Confirm")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(actionLoading) ? "Processing..." : "Confirm"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showDeliveryDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(actionLoading),
                            onClick: submitDelivery
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(actionLoading) ? "Processing..." : "Confirm"), 1)
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
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Confirm Delivery")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record the outcome of this delivery")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode(_component_UiRadioGroup, {
                        modelValue: unref(deliveryForm).result,
                        "onUpdate:modelValue": ($event) => unref(deliveryForm).result = $event,
                        class: "grid gap-3 sm:grid-cols-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "FULL" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-full",
                              value: "FULL",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(PackageCheck), { class: "size-4" }),
                                createTextVNode(" Full Delivery")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer received the entire order")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "PARTIAL" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-partial",
                              value: "PARTIAL",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(PackageX), { class: "size-4" }),
                                createTextVNode(" Partial Delivery")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer received only part of the order")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "FAILED" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-failed",
                              value: "FAILED",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(RotateCcw), { class: "size-4" }),
                                createTextVNode(" Failed Delivery")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Attempt failed — will be re-delivered")
                            ])
                          ], 2),
                          createVNode("label", {
                            class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "CANCELLED" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                          }, [
                            createVNode(_component_UiRadioGroupItem, {
                              id: "dr-cancelled",
                              value: "CANCELLED",
                              class: "mt-0.5"
                            }),
                            createVNode("span", null, [
                              createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                                createVNode(unref(CircleX), { class: "size-4" }),
                                createTextVNode(" Cancelled")
                              ]),
                              createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer refused or cancelled the order")
                            ])
                          ], 2)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(deliveryForm).result === "PARTIAL" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "mb-2 text-sm font-medium" }, "Delivered Quantities"),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(order)?.items, (item) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "flex items-center gap-3 rounded-lg border p-2"
                            }, [
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(item.product?.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "Ordered: " + toDisplayString(Number(item.quantity).toFixed(3)), 1)
                              ]),
                              createVNode(_component_UiInput, {
                                type: "number",
                                min: "0",
                                max: Number(item.quantity),
                                step: "0.001",
                                class: "w-28 text-right",
                                "model-value": unref(deliveryForm).items.find((d) => d.productId === item.product.id)?.quantity ?? 0,
                                "onUpdate:modelValue": (v) => {
                                  const idx = unref(deliveryForm).items.findIndex((d) => d.productId === item.product.id);
                                  const found = unref(deliveryForm).items[idx];
                                  if (found) found.quantity = Number(v);
                                }
                              }, null, 8, ["max", "model-value", "onUpdate:modelValue"])
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "mt-3 space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "partialReason" }, {
                            default: withCtx(() => [
                              createTextVNode("Reason (optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            modelValue: unref(deliveryForm).partialDeliveryReason,
                            "onUpdate:modelValue": ($event) => unref(deliveryForm).partialDeliveryReason = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { id: "partialReason" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(partialDeliveryReasons, (r) => {
                                    return createVNode(_component_UiSelectItem, {
                                      key: r,
                                      value: r
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(r), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : createCommentVNode("", true),
                      unref(deliveryForm).result === "CANCELLED" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode(_component_UiLabel, { for: "cancelReason" }, {
                          default: withCtx(() => [
                            createTextVNode("Reason (optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(deliveryForm).cancelReason,
                          "onUpdate:modelValue": ($event) => unref(deliveryForm).cancelReason = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "cancelReason" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(cancelReasons, (r) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: r,
                                    value: r
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(r), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true),
                      unref(deliveryForm).result === "FULL" || unref(deliveryForm).result === "PARTIAL" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "rounded-lg border p-4 space-y-3"
                      }, [
                        createVNode("p", { class: "text-sm font-medium" }, "Payment Collected"),
                        createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "paidAmount" }, {
                              default: withCtx(() => [
                                createTextVNode("Paid Amount")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "paidAmount",
                              modelValue: unref(deliveryForm).paidAmount,
                              "onUpdate:modelValue": ($event) => unref(deliveryForm).paidAmount = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0.00"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "payMethod" }, {
                              default: withCtx(() => [
                                createTextVNode("Payment Method")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              modelValue: unref(deliveryForm).paymentMethod,
                              "onUpdate:modelValue": ($event) => unref(deliveryForm).paymentMethod = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { id: "payMethod" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Cash")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bank Transfer")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Check")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, toDisplayString(unref(deliveryForm).result === "PARTIAL" ? "Delivered Total" : "Invoice Total"), 1),
                          createVNode("span", { class: "font-semibold tabular-nums" }, toDisplayString(deliveredTotal().toFixed(2)), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      unref(deliveryForm).result === "FAILED" ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                      }, [
                        createVNode(unref(AlertTriangle), { class: "size-4 mt-0.5 shrink-0" }),
                        createVNode("span", null, "No invoice will be created. You can attempt delivery again later.")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showDeliveryDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(actionLoading),
                          onClick: submitDelivery
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(actionLoading) ? "Processing..." : "Confirm"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
              createVNode(_component_UiDialogContent, { class: "max-h-[90vh] overflow-y-auto sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Confirm Delivery")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record the outcome of this delivery")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-5" }, [
                    createVNode(_component_UiRadioGroup, {
                      modelValue: unref(deliveryForm).result,
                      "onUpdate:modelValue": ($event) => unref(deliveryForm).result = $event,
                      class: "grid gap-3 sm:grid-cols-2"
                    }, {
                      default: withCtx(() => [
                        createVNode("label", {
                          class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "FULL" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                        }, [
                          createVNode(_component_UiRadioGroupItem, {
                            id: "dr-full",
                            value: "FULL",
                            class: "mt-0.5"
                          }),
                          createVNode("span", null, [
                            createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                              createVNode(unref(PackageCheck), { class: "size-4" }),
                              createTextVNode(" Full Delivery")
                            ]),
                            createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer received the entire order")
                          ])
                        ], 2),
                        createVNode("label", {
                          class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "PARTIAL" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                        }, [
                          createVNode(_component_UiRadioGroupItem, {
                            id: "dr-partial",
                            value: "PARTIAL",
                            class: "mt-0.5"
                          }),
                          createVNode("span", null, [
                            createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                              createVNode(unref(PackageX), { class: "size-4" }),
                              createTextVNode(" Partial Delivery")
                            ]),
                            createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer received only part of the order")
                          ])
                        ], 2),
                        createVNode("label", {
                          class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "FAILED" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                        }, [
                          createVNode(_component_UiRadioGroupItem, {
                            id: "dr-failed",
                            value: "FAILED",
                            class: "mt-0.5"
                          }),
                          createVNode("span", null, [
                            createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                              createVNode(unref(RotateCcw), { class: "size-4" }),
                              createTextVNode(" Failed Delivery")
                            ]),
                            createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Attempt failed — will be re-delivered")
                          ])
                        ], 2),
                        createVNode("label", {
                          class: ["flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors", unref(deliveryForm).result === "CANCELLED" ? "border-primary bg-primary/5" : "hover:bg-muted"]
                        }, [
                          createVNode(_component_UiRadioGroupItem, {
                            id: "dr-cancelled",
                            value: "CANCELLED",
                            class: "mt-0.5"
                          }),
                          createVNode("span", null, [
                            createVNode("span", { class: "flex items-center gap-2 font-medium" }, [
                              createVNode(unref(CircleX), { class: "size-4" }),
                              createTextVNode(" Cancelled")
                            ]),
                            createVNode("span", { class: "mt-1 block text-xs text-muted-foreground" }, "Customer refused or cancelled the order")
                          ])
                        ], 2)
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    unref(deliveryForm).result === "PARTIAL" ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("p", { class: "mb-2 text-sm font-medium" }, "Delivered Quantities"),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(order)?.items, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "flex items-center gap-3 rounded-lg border p-2"
                          }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(item.product?.name), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "Ordered: " + toDisplayString(Number(item.quantity).toFixed(3)), 1)
                            ]),
                            createVNode(_component_UiInput, {
                              type: "number",
                              min: "0",
                              max: Number(item.quantity),
                              step: "0.001",
                              class: "w-28 text-right",
                              "model-value": unref(deliveryForm).items.find((d) => d.productId === item.product.id)?.quantity ?? 0,
                              "onUpdate:modelValue": (v) => {
                                const idx = unref(deliveryForm).items.findIndex((d) => d.productId === item.product.id);
                                const found = unref(deliveryForm).items[idx];
                                if (found) found.quantity = Number(v);
                              }
                            }, null, 8, ["max", "model-value", "onUpdate:modelValue"])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "mt-3 space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "partialReason" }, {
                          default: withCtx(() => [
                            createTextVNode("Reason (optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(deliveryForm).partialDeliveryReason,
                          "onUpdate:modelValue": ($event) => unref(deliveryForm).partialDeliveryReason = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "partialReason" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(partialDeliveryReasons, (r) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: r,
                                    value: r
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(r), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])) : createCommentVNode("", true),
                    unref(deliveryForm).result === "CANCELLED" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      createVNode(_component_UiLabel, { for: "cancelReason" }, {
                        default: withCtx(() => [
                          createTextVNode("Reason (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(deliveryForm).cancelReason,
                        "onUpdate:modelValue": ($event) => unref(deliveryForm).cancelReason = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "cancelReason" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "Select a reason" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(cancelReasons, (r) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: r,
                                  value: r
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(r), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ])) : createCommentVNode("", true),
                    unref(deliveryForm).result === "FULL" || unref(deliveryForm).result === "PARTIAL" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "rounded-lg border p-4 space-y-3"
                    }, [
                      createVNode("p", { class: "text-sm font-medium" }, "Payment Collected"),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "paidAmount" }, {
                            default: withCtx(() => [
                              createTextVNode("Paid Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "paidAmount",
                            modelValue: unref(deliveryForm).paidAmount,
                            "onUpdate:modelValue": ($event) => unref(deliveryForm).paidAmount = $event,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            placeholder: "0.00"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "payMethod" }, {
                            default: withCtx(() => [
                              createTextVNode("Payment Method")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            modelValue: unref(deliveryForm).paymentMethod,
                            "onUpdate:modelValue": ($event) => unref(deliveryForm).paymentMethod = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { id: "payMethod" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Cash")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bank Transfer")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Check")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, toDisplayString(unref(deliveryForm).result === "PARTIAL" ? "Delivered Total" : "Invoice Total"), 1),
                        createVNode("span", { class: "font-semibold tabular-nums" }, toDisplayString(deliveredTotal().toFixed(2)), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    unref(deliveryForm).result === "FAILED" ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                    }, [
                      createVNode(unref(AlertTriangle), { class: "size-4 mt-0.5 shrink-0" }),
                      createVNode("span", null, "No invoice will be created. You can attempt delivery again later.")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode(_component_UiDialogFooter, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiButton, {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => showDeliveryDialog.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        type: "submit",
                        disabled: unref(actionLoading),
                        onClick: submitDelivery
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(actionLoading) ? "Processing..." : "Confirm"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-N4aHtFK2.mjs.map
