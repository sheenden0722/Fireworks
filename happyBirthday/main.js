var HeartsBackground = {
    heartHeight: 60,
    heartWidth: 64,
    hearts: [],
    heartImage: 'heart.png',
    maxHearts: 50,
    minScale: 0.4,
    draw: function() {
      this.setCanvasSize();
      this.ctx.clearRect(0, 0, this.w, this.h);
      for (var i = 0; i < this.hearts.length; i++) {
        var heart = this.hearts[i];
        heart.image = new Image();
        heart.image.style.height = heart.height;
        heart.image.src = this.heartImage;
        this.ctx.globalAlpha = heart.opacity;
        this.ctx.drawImage (heart.image, heart.x, heart.y, heart.width, heart.height);
        this.ctx.font = "bold 60px Comic Sans MS";
        this.ctx.fillStyle = "#ff6666";
        this.ctx.textAlign = "center";
        var canvasHeight = this.canvas.height;
        this.ctx.fillText("Happy", this.canvas.width/2, canvasHeight - canvasHeight/2 - 80);
        this.ctx.fillText("Birthday", this.canvas.width/2, canvasHeight - canvasHeight/2);
        this.ctx.fillText("HisOrHerName!", this.canvas.width/2, canvasHeight - canvasHeight/2 + 80);
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "right";
        this.ctx.fillText("- Raubin", this.canvas.width*0.99, this.canvas.height*0.99);
      }
      this.move();
    },
    move: function() {
      for(var b = 0; b < this.hearts.length; b++) {
        var heart = this.hearts[b];
        heart.y += heart.ys;
        if(heart.y > this.h) {
          heart.x = Math.random() * this.w;
          heart.y = -1 * this.heartHeight;
        }
      }
    },
    setCanvasSize: function() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight*0.995;
      this.w = this.canvas.width;
      this.h = this.canvas.height;
    },
    initialize: function() {
      this.canvas = $('#canvas')[0];
  
      if(!this.canvas.getContext)
        return;
  
      this.setCanvasSize();
      this.ctx = this.canvas.getContext('2d');
      for(var a = 0; a < this.maxHearts; a++) {
        var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
        this.hearts.push({
          x: Math.random() * this.w,
          y: Math.random() * this.h,
          ys: Math.random() + 1,
          height: scale * this.heartHeight,
          width: scale * this.heartWidth,
          opacity: scale
        });
      }
  
      setInterval($.proxy(this.draw, this), 20);
    }
  };
  
  $(document).ready(function(){
    HeartsBackground.initialize();
  });