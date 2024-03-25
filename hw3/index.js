const body = document.querySelector("body");
const p = document.querySelector("p");
let size = 1;



const prevent = function(event) {
    event.preventDefault(); //prevents default browser behavior

    if(event.key == "ArrowUp") {
        console.log("up ");
        size++;
        p.style.fontSize = size + "rem";
        console.log(window.getComputedStyle(p).fontSize);
    } 
    if(event.key == "ArrowDown") {
        console.log("down");
        size--;
        p.style.fontSize = size + "rem";
    }
    if(size > 10) {
        p.textContent = "💥";
        body.removeEventListener('keydown', prevent);
    }
}

body.addEventListener('keydown', prevent);

/*
How to stop events from bubbling?
 - You can stop events from bubbling by adding the '.stopPropagation()' within an event handler.
 - This means that if you click on a specific element elements that are also affected will not fire if an event on a 
    child has already activated.
        For example: 
            video.addEventListener("click", (event) => {
                event.stopPropagation();
                video.play();
            });


How to reverse the flow of click handlers?
- You can reverse the flow of click handlers by turning the capture to true on each event. 
    For example :
        document.body.addEventListener("click", handleClick, { capture: true });
        container.addEventListener("click", handleClick, { capture: true });
        button.addEventListener("click", handleClick);
- This will cause the body event to fire first, then container, then button.

*/
