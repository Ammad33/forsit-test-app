<template>
  <div>
    <div class="lg:flex justify-between items-center mb-6">
      <button
        @click="openModal"
        class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow"
      >
        Add Product
      </button>
    </div>

    <!-- Include the ModalComponent -->
    <AddProductModal
      :isModalOpen="isModalOpen"
      :name.sync="name"
      :description.sync="description"
      :price.sync="price"
      :initialStocklevel.sync="initialStockLevel"
      @close-modal="closeModal"
      @submit-form="submitForm"
    ></AddProductModal>
    <!-- Product Listing -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Product Listing</h2>
      <ul>
        <li
          v-for="(product, index) in products"
          :key="index"
          class="mb-6 p-4 border rounded-lg shadow-md relative"
        >
          <div class="justify-between flex items-center mb-2">
            <h3 class="text-lg font-semibold ml-2">{{ product.name }}</h3>
            <div>
              <span
                @click="openEditModal(product)"
                class="material-symbols-outlined update-icon hover:bg-green-600 text-red font-semibold rounded-lg px-2 py-1 mr-2 focus:outline-none"
              >
                Edit
              </span>
              <span
                @click="deleteProduct(product)"
                class="material-symbols-outlined delete-icon hover:bg-red-600 text-red font-semibold rounded-lg px-2 py-1 focus:outline-none"
              >
                Delete
              </span>
            </div>
          </div>
          <div class="flex items-center">
            <p class="text-gray-800 font-semibold">Price:</p>
            <p class="ml-2">$ {{ product.price }}</p>
          </div>
          <div class="flex">
            <p class="text-gray-800 font-semibold">Description:</p>
            <p>{{ product.description }}</p>
          </div>
          <div class="flex items-center">
            <p class="text-gray-800 font-semibold">Initial Stock Level:</p>
            <p>{{ product.initialStockLevel }}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- End Product Listing -->
    <EditProductModel
      :isEditModalOpen="isEditModalOpen"
      :selectedProduct="selectedProduct"
      @close-edit-modal="closeEditModal"
      @submit-update-form="submitUpdateForm"
    ></EditProductModel>
    <!-- End Update Product Modal -->
  </div>
</template>
  
<script>
import AddProductModal from "../components/AddProductModal.vue";
import EditProductModel from "../components/EditProductModal.vue";
import productService from "@/services/productService"; // Import the service

export default {
  components: {
    AddProductModal,
    EditProductModel,
  },
  data() {
    return {
      isModalOpen: false,
      isEditModalOpen: false,
      name: "",
      description: "",
      price: "",
      initialStockLevel: "",
      products: [],
      selectedProduct: null,
      // Add more data properties as needed for image upload
    };
  },
  async created() {
    try {
      this.products = await productService.getProducts();
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      this.$toasted.error("Failed to load products", {
        duration: 2000,
        position: "top-right",
      });
    }
  },
  methods: {
    openEditModal(product) {
      // Set the selected product and open the edit modal
      this.selectedProduct = product;
      this.isEditModalOpen = true;
    },
    openModal() {
      this.isModalOpen = true;
    },
    // openEditModal(){
    //     this.isEditModalOpen = true;
    // },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async submitForm(formData) {
      try {
        const newProduct = await productService.addProduct(formData);
        this.products.unshift(newProduct);
        this.$toasted.success("Product added successfully", {
          duration: 2000,
          position: "top-right",
        });
        this.closeModal();
      } catch (error) {
        console.error("An error occurred while adding the product:", error);
        this.$toasted.error("Failed to add product", {
          duration: 2000,
          position: "top-right",
        });
      }
    },
    async submitUpdateForm(updatedProductData) {
      try {
        // Ensure that the 'id' from the 'selectedProduct' is attached to the update data.
        updatedProductData.id = this.selectedProduct.id;
        const updatedProduct = await productService.updateProduct(
          updatedProductData
        );

        const index = this.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        this.$set(this.products, index, updatedProduct);
        this.$toasted.success("Product updated successfully", {
          duration: 2000,
          position: "top-right",
        });
        this.closeEditModal();
      } catch (error) {
        console.error("An error occurred while updating the product:", error);
        this.$toasted.error("Failed to update product", {
          duration: 2000,
          position: "top-right",
        });
      }
    },
  },
};
</script>
  
<style>
.delete-icon {
  color: #d11a2a;
}

.update-icon {
  color: #71bc68;
}

.delete-icon:hover,
.update-icon:hover {
  color: white;
  cursor: pointer;
}
</style>
  