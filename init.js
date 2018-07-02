/**
MAIN
**/
function init() {

  //iteration();
  setFraktal(0);
  updateUI();
}

/** wrapperfunction, wird vom zeichnen button aufgerufen **/
function go() {
  getUserInput();
  updateUI();
  //spannweite updaten
  x_sp = x_max - x_min;
  y_sp = y_max - y_min;
  iteration();
}

/**main iteration **/
function iteration() {
  var buffer;
  console.log("Initialisiere Hash Set");
  hashSet = {};
  for (var y = 0; y < height; y++) {

    for (var x = 0; x < width; x++) {

      //keine funktionsaufrufe, zwecks performance
      ca = x * (x_sp / width) + x_min;
      cb = ((-y + height) * (y_sp / height) + y_min);

      //buffer = CtoRGB(ca, cb);
      //buffer = CtoRGBZwilling(ca, cb);
      buffer = fraktalFunction(ca, cb);
      point(x, y, buffer.r, buffer.g, buffer.b);

    }
  }

  draw();

  //test
  if (max_iter < 1) {
    console.log("sedf");
    setTimeout(() => {
      max_iter++;
      console.log("jaja");
      iteration();
    }, 2000);
  }

}
