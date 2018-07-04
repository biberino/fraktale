/**
Definiert Fraktal Funktionen
**/





























function julia(za, zb, ca, cb) {

  var resultA = ((za * za) - (zb * zb)) + 1;
  var resultB = (2.0 * za * zb);
  return { a: resultA, b: resultB }

}

function zellen(za, zb) {

  var resultA = ((za * za) - (zb * zb)) + 1;
  var resultB = (2.0 * za * zb) + 1;
  return { a: resultA, b: resultB }

}

function zellenZw(za, zb, x, y) {

  var resultA = ((za * za) - (zb * zb)) + 1 + (koppl * x);
  var resultB = (2.0 * za * zb) + 1 + (koppl * y);

  var resultA2 = ((x * x) - (y * y)) + 1 - (koppl * za);
  var resultB2 = (2.0 * y * x) + 1 - (koppl * zb);

  return { a1: resultA, b1: resultB, a2: resultA2, b2: resultB2 }

}

function templeOfVoid(za, zb, ca, cb) {
  var cosComplexA = Math.cos(za) * Math.cosh(zb);
  var cosComplexB = Math.sin(za) * Math.sinh(zb) * -1;

  var doubleA = ((za * za) - (zb * zb));
  var doubleB = (2.0 * za * zb);

  var resultA = (cosComplexA * doubleA - cosComplexB * doubleB);
  var resultB = (cosComplexA * doubleB + cosComplexB * doubleA);

  resultA += ca;
  resultB += cb;

  return { a: resultA, b: resultB }

}

function mandelbrot(za, zb, ca, cb) {
  var resultA = ((za * za) - (zb * zb)) + ca;
  var resultB = (2.0 * za * zb) + cb;
  return { a: resultA, b: resultB }
}

function mandelbrotKonjugiert(za, zb, ca, cb) {
  var resultA = (za * za + zb * zb) + ca;
  var resultB = cb;
  return { a: resultA, b: resultB }
}

function augeZwilling(x1, y1, x2, y2, cx, cy) {
  var x1n = x1 * x1 + y1 * y1 + cx + koppl * x2
  var y1n = cy + koppl * y2
  var x2n = x2 * x2 + y2 * y2 + cx - koppl * x1
  var y2n = cy - koppl * y1
  return { a1: x1n, b1: y1n, a2: x2n, b2: y2n }
}









//sieht noch komisch aus, hab ich was verpeilt?
function vierpolAntenne(za, zb, ca, cb) {
  var zA = za + ca;
  var zB = zb + cb;

  var z3A = (za * za * za) - (zb * zb) - (2 * za * zb * zb);
  var z3B = ((za * za) - (zb * zb * zb) + (2 * za * za * zb));

  var nA = ((ca * z3A) - (cb * z3B)) + 1; // plus 1
  var nB = (ca * z3B) + (cb * z3A);

  //optimierung: nenner nur einmal rechnen
  var nenner = (nA * nA) + (nB * nB);
  var resultA = ((zA * nA) + (zB * nB)) / (nenner);
  var resultB = ((zB * nA) - (zA * nB)) / (nenner);

  return { a: resultA, b: resultB }
}


// (z*c) / (z+c)
function kondensator_1(za, zb, ca, cb) {
  //z*c
  var resultAZaehler = ((za * ca) - (zb * cb));
  var resultBZaehler = (zb * ca) + (za * cb);

  //z+c
  var resultANenner = za + ca;
  var resultBNenner = zb + cb;

  // zaehler / nenner
  var speedup = (resultANenner * resultANenner) + (resultBNenner * resultBNenner)

  var resultA = ((resultAZaehler * resultANenner) + (resultBZaehler * resultBNenner)) / (speedup)

  var resultB = ((resultBZaehler * resultANenner) - (resultAZaehler * resultBNenner)) / (speedup)

  return { a: resultA, b: resultB }
}

