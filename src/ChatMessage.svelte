<script lang="ts">
	import { fly } from "svelte/transition"
	import aes from "crypto-js/aes"
	import Utf8 from "crypto-js/enc-utf8"
	import { loginInfo } from "./user"
	import { transitionLength } from "./settings"
	export let msg: any
	export let messages: any[]
	export let i: number

	const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const timestamp = new Date(messages[i].timestamp)
	$: nextTimestamp = new Date(messages[i + 1]?.timestamp)
	const groupName = $loginInfo["groupname"] // To prevent aes.decrypt from erroring while transitioning out

	let lastMessage = messages[i - 1]?.username != msg.username
	let message: string
	try {
		message = aes
			.decrypt(msg.text, groupName)
			.toString(Utf8)
			.replace(/[><]/g, deXSS)
			.replace(/\*([^\s]*?[^\*]*?[^\s])\*/g, "<strong>$1</strong>")
			.replace(/\^([^\s]*?[^\^]*?[^\s])\^/g, "<em>$1</em>")
			.replace(/\_([^\s]*?[^\_]*?[^\s])\_/g, "<ins>$1</ins>")
			.replace(/\~([^\s]*?[^\~]*?[^\s])\~/g, "<del>$1</del>")
			.replace(/\`([^\s]*?[^\`]*?[^\s])\`/g, "<code>$1</code>")
			// Regex match link with or without whatever:// at start of string
			.replace(/(\w+:\/\/)?(\w+\.)+\w+(:\d{1,5})?(\/\w+)?(\S+)?(\w+)?(\?\w+)?(=\w*)?(#\w+)?\/?/gi, link)
	} catch (e) {
		message = "[error receiving message]"
	}
	// if the same user sent previous message
	function deXSS(x: string) {
		return { "<": "&lt;", ">": "&gt;" }[x]
	}

	function link(x: string) {
		return `<a href="${/^(\w+:\/\/)+/gi.test(x) ? "" : "https://"}${x}" target="_blank">${x}</a>`
		// Regex only matches whatever:// at start of string
	}

	$: userMessage = msg.username != $loginInfo["username"]?.toString()
</script>

<div class={userMessage ? "received" : "sent"} transition:fly={{ x: userMessage ? 100 : -100, duration: 300 * parseFloat($transitionLength) }}>
	<p class={lastMessage ? "lastMessage" : ""}>
		{@html // Text stylising
		message}
		<br />
		<em>
			{#if new Date(nextTimestamp).toTimeString().substring(0, 5) != new Date(timestamp).toTimeString().substring(0, 5)}
				{week[timestamp.getDay()]}
				{timestamp.toTimeString().substring(0, 5)}
			{/if}
		</em>
	</p>
</div>
<em id="username" transition:fly={{ x: userMessage ? 100 : -100, duration: 300 * parseFloat($transitionLength) }}>
	{#if userMessage && messages[i + 1]?.username != msg.username}
		<!-- <img src="Verified.svg" alt="Verified user" /> -->
		{msg.username}
	{/if}

	<!--
		DocSocial much
		but {timestamp.getHours()}:{timestamp.getMinutes()} gives bad time, like 23:6
	-->
</em>

<style lang="sass">
	.sent
		flex-direction: row-reverse
		em
			float: right

		p
			text-align: right
			margin-right: 0.5rem

	.received
		p
			text-align: left
			margin-left: 0.5rem

	em
		float: left
		font-size: 0.7rem

	.lastMessage
		margin-top: 1rem

	#username
		position: absolute
		margin-top: 0.1rem
		left: 0.5rem

	img
		height: 0.6rem
		margin-right: 0.3rem
		filter: brightness(var(--d))

	div
		display: flex
		p
			margin: 0
			margin-top: 1px
			border-radius: 20px
			max-width: 260px
			font-size: 0.9rem
			padding: 10px 10px 7px 10px
			word-wrap: break-word

			:global(a) // Prevents sass being purged as unused
				color: white
				transition: opacity calc(0.2s * var(--transitionLength))
				&:hover
					transition: opacity calc(0.2s * var(--transitionLength))
					opacity: 0.8
</style>
