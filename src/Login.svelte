<script lang="ts">
	import { fade, fly } from "svelte/transition"
	import { loginInfo } from "./user"
	import { theme, transitionLength } from "./settings"
	import Terms from "./Terms.svelte"
	import Privacy from "./Privacy.svelte"
	import Settings from "./Settings.svelte"
	import Help from "./Help.svelte"
	import Groups from "./Groups.svelte"
	import splashes from "./splashes.json"

	let page: string
	let splashText: string
	let loginInput = $loginInfo
	let canLogin = true

	// Without this, it would subscribe-unsubscribe-resubscribe rather than just subbing once,
	// or subscribing more than once, resulting in message duplication
	// So login() must be being called more than once by the form. idk y

	function login(): void {
		if (canLogin) {
			canLogin = false
			if (loginInput.groupname) {
				loginInput.groupname = loginInput.groupname.toLowerCase()
			}
			loginInfo.set(loginInput)
			localStorage.setItem("username", String($loginInfo["username"]))
			localStorage.setItem("groupname", String($loginInfo["groupname"]))
			canLogin = true
		}
	}

	function splash(): void {
		splashText = splashes[Math.floor(Math.random() * splashes.length)]
	}
	splash()
</script>

<main>
	{#if page}
		<header transition:fly={{ y: -64, duration: 500 * parseFloat($transitionLength) }}>
			<img
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
	{:else if page == "Privacy Policy"}
		<Privacy />
	{:else if page == "Settings"}
		<Settings />
	{:else if page == "Help"}
		<Help />
	{:else if page == "Groups"}
		<Groups
			on:joined={event => {
				loginInput.groupname = event.detail
				login()
			}}
		/>
	{:else}
		<main transition:fade|local={{ duration: 500 * parseFloat($transitionLength) }}>
			<button
				id="helpLogin"
				class="loginButton"
				on:mousedown={() => {
					page = "Help"
				}}
			>
				<img src="Infofill.svg" alt="Help button" />
			</button>
			<button
				id="settingsLogin"
				class="loginButton"
				on:mousedown={() => {
					page = "Settings"
				}}
			>
				<img src="Settings.svg" alt="Settings button" />
			</button>

			<img src={$theme + ".svg"} id="logo" alt="eChat Logo" width="50%" />

			<p id="splash" on:mousedown={splash}>
				{@html splashText}
			</p>

			<form on:submit|preventDefault={login}>
				<div class="loginIcon">
					<img src="Account.svg" alt="Account icon" />
				</div>
				<input placeholder="Username" name="username" bind:value={loginInput["username"]} minlength="3" maxlength="16" spellcheck="false" />

				<button
					on:mousedown={() => {
						page = "Groups"
					}}>Join</button
				>
			</form>

			<footer>
				By using eChat, you agree to the
				<button
					class="linkStyle"
					on:mousedown={() => {
						page = "Terms of Service"
					}}>Terms of Service</button
				>
				and
				<button
					class="linkStyle"
					on:mousedown={() => {
						page = "Privacy Policy"
					}}>Privacy Policy</button
				>
				<br />
				<br />
				<br />

				<em>
					Version 1.1.3<br />
					Last updated 1 September 2022<br />
				</em>
			</footer>
		</main>
	{/if}
</main>

<style lang="sass">
	#helpLogin
		left: 0
		
	#settingsLogin
		right: 0
		
	button
		height: 35px

	.loginButton
		position: fixed
		width: 35px
		margin: 8px 10px 
		padding: 10px

		display: grid
		justify-content: center
		align-content: center

	#logo
		user-select: none
		margin-top: 6rem
		margin-bottom: 4.5rem

	#splash
		font-size: 0.6rem
		width: 25%
		position: fixed
		right: 12%
		top: 25%
		transform: rotate(-15deg)
		word-wrap: break-word
		cursor: pointer
		user-select: none

	.loginIcon
		position: fixed
		height: 35px
		border-radius: 9rem
		margin-left: 10%
		margin-top: 0.5rem

	input
		font-size: 1rem
		text-align: center
		width: 80%
		height: 35px
		margin-top: 0.5rem
		box-sizing: border-box

	form button
		padding: 0 15px

	footer
		font-size: 0.7rem
		line-height: 1rem
		margin: 15% 20%

	.linkStyle
		height: auto
		font-size: inherit
		background: none
		padding: 0
		margin: 0
		text-decoration: underline
		&:hover
			background: none
</style>
