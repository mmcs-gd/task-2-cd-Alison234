import Figure from "./Figure";
import Rectangle from "./rectangle";
import hexagon from "./hexagon";
import triangle from "./triangle";

export default class circle extends Figure{
    constructor(x,y,r,c = 'none',vx =0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy);
        this.r = r
        this.c = c
        this.collisionCount = collisionCount;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.c;
        context.fill();
        context.closePath();
    }

    get color(){
        return this.c
    }
    set color(newColor){
        this.c = newColor
    }

    intersects(fig) {
        if (fig instanceof Rectangle){
            return fig.intersects(this)
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

        }
    }
}

