var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]

function nextSequence() {
userClickedPattern=[];

var randomNumber = Math.floor((Math.random()*4));

var randomChosenColor = buttonColors[randomNumber];

gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);
animatePress(randomChosenColor);

level++;


$("#level-title").text("Level " + level);

}

var started = false;
var level = 0;
$(document).keydown(function(){
  if(!started) {
    nextSequence();
    started = true;
    $("#level-title").text("Level " + level);
  }
})

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  },100)
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {nextSequence()},1000)
  }
} else {
  var wrong = new Audio("sounds/wrong.mp3")
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200)
  startOver();
  $("#level-title").text("Game Over, Press Any Key to Restart")
}
}
 function startOver() {
   level=0;
   started=false;
   gamePattern=[];
 }
