
const Storage = {
        //formates the name to get the specific identifier for a set
        getSetName: function(name, course){
            console.log("getSetName run", name, course);

            const nameNoSpace = name.replaceAll(' ', '-');
            nameNoSpace = nameNoSpace.toLowerCase();
            const courseNoSpace = course.replaceAll(' ', '-');
            courseNoSpace = courseNoSpace.toLowerCase();

            console.log("set-"+ nameNoSpace + "-" + courseNoSpace);
            return "set-"+ nameNoSpace + "-" + courseNoSpace;
        },
        //gets all of the sets in array form
        getAllSetInfo: function(){
            const info = localStorage.getItem("sets");
            if(info == null){
                return {    };
            }
            const setInfo = JSON.parse(info);
            return setInfo;
        },
        //creates a brand new set given a list of terms and name for the set
        createSet: function(named, coursed, listed){
            //retrieves all the sets in array form
            const setInfo = Storage.getAllSetInfo();
            //gets new name for set
            const newSetName = Storage.getSetName(named, coursed);

            //puts that new set onto the localstorage (i.e. its in the key list but has no value)
            localStorage.setItem(newName, '');

            //adds the info to the set
            setInfo[newSetName] = {
                                setName: newSetName,
                                name: named,
                                course: coursed,
                                list: listed,

                            };
            //puts the updated sets back onto local storage
            localStorage.setItem("sets", JSON.stringify(setInfo));
            
        },
        //adds a single card to given set
        add: function(set, term, definition) {
            //retrieves set from local storage
            const getSets = localStorage.getItem('sets');
            //turns set into an object
            setInfo = JSON.parse(getSets);
            //adds fields to the object
            let index = 0;
            for(let i = 0; i < Object.keys(setInfo).length ; i++){
                setInfo[i]['setName' === set] ? index = i : console.log("next");
            }



            setInfo[index]['list'].push(term);
            setInfo[index]['list'].push(definition);

            //puts it back onto storage
            localStorage.setItem(set, JSON.stringify(setInfo));

        },
        //retrieves the set in object/array form
        retrieveSet: function(set) {
            const setInfo = localStorage.getItem("sets");
            setInfo = JSON.parse(setInfo);
            let index = 0;
            for(let i = 0; i < Object.keys(setInfo).length ; i++){
                if(setInfo[i]['setName'] === set){
                    return setInfo[i]['list'];
                }
                
            }
            
        },
};


