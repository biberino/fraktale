function normal_iteration(ca, cb) {
    var za = 0.0;
    var zb = 0.0;
    var buffer;

    for (var k = 0; k < max_iter; k++) {

        buffer = fraktalFunction(za, zb, ca, cb);
        za = buffer.a;
        zb = buffer.b;

        if (betragHochZwei(za, zb) > max_betrag_2) {
            //skaliere k zwischen 0 255
            //TODO hier farbe wählen
            var farbe = (k / max_iter) * 255;
            return { r: farbe, g: farbe, b: farbe };
        }
    }

    var betrag = Math.sqrt(betragHochZwei(za, zb));
    var farbe = betrag / max_betrag * 255;

    return { r: 0, g: 0, b: farbe };

}

function julia_iteration(ca, cb) {
    var za = ca;
    var zb = cb;
    var buffer;

    for (var k = 0; k < max_iter; k++) {

        buffer = fraktalFunction(za, zb, gen_1, gen_2);
        za = buffer.a;
        zb = buffer.b;

        if (betragHochZwei(za, zb) > max_betrag_2) {
            //skaliere k zwischen 0 255
            //TODO hier farbe wählen
            var farbe = (k / max_iter) * 255;
            return { r: farbe, g: farbe, b: farbe };
        }
    }

    var betrag = Math.sqrt(betragHochZwei(za, zb));
    var farbe = betrag / max_betrag * 255;

    return { r: 0, g: 0, b: farbe };

}


function normal_iteration_zwilling(ca, cb) {
    var za = 0.0;
    var zb = 0.0;

    var zza = 0.0;
    var zzb = 0.0;

    var buffer;
    /**
      za = 0.0; //realAnteil
      zb = 0.0; //imaginärAnteil
      zza = 0.0;
      zzb = 0.0;
      **/

    for (var k = 0; k < max_iter; k++) {

        buffer = zwilling(za, zb, zza, zzb, ca, cb);
        za = buffer.a1;
        zb = buffer.b1;
        zza = buffer.a2;
        zzb = buffer.b2;

        if (betragHochZwei(za, zb) > max_betrag_2 && betragHochZwei(zza, zzb) > max_betrag_2) {
            //skaliere k zwischen 0 255
            //TODO hier farbe wählen
            if (!(hashSet[k] === true)) {
                console.log(`Iteration nach ${k} abgeborchen`);
                hashSet[k] = true;
            }

            if (farbenTabelle.hasOwnProperty(k)) {
                return farbenTabelle[k];
            }
            var farbe = (k / max_iter) * 255;
            return { r: farbe, g: farbe, b: farbe };
        }

        if (isNaN(za) || isNaN(zb) || isNaN(zza) || isNaN(zzb)) {
            if (!(hashSet[k] === true)) {
                console.log(`Iteration nach ${k} abgeborchen`);
                hashSet[k] = true;
            }
            if (farbenTabelle.hasOwnProperty(k)) {
                return farbenTabelle[k];
            }
            var farbe = (k / max_iter) * 255;
            return { r: farbe, g: farbe, b: farbe };
        }

    }

    var betrag1 = Math.sqrt(betragHochZwei(za, zb));
    var betrag2 = Math.sqrt(betragHochZwei(zza, zzb));

    if (betrag1 > max_betrag) {
        var farbe3 = 255;
    }

    if (betrag2 > max_betrag) {
        var farbe3 = 255;
    }

    if (betrag1 < max_betrag && betrag2 < max_betrag) {
        var farbe3 = 0;
    }
    var farbe1 = betrag1 / max_betrag * 255;
    var farbe2 = betrag2 / max_betrag * 255;
    //var naheNull = 0;
    return { r: farbe1, g: farbe2, b: farbe3 };

}

function julia_iteration_zwilling(ca, cb) {

    //var offset = komplexHochKomplex(ca,cb,1,3)
    //offset.a = (ca * ca - cb * cb)
    //offset.b = (2 * ca * cb)

    var numbers = new Set()

    var za = ca;
    var zb = cb;

    var zza = ca;
    var zzb = cb;

    var buffer;
    /**
      za = 0.0; //realAnteil
      zb = 0.0; //imaginärAnteil
      zza = 0.0;
      zzb = 0.0;
      **/

    for (var k = 0; k < max_iter; k++) {



        buffer = zwilling(za, zb, zza, zzb, gen_1, gen_2);
        za = buffer.a1;
        zb = buffer.b1;
        zza = buffer.a2;
        zzb = buffer.b2;

        if (betragHochZwei(za, zb) > max_betrag_2 && betragHochZwei(zza, zzb) > max_betrag_2) {
            //skaliere k zwischen 0 255
            //TODO hier farbe wählen
            if (!(hashSet[k] === true)) {
                console.log(`Iteration nach ${k} abgeborchen`);
                hashSet[k] = true;
            }

            if (farbenTabelle.hasOwnProperty(k)) {
                return farbenTabelle[k];
            }
            var farbe = (k / max_iter) * 255;
            return { r: farbe, g: farbe, b: farbe };
        }

        if (isNaN(za) || isNaN(zb) || isNaN(zza) || isNaN(zzb)) {
            if (!(hashSet[k] === true)) {
                console.log(`Iteration nach ${k} abgeborchen`);
                hashSet[k] = true;
            }
            /**
            if (farbenTabelle.hasOwnProperty(k)) {
              return farbenTabelle[k];
            }
            **/
            var farbe = (k / max_iter) * 255;
            return { r: farbe, g: farbe, b: farbe };
        }

    }

    var betrag1 = Math.sqrt(betragHochZwei(za, zb));
    var betrag2 = Math.sqrt(betragHochZwei(zza, zzb));

    if (betrag1 > max_betrag) {
        var farbe3 = 255;
    }

    if (betrag2 > max_betrag) {
        var farbe3 = 255;
    }

    if (betrag1 < max_betrag && betrag2 < max_betrag) {
        var farbe3 = 0;
    }
    var farbe1 = betrag1 / max_betrag * 255;
    var farbe2 = betrag2 / max_betrag * 255;
    //var naheNull = 0;
    return { r: farbe1, g: farbe2, b: farbe3 };

}

function zwilling(x1, y1, x2, y2, cx, cy) {

    var z1 = fraktalFunction(x1, y1, cx, cy)
    var z2 = fraktalFunction(x2, y2, cx, cy)
    //var buffer = {}
    z1.a += (koppl * x2)
    z1.b += (koppl * y2)

    z2.a -= (koppl * x1)
    z2.b -= (koppl * y1)

    return { a1: z1.a, b1: z1.b, a2: z2.a, b2: z2.b }
}