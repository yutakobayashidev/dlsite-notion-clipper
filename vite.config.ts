import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "DLsite Cliper",
  icons: {
    "128": "icon/icon128.png",
  },
  version: "1.0.0",
  host_permissions: ["https://*/*"],
  permissions: ["tabs"],
  action: {
    default_popup: "index.html",
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
