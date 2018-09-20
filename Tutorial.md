### Canvas 教程

> * #### 1 初始化

​	①  在标签初始化大小   

> html

```
<canvas id="myCanvas" width="200" height="100" > 
</canvas> 
```

> js 通过**document.getElementById** 获取元素对象

```
let canvas = document.getElementById("myCanvas");     //此处用 id 名
let c = canvas.getContext("2d");            // getContext的参数有：（“2d”代表二维，“3d”代表3维）
```

​	② 在js里面初始化大小

> html

```
<canvas> </canvas>
```

> js 通过**document.querySelector**获取元素对象

```
let canvas = document.querySelector('canvas');    //此处用 canvas标签名
let c = canvas.getContext("2d");            // getContext的参数有：（“2d”代表二维，“3d”代表3维）

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = '#bbbbbb';
c.fillRect(0,0,window.innerWidth,window.innerHeight);
```



> * #### 2   路径绘制（画线 & 画圆）

```
c.beginPath();
c.moveTo(0,0);                  //moveTo(x,y) 定义线条开始坐标
c.lineTo(200,100);              //lineTo(x,y) 定义线条结束坐标
c.stroke();                     //绘制
c.closePath();
```

说明：  

```
beginPath        {路径开始}    
endPath          {路径结束}
stroke           {绘制路径}    //画笔从起点开始画    
fill             {填充路径}

1、不论你用moveTo()把画笔移动到哪里，只要不beginPath()，那你一直都是在画一条路径
2、fillRect与strokeRect,这种画出独立区域的函数，也不会打断当前的路径
说到beginPath()就不得不提到closePath()
3、两者之间有什么联系呢，答案是没有联系，closePath()只是闭合当前的路径，从起点到现在的这个点形成一个闭合的回路，但是，这并不意味着他之后的路径就是新路径了，不要企图通过closePath()来开始一条新的路径
4、开启一条全新路径的唯一方法就是使用beginPath()

```

画圆

```
arc(x,y,r,start,stop)
arc 是 弧度 的意思
画布的左上角坐标为0,0
 x：圆心在x轴上的坐标
 y：圆心在y轴上的坐标
 r：半径长度
 start：起始角度，以弧度表示，圆心平行的右端为0度
 stop：结束角度，以弧度表示
注意：Math.PI表示180°，画圆的方向是顺时针
```



> * #### 3 requestAnimationFrame

**动画效果的API ，并行处理动画动作**

​	传统动画需要使用setTimout()或者setInterval()定时器 

​	setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。 

​	setInterval函数的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是**无限次的定时执行。** 

​	setTimeout和setInterval函数，都返回一个表示计数器编号的整数值，将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。 

```
let id1 = setTimeout(f,1000);
let id2 = setInterval(f,1000);
clearTimeout(id1);
clearInterval(id2);
```









