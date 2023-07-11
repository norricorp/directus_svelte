<script>

//  import { authToken, userId, emailName, authenticated, fullName } from '../stores'
  import { directus } from "../services/directus";
  import { validatePW, getSetting} from "../utils/validate-pw";

  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let open = false;
  export let showBackdrop = true;
  export let onClosed;
  
	const modalClose = (data) => {
		open = false;
		console.log("Register: value of modal is " + data);
		if (data == "close") {
			console.log("register: pressed cancel")
			firstname = ""
			surname = ""
			email = ""
			password = ""
		}
		if (onClosed) {
			onClosed(data);
		}
	}

	let adminID = import.meta.env.VITE_DIRECTUS_ADMINID;

	let pw_pattern = null;
	
	let pw_strength_message = "";
	let pw_strength_ok = false;
	

	let firstname = ""
	let surname = ""
	let password = ""
	let email = ""
	let eventStore
	let userResponse;
	let value = '';

	let show_password = false
	$: type = show_password ? 'text' : 'password'
	
	$: {
		console.log("Register reactivity: and now pw_pattern is " + pw_pattern)
		if (pw_pattern != null) {
			let {messageStr, resultBool} = validatePW(pw_pattern, password)
			console.log("message is: " + messageStr);
			console.log("password strength is " + resultBool);		
			pw_strength_message = messageStr;
			pw_strength_ok = resultBool;
		}
	}
		
	function onInput (event) {
		password = event.target.value
		eventStore = event
	}
    
	const directus_users = directus.items('directus_users');
	const directus_notifications = directus.items('directus_notifications');

	const register = async () => {

		await directus_users.createOne({
			first_name: firstname,
			last_name: surname,
			password: password,
			email: email,
			fred: true,
			status: "invited",
		})
		.then(() => {
			console.log("created user " + email);
			window.alert(firstname + " " + surname + " is registered");
			firstname = ""
			surname = ""
			email = ""
			password = ""
			eventStore.target.value = ""	

			let newUser = directus_users.readByQuery({
				filter: {
					email: email,
				},
			});

			console.log("return from read user " + JSON.stringify(newUser));

			// @ts-ignore
			console.log("json object " + newUser.data[0].id);

			directus_notifications.createOne({
				"recipient": adminID,
				"subject": email + " requires approval of Registration",
				"message": "\nHello admin@example.com,\nA new user has registered. He is " + firstname + " " + surname + 
				// @ts-ignore
				"\n\n<a href=\"http://localhost:8055/admin/users/" + newUser.data[0].id + "\">Click here to view.</a>\n",
				"collection": "directus_users",
			})
			.then(() => {
				console.log("Created notification for " + firstname);

			})
			.catch(() => {
				window.alert('Could not create notification');
				console.log("Could NOT created notification for " + firstname);
			});

			modalClose('save');
		})
		.catch(() => {
			window.alert('Could not add user');
		});
    }

	async function pw_validate() {
		console.log("into pw_validate ")
		pw_pattern = await getSetting();
		console.log("Register: getSetting returned " + pw_pattern)
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
          <h5 class="modal-title" id="sampleModalLabel">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={() => modalClose('close')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
		<form on:submit|preventDefault="{register}">
		  <div class="modal-body">
			<div class="mb-3">
				<label class="form-label" for="firstname">First Name</label>	
				<input data-cy="firstname" type="text" class="form-control" name="firstname" bind:value="{firstname}" />		    </div>
			<div class="mb-3">
				<label class="form-label" for="surname">Surname</label>
				<input data-cy="surname" type="text" class="form-control" name="surname" bind:value="{surname}" />
		    </div>  
			<div class="mb-3">
				<label class="form-label" for="username">Email</label>
				<input data-cy="emailaddr" type="email" class="form-control" name="username" bind:value="{email}" />
		    </div>
			<div class="mb-3">
				<label class="form-label" for="password">Password</label>
				<div class="input-group">
					<input class="form-control" data-cy="passwd" name="password" { type } { value } on:input={ onInput } />
				<div class="input-group-append">
					<button class="btn btn-outline-secondary" type="button" on:click="{ () => show_password = !show_password }">{show_password ? 'Hide' : 'Show'}</button>
				</div>
		    </div>
			<div style="color:blue">{pw_strength_message}</div>        
		  </div>
		  
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => modalClose('close')}>Cancel</button>
			<!-- <button type="submit" class="btn btn-primary" on:click={() => modalClose('save')} disabled={password == "" || email =="" || firstname == "" || surname == ""} >Register</button> -->
			<button type="submit" class="btn btn-primary" disabled={pw_strength_ok == false || email =="" || firstname == "" || surname == ""} >Register</button>
		</div>
	  </form>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade|global={{ duration: 150 }} />
  {/if}
{/if}



<!--
change permissions for post to users?

set role to anyone?


For members, should I add a check if authenticated when getting articles
members = false, authenticated = true or false
members = true, authenticated = true

OR

two tables - articles and membersArticles?

Self registration - should there be a members table rather than use directus_users? 

Changed permission for public to use create 

But this also means that rest api can be used and given role admin - this would be very bad




-->

