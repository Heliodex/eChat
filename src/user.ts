import Centrifuge from "centrifuge"
import { writable } from "svelte/store"

export const centrifuge = new Centrifuge("ws://echat.ddns.net:8000/connection/websocket")
centrifuge.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2NTMyNjUyODh9.9dMsEPH65UBS382_-M_7bBUEPniPThqPILlxoA6TWA4")

export const loginInfo = writable({
	groupname: "",
	username: localStorage.getItem("username"),
})