<script lang="ts">
	import { fly } from "svelte/transition"
	import { darkMode, theme, historyLength, transitionLength, hideChannel, superSecretSetting } from "./settings"

	let darkModeInput = $darkMode
	let themeInput = $theme
	let historyLengthInput = $historyLength
	let transitionLengthInput = $transitionLength
	let hideChannelInput = $hideChannel
	let superSecretSettingInput = false

	$: darkMode.set(darkModeInput)
	$: theme.set(themeInput)
	$: historyLength.set(historyLengthInput)
	$: transitionLength.set(transitionLengthInput)
	$: hideChannel.set(hideChannelInput)
	$: superSecretSetting.set(superSecretSettingInput)
</script>

<div class="scrollable" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<br />
	<div class="agreement">
		<label for="darkMode">Dark mode</label>
		<input bind:checked={darkModeInput} type="checkbox" id="darkMode" />

		<label for="historyLength">Number of messages to load</label>
		<div>
			<input bind:value={historyLengthInput} type="range" min="0" max="100" />
			<input bind:value={historyLengthInput} type="number" min="0" max="100" id="historyLength" />
		</div>

		<label for="transitionLength">Animation speed</label>
		<select bind:value={transitionLengthInput} id="transitionLength">
			<option value="1.5">Slow</option>
			<option value="1">Normal</option>
			<option value="0.5">Fast</option>
			<option value="0">Instant</option>
		</select>

		<label for="themeColour">Theme colour</label>
		<select bind:value={themeInput} id="themeColour">
			<option value="orange">Juicy Orange</option>
			<option value="green">Sea Green</option>
			<option value="blue">Bubble Blue</option>
		</select>

		<label for="hideChannel">Hide group name</label>
		<input bind:checked={hideChannelInput} type="checkbox" id="hideChannel" />

		<br /><br />
		<br /><br /><br /><br />
		<br /><br /><br /><br />

		<label for="hideChannel">Super secret setting</label>
		<input bind:checked={superSecretSettingInput} type="checkbox" id="hideChannel" />
		<br /><br /><br />
	</div>
</div>

<style lang="sass">
	div
		width: 100%

	label
		user-select: none
		cursor: pointer
		display: block
		font-size: 0.7rem
		margin: 1rem 0

	input[type=checkbox]
		width: 1.1rem
		height: 1.1rem

	input[type=range]
		-webkit-appearance: none 
		padding: 0
		&:active
			cursor: grabbing
		&::-webkit-slider-thumb
			cursor: grab
			&:active
				cursor: grabbing

	select, input
		padding: 0.4rem
		transition: opacity calc(0.2s * var(--transitionLength))
		&:hover, &:focus
			transition: opacity calc(0.2s * var(--transitionLength))
			opacity: 0.8

	select, input[type=range], input[type=checkbox]
		cursor: pointer
</style>
