
let list = [];
const dl = document.querySelector("dl");


const genList = function(listed){
    //increment by 2 because each card has a term and definition
    for(let i=0;i < listed.length; i+=2){
        createCard(listed[i], listed[i+1]);
    }
}

const createCard = function(term, definition) {
    const div = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = definition;

    div.appendChild(dt);
    div.appendChild(dd);

    div.classList.add("browse-card");
    dl.appendChild(div);
}

const getParams = function() {
    const searchParams = new URLSearchParams(window.location.search);

    const set = searchParams.get('set');

    return Storage.retrieveSet(set);
}


//main function
list = getParams();
genList(list);