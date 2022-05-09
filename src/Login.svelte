<script>
	import { fade } from "svelte/transition"
	import Terms from "./Terms.svelte"
	import Settings from "./Settings.svelte"
	import { loginInfo } from "./user"
	import { splashes } from "./splashes"

	let page
	let loginInput = $loginInfo
	let canLogin = true
	// Without this, it would subscribe-unsubscribe-resubscribe rather than just subbing once,
	// or subscribing more than once, resulting in message duplication
	// So login() must be being called more than once by the form. idk y

	function login() {
		if (canLogin) {
			canLogin = false // Still lets you logout then log back in, though
			loginInfo.set(loginInput) // If you log back in with the same username, history does not load. (ably)
			localStorage.setItem("username", $loginInfo["username"])
		}
	}
</script>

<main transition:fade>
	{#if page == "terms"}
		<header>
			<img
				class="headerButton logout"
				src="Backfill.svg"
				alt="Logout button"
				on:mousedown={() => {
					page = null
				}}
			/>
			<h2>eChat</h2>
		</header>
		<Terms />
	{:else if page == "settings"}
		<header>
			<img
				class="headerButton logout"
				src="Backfill.svg"
				alt="Logout button"
				on:mousedown={() => {
					page = null
				}}
			/>
			<h2>eChat</h2>
		</header>
		<Settings />
	{:else}
		<button
			class="settingsLogin"
			on:mousedown={() => {
				page = "settings"
			}}
		>
			<img class="fillIconSmall" src="Settings.svg" alt="Settings button" />
		</button>

		<img src="echat.svg" class="logo" alt="eChat Logo" width="50%" />

		<p class="splash">{@html splashes[Math.floor(Math.random() * splashes.length)]}</p>

		<form on:submit|preventDefault={login}>
			<div class="loginIcon">
				<img src="Group.svg" alt="Group icon" />
			</div>
			<input class="loginInput" placeholder="Group name" name="group" bind:value={loginInput["groupname"]} minlength="3" maxlength="16" />

			<div class="loginIcon">
				<img src="Account.svg" alt="Account icon" />
			</div>
			<input class="loginInput" placeholder="Username" name="username" bind:value={loginInput["username"]} minlength="3" maxlength="16" />

			<button class="joinButton" on:mousedown={login}>Join</button>
		</form>

		<p class="footer">
			<br />
			By using eChat, you agree to the
			<button
				class="linkStyle"
				on:mousedown={() => {
					page = "terms"
				}}>Terms of Service</button
			>.
		</p>
	{/if}
</main>
