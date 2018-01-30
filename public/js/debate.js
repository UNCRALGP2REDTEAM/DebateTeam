$(document).ready(function () {

	var url = window.location.href;
	console.log(url);
	var yayArray = [];
	var nayArray = [];
	var replyArray = [];
	var currentUser = getCurrentUser();

	$.get("api/comments/5", function(data) {
		console.log("call made");
		console.log(data);


		for (var i = 0; i < data.length; i++) {
				if (data[i].side === 1 && data.ParentId !== null) {
					yayArray.push(data[i]);
				};
				if (data[i].side === 2 && data.ParentId !== null) {
					nayArray.push(data[i]);
				};
				if (data.ParentId === null) {
					replyArray.push(data[i])
				}
		}

		for (var j = 0; j < yayArray.length; j++) {
				var tag = "<p>" + yayArray[j].text;
				var userInfo = "<p>" + yayArray[j].username;
				$(".containeryea").append(tag + userInfo);
		};

		for (var k = 0; k < nayArray.length; k++) {
				var tag = "<p>" + nayArray[k].text;
				var userInfo = "<p>" + nayArray[k].username;
				$(".containernay").append(tag);
		};
	});
});


	$("#submityea").on("click", function() {
		if (!currentUser) {
	    console.log("No logged in user!");
		  } else {
			$.post("/api/comments/", function(data) {

				newPost = {
					text: $("#arguement").val().trim(),
					side: 1
				}
			};
		});
	};
});