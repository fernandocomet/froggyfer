class House {
    constructor(ctx, w, h, posX) {
      this.ctx = ctx;
      this.imageSize = 50;

      this.width = this.imageSize;
      this.height = this.imageSize;
  
      this.image = new Image();
      this.image.src = "./images/house.png";
      this.imagePosition = 0;
  
      this.posX = posX;
      this.posY = 0;
     
      this.isEmpty = true;
    }
    
    draw() {
        this.ctx.drawImage(
          this.image,
          this.imagePosition,
          0,
          this.width,
          this.height,
          this.posX,
          this.posY,
          this.width,
          this.height
        );
        console.log("se estan dibujando")
      }
      
  
    move() {
    }
  }
  
  