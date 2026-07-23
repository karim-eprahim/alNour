import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';

const upload = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.image) {
    throw createError({ statusCode: 400, statusMessage: "Image data is required" });
  }
  const base64Data = body.image.replace(/^data:image\/\w+;base64,/, "");
  const ext = body.image.startsWith("data:image/png") ? ".png" : ".jpg";
  const filename = `${body.name || Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, filename), base64Data, "base64");
  return { url: `/uploads/${filename}` };
});

export { upload as default };
//# sourceMappingURL=upload.mjs.map
