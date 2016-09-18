function drawDot(ctx, x, y, color, size) {
  var c = Object.assign({r:255, g:255, b:255, a:1}, color || {});
  size = size || 5;

  // Select a fill style
  ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
  // Draw a filled circle
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function randomColor() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  }
}

function getTouchPos(e) {
  return Array.from(e.touches).map(function(t) {
    return {
      x: t.pageX - t.target.offsetLeft,
      y: t.pageY - t.target.offsetTop
    };
  });
}

function draw(e, ctx, opt) {
  e.preventDefault();
  var color = Object.assign(randomColor(), {a: opt.alpha});
  var size = Math.random()*opt.size;
  getTouchPos(e).map(function(pos) {
    drawDot(ctx, pos.x,     pos.y,     color, size);
    drawDot(ctx, pos.y,     pos.x,     color, size);
    drawDot(ctx, dim-pos.x, pos.y,     color, size);
    drawDot(ctx, dim-pos.y, pos.x,     color, size);
    drawDot(ctx, pos.x,     dim-pos.y, color, size);
    drawDot(ctx, pos.y,     dim-pos.x, color, size);
    drawDot(ctx, dim-pos.x, dim-pos.y, color, size);
    drawDot(ctx, dim-pos.y, dim-pos.x, color, size);
  })
}

var opt = {
  size:  (window.location.search.match(/[\?&]s(ize)?=([\d\.]+)/) || [null,null,500])[2],
  alpha: (window.location.search.match(/[\?&]a(lpha)?=([\d\.]+)/) || [null,null,.05])[2]
};

var canvas = document.getElementById('sketchpad');
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var dim = Math.min(w, h);
canvas.setAttribute('width', dim);
canvas.setAttribute('height', dim);

var ctx = canvas.getContext('2d');
canvas.addEventListener('touchstart', function(e) { draw(e, ctx, opt); }, false);
canvas.addEventListener('touchmove', function(e) { draw(e, ctx, opt); }, false);
