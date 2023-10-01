<template>
    <div>
        <!-- Button to trigger success toast -->
        <button @click="showSuccessToast">Show Success Toast</button>

        <!-- Button to trigger error toast -->
        <button @click="showErrorToast">Show Error Toast</button>
    </div>
</template>
  
<script>
export default {
    methods: {
        showSuccessToast() {
            this.$toasted.success('Success message', {
                duration: 2000, // Display duration in milliseconds
                position: 'top-right', // Toast position
            });
        },
        showErrorToast() {
            this.$toasted.error('Error message', {
                duration: 2000,
                position: 'top-right',
            });
        },
    },
};
</script>
  