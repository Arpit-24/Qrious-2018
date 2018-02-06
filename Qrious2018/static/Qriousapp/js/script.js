$('document').ready(function() {
  getLevel();
});

$(window).on('load', function() {
  document.getElementById('pre-loader').style.display = 'none';
  $('.modal').modal();
  $(".button-collapse").sideNav();
  openStoryline();
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    $('#fullscreen').modal('open');
  }
});

// ----------------------------------------------------------------------------------
function goFullScreen() {
  document.body.webkitRequestFullscreen();
}

function getcookie(name)
{
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
// ----------------------------------------------------------------------------------
// DONE-----------------  
function getLeaderboard() {
  Materialize.toast('Fetching Leaderboard!', 3000);
  for (var i = 0; i < 10; i++) {
    document.getElementsByClassName("rank")[i].innerHTML = 'Loading...';
    document.getElementsByClassName("name")[i].innerHTML = 'Loading...';
    document.getElementsByClassName("points")[i].innerHTML = 'Loading...';
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:8000/leaderboard", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var i, x = '';
      for (i in myObj) //It loops the data in array
      {
        document.getElementsByClassName("rank")[i].innerHTML = parseInt(i) + 1;
        document.getElementsByClassName("name")[i].innerHTML = myObj[i].details.name;
        document.getElementsByClassName("points")[i].innerHTML = myObj[i].details.diamonds;
      }
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('Failed to Connect to Server!', 3000);
    }
  }
  xhttp.send("");
}

// ----------------------------------------------------------------------------------
// LEFT---
function getQues(level, difficulty) {
  Materialize.toast('Fetching Question!', 3000);
  document.getElementById("jumbleAnsOptions").innerHTML = "";
  if (level != 3 && level != 4 && level != 9) {
    document.getElementsByClassName('question-text')[0].innerHTML = 'Loading...';
  } else if (level == 3 || level == 4) {
    document.getElementsByClassName('question-text')[1].innerHTML = 'Loading...';
  } else if (level == 9) {
    document.getElementsByClassName('question-text')[2].innerHTML = 'Loading...';
  }
  var backend = {
    "level": level,
    "difficulty": difficulty
  };
  var sendData = JSON.stringify(backend);
  var xhttp = new XMLHttpRequest(); //Used to exchange data with a web server behind scenes
  xhttp.open("GET", "https://api.myjson.com/bins/jl53d", true); // It gets the data from the server
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    /*
     * 0:Hasn't started
     * 1:Connected to the Server
     * 2:Request received
     * 3:processing request
     * 4:Request finished and response is ready */
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      /* JSON.parse()converts the data received from server which is in string form to javascript form .
		   ResponseText returns the response data as string*/
      if (level != 3 && level != 4 && level != 9 && level != 5 && level != 6) {
        document.getElementsByClassName('question-text')[0].innerHTML = myObj[0].question.ques;
      } else if (level == 3 || level == 4) {
        document.getElementsByClassName('question-text')[1].innerHTML = myObj[0].question.ques;
        jumbleAns = myObj[0].question.jumble;
        populateJumbleWord();
        clearText();
      } else if (level == 5 || level == 6) {
        document.getElementsByClassName('question-text')[0].innerHTML = '<img src ="icons/loading_icon.gif" class="question-image">';
        document.getElementsByClassName('question-text')[0].innerHTML = '<img src ="'+myObj[0].question.ques+'" class="question-image">';
      } else if (level == 9) {
        document.getElementsByClassName('question-text')[0].innerHTML = myObj[0].question.ques;
      }
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('Failed to Connect to Server!', 3000);
    }
  }
  xhttp.send(sendData);
}

