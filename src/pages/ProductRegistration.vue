<template>
    <div>
        <div class="lg:flex justify-between items-center mb-6">
            <button @click="openModal"
                class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">
                Add Product
            </button>
        </div>

        <!-- Include the ModalComponent -->
        <AddProductModal :isModalOpen="isModalOpen" :product-name.sync="productName"
            :product-description.sync="productDescription" :product-price.sync="productPrice"
            :initial-stock.sync="initialStock" @close-modal="closeModal" @submit-form="submitForm"></AddProductModal>

        <!-- Product Listing -->
        <div>
            <h2 class="text-2xl font-semibold mb-4">Product Listing</h2>
            <ul>
                <li v-for="(product, index) in products" :key="index">
                    <h3 class="text-lg">{{ product.name }}</h3>
                    <p>Description: {{ product.description }}</p>
                    <p>Price: ${{ product.price }}</p>
                    <p>Stock: {{ product.stock }}</p>
                    <!-- Add more product details here -->
                </li>
            </ul>
        </div>
        <!-- End Product Listing -->


    </div>
</template>
  
<script>
import AddProductModal from "../components/AddProductModal.vue";

export default {
    components: {
        AddProductModal,
    },
    data() {
        return {
            isModalOpen: false,
            productName: "",
            productDescription: "",
            productPrice: "",
            initialStock: "",
            products: [], // Array to store products
            // Add more data properties as needed for image upload
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        submitForm(formData) {
            // Handle the form submission data here (e.g., make an API request to add the product)
            // You can replace this console.log with your actual logic
            console.log("Form data submitted:", formData);

            const newProduct = {
                name: formData.productName,
                description: formData.productDescription,
                price: formData.productPrice,
                stock: formData.initialStock,
                // Add more properties as needed
            };
            this.products.push(newProduct);

            this.$toasted.success('Product added successfully', {
                duration: 2000,
                position: 'top-right',
            });

            // Close the modal after form submission
            this.closeModal();

        },
    },
};
</script>
  
<style></style>
  