const Content = {

    elements: {
        displayList: document.querySelector("ul"),
        cardGroupsList: document.querySelectorAll("li"),
        colorArray : [
            "#E6E6FA",
            "#FAEBD7",
            "#F4A460",
            "#E0FFFF",
            "#CD5C5C",
            "#BA55D3",
            "#00FF00",
            "#A9A9A9",
            "#FA8072",
            "#FFA500"
        ],
        setIndex : 0,
    },
    
    randomColor: function () {
        let index = Math.floor(Math.random() * 10);
        return Content.elements.colorArray[index];
    },
    
    generateList: function() {
        const setInfo = Content.getAllSetInfo();
        const ul = document.querySelector("ul");
        //for all the sets received, create each one sequentially(for-each loop)
        setInfo.forEach(element => {
            ul.appendChild(Content.createListItem(element));
        });

    },

    createListItem: function(newSet) {

        const li = document.createElement("li");
        const a = document.createElement("a");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const h2 = document.createElement("h2");
        const terms = newSet["list"].length;

        const baseURL = new URL('http://students.engr.scu.edu/~lahearn/lab4/public/browse.html');
        baseURL.searchParams.append('set', newSet["setName"]);
        baseURL.searchParams.append('course', newSet["course"]);

        a.href = baseURL;
        h2.textContent = newSet["name"];
        p.textContent = newSet["course"];
        p2.textContent = `${terms/2} words`;

        li.appendChild(a);
        a.appendChild(h2);
        a.appendChild(p);
        a.appendChild(p2);

        return li;
    },


    getAllSetInfo: function () {

        const getSets = localStorage.getItem("sets");

        if (!getSets) {
            console.log("empty");
            return [];
        }

        return JSON.parse(getSets);
    },


    //use setInterval to call generateList over and over

    main: function () {
    
        setInterval(Content.generateList(), 50);

        Content.elements.cardGroupsList.forEach(element => {
            element.style.backgroundColor = Content.randomColor();
        });
    
    },


};


Content.main();
