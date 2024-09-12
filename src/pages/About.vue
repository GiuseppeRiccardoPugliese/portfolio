<script>
export default {
  name: "About",
  data() {
    return {
      profilePics: [
        "/profilepic.jpg",
        "/pic2.jpeg",
        "/exeedpic4.jpg",
        "/pic3.jpg",
        "/exeedpic5.jpg",
      ],
      currentPicIndex: 0,
      autoplayInterval: null,
    };
  },
  methods: {
    nextProfilePic() {
      this.currentPicIndex =
        (this.currentPicIndex + 1) % this.profilePics.length;
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(this.nextProfilePic, 3000); // Cambio img ogni 3 secondi
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval); // Interrompe l'autoplay
    },
  },
  mounted() {
    this.startAutoplay(); // Avvia l'autoplay quando il componente è completamente montato
  },
  beforeDestroy() {
    this.stopAutoplay(); // Interrompe l'autoplay b4 destroy
  },
  computed: {
    currentProfilePic() {
      return this.profilePics[this.currentPicIndex];
    },
  },
};
</script>

<template>
  <section class="about-section d-flex flex-column justify-content-center h-100">
    <h2 class="text-center mb-5">About Me</h2>

    <div class="row about-content">
      <!-- Colonna sinistra - Immagine -->
      <div class="col-lg-4 d-flex align-items-center justify-content-center">
        <div class="profile-pic-container">
          <img :src="currentProfilePic" alt="Profile Picture" class="profile-pic object-fit-cover w-100 h-100"
            @click="nextProfilePic" @mouseover="stopAutoplay" @mouseout="startAutoplay" />
        </div>
      </div>

      <!-- Colonna destra - Esperienze, Formazione, Descrizione -->
      <div class="col-lg-8">

        <!-- Esperienze -->
        <div class="experience-box mt-md-3 mt-lg-0">
          <h4>Esperienze</h4>
          <p class="m-0">
            Progetti con difficolt&agrave; crescente, ispirandosi a web app e
            siti web reali, come ad esempio Spotify e Whatsapp, per garantire
            un'esperienza di apprendimento concreta e stimolante. <br />
            Sviluppo di una web app food delivery:
          </p>
          <ul>
            <li>
              Scegliere tra una vasta selezione di cucine, con la possibilità di
              trovare i ristoranti che offrono esattamente quello che desideri
              grazie alla ricerca per tipologie di ristoranti;
            </li>
            <li>
              Visualizzare i menu dei ristoranti e personalizzare il tuo ordine
              aggiungendo o rimuovendo piatti direttamente dal carrello;
            </li>
            <li>
              Effettuare pagamenti sicuri grazie all'implementazione di
              Braintree;
            </li>
            <li>
              Per i ristoratori, offriamo la possibilità di visualizzare lo
              storico degli ordini e monitorare le performance del proprio
              ristorante;
            </li>
            <li>
              Registrazione e accesso facili e veloci nell'area riservata ai
              ristoratori, con la possibilità di gestire il proprio menu in modo
              flessibile;
            </li>
            <li>
              I ristoratori possono anche tenere traccia dei
              guadagni mensili/annuali attraverso un pratico grafico che mostra
              l'ammontare delle vendite nel tempo.
            </li>
          </ul>
        </div>

        <!-- Formazione -->
        <div class="education-box">
          <h4>Formazione</h4>
          <p class="m-0">Experis <i class="fa-solid fa-arrow-right"></i> Power-Up Java</p>
          <p class="m-0">Boolean Careers</p>
        </div>

        <!-- Descrizione personale -->
        <div class="description m-0">
          <h4>Descrizione</h4>
          <p class="m-0">
            Ciao a tutti! 😁 Sono Giuseppe, uno Jr Full Stack Web Developer di
            21 anni, vivo a Napoli e ho completato il bootcamp di
            Boolean proseguendo con l'academy di Java con Experis. Fin da quando ero bambino,
            ho coltivato una forte passione per i videogiochi e ho iniziato ad
            immergermi nel mondo degli E-Sport attraverso giochi come
            <a class="text-dark" href="https://lol.fandom.com/wiki/AChuckArell">League of Legends </a>. 🖥️ Questa
            passione mi ha portato a sviluppare un profondo
            interesse per l'informatica e la programmazione decidendo così di
            voler approfondire a tutto tondo questo mondo.
          </p>
        </div>
      </div>

      <!-- Download CV -->
      <div class="cv-download text-center my-5">
        <a class="text-decoration-none text-black p-3 bg-dark-subtle rounded-2"
          href="/Giuseppe_Riccardo_Pugliese_CV.pdf" download>SCARICA CV</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.about-section {
  padding: 48px 100px 0;
  background-color: #f8f9fa;
}

.about-content {
  .left-column {
    height: 100%;
  }

  .profile-pic-container {
    height: 500px;
    width: 400px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }

  .profile-pic {
    transition: transform 0.3s ease-in-out;
  }

  .profile-pic:hover {
    transform: scale(1.1);
  }

  .right-column {
    height: 100%;
  }

  .experience-box,
  .education-box,
  .description {
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;

    h4 {
      margin-bottom: 10px;
    }
  }
}

.experience-box:hover,
.education-box:hover,
.description:hover,
.profile-pic-container:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 767.98px) {
  .about-section {
    padding: 80px 30px 0;

    .col-lg-8 {
      margin-top: 20px;

      .cv-download {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
