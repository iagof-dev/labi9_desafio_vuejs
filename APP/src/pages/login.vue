<template>
    <div id="app" class="h-screen w-screen bg-bg-color-alt">
        <div class="flex flex-col place-items-center h-[90%]">
            <div class="m-auto">
                <div class="bg-bg-primary block w-[520px] h-[450px]  shadow-lg border-gray-100 rounded-lg py-24">
                    <form class="w-full">
                        <h1 class="text-2xl font-bold text-center">Entrar</h1>
                        <div class="place-items-center">
                            <span class="hidden text-red-600 font-medium">E-mail ou Senha incorreta</span>
                            <div class="py-1">
                                <input v-model="email" type="email" required placeholder="Email"
                                    class="border-2 bg-primary w-full text-primary-color p-2 rounded-md" />
                            </div>
                            <div class="py-1">
                                <input v-model="password" required type="password" placeholder="Senha"
                                    class="border-2 bg-primary w-full text-primary-color p-2 rounded-md" />
                            </div>
                            <div class="flex items-center pt-1">
                                <input name="remember" type="checkbox"
                                    class="w-4 h-4 text-blue-600 transition-all rounded">
                                <label for="remember" class="pl-1 text-sm font-medium">Lembrar-me</label>
                            </div>
                            <div class="w-1/3"><button @click="login"
                                    class="bg-primary-color hover:bg-secondary-color transition-all text-white p-2 my-1 px-12 rounded-lg w-full font-medium">Entrar</button>
                            </div>
                            <div>
                                <h1 class="text-center">Não possui registro? <a href="/register"><span
                                            class="text-blue-700 underline hover:cursor-pointer">clique
                                            aqui</span></a></h1>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

