<template>
  <div
    v-if="isEditModalOpen"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>
    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <!-- Modal Header -->
      <div class="modal-header p-4 bg-blue-500 text-white">
        <h2 class="text-2xl font-semibold">Update Product</h2>
        <button
          @click="closeEditModal"
          class="modal-close absolute top-0 right-0 mt-2 mr-2 text-white hover:text-gray-400 cursor-pointer"
        >
          <svg
            class="fill-current h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              class="heroicon-ui"
              d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z"
            ></path>
          </svg>
        </button>
      </div>
      <!-- End Modal Header -->
      <!-- Update Product Form -->
      <form class="p-4" @submit.prevent="submitUpdateForm">
        <!-- Product Name -->
        <div class="mb-4">
          <label for="updateProductName" class="block text-gray-600"
            >Product Name:</label
          >
          <input
            type="text"
            id="updateProductName"
            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
            v-model="updatedProduct.name"
            required
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="updateProductDescription" class="block text-gray-600"
            >Description:</label
          >
          <textarea
            id="updateProductDescription"
            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
            v-model="updatedProduct.description"
          ></textarea>
        </div>

        <!-- Price -->
        <div class="mb-4">
          <label for="updateProductPrice" class="block text-gray-600"
            >Price:</label
          >
          <input
            type="number"
            id="updateProductPrice"
            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
            v-model="updatedProduct.price"
            required
          />
        </div>

        <!-- Initial Stock Level -->
        <div class="mb-4">
          <label for="updateInitialStock" class="block text-gray-600"
            >Initial Stock Level:</label
          >
          <input
            type="number"
            id="updateInitialStock"
            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
            v-model="updatedProduct.initialStockLevel"
            required
          />
        </div>

        <!-- Image Upload -->
        <div class="mb-4">
          <label for="updateProductImage" class="block text-gray-600"
            >Product Image:</label
          >
          <input
            type="file"
            id="updateProductImage"
            class="w-full"
            @change="handleUpdateImageUpload"
          />
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeEditModal"
            class="mr-2 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-full focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isUpdateSubmitDisabled"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  
<script>
export default {
  props: {
    isEditModalOpen: Boolean,
    selectedProduct: Object, // The selected product to update
  },
  data() {
    return {
      updatedProduct: {
        name: "",
        description: "",
        price: "",
        initialStockLevel: "",
      },
    };
  },
  watch: {
    // Watch for changes in the selected product and update form fields accordingly
    selectedProduct: {
      handler(newVal) {
        if (newVal) {
          this.updatedProduct.name = newVal.name || "";
          this.updatedProduct.description = newVal.description || "";
          this.updatedProduct.price = newVal.price || "";
          this.updatedProduct.initialStockLevel =
            newVal.initialStockLevel || "";
        }
      },
      immediate: true,
    },
  },
  methods: {
    closeEditModal() {
      this.$emit("close-edit-modal");
    },
    submitUpdateForm() {
      if (!this.selectedProduct) {
        return; // Guard clause to prevent submitting without a selected product
      }
      // Implement logic to submit the update form and update the product
      // You can emit an event to the parent component to handle the submission
      this.$emit("submit-update-form", this.updatedProduct);
    },
    handleUpdateImageUpload() {
      // Implement logic to handle image upload in the update modal
      // Access the selected image using event.target.files[0]
    },
  },
};
</script>

  <style></style>
  