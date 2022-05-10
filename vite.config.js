import vitePluginString from "vite-plugin-string"

export default {
  plugins: [vitePluginString()],
  server: {
    host: true,
    port: 8080,
  },
}
