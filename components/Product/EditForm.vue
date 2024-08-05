<style scoped>
.text-destructive {
  color: red
}
</style>

<script setup>
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useToast } from '@/components/ui/toast'
const { toast } = useToast()

// define props product id
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

// validate form
const formSchema = toTypedSchema(z.object({
    name: z.string().min(5).max(50),
    description: z.string().min(10).max(300),
    price: z.number().min(100000).max(10000000),
    stock: z.number().min(1).max(1000),
}))

// call useProductsStore()
const productStore = useProductsStore()

// make state product (store) as computed value
const editedProduct = computed(() => productStore.product)

// call getProduct API
const getDataForm = (productID) => {
    productStore.getProduct(productID)
}

// validate form before submit
const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

// if form validated then submit form and call updateProduct API
const onSubmit = handleSubmit(() => {
    // console.log(editedProduct.value);
    productStore.updateProduct(editedProduct.value)
})
</script>
<template>
    <Dialog>
        <DialogTrigger as-child>
        <Button @click="getDataForm(id)" class="border-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <Icon class="z-50" size="16" name="mynaui:edit-one"/>
        </Button>
        </DialogTrigger>
        <DialogContent class="bg-gray-100 sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>{{editedProduct.name}}</DialogDescription>
            </DialogHeader>

            <form class="w-full space-y-6" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                        <Input :defaultValue="editedProduct.name" v-model="editedProduct.name" type="text" placeholder="Type product name here..." v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea :defaultValue="editedProduct.description" v-model="editedProduct.description" placeholder="Type your description here..." v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                    <FormLabel>Price (IDR)</FormLabel>
                    <FormControl>
                        <Input :defaultValue="editedProduct.price" v-model="editedProduct.price" type="number" placeholder="IDR 250.000,00" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="stock">
                    <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                        <Input :defaultValue="editedProduct.stock" v-model="editedProduct.stock" type="number" placeholder="0" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                </FormField>

                <Button variant="outline" type="submit">Save changes</Button>
            </form>
            
            <!-- <DialogFooter>
                <Button type="submit">
                Save changes
                </Button>
            </DialogFooter> -->
        </DialogContent>
    </Dialog>
</template>