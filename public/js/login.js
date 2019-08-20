$(document).ready(function() {
    var username = $("#username");
    var password = $("#password");

    $(document).on("submit", "#login-form", handleLoginsubmit);
    console.log(username);
    function handleLoginsubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!username.val().trim().trim()) {
          return;
        }
        // Calling the upsertAuthor function and passing in the value of the name input
        userLogin({
          name: username
            .val()
            .trim()
        });
      }

      // A function for creating an author. Calls getAuthors upon completion
    function userLogin(loginData) {
    $.post("/api/login", loginData)
      .then(getUsers);
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getUsers() {
    $.get("/api/login", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }
  });