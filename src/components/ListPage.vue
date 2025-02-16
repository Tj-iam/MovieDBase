<script lang="ts">
import axios from "axios";

export default {
  props: ["url", "name", "type"],
  data() {
    return {
      list: [],
      item: [],
      pageindex: 1,
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzJlYmFlMmM1NTg0MTIwNWViZTYyODc2Nzc2NjdkZiIsIm5iZiI6MTcyMTAzMzI1Mi43Mzc2MTksInN1YiI6IjY1ZmI3ZGZjNWJlMDBlMDEzMDZkNjk4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C977fJybWe-qn76rKnhS_0XbrDIVtVT7toFKhx4oJKY'
        }
      }
    }
  },
  methods: {
    load({done}) {
      axios.get(this.url + this.pageindex, this.options).then(response => (this.item = response.data.results));
      setTimeout(() => {
        this.list.push(...this.item);

        done('ok')
      }, 1000)
      this.pageindex++
    }, getDetail() {
      this.detailsid = event.currentTarget.id
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
  },
  async mounted() {
    await axios.get(this.url + this.pageindex, this.options).then(response => (this.list = response.data.results));
    this.pageindex++
  },
}
</script>

<template>
  <h1 class="modaltitle">{{ name }}</h1>
  <v-infinite-scroll
      height="auto"
      mode="manual"
      @load="load"
  >
    <div class="row row-cols-1 row-cols-md-5 g-4">
      <div v-for="list in this.list">
        <div class="card">

          <img
              :id="list.id"
              :src="'https://image.tmdb.org/t/p/w500' + list.poster_path"
              alt="poster"
              class="poster"
              onerror="this.style.display=none"
              @click="getDetail"
          />
          <div class="card-body">
            <h5 class="card-title">{{ list.title }}{{ list.name }}</h5>
          </div>
          <div class="card-footer">
            <h5 class="text-body-secondary">
             <span class="material-symbols-outlined">
star
</span>
              <span style="margin: 3px">{{ list.vote_average }} /10</span></h5>
          </div>
        </div>
      </div>
    </div>
  </v-infinite-scroll>
</template>

<style scoped>
.modaltitle {
  text-align: center;
  font-size: 50px;
  font-family: "Alata", sans-serif;
  color: red;
  font-weight: bold;
}

.card {
  background-color: #181818;
  border: none;
  width: 15rem;
  height: 100%;
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

.v-infinite-scroll {
  margin-top: 50px;
}
</style>