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
    <ul class="list-unstyled gap-3 justify-content-center flex-wrap">
        <RouterLink :to="{ name: 'restaurants' }" @click="$emit('get-restaurants', null)"
            class="text-decoration-none text-dark">
            <li>Tutti</li>
        </RouterLink>
        <!--Categoria-->
        <RouterLink :to="{ name: 'category-restaurants', params: { slug: category.slug } }"
            v-for="category in categories" :key="category.id" @click="$emit('get-restaurants', category.slug)"
            class="text-decoration-none text-dark">
            <li>
                {{ category.label }}
            </li>
        </RouterLink>
    </ul>
</template>

<style lang="scss" scoped>
ul {
    display: flex;
    padding: 30px 0px;
}

/*************** SOPRA I 992 PX (lg)********************/
@media screen and (min-width:992px) {

    /* LA SIDE BAR AUMENTA DI LARGHEZZA*/
    ul {
        display: block;

        li {
            border-bottom: 1px solid #E4E4E4;
            padding: 5px 0px;
        }
    }
}
</style>