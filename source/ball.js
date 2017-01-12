var Ball = function (x, y, radius, src, speed,dx,dy)
{
  this.center = new Point(x,y)
  this.radius = radius
  this.speed = speed
  this.lastxy = new Point(x,y)
  this.lasthittedrect=null;
  // this.color = color
  this.src = src;
   this.accel=new Accel(dx || 2, dy || 2)
  this.draw = function (ctx)
  {
    var center = this.center
    var img = new Image();
    img.src = this.src; 
    ctx.drawImage(img, center.x, center.y, this.radius*2, this.radius*2);
    // ctx.beginPath();
    // ctx.arc(center.x, center.y, this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.closePath();
  }

  this.move = function (dx, dy)
  {
    if(arguments.length){
    this.accel.dx= dx;
     this.accel.dy= dy;
    }
     this.center.y += this.accel.dy;
    this.center.x += this.accel.dx;


  }

  this.place = function (dx, dy)
  {
    this.center.y = dy;
    this.center.x = dx;


  }  
  this.top = function ()
  {
     return new Point(this.center.x ,this.center.y - this.radius)

  }
  this.bottom = function ()
  {
    return new Point(this.center.x ,this.center.y + this.radius)
  }
  this.right = function ()
  {
    return new Point(this.center.x + this.radius,this.center.y)
  }

  this.left = function ()
  {
    return new Point(this.center.x - this.radius,this.center.y)
  }
  this.setold = function ()
  {
    this.lastxy.x=this.center.x;
   this.lastxy.y=this.center.y;
  }
  this.isInBoundsOf = function (rect,accl)
  {
   //console.log("LIMIT point :",this.center.x,this.center.y);
     //  console.log("OLD point :",this.lastxy.x,this.lastxy.y);
     //  console.log("last hitted rect  :",this.lasthittedrect,rect);
   /* if(this.center.x>650)
    {

          console.log("LIMIT point :",this.center.x,this.center.y);
         console.log("OLD point :",this.lastxy.x,this.lastxy.y);


    }*/
    // console.log(this.center);
    if (rect.isequal(this.lasthittedrect))
      {
        
        //console.log("-----------HIT YOUR BALLSH------")
        return null;
      
    }
     //console.log("OLD",this.lastxy,"NEW",this.center)
    var olpnt=[this.lastxy.x,this.lastxy.y]
    var crpnt=[this.center.x,this.center.y]
    var balero=0;
    if(Math.abs(this.accel.dx)>=Math.abs(this.accel.dy) )
   { 
    var xincrement=1+(-2*Number(olpnt[0]>crpnt[0]))
    var yincrement=this.accel.dy/Math.abs(this.accel.dx) 
     balero=0;
  }
    
    else
    {
     var yincrement=1+(-2*Number(olpnt[1]>crpnt[1]))
    var xincrement=this.accel.dx/Math.abs(this.accel.dy) 
     balero=1;
}

    //var cols=[false,false,false,false]
  //  xincrement=xincrement;
   // yincrement=yincrement;
  // console.log(xincrement,yincrement);
    var vitsel=null;
    this.center.x=olpnt[0];
    this.center.y=olpnt[1];

    var nonc={x:this.center.x,y:this.center.y};
     this.center.x=/*nonc.x*/Math.round(nonc.x);
    this.center.y=/*nonc.y*/Math.round(nonc.y);
     var cntrcntr=[this.center.x,this.center.y];
        //console.log("X", this.center.x,crpnt[0])
    //console.log("INCRS",xincrement,yincrement,"KKK",this.accel.dy/this.accel.dx,"krookeD",this.accel.dy/Math.abs(this.accel.dx))
    while(Math.abs(cntrcntr[balero]-crpnt[balero])>0  )
 {  

//console.log("IN , point :",this.center.x,this.center.y);
//console.log("IN , point",this.center);
     //O  this.lastxy.x=this.center.x;
   //O   this.lastxy.y=this.center.y;
    if ( rect.includes(this.top()) || rect.includes(this.bottom()) )
       {
        /// console.log("RETURNED 0",this.accel);
         vitsel =  hitnewaccel(this.accel ,new line(0) ,accl );
         /// console.log("RETURNED ACCEL",vitsel);

   this.lasthittedrect=rect;
return vitsel;
  
      }
      if ( rect.includes(this.right()) || rect.includes(this.left()) )
       {
       ///   console.log("RETURNED 90",this.accel);
  
      
         vitsel =  hitnewaccel(this.accel ,new line(90) ,accl );
         ///console.log("RETURNED ACCEL",vitsel);

            this.lasthittedrect=rect;
          return vitsel;
  
        
      }
 
      nonc.x+=xincrement;
     nonc.y+=yincrement
     this.center.x=/*nonc.x*/Math.round(nonc.x);
    this.center.y=/*nonc.y*/Math.round(nonc.y);
     cntrcntr=[this.center.x,this.center.y];
   // this.center.x=nonc.x//Math.round(nonc.x);
    //this.center.y=nonc.y//Math.round(nonc.y);
  
}
   //O      this.lastxy.x=this.center.x;
  //O this.lastxy.y=this.center.y;
//console.log("IN , point",this.center);
     if ( rect.includes(this.top()) || rect.includes(this.bottom()) )
       {
       ///  console.log("RETURNED 0",this.accel);

       
         vitsel =  hitnewaccel(this.accel ,new line(0) ,accl );
      ///   console.log("RETURNED ACCEL",vitsel);
          //console.log(vitsel);
           this.lasthittedrect=rect;
        return vitsel;

        }
      if ( rect.includes(this.right()) || rect.includes(this.left()) )
       {
      ///    console.log("RETURNED 90",this.accel);
         vitsel =  hitnewaccel(this.accel ,new line(90) ,accl );
      ///  console.log("RETURNED ACCEL",vitsel);
          //console.log(vitsel);
           this.lasthittedrect=rect;
        return vitsel;

        }
//O  this.lastxy.x=this.center.x;
 //O  this.lastxy.y=this.center.y;
this.center.x=crpnt[0];
    this.center.y=crpnt[1];
          return null
  }
    // this.isInBoundsOf = function (rect)
  // {
  //   return (rect.includes(this.top()) || rect.includes(this.bottom()) || rect.includes(this.right()) || rect.includes(this.left()))
  // }

}
