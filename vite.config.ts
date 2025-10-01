import { defineConfig } from "vitest/config";
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
  build: {
    outDir: "dist", // default output folder
    sourcemap: true, // helpful for debugging production errors
    rollupOptions: {
      output: {
        // Separate vendor code (e.g., react, react-dom) into its own chunk
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    },
    target: "es2015", // transpile target (modern JS by default)
    minify: "esbuild" // or 'terser' if you need advanced minification
  },
  test: {
    globals: true,
    environment: "jsdom", // use JSDOM to simulate the browser
    setupFiles: "./src/setupTests.ts" // setup file (like CRA)
  }
});
