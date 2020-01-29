class House {
    constructor(ctx, w, h, imgSource) {
      this.ctx = ctx;
      this.imageSize = 50;

      this.width = this.imageSize;
      this.height = this.imageSize;
  
      this.image = new Image();
      this.image.src = "./images/house.png";
      this.imagePosition = 0;
  
      this.posX = this.posX;
      this.posY = 0;
    }
  
    draw(posX, posY, imagePosition) {
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
    }
  }
  
  