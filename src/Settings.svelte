<script lang="ts">
	import { fly } from "svelte/transition"
	import { darkMode, theme, historyLength, transitionLength } from "./settings"

	let darkModeInput = $darkMode
	let themeInput = $theme
	let historyLengthInput = $historyLength
	let transitionLengthInput = $transitionLength

	$: darkMode.set(darkModeInput)
	$: theme.set(themeInput)
	$: historyLength.set(historyLengthInput)
	$: transitionLength.set(transitionLengthInput)
</script>

<div class="scrollable" transition:fly={{y: 300, duration: 500 * parseFloat($transitionLength)}}>
	<br />
	<div class="agreement">
		<p>Dark mode</p>
		<input bind:checked={darkModeInput} type="checkbox" />

		<p>Message history length</p>
		<div>
			<input bind:value={historyLengthInput} class="rangeInput" type="range" min="0" max="100" />
			<input bind:value={historyLengthInput} type="number" min="0" max="100" />
		</div>

		<p>Animation and transition length multiplier</p>
		<div>
			<input bind:value={transitionLengthInput} class="rangeInput" type="range" min="0" max="2.5" step="0.1" />
			<input bind:value={transitionLengthInput} type="number" min="0" max="2.5" step="0.1" />
		</div>


		<p>Theme</p>
		<select bind:value={themeInput}>
			<option value="green">Sea Green</option>
			<option value="blue">Bubble Blue</option>
			<option value="orange">Juicy Orange</option>
		</select>
	</div>
</div>

<style lang="sass">
	div
		width: 100%
	.rangeInput
		padding: 0

	select, input
		padding: 0.4rem
	
	p
		font-size: 0.7rem
</style>
