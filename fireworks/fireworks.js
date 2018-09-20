let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');


let startAnimate = true;
let mouseDown = false;
let shoots = [];
let parts = [];
let mousePosition = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
};
const colors=['#c92e2e','#13a5a5','#eee'];       // 颜色列表

/*
* author:
* date:
* description: 初始化画布（宽，高，背景）
**/
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.fillStyle = 'rgba(000,000,005,1)';
    c.fillRect(0,0,window.innerWidth,window.innerHeight);

    c.font = "60px Arial";
    c.textAlign = "center";
    c.fillStyle ='#ddd';
    c.fillText("Press mouse button to launch fireworks", canvas.width/2, canvas.height/3);
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<             对象类    <<<<<<<<<<<<
/*
* author:
* date:
* description: 爆炸时和发射时的 特殊点轨迹 ,本质是 一个圆（arc)
* @param x 横坐标
* @param y 纵坐标
* @param r 半径
* @param direction 方向向量
* @param isShoot  是否是发射时或者爆炸  true：发射，false:爆炸
**/
function particular(x,y,r,direction,isShoot){
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = direction;
    this.timeLeft = getRandomFloat(50,70);       //特殊点停留时间，会自减1 到0时消失
    if(isShoot){
        this.color = '#ddd';
        this.force = new vector(0,-0.19);
    }
    else{
        this.force = new vector(0,-0.06);
        this.color = getRandomColor();
    }

    this.update = () => {
        this.applyDrag();
        this.direction.a += this.force.a;
        this.direction.b += this.force.b;

        this.x -= this.direction.a;
        this.y -= this.direction.b;

        this.timeLeft -= 1;
        this.draw();
    };

    this.applyDrag = () => this.force.a = -this.direction.a * 0.01;

    this.draw = () => {
        c.beginPath();
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
        c.closePath();
    }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<         核心类    <<<<<<<<<<<<<<<<<<

/*
* author:
* date:
* description: 发射烟花弹
**/
function shoot(){
    if(mouseDown)
        shoots.push(
            new particular(
                window.innerWidth/2,
                window.innerHeight,
                5,
                getShootDirection(),
                true
            )
        );
    setTimeout(shoot, 200);
}

/*
* author:
* date:
* description: 爆炸时，在爆炸点产生多个 特殊点轨迹 particular
**/
function explode(x,y)
{
    for(let i = 0; i < 80; i++)
    {
        parts.push(
            new particular(
                x,
                y,
                getRandomFloat(1,2.3),
                getExplosionVector(),
                false
            )
        );
    }
}



function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(000,000,005,0.2)';
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    parts = parts.filter( p => p.timeLeft > 0);
    shoots = shoots.filter(p => filterShoots(p));

    parts.forEach((p)=>{
        p.update();
    });

    shoots.forEach((p)=>{
        p.update();
    });
}

function filterShoots(s){
    if(s.direction.b < -0.8)
    {
        explode(s.x, s.y);
        return false;
    }
    return true;
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<        工具类   <<<<<<<<<<<<<<<<<<<
/*
* author:
* date:
* description: 获取某个区间的随机数
* @param min 左区间
* @param max 右区间
**/
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/*
* author:
* date:
* description: 从color颜色列表中获取随机颜色值
**/
function getRandomColor(){
    //Math.floor 向下取整
    return colors[ Math.floor( Math.random() * colors.length - 0.01 )];
}

/*
* author:
* date:
* description: 返回一个属性为  向量（坐标）
**/
function vector(a,b){
    return {
        a: a,
        b: b
    }
}

/*
* author:
* date:
* description: 获取发射的高度
**/
function getShootHeight(){
    let height = window.innerHeight;
    if(height < 460)
        return getRandomFloat(9.5,12.1);
    else if (height >= 460 && height < 650)
        return getRandomFloat(11.5,13.1);
    else if(height >= 650 && height < 800)
        return getRandomFloat(12.5,15.1);
    else
        return getRandomFloat(15.5,17.1);
}

/*
* author:
* date:
* description: 获取发射的方向
**/
function getShootDirection(){
    let dx = mousePosition.x - window.innerWidth/2;
    //var dy=window.innerHeight-mousePosition.y;

    return new vector(-dx/50,getShootHeight());
}

/*
* author:
* date:
* description: 获取爆炸时的 向量（坐标）
**/
function getExplosionVector(){
    let angle = Math.random() * 2 * Math.PI;
    vx = Math.sin(angle) * 3 * Math.random();
    vy = Math.cos(angle) * 4 * Math.random();
    if(vy < -0.5)
        vy = -vy * 0.7;
    return new vector(vx,vy);
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<     监听事件     <<<<<<<<<<<<
window.addEventListener('mousemove',(mouse)=>{
    mousePosition.x = mouse.x;
    mousePosition.y = mouse.y;
});

window.addEventListener('resize',function(){
    shoots = [];
    parts = [];
    init();
    console.log(window.innerHeight);
    init();
});

window.addEventListener('mousedown',()=>{
    mouseDown = true;
    if(startAnimate)
        animate();
    startAnimate = false;
});

window.addEventListener('mouseup',()=>{
    mouseDown = false;
});

init();
shoot();
