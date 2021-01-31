var dx = 2;
var dy = 4;

function drawIt() {
disable();
var x = 420;
var y = 120;

var WIDTH;
var HEIGHT;
var r=10;
var ctx;
var tocke;
var bounce = new Audio("sfx/bounce.wav");

var oblak = new Image();
oblak.src = "img/tile1.png";
disableIgrajButton();


//timer
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var start = true;
//timer
function timer(){
  if(start==true){
    sekunde++;

    sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
    minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
    izpisTimer = minuteI + ":" + sekundeI;

    $("#cas").html(izpisTimer);
  }
  else{
    sekunde=0;
    //izpisTimer = "00:00";
    $("#cas").html(izpisTimer);
  }
}


function init() {
  tocke = 0;
  $("#tocke").html(tocke);
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  //timer
  sekunde = 0;
  izpisTimer = "00:00";
  intTimer = setInterval(timer, 1000);
  return setInterval(draw, 10);
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
init();
/////////////////////////////////////////////////////////
var paddlex;
var paddleh;
var paddlew;

function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}

init_paddle();
/////////////////////////////////////////////

var rightDown = false;
var leftDown = false;

//nastavljanje leve in desne tipke
function onKeyDown(evt) {
  if(start){
    if (evt.keyCode == 39)
      rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
  }
}

function onKeyUp(evt) {
  if (evt.keyCode == 39)
rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp); 

function draw() {
  clear();
  if(start)
  circle(x, y, 10);
  //premik ploščice levo in desno
  if (rightDown){
    if((paddlex+paddlew) < WIDTH){
      paddlex += 5;
    }
    else{
      paddlex = WIDTH-paddlew;
    }
  }
  else if (leftDown){
    if(paddlex>0){
      paddlex -=5;
    }
    else{
      paddlex=0;
    }
  }
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

    //risanje bricksov
    ///////////////////////////////////////////////////
     for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT);
        ctx.drawImage(oblak, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }

/////
  rowheight = BRICKHEIGHT + PADDING + 0.001/2; //Smo zadeli opeko?
  colwidth = BRICKWIDTH + PADDING + 0.001/2;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
  dy = -dy;
  bounce.play();
  points[row][col] += 1;

  if(points[4][col] == 1){
    bricks[4][col] = 0;
    tocke += 1;
    points[row][col] -= 1;
  }
  else if(points[3][col] == 1){
    bricks[3][col] = 0;
    tocke += 2;
    points[row][col] -= 1;
  }
  else if(points[2][col] == 2){
    bricks[2][col] = 0;
    tocke += 2;
    points[row][col] -= 1;
  }
  else if(points[1][col] == 2){
    bricks[1][col] = 0;
    tocke += 4;
    points[row][col] -= 1;
  }
  else if(points[0][col] == 3){
    bricks[0][col] = 0;
    tocke += 5;
    points[row][col] -= 1;
  }

/*
  if (row == 3)
    tocke += 2;
  else if (row == 2)
    tocke += 3;
  else if (row == 1)
    tocke += 4;
  else if(row == 0)
    tocke += 5;
  else
    tocke += 1;
  */
  $("#tocke").html(tocke);
}
////

  if (x + dx > WIDTH-r || x + dx < 0+r)
    dx = -dx;
  if (y + dy < 0+r)
    dy = -dy;
  else if (y + dy > HEIGHT -r) {
    if (x > paddlex && x < paddlex + paddlew){
    dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
    dy = -dy;
    bounce.play();
  }
  else if (y + dy > HEIGHT -(r)) {
    start=false;
    if (x > paddlex && x < paddlex + paddlew){
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
      dy = -dy;
      start=true;
    }
    else if (y + dy > HEIGHT-r)
      enable();
      clearInterval(ClearIntervalId);
  }
  }
  x += dx;
  y += dy;
  ///////////////////////////////////////////

  //če so pobrane vse točke je zmaga in konec igre.
  if(tocke >= 70)
    start = false;

  }

  //init();
  ////////////////////////////////////////////////

var canvasMinX;
var canvasMaxX;

function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
  canvasMinX = $("canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH-39;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX+35 && evt.pageX < canvasMaxX && start) {
    paddlex = evt.pageX - canvasMinX-35;
  }

}
$(document).mousemove(onMouseMove);


init_mouse();

//////////////////////////////////////////////////

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function initbricks() { //inicializacija opek - polnjenje v tabelo
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;
  bricks = new Array(NROWS);
  points = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    points[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
      points[i][j] = 0;
    }
  }
}

  initbricks();

}


function disable() { 
    var x = document.getElementById("konecIgre");
    document.getElementById("konecIgre").style.opacity = "0%";
    x.style.display = "none";
  }
function enable() { 
  var x = document.getElementById("konecIgre");
  document.getElementById("konecIgre").style.opacity = "100%";
  x.style.display = "block";
}

function tezavnostLahka(){
  dx = 1;
  dy = 2;
}

function tezavnostNormalna(){
  dx = 2;
  dy = 4;
}

function tezavnostTezka(){
  dx = 4;
  dy = 6;
}

function disableIgrajButton() { 
    var x = document.getElementById("igraj");
    x.style.display = "none";
  }