import {createRouter, createWebHistory} from 'vue-router'
import Tv from "@/components/Tv/Tv.vue";
import MovieDetail from "@/components/Movie/MovieDetail.vue";
import TvDetail from "@/components/Tv/TvDetail.vue";
import PeopleDetails from "@/components/People/PeopleDetails.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ListPage from "@/components/ListPage.vue";
import People from "@/components/People/People.vue"
import Movies from "@/components/Movie/Movies.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Movies

        },
        {
            path: '/tv',
            name: 'Tv',
            component: Tv

        }, {
            path: '/people',
            name: 'people',
            component: People

        },
        {
            path: '/details/movie',
            name: 'MovieDetail',
            component: () => MovieDetail
        },
        {
            path: '/details/tv',
            name: 'TvDetail',
            component: () => TvDetail
        },
        {
            path: '/details/people',
            name: 'People',
            component: () => PeopleDetails
        },
        {
            path: '/search',
            name: 'Search',
            component: () => SearchComponent
        },
        {
            path: '/list',
            name: 'List',
            component: () => ListPage
        },


    ]
})

export default router
