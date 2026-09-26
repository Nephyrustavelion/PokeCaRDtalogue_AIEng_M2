import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(
  fileURLToPath(import.meta.url),
);

export default defineConfig(({ mode }) => {
  const emitSourcemaps = mode === "development";

  // GitHub Actions automatically provides GITHUB_REPOSITORY
  // in the format "owner/repository".
  const ghPagesRepoName =
    process.env.GITHUB_REPOSITORY?.split("/")[1];

  return {
    // Local development → "/"
    // GitHub Pages → "/repository-name/"
    base: ghPagesRepoName
      ? `/${ghPagesRepoName}/`
      : "/",

    build: {
      sourcemap: emitSourcemaps ? "inline" : false,
      minify: !emitSourcemaps,
    },

    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      strictPort: true,
    },

    preview: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
    },
  };
});