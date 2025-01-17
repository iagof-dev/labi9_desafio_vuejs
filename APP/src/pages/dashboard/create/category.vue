<script>
import API from '../../../helpers/api';
import SideBarMenu from '../../../components/sidebar/sidebar.vue';



let api = new API;
export default {
    data() {
        return {
            'categoryName': '',
        }
    },
    components: {
        SideBarMenu,
    },
    async mounted() {
        if (!(await api.isValidSession())) {
            window.location.href = '/';
        }
        
    },
    methods: {
        async create(e){
            e.preventDefault();
            console.log(this.categoryName);
            let response = await api.createCategory(this.categoryName);
            console.log(response);
            if(!response){
                swal.fire({
                    title: 'Erro',
                    text: 'Erro ao adicionar categoria',
                    icon: 'error',
                    confirmButtonColor: '#059669',
            });
                return;
            }

            swal.fire({
                title: 'Sucesso',
                text: 'Categoria adicionada com sucesso',
                icon: 'success',
                confirmButtonColor: '#059669',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/dashboard/categories';
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
                    <h1 class="text-xl font-semibold text-gray-800">Criação de categoria</h1>
                </div>
                <hr class="py-2 w-full">

                <form action="/categories" v-on:submit="create" class="m-12">
                    <div class="space-y-2 mb-4">
                        <label for="name" class="text-lg text-gray-700">Nome da Categoria</label>
                        <input v-model="categoryName" id="name" required type="text" placeholder="Digite o nome da categoria"
                            class="w-full px-4 py-2 rounded-md transition-all border focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700" />
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
