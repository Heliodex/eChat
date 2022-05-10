import Centrifuge from "centrifuge"
import { writable } from "svelte/store"

export const centrifuge = new Centrifuge("ws://echat.ddns.net:8000/connection/websocket")
centrifuge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2NTI2MDQ3MzJ9.KGx3O9kS4K-z8Ydah-_qf892mdWy0PsLqZQEIanAnYs")

export const loginInfo = writable({
	groupname: "",
	username: localStorage.getItem("username"),
})


