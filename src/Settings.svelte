<script>
	let darkMode = false
	let historyLength = 100
	let theme = "green"
</script>

<div class="scrollable">
	<h3>Settings</h3>
	<div class="agreement settingsPage">
		<div>Dark mode</div>
		<input bind:value={darkMode} type="checkbox" />

		<div>Message history length</div>
		<label>
			<input class="settingsInput" bind:value={historyLength} type="range" min="0" max="100" />
			<div class="settingsLabel">{historyLength}</div>
		</label>

		<div>Theme</div>
		<select bind:value={theme}>
			<option value="green">Sea green</option>
			<option value="blue">Bubble blue</option>
			<option value="orange">Orange orange</option>
		</select>
	</div>
</div>
