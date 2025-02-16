<script>
import axios from "axios";
import TvDetail from "@/components/Tv/TvDetail.vue";
import MovieDetail from "@/components/Movie/MovieDetail.vue";

export default {
  props: ["url", "type", "name"],
  components: {TvDetail, MovieDetail},
  data() {
    return {
      list: [],
      onboarding: 0,
      img: "https://image.tmdb.org/t/p/w500",
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzJlYmFlMmM1NTg0MTIwNWViZTYyODc2Nzc2NjdkZiIsIm5iZiI6MTcyMTAzMzI1Mi43Mzc2MTksInN1YiI6IjY1ZmI3ZGZjNWJlMDBlMDEzMDZkNjk4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C977fJybWe-qn76rKnhS_0XbrDIVtVT7toFKhx4oJKY'
        }
      }
    }
  },

  async mounted() {
    await axios.get(this.url, this.options).then(response => (this.list = response.data.results));
  },
  methods: {
    getDetail() {
      this.detailsid = event.currentTarget.id;
      if (this.type === 'movie') {
        localStorage.setItem('mediaId', this.detailsid)
        localStorage.setItem('mediaType', this.type)
        window.location = '/details/movie'
      } else if (this.type === 'tv') {
        localStorage.setItem('mediaId', this.detailsid)
        localStorage.setItem('mediaType', this.type)
        window.location = '/details/tv'
      }
    },
  }
}
</script>

<template>
  <v-sheet
      class="mx-auto"
      max-width="100%"

  >
    <v-slide-group

        show-arrows
    >
      <v-slide-group-item
          v-for="(movie,index) in this.list"
          :key="index"
          v-slot="{ isSelected, toggle }"
      >

        <div class="card m-2">

          <img
              :id="movie.id"
              :src="img + movie.poster_path"
              alt="poster"
              class="poster"
              @click="getDetail"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}{{ movie.name }}</h5>
          </div>
          <div class="card-footer">
            <h5 class="text-body-secondary">
             <span class="material-symbols-outlined">
star
</span>
              <span>{{ movie.vote_average }}  /10</span></h5>
          </div>
        </div>


      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>


<style scoped>


.card {
  background-color: #1e1e1e;
  border: none;
  width: 13rem;
  height: 26rem;
  transition: 0.4s;
  filter: brightness(85%);


}


.card img {
  border-top-right-radius: 6%;
  width: 100%;
  height: 100%;
}

.card:hover {
  filter: brightness(110%);
  transition: 0.4s;
  transform: scale(1.05);
}

h5, span, .card-body {
  color: white;
  font-size: 13px;
  background-color: #1e1e1e;
}


.material-symbols-outlined {
  color: gold;
  font-variation-settings: 'FILL' 1,
  'wght' 500,
  'GRAD' 0,
  'opsz' 24
}

svg {
  color: gold;
  font-size: 15px;
}


button {
  background-color: red;
  color: white;
  font-family: "Alata", sans-serif;

}

.v-sheet, .v-slide-group {
  background-color: transparent;
  color: white;
}

@media screen and (max-width: 1024px) {
  * {
    margin: 0;
  }

  .card {
    background-color: #1e1e1e;
    border: none;
    width: 9rem;
    height: 21rem;
    transition: 0.4s;
    filter: brightness(85%);


  }

  h5, span {

    font-size: 11px;

  }
}

@media screen and (max-width: 768px) {


  .card {
    background-color: var(--card-backgroundcolor);
    border: none;
    width: 8rem;
    height: 18rem;
    transition: 0.4s;
    filter: brightness(85%);


  }

  h5, span {

    font-size: 11px;

  }
}

@media screen and (max-width: 425px) {


  .card {
    background-color: #1e1e1e;
    border: none;
    width: 8rem;
    height: 18rem;
    transition: 0.4s;
    filter: brightness(85%);


  }

  h5, span {

    font-size: 11px;

  }
}
</style>