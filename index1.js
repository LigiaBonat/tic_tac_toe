let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

//pt functia indicatoare se preia din body culoarea care evidenteaza casutele castigatoare
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning_blocks')

//Constanta O
const O_TEXT = "O"
//Constanta X
const X_TEXT = "X"
//Primul player va fi intotdeauna x
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

//Startul jocului incepe prin apasare de click in oricare din cele 9 casute
const startGame = ()=>{
   boxes.forEach(box => box.addEventListener('click', boxClicked)) 
}

//Functia  de click pt casutele jocului
function boxClicked(e) {
   const id = e.target.id

   if(!spaces[id]){
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    if(playerHasWon() !== false){

        let winning_blocks = playerHasWon()

        //Se evidentiaza casutele castigatoare
        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
       return
    }

    //Matari
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT  

   }
}

//Combinatii posibile
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//Functia de castig
function playerHasWon() {
    for (const condition of winningCombos) {
           let[a,b,c] =  condition

           if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return[a,b,c]
           } 
   }
   return false 
}

restartBtn.addEventListener('click', restart)

//Functia restart
function restart() {
   spaces.fill(null)
   
   boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
   })

   playerText = 'X și 0'

   currentPlayer = X_TEXT
}

startGame()