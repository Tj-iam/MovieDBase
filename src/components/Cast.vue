<script>
export default {
  props: ["moviecast"],
  methods: {
    seePeople() {
      this.castid = event.currentTarget.id
      localStorage.setItem('peopleid', this.castid)
      console.log(this.castid)
      window.location = '/details/people'
    }
  }
}
</script>

<template>
  <h1 class="sequence-title">Cast</h1>
  <v-sheet
      class="mx-100%"
      max-width="100%"

  >
    <v-slide-group

        show-arrows
    >
      <v-slide-group-item
          v-for="(actor,index) in moviecast.cast"
          :key="index"
          v-slot="{ isSelected, toggle }"
      >

        <div class="card m-3">

          <img
              :id="actor.id"
              :src="'https://image.tmdb.org/t/p/w500'+actor.profile_path"
              alt="poster"
              class="poster"
              @click="seePeople"
          />
          <div class="card-body">
            <h5 class="card-title">{{ actor.name }}</h5>
            <h5 class="card-title">{{ actor.character }}</h5>
          </div>
        </div>


      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

</template>

<style scoped>

.sequence-title {
  margin: auto;
  color: red;
  text-align: center;

}

.card {
  background-color: #1e1e1e;
  border: none;
  width: 14rem;
  height: 26rem;
  transition: 0.4s;
  filter: brightness(85%);


}


.card img {
  border-top-right-radius: 6%;
  width: 100%;
  height: 100%;
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