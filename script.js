const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
const ctxBorder = canvas.getContext('2d');
let startMenuActive = false;
let gameOver = false;
let thrust = 4.5;
let gravity = 9.81;
let mass = 0.050;
let weight = mass * 9.8; 
let force = thrust - mass;
let acceleration = force / mass
let points = 0;
let rocket;

class Rocket {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 150;
        this.ySpeed = gravity;
        this.angle = 0;
    }
    show() {
        if(!startMenuActive) {
        ctx.rotate(this.angle / 180);
        //Body
        ctx.fillStyle = 'white';
        ctx.fills;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        //Interstage
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, 20);

        //Gridfins right
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x+10, this.y+22, 10, 3);

        //Gridfins left
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x-10, this.y+22, 10, 3);

        //Thrust
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y+150, this.w, thrust*2.5);
        }
    }
    update() {
        if(this.y <= 590) {
            this.y += gravity / 2 - thrust;
        }
        else {
            gameOver = true;
            thrust = 0;

            //Gameover text
            ctx.fillStyle = 'Black';
            ctx.font = "50px Verdana"; 
            ctx.fillText("Game Over", 260 ,300);
        }
    }
}

window.onload = function() {
    start();
    setInterval(update, 10);
}

function start() {
    rocket = new Rocket(400,50);
}

function update() {
    if(!gameOver) {
        canvas.width = canvas.width;

        //Ground
        ctx.fillStyle = 'blue';
        ctx.fillRect(0,750,800,50);
    
        //Ship
        ctx.fillStyle = 'rgb(19, 61, 77)';
        ctx.fillRect(330,740,150,10);

        //Rocket
        rocket.show();
        rocket.update();
    
        //ThrustText
        ctx.fillStyle = 'yellow';
        ctx.font = "30px Arial";
        ctx.fillText((thrust * 10).toFixed(0), 10,50);

        //Points
        ctx.font = "30px Arial";
        ctx.fillText((points / 100000).toFixed(3), 10,100);
    
        //Rocket Movement
        points++;

    }
    else {
        ctx.fillStyle = 'black';
        ctx.font = "30px Arial";
        rect = {
            x: 350,
            y: 350
        };
        ctx.fillText("Restart", rect.x, rect.y + 16);
    }
}

//Listen for keystrokes from keyboard
function keyPressedDown(e) {
    var key = e.keyCode;
    switch (key) {
        case 16: if(thrust <= 9) thrust += 0.1; break;
        case 17: if(thrust > 0) thrust -= 0.1; break;
        case 32: if(thrust > 0) {
            thrust = 0; // should only impact thrust, not speed
        }
        else {
            thrust = 10;
        }
        case 65: rocket.angle -= 0.1;
        case 68: rocket.angle += 0.1;
    }
}

//Function to get the mouse position
function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function checkIfUserPressedRestartOrQuit(e) {
    var clickCord = getMousePos(e);

    if(clickCord.x >= 350 && clickCord.x <= 450 &&
       clickCord.y >=  340 && clickCord.y <= 370) {
            gameOver = false;
            rocket.x = 400;
            rocket.y = 50;
            thrust = 4.5;
            rocket.ySpeed = gravity;
            points = 0;
    }

    // if (clickCord.x >= rect.x && clickCord.x <= rect.x + rect.w &&
    //     clickCord.y >= rect.y && clickCord.y <= rect.y + rect.h) {
            

    // }
}

canvas.addEventListener('click', checkIfUserPressedRestartOrQuit, false);
document.onkeydown = keyPressedDown;