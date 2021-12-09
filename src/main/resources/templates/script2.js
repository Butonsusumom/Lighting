var text = document.getElementById('text');
var button = document.getElementById('button');
var layout = document.getElementById('layout');
var val = document.getElementById('val');
var mode = 0;

var text = document.getElementById('text');
var button = document.getElementById('button');
var layout = document.getElementById('layout');
var val = document.getElementById('val');
var mode = 0;
var k = val.innerHTML / 100 - 1;

var pinkB = '#fea7c1';
var pinkC = '#c72e3b';
var blueB = '#4651ca';
var blueC = '#e0d2f6';
var redB = '#d54247';
var redC = '#fdad95';
var violetB = '#7869bc';
var violetC = '#d9c3d9';


var color = localStorage.getItem("color");
if (color !== null) var currCol = color;
else var currCol = pinkB;
var text = localStorage.getItem("text");
if (text !== null) var currText = text;
else var currText = pinkC;


button.addEventListener("click", function () {
    mode = (mode + 1) % 4;

    if (mode == 0) { //pink
        layout.style.color = pinkC;
        button.style.backgroundColor = pinkC;
        currCol = pinkB;
        currText = pinkC;
    }

    if (mode == 1) {  // blue
        layout.style.color = blueC;
        button.style.backgroundColor = blueC;
        currCol = blueB;
        currText = blueC;
    }

    if (mode == 2) {  // red
        layout.style.color = redC;
        button.style.backgroundColor = redC;
        currCol = redB;
        currText = redC;
    }

    if (mode == 3) {  // violet
        layout.style.color = violetC;
        button.style.backgroundColor = violetC;
        currCol = violetB;
        currText = violetC;
    }

})

const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    if (!this.pSBCr) this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
            [r, g, b, a] = d = d.split(","), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
            else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        }
        return x
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? {
        r: 0,
        g: 0,
        b: 0,
        a: -1
    } : {r: 255, g: 255, b: 255, a: -1}, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}

window.setInterval(function () {
    layout.style.backgroundColor = pSBC(k, currCol);
    button.style.color = pSBC(k, currCol);

    layout.style.color = currText;
    button.style.backgroundColor = currText;

}, 100);


window.onbeforeunload = function () {
    localStorage.setItem("color", currCol);
    localStorage.setItem("text", currText);
}

window.document.onload = function () {

    var color = localStorage.getItem("color");
    if (color !== null) currCol = color;
    var text = localStorage.getItem("text");
    if (text !== null) currText = text;
}


/*//const imageFrame = document.getElementById("image-frame");

//const socket = new WebSocket("ws://195.2.92.124:80/socket");
const socket = new WebSocket("ws://localhost:8081/socket");
//socket.binaryType = "arraybuffer";

socket.onopen = function (event) {
    alert("WebSocket connection has been established successfully")
    socket.send("Hey, send me some pictures");
};

socket.onmessage = function (event) {
    if (event.data instanceof String) {
        alert(event.data);
        //setCurrentImage(event.data);
    }
};*/
