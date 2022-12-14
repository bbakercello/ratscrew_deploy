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
const cardArt = document.getElementById("cardCenter")
const centerContainer = document.getElementsByClassName("containerDeck")
const slapButton = document.getElementById("slapButton");
const drawXButton = document.getElementById("drawXButton");
const gameStatus = document.getElementById("gameStatus");
const currentPlayerDom = document.getElementById("currentPlayer");
const resetButton = document.getElementById("resetButton");
const roundStatus = document.getElementById("roundStatus")


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
    constructor (identity,image){
        this.identity = identity
        this.image = image
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
}console.log(currentPlayer)
/* Make the deck
   - Create functions for making a deck 
  - createDeck() function pulls from two arrays to create one deck array
  - shuffleDeck uses .sort() by a range of [-.5, .5) to randomly sort the array */

function createDeck() {
    for(let ix=0; ix<suits.length; ix++){
        for(let iy=0; iy<values.length; iy++){
        deck.push(suits[ix] + '-' + values[iy])
        }
    }
    for(let ix=0; ix<deck.length;ix++){
        deck[ix] = new Card(deck[ix],document.getElementById(deck[ix]))
        // console.log(deck)
    }return deck
    
    }

function shuffleDeck(deck){
    deck.sort(() => Math.random() - 0.5);
    return deck
} 
function showPoints(){
    playerXDom.innerText = `Player X ${playerXHand.length}`
    playerYDom.innerText = `Computer ${playerYHand.length}`
}
/* Reset the game with resetGame
   - refers to above functions */
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
    centerDeck.style.backgroundImage = "";
    showPoints()
    gameStatus.innerText = "New Game. Cards shuffled! Click Draw to begin"
}

function cardImage(){
    centerDeck.style.backgroundImage = `url('${centerPile[centerPile.length-1].image.src}')`
}

function draw(playerHand){
    currentPlayerDom.innerHTML = ""
    centerPile.push(playerHand.pop());
    console.log(centerPile)
    console.log(playerHand)
        if(centerPile.length >=2){
                if((centerPile[centerPile.length-1].identity.charAt(2)) === (centerPile[centerPile.length-2].identity.charAt(2))){ 
                    console.log('Exact match in value')
                    match = true 
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'A'){
                    match = false
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'K'){
                    match = false
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'Q'){
                    match = false
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'J'){
                    match = false
                }else{
                    match = false    
                }console.log(currentPlayer)
            if(currentPlayer === "playerX"){
                if((centerPile[centerPile.length-1].identity.charAt(2))=== 'A'){
                    console.log('playerX got an ACE')
                    let xi = 0
                    while(xi<5){
                        centerPile.unshift(playerYHand.pop())
                        console.log(playerYHand);
                        windCondition()
                        xi += 1;
                    }
                 }

                if((centerPile[centerPile.length-1].identity.charAt(2))=== 'K'){
                    console.log('playerX got a King')
                    let xi = 0
                    while(xi<4){
                        centerPile.unshift(playerYHand.pop())
                        console.log(playerYHand);
                        windCondition()
                        xi += 1;
                    }
             }
             if((centerPile[centerPile.length-1].identity.charAt(2))=== 'Q'){
                console.log('playerX got a Queen')
                let xi = 0
                while(xi<3){
                    centerPile.unshift(playerYHand.pop())
                    console.log(playerYHand);
                    windCondition()
                    xi += 1;
                }
         }
         if((centerPile[centerPile.length-1].identity.charAt(2))=== 'J'){
            console.log('playerX got a Jack')
            let xi = 0
            while(xi<2){
                centerPile.push(playerYHand.pop())
                console.log(playerYHand);
                xi += 1;
            }
        }
            }
     }
     cardImage()
     showPoints()
     windCondition()
     timerFunction ()
     } 
    console.log(playerXHand,playerYHand)
    
    
if(centerPile.length = 0){
    if(currentPlayer="playerX"){
        currentPlayer = "playerY"
        timerFunction ()
    }else if(currentPlayer ="playerY")
        currentPlayer ="playerX"
}    
     

function drawPlayerX(){
   if(currentPlayer === "playerX") {
    draw(playerXHand)
    console.log('hello')
    windCondition()
    return centerPile
}
}

/* Assign buttons to Draw and Reset functions by addEventListener()
*/
drawXButton.addEventListener("click", drawPlayerX)

