// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/

//------------------------NOSSAS FUNÇÕES ---------------------------
function direcaoAleatoria(){
    var i = parseInt(Math.random()*10);
    if((i%2)==0){
        [paraEsquerda,paraDireita,paraCima,paraBaixo] = [false,false,false,true];
    }
    if(!((i%2)==0)){
        [paraEsquerda,paraDireita,paraCima,paraBaixo] = [false,false,true,false];
    }
    if(((i%2)==0)&&(i<=4)){
        [paraEsquerda,paraDireita,paraCima,paraBaixo] = [false,true,false,false];
    }
    if((!((i%2)==0))&&(i>=6)){
        [paraEsquerda,paraDireita,paraCima,paraBaixo] = [true,false,false,false];
    }
}

function grade(){
    for(let i = 0 ; i<=tela.width ; i+=20){
        ctx.strokeStyle = "#202E3B";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,tela.height);
        ctx.stroke();
    }
    for(let i = 0 ; i<=tela.height ; i+=20){
        ctx.strokeStyle = "#070C11";
        ctx.lineWidth = 0.2;
        ctx.moveTo(0,i);
        ctx.lineTo(tela.width,i);
        ctx.stroke();
    }
}

function generateRandomMultipleOf20() {
  const minMultiple = Math.ceil(100 / 20) * 20;
  const maxMultiple = Math.floor(500 / 20) * 20;

  const range = (maxMultiple - minMultiple) / 20;

  const randomIndex = Math.floor(Math.random() * (range + 1));

  const randomNumber = minMultiple + randomIndex * 20;

  return randomNumber;
}

function outputPontos(){
    document.getElementById("output").innerHTML = "Pontuação: "+pontos;
}
function outputVidas(){
    document.getElementById("vidas").innerHTML = "Vidas: "+vidas;
}
function outputDebug(x){
    document.getElementById("debug").innerHTML = x;
}
function rb(b){
    let r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    b = r*TAMANHO_PONTO;
    return b;
};
//-----------
//#070C11
// Declaração de variáveis e constantes
const bomba = {
    b1:0,b2:0,b3:0,b4:0,b5:0,b6:0,b7:0,b8:0,b9:0,b10:0
};
const bomba_x = {
    b1:0,b2:0,b3:0,b4:0,b5:0,b6:0,b7:0,b8:0,b9:0,b10:0
}
const bomba_y = {
    b1:0,b2:0,b3:0,b4:0,b5:0,b6:0,b7:0,b8:0,b9:0,b10:0
}

const comida = {
    c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0,c9:0,c10:0
}
const comida_x = {
    c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0,c9:0,c10:0
}
const comida_y = {
    c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0,c9:0,c10:0
}
const morte = new Audio("SpongeBob sad music.mp3")

const START = document.querySelector(".botaozin")

const comilanca = new Audio("Munch.mp3")
comilanca.volume = 0.3

const explosao = new Audio("Explosion.mp3")
explosao.volume = 0.3

var runTime;

var tela;
var ctx;

var cabeca;
var bola;
var background;

var pontos;
var vidas = 3;

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
direcaoAleatoria();
var noJogo = true;


const TAMANHO_PONTO = 20;
const ALEATORIO_MAXIMO = 29;
const ATRASO = 120;
const ATRASO_INPUT = 10;
const C_ALTURA = 600;
const C_LARGURA = 600;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

START.addEventListener('click', function() {
iniciar(); // Chama função inicial do jogo
START.hidden = true;
});

// Definição das funções

