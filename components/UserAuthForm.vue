<script setup>
import { cn } from '@/lib/utils'
import { useRouter } from 'vue-router'
const router = useRouter()

let user = ref({
  loggedIn: false,
  token: '',
  name: '',
  email: '',
})
let storedUserString
let storedUser
if(process.client) {
  storedUserString = localStorage.getItem('user')
  storedUser = JSON.parse(storedUserString)
  console.log('storedUser:',storedUser);
}
const email = ref('')
const password = ref('')
const validation = ref([])
const loginFailed = null
const isLoading = ref(false)

const axios = useNuxtApp().$axios
const login = () => {
  if(email.value && password.value) {
    isLoading.value = true
    axios.get('/sanctum/csrf-cookie')
    .then(response => {
      // console.log('get csrf response:', response);
      axios.post('/api/login', { email: email.value, password: password.value }).then(res => {
        // console.log('post:', res);
        if(res.data.success) {
          isLoading.value = false
          console.log('sucess', res.data);
          if(process.client) {
            user.value.loggedIn = true
            user.value.token = res.data.token
            user.value.name = res.data.user.name
            user.value.email = res.data.user.email

            const userToStr = JSON.stringify(user.value)
            localStorage.setItem('user', userToStr)
          }
        return router.push('/')
        } else {
          loginFailed = true
        }
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  validation.value = []
  if(!email.value) validation.value.email = true
  if(!password.value) validation.value.password = true
}
onMounted(() => {
  // axios.get('api/hello').then(res=>console.log(res))
  if(process.client) {
    if(storedUser.loggedIn) return router.push('/')
  }
})
// watch(loggedIn, (newValue, oldValue) => {
//   console.log(newValue, oldValue);
// })

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
          <div v-if="validation.email" class="mt-2">Masukkan Email</div>
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
          <div v-if="validation.password" class="mt-2">Masukkan Password</div>
        </div>
        <Button variant="outline" type="submit" :disabled="isLoading">
          <Icon v-if="isLoading" size="15" color="black" name="tabler:loader" class="animate-spin"/>Login
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
    <Button variant="outline" type="submit" :disabled="isLoading">
      <Icon v-if="isLoading" size="15" color="black" name="tabler:loader" class="animate-spin"/>
      <Icon size="20" color="black" name="mdi:github" class="mr-1"/>GitHub
    </Button>
  </div>
</template>