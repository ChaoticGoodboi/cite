// JavaScript source code
let canvas = document.getElementById("draw");
context = canvas.getContext("2d");
function f() {
    canvas.style = "background:#F08080";
}
let clickX = new Array();
let clickY = new Array();

let clickDrag = new Array();

let r = document.getElementById("red");
let g = document.getElementById("green"); 
let b = document.getElementById("blue");



let mouseX;
let mouseY;


let offsetLeft = canvas./*parentElement.*/offsetLeft;
let offsetTop = canvas./*parentElement.*/offsetTop;

let paint = false;
let color = "white";
let size = 5;


let log = document.getElementById('log');


canvas.addEventListener("mouseup", function (e) {
    log.innerHTML = "Waiting";
    paint = false;
    
});

canvas.addEventListener("mousedown", function (e) {
    //log.innerHTML = "you CLICKEd, bastard!"; //работает
    mouseX = e.pageX - this.offsetLeft /*- offsetLeft*/;
    mouseY = e.pageY - this.offsetTop /*- offsetTop*/;

    log.innerHTML = "you CLICKEd, bastard!"; //не работает
    paint = true;
    
    addClick(mouseX, mouseY);
    redraw();
   
});

canvas.addEventListener("mousemove", function (e) {
    
    if (paint) {
        //log.innerHTML = "You moved!";
        addClick(e.pageX - this.offsetLeft /*- offsetLeft*/, e.pageY - this.offsetTop/*- offsetTop*/);
        redraw();}
});


function addClick(x, y, dragging) {
    log.innerHTML = x.toString() + ", " + y.toString();
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    
    
    //log.innerHTML =  "rgb("+r.value.toString() + ", " + g.value.toString() + ", " + b.value.toString()+")";
    


    context.strokeStyle = "rgb(" + r.value.toString() + ", " + g.value.toString() + ", " + b.value.toString() + ")";
    context.lineJoin = "round";
    context.lineWidth = size;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i]- 1 , clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
    context.ClearRect(0, 0, canvas.width, canvas.height);
    //paint = false;
}

/*var ClearButton = document.getElementById("clear"); /*TODO - add the button id 
ClearButton.addEventListener("mousedown", Clear());*/
function Clear() {
    log.innerHTML = "Button Clear Pressed";
    //document.write("yeet");
    context.clearRect(0, 0, canvas.width, canvas.height);
    clickX = [];
    clickY = [];
}

function ChangeColor(colorInput) {
    this.color = colorInput;
}

