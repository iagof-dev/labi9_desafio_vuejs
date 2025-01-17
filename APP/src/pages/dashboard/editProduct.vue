<script>
import SideBarMenu from '../../components/sidebar/sidebar.vue';
import API from '../../helpers/api';

let api = new API();
export default {
    data() {
        return {
            listCategories: [],
            productID: this.$route.params.id,
            productInfo: [],
            name: '',
            price: 0,
            description: '',
            categoryID: 0,
        }
    },
    components: {
        SideBarMenu,
    },
    methods:{
        async updateProduct(e){
            e.preventDefault();
            let response = await api.updateProduct(this.productID, this.name, this.price, this.categoryID, this.description);

            if(!response.success){
                swal.fire({
                    icon: 'error',
                    title: 'Erro ao atualizar',
                    text: response.message,
                    confirmButtonColor: '#22C55E',
                });
                return;
            }

            swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Produto atualizado com sucesso',
                confirmButtonColor: '#22C55E',
                }).then((result) => {
                if (result.isConfirmed) {
                    e.target.submit();
                }
            });
        }
    },
    async mounted() {
        if (!(await api.isValidSession())) {
            window.location.href = '/';
        }

        let response = await api.getSpecificProduct(this.productID);

        if (!response.success) window.location.href = '/dashboard/products/';

        this.productInfo = response.data;
        this.name = response.data.name;
        this.price = response.data.price;
        this.description = response.data.description;
        this.categoryID = response.data.category.id;
        

    },
};

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
                    <h1 class="text-xl font-semibold text-gray-800">Edição de Produto - {{ productInfo.name }} ({{
                        productID }})</h1>
                </div>
                <hr class="py-2 w-full">

                <form action="/dashboard/products" v-on:submit="updateProduct" class="m-12">
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


                    <div class="mt-4">
                        <input type="submit" value="Salvar"
                            class="hover:cursor-pointer w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                        </input>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
