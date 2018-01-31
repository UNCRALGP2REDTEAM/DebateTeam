// currentURL = window.location;

function submitUser() {
	if ($("#newpass1").val() !== $("#newpass2").val()) {
		window.alert("Passwords don't match");
	} else {	
			var newUser = {
			username: $("#newlogin").val().trim(),
			password: $("#newpass1").val().trim()
			};
		
<<<<<<< HEAD
		// console.log(newUser);
		
			$.ajax("api/users", {
				type: "POST",
				data: newUser
			}).then(function(res, err) {
				if (err) {
					console.log(err);
				};
				redirect();
			});
		};
	};

function redirect() {
	window.location.assign("localhost:8080/main");
};
=======
		var newUser = {
		username: $("#newlogin").val().trim(),
		password: $("#newpass1").val().trim()
	};
	
	console.log(newUser);
	
	$.ajax("api/users", {
		type: "POST",
		data: newUser
	}).then(
	
	function(result) {
		// console.log("created new user");

		if (err) {
        	console.log(err);
		}
			location.reload();
	});
}
>>>>>>> 2fda0db6d7b62308fdf1763a2c97c8193076863a
