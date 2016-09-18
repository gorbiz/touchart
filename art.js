var rotate = Raphael.animation({transform: "r180"}, 1500).repeat(Infinity);

function drawDot(paper, x, y, color, size) {
  var c = Object.assign({r:255, g:255, b:255, a:1}, color || {});
  size = size || 5;

  var shape = paper.rect(x-size/2, y-size/2, size, size);
  shape.attr('fill', `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);
  shape.attr('stroke', 'none');
  shape.animate(rotate);
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
      x: t.pageX,
      y: t.pageY
    };
  });
}



var fullWidth  = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var fullHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var parentElement = document.getElementById('sketchpad');
var paper = Raphael(parentElement, fullWidth, fullHeight);
var opt = {
  size:  (window.location.search.match(/[\?&]s(ize)?=([\d\.]+)/) || [null,null,50])[2],
  alpha: (window.location.search.match(/[\?&]a(lpha)?=([\d\.]+)/) || [null,null,.05])[2]
};

var svg = document.getElementsByTagName('svg')[0];
svg.addEventListener('touchstart', draw, false);
svg.addEventListener('touchmove',  draw, false);

var limit = 0;
function draw(e) {
  e.preventDefault();
  if (++limit%2 != 1) return;
  var color = Object.assign(randomColor(), {a: opt.alpha});
  var size = opt.size;
  getTouchPos(e).map(function(pos) {
    drawDot(paper, pos.x, pos.y, color, size);
  });
}
