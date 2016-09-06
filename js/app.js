/* Step 1 get User input */

$(document).ready(function () {
    $("#user-input").submit(function (event) {
        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();
        //get the value from the input box
        var userInput = $("#query-input").val();
        //use that value to call the getResults function defined bellow
        getResults(userInput);
    });
});

/* Step 2 Make API call based on User input */

function getResults(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search" // URL THAT THE API REQUEST IS SENT TO
        , { // DATA TO BE SENT TO THE API SERVER
            part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/)
            maxResults: 20, //number of results per page
            key: "AIzaSyDWDKlJLxyILcVrL1IniY1hujl4FMdMdH4",
            q: userSearchTerm, //shearch query from the user
            type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
        },
        function (receivedApiData) { // CONFIRMATION TELLING IF THE REQUEST WAS RECIEVED OR NOT
            //show the json array received from the API call
            console.log(receivedApiData);
            // if there are no results it will just empty the list
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found!");
            }
            //if there are results, call the displaySearchResults
            else {
                displaySearchResults(receivedApiData.items);
            }
        });
}
/* Step 3 Show results based on API output */
function displaySearchResults(videosArray) {

    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(videosArray, function (videosArrayKey, videosArrayValue) {

        //create and populate one LI for each of the results
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output video title
        buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
        buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });

    //use the HTML output to show it in the index.html
    $(".results ul").html(buildTheHtmlOutput);
}
