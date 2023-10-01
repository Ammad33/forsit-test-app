<template>
    <ag-grid-vue class="full-screen-grid ag-theme-alpine" :gridOptions="gridOptions"  :columnDefs="columnDefs" :rowData="rowData">
    </ag-grid-vue>
</template>
  
<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import 'ag-grid-enterprise';   
import data from '../dummy-data/products' 

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
       { field: 'make', sortable: true, filter: true, width: 220 },
       { field: 'model', sortable: true, filter: true, width: 220 },
       { field: 'price', sortable: true, filter: true, width: 220 },
       { field: 'price', sortable: true, filter: true, width: 220 },
       { field: 'price', sortable: true, filter: true, width: 220 },
       { field: 'price', sortable: true, filter: true, width: 220 }
       
     ];

     this.rowData = data;

    //  fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //          .then(result => result.json())
    //          .then(rowData => this.rowData = rowData);
   }
};
</script>

<style>
.full-screen-grid {
  width: 100%;
  height: 100vh; /* 100% of viewport height */
}
</style>