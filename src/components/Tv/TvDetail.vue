<script xmlns="http://www.w3.org/1999/html">

import axios from "axios";
import Videos from "@/components/Videos.vue";
import Details from "@/components/Details.vue";
import Cast from "@/components/Cast.vue";

export default {
  components: {Cast, Details, Videos},


  async mounted() {
    this.detailsid = localStorage.getItem('mediaId');
    this.type = localStorage.getItem('mediaType');
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
    },
    async getKey() {
      await axios.get("https://api.themoviedb.org/3/" + this.type + "/" + this.detailsid + " /videos?language=en-US", this.options)
          .then(response => (this.moviekey = response.data.results));

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
    },
  }
}
</script>

<template>
  <Details :movieimages="movieimages" :movieinfo="movieinfo" :moviekey="moviekey"></Details>
  <Cast :moviecast="moviecast"></Cast>
  <Videos :movievideo="moviekey"></Videos>
</template>

<style scoped>
</style>