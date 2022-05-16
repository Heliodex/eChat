<script lang="ts">
	import { loginInfo, centrifuge } from "./user"
	import { messageType } from "./types"
	import Login from "./Login.svelte"
	import ChatMessage from "./ChatMessage.svelte"
	import Settings from "./Settings.svelte"

	let messages: messageType[] = []

	let newMessage: string
	let headerText: string
	let username: string
	let page: string
	let channel: any

	let scrollBottom: any
	//let unreadMessages

	function autoScroll(): void {
		setTimeout(() => scrollBottom?.scrollIntoView(/*{ behavior: "smooth" }*/), 1)
		// without setTimeout, it would scroll before the message was added, making it not scroll all the way
		//unreadMessages = false
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
			channel.history({ limit: 100 }).then(function (history: any): void {
				for (let i = 0; i < history["publications"].length; i++) {
					messages = [...messages, history["publications"][i]["data"]] // anything outside "data" is not used right now
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
				text: newMessage.trim(),
				timestamp: new Date().getTime(),
			})
		}
		newMessage = ""
	}

	$: username && autoScroll() // run autoScroll() whenever username changes, greatest line of code ever

	centrifuge.connect() // don't forget
</script>

<div class="app">
	{#if username && !page}
		<header>
			<img class="headerButton logout darkInvert" src="Backfill.svg" alt="Logout button" on:mousedown={logout} />
			<h2 class="headerText">{headerText}</h2>
			<img
				class="headerButton settings darkInvert"
				src="Settingsfill.svg"
				alt="Settings button"
				on:mousedown={() => {
					page = "settings"
				}}
			/>
		</header>
	{/if}

	<div class="container">
		{#if username}
			{#if page == "settings"}
				<main>
					<header>
						<img
							class="headerButton logout darkInvert"
							src="Backfill.svg"
							alt="Logout button"
							on:mousedown={() => {
								page = ""
							}}
						/>
						<h2>Settings</h2>
					</header>
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
					<div class="messageboxbac">
						<input class="messageBox" type="text" placeholder="Message" bind:value={newMessage} maxlength="100" />

						<button class="send" on:mousedown={sendMessage}>
							<img src="Send.svg" class="fillIcon" alt="Send message" />
						</button>
					</div>
				</form>
			{/if}
		{:else}
			<main>
				<Login />
			</main>
		{/if}
	</div>
</div>
