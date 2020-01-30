class Bridge {
  constructor(ctx, width, height, isReverse, gameWidth) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;

    this.bridgesPosY = [100, 150, 200, 250];
    this.posY = this.bridgesPosY[Math.floor(Math.random() * this.bridgesPosY.length)];

    //images for bridges
    var img1 = new Image();
    img1.src = "./images/log100.png";

    var img2 = new Image();
    img1.src = "./images/log150.png";

    var img3 = new Image();
    img1.src = "./images/log200.png";

    var img4 = new Image();
    img1.src = "./images/log250.png";

    this.bridgesWidth = [100, 150, 200, 250];
    this.width = this.bridgesWidth[Math.floor(Math.random() * this.bridgesWidth.length)];
    // this.width = this.bridgesWidth[Math.floor(Math.random() * (3) + 1)];

    this.height = height;
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
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  move() {
    if (this.isReverse) {
      this.posX += this.velX;
    } else {
      this.posX -= this.velX;
    }
  }
}
