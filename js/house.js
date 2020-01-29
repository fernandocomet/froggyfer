class House {
    constructor(ctx, w, h, imgSource) {
      this.ctx = ctx;
      this.imageSize = 50;

      this.width = this.imageSize;
      this.height = this.imageSize;
  
      this.image = new Image();
      this.image.src = imgSource;
      this.imagePosition = 0;
  
      this.posX = 0;
      this.posY = 0;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
      //   void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
  
    move() {
    }
  }
  
  