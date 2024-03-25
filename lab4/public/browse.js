const Browse = {

    elements: {
        cardList: [],
    },

    generateList: function(myList){

        const dl = document.querySelector("dl");

        for(let i = 0; i < myList.length; i+=2){
            Browse.createItem(dl, myList[i], myList[i+1]);
        }

    },

    createItem: function(listContainer, cardTitle, cardDescription){

        div = document.createElement("div");
        dt = document.createElement("dt");
        dd = document.createElement("dd");
        dtInput = document.createElement("input");
        ddInput = document.createElement("input");

        dtInput.addEventListener

        dt.textContent = cardTitle;
        dd.textContent = cardDescription;

        div.appendChild(dt);
        div.appendChild(dd);

        div.classList.add("browse-card");

        listContainer.appendChild(div);

    },

    getParams: function(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const set = urlParams.get('set');
        const course = urlParams.get('course');

        console.log(set);
        console.log(course);

        Browse.elements.cardList = myStorage.getCards(set);
        console.log(Browse.elements.cardList);

    },

    main: function(){
        Browse.getParams();
        Browse.generateList(Browse.elements.cardList);
    },



};

Browse.main();
