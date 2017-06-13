var disc1={}
var disc2={}
var disc3={}

var pole1={}
var pole2={}
var pole3={}

var secs = 0;
var minutes = 0;
var timer = null;
var timerRunning = false;

$("#ok").click(
  function() {
    $("#rules-content").removeClass("show")
})

$("#rules").click(
  function() {
    $("#rules-content").addClass("show")
})

$("#discs").click(
  function() {
    $("#discs-menu").toggle("show")
})

var discNumber = $('input[name=discNum]:checked').val()
$('#3').prop('checked',true)


function setUp () {

  disc1 =
{
  id: $("#disc1"),
  value: 1,
  loc : 1
}

disc2 =
{
  id: $("#disc2"),
  value: 2,
  loc : 1
}

disc3 =
{
  id: $("#disc3"),
  value: 3,
  loc : 1
}

pole1 =
{
  discs : [disc3,disc2,disc1],
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

setUp()

function reset () {
  $("#win").removeClass("show");
  $("#disc3").prependTo($("#pole1"));
  $("#disc2").prependTo($("#pole1"));
  $("#disc1").prependTo($("#pole1"));
  setUp()
  $(".pause").text("Pause")
  $(".pause").removeClass("unpause")
  currentPole (disc1);
  currentPole (disc2);
  currentPole (disc3);
}

function currentPole (disc) {
  if(disc.loc == 1)
  {
    disc.pole = pole1;
  }
  if(disc.loc == 2)
  {
    disc.pole = 2;
  }
  if(disc.loc == 3)
  {
    disc.pole = 3;
  }
}
currentPole (disc1);
currentPole (disc2);
currentPole (disc3);
/////////////////////////////////////////////
//game moves

function emptyPole (pole){                        //evaluates if pole is empty
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
  if(pole3.discs[0]==disc3 && pole3.discs[1]== disc2 && pole3.discs[2] == disc1)
  {
  //alert("You win!");
  //console.log("win!")
  $("#win").addClass("show");
  clearInterval(timer);
  return true;
  }
  else {
  //console.log("keep playing!")
  }
}

function moveLegal (poleOrg, poleNew, disc) {
  if ((emptyPole(poleNew) || poleNew.discs[poleNew.discs.length-1].value >
  poleOrg.discs[poleOrg.discs.length-1].value == true) && (emptyPole(poleOrg) ==
  false && poleOrg!=poleNew && disc.id.prev().length == 0))
  {
  //console.log("legal move")
  return true;
  }
else
  {
  //console.log("illegal move")
  if (disc.id.prev().length > 0){
      console.log("you have a sibling!")
  }
  return false;
  }
}

function move (poleOrg, poleNew, disc) {
  if (moveLegal (poleOrg, poleNew, disc) == true)
  {
  poleNew.discs.push(poleOrg.discs.pop());
  poleNew.discs[poleNew.discs.length-1].id.prependTo(poleNew.id);
  disc.pole = poleNew;
  console.log(disc.id)
  win();
  //console.log("Pole 1: " + pole1.discs,"Pole 2: " + pole2.discs,"Pole 3: " + pole3.discs);
  }
  else
  {
  console.log(disc.id);
  $(disc.id).draggable({revert : true})
  //alert("You can't do that!");
  }
}

function displayTime(){
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


$("#start").click(
function() {
    if($("#start").hasClass("inProgress")){
      //resets game when "restart" is pressed
      reset();
      secs = 0;
      minutes = 0;
      clearInterval(timer);
      timer = null;
      $(".discs").draggable({disabled: true})
      $(".pause").removeClass("inProgress")
      $(".start").removeClass("inProgress")
      $(".start").text("Start New Game")
    }
    else{
      //makes start button into "restart" button
      timer = window.setInterval(displayTime, 1000);
      $(".start").text("Restart")
      $(".start").addClass("inProgress")
      $(".pause").addClass("inProgress")
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

$(".pause").click(
function() {
  if (timerRunning){
    clearInterval(timer);
    $(".pause").text("Unpause")
    $(".pause").addClass("unpause")
    $(".discs").draggable("disable")
    timerRunning=false;
  }
  else{
    $(".pause").removeClass("unpause")
    $(".discs").draggable("enable")
    $(".pause").text("Pause");
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

function handleDiscDrop(event,ui){
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
    move (poleOrg, poleNew, currentdisc);
    if(poleNew.discs.length == 1) {
    ui.draggable.position({
      my: "bottom",
      at: "bottom",
      of: poleNew.id,
      collision: "fit",
    })
    }
    if(poleNew.discs.length == 2) {
    var lastDisc = poleNew.discs[0].id
    ui.draggable.position({
      my: "bottom",
      at: "top",
      of: lastDisc,
      collision: "flipfit",
    })
    }
    if(poleNew.discs.length == 3) {
    var lastDisc = poleNew.discs[1].id
    ui.draggable.position({
      my: "bottom",
      at: "top",
      of: lastDisc,
      collision: "flipfit",
    })
    }
 }

 ///
