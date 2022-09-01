<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"
</script>

<div class="scrollable" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<div class="agreement">
		<h4>1.1.3: 1 September 2022</h4>
		<p>- Add changelog page in help page (sup)</p>
		<h4>1.1.2: 1 September 2022</h4>
		<p>- Add new setting in settings menu...</p>
		<h4>1.1.1: 31 August 2022</h4>
		<p>- Number of users online is now shown in header while in a group</p>
		<p>- Max message length increased from 100 to 150 characters</p>
		<h3>1.1.0: 31 August 2022</h3>
		<p>- New groups page! After entering your username, you will now be sent to a page where you can choose a group to join.</p>
		<h4>1.0.2: 30 August 2022</h4>
		<p>- All group names now must be in lowercase</p>
		<h4>1.0.1: 30 August 2022</h4>
		<p>- Add option to hide group name from header</p>
		<h3>1.0.0: 29 August 2022</h3>
		<p>- eChat's full release!!</p>
		<br /><br />
	</div>
</div>

<style lang="sass">
	h4, h3
		text-align: center
		margin: 2rem 0 0 0

	h3
		margin-top: 3rem
		color: var(--main)
	.scrollable
		width: 100%
</style>
