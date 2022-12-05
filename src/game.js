const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

let fps = 30;
let tamanhoDoBloco = 20;
let corDaParede = "#342DCA";

let tamanhaoEspacoDaParede = tamanhoDoBloco / 1.5;
let paredeOffset = (tamanhoDoBloco - tamanhaoEspacoDaParede) / 2;
let corInternaDaParede = "black";

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

// 21 columns // 23 rows
// matriz com o mapa
let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let gameLoop = () => {
  update();
  draw();
};

let update = () => {
  // o que ocorre durante o jogo
};

let draw = () => {
  // desenha o tabuleiro no canvas
  createRect(0, 0, canvas.width, canvas.height, "black");
  drawWalls(); // desenha paredes do mapa
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

// metodo para desenhar as paredes
let drawWalls = () => {
  // procurar qual posição na matriz equivale a uma parede
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      // comparação
      if (map[i][j] == 1) {
        createRect(
          j * tamanhoDoBloco,
          i * tamanhoDoBloco,
          tamanhoDoBloco,
          tamanhoDoBloco,
          corDaParede
        );
      }

      if (j > 0 && map[i][j - 1] == 1) {
        createRect(
          j * tamanhoDoBloco,
          i * tamanhoDoBloco + paredeOffset,
          tamanhaoEspacoDaParede + paredeOffset,
          tamanhaoEspacoDaParede,
          corInternaDaParede
        );
      }

      if (j < map[0].length - 1 && map[i][j + 1] == 1) {
        createRect(
          j * tamanhoDoBloco + paredeOffset,
          i * tamanhoDoBloco + paredeOffset,
          tamanhaoEspacoDaParede + paredeOffset,
          tamanhaoEspacoDaParede,
          corInternaDaParede
        );
      }
      if (i > 0 && map[i - 1][j] == 1) {
        createRect(
          j * tamanhoDoBloco + paredeOffset,
          i * tamanhoDoBloco,
          tamanhaoEspacoDaParede,
          tamanhaoEspacoDaParede + paredeOffset,
          corInternaDaParede
        );
      }

      if (i < map.length - 1 && map[i + 1][j] == 1) {
        createRect(
          j * tamanhoDoBloco + paredeOffset,
          i * tamanhoDoBloco + paredeOffset,
          tamanhaoEspacoDaParede,
          tamanhaoEspacoDaParede + paredeOffset,
          corInternaDaParede
        );
      }
    }
  }
};
