<script>
  import { useParams } from "svelte-navigator";
  import { getContext } from 'svelte';
  import { authToken, userId, emailName, authenticated, fullName } from '../stores'
  import { directus } from "../services/directus";

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

	let userResponse;

//	await directus.auth.password.reset('abc.def.ghi', 'n3w-p455w0rd');
// await directus.auth.password.request('admin@example.com');
// await directus.auth.password.request('admin@example.com', 'http://localhost:3000/resetpw');
/* need to set value in .env file ${import.meta.env.VITE_DIRECTUS_URL}/resetpw
use request to send email.
add route to App to call page that calls modal resetpw
get token and send to reset

     */
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
/* 		if ($authenticated) {
			userResponse = await directus.users.me.read()
			$userId = userResponse.id
			$fullName = userResponse.first_name + " " + userResponse.last_name
			console.log(`first name is ${userResponse.first_name} and surname is ${userResponse.last_name}`)
		} */
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
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => modalClose('close')}>Cancel</button>
			<button type="submit" class="btn btn-primary" on:click={() => modalClose('save')}>Reset</button>
			
		  </div>
	  </form>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
  {/if}
{/if}

