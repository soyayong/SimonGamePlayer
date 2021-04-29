// typo in words need to becareful
//when have id element , jquery need use $(#name)

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    //show the click button and show what is name for that id
    //this as when data choose
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern); //check data

    //add sound in this when click , so can jump to function playSound()
    playSound(userChosenColour);

    animatePress(userChosenColour);

    //get back last answer
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //correct answer, thn pass to next level
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");

        //transfer wrong word same as mp3 name
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {

    //reset data

    gamePattern = [];

    started = false;

    level = 0;

}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChooseColour = buttonColours[randomNumber];

    gamePattern.push(randomChooseColour);

    //choose id as # 
    $("#" + randomChooseColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //when data choose can run both
    playSound(randomChooseColour);

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    //Add pressed css
    $("#" + currentColour).addClass("pressed");

    //using timing remove pressed css
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}