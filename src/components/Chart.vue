<template>
    <div>
      <canvas ref="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from "chart.js";
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        chartInstance: null,  // Instance to store the Chart.js object
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        // Destroy the previous instance if it exists
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
  
        // Create a new instance
        this.chartInstance = new Chart(this.$refs.myChart, this.chartData);
      },
    },
    watch: {
      chartData: {
        handler() {
          this.renderChart();
        },
        deep: true,
      },
    },
  };
  </script>
  