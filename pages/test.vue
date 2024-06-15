import { SidebarMenu } from '../.nuxt/components';
<script setup lang="ts">
definePageMeta({
    layout: 'custom'
})
</script>

<template>
<div>
    <SidebarMenu/>
    <slot />
</div>
</template>