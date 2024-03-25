const Browse = {
    createUrl: function(name, course) {
        const baseUrl = 'browse.html'; //base url for the browse page
        const urlParams = new URLSearchParams({name, course}); //name and course parameters
        const url = `${baseUrl}?${urlParams}`; //append name and course
        return url;
    },

    //given the new url, navigate to this page for the specific browse page.
    navigateToUrl: function(url) {
        window.location.href = url;
    },
}
