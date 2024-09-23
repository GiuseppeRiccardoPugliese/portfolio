<template>
  <div class="canvas_container">
    <canvas ref="gameCanvas" width="800" height="600" @click="jump()" @keydown.space.prevent></canvas>
    <div v-if="gameOver" class="game-over">
      <h1>Game Over</h1>
      <p>Score: {{ score }}</p>
      <button @click="restartGame">Restart</button>
    </div>
    <div v-else class="game-start">
      <h3 v-if="!gameStarted">Space or Left-Click for jump</h3>
      <button v-if="!gameStarted" @click="startGame">Play</button>
    </div>
  </div>
</template>

<script>
import birdImage from "/public/flappy_bird_icon.svg";

export default {
  data() {
    return {
      bird: {
        x: 50,
        y: 150,
        width: 50,
        height: 50,
        gravity: 1,
        lift: -9,
        velocity: 0,
      },
      pipes: [],
      frameCount: 0,
      score: 0,
      gameOver: false,
      gameInterval: null,
      gameStarted: false,
      canvas: null,
    };
  },
  methods: {
    jump() {
      if (!this.gameOver) {
        this.bird.velocity = this.bird.lift;
      }
    },
    onSpacePressed(event) {
      if (event.code === "Space") {
        this.jump();
      }
    },
    startGame() {
      this.bird.y = 200;
      this.bird.velocity = 0;
      this.pipes = [];
      this.frameCount = 0;
      this.score = 0;
      this.gameOver = false;
      this.canvas = this.$refs.gameCanvas;

      this.gameInterval = setInterval(this.draw, 30);
      this.gameStarted = true;
    },
    restartGame() {
      clearInterval(this.gameInterval);
      this.startGame();
    },
    draw() {
      if (!this.canvas) return; // Verifichiamo se this.canvas è definito

      const ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


      ctx.drawImage(
        this.bird.img,
        this.bird.x,
        this.bird.y,
        this.bird.width,
        this.bird.height
      );

      // Update bird position
      this.bird.velocity += this.bird.gravity;
      this.bird.y += this.bird.velocity;

      if (
        this.bird.y + this.bird.height > this.canvas.height ||
        this.bird.y < 0
      ) {
        this.endGame();
      }

      // Generate pipes
      if (this.frameCount % 55 === 0) {
        this.pipes.push(this.createPipe());
      }

      // Draw pipes
      for (let i = this.pipes.length - 1; i >= 0; i--) {
        const pipe = this.pipes[i];
        pipe.x -= 4;
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(
          pipe.x,
          this.canvas.height - pipe.bottom,
          pipe.width,
          pipe.bottom
        );

        // Check for collisions
        if (this.checkCollision(this.bird, pipe)) {
          this.endGame();
        }

        // Remove offscreen pipes and increase score
        if (pipe.x + pipe.width < 0) {
          this.pipes.splice(i, 1);
          this.score++;
        }
      }

      this.frameCount++;
    },
    createPipe() {
      const gap = 140;
      const topHeight = Math.floor(Math.random() * (this.canvas.height / 2));
      const bottomHeight = this.canvas.height - (topHeight + gap);

      return {
        x: this.canvas.width,
        width: 50,
        top: topHeight,
        bottom: bottomHeight,
      };
    },
    checkCollision(bird, pipe) {
      // Hitbox dell'uccello
      const birdHitbox = {
        x: bird.x + 5, // Buffer per evitare collisioni indesiderate
        y: bird.y + 5,
        width: bird.width - 17, // Ridotto per margine di sicurezza
        height: bird.height - 17
      };

      // Hitbox delle pipe
      const topPipeHitbox = {
        x: pipe.x,
        y: 0,
        width: pipe.width,
        height: pipe.top
      };

      const bottomPipeHitbox = {
        x: pipe.x,
        y: this.canvas.height - pipe.bottom,
        width: pipe.width,
        height: pipe.bottom
      };

      // Controllo collisione con la pipe superiore
      if (
        birdHitbox.x < topPipeHitbox.x + topPipeHitbox.width &&
        birdHitbox.x + birdHitbox.width > topPipeHitbox.x &&
        birdHitbox.y < topPipeHitbox.y + topPipeHitbox.height &&
        birdHitbox.y + birdHitbox.height > topPipeHitbox.y
      ) {
        return true;
      }

      // Controllo collisione con la pipe inferiore
      if (
        birdHitbox.x < bottomPipeHitbox.x + bottomPipeHitbox.width &&
        birdHitbox.x + birdHitbox.width > bottomPipeHitbox.x &&
        birdHitbox.y < bottomPipeHitbox.y + bottomPipeHitbox.height &&
        birdHitbox.y + birdHitbox.height > bottomPipeHitbox.y
      ) {
        return true;
      }

      return false;
    },
    endGame() {
      clearInterval(this.gameInterval);
      this.gameOver = true;
    },
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;
    window.addEventListener("keydown", this.onSpacePressed);

    this.bird.img = new Image();
    this.bird.img.src = birdImage;
  },
  beforeDestroy() {
    clearInterval(this.gameInterval);
  },
};
</script>

<style scoped lang="scss">
.canvas_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f8f9fa;

  canvas {
    background: url("/public/flappy_bird_backdrop.png") repeat-x;
    background-size: cover;
    max-width: 100%;
    height: auto;
  }

  .game-start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    font-size: 24px;
  }

  .game-over {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    font-size: 24px;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
  }
}

@media screen and (max-width: 767.98px) {
  canvas {
    width: 100%;
    height: auto;
  }
}
</style>
