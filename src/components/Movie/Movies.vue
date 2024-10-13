<script>

import Trending from "@/components/Home/NowPlaying.vue";
import Card_list from "@/components/Home/MediaList.vue";
import People from "@/components/People/People.vue";
import Tv from "@/components/Tv/Tv.vue";


export default {
  name: 'Movies',
  components: {
    Tv,
    Trending, Card_list, People,
  },
  data() {
    return {

      type: "movie",
      nowplaying: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      popular: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      trending: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      toprated: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      upcoming: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",

    }
  }
}
</script>

<template>
  <h1 class="sequence-title"> &nbsp Now Playing Movies</h1>
  <Trending :type="this.type" :url="nowplaying" name="nowplaying"></Trending>
  <hr>
  <h1 class="sequence-title">&nbsp Popular Movies</h1>
  <Card_list :type="this.type" :url="popular" name="popular"></Card_list>
  <h1 class="sequence-title">&nbsp Trending Movies</h1>
  <Card_list :type="this.type" :url="trending" name="trending"></Card_list>
  <h1 class="sequence-title">&nbsp Top Rated Movies</h1>
  <Card_list :type="this.type" :url="toprated" name="toprated"></Card_list>
  <h1 class="sequence-title">&nbsp Upcoming Movies</h1>
  <Card_list :type="this.type" :url="upcoming" name="upcoming"></Card_list>

  <Tv></Tv>
</template>

<style scoped>
.sequence-title {
  border-left: 6px solid red;
  color: red;
  font-family: "Alata", sans-serif;
  margin: 8px;
  font-weight: 600;
  font-size: 35px;
  text-align: left;
  max-width: 100%;
}

* {
  max-width: 100%;

}

@media screen and (max-width: 1024px) {
  .sequence-title {

    font-size: 20px;

  }
}
</style>
