
var canvas=document.querySelector('canvas');

var minRadius=2;
var maxRadius=40;
var numOfCircles;
var c =canvas.getContext('2d');
    
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;


window.addEventListener('mousemove',function(ms){
    mouse.x=ms.x;
    mouse.y=ms.y;

});

window.addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});

var mouse={
    x:undefined,
    y:undefined
}

var colours=[
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#2398db',
    '#23089b'
]

function Circle(x,y,r,dx,dy){
    this.x=x;
    this.y=y;
    this.r=r;
    this.originalRadius=r;
    this.dx=dx;
    this.dy=dy;
    this.colour=colours[Math.floor(Math.random()*colours.length)];

    this.draw=function(){
        c.beginPath();
        c.strokeStyle="#3355ee";
        c.fillStyle=this.colour;
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.stroke();
        c.fill();
    }

    this.update=function(){
        if(this.x+this.r>=window.innerWidth || this.x-r<=0)
            this.dx=-this.dx;
        if(this.y+r>=window.innerHeight || this.y-r<=0)
            this.dy=-this.dy;
    
        this.y+=this.dy;
        this.x+=this.dx;

        if(mouse.x-this.x<50 && mouse.x-this.x>-50 &&
        mouse.y-this.y<50 && mouse.y-this.y>-50&&
        this.r<maxRadius)
            this.r+=1;
    
        else if(this.r>this.originalRadius)
            this.r-=1;

        this.draw();
    }
}
var circleArray=[];
function init(){
    circleArray=[];
    numOfCircles=window.innerHeight*window.innerWidth/700;
    for(var i=0;i<numOfCircles;i++){
        var r=Math.random()*3+1;
        var x=Math.random()*(window.innerWidth-r);
        var y=Math.random()*(window.innerHeight-r);
        var dx=Math.random()-0.5;
        var dy=Math.random()-0.5;
       
    
        circleArray.push(new Circle(x,y,r,dx,dy));  
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}

init();
animate();