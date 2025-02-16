<script>
import axios from "axios";

export default {
  data() {
    return {

      peopleinfo: [],
      peopleid: [],
      peoplemoviecredits: [],
      peopletvcredits: [],
      peopleimages: [],
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

    this.peopleid = localStorage.getItem("peopleid")
    await axios.get("https://api.themoviedb.org/3/person/" + this.peopleid + "?language=en-US", this.options)
        .then(response => (this.peopleinfo = response.data));
    await axios.get("https://api.themoviedb.org/3/person/" + this.peopleid + "/movie_credits?language=en-US", this.options)
        .then(response => (this.peoplemoviecredits = response.data.cast));
    await axios.get("https://api.themoviedb.org/3/person/" + this.peopleid + "/tv_credits?language=en-US", this.options)
        .then(response => (this.peopletvcredits = response.data.cast));
    await axios.get("https://api.themoviedb.org/3/person/" + this.peopleid + "/images", this.options)
        .then(response => (this.peopleimages = response.data.profiles));


  },
  methods: {
    getDetail() {
      this.detailsid = event.currentTarget.id;
      if (event.target.className === "movie") {
        localStorage.setItem('mediaId', this.detailsid)
        localStorage.setItem('mediaType', 'movie')
        window.location = '/details/movie'
      } else if (event.target.className === "tv") {
        localStorage.setItem('mediaId', this.detailsid)
        localStorage.setItem('mediaType', 'tv')
        window.location = '/details/tv'
      } else {
        alert('error')
      }


    }
  },
}
</script>

<template>
  <h1 class="title">{{ peopleinfo.name }}</h1>
  <v-sheet
      class="mx-auto"
      color="transparent"
      max-width="100%"

  >
    <v-slide-group

        show-arrows
    >
      <v-slide-group-item
          v-for="images in peopleimages"
          :key="images"
          v-slot="{ isSelected, toggle }"
      >

        <div class="card m-2">

          <img
              :src="'https://image.tmdb.org/t/p/original'+images.file_path"
              alt="poster"
              class="poster"
          />
        </div>


      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  <div class="details">
    <p>Place of Birth : {{ peopleinfo.place_of_birth }} <span class="infoday">Birthday: {{
        peopleinfo.birthday
      }}</span>
      <span v-if="peopleinfo.deathday !== null" class="infoday">DeathDay:{{ peopleinfo.deathday }}</span>
    </p>
    <p>Known For : {{ peopleinfo.known_for_department }}</p>
    <p>{{ peopleinfo.biography }}</p>
  </div>
  <h1 class="title">Movies</h1>
  <v-sheet

      class="mx-auto"
      max-width="100%"

  >
    <v-slide-group

        show-arrows
    >
      <v-slide-group-item
          v-for="(movie,index) in this.peoplemoviecredits"
          :key="index"
          v-slot="{ isSelected, toggle }"
      >

        <div class="card m-3">

          <img
              :id="movie.id"
              :src="'https://image.tmdb.org/t/p/w500'+ movie.poster_path"
              alt="poster"
              class="movie"
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

  <h1 class="title">Tv-Series</h1>
  <v-sheet
      class="mx-auto"
      max-width="100%"

  >
    <v-slide-group

        show-arrows
    >
      <v-slide-group-item
          v-for="(movie,index) in this.peopletvcredits"
          :key="index"
          v-slot="{ isSelected, toggle }"
      >

        <div class="card m-3">

          <img
              :id="movie.id"
              :src="'https://image.tmdb.org/t/p/w500'+ movie.poster_path"
              alt="poster"
              class="tv"
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
  transition: 0.5s;
  height: auto;
  width: 13rem;
}


.details {
  color: white;
  padding: 0;
  font-weight: 600;
  font-size: 18px;
}

.card img {
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  color: red;
  font-family: "Alata", sans-serif;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
  padding: 20px;
}


.card:hover {
  filter: brightness(110%);
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

.v-sheet, .v-slide-group {
  background-color: transparent;
  color: white;
}

</style>