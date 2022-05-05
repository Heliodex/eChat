<script>
	import { user, channelName } from "./user"

	let loginInput = localStorage.getItem("username")
	let groupInput
	let page

	function login() {
		channelName.set(groupInput)
		localStorage.setItem("username", loginInput)
		user.set(loginInput) // if you log back in with the same username, it does not work.
	}

	const splashes = [
		"Now with more EVERYTHING!",
		"What happpened to DocSocial?",
		"Now with extra protein!",
		"They can't ban us.",
		"Remember to read the ToS!",
		"Built with Svelte!",
		"Cybernetically enhanced!",
		"Now in SHOCKING 2-D!",
		"One in a million!",
		"Coming soon!",
		"End-to-end encrypted!",
		"It's anonymous and FREE!",
		"Better than Hangouts!",
		"Serving suggestion",
		"45 GitHub commits!",
		"undefined",
		"Accepts payment via propane!",
		"Happy birthday!",
		"Ratio, touch grass",
		"Even less XSS!",
		"5.72 Gibibytes!",
		"Not stolen from Minecraft!",
	]
</script>

<main>
	{#if page == "terms"}
		<button
			class="close"
			on:click={() => {
				page = null
			}}>X</button
		>
		hEllo wordld!
	{:else if page == "privacy"}
		<button
			class="close"
			on:click={() => {
				page = null
			}}>X</button
		>
		hEllo wordld!
	{:else}
		<img src="echat.svg" class="logo" alt="eChat Logo" width="50%" />

		<p class="splash">{splashes[Math.floor(Math.random() * splashes.length)]}</p>

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

		<p class="terms">
			By using eChat, you agree to the <button
				class="linkStyle"
				on:click={() => {
					page = "terms"
				}}>Terms of Service</button
			>
			and
			<button
				class="linkStyle"
				on:click={() => {
					page = "privacy"
				}}>Privacy Policy.</button
			>
		</p>
	{/if}
</main>
