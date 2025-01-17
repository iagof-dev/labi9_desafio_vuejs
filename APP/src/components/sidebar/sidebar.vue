<script>

import sidebarMenuItem from './sidebarMenuItem.vue';

export default {
  name: 'SideBarMenu',
  components: {
    sidebarMenuItem,
  },
};
</script>

<template>
  <div class="flex items-center justify-center">
    <img class="w-24 -mr-4 -ml-6" src="/assets/imgs/logo.webp" alt="Logo LABI9">
    <h5 class="text-xl font-sans font-semibold leading-snug tracking-normal text-blue-gray-900">
      Labi9 Desafio
    </h5>
  </div>

  <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
    <sidebarMenuItem icon="/assets/icons/home.svg" title="Inicio" redirect="" />
    <sidebarMenuItem icon="/assets/icons/box.svg" title="Produtos" redirect="/dashboard/products" />
    <sidebarMenuItem icon="/assets/icons/tag.svg" title="Categorias" redirect="/dashboard/categories" />
    <sidebarMenuItem icon="/assets/icons/door.svg" title="Sair" redirect="/logout" />
  </nav>
</template>
