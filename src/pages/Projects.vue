<script>
import axios from "axios";
// import config from "../config.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default {
  name: "Projects",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      repositories: [], // Array contenente le mie repo
      // Token
      token: process.env.VUE_APP_TOKEN,
      // token: config.token,
      searchDone: false, // Variabile per vedere se la ricerca è stata effettuata
      loading: false, // Loader
      currentPage: 1, // Pagina corrente
      itemsPerPage: 20, // Numero di repository per pagina
      technologies: [
        { name: "HTML", img: "html5-original.svg" },
        { name: "CSS", img: "css3-original.svg" },
        { name: "Sass", img: "sass-original.svg" },
        { name: "Bootstrap", img: "bootstrap-original.svg" },
        { name: "JavaScript", img: "javascript-original.svg" },
        { name: "Vue", img: "vuejs-original.svg" },
        { name: "Vite", img: "vitejs-original.svg" },
        { name: "PHP", img: "php-original.svg" },
        { name: "Laravel", img: "laravel-original.svg" },
        { name: "Java", img: "java-original.svg" },
        { name: "MySQL", img: "mysql-original.svg" },
      ],
      selectedTechnologies: [], //Array per filtrare le tech
      originalRepositories: [], //Array originale
      filteredTechnologies: ["HTML", "CSS", "JavaScript", "Vue", "PHP", "Java"],
    };
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  computed: {
    // Calcolo del numero totale di pagine
    totalPages() {
      return Math.ceil(this.repositories.length / this.itemsPerPage);
    },
    // Ottengo le repo per la pagina corrente
    paginatedRepositories() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.repositories.slice(startIndex, endIndex);
    },
    filteredRepositories() {
      if (this.selectedTechnologies.length === 0) {
        return this.repositories;
      }
      return this.repositories.filter((repo) =>
        this.selectedTechnologies.includes(repo.language)
      );
    },
  },
  methods: {
    //Function per il path dell'img
    // getImgUrl(img) {
    //   return new URL(`/src/assets/${img}`, import.meta.url).href;
    // },
    //Function per il path dell'img nelle card
    getTechnologyImage(language) {
      // Tecnologia corrispondente al linguaggio
      const tech = this.technologies.find(
        (tech) => tech.name.toLowerCase() === language?.toLowerCase()
      );
      // Return del percorso dell'immagine o un'immagine di default se la tecnologia non è trovata
      return tech ? `/${tech.img}` : '/noImageFound.webp';
    },

    async getRepo() {
      // Imposto lo stato di caricamento del loader su true prima di fare la chiamata API
      this.loading = true;

      let url = `https://api.github.com/users/GiuseppeRiccardoPugliese/repos`;

      try {
        let allRepos = [];
        let page = 1;

        // Ciclo finché ci sono risultati nelle pagine successive
        while (true) {
          const response = await axios.get(url, {
            params: {
              page: page,
              per_page: 100, // Ottiene fino a 100 repository per pagina
            },
            headers: {
              Authorization: `Bearer ${this.token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });

          // Aggiungo i repository della pagina corrente all'array allRepos[]
          allRepos.push(...response.data);
          console.log(response.data);
          // Se la pagina corrente ha meno di 100 risultati, interrompo il ciclo
          if (response.data.length < 100) {
            break;
          }

          // Pagina successiva
          page++;
        }

        // Aggiorno i dati di repositories [] con quelli di allRepos [] con tutti i repository ottenuti
        this.repositories = allRepos;
        this.originalRepositories = allRepos;

        this.searchDone = true; // Imposto la variabile su true quando è effettuata la chiamata

        // console.log("log array repo", this.repositories);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        this.repositories = []; // Pulisco l'array iniziale in caso di errore
      } finally {
        // Imposta lo stato del loader su false quando ottengo i risultati
        this.loading = false;
      }
    },
    // Vai alla pagina precedente
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Vai alla pagina successiva
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    getTech(name) {
      const index = this.selectedTechnologies.indexOf(name);
      if (index === -1) {
        this.selectedTechnologies.push(name);
      } else {
        this.selectedTechnologies.splice(index, 1);
      }
      this.searchTech();
    },
    searchTech() {
      if (this.selectedTechnologies.length === 0) {
        this.repositories = [...this.originalRepositories];
        return;
      }

      let filteredRepositories = [...this.originalRepositories];
      filteredRepositories = filteredRepositories.filter((repo) => {
        return this.selectedTechnologies.includes(repo.language);
      });

      this.repositories = filteredRepositories;
    },
  },
};
</script>

<template>
  <section class="projects-section h-100">
    <!-- Stack -->
    <h2 class="text-center mb-5">Stack</h2>

    <!-- Carosello con Swiper -->
    <swiper :slidesPerView="8" :spaceBetween="20" :loop="true" :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }" :modules="modules" :breakpoints="{
      '200': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '299': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '350': {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      '500': {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      '750': {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      '950': {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      '1150': {
        slidesPerView: 6,
        spaceBetween: 30,
      },
      '1200': {
        slidesPerView: 8,
        spaceBetween: 60,
      },
    }" class="mySwiper my-5 pb-5 responsive_slider">
      //ciclo per le slide del carosello
      <swiper-slide v-for="(tech, index) in technologies" :key="index"
        class="d-flex justify-content-center align-items-center skill-slide">
        <img :src="`/${tech.img}`" :alt="tech.name" class="tech-logo" />
      </swiper-slide>
    </swiper>

    <!-- Progetti -->
    <h2 class="text-center mb-4">Progetti</h2>

    <!-- Loader -->
    <div class="loader-container" v-if="loading">
      <div class="loader"></div>
    </div>

    <!-- Filtro Tecnologie con input -->
    <div class="tech-filters text-center" v-if="searchDone">
      <span class="d-block text-danger mb-1">Numero di progetti: {{ repositories.length }}</span>
      <div v-for="(tech, index) in filteredTechnologies" :key="index" class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" :value="tech" @change="getTech(tech)" />
        <label class="form-check-label align-middle">{{ tech }}</label>
      </div>
    </div>

    <!-- Btn che al click fa vedere i miei progetti -->
    <div class="d-flex justify-content-center" v-if="!searchDone">
      <button class="btn btn-outline-primary" type="submit" @click="getRepo()">
        I miei progetti
      </button>
    </div>

    <!-- CARD REPO -->
    <div class="container">
      <div class="row justify-content-center mt-4">
        <div v-for="(repo, index) in paginatedRepositories" :key="index" class="card m-3 shadow"
          style="width: 18rem; min-height: 350px">
          <div class="img_container d-flex justify-content-center align-items-center">
            <img :src="getTechnologyImage(repo.language)" class="card-img-top" alt="tech_img"
              style="width: 100px; height: 100px;" />
          </div>
          <div class="card-body h-100 d-flex flex-column">
            <h5 class="card-title text-center">
              {{ repo.name }}
            </h5>
            <span v-if="repo.language" class="card-text text-center">Linguaggio: <b>{{ repo.language }}</b></span>
            <a :href="repo.html_url" class="btn btn-primary mt-auto">Vai alla repo
              <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginazione -->
    <div class="pagination-container my-4 d-flex justify-content-center"
      :class="this.repositories.length == 0 ? 'd-none' : ''">
      <button class="btn btn-primary me-2" @click="prevPage()" :disabled="currentPage === 1">
        Prev
      </button>
      <button class="btn btn-primary" @click="nextPage()" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.projects-section {
  padding: 48px 100px 0;
  // background-color: #f8f9fa;
  // height: 100%;

  .card {
    background: linear-gradient(to right, #bdc3c7, #2c3e50);

    .img_container {
      width: 100%;
      height: 100%;
      padding-top: 10px;
    }

    h5,
    span {
      color: ghostwhite;
    }
  }

  //Input per filtrare le tech
  .tech-filters {
    margin-bottom: 20px;

    .form-check {
      margin-right: 10px;
    }

    .form-check-input {
      border: 2px solid #2c3e50;
    }

    .form-check-input:checked {
      background-color: #2c3e50;
      border-color: #2c3e50 !important;
    }
  }

  //Carosello
  .skill-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .tech-logo {
      max-width: 80px;
      max-height: 80px;
    }
  }

  //Card shadow
  .card.shadow {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card.shadow:hover {
    transform: scale(1.05);
  }

  // LOADER SETUP
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .loader {
      border: 8px solid #f3f3f3;
      border-top: 8px solid #3498db;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 767.98px) {
  .projects-section {
    padding: 80px 30px 0;
  }
}
</style>
