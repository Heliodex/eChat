import Chat from "./Chat.svelte"
import "./global.sass"
import "./colour.sass"

new Chat({
	target: document.querySelector("body")!,
	intro: true
})