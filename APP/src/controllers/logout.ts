
import API from "../helpers/api";

async function logout(){
    let api = new API();
await fetch(api.getAPIUrl() + "/auth/logout", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${api.getCookie('auth_key')}`,
    },
  });
window.location.href = '/';
}

export default logout;