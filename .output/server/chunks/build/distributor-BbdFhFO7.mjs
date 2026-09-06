import { o as defineNuxtRouteMiddleware } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import '@lucide/vue';
import '@vueuse/core';
import 'clsx';
import 'tailwind-merge';

const distributor = defineNuxtRouteMiddleware(() => {
  return;
});

export { distributor as default };
//# sourceMappingURL=distributor-BbdFhFO7.mjs.map