// (z*c) / ((*z)+c)
function kondensator_4(za, zb, ca, cb) {
  //z*c
  var resultAZaehler = ((za * ca) - (zb * cb));
  var resultBZaehler = (zb * ca) + (za * cb);

  //z+c
  var resultANenner = za + ca;
  var resultBNenner = (-1 * zb) + cb;

  // zaehler / nenner
  var speedup = (resultANenner * resultANenner) + (resultBNenner * resultBNenner)

  var resultA = ((resultAZaehler * resultANenner) + (resultBZaehler * resultBNenner)) / (speedup)

  var resultB = ((resultBZaehler * resultANenner) - (resultAZaehler * resultBNenner)) / (speedup)

  return { a: resultA, b: resultB }
}

//(z^2 * c) / (z^2 + c)
function kondensator_2(za, zb, ca, cb) {

  //z*z
  var zzA = (za * za) - (zb * zb)
  var zzB = 2 * za * zb


  //z^2*c
  var resultAZaehler = ((zzA * ca) - (zzB * cb));
  var resultBZaehler = (zzB * ca) + (zzA * cb);

  //z^2+c
  var resultANenner = zzA + ca;
  var resultBNenner = zzB + cb;

  // zaehler / nenner
  var speedup = (resultANenner * resultANenner) + (resultBNenner * resultBNenner)

  var resultA = ((resultAZaehler * resultANenner) + (resultBZaehler * resultBNenner)) / (speedup)

  var resultB = ((resultBZaehler * resultANenner) - (resultAZaehler * resultBNenner)) / (speedup)

  return { a: resultA, b: resultB }
}

//(z*(*z) * c) / (z*(*z) + c)
function kondensator_3(za, zb, ca, cb) {

  //z* (*z)
  var zzA = (za * za) + (zb * zb)
  var zzB = 0


  //z^2*c
  var resultAZaehler = ((zzA * ca) - (zzB * cb));
  var resultBZaehler = (zzB * ca) + (zzA * cb);

  //z^2+c
  var resultANenner = zzA + ca;
  var resultBNenner = zzB + cb;

  // zaehler / nenner
  var speedup = (resultANenner * resultANenner) + (resultBNenner * resultBNenner)

  var resultA = ((resultAZaehler * resultANenner) + (resultBZaehler * resultBNenner)) / (speedup)

  var resultB = ((resultBZaehler * resultANenner) - (resultAZaehler * resultBNenner)) / (speedup)

  return { a: resultA, b: resultB }
}


/** Z^Z +C
**/
function simpelPotenz(za, zb, ca, cb) {
  const buffer = komplexHochKomplex(za, zb, za, zb);
  const resultA = buffer.a;
  const resultB = buffer.b;
  return { a: resultA, b: resultB }
}

/** Z^(Z* -1) +C
**/
function konjugiertKomplexePotenz(za, zb, ca, cb) {
  const nennerA = za;
  const nennerB = (zb * -1)
  const buffer = komplexHochKomplex(za, zb, nennerA, nennerB);
  const resultA = buffer.a - 1;
  const resultB = buffer.b;

  return { a: resultA, b: resultB }
}

function konjugiertKomplexePotenzZw(x1, y1, x2, y2, cx, cy) {
  const nennerA = x1;
  const nennerB = (y1 * -1)
  const buffer = komplexHochKomplexAl(x1, y1, nennerA, nennerB);
  const resultA = (buffer.a + cx - (koppl * x2));
  const resultB = buffer.b + cy - (koppl * y2);

  const nennerAn = x2;
  const nennerBn = (y2 * -1)
  const buffern = komplexHochKomplexAl(x2, y2, nennerAn, nennerBn);
  const resultAn = buffern.a + cx + (koppl * x1);
  const resultBn = buffern.b + cy + (koppl * y1);

  return { a1: resultA, b1: resultB, a2: resultAn, b2: resultBn }
}

function engel(x1, y1, x2, y2, cx, cy) {
  const nennerA = x1 - 1;
  const nennerB = (y1 * -1)
  const buffer = komplexHochKomplex(x1, y1, nennerA, nennerB);
  const resultA = buffer.a - 1 - koppl * x2;
  const resultB = buffer.b + koppl * y2;

  const nennerAn = x2 - 1;
  const nennerBn = (y2 * -1)
  const buffern = komplexHochKomplex(x2, y2, nennerAn, nennerBn);
  const resultAn = buffern.a - 1 - koppl * x1;
  const resultBn = buffern.b + koppl * y1;

  return { a1: resultA, b1: resultB, a2: resultAn, b2: resultBn }
}

