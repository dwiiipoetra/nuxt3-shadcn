<style scoped>
.text-destructive {
  color: red
}
</style>

<script setup>
// definePageMeta({
//   middleware: ['auth']
// })

import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

const productsStore = useProductsStore()

const formSchema = toTypedSchema(z.object({
    name: z.string().min(5).max(50),
    description: z.string().min(10).max(300),
    price: z.number().min(100000).max(10000000),
    stock: z.number().min(1).max(1000),
}))

const form = reactive({
    name: "",
    description: "",
    price: "",
    stock: ""
})

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(() => {
    productsStore.addProduct(form)
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
            <Input v-model="form.name" type="text" placeholder="Type product name here..." v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea v-model="form.description" placeholder="Type your description here..." v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price (IDR)</FormLabel>
          <FormControl>
            <Input v-model="form.price" type="number" placeholder="IDR 250.000,00" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="stock">
        <FormItem>
          <FormLabel>Stock</FormLabel>
          <FormControl>
            <Input v-model="form.stock" type="number" placeholder="0" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button variant="outline" type="submit">Submit</Button>
    </form>
  </div>
</template>