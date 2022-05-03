import Ably from "ably"
import { writable } from "svelte/store"

export const ably = new Ably.Realtime("isRZcA.aBObcg:whZxS4MZXz9sIEBWlbeoVmYgnjQJ7VXLoGCAUwac-xU")

export const channelName = writable("")
export const user = writable("")
//export const channelname = writable("")

ably.connection.on("failed", () => {
	alert("Connection to eChat failed.")
})


