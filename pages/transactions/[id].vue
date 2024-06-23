<script setup>
const route = useRoute()
const nuxt = useNuxtApp()
// console.log(nuxt);
</script>

<template>
    <div>
        Back to <nuxt-link class="text-red-500" :to="{name:'transactions'}">Transactions</nuxt-link>
    </div>
</template>