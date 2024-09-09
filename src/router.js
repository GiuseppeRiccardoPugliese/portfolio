import { createRouter, createWebHistory } from "vue-router";

//Import About
import About from "./pages/About.vue";
import Home from "./pages/Home.vue";
import Contact from "./pages/Contact.vue";
import Projects from "./pages/Projects.vue";
import Games from "./pages/Games.vue";
import Terms_and_conditions from "./pages/Terms_and_conditions.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
    },
    {
      path: "/games",
      name: "games",
      component: Games,
    },
    {
      path: "/terms&conditions",
      name: "terms_and_conditions",
      component: Terms_and_conditions,
    },
  ],
});

window.addEventListener("load", () => {
  // Controllo l'URL corrente
  const currentPath = window.location.pathname;

  // Definisco la rotte delle policy da escludere per il redirect
  const excludedRoutes = ["/terms&conditions"];

  // Se l'URL corrente non è nella lista delle rotte escluse e non è la rotta principale, reimposta alla rotta principale
  if (currentPath !== "/" && !excludedRoutes.includes(currentPath)) {
    router.push("/");
  }
});

export { router };
