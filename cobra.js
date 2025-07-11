// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/

// -----------------------CONSTANTES----------------------------
//META
var q = -1 || localStorage.getItem("q");
var lista_players = []
//  UI
const TITLE = document.getElementById("title");
TITLE.hidden = false;
const PONTUACAO = document.getElementById("pontuacao");
PONTUACAO.hidden = true;
const START = document.querySelector(".botaozin");
START.hidden = false;
const SAVE_BUTTON = document.getElementById("save_button");
const SAVE_INPUT = document.getElementById("player_name");

const TIME = document.getElementById("timer");
TIME.hidden = true;

//  AUDIO
const morte = new Audio("SOUNDS/SpongeBob sad music.mp3");
morte.volume = 0.2;

const comilanca = new Audio("SOUNDS/Munch.mp3");
comilanca.volume = 0.75;

const explosao = new Audio("SOUNDS/Explosion.mp3");
explosao.volume = 0.12;

const musica_fundo = new Audio("SOUNDS/Ruins.mp3");
musica_fundo.volume = 0.5;
musica_fundo.loop = true;

const buzina = new Audio("SOUNDS/Party Horn.mp3");
buzina.volume = 0.5;

const vitoria = new Audio("SOUNDS/Children.mp3")
vitoria.volume = 0.3;
//  ELEMENTOS DO CANVAS
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
    c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0,c9:0,c10:0,c11:0,c12:0,c13:0,c14:0,c15:0
}
const comida_x = {
    c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0,c9:0,c10:0,c11:0,c12:0,c13:0,c14:0,c15:0
}
const comida_y = {
    c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0,c9:0,c10:0,c11:0,c12:0,c13:0,c14:0,c15:0
}
//------------------------ FUNÇÕES GLOBAIS ---------------------------
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

function numeroAleatorioEntre100e500(){
    let numero = Math.floor(Math.random()*(500-100+1)+100);
    let multiplo20 = Math.ceil(numero/20)*20;
    if(multiplo20>500){
        multiplo20 -= 20;
    }
    return multiplo20;
}

function updateRanking(){
    const ranking = bubbleSort(lista_players);
    console.log("ranking\n"+ranking);
    const placar = ranking.slice(0,5);
    for(let i = 1 ; i<=5 ; i++){
        const p = `.l${i}`;
        const posicao = document.querySelector(p);
        if(i<placar.length){
            posicao.textContent = `${placar[i].nome}`;
        } else{
            posicao.textContent = ``;
        }
    }
}

function bubbleSort(arr, key) {
  let n = arr.length;
  let aux;
  let troca_ocorreu;
  for(var i = 0 ; i<n-1 ; i++){
    troca_ocorreu = false;
    for(var j = 0 ; j<n-1-i ; j++){
        if(arr[i][key]>arr[i+1][key]){
            aux = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = aux;
            troca_ocorreu = true;
        }
    }
    if(!troca_ocorreu){
        break;
    }
  }
  return arr;
}

function output(x,who){
    let i = document.querySelector(who);
    i.innerHTML = x;
}

function outputPontuacao(x){
    let i = document.querySelector("#pontuacao");
    i.innerHTML = x +"/15";
}

function coordenadaAleatoria(b){
    let r = Math.floor((Math.random() * ALEATORIO_MAXIMO));
    b = r*TAMANHO_PONTO;
    return b;
};

function get(){
    const SAVE_BUTTON = document.getElementById("save_button");
    const SAVE_INPUT = document.getElementById("player_name");
    noJogo = true;
    SAVE_INPUT.hidden = true;
    SAVE_BUTTON.hidden = true;
    START.addEventListener("click", function() {
        TITLE.hidden = true;
        iniciar(); // Chama função inicial do jogo
        START.hidden = true;
    });
    
}

function createPlayer(nome,pontos){
    return {
        nome: nome,
        pontos: pontos
    }
}

//-----------------------------------------------------------------------

// Declaração de variáveis GLOBAIS
var tela;
var ctx;

var cabeca;
var bola;
var partes

var background;

var timer;
var contador;
var runTime;
var pontos = 0;
var vidas = 5;

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
direcaoAleatoria();
var noJogo = true;


const TAMANHO_PONTO = 20;
const ALEATORIO_MAXIMO = 29;
const ATRASO = 120;
const ATRASO_INPUT = 10; // OBSOLETO (?)
const C_ALTURA = 600;
const C_LARGURA = 600;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla


// --------------------------- FUNÇÕES META ---------------------

