import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(async ({ command }) => {
  const plugins = [
    tanstackStart({
      server: { entry: "server" },
    }),
    tailwindcss(),
    tsConfigPaths(),
    react(),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(
      nitro({
        preset: "cloudflare-module",
        output: {
          dir: "dist",
          serverDir: "dist/server",
          publicDir: "dist/client",
        },
        cloudflare: {
          nodeCompat: true,
          deployConfig: true,
        },
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 8080,
    },
  };
});
