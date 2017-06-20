//initialize all discs

var disc1={}
var disc2={}
var disc3={}
var disc4={}
var disc5={}

//initialize all poles

var pole1={}
var pole2={}
var pole3={}

//initialize global timer variables and array of discs

var secs = 0;
var minutes = 0;
var timer = null;
var timerRunning = false;
var inProgress = false;
var startingArray=[];
var moves = 0;
var scoreBoard = [];
var scoreIndex = 1;

//makes rules appear when user presses "Rules" button

$("#rules").click(
  function() {
    $("#rules-content").toggle("show")
    if(timerRunning==true){
      clearInterval(timer);
    }
})

$("#scores").click(
  function() {
    $("#score-content").toggle("show")
    if(timerRunning==true){
      clearInterval(timer);
    }
})

//makes rules button disappear when user presses "Okay"
$("#score-content .ok").click(
  function() {
    $("#score-content").toggle("show")
    if(inProgress==true){
            timer = window.setInterval(displayTime, 1000);
    }
})

$("#rules-ok").click(
  function() {
    $("#rules-content").toggle("show")
    if(inProgress==true){
            timer = window.setInterval(displayTime, 1000);
    }
  })



//makes disc options menu appear when user presses discs button

$("#discs").click(
  function() {
    console.log("clicked on discs")
    if ($("#discs-menu").hasClass("show")){
        $("#discs-menu").removeClass("show")
    }
    else {
        $("#discs-menu").addClass("show")
    }
})

$(window).click(
  function(evt) {
    if(evt.target.id == "discs"){
      return
    }
    else if ($("#discs-menu").hasClass("show")){
      $("#discs-menu").removeClass("show")
      }
    }
)

//sets the default number of discs to three

$('#3').prop('checked',true)
var discNumber = $('input[name=discNum]:checked').val()

setUpGame();

//sets up discs, poles
function setUpGame(){

    //makes disc 4 visible/disc 5 not visible

        if(discNumber==4){
        $("#disc5").removeClass("show")
        $("#disc4").addClass("show")
        setUpDiscs();
        startingArray=[disc4,disc3,disc2,disc1];
        setUpPoles();
        setToFirst();
      }

    //makes all discs visible

      if(discNumber==5){
        $("#disc4").addClass("show")
        $("#disc5").addClass("show")
        setUpDiscs();
        startingArray=[disc5,disc4,disc3,disc2,disc1];
        setUpPoles();
        setToFirst()
      }

    //removes discs 4 and 5 from UI

      if(discNumber==3){
        $("#disc4").removeClass("show")
        $("#disc5").removeClass("show")
        setUpDiscs();
        startingArray=[disc3,disc2,disc1];
        setUpPoles();
        setToFirst()

      }
    }

//sets the number of discs according to user input

$('input[name=discNum]').change(function() {
  discNumber = $('input[name=discNum]:checked').val()
    setUpGame()
})

//gives each disc a "pole" attribute, initalized to Pole 1

function setToFirst() {
    startingArray.forEach(function(disc) {
    disc.pole = pole1;
  })
}

//initializes discs with necessary properties
function setUpDiscs() {
    disc1 =
  {
    id: $("#disc1"),
    value: 1,
    loc : 1,
    pole: pole1
  }

  disc2 =
  {
    id: $("#disc2"),
    value: 2,
    loc : 1,
    pole: pole1
  }

  disc3 =
  {
    id: $("#disc3"),
    value: 3,
    loc : 1,
    pole: pole1
  }

  if(discNumber==4||discNumber==5) {
    disc4 =
    {
      id: $("#disc4"),
      value: 4,
      loc : 1,
      pole: pole1
    }
  }

  if(discNumber==5) {

    disc5 =
    {
      id: $("#disc5"),
      value: 5,
      loc : 1,
      pole: pole1
    }
  }
}

//initializes poles with necessary properties

function setUpPoles() {
  pole1 =
  {
    discs : startingArray,
    id : $("#pole1"),
    numID: 1
  }

  pole2 =
  {
    discs : [],
    id : $("#pole2"),
    numID: 2
  }

  pole3 =
  {
    discs : [],
    id : $("#pole3"),
    numID: 3
  }
}

function reset () {
  $("#win").removeClass("show");
  $("#disc5").prependTo($("#pole1"));
  $("#disc4").prependTo($("#pole1"));
  $("#disc3").prependTo($("#pole1"));
  $("#disc2").prependTo($("#pole1"));
  $("#disc1").prependTo($("#pole1"));
  setUpGame()
  $("#pause").text("Pause")
  $("#pause").removeClass("unpause")
//revise
}


function emptyPole (pole){
  if ((pole.discs.length==0)) {
  //console.log(pole.numID + " is empty")
  return true
  }
  if(pole.discs.length > 0)  {
  //console.log(pole.numID + " is not empty")
  return false
  }
}

function win() {
  finalSecs = secs-1
  finalTime = minutes+":"+finalSecs;
  if(pole3.discs.length==discNumber)
  {
    var scoreHTML = "<li>" + scoreIndex + ".     " + finalTime + "</li>"
    var movesHTML = "<li>" + moves + "</li>"
    scoreIndex++;
    inProgress = false;
    scoreBoard.push({moves,finalTime})
    switch (true) {
      case 3==discNumber:
      $("#scores-ranked1").append(scoreHTML)
      $("#moves-ranked1").append(movesHTML)
        break;
      case 4==discNumber:
      $("#scores-ranked2").append(scoreHTML)
      $("#moves-ranked2").append(movesHTML)
        break;
      case 5==discNumber:
      $("#scores-ranked3").append(scoreHTML)
      $("#moves-ranked3").append(movesHTML)
        break;
    }
    $("#win").addClass("show");
    clearInterval(timer);
    return true;
  }
}

