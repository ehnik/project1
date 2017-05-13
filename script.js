var disc1={}
var disc2={}
var disc3={}

var pole1={}
var pole2={}
var pole3={}


function start () {

  disc1 =
{
  id: $("#disc1"),
  value: 1,
  loc : 1
}

//$(function pole () {
  //console.log("pole hoisted" + pole1.id.firstChild())
//})

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

console.log(pole1)
$("#win").detach()
}

start()

function reset () {
  $("#disc3").prependTo($("#pole1"));
  $("#disc2").prependTo($("#pole1"));
  $("#disc1").prependTo($("#pole1"));
  start()
  currentPole (disc1);
  currentPole (disc2);
  currentPole (disc3);
  console.log(disc1.pole)
  console.log(disc2.pole)
  console.log(disc3.pole)
}

function currentPole (disc) {
  if(disc.loc == 1)
  {
    disc.pole = pole1;
    console.log("convert function")
  }
  if(disc.loc == 2)
  {
    disc.pole = 2;
    console.log("convert function")
  }
  if(disc.loc == 3)
  {
    disc.pole = 3;
    console.log("convert function")
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
  var winMessage = $('<p id="win">You win!</p>');
  $(".container").prepend(winMessage);
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

$(function() {
   $(".discs").draggable({
   containment: $(".container"),
   cursor: "move",
   snap: $(".poles")
  })
})

$(function() {
   $(".poles").droppable({
   hoverClass: "highlight",
   drop: handleDiscDrop
 })
})

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

function handleDiscDrop(event,ui){
  console.log("handleDiscDrop")
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
      console.log(currentdisc.id)
    }
    if(discID == "disc2")
    {
      currentdisc = disc2;
      poleOrg = currentdisc.pole;
      console.log(currentdisc.id)
    }
    if(discID  == "disc3")
    {
      currentdisc = disc3;
      poleOrg = currentdisc.pole;
      console.log(currentdisc.id)

    }
    move (poleOrg, poleNew, currentdisc);
    if(poleNew.discs.length == 1) {
    ui.draggable.position({
      at: "bottom-16",
      of: poleNew.id,
    })
    }
    if(poleNew.discs.length == 2) {
    ui.draggable.position({
      at: "top+85%",
      of: poleNew.id,
    })
    }
    if(poleNew.discs.length == 3) {
    ui.draggable.position({
      at: "top+75%",
      of: poleNew.id,
    })
    }
 }

 ///////
 function rules() {
    document.getElementById("myDropdown1").classList.toggle("show1");
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show1')) {
        openDropdown.classList.remove('show1');
      }
    }
  }
}
