//first step, we need to attach event listener to the form to get user data.

//next, initialize the game

//next, we need to check which game mode we are playing.

//we need to set win conditions

//we need to determine current player

//after each move check win conditions and if not met, set other player as active player

//human vs human, next implement easy AI, next impossible AI

const form = document.querySelector("#myForm");

form.addEventListener('submit', (event) => {
    //prevent page refresh
    event.preventDefault();

    //initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal-wrapper").setAttribute("hidden", true);
    console.log(data);
    
});