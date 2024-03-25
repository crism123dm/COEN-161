/*
1. With your script tag in the head of the document, take out the async and defer keywords. What happens to the Flashcards and why? The script 
doesn't work because the script tries to create event handlers before all the events are created.
2. Look through the documentation of the script element.
3. What do the async and defer attributes do? They allow the page to be loaded before the scripts take effect.
4. What event must occur before the script gets executed if we add the defer attribute? The html elements must finish loading.*/

//Storage.createSet("Web Development", "COEN-161", ["<html>","<p>"], ["beginning and end of a document", "paragraph element"])

//parse through the list of all sets and create a card for each set
//getAllSetInfo fetches an array of the sets, from which we can get a name and course number (they are stored with this info)
//we can also retrieve all the cards in a particular set using retrieveAll, enabling us to append the number of cards for each set.
const dispAllSets = async function(){
    let allSets = Storage.getAllSetInfo();
    for(i=0; i < allSets.length; i++){
        let set = allSets[i];
        let setName = set.name;
        let courseNumber = set.course;
        let cards = Storage.retrieveAll(sets[i].id);
        let numberOfCards = cards.length;
        createCard(setName,courseNumber,numberOfCards);
    }
}

//creates individual card given the set name, course number, and number of cards in the deck
//first get the element that holds all the cards
//then create all the required elements
//add content to the new object
//append the finished objects
const createCard = async function(name,number,numberOfCards){
    const list = document.getElementById("allSets");
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = Browse.createUrl(name,number);
    const setName = document.createElement("h2");
    const courseNumber = document.createElement("p");
    const numeroDeCards = document.createElement("p");
    setName.textContent = name;
    courseNumber.textContent = number;
    console.log(numberOfCards)
    numeroDeCards.textContent = `${numberOfCards} cards`;
    
    link.appendChild(setName);
    link.appendChild(courseNumber);
    link.appendChild(numeroDeCards);
    listItem.appendChild(link);
    list.appendChild(listItem);
}

let sets = Storage.getAllSetInfo();
dispAllSets();

//adds color to the set cards by creating array of colors and using for-loop to iterate through
const colors = ["#F25764","#D9ADD6","#F25E7A","#04BF9D","#F28705","#BF54A3","#D95FC5","#3B7FD9","#D9A273","#A68776"];
console.log(colors);
const flashcards = document.body.querySelectorAll("li");
for(let i=0; i < flashcards.length; i++){
    const color = colors[Math.floor(10*(Math.random()))];
    const flashcard = flashcards.item(i);
    flashcard.style.backgroundColor = color;
}

/*
const randomColor = function () {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;
    return rgb;
}

const changeNames = function () {
    for(let i=0; i < flashcards.length; i++){
        const color = randomColor();
        const flashcard = flashcards.item(i);
        flashcard.style.backgroundColor = color;
    }
}

const createArray = function (numberOfNumbers) {
    let returnArray = [];
    for(let i=0; i < numberOfNumbers; i++){
        let randomNumber = Math.floor(100*Math.random());
        returnArray.push(randomNumber);
    }
    return returnArray;
}

let arrayOfRandos = createArray(15);
let sum = 0;
arrayOfRandos.forEach(element => sum = sum + element);
const mambo = document.getElementById("rando");
mambo.textContent = sum;

const buttonOfDoom = document.getElementById("new");
buttonOfDoom.addEventListener("click", changeNames);


*/