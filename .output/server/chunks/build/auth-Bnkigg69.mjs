import { i as defineNuxtRouteMiddleware, u as useAuthStore } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import '@lucide/vue';
import '@vueuse/core';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const auth = defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ["/auth/login", "/auth/register"];
  if (publicRoutes.includes(to.path)) {
    return;
  }
  useAuthStore();
});

export { auth as default };
//# sourceMappingURL=auth-Bnkigg69.mjs.map
