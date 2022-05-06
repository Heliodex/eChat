<script>
	import { fade } from "svelte/transition"
	import Terms from "./Terms.svelte"
	import Settings from "./Settings.svelte"
	import { user, channelName } from "./user"
	import { splashes } from "./splashes"

	let loginInput = localStorage.getItem("username")
	let groupInput
	let page

	function login() {
		channelName.set(groupInput)
		localStorage.setItem("username", loginInput)
		user.set(loginInput) // if you log back in with the same username, it does not work.
	}
</script>

<main transition:fade>
	{#if page == "terms"}
		<button
			class="close"
			on:click={() => {
				page = null
			}}><img src="close.svg" class="sendimg" alt="Close icon" /></button
		>
		<Terms />
	{:else if page == "settings"}
		<button
			class="close"
			on:click={() => {
				page = null
			}}><img src="close.svg" class="sendimg" alt="Close icon" /></button
		>
		<Settings />
	{:else}
		<img src="echat.svg" class="logo" alt="eChat Logo" width="50%" />

		<p class="splash">{@html splashes[Math.floor(Math.random() * splashes.length)]}</p>

		<form on:submit|preventDefault={login}>
			<div class="loginIcon">
				<img src="group.svg" class="sendimg" alt="Group icon" />
			</div>
			<input class="loginInput" placeholder="Group name" name="group" bind:value={groupInput} minlength="3" maxlength="16" />

			<div class="loginIcon">
				<img src="user.svg" class="sendimg" alt="Username icon" />
			</div>
			<input class="loginInput" placeholder="Username" name="username" bind:value={loginInput} minlength="3" maxlength="16" />

			<button class="joinButton">Join</button>
		</form>

		<p class="footer">
			<br />
			By using eChat, you agree to the
			<button
				class="linkStyle"
				on:click={() => {
					page = "terms"
				}}>Terms of Service</button
			>.
		</p>
	{/if}
</main>
