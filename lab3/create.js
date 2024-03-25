
let localList, termList = [];



const uploadFile = function(){
    let fileReader = new FileReader();
    fileReader.readAsText(this.files[0]);
    fileReader.onload = function() {
        parseAndAdd(fileReader.result);
    }
}

const parseAndAdd = function(string) {
    localList = string.split(',');

    for(let i = 0; i < localList.length/2; i++){
        createNewCard(localList[2*i], localList[2*i+1]);
    }
}

const createNewCard = function(term, definition){
    const div = document.createElement("div");
    const dl =document.querySelector("dl");
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = definition;
    hip = document.createElement("input");
    hip.classList.add("hidden");
    hip2 = document.createElement("input");
    hip2.classList.add("hidden");

    div.appendChild(dt);
    div.appendChild(dd);
    dt.appendChild(hip);
    dd.appendChild(hip2);

    termList.push(term);
    termList.push(definition);

}

const addCustomCard = function(){
    const addButton = document.querySelector("#add-card-button");
    addButton.addEventListener("click", function() {
        const termInput = document.querySelector("#word-input");
        const definitionInput = document.querySelector("#definition-input");

        const newTerm = termInput.value;
        const newDefinition = definitionInput.value;
            
        createNewCard(newTerm, newDefinition);

        termInput.value = "";
        definitionInput.value = "";
    });
}

const saveSet = function(){
    const getLocalStorage = Storage.getAllSetInfo();
    const setTitle = document.querySelector("#name");
    const setCourse = document.querySelector("#course");
    titleInput = setTitle.value;
    courseInput = setCourse.value;

    if(titleInput!=="" && courseInput!==""){    
        myStorage.createSet(titleInput, courseInput, Create.elements.termList);

        console.log(getLocalStorage);

        const baseURL = new URL('http://students.engr.scu.edu/~camedal/coen-161/lab-3/browse.html');
        baseURL.searchParams.append('set', titleInput);
        baseURL.searchParams.append('course', courseInput);
        
        console.log(baseURL);

        window.location.href = baseURL;
    }
}



//main function
const input = document.querySelector("input#upload-input");
input.addEventListener('change', uploadFile);
addCustomCard();
const secondaryButton = document.querySelector('.secondary');
secondaryButton.addEventListener('click', saveSet);