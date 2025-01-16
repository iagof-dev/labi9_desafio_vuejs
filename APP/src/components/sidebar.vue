<template>
    <div class="p-4 mb-2">
        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Titulo
        </h5>
    </div>
    <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <sidebarMenuItem title="Inicio"/>
        <sidebarMenuItem title="Produtos"/>
        <sidebarMenuItem title="Categorias"/>
        <sidebarMenuItem title="Sair"/>
      </nav>
</template>


<script>

import sidebarMenuItem from './sidebar/sidebarMenuItem.vue';

export default {
  name: 'SideBarMenu',
  components: {
    sidebarMenuItem,
  },
};
</script>