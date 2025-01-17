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
      return { success: true, message: response.data.message };
  }
  
  if (response.errors && response.errors.email && response.errors.email[0].includes('The email has already been taken')) {
      return { success: false, message: 'E-mail já cadastrado' };
  }

  if (response.errors && response.errors.password && response.errors.password[0].includes('The password field must be between 8 and 32 characters')) {
    return { success: false, message: 'A senha deve ter entre 8 e 32 caracteres' };
}
  
  return { success: false, message: 'Erro desconhecido' };

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

  getAPIUrl() : String{
    return this.url;
  }

  async authenticate(
    inputEmail: string,
    inputPass: string
  ){

    let response = await this.MakePostRequest("/auth/login", {email: inputEmail, password: inputPass});

    let data = response;

    if(data && data.error && data.error.includes('Unauthorized'))
      return { success: false, message: 'E-mail ou senha incorretos'};
    

    this.setCookie("auth_key", data.data.token, 1);
    return { success: true, message: ''};
  }

  async isValidSession() : Promise<Boolean>{
    if(this.getCookie('auth_key') == null)
      return false;

    console.log(this.getCookie('auth_key'));

    let request = await this.MakeGetRequest('/auth/me');

    if(request.data && request.data.name && request.data.created_at)
      return true;

    return false;
  }

  async getAllCategories(){
    let response = await this.MakeGetRequest('/categories');

    return response;
  }

  async createCategory(name: string) : Promise<Boolean>{
    let response = await this.MakePostRequest('/categories', {'name': name});

    if(response && response.errors) return false;
      return true;
  }

  // async removeCategory(id : Number){
  //   let response = await this.MakePostRequest(`/categories/${id}`, {});

  //   if(response && response.errors) return false;
  //     return true;
  // }


    async CategoryInformation(id : Number){
      let response = await this.MakeGetRequest(`/categories/${id}`);

      if(response && response.errors) return false;
      
      
      return response;
    }

    async getProductsPerPage(page : Number){
      let response = await this.MakeGetRequest(`/products?page=${page}&perPage=12`);

      if(response && response.errors) return false;
      
      return response;
    }

    async getAllProducts(){
      let response = await this.MakeGetRequest(`/products?page=1&perPage=99999`);

      if(response && response.errors) return false;
      
      return response;
    }

    async createProduct(name : string, price : Number, category_id : Number, description : string){
      let response = await this.MakePostRequest('/products', {'name': name, 'price': price, 'category_id': category_id, 'description': description});

      if(response.errors && response.message.includes('The description field must be a string')) return {success: false, message: 'Descrição precisa ser um texto'};


      return {success: true, message: ''};
    }

    async deleteProduct(id : Number){
      
      let headerSettings : { [key: string]: string } = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      if(this.getCookie('auth_key') != null){
        headerSettings["Authorization"] = `Bearer ${this.getCookie('auth_key')}`;
      }


      let request = await fetch(this.url + '/products/' + id, {
        method: "DELETE",
        headers: headerSettings,
      });

      if(request.status != 204) return false;

      return true;
    }


    async getSpecificProduct (id : number){

      console.log(this.url + '/products/id/' + id);

      let request = await this.MakeGetRequest('/products/' + id);

      if(request.message) return {success: false, message: request.message};

      return {success: true, data: request.data};
    }

    async updateProduct(id : number, name : string, price : number, category_id : number, description : string){

      let headerSettings : { [key: string]: string } = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      if(this.getCookie('auth_key') != null){
        headerSettings["Authorization"] = `Bearer ${this.getCookie('auth_key')}`;
      }


      let request = await fetch(this.url + '/products/' + id, {
        method: "PUT",
        headers: headerSettings,
        body: JSON.stringify({'name': name, 'price': price, 'category_id': category_id, 'description': description}),
      });

      

      let response = await request.json();

      console.log(response);

      if (response.message) return { success: false, message: response.message };
      
      return {success: true, message: ''};

    }

}

export default API;