function iniciar() {
    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");
    runTime = 0;
    timer = 30;
    PONTUACAO.hidden = false;

    carregarImagens();
    musica_fundo.currentTime = 0;
    musica_fundo.play();
    criarCobra();
    localizarBomba();
    localizarMaca();
    relogio();
    setTimeout("cicloDeJogo()", ATRASO);
    setTimeout("derrotaTempo()", 30000);
}

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "IMAGES/cabeca.png";    
    
    bola = new Image();
    bola.src = "IMAGES/ponto.png";

    background = new Image();
    background.src = "IMAGES/backgroud.png";

    bomba.b1 = new Image();
    bomba.b1.src = "IMAGES/obstaculo.png";
    
    bomba.b2 = new Image();
    bomba.b2.src = "IMAGES/obstaculo.png";
    
    bomba.b3 = new Image();
    bomba.b3.src = "IMAGES/obstaculo.png";
    
    bomba.b4 = new Image();
    bomba.b4.src = "IMAGES/obstaculo.png";
    
    bomba.b5 = new Image();
    bomba.b5.src = "IMAGES/obstaculo.png";
    
    bomba.b6 = new Image();
    bomba.b6.src = "IMAGES/obstaculo.png";
    
    bomba.b7 = new Image();
    bomba.b7.src = "IMAGES/obstaculo.png";

    bomba.b8 = new Image();
    bomba.b8.src = "IMAGES/obstaculo.png";

    bomba.b9 = new Image();
    bomba.b9.src = "IMAGES/obstaculo.png";
    
    bomba.b10 = new Image();
    bomba.b10.src = "IMAGES/obstaculo.png";


    comida.c1 = new Image();
    comida.c1.src = "IMAGES/maca.png";
    
    comida.c2 = new Image();
    comida.c2.src = "IMAGES/maca.png";
    
    comida.c3 = new Image();
    comida.c3.src = "IMAGES/maca.png";
    
    comida.c4 = new Image();
    comida.c4.src = "IMAGES/maca.png";
    
    comida.c5 = new Image();
    comida.c5.src = "IMAGES/maca.png";
    
    comida.c6 = new Image();
    comida.c6.src = "IMAGES/maca.png";
    
    comida.c7 = new Image();
    comida.c7.src = "IMAGES/maca.png";
    
    comida.c8 = new Image();
    comida.c8.src = "IMAGES/maca.png";
    
    comida.c9 = new Image();
    comida.c9.src = "IMAGES/maca.png";
    
    comida.c10 = new Image();
    comida.c10.src = "IMAGES/maca.png";

    comida.c11 = new Image();
    comida.c11.src = "IMAGES/maca.png";
    
    comida.c12 = new Image();
    comida.c12.src = "IMAGES/maca.png";

    comida.c13 = new Image();
    comida.c13.src = "IMAGES/maca.png";

    comida.c14 = new Image();
    comida.c14.src = "IMAGES/maca.png";

    comida.c15 = new Image();
    comida.c15.src = "IMAGES/maca.png";

}

function criarCobra() {
    partes = 3;
    pontos = 0;
	var f = numeroAleatorioEntre100e500();
    for (var z = 0; z < partes; z++) {
        x[z] = f - z * TAMANHO_PONTO;
        y[z] = f;
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
        ctx.drawImage(comida.c11, comida_x.c11, comida_y.c11);
        ctx.drawImage(comida.c12, comida_x.c12, comida_y.c12);
        ctx.drawImage(comida.c13, comida_x.c13, comida_y.c13);
        ctx.drawImage(comida.c14, comida_x.c14, comida_y.c14);
        ctx.drawImage(comida.c15, comida_x.c15, comida_y.c15);
        
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

		
        for (var z = 0; z < partes; z++) {
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
if((vidas > 0 && partes > 0 && timer > 0)&&(pontos = 15)){
    clearInterval(contador);
    vitoria.play();
    buzina.play();
    musica_fundo.pause();
    musica_fundo.currentTime = 0;
    TITLE.hidden = false;
    SAVE_INPUT.hidden = false;
    SAVE_BUTTON.hidden = false;
    ctx.fillStyle = "#ffffff69";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 80px Jacquard";
    ctx.fillText("Você venceu!", C_LARGURA/2, C_ALTURA/2);
    }else {
        ctx.fillStyle = "#ffffff69";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        ctx.font = "normal bold 80px Jacquard";
        ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
        musica_fundo.pause();
        musica_fundo.currentTime = 0;

        morte.play();
        morte.volume = 0.2;
    
        TITLE.hidden = false;
        SAVE_INPUT.hidden = false;
        SAVE_BUTTON.hidden = false;
    }
}
SAVE_BUTTON.addEventListener("click",() =>{
    morte.pause();
    const Nome = SAVE_INPUT.value;
    const new_player = createPlayer(Nome,pontos);
    lista_players[q] = new_player;
    q++
    console.log("listaplayers\n"+lista_players);
    updateRanking();
    localStorage.setItem("ranking", JSON.stringify(lista_players));
    localStorage.setItem("q",q);
    get();
},{once:true})

function cicloDeJogo() {
    if (noJogo) {
        outputPontuacao(pontos);
        verificarComida();
        verificarBomba();
        verificarColisao();
        mover();
        fazerDesenho();
        setTimeout("cicloDeJogo()", ATRASO);
        output(vidas,"#vidas");
        output(timer,"#debug");
    }
}

function relogio(){
        contador = setInterval(() => {
        timer--;
    }, 1000);
}

function derrotaTempo() {
    clearInterval(contador)
    vidas = 0;    
}    

// ---------------------------- FUNÇÕES COMIDA --------------------
function pontosParaVidas(){
    if(pontos%3==0){
        vidas++;
    }
}

function localizarMaca() {
    comida_x.c1 = coordenadaAleatoria(comida_x.c1);
    comida_x.c2 = coordenadaAleatoria(comida_x.c2);
    comida_x.c3 = coordenadaAleatoria(comida_x.c3);
    comida_x.c4 = coordenadaAleatoria(comida_x.c4);
    comida_x.c5 = coordenadaAleatoria(comida_x.c5);
    comida_x.c6 = coordenadaAleatoria(comida_x.c6);
    comida_x.c8 = coordenadaAleatoria(comida_x.c8);
    comida_x.c9 = coordenadaAleatoria(comida_x.c9);
    comida_x.c10 = coordenadaAleatoria(comida_x.c10);
    comida_x.c11 = coordenadaAleatoria(comida_x.c11);
    comida_x.c12 = coordenadaAleatoria(comida_x.c12);
    comida_x.c13 = coordenadaAleatoria(comida_x.c13);
    comida_x.c14 = coordenadaAleatoria(comida_x.c14);
    comida_x.c15 = coordenadaAleatoria(comida_x.c15);
    

    comida_y.c1 = coordenadaAleatoria(comida_y.c1);
    comida_y.c2 = coordenadaAleatoria(comida_y.c2);
    comida_y.c3 = coordenadaAleatoria(comida_y.c3);
    comida_y.c4 = coordenadaAleatoria(comida_y.c4);
    comida_y.c5 = coordenadaAleatoria(comida_y.c5);
    comida_y.c6 = coordenadaAleatoria(comida_y.c6);
    comida_y.c7 = coordenadaAleatoria(comida_y.c7);
    comida_y.c8 = coordenadaAleatoria(comida_y.c8);
    comida_y.c9 = coordenadaAleatoria(comida_y.c9);
    comida_y.c10 = coordenadaAleatoria(comida_y.c10);
    comida_y.c11 = coordenadaAleatoria(comida_y.c11);
    comida_y.c12 = coordenadaAleatoria(comida_y.c12);
    comida_y.c13 = coordenadaAleatoria(comida_y.c13);
    comida_y.c14 = coordenadaAleatoria(comida_y.c14);
    comida_y.c15 = coordenadaAleatoria(comida_y.c15);

}

function verificarComida() {
    let i = 600;
    if((x[0]==comida_x.c1)&&(y[0]==comida_y.c1)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c1 = i; comida_y.c1 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c2)&&(y[0]==comida_y.c2)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c2 = i; comida_y.c2 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c3)&&(y[0]==comida_y.c3)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c3 = i; comida_y.c3 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c4)&&(y[0]==comida_y.c4)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c4 = i; comida_y.c4 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c5)&&(y[0]==comida_y.c5)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c5 = i; comida_y.c5 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c6)&&(y[0]==comida_y.c6)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c6 = i; comida_y.c6 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c7)&&(y[0]==comida_y.c7)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c7 = i; comida_y.c7 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c8)&&(y[0]==comida_y.c8)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c8 = i; comida_y.c8 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c9)&&(y[0]==comida_y.c9)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c9 = i; comida_y.c9 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c10)&&(y[0]==comida_y.c10)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c10 = i; comida_y.c10 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c11)&&(y[0]==comida_y.c11)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c11 = i; comida_y.c11 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c12)&&(y[0]==comida_y.c12)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c12 = i; comida_y.c12 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c13)&&(y[0]==comida_y.c13)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c13 = i; comida_y.c13 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c14)&&(y[0]==comida_y.c14)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c14 = i; comida_y.c14 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
    if((x[0]==comida_x.c15)&&(y[0]==comida_y.c15)){
        partes++;
        pontos++;
        pontosParaVidas();
        comida_x.c15 = i; comida_y.c15 = i;
        comilanca.currentTime = 0;
        comilanca.play();
    }
}
//
// ---------------------------- FUNÇÕES BOMBA --------------------
function localizarBomba(){
    bomba_x.b1 = coordenadaAleatoria(bomba_x.b1);
    bomba_x.b2 = coordenadaAleatoria(bomba_x.b2);
    bomba_x.b3 = coordenadaAleatoria(bomba_x.b3);
    bomba_x.b4 = coordenadaAleatoria(bomba_x.b4);
    bomba_x.b5 = coordenadaAleatoria(bomba_x.b5);
    bomba_x.b6 = coordenadaAleatoria(bomba_x.b6);
    bomba_x.b7 = coordenadaAleatoria(bomba_x.b7);
    bomba_x.b8 = coordenadaAleatoria(bomba_x.b8);
    bomba_x.b9 = coordenadaAleatoria(bomba_x.b9);
    bomba_x.b10 = coordenadaAleatoria(bomba_x.b10);

    bomba_y.b1 = coordenadaAleatoria(bomba_y.b1);
    bomba_y.b2 = coordenadaAleatoria(bomba_y.b2);
    bomba_y.b3 = coordenadaAleatoria(bomba_y.b3);
    bomba_y.b4 = coordenadaAleatoria(bomba_y.b4);
    bomba_y.b5 = coordenadaAleatoria(bomba_y.b5);
    bomba_y.b6 = coordenadaAleatoria(bomba_y.b6);
    bomba_y.b7 = coordenadaAleatoria(bomba_y.b7);
    bomba_y.b8 = coordenadaAleatoria(bomba_y.b8);
    bomba_y.b9 = coordenadaAleatoria(bomba_y.b9);
    bomba_y.b10 = coordenadaAleatoria(bomba_y.b10);
}
function verificarBomba() {
    let i = 600;
    if((x[0]==bomba_x.b1)&&(y[0]==bomba_y.b1)){
        vidas--;
        bomba_x.b1 = i;
        bomba_y.b1 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b2)&&(y[0]==bomba_y.b2)){
        vidas--;
        bomba_x.b2 = i;
        bomba_y.b2 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b3)&&(y[0]==bomba_y.b3)){
        vidas--;
        bomba_x.b3 = i;
        bomba_y.b3 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b4)&&(y[0]==bomba_y.b4)){
        vidas--;
        bomba_x.b4 = i;
        bomba_y.b4 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b5)&&(y[0]==bomba_y.b5)){
        vidas--;
        bomba_x.b5 = i;
        bomba_y.b5 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b6)&&(y[0]==bomba_y.b6)){
        vidas--;
        bomba_x.b6 = i;
        bomba_y.b6 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b7)&&(y[0]==bomba_y.b7)){
        vidas--;
        bomba_x.b7 = i;
        bomba_y.b7 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b8)&&(y[0]==bomba_y.b8)){
        vidas--;
        bomba_x.b8 = i;
        bomba_y.b8 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b9)&&(y[0]==bomba_y.b9)){
        vidas--;
        bomba_x.b9 = i;
        bomba_y.b9 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
    if((x[0]==bomba_x.b10)&&(y[0]==bomba_y.b10)){
        vidas--;
        bomba_x.b10 = i;
        bomba_y.b10 = i;
        explosao.currentTime = 0;
        explosao.play();
    }
} 
//
// ----------------------- FUNÇÕES GAMEPLAY -----------------
function verificarColisao() {
    for (var z = partes; z > 0; z--) {
        if ((z > 1) && (x[0] == x[z]) && (y[0] == y[z])) {
            vidas--;
        }
    }

    if(vidas==0){
        noJogo = false;
    }

    if((partes==0)&&(vidas!=0)){
        partes=1;
        vidas--;
    }
    let i = 600;
    if(((comida_x.c1==i)&&(comida_y.c1==i))&&
        ((comida_x.c2==i)&&(comida_y.c2==i))&&
        ((comida_x.c3==i)&&(comida_y.c3==i))&&
        ((comida_x.c4==i)&&(comida_y.c4==i))&&
        ((comida_x.c5==i)&&(comida_y.c5==i))&&
        ((comida_x.c6==i)&&(comida_y.c6==i))&&
        ((comida_x.c7==i)&&(comida_y.c7==i))&&
        ((comida_x.c8==i)&&(comida_y.c8==i))&&
        ((comida_x.c9==i)&&(comida_y.c9==i))&&
        ((comida_x.c10==i)&&(comida_y.c10==i))&&
        ((comida_x.c11==i)&&(comida_y.c11==i))&&
        ((comida_x.c12==i)&&(comida_y.c12==i))&&
        ((comida_x.c13==i)&&(comida_y.c13==i))&&
        ((comida_x.c14==i)&&(comida_y.c14==i))&&
        ((comida_x.c15==i)&&(comida_y.c15==i))
    ){
        noJogo=false;
    }
}


function mover() {
    for (var z = partes; z > 0; z--) {
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
