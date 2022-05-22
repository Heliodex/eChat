<script lang="ts">
	import { darkMode, theme, historyLength } from "./settings"

	let darkModeInput = $darkMode
	let themeInput = $theme
	let historyLengthInput = $historyLength

	$: darkMode.set(darkModeInput)
	$: theme.set(themeInput)
	$: historyLength.set(historyLengthInput)
</script>

<div class="scrollable">
	<br />
	<div class="agreement settingsPage">
		<div>Dark mode</div>
		<input bind:checked={darkModeInput} type="checkbox" />

		<div>Message history length</div>
		<label>
			<input class="settingsInput" bind:value={historyLengthInput} type="range" min="0" max="100" />
			<div class="settingsLabel">{historyLengthInput}</div>
		</label>

		<div>Theme</div>
		<select bind:value={themeInput}>
			<option value="green">Sea green</option>
			<option value="blue">Bubble blue</option>
			<option value="orange">Juicy orange</option>
		</select>
	</div>
</div>
<br /><br /><br />
