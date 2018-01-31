$(document).ready(function () {
  var currentUser = getCurrentUser();
  if (currentUser) {
    $("#login").hide();
    $("#logout").show();
  } else {
    $("#logout").hide();
    $("#login").show();
  }
  $.ajax("/api/pages_u", {
    type: "GET",
    dataType: "json"
  }).then(function (result) {
    for (i = 0; i < result.length; i++) {
      var debateEntry = result[i];
      //console.log(JSON.stringify(debateEntry));
      var newEntry = $("<div />", { class: 'blog_entry' }).append([
        $("<div />", {class: 'content_heading'}).append($("<h3 />", { text: debateEntry.name })),
        $("<div />", {class: 'content_image'}).append($("<img />", { 
          src: 'images/thinker.jpg',
          width: '150px',
          height: '150px',
          alt: "image 1"
        })),
        $("<div />", {class: 'content_text'}).append([
          $("<p />", { text: debateEntry.description }),
          $("<div />", {class: 'readmore'}).append($("<a />", { href: "/debate.html", text: "Debate!" }))
        ]),
      ]);
      $("#blog_entries").append(newEntry);
    }
  });
});