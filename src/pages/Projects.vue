<script>
import axios from "axios";
import config from "../config.js";

export default {
  name: "Projects",
  data() {
    return {
      repositories: [], // Array contenente le mie repo
      token: config.token, // Token
      searchDone: false, // Variabile per vedere se la ricerca è stata effettuata
      loading: false, // Loader
      currentPage: 1, // Pagina corrente
      itemsPerPage: 20, // Numero di repository per pagina
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
  },
  methods: {
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

          // Se la pagina corrente ha meno di 100 risultati, interrompo il ciclo
          if (response.data.length < 100) {
            break;
          }

          // Pagina successiva
          page++;
        }

        // Aggiorno i dati di repositories [] con quelli di allRepos [] con tutti i repository ottenuti
        this.repositories = allRepos;

        this.searchDone = true; // Imposto la variabile su true quando è effettuata la chiamata

        console.log("log array repo", this.repositories);
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
  },
};
</script>

<template>
  <section class="projects-section h-100">
    <h2 class="text-center mb-5">Progetti</h2>

    <!-- Loader -->
    <div class="loader-container" v-if="loading">
      <div class="loader"></div>
    </div>

    <!-- Btn che al click fa vedere i miei progetti -->
    <button class="btn btn-outline-primary" type="submit" @click="getRepo()">
      I miei progetti
    </button>

    <!-- CARD REPO -->
    <div class="container">
      <div class="row justify-content-center mt-4">
        <div
          v-for="(repo, index) in paginatedRepositories"
          :key="index"
          class="card m-3 shadow"
          style="width: 18rem; min-height: 350px"
        >
          <div
            class="img_container d-flex justify-content-center align-items-center"
          >
            <img
              :src="repo.owner.avatar_url"
              class="card-img-top rounded-circle"
              alt="repo_img"
            />
          </div>
          <div class="card-body h-100 d-flex flex-column">
            <h5 class="card-title">
              {{ repo.name }}
            </h5>
            <span v-if="repo.language" class="card-text"
              >Linguaggio: <b>{{ repo.language }}</b></span
            >
            <a :href="repo.html_url" class="btn btn-primary mt-auto"
              >Vai alla repo
              <i class="fa-solid fa-arrow-up-right-from-square"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginazione -->
    <div
      class="pagination-container my-4 d-flex justify-content-center"
      :class="this.repositories.length == 0 ? 'd-none' : ''"
    >
      <button
        class="btn btn-primary me-2"
        @click="prevPage()"
        :disabled="currentPage === 1"
      >
        Prev
      </button>
      <button
        class="btn btn-primary"
        @click="nextPage()"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.projects-section {
  padding: 48px 100px 0;
  .card {
    background: linear-gradient(to right, #ff9ff3, #ff6bcb);
    .img_container {
      width: 100%;
      height: 100%;
      padding-top: 10px;

      img {
        width: 10rem;
      }
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
