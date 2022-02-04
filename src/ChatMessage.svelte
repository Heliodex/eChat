<script>
	export let message;
	export let sender;

	import { username } from "./user";

	const messageClass = message.who === sender ? "sent" : "received";

	const avatar = `https://avatars.dicebear.com/api/identicon/eChat_${message.who}.svg?rotate=45`;

	const ts = new Date(message.when);

	$: userMessage = (message.who.toString() != $username.toString()) // if message was sent by the current user, don't forget the $
</script>

<div class={`message ${messageClass}`}>

	{#if userMessage}
		<img src={avatar} alt="avatar" />
	{:else}
		<div class="spacer" />
	{/if}

	<div class="message-text">

		  <!-- literally the same solution as DocSocial -->
		
		<p>
			{message.what}
			<br>
			<time class="time">{ts.toTimeString().substring(0, 5)}</time>
		
		</p>

		{#if userMessage}
			<time class="username">{message.who.toString()}</time>
		{/if}
		

		

	</div>
</div>
