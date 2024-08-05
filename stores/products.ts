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
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0
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
    let findProduct:Products | undefined = products.value.find((data:Products) => data.id === id)
    
    if(findProduct){
      product.id = findProduct.id
      product.name = findProduct.name
      product.description = findProduct.description
      product.price = findProduct.price
      product.stock = findProduct.stock
    }
  }

  const updateProduct = async (editedProduct:Products) => {
    try {
      await axios.put('http://localhost:8000/api/products/' + editedProduct.id, editedProduct)
      .then(res => {
        if(res.data.data.id) {
          // getAllProducts()
          // console.log(res.data,"data nih");
          // product = res.data.data
          // if success find product by id
          let getProductByID:Products | undefined = products.value.find((data:Products) => data.id === editedProduct.id)
          
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
            console.log(`Product ${editedProduct.name} is not found`);
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

  return { getAllProducts, products, addProduct, product, getProduct, updateProduct, deleteProduct }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot))
}
