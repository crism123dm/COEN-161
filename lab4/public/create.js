const Create = {

    elements: {
        localList: [],
        termList: [],
    },
    
    handleFileInput: function() {
        const input = document.querySelector("#upload-input");
        input.addEventListener("change", Create.uploadingFile)
    },

    uploadingFile: function(){
        let fr=new FileReader();
        fr.readAsText(this.files[0]);
        fr.onload=function(){
            Create.parseAndAdd(fr.result);
        };

    },

    parseAndAdd: function(myString){
        console.log(myString);
        Create.elements.localList = myString.split(',');
        console.log(Create.elements.localList);

        for(let i = 0; i < Create.elements.localList.length/2; i++){
            Create.createCard(Create.elements.localList[2*i], Create.elements.localList[2*i + 1]);
        }

    },

    createCard: function(term, definition){

        dl = document.querySelector("dl");

        div = document.createElement("div");
        dt = document.createElement("dt");
        dd = document.createElement("dd");
        hiddenInput1 = document.createElement("input");
        hiddenInput2 = document.createElement("input");

        hiddenInput1.classList.add("hidden");
        hiddenInput2.classList.add("hidden");
        
        dt.textContent = term;
        dd.textContent = definition;
        
        div.appendChild(dt);
        div.appendChild(dd);
        dt.appendChild(hiddenInput1);
        dd.appendChild(hiddenInput2);
        dl.appendChild(div);

        Create.elements.termList.push(term);
        Create.elements.termList.push(definition);
    },

    addCustomCard: function(){
        const addButton = document.querySelector("#add-card-button");
        addButton.addEventListener("click", function(){

            const termInput = document.querySelector("#word-input");
            const definitionInput = document.querySelector("#definition-input");

            const newTerm = termInput.value;
            const newDefinition = definitionInput.value;
            
            Create.createCard(newTerm, newDefinition);

            termInput.value = "";
            definitionInput.value = "";

        });
    },

    saveSet: function(){
        const getLocalStorage = myStorage.getAllSetInfo();
        console.log(getLocalStorage);
        setTitle = document.querySelector("#name");
        setCourse = document.querySelector("#course");
        titleInput = setTitle.value;
        courseInput = setCourse.value;


        if(titleInput!=="" && courseInput!==""){    
            myStorage.createSet(titleInput, courseInput, Create.elements.termList);

            console.log(getLocalStorage);
            
            const baseURL = new URL('http://students.engr.scu.edu/~lahearn/lab4/public/browse.html');
            baseURL.searchParams.append('set', titleInput);
            baseURL.searchParams.append('course', courseInput);
            
            console.log(baseURL);

            window.location.href = baseURL;
        }

    },

    main: function(){
        Create.handleFileInput(); 
        Create.addCustomCard();
        document.querySelector(".secondary").addEventListener("click", Create.saveSet);
    },


    
};

Create.main();