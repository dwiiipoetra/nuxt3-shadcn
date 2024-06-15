<script setup>
const name = ref('Dwi Waluyo Putranto')
const desc = ref('Frontend Developer')
</script>

<template>
    <div class="flex items-center justify-start gap-2 p-2 m-2 border rounded cursor-pointer hover:bg-neutral-50 transition">
        <div class="w-10 h-10 bg-green-500 flex items-center justify-center font-bold text-white rounded-full">
            {{ name[0] }}
        </div>
        <div>
            <p class="m-0 text-sm text-black font-bold leading-1">{{ name }}</p>
            <p class="m-0 text-xs">{{ desc }}</p>
        </div>
    </div>
</template>