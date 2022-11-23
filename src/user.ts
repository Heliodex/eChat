import { Centrifuge } from "centrifuge"
import { writable } from "svelte/store"

export const centrifuge = new Centrifuge(
	[
		{
			transport: "webtransport",
			endpoint: "https://YOUR_DOMAIN:8000/connection/webtransport",
		},
	],
	{
		token: "YOUR_TOKEN", // ./centrifugo gentoken -u 1 (https://centrifugal.dev/docs/getting-started/quickstart)
	}
)

export const loginInfo = writable({
	groupname: localStorage.getItem("groupname"),
	username: localStorage.getItem("username"),
	verified: false, // change to true for checkmark (not secure)
})
