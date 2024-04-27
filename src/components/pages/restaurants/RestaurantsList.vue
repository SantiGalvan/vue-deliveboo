<script>
export default {
    name: 'RestaurantsList',
    props: { restaurants: Array },
    data: () => ({
    }),
    methods: {
    },
}
</script>

<template>
    <div class="row mt-5 gap-3">
        <div class="col-12" v-if="restaurants.length" v-for="restaurant in restaurants" :key="restaurant.id">
            <!-- ProjectCard
            <div class="card my-3">
                <div class="row g-0">
                    <div class="col">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title">{{ restaurant.title }}</h5>
                            <RouterLink v-if="!isDetail" class="btn btn-primary"
                                :to="{ name: 'project-detail', params: { slug: project.slug } }">
                                Vedi
                            </RouterLink>
                            <button v-else class="btn btn-secondary" @click="$router.back()">Torna Indietro
                            </button>
                        </div>
                        <div class="card-body">
                            <img v-if="project.image" :src="project.image" class="float-start img-fluid"
                                :alt="project.title">
                            <p>{{ !isDetail ? abstract : project.content }}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <small>{{ project.user ? project.user.name : 'Anonimo' }}</small>
                            <small>Pubblicato il: {{ formattedDate }}</small>

                            <p v-if="project.type">Tipo:
                                <RouterLink :to="{ name: 'type-projects-page', params: { slug: project.type.slug } }">
                                    <span class="badge" :style="{ backgroundColor: project.type.color }">{{
                                        project.type.label
                                        }}</span></RouterLink>
                            </p>
                            <div>
                                <p v-if="project.technologies?.length">Tecnologie:
                                    <RouterLink
                                        :to="{ name: 'technology-projects-page', params: { slug: technology.slug } }"
                                        v-for="technology in project.technologies" :key="technology.id">
                                        <span :class="'badge rounded-pill me-2 text-bg-' + technology.color">
                                            {{ technology.label }}
                                        </span>
                                    </RouterLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->


        </div>
        <h4 v-else>Non ci sono Ristoranti</h4>
    </div>


</template>

<style></style>