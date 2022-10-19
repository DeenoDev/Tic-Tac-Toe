//first step, we need to attach event listener to the form to get user data.

//next, initialize the game

//next, we need to check which game mode we are playing.

//we need to set win conditions

//we need to determine current player

//after each move check win conditions and if not met, set other player as active player

//human vs human, next implement easy AI, next impossible AI



const winningConditions = {
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]

}

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
    data.player2 = "0";
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
    if (data.board[box.id] === "X" || data.board[box.id] === "0") {
        return;
    }

    //adjust the DOM for player move, and then check win conditions

    data.board[box.id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add = (data.currentPlayer === "X" ? "player1" : "player2");
    //increase the round
    data.round++

    console.log(box,data);

    //check end conditions
    if (endConditions(data)){
        //adjust DOM to reflect endConditions
    }
};

const endConditions = (data) => {

}