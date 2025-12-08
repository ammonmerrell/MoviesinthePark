import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        event: resolve(__dirname, "src/event/index.html"),
        search: resolve(__dirname, "src/event/search.html"),
        weather: resolve(__dirname, "src/event/weather.html"),
      },
    },
  },
});
