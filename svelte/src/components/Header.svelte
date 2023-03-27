<script>
  import { Link } from "svelte-navigator";
  import { getAssetURL } from "../utils/get-asset-url";
//  import Modal,{getModal} from './Modal.svelte';
//  import LoginDialog from './LoginDialog.svelte';
//  import Register from './Register.svelte';
  import { directus } from "../services/directus";
  import { authToken, userId, emailName, authenticated, fullName, refreshToken} from '../stores'

  import LoginModal from "./LoginModal.svelte";
   // @ts-ignore
  import RegisterModal from "./RegisterModal.svelte"; 
  import ResetPWModal from "./ResetPWModal.svelte";

	let showPopupLogin = false;
	let showPopupRegister = false;
//	let showPopupResetPW = false;

	function onShowPopup(popup) {
		switch (popup) {
		case 1:
			showPopupLogin = true;
			break;
		case 2:
			showPopupRegister = true;
			break;
/* 		case 3:
			showPopupResetPW = true;
			break; */
		default:
			console.log("Something gone wrong with popup open selection " + popup);
		}
	}

	function onPopupClose(popup) {
		switch (popup) {
		case 1:
			showPopupLogin = false;
			break;
		case 2:
			showPopupRegister = false;
			break;
/* 		case 3:
			showPopupResetPW = false;
			break; */
	default:
			console.log("Something gone wrong with popup close selection " + popup);
		}
	}	


	function setSelection(){
		console.log('and authenticated is ' + $authenticated);
	}

	async function setLogout() {
		console.log("entered logout. authToken is " + $authToken);
		await directus.auth.logout();
		$authenticated = false;
		$emailName = "";
		$authToken = "";
		$userId = 0;
		$fullName = "";
		location.replace("/");   
	}

	async function setResetPassword() {
		console.log("entered reset password. " );
		console.log("the current url is " + import.meta.env.VITE_DIRECTUS_URL )
		// await directus.auth.password.request($emailName,  "http://localhost:3000/resetpw");
		await directus.auth.password.request($emailName, import.meta.env.VITE_SVELTE_URL + "/resetpw");
		// await directus.auth.password.request($emailName);
		window.alert('Email to reset your password sent to ' + $emailName);
	}

	

</script>

<header>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
<!--	  <a class="navbar-brand" href="/">
		<img src={getAssetURL("c74ca5e0-b8c9-491f-b25a-e299bea8fd8a")} alt="Wolfsberg Group" style="width:90;height:60px;">
	  </a> -->
	  <Link to={`/`} class="nav-link"> 
		<img src={getAssetURL("c74ca5e0-b8c9-491f-b25a-e299bea8fd8a")} alt="Wolfsberg Group" style="width:90;height:60px;">
	  </Link>	  
	  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	  </button>

	  <div style="color:blue">
		{#if $authenticated} 
			Hello {$fullName}
		{:else}
			You are: not authenticated
		{/if}
	  </div>

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
		  <li class="nav-item active">
<!-- 			<a class="nav-link active" aria-current="page" href="/">
				Home
			</a> -->
			<Link to={`/`} class="nav-link"> 
				Home
			</Link>
		  </li>

<!-- need Link tags as otherwise logged out when use this if use anchor -->
		<li class="nav-item">
			<Link to={`/everyone`} class="nav-link"> 
				Public Articles
			</Link>
		</li>

		{#if $authenticated == true} 
			<li class="nav-item">
				<Link to={`/membersonly`} class="nav-link"> 
					Members Articles
				</Link>
			</li>
		{/if}

		{#if $authenticated} 
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			  {$fullName}
			</a>
			<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
			  <li>
				<a class="dropdown-item" href="/#" data-cy="resetpwlink" on:click|preventDefault={()=>setResetPassword()}>
				    Change Password
			    </a>
			  </li>
			  <li><a class="dropdown-item" href="/#">Another action</a>
			  </li>
			  <li><hr class="dropdown-divider"></li>
			  <li>
				<a class="dropdown-item" href="/#" data-cy="logoutlink" on:click|preventDefault={()=>setLogout()}>
				   Logout
			    </a>
			  </li>
			</ul>
		  </li> 
<!-- 		{:else}
		<li class="nav-item">
			<a class="nav-link disabled" href="/#" tabindex="-1" aria-disabled="true">Unknown</a>
		  </li> -->
		{/if}

<!-- 		  <li class="nav-item">
			<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
		  </li>  -->

 		  {#if $authenticated == false} 
			<li class="nav-item">
				<a class="nav-link" href="/#" data-cy="registerlink" on:click|preventDefault={()=>onShowPopup(2)}>
					Register
				</a>
			</li>
 			<li class="nav-item">
				<a class="nav-link" href="/#" data-cy="loginlink" on:click|preventDefault={()=>onShowPopup(1)}>
					Login 
				</a>
			</li>
		  {:else}
			<li class="nav-item">
				<!-- <a href="/#" class="nav-link" data-cy="resetlink" on:click|preventDefault={()=>onShowPopup(3)}> -->
				<a class="nav-link" href="/#" data-cy="resetpwlink" on:click|preventDefault={()=>setResetPassword()}>
					Reset Password
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/#" data-cy="logoutlink" on:click|preventDefault={()=>setLogout()}>
					Logout
				</a>
			</li>
	  
	  	  {/if}



		</ul>

	  </div>
	</div>
  </nav> 


</header>

<LoginModal open={showPopupLogin} onClosed={(data) => onPopupClose(1)}/>
	
<RegisterModal open={showPopupRegister} onClosed={(data) => onPopupClose(2)}/>
	
<!-- <ResetPWModal open={showPopupResetPW} onClosed={(data) => onPopupClose(3)}/> -->
