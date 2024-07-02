<!-- <style scoped>
.text-destructive {
  color: red
}
</style>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
    name: z.string().min(5).max(50),
    description: z.string().min(10).max(300),
    price: z.number().min(100000).max(10000000),
    stock: z.number().min(1).max(1000),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
        <div class="grow">
            <p>Add product here</p>
            <h1>Products</h1>
        </div>
    </header>
    <form class="w-2/3 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Type product name here..." v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Type your description here..." v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price (IDR)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="IDR 250.000,00" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="stock">
        <FormItem>
          <FormLabel>Stock</FormLabel>
          <FormControl>
            <Input type="number" placeholder="0" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button variant="outline" type="submit">Submit</Button>
    </form>
  </div>
</template> -->

<script setup>
import useHelpers from '@/composables/useHelpers'
const { excerptWord, currencyFormat } = useHelpers()

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.getAllProducts()
})
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
        <div class="grow">
            <p>All your products</p>
            <h1>Products</h1>
        </div>
    </header>

    <div class="flex flex-wrap">
      <div v-for="product in productsStore.products" :key="product.id" class="w-full md:w-1/3 px-2 mb-4">
        <div class="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
          <a href="#">
              <img class="rounded-t-lg" src="/product.jpg" alt="" />
          </a>
          
          <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{{ product.name }} | ({{ product.stock }} pcs)</h5>
            </a>
            
            <p class="mb-3 font-normal text-gray-400">{{ excerptWord(product.description) }}</p>
          
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-white">{{ currencyFormat(product.price) }}</span>
              <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>