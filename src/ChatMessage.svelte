<script lang="ts">
	import { fly } from "svelte/transition"
	import aes from "crypto-js/aes"
	import Utf8 from "crypto-js/enc-utf8"
	import { loginInfo } from "./user"
	import { transitionLength } from "./settings"
	export let msg: any

	const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const timestamp = new Date(msg.timestamp)
	const groupName = $loginInfo["groupname"] // To prevent aes.decrypt from erroring while transitioning out

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
	<p>
		{@html // Text stylising
		aes
			.decrypt(msg.text, groupName)
			.toString(Utf8)
			.replace(/[<>]/g, deXSS)
			.replace(/\*([^\s]*?[^\*]*?[^\s])\*/g, "<strong>$1</strong>")
			.replace(/\^([^\s]*?[^\^]*?[^\s])\^/g, "<em>$1</em>")
			.replace(/\_([^\s]*?[^\_]*?[^\s])\_/g, "<ins>$1</ins>")
			.replace(/\~([^\s]*?[^\~]*?[^\s])\~/g, "<del>$1</del>")
			.replace(/\`([^\s]*?[^\`]*?[^\s])\`/g, "<code>$1</code>")
			// Regex match link with or without whatever:// at start of string
			.replace(/(\w+:\/\/)?(\w+\.)+\w+(:\w+)?(\/\w+)*(.\w+)?(\w+)?(\?\w+)?(=\w+)?(#\w+)?\/?/gi, link)}
		<br />
		<em>
			{#if userMessage}
				<!-- <img src="Verified.svg" alt="Verified user" /> -->
				{msg.username},
			{/if}
			{week[timestamp.getDay()]}
			{timestamp.toTimeString().substring(0, 5)}
			<!--
				DocSocial much
				but {timestamp.getHours()}:{timestamp.getMinutes()} gives bad time, like 23:6
			-->
		</em>
	</p>
</div>

<style lang="sass">
	.sent
		flex-direction: row-reverse
		p
			text-align: right
		em
			float: right

	.received p
		text-align: left

	em
		display: flex
		font-size: 0.7rem

	img
		height: 0.6rem
		margin-right: 0.3rem

	.sent, .received
		p
			max-width: 260px
			margin: 0.25rem 0.5rem 0rem 0.5rem

			font-size: 0.9rem

			padding: 10px 15px 5px 15px
			border-radius: 20px
			word-wrap: break-word

			:global(a) // Prevents sass being purged as unused
				color: white
				transition: opacity calc(0.2s * var(--transitionLength))
				&:hover 
					transition: opacity calc(0.2s * var(--transitionLength))
					opacity: 0.8


	div
		display: flex

</style>