/** complex hoch complex
wobei (a+bi)^(x+yi)**/

function komplexHochKomplex(a, b, x, y) {
  //division durch null abfangen
  var argAB;
  if (a === 0) {
    //bei a = 0 immer 90 grad
    //umrechnen in bogenmaß
    argAB = ((Math.PI * 2) / 360) * 90;

  } else {
    argAB = Math.atan(b / a);
  }

  const betragABhoch2 = (a * a) + (b * b);
  const betragAB = Math.sqrt(betragABhoch2);
  //const eHochX = Math.pow(Math.E, x);

  var ln;
  if (betragAB === 0) {
    ln = Number.MAX_VALUE;
  } else {
    ln = Math.log(betragAB);
  }
  //ln = Math.log(betragAB);

  //const faktor = Math.pow(a * a + b * b, x / 2) * Math.pow(Math.E, -1 * y * argAB);

  var alternativerFaktor = Math.pow(Math.E, (x * ln) - (y * argAB));

  if (alternativerFaktor == Number.POSITIVE_INFINITY) {
    alternativerFaktor = Number.MAX_VALUE;
  }
  if (alternativerFaktor == Number.NEGATIVE_INFINITY) {
    alternativerFaktor = Number.MIN_VALUE;
  }

  const realTeil = Math.cos((x * argAB) + (y * ln)) * alternativerFaktor;
  const imTeil = Math.sin((x * argAB) + (y * ln)) * alternativerFaktor;

  /**
    if (isNaN(realTeil) || (isNaN(imTeil))) {
        console.log(a);
        console.log(b);
        console.log(x);
        console.log(y);
        console.log(argAB);
        console.log(betragABhoch2);
        console.log(betragAB);
        console.log(eHochX);
        console.log(ln);
        //console.log(faktor);
        console.log(realTeil);
        console.log(imTeil);
        console.log(alternativerFaktor);
        throw new Error("Nan Error");
    }
    **/

  return { a: realTeil, b: imTeil }
}

function komplexHochKomplexAl(a, b, x, y) {
  //division durch null abfangen
  var argAB;
  if (a === 0) {
    //bei a = 0 immer 90 grad
    //umrechnen in bogenmaß
    argAB = ((Math.PI * 2) / 360) * 90;

  } else {
    argAB = Math.atan(b / a);
  }

  const betragABhoch2 = (a * a) + (b * b);
  const betragAB = Math.sqrt(betragABhoch2);
  //const eHochX = Math.pow(Math.E, x);

  var ln;
  if (betragAB === 0) {
    ln = Number.MAX_VALUE;
  } else {
    ln = Math.log(betragAB);
  }
  //ln = Math.log(betragAB);

  var faktor = Math.pow((a * a) + (b * b), x / 2) * Math.pow(Math.E, -1 * y * argAB);

  //var alternativerFaktor = Math.pow(Math.E, (x * ln) - (y * argAB));

  if (faktor == Number.POSITIVE_INFINITY) {
    faktor = Number.MAX_VALUE;
  }
  if (faktor == Number.NEGATIVE_INFINITY) {
    faktor = Number.MIN_VALUE;
  }

  const realTeil = Math.cos((x * argAB) + (0.5 * y * Math.log(betragABhoch2))) * faktor;
  const imTeil = Math.sin((x * argAB) + (0.5 * y * Math.log(betragABhoch2))) * faktor;

  /**
    if (isNaN(realTeil) || (isNaN(imTeil))) {
        console.log(a);
        console.log(b);
        console.log(x);
        console.log(y);
        console.log(argAB);
        console.log(betragABhoch2);
        console.log(betragAB);
        console.log(eHochX);
        console.log(ln);
        //console.log(faktor);
        console.log(realTeil);
        console.log(imTeil);
        console.log(alternativerFaktor);
        throw new Error("Nan Error");
    }
    **/

  return { a: realTeil, b: imTeil }
}
/**
function komplexHochKomplex(a, b, x, y) {
    const argAB = Math.atan(b / a);
    const betragABhoch2 = a * a + b * b;
    const betragAB = Math.sqrt(betragABhoch2);
    const eHochX = Math.pow(Math.E, x);
    const ln = Math.log(betragAB);

    const realTeil = Math.cos(x * argAB + y * ln) * eHochX;
    const imTeil = Math.sin(x * argAB + y * ln) * eHochX;

    return {a: realTeil, b: imTeil}
}

**/

