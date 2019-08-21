$(document).ready(function() {
    // Getting references to our form and input
    var registerForm = $("form.register");
    var userInput = $("input#user-input");
    var passwordInput = $("input#password-input");
  
    // When the register button is clicked, we validate the username and password are not blank
    registerForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        username: userInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      registerUser(userData.username, userData.password);
      userInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the register route. If successful, we are redirected to the login page
    // Otherwise we log any errors
    function registerUser(username, password) {
      $.post("/api/register", {
        username: username,
        password: password
      })
        .then(function(data) {
          window.location.replace("/index");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  