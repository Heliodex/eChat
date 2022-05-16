<script lang="ts">
	import { theme, darkMode } from "./settings"

	let themeInput = localStorage.getItem("theme")
	let darkModeInput = localStorage.getItem("darkMode")
	let historyLengthInput = 100

	$: themeInput && theme.set(themeInput)
	$: darkModeInput && darkMode.set(darkModeInput)
</script>

<div class="scrollable">
	<br />
	<div class="agreement settingsPage">
		<div>Dark mode</div>
		<input bind:value={darkModeInput} type="checkbox" />

		<div>Message history length</div>
		<label>
			<input class="settingsInput" bind:value={historyLengthInput} type="range" min="0" max="100" />
			<div class="settingsLabel">{historyLengthInput}</div>
		</label>

		<div>Theme</div>
		<select bind:value={themeInput}>
			<option value="green">Sea green</option>
			<option value="blue">Bubble blue</option>
			<option value="orange">Orange orange</option>
		</select>
	</div>
</div>
