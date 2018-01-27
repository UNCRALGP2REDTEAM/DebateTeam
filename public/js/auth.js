// These helper functions can be called from any page JS. 

// Get the currently-logged-in user info. We return null if no user is logged in.

function getCurrentUser() {
  var userToken = null;
  if (localStorage.currentUser) {
    userToken = JSON.parse(localStorage.getItem('currentUser'));
  }
  return userToken;
}

// Log the user out, by deleting the token form local storage
function logout() {
  if (localStorage.currentUser) {
    localStorage.removeItem('currentUser');
  }
}
