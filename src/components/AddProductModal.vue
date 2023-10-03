<template>
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"> </div>
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <!-- Modal Header -->
                <div class="modal-header p-4 bg-blue-500 text-white">
                    <h2 class="text-2xl font-semibold">Add Product</h2>
                    <button @click="closeModal"
                        class="modal-close absolute top-0 right-0 mt-2 mr-2 text-white hover:text-gray-400 cursor-pointer">
                        <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path class="heroicon-ui"
                                d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z">
                            </path>
                        </svg>
                    </button>
                </div>
                <!-- End Modal Header -->

                <!-- Add Product Form -->
                <form class="p-4" @submit.prevent="submitForm">
                    <!-- Product Name -->
                    <div class="mb-4">
                        <label for="productName" class="block text-gray-600">Product Name:</label>
                        <input type="text" id="productName"
                            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                            v-model="name" required />
                    </div>

                    <!-- Description -->
                    <div class="mb-4">
                        <label for="productDescription" class="block text-gray-600">Description:</label>
                        <textarea id="productDescription"
                            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                            v-model="description"></textarea>
                    </div>

                    <!-- Price -->
                    <div class="mb-4">
                        <label for="productPrice" class="block text-gray-600">Price:</label>
                        <input type="number" id="productPrice"
                            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                            v-model="price" required />
                    </div>

                    <!-- Initial Stock Level -->
                    <div class="mb-4">
                        <label for="initialStock" class="block text-gray-600">Initial Stock Level:</label>
                        <input type="number" id="initialStock"
                            class="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                            v-model="initialStockLevel" required />
                    </div>

                    <!-- Image Upload -->
                    <div class="mb-4">
                        <label for="productImage" class="block text-gray-600">Product Image:</label>
                        <input type="file" id="productImage" class="w-full" @change="handleImageUpload" />
                    </div>

                    <!-- Submit and Cancel Buttons -->
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="mr-2 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-full focus:outline-none">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isSubmitDisabled"
                            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full focus:outline-none">
                            Add Product
                        </button>
                    </div>
                </form>
                <!-- End Add Product Form -->
            </div>
    </div>
</template>
  
<script>
export default {
    props: {
        isModalOpen: Boolean,
        name: String,
        description: String,
        price: String,
        initialStockLevel: String,
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        submitForm() {
            // Implement logic to submit the form and add the product
            // You can emit an event to the parent component to handle the submission
            this.$emit('submit-form', {
                name: this.name,
                description: this.description,
                price: this.price,
                initialStockLevel: this.initialStockLevel,
                // Add more data properties as needed for image upload
            });
        },
        handleImageUpload() {
            // Implement logic to handle image upload here
            // Access the selected image using event.target.files[0]
        },
    },
};
</script>
  
<style></style>
  