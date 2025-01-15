class API {
  private url: string =
    "https://challenge-labi9-4b4c472d5c07.herokuapp.com/api";

  async registerAccount(
    inputName: string,
    inputEmail: string,
    inputPass: string,
    inputConfirmationPass: string
  ): Promise<{ status: boolean; message: string }> {
    let response = await fetch(this.url + "/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        email: inputEmail,
        password: inputPass,
        password_confirmation: inputConfirmationPass,
      }),
    });

    //201 - sucesso
    //422 - erro
    const requestStatusCode: number = response.status;

    let data = await response.json();

    if (requestStatusCode === 201) {
      if (data.data?.message === "Created") {
        return { status: true, message: "Usuário cadastrado com sucesso" };
      }
    }
    let responseMessage : string = '';

    if(data.message.includes('The email has already been taken.')){
        responseMessage = 'E-mail já cadastrado.';
    }
    if(data.message.includes('The password field must be between 8 and 32 characters')){
        responseMessage = 'Senha deve ter entre 8 e 32 caracteres.';
    }
    return { status: false, message: responseMessage };
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
      if (cookie.startsWith(key + "=")) {
        return cookie.substring(key.length + 1);
      }
    }
    return null;
  }

  async authenticate(
    inputEmail: string,
    inputPass: string
  ): Promise<{ status: boolean; message: string }> {
    let response = await fetch(this.url + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPass,
      }),
    });

    //201 - sucesso
    //422 - erro
    const requestStatusCode: number = response.status;

    if(requestStatusCode != 201 && requestStatusCode != 200) {
      return { status: false, message: "Usuário ou senha inválidos" };
    }

    let data = await response.json();

    console.log(data);

    this.setCookie("auth_key", data.data.token, 1);

    return { status: true, message: ''};
  }
}

export default API;
