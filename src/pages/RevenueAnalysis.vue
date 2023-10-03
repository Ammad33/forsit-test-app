<template>
  <div id="home">
    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Good afternoon</p>
      <button
        class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        View Logs
      </button>
    </div>

    <div class="flex flex-wrap -mx-3 mb-20">
      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
        >
          <span
            style="font-size: 60px"
            class="fill-current mr-4 hidden lg:block material-symbols-outlined"
          >
            order_approve
          </span>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">299</p>
            <p>Total Orders</p>
          </div>
        </div>
      </div>
      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
        >
          <span
            style="font-size: 60px"
            class="fill-current mr-4 hidden lg:block material-symbols-outlined"
          >
            finance
          </span>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">177</p>
            <p>Sales (Revenue)</p>
          </div>
        </div>
      </div>
      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
        >
          <span
            style="font-size: 60px"
            class="fill-current mr-4 hidden lg:block material-symbols-outlined"
          >
            inventory
          </span>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">3</p>
            <p>Products</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3">
      <div class="w-full xl:w-2/6 px-3">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xl font-semibold mb-0">Recent Sales</p>
          <select
            v-model="selectedMonth"
            @change="updateMonth"
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            v-model="selectedFilter"
            @change="updateChartData"
            class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Annually</option>
          </select>
        </div>
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <ChartComponent :key="selectedFilter" :chart-data="filteredChartData">
          </ChartComponent>
        </div>
      </div>

      <div class="w-full xl:w-2/6 px-3">
        <p class="text-xl font-semibold mb-6">Recent Reviews</p>
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <ChartComponent :chart-data="reviewsData"></ChartComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import ChartComponent from "../components/Chart.vue";
import RevenueService from "../services/RevenueService.js";

export default {
  name: "DashboardHome",
  components: {
    ChartComponent, // Register the Chart component
  },
  data() {
    return {
      buyersData: {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Orders",
              backgroundColor: "rgba(99,179,237,0.4)",
              strokeColor: "#63b3ed",
              pointColor: "#fff",
              pointStrokeColor: "#63b3ed",
              data: this.chartData,
            },
            {
              label: "Sales",
              backgroundColor: "rgba(198,198,198,0.4)",
              strokeColor: "#f7fafc",
              pointColor: "#fff",
              pointStrokeColor: "#f7fafc",
              data: this.chartData,
            },
          ],
        },
        options: {
          legend: {
            display: true,
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      },
      reviewsData: {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              backgroundColor: "rgba(99,179,237,0.4)",
              strokeColor: "#63b3ed",
              pointColor: "#fff",
              pointStrokeColor: "#63b3ed",
              data: [203, 156, 99, 251, 305, 247, 256],
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      },
      selectedFilter: "daily", // Default filter is "Weekly"
      selectedMonth: "1",
      products: products,
      chartData: [],
    };
  },
  computed: {
    filteredChartData() {
      // Use this computed property to filter chart data based on the selected filter
      if (this.selectedFilter === "month") {
        const monthlyLabels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return {
          ...this.buyersData,
          data: {
            labels: monthlyLabels,
            datasets: this.buyersData.data.datasets,
          },
        };
      } else if (this.selectedFilter === "year") {
        const annualLabels = [
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
        ];
        return {
          ...this.buyersData,
          data: {
            labels: annualLabels,
            datasets: this.buyersData.data.datasets,
          },
        };
      } else if (this.selectedFilter === "weekly") {
        const weeklyLabels = ["week 1", "week 2", "week 3", "week 4", "week 5"];
        return {
          ...this.buyersData,
          data: {
            labels: weeklyLabels,
            datasets: this.buyersData.data.datasets,
          },
        };
      }
      // By default, return data for the weekly view
      return this.buyersData;
    },
  },
  methods: {
    async updateMonth() {},
    async updateChartData() {
      try {
        const orderSaleData = await RevenueService.getOrderSale(
          this.selectedFilter,
          this.selectedMonth
        );

        this.buyersData.data.datasets[0].data = orderSaleData.dataset; // assuming dataset is an array
        this.drawCharts();
        // Now update your chart data using the fetched orderSaleData
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    },
    drawCharts() {
      new Chart(document.getElementById("buyers-chart"), this.buyersData);
      // Add more chart drawing as needed
    },
  },
  async created() {
    try {
      const orderSaleData = await RevenueService.getOrderSale(
        this.selectedFilter,
        this.selectedMonth
      );

      this.buyersData.data.datasets[0].data = orderSaleData.dataset; // assuming dataset is an array
      this.drawCharts();
      // Now update your chart data using the fetched orderSaleData
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  },
  mounted() {
    new Chart(document.getElementById("buyers-chart"), this.buyersData);
    new Chart(document.getElementById("reviews-chart"), this.reviewsData);
    this.updateChartData();
  },
};
</script>