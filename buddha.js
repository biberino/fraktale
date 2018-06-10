/** implementiert buddhabrot (BETA) */

function reset_pixel_array() {
    for (var i = 0; i < canvas.width; i++) {
        for (var j = 0; j < canvas.width; j++) {
            pixel_array[i][j] = 0;
        }
    }
}

function calc_global_const() {
    x_sp = x_max - x_min;
    y_sp = y_max - y_min;
    w_durch_x_sp = width / x_sp
    h_durch_y_sp = height / y_sp

}

/**
 * Berechnet zu einem gegebenen Punkt {a,b} den "abdruckt" auf das Pixel Array.
 * Beachtet die Grenzen x_min, x_max, y_min, y_max
 * Beachtet max_iter_buddha
 * 
 */
function mandelbrot_buddha(rnd_point) {
    var ca = rnd_point.a;
    var cb = rnd_point.b;

    var za = 0;
    var zb = 0;
    var buffer

    var divergiert = false

    //prüfe auf divergenz
    for (var k = 0; k < max_iter_buddha; k++) {

        buffer = mandelbrot(za, zb, ca, cb);
        za = buffer.a;
        zb = buffer.b;

        if (betragHochZwei(za, zb) > max_betrag_2) {
            divergiert = true;
            break
        }
    }

    //eigentliche Pfadberechnung

    if (divergiert) {
        for (var k = 0; k < max_iter_buddha; k++) {

            buffer = mandelbrot(za, zb, ca, cb);
            za = buffer.a;
            zb = buffer.b;

            //unendlich
            if ((za === Infinity) || (zb === Infinity)) {
                break
            }

            //keine funktionsaufrufe zwecks performance
            var px = Math.round((za - x_min) * w_durch_x_sp);
            var py = Math.round(((y_min - zb) * h_durch_y_sp) + height);
            if ((px >= 0) && (px < width)) {
                if ((py >= 0) && (py < height)) {
                    //punkt darstellbar
                    pixel_array[px][py]++
                }
            }

        }
    }
}


/**
 * Berechnet zu einem gegebenen Punkt {a,b} den "abdruckt" auf das Pixel Array.
 * Beachtet die Grenzen x_min, x_max, y_min, y_max
 * Beachtet max_iter_buddha
 * 
 */
function anti_mandelbrot_buddha(rnd_point) {
    var ca = rnd_point.a;
    var cb = rnd_point.b;

    var za = 0;
    var zb = 0;
    var buffer
    var convergiert = true

    //var divergiert = false
    var visited_points = []

    for (var k = 0; k < max_iter_buddha; k++) {
        buffer = mandelbrot(za, zb, ca, cb);


        za = buffer.a;
        zb = buffer.b;
        visited_points.push({ a: za, b: zb })


        if (betragHochZwei(za, zb) > max_betrag_2) {
            convergiert = false;
            break
        }
    }

    //eigentliche Pfadberechnung

    if (convergiert) {
        for (var k = 0; k < max_iter_buddha; k++) {
            var px = Math.round((visited_points[k].a - x_min) * w_durch_x_sp);
            var py = Math.round(((y_min - visited_points[k].b) * h_durch_y_sp) + height);
            if ((px >= 0) && (px < width)) {
                if ((py >= 0) && (py < height)) {
                    //punkt darstellbar
                    pixel_array[px][py]++
                }
            }
        }

    }
}


/**
 * Berechnet zu einem gegebenen Punkt {a,b} den "abdruckt" auf das Pixel Array.
 * Beachtet die Grenzen x_min, x_max, y_min, y_max
 * Beachtet max_iter_buddha
 * 
 */
function anti_auge_buddha(rnd_point) {
    var ca = rnd_point.a;
    var cb = rnd_point.b;

    var za = 0;
    var zb = 0;
    var buffer
    var convergiert = true

    //var divergiert = false
    var visited_points = []

    for (var k = 0; k < max_iter_buddha; k++) {
        buffer = mandelbrotKonjugiert(za, zb, ca, cb);


        za = buffer.a;
        zb = buffer.b;
        visited_points.push({ a: za, b: zb })


        if (betragHochZwei(za, zb) > max_betrag_2) {
            convergiert = false;
            break
        }
    }

    //eigentliche Pfadberechnung

    if (convergiert) {
        for (var k = 0; k < max_iter_buddha; k++) {
            var px = Math.round((visited_points[k].a - x_min) * w_durch_x_sp);
            var py = Math.round(((y_min - visited_points[k].b) * h_durch_y_sp) + height);
            if ((px >= 0) && (px < width)) {
                if ((py >= 0) && (py < height)) {
                    //punkt darstellbar
                    pixel_array[px][py]++
                }
            }
        }

    }
}

