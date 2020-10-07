import Figure from "./Figure";
import Rectangle from "./rectangle";
import hexagon from "./hexagon";
import triangle from "./triangle";
import Straight from "./Straight";
import Point from "./Point";
;

export default class circle extends Figure{
    constructor(x,y,r,c = 'none',vx =0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy,collisionCount,c);
        this.r = r
    }

    draw(context) {
        if(this.collisionCount>=3){
            return
        }
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.c;
        context.fill();
        context.closePath();
    }

    center(){
        return new Point(this.x,this.y,this)
    }



    intersects(fig) {
        if(this.collisionCount>=3 ||fig.collisionCount>=3){
            return false
        }
        if (fig instanceof Rectangle){
            return fig.intersects(this)
        }

        if(fig instanceof  Straight) {
            let distX = fig.ax - fig.bx;
            let distY = fig.ay - fig.by;
            let len = Math.sqrt( (distX*distX) + (distY*distY) );
            let dot = ( ((this.x-fig.ax)*(fig.bx-fig.ax)) + ((this.y-fig.ay)*(fig.by-fig.ay)) ) / Math.pow(len,2);
            let closestX = fig.ax + (dot * (fig.bx-fig.ax));
            let closestY = fig.ay + (dot * (fig.by-fig.ay));
            distX = closestX - this.x;
            distY = closestY - this.y;
            let  distance = Math.sqrt( (distX*distX) + (distY*distY) );
            let a = this._linePoint(fig.ax,fig.ay,fig.bx,fig.by, closestX,closestY)
            if (!a) return false;

            if (distance <= this.r) {
                return true;
            }
            return false;
        }

        if (fig instanceof circle){
            let distX = this.x - fig.x;
            let distY = this.y - fig.y;
            let distance = Math.sqrt( (distX*distX) + (distY*distY) );

            if (distance <= this.r+fig.r) {
                return true
            }
            return false
        }
        if (fig instanceof triangle){
            return fig.intersects(this)
        }
        if (fig instanceof hexagon){
            return fig.intersects(this)
        }
    }
    _linePoint( x1,  y1,  x2,  y2,  px,  py) {
        let d1 = Math.sqrt(Math.pow(px - x1,2) + Math.pow(py - y1,2));
        let d2 = Math.sqrt(Math.pow(px - x2,2) + Math.pow(py - y2,2));
        let lineLen = Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
        return  d1+d2 >= lineLen && d1+d2 <= lineLen
    }
}