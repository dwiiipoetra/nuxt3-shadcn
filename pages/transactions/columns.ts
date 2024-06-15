import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }:any) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }:any) => {
        const name = row.getValue('name')
        return h('div', { class:'text-left font-medium' }, name)
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }:any) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }:any) => {
      const email = row.getValue('email')
      return h('div', { class: 'text-left font-medium' }, email)
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-left' }, 'Amount'),
    cell: ({ row }:any) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount)
      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }:any) => {
      const status = row.getValue('status')
      return h('div', { class: 'text-left font-medium' }, status.toUpperCase())
    },
  }
]