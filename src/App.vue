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
  <div id="header">
    <UpperNav></UpperNav>
  </div>
  <div id="parent">
    <div id="main-content">

      <router-view/>
    </div>
  </div>


</template>

<style scoped>
* {

  margin: 0;
  background-color: rgb(15, 15, 15);

}


#header {
  background-color: rgb(15, 15, 15);
  height: fit-content;
  position: fixed;
  z-index: 999;
  max-width: 100%;
  min-width: 98%;

}

#parent {

  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
}

#main-content {
  position: relative;
  width: 100%;
  height: auto !important;
  padding-left: 200px; /* padding-left must be the same as sidebar width */
  padding-top: 80px;


}
</style>
