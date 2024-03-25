let loaded = 0;
let presses = 0;

const section = document.querySelector("#carousel");

const calculateTransforms = (presses) => {
    let value = presses * -200;
    carousel.style.transform = `translateX(${value}px)`;
  };

const some = function() {
    if(presses <= 0){
        return;
    }
    presses--;
    calculateTransforms(presses);
}

const some2 = function() {
    if(presses >= 3){
        return;
    }
    presses++;
    calculateTransforms(presses);
}

const onLoad = function() {
    loaded++;
    if(loaded == 5){
        section.classList.remove("loading");
        
       const child = section.firstChildElement;
       for(let i =0; i < loaded; i++){
            child.removeEventListener('load', onLoad);
            child = child.nextSibling;
       }
    }
}

//creating the 5 img elements
for(let i = 0 ; i < 5; i++) { 
    const img = document.createElement("img");
    img.setAttribute("src", "http://placekitten.com/g/200/300");
    section.appendChild(img);
    img.addEventListener('load', onLoad);
}


const previous = document.querySelector("#previous");
previous.addEventListener('click', some);

const next = document.querySelector("#next");
next.addEventListener('click', some2);


  
