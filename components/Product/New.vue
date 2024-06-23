<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import useHelpers from '@/composables/useHelpers'
const { loading, open } = useHelpers()

const createNewProduct = () => {
    console.log('loading', loading.value);
    console.log('open', open.value);
    // try {
    //     loading.value = true
    // } catch (error) {
    //     loading.value = true
    // } finally {
    //     loading.value = false
    //     open.value = false
    // }
}
</script>

<template>
  <AlertDialog :open="open">
    <AlertDialogTrigger>
        <Button variant="outline" @click="open = true">Add a new product</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Create a new product</AlertDialogTitle>
        <AlertDialogDescription>
          <Input placeholder="Input a product name"/>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="open = false">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="createNewProduct">Create</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>