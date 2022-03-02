<script>
	import { username, user } from "./user"

	function signout() {
		user.leave()
		username.set("")
	}
</script>

<header>
	<h1>eChat</h1>
	{#if $username}
		<div class="user-bio">
			<!-- <img  class="avatar" src={`https://avatars.dicebear.com/api/identicon/eChat_${$username}.svg?rotate=45`} alt="Your avatar" /> -->
			<span><strong>{$username}</strong></span>
		</div>

		<button class="signout-button" on:click={signout}>Sign Out</button>
	{:else}
		<h3>Gun.js Chat</h3>
	{/if}
</header>
