import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
// import liveReload from "vite-plugin-live-reload"
// import FullReload from 'vite-plugin-full-reload'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		// liveReload("src")
		// FullReload("src", { always: true })
	],
	server: {
		watch: {
			usePolling: true
		}
	}
})