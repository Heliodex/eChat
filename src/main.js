import App from "./App.svelte"
import "./global.sass"
import "./colour.sass"

const app = new App({
  target: document.getElementById("app")
})

export default app
