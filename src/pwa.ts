// src/pwa.js
import { registerSW } from "virtual:pwa-register";

// This function will reload the page when a new service worker is installed
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

export default updateSW;
