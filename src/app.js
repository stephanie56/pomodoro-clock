const css = require('./styles.scss');

console.log('hello');

/** Pomodoro Clock **/

$(document).ready(function(){
  var oBreak = {duration:3, tag:"Break Time"};
  var oPomo = {duration:10, tag:"Session"};
  var timer = null;
  var audioSrc = "doorbell.wav";
  var sumDuration = 0;
  var sumMsg = "";
  /** display default breaktime & pomotime **/
  $("#controlBreak").html(oBreak.duration);
  $("#controlPomo").html(oPomo.duration);
  $("#pomoClock").html(displayTime(oPomo.duration*60));


  $("#addtodo").click(function(){
    oPomo.tag = $("#newtask").val();
    $("#tagName").html(oPomo.tag);
  });

  $(".startControl").click(function(){
   if(timer == null){
     countDown(oPomo, oBreak);
   }
   else{
     return 0;
   }
  });

  // when click on stop button - stop the timer
  $("#stop").click(function(){
    clearTimer();
  });

  $("#increaseBreak").click(function(){
    clearTimer();
    oBreak.duration = controlDuration(oBreak.duration, "++");
    $("#controlBreak").html(oBreak.duration);
  });
  $("#decreaseBreak").click(function(){
    clearTimer();
    oBreak.duration = controlDuration(oBreak.duration, "--");
    $("#controlBreak").html(oBreak.duration);
  });
  $("#increasePomo").click(function(){
    clearTimer();
    oPomo.duration = controlDuration(oPomo.duration, "++");
    $("#controlPomo").html(oPomo.duration);
    $("#pomoClock").html(displayTime(oPomo.duration*60));
  });
  $("#decreasePomo").click(function(){
    clearTimer();
    oPomo.duration = controlDuration(oPomo.duration, "--");
    $("#controlPomo").html(oPomo.duration);
    $("#pomoClock").html(displayTime(oPomo.duration*60));
  });


  /** main functions **/
  function controlDuration(duration, action){
    if(action == "++"){
      return (duration < 360) ? (duration + 1) : duration;
    }
    else{
      return (duration > 1) ? (duration - 1) : duration;
    }
  }

  function countDown(currentObj,nextObj){
    var tag = currentObj.tag;
    var time = currentObj.duration * 60 * 1000;
    var now = Date.now();
    var then = now + time;
    displayTime(currentObj.duration * 60 - 1);

    timer = setInterval(function(){
      var secondsLeft = Math.floor((then - Date.now())/1000);
      if(secondsLeft < 0){
        playAudio();
        if(tag != "Break Time"){
          sumDuration += time;
          sumMsg = "You have worked on "+ tag + " for " + Math.round(sumDuration/1000/60) + " minutes.";
          alert("Time to take a break sweatheart ♥\nDon't work too hard ;)");
          $("#sumMsg").html(sumMsg);
        }
        clearInterval(timer);
        countDown(nextObj,currentObj);
      }
      else {
        $("#tagName").html(tag);
        $("#pomoClock").html(displayTime(secondsLeft));
        document.title = tag + " " + displayTime(secondsLeft);
      }
    }, 1000);
  }

  function displayTime(seconds){
    var hour = (seconds>3600) ? Math.floor(seconds/60/60) : 0;
    var minute = Math.floor(seconds/60);
    var second = seconds%60;
    var displayHour = (hour == 0) ? "" : (addZero(hour) + ":");
    var time = displayHour + addZero(minute) + ":" + addZero(second);
    return time;
  }

  function clearTimer (){
      clearInterval(timer);
      timer = null;
  }

  function addZero(num){
    return(num<10) ? ("0"+num) : num;
  }

  function playAudio(){
    var audio = new Audio();
    audio.addEventListener("load",function(){
      audio.play();
    }, true);
    audio.src = audioSrc;
    audio.autoplay = true;
  }

}); // document.ready