// ----------------------------------------------------------------------------------
// LEFT---
function getHint(level, difficulty) {
  Materialize.toast('Fetching Hint!', 3000);
  if (level != 3 && level != 4 && level != 9) {
    document.getElementsByClassName('hint-text')[0].innerHTML = 'Hint: Loading...';
    document.getElementsByClassName('hint-text')[0].style.display = 'block';
  } else if (level == 3 || level == 4) {
    document.getElementsByClassName('hint-text')[1].innerHTML = 'Hint: Loading...';
    document.getElementsByClassName('hint-text')[1].style.display = 'block';
  } else if (level == 9) {
    document.getElementsByClassName('hint-text')[2].innerHTML = 'Hint: Loading...';
    document.getElementsByClassName('hint-text')[2].style.display = 'block';
  }

  var csrf_token = getcookie('csrf_token');
  var backend = {
    "level": level,
    "difficulty": difficulty,
    "csrfmiddlewaretoken": csrf_token,
  };

  var sendData = JSON.stringify(backend);
  var xhttp = new XMLHttpRequest(); //Used to exchange data with a web server behind scenes
  xhttp.open("GET", "http://127.0.0.1:8000/gethint", true); // It gets the data from the server
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("X-CSRFToken", csrf_token);
  xhttp.onreadystatechange = function() {
    /*
     * 0:Hasn't started
     * 1:Connected to the Server
     * 2:Request received
     * 3:processing request
     * 4:Request finished and response is ready */
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      /* JSON.parse()converts the data received from server which is in string form to javascript form .
		   ResponseText returns the response data as string*/
      if (myObj[0].success == 1) {
        if (level != 3 && level != 4 && level != 9) {
          document.getElementsByClassName('hint-text')[0].innerHTML = "Hint: " + myObj[0].hint;
        } else if (level == 3 || level == 4) {
          document.getElementsByClassName('hint-text')[1].innerHTML = "Hint: " + myObj[0].hint;
        } else if (level == 9) {
          document.getElementsByClassName('hint-text')[2].innerHTML = "Hint: " + myObj[0].hint;
        }
      }
      else { 
        Materialize.toast('Insufficient Diamonds to fetch Hint!', 3000);
        if (level != 3 && level != 4 && level != 9) {
          document.getElementsByClassName('hint-text')[0].style.display = 'none';
        } else if (level == 3 || level == 4) {
          document.getElementsByClassName('hint-text')[1].style.display = 'none';
        } else if (level == 9) {
          document.getElementsByClassName('hint-text')[2].style.display = 'none';
        }
      }
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('Failed to Connect to Server!', 3000);
    }
  }
  console.log(sendData) // shows sent data in console of inspect element
  xhttp.send(sendData);
}

// ----------------------------------------------------------------------------------
// LEFT---
function submitAns(level, difficulty) {
  var answer;
  if (level != 3 && level != 4 && level != 9) {
    answer = document.getElementById("quesans").value;
  } else if (level == 3 || level == 4) {
    answer = document.getElementById("append").value;
  } else if (level == 9) {
    answer = document.getElementById("lev9ans").value;
  }
  if (answer != '') {
    var json_data = {
      "answer": answer,
      "level": level,
      "difficulty": difficulty
    };
    var sendData = JSON.stringify(json_data);
    Materialize.toast('Submitting Answer', 3000);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.myjson.com/bins/ijfx1", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        // Fetch Backend Response Here
        if (myObj[0].success == 0) {
          Materialize.toast('Incorrect Answer! Please Try Again', 3000);
        } else if (myObj[0].success == 1) {
          Materialize.toast('Correct Answer! You have been awarded '+myObj[0].points+' Points!', 3000);
          document.getElementById('diamonds-text').innerHTML = myObj[0].tot_points;
          document.getElementById('diamonds-text-sidebar').innerHTML = myObj[0].tot_points;
          if (level != 3 && level != 4 && level != 9) {
            document.getElementById('custom-overlay').style.display='none';
            document.getElementById('quesTemplate').style.display='none';
            initializeButtons('success', difficulty);
            dispExtra();
          } else if (level == 3 || level == 4) {
            document.getElementById('custom-overlay').style.display='none';
            document.getElementById('quesJumble').style.display='none';
            initializeButtons('success', difficulty);
            dispExtra();
          } else if (level == 9) {
            document.getElementById('custom-overlay').style.display='none';
            document.getElementById('quesLev9').style.display='none';
            initializeButtons('success', 4);
            dispExtra();
          }
        }
      } else if (this.readyState == 4 && this.status != 200) {
        Materialize.toast('Failed to Connect to Server!', 3000);
      }
    }
    xhttp.send(sendData);
  } else {
    Materialize.toast('Enter an Answer to Submit!', 3000);
  }
}
var level_no = 1;

