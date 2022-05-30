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
		<div class="label">
			<p>Dark mode</p>
			<input bind:checked={darkModeInput} type="checkbox" />
		</div>

		<div class="label">
			<p>Message history length</p>
			<div>
				<input bind:value={historyLengthInput} class="rangeInput" type="range" min="0" max="100" />
				<input bind:value={historyLengthInput} type="number" min="0" max="100" />
			</div>
		</div>

		<div class="label">
			<p>Theme</p>
			<select bind:value={themeInput}>
				<option value="green">Sea Green</option>
				<option value="blue">Bubble Blue</option>
				<option value="orange">Juicy Orange</option>
			</select>
		</div>
	</div>
</div>

<style lang="sass">
	.rangeInput
		padding: 0

	select, input
		padding: 0.4rem
	
	.label p
		font-size: 0.7rem
</style>
