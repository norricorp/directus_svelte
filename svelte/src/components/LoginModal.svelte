<script>
  import { getContext } from 'svelte';
  import { authToken, userId, emailName, authenticated, fullName, refreshToken, directusAuth } from '../stores'
  import { getDirectusInstance } from "../services/directus";
  import { readMe, passwordRequest } from '@directus/sdk';

  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let open = false;
  export let showBackdrop = true;
  export let onClosed;
  
	const modalClose = (data) => {
		open = false;
		if (data == "close") {
			email = ""
			password = ""
		}
		if (onClosed) {
			onClosed(data);
		}
	}

//	let value;
	let password = ""
	let email = ""

	let userResponse;

	const directus = getDirectusInstance();
	$directusAuth = directus;
	console.log("Login: directus returned is " + JSON.stringify(directus));
	console.log("Login: and drill in " + directus.url);
   
	async function setResetPassword() {
		console.log("entered reset password." );
		console.log("sending email to " + import.meta.env.VITE_SVELTE_URL )
		if (email == "") {
			window.alert("Please enter an email address");
		}
		else {
			await directus.request(passwordRequest(email, import.meta.env.VITE_SVELTE_URL + "/resetpw"));
			window.alert('Email to reset your password sent to ' + email);
			modalClose('close');
		}
	}

	const handleLogin = async () => {
		// mode required to get refreshToken returned despite docs
		await directus.login(email, password, {	mode: 'json'})
			.then((data) => {
				console.log("object returned from login is " + JSON.stringify(data))
				$authenticated = true;
				$emailName = email
//				$authToken = directus.auth.token
				$authToken = data.access_token
				$refreshToken = data.refresh_token
	
				email = ""
				password = ""
				console.log("assigned directus with: " + $directusAuth);
			})
			.catch((error) => {
				window.alert('Invalid credentials ' + error);
				password = "";
				$authenticated=false;
				email = "";
			});
		if ($authenticated) {
			userResponse = await directus.request(readMe());
	//		$userId = userResponse.id
			$fullName = userResponse.first_name + " " + userResponse.last_name
			console.log(`first name is ${userResponse.first_name} and surname is ${userResponse.last_name}`)
			modalClose('close');
		}
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
    <div class="modal-dialog" role="document" in:fly|global={{ y: -50, duration: 300 }} out:fly|global={{ y: -50, duration: 300, easing: quintOut }}>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">Login / Forgot Password</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={() => modalClose('close')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
		<form on:submit|preventDefault="{handleLogin}"> 
		  <div class="modal-body">
			<div class="mb-3">
				<label class="form-label" for="username">Email</label>
				<input type="email" class="form-control" name="username" data-cy="login_username" placeholder="Email" bind:value="{email}" >
		    </div>
			<div class="mb-3">
				<label class="form-label" for="inputPassword">Password</label>
				<input type="password" class="form-control" data-cy="login_password" name="passwd" bind:value="{password}" placeholder="Password">
		    </div>        
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => modalClose('close')}>Cancel</button>
			<!-- <button type="submit" class="btn btn-primary" on:click={() => modalClose('save')}  disabled={password == "" || email =="" }>Sign in</button> -->
			<button type="submit" class="btn btn-primary" disabled={password == "" || email =="" }>Sign in</button>
		  </div>
	  </form>
	  <a href="/#" data-cy="resetpwlink" on:click|preventDefault={()=>setResetPassword()}>
		Forgot Password
	  </a>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade|global={{ duration: 150 }} />
  {/if}
{/if}

