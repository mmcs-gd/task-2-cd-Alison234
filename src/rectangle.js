import Figure from "./Figure";
import triangle from "./triangle";
import Circle from "./Circle";
import hexagon from "./hexagon";
import Point from "./Point";

export default class Rectangle extends Figure {
    constructor(x, y, w, h,color = "none",vx = 0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy,collisionCount,color);
        this.w = w
        this.h = h
    }


    draw(context){
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 10;
        context.fill();
        context.closePath();
    }



    get left() {
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    center() {
        return new Point(this.x + this.w/2,this.y+this.h/2,this)
    }


    intersects(fig) {
        if(fig instanceof Rectangle) {
            return  (this.x < fig.x + fig.w)
                && (fig.x < this.x + this.w)
                && (this.y < fig.y + fig.h)
                && (fig.y < this.y + this.w)
        }
         if(fig instanceof triangle) {
             return (this.x <= fig.x + fig.l)
                 && (fig.x <= this.x + this.w)
                 && (this.y <= fig.y + fig.l)
                 && (fig.y <= this.y + this.w)
         }
         if (fig instanceof Circle){
             let testX = fig.x;
             let testY = fig.y;
             if (fig.x < this.x) {testX = this.x}
             else if (fig.x >this.x+this.w) {testX = this.x+this.w}
             if (fig.y < this.y)         {testY = this.y}
             else if (fig.y > this.y+this.h) {testY = this.y+this.h}
             let distX = fig.x-testX;
             let distY = fig.y-testY;
             let distance = Math.sqrt( (distX*distX) + (distY*distY) );

             if (distance <= fig.r) {
                 return true;
             }
             return false;
         }
         if(fig instanceof hexagon){
             let isCollision = false
             let tr = [
                 new triangle(fig.x,fig.y,fig.l),
                 new triangle(fig.x + fig.l * Math.sqrt(3)/2,fig.y - fig.l / 2,fig.l),
                 new triangle(fig.x + fig.l * Math.sqrt(3) / 2,fig.y + fig.l / 2,fig.l),
                 new triangle(fig.x,fig.y + fig.l,fig.l),
                 new triangle(fig.x - fig.l * Math.sqrt(3) / 2,fig.y + fig.l / 2,fig.l),
                 new triangle(fig.x-fig.l * Math.sqrt(3) / 2,fig.y - fig.l / 2,fig.l),
             ]
             for(let i =0;i<tr.length; i++){
                  isCollision = tr[i].intersects(this)
                 if(isCollision) {return true}
             }
             return false
         }
    }
}