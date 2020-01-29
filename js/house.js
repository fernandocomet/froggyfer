class House {
    constructor(ctx, w, h, imgSource) {
      this.ctx = ctx;
      this.width = w;
      this.height = h;
  
      this.image = new Image();
      this.image.src = "./images/house.png";
      this.imagePosition = 0;
  
      this.posX = 0;
      this.posY = 0;
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
  
    move() {
    }
  }
  