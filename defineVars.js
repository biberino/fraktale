/**
Hier werden globale Varaiblen Definiert
**/

var x_min = -2;
var x_max = 1;
var y_min = -1;
var y_max = 1;

var x_sp = x_max - x_min;
var y_sp = y_max - y_min;

//var schrittWeite = 0.001;

var max_iter = 300;

var max_betrag = 2;
var max_betrag_2 = max_betrag * max_betrag;

var koppl = 0.5;


//generischer Input für diverses
var gen_1 = 0.0;
var gen_2 = 0.0;



var canvas = document.getElementById("myCanvas");
var layer = document.getElementById("layer2");
canvas.width = 1200;
canvas.height = 800;

layer.width = canvas.width;
layer.height = canvas.height;


/*** variablen fürs Buddhabrot (BETA) */

var pixel_array = [];

for (var i = 0; i < canvas.width; i++) {
    pixel_array[i] = [];
    for (var j = 0; j < canvas.height; j++) {
        pixel_array[i][j] = 0
    }
}

var max_iter_buddha = 100
var w_durch_x_sp;
var h_durch_y_sp;
/** */

var width = canvas.width;
var height = canvas.height;

var ctx = canvas.getContext("2d");
var id = ctx.createImageData(width, height);
var d = id.data;

var layerCtx = layer.getContext("2d");
var layerID = layerCtx.createImageData(width, height);
var layerData = layerCtx.data;

var zoomRect = {
    startPosX: 0,
    startPosY: 0,
    endPosX: 0,
    endPosY: 0,
    mouseDown: false

}

var fraktalFunction;
var iterationFunction;

//hashset für verschiedene aufgaben
var hashSet = {};

var farbenTabelle = {
    0: {
        r: 0,
        g: 0,
        b: 0
    },
    1: {
        r: 100,
        g: 0,
        b: 0
    },
    2: {
        r: 200,
        g: 0,
        b: 0
    },
    3: {
        r: 100,
        g: 50,
        b: 0
    },
    4: {
        r: 100,
        g: 100,
        b: 0
    },
    5: {
        r: 100,
        g: 200,
        b: 0
    },
    6: {
        r: 0,
        g: 100,
        b: 0
    },
    7: {
        r: 0,
        g: 200,
        b: 0
    },
    8: {
        r: 0,
        g: 100,
        b: 50
    },
    9: {
        r: 0,
        g: 100,
        b: 100
    },
    10: {
        r: 0,
        g: 100,
        b: 150
    },
    11: {
        r: 0,
        g: 100,
        b: 200
    },
    12: {
        r: 100,
        g: 0,
        b: 100
    },
    13: {
        r: 200,
        g: 0,
        b: 200
    },
    14: {
        r: 250,
        g: 0,
        b: 100
    },
    15: {
        r: 100,
        g: 100,
        b: 150
    },
    16: {
        r: 100,
        g: 150,
        b: 200
    },
    17: {
        r: 54,
        g: 59,
        b: 200
    },
    18: {
        r: 200,
        g: 74,
        b: 166
    },
    19: {
        r: 200,
        g: 181,
        b: 119
    },
    20: {
        r: 200,
        g: 144,
        b: 154
    }
}
