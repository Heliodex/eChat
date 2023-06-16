import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte(), mkcert()],
	server: {
		https: true,
		// watch: {
		// 	usePolling: true
		// }

		// Uncomment if you experience problems with HMR
	},
})
