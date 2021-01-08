var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false; //keep track if this is a new game
var level = 0;

//Start a new game by hitting any keyboard key.
$(document).keypress(function () {
  if (started == false) started = true;
  nextSequence();
  $("#level-title").text("Level " + level);
});

//Get id of button clicked
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //sound after clicking on button
  playSound(userChosenColor);
  //button animation
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  //increase level as nextSequence is called
  level++;

  //Change the level title
  $("#level-title").text("Level " + level);

  // Button Animation
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //Sound Effect
  playSound(randomChosenColor);

  //empty the userClickedPattern
  userClickedPattern = [];
}

function checkAnswer(lastIndexAnswer) {
  if (gamePattern[lastIndexAnswer] === userClickedPattern[lastIndexAnswer]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Playing sound
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//Button animation
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
