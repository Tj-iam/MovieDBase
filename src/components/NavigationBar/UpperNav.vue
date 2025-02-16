<script>

import axios from "axios";
import ListPage from "@/components/ListPage.vue";

export default {
  components: {
    ListPage
  },
  data() {
    return {
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzJlYmFlMmM1NTg0MTIwNWViZTYyODc2Nzc2NjdkZiIsIm5iZiI6MTcyODcyOTIxNC4zMzU2ODYsInN1YiI6IjY1ZmI3ZGZjNWJlMDBlMDEzMDZkNjk4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LpzqKuqm_mx4-aGpnOxHerxY0gXh_60cXFa049WU494'
        },
      },
      message: '',
      searchInfoMovie: [],
      searchInfoTv: [],
      searchInfoPeople: [],

      movienav: [{
        name: 'Nowplaying', url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=",
        type: "movie"

      },
        {
          name: 'Popular', url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
          type: "movie"

        },
        {
          name: 'Toprated', url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=",
          type: "movie"


        }, {
          name: 'Upcoming', url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page='",
          type: "movie"


        }],
      tvnav: [{
        name: 'AiringTodayTV', url: "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=",
        type: "tv"

      },
        {
          name: 'OntheAirTV', url: "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=",
          type: "tv"

        },
        {
          name: 'PopularTV', url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=",
          type: "tv"

        },
        {
          name: 'TopratedTV', url: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=",
          type: "tv"


        },],

    }
  },
  methods: {
    async getResults() {

      if (this.message !== "") {
        await axios.get('https://api.themoviedb.org/3/search/movie?query=' + this.message + '', this.options)
            .then(response => (this.searchInfoMovie = response.data.results));
        localStorage.setItem('search-data-movie', JSON.stringify(this.searchInfoMovie))
        await axios.get('https://api.themoviedb.org/3/search/tv?query=' + this.message + '', this.options)
            .then(response => (this.searchInfoTv = response.data.results));
        localStorage.setItem('search-data-tv', JSON.stringify(this.searchInfoTv))
        await axios.get('https://api.themoviedb.org/3/search/person?query=' + this.message + '', this.options)
            .then(response => (this.searchInfoPeople = response.data.results));
        localStorage.setItem('search-data-people', JSON.stringify(this.searchInfoPeople))
        window.location = '/search'
      } else {
        alert('Cant Search for empty bar')
      }
    },
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="logo">
      <span class="material-symbols-outlined">
        database
      </span>
        <router-link to="/"><a class="navbar-brand"><span>MD</span><span id="minlogo">.Base</span></a></router-link>
      </div>
      <div id="navbarSupportedContent" class="navbar-expand">
        <ul class="navbar-nav me-0 mb-2 mb-lg-0">
          <li class="nav-item active dropdown">
            <a aria-current="page" aria-expanded="false" class="nav-link btn btn-secondary dropdown-toggle"
               data-bs-toggle="dropdown"
               type="button">
              Movies
            </a>
            <ul class="dropdown-menu">
              <li v-for="item in movienav"><a :data-bs-target="'#'+item.name" class="dropdown-item"
                                              data-bs-toggle="modal">{{ item.name }}</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" href="tv"
            >
              Tv-Series
            </a>
            <ul class="dropdown-menu">
              <li v-for="item in tvnav"><a :data-bs-target="'#'+item.name+'modal'" class="dropdown-item"
                                           data-bs-toggle="modal">{{ item.name }}</a></li>
            </ul>

          </li>
          <li class="nav-item dropdown">
            <router-link to="/people">
              <a class="nav-link btn btn-secondary">
                Popular People
              </a></router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-link>
      <form class="d-flex" role="search">
        <input v-model="message" aria-label="Search" class="form-control me-0" placeholder="Search" type="search"
               @keyup.enter="this.getResults" @submit.prevent="onSubmit">
        <button class="search-button" v-on:click="this.getResults"><span class="material-symbols-outlined search-icon">
search
</span></button>
      </form>
    </router-link>

    <div v-for="item in movienav " :id="item.name" :aria-labelledby="item.name+'ModalLabel'" aria-hidden="true"
         class="modal fade"
         tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"
                    @click="close"></button>
          </div>
          <div class="modal-body">
            <list-page :name="item.name" :type="item.type" :url="item.url"></list-page>
          </div>
        </div>
      </div>
    </div>


    <div v-for="items in tvnav " :id="items.name+'modal'" :aria-labelledby="items.name+'Label'" aria-hidden="true"
         class="modal fade"
         tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"
                    @click="close"></button>
          </div>
          <div class="modal-body">
            <list-page :name="items.name" :type="items.type" :url="items.url"></list-page>
          </div>
        </div>
      </div>
    </div>
  </nav>


</template>
<style scoped>
* {
}

.navbar-nav {
  flex: 1;
  margin: auto !important;
  display: flex;
  justify-content: end;
}

.logo {
  span {
    font-size: 35px;
    float: left;
  }
}

.modal-backdrop {
  z-index: -1;
}


.nav-pills .nav-link.active {
  background-color: red;
  text-decoration: none;
}

.nav-item {
  a {
    justify-content: right;
    float: right;
    font-family: "Alata", sans-serif;
    color: red;
    font-weight: 600;

  }
}


.search-button {
  background-color: red;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  max-width: 30px;
  min-width: 30px;
  height: auto;

  .search-icon {
    color: white;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }
}


.navbar-brand {
  font-family: "Anek Devanagari", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-size: 30px;
  padding-left: 10px;
  margin-top: 10px;
  color: white;
  font-variation-settings: "width" 50;

}

.material-symbols-outlined {
  color: red;
  font-size: 28px;
  height: auto;
  margin: 0;
  font-variation-settings: 'FILL' 1,
  'wght' 500,
  'GRAD' 100,
  'opsz' 40
}

#minlogo {
  color: red;
}


/* width */
::-webkit-scrollbar {
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #d6d6d6;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #00a6ff;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000000;
}

.form-control {
  max-width: 100%;
  height: auto;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

}

.d-flex {
  padding-right: 20px;
}

.modal-content {
  background-color: rgb(0, 0, 0);
}

.btn-close {
  background-color: red;
  margin-right: 20px;
}

@media screen and (max-width: 991px) {
  .container-fluid {
    display: inline-flex;
    margin: 0;
    padding: 0;
    max-width: 60%;
    height: fit-content;
  }


  .nav-item {
    a {
      font-size: 13px;
    }
  }

  .d-flex {
    width: 65%;
  }

  .logo {
    span {
      font-size: 30px;


    }
  }

  @media screen and (max-width: 425px) {
    .container-fluid {
      display: inline-flex;
      margin: 0;
      padding: 0;
      max-width: 70%;
      justify-content: left;
      height: fit-content;
    }

    .nav-item {
      a {
        font-size: 8px;
      }
    }

    .d-flex {
      width: 50%;
    }

    .logo {
      span {
        font-size: 15px;


      }
    }
  }

}
</style>