<script>
import API from '../../../helpers/api';
import SideBarMenu from '../../../components/sidebar/sidebar.vue';



let api = new API;
export default {
    data() {
        return {
            listCategories: [],
            name: '',
            price: '',
            description: '',
            categoryID: 0,
        }
    },
    components: {
        SideBarMenu,
    },
    async mounted() {
        if (!(await api.isValidSession())) {
            window.location.href = '/';
        }

        this.listCategories = await api.getAllCategories();


    },
    methods: {
        async create(e) {
            e.preventDefault();

            // console.log(this.name);
            // console.log(this.description);
            // console.log(this.price);
            // console.log(this.categoryID);

            let response = await api.createProduct(this.name, this.price, this.categoryID, this.description);

            if(!response.success){
                swal.fire({
                    icon: 'error',
                    title: 'Erro ao criar',
                    text: response.message,
                    confirmButtonColor: '#22C55E',
                });
                return;
            }

            swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Produto adicionado com sucesso',
                confirmButtonColor: '#22C55E',
                }).then((result) => {
                if (result.isConfirmed) {
                    e.target.submit();
                }
            });
        }
    }
}
</script>
<template>
    <div class="flex flex-row">
        <div
            class="relative flex h-screen w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-green-900/5">
            <SideBarMenu />
        </div>
        <div class="p-6 mx-auto">
            <div class="bg-white w-[70vw] h-[90vh] shadow-lg rounded-lg border p-4">
                <div class="flex justify-between items-center mb-4 px-12">
                    <h1 class="text-xl font-semibold text-gray-800">Listagem de Categorias</h1>
                </div>
                <hr class="py-2 w-full">

                <form action="/dashboard/products" v-on:submit="create" class="m-12">
                    <div class="space-y-2 mb-4">
                        <label for="name" class="text-lg text-gray-700">Nome do produto</label>
                        <input v-model="name" id="name" required type="text" placeholder="Digite o nome do produto"
                            class="w-full px-4 py-2 rounded-md transition-all border focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />
                    </div>
                    <div class="space-y-2 mb-4">
                        <label for="price" class="text-lg text-gray-700">Valor</label>
                        <input v-model="price" id="price" required type="number" placeholder="Digite o valor do produto"
                            class="w-full px-4 py-2 rounded-md transition-all border focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />
                    </div>
                    <div class="space-y-2 mb-4">
                        <label for="description" class="text-lg text-gray-700">Descrição</label>
                        <textarea v-model="description" id="description" required type="number"
                            placeholder="Descrição do produto"
                            class="w-full h-16 px-4 py-2 resize-none rounded-md transition-all border focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"></textarea>
                    </div>
                    <div class="space-y-2 mb-4">
                        <label for="category" class="text-lg text-gray-700">Categoria</label>
                        <div class="relative">
                            <select v-model="categoryID" name="category" id="category"
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 appearance-none">
                                <option disabled value="0">Selecione uma categoria</option>
                                <option v-for="({ id, name }, index) in listCategories.data" :key="index" :value="id">{{
                                    name }}</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <input type="submit" value="Adicionar"
                            class="hover:cursor-pointer w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                        </input>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
