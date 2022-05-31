<script lang="ts">
	import { fade } from "svelte/transition"
	import aes from "crypto-js/aes"
	import { loginInfo, centrifuge } from "./user"
	import { historyLength ,transitionLength } from "./settings"
	import { messageType } from "./types"
	import Login from "./Login.svelte"
	import ChatMessage from "./ChatMessage.svelte"
	import Settings from "./Settings.svelte"

	let messages: messageType[] = []

	let newMessage: string
	let headerText: string
	let username: string
	let page = "chat"
	let channel: any

	let scrollBottom: any

	function autoScroll(): void {
		requestAnimationFrame(() =>
			scrollBottom?.scrollIntoView({
				/* behavior: "smooth" */
			})
		)
		// without requestAnimationFrame, it would scroll before the message was added, making it not scroll all the way
	}

	loginInfo.subscribe(value => {
		if (value["username"]?.trim() && value["groupname"]?.trim()) {
			if (channel) {
				channel.unsubscribe()
			}

			username = value["username"].trim()

			headerText = value["groupname"]

			channel = centrifuge.subscribe("chat:" + value["groupname"], function (message) {
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
		}
	})

	function logout(): void {
		username = ""
		messages = []
		loginInfo.set({ groupname: "", username: $loginInfo["username"] })
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

{#if username && page == "chat"}
	<header transition:fade={{duration: 500 * parseFloat($transitionLength)}}>
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
		<header transition:fade={{duration: 500 * parseFloat($transitionLength)}}>
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
	{:else}
		<main id="messages">
			{#each messages as msg}
				<ChatMessage {msg} />
			{/each}
			<br /><br /><br bind:this={scrollBottom} />
		</main>

		<form on:submit|preventDefault={sendMessage}>
			<input type="text" placeholder="Message" bind:value={newMessage} maxlength="100" />

			<button on:mousedown={sendMessage}>
				<img src="Send.svg" alt="Send message" />
			</button>
		</form>
	{/if}
{:else}
	<main in:fade>
		<Login />
	</main>
{/if}

<style lang="sass">
	#settings
		left: auto
		right: 0

	#messages
		margin-top: 10vh
		height: 90vh
		overflow-x: hidden
		overflow-y: auto
		display: flex
		flex-direction: column

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
