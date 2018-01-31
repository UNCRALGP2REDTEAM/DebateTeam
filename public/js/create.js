var currentUser;

$(document).ready(function () {
    currentUser = getCurrentUser();
    if (currentUser) {
        console.log("Current user is: " + JSON.stringify(currentUser));
    } else {
        window.alert("Please log in before creating a debate!");
        window.location.href = '/login.html';
        console.log("Not logged in.");
    }
});

function submitDebate() {
    var newDebate = {
        name: $("#newDebateTitle").val().trim(),
        description: $("#newDebateText").val().trim(),
        side1: $("#side1").val().trim(),
        side2: $("#side1").val().trim(),
        UserId: currentUser.user_id
    };
    $.ajax("api/pages", {
        type: "POST",
        data: newDebate
    }).then(
        function (result) {
            var createdDebate = JSON.stringify(result.id)
            window.location.href = '/debate_'+result.id;
            if (err) {
                console.log(err);
            }
        });
}