<script>
  import { getContext } from 'svelte';
  import Modal,{getModal} from './Modal.svelte'
  import { authToken, userId, emailName, authenticated, fullName } from '../stores'
  import { directus } from "../services/directus";

  export let message;


	let value;
	let password = ""
	let email = ""

	let userResponse;

   
    

	const handleLogin = async () => {
		await directus.auth
			.login({ email, password })
			.then(() => {
				$authenticated = true;
				$emailName = email
				$authToken = directus.auth.token
				email = ""
				password = ""
				console.log("auth token is " + $authToken)
			})
			.catch((error) => {
				window.alert('Invalid credentials ' + error);
				password = "";
				$authenticated=false;
				email = "";
			});
		if ($authenticated) {
			userResponse = await directus.users.me.read()
			$userId = userResponse.id
			$fullName = userResponse.first_name + " " + userResponse.last_name
			console.log(`first name is ${userResponse.first_name} and surname is ${userResponse.last_name}`)
		}
		console.log("after directus call, authenticated is " + $authenticated)
		getModal('second').close()
  }

</script>

<style>
  h2 {
		font-size: 2rem;
		text-align: center;
	}
	
	input {
		width: 100%;
	}
	
/*	.buttons {
		display: flex;
		justify-content: space-between;
	}

	*/
</style>

<h2>{message}</h2>

<form on:submit|preventDefault="{handleLogin}">
	<label>
	  Email:
	  <input data-cy="login_username" type="email" name="username" bind:value="{email}" />
	</label>
	<label>
	  Password:
	  <input data-cy="login_password" type="password" name="passwd" bind:value="{password}" />
	</label>
	<button type="submit" disabled={password == "" || email==""} >Login</button>
  </form>



