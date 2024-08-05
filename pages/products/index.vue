<script setup>
// definePageMeta({
//   middleware: ['auth']
// })

import useHelpers from '@/composables/useHelpers'
const { excerptWord, currencyFormat } = useHelpers()

const productsStore = useProductsStore()

const deleteData = (id) => {
  productsStore.deleteProduct(id)
}

onMounted(() => {
    productsStore.getAllProducts()
})
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex flex-col items-start">
      <p>All your products</p>
      <h1>Products</h1>
      <nuxt-link to="/products/add" class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Product</nuxt-link>
    </header>

    <div class="flex flex-wrap">
      <div v-for="product in productsStore.products" :key="product.id" class="w-full md:w-1/3 mb-4">
        <div class="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
          <a href="#">
              <img class="rounded-t-lg" src="@/assets/product.jpg" alt="" />
          </a>
          
          <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{{ product.name }} | ({{ product.stock }} pcs)</h5>
            </a>
            
            <p class="mb-3 font-normal text-gray-400">{{ excerptWord(product.description) }}</p>
          
            <div class="flex items-center justify-end">
              <span class="text-xl font-bold text-white mr-2">{{ currencyFormat(product.price) }}</span>
                <ProductEditForm :id="product.id"/>

                <Dialog>
                  <DialogTrigger as-child>
                  <Button class="border-none mx-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <Icon class="z-50" size="16" name="pajamas:remove-all"/>
                  </Button>
                  </DialogTrigger>
                  <DialogContent class="bg-rose-200 sm:max-w-[425px]">
                      <DialogHeader>
                          <DialogTitle>Delete Product</DialogTitle>
                          <DialogDescription>
                            <p class="text-base font-medium">Are you sure want to delete {{product.name}}?</p>
                          </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" class="text-white bg-red-500" type="submit" @click="deleteData(product.id)">Yes</Button>
                        <DialogClose as-child>
                          <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <Icon class="z-50" size="16" name="bytesize:cart"/>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>