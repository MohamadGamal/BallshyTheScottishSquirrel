var dimensions = new Size (750,500);
var level =0;
var board =levelGenerator(dimensions,1);
var canvas = document.getElementById("gamecanvas");

var ctx = canvas.getContext("2d");
var game = new Game(ctx ,dimensions, board);
var dx = 7
var dy = -2
var play = false;
document.getElementById("gamecanvas").addEventListener("click", togglePlaying, false);



function togglePlaying() {
	play = !play;
    var btn = document.getElementById("play-btn");
    var bg = document.getElementById("player-splash");
    var ctrl = document.getElementById("player-splash-control");
	if (play){
		startGame(game)
        btn.className = "icon-pause-2";
        bg.style.display = "none";
        ctrl.style.display = "none";
    }else{
        btn.className = "icon-play";
        bg.style.display = "block";
        ctrl.style.display = "block";
    }
}


function collisionDetecting(ball, bricks, board) {


	if(collisionDetectingBricks(ball, bricks))
		return;
	collisionDetectingFrames(ball, board);

}

function collisionDetectingFrames(ball, board) {

	var hitPoint;
	var allsides = [new Rect(0, 0, 4, game.dimensions.width), new Rect(0, 0, game.dimensions.width, 4), new Rect(game.dimensions.width, 0, 4, game.dimensions.height)];
	//var frame = this.frame

	// console.log("IN",hitPoint);
	for (var u = 0; u < allsides.length; u++) {

		hitPoint = ball.isInBoundsOf(allsides[u], new Accel(0, 0))

		if (hitPoint) {
			dx = hitPoint.dx
			dy = hitPoint.dy
			return;

		}
	}

	hitPoint = ball.isInBoundsOf(board.paddle.frame, board.paddle.accel)
	if (hitPoint) {
		dx = hitPoint.dx
		dy = hitPoint.dy
		return;
	}


}

function collisionDetectingBricks(ball, bricks) {
	//console.log(bricks)
	for (var c = 0; c < bricks.length; c++) {
		var b = bricks[c];
		//console.log(b)
		if (b.hit == false) {
			hitPoint = ball.isInBoundsOf(b.frame, new Accel(0, 0))
			if (hitPoint) {
				dx = hitPoint.dx
				dy = hitPoint.dy
				if(!b.unbreakable){
					b.strenght--;
				}
				if(b.strenght===0){
					b.hit=true;
					game.score += b.score
				}
				if(b.hasGift){
					var giftpos={x:b.frame.origin.x,y:b.frame.origin.y};
					game.nextgift=randomGift(giftpos);
				}

			}
		}
	}
}


function drawScore(ctx){
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("Score: "+game.score,8,20);
}

function calcBricksCount (bricks)
{		var count = 0
		for (var c = 0; c < bricks.length; c++) {
		var b = bricks[c];
		if (! b.unbreakable)
			count ++;
		}
		return count;
}

function calcBricksHit (bricks)
{		var count = 0
		for (var c = 0; c < bricks.length; c++) {
		var b = bricks[c];
		if (b.hit)
			count ++;
		}
		return count;
}

function win (bricks)
{
	return (calcBricksCount(bricks) == calcBricksHit(bricks))
}

function startGame(game)
{
		if (play) {
			this.game.ctx.clearRect(0, 0, this.game.dimensions.width, this.game.dimensions.height);
			this.board.ball.setold()
			this.game.board.ball.move(-dx, -dy);
			this.game.board.draw(this.game.ctx);
			
			updateScore(this.game.score);
			
			if(this.game.board.ball.top().y > (this.game.board.paddle.frame.origin.y + this.game.board.paddle.frame.size.height)){
				var ballX = this.game.board.ball.center.x;
				var ballY = this.game.board.ball.center.y;
				var paddleW = this.game.board.paddle.frame.size.width;
				var paddleX = this.game.board.paddle.frame.origin.x;
				var ballFall = checkBallFall(ballX, paddleW,this.game.dimensions.width);
				var paddleY = this.game.board.paddle.frame.origin.y;
				var paddleH=this.game.board.paddle.frame.size.height;
				var paddleDx = this.game.board.paddle.accel.dx; 
				var paddleAcc = this.game.board.paddle.limitx;
				//console.log("NULLIFIYING",this.game.board.ball.lasthittedrect)
				this.game.board.ball.lasthittedrect = null;
				//console.log("NULLIFIYED",this.game.board.ball.lasthittedrect)
				dx = 7;
				dy = 2;	
				this.game.board.lives --;
				updateLives(this.game.board.lives );
				if(outOflives(this.game.board.lives)){
					checkHighScore(this.game.score)
				}
				this.game.board.ball.place(ballFall , ballY -60)
				
				this.game.board.paddle.place(ballFall-(paddleW/2) ,(this.game.dimensions.height-paddleH))
				this.game.ctx.clearRect(paddleX -paddleDx,paddleY,paddleW + 10,paddleH)
				togglePlaying()
			}else{
				collisionDetecting(this.game.board.ball, this.game.board.bricks.bricks, this.game.board)
				if(win(this.game.board.bricks.bricks)){
					level++
					this.game.board=levelGenerator(this.game.dimensions,level)
					this.game.ctx.clearRect(0, 0, this.game.dimensions.width, this.game.dimensions.height)
					this.board.draw(this.game.ctx)
					togglePlaying()

				}else{
				requestAnimationFrame(startGame);
				}
			}
		}
}

function highScoreBadge (score)
{
		console.log("highScore")
}

function saveHighScore (score)
{
	var highscore = localStorage.getItem("highscore");
	if(highscore !== null){
   if (score > highscore) {
      localStorage.setItem("highscore", score );
      }
}else{
      localStorage.setItem("highscore", score );
}
}

function getHighScore ()
{
	var score = localStorage.highscore;
	return score;
}
function checkHighScore (score)
{
	var highScore = getHighScore()
	if(score > highScore || highScore === undefined){
		saveHighScore(score)
		highScoreBadge(score)
	}
}
function outOflives (lives)
{
	return (lives < 0)
}
