<script>
	import { user, ably, channelName } from "./user"
	import Login from "./Login.svelte"
	import ChatMessage from "./ChatMessage.svelte"
	import Settings from "./Settings.svelte"

	let newMessage
	let messages = []
	let username
	let canSend = true
	let channel
	let headerText
	let page

	let scrollBottom
	//let unreadMessages

	function autoScroll() {
		setTimeout(() => scrollBottom?.scrollIntoView({ behavior: "smooth" }), 1)
		// without setTimeout, it would scroll before the message was added, making it not scroll all the way
		//unreadMessages = false
	}

	user.subscribe(value => {
		if (value.trim()) {
			if (channel) {
				channel.unsubscribe()
			}
			username = value.trim()

			channel = ably.channels.get("[?rewind=5]echat:" + $channelName)

			channel.subscribe("message", message => {
				// a different sort of "subscribe"
				messages = [...messages, message] // Must be done to make the {#each messages} block update with the new message.
				if (username) {
					// prevent autoscroll being called many times before login
					autoScroll()
				}
			})
		}
	})

	channelName.subscribe(value => {
		headerText = value
	})

	function logout() {
		username = null
		messages = []
		channelName.set("")
		user.set("")
	}

	async function sendMessage() {
		if (canSend) {
			if (newMessage.trim()) {
				canSend = false
				channel.publish("message", {
					username: username,
					text: newMessage.trim(),
				})
				newMessage = null
				setTimeout(() => {
					canSend = true
				}, 1337)
			} else {
				newMessage = null
			}
		}
	}

	$: username && autoScroll() // run autoScroll() whenever username changes, greatest line of code ever
</script>

{#if username && !page}
	<header>
		<img class="headerButton logout" src="back.svg" alt="Logout button" on:click={logout} />
		<h2>{headerText}</h2>
		<img class="headerButton settings" src="settings2.svg" alt="Logout button" on:click={logout} />
	</header>
{/if}

<div class="container">
	{#if username}
		{#if page == "settings"}
			<main>
				<button
					class="close"
					on:click={() => {
						page = null
					}}><img src="close.svg" class="sendimg" alt="Close icon" /></button
				>
				<Settings />
			</main>
		{:else}
			<main class="messages">
				<div class="spacer2" />

				{#each messages as msg}
					<ChatMessage {msg} />
				{/each}

				<div class="dummy" bind:this={scrollBottom} />
			</main>

			<form on:submit|preventDefault={sendMessage} class="messageForm">
				<input class="messageBox" type="text" placeholder="Message" bind:value={newMessage} maxlength="100" />

				<button class="send">
					<img src="send.svg" class="sendimg" alt="Send message" />
				</button>
			</form>
		{/if}
	{:else}
		<main>
			<Login />
		</main>
	{/if}
</div>
