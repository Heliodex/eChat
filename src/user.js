import Ably from "ably"
import { writable } from "svelte/store"

export const ably = new Ably.Realtime("isRZcA.aBObcg:whZxS4MZXz9sIEBWlbeoVmYgnjQJ7VXLoGCAUwac-xU")

export const loginInfo = writable({
	groupname: "",
	username: localStorage.getItem("username"),
})

ably.connection.on("failed", () => {
	alert("Connection to eChat failed.")
})


