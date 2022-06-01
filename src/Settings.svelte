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

<div class="scrollable" in:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<br />
	<div class="agreement">
		<p>Dark mode</p>
		<input bind:checked={darkModeInput} type="checkbox" />

		<p>Message history length</p>
		<div>
			<input bind:value={historyLengthInput} class="rangeInput" type="range" min="0" max="100" />
			<input bind:value={historyLengthInput} type="number" min="0" max="100" />
		</div>

		<p>Animation speed</p>
		<select bind:value={transitionLengthInput}>
			<option value="1.5">Slow</option>
			<option value="1">Normal</option>
			<option value="0.5">Fast</option>
			<option value="0">Instant</option>
		</select>

		<p>Theme colour</p>
		<select bind:value={themeInput}>
			<option value="orange">Juicy Orange</option>
			<option value="green">Sea Green</option>
			<option value="blue">Bubble Blue</option>
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
