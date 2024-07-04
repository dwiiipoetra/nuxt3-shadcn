<style scoped>
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
    username: z.string().min(5).max(50),
    email: z.string().email(),
    bio: z.string().min(20).max(200),
    url: z.string().url()
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
            <p>Fill and complete your profile</p>
            <h1>Account</h1>
        </div>
    </header>
    <form class="w-2/3 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Username" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public username.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Email" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea placeholder="Type your bio here..." v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public bio.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="url">
        <FormItem>
          <FormLabel>URL</FormLabel>
          <FormControl>
            <Input type="url" placeholder="Url" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            You can add URL.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button variant="outline" type="submit">Submit</Button>
    </form>
  </div>
</template>