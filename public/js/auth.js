// These helper functions can be called from any page JS. 

// Get the currently-logged-in user info. We return null if no user is logged in.
function getCurrentUser() {
  var jwtEncoded = localStorage.getItem('userToken');
  var userInfo = null;
  if (jwtEncoded) {
    userInfo = jwt_decode(jwtEncoded);
    userInfo['token'] = jwtEncoded;
    //jwtDecoded = JSON.parse(jwtDecoded);
  }
  return userInfo;
}

// Log the user out, by deleting the token form local storage
function logout() {
  if (localStorage.userToken) {
    localStorage.removeItem('userToken');
  }
}

function autoLogin(result) {
        if (result.token) {
          // We got a token!! Login was successful.
          // The JWT comes in with a prefix on it: "JWT ". That makes it easier to spot as a JWT.
          // We strip that header so only the token remains.
          var jwtEncoded = result.token.split(" ")[1];
          // Store the user token in local storage
          localStorage.setItem('userToken', jwtEncoded);
          var currentUser = getCurrentUser();
        } else {
          console.log("Failed. Response: " + JSON.stringify(result));
        }
        // Clear the login fields
        $("#name").val('');
        $("#pass").val('');
      };

