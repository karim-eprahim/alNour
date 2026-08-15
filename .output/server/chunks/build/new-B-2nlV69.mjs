import { _ as _sfc_main$6, a as _sfc_main$4, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$3 } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$5 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$7, c as _sfc_main$9, d as _sfc_main$7$1 } from './SelectValue-CdUm-rR7.mjs';
import { _ as _sfc_main$8, a as _sfc_main$5$1, b as _sfc_main$2$1, c as _sfc_main$1$3, d as _sfc_main$4$1 } from './SheetTrigger-xbRCeR5o.mjs';
import { _ as _sfc_main$b } from './Textarea-B_fNd96X.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, resolveDynamicComponent, isRef, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { Check, User, Package, DollarSign, ChevronRight, ArrowLeft, Search, Users, Plus, X, CreditCard } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { u as useDistributorStore } from './store-DAWlzSoP.mjs';
import { u as useCustomersStore } from './store-DIa1t7OS.mjs';
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
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    useCustomersStore();
    const isMobile = ref(false);
    const step = ref(1);
    const customerSearch = ref("");
    const customerResults = ref([]);
    const customerLoading = ref(false);
    const selectedCustomer = ref(null);
    const recentCustomers = ref([]);
    const warehouseId = ref("");
    const warehouseItems = ref([]);
    ref(false);
    const custodyItems = ref([]);
    const saleItems = ref([]);
    const totalAmount = computed(() => saleItems.value.reduce((s, i) => s + (i.quantity || 0) * (i.unitPrice || 0), 0));
    const paymentOption = ref("paid");
    const paidAmount = ref(0);
    const paymentMethod = ref("CASH");
    const paymentNotes = ref("");
    const saving = ref(false);
    const createdInvoice = ref(null);
    const showCreateCustomer = ref(false);
    const createForm = reactive({ name: "", phone: "", address: "" });
    const creatingCustomer = ref(false);
    function debounce(fn, ms) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
      };
    }
    const searchCustomers = debounce(async (q) => {
      if (q.length < 2) {
        customerResults.value = [];
        return;
      }
      customerLoading.value = true;
      try {
        const data = await $fetch("/api/customers/lookup", { params: { q, take: 20 } });
        customerResults.value = data.items;
      } finally {
        customerLoading.value = false;
      }
    }, 300);
    function selectCustomer(c) {
      selectedCustomer.value = c;
      customerSearch.value = c.label;
      customerResults.value = [];
      loadCustody();
    }
    function selectRecentCustomer(c) {
      selectedCustomer.value = { value: c.id, label: c.name, subtitle: c.phone };
      customerSearch.value = c.name;
      loadCustody();
    }
    async function loadCustody() {
      await store.fetchCustody();
      if (store.custodies.length > 0) {
        custodyItems.value = store.custodies;
        console.log("Custody items:", custodyItems.value);
      }
    }
    function addItem() {
      saleItems.value.push({ productId: "", productName: "", availableQty: 0 });
    }
    function removeItem(index) {
      saleItems.value.splice(index, 1);
    }
    function selectProduct(index, productId) {
      const custody = custodyItems.value.find((c) => c.productId === productId);
      const item = saleItems.value[index];
      if (custody && item) {
        item.productId = custody.productId;
        item.productName = custody.product.name;
        item.availableQty = custody.quantity;
        if (!item.unitPrice) {
          item.unitPrice = custody.product.sellingPrice ? Number(custody.product.sellingPrice) : void 0;
        }
      }
    }
    const itemErrors = computed(() => {
      return saleItems.value.map((item, idx) => {
        if (!item.productId) return "Select a product";
        if (!item.quantity || item.quantity <= 0) return "Enter quantity";
        if (item.quantity > item.availableQty) return `Only ${Number(item.availableQty).toFixed(1)} available in custody`;
        if (!item.unitPrice || item.unitPrice <= 0) return "Enter a valid price";
        return null;
      });
    });
    const canProceed = computed(() => {
      switch (step.value) {
        case 1:
          return !!selectedCustomer.value;
        case 2:
          return saleItems.value.length > 0 && itemErrors.value.every((e) => e === null);
        case 3:
          return paymentOption.value === "paid" || paymentOption.value === "unpaid" || paidAmount.value > 0;
        case 4:
          return true;
        default:
          return false;
      }
    });
    function nextStep() {
      if (step.value < 4 && canProceed.value) step.value++;
    }
    function prevStep() {
      if (step.value > 1) step.value--;
    }
    const finalPaidAmount = computed(() => {
      if (paymentOption.value === "paid") return totalAmount.value;
      if (paymentOption.value === "partial") return Math.min(paidAmount.value || 0, totalAmount.value);
      return 0;
    });
    const finalPaymentMethod = computed(() => {
      if (finalPaidAmount.value <= 0) return void 0;
      return paymentMethod.value;
    });
    async function handleCreateCustomer() {
      if (!createForm.name.trim()) {
        toast.error("Customer name is required");
        return;
      }
      creatingCustomer.value = true;
      try {
        const data = await $fetch("/api/customers", {
          method: "POST",
          body: {
            name: createForm.name.trim(),
            phone: createForm.phone || void 0,
            address: createForm.address || void 0
          }
        });
        const newCust = data.customer;
        selectCustomer({ value: newCust.id, label: newCust.name, subtitle: newCust.phone ?? void 0 });
        showCreateCustomer.value = false;
        createForm.name = "";
        createForm.phone = "";
        createForm.address = "";
        toast.success("Customer created");
      } catch (err) {
        toast.error(err?.message || "Failed to create customer");
      } finally {
        creatingCustomer.value = false;
      }
    }
    async function handleCreate() {
      if (!selectedCustomer.value || saleItems.value.length === 0) return;
      saving.value = true;
      try {
        const invoice = await store.createDirectSale({
          customerId: selectedCustomer.value.value,
          warehouseId: warehouseId.value || void 0,
          paidAmount: finalPaidAmount.value || 0,
          paymentMethod: finalPaymentMethod.value,
          items: saleItems.value.map((i) => ({
            productId: i.productId,
            quantity: i.quantity || 0,
            unitPrice: i.unitPrice || 0
          }))
        });
        createdInvoice.value = invoice;
        toast.success(`Invoice ${invoice.invoiceNumber} created successfully`);
      } catch (err) {
        toast.error(err?.message || "Failed to create sale");
      } finally {
        saving.value = false;
      }
    }
    const steps = [
      { num: 1, label: "Customer", icon: User },
      { num: 2, label: "Products", icon: Package },
      { num: 3, label: "Payment", icon: DollarSign },
      { num: 4, label: "Review", icon: Check }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiButton = _sfc_main$1;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiLabel = _sfc_main$3;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiInput = _sfc_main$5;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$7;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_UiSheet = _sfc_main$8;
      const _component_UiSheetContent = _sfc_main$5$1;
      const _component_UiSheetHeader = _sfc_main$2$1;
      const _component_UiSheetTitle = _sfc_main$1$3;
      const _component_UiSheetDescription = _sfc_main$4$1;
      const _component_UiTextarea = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-xl font-semibold tracking-tight">New Sale</h1>`);
      if (!unref(createdInvoice)) {
        _push(`<p class="text-sm text-muted-foreground">Create a new direct sale invoice</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(createdInvoice)) {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(_component_UiCard, { class: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center py-10 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Check), { class: "size-7 text-green-600 dark:text-green-400" }, null, _parent3, _scopeId2));
                    _push3(`</div><h2 class="text-xl font-semibold"${_scopeId2}>Invoice Created!</h2><p class="mt-1 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(createdInvoice).invoiceNumber)}</p><p class="mt-1 text-sm font-medium"${_scopeId2}>Total: ${ssrInterpolate(Number(unref(createdInvoice).totalAmount).toFixed(2))} | Paid: ${ssrInterpolate(Number(unref(createdInvoice).paidAmount).toFixed(2))}</p><div class="mt-6 flex gap-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/bills")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`View Invoices`);
                        } else {
                          return [
                            createTextVNode("View Invoices")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiButton, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/sales/new")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`New Sale`);
                        } else {
                          return [
                            createTextVNode("New Sale")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900" }, [
                        createVNode(unref(Check), { class: "size-7 text-green-600 dark:text-green-400" })
                      ]),
                      createVNode("h2", { class: "text-xl font-semibold" }, "Invoice Created!"),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(unref(createdInvoice).invoiceNumber), 1),
                      createVNode("p", { class: "mt-1 text-sm font-medium" }, "Total: " + toDisplayString(Number(unref(createdInvoice).totalAmount).toFixed(2)) + " | Paid: " + toDisplayString(Number(unref(createdInvoice).paidAmount).toFixed(2)), 1),
                      createVNode("div", { class: "mt-6 flex gap-3" }, [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/bills")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("View Invoices")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/sales/new")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("New Sale")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "flex flex-col items-center py-10 text-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900" }, [
                      createVNode(unref(Check), { class: "size-7 text-green-600 dark:text-green-400" })
                    ]),
                    createVNode("h2", { class: "text-xl font-semibold" }, "Invoice Created!"),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(unref(createdInvoice).invoiceNumber), 1),
                    createVNode("p", { class: "mt-1 text-sm font-medium" }, "Total: " + toDisplayString(Number(unref(createdInvoice).totalAmount).toFixed(2)) + " | Paid: " + toDisplayString(Number(unref(createdInvoice).paidAmount).toFixed(2)), 1),
                    createVNode("div", { class: "mt-6 flex gap-3" }, [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/bills")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("View Invoices")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/sales/new")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("New Sale")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
      } else {
        _push(`<!--[--><div class="hidden sm:flex items-center gap-1 mb-6"><!--[-->`);
        ssrRenderList(steps, (s, i) => {
          _push(`<div class="flex items-center"><div class="${ssrRenderClass([unref(step) === s.num ? "bg-primary text-primary-foreground font-medium" : unref(step) > s.num ? "text-primary font-medium" : "text-muted-foreground", "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm cursor-pointer"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(s.icon), { class: "size-4" }, null), _parent);
          _push(`<span>${ssrInterpolate(s.label)}</span></div>`);
          if (i < steps.length - 1) {
            _push(ssrRenderComponent(unref(ChevronRight), { class: "size-4 text-muted-foreground/40 mx-1" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="sm:hidden mb-6"><div class="flex items-center justify-between mb-2">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "sm",
          disabled: unref(step) === 1,
          onClick: prevStep
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
              _push2(` Back `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "size-4" }),
                createTextVNode(" Back ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="text-sm font-medium text-muted-foreground">Step ${ssrInterpolate(unref(step))} of 4</span>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "sm",
          disabled: !unref(canProceed),
          onClick: nextStep
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Next "),
                createVNode(unref(ChevronRight), { class: "size-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex gap-1"><!--[-->`);
        ssrRenderList(steps, (s) => {
          _push(`<div class="${ssrRenderClass([s.num <= unref(step) ? "bg-primary" : "bg-muted", "h-1.5 flex-1 rounded-full transition-colors"])}"></div>`);
        });
        _push(`<!--]--></div></div><div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"><div class="${ssrRenderClass(["space-y-4", { "sm:col-span-2 lg:col-span-3": unref(step) !== 1 && unref(isMobile) }])}">`);
        _push(ssrRenderComponent(_component_UiCard, {
          style: !unref(isMobile) || unref(step) === 1 ? null : { display: "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(User), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Customer`);
                        } else {
                          return [
                            createVNode(unref(User), { class: "size-4" }),
                            createTextVNode(" Customer")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                        default: withCtx(() => [
                          createVNode(unref(User), { class: "size-4" }),
                          createTextVNode(" Customer")
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
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Warehouse`);
                        } else {
                          return [
                            createTextVNode("Warehouse")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_LookupCombobox, {
                      autoSelectSingle: true,
                      modelValue: unref(warehouseId),
                      "onUpdate:modelValue": ($event) => isRef(warehouseId) ? warehouseId.value = $event : null,
                      items: unref(warehouseItems),
                      placeholder: "Select warehouse",
                      class: "mt-1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (!unref(selectedCustomer)) {
                      _push3(`<div${_scopeId2}><div class="relative mb-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: unref(customerSearch),
                        "onUpdate:modelValue": ($event) => isRef(customerSearch) ? customerSearch.value = $event : null,
                        placeholder: "Search all customers...",
                        class: "pl-9",
                        onInput: ($event) => unref(searchCustomers)(unref(customerSearch))
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                      if (unref(customerLoading)) {
                        _push3(`<div class="mt-2 text-sm text-muted-foreground"${_scopeId2}>Searching...</div>`);
                      } else if (unref(customerResults).length) {
                        _push3(`<div class="mt-2 space-y-1 max-h-48 overflow-y-auto"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(customerResults), (c) => {
                          _push3(`<button class="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent"${_scopeId2}>${ssrInterpolate(c.label)}</button>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(recentCustomers).length > 0) {
                        _push3(`<div${_scopeId2}><p class="text-xs font-medium text-muted-foreground mb-2"${_scopeId2}>Recent Customers</p><div class="space-y-1 mb-4 max-h-48 overflow-y-auto"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(recentCustomers), (c) => {
                          _push3(`<button class="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent flex items-center justify-between"${_scopeId2}><span class="font-medium"${_scopeId2}>${ssrInterpolate(c.name)}</span><span class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(new Date(c.lastVisit).toLocaleDateString())}</span></button>`);
                        });
                        _push3(`<!--]--></div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(recentCustomers).length === 0 && unref(customerResults).length === 0 && !unref(customerLoading) && unref(customerSearch).length === 0) {
                        _push3(`<div class="text-center py-6"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Users), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }, null, _parent3, _scopeId2));
                        _push3(`<p class="text-sm text-muted-foreground mb-3"${_scopeId2}>No recent customers. Search or create a new one.</p>`);
                        _push3(ssrRenderComponent(_component_UiButton, {
                          size: "sm",
                          variant: "outline",
                          onClick: () => {
                            unref(createForm).name = unref(customerSearch);
                            showCreateCustomer.value = true;
                          }
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent4, _scopeId3));
                              _push4(` New Customer `);
                            } else {
                              return [
                                createVNode(unref(Plus), { class: "size-4" }),
                                createTextVNode(" New Customer ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(customerSearch).length > 0 && !unref(customerLoading) && unref(customerResults).length === 0) {
                        _push3(ssrRenderComponent(_component_UiButton, {
                          size: "sm",
                          variant: "outline",
                          class: "mt-2 w-full",
                          onClick: () => {
                            unref(createForm).name = unref(customerSearch);
                            showCreateCustomer.value = true;
                          }
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent4, _scopeId3));
                              _push4(` Create &quot;${ssrInterpolate(unref(customerSearch))}&quot; `);
                            } else {
                              return [
                                createVNode(unref(Plus), { class: "size-4" }),
                                createTextVNode(' Create "' + toDisplayString(unref(customerSearch)) + '" ', 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(selectedCustomer).label)}</p>`);
                      if (unref(selectedCustomer).subtitle) {
                        _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(selectedCustomer).subtitle)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "ghost",
                        size: "sm",
                        onClick: ($event) => {
                          selectedCustomer.value = null;
                          customerSearch.value = "";
                        }
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Change`);
                          } else {
                            return [
                              createTextVNode("Change")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    }
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          autoSelectSingle: true,
                          modelValue: unref(warehouseId),
                          "onUpdate:modelValue": ($event) => isRef(warehouseId) ? warehouseId.value = $event : null,
                          items: unref(warehouseItems),
                          placeholder: "Select warehouse",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      !unref(selectedCustomer) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("div", { class: "relative mb-3" }, [
                          createVNode(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                          createVNode(_component_UiInput, {
                            modelValue: unref(customerSearch),
                            "onUpdate:modelValue": ($event) => isRef(customerSearch) ? customerSearch.value = $event : null,
                            placeholder: "Search all customers...",
                            class: "pl-9",
                            onInput: ($event) => unref(searchCustomers)(unref(customerSearch))
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                        ]),
                        unref(customerLoading) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-muted-foreground"
                        }, "Searching...")) : unref(customerResults).length ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-2 space-y-1 max-h-48 overflow-y-auto"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(customerResults), (c) => {
                            return openBlock(), createBlock("button", {
                              key: c.value,
                              class: "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                              onClick: ($event) => selectCustomer(c)
                            }, toDisplayString(c.label), 9, ["onClick"]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        unref(recentCustomers).length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-2" }, "Recent Customers"),
                          createVNode("div", { class: "space-y-1 mb-4 max-h-48 overflow-y-auto" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCustomers), (c) => {
                              return openBlock(), createBlock("button", {
                                key: c.id,
                                class: "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent flex items-center justify-between",
                                onClick: ($event) => selectRecentCustomer(c)
                              }, [
                                createVNode("span", { class: "font-medium" }, toDisplayString(c.name), 1),
                                createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(c.lastVisit).toLocaleDateString()), 1)
                              ], 8, ["onClick"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        unref(recentCustomers).length === 0 && unref(customerResults).length === 0 && !unref(customerLoading) && unref(customerSearch).length === 0 ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "text-center py-6"
                        }, [
                          createVNode(unref(Users), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }),
                          createVNode("p", { class: "text-sm text-muted-foreground mb-3" }, "No recent customers. Search or create a new one."),
                          createVNode(_component_UiButton, {
                            size: "sm",
                            variant: "outline",
                            onClick: () => {
                              unref(createForm).name = unref(customerSearch);
                              showCreateCustomer.value = true;
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "size-4" }),
                              createTextVNode(" New Customer ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])) : createCommentVNode("", true),
                        unref(customerSearch).length > 0 && !unref(customerLoading) && unref(customerResults).length === 0 ? (openBlock(), createBlock(_component_UiButton, {
                          key: 4,
                          size: "sm",
                          variant: "outline",
                          class: "mt-2 w-full",
                          onClick: () => {
                            unref(createForm).name = unref(customerSearch);
                            showCreateCustomer.value = true;
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "size-4" }),
                            createTextVNode(' Create "' + toDisplayString(unref(customerSearch)) + '" ', 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-between rounded-lg border p-3"
                      }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(selectedCustomer).label), 1),
                          unref(selectedCustomer).subtitle ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-muted-foreground"
                          }, toDisplayString(unref(selectedCustomer).subtitle), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_UiButton, {
                          variant: "ghost",
                          size: "sm",
                          onClick: ($event) => {
                            selectedCustomer.value = null;
                            customerSearch.value = "";
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Change")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
                    createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx(() => [
                        createVNode(unref(User), { class: "size-4" }),
                        createTextVNode(" Customer")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Warehouse")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        autoSelectSingle: true,
                        modelValue: unref(warehouseId),
                        "onUpdate:modelValue": ($event) => isRef(warehouseId) ? warehouseId.value = $event : null,
                        items: unref(warehouseItems),
                        placeholder: "Select warehouse",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    !unref(selectedCustomer) ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "relative mb-3" }, [
                        createVNode(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(customerSearch),
                          "onUpdate:modelValue": ($event) => isRef(customerSearch) ? customerSearch.value = $event : null,
                          placeholder: "Search all customers...",
                          class: "pl-9",
                          onInput: ($event) => unref(searchCustomers)(unref(customerSearch))
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                      ]),
                      unref(customerLoading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-2 text-sm text-muted-foreground"
                      }, "Searching...")) : unref(customerResults).length ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-2 space-y-1 max-h-48 overflow-y-auto"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(customerResults), (c) => {
                          return openBlock(), createBlock("button", {
                            key: c.value,
                            class: "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                            onClick: ($event) => selectCustomer(c)
                          }, toDisplayString(c.label), 9, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      unref(recentCustomers).length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-2" }, "Recent Customers"),
                        createVNode("div", { class: "space-y-1 mb-4 max-h-48 overflow-y-auto" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCustomers), (c) => {
                            return openBlock(), createBlock("button", {
                              key: c.id,
                              class: "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent flex items-center justify-between",
                              onClick: ($event) => selectRecentCustomer(c)
                            }, [
                              createVNode("span", { class: "font-medium" }, toDisplayString(c.name), 1),
                              createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(c.lastVisit).toLocaleDateString()), 1)
                            ], 8, ["onClick"]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      unref(recentCustomers).length === 0 && unref(customerResults).length === 0 && !unref(customerLoading) && unref(customerSearch).length === 0 ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "text-center py-6"
                      }, [
                        createVNode(unref(Users), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }),
                        createVNode("p", { class: "text-sm text-muted-foreground mb-3" }, "No recent customers. Search or create a new one."),
                        createVNode(_component_UiButton, {
                          size: "sm",
                          variant: "outline",
                          onClick: () => {
                            unref(createForm).name = unref(customerSearch);
                            showCreateCustomer.value = true;
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "size-4" }),
                            createTextVNode(" New Customer ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])) : createCommentVNode("", true),
                      unref(customerSearch).length > 0 && !unref(customerLoading) && unref(customerResults).length === 0 ? (openBlock(), createBlock(_component_UiButton, {
                        key: 4,
                        size: "sm",
                        variant: "outline",
                        class: "mt-2 w-full",
                        onClick: () => {
                          unref(createForm).name = unref(customerSearch);
                          showCreateCustomer.value = true;
                        }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "size-4" }),
                          createTextVNode(' Create "' + toDisplayString(unref(customerSearch)) + '" ', 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center justify-between rounded-lg border p-3"
                    }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(selectedCustomer).label), 1),
                        unref(selectedCustomer).subtitle ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground"
                        }, toDisplayString(unref(selectedCustomer).subtitle), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode(_component_UiButton, {
                        variant: "ghost",
                        size: "sm",
                        onClick: ($event) => {
                          selectedCustomer.value = null;
                          customerSearch.value = "";
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Change")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="${ssrRenderClass({ "sm:col-span-2 lg:col-span-3": unref(step) !== 2 && unref(isMobile) })}">`);
        _push(ssrRenderComponent(_component_UiCard, {
          style: !unref(isMobile) || unref(step) === 2 ? null : { display: "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Package), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Products`);
                        } else {
                          return [
                            createVNode(unref(Package), { class: "size-4" }),
                            createTextVNode(" Products")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Select products from your custody`);
                        } else {
                          return [
                            createTextVNode("Select products from your custody")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                        default: withCtx(() => [
                          createVNode(unref(Package), { class: "size-4" }),
                          createTextVNode(" Products")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Select products from your custody")
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
                    if (unref(custodyItems).length === 0) {
                      _push3(`<div class="text-center py-4 text-sm text-muted-foreground"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Package), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent3, _scopeId2));
                      _push3(`<p${_scopeId2}>No products in your custody</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(saleItems), (item, idx) => {
                      _push3(`<div class="space-y-2 rounded-lg border p-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-xs font-medium text-muted-foreground"${_scopeId2}>Item ${ssrInterpolate(idx + 1)}</span>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "ghost",
                        size: "icon",
                        class: "size-6",
                        onClick: ($event) => removeItem(idx)
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
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="grid grid-cols-1 gap-2 sm:grid-cols-4"${_scopeId2}><div class="sm:col-span-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Product`);
                          } else {
                            return [
                              createTextVNode("Product")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSelect, {
                        "model-value": item.productId,
                        "onUpdate:modelValue": ($event) => selectProduct(idx, $event)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Select product" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(unref(custodyItems), (c) => {
                                    _push5(ssrRenderComponent(_component_UiSelectItem, {
                                      key: c.productId,
                                      value: c.productId
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(c.product.name)} (${ssrInterpolate(Number(c.quantity).toFixed(1))} available) `);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(c.product.name) + " (" + toDisplayString(Number(c.quantity).toFixed(1)) + " available) ", 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(custodyItems), (c) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: c.productId,
                                        value: c.productId
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(c.product.name) + " (" + toDisplayString(Number(c.quantity).toFixed(1)) + " available) ", 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(custodyItems), (c) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: c.productId,
                                      value: c.productId
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(c.product.name) + " (" + toDisplayString(Number(c.quantity).toFixed(1)) + " available) ", 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Qty`);
                          } else {
                            return [
                              createTextVNode("Qty")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: item.quantity,
                        "onUpdate:modelValue": ($event) => item.quantity = $event,
                        type: "number",
                        min: "0",
                        max: item.availableQty,
                        step: "0.001",
                        placeholder: "0",
                        class: "mt-0.5"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Price`);
                          } else {
                            return [
                              createTextVNode("Price")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: item.unitPrice,
                        "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        placeholder: "0.00",
                        class: "mt-0.5"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                      if (item.quantity !== void 0 && item.quantity > item.availableQty) {
                        _push3(`<p class="text-xs text-red-500"${_scopeId2}> Only ${ssrInterpolate(Number(item.availableQty).toFixed(1))} available in custody </p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.productId && item.quantity && item.unitPrice) {
                        _push3(`<p class="text-xs text-muted-foreground text-right"${_scopeId2}> Subtotal: ${ssrInterpolate(Number(item.quantity * item.unitPrice).toFixed(2))}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      class: "w-full",
                      onClick: addItem
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Add Product `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "size-4" }),
                            createTextVNode(" Add Product ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      unref(custodyItems).length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-4 text-sm text-muted-foreground"
                      }, [
                        createVNode(unref(Package), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }),
                        createVNode("p", null, "No products in your custody")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(saleItems), (item, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          class: "space-y-2 rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Item " + toDisplayString(idx + 1), 1),
                            createVNode(_component_UiButton, {
                              variant: "ghost",
                              size: "icon",
                              class: "size-6",
                              onClick: ($event) => removeItem(idx)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(X), { class: "size-3.5" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 gap-2 sm:grid-cols-4" }, [
                            createVNode("div", { class: "sm:col-span-2" }, [
                              createVNode(_component_UiLabel, { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Product")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelect, {
                                "model-value": item.productId,
                                "onUpdate:modelValue": ($event) => selectProduct(idx, $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(custodyItems), (c) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: c.productId,
                                          value: c.productId
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(c.product.name) + " (" + toDisplayString(Number(c.quantity).toFixed(1)) + " available) ", 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_component_UiLabel, { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Qty")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiInput, {
                                modelValue: item.quantity,
                                "onUpdate:modelValue": ($event) => item.quantity = $event,
                                type: "number",
                                min: "0",
                                max: item.availableQty,
                                step: "0.001",
                                placeholder: "0",
                                class: "mt-0.5"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                            ]),
                            createVNode("div", null, [
                              createVNode(_component_UiLabel, { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Price")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiInput, {
                                modelValue: item.unitPrice,
                                "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0.00",
                                class: "mt-0.5"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          item.quantity !== void 0 && item.quantity > item.availableQty ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-red-500"
                          }, " Only " + toDisplayString(Number(item.availableQty).toFixed(1)) + " available in custody ", 1)) : createCommentVNode("", true),
                          item.productId && item.quantity && item.unitPrice ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-xs text-muted-foreground text-right"
                          }, " Subtotal: " + toDisplayString(Number(item.quantity * item.unitPrice).toFixed(2)), 1)) : createCommentVNode("", true)
                        ]);
                      }), 128)),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        class: "w-full",
                        onClick: addItem
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "size-4" }),
                          createTextVNode(" Add Product ")
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
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx(() => [
                        createVNode(unref(Package), { class: "size-4" }),
                        createTextVNode(" Products")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Select products from your custody")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                  default: withCtx(() => [
                    unref(custodyItems).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-4 text-sm text-muted-foreground"
                    }, [
                      createVNode(unref(Package), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }),
                      createVNode("p", null, "No products in your custody")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(saleItems), (item, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "space-y-2 rounded-lg border p-3"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Item " + toDisplayString(idx + 1), 1),
                          createVNode(_component_UiButton, {
                            variant: "ghost",
                            size: "icon",
                            class: "size-6",
                            onClick: ($event) => removeItem(idx)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "size-3.5" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-2 sm:grid-cols-4" }, [
                          createVNode("div", { class: "sm:col-span-2" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Product")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": item.productId,
                              "onUpdate:modelValue": ($event) => selectProduct(idx, $event)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(custodyItems), (c) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: c.productId,
                                        value: c.productId
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(c.product.name) + " (" + toDisplayString(Number(c.quantity).toFixed(1)) + " available) ", 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Qty")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: item.quantity,
                              "onUpdate:modelValue": ($event) => item.quantity = $event,
                              type: "number",
                              min: "0",
                              max: item.availableQty,
                              step: "0.001",
                              placeholder: "0",
                              class: "mt-0.5"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Price")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: item.unitPrice,
                              "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0.00",
                              class: "mt-0.5"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        item.quantity !== void 0 && item.quantity > item.availableQty ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-500"
                        }, " Only " + toDisplayString(Number(item.availableQty).toFixed(1)) + " available in custody ", 1)) : createCommentVNode("", true),
                        item.productId && item.quantity && item.unitPrice ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-xs text-muted-foreground text-right"
                        }, " Subtotal: " + toDisplayString(Number(item.quantity * item.unitPrice).toFixed(2)), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128)),
                    createVNode(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      class: "w-full",
                      onClick: addItem
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "size-4" }),
                        createTextVNode(" Add Product ")
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
        _push(`</div><div class="${ssrRenderClass({ "sm:col-span-2 lg:col-span-3": unref(step) !== 3 && unref(isMobile) })}">`);
        _push(ssrRenderComponent(_component_UiCard, {
          style: !unref(isMobile) || unref(step) === 3 ? null : { display: "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Payment`);
                        } else {
                          return [
                            createVNode(unref(DollarSign), { class: "size-4" }),
                            createTextVNode(" Payment")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Set payment amount and method`);
                        } else {
                          return [
                            createTextVNode("Set payment amount and method")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                        default: withCtx(() => [
                          createVNode(unref(DollarSign), { class: "size-4" }),
                          createTextVNode(" Payment")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Set payment amount and method")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-wrap gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: unref(paymentOption) === "paid" ? "default" : "outline",
                      size: "sm",
                      onClick: ($event) => paymentOption.value = "paid"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Paid (${ssrInterpolate(Number(unref(totalAmount)).toFixed(2))})`);
                        } else {
                          return [
                            createTextVNode("Paid (" + toDisplayString(Number(unref(totalAmount)).toFixed(2)) + ")", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: unref(paymentOption) === "partial" ? "default" : "outline",
                      size: "sm",
                      onClick: ($event) => paymentOption.value = "partial"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Partial`);
                        } else {
                          return [
                            createTextVNode("Partial")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: unref(paymentOption) === "unpaid" ? "default" : "outline",
                      size: "sm",
                      onClick: ($event) => paymentOption.value = "unpaid"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Unpaid (0.00)`);
                        } else {
                          return [
                            createTextVNode("Unpaid (0.00)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (unref(paymentOption) === "partial") {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Amount`);
                          } else {
                            return [
                              createTextVNode("Amount")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: unref(paidAmount),
                        "onUpdate:modelValue": ($event) => isRef(paidAmount) ? paidAmount.value = $event : null,
                        type: "number",
                        min: "0",
                        max: unref(totalAmount),
                        step: "0.01",
                        placeholder: "Enter amount",
                        class: "mt-1"
                      }, null, _parent3, _scopeId2));
                      _push3(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId2}>Max: ${ssrInterpolate(Number(unref(totalAmount)).toFixed(2))} | Remaining: ${ssrInterpolate(Number(unref(totalAmount) - (unref(paidAmount) || 0)).toFixed(2))}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(paymentOption) !== "unpaid") {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                        modelValue: unref(paymentMethod),
                        "onUpdate:modelValue": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                              createVNode(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Notes (optional)`);
                        } else {
                          return [
                            createTextVNode("Notes (optional)")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: unref(paymentNotes),
                      "onUpdate:modelValue": ($event) => isRef(paymentNotes) ? paymentNotes.value = $event : null,
                      placeholder: "Payment notes",
                      class: "mt-1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        createVNode(_component_UiButton, {
                          variant: unref(paymentOption) === "paid" ? "default" : "outline",
                          size: "sm",
                          onClick: ($event) => paymentOption.value = "paid"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Paid (" + toDisplayString(Number(unref(totalAmount)).toFixed(2)) + ")", 1)
                          ]),
                          _: 1
                        }, 8, ["variant", "onClick"]),
                        createVNode(_component_UiButton, {
                          variant: unref(paymentOption) === "partial" ? "default" : "outline",
                          size: "sm",
                          onClick: ($event) => paymentOption.value = "partial"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Partial")
                          ]),
                          _: 1
                        }, 8, ["variant", "onClick"]),
                        createVNode(_component_UiButton, {
                          variant: unref(paymentOption) === "unpaid" ? "default" : "outline",
                          size: "sm",
                          onClick: ($event) => paymentOption.value = "unpaid"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Unpaid (0.00)")
                          ]),
                          _: 1
                        }, 8, ["variant", "onClick"])
                      ]),
                      unref(paymentOption) === "partial" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(paidAmount),
                          "onUpdate:modelValue": ($event) => isRef(paidAmount) ? paidAmount.value = $event : null,
                          type: "number",
                          min: "0",
                          max: unref(totalAmount),
                          step: "0.01",
                          placeholder: "Enter amount",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Max: " + toDisplayString(Number(unref(totalAmount)).toFixed(2)) + " | Remaining: " + toDisplayString(Number(unref(totalAmount) - (unref(paidAmount) || 0)).toFixed(2)), 1)
                      ])) : createCommentVNode("", true),
                      unref(paymentOption) !== "unpaid" ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Payment Method")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(paymentMethod),
                          "onUpdate:modelValue": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Notes (optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(paymentNotes),
                          "onUpdate:modelValue": ($event) => isRef(paymentNotes) ? paymentNotes.value = $event : null,
                          placeholder: "Payment notes",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx(() => [
                        createVNode(unref(DollarSign), { class: "size-4" }),
                        createTextVNode(" Payment")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Set payment amount and method")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode(_component_UiButton, {
                        variant: unref(paymentOption) === "paid" ? "default" : "outline",
                        size: "sm",
                        onClick: ($event) => paymentOption.value = "paid"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Paid (" + toDisplayString(Number(unref(totalAmount)).toFixed(2)) + ")", 1)
                        ]),
                        _: 1
                      }, 8, ["variant", "onClick"]),
                      createVNode(_component_UiButton, {
                        variant: unref(paymentOption) === "partial" ? "default" : "outline",
                        size: "sm",
                        onClick: ($event) => paymentOption.value = "partial"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Partial")
                        ]),
                        _: 1
                      }, 8, ["variant", "onClick"]),
                      createVNode(_component_UiButton, {
                        variant: unref(paymentOption) === "unpaid" ? "default" : "outline",
                        size: "sm",
                        onClick: ($event) => paymentOption.value = "unpaid"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Unpaid (0.00)")
                        ]),
                        _: 1
                      }, 8, ["variant", "onClick"])
                    ]),
                    unref(paymentOption) === "partial" ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Amount")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(paidAmount),
                        "onUpdate:modelValue": ($event) => isRef(paidAmount) ? paidAmount.value = $event : null,
                        type: "number",
                        min: "0",
                        max: unref(totalAmount),
                        step: "0.01",
                        placeholder: "Enter amount",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                      createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Max: " + toDisplayString(Number(unref(totalAmount)).toFixed(2)) + " | Remaining: " + toDisplayString(Number(unref(totalAmount) - (unref(paidAmount) || 0)).toFixed(2)), 1)
                    ])) : createCommentVNode("", true),
                    unref(paymentOption) !== "unpaid" ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Payment Method")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(paymentMethod),
                        "onUpdate:modelValue": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                    ])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Notes (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(paymentNotes),
                        "onUpdate:modelValue": ($event) => isRef(paymentNotes) ? paymentNotes.value = $event : null,
                        placeholder: "Payment notes",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="${ssrRenderClass({ "sm:col-span-2 lg:col-span-3": unref(step) !== 4 && unref(isMobile) })}">`);
        _push(ssrRenderComponent(_component_UiCard, {
          style: !unref(isMobile) || unref(step) === 4 ? null : { display: "none" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Check), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Review`);
                        } else {
                          return [
                            createVNode(unref(Check), { class: "size-4" }),
                            createTextVNode(" Review")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Review the sale before creating the invoice`);
                        } else {
                          return [
                            createTextVNode("Review the sale before creating the invoice")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                        default: withCtx(() => [
                          createVNode(unref(Check), { class: "size-4" }),
                          createTextVNode(" Review")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Review the sale before creating the invoice")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="rounded-lg border p-3"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Customer</p><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(selectedCustomer)?.label)}</p></div><div class="rounded-lg border"${_scopeId2}><div class="grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground"${_scopeId2}><span class="col-span-2"${_scopeId2}>Product</span><span class="text-right"${_scopeId2}>Qty</span><span class="text-right"${_scopeId2}>Total</span></div><!--[-->`);
                    ssrRenderList(unref(saleItems), (item, idx) => {
                      _push3(`<div class="grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0"${_scopeId2}><span class="col-span-2 truncate"${_scopeId2}>${ssrInterpolate(item.productName || "—")}</span><span class="text-right"${_scopeId2}>${ssrInterpolate(Number(item.quantity || 0).toFixed(1))}</span><span class="text-right font-medium"${_scopeId2}>${ssrInterpolate(Number((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2))}</span></div>`);
                    });
                    _push3(`<!--]--><div class="flex justify-between border-t px-3 py-2 text-sm font-semibold"${_scopeId2}><span${_scopeId2}>Total</span><span${_scopeId2}>${ssrInterpolate(Number(unref(totalAmount)).toFixed(2))}</span></div></div><div class="rounded-lg border p-3 space-y-2"${_scopeId2}><div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Payment</span><span${_scopeId2}>${ssrInterpolate(unref(paymentOption) === "paid" ? "Paid in Full" : unref(paymentOption) === "partial" ? "Partial" : "Unpaid")}</span></div>`);
                    if (unref(finalPaidAmount) > 0) {
                      _push3(`<div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Amount Paid</span><span class="font-medium text-green-600"${_scopeId2}>${ssrInterpolate(Number(unref(finalPaidAmount)).toFixed(2))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(finalPaidAmount) > 0) {
                      _push3(`<div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Method</span><span${_scopeId2}>${ssrInterpolate(unref(finalPaymentMethod))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(finalPaidAmount) < unref(totalAmount)) {
                      _push3(`<div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Remaining</span><span class="font-medium text-red-600"${_scopeId2}>${ssrInterpolate((unref(totalAmount) - unref(finalPaidAmount)).toFixed(2))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(saving) || unref(totalAmount) <= 0,
                      onClick: handleCreate
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(CreditCard), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` ${ssrInterpolate(unref(saving) ? "Creating..." : "Create Invoice")}`);
                        } else {
                          return [
                            createVNode(unref(CreditCard), { class: "size-4" }),
                            createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Invoice"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "rounded-lg border p-3" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Customer"),
                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(selectedCustomer)?.label), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border" }, [
                        createVNode("div", { class: "grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground" }, [
                          createVNode("span", { class: "col-span-2" }, "Product"),
                          createVNode("span", { class: "text-right" }, "Qty"),
                          createVNode("span", { class: "text-right" }, "Total")
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(saleItems), (item, idx) => {
                          return openBlock(), createBlock("div", {
                            key: idx,
                            class: "grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0"
                          }, [
                            createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.productName || "—"), 1),
                            createVNode("span", { class: "text-right" }, toDisplayString(Number(item.quantity || 0).toFixed(1)), 1),
                            createVNode("span", { class: "text-right font-medium" }, toDisplayString(Number((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                          ]);
                        }), 128)),
                        createVNode("div", { class: "flex justify-between border-t px-3 py-2 text-sm font-semibold" }, [
                          createVNode("span", null, "Total"),
                          createVNode("span", null, toDisplayString(Number(unref(totalAmount)).toFixed(2)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border p-3 space-y-2" }, [
                        createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Payment"),
                          createVNode("span", null, toDisplayString(unref(paymentOption) === "paid" ? "Paid in Full" : unref(paymentOption) === "partial" ? "Partial" : "Unpaid"), 1)
                        ]),
                        unref(finalPaidAmount) > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between text-sm"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Amount Paid"),
                          createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(unref(finalPaidAmount)).toFixed(2)), 1)
                        ])) : createCommentVNode("", true),
                        unref(finalPaidAmount) > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center justify-between text-sm"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Method"),
                          createVNode("span", null, toDisplayString(unref(finalPaymentMethod)), 1)
                        ])) : createCommentVNode("", true),
                        unref(finalPaidAmount) < unref(totalAmount) ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex items-center justify-between text-sm"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Remaining"),
                          createVNode("span", { class: "font-medium text-red-600" }, toDisplayString((unref(totalAmount) - unref(finalPaidAmount)).toFixed(2)), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(saving) || unref(totalAmount) <= 0,
                        onClick: handleCreate
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CreditCard), { class: "size-4" }),
                          createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Invoice"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx(() => [
                        createVNode(unref(Check), { class: "size-4" }),
                        createTextVNode(" Review")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Review the sale before creating the invoice")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "rounded-lg border p-3" }, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Customer"),
                      createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(selectedCustomer)?.label), 1)
                    ]),
                    createVNode("div", { class: "rounded-lg border" }, [
                      createVNode("div", { class: "grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground" }, [
                        createVNode("span", { class: "col-span-2" }, "Product"),
                        createVNode("span", { class: "text-right" }, "Qty"),
                        createVNode("span", { class: "text-right" }, "Total")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(saleItems), (item, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          class: "grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0"
                        }, [
                          createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.productName || "—"), 1),
                          createVNode("span", { class: "text-right" }, toDisplayString(Number(item.quantity || 0).toFixed(1)), 1),
                          createVNode("span", { class: "text-right font-medium" }, toDisplayString(Number((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex justify-between border-t px-3 py-2 text-sm font-semibold" }, [
                        createVNode("span", null, "Total"),
                        createVNode("span", null, toDisplayString(Number(unref(totalAmount)).toFixed(2)), 1)
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border p-3 space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Payment"),
                        createVNode("span", null, toDisplayString(unref(paymentOption) === "paid" ? "Paid in Full" : unref(paymentOption) === "partial" ? "Partial" : "Unpaid"), 1)
                      ]),
                      unref(finalPaidAmount) > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center justify-between text-sm"
                      }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Amount Paid"),
                        createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(unref(finalPaidAmount)).toFixed(2)), 1)
                      ])) : createCommentVNode("", true),
                      unref(finalPaidAmount) > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-between text-sm"
                      }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Method"),
                        createVNode("span", null, toDisplayString(unref(finalPaymentMethod)), 1)
                      ])) : createCommentVNode("", true),
                      unref(finalPaidAmount) < unref(totalAmount) ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex items-center justify-between text-sm"
                      }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Remaining"),
                        createVNode("span", { class: "font-medium text-red-600" }, toDisplayString((unref(totalAmount) - unref(finalPaidAmount)).toFixed(2)), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(saving) || unref(totalAmount) <= 0,
                      onClick: handleCreate
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(CreditCard), { class: "size-4" }),
                        createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Invoice"), 1)
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
        }, _parent));
        _push(`</div></div><div class="hidden sm:flex items-center justify-between">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "outline",
          disabled: unref(step) === 1,
          onClick: prevStep
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
              _push2(` Back `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "size-4" }),
                createTextVNode(" Back ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          disabled: !unref(canProceed),
          onClick: nextStep
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(step) === 4 ? "Review" : "Next")} `);
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(toDisplayString(unref(step) === 4 ? "Review" : "Next") + " ", 1),
                createVNode(unref(ChevronRight), { class: "size-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      }
      _push(ssrRenderComponent(_component_UiSheet, {
        open: unref(showCreateCustomer),
        "onUpdate:open": ($event) => showCreateCustomer.value = $event
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
                              _push5(`Create a new customer`);
                            } else {
                              return [
                                createTextVNode("Create a new customer")
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
                              createTextVNode("Create a new customer")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4 px-4"${_scopeId2}><div${_scopeId2}>`);
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
                    modelValue: unref(createForm).name,
                    "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
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
                    modelValue: unref(createForm).phone,
                    "onUpdate:modelValue": ($event) => unref(createForm).phone = $event,
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
                    modelValue: unref(createForm).address,
                    "onUpdate:modelValue": ($event) => unref(createForm).address = $event,
                    placeholder: "Address",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(creatingCustomer) || !unref(createForm).name.trim(),
                    onClick: handleCreateCustomer
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(creatingCustomer) ? "Creating..." : "Create Customer")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(creatingCustomer) ? "Creating..." : "Create Customer"), 1)
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
                            createTextVNode("Create a new customer")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6 space-y-4 px-4" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(createForm).name,
                          "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
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
                          modelValue: unref(createForm).phone,
                          "onUpdate:modelValue": ($event) => unref(createForm).phone = $event,
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
                          modelValue: unref(createForm).address,
                          "onUpdate:modelValue": ($event) => unref(createForm).address = $event,
                          placeholder: "Address",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(creatingCustomer) || !unref(createForm).name.trim(),
                        onClick: handleCreateCustomer
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(creatingCustomer) ? "Creating..." : "Create Customer"), 1)
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
                          createTextVNode("Create a new customer")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mt-6 space-y-4 px-4" }, [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(createForm).name,
                        "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
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
                        modelValue: unref(createForm).phone,
                        "onUpdate:modelValue": ($event) => unref(createForm).phone = $event,
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
                        modelValue: unref(createForm).address,
                        "onUpdate:modelValue": ($event) => unref(createForm).address = $event,
                        placeholder: "Address",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(creatingCustomer) || !unref(createForm).name.trim(),
                      onClick: handleCreateCustomer
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(creatingCustomer) ? "Creating..." : "Create Customer"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/sales/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-B-2nlV69.mjs.map
