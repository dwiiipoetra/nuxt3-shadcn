<script setup>
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const props = defineProps(['card'])
</script>

<template>
    <Card>
        <CardHeader class="px-4 pt-4 pb-2">
            <div class="flex justify-between items-center">
                <p>{{ card.title }}</p>
                <Badge class="bg-green-400">{{ '+' + card.progression + '%' }}</Badge>
            </div>
        </CardHeader>

        <CardContent class="flex items-center justify-end border-b pt-0 pb-2 px-4">
            <div class="text-[48px] font-[800]">
                <span class="text-neutral-300">$</span>
                <span>{{ card.amount }}</span>
            </div>
        </CardContent>
        
        <CardFooter class="flex px-2 py-2 gap-2 justify-between">
            <div class="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center">
                <Icon size="20" :name="card.icon"/>
            </div>
            <p class="grow text-xs">{{ card.description }}</p>
            <Button variant="outline">{{ card.label }}</Button>
        </CardFooter>
    </Card>
</template>