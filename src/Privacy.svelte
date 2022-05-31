<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"
</script>

<div class="scrollable" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<p class="agreement">
		<br />
		<em>Last updated 1 June 2022</em><br />
		<br />
		<strong>Information collection and use</strong><br />
		For a better experience while using eChat, we use cookies to store your settings choices. These include your dark mode, message history length and theme colour choices.<br />
		These choices are stored on your device and are never sent to eChat's servers.<br />
		<br />
		No personally identifying information such as location, device information, network information, or email addresses are collected by eChat.<br />
		<br />
		Messages are stored temporarily on our servers, for a maximum period of 100 hours. Messages are only visible to other participants in the message group. Usernames are only stored alongside messages, and are not stored individually. <br />
		Users of eChat are still allowed to screenshot, save, and copy any data that you send, but only in the ways outlined in the Terms of Service.<br />
		<br />
		<strong>Security</strong><br />
		Messages are encrypted before sending, and are only decrypted after being received by a user in a message group. All messages are sent only to our server and to the users in your message group.<br />
		<br />
		<strong>Children under the age of 13</strong><br />
		We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under the age of 13 has provided us with personal information without obtaining parental consent, we will delete this from our servers as soon as possible. <br />
		If you are a parent or guardian and you are aware that your child has provided us with personal information without obtaining parental consent, please contact us so that we will be able to complete the necessary actions.<br />
		<br />
		<strong>Third parties</strong><br />
		We do not allow any third party to collect personal information from our users. We do not work with any third parties and we do not sell our users' data to any third parties.<br />
		<br />
		<strong>GDPR</strong><br />
		Under GDPR Laws, you remain in control of your data. If for any reason you would like to retrieve or request deletion of your personal data, please contact our support team at <a href="mailto:help.echat@gmail.com">help.echat@gmail.com</a>.<br />
		<br />
		<br />
		Please check this privacy policy regularly. We may update it at any time without notice. You must agree to any changes if you continue to use eChat after the privacy policy has been updated.<br />
		<br />
		If you have any questions, suggestions, or if you want more information, please contact our support team at <a href="mailto:help.echat@gmail.com">help.echat@gmail.com</a>.<br />
		<br />
	</p>
</div>
