<script>

export default {
  name: "SearchComponent",
  data() {
    return {
      searchdataMovie: [],
      searchdataPeople: [],
      searchdataTv: [],
      message: 'movie',
      tabs: ['Movies', 'TV', 'People'],
      detailsid: ''
    }
  },
  async mounted() {
    this.searchdataMovie = JSON.parse(localStorage.getItem('search-data-movie'))
    this.searchdataTv = JSON.parse(localStorage.getItem('search-data-tv'))
    this.searchdataPeople = JSON.parse(localStorage.getItem('search-data-people'))

  },
  methods: {

    getDetail() {
      this.detailsid = event.currentTarget.id
      if (event.currentTarget.className === 'movie') {
        localStorage.setItem('mediaId', this.detailsid)
        localStorage.setItem('mediaType', event.currentTarget.className)
        window.location = '/details/movie'
      } else if (event.currentTarget.className === 'tv') {
        localStorage.setItem('mediaId', this.detailsid)
        localStorage.setItem('mediaType', event.currentTarget.className)
        window.location = '/details/tv'
      }
    },
  }
}

</script>

<template>
  <nav>
    <div id="nav-tab" class="nav nav-tabs" role="tablist">
      <button id="nav-movie-tab" aria-controls="nav-movie" aria-selected="true" class="nav-link active"
              data-bs-target="#nav-movie"
              data-bs-toggle="tab" role="tab" type="button">Movie
      </button>
      <button id="nav-tv-tab" aria-controls="nav-tv" aria-selected="false" class="nav-link"
              data-bs-target="#nav-tv"
              data-bs-toggle="tab" role="tab" type="button">TV
      </button>
      <button id="nav-people-tab" aria-controls="nav-people" aria-selected="false" class="nav-link"
              data-bs-target="#nav-people"
              data-bs-toggle="tab" role="tab" type="button">People
      </button>
    </div>
  </nav>
  <div id="nav-tabContent" class="tab-content">
    <div id="nav-movie" aria-labelledby="nav-movie-tab" class="tab-pane fade show active" role="tabpanel" tabindex="0">
      <div class="row row-cols-1 row-cols-md-6 g-4">
        <div v-for="list in searchdataMovie">
          <div class="card">

            <img
                :id="list.id"
                :src="'https://image.tmdb.org/t/p/w500' + list.poster_path"
                alt="poster"
                class="movie"
                onerror="this.style.display=none"
                @click="getDetail"
            />
            <div class="card-body">
              <h5 class="card-title">{{ list.title }}</h5>
            </div>
            <div class="card-footer">
              <h5 class="text-body-secondary">
             <span class="material-symbols-outlined">
star
</span>
                <span style="margin: 3px">{{ list.vote_average }} /10</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="nav-tv" aria-labelledby="nav-tv-tab" class="tab-pane fade" role="tabpanel" tabindex="0">
      <div class="row row-cols-1 row-cols-md-6 g-4">
        <div v-for="list in searchdataTv">
          <div class="card">

            <img
                :id="list.id"
                :src="'https://image.tmdb.org/t/p/w500' + list.poster_path"
                alt="poster"
                class="tv"
                onerror="this.style.display=none"
                @click="getDetail"
            />
            <div class="card-body">
              <h5 class="card-title">{{ list.name }}</h5>
            </div>
            <div class="card-footer">
              <h5 class="text-body-secondary">
             <span class="material-symbols-outlined">
star
</span>
                <span style="margin: 3px">{{ list.vote_average }} /10</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="nav-people" aria-labelledby="nav-people-tab" class="tab-pane fade" role="tabpanel" tabindex="0">
      <div class="row row-cols-1 row-cols-md-6 g-4">
        <div v-for="list in searchdataPeople">
          <div class="card">

            <img
                :id="list.id"
                :src="'https://image.tmdb.org/t/p/w500' + list.profile_path"
                alt="poster"
                class="people"
                onerror="this.style.display='none'"
                @click="getDetail"
            />
            <div class="card-body">
              <h5 class="card-title">{{ list.name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  background-color: rgb(15, 15, 15);
}


.card {
  background-color: #302e2e;
  border: none;
  width: 15rem;
  height: 30rem;
  transition: 0.4s;
  filter: brightness(70%);
  margin-top: 20px;


}


.card img {
  border-top-right-radius: 6%;
  width: 100%;
  height: 100%;
}

.card:hover {
  filter: brightness(100%);
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


</style>