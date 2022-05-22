<script lang="ts">
	import { loginInfo } from "./user"
	import { messageType } from "./types"
	export let msg: messageType

	const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	const timestamp: Date = new Date(msg.timestamp)

	$: messageClass = msg.username == $loginInfo["username"]?.toString() ? "sent" : "received"
	$: userMessage = msg.username != $loginInfo["username"]?.toString()
</script>

<div class={`message ${messageClass}`}>

	<div class="messageText">
		<p>
			{msg.text}
			<br />
			<i class="time">
				{#if userMessage}
					{msg.username.toString()},
				{/if}
				{week[timestamp.getDay()]} {timestamp.toTimeString().substring(0, 5)} <!-- or {timestamp.getHours()}:{timestamp.getMinutes()} -->
			</i>
			<!-- a much better solution than DocSocial -->
		</p>
	</div>
</div>
