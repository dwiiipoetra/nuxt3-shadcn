import axios from "axios"
import type { Login } from './../types'
// import { useRouter } from 'vue-router'
// const router = useRouter()
import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

export const useUserStore = defineStore('user', () => {
    const user = useCookie("USER", {
        maxAge: 60 * 60,
    })

    const setUser = (data?: any) => (user.value = data)

    const login = async (data: Login) => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie')
            .then(res => {
                return axios.post('http://localhost:8000/api/login', data)
                .then(response => {
                    if(response.data.success) {
                        let data = response.data
                        setUser(JSON.stringify(data))
                        
                        toast({
                            title: 'Information',
                            description: 'You have successfully logged in'
                        })
                        // router.push('/')
                    }
                }).catch(error => {
                    setUser()
                    
                    toast({
                        title: 'Information',
                        description: 'Wrong Email or Password',
                        variant: 'destructive'
                    })
                })
            })
        } catch(error) {
            console.log(error);
        }
    }

    const logout = () => {
        setUser()
    }

    return { user, login, logout, setUser }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}