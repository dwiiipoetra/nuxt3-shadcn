<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { columns } from './columns'

const data = ref<any>([])

function generateRandomData(countNumber: number) {
    const names = ['Dwi Putra', 'Susi Susanti', 'Taufik Hidayat', 'Budi Santoso', 'Rocky Gerung']
    const statuses = ['pending', 'processing', 'completed']
    const emails = ['dwi@gmail.com', 'putra@gmail.com', 'budi@gmail.com', 'agus@gmail.com']
    const randomData: any[] = []

    for (let i = 0; i < countNumber; i++) {
        const id = Math.random().toString(36).substr(2,8)
        const name = names[Math.floor(Math.random() * names.length)]
        const amount = Math.floor(Math.random() * 1000000) + 4000000
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const email = emails[Math.floor(Math.random() * emails.length)]
        
        randomData.push({ id,name,amount,status,email })
    }
    return data.value = randomData
}
onMounted(() => {
    generateRandomData(20)
})
</script>

<template>
    <div class="grid w-full gap-4">
        <header class="flex items-start justify-between">
            <div class="grow">
                <p>All your transactions</p>
                <h1>Transactions</h1>
            </div>
        </header>
        <DataTable :columns="columns" :data="data"/>
    </div>
</template>