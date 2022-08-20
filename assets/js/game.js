const grid = document.querySelector('.grid');

let firstCard = '';
let secondCard = '';

const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
]
const cards = [];

const revealCard = ({target}) => {
    let frontFace = target.parentNode.childNodes[1]; 
    let cardClassList = target.parentNode.classList;

    if(target.parentNode.className.includes('revealed-card')){
        return;
    }
    if(firstCard === ''){
        frontFace.style.display = 'block';    //Front-face
        cardClassList.add('revealed-card');
        firstCard = target.parentNode;
    }else if(secondCard === ''){
        frontFace.style.display = 'block';    //Front-face
        cardClassList.add('revealed-card');
        secondCard = target.parentNode;
        checkCards(firstCard,secondCard);
        firstCard = '';
        secondCard = '';
    }
}

function hideCard(card){
    card.classList.remove('revealed-card');
    card.childNodes[1].style.display = 'none';  
}

// To avoid repeating code in createCard(), we make a function to create the elements
function createElement(tag,className){
    const element = document.createElement(tag);
    element.className = className
    return element
}

function createCard(character){
    const card = createElement('div','card');
    const cardFront = createElement('div','front face');
    const cardBack = createElement('div','back face');
    cardFront.style.backgroundImage = `url('./assets/img/${character}.png')`;
    card.setAttribute('data-character', character);
    
    card.addEventListener('click', revealCard);
    cards.push(card);

    card.appendChild(cardBack);
    card.appendChild(cardFront);

    return card;
}


function loadGame(){
    //... : spread operators
    const duplicatedCharacters = [ ... characters, ... characters];

    //sort() order alphabetically
    //sort(() => 0) keeps order
    //sort(() => i>0) --> [a,b] => [b,a]
    //sort(() => i<0) --> [a,b] => [a,b]
    //Then we make a MAth.random that draws between 0 and 1. Then subtract 0.5, we'll have a number between -0.5 and +0.5
    const shuffledCharacters = duplicatedCharacters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    }) 
    

}




function checkCards(firstCard,secondCard){
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    countsMoves();
    if(firstCharacter != secondCharacter){
        setTimeout(() => {
            hideCard(firstCard);
            hideCard(secondCard);
        },500);    
    }else{
        firstCard.classList.add('disabled-card');
        secondCard.classList.add('disabled-card');
        checkEndGame();
    }
}

function startGameData(){
    const name = localStorage.getItem('player');
    document.querySelector('[data-information = "name"]').innerText = name;
    return 0;
}
function countsMoves(){
    moves++;
    document.querySelector('[data-information = "moves" ]').innerText = moves;
}

function checkEndGame(){
    let i = 0; //for Counting number of disabled cards
    cards.forEach((card) => {
        if(!card.className.includes('disabled-card')){
            console.log('Retornei')
            return   
        }else{
            i++;
            console.log(`${i}/${cards.length}`)
        }

    })
    if (i >= cards.length){
        clearInterval(timeCounter);
        alert(`Você ganhou!! Com ${moves} rodadas e ${time} segundos`)
    }
    
}


let moves = startGameData();    //Return 0 to move count
let time = 0;
const timeCounter = setInterval(()=>{
      time++;
    document.querySelector('[data-information = "time"]').innerText = time;
    return timeCounter
},1000)

loadGame();




