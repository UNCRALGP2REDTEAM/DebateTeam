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
