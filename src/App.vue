<script>
import Movies from "@/components/Movie/Movies.vue";
import UpperNav from "@/components/NavigationBar/UpperNav.vue";
import Trending from "@/components/Home/NowPlaying.vue";
import People from "@/components/People/People.vue";
import Card_list from "@/components/Home/MediaList.vue";
import PeopleDetails from "@/components/People/PeopleDetails.vue";
import Tv from "@/components/Tv/Tv.vue";

export default {
  name: 'App',
  components: {
    Card_list, People, Trending,
    Movies, UpperNav, PeopleDetails, Tv
  }
}

</script>

<template>
  <div id="main">
    <div id="header">
      <UpperNav></UpperNav>
    </div>

    <div id="main-content">

      <router-view/>
    </div>
  </div>


</template>

<style>


#main {
  margin: 0;

}


#header {
  background-color: rgb(15, 15, 15);
  height: fit-content;
  position: fixed;
  z-index: 999;
  width: 100%;

}


#main-content {
  background-color: rgb(15, 15, 15);
  margin: 0;
  position: relative;
  width: 100% !important;
  height: fit-content !important;
  padding-left: 50px; /* padding-left must be the same as sidebar width */
  padding-top: 80px;

}


</style>
