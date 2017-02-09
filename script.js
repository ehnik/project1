// Good idea on managing the values and locations of the disks in your script rather than reading that info from the DOM
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

// Same thing for the poles, arrays are the most natural way to manage the disks / poles, well done.
// Also really like that you tied all your variables to the DOM elements they represent.
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

// Good job modularizing your functions like below. Could be refactored as such:
function emptyPole (pole){                        //evaluates if pole is empty
  return pole.discs.length == 0
}

// Maybe rename this function to something a bit more sematic like 'checkWin'
function win() {
  if(pole3.discs[0]==disc3 && pole3.discs[1]== disc2 && pole3.discs[2] == disc1)
  {
  //alert("You win!");
  //console.log("win!")
  $("footer").prepend("You win!");
  return true;
  }
  // if you don't need it to do anything when 'if' is false, you don't need an 'else'
}

// Maybe break the 'moveLegal' function into smaller ones that check each one of the conditions listed below and then call them inside the 'moveLegal' function
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
// Great use of jQuery UI plugin
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
  //  To fix your stuck disk problem, here for 'drop', have it activate a separate
  //  function that determines whether or not the disk is in the right position, and
  //  then either triggers handleDiscDrop OR triggers jquery ui revert.
  // This example may help: http://jsfiddle.net/39khs/82/
 })
})

$(function() { //still working on this function--will prevent the disc from getting stuck in between poles
  var startPole
  var endPole  //checks to see if html disc has moved without moving poles
  $(".discs").draggable({
  start: $(this).on("dragstart", function( event, ui ) {startPole =
  ($(event.target).parent().attr("id"))})
  })
  $( ".discs" ).draggable({
  stop: $(this).on("dragstop", function( event, ui ) {
    endPole = $(event.target).parent().attr("id")
    console.log(startPole, endPole)
    if(startPole == endPole){
      $(event.target).draggable({revert : true})
      // still working on this, but this is the basic idea. The reason it wasn't
      // working is because you were using 'this' to track the disk which was being
      // interpreted as the document as a whole. To get around this, I replaced 'this'
      // with event.target above and then compared whether the start pole and end poles are
      // the same. If so, trigger the revert. 
    }
  })
  })
  })

// This function seems to be doing too many things at once, consider breaking it into
// many functions and have them simply called in this handleDiscDrop function (ie modularity)
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
