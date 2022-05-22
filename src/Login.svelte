<script lang="ts">
	import { loginInfo } from "./user"
	import { theme } from "./settings"
	import { fade } from "svelte/transition"
	import Terms from "./Terms.svelte"
	import Settings from "./Settings.svelte"
	import Help from "./Help.svelte"
	import splashes from "./splashes.json"

	let page: string
	let loginInput = $loginInfo
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
</script>

<main transition:fade>
	{#if page}
		<header>
			<img
				class="headerButton logout"
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
	{:else if page == "Help"}
		<Help />
	{:else}
		<button
			class="settingsLogin loginButton"
			on:mousedown={() => {
				page = "Settings"
			}}
		>
			<img class="fillIconSmall" src="Settings.svg" alt="Settings button" />
		</button>

		<button
			class="helpLogin loginButton"
			on:mousedown={() => {
				page = "Help"
			}}
		>
			<img class="fillIconSmall1" src="Help.svg" alt="Help button" />
		</button>

		<img src={$theme + ".svg"} class="logo" alt="eChat Logo" width="50%" />

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
			<br><br>
			<br>
			By using eChat, you agree to the
			<button
				class="linkStyle"
				on:mousedown={() => {
					page = "Terms of Service"
				}}>Terms of Service</button
			><br /><br />
			<!--
			<i>eChat v1.0.0<br />
			Released 25 May 2022</i>

			-->
		</p>
	{/if}
	<br /><br />
</main>