function betragHochZwei(a, b) {
  return (a * a) + (b * b);
}

/**
Zeichnet einen einen Punkt x,y
auf die Canvas mit farbe r,g,b
**/
function point(x, y, r, g, b) {
  d[((width * y) + x) * 4] = r;
  d[((width * y) + x) * 4 + 1] = g;
  d[((width * y) + x) * 4 + 2] = b;
  d[((width * y) + x) * 4 + 3] = 255;

}

function writeMessage(message) {
  document.getElementById('pos').innerHTML = message;
}
function updateUI() {
  $("#x_min").attr("placeholder", `${x_min}`);
  $("#x_max").attr("placeholder", `${x_max}`);
  $("#y_min").attr("placeholder", `${y_min}`);
  $("#y_max").attr("placeholder", `${y_max}`);

  $("#gen_1").attr("placeholder", `${gen_1}`);
  $("#gen_2").attr("placeholder", `${gen_2}`);

  $("#max_iter").attr("placeholder", `${max_iter}`);
  $("#max_betrag").attr("placeholder", `${max_betrag}`);

  $("#koppl").attr("placeholder", `${koppl}`);

}

/**
berechnet die mausposition relativ in nem canvas objekt
**/
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

/**
Berechnet zu gegebenem x,y pixwelwert
den entsprechenden ca, cb wert
**/
function XYzuRealIm(x, y) {
  return {
    real: x * (x_sp / width) + x_min,
    im: ((-y + height) * (y_sp / height) + y_min)
  }
}

/**
Zeichnet schlussendlich auf die canvas
**/
function draw() {
  ctx.putImageData(id, 0, 0);
}

/**
Ließt Nutzereingaben aus und setzt, falls notwenig,
die Grenzen des Koordinatensystems
**/
function getUserInput() {
  var x_min_input = parseFloat($("#x_min").val());
  var x_max_input = parseFloat($("#x_max").val());
  var y_min_input = parseFloat($("#y_min").val());
  var y_max_input = parseFloat($("#y_max").val());

  if (!isNaN(x_min_input)) {
    x_min = x_min_input;
  }

  if (!isNaN(x_max_input)) {
    x_max = x_max_input;
  }

  if (!isNaN(y_min_input)) {
    y_min = y_min_input;
  }

  if (!isNaN(y_max_input)) {
    y_max = y_max_input;
  }

  var gen_1_input = parseFloat($("#gen_1").val());
  var gen_2_input = parseFloat($("#gen_2").val());

  if (!isNaN(gen_1_input)) {
    gen_1 = gen_1_input;
  }

  if (!isNaN(gen_2_input)) {
    gen_2 = gen_2_input;
  }

  var max_iter_input = parseFloat($("#max_iter").val());
  var max_betrag_input = parseFloat($("#max_betrag").val());

  if (!isNaN(max_iter_input)) {
    max_iter = max_iter_input;
  }

  if (!isNaN(max_betrag_input)) {
    max_betrag = max_betrag_input;
  }

  var koppl_input = parseFloat($("#koppl").val());

  if (!isNaN(koppl_input)) {
    koppl = koppl_input;
  }

  //felder leeren

  $("#x_min").val("");
  $("#x_max").val("");
  $("#y_min").val("");
  $("#y_max").val("");
  $("#gen_1").val("");
  $("#gen_2").val("");
  $("#max_iter").val("");
  $("#max_betrag").val("");
  $("#koppl").val("");
}
