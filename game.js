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
    started = true;
    level = 1;
    gamePattern = [];
    numb = 0;
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press any key to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
});



function playSound(soundColor) {
  switch (soundColor) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case "wrong":
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      break;
    default:
      console.log(soundColor);
  }
}

function animatePress(userChosenButtonColor) {
  $("#" + userChosenButtonColor).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenButtonColor).removeClass("pressed");
  }, 100);
}