// ----------------------------------------------------------------------------------
// DONE###----------
function getLevel() {
  Materialize.toast('Initializing Game!', 3000);
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:8000/getlevel", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      level_no = myObj[0].level - 1;
      nextLevel();
      forfeited = myObj[0].forfeited;
      for (var i = 0; i < forfeited.length; i++) {
        initializeButtons('forfeit', forfeited[i]);
      }
      successful = myObj[0].successful;
      for (var i = 0; i < successful.length; i++) {
        initializeButtons('success', successful[i]);
      }
      dispExtra();
      Materialize.toast('Game Initialized!', 3000);
      var openQues = myObj[0].openQues;
      if (openQues == -1) {
        // No Question was open. Do nothing.
      } else {
        openQuesDiv(myObj[0].level, myObj[0].openQues);
      }
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('There was some error in Initializing the Game. Please Reload!', 3000);
    }
  }
  xhttp.send("");
}

// ----------------------------------------------------------------------------------

function openQuesDiv(lev_no, lev_type) {
  if (lev_no != 9 && document.getElementsByClassName('question-difficulty')[lev_type].getAttribute('class') == 'question-open-btns question-difficulty') {
    getQues(lev_no, lev_type);
    if (lev_no != 3 && lev_no != 4 && lev_no != 9) {
      document.getElementById('custom-overlay').style.display='block';
      document.getElementById('quesTemplate').style.display='block';
      document.getElementById("quesans").value = "";
      document.getElementsByClassName('hint-btn')[0].setAttribute('onclick', 'getHint('+lev_no+','+lev_type+')');
      document.getElementsByClassName('forfeit-btn')[0].setAttribute('onclick', 'forfeit('+lev_no+','+lev_type+')');
      document.getElementsByClassName('submit-ans-btn')[0].setAttribute('onclick', 'submitAns('+lev_no+','+lev_type+')');
      document.getElementsByClassName('hint-text')[0].style.display = 'none';
    } else if (lev_no == 3 || lev_no == 4) {
      document.getElementById('custom-overlay').style.display='block';
      document.getElementById('quesJumble').style.display='block';
      document.getElementById("append").value = "";
      document.getElementsByClassName('hint-btn')[1].setAttribute('onclick', 'getHint('+lev_no+','+lev_type+')');
      document.getElementsByClassName('forfeit-btn')[1].setAttribute('onclick', 'forfeit('+lev_no+','+lev_type+')');
      document.getElementsByClassName('submit-ans-btn')[1].setAttribute('onclick', 'submitAns('+lev_no+','+lev_type+')');
      document.getElementsByClassName('hint-text')[1].style.display = 'none';
    }
  } else if (lev_no == 9 && document.getElementsByClassName('question-difficulty')[4].getAttribute('class') == 'question-open-btns question-difficulty') {
    getQues(lev_no, lev_type);
    document.getElementById('custom-overlay').style.display='block';
    document.getElementById('quesLev9').style.display='block';
    document.getElementById("append").value = "";
    document.getElementsByClassName('hint-btn')[2].setAttribute('onclick', 'getHint('+lev_no+','+lev_type+')');
    document.getElementsByClassName('forfeit-btn')[2].setAttribute('onclick', 'forfeit('+lev_no+','+lev_type+')');
    document.getElementsByClassName('submit-ans-btn')[2].setAttribute('onclick', 'submitAns('+lev_no+','+lev_type+')');
    document.getElementsByClassName('hint-text')[2].style.display = 'none';
  } else {
    Materialize.toast('This Quiz is Disabled!!', 3000);
  }
}

// ----------------------------------------------------------------------------------

function forfeit(lev_no, lev_type) {
  forfeitQues(lev_no, lev_type);
  if (lev_no != 3 && lev_no != 4 && lev_no != 9) {
    document.getElementById('custom-overlay').style.display='none';
    document.getElementById('quesTemplate').style.display='none';
    initializeButtons('forfeit', lev_type);
  } else if (lev_no == 3 || lev_no == 4) {
    document.getElementById('custom-overlay').style.display='none';
    document.getElementById('quesJumble').style.display='none';
    initializeButtons('forfeit', lev_type);
  } else if (lev_no == 9) {
    document.getElementById('custom-overlay').style.display='none';
    document.getElementById('quesLev9').style.display='none';
    initializeButtons('forfeit', 4);
  }
  dispExtra();
}

