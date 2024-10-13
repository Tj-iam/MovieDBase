<script>

import Trending from "@/components/Home/NowPlaying.vue";
import Card_list from "@/components/Home/MediaList.vue";
import People from "@/components/People/People.vue";


export default {
  name: 'Tv',
  components: {
    Trending, Card_list, People,
  },
  data() {
    return {
      type: "tv",
      nowplaying: "https://api.themoviedb.org/3/tv/now_playing?language=en-US&include_language=en,null&page=1",
      popular: "https://api.themoviedb.org/3/tv/popular?language=en-US&include_language=en,null&page=1",
      trending: "https://api.themoviedb.org/3/trending/tv/day?language=en-US&include_language=en,null&page=1",
      toprated: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&include_language=en,null&page=1",
    }
  }
}
</script>

<template>
  <h1 class="sequence-title">&nbsp Popular Tv-Series</h1>
  <Card_list :type="this.type" :url="popular" name="popular"></Card_list>
  <h1 class="sequence-title">&nbsp Trending Tv-Series</h1>
  <Card_list :type="this.type" :url="trending" name="trending"></Card_list>
  <h1 class="sequence-title">&nbsp Top Rated Tv-Series</h1>
  <Card_list :type="this.type" :url="toprated" name="toprated"></Card_list>


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
</style>
