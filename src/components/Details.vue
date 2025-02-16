<script>

export default {
  props: ['movieinfo', 'moviekey', 'movieimages'],
  methods: {}
}

</script>

<template>
  <div :style="'background-image:url(https://image.tmdb.org/t/p/original'+movieinfo.backdrop_path+')' "
       class="background">
    <div v-if="typeof movieinfo!== 'undefined'"
         class="main">
      <h1 class="title">{{ movieinfo.title }}{{ movieinfo.name }}</h1>
      <a class="release_date">{{ movieinfo.release_date }}{{ movieinfo.first_airdate }}</a>
      <a class="runtime">{{ movieinfo.runtime }}{{ movieinfo.episode_run_time }} min</a>
      <a class="vote">{{ movieinfo.vote_average }} /10 <span class="material-symbols-outlined">
star
</span></a>

      <div class="gallery">
        <div class="elements">
          <img :src="'https://image.tmdb.org/t/p/w500'+movieinfo.poster_path">
          <span id="favorite">
        </span>

          <iframe v-if="moviekey.length>0" :src="'https://www.youtube.com/embed/'+moviekey[moviekey.length - 1].key+'?autoplay=1&mute=1&fullscreen=allow'
" allow='autoplay' allowfullscreen class="trailer"></iframe>
          <div class="card library" data-bs-target="#imagesModal" data-bs-toggle="modal">
            <a><span class="material-symbols-outlined">
photo_library
</span><br>{{ movieimages.length }} Images</a>

          </div>
        </div>
      </div>
      <button v-for="genre in movieinfo.genres" class="genres">{{ genre.name }}</button>
      <h1 class="sequence-title">Overview</h1>
      <p class="overview">{{ movieinfo.overview }}</p>
    </div>

    <div id="imagesModal" aria-hidden="true" aria-labelledby="imagesModalLabel" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="imagesModalLabel" class="modal-title fs-5">{{ movieinfo.title }}</h1>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          </div>
          <div class="modal-body">
            <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                <div v-for="(image,index) in this.movieimages" :class="{ 'active': index === 0 }" class="carousel-item">
                  <img :alt="movieinfo.title+'images'"
                       :src="'https://image.tmdb.org/t/p/original'+image.file_path"
                       :style="'aspect-ratio:'+image.aspect_ratio"
                       class="d-block">
                  <div class="carousel-caption d-none d-md-block">
                    <h5>{{ index }} of {{ movieimages.length }}</h5>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExample"
                      type="button">
                <span aria-hidden="true" class="carousel-control-prev-icon"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExample"
                      type="button">
                <span aria-hidden="true" class="carousel-control-next-icon"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>


.background {
  width: 100%;
}

.main {
  max-width: 100%;
  margin: auto;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  backdrop-filter: blur(10px) brightness(10%);


}


.modal-content {
  background-color: rgb(16, 16, 16);


}

.carousel {

}

.d-block {;
  width: 80%;
  height: auto;
  margin: auto;


}


.title, .modal-title {
  color: red;
  font-family: "Alata", sans-serif;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
  width: 100%;
}

.btn-close {
  background-color: red
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

.modal-title {
  margin: auto;
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
  height: auto !important;
  filter: brightness(30%);

  a {
    margin: auto;
    font-size: 20px;
    font-family: "Alata", sans-serif;
    color: red;

    span {
      font-size: 40px;
    }
  }
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
  width: 100%;
}

.sequence-title {
  color: red;
  font-family: "Alata", sans-serif;
  margin: 8px;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
}
</style>