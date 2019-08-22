
    var score = 0;
    var HP = 100;
    var life = 10;
    var timer;
    var times = 0;
    var widthView = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var heightView = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    $(window).ready(function() { 
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
        }else{
            times = 20;
            getRecord();
            roundsAndLife();
        }
      
     });


    $("#startBtn").on("click",function(){
        times = 20;
        getRecord();
        roundsAndLife();
        
    });
    $(".mian-port").on("click", ".cubes",function(){
        
        console.log(score);
        if( $(this).attr("type") === "0" ){
            score --;
            life --;
            $(this).addClass("hide");
            
            console.log(score);
            
        }else if($(this).attr("type") === "1"){
            score ++;
            console.log(score);
            $(this).addClass("hide");
            $(this).attr("data-type","dead");
        }

        $("#Score").text(score) ;
        $("#lifeLeft").text(life);
        
        var state = $(this).attr("data-type"); 
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
            addRecord(score);
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
    });
}

