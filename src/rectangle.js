import Figure from "./Figure";
import triangle from "./triangle";
import Circle from "./Circle";
import hexagon from "./hexagon";
import Point from "./Point";
import Straight from "./Straight";

export default class Rectangle extends Figure {
    constructor(x, y, w, h,color = "none",vx = 0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy,collisionCount,color);
        this.w = w
        this.h = h
    }


    draw(context){
        if(this.collisionCount>=3){
            return
        }
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.fillStyle = this.color;
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

    getStraights(fig){
        let st = []
        st.push(new  Straight(fig.x,fig.y,fig.x+fig.w,fig.y))
        st.push(new  Straight(fig.x+fig.w,fig.y,fig.x+fig.w,fig.y+fig.h))
        st.push(new  Straight(fig.x+fig.w,fig.y+fig.h,fig.x,fig.y+fig.h))
        st.push(new  Straight(fig.x,fig.y+fig.h,fig.x -fig.h))
        return st
    }


    intersects(fig) {
        if(this.collisionCount>=3 ||fig.collisionCount>=3){
            return false
        }
        if(fig instanceof Rectangle) {
            return  (this.x < fig.x + fig.w)
                && (fig.x < this.x + this.w)
                && (this.y < fig.y + fig.h)
                && (fig.y < this.y + this.w)
        }
        if(fig instanceof triangle) {
            return (this.x <= fig.x + fig.l/2)
                && (fig.x <= this.x + this.w)
                && (this.y <= fig.y + fig.l)
                && (fig.y  <= this.y + this.w)
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
            let tr = fig.getStraights(fig)
            let tr1 = this.getStraights(this)
            for(let i =0;i<tr.length; i++)
                for(let j =0;j<tr1.length;j++)
                    if(tr[i].intersects(tr1[j])){
                        return true
                    }
            return false
        }
    }
}