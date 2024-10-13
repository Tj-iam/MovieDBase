<script>
export default {
  props: ["movievideo"],
  data() {
    return {
      videokey: ''
    }
  },
  async mounted() {
    console.log(this.movievideo)
  },
  methods: {
    getkey() {
      this.videokey = event.currentTarget.id
    }
  }
}
</script>

<template>
  <h1 class="sequence-title">Videos</h1>
  <v-sheet
      class="mx-auto"
      color="transparent"
      max-width="100%"

  >
    <v-slide-group

        show-arrows
    >
      <v-slide-group-item
          v-for="(video,index) in movievideo"
          :key="index"
          v-slot="{ isSelected, toggle }"
      >

        <div class="card m-2">

          <img
              :id="video.key"
              :src="'https://i.ytimg.com/vi/'+video.key+'/maxresdefault.jpg'"
              alt="poster"
              class="poster"
              data-bs-target="#videoModal" data-bs-toggle="modal"
              @click="getkey()"
          />
        </div>


      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>


  <div id="videoModal" aria-hidden="true" aria-labelledby="videoModalLabel" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"
                  @click="this.videokey=''"></button>
        </div>
        <div class="modal-body">
          <iframe :src="'https://www.youtube.com/embed/'+this.videokey+'?autoplay=1'
" allow='autoplay' class="d-block"></iframe>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container-fluid {
  overflow: scroll;
  overflow-y: hidden;
}

.card {
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 30rem;

  transition: 0.5s;

}

.card :hover {
  filter: brightness(50%);
  transition: 0.5s;
}

.card img {
  border-radius: 6%;
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
}

.sequence-title {
  color: red;
  font-family: "Alata", sans-serif;
  margin: 8px;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
}

.d-block {;
  width: 80%;
  height: 80%;
  margin: auto;


}

.btn-close {
  background-color: red
}

.modal-content {
  background-color: rgb(16, 16, 16);

}
</style>