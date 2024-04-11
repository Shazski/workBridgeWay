import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 plugins: [react()],
 define: {
  global: {},
 },
 server:{
  host:true,
  strictPort:true,
  port:5173
 }
});
