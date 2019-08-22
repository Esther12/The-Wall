var user = {
    username: '',
    password: ''
}

user.username = document.getElementById("user-input").value()

user.password = document.getElementById("password-input").value()

$.post( "/signup", user).then(function(value){
    console.log(value);
});

