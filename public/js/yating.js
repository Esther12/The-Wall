
    var score = 0;
    var HP = 100;
    var life = 10;
    var timer;
    var times = 0;
    $("#logout").on("click",function(){
        addRecord(score);
    })
    $("#startBtn").on("click",function(){
        times = 20;
        roundsAndLife();
        getRecord();
    });
    $(".mian-port").on("click", ".cubes",function(){
        
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
                TweenMax.to(`#d${ID[randomId]}`, 1, {x : ()=>{return Math.random() * 900}, y: function(){
                    return Math.random() *400
                    }});
          };
          times--;
          $("#timeLeft").text(times);
          if(times < 0){
            clearInterval(timer);
            alert("Times up! your total score is " +  score + " Ready for Next ?");
         }
    }

    function addRecord(score){
        var queryURL = "/api/user_data";
        var newData = {
            score : score,
        };
        $.post(queryURL, newData, function(data){
            if(err) throw err;
        });
    }

function getRecord(){
    var queryURL = "/api/user_data";
    $.get(queryURL, function(data){
        if(err) throw err;
        $("Socre").text(data.score);
    });
}