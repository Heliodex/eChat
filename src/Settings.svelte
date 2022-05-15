<script lang="ts">
	import { theme } from "./theme"

	let darkMode = false
	let historyLength = 100
	let themeInput = localStorage.getItem("theme")
	$: themeInput && theme.set(themeInput)
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
		<select bind:value={themeInput}>
			<option value="green">Sea green</option>
			<option value="blue">Bubble blue</option>
			<option value="orange">Orange orange</option>
		</select>
	</div>
</div>
