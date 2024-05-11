<script>
// import { scrollTo } from "vue-scrollto";
// import { router } from "../router";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <section class="bg-image">
    <!-- Jumbotron -->
    <div
      class="jumbotron d-flex flex-column vh-100 align-items-center justify-content-center text-center"
    >
      <!-- Scritta principale -->
      <div class="main-text col-12">
        <h1 class="display-4 text-wrap">Giuseppe Riccardo Pugliese</h1>
      </div>

      <!-- Scritta secondaria -->
      <div class="sub-text">
        <p class="lead text-wrap">Jr. Full-Stack Web Developer</p>
      </div>

      <!-- ProfilePick -->
      <img
        src="../assets/profilepic.jpg"
        alt="Avatar"
        class="avatar img-fluid"
      />

      <div
        class="icon-container px-1 py-3 d-flex align-items-center justify-content-center"
      >
        <a
          class="d-flex mx-1 text-dark"
          href="https://www.linkedin.com/in/giuseppe-pugliese03/"
          ><i class="fa-brands fa-linkedin fs-3"></i
        ></a>

        <a
          class="d-flex mx-1 text-dark"
          href="https://github.com/GiuseppeRiccardoPugliese"
        >
          <i class="fa-brands fa-github fs-3"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.bg-image {
  background-image: url("../assets/bg-image.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  .jumbotron {
    // background-color: #f8f9fa;
    .avatar {
      width: 300px;
      border-radius: 50%;
    }

    .main-text,
    .sub-text {
      overflow: hidden;
    }

    .main-text h1,
    .sub-text p {
      display: inline-block;
      white-space: nowrap;
      opacity: 0;
    }

    .main-text h1 {
      animation: fadeIn 2s ease 0.3s forwards;
    }

    .sub-text p {
      animation: fadeIn 2s ease 0.7s forwards;
    }
  }
}

/*fade-in */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
a {
  transition: opacity 0.3s ease;
}

a:hover {
  opacity: 0.6;
}
</style>
