<script>
	import { user } from "./user"

	function logout() {
		user.set("")
	}
</script>

<header>
	<h1>eChat</h1>

	<button class="inverted" on:click={logout}>logout</button>
</header>
