<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"
</script>

<div class="main" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<div><p>How do I create a message group?</p></div>
	<p>From the homepage, enter a group name into the group name box. Then enter your desired username into the username box. Once completed, click the join button below and your group should be created.</p>

	<div><p>How do I join a message group?</p></div>
	<p>From the homepage, enter the group name into the group name box. Then enter your desired username into the username box. Once completed, click the join button below and you should join the message group.</p>

	<div><p>How do I make a username?</p></div>
	<p>From the homepage, enter a username into the username box. Before clicking the join button, make sure you've entered a group name as well.</p>

	<div><p>How do I leave a message group?</p></div>
	<p>To leave a message group, click the back button in the top left corner.</p>

	<div><p>How do I send messages?</p></div>
	<p>Once in a message group, enter your chosen message in the message box at the bottom of the page. Once completed, either press enter or click the send button to the right of the message box. Please remember to make sure that any messages sent on eChat adhere to our Terms of Service.</p>

	<div><p>How do I delete messages?</p></div>
	<p>Currently, eChat does not support the deleting of messages. If you wish for all messages in any room to be cleared, please contact our support team with the group name.</p>

	<div><p>How do I change my username?</p></div>
	<p>To change your username, exit the message group that you're in. Then enter a different username into the username box and rejoin the message group. Before clicking the join button, make sure you've entered a group name.</p>

	<div><p>How do I send images?</p></div>
	<p>Currently eChat does not support the sending of messages containing images. Alternatively, you can send image sharing links on eChat. Please remember to make sure that any images sent on eChat adhere to our Terms of Service.</p>

	<div><p>How do I switch to dark mode?</p></div>
	<p>From the homepage, click the settings icon in the top right corner. In settings, select the dark mode checkbox, and eChat's light colours will become dark. You have now joined the dark side.</p>

	<div><p>How do I change theme colour?</p></div>
	<p>From the homepage, click the settings icon in the top right corner. In settings, select the theme dropdown. Once you have selected theme, you should see that the accent colour across eChat changes.</p>

	<div><p>How do I change history length?</p></div>
	<p>From the homepage, click the settings icon in the top right corner. In settings, select and drag the message history length selector. This does not change history length for other users, only the number of messages loaded for you.</p>

	<div><p>How do I read the terms of service?</p></div>
	<p>From the homepage, click the Terms of Service link at the bottom. You should then be able to read the Terms of Service.</p>

	<div><p>How do I report a user?</p></div>
	<p>To report a user, please contact our support team with their details.</p>

	<div><p>How do I contact eChat's support team?</p></div>
	<p>To contact our support team, please email us at <a href="mailto:help.echat@gmail.com">help.echat@gmail.com</a>.</p>
	<br />
</div>

<style lang="sass">
	.main
		position: absolute
		display: flex
		top: 10vh
		height: 90vh
		width: 100vw
		overflow-x: hidden
		overflow-y: enabled
		flex-direction: column
		div
			display: flex
			flex-direction: row-reverse
			p
				background: var(--t3)

		p
			background: var(--main)
			text-align: left

	div p, p
			color: white
			max-width: 260px
			margin: 4px 0.5rem 0 0.5rem

			line-height: 1rem
			font-size: 0.9rem

			padding: 10px 15px 5px 15px
			border-radius: 20px
			word-wrap: break-word

	a
		color: white
		transition: color 0.2s
		&:hover
			transition: color 0.2s
			color: #ddd
</style>
