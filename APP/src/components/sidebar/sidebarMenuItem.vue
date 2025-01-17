<template>
    <a v-bind:href=redirect>
      <div role="button"
              class="hover:bg-green-300 flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
              <div class="grid mr-4 place-items-center">
                  <img :src="icon" alt="icon" class="w-5 h-5">
              </div>
              <h1>{{ title }}</h1>
          </div>
    </a>
</template>
  <script>
  
  export default {
    name: 'SideBarItemMenu',
    props: {
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      redirect: {
        type: String,
        required: false
      }
    }
  };
  </script>
  