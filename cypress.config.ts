import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://sgi-production.up.railway.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});