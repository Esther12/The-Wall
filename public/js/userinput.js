var user = {
    username: '',
    password: ''
}

user.username = document.getElementById("username").value()

user.password = document.getElementById("password").value()

$.post( "/signup", user).then(function(value){
    console.log(value);
});