<script setup>
import { cn } from '@/lib/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const axios = useNuxtApp().$axios
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const login = async () => {
  if(email.value && password.value) {
    isLoading.value = true
    
    userStore.login({ email: email.value, password: password.value })
    
    setTimeout(()=> isLoading.value = false, 3000)
  }
}


onMounted(() => {
  // axios.get('api/hello').then(res=>console.log(res))
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="login">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            v-model="email"
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="password">
            Password
          </Label>
          <Input
            v-model="password"
            id="password"
            placeholder="********"
            type="password"
            :disabled="isLoading"
          />
        </div>
        <Button variant="outline" type="submit" :disabled="isLoading">
          <Icon v-if="isLoading" size="15" color="black" name="tabler:loader" class="mr-1 animate-spin"/>Login
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <nuxt-link to="/">home</nuxt-link>
    <Button variant="outline" type="submit" :disabled="isLoading">
      <!-- <Icon v-if="isLoading" size="15" color="black" name="tabler:loader" class="animate-spin"/> -->
      <Icon size="20" color="black" name="mdi:github" class="mr-1"/>GitHub
    </Button>
  </div>
</template>