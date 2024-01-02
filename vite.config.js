import { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "/pages/about/index.html"),
        pokemon: resolve(__dirname, "/pages/pokemon/index.html"),
      },
    },
  },
});
