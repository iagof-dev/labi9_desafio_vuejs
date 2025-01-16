class API {
  private url: string =
    "https://challenge-labi9-4b4c472d5c07.herokuapp.com/api";

    async MakePostRequest(endpoint : string, data : any){

      let headerSettings : { [key: string]: string } = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      if(this.getCookie('auth_key') != null){
        headerSettings["Authorization"] = `Bearer ${this.getCookie('auth_key')}`;
      }

      let request = await fetch(this.url + endpoint, {
        method: "POST",
        headers: headerSettings,
        body: JSON.stringify(data),
      });

      let response = await request.json();

      console.log(response);

      return response;
    }

    async MakeGetRequest(endpoint : string){

      let headerSettings : { [key: string]: string } = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      if(this.getCookie('auth_key') != null){
        headerSettings["Authorization"] = `Bearer ${this.getCookie('auth_key')}`;
      }


      let request = await fetch(this.url + endpoint, {
        method: "GET",
        headers: headerSettings,
      });

      let response = await request.json();

      console.log(response);

      return response;
    }

  async registerAccount(
    inputName: string,
    inputEmail: string,
    inputPass: string,
    inputConfirmationPass: string
  ){
    let response = await this.MakePostRequest("/auth/register", {'name': inputName, 'email': inputEmail, 'password': inputPass, 'password_confirmation': inputConfirmationPass});

    if (response.data && response.data.message && response.data.message.includes('Created')) {
      return { status: true, message: response.data.message };
  }
  
  if (response.errors && response.errors.email && response.errors.email[0].includes('The email has already been taken')) {
      return { status: false, message: 'E-mail já cadastrado' };
  }

  if (response.errors && response.errors.password && response.errors.password[0].includes('The password field must be between 8 and 32 characters')) {
    return { status: false, message: 'A senha deve ter entre 8 e 32 caracteres' };
}
  
  return { status: false, message: 'Erro desconhecido' };

  }

  setCookie(key: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${key}=${encodeURIComponent(value)}; ${expires}; path=/`;
  }


  getCookie(key: string): string | null {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim();
      if (cookie.startsWith(key + "="))
        return cookie.substring(key.length + 1);
    
    }
    return null;
  }

  async authenticate(
    inputEmail: string,
    inputPass: string
  ){

    let response = await this.MakePostRequest("/auth/login", {email: inputEmail, password: inputPass});

    let data = response;

    if(data && data.error && data.error.includes('Unauthorized'))
      return { status: false, message: 'E-mail ou senha incorretos'};
    

    this.setCookie("auth_key", data.data.token, 1);
    return { status: true, message: ''};
  }

  async isValidSession() : Promise<Boolean>{
    if(this.getCookie('auth_key') == null)
      return false;

    let request = await this.MakeGetRequest('/auth/me');

    if(request.data && request.data.name && request.data.created_at)
      return true;

    return false;
  }

  async accountLogout(){
    await fetch(this.url + "/auth/logout", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${this.getCookie('auth_key')}`,
      },
    });
  }
}

export default API;
