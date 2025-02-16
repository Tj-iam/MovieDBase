<script>
import axios from "axios";
import PeopleDetails from "@/components/People/PeopleDetails.vue";
import MovieDetail from "@/components/Movie/MovieDetail.vue";
import TvDetail from "@/components/Tv/TvDetail.vue";

export default {
  props: ["url"],
  components: {TvDetail, MovieDetail, PeopleDetails},
  data() {
    return {
      peoplelist: [],
      item: [],
      img: "https://image.tmdb.org/t/p/w500",
      pageIndex: 1,
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzJlYmFlMmM1NTg0MTIwNWViZTYyODc2Nzc2NjdkZiIsIm5iZiI6MTcyMTM3OTAyMy4zMTI4MTIsInN1YiI6IjY1ZmI3ZGZjNWJlMDBlMDEzMDZkNjk4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GuugR2OnyOhpHWJvc3FV7A8gScy-rLa_YrPQ12NH_BA'
        }
      },
    }
  },
  async mounted() {


    await axios.get("https://api.themoviedb.org/3/person/popular?language=en-US&page=" + this.pageIndex, this.options)
        .then(response => (this.peoplelist = response.data.results));


  },
  methods: {
    async load({done}) {
      this.pageIndex++

      await axios.get("https://api.themoviedb.org/3/person/popular?language=en-US&page=" + this.pageIndex, this.options).then(response => (this.item = response.data.results));
      setTimeout(() => {
        this.peoplelist.push(...this.item);
        done('ok')
      }, 1000)
    },
    getPeopleid() {
      this.peopleid = event.currentTarget.id;
      localStorage.setItem('peopleid', this.peopleid)
      window.location = '/details/people'
    }
  }


}
</script>

<template>
  <h1 class="title">Popular People</h1>
  <v-infinite-scroll
      height="auto"
      mode="manual"
      @load="load"
  >
    <div class="row row-cols-1 row-cols-md-6 g-4">
      <div v-for="list in this.peoplelist">
        <div class="card">

          <img
              :id="list.id"
              :src="'https://image.tmdb.org/t/p/w500' + list.profile_path"
              alt="poster"
              class="poster"
              onerror="this.style.display='none'"
              @click="getPeopleid"
          />
          <div class="card-body">
            <h5 class="card-title">{{ list.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </v-infinite-scroll>


</template>

<style scoped>
.title {
  color: red;
  margin: auto;
}

.card {
  background-color: #181818;
  border: none;
  width: 15rem;
  height: 26rem;
  transition: 0.4s;
  filter: brightness(70%);
  margin-top: 20px;


}


.card img {
  border-top-right-radius: 6%;
  width: 100%;
  height: 100%;
}

.card:hover {
  filter: brightness(100%);
  transition: 0.4s;
  transform: scale(1.05);
}

h5, span {
  color: white;
  font-size: 13px;

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


</style>