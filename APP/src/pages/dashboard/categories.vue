<script>
import API from '../../helpers/api';
import SideBarMenu from '../../components/sidebar/sidebar.vue';



let api = new API;
export default {
    data() {
        return {
        }
    },
    components: {
        SideBarMenu,
    },
    async mounted() {
        if (!(await api.isValidSession())) {
            window.location.href = '/';
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
        <div class="p-6">
            <h1>Categorias</h1>
        </div>
    </div>
</template>

