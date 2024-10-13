<script xmlns="http://www.w3.org/1999/html">

import axios from "axios";

export default {


  async mounted() {
    this.detailsid = localStorage.getItem('mediaId');
    this.type = localStorage.getItem('mediaType');
    console.log(this.detailsid, this.type);
    this.getDetail()

  },

  data() {
    return {
      url: "https://image.tmdb.org/t/p/w500",
      movieinfo: [],
      moviekey: [],
      moviecast: [],
      movieimages: [],
      similar: [],
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

    async getinfo() {
      await axios.get("https://api.themoviedb.org/3/" + this.type + "/" + this.detailsid + "?language=en-US", this.options)
          .then(response => (this.movieinfo = response.data));
      console.log(this.movieinfo.languages);


    },
    async getKey() {
      await axios.get("https://api.themoviedb.org/3/" + this.type + "/" + this.detailsid + " /videos?language=en-US", this.options)
          .then(response => (this.moviekey = response.data.results));
      console.log(this.moviekey)


    },
    async getCast() {
      await axios.get("https://api.themoviedb.org/3/" + this.type + "/" + this.detailsid + "/credits", this.options)
          .then(response => (this.moviecast = response.data));

    },
    async getImages() {
      await axios.get("https://api.themoviedb.org/3/" + this.type + "/" + this.detailsid + "/images", this.options)
          .then(response => (this.movieimages = response.data.backdrops));

    },
    getDetail() {
      this.getinfo();
      this.getKey();
      this.getCast();
      this.getImages();
      console.log(this.movieinfo)


    },

  }

}


</script>

<template>
  <div v-if="typeof movieinfo!== 'undefined'" class="main">
    <h1 class="title">{{ movieinfo.name }}</h1>
    <a class="release_date">{{ movieinfo.first_air_date }}</a>
    <a v-if="movieinfo.episode_run_time" class="runtime">{{ movieinfo.episode_run_time }} min</a>
    <a v-if="movieinfo.in_production" class="status">In Production</a>
    <a v-else class="status">Finished</a>
    <a class="vote">{{ movieinfo.vote_average }} /10 <span class="material-symbols-outlined">
star
</span></a>

    <div class="gallery">
      <div class="elements">
        <img :src="'https://image.tmdb.org/t/p/w500'+movieinfo.poster_path">
        <span id="favorite"><span class="material-symbols-outlined">
bookmark_add
</span>
        </span>

        <iframe v-if="moviekey.length>0" :src="'https://www.youtube.com/embed/'+moviekey[moviekey.length - 1].key+'?autoplay=1&mute=1'
" allow='autoplay' class="trailer"></iframe>
        <button class="library"><span class="material-symbols-outlined">
video_library
</span><br>{{ moviekey.length }} videos
        </button>
        <button class="library"><span class="material-symbols-outlined">
photo_library
</span><br> {{ movieimages.length }} photos
        </button>
      </div>
    </div>
    <button v-for="genre in movieinfo.genres" class="genres">{{ genre.name }}</button>
    <p class="overview">{{ movieinfo.overview }}</p>
    <div class="container-fluid py-1">
      <div class="d-flex flex-row flex-nowrap">
        <div v-for="(actor,index) in moviecast.cast">
          <div v-if="index <= 8" class="card m-2">
            <img
                :src="'https://image.tmdb.org/t/p/w500'+actor.profile_path"
                class="card-img-top position-relative"

            />
            <p>{{ actor.name }}</p>
          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid py-1">
      <div class="d-flex flex-row flex-nowrap">
        <div v-for="(video,index) in this.moviekey" class="videos">
          <div class="card m-2">
            <img :src="'https://i.ytimg.com/vi/'+video.key+'/maxresdefault.jpg'"
                 class="card-img-top position-relative"

            />
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<style scoped>


.main {
  width: 100%;
  margin: auto;
  background-color: rgb(16, 16, 16);
  text-align: center;


}

.title {
  color: red;
  font-family: "Alata", sans-serif;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
}


.release_date, .runtime, .vote {
  display: inline-flex;
  padding: 10px;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: white;


}

.release_date:hover, .runtime:hover, .vote:hover {
  text-decoration: underline;
  color: white;
}


.gallery {
  text-align: center;
  color: white;
}

.elements {
  display: inline-flex;
  margin: auto;
  text-align: center;
  position: relative;
  color: red;

}

img {
  width: 278.27px;
  height: 414.68px;
  display: inline-flex;
  margin-right: 2px;

}


#favorite .material-symbols-outlined {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 50px;
  padding: 0;
  margin: 0;
  font-variation-settings: 'FILL' 1,
  'wght' 800,
  'GRAD' 0,
  'opsz' 48

}

#favorite .material-symbols-outlined:hover {
  filter: brightness(50%);

}

iframe {
  width: 737.2px;
  height: 414.68px;
}

.library {
  width: 20%;
  filter: brightness(80%);
}

.library:hover {
  filter: brightness(100%);
}

.genres {
  border: 1px solid black;
  border-radius: 10%;
  padding: 10px;
  margin: 3px;
  font-size: 20px;
  background-color: rgb(255, 0, 0);
  font-family: "Alata", sans-serif;
  font-weight: 200;
  color: white;

}

.overview {
  border-bottom: 1px solid black;
  padding: 10px;
  color: white;
  font-family: "Alata", sans-serif;
  font-weight: 200;
  text-align: left;
}


.container-fluid {
  overflow-y: hidden;
}

.card {
  background-color: transparent;
  border: none;
  transition: 0.5s;


}

.card :hover {
  filter: brightness(50%);
  transition: 0.5s;
  transform: scale(1.08);

}

.card img {

  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}


.container-fluid {
  overflow: scroll;
}

.videos .card {
  background-color: transparent;
  border: none;
  padding: 30px;
  width: 33rem;
  transition: 0.5s;

}

.videos .card :hover {
  filter: brightness(50%);
  transition: 0.5s;
  transform: scale(1.08);
}

.videos .card img {
  border-radius: 6%;
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  clip-path: none;
}
</style>