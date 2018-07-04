/**
Hier werden Events (clicks, etc..) definiert
**/
layer.addEventListener('mousemove', function (evt) {
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

layer.addEventListener('mouseup', function (evt) {
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
    updateUI();

  }

}, false);

function zoom_out() {
  x_min *= 2;
  x_max *= 2;
  y_min *= 2;
  y_max *= 2;

  x_sp = x_max - x_min;
  y_sp = y_max - y_min;

  iteration();
  updateUI();
}

function reset_range() {
  x_min = -2;
  x_max = 1;
  y_min = -1;
  y_max = 1;

  x_sp = x_max - x_min;
  y_sp = y_max - y_min;

  iteration();
  updateUI();
}

layer.addEventListener('mousedown', function (evt) {
  var mousePos = getMousePos(layer, evt);
  zoomRect.startPosX = mousePos.x;
  zoomRect.startPosY = mousePos.y;
  zoomRect.mousedown = true;
  var koord = XYzuRealIm(mousePos.x, mousePos.y);

}, false);

//dropdrown aktualisieren

$(".dropdown-menu li a").click(function () {
  $(".btn:first-child").text($(this).text());
  $(".btn:first-child").val($(this).text());

});

function set_spinner(active) {

  if (active) {
    $("#spinner").attr("class", "loader")
  } else {
    $("#spinner").attr("class", "")
  }
}

function setFraktal(id) {
  switch (id) {
    case 0:
      fraktalFunction = mandelbrot
      iterationFunction = normal_iteration
      break;
    case 1:
      fraktalFunction = mandelbrotKonjugiert;
      iterationFunction = normal_iteration
      break;
    case 2:
      fraktalFunction = mandelbrotKonjugiert;
      iterationFunction = normal_iteration_zwilling
      break;
    case 3:
      fraktalFunction = templeOfVoid;
      iterationFunction = normal_iteration
      break;
    case 4:
      fraktalFunction = zellen;
      iterationFunction = normal_iteration
      break;
    case 8:
      fraktalFunction = kondensator_1;
      iterationFunction = julia_iteration
      break;
    case 9:
      fraktalFunction = kondensator_1;
      iterationFunction = julia_iteration_zwilling
      break;
    case 10:
      fraktalFunction = kondensator_2;
      iterationFunction = julia_iteration
      break;
    case 11:
      fraktalFunction = kondensator_2;
      iterationFunction = julia_iteration_zwilling
      break;
    case 12:
      fraktalFunction = kondensator_3;
      iterationFunction = julia_iteration
      break;
    case 13:
      fraktalFunction = kondensator_3;
      iterationFunction = julia_iteration_zwilling
      break;
    case 14:
      fraktalFunction = kondensator_4;
      iterationFunction = julia_iteration;
      break;
    case 15:
      fraktalFunction = kondensator_4;
      iterationFunction = julia_iteration_zwilling;
      break;
    default:
      fraktalFunction = mandelbrot
      iterationFunction = normal_iteration

  }
}
