<template>
    <div class="h-screen w-screen bg-bg-color-alt">
        <div class="flex flex-col place-items-center h-[90%]">
            <div class="m-auto">
                <div class="bg-bg-primary block w-[520px] h-[450px] shadow-lg border-gray-100 rounded-lg py-24">
                    <form action="/" class="w-full" v-on:submit="submitForm">
                        <h1 class="text-2xl font-bold w-full text-center">Registrar</h1>
                        <div class="place-items-center">
                            <span v-if="showErrorMessage" class="text-red-600 font-medium">{{ errorMessage }}</span>
                            <div class="py-1">
                                <input v-model="name" type="text" required placeholder="Nome"
                                    class="border-2 bg-primary w-full text-primary-color p-2 rounded-md" />
                            </div>
                            <div class="py-1">
                                <input v-model="email" type="email" required placeholder="Email"
                                    class="border-2 bg-primary w-full text-primary-color p-2 rounded-md"  />
                            </div>
                            <div class="py-1">
                                <input v-model="password" type="password" required placeholder="Senha"
                                    class="border-2 bg-primary w-full text-primary-color p-2 rounded-md" />
                            </div>
                            <div class="py-1">
                                <input v-model="confirmpassword" type="password" required placeholder="Confirme a senha"
                                    class="border-2 bg-primary w-full text-primary-color p-2 rounded-md"  />
                            </div>
                            <div class="w-1/3"><input type="submit" value="Registrar"
                                    class="bg-primary-color hover:bg-secondary-color w-full hover:cursor-pointer transition-all text-white p-2 text-center my-2 rounded-lg font-medium" />
                            </div>
                            <div>
                                <h1 class="text-center">Já possui conta? <a href="/"><span
                                            class="text-blue-700 underline hover:cursor-pointer">clique aqui</span></a>
                                </h1>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../helpers/api';


var api = new API;
export default{
    data(){
        return{
            email: '',
            password: '',
            confirmpassword: '',
            showErrorMessage: false,
            errorMessage: ''
        }
    },
    methods:{
        async submitForm(e){
            e.preventDefault();
            if(this.name != '' && this.email != '' && this.password != '' && this.confirmpassword == this.password){
                var response = await api.registerAccount(this.name, this.email, this.password, this.confirmpassword);
                if(response.status == true){
                    e.target.submit();
                    return;
                }
                this.showErrorMessage = true;
                this.errorMessage = response.message;
            }
           
            
        }
    }
};


</script>
