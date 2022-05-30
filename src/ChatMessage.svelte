<script lang="ts">
	import { loginInfo } from "./user"
	import { messageType } from "./types"
	export let msg: messageType

	const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const timestamp = new Date(msg.timestamp)

	$: messageClass = msg.username == $loginInfo["username"]?.toString() ? "sent" : "received"
	$: userMessage = msg.username != $loginInfo["username"]?.toString()
</script>

<div class={messageClass}>
	<p>
		{msg.text}
		<br />
		<em>
			{#if userMessage}
				{msg.username.toString()},
			{/if}
			{week[timestamp.getDay()]}
			{timestamp.getHours()}:{timestamp.getMinutes()}
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