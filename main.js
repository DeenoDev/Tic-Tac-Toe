//first step, we need to attach event listener to the form to get user data.

//next, initialize the game

//next, we need to check which game mode we are playing.

//we need to set win conditions

//we need to determine current player

//after each move check win conditions and if not met, set other player as active player

//human vs human, next implement easy AI, next impossible AI



const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

const form = document.querySelector("#myForm");

form.addEventListener('submit', (event) => {
    //prevent page refresh
    event.preventDefault();

    //initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal-wrapper").setAttribute("hidden", true);
    initializeGame(data);
    
});

const initializeVariables = (data) => {
    data.choice = +data.choice;
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

const addEventListenersToGameBoard = (data) => {
    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target,data)
        })
    })
}

const initializeGame = (data) => {
    //initialize game variables
    
    adjustDom('displayTurn', `${data.player1Name}'s turn`);
    initializeVariables(data);

    //add event listeners to gameboard
    addEventListenersToGameBoard(data);

};

const playMove = (box,data) => {
    //is game over? If game over, don't do anything
    if(data.gameOver) {
        return;
    }
    //check if game box has a letter in it
    if (data.board[box.id] === "X" || data.board[box.id] === "O") {
        return;
    }

    //adjust the DOM for player move, and then check win conditions

    data.board[box.id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add = (data.currentPlayer === "X" ? "player1" : "player2");
    //increase the round
    data.round++

    //check end conditions
    if (endConditions(data)){
        return;
        //adjust DOM to reflect endConditions
    }

    //change current player
    //change the DOM, change data.currentPlayer
    if (data.choice === 0){
       changePlayer(data);
    } else if(data.choice === 1){
        //easy ai
        easyAiMove(data);
        data.currentPlayer = "X";
        //change back to player1
    }
    
};


const endConditions = (data) => {
   // 3 potential options
   //winner 
   //tie
   //game not over yet
   if (checkWinner(data)) {
    //adjust the DOM to reflect win
    let winnerName =  data.currentPlayer === "X" ? data.player1Name : data.player2Name;
     adjustDom('displayTurn', winnerName + ' has won the game');
    return true
   } else if (data.round === 9) {
    adjustDom('displayTurn', "It's a Tie!");
    data.gameOver = true;
    //adjust the DOM to reflect tie
    return true;
   }
   return false   
};

const checkWinner = (data) => {
    let result = false;
    winningConditions.forEach(condition => {
        if(data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]){
            
            data.gameOver = true;
            result = true;
        }
    });
    return result;
};

const adjustDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = textContent;

};

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
    //adjust the DOM
    let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
    adjustDom('displayTurn', `${displayTurnText}'s turn`);
};

const easyAiMove = (data) => {
    changePlayer(data);
    
    let availableSpaces = data.board.filter(
        (space) => space !== "X" &&  space !== "O");
        let move = availableSpaces[Math.floor(Math.random()*availableSpaces.length)];
        data.board[move] = data.player2;
        let box = document.getElementById(`${move}`)
        box.textContent = data.player2;
        box.classList.add = ("player2");

       if(endConditions(data)){
        return;
       }
        changePlayer(data);

};