var currentUser;
var url;
var splitUrl;
var pageId;
var newPost;


$(document).ready(function updatePage() {

	url = window.location.href;
	splitUrl = url.split("_");
	pageId = splitUrl[1];
	var yayArray = [];
	var nayArray = [];
	var replyArray = [];
	currentUser = getCurrentUser();

	if (currentUser) {
		$("#login").hide();
		$("#logout").show();
	} else {
		$("#logout").hide();
		$("#login").show();
	}

	$.get("/api/page/" + pageId, function(data) {
		console.log("Fetched page info: " + JSON.stringify(data));
		$("#debate-title").text(data.name);
		$("#debate-description").text(data.description);
	});

	$.get("api/comments/" + pageId, function(data) {
		console.log("call made");
		console.log(data);
		


		for (var i = 0; i < data.length; i++) {
				if (data[i].side === 1 && data.ParentId !== null) {
					yayArray.push(data[i]);
				}
				if (data[i].side === 2 && data.ParentId !== null) {
					nayArray.push(data[i]);
				}
				if (data.ParentId === null) {
					replyArray.push(data[i]);
				}
				console.log(yayArray);
		};

		for (var j = 0; j < yayArray.length; j++) {
				var ownerId = yayArray[j].UserId;
				var contentDiv = "<div class=content>";
				var comment = "<p>" + yayArray[j].text;
				var userInfo = "<p class='username'>" + "-" + yayArray[j].username;
				var deleteButton = "<button class='delete' onclick=deletePost() id=" + ownerId + " value=" + yayArray[j].id + ">" + "x";
				$(".containeryea").append(contentDiv + comment + userInfo + deleteButton);
		};

		for (var k = 0; k < nayArray.length; k++) {
				var ownerId = nayArray[k].UserId;
				var contentDiv = "<div class=content id=" +  ownerId + ">";	
				var comment = "<p>" + nayArray[k].text;
				var postId = "<p class=indicator>" + nayArray[k].id;
				var userInfo = "<p class='username'>" + "-" + nayArray[k].username;
				var deleteButton = "<button class='delete' onclick=deletePost() id=" + ownerId + " value=" + nayArray[k].id + ">" + "x";
				$(".containernay").append(contentDiv + comment + userInfo + deleteButton);
		};
	});
});
	
function captureComment(position) {
		if (!currentUser) {
		
			console.log("No logged in user!");
			window.location.href = '/login.html';
			
			} else {
			
			newPost = {
				text: $("#argument").val().trim(),
				side: position,
				PageId: pageId,	
				UserId: currentUser.user_id,
				ParentId: null 				
			};
		
			console.log(newPost);
			console.log(currentUser);

			$.ajax("/api/comments", {
				type: "POST",
				data: newPost,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'BEARER ' + currentUser.token);
				},
				statusCode: {
					401: function() {
						console.log("Bad token while trying to create comment. Sending to login page.");
						logout();
						window.location.href = '/login.html';
					}
				}
			}).then(
					function (result, err) {
						console.log(JSON.stringify(result));
						var createdPost = JSON.stringify(result.id);
						console.log(createdPost);
						if (err) {
							console.log(err);
						}
						location.reload();
					});
				}
			};

			
function deletePost() {
	$('.delete').on("click", function() {
		var check = $(this).attr("id");
		var id = $(this).attr("value");	
	
	if (currentUser.user_id == check) {
		
		$.ajax("api/comments/" + id, {
			method: "DELETE",
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'BEARER ' + currentUser.token);
			},
			statusCode: {
				401: function() {
					console.log("Bad token while trying to create comment. Sending to login page.");
					logout();
					window.location.href = '/login.html';
				}
			}
		}).then(function(result, err) {
			if (err) {
				console.log(err)
			}
			location.reload();
			});
		};
	});
};
