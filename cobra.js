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
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 0.2;
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,tela.height);
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
    document.getElementById("output").innerHTML = pontos;
}
function outputDebug(x){
    document.getElementById("debug").innerHTML = x;
}
//-----------

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
var runTime;

var tela;
var ctx;

var cabeca;
var maca;
var bola;

var pontos;
var maca_x;
var maca_y;


var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
direcaoAleatoria();
var noJogo = true;


const TAMANHO_PONTO = 20;
const ALEATORIO_MAXIMO = 29;
const ATRASO = 120;
const C_ALTURA = 600;
const C_LARGURA = 600;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla


iniciar(); // Chama função inicial do jogo


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
    
    maca = new Image();
    maca.src = "maca.png";

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
    let r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    maca_x = r * TAMANHO_PONTO;

    r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    maca_y = r * TAMANHO_PONTO;
}

function rb(b){
    var r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    b = r*TAMANHO_PONTO;
    console.log(b);
};
function localizarBomba(){
    rb(bomba_x.b1);
    rb(bomba_x.b2);
    rb(bomba_x.b3);
    rb(bomba_x.b4);
    rb(bomba_x.b5);
    rb(bomba_x.b6);
    rb(bomba_x.b7);
    rb(bomba_x.b8);
    rb(bomba_x.b9);
    rb(bomba_x.b10);

    console.log("\n");

    rb(bomba_y.b1);
    rb(bomba_y.b2);
    rb(bomba_y.b3);
    rb(bomba_y.b4);
    rb(bomba_y.b5);
    rb(bomba_y.b6);
    rb(bomba_y.b7);
    rb(bomba_y.b8);
    rb(bomba_y.b9);
    rb(bomba_y.b10);

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
        outputDebug(runTime);
    }
}

function verificarMaca() {
    if ((x[0] == maca_x) && (y[0] == maca_y)) {
        pontos++;
        localizarMaca();
    }
}

function verificarBomba() {
    if((x[0]==bomba_x.b1)&&(y[0]==bomba_y.b1)){
        pontos--;
        rb(bomba_x.b1);
        rb(bomba_y.b1);
    }
    if((x[0]==bomba_x.b2)&&(y[0]==bomba_y.b2)){
        pontos--;
        rb(bomba_x.b2);
        rb(bomba_y.b2);
    }
    if((x[0]==bomba_x.b3)&&(y[0]==bomba_y.b3)){
        pontos--;
        rb(bomba_x.b3);
        rb(bomba_y.b3);
    }
    if((x[0]==bomba_x.b4)&&(y[0]==bomba_y.b4)){
        pontos--;
        rb(bomba_x.b4);
        rb(bomba_y.b4);
    }
    if((x[0]==bomba_x.b5)&&(y[0]==bomba_y.b5)){
        pontos--;
        rb(bomba_x.b5);
        rb(bomba_y.b5);
    }
    if((x[0]==bomba_x.b6)&&(y[0]==bomba_y.b6)){
        pontos--;
        rb(bomba_x.b6);
        rb(bomba_y.b6);
    }
    if((x[0]==bomba_x.b7)&&(y[0]==bomba_y.b7)){
        pontos--;
        rb(bomba_x.b7);
        rb(bomba_y.b7);
    }
    if((x[0]==bomba_x.b8)&&(y[0]==bomba_y.b8)){
        pontos--;
        rb(bomba_x.b8);
        rb(bomba_y.b8);
    }
    if((x[0]==bomba_x.b9)&&(y[0]==bomba_y.b9)){
        pontos--;
        rb(bomba_x.b9);
        rb(bomba_y.b9);
    }
    if((x[0]==bomba_x.b10)&&(y[0]==bomba_y.b10)){
        pontos--;
        rb(bomba_x.b10);
        rb(bomba_y.b10);
    }
} 

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
    }

    if(pontos<=0){
        noJogo = false;
    }

    if (y[0] >= C_ALTURA) {
        noJogo = false;
    }

    if (y[0] < 0) {
       noJogo = false;
    }

    if (x[0] >= C_LARGURA) {
      noJogo = false;
    }

    if (x[0] < 0) {
      noJogo = false;
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
    ctx.fillStyle = "#050206";
    ctx.fillRect(0,0,C_LARGURA,C_ALTURA);

    grade();
    
    if (noJogo) {
        ctx.drawImage(maca, maca_x, maca_y);
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
    ctx.font = "normal bold 18px serif";
    ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
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