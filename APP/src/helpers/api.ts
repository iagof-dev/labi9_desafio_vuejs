class API {
    private url: string = "https://challenge-labi9-4b4c472d5c07.herokuapp.com/api";

    async register(inputName: string, inputEmail: string, inputPass: string, inputConfirmationPass: string): Promise<boolean> {
        let response = await fetch(this.url + "/auth/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputName,
                email: inputEmail,
                password: inputPass,
                password_confirmation: inputConfirmationPass
            })
        });

         //201 - sucesso
         //422 - erro
        const requestStatusCode : number = response.status;

        let data = await response.json();

        if (requestStatusCode === 201) {
            console.log(data);
            if (data.data?.message === 'Created') {
                console.log('Usuário cadastrado com sucesso');
                return true;
            }
        }
        console.log("Erro! " + data.message);
        return false;
    }
}

export default API;
