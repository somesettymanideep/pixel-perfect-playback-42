// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

const isGhActions = Boolean(process.env.GITHUB_ACTIONS);
const rawBasePath = process.env.BASE_PATH || (isGhActions ? "/pixel-perfect-playback-42/" : "/");
const basePath = rawBasePath.endsWith("/") ? rawBasePath : `${rawBasePath}/`;
const routerBasePath = basePath === "/" ? "/" : basePath.replace(/\/$/, "");

function assetJsonPlugin(): Plugin {
  return {
    name: "asset-json-base-resolver",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith(".asset.json")) {
        try {
          const json = JSON.parse(code);
          if (json.url && typeof json.url === "string" && json.url.startsWith("/")) {
            const prefix = basePath === "/" ? "" : basePath.replace(/\/$/, "");
            json.url = `${prefix}${json.url}`;
            return JSON.stringify(json);
          }
        } catch {
          // ignore parsing error
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [assetJsonPlugin()],
  vite: {
    base: basePath,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: {
      basepath: routerBasePath,
    },
    prerender: { enabled: true },
  },
});
