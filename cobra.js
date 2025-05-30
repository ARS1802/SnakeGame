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
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,tela.height);
        ctx.stroke();
    }
}

function generateRandomMultipleOf20() {
  const min = 1;
  const max = 29; 

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const result = randomNumber * 20;

  return result;
}

function outputPontos(){
    document.getElementById("output").innerHTML = pontos;
}
//-----------

// Declaração de variáveis e constantes

var tela;
var ctx;

var cabeca;
var maca;
var bola;
var bomba;

var pontos;
var maca_x;
var maca_y;
var bomba_x;
var bomba_y;

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

    carregarImagens();
    criarCobra();
    localizarBomba();
    localizarMaca();
    if((maca_x==bomba_x)&&(maca_y==bomba_y)){maca_x+=20; bomba_x-=20;}
    setTimeout("cicloDeJogo()", ATRASO);
}

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "cabeca.png";    
    
    bola = new Image();
    bola.src = "ponto.png"; 
    
    maca = new Image();
    maca.src = "maca.png";

    bomba = new Image();
    bomba.src = "obstaculo.png";
    
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

function localizarBomba(){
    let r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    bomba_x = r * TAMANHO_PONTO;

    r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    bomba_y = r * TAMANHO_PONTO;
}

function cicloDeJogo() {
    if (noJogo) {
        outputPontos();
        verificarMaca();
        verificarColisao();
        mover();
        fazerDesenho();
        setTimeout("cicloDeJogo()", ATRASO);
    }
}

function verificarMaca() {
    if ((x[0] == maca_x) && (y[0] == maca_y)) {
        pontos++;
        localizarMaca();
    }
}

function verificarBomba() {
    if ((x[0] == bomba_x) && (y[0] == bomba_y)) {
        pontos--;
        localizarBomba();
    }
} 

function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
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
    
    if (noJogo) {
        ctx.drawImage(maca, maca_x, maca_y);
        ctx.drawImage(bomba,bomba_x,bomba_y);
		
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