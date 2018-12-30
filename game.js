var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = true;
var level = 1;
var numb = 0;

$(document).on("keypress", function() {
  if (started === true) {
    nextSequence();
  }
});

function nextSequence() {
  $("#level-title").text("Level " + level);

  setTimeout(function() {

    var randomNumber = Math.random();
    randomNumber = Math.floor((randomNumber * 4));

    var randomChosenColor;
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var buttonId = "#" + randomChosenColor;

    $(buttonId).fadeOut(100).fadeIn(100, function() {
      playSound(randomChosenColor);
      console.log("The random chosen color array is " + gamePattern);
      started = false;
      userClickedPattern = [];
    });

    level += 1;
  },1000);
}

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  if (JSON.stringify(userClickedPattern[numb]) === JSON.stringify(gamePattern[numb]) && userClickedPattern.length <= gamePattern.length) {
    playSound(userChosenColor);
    animatePress(userChosenColor);
    numb++;

    if (gamePattern.length == numb){
      numb = 0;
      nextSequence();
    }

  } else {
    playSound("wrong");
    animatePress(userChosenColor);
    $("#level-title").text("Game Over! Press any key to restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
});

function playSound(name) {
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(userChosenButtonColor) {
  $("#" + userChosenButtonColor).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenButtonColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  started = true;
  level = 1;
  gamePattern = [];
  numb = 0;
}
