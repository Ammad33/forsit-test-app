import axios from "axios";

export default {
    getProducts() {
        return axios.get("http://localhost:3000/products").then(response => response.data);
    },
     async getProductsCount() {
        const response = await axios.get("http://localhost:3000/products");
        return response.data.length;
    },
    addProduct(product) {
        return axios.post("http://localhost:3000/products", product).then(response => response.data);
    },
    updateProduct(product) {
        // Assuming the product object has an `id` property
        return axios.put(`http://localhost:3000/products/${product.id}`, product).then(response => response.data);
    },

    async deleteProduct(productId) {
        try {
            // Send DELETE request to your API endpoint
            const response = await axios.delete(`http://localhost:3000/products/${productId}`);
            return response.data;
        } catch (error) {
            console.error("An error occurred while deleting the product:", error);
            throw error;
        }
    },
};