// ----------------------------------------------------------------------------------
// LEFT---
function forfeitQues(level, difficulty) {
  var backend = {
    "level": level,
    "difficulty": difficulty
  };
  var sendData = JSON.stringify(backend);
  var xhttp = new XMLHttpRequest(); //Used to exchange data with a web server behind scenes
  xhttp.open("GET", "url", true); // It gets the data from the server
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    /*
     * 0:Hasn't started
     * 1:Connected to the Server
     * 2:Request received
     * 3:processing request
     * 4:Request finished and response is ready */
    if (this.readyState == 4 && this.status == 200) {
      // Do Nothing
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('Failed to Connect to Server to Update Game Status!', 3000);
    }
  }
  xhttp.send(sendData);
}

// ----------------------------------------------------------------------------------

function goNext() {
  openCurtain();
  if (level_no != 9) {
    setTimeout('nextLevel()', 800);
    setTimeout('closeCurtain()',1200);
  }
  else {
    setTimeout('displayGameOver()', 1000);
  }
}

// ----------------------------------------------------------------------------------

function nextLevel() {
  resetButtons();
  level_no++;
  sendLevel(level_no);
  document.getElementById('lev-no-text').innerHTML = level_no;
  if (level_no == 9) {
    document.getElementById('lev9-select-wrapper').style.display = 'block';
    document.getElementById('question-select-wrapper').style.display = 'none';
  } else {
    document.getElementById('lev9-select-wrapper').style.display = 'none';
    document.getElementById('question-select-wrapper').style.display = 'block';
  }
  for (i = 0; i < 4; i++) {
    document.getElementsByClassName('question-difficulty')[i].setAttribute("onclick", "openQuesDiv(" + level_no + "," + i + ")");
  }
  if (level_no == 2) {
    document.getElementById('background-svg').src='icons/door.svg';
  }
}

// ----------------------------------------------------------------------------------
// LEFT---
function sendLevel(level) {
  var backend = {
    "level": level
  };
  var sendData = JSON.stringify(backend);
  var xhttp = new XMLHttpRequest(); //Used to exchange data with a web server behind scenes
  xhttp.open("GET", "url", true); // It gets the data from the server
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    /*
     * 0:Hasn't started
     * 1:Connected to the Server
     * 2:Request received
     * 3:processing request
     * 4:Request finished and response is ready */
    if (this.readyState == 4 && this.status == 200) {
      // Do Nothing
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('Failed to Connect to Server to Update Game Status!', 3000);
    }
  }
  xhttp.send(sendData);
}

// --------------Jumble Word Code---------------

var jumbleAns = "jumbleword";
var ltrbtn = [];

function myfn(elem) {
  var id = elem.id;
  document.getElementById(id).style.backgroundColor = "red";
  var res = document.getElementById(id).value;
  var tex = document.getElementById("append");
  tex.value += res;
  document.getElementById(id).disabled = true;
}

function clearText() {
  for (var i = 0; i < jumbleAns.length; i++) {
    ltrbtn[i].style.backgroundColor = "transparent";
    ltrbtn[i].disabled = false;
  }
  document.getElementById("append").value = null;
}
function populateJumbleWord() {
  for (var i = 0; i < jumbleAns.length; i++) {
    ltrbtn[i] = document.createElement("input");
    ltrbtn[i].type = "button";
    ltrbtn[i].id = "btn" + i;
    ltrbtn[i].value = jumbleAns.substr(i, 1);
    document.getElementById("jumbleAnsOptions").appendChild(ltrbtn[i]);
    ltrbtn[i].onclick = function() {
      myfn(this)
    };
    ltrbtn[i].className = "ans-btns";
  }
}

// ----------- Question Begin Buttons ---------------

