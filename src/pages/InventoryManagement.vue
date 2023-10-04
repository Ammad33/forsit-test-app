<template>
  <ag-grid-vue
    class="full-screen-grid ag-theme-alpine"
    :gridOptions="gridOptions"
    :columnDefs="columnDefs"
    :rowData="rowData"
  >
  </ag-grid-vue>
</template>
  
<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";

export default {
  name: "App",
  data() {
    return {
      columnDefs: null,
      rowData: null,
    };
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.columnDefs = [
      { field: "title", sortable: true, filter: true, resizable: true, suppressSizeToFit: true, width: 500  },
      { field: "price", sortable: true, filter: true, resizable: true, suppressSizeToFit: true , width: 300 },
      { field: "description", sortable: true, filter: true, resizable: true, suppressSizeToFit: true, width: 200  },
      { field: "category", sortable: true, filter: true, resizable: true, suppressSizeToFit: true, width: 200  },
      {
        headerName: "Rating",
        field: "rating",
        sortable: true,
        filter: true,
        width: 200,
        suppressSizeToFit: true ,
        resizable: true,
        cellRenderer: (params) => {
          // Extract the rate and count from the rating object
          const { rate, count } = params.value;

          // Customize how you want to display the rating
          return `${rate} (${count} reviews)`;
        },
      },
    ];

    this.gridOptions = {
      domLayout: "autoWidth", // Automatically adjust the grid height
    };

    fetch("https://fakestoreapi.com/products")
      .then((result) => result.json())
      .then((rowData) => (this.rowData = rowData));
  },
};
</script>

<style>
.full-screen-grid {
  width: 100%;
  height: 100vh; /* 100% of viewport height */
}
</style>