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

  draw(imagePosition) {
    this.ctx.drawImage(
      this.image,
      this.imagePosition,
      0,
      this.width,
      this.height,
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.width,
      this.height
    );
  }

  /*void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
   */

  move() {
    //if(this.posY < 0){this.posY === 0}
    /*
      if (this.posY < this.posY0) {
        this.posY += this.velY;
        this.velY += gravity;
      } else {
        this.posY = this.posY0;
        this.velY = 1;
      }
      */
  }

  setListeners() {
    const limit = 100;
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.keys.TOP:
          this.imagePosition = 0;
          if (this.posY < this.height) {
              this.posY === this.posY + this.height;
            } else {
                this.posY -= 50;
            }
            break;
        case this.keys.LEFT:
          this.imagePosition = 50;
          if (this.posX < this.width) {
            this.posX = this.posX;
          } else {
            this.posX -= 50;
          }
          break;
        case this.keys.RIGHT:
          this.imagePosition = 100;
          if (this.posX > this.gameWidth - limit) {
            this.posX === this.posX;
          } else {
            this.posX += 50;
          }
          break;
        case this.keys.DOWN:
          this.imagePosition = 150;
          if (this.posY > this.gameHeight - limit) {
            this.posY === this.gameHeight - this.height;
          } else {
            this.posY += 50;
          }
          break;
      }
    });
  }
}
