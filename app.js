//Pseudo Code for Project 1

/* Create variables for card types */
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const suits = ["D","H","C","S"];

/* Empty array for creating deck and player hands*/
let deck = [];
let centerPile = [];
let match = false

/* Assign HTML elements to variables */
const playerYDom = document.getElementById("hand-Y");
const playerXDom = document.getElementById("hand-X");
const centerDeck = document.getElementById("centerDeck");
const slapButton = document.getElementById("slapButton");
const drawXButton = document.getElementById("drawXButton");
const gameStatus = document.getElementById("gameStatus");
const currentPlayerDom = document.getElementById("currentPlayer");
const resetButton = document.getElementById("resetButton");

/*Players
- Create a Player class that accepts Player (X or Y) as paramters
as well as a randomized hand (two player arrays, will create later)
*/

class Player {
    constructor (player, hand){
        this.player = player
        this.hand = hand
    }
}

class Card {
    constructor (identity){
        this.identity = identity
    }
}

/* Deal hands to players by splitting shuffled deck array in half */
let playerYHand = deck.slice(0, 26);
let playerXHand = deck.slice(26, 52);

let playerX = new Player ('playerX', playerXHand);
let playerY = new Player ('playerY', playerYHand);

/* Create variables for currentPlayer
*/
let currentPlayer = null
if(currentPlayer === null){
    currentPlayer = playerX
}
/* Make the deck
   - Create functions for making a deck 
  - createDeck() function pulls from two arrays to create one deck array
  - shuffleDeck uses .sort() by a range of [-.5, .5) to randomly sort the array */

function createDeck() {
    for(let ix=0; ix<suits.length; ix++){
        for(let iy=0; iy<values.length; iy++){
        deck.push(suits[ix] + '-' + values[iy])
        }
    }return deck
    
    }

function shuffleDeck(deck){
    deck.sort(() => Math.random() - 0.5);
    return deck
} 

/* Reset the game with resetGame
   - refers to above functions
 */
function resetGame(){
    deck = [];
    centerPile = [];
    createDeck();
    shuffleDeck(deck);
    console.log(deck)
    playerYHand = deck.slice(0, 26);
    playerXHand = deck.slice(26, 52);
    console.log(playerXHand)
    console.log(playerYHand)

/* assign entire deck to individual class instances */
for(let ix=0; ix<deck.length;ix++){
    deck[ix] = new Card(deck[ix])
}
    return deck;
}


/* Create draw function referring to player hands 
 */
function draw(playerHand){
    centerPile.push(playerHand.pop());
    console.log(centerPile)
    console.log(playerHand)
    if(centerPile.length >=2){
        if(centerPile[centerPile.length-1].charAt(2) === centerPile[centerPile.length-2].charAt(2)){ 
        match = true
        }
        else if(centerPile[centerPile.length-1].charAt(0)=== centerPile[centerPile.length-2].charAt(0)){
            match = true
        }
        else{
            match = false
    }
}
}

function drawPlayerX(){
   if(currentPlayer === "playerX") {
    draw(playerXHand)
    return currentPlayer = "playerY", centerPile
}
}

/* Assign buttons to Draw and Reset functions by addEventListener()
*/
drawXButton.addEventListener("click", drawPlayerX)
resetButton.addEventListener("click",resetGame)
// slapButton.addEventListener("")



/* Create a timer and callback function for determining computer move
   -Also intiatalizes computer draw
*/
let ticks = 6
let interval 

drawXButton.addEventListener('click',function (){
    ticks = 5
    clearInterval(interval);
    interval = setInterval(timerFunction, 500);
    })

function timerFunction(){
    ticks--
    console.log(ticks)
    if(ticks === 0){
        clearInterval(interval);
        draw(playerYHand)
        currentPlayer = "playerX"
        console.log(currentPlayer)
        return currentPlayer
    }
    else {
        currentPlayer = "playerY"
        console.log(currentPlayer)
    }
    return ticks
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      if(match === true){
        console.log('win cards');
        playerXHand.push(playerYHand.pop());
        shuffleDeck(playerXHand);
      }
      if(match === false)
        console.log('lose cards');
        playerYHand.push(playerXHand.pop());
        shuffleDeck(playerYHand);
        console.log(playerYHand)
        console.log(playerXHand)
    }
  })

  if(playerXHand.length === 52){
    console.log('You win!')
  }
  if(playerYHand.length === 52){
    console.log('You lose!')
  }