<script>
	import { authToken, userId, emailName, authenticated, fullName, refreshToken } from '../stores'
	import { getDirectusInstance } from "../services/directus";
	import { authentication, rest, login, readMe, passwordRequest, updateMe } from '@directus/sdk';
	import { validatePW, getSetting} from "../utils/validate-pw";
  
	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
  
	export let open = false;
	export let showBackdrop = true;
	export let onClosed;
	
	const modalClose = (data) => {
			  open = false;
			  if (data == "close") {
				old_password = "";
				new_password = "";
			  }		  
			  if (onClosed) {
				  onClosed(data); 
			  }
	  }
  
	  let old_password = ""
	  let new_password = ""
  
	  let pw_pattern = null;
	  
	  let pw_strength_message = "";
	  let pw_strength_ok = false;

	  const directus = getDirectusInstance();
  
	  $: {
		  console.log("changePW reactivity: and now pw_pattern is " + pw_pattern)
		  if (pw_pattern != null) {
			  let {messageStr, resultBool} = validatePW(pw_pattern, new_password)
			  console.log("message is: " + messageStr);
			  console.log("password strength is " + resultBool);		
			  pw_strength_message = messageStr;
			  pw_strength_ok = resultBool;
		  }
	  }
  
	  const change_pw = async () => {
			  await directus.login($emailName, old_password)
			  .then((data) => {
				  $authenticated = true;
				  $authToken = data.access_token
				  $refreshToken = data.refresh_token
				  old_password = ""
				  console.log("change pw auth OK - auth token is " + $authToken)
			  })
			  .catch((error) => {
				  window.alert('Invalid credentials ' + error);
				  old_password = "";
				  new_password = "";
  //				$authenticated=false;
			  });
  
			  if ($authenticated) {
  
				  await directus.request(updateMe({ password: new_password }))
					  .then(() => {
						  new_password = ""
						  old_password = ""
						  window.alert('Password successfully changed ');
						  modalClose('save')
					  })
					  .catch((error) => {
						  window.alert('change password ' + error);
						  old_password = "";
						  new_password = "";
					  });
			  }
	 }
  
	 
	  async function pw_validate() {
		console.log("ChangePW: into pw_validate ")
		pw_pattern = await getSetting();
		console.log("ChangePW: getSetting returned " + pw_pattern)
		if (pw_pattern == "error") {
			
			modalClose('close');
		} 

	  };
  
  
  </script>
  
  <style>
	.modal {
	  display: block;
	}
  </style>
  
  
  <!-- Modal -->
  {#if open}
	{pw_validate()}
	<div class="modal" id="sampleModal" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false}>
	  <div class="modal-dialog" role="document" in:fly|global={{ y: -50, duration: 300 }} out:fly|global={{ y: -50, duration: 300, easing: quintOut }}>
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="sampleModalLabel">Change Password </h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={() => modalClose('close')}>
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <form on:submit|preventDefault="{change_pw}"> 
			<div class="modal-body">
			   <div class="mb-3">
				  <label class="form-label" for="inputPassword">Current Password</label>
				  <input type="password" class="form-control" required data-cy="oldlogin_password" name="old_passwd" bind:value="{old_password}" >
			  </div>  
			  <div class="mb-3">
				  <label class="form-label" for="inputPassword">New Password</label>
				  <input type="password" 
						  class="form-control" 
						  data-cy="newlogin_password" 
						  required
						  name="new_passwd" bind:value="{new_password}" >
			  </div>
			  <div style="color:blue">{pw_strength_message}</div>        
			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => modalClose('close')}>Cancel</button>
			  <!-- <button type="submit" class="btn btn-primary" on:click={() => modalClose('save')} disabled={old_password == "" || new_password =="" }>Change</button> -->
			  <button type="submit" class="btn btn-primary" id="submitButton" disabled={old_password == "" || pw_strength_ok == false}>Change</button>
			</div>
		</form>
		</div>
	  </div>
	</div>
	{#if showBackdrop}
	  <div class="modal-backdrop show" transition:fade|global={{ duration: 150 }} />
	{/if}
  {/if}
  
  