<script>
export default {
    name: 'CategoriesList',
    data: () => ({
    }),
    methods: {
    },
}
</script>

<template>
    <!--Lista Categorie-->
    <!-- <div>
        <input type="checkbox" :value="category.id" v-model="selectedCategories"
            @change="$emit('filteredRestaurants', selectedCategories)">
        <label>{{ category.label }}</label>
    </div> -->
</template>

<style lang="scss" scoped>
ul {
    display: flex;
    padding: 20px 0px;
}
</style>