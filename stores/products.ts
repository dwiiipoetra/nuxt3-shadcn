import axios from 'axios'
import type { Products } from './../types'

import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

// define products store
export const useProductsStore = defineStore('products', () => {
  // define products state
  const products:{value: Products[]} = ref([])
  
  // define reactive for edit form
  let product = reactive({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: ""
  })

  const getAllProducts = async () => {
    try {
      await axios.get('http://localhost:8000/api/products')
      .then(res => {
        if(res.data.data) {
          // if success, set response as products state
          products.value = res.data.data
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const addProduct = async (data:Products) => {
    try {
      await axios.post('http://localhost:8000/api/products', data)
      .then(res => {
        if(res.data) {
          // if success, set success info
          toast({
            title: 'Information',
            description: 'Your data has been submitted'
          })

          setTimeout(async () => { return await navigateTo("/products") }, 1000)
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  const getProduct = async (id:number) => {
    try {
      await axios.get('http://localhost:8000/api/products/' + id)
      .then(res => {
        if(res.data.data) {
          // if success, set response as reactive product state 
          let { id, name, description, price, stock } = res.data.data
          product.id = id
          product.name = name
          product.description = description
          product.price = price
          product.stock = stock
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  const updateProduct = async (id:number, form:Products) => {
    try {
      await axios.put('http://localhost:8000/api/products/' + id, form)
      .then(res => {
        if(res.data.data) {
          // if success find product by id
          let getProductByID:Products | undefined = products.value.find((data:Products) => data.id === id)
          
          // if product found
          if(getProductByID) {
            // console.log('get product:',getProductByID);
            // console.log('response product:',res.data.data);
            // console.log('state products:',products.value);

            // destructure response
            let {name, description, price, stock} = res.data.data
            // set response as products state
            getProductByID.name = name
            getProductByID.description = description
            getProductByID.price = price
            getProductByID.stock = stock
            
            // if success, set success info
            toast({
              title: 'Information',
              description: 'Your data has been updated'
            })
          } else {
            console.log(`Product with ${id} is not found`);
          }
          // close dialog
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  const deleteProduct = async (id:number) => {
    try {
      await axios.delete('http://localhost:8000/api/products/' + id)
      .then(res => {
        if(res.data.data) {
          // if success, set success info
          toast({
            title: 'Information',
            description: 'Your data has been deleted'
          })

          setTimeout(async () => {
            // close dialog
            getAllProducts()
          }, 1000)
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  return { getAllProducts, products, addProduct, getProduct, product, updateProduct, deleteProduct }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot))
}
