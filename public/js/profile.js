$(document).ready(function() {
	
	var currentUser = getCurrentUser();
	var uId = currentUser.user_id
	$("#username").text(currentUser.username);
	if (currentUser.user_id !== null) {

		$.get("/api/pages/u/" + uId, function (data) {
			if (data.length>0){
				$('#pages').empty();
				
				for (var i = 0; i < data.length; i++) {
					var page = data[i];
					$('#pages').append('<a href="debate_'+page.id+'">'+page.name+'</a><br>')
				}
			}
		});
		$.get("/api/comments/u/"+uId, function(data) {
			if (data.length > 0) {
				$('#comments').empty();

				for (var i = 0; i < data.length; i++) {
					var comment = data[i];
					$('#comments').append('<a href="debate_' + comment.PageId + '">'+ comment.text + '</a><br>')
				}
			}
		})
	}
});