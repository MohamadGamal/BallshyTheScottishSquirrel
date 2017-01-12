var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", startPlaying, false);

var x = canvas.width / 2;
var y = canvas.height - 30;

var speed=4;
var dx = speed, dy = -speed;
var ballraduis =10;

var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks=[];
var score=0;
var lives = 3;
var start = false;
function startPlaying(){
    start = true;
    draw();
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawScore(){
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("Score: "+score,8,20);
}
for(var c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for(var r=0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0,status:1};
    }
}
function collisionDetectingBricks() {
    for(var c=0;c<brickColumnCount;c++){
        for(var r=0;r<brickRowCount;r++){
            var b=bricks[c][r];
            if(b.status==1 && ball.isInBoundsOf(b[c][r])){
                    ball.dy=-ball.dy;
                    b.hit()
                    console.log("BETENGAN")
                 //   score++;
                  //  if(score==brickRowCount*brickColumnCount){
                  //      alert("YOU WIN, CONGRATULATIONS!");
                   //     document.location.reload();
                   // }
                }
            }
        }
    }
    

collisionDetectingPaddle();
collisionDetectingSides();
function collisionDetectionMain(){
    
collisionDetectingBricks();
collisionDetectingPaddle();
collisionDetectingSides();

}
function drawBricks() {
    for(var c=0;c<brickColumnCount;c++){
        for(var r=0;r<brickRowCount;r++){
            if(bricks[c][r].status==1) {
                var brickX = (c * (brickWidth + brickPadding) + brickOffsetLeft);
                var brickY = (r * (brickHeight + brickPadding) + brickOffsetTop);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095dd";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width-paddleWidth) {
        paddleX = relativeX;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballraduis, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetectionMain();
    if (x + dx > canvas.width - ballraduis || x + dx < ballraduis) {
        dx = -dx;
    }
    if (y + dy < ballraduis) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballraduis) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            start = false;
            requestAnimationFrame(draw);
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = speed;
                dy = -speed;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    if(start)
        requestAnimationFrame(draw);
}
draw();
