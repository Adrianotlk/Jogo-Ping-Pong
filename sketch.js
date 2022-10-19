//APi https://p5js.org/reference/

// variaveis da bolinha;
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

// velocidade da bolinha;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete;
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;

//variaveis do oponente;
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// Marca placar
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound('libraries/trilha.mp3');
  ponto = loadSound('libraries/ponto.mp3');
  raquetada = loadSound('libraries/raquetada.mp3');

}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background('green');
  mostraBolinha(); 
  movimentaBolinha();
  verificaColisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);  
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete(); Função usada antes de adicionar a bibioletaca P5.js;
  verificaColisãoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisãoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro,);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBolinha() {
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    
  }

  if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
    raquetada.play();  

  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(87)){
    yRaquete -= 10;
  } else if(keyIsDown(83)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() { // Necessario verificar na biblioteca P5js o codigo das teclas.
  if(keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10;
  } else if(keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
}

/* função usada para colisão da bolinha antes de insetir a biblioteca p5.js;
function verificaColisaoRaquete() {
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= - 1
    raquetada.play();

  }
 
}*/

function verificaColisãoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= - 1

  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color (255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color (255, 140, 0))
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if(xBolinha + raio > 599) {
    meusPontos++
    ponto.play();
  } else if(xBolinha - raio < 1) {
    pontosDoOponente++
    ponto.play();
  }
}
