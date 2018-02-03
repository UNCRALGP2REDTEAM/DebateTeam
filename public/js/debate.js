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
		$("#debate-title").text(data.name);
		$("#debate-description").text(data.description);
	});

	$.get("api/comments/" + pageId, function(data) {

		for (var i = 0; i < data.length; i++) {
				if (data[i].side === 1 && data[i].ParentId === null) {
					yayArray.push(data[i]);
				}
				if (data[i].side === 2 && data[i].ParentId === null) {
					nayArray.push(data[i]);
				}
				if (data[i].ParentId !== null) {
					replyArray.push(data[i]);
				}
		};

		for (var j = 0; j < yayArray.length; j++) {
			var ownerId = yayArray[j].UserId;
			var postId = yayArray[j].id;
			var contentDiv = "<div class=content id=a id=" + ownerId + " value=" + postId + ">";
			var comment = "<p>" + yayArray[j].text;
			var userInfo = "<p class='username'>" + "-" + yayArray[j].username;
			var deleteButton = "<button class='delete' onclick=deletePost() id=" + ownerId + " value=" + yayArray[j].id + ">" + "x";
			var editButton = "<button class='edit' onclick=editPost() id=" + ownerId + " value=" + yayArray[j].id + ">" + "edit";
			$(".containeryea").append(contentDiv + comment + userInfo + editButton + deleteButton);
		};

		for (var k = 0; k < nayArray.length; k++) {
			var ownerId = nayArray[k].UserId;
			var postId = nayArray[k].id;
			var contentDiv = "<div class=content id=" +  ownerId + " value=" + postId + ">";	
			var comment = "<p>" + nayArray[k].text;
			var postId = "<p class=indicator>" + nayArray[k].id;
			var userInfo = "<p class='username'>" + "-" + nayArray[k].username;
			var deleteButton = "<button class='delete' onclick=deletePost() id=" + ownerId + " value=" + nayArray[k].id + ">" + "x";
			var editButton = "<button class='edit' onclick=editPost() id=" + ownerId + " value=" + nayArray[k].id + ">" + "edit";
			$(".containernay").append(contentDiv + comment + userInfo + editButton + deleteButton);
		};
		
		for (var l = 0; l < replyArray.length; l++) {
			var ParentId = parseInt(replyArray[l].ParentId);
			var ownerId = replyArray[l].UserId;
			var replyMap = "<p class=style>├</p>"
			var reply = "<p class=reply>" + replyArray[l].text;
			var userInfo = "<p class='reply-username'>" + "-" + replyArray[l].username + " (reply)";

				if (ParentId === parseInt($(".content").attr("value"))) {
					$("#a").append(replyMap + reply + userInfo);
				}
		}
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

