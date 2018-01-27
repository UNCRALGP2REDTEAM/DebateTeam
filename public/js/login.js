$(document).ready(function () {
  var currentUser = getCurrentUser();
  if (currentUser) {
    console.log("Current user is: " + JSON.stringify(currentUser));
  } else {
    console.log("Not logged in.");
  }
  
  $("#submit").on("click", function (event) {
    event.preventDefault();
    // Log out the currently-logged-in user, if any
    logout();
    var loginInfo = {
      username: $("#name").val().trim(),
      password: $("#pass").val().trim()
    };

    $.ajax("/login", {
      type: "POST",
      dataType: "json",
      data: {
        username: loginInfo.username,
        password: loginInfo.password
      }
    }).then(
      function (result) {
        if (result.token) {
          // We got a token!! Login was successful.
          // The JWT comes in with a prefix on it: "JWT ". That makes it easier to spot as a JWT.
          // We strip that header so only the token remains.
          var jwtEncoded = result.token.split(" ")[1];
          var jwtDecoded = jwt_decode(jwtEncoded);
          // Store the user token in local storage
          localStorage.setItem('currentUser', JSON.stringify(jwtDecoded));
          console.log("Decoded token contents: " + JSON.stringify(jwtDecoded));
        } else {
          console.log("Failed. Response: " + JSON.stringify(result));
        }
        // Clear the login fields
        $("#name").val('');
        $("#pass").val('');
      });
    });
});