function initializeButtons(data, button_no) {
  if (data == 'forfeit') {
    document.getElementsByClassName('question-difficulty')[button_no].setAttribute('class', 'question-open-btns question-difficulty attempted');
  } else if (data == 'success') {
    document.getElementsByClassName('question-difficulty')[button_no].setAttribute('class', 'question-open-btns question-difficulty attempted success');
  }
}
function resetButtons() {
  for (var i = 0; i < document.getElementsByClassName('question-difficulty').length; i++) {
    document.getElementsByClassName('question-difficulty')[i].setAttribute('class', 'question-open-btns question-difficulty');
  }
  document.getElementsByClassName('question-open-btns')[3].style.display='none';
  document.getElementsByClassName('question-open-btns')[4].style.display='none';
  document.getElementsByClassName('question-open-btns')[6].style.display='none';
}

function dispExtra() {
  if (level_no != 9 && document.getElementsByClassName('success').length > 0 && (level_no%2==0)) {
    document.getElementsByClassName('question-open-btns')[3].style.display='block';
    document.getElementsByClassName('question-open-btns')[4].style.display='block';
  } else if (level_no != 9 && document.getElementsByClassName('success').length > 0) {
    document.getElementsByClassName('question-open-btns')[4].style.display='block';
  } else if (level_no != 9 && document.getElementsByClassName('attempted').length > 2) {
    document.getElementsByClassName('question-open-btns')[4].style.display='block';
  } else if (level_no == 9 && (document.getElementsByClassName('success').length > 0)) {
    document.getElementsByClassName('question-open-btns')[6].style.display='block';
  } else if (level_no == 9 && (document.getElementsByClassName('attempted').length > 0)) {
    document.getElementsByClassName('question-open-btns')[6].style.display='block';
  }
}

// ------------- Storyline Code --------------

function openStoryline() {
  document.getElementById('storyline').style.display = 'block';
  setTimeout("document.getElementById('storyline').setAttribute('class','hover');", 100);
}
function closeStoryline() {
  document.getElementById('storyline').removeAttribute('class');
  setTimeout("document.getElementById('storyline').style.display='none';", 1000);
  setTimeout("document.getElementById('robot-animate-div').style.display='none';", 1000);
  setTimeout("document.getElementById('storyline-complete-wrapper').style.display='none';", 1000);
}
function para2() {
  document.getElementById('para'+1).style.display = 'none';
  document.getElementById('para2').style.display = 'block';
  document.getElementById('move_next1').style.display = 'none';
  document.getElementById('move_next2').style.display = 'block';
}
function para3() {
  document.getElementById('para2').style.display = 'none';
  document.getElementById('para3').style.display = 'block';
  document.getElementById('move_next2').style.display = 'none';
}

// -------------------- Curtain Code ---------------

function openCurtain() {
  document.getElementById('curtain-wrapper').style.display = 'block';
  setTimeout("document.getElementById('curtain-wrapper').style.height = '100vh';", 100);
}

function closeCurtain() {
  document.getElementById('curtain-wrapper').style.height = '0';
  setTimeout('document.getElementById("curtain-wrapper").style.display = "none";', 800);
}

function displayGameOver() {
  document.getElementById('game-over-wrapper').style.display='block';
  setTimeout('document.getElementById("game-over-wrapper").style.opacity = "1"',100);
}

// ----------------------------------------------------------------------------------
// LEFT---
function skipUsingEmeralds(level, difficulty) {
  Materialize.toast('Skipping Question!', 3000);
  var backend = {
    "level": level,
    "difficulty": difficulty
  };
  var sendData = JSON.stringify(backend);
  var xhttp = new XMLHttpRequest(); //Used to exchange data with a web server behind scenes
  xhttp.open("GET", "https://api.myjson.com/bins/1fsprp", true); // It gets the data from the server
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    /*
     * 0:Hasn't started
     * 1:Connected to the Server
     * 2:Request received
     * 3:processing request
     * 4:Request finished and response is ready */
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      /* JSON.parse()converts the data received from server which is in string form to javascript form .
       ResponseText returns the response data as string*/
      if (myObj[0].success == 1) {
        Materialize.toast('Skipped Question!', 3000);
        document.getElementById('custom-overlay').style.display='none';
        document.getElementById('quesLev9').style.display='none';
        initializeButtons('success', 4);
        dispExtra();
      }
      else {
        Materialize.toast('Insufficient Emeralds to Skip Question!', 3000);
      }
    } else if (this.readyState == 4 && this.status != 200) {
      Materialize.toast('Failed to Connect to Server!', 3000);
    }
  }
  xhttp.send(sendData);
}
