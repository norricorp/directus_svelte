<script>
    import { authToken, userId, emailName, authenticated, fullName} from '../stores'

    import ResetPWModal from "../components/ResetPWModal.svelte";
  
    import { useLocation } from "svelte-navigator";

	const location = useLocation();
	
	let token,  urlSearchParams;
	
	let qs, params;
	$: {
		qs = $location.search;
		getParamsFromQs(qs);
	}
	
	function getParamsFromQs(qs) {
		urlSearchParams = new URLSearchParams(qs);
		const params = Object.fromEntries(urlSearchParams.entries());
		token = params.token || '';
  
        console.log("ResetPW: token value is " + token);
    }
      let showPopupResetPW = true;
     
      function onShowPopup(popup) {
          switch (popup) {
          case 3:
              showPopupResetPW = true;
              break;
          default:
              console.log("Something gone wrong with popup open selection " + popup);
          }
      }
  
      function onPopupClose(popup) {
          switch (popup) {
            case 3:
              showPopupResetPW = false;
              break;
            default:
              console.log("Something gone wrong with popup close selection " + popup);
          }
      }	

      console.log("and auth token is " + $authToken);

  </script>
  
  <ResetPWModal token={token} open={showPopupResetPW} onClosed={(data) => onPopupClose(3)}/>
  