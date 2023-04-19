<script>
  import { useParams } from "svelte-navigator";
  import { getContext } from 'svelte';
  import { authToken, userId, emailName, authenticated, fullName } from '../stores'
  import { directus } from "../services/directus";
  import { validatePW, getSetting} from "../utils/validate-pw";

  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let open = false;
  export let showBackdrop = true;
  export let onClosed;
  export let token;
  
  const modalClose = (data) => {
		open = false;
		if (onClosed) {
			onClosed(data);
		}
	}

//	let value;
	let old_password = ""
	let new_password = ""

	let pw_pattern = null;
	
	let pw_strength_message = "";
	let pw_strength_ok = false;

	$: {
		console.log("ResetPW reactivity: and now pw_pattern is " + pw_pattern)
		if (pw_pattern != null) {
			let {messageStr, resultBool} = validatePW(pw_pattern, new_password)
			console.log("message is: " + messageStr);
			console.log("password strength is " + resultBool);		
			pw_strength_message = messageStr;
			pw_strength_ok = resultBool;
		}
	}

	async function pw_validate() {
		console.log("into pw_validate ")
		pw_pattern = await getSetting();
		console.log("getSetting returned " + pw_pattern)
 		if (pw_pattern == "error") {
			
			modalClose('close');
		} 

	};
	


	console.log("ResetPWModal: token value is " + token);

	const reset_pw = async () => {
		await directus.auth.password
			.reset( token, new_password )
			.then(() => {
				$authenticated = true;
				new_password = ""
				old_password = ""
				console.log("auth token is " + $authToken)
				window.alert('Password successfully changed ');
			})
			.catch((error) => {
				console.log("Failure url is " + $authToken)
				window.alert('Invalid credentials ' + error);
				console.log("Failure auth token is " + import.meta.env.VITE_DIRECTUS_URL + "/resetpw")
				old_password = "";
				new_password = "";
			});

			
		console.log("after directus call, authenticated is " + $authenticated)
  }

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
    <div class="modal-dialog" role="document" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">Reset Password {token}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={() => modalClose('close')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
		<form on:submit|preventDefault="{reset_pw}"> 
		  <div class="modal-body">
<!-- 			<div class="mb-3">
				<label class="form-label" for="inputPassword">Old Password</label>
				<input type="password" class="form-control" data-cy="oldlogin_password" name="old_passwd" bind:value="{old_password}" >
		    </div>  -->
			<div class="mb-3">
				<label class="form-label" for="inputPassword">New Password</label>
				<input type="password" class="form-control" data-cy="newlogin_password" name="new_passwd" bind:value="{new_password}" >
		    </div>    
			<div style="color:blue">{pw_strength_message}</div>        
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => modalClose('close')}>Cancel</button>
			<button type="submit" class="btn btn-primary" on:click={() => modalClose('save')} disabled={new_password =="" }>Reset</button>
		  </div>
	  </form>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
  {/if}
{/if}

