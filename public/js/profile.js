$(document).ready(function() {
	
	$.ajax("api/users/", {
		type: "GET",
	}).then(function(res) {
		console.log(res);
		$("#profileInfo").append(res.body);
	});
});