class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;
    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 50;
    this.height = 50;

    this.image = new Image();
    this.image.src = "./images/ranita.png";

    this.posX = this.gameWidth / 2 - this.width / 2;
    this.posY = this.gameHeight - this.height - 100;
    //this.posY0 = this.posY; Do I need this?

    this.keys = keys;
    this.velY = 1;
    this.setListeners();
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    //SET LIMITS
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
          if (this.posY < this.height) {
            this.posY === this.posY + this.height;
          } else {
            this.posY -= 50;
          }
          break;
        case this.keys.LEFT:
          if (this.posX < this.width){ 
            this.posX = this.posX;
          }else{
              this.posX -= 50;
          }
          break;
        case this.keys.RIGHT:
          if (this.posX > this.gameWidth - limit){
              this.posX === this.posX; //this.gameWidth
          } 
          else{
              this.posX += 50;
          }
          break;
        case this.keys.DOWN:
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
