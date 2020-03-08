var topics = ["football", "baseball", "lacrosse", "wrestling", "softball", "volleyball", "hockey", "basketball" ];

//Makes topics into buttons 
function makeButtons(){
$("#buttons").empty();
for (i = 0; i < topics.length; i++) {
  var topicButton = $("<button>");
  topicButton.addClass("sport");
  topicButton.attr("data-sport", topics[i]);
  topicButton.text(topics[i]);
  $("#buttons").append(topicButton);
}};

$("#add-sport").on("click", function(event) {
var newButton = $("#sport-form").val().trim();
topics.push(newButton);
makeButtons();
});


$("#start").on("click", makeButtons());

//connects button data to search giphy
$("button").on("click", function(topicButton) {
    var sport = $(this).attr("data-sport");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      sport + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    //shows giphys in order with ratings
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var sportImage = $("<img>");
          sportImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(sportImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });