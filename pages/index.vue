<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useRouter } from 'vue-router'
const router = useRouter()

const axios = useNuxtApp().$axios
const userStore = useUserStore()

const data = ref([])

const list = [
    {
        title: "Today",
        // component: resolveComponent("TabsToday")
    },
    {
        title: "Week",
    },
    {
        title: "Month",
    },
    {
        title: "Year",
    }
]

const currentCategory = ref('today')

const generateRandomNumber = (countNumber) => {
    const val = []
    for (let i = 0; i < countNumber; i++) {
        val.push(Math.floor(Math.random() * 55))
    }
    data.value = val
    return val
}

const setCategory = (e) => {
    let val = e.target.innerText.toLowerCase()
    currentCategory.value = val
    // console.log(categories.value[currentCategory.value]);
    if (val === 'today') generateRandomNumber(24)
    if (val === 'week') generateRandomNumber(7)
    if (val === 'month') generateRandomNumber(31)
    if (val === 'year') generateRandomNumber(365)
}

const cards = [
    {
        title: "Sales",
        progression: 12,
        amount: 1244.43,
        label: "View sales",
        description: "Sales of March 2024",
        icon:"solar:ticket-sale-outline"
    },
    {
        title: "Refunds",
        progression: 8,
        amount: 84.44,
        label: "View refunds",
        description: "Refunds since beginning of year",
        icon: "heroicons-outline:receipt-refund"
    },
    {
        title: "Payouts",
        progression: 14,
        amount: 899.99,
        label: "View payouts",
        description: "Payouts of this week",
        icon: "tabler:zoom-money"
    }
]

onMounted(() => {
        generateRandomNumber(24)
})
</script>

<template>
<div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
        <div class="grow">
            <!-- <img src="/54_lete_a.jpg" alt=""> -->
            <!-- <p>Hi, Welcome {{ userStore.user?.user.name }}</p> -->
            <h1>Overview</h1>
            <h1>{{userStore.user}}</h1>
        </div>

        <ProductNew/>
    </header>
    <main class="grid gap-4">
        <Tabs default-value="Today" @click="setCategory">
            <TabsList class="max-w-[400px]">
                <TabsTrigger v-for="(item, index) in list" :key="index" :value="item.title">
                    {{item.title}}
                </TabsTrigger>
            </TabsList>
            <TabsContent class="w-[100%]" v-for="(item, index) in list" :key="index" :value="item.title">
                <Chart v-if="data.length > 0" :currentCategory="currentCategory" :data="data" />
            </TabsContent>
        </Tabs>
    </main>
    <footer>
        <div class="grid lg:grid-cols-3 gap-4">
            <Card v-for="(item, index) in cards" :key="index" :card="item"></Card>
        </div>
    </footer>
</div>
</template>