function moveLegal(poleOrg, poleNew, disc) {     //evaluates if move is legal

  if ((emptyPole(poleNew) || poleNew.discs[poleNew.discs.length-1].value >
  poleOrg.discs[poleOrg.discs.length-1].value == true) && (emptyPole(poleOrg) ==
  false && poleOrg!=poleNew && disc.id.prev().length == 0))
    {
  //console.log("legal move")
    return true;
    }
  else{
    return false;
  }
}

function move(poleOrg, poleNew, disc) { //moves current disc to new pole, adding it to pole array and prepending it to pole in DOM
  if (moveLegal (poleOrg, poleNew, disc) == true)
  {

    poleNew.discs.push(poleOrg.discs.pop());
    poleNew.discs[poleNew.discs.length-1].id.prependTo(poleNew.id);
    disc.pole = poleNew;
    moves++;
    $("#moves").text(moves);
    win();

  }
    else
    {
      $(disc.id).draggable({revert : true})
    }
}

function handleDiscDrop(event,ui) {
  var thisDisc = ui.draggable;
  var discID = thisDisc.attr("id");
  var poleID = $(this).attr("id");
  var currentdisc;
  var poleOrg;
  var poleNew;
    if(poleID == "pole1")
    {
      poleNew = pole1;
    }
    if(poleID == "pole2")
    {
      poleNew = pole2;
    }
    if(poleID  == "pole3")
    {
      poleNew = pole3;
    }

    if(discID == "disc1")
    {
      currentdisc = disc1;
      poleOrg = currentdisc.pole;
    }
    if(discID == "disc2")
    {
      currentdisc = disc2;
      poleOrg = currentdisc.pole;
    }
    if(discID  == "disc3")
    {
      currentdisc = disc3;
      poleOrg = currentdisc.pole;
    }
    if(discID  == "disc4")
    {
      currentdisc = disc4;
      poleOrg = currentdisc.pole;
    }
    if(discID  == "disc5")
    {
      currentdisc = disc5;
      poleOrg = currentdisc.pole;
    }

    move (poleOrg, poleNew, currentdisc);

    if(poleNew.discs.length == 1) {
    ui.draggable.position({
      my: "bottom",
      at: "bottom",
      of: poleNew.id,
      collision: "fit",
    })
    }
    if(poleNew.discs.length > 1) {
      var index = poleNew.discs.length-2
      var lastDisc = poleNew.discs[index].id
      ui.draggable.position({
        my: "bottom",
        at: "top",
        of: lastDisc,
        collision: "flipfit",
    })
  }
}

  function displayTime(){               //manages timer
  if (secs==60){
    secs = 0;
    minutes++;
  }
  if (secs<10){
    secs = "0"+secs;
  }
    if (minutes){
      $("#timer").text(minutes +":" +secs)
      }
    else{
      $("#timer").text(":" +secs)
      }
  secs++;
  timerRunning = true;
}

  function resetTimer(x,y){
    secs = x;
    minutes = y;
    clearInterval(timer);
  }


$("#start").click(                          //either starts game over or starts new game
function() {
    if($("#start").hasClass("inProgress")){
      //resets game when "restart" is pressed
      reset();
      secs = 0;
      minutes = 0;
      moves = 0;
      clearInterval(timer);
      timer = null;
      $("#discs").draggable({disabled: true})
      $("#pause").removeClass("inProgress")
      $("#start").removeClass("inProgress")
      $("#discs").removeClass("is-disabled")
      $("#start").text("Start")

    }
    else{
      //makes start button into "restart" button
      inProgress = true;
      timer = window.setInterval(displayTime, 1000);
      $("#start").text("Restart")
      $("#moves").text(moves)
      $("#start").addClass("inProgress")
      $("#pause").addClass("inProgress")
      $("#discs").addClass("is-disabled")
      $(".discs").draggable({
      containment: $(".container"),
      cursor: "move",
      snap: $(".poles")
      })
      $(".discs").draggable("enable")
      $(".poles").droppable({
      hoverClass: "highlight",
      drop: handleDiscDrop
    })
  }
})

$("#pause").click(
function() {
  if (timerRunning){
    clearInterval(timer);
    $("#pause").text("Unpause")
    $("#pause").addClass("unpause")
    $(".discs").draggable("disable")
    timerRunning=false;
  }
  else{
    $("#pause").removeClass("unpause")
    $(".discs").draggable("enable")
    $("#pause").text("Pause");
    timer = window.setInterval(displayTime, 1000);
  }
})

/*
$(function() { //still working on this function--will prevent the disc from getting stuck in between poles
  var startPole
  var endPole  //checks to see if html disc has moved without moving poles
  $(".discs").draggable({
  start: $(this).on("dragstart", function( event, ui ) {startPole =
  ($(this).parent().attr("id"))}),
  stop: $(this).on("dragstop", function( event, ui ) {
    console.log($(this).parent().attr("id"))
    $(ui.helper).addClass("ui-helper-discs");
    })
  })
})
*/

 ///
