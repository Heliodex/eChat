<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import aes from "crypto-js/aes"
	import { loginInfo, centrifuge } from "./user"
	import { historyLength, transitionLength, hideChannel } from "./settings"
	import Login from "./Login.svelte"
	import ChatMessage from "./ChatMessage.svelte"
	import Settings from "./Settings.svelte"

	let messages: any[] = []

	let newMessage: string
	let headerText: string
	let numOnline: number
	let username: string
	let page = "chat"
	let channel: any

	let channelName: string
	let previouslySubscribed: { [index: string]: object } = {}
	// Holds all channels that have previously been subscribed to, prevent recreating a subscription

	let loadingMessage = "Loading..."
	let error = false

	let scrollBottom: any

	function autoScroll() {
		requestAnimationFrame(() =>
			scrollBottom?.scrollIntoView({
				//behavior: "smooth"
			})
		)
		// without requestAnimationFrame, it would scroll before the message was added, making it not scroll all the way
	}

	loginInfo.subscribe(value => {
		if (value.username?.trim() && value.groupname?.trim()) {
			error = false
			loadingMessage = "Loading..."

			channelName = "chat:" + value.groupname

			username = value.username.trim()

			headerText = value.groupname

			channel = previouslySubscribed[channelName]
				? previouslySubscribed[channelName]
				: // Prevent from resubscribing
				  centrifuge.newSubscription(channelName)

			channel.on("publication", (message: any) => {
				// a different sort of "subscribe"
				messages.push(message["data"])
				messages = messages // Must be done to make the {#each messages} block update with the new message.
				if (username)
					// prevent autoscroll being called many times before login
					autoScroll()
			})

			channel.on("join", () => numOnline++)
			channel.on("leave", () => numOnline--)

			channel.subscribe()
			channel.presence().then((presence: any) => {
				numOnline = Object.keys(presence.clients).length
			})

			channel
				.history({ limit: parseInt($historyLength), reverse: true })
				.then((history: any) => {
					let pubs = history["publications"].reverse()
					for (let i = 0; i < pubs.length; i++) {
						messages.push(pubs[i]["data"]) // anything outside "data" is not used right now
						messages = messages
					}
					autoScroll()
				})

			if (messages.length == 0) {
				try {
					const transport = new WebTransport(
						"https://YOUR_DOMAIN:8000/connection/webtransport"
					)
					let times = 0

					const interval = setInterval(() => {
						times += 1
						if (transport.ready || messages.length > 0) {
							loadingMessage = "No messages"
							clearInterval(interval)
						} else if (times > 15) {
							error = true
							clearInterval(interval)
						}
					}, 100)
				} catch {
					// Can't tell whether there is an error or not
					loadingMessage = "Unknown connection state"
				}
			} // very very clunky solution to check whether there was an error or whether there were just 0 messages
		}
	})

	function logout() {
		channel.unsubscribe()
		channel.removeAllListeners()
		previouslySubscribed[channelName] = channel
		channelName = ""
		username = ""
		messages = []
		numOnline = 0
		loginInfo.set({
			groupname: "",
			username: $loginInfo.username,
			verified: false,
		})
		localStorage.setItem("groupname", "")
	}

	async function sendMessage() {
		if (newMessage?.trim()) {
			centrifuge.publish("chat:" + $loginInfo.groupname, {
				username: username,
				text: aes
					.encrypt(newMessage.trim(), $loginInfo.groupname)
					.toString(),
				timestamp: new Date().getTime(),
				// verified: true, // add for checkmark (not secure)
			})
		}
		newMessage = ""
	}

	$: page && autoScroll() // run autoScroll() whenever page changes, greatest line of code ever

	centrifuge.connect() // don't forget
</script>

{#if username}
	<header transition:fade={{ duration: 200 * parseFloat($transitionLength) }}>
		<img src="Backfill.svg" alt="Logout button" on:mousedown={logout} />
		<div>
			<h2>
				{#if $hideChannel}
					eChat
				{:else}
					{headerText}
				{/if}
			</h2>
			{#if numOnline}
				<p>{numOnline} online</p>
			{/if}
		</div>
		<img
			id="settings"
			src="Settingsfill.svg"
			alt="Settings button"
			on:mousedown={() => (page = "Settings")} />
	</header>
{/if}

{#if username}
	{#if page == "Settings"}
		<header
			transition:fade={{
				duration: 200 * parseFloat($transitionLength),
			}}>
			<img
				src="Backfill.svg"
				alt="Logout button"
				on:mousedown={() => (page = "chat")} />
			<h2>Settings</h2>
		</header>
		<Settings />
	{:else if error}
		<main>
			<br />
			<br />
			<br />
			<h1 id="error">Error</h1>
			{#if navigator.onLine}
				<p>
					We can't connect to the eChat message servers.
					<br />
					<br />
					Please try again later, and contact eChat support if the problem
					persists.
				</p>
			{:else}
				<p>
					It looks like you aren't connected to the internet.
					<br />
					<br />
					Please reconnect to the internet and try again.
				</p>
			{/if}
		</main>
	{:else}
		<main id="messages">
			<main in:fade={{ duration: 200 * parseFloat($transitionLength) }}>
				{#if messages.length == 0}
					<br />
					<em id="nomessages">{loadingMessage}</em>
				{/if}

				{#each messages as msg, i}
					<ChatMessage {messages} {msg} {i} />
				{/each}
				<br />
				<br />
				<br />
				<br bind:this={scrollBottom} />
			</main>
		</main>

		<form
			on:submit|preventDefault={sendMessage}
			transition:fly={{
				y: 40,
				duration: 300 * parseFloat($transitionLength),
			}}>
			<input
				type="text"
				placeholder="Send a message"
				bind:value={newMessage}
				maxlength="150" />

			<button on:mousedown={sendMessage}>
				<img src="Send.svg" alt="Send message" />
			</button>
		</form>
	{/if}
{:else}
	<main in:fade={{ duration: 300 * parseFloat($transitionLength) }}>
		<Login />
	</main>
{/if}

<style lang="sass">
	header div
		width: 75%
		display: flex
		flex-direction: column
		h2, p
			width: 100%
			padding: 0
			margin: 0
		h2
			margin-top: 5%
		p
			margin-top: -3%
			font-size: 0.7rem

	#settings
		left: auto
		right: 0

	#messages
		position: fixed
		bottom: 0
		height: 90vh
		width: 100vw
		overflow-x: hidden
		overflow-y: auto
		flex-direction: column

	p
		padding: 0 3rem

	form
		height: 8vh
		position: fixed
		bottom: 0
		display: flex

	input
		font-size: 1rem
		height: 35px
		padding: 0 0.7rem
		margin-left: 5px
		width: 315px
		box-sizing: border-box

	button
		cursor: pointer
		width: 35px
		height: 35px
		display: flex
		justify-content: center
		margin: 0 5px
</style>