/**
 * Berechnet zu einem gegebenen Punkt {a,b} den "abdruckt" auf das Pixel Array.
 * Beachtet die Grenzen x_min, x_max, y_min, y_max
 * Beachtet max_iter_buddha
 * 
 */
function anti_auge_buddha_zwilling(rnd_point) {
    var ca = rnd_point.a;
    var cb = rnd_point.b;

    var za = 0.0;
    var zb = 0.0;

    var zza = 0.0;
    var zzb = 0.0;

    var buffer
    var convergiert = true

    //var divergiert = false
    var visited_points = []

    for (var k = 0; k < max_iter_buddha; k++) {
        buffer = augeZwilling(za, zb, zza, zzb, ca, cb);
        za = buffer.a1;
        zb = buffer.b1;
        zza = buffer.a2;
        zzb = buffer.b2;

        visited_points.push({ a: za, b: zb })
        visited_points.push({ a: zza, b: zzb })


        if (betragHochZwei(za, zb) > max_betrag_2 && betragHochZwei(zza, zzb) > max_betrag_2) {
            return
        }

        if (isNaN(za) || isNaN(zb) || isNaN(zza) || isNaN(zzb)) {
            return
        }

    }
    //eigentliche Pfadberechnung

    if (convergiert) {
        for (var k = 0; k < max_iter_buddha * 2; k++) {
            var px = Math.round((visited_points[k].a - x_min) * w_durch_x_sp);
            var py = Math.round(((y_min - visited_points[k].b) * h_durch_y_sp) + height);
            if ((px >= 0) && (px < width)) {
                if ((py >= 0) && (py < height)) {
                    //punkt darstellbar
                    pixel_array[px][py]++
                }
            }
        }

    }
}




/* scaliert werte im pixelarray auf a-b grauwerte und zeichnet auf canvas */
function draw_pixel_array(a, b) {
    var min = -1
    var max = -1

    for (var i = 0; i < canvas.width; i++) {
        for (var j = 0; j < canvas.width; j++) {
            var buffer = pixel_array[i][j];
            if ((min == -1) || (buffer < min)) {
                min = buffer;
            }
            if ((max == -1) || (buffer > max)) {
                max = buffer;
            }
        }
    }

    console.log("MIN: " + min + "MAX " + max);

    var factor = (b - a) / (max - min)

    for (var i = 0; i < canvas.width; i++) {
        for (var j = 0; j < canvas.width; j++) {
            var buffer
            if (pixel_array[i][j] == 0) {
                buffer = 0
            } else {
                buffer = (pixel_array[i][j] - min) * factor + a;
            }


            point(i, j, buffer, buffer, buffer)
        }
    }

    draw()

}


/* O(num_points*max_iter_budha)*/
function run_buddha(num_points) {
    reset_pixel_array()
    calc_global_const()

    for (var i = 0; i < num_points; i++) {
        mandelbrot_buddha({ a: (Math.random() * 4) - 2, b: (Math.random() * 4) - 2 })
        if ((i % 1000000) == 0) {
            console.log(((i / num_points) * 100) + " %");

        }

    }
    draw_pixel_array()
}

/* O(num_points*max_iter_budha)*/
function run_anti_buddha(num_points) {
    var m = new MersenneTwister();

    reset_pixel_array()
    calc_global_const()

    for (var i = 0; i < num_points; i++) {
        anti_mandelbrot_buddha({ a: (m.random() * 3) - 2, b: (m.random() * 2) - 1 })
        if ((i % 1000000) == 0) {
            console.log(((i / num_points) * 100) + " %");

        }

    }
    draw_pixel_array()
}


/* O(num_points*max_iter_budha)*/
function run_anti_auge(num_points) {
    var m = new MersenneTwister();

    reset_pixel_array()
    calc_global_const()

    for (var i = 0; i < num_points; i++) {
        anti_auge_buddha({ a: (m.random() * 3) - 2, b: (m.random() * 2) - 1 })
        if ((i % 1000000) == 0) {
            console.log(((i / num_points) * 100) + " %");

        }

    }
    draw_pixel_array()
}

/* O(num_points*max_iter_budha)*/
function run_anti_auge_zwilling(num_points) {
    var m = new MersenneTwister();

    reset_pixel_array()
    calc_global_const()

    for (var i = 0; i < num_points; i++) {
        anti_auge_buddha_zwilling({ a: (m.random() * 3) - 2, b: (m.random() * 2) - 1 })
        if ((i % 1000000) == 0) {
            console.log(((i / num_points) * 100) + " %");

        }

    }
    draw_pixel_array(25, 200)
}