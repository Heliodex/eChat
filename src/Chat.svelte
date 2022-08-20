<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import aes from "crypto-js/aes"
	import { loginInfo, centrifuge } from "./user"
	import { historyLength, transitionLength } from "./settings"
	import Login from "./Login.svelte"
	import ChatMessage from "./ChatMessage.svelte"
	import Settings from "./Settings.svelte"

	let messages: any[] = []

	let newMessage: string
	let headerText: string
	let username: string
	let page = "chat"
	let channel: any
	let loadingMessage = "Loading..."
	let error = false

	let scrollBottom: any

	function autoScroll(): void {
		requestAnimationFrame(() =>
			scrollBottom?.scrollIntoView({
				//behavior: "smooth"
			})
		)
		// without requestAnimationFrame, it would scroll before the message was added, making it not scroll all the way
	}

	loginInfo.subscribe(value => {
		if (value["username"]?.trim() && value["groupname"]?.trim()) {
			error = false
			loadingMessage = "Loading..."

			username = value["username"].trim()

			headerText = value["groupname"]

			channel = centrifuge.subscribe("chat:" + value["groupname"], function (message: any) {
				// a different sort of "subscribe"
				messages = [...messages, message["data"]] // Must be done to make the {#each messages} block update with the new message.
				if (username) {
					// prevent autoscroll being called many times before login
					autoScroll()
				}
			})

			channel.history({ limit: parseInt($historyLength), reverse: true }).then(function (history: any): void {
				let pubs = history["publications"].reverse()
				for (let i = 0; i < pubs.length; i++) {
					messages = [...messages, pubs[i]["data"]] // anything outside "data" is not used right now
				}
				autoScroll()
			})

			if (messages.length == 0) {
				let socket = new WebSocket("ws://echat.ddns.net:8000/connection/websocket")
				let times = 0

				const interval = setInterval(() => {
					times += 1
					if (socket.readyState == 1 || messages.length > 0) {
						loadingMessage = "No messages"
						clearInterval(interval)
					} else if (times > 15) {
						error = true
						clearInterval(interval)
					}
				}, 100)
			}
		}
	})

	function logout(): void {
		channel.unsubscribe()
		username = ""
		messages = []
		loginInfo.set({ groupname: "", username: $loginInfo["username"] })
		localStorage.setItem("groupname", "")
	}

	async function sendMessage(): Promise<void> {
		if (newMessage?.trim()) {
			centrifuge.publish("chat:" + $loginInfo["groupname"], {
				username: username,
				text: aes.encrypt(newMessage.trim(), $loginInfo["groupname"]).toString(),
				timestamp: new Date().getTime(),
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
		<h2>{headerText}</h2>
		<img
			id="settings"
			src="Settingsfill.svg"
			alt="Settings button"
			on:mousedown={() => {
				page = "Settings"
			}}
		/>
	</header>
{/if}

{#if username}
	{#if page == "Settings"}
		<header transition:fade={{ duration: 200 * parseFloat($transitionLength) }}>
			<img
				src="Backfill.svg"
				alt="Logout button"
				on:mousedown={() => {
					page = "chat"
				}}
			/>
			<h2>Settings</h2>
		</header>
		<Settings />
	{:else if error}
		<main>
			<br /><br /><br />
			<h1 id="error">Error</h1>
			{#if navigator.onLine}
				<p>
					We can't connect to the eChat message servers.<br />
					<br />
					Please try again later, and contact eChat support if the problem persists.
				</p>
			{:else}
				<p>
					It looks like you aren't connected to the internet.<br />
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
					<ChatMessage {msg} {messages} {i} />
				{/each}
				<br /><br /><br /><br bind:this={scrollBottom} />
				<!-- Appears like too much margin in dev server, works fine when built -->
			</main>
		</main>

		<form on:submit|preventDefault={sendMessage} transition:fly={{ y: 40, duration: 300 * parseFloat($transitionLength) }}>
			<input type="text" placeholder="Send a message" bind:value={newMessage} maxlength="100" />

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
