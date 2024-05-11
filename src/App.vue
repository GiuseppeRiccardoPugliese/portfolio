<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <!-- HEADER -->
  <AppHeader />

  <!-- MAIN -->
  <main>
    <router-view></router-view>
  </main>

  <!-- FOOTER -->
  <!-- <AppFooter/> -->
</template>

<style lang="scss">
@use "./styles/general.scss" as *;
@use "./styles/partials/variables" as *;
</style>
