<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"

	// Transition properties
	let sent = {
		x: 100,
		duration: 300 * parseFloat($transitionLength)
	}
	let received = {
		x: -100,
		duration: 300 * parseFloat($transitionLength)
	}
</script>

<div class="main">
	<div transition:fly={received}><p>How do I create a message group?</p></div>
	<p transition:fly={sent}>From the homepage, enter a group name into the group name box. Then enter your desired username into the username box.</p>
	<p transition:fly={sent}>Once completed, click the join button below and your group should be created.</p>

	<div transition:fly={received}><p>How do I make a username?</p></div>
	<p transition:fly={sent}>From the homepage, enter a username into the username box.</p>
	<p transition:fly={sent}>Before clicking the join button, make sure you've entered a group name as well.</p>
	<div transition:fly={received}><p>How do I join a message group?</p></div>

	<p transition:fly={sent}>From the homepage, enter the group name into the group name box. Then enter your desired username into the username box. </p>
	<p transition:fly={sent}>Once completed, click the join button below and you should join the message group.</p>

	<div transition:fly={received}><p>How do I leave a message group?</p></div>
	<p transition:fly={sent}>To leave a message group, click the back button in the top left corner.</p>

	<div transition:fly={received}><p>How do I send messages?</p></div>
	<p transition:fly={sent}>Once in a message group, enter a message in the message box at the bottom of the page, then press enter or click the send button to the right of the message box.</p>
	<p transition:fly={sent}>Please make sure that any messages you send on eChat adhere to our Terms of Service.</p>

	<div transition:fly={received}><p>How do I delete messages?</p></div>
	<p transition:fly={sent}>Currently, eChat does not support the deleting of messages. If you wish for all messages in any room to be cleared, please contact our support team with the group name.</p>

	<div transition:fly={received}><p>How do I change my username?</p></div>
	<p transition:fly={sent}>To change your username, exit the message group that you're in. Then enter a different username into the username box and rejoin the message group. Before clicking the join button, make sure you've entered a group name.</p>

	<div transition:fly={received}><p>What does the checkmark icon beside someone's username mean?</p></div>
	<p transition:fly={sent}>The checkmark icon beside a username means that the user is one of the admins, owners, or developers of eChat.</p>
	<p transition:fly={sent}>If you see one, why not give them a suggestion about how to improve eChat?</p>

	<div transition:fly={received}><p>How do I send images?</p></div>
	<p transition:fly={sent}>Currently eChat does not support the sending of messages containing images. Alternatively, you can send image sharing links on eChat.</p>
	<p transition:fly={sent}>Please remember to make sure that any images sent on eChat adhere to our Terms of Service.</p>

	<div transition:fly={received}><p>How do I switch to dark mode?</p></div>
	<p transition:fly={sent}>From the homepage, click the settings icon in the top right corner. In settings, select the dark mode checkbox, and eChat's light colours will become dark.</p> 
	<p transition:fly={sent}>You have now joined the dark side. Muahahahaha!</p>

	<div transition:fly={received}><p>How do I change theme colour?</p></div>
	<p transition:fly={sent}>From the homepage, click the settings icon in the top right corner. In settings, select the theme dropdown.</p>
	<p transition:fly={sent}>Once you have selected theme, you should see that the accent colour across eChat changes.</p>

	<div transition:fly={received}><p>How do I change history length?</p></div>
	<p transition:fly={sent}>From the homepage, click the settings icon in the top right corner. In settings, select and drag the message history length selector.</p>
	<p transition:fly={sent}>This does not change history length for other users, only the number of messages loaded for you.</p>

	<div transition:fly={received}><p>Why am I getting an error saying "We can't connect to the eChat message servers"?</p></div>
	<p transition:fly={sent}>This is likely due to a server error. Please notify an eChat admin about the situation if you see this message.</p>

	<div transition:fly={received}><p>How do I read the terms of service?</p></div>
	<p transition:fly={sent}>From the homepage, click the Terms of Service link at the bottom. You should then be able to read the Terms of Service.</p>


	<div transition:fly={received}><p>How do I report a user?</p></div>
	<p transition:fly={sent}>To report a user, please contact our support team with their details such as their username and message groups they were active in.</p>

	<div transition:fly={received}><p>How do I contact eChat's support team?</p></div>
	<p transition:fly={sent}>To contact our support team, please email us at <a href="mailto:help.echat@gmail.com">help.echat@gmail.com</a>.</p>
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
