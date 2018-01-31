// currentURL = window.location;

$(document).ready(function() {
  $("#username-error").hide();
});

function submitUser() {
	if ($("#newpass1").val() !== $("#newpass2").val()) {
		window.alert("Passwords don't match");
	} else {	
			var newUser = {
			username: $("#newlogin").val().trim(),
			password: $("#newpass1").val().trim()
			};
		
		// console.log(newUser);
		
			$.ajax("api/users", {
				type: "POST",
        data: newUser,
        statusCode: {
          409: function() {
            console.log("User exists.");
            $("#username-error").show();
          }
        }
			}).then(function(res, err) {
				if (err) {
					console.log(err);
				};
			});
		};
	};
