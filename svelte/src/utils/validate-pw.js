import { directus } from "../services/directus";

const directus_settings = directus.items('directus_settings');

export function validatePW(pw_pattern, new_password) {
    let pw_strength_message = "";
	let pw_strength_ok = false;

    console.log("into validatePW with: password is " + new_password + " and pattern is " + pw_pattern)

    if (pw_pattern != null) {
        //			console.log("value of new password changed: " + new_password);
        //			console.log("pw_pattern is " + pw_pattern);		
        
        switch (pw_pattern.length) {
            case 7:
                pw_strength_message = "Password must be at least 8 characters";
                break;
            case 82:
                pw_strength_message = "Password must be at least 8 characters with upper and lower case and numbers and special";
                break;
            default:
                pw_strength_message = "Password must match organisation rules";
            }

        const regex = new RegExp(pw_pattern);
        if (regex.test(new_password) == true) {
            console.log("new password is now valid format");
            pw_strength_message = "Password meets rules";
            pw_strength_ok = true;
        }

    }
    else {
        pw_strength_ok = true;
    }
    console.log("pw_strength_message is " + pw_strength_message)
    console.log("pw_strength_ok is " + pw_strength_ok)
    return {
        messageStr: pw_strength_message,
        resultBool: pw_strength_ok,
    }
    
}

  export async function getSetting() {
    let pw_pattern = null;

    console.log("validate-pw: into getSettings ")

    await directus_settings.readByQuery({
            fields: ["auth_password_policy", "project_name"],
          }).then((data) => {
          // @ts-ignore
          console.log("password policy is " + data.data.auth_password_policy);
          // @ts-ignore
          if (data.data.auth_password_policy != null) {
          // @ts-ignore
              pw_pattern = data.data.auth_password_policy.slice(1,-1);
              // pw_pattern is ^.{8,}$ = 7
              // pw_pattern is (?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\s).*$ = 82
              console.log("length of pattern is " + pw_pattern.length);
          }
      })
      .catch((error) => {
          pw_pattern = "error";
          console.log("getSettings: something gone wrong: " + error)
          window.alert('Could not get pw pattern settings ' + error);
      });
      console.log("getSetting returning " + pw_pattern)
      return pw_pattern;
  }


