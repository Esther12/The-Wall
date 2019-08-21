
    var score = 0;
    var HP = 100;
    var life = 10;
    var timer;
    var times = 0;
    $("#startBtn").on("click",function(){
        times = 20;
        roundsAndLife();
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
        console.log($(this).attr("data-type"));
        var val =  document.querySelectorAll(".cubes");
        for(let i = 0; i < val.length; i ++){
        console.log(val[i].attr("data-type"));
        }
       // $(this).data
        // var badSelected = document.querySelectorAll('[data-type="dead"]');
    })
    function clearPerson(){
    //     var notSelected = document.querySelectorAll(".cubes:not(.hide)");
    //    console.log(notSelected);
    //    for(let i=0; i<notSelected.length;i++){
    //     console.log(notSelected[i].classList[1]);
    //     var classObj = notSelected[i].classList;
    //        // classObj.value = ""
    //   }
        var notSelected = document.querySelectorAll(".cubes:not(.hide)");
        console.log("notselect",notSelected.length);
        for(let i = 0; i < notSelected.length; i ++){
           // console.log(notSelected[i]);
            notSelected[i].className += " hide";
           // console.log("after ",notSelected[i]);
           
        }
        
    }
    
    
    function roundsAndLife(){
            timer = setInterval(gameStart, 200);  
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
            addRecord(score,life,HP);
         }
    }

    function addRecord(score, life, HP){
        var queryURL = "";
        var newData = {
            score : score,
            life : life,
            HP : HP
        };
        $.post(queryURL, newData, function(data){
            if(err) throw err;
        })
    }