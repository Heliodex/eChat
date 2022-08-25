import { Centrifuge } from "centrifuge"
import { writable } from "svelte/store"

export const centrifuge = new Centrifuge(
	[
		{
			transport: "webtransport",
			endpoint: "https://echat.ddns.net:8000/connection/webtransport",
		},
	],
	{
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE5NTI2NjQyMzN9.G2qQL1Vsr9jv1_UDM2dnoTIVjyxK2m6yu7rgMtSGnhQ",
	}
)

export const loginInfo = writable({
	groupname: localStorage.getItem("groupname"),
	username: localStorage.getItem("username"),
})
