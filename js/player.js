class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;
    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 50;
    this.height = 50;

    this.image = new Image();
    // this.image.src = "./images/player.png";
    this.image.src = "./images/playersprite.png";
    this.imagePosition = 0;

    this.posX = this.gameWidth / 2 - this.width / 2;
    this.posY = this.gameHeight - this.height - 100;

    this.keys = keys;
    this.velY = 1;
    this.setListeners();
  }

  draw(posX, posY,imagePosition) {
    console.log();
    this.ctx.drawImage(
      this.image,
      imagePosition,
      0,
      this.width,
      this.height,
      posX,
      posY,
      this.width,
      this.height
    );
  }

  move() {
    const limit = 100;
    // if (this.posY < this.height) {
    //   //Top limit
    //   this.posY === this.posY + this.height;
    // } else if (this.posX < this.width) {
    //   //Left limit
    //   this.posX = this.posX;
    // } else if (this.posX > this.gameWidth - limit) {
    //   //Right limit
    //   this.posX === this.posX;
    // } else if (this.posY > this.gameHeight - limit) {
    //   //Down limit
    //   this.posY === this.gameHeight - this.height;
    // }
  }

  setListeners() {
    document.addEventListener("keydown", e => {
     //debugger;
      switch (e.keyCode) {
        case this.keys.TOP:
          this.imagePosition = 0;
          this.posY -= 50;
          
          break;
        case this.keys.LEFT:
          this.imagePosition = 50;
          this.posX -= 50;
          break;
        case this.keys.RIGHT:
          this.imagePosition = 100;
          this.posX += 50;
          break;
        case this.keys.DOWN:
          this.imagePosition = 150;
          this.posY += 50;
          break;
      }
    });
  }
}
