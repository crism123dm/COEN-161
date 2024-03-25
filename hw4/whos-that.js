const input = document.querySelector("input");
const body = document.querySelector("body");
const img = document.querySelector("img");
const section = document.querySelector("section");
const str = 'some';
let randNumber = Math.floor(Math.random() * (150 - 1) + 1); 
fetch(`https://pokeapi.co/api/v2/pokemon/${randNumber}`)     
    .then(response => response.json())     
    .then(data => {
        console.log({data});
        const pokemon = data.name;
        console.log(pokemon);
        //to turn the first letter capital
        // const cap = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
        const cap = pokemon[0].toUpperCase() + pokemon.slice(1);
        //some goes out of scope while cap does not;
        some = cap;
        console.log(cap, some);
        
        img.setAttribute("src", `https://aelahi.dev/coen-161/pokemon/${cap}.png`);
        //will cause the console to catch the error, but will still allow the rest of our code to run
        // return Promise.reject("rejected");
    })
    .catch(error => {
        console.log(error);
        const p = document.createElement("p");
        p.textContent = "There was an error";
        section.prepend(p);
    }) ;

//still need to create p error element


const rmvClass = function() {
    img.classList.remove('wrong');
}


const check = function(event) {
    console.log("check")
    if(event.key == "Enter") {
        console.log( "enter key was pressed");
        //console.log(input.value, `https://aelahi.dev/coen-161/pokemon/${some}.png`);
        if(input.value.trim() == some) {
            console.log("correct");
            img.classList.add('correct');
            img.classList.remove("wrong");
        } else {
            console.log("wrong");
            img.classList.add("wrong");
            img.classList.remove('correct');
            setTimeout(rmvClass, 3000);
        }
            
    }  
}


body.addEventListener("keyup", check);
