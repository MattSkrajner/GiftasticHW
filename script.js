$(document).ready(function() {
    // creates array to hold new player button values
    var topics = [];
    
        function displayPlayer() {
    
        var searchTerm = $(this).data("search");
        // connects to the Giphy API, adds search
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                
                var playerDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var animatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var playerImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                playerImage.attr("src", staticSrc);
                playerImage.addClass("playerGiphy");
                playerImage.attr("data-state", "still");
                playerImage.attr("data-still", staticSrc);
                playerImage.attr("data-animate", animatedSrc);
                playerDiv.append(p);
                playerDiv.append(playerImage);
                $("#gifDisplay").prepend(playerDiv);
            }
        });
    }
    
        $("#addPlayer").on("click", function(event) {
            event.preventDefault();
            var newPlayer = $("#playerInput").val().trim();
            topics.push(newPlayer);
            $("#playerInput").val('');
            displayButtons();
          });
    
        function displayButtons() {
        $("#newButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var dynamicButton = $('<button class="btn btn-primary">');
          dynamicButton.attr("id", "player");
          dynamicButton.attr("data-search", topics[i]);
          dynamicButton.text(topics[i]);
          $("#newButtons").append(dynamicButton);
        }
      }
    
      displayButtons();
    
      $(document).on("click", "#player", displayPlayer);
    
      $(document).on("click", ".playerGiphy", animateGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function animateGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });