<script lang="ts">
	import { loginInfo } from "./user"
	import { messageType } from "./types"
	export let msg: messageType

	const timestamp: Date = new Date(msg.timestamp)

	$: messageClass = msg.username == $loginInfo["username"]?.toString() ? "sent" : "received"
	$: userMessage = msg.username != $loginInfo["username"]?.toString()
</script>

<div class={`message ${messageClass}`}>

	<div class="messageText">
		<p>
			{msg.text}
			<br />
			<time class="time">
				{#if userMessage}
					{msg.username.toString()},
				{/if}
				{timestamp.toTimeString().substring(0, 5)}
			</time>
			<!-- a much better solution than DocSocial -->
		</p>
	</div>
</div>
