<script>
import API from '../helpers/api';


var api = new API;
export default{
    data(){
        return{
            email: '',
            password: '',
            showErrorMessage: false,
            errorMessage: ''
        }
    },
    methods:{
        async submitForm(e){
            e.preventDefault();
            if(this.email != '' && this.password != ''){
                var response = await api.authenticate(this.email, this.password);
                if(response.success == true){
                    e.target.submit();
                    return;
                }
                this.showErrorMessage = true;
                this.errorMessage = response.message;
            }
           
            
        }
    },
    async mounted(){
        // verificação se a sessão é válida para evitar login duplicado
        if (await api.isValidSession()) {
            window.location.href = '/dashboard/products';
        }
    }
};
</script>

<template>
    <div id="app" class="h-screen w-screen bg-bg-color-alt flex items-center justify-center">
        <div class="bg-bg-primary block w-[520px] h-[450px] shadow-lg border-gray-100 rounded-lg py-8 px-6">
            <div class="w-full flex justify-center mb-6">
                <img src="/assets/imgs/logo.webp" alt="Logo" class="h-20">
            </div>
            <form action="/dashboard/products" class="w-full" v-on:submit="submitForm">
                <h1 class="text-2xl font-bold text-center text-primary-color mb-6 -mt-7">Entrar</h1>
                <div class="space-y-4">
                    
                    <span v-if="showErrorMessage" class="text-red-600 font-medium text-center block mb-2">
                        {{ errorMessage }}
                    </span>

                    <div class="relative">
                        <input v-model="email" type="email" required placeholder="Email"
                            class="border-2 bg-primary w-full text-primary-color p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color transition-all" />
                    </div>
                    
                    <div class="relative">
                        <input v-model="password" required type="password" placeholder="Senha"
                            class="border-2 bg-primary w-full text-primary-color p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color transition-all" />
                    </div>
                    
                    <div class="w-full">
                        <input type="submit" value="Entrar"
                            class="bg-primary-color hover:bg-secondary-color w-full p-3 rounded-lg text-white font-medium text-center cursor-pointer transition-all" />
                    </div>

                    <div class="text-center">
                        <h2 class="text-base">
                            Não possui registro? 
                            <a href="/register" class="text-blue-700 underline hover:text-blue-500">clique aqui</a>
                        </h2>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


