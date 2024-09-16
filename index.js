
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [ ];

let userClickedPattern = [ ];

let started = false;
let level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;        
    }
});


//to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function(){
    // selects the id that the user will click the button
   /// let userChosenColour = this.id;
   let userChosenColour = $(this).attr("id");   

    userClickedPattern.push(userChosenColour);  ///console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);     
    
}); 

function nextSequence(){
    userClickedPattern = [];
    //increasing level by 1
    level++;
    // changing h1 text 
    $("#level-title").text("Level "+ level);
    
    let randomNumber = Math.floor(Math.random() * 4);
    // access the array values buttonColours
    let randomChosenColour = buttonColours[randomNumber]; 
    // push values into gamepattern array
    gamePattern.push(randomChosenColour); 

    // animation to button
    $("#" + randomChosenColour ).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
    
    playSound(randomChosenColour);
   
}

// function to paly sound to the buttons
function playSound(name){
    
    // set audio to the button by selecting file names
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}
  
// function to animate grey colour on the button user clicks
function animatePress(currentColour){
    // adds class to the button
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {    
        // removes class to the button 100 millisecond
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){  

    //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. 
    //If so then log "success", otherwise log "wrong".
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
       
        console.log("success");
    // check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){
           
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }else{
        console.log("wrong");
        $("body").addClass("game-over");
        let gameOverAudio = new Audio("./sounds/wrong.mp3");
        gameOverAudio.play();

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game over");

        setTimeout(function(){
            startOver();
        },2000);
        
    }
}


function startOver(){
    $("#level-title").text("press any key");
    level = 0;
    gamePattern = [];
    started = false;
}
