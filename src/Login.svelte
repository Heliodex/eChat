<script lang="ts">
	import { theme } from "./settings"
	import { fade } from "svelte/transition"
	import Terms from "./Terms.svelte"
	import Settings from "./Settings.svelte"
	import { loginInfo } from "./user"
	import splashes from "./splashes.json"

	let page: string
	let loginInput = $loginInfo
	let src: string
	let canLogin = true
	// Without this, it would subscribe-unsubscribe-resubscribe rather than just subbing once,
	// or subscribing more than once, resulting in message duplication
	// So login() must be being called more than once by the form. idk y

	function login(): void {
		if (canLogin) {
			canLogin = false // Still lets you logout then log back in, though
			loginInfo.set(loginInput) // If you log back in with the same username, history does not load. (ably)
			localStorage.setItem("username", String($loginInfo["username"]))
		}
	}

	$: src = $theme + ".svg"
</script>

<main transition:fade>
	{#if page}
		<header>
			<img
				class="headerButton logout darkInvert"
				src="Backfill.svg"
				alt="Logout button"
				on:mousedown={() => {
					page = ""
				}}
			/>
			<h2>{page}</h2>
		</header>
	{/if}
	{#if page == "Terms of Service"}
		<Terms />
	{:else if page == "Settings"}
		<Settings />
	{:else}
		<button
			class="settingsLogin"
			on:mousedown={() => {
				page = "Settings"
			}}
		>
			<img class="fillIconSmall darkInvert" src="Settings.svg" alt="Settings button" />
		</button>

		<img {src} class="logo" alt="eChat Logo" width="50%" />

		<p class="splash">{@html splashes[Math.floor(Math.random() * splashes.length)]}</p>

		<form on:submit|preventDefault={login}>
			<div class="loginIcon">
				<img class="darkInvert" src="Group.svg" alt="Group icon" />
			</div>
			<input class="loginInput" placeholder="Group name" name="group" bind:value={loginInput["groupname"]} minlength="3" maxlength="16" />

			<div class="loginIcon">
				<img class="darkInvert" src="Account.svg" alt="Account icon" />
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
					page = "Terms of Service"
				}}>Terms of Service</button
			>.
		</p>
	{/if}
	<br /><br /><br /><br /><br /> 
</main>
