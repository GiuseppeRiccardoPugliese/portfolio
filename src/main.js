import { createApp } from "vue";
import App from "./App.vue";

//Route
import { router } from "./router";

//Bootstrap
import * as bootstrap from "bootstrap";

//Import EmailJS
// import emailjs from "@emailjs/browser";

createApp(App).use(router).mount("#app");