function iniciar() {
    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");
    runTime = 0;

    carregarImagens();
    criarCobra();
    localizarBomba();
    localizarMaca();
    setTimeout("cicloDeJogo()", ATRASO);
}

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "cabeca.png";    
    
    bola = new Image();
    bola.src = "ponto.png";

    background = new Image();
    background.src = "backgroud.png";

    bomba.b1 = new Image();
    bomba.b1.src = "obstaculo.png";
    
    bomba.b2 = new Image();
    bomba.b2.src = "obstaculo.png";
    
    bomba.b3 = new Image();
    bomba.b3.src = "obstaculo.png";
    
    bomba.b4 = new Image();
    bomba.b4.src = "obstaculo.png";
    
    bomba.b5 = new Image();
    bomba.b5.src = "obstaculo.png";
    
    bomba.b6 = new Image();
    bomba.b6.src = "obstaculo.png";
    
    bomba.b7 = new Image();
    bomba.b7.src = "obstaculo.png";

    bomba.b8 = new Image();
    bomba.b8.src = "obstaculo.png";

    bomba.b9 = new Image();
    bomba.b9.src = "obstaculo.png";
    
    bomba.b10 = new Image();
    bomba.b10.src = "obstaculo.png";


    comida.c1 = new Image();
    comida.c1.src = "maca.png";
    
    comida.c2 = new Image();
    comida.c2.src = "maca.png";
    
    comida.c3 = new Image();
    comida.c3.src = "maca.png";
    
    comida.c4 = new Image();
    comida.c4.src = "maca.png";
    
    comida.c5 = new Image();
    comida.c5.src = "maca.png";
    
    comida.c6 = new Image();
    comida.c6.src = "maca.png";
    
    comida.c7 = new Image();
    comida.c7.src = "maca.png";
    
    comida.c8 = new Image();
    comida.c8.src = "maca.png";
    
    comida.c9 = new Image();
    comida.c9.src = "maca.png";
    
    comida.c10 = new Image();
    comida.c10.src = "maca.png";
}

function criarCobra() {
    pontos = 3;
    outputPontos();
	var i = generateRandomMultipleOf20();
    for (var z = 0; z < pontos; z++) {
        x[z] = i - z * TAMANHO_PONTO;
        y[z] = i;
    }
}

function localizarMaca() {
    comida_x.c1 = rb(comida_x.c1);
    comida_x.c2 = rb(comida_x.c2);
    comida_x.c3 = rb(comida_x.c3);
    comida_x.c4 = rb(comida_x.c4);
    comida_x.c5 = rb(comida_x.c5);
    comida_x.c6 = rb(comida_x.c6);
    comida_x.c8 = rb(comida_x.c8);
    comida_x.c9 = rb(comida_x.c9);
    comida_x.c10 = rb(comida_x.c10);

    comida_y.c1 = rb(comida_y.c1);
    comida_y.c2 = rb(comida_y.c2);
    comida_y.c3 = rb(comida_y.c3);
    comida_y.c4 = rb(comida_y.c4);
    comida_y.c5 = rb(comida_y.c5);
    comida_y.c6 = rb(comida_y.c6);
    comida_y.c7 = rb(comida_y.c7);
    comida_y.c8 = rb(comida_y.c8);
    comida_y.c9 = rb(comida_y.c9);
    comida_y.c10 = rb(comida_y.c10);

}


function localizarBomba(){
    bomba_x.b1 = rb(bomba_x.b1);
    bomba_x.b2 = rb(bomba_x.b2);
    bomba_x.b3 = rb(bomba_x.b3);
    bomba_x.b4 = rb(bomba_x.b4);
    bomba_x.b5 = rb(bomba_x.b5);
    bomba_x.b6 = rb(bomba_x.b6);
    bomba_x.b7 = rb(bomba_x.b7);
    bomba_x.b8 = rb(bomba_x.b8);
    bomba_x.b9 = rb(bomba_x.b9);
    bomba_x.b10 = rb(bomba_x.b10);

    bomba_y.b1 = rb(bomba_y.b1);
    bomba_y.b2 = rb(bomba_y.b2);
    bomba_y.b3 = rb(bomba_y.b3);
    bomba_y.b4 = rb(bomba_y.b4);
    bomba_y.b5 = rb(bomba_y.b5);
    bomba_y.b6 = rb(bomba_y.b6);
    bomba_y.b7 = rb(bomba_y.b7);
    bomba_y.b8 = rb(bomba_y.b8);
    bomba_y.b9 = rb(bomba_y.b9);
    bomba_y.b10 = rb(bomba_y.b10);

}

function cicloDeJogo() {
    if (noJogo) {
        outputPontos();
        verificarMaca();
        verificarBomba();
        verificarColisao();
        mover();
        fazerDesenho();
        setTimeout("cicloDeJogo()", ATRASO);
        runTime +=10;
        outputVidas();
    }
}

function pontosParaVidas(){
    if(pontos%5==0){
        vidas++;
    }
}

