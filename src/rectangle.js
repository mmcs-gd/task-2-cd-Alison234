import Figure from "./Figure";
import triangle from "./triangle";

export default class Rectangle extends Figure {
    constructor(x, y, w, h,color = "none",vx = 0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy);
        this.w = w
        this.h = h
        this.c = color
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

    get color(){
        return this.c
    }
    set color(newColor){
        this.c = newColor
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

    intersects(fig) {
        if(fig instanceof Rectangle) {
            return  (this.x < fig.x + fig.w)
                && (fig.x < this.x + this.w)
                && (this.y < fig.y + fig.h)
                && (fig.y < this.y + this.w)
        }
         if(fig instanceof triangle){
             return false
         }

    }


}