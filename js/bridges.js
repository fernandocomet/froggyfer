class Bridge {
  constructor(ctx, width, isReverse, gameWidth) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;

    this.bridgesPosY = [100, 150, 200, 250];

    this.randomNumber = Math.randomInt(0,3)
    this.posY = this.bridgesPosY[this.randomNumber];

    //image for bridges
    this.img = new Image();
    this.img.src = "./images/log100.png";

    this.width = width;
    this.height = 48;
    this.velX = 2; //easy 3

    switch (this.posY) {
      case 100:
        this.isReverse = true;
        this.posX = -this.width;
        break;
      case 150:
        this.isReverse = false;
        this.posX = this.gameWidth;
        break;
      case 200:
        this.isReverse = true;
        this.posX = -this.width;
        break;
      case 250:
        this.isReverse = false;
        this.posX = this.gameWidth;
        break;
      default:
        this.isReverse = false;
        this.posX = this.gameWidth;
    }

    /*Hay cuatro filas
      1 - hacia la dcha
      2 - hacia la izda
      3 - hacia la dcha
      4 - hacia la izda
      */
  }

  draw() {
    this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }

//   draw() {
//     this.ctx.fillStyle = "white";
//     this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
//   }

  move() {
    if (this.isReverse) {
      this.posX += this.velX;
    } else {
      this.posX -= this.velX;
    }
  }
}