resetButton.addEventListener("click",resetGame)

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
    gameStatus.innerText = "Computer is drawing their Card..."
    ticks--
    console.log(ticks)
    if(ticks === 0){
        clearInterval(interval);
        currentPlayer = "playerY"
        draw(playerYHand)
        if(currentPlayer === "playerY"){
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'A'){
                currentPlayerDom.innerText = "Uh oh! Computer drew an ACE. You lose 4 cards"
                console.log('playerY got a ACE')
                let xi = 0
                while(xi<5){
                    console.log('playerY got a ACE')
                    centerPile.unshift(playerXHand.pop())
                    console.log(playerXHand);
                     xi += 1;
                }
                
         }
    if((centerPile[centerPile.length-1].identity.charAt(2))=== 'K'){
        console.log('playerY got a King')
        currentPlayerDom.innerText = "Wow! Computer drew a King. You lose 3 cards"
        let xi = 0
         while (xi<4){
                    console.log('playerY got a King')
                    centerPile.unshift(playerXHand.pop())
                    cardImage()
                    console.log(playerXHand);
                    xi +=1;
                }
                
            }
             
     }
     if((centerPile[centerPile.length-1].identity.charAt(2))=== 'Q'){
        console.log('playerY got a Queen')
        currentPlayerDom.innerText = "Wow! Computer drew a Queen. You lose 2 cards"
        let xi = 0
        while(xi<3){
            console.log('playerY got a Queen')
            centerPile.unshift(playerXHand.pop())
            console.log(playerXHand);
            xi+=1
        }
        
 }
 if((centerPile[centerPile.length-1].identity.charAt(2))=== 'J'){
    console.log('playerY got a Jack')
    currentPlayerDom.innerText = "Computer drew a Jack. You lose 1 cards"
    let xi = 0
    while(xi<2){
        console.log('playerY got a Jack')
        centerPile.unshift(playerXHand.pop())
        console.log(playerXHand);
        xi+=1
    }
    
}
        currentPlayer = "playerX"
        gameStatus.innerText = "Your turn! Click Draw"
        console.log(currentPlayer)
        return currentPlayer
    }
    showPoints()
    windCondition()
}

/* Set up timer for computer to slap after 3 seconds */
let clicks = 2
let interval2 

if (match === true) {
    function computerSlap (){
    clearInterval(interval2);
    interval2 = setInterval(slapTimer, 500);
    }
}
function slapTimer(){
    clicks--
    console.log(clicks)
    if(clicks === 0){
        clearInterval(interval2);
        console.log('lose cards');
        playerYHand.push(centerPile);
        shuffleDeck(playerYHand);
        console.log(playerYHand)
        console.log(playerXHand)
        centerDeck.style.backgroundImage = "";
        roundStatus.innterText = "You lose this pile"
        showPoints()
        currentPlayer = 'playerX'
        windCondition()
    }
                
}
/* Assign space bar to check identities and determine if cards are won or lost*/
slapButton.addEventListener('click', event => {
    // if (event.code === 'Space') {
      if(match === true){
        console.log('win cards');
        playerXHand.push(centerPile);
        shuffleDeck(playerXHand);
        centerDeck.style.backgroundImage = "";
        roundStatus.innterText = "You win this pile"
        playerXDom.innerText = `Player X ${playerXHand.length}`
        playerYDom.innerText = `Computer ${playerYHand.length}`
      }
      if(match === false)
        console.log('lose cards');
        playerYHand.push(centerPile);
        shuffleDeck(playerYHand);
        console.log(playerYHand)
        console.log(playerXHand)
        centerDeck.style.backgroundImage = "";
        roundStatus.innterText = "You lose this pile"
        playerXDom.innerText = `Player X ${playerXHand.length}`
        playerYDom.innerText = `Computer ${playerYHand.length}`
    }
  )

  function windCondition(){
  if(playerXHand.length === 52){
    console.log('You win!')
    playerXDom.innerText = `Player X ${playerXHand.length}`
    playerYDom.innerText = `Computer ${playerYHand.length}`
    resetGame()
  }
  if(playerYHand.length === 52){
    console.log('You lose!')
    playerXDom.innerText = `Player X ${playerXHand.length}`
    playerYDom.innerText = `Computer ${playerYHand.length}`
    resetGame()
  }
  if(playerXHand.length === 0){
    console.log('You lose!')
    playerXDom.innerText = `Player X ${playerXHand.length}`
    playerYDom.innerText = `Computer ${playerYHand.length}`
    resetGame()
  }
  if(playerYHand.length === 0){
    console.log('You lose!')
    playerXDom.innerText = `Player X ${playerXHand.length}`
    playerYDom.innerText = `Computer ${playerYHand.length}`
    resetGame()
  }
}