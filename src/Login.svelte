<script>
	import { user } from "./user"

	let username
	let password

	function login() {
		user.auth(username, password, ({ err }) => err && alert(err))
	}

	function signup() {
		user.create(username, password, ({ err }) => {
			if (err) {
				alert(err)
			} else {
				login()
			}
		})
	}
</script>

<input
	class="loginInput"
	placeholder="Username"
	name="username"
	bind:value={username}
	minlength="3"
	maxlength="16"
/>
<input
	class="loginInput"
	placeholder="Password"
	name="password"
	bind:value={password}
	type="password"
/>

<button class="loginButton" on:click={login}>Log in</button>
<button class="loginButton" on:click={signup}>Sign up</button>
