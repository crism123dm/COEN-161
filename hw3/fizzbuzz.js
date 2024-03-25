const body = document.querySelector("body");

for(let x = 1; x <= 1000; x++ ) {
    const block  = document.createElement("div");

    if(x % 3 == 0 && x % 5 == 0){
        console.log("fizzbuzz");
        block.classList.add("fizzbuzz");
    } else if (x % 3 == 0) {
        console.log("fizz");
        block.classList.add("fizz");
    } else if (x % 5 == 0) {
        console.log("buzz");
        block.classList.add("buzz");
    } else {
        console.log(x);
    }

    body.appendChild(block);
}