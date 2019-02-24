/*
 * GLOBAL VARIABLES
*/ 

let lineBottom, lineWidth, lineBegin, lineEnd, lineColor, lineSize;
let p1x, p1y, p2x, p2y, p1YSpeed, p2YSpeed, playerSize, playerMargin, initialY;
let p1ShieldRadius, p2ShieldRadius, initialShieldRadius, shieldRate, p1Shielding, p2Shielding;
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

    initialShieldRadius = p1ShieldRadius = p2ShieldRadius = playerSize * 0.85;
    shieldRate = 0.25;
    p1Shielding = p2Shielding = false;

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

function keyReleased() {
    if (keyCode == 83 && p1Shielding) p1Shielding = false;
    if (keyCode == DOWN_ARROW && p2Shielding) p2Shielding = false;
  }

function activateShield() {
    if (keyIsDown(83) && !p1Shielding) p1Shielding = true;
    if (keyIsDown(DOWN_ARROW) && !p2Shielding) p2Shielding = true;
}

/*
 * GAME FUNCTIONS
*/

function depleateShield() {
    if (p1Shielding && p1ShieldRadius >= 0) p1ShieldRadius -= shieldRate;
    else if (p1ShieldRadius <= initialShieldRadius) p1ShieldRadius += shieldRate;
    if (p2Shielding && p2ShieldRadius >= 0) p2ShieldRadius -= shieldRate;
    else if (p2ShieldRadius <= initialShieldRadius) p2ShieldRadius += shieldRate;
}

/*
 * DRAW FUNCTIONS
*/

function drawShield() {
    if (p1Shielding) {
        fill(255,0,0,150);
        noStroke();
        circle(p1x + playerSize/2, p1y - playerSize/2, p1ShieldRadius);
    }
    if (p2Shielding) {
        fill(0,0,255,150);
        noStroke();
        circle(p2x + playerSize/2, p2y - playerSize/2, p2ShieldRadius);
    }
}

function drawLine() {
    stroke(lineColor);
    line(lineBegin, lineBottom, lineEnd, lineBottom);
}

function drawPlayers() {
    fill(255,255,255);
    square(p1x, p1y - playerSize, playerSize);
    square(p2x, p2y - playerSize, playerSize);
}

function draw() {
    background(50);
    drawLine();
    drawPlayers();
    activateShield();
    drawShield();
    depleateShield()
    applySpeed();
    applyGravity();
}
