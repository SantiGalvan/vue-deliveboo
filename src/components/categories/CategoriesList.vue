<script>
export default {
    name: 'CategoriesList',
    props: { categories: Array },
    data: () => ({
    }),
    methods: {
    },
}
</script>

<template>
    <!--Lista Categorie-->
    <ul class="d-flex list-unstyled gap-3 justify-content-center flex-wrap py-5">
        <!--Categoria-->
        <RouterLink :to="{ name: 'category-restaurants', params: { id: category.id } }" v-for="category in categories"
            :key="category.id" @click="$emit('get-restaurants', category.id)" class="text-decoration-none text-dark">
            <li>
                {{ category.label }}
            </li>
        </RouterLink>
    </ul>
</template>

<style></style>