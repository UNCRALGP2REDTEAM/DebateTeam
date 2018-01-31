var currentUser;
var url;
var splitUrl;
var pageId;

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
		}

		for (var j = 0; j < yayArray.length; j++) {
				var tag = "<p>" + yayArray[j].text;
				var userInfo = "<p>" + yayArray[j].username;
				$(".containeryea").append(tag + userInfo);
		}

		for (var k = 0; k < nayArray.length; k++) {
				var tag = "<p>" + nayArray[k].text;
				var userInfo = "<p>" + nayArray[k].username;
				$(".containernay").append(tag);
		}
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
				
				$.ajax("/api/comments", {
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
			    			location.reload();
			    		});
					}
				}
			
	

