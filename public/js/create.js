function submitUser() {

    var newDebate = {
        username: $("#login").val().trim(),
        password: $("#password").val().trim()
    };
    // console.log(newUser);
    $.ajax("api/users", {
        type: "POST",
        data: newUser
    }).then(
        function () {
            console.log("created new user");
        });
};