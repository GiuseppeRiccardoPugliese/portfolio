<script>
import { scrollTo } from "vue-scrollto";

export default {
  name: "AppHeader",
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <header>
    <nav class="navbar-container">
      <ul class="nav nav-underline">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            aria-current="page"
            :class="this.$route.path == '/' ? 'active' : ''"
          >
            <i class="fa fa-home"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            :class="this.$route.path == '/about' ? 'active' : ''"
          >
            <i class="fa fa-info-circle"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/contact"
            class="nav-link"
            :class="this.$route.path == '/contact' ? 'active' : ''"
          >
            <i class="fa-solid fa-phone"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/projects"
            class="nav-link"
            :class="this.$route.path == '/projects' ? 'active' : ''"
          >
            <i class="fa-solid fa-briefcase"></i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

/* Stili per il contenitore della navbar */
.navbar-container {
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border: 2px solid rgb(4, 0, 255);
  border-radius: 8px;
  margin-left: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 60px;
  transition: width 0.3s ease; /* Transizione per la larghezza */

  &:hover {
    width: 150px; /* Larghezza all'hover del mouse */
  }

  .nav {
    flex-direction: column;
  }
}

.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px; /* Height dei link */
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease; /* Transizione per il colore di sfondo e del testo */

  &:hover {
    background-color: #f0f0f0;
    color: #007bff;
  }

  i {
    font-size: 22px;
  }
}

@media screen and (max-width: 767.98px) {
  .navbar-container {
    top: 0%;
    transform: translateY(0%);
    position: absolute;
    width: 100%;
    margin: 0;
    border: 0;
    border-radius: 0;
    &:hover {
      width: 100%;
    }
    .nav {
      flex-direction: row;
      justify-content: space-evenly;
    }
    .nav-link {
      height: auto;
      width: 60px;
      padding: 10px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
