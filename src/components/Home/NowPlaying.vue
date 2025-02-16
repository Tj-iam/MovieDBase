<script>
import axios from "axios";
import MovieDetail from "@/components/Movie/MovieDetail.vue";
import TvDetail from "@/components/Tv/TvDetail.vue";

export default {
  components: {TvDetail, MovieDetail,},
  methods: {
    async getVideoKey() {
      for (let i = 0; i <= this.list.length; i++) {
        await axios.get("https://api.themoviedb.org/3/" + this.type + "/" + this.list[i].id + "/videos?language=en-US", this.options)
            .then(response => (this.keylist[i] = response.data.results[response.data.results.length - 1]))
        if (typeof this.keylist[i] !== "undefined") {
          Object.defineProperty(this.list[i], "key", {
            value: this.keylist[i].key,
            writable: false,
            enumerable: true,
            configurable: true,
          });
        }
      }
    },
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
  },
  data() {
    return {
      list: [],
      img: "https://image.tmdb.org/t/p/original",
      detailurl: "https://api.themoviedb.org/3/" + this.type + "/" + this.movieid + "?language=en-US",
      keylist: [],
      videokey: [],
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzJlYmFlMmM1NTg0MTIwNWViZTYyODc2Nzc2NjdkZiIsIm5iZiI6MTcyMTAzMzI1Mi43Mzc2MTksInN1YiI6IjY1ZmI3ZGZjNWJlMDBlMDEzMDZkNjk4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C977fJybWe-qn76rKnhS_0XbrDIVtVT7toFKhx4oJKY'
        }
      }
    }
  },
  props: ['url', 'type'],
  async mounted() {
    await axios.get(this.url, this.options)
        .then(response => (this.list = response.data.results))
    await Promise.all(this.list).then(() => {
      this.getVideoKey();
    })
  },
}
</script>

<template>

  <v-carousel
      :cycle="true"
      class="carousel flex-1-0"
      height="auto"
      hide-delimiters
      show-arrows


  >
    <v-carousel-item v-for="(movie,index) in this.list"
                     :src="'https://i.ytimg.com/vi_webp/'+movie.key+'/maxresdefault.webp'"
                     class="  position-static  trailer rounded-lg"
                     cover


    >
      <div class="position-absolute bottom-0 left-0 rounded-lg pa-3 d-inline-block me-2"
           style="margin-bottom: 0px;background-color:transparent">
        <img
            :id="movie.id"
            :src="img + movie.poster_path"
            alt="poster"
            class="poster"
            @click="getDetail"
        />
      </div>

    </v-carousel-item>
  </v-carousel>
</template>
<style scoped>
* {
 
}

.carousel {
  max-width: 70% !important;
  margin: auto;


}


.poster {
  filter: brightness(70%);
  transition: 0.5s;
  padding: 0;
  width: 15%;
  border-radius: 10%;
  object-fit: cover;

}


.trailer {


}

h5 {
  font-size: 40px;
  padding: 5px;
  margin: 0;
  transition: 0.2s;
}

h5 span {
  font-size: 18rem;

}

.poster:hover {
  filter: brightness(100%);
  transition: 0.5s;

  h5 span {
    color: yellow;
  }
}

@media screen and (max-width: 1024px) {


}

</style>