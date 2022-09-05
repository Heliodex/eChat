<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"
	import { createEventDispatcher } from "svelte"

	let groupToAdd = ""

	const dispatch = createEventDispatcher()

	let groups = JSON.parse(localStorage.getItem("groups") || '["main"]')

	function addGroup() {
		if (groupToAdd.trim() && !groups.includes(groupToAdd)) {
			groups = [...groups, groupToAdd]
			localStorage.setItem("groups", JSON.stringify(groups))
			groupToAdd = ""
		}
	}
</script>

<main id="groups" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	{#each groups as group}
		<div class="group" transition:fly|local={{ x: 30, duration: 200 * parseFloat($transitionLength) }}>
			<!-- transition is not coherent but good enough -->
			{#if group != "main"}
				<button
					class="add"
					on:mousedown={() => {
						groups = groups.filter(e => { // "PaRAmEteR 'e' implICITLY HaS AN 'anY' TYPe." shut up
							return e != group
						})
						localStorage.setItem("groups", JSON.stringify(groups))
					}}>-</button
				>
			{/if}
			<button
				class="groupbutton"
				on:mousedown={() => {
					dispatch("joined", group)
				}}
			>
				{group}
			</button>
		</div>
	{/each}
	<br /><br /><br /> <br />
</main>

<form on:submit|preventDefault={addGroup} transition:fly={{ y: 40, duration: 500 * parseFloat($transitionLength) }}>
	<input type="text" placeholder="Add a group" maxlength="100" bind:value={groupToAdd} />

	<button on:mousedown={addGroup} class="add">+</button>
</form>

<style lang="sass">
	#groups
		position: fixed
		bottom: 0
		height: 90vh
		width: 100vw
		overflow-x: hidden
		overflow-y: auto
		flex-direction: column
	
	.group
		height: 7vh
		margin: 0.5rem 10px 0 0
		.add
			position: absolute

		.groupbutton
			width: 100% 
			line-height: 7vh
			margin: 0 0 0 5px
			text-align: center
			padding: auto

	form
		height: 8vh
		position: fixed
		bottom: 0
		display: flex

	input
		font-size: 1rem
		height: 35px
		padding: 0 0.7rem
		margin-left: 5px
		width: 315px
		box-sizing: border-box

	.add
		cursor: pointer
		width: 35px
		height: 35px
		display: flex
		justify-content: center
		margin: 0 0 0 5px
		font-size: 2rem
</style>