function verificarMaca() {
    if ((x[0] == comida_x.c1) && (y[0] == comida_y.c1)) {
        pontos++;
        pontosParaVidas();
        comida_x.c1 = rb(comida_x.c1);
        comida_y.c1 = rb(comida_y.c1);
        comilanca.play()
    }
    if ((x[0] == comida_x.c2) && (y[0] == comida_y.c2)) {
        pontos++;
        pontosParaVidas();
        comida_x.c2 = rb(comida_x.c2);
        comida_y.c2 = rb(comida_y.c2);
        comilanca.play()
    }
    if ((x[0] == comida_x.c3) && (y[0] == comida_y.c3)) {
        pontos++;
        pontosParaVidas();
        comida_x.c3 = rb(comida_x.c3);
        comida_y.c3 = rb(comida_y.c3);
        comilanca.play()
    }
    if ((x[0] == comida_x.c4) && (y[0] == comida_y.c4)) {
        pontos++;
        pontosParaVidas();
        comida_x.c4 = rb(comida_x.c4);
        comida_y.c4 = rb(comida_y.c4);
        comilanca.play()
    }
    if ((x[0] == comida_x.c5) && (y[0] == comida_y.c5)) {
        pontos++;
        pontosParaVidas();
        comida_x.c5 = rb(comida_x.c5);
        comida_y.c5 = rb(comida_y.c5);
        comilanca.play()
    }
    if ((x[0] == comida_x.c6) && (y[0] == comida_y.c6)) {
        pontos++;
        pontosParaVidas();
        comida_x.c6 = rb(comida_x.c6);
        comida_y.c6 = rb(comida_y.c6);
        comilanca.play()
    }
    if ((x[0] == comida_x.c7) && (y[0] == comida_y.c7)) {
        pontos++;
        pontosParaVidas();
        comida_x.c7 = rb(comida_x.c7);
        comida_y.c7 = rb(comida_y.c7);
        comilanca.play()
    }
    if ((x[0] == comida_x.c8) && (y[0] == comida_y.c8)) {
        pontos++;
        pontosParaVidas();
        comida_x.c8 = rb(comida_x.c8);
        comida_y.c8 = rb(comida_y.c8);
        comilanca.play()
    }
    if ((x[0] == comida_x.c9) && (y[0] == comida_y.c9)) {
        pontos++;
        pontosParaVidas();
        comida_x.c9 = rb(comida_x.c9);
        comida_y.c9 = rb(comida_y.c9);
        comilanca.play()
    }
    if ((x[0] == comida_x.c10) && (y[0] == comida_y.c10)) {
        pontos++;
        pontosParaVidas();
        comida_x.c10 = rb(comida_x.c10);
        comida_y.c10 = rb(comida_y.c10);
        comilanca.play()
    }
}

function verificarBomba() {
    if((x[0]==bomba_x.b1)&&(y[0]==bomba_y.b1)){
        pontos--;
        vidas--;
        bomba_x.b1 = rb(bomba_x.b1);
        bomba_y.b1 = rb(bomba_y.b1);
        explosao.play();
    }
    if((x[0]==bomba_x.b2)&&(y[0]==bomba_y.b2)){
        pontos--;
        vidas--;
        bomba_x.b2 = rb(bomba_x.b2);
        bomba_y.b2 = rb(bomba_y.b2);
        explosao.play();
    }
    if((x[0]==bomba_x.b3)&&(y[0]==bomba_y.b3)){
        pontos--;
        vidas--;
        bomba_x.b3 = rb(bomba_x.b3);
        bomba_y.b3 = rb(bomba_y.b3);
        explosao.play();
    }
    if((x[0]==bomba_x.b4)&&(y[0]==bomba_y.b4)){
        pontos--;
        vidas--;
        bomba_x.b4 = rb(bomba_x.b4);
        bomba_y.b4 = rb(bomba_y.b4);
        explosao.play();
    }
    if((x[0]==bomba_x.b5)&&(y[0]==bomba_y.b5)){
        pontos--;
        vidas--;
        bomba_x.b5 = rb(bomba_x.b5);
        bomba_y.b5 = rb(bomba_y.b5);
        explosao.play();
    }
    if((x[0]==bomba_x.b6)&&(y[0]==bomba_y.b6)){
        pontos--;
        vidas--;
        bomba_x.b6 = rb(bomba_x.b6);
        bomba_y.b6 = rb(bomba_y.b6);
        explosao.play();
    }
    if((x[0]==bomba_x.b7)&&(y[0]==bomba_y.b7)){
        pontos--;
        vidas--;
        bomba_x.b7 = rb(bomba_x.b7);
        bomba_y.b7 = rb(bomba_y.b7);
        explosao.play();
    }
    if((x[0]==bomba_x.b8)&&(y[0]==bomba_y.b8)){
        pontos--;
        vidas--;
        bomba_x.b8 = rb(bomba_x.b8);
        bomba_y.b8 = rb(bomba_y.b8);
        explosao.play();
    }
    if((x[0]==bomba_x.b9)&&(y[0]==bomba_y.b9)){
        pontos--;
        vidas--;
        bomba_x.b9 = rb(bomba_x.b9);
        bomba_y.b9 = rb(bomba_y.b9);
        explosao.play();
    }
    if((x[0]==bomba_x.b10)&&(y[0]==bomba_y.b10)){
        pontos--;
        vidas--;
        bomba_x.b10 = rb(bomba_x.b10);
        bomba_y.b10 = rb(bomba_y.b10);
        explosao.play();
    }
} 

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
    }

    if(vidas==0){
        noJogo = false;
    }

    if((pontos==0)&&(vidas!=0)){
        pontos=1;
        vidas--;
    }

    if (y[0] >= C_ALTURA) {
        y[0] = 0;
    }

    if (y[0] < 0) {
       y[0] = C_ALTURA;
    }

    if (x[0] >= C_LARGURA) {
      x[0] = 0;
    }

    if (x[0] < 0) {
      x[0] = C_LARGURA;
    }
}

