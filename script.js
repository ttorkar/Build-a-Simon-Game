const RED = "RED";
const BLUE = "BLUE";
const YELLOW = "YELLOW";
const GREEN = "GREEN";

var redSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
var blueSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
var yellowSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
var greenSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);

//$("#red").hide();
//$("#blue").hide();
//$("#yellow").hide();
//$("#green").hide();

colors = [RED, BLUE, YELLOW, GREEN];
sequence = [];
wait = true;
step = 0;
strict = false;

$(document).ready(function() {
  function nextSequence() {
    console.log("Next Sequence");
    var nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    console.log(sequence);
    playSequence();
  }

  function playSequence() {
    for (i = 0; i <= sequence.length; i++) {
      (function(i) {
        setTimeout(function() {
          $("#" + sequence[i].toLowerCase()).addClass("light");
          if (sequence[i] === "BLUE") {
            blueSound.play();
          } else if (sequence[i] === "GREEN") {
            greenSound.play();
          } else if (sequence[i] === "RED") {
            redSound.play();
          } else {
            yellowSound.play();
          }
          setTimeout(function() {
            $("#" + sequence[i].toLowerCase()).removeClass("light");
          }, 700);
        }, 700 * i);
      })(i);
    }
  }
  $("#red").click(function() {
    redSound.play();
    $("#red").addClass("light");
    simon.sendColor(RED);
  });
  $("#blue").click(function() {
    blueSound.play();
    $("#blue").addClass("light");
    simon.sendColor(BLUE);
  });
  $("#yellow").click(function() {
    yellowSound.play();
    $("#yellow").addClass("light");
    simon.sendColor(YELLOW);
  });
  $("#green").click(function() {
    greenSound.play();
    $("#green").addClass("light");
    simon.sendColor(GREEN);
  });

  function turnOff() {
    $("#green").removeClass("light");
    $("#blue").removeClass("light");
    $("#yellow").removeClass("light");
    $("#red").removeClass("light");
  }
  $("#reset").click(function() {
    reset();
  });

  $("#strict").click(function() {
    strict = !strict;
    if (strict === true) {
      $("#strict").html("Strict ON");
    } else {
      $("#strict").html("Strict OFF");
    }
  });

  $("#start").click(function() {
    if (sequence.length === 0) {
      $("#count").html("Sequence Length: 1");
      nextSequence();
      showButtons();
    }
  });

  function hideButtons() {
    $("#red").hide();
    $("#blue").hide();
    $("#yellow").hide();
    $("#green").hide();
    $("#start").show();
    $("#strict").show();
  }
  function showButtons() {
    $("#red").show();
    $("#blue").show();
    $("#yellow").show();
    $("#green").show();
    $("#start").hide();
    $("#strict").hide();
  }

  function reset() {
    sequence = [];
    step = 0;
    hideButtons();
    $("#count").html("Sequence Length: 0");
    alert("Resetting");
  }

  var simon = {
    sendColor: function(color) {
      setInterval(turnOff, 500);
      if (!sequence.length) {
        nextSequence();
      } else if (sequence.length == 20) {
        alert("Winner");
        reset();
      } else {
        if (color == sequence[step]) {
          $("#count").html("Sequence Length: " + (sequence.length + 1));
          //Next Step
          if (step === sequence.length - 1) {
            console.log("Sequence Complete");
            step = 0;
            nextSequence();
          } else {
            step++;
          }
        } else {
          //Lose
          if (strict === true) {
            alert("You have lost!");
            reset();
          } else {
            $("#count").html("Sequence Length: !!");
            step = 0;
            playSequence();
          }
        }
      }
    }
  };
});
