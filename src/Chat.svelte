<script>
	import Login from "./Login.svelte"
	import ChatMessage from "./ChatMessage.svelte"
	import { onMount } from "svelte"
	import { username, user } from "./user"
	import debounce from "lodash.debounce"

	import GUN from "gun"
	const db = GUN()

	let newMessage
	let messages = []

	let scrollBottom
	let lastScrollTop
	let canAutoScroll = true
	let unreadMessages = false

	function autoScroll() {
		setTimeout(() => scrollBottom?.scrollIntoView({ behavior: "auto" }), 50)
		unreadMessages = false
	}

	function watchScroll(e) {
		canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop
		lastScrollTop = e.target.scrollTop
	}

	$: debouncedWatchScroll = debounce(watchScroll, 1000)

	onMount(() => {
		var match = {
			// lexical queries are kind of like a limited RegEx or Glob.
			".": {
				// property selector
				">": new Date(
					+new Date() - 1 * 1000 * 60 * 60 * 24
				).toISOString(), // find any indexed property less than 24 hours ago
			},
			"-": 1, // filter in reverse
		}

		// Get Messages
		db.get("newerechatversion")
			.map(match) // "prettier"
			.once(async (data, id) => {
				if (data) {
					// Key for end-to-end encryption
					const key = "theFunny"

					var message = {
						// transform the data
						who: await db.user(data).get("alias"), // a user might lie who they are! So let the user system detect whose data it is.
						// ^^  It may say here that await has no effect. IT IS LYING. IT DOES. DO YOU WANT ALL YOUR MESSAGES DISPLAYING AS [object Object]????

						what: (await SEA.decrypt(data.what, key)) + "", // force decrypt as text.
						when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
					}

					if (message.what) {
						messages = [...messages.slice(-100), message].sort(
							(a, b) => a.when - b.when
						)
						if (canAutoScroll) {
							autoScroll()
						} else {
							unreadMessages = true
						}
					}
				}
			})
	})

	async function sendMessage() {
		const secret = await SEA.encrypt(newMessage, "theFunny")
		const message = user.get("all").set({ what: secret })
		const index = new Date().toISOString()
		db.get("newerechatversion").get(index).put(message)
		newMessage = ""
		canAutoScroll = true
		autoScroll()
	}
</script>

<div class="container">
	{#if $username}
		<main class="messages" on:scroll={debouncedWatchScroll}>
			<div class="spacer2" />

			{#each messages as message (message.when)}
				<ChatMessage {message} sender={$username} />
			{/each}

			<div class="dummy" bind:this={scrollBottom} />
		</main>

		<form on:submit|preventDefault={sendMessage}>
			<input
				class="messageBox"
				type="text"
				placeholder="Type a message..."
				bind:value={newMessage}
				maxlength="100"
			/>

			<button class="send">
				<img src="send.svg" class="sendimg" alt="Send message" />
			</button>
		</form>

		<!--{#if !canAutoScroll}		
			{#if unreadMessages}
				<img class="scrollbutton" src="message.svg" on:click={autoScroll} alt="New messages"/>
			{:else}
				<img class="scrollbutton" src="message.svg" on:click={autoScroll} alt="Back to bottom"/>
			{/if}
		{/if}-->
	{:else}
		<main>
			<Login />
		</main>
	{/if}
</div>
