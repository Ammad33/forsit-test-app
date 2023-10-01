<template>
    <div>
        <canvas ref="chart" :width="width" :height="height"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js';

export default {
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        width: {
            type: Number,
            default: 600,
        },
        height: {
            type: Number,
            default: 400,
        },
    },
    mounted() {
        const ctx = this.$refs.chart.getContext('2d');
        new Chart(ctx, this.chartData);
    },
};
</script>
  