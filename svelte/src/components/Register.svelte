<script>
 // import { getContext } from 'svelte';
  import Modal,{getModal} from './Modal.svelte'
  import { authToken, userId, emailName, authenticated, fullName } from '../stores'
  import { directus } from "../services/directus";

  export let message;

	let adminID = "500ca554-58d3-4d6f-9482-ee4b2be5090d";


	

	let firstname = ""
	let surname = ""
	let password = ""
	let email = ""
	let eventStore
	let userResponse;
	let value = '';

	let show_password = false
	$: type = show_password ? 'text' : 'password'
	
		
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
		})
		.catch(() => {
			window.alert('Could not add user');
		});

		let newUser = await directus_users.readByQuery({
			filter: {
				email: email,
			},
		});

		console.log("return from read user " + JSON.stringify(newUser));

		// @ts-ignore
		console.log("json object " + newUser.data[0].id);


		await directus_notifications.createOne({
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

		firstname = ""
		surname = ""
		email = ""
		password = ""
		eventStore.target.value = ""
		getModal('third').close()
    }

</script>

<style>
  h2 {
		font-size: 2rem;
		text-align: center;
	}
	
	input {
		width: 80%;
	}
	
/*	.buttons {
		vertical-align: middle;
	}

	div.settings {
		display:grid;
		grid-template-columns: max-content max-content;
		grid-gap:5px;
	}

	div.settings label       { text-align:right; }
	div.settings label:after { content: ":"; }
*/



</style>

<h2>{message}</h2>


<form on:submit|preventDefault="{register}">
	<div class="overflow-hidden">
		<div class="form-group row ">
			<label class="col-sm-3 col-form-label" for="firstname">First Name</label>	
			<div class="col-sm-7">
				<input data-cy="firstname" type="text" class="form-control" name="firstname" bind:value="{firstname}" />
			</div>	

		</div>
		<div class="form-group row">
			<label class="col-sm-3 col-form-label" for="surname">Surname</label>
			<div class="col-sm-7">
				<input data-cy="surname" type="text" class="form-control" name="surname" bind:value="{surname}" />
			</div>

		</div>
		<div class="form-group row">		
			<label class="col-sm-3 col-form-label" for="username">Email</label>
			<div class="col-sm-7">
				<input data-cy="emailaddr" type="email" class="form-control" name="username" bind:value="{email}" />
			</div>	

		</div>
		<div class="form-group row">
			<label class="col-sm-3 col-form-label" for="password">Password</label>	
			<div class="col-sm-7">	
			<div class="input-group">
				<input class="form-control" data-cy="passwd" name="password" { type } { value } on:input={ onInput } />
			<div class="input-group-append">
				<button class="btn btn-outline-secondary" type="button" on:click="{ () => show_password = !show_password }">{show_password ? 'Hide' : 'Show'}</button>
			</div>	
			</div>
			</div>	

		</div>
	</div>
	<br>
	<button type="submit" disabled={password == "" || email =="" || firstname == "" || surname == ""} >Register</button>
  </form>

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

