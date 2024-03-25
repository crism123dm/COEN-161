//these are universal functions used for managing the local storage of flashcard elements, sets of flashcards, and the methods to retrieve, push, and add to these sets.

const Storage = {
    //this method gets the identifier for the set object given a name and course number
    //essentially it just formats the given name and course into the appropriate form
    getSetName: function(name, course){
        let setName = name.toLowerCase();
        let setCourse = course.toLowerCase();
        setName = setName.replace(/ /g, "-");
        setCourse = course.replace(/ /g, "-");
        let returnString = `set-${setName}-${setCourse}`;
        return returnString;
    },
    
    //gets the array of all the sets in local storage
    //JSON.parse used to decrypt info that is stored using JSON.stringify
    getAllSetInfo: function(){
        const allSets = localStorage.getItem("sets");
        if (!allSets) {
          return [];
        }
        return JSON.parse(allSets);
    },

    //method to create a brand new set given all the specified parameters
    //adds the new set identifiers to the existing matrix
    //calls the add function to add all the individual cards
    createSet: function(name, course, terms, definitions){
        let allSets = Storage.getAllSetInfo();
        const newSetName = Storage.getSetName(name, course);
        allSets.unshift({id:newSetName, name, course});
        localStorage.setItem("sets", JSON.stringify(allSets));
        localStorage.setItem(newSetName, JSON.stringify([]));
        for(i=0; i<terms.length; i++){
            Storage.add(newSetName, terms[i], definitions[i])
        }
    },

    //adds the a single card to a given set using parse to decrypt the existing set, push the new card, then return the set to local storage.
    add: function(set, term, definition){
        let setToMod = localStorage.getItem(set);
        setToMod = JSON.parse(setToMod);
        setToMod.push({id:term, definition});
        localStorage.setItem(set, JSON.stringify(setToMod));
    },

    //retrieves all cards from a given set using the JSON parse functionality
    //this returns an array of the key-value pairs
    retrieveAll: function(set){
        let setCards = localStorage.getItem(set);
        if (!setCards) {
          return [];
        }
        return JSON.parse(setCards);
    },
}
