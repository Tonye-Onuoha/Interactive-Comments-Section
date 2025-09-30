import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: "./tsconfig.app.json" // Adjust this path if your tsconfig is named differently or located elsewhere
      }
    })
  ],
  test: {
    globals: true,
    environment: "jsdom", // use JSDOM to simulate the browser
    setupFiles: "./src/setupTests.ts" // setup file (like CRA)
  }
});
