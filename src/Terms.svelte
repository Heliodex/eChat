<script lang="ts">
	import { fly } from "svelte/transition"
	import { transitionLength } from "./settings"
</script>

<div class="scrollable" transition:fly={{ y: 300, duration: 500 * parseFloat($transitionLength) }}>
	<div class="agreement">
		<p>This Terms of Service Agreement (“agreement”) is an agreement made between you, or if you represent a legal entity, that legal entity (“you”) and eChat, the owners of all eChat logos, documents, and domains.</p>
		<p>This agreement is a binding agreement between you and eChat, and shall set forth the terms and conditions under which you can use eChat. For the purposes of this agreement, this shall mean the eChat extension, the eChat website, and any parts or copies of them.</p>
		<p>ANY SERVICES PROVIDED BY ECHAT ARE MADE AVAILABLE “AS IS” WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. ECHAT DOES NOT AND CANNOT GUARANTEE THE RESULTS YOU MAY OBTAIN BY USING ECHAT.</p>
		<p>IN NO EVENT WILL ECHAT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
		<p>eChat hereby grants you a non-transferable, non-exclusive license to use eChat or any of their services, provided that you agree to, comply with, and accept the entirety of the following:</p>

		<ol>
			<li>You enter and participate in chat groups and obtain access to the materials contained at your own risk.</li>
			<li>You are 13 years of age or older, or have obtained parental consent to use eChat.</li>
			<li>You are fully responsible for your own statements and materials that you post to eChat and any consequences. You agree that you will not take any action directed towards attempting to hold us responsible for any such materials or statements.</li>
			<li>Any opinions or views expressed by participants on eChat are their own. We do not endorse, support, or otherwise give any credence or reason for reliance on any such statements or opinions.</li>
			<li>eChat is not required to monitor communications on chat groups, and neither we nor any Administrators are responsible for any material that any participants post, but we may do so at our sole discretion.</li>
			<li>We reserve the right to remove or expel any party from participation and access to eChat for any time or for any reason.</li>
			<li>By accessing eChat, you agree that you will not commit any of the following acts:</li>

			<ol>
				<li>Using eChat for any illegal purpose under applicable law.</li>
				<li>Placing any material in eChat that you do not have a right to upload, link to, post, or otherwise transmit under applicable law.</li>
				<li>Placing any material in eChat that contains a false statement about any person/legal entity, infringes upon the privacy rights of any other person/legal entity, or threatens, harrases, abuses, defames or embarrasses any other person/legal entity without explicit permission from them.</li>
				<li>Placing any obscene, pornographic, sexually explicit or violent materials in eChat.</li>
				<li>Repeatedly placing any unsolicited advertising, marketing materials, or sales/promotional materials in eChat.</li>
				<li>Placing any material in the eChat that is disruptive or defamatory to eChat or other users of the eChat service including Administrators.</li>
			</ol>

			<li>By placing any material in eChat, you hereby grant any viewers of the material a perpetual, non-revocable, royalty-free license to view, download, store, and reproduce such material.</li>
			<li>Any Users or Administrators of eChat reserve the right to stay anonymous and unnamed if they wish to.</li>
			<li>You may use eChat or any of their services only as outlined in this agreement. Any use of eChat or any of their services that is not expressly allowed in this Agreement will automatically terminate your rights to use eChat under this agreement. If your right to use eChat or any of their services is terminated, you shall immediately stop using eChat.</li>
			<li>This agreement contains the entire agreement between the Parties. No variation of any of the terms or conditions of this agreement may be made unless such variation is explicitly agreed in writing and signed by both you and eChat.</li>
		</ol>

		<p>This agreement is governed by and constructed in accordance with the applicable laws of Scotland, England, Northern Ireland, and Wales. The domains https://echatapp.ml/ and https://echat.cf/ are solely governed by and constructed in accordance with the laws of the Central African Republic, Mali, or any entities connected with them, including connected corporations/companies such as SEDO, Société Centrafricaine de Télécommunications (SOCATEL), Point.ml, Dot.cf, or United Internet AG.</p>
		<p>If any term of this agreement is adjudged to be invalid or unenforceable, such term shall in no way affect any other term of this agreement or the application of such term in any other circumstance or the validity or enforceability of this Agreement. The Parties will negotiate in good faith about a term that will replace the invalid or unenforceable term.</p>
		<p>Please check these terms and conditions regularly. We may update them at any time without notice. You must agree to any changes if you continue to use eChat after the terms and conditions have been updated.</p>
		<p>If you believe you know of someone/a group of people who have broken these terms or you want more information, please contact our support team at <a href="mailto:help.echat@gmail.com">help.echat@gmail.com</a>.</p>
		<em>Last updated: 6 May 2022</em>
		<br /><br /><br />
	</div>
</div>

<style lang="sass">
	li
		margin: 0.5rem 0
</style>
