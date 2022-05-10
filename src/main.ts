import Chat from "./Chat.svelte"
import "./global.sass"
import "./colour.sass"

const app = new Chat({
  target: document.getElementById("app")
})

export default app
