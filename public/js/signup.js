// currentURL = window.location;

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
				data: newUser
			}).then(function(res, err) {
				if (err) {
					console.log(err);
				};
			});
		};
	};
