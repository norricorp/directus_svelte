<script>
  import { useParams } from "svelte-navigator";
  import { getContext } from 'svelte';
  import { authToken, userId, emailName, authenticated, fullName, refreshToken } from '../stores'
  import { directus } from "../services/directus";

  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let open = false;
  export let showBackdrop = true;
  export let onClosed;
  
  const modalClose = (data) => {
		open = false;
		if (onClosed) {
			onClosed(data);
		}
	}

	let old_password = ""
	let new_password = ""
//	let stored_pw = ""
//	let userResponse;


	const change_pw = async () => {
/* 		await directus.users.me.read({
			fields: ['password'],
		}).then((data) => {
			console.log(data.password)
			stored_pw = data.password
		})

		await directus.utils.hash.verify(old_password, "$" + stored_pw)
		.then((data) => {
			if (data == true)  {
				console.log("the old password is correct")
			}
		})
		.catch((error) => {
				window.alert('Invalid credentials ' + error);
			}); */

			// can we get the settings for password policy?
			// based on value authenticate new password
			
			await directus.auth.login({ email: $emailName, password: old_password })
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
				await directus.users.me.update({ password: new_password })
					.then(() => {
						new_password = ""
						old_password = ""
						window.alert('Password successfully changed ');
					})
					.catch((error) => {
						window.alert('change password ' + error);
						old_password = "";
						new_password = "";
					});
			}



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
          <h5 class="modal-title" id="sampleModalLabel">Change Password </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={() => modalClose('close')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
		<form on:submit|preventDefault="{change_pw}"> 
		  <div class="modal-body">
 			<div class="mb-3">
				<label class="form-label" for="inputPassword">Old Password</label>
				<input type="password" class="form-control" data-cy="oldlogin_password" name="old_passwd" bind:value="{old_password}" >
		    </div>  
			<div class="mb-3">
				<label class="form-label" for="inputPassword">New Password</label>
				<input type="password" class="form-control" data-cy="newlogin_password" name="new_passwd" bind:value="{new_password}" >
		    </div>        
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => modalClose('close')}>Cancel</button>
			<button type="submit" class="btn btn-primary" on:click={() => modalClose('save')} disabled={old_password == "" || new_password =="" }>Change</button>
			
		  </div>
	  </form>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
  {/if}
{/if}

