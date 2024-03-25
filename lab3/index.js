const colors = ["white", "blue", "green", "red", "yellow", "orange", "pink", "purple", "grey"];
const sets = Storage.getAllSetInfo();


//gets random color for flash card
const randomColor = function() {
    let x = Math.floor(Math.random() * (10 - 0) + 0);
    
    return colors[x];
}

const generateCards = function() {
    //sets = Storage.getAllSetInfo();
    const setInfo = sets;
    const ul = document.querySelector("ul");
    setInfo.forEach(element => ul.appendChild(displayCard(element)));
}


const displayCard = function(set) {
    //gets the length of cards within the set
    const length = set["list"].length;

    const li = document.createElement("li");
    const a = document.createElement("a");
    //the url that each set will link to
    const baseURL = new URL('http://students.engr.scu.edu/~camedal/coen-161/lab-3/browse.html');
    baseURL.searchParams.append('set', set["setName"]);
    baseURL.searchParams.append('course', set["course"]);
    a.setAttribute(href, baseURL);
    const h2 = document.createElement("h2");
    h2.textContent = set["name"];
    const p1 = document.createElement("p");
    p1.textContent = set["course"];
    const p2 = document.createElement("p");
    p2.textContent =   `${length/2}` + " terms";

    a.appendChild(h2);
    a.appendChild(p1);
    a.appendChild(p2);
    li.appendChild(a);
    
    return li;
}



const displayColors = function() {
    const flashcards = document.querySelectorAll("li");

    flashcards.forEach( li => li.style.backgroundColor = randomColor() );
}

//main function
setInterval(generateCards, 100);
displayColors();








