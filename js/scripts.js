/*
**Consegna**
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
(attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo 
l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, 
per evitare problemi con l'inizializzazione di git).
****
Generare una griglia di gioco quadrata in cui ogni cella contiene un numero 
compreso tra 1 e 100.
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà 
prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
[23, 65, 1, 4,78,15,....];
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei 
numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e 
la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente
può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero
massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il 
numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1 - L'utente indica un livello di difficoltà in base al quale viene generata una
griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli 
compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
**2- quando si clicca su una bomba e finisce la partita, evitare che si possa 
cliccare su altre celle
****3- quando si clicca su una bomba e finisce la partita, il software scopre 
tutte le bombe nascoste
**Consigli del giorno:** :party_wizard:
****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il 
lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i 
dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.
*/

// Prendo dal documento il bottone
const play = document.getElementById("play-btn");

// Prendo dal documento la select
let difficulty = document.getElementById("difficulty");

// Prendo dal documento la griglia
let grid = document.querySelector(".grid");

// Aggiungo al bottone un event listener
play.addEventListener('click', function () {
    // Al click creo la griglia solamente se non è già stata crea
    const startText = document.querySelector('.start-game');
    startText.classList.add('hidden');
    grid.innerHTML = "";
    let cellsNumber;
    let className;
    bombs = [];

    const difficultyChoise = difficulty.value;
    switch (difficultyChoise) {
        case "1":
            cellsNumber = 100;
            className = 'box-easy'
            generateBombs(cellsNumber);
            console.log(bombs);
            break;
        case "2":
            cellsNumber = 81;
            className = 'box-medium'
            generateBombs(cellsNumber);
            console.log(bombs);
            break;
        case "3":
            cellsNumber = 49;
            className = 'box-hard'
            generateBombs(cellsNumber);
            console.log(bombs);
            break;
        default:
            cellsNumber = 100;
            className = 'box-easy'
            generateBombs(cellsNumber);
            console.log(bombs);
    }

    let maximumAttempts = cellsNumber - 16;
    let clickCounter = [];

    // Tramite il ciclo for gli faccio creare n elementi in base alla difficoltà
    for (let i = 1; i <= cellsNumber; i++) {
        let gridElement = createElementWithAClass('div', className);
        gridElement.innerText = `${i}`; //Aggiungo ad ogni elemento il numero di iterazione
        gridElement.addEventListener('click', function () { //Aggiungo ad ogni elemento un event listener
            
            let clickedNumber = parseInt(this.innerText);
            if (bombs.includes(clickedNumber) || clickCounter.length === maximumAttempts) {
                this.style.backgroundColor = "red";
                console.log(`Partita finita! Il tuo punteggio è ${clickCounter.length}`);

            } else {
                clickCounter.push(1)
                this.style.backgroundColor = "skyblue";
            }
            console.log(clickedNumber); // Al click di ogni elemento mostro in console il suo valore innerText
            console.log(clickCounter);
        });
        grid.append(gridElement); //Inserisco ogni elemento dentro la griglia
        
    }
});


// FUNCTIONS
/**
 * Descrizione: la funzione crea un elemento html con una classe
 * @param {string} elemento 
 * @param {string} classe 
 * @returns {object} Dom element
 */
function createElementWithAClass(elemento, classe) {
    let newItem = document.createElement(`${elemento}`);
    newItem.classList.add(`${classe}`);
    return newItem;
}

/**
 * Descrizione: restituisce un numero casuale tra il valore minimo e massimo specificati (inclusi)
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Descrizione: dato un range da un a un numero massimo la funzione genera 16 numeri casuali all'interno di quel range e restituisce un array nel quale non sono presenti numeri uguali
 * @param {number} cellsNumber 
 * @returns array di 16 numeri
 */
function generateBombs(cellsNumber) {
    while (bombs.length < 16) {
        let randomNumber = getRndInteger(1, cellsNumber);
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }
    return bombs;
}




