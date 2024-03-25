//const main = document.querySelector("main");


const color = function() {
    r = Math.random() * (255 - 0 ) + 0;
    g = Math.random() * (255 - 0 ) + 0;
    b = Math.random() * (255 - 0 ) + 0;
    a = Math.random();
    //return "rgba(" + r + "," + g + "," + b
    //use backticks when you want to interpolate variables 
    //just like printf
    //useful for formatting variables
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const block = function () {
    //createElement creates a new element in the doc with the given tag;
    const b = document.createElement("div");
    //classlist is a way to add or remove or toggle the class attribute
    b.classList.add("block");
    b.style.background = color();
    return b;
  };

  
const main = document.querySelector("main");
for(let i = 0; i < 100; i++){
    main.appendChild(block());
    
}
