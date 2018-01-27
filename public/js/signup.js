
function submitUser() {
		
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
		};
			location.reload();
	});
};

