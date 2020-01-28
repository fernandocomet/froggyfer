class Obstacle {
    constructor(ctx, width, height, isReverse) {    
      this.ctx = ctx;
      let randomBoolean = Math.random() >= 0.5;
      //this.isReverse = isReverse;
      if(randomBoolean === true){
          this.posX = game.width;
          isReverse === true;
        }else{
          this.posX = -490;
          isReverse === false;
        }
      this.obstaclesPosY = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
    //   this.obstaclesPosY = [10, 50, 110, 160, 210, 260, 310, 360, 410, 460];

      this.posY = this.obstaclesPosY[Math.floor(Math.random()*this.obstaclesPosY.length)];
      this.width = width;
      this.height = height;

  
      this.velX = 3;
    }

    calculateRandom(){
        let randomBoolean = Math.random() >= 0.5;
    }
  
    draw() {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
  
    move() {
    if(this.isReverse){
        this.posX += this.velX;
        console.log("a dcha");
    }else{
        this.posX -= this.velX;
        console.log("a izda");
    }
  }
}

let randomBoolean = Math.random() >= 0.5;
console.log(randomBoolean);