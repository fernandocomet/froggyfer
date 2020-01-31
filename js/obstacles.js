class Obstacle {
    constructor(ctx, width, height, isReverse, gameWidth) {    
      this.ctx = ctx;
      this.gameWidth = gameWidth

      ////////Preparing images
      this.img1 = new Image();
      this.img1.src = "./images/animal50.png";

      this.img2 = new Image();
      this.img2.src = "./images/animal100.png";

      this.img3 = new Image();
      this.img3.src = "./images/animal150.png";      

      this.img4 = new Image();
      this.img4.src = "./images/animal200.png";

      this.img5 = new Image();
      this.img5.src = "./images/animal250.png";
      
      this.img6 = new Image();
      this.img6.src = "./images/animal300.png";

      this.img7 = new Image();
      this.img7.src = "./images/animal350.png";
      
      this.img8 = new Image();
      this.img8.src = "./images/animal400.png";

      this.img9 = new Image();
      this.img9.src = "./images/animal450.png";
      
      this.img10 = new Image();
      this.img10.src = "./images/animal500.png";

      this.images = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7, this.img8, this.img9, this.img10];

      this.obstaclesPosY = [62, 312, 362, 412, 462, 512, 562, 612, 662]

      this.randomNumber = Math.randomInt(0,this.obstaclesPosY.length)
      this.posY = this.obstaclesPosY[this.randomNumber];
      this.image = this.images[this.randomNumber];
      ////////////////////////////

      //this.posY = this.obstaclesPosY[Math.floor(Math.random()*this.obstaclesPosY.length)];
      this.width = width;
      this.height = height;
      this.isReverse = isReverse ? true : false;
      this.velX = 5; //easy 3
      this.posX = this.isReverse ? 0 - this.width : this.gameWidth;
    }

    draw() {
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
  
    move() {
    if(this.isReverse){
        this.posX += this.velX;
    }else{
        this.posX -= this.velX;
    }
  }
}
