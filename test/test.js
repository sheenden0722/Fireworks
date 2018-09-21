let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

let startAnimate = true;
let parts = [];
const colors=['#c92e2e','#13a5a5','#eee'];       // 颜色列表
const backgroundColor = 'rgba(255,255,255,1)';

/*
* author:
* date:
* description: 初始化画布（宽，高，背景）
**/
function init() {
    canvas.width = 100;
    canvas.height = 100;
    canvas.style = 'position:absolute; top:50px; left:50px; cursor:pointer';
    c.fillStyle = backgroundColor;
    c.fillRect(0,0,100,100);
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
**/
function particular(x,y,r,direction){
    this.x = x - 45;
    this.y = y - 40;
    this.r = r;
    this.direction = direction;
    this.timeLeft = getRandomFloat(50,70);       //特殊点停留时间，会自减1 到0时消失

    this.force = new vector(0,-0.06);
    this.color = getRandomColor();

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
* description: 爆炸时，在爆炸点产生多个 特殊点轨迹 particular
**/
function explode(x,y)
{
    for(let i = 0; i < 50; i++)
    {
        parts.push(
            new particular(
                x,
                y,
                getRandomFloat(1,2.3),
                getExplosionVector()
            )
        );
    }
}

/*
* author:
* date:
* description: 动画
**/
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = backgroundColor;
    c.fillRect(0,0,100,100);

    parts = parts.filter( p => p.timeLeft > 0);

    parts.forEach((p)=>{
        p.update();
    });
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

window.addEventListener('mousedown',(mouse)=>{
    explode(mouse.x,mouse.y);
    if(startAnimate)
        animate();
    startAnimate = false;
});

init();

