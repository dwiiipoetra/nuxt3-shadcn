import axios from 'axios'
import type { Products } from './../types'
import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

export const useProductsStore = defineStore('products', () => {
  const products = ref([])

  const getAllProducts = async () => {
    try {
      await axios.get('http://localhost:8000/api/products')
      .then(res => {
        if(res.data.data) {
          products.value = res.data.data
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  return { products, getAllProducts }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot))
}
