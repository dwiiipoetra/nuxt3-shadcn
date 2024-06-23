<script setup>
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useToast } from '@/components/ui/toast/use-toast'
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
  <div class="grid w-full gap-2">
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

      <FormField v-slot="{ componentField }" name="gender">
        <FormItem>
          <FormLabel>Timezone</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">
                      Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="cst">
                      Central Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="mst">
                      Mountain Standard Time (MST)
                    </SelectItem>
                    <SelectItem value="pst">
                      Pacific Standard Time (PST)
                    </SelectItem>
                    <SelectItem value="akst">
                      Alaska Standard Time (AKST)
                    </SelectItem>
                    <SelectItem value="hst">
                      Hawaii Standard Time (HST)
                    </SelectItem>
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel>Europe & Africa</SelectLabel>
                    <SelectItem value="gmt">
                      Greenwich Mean Time (GMT)
                    </SelectItem>
                    <SelectItem value="cet">
                      Central European Time (CET)
                    </SelectItem>
                    <SelectItem value="eet">
                      Eastern European Time (EET)
                    </SelectItem>
                    <SelectItem value="west">
                      Western European Summer Time (WEST)
                    </SelectItem>
                    <SelectItem value="cat">
                      Central Africa Time (CAT)
                    </SelectItem>
                    <SelectItem value="eat">
                      East Africa Time (EAT)
                    </SelectItem>
                  </SelectGroup>
                  
                  <SelectGroup>
                    <SelectLabel>Asia</SelectLabel>
                    <SelectItem value="msk">
                      Moscow Time (MSK)
                    </SelectItem>
                    <SelectItem value="ist">
                      India Standard Time (IST)
                    </SelectItem>
                    <SelectItem value="cst_china">
                      China Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="jst">
                      Japan Standard Time (JST)
                    </SelectItem>
                    <SelectItem value="kst">
                      Korea Standard Time (KST)
                    </SelectItem>
                    <SelectItem value="ist_indonesia">
                      Indonesia Central Standard Time (WITA)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </FormControl>
            </Select>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button variant="outline" type="submit">Submit</Button>
    </form>
  </div>
</template>