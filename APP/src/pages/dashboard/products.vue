<script>
import API from '../../helpers/api';
import SideBarMenu from '../../components/sidebar/sidebar.vue';
let api = new API;
export default {
    data() {
        return {
            productsList: [],
            isLoading: false,
            SearchText: '',
        }
    },
    components: {
        SideBarMenu,
    },
    async mounted() {
        this.isLoading = true;
        if (!(await api.isValidSession())) {
            window.location.href = '/';
        }
        this.productsList = await api.getProductsPerPage(1);
        this.isLoading = false;

    },

    methods: {
        async search() {
            this.isLoading = true;
            console.log(this.SearchText);

            let AllProducts = await api.getAllProducts();
            let SearchList = { data: [] };
            this.productsList = { data: [] };

            for (let i = 0; i < AllProducts.data.length; i++) {
                if (AllProducts.data[i].name.toLowerCase().includes(this.SearchText.toLowerCase())) {
                    SearchList.data.push(AllProducts.data[i]);
                }
            }

            this.productsList = SearchList;
            this.isLoading = false;
        },
        async deleteProduct(id) {
            console.log('deletar ' + id);

            swal.fire({
                title: 'Deletar produto',
                text: 'Tem certeza que deseja deletar esse produto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#059669',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let response = await api.deleteProduct(id);
                    if (!response) {
                        swal.fire({
                            title: 'Erro',
                            text: 'Erro ao deletar produto',
                            icon: 'error',
                            confirmButtonColor: '#059669',
                        });
                        return;
                    }
                    swal.fire({
                        title: 'Sucesso',
                        text: 'Produto deletado com sucesso',
                        icon: 'success',
                        confirmButtonColor: '#059669',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/dashboard/products';
                        }
                    });
                }
            });
        },
        edit(id){
            window.location.href = '/dashboard/products/edit/' + id;
        },
        async ver(id){
            let response = await api.getSpecificProduct(id);
            if(!response.success){
                swal.fire({
                    title: 'Erro',
                    text: 'Erro ao buscar informações do produto',
                    icon: 'error',
                    confirmButtonColor: '#059669',
                });
                return;
            }
            swal.fire({
                title: 'Informações do Produto',
                html: 'ID: ' + response.data.id + '<br>Nome: ' + response.data.name + '<br>Preço: R$ ' + response.data.price + '<br>Descrição: ' + response.data.description + '<br>Categoria: ' + response.data.category.name,
                confirmButtonColor: '#059669',
            });
        }
    }
}
</script>


<template>
    <div class="flex flex-row">
        <div
            class="relative flex h-screen w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
            <SideBarMenu />
        </div>
        <div class="p-6 mx-auto">
            <div class="bg-white w-[70vw] h-[90vh] shadow-lg rounded-lg border p-4">
                <div class="flex justify-between items-center mb-4 px-12">
                    <h1 class="text-xl font-semibold text-gray-800">Listagem de Produtos</h1>

                    <div class="flex items-center space-x-4">
                        <input type="text" v-model="SearchText" @input="search"
                            placeholder="Digite nome de um produto"
                            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color w-64" />

                        <a href="/dashboard/products/create">
                            <button
                                class="bg-primary-color hover:bg-secondary-color text-white py-2 px-4 rounded-lg font-medium flex items-center transition-all duration-300 ease-in-out transform hover:scale-105">
                                <img class="w-5 mr-2 invert" src="/assets/icons/plus.svg"
                                    alt="Adicionar nova categoria" />
                                <span class="hidden sm:inline-block">Adicionar</span>
                            </button>
                        </a>
                    </div>
                </div>
                <hr class="py-2 w-full">
                <div v-if="isLoading" class="mx-auto place-items-center">
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /> <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /> </svg>
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="flex border border-opacity-5 items-center w-full px-6 py-3  rounded-md"
                        v-for="({ id, name, price }, index) in productsList.data" :key="index">
                        <div>
                            <h1 class="text-lg text-gray-700">{{ name }}</h1>
                            <h2 class="text-base text-gray-700">R$ {{ price }}</h2>
                        </div>
                        <button @click="ver(id)" class="ml-auto text-red-600 transition"><img class="w-5"
                            src="/assets/icons/info.svg" title="Informações" alt="ver info produto"></button>
                        <button @click="edit(id)" class="text-red-600 transition mx-2"><img class="w-5"
                            src="/assets/icons/pencil.svg" title="Editar" alt="editar produto"></button>
                        <button @click="deleteProduct(id)" class=" text-red-600 transition"><img class="w-5"
                                src="/assets/icons/trash.svg" title="Remover" alt="deletar produto"></button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
