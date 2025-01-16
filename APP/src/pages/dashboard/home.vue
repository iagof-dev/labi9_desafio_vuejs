<template>
    <div class="flex flex-row">
        <div
            class="relative flex h-screen w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
            <SideBarMenu />
        </div>
        <div class="p-6">
            <h1>teste</h1>
        </div>
    </div>
</template>

<script>
import API from '../../helpers/api';

import SideBarMenu from '../../components/sidebar.vue';

let api = new API;
export default {
    data() {
        return {
        }
    },
    components: {
        SideBarMenu,
    },
    mounted() {
        let value = api.getCookie('auth_key');

        if (value == null || value == '' || value == ' ') {
            window.location.href = '/';
        }
    }
}
</script>