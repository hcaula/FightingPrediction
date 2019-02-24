/*
 * GLOBAL VARIABLES
*/ 

let lineBottom, lineWidth, lineBegin, lineEnd, lineColor, lineSize;
let p1x, p1y, p2x, p2y, p1YSpeed, p2YSpeed, playerSize, playerMargin, initialY;
let gravitySpeed, jumpSpeed;

/*
 * SETUP FUNCTION
*/

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    lineBottom = window.innerHeight * 0.85;
    lineWidth = 0.8;
    lineBegin = window.innerWidth * (1 - lineWidth)/2;
    lineEnd = window.innerWidth - lineBegin;
    lineColor = 200;
    lineSize = lineEnd - lineBegin; 

    playerSize = 100;
    playerMargin = 0.2;
    p1x = (lineBegin + lineSize * playerMargin) - (playerSize/2);
    p2x = (lineEnd - lineSize * playerMargin) - (playerSize/2);
    p1y = p2y = initialY = lineBottom - 1;
    p1YSpeed = p2YSpeed = 0;

    gravitySpeed = 2;
    jumpSpeed = 35;
}


/* 
 * PHYSICS FUNCTIONS 
*/

function jump(player) {
    if (player == "p1") p1YSpeed = jumpSpeed;
    else if (player == "p2") p2YSpeed = jumpSpeed;
}

function applySpeed() {
    p1y -= p1YSpeed;
    p2y -= p2YSpeed;  
}

function applyGravity() {
    if (p1y < initialY) p1YSpeed -= gravitySpeed;
    else {
        p1YSpeed = 0;
        p1y = initialY;
    }
    if (p2y < initialY) p2YSpeed -= gravitySpeed;
    else {
        p2YSpeed = 0;
        p2y = initialY;
    }
}

/* 
 * INPUT FUNCTIONS 
*/

function keyPressed() {
    if (keyCode == 87 && p1y >= initialY) jump("p1");
    else if (keyCode == UP_ARROW  && p2y >= initialY) jump("p2");
}

/*
 * DRAW FUNCTIONS
*/

function drawLine() {
    line(lineBegin, lineBottom, lineEnd, lineBottom);
    stroke(lineColor);
}

function drawPlayers() {
    square(p1x, p1y - playerSize, playerSize);
    square(p2x, p2y - playerSize, playerSize);
}

function draw() {
    background(50);
    drawLine();
    drawPlayers();
    applySpeed();
    applyGravity();
}
