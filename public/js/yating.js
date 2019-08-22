    var score = 0;
    var HP = 100;
    var life = 3;
    var timer;
    var times = 0;
    var userName = "";
    var widthView = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var heightView = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    $( window ).on( "load",function() { 
        getRecord();
        console.log("v:w,h :  start :  ",widthView,heightView);
        if(widthView < 700){
            window.addEventListener("orientationchange", function () {
                console.log("The orientation of the screen is: " + screen.orientation.type);
                if(screen.orientation.type == "portrait-primary"){
                    screen.orientation.lock("landscape");
                        times = 20;
                        getRecord();
                        roundsAndLife();
                      }
              });
        }
      
     });
     document.getElementsByClassName("bg").onload = function() {getRecord()};
     document.addEventListener("click", play); 
     function play(){
        var audio = document.getElementById("audio");

        audio.play();
     }
    $(".logout").on("click",function(){
        window.location.replace("/logout");
    })
    $(".startBtn").on("click",function(){
        times = 30;
        var audio1 = document.getElementById("backgroundmusic");
        audio1.play();
        roundsAndLife();
        addRecord(score);
        
    });
    $(".mian-port").on("click", ".cubes",function(){
        
        console.log(score);
        if( $(this).attr("type") === "0" ){
            score --;
            life --;
            $(this).addClass("hide");
            console.log(score);
            clearInterval(timer);
            $("#timeLeft").text(0);
            
        }else if($(this).attr("type") === "1"){
            score ++;
            console.log(score);
            $(this).addClass("hide");
            $(this).attr("data-type","dead");
        }

        $("#Score").text(score) ;
        $("#lifeLeft").text(life);
        
        var state = $(this).attr("data-type"); 
    });
    $("#playAgain").on("click",()=>{
        window.location.replace("/game");
        addRecord(score);
    })
    function clearPerson(){

        var notSelected = document.querySelectorAll(".cubes:not(.hide)");
        console.log("notselect",notSelected.length);
        for(let i = 0; i < notSelected.length; i ++){
           // console.log(notSelected[i]);
            notSelected[i].className += " hide";
           // console.log("after ",notSelected[i]);
           
        }
        
    }
    function roundsAndLife(){
            timer = setInterval(gameStart, 1200);  
    }
    function gameStart(){
        clearPerson();
        if(life <= 0){
            $("#myModal").modal("show");
        }
        var ID = [11,12,13,14,15,16,17,18];

       // console.log(imgPicker);
        for(let i = 0; i < 6; i++){
            var randomId = Math.floor(Math.random()* ID.length);
                $(`#d${ID[randomId]}`).removeClass("hide");
                TweenMax.to(`#d${ID[randomId]}`, 1, {x : ()=>{return Math.random() * widthView}, y: ()=>{
                    return Math.random() * heightView
                    }});
                    console.log("v:w,h :  ",widthView,heightView);
          };
          times--;
          $("#timeLeft").text(times);
          if(times < 1){
            clearInterval(timer);
           // alert("Times up! your total score is " +  score + " Ready for Next ?");
         }
    }

    function addRecord(score){
        var queryURL = "/api/game";
        var newData = {
            score : score,
        };
        $.ajax({
            method: "PUT",
            url: queryURL,
            data: newData
          })
            .then(function(err,data) {
            if(err) throw err;
            console.log('server responded');
            window.location.replace("http://localhost:8080");
        });
    }

function getRecord(){
    var queryURL = "/api/user_data";
    $.get(queryURL, function(data){
        console.log(data.score);
        $("#Score").text(data.score);
        $("#userName").text(data.username);
        score = data.score;
        userName = data.username;
    });
}

    

