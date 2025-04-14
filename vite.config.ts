import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "Shop.co",
        short_name: "ShopCo",
        description: "Your one-stop shop for fashion and accessories",
        theme_color: "#ffffff",
        background_color: "#678924",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            purpose: "maskable",
            sizes: "125x125",
            src: "icons/mask_icon.png",
            type: "image/png",
          },
          {
            src: "icons/icons-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons/icons-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/icons-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/icons-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icons-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/icons-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/icons-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icons-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icons-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icons-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
