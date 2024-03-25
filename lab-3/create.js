//create.js is the backend that runs the create page, but the code is also used by other functions
//create "dl" element if it does not exist
//this function actually creates two dl elements to orient the cards in two columns so it makes better use of the display real estate
function createDL(){
    console.log("createDL is called")
    const check = document.querySelector("dl");
    if(check === null){
        let form = document.getElementById("grid-container");
        let newCardsLeft = document.createElement("dl");
        newCardsLeft.setAttribute("id", "left");
        form.appendChild(newCardsLeft);
        let newCardsRight = document.createElement("dl");
        newCardsRight.setAttribute("id", "right");
        form.appendChild(newCardsRight);
    }
}

//arrays to hold all cards that are added regardless of method of addition
let terms = [];
let definitions = [];

//universal function to add new card
//initial column to add cards is the left column, but the function alternates every time a card is added.
//first function call is createDL to create dl objects if this is the first call of add card
//then push the new term and def to the global array
//next create html elements add associated text, classes, and attributes
//then append new elements to dl
//this is repeated twice to create the dt elements then the dd elements
let currentColumnn = "left";
const addCard = function(term, definition){
    createDL();
    console.log("addCard is called")
    let newCards = document.getElementById("right");
    if(currentColumnn === "left"){
      newCards = document.getElementById("left");
      currentColumnn = "right";
    }
    else{
      currentColumnn = "left";
    }
    //push term and definition
    terms.push(term);
    definitions.push(definition);
    
    //create html elements
    let termElement = document.createElement("dt");
    let hiddenTerm = document.createElement("dt");
    let termInput = document.createElement("input");
    termElement.textContent = term;
    termElement.classList.add("term");
    termInput.setAttribute("value",term);
    termInput.setAttribute("type","hidden");
    hiddenTerm.appendChild(termInput);
    newCards.appendChild(termElement);
    newCards.appendChild(hiddenTerm);


    let definitionElement = document.createElement("dd");
    let hiddenDefinition = document.createElement("dd");
    let definitionInput = document.createElement("input");
    definitionElement.textContent = definition;
    definitionElement.classList.add("defintion");
    definitionInput.setAttribute("value",definition);
    definitionInput.setAttribute("type","hidden");
    hiddenDefinition.appendChild(definitionInput);
    newCards.appendChild(definitionElement);
    newCards.appendChild(hiddenDefinition);
}

// Add event listener to file input field
const fileInput = document.getElementById("upload-input");
fileInput.addEventListener('change', handleFileSelect, false);

//event listener for manual term add
const addCardButton = document.getElementById("add-card-button");
addCardButton.addEventListener('click', manualCardAdd);

//if file is uploaded
function handleFileSelect(event) {
    console.log("handleFileSelect is called")
    // Get the uploaded file
    const file = event.target.files[0];

  // Use FileReader API to read file contents
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(file);
}

// when file is loaded, parse data with the API and create new card elements for every element (add card takes care of adding them to associated arrays)
function handleFileLoad(event) {
    console.log("handleFileLoad is called")
    // Use Papaparse to parse CSV data
  const parsedData = Papa.parse(event.target.result).data;

  // Iterate over parsed data and create flashcards for "term,definition" rows
  for (let i = 0; i < parsedData.length; i++) {
    const row = parsedData[i];
    if (row.length === 2 && row[0].trim() !== '' && row[1].trim() !== '') {
      // Create flashcard element
      addCard(`${row[0].trim()}`,`${row[1].trim()}`)
      
    }
  }
}

//if add card button is tapped
//this function is for manual card adds where addCard is called to handle the input values.
function manualCardAdd() {
    console.log("ManualCardAdd is called")
    let termInput = document.getElementById("word-input");
    let defInput = document.getElementById("definition-input");
    let term = termInput.value;
    let def = defInput.value;
    addCard(term,def);
    termInput.setAttribute("value", "");
    defInput.setAttribute("value", "");
}


//Create Set is called at the end when the user decides to submit their new set.
//first commits the set to storage
//then creates a new url to direct the user to the browse page associated with their new set
const createButton = document.getElementById("submit");
const setName = document.getElementById("name");
const setCourse = document.getElementById("course");
createButton.addEventListener("click", function() {
  Storage.createSet(setName.value, setCourse.value, terms, definitions);
  const newUrl = Browse.createUrl(setName.value, setCourse.value);
  console.log(newUrl);
  Browse.navigateToUrl(newUrl);
});



