<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()

const axios = useNuxtApp().$axios

const items = ref([
    {
        title: "Overview",
        path: "/",
        icon: "ri:dashboard-fill"
    },
    {
        title: "Transactions",
        path: "/transactions",
        icon: "grommet-icons:transaction"
    },
    {
        title: "Account",
        path: "/account",
        icon: "mdi:account"
    },
    {
        title: "Settings",
        path: "",
        icon: "ep:setting"
    }
])

const logout = () => {
    axios.post('/api/logout')
    .then(() => {
        userStore.logout()
        return router.push('/login')
    })
}
</script>
<template>
    <div>
        <header class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer">
            <Logo/>
            <p class="font-bold text-black">Nuxt Finance</p>
        </header>
        <div class="px-4 grow">
            <div class="grid gap-2">
                <NuxtLink :href="item.path" v-for="(item, index) in items" :key="index" class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100">
                    <Icon size="20" color="black" :name="item.icon"/>
                    <span>{{ item.title }}</span>
                </NuxtLink>
                <NuxtLink v-if="!userStore.user" href="login" class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100">
                    <Icon size="20" color="black" name="ic:outline-login"/>
                    <span>Login</span>
                </NuxtLink>
                <NuxtLink v-if="userStore.user" @click="logout" class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100">
                    <Icon size="20" color="black" name="ic:outline-logout"/>
                    <span>Logout</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>