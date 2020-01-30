class Bridge {
  constructor(ctx, width, isReverse, gameWidth) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;

    this.bridgesPosY = [100, 150, 200, 250];

    //Random number between 0-3
    this.randomNumber = Math.randomInt(0,3)
    this.posY = this.bridgesPosY[this.randomNumber];
    //this.posY = this.bridgesPosY[Math.floor(Math.random() * this.bridgesPosY.length)];

    //images for bridges
    this.img = new Image();
    // this.imgArr = ["./images/log100.png", "./images/log150.png"]
    // this.img.src = this.imgArr[Math.randomInt(0,1)];
    this.img.src = "./images/log100.png";

    /*this.img2 = new Image();
    this.img2.src = "./images/log150.png";

    this.img3 = new Image();
    this.img3.src = "./images/log200.png";

    this.img4 = new Image();
    this.img4.src = "./images/log250.png";

    this.imgArr = [this.img1, this.img2, this.img3, this.img4];
    //this.img =  this.imgArr[Math.floor(Math.random()*this.imgArr.length)]
    this.img = this.imgArr[this.randomNumber];

    // if(this.bridgesPosY === 100){this.img === this.imgArr[0]}
    // if(this.bridgesPosY === 150){this.img === this.imgArr[1]}
    // if(this.bridgesPosY === 200){this.img === this.imgArr[2]}
    // if(this.bridgesPosY === 250){this.img === this.imgArr[3]}
    //////////////*/

    /*
    this.bridgesWidth = [100, 150, 200, 250];
    this.width = this.bridgesWidth[Math.floor(Math.random() * this.bridgesWidth.length)];
    // this.width = this.bridgesWidth[Math.floor(Math.random() * (3) + 1)];
    */

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
