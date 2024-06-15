<script setup>
let props = defineProps(["currentCategory","data"]);
// console.log("PROPS", props.currentCategory, props.data);
let data = props.data || [];
let currentCategory = props.currentCategory || "today"

let categories = ref({
    'today': ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
    'week': ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    'month': Array.from({ length: 31 }, (_, i) => i + 1),
    'year': ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
})
let options = computed(() => ({
    chart: {
        type: 'line',
        animation: {
            enabled: false
        }
    },
    legend: {
        enabled: false
    },
    title: {
        text: ''
    },
    xAxis: {
        gridLineColor: 'transparent',
        categories: categories.value[currentCategory]
        },
    yAxis: {
        gridLineColor: 'transparent',
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            marker: {
                enabled: false
            },
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: true
        }
    },
    series: [{
        name: 'line',
        lineWidth: '4px',
        color: {
            linearGradient: {},
            stops: [
                [0, 'rgba(176, 40, 145, 0.8)'],
                [0.25, 'rgba(30, 193, 205, 0.59)'],
                [0.5, 'rgba(235, 241, 41, 0.59)'],
                [1, 'rgba(120, 25, 228, 0.59)']
            ]
        },
        data: data
    }]
}))
</script>

<template>
    <div class="border rounded-lg p-4">
        <highchart :options="options" />
    </div>
</template>