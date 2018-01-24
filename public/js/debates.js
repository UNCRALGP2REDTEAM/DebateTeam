$(document).on("ready", function() {
	$("#submit").on("click", function(event) {
		
		var newUser = {
			username: $("#name").val().trim(),
			pass: $("#pass").val().trim()
		};

		$.ajax("api/users", {
			type: "POST",
			data: newUser
		}).then(
		function() {
			console.log("created new user");
		});
	});
});