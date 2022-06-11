<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"

	// Transition properties
</script>

<div class="main" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<div><p>How do I create a message group?</p></div>
	<p>From the login page, enter a group name into the group name box. Then enter your desired username into the username box.</p>
	<p>Once completed, click the join button below and your group should be created.</p>

	<div><p>How do I make a username?</p></div>
	<p>From the login page, enter a username into the username box.</p>
	<p>Before clicking the join button, make sure you've entered a group name as well.</p>
	<div><p>How do I join a message group?</p></div>

	<p>From the login page, enter the group name into the group name box. Then enter your desired username into the username box.</p>
	<p>Once completed, click the join button below and you should join the message group.</p>

	<div><p>How do I leave a message group?</p></div>
	<p>To leave a message group, click the back button in the top left corner.</p>

	<div><p>How do I send messages?</p></div>
	<p>Once in a message group, enter a message in the message box at the bottom of the page, then press enter or click the send button to the right of the message box.</p>
	<p>Please make sure that any messages you send on eChat adhere to our Terms of Service.</p>

	<div><p>How do I delete messages?</p></div>
	<p>Currently, eChat does not support the deleting of messages. If you wish for all messages in any room to be cleared, please contact our support team with the group name.</p>

	<div><p>How do I change my username?</p></div>
	<p>To change your username, exit the message group that you're in. Then enter a different username into the username box and rejoin the message group. Before clicking the join button, make sure you've entered a group name.</p>

	<div><p>What does the checkmark icon beside someone's username mean?</p></div>
	<p>The checkmark icon beside a username means that the user is one of the admins, owners, or developers of eChat.</p>
	<p>If you see one, why not give them a suggestion about how to improve eChat?</p>

	<div><p>How do I send images?</p></div>
	<p>Currently eChat does not support the sending of messages containing images. Alternatively, you can send image sharing links on eChat.</p>
	<p>Please remember to make sure that any images sent on eChat adhere to our Terms of Service.</p>

	<div><p>How do I add text formatting to a message?</p></div>
	<p>You can add *asterisks* around your message to make it appear <strong>bold</strong>, and ^carets^ to make it appear in <em>italics</em>.</p>
	<p>_Underscores_ can also be added to make text appear <ins>underlined</ins>, and ~tildes~ to add a <del>strikethrough</del> effect.</p>

	<div><p>How do I switch to dark mode?</p></div>
	<p>From the login page or from in a chat group, click the settings icon in the top right corner. In settings, click the dark mode checkbox, and eChat's light colours will become dark.</p>
	<p>You have now joined the dark side. Muahahahaha!</p>

	<div><p>How do I change theme colour?</p></div>
	<p>From the login page or from in a chat group, click the settings icon in the top right corner. In settings, click the theme dropdown.</p>
	<p>Once you have selected theme, you should see that the accent colour across eChat changes.</p>

	<div><p>How do I change history length?</p></div>
	<p>From the login page, or from in a chat group, click the settings icon in the top right corner. In settings, click and drag the message history length selector.</p>
	<p>This does not change history length for other users, only the number of messages loaded for you.</p>

	<div><p>Why am I getting an error saying "We can't connect to the eChat message servers"?</p></div>
	<p>This is likely due to a server error. Please notify an eChat admin or our support team about the situation if you see this message.</p>

	<div><p>How do I read the terms of service?</p></div>
	<p>From the login page, click the Terms of Service link at the bottom. You should then be able to read the Terms of Service.</p>

	<div><p>How do I read the privacy policy?</p></div>
	<p>From the login page, click the Privacy Policy link at the bottom. You should then be able to read the Privacy Policy.</p>

	<div><p>How do I report a user?</p></div>
	<p>To report a user, please contact our support team with their details such as their username and message groups they were active in.</p>

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
			margin: 0.2rem 0
			p
				background: var(--t3)
				text-align: right

		p
			background: var(--main)
			text-align: left

	div p, p
			color: white
			max-width: 260px
			margin: 0.25rem 0.5rem 0 0.5rem

			line-height: 1rem
			font-size: 0.9rem

			padding: 10px 15px 5px 15px
			border-radius: 20px
			word-wrap: break-word

	a
		color: white
		transition: opacity calc(0.2s * var(--transitionLength))
		&:hover
			transition: opacity calc(0.2s * var(--transitionLength))
			opacity: 0.8
</style>
