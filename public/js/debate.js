var currentUser;
var url;
var splitUrl;
var pageId;
var newPost;


$(document).ready(function () {

	url = window.location.href;
	splitUrl = url.split("_");
	pageId = splitUrl[1];
	var yayArray = [];
	var nayArray = [];
	var replyArray = [];
	currentUser = getCurrentUser();

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
		}

		for (var j = 0; j < yayArray.length; j++) {
				var ownerId = yayArray[j].UserId;
				var contentDiv = "<div class=content id=" +  ownerId + ">";
				var comment = "<p>" + yayArray[j].text;
				var postId = "<p class=indicator>" + yayArray[j].id;
				var userInfo = "<p class='username'>" + "-" + yayArray[j].username;
				var deleteButton = "<button class='delete' onclick=deletePost()>" + "x";
				$(".containeryea").append(contentDiv + comment + userInfo + deleteButton + postId);
		}

		for (var k = 0; k < nayArray.length; k++) {
				var ownerId = nayArray[k].UserId;
				var contentDiv = "<div class=content id=" +  ownerId + ">";	
				var comment = "<p>" + nayArray[k].text;
				var postId = "<p class=indicator>" + nayArray[k].id;
				var userInfo = "<p class='username'>" + "-" + nayArray[k].username;
				var deleteButton = "<button class='delete'>" + "x";
				$(".containernay").append(contentDiv + comment + userInfo + deleteButton + postId);
		}
		$(".indicator").hide();
	});
});
	
function captureComment(position) {
	newPost = {
			text: $("#argument").val().trim(),
			side: position,
			PageId: pageId,	
			UserId: currentUser.user_id,
			ParentId: null 				
		};
		
	console.log(newPost);
	console.log(currentUser);

	if (!currentUser) {
	
		console.log("No logged in user!");
		window.location.href("login.html");
		
		} else {
		
		$.ajax("api/comments/", {
			type: "POST",
			data: newPost
		}).then(
				function (result, err) {
					
					console.log(JSON.stringify(result));
					var createdPost = JSON.stringify(result.id);
					console.log(createdPost);
					
					if (err) {
						console.log(err);
					}
				});
			// location.reload();
			};
		};
			
function deletePost(id) {
	if (currentUser.user_id === $(".content").attr(id)) {
	$.ajax("api/comments" + $('#indicator').val(), {
		method: "DELETE"
	}).then(function() {
		location.reload();
		});
	};
};

