/**
Hier werden Events (clicks, etc..) definiert
**/
layer.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(layer, evt);
  var koord = XYzuRealIm(mousePos.x, mousePos.y);
  var message = 'Real: ' + koord.real + '<br> Imaginär: ' + koord.im;
  zoomRect.endPosX = mousePos.x;
  zoomRect.endPosY = mousePos.y;

  writeMessage(message);
  if (zoomRect.mousedown) {

    x = zoomRect.startPosX;
    y = zoomRect.startPosY;
    h = zoomRect.endPosY - y;
    w = zoomRect.endPosX - x;

    layerCtx.clearRect(0, 0, width, height);

    layerCtx.beginPath();
    layerCtx.rect(x, y, w, h);
    layerCtx.closePath();
    layerCtx.stroke();

  }

}, false);

layer.addEventListener('mouseup', function(evt) {
  var mousePos = getMousePos(layer, evt);
  var startKoord = XYzuRealIm(zoomRect.startPosX, zoomRect.startPosY);
  var zielKoord = XYzuRealIm(mousePos.x, mousePos.y);

  zoomRect.mousedown = false;
  layerCtx.clearRect(0, 0, width, height);

  //zoomen
  if (zoomRect.startPosX != mousePos.x && zoomRect.startPosY != mousePos.y) {

    x_min = startKoord.real;
    x_max = zielKoord.real;
    y_min = zielKoord.im;
    y_max = startKoord.im;

    x_sp = x_max - x_min;
    y_sp = y_max - y_min;

    iteration();
    updateRange();

  }

}, false);

layer.addEventListener('mousedown', function(evt) {
  var mousePos = getMousePos(layer, evt);
  zoomRect.startPosX = mousePos.x;
  zoomRect.startPosY = mousePos.y;
  zoomRect.mousedown = true;
  var koord = XYzuRealIm(mousePos.x, mousePos.y);

}, false);

//dropdrown aktualisieren

$(".dropdown-menu li a").click(function() {
  $(".btn:first-child").text($(this).text());
  $(".btn:first-child").val($(this).text());

});

function setFraktal(id) {
  switch (id) {
    case 0:
      fraktalFunction = MandelbrotFunction;
      break;
    case 1:
      fraktalFunction = AugeFunction;
      break;
    case 2:
      fraktalFunction = AugeZwillingFunction;
      break;
    default:
      fraktalFunction = MandelbrotFunction;

  }
}
