<script lang="ts">
	import { fly } from "svelte/transition"
	import aes from "crypto-js/aes"
	import Utf8 from "crypto-js/enc-utf8"
	import { loginInfo } from "./user"
	import { messageType } from "./types"
	import { transitionLength } from "./settings"
	export let msg: messageType

	const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const timestamp = new Date(msg.timestamp)
	const groupName = $loginInfo["groupname"] // To prevent aes.decrypt from erroring while transitioning out

	function deXSS(x: string) {
		return {"<": "&lt;", ">": "&gt;"}[x]
	}

	$: messageClass = msg.username == $loginInfo["username"]?.toString() ? "sent" : "received"
	$: userMessage = msg.username != $loginInfo["username"]?.toString()
</script>

<div class={messageClass} transition:fly={{ x: userMessage ? 100 : -100, duration: 300 * parseFloat($transitionLength) }}>
	<p>
		{@html // Text stylising
			aes.decrypt(msg.text, groupName).toString(Utf8)
			.replace(/[<>]/g, deXSS)
			.replace(/\*([^\s]*?[^\`]*?[^\s])\*/g, "<strong>$1<\/strong>")
			.replace(/\_([^\s]*?[^\`]*?[^\s])\_/g, "<em>$1<\/em>")
		}
		<br />
		<em>
			{#if userMessage}
				{msg.username},
			{/if}
			{week[timestamp.getDay()]}
			{timestamp.toTimeString().substring(0, 5)}
			<!-- {timestamp.getHours()}:{timestamp.getMinutes()} gives bad time, like 23:6 -->
		</em>
		<!-- a much better solution than DocSocial -->
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
		font-size: 0.5rem
		line-height: 0.6rem

	.sent, .received 
		p
			max-width: 260px
			margin: 4px 0.5rem 0 0.5rem

			line-height: 1rem
			font-size: 0.9rem

			padding: 10px 15px 5px 15px
			border-radius: 20px
			word-wrap: break-word

	div
		display: flex
</style>
