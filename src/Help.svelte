<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"
</script>

<div class="scrollable" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<div class="agreement">
		<br />
		<h4>How to create a message group</h4>
		<p>From the homepage, enter your desired group name into the group name box. Then enter your desired username into the username box. Once completed, click the join button below and your group should be created.</p>
		<h4>How to create a username</h4>
		<p>From the homepage, enter your desired username into the username box. Before clicking the join button, make sure you've entered your/the group name.</p>
		<h4>How to join a message group</h4>
		<p>From the homepage, enter the group name into the group name box. Then enter your desired username into the username box. Once completed, click the join button below and you should join the message group.</p>
		<h4>How to leave/exit a message group</h4>
		<p>To leave a message group click the back/exit icon in the top left corner.</p>
		<h4>How to send messages</h4>
		<p>Once in a message group, enter your chosen message in the message box at the bottom of the page. Once completed, either type the enter key or click the send button to the right of the message box. Please remember to make sure that any messages sent on eChat adhere to our Terms of Service.</p>
		<h4>How to unsend messages</h4>
		<p>Currently, eChat does not support the unsending of messages. If you wish for all messages in any room to be cleared, please contact our support team.</p>
		<h4>How to change username</h4>
		<p>To change your username, exit the message group that you're in. Then enter a different username into the username box and rejoin the message group. Before clicking the join button, make sure you've entered your/the group name.</p>
		<h4>How to join a message group</h4>
		<p>From the homepage, enter the group name into the group name box. Then enter your desired username into the username box. Once completed, click the join button below and you should join the message group.</p>
		<h4>How to leave/exit a message group</h4>
		<p>To leave a message group click the back/exit icon in the top left corner.</p>
		<h4>How to switch message groups</h4>
		<p>Once in a message group, click the back/exit icon in the top left corner. Then enter a different group name into the group name box and join the message group. Before clicking the join button, make sure you've entered your username.</p>
		<h4>How to send messages</h4>
		<p>Once in a message group, enter your chosen message in the message box at the bottom of the page. Once completed, either type the enter key or click the send button to the right of the message box. Please remember to make sure that any messages sent on eChat adhere to our Terms of Service.</p>
		<h4>How to unsend messages</h4>
		<p>Currently eChat does not support the unsending of messages.</p>
		<h4>How to send images</h4>
		<p>Currently eChat does not support the sending of messages containing images. You can alternatively send image sharing links on eChat. Please remember to make sure that any messages sent on eChat adhere to our Terms of Service.</p>
		<h4>How to switch to dark mode</h4>
		<p>From the homepage, click the settings icon in the top right corner. In settings, select the dark mode checkbox and you should see that the theme of eChat changes from white to black. You have now joined the dark side. If you want to switch back then simply unselect the checkbox.</p>
		<h4>How to switch theme colour</h4>
		<p>From the homepage, click the settings icon in the top right corner. In settings, select the theme dropdown. You can choose from “Sea Green”, “Bubble blue” and “Juicy Orange”. Once selected you should see that the theme of eChat changes colour. If you want to switch back then simply select your previous Theme colour.</p>
		<h4>How to change history length</h4>
		<p>From the homepage, click the settings icon in the top right corner. In settings, select and drag the message history length selector. You should see that the length moves up/down.</p>
		<h4>How to read the terms of service</h4>
		<p>From the homepage, click the Terms of Service link at the bottom. You should then be able to read the Terms of Service.</p>
		<h4>How to report a user</h4>
		<p>To report a user please contact our support team with their details.</p>
		<h4>How to contact our support team</h4>
		<p>To contact our support team please email us at <a href="mailto:help.echat@gmail.com">help.echat@gmail.com</a>.</p>
		<br />
	</div>
</div>

<style lang="sass">
	h4
		line-height: 1.5rem
</style>
