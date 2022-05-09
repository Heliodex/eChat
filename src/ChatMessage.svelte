<script>
	import { loginInfo } from "./user"
	export let msg

	const timestamp = new Date(msg.data.timestamp)

	$: messageClass = msg.data.username == $loginInfo["username"].toString() ? "sent" : "received"
	$: userMessage = msg.data.username != $loginInfo["username"].toString()
</script>

<div class={`message ${messageClass}`}>
	<div class="spacer" />

	<div class="messageText">
		<p>
			{msg.data.text}
			<br />
			<time class="time">{timestamp.toTimeString().substring(0, 5)}</time>
			<!-- a much better solution than DocSocial -->
		</p>

		{#if userMessage}
			<div class="aftermessage">
				<time class="username">{msg.data.username.toString()}</time>
			</div>
		{/if}
	</div>
</div>
