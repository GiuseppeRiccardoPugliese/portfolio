<script>
import emailjs from "@emailjs/browser";
import config from "../config.js";

export default {
  name: "Contact",
  data() {
    return {
      //EmailJs
      formSubmitted: false,
      // serviceToken: config.serviceToken,
      // template: config.template,
      // publicKey: config.publicKey,
      serviceToken: process.env.VUE_APP_SERVICE_TOKEN,
      template: process.env.VUE_APP_TEMPLATE,
      publicKey: process.env.VUE_APP_PUBLIC_KEY,
      //Email Phone-Number
      email: 'giuseppe.riccardo.pugliese@gmail.com',
      phone: '+39 3314032414',
    };
  },
  methods: {
    offuscate(text) { //Offuscare da CRAWLER
      return text.split('').map(char => `&#${char.charCodeAt(0)};`).join('');
    },
    async handleSubmit() {
      try {
        // Invio email utilizzando emailjs
        await emailjs.sendForm(
          this.serviceToken, // ID del servizio
          this.template, // ID del template
          this.$refs.form, // Il riferimento al form
          this.publicKey // La public key
        );
        // console.log("Email inviata con successo!");
        // Imposto formSubmitted a true dopo l'invio del modulo cosi da far uscire il messaggio presente nel template
        this.formSubmitted = true;
      } catch (error) {
        console.error("Errore durante l'invio dell'email:", error);
      }
    },
  },
  computed: {
    emailVisible() {
      return this.offuscate(this.email);
    },
    phoneVisible() {
      return this.offuscate(this.phone);
    }
  },
};
</script>

<template>
  <section class="contact-section">
    <div class="container h-100">
      <h2 class="text-center mb-5">Contattami</h2>

      <!-- Modulo di contatto -->
      <div class="contact-form">
        <form ref="form" @submit.prevent="handleSubmit" class="form">
          <div class="form-group">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" name="user_name" required />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="user_email" required />
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Messaggio</label>
            <textarea class="form-control" id="message" rows="5" name="message" required></textarea>
          </div>

          <!-- Privacy -->
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="terms" name="terms" required />
            <label class="form-check-label" for="terms">
              Accetto i <a href="/terms&conditions" target="_blank">termini e condizioni della privacy</a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary mb-4" :class="formSubmitted ? 'disabled' : ''">
            Invia
          </button>
        </form>
        <small>Inviami una email</small>

        <!-- Messaggio di ringraziamento -->
        <div v-if="formSubmitted" class="alert alert-success" role="alert">
          Grazie per avermi contattato! Ti risponder&ograve; il prima possibile.
        </div>
      </div>

      <!-- Informazioni di contatto -->
      <div class="contact-info">
        <h4 class="info-title">Informazioni di contatto</h4>
        <p>Email: <span v-html="emailVisible"></span></p> <!-- OFFUSCAMENTO CRAWLER -->
        <p>Telefono: <span v-html="phoneVisible"></span></p> <!-- OFFUSCAMENTO CRAWLER -->
        <p class="d-flex align-items-center">
          Linkedin:
          <a class="mx-1 d-flex" href="https://www.linkedin.com/in/giuseppe-pugliese03/"><i
              class="fa-brands fa-linkedin fs-4"></i></a>
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.contact-section {
  background-color: #f8f9fa;
  padding: 48px 100px 0;
  height: 100vh;
  overflow-y: scroll;

  .section-title {
    text-align: center;
    color: #333;
    font-size: 36px;
    margin-bottom: 40px;
  }

  .contact-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .form {
    max-width: 500px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 18px;
    color: #555;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .btn-primary {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 18px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .alert-success {
    margin-top: 20px;
    padding: 15px;
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  .contact-info {
    margin-top: 40px;
  }

  .info-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 767.98px) {
  .contact-section {
    padding: 80px 30px 0;

    p {
      word-break: break-all;
    }
  }
}
</style>
