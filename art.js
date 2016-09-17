function drawDot(ctx, x, y, color, size) {
  var c = Object.assign({r:255, g:255, b:255, a:0.01}, color || gc || {});
  size = size || 5;

  // Select a fill style
  ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
  // Draw a filled circle
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

var gc;
function getTouchPos(e) {
  if (!e.touches) return false;
  if (e.touches.length != 1) gc = randomColor();
  // if (e.touches.length != 1) return false; // Too many fingers, can only deal with 1
  var touch = e.touches[0]; // Get the information for finger #1
  return {
    x: touch.pageX - touch.target.offsetLeft,
    y: touch.pageY - touch.target.offsetTop
  };
}

function randomColor() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  }
}

var lastX, lastY, lastSpeed;
function touchStart(e) {
  e.preventDefault();
  var {x, y} = getTouchPos(e);
  drawDot(ctx, x, y);
  lastX = x;
  lastY = y;
}

function touchMove(e) {
  e.preventDefault();
  var {x, y} = getTouchPos(e);
  var speed = (Math.abs(x-lastX)+Math.abs(y-lastY)) / 2;
  drawDot(ctx, x, y, null, 1/speed*100);
  lastX = x;
  lastY = y;
  lastSpeed = speed;
}


var canvas = document.getElementById('sketchpad');

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
canvas.setAttribute('width', w);
canvas.setAttribute('height', h);

canvas.addEventListener('touchstart', touchStart, false);
canvas.addEventListener('touchmove', touchMove, false);

var ctx = canvas.getContext('2d');
