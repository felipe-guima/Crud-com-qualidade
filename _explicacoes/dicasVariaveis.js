// NOMENCLATURA de VARIAVEIS
//Como dev o que mais fazemos é ler codigo !!!

// CONTEXTO É EXTREMAMENTE IMPORTANTE !!

//DIFICIL DE LER

var n1 = 10;
var n2 = 20;

console.log(n1 + n2)

// Facil de ler

const userFirtInputNumber = 20;
const userSecondInputNumber = 20;

console.log(userFirtInputNumber + userSecondInputNumber);

// =====================================

var inputDoUsuario = 4;

// No browser => string, elemento do DOM (Campo de busca do google);

const inputDoUsuario = document.querySelector('input').value
const $inputDoUsuario = document.querySelector('input')

// Booleanos
document.querySelector('input').hasAttribute('value') // true | false
// has or is (são funcoes que avaliao a extrutura)

if(hasSomething || isAnything) {};
if(!hasSomething) {};