function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z-1];
        y[z] = y[z-1];
    }

    if (paraEsquerda) {
        x[0] -= TAMANHO_PONTO;
    }

    if (paraDireita) {
        x[0] += TAMANHO_PONTO;
    }

    if (paraCima) {
        y[0] -= TAMANHO_PONTO;
    }

    if (paraBaixo) {
        y[0] += TAMANHO_PONTO;
    }
}    

function fazerDesenho() {
    ctx.drawImage(background,0,0)
    grade();
    
    if (noJogo) {
        ctx.drawImage(comida.c1, comida_x.c1, comida_y.c1);
        ctx.drawImage(comida.c2, comida_x.c2, comida_y.c2);
        ctx.drawImage(comida.c3, comida_x.c3, comida_y.c3);
        ctx.drawImage(comida.c4, comida_x.c4, comida_y.c4);
        ctx.drawImage(comida.c5, comida_x.c5, comida_y.c5);
        ctx.drawImage(comida.c6, comida_x.c6, comida_y.c6);
        ctx.drawImage(comida.c7, comida_x.c7, comida_y.c7);
        ctx.drawImage(comida.c8, comida_x.c8, comida_y.c8);
        ctx.drawImage(comida.c9, comida_x.c9, comida_y.c9);
        ctx.drawImage(comida.c10, comida_x.c10, comida_y.c10);

        ctx.drawImage(bomba.b1,bomba_x.b1,bomba_y.b1);
        ctx.drawImage(bomba.b2,bomba_x.b2,bomba_y.b2);
        ctx.drawImage(bomba.b3,bomba_x.b3,bomba_y.b3);
        ctx.drawImage(bomba.b4,bomba_x.b4,bomba_y.b4);
        ctx.drawImage(bomba.b5,bomba_x.b5,bomba_y.b5);
        ctx.drawImage(bomba.b6,bomba_x.b6,bomba_y.b6);
        ctx.drawImage(bomba.b7,bomba_x.b7,bomba_y.b7);
        ctx.drawImage(bomba.b8,bomba_x.b8,bomba_y.b8);
        ctx.drawImage(bomba.b9,bomba_x.b9,bomba_y.b9);
        ctx.drawImage(bomba.b10,bomba_x.b10,bomba_y.b10);

		
        for (var z = 0; z < pontos; z++) {
            if (z == 0) {
                ctx.drawImage(cabeca, x[z], y[z]);
            } else {
                ctx.drawImage(bola, x[z], y[z]);
            }
        }    
    } else {
        fimDeJogo();
    }        
}

function fimDeJogo() {
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 50px serif";
    ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
    morte.play();
    morte.volume = 0.2;
}

function verificarTecla(e) {
    var tecla = e.keyCode;

    if ((tecla == TECLA_ESQUERDA) && (!paraDireita)) {
        paraEsquerda = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_DIREITA) && (!paraEsquerda)) {
        paraDireita = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_ACIMA) && (!paraBaixo)) {
        paraCima = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if ((tecla == TECLA_ABAIXO) && (!paraCima)) {
        paraBaixo = true;
        paraDireita = false;
        paraEsquerda = false;
    }        
}
