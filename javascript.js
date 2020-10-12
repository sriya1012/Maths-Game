var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;

//If we click on the start/reset
document.getElementById("start").onclick = function(){
    
    //If we are playing
        //reload page
    if(playing==true)
        {
            location.reload();//reload page
        }
    
     //If we are not playing
            
    else{
        
        playing=true; //change mode to playing
        //set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        document.getElementById("timeremaining").style.display = "block";
        timeremaining = 60;
        
        // hide gameover box
            hide("gameover");
        
        //Change button from start to restart
    document.getElementById("start").innerHTML = "Reset Game";
    
            //start countdown
        
            startCountdown();
        
        document.getElementById("timeremvalue").innerHTML = timeremaining;
        
            //generate new Q&A
            generateQA();
    }
}
   

//if we click on answer box
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing     
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}

function startCountdown(){
    
    action = setInterval(function(){
        timeremaining -= 1;
    document.getElementById("timeremvalue").innerHTML = timeremaining;
        
        
         //time-left?
                 //Yes->continue
                    //no->gameover
        
        if(timeremaining==0){//game over
            stopCountdown();
            show("gameover");
            
        document.getElementById("gameover").innerHTML = "<p>GAme Over !</p> <p>your score is " + score + " . </p> ";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start").innerHTML = "Start Game";
            
            }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);
}
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}
 
function generateQA(){
   var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
     correctAnswer = x*y;
    document.getElementById("questionBox").innerHTML = x + "x" + y;
    var correctPosition = 1+Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with correct answer.
    
    //fill other 3 boxes with wrong answer.
        var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer; 
            do{
            wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));   //wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;    //fill wrong answer
            answers.push(wrongAnswer);
        }
    }
}
