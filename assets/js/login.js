const loginInput = document.querySelector('.login__input');
const loginButton = document.querySelector('.login__button');
const loginForm = document.querySelector('.login');



function validateInput(){
    //If login Input is empty or too short, login Button is disabled
    if(!loginInput.validity.valueMissing && loginInput.value.length > 2 ){
        loginButton.disabled = 0;
    }
    if(loginInput.validity.valueMissing || loginInput.value.length <= 2){
        loginButton.disabled = 1;
    }
}


//let userNameI = 0;
const captureUsername = ((event) => {
    event.preventDefault();             // Bloqueia comportamento padrão de recarregar a página
    localStorage.setItem(`player`, loginInput.value);  
    window.location = './game.html';
    //userNameI++;
})





loginInput.addEventListener('input', validateInput);
loginForm.addEventListener('submit', captureUsername);


