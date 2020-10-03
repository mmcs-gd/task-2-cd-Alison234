import Figure from "./Figure";
import Rectangle from "./rectangle";
import hexagon from "./hexagon";
import circle from "./Circle";


export default class triangle extends Figure   {

    constructor(x,y,l,c = "none",vx = 0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy);
        this.c = c
        this.l = l
        this.collisionCount = collisionCount
    }

    draw(context){
        context.beginPath();
        context.moveTo(this.x,this.y)
        context.lineTo(this.x+this.l,this.y +this.l)
        context.lineTo(this.x-this.l,this.y +this.l)
        context.fillStyle = this.c
        context.fill()
        context.closePath()
    }

    get color(){
        return this.c
    }
    set color(newColor){
        this.c = newColor
    }

    intersects(fig) {
        if(fig instanceof Rectangle) {
            return  (this.x <= fig.x + fig.w)
                && (fig.x <= this.x + this.l/2)
                && (this.y <= fig.y + fig.h)
                && (fig.y <= this.y + this.l/2)
        }
        if(fig instanceof triangle){

        }

        if(fig instanceof circle){
            let testX = fig.x;
            let testY = fig.y;
            if (fig.x < this.x) {testX = this.x}
            else if (fig.x >this.x+this.l/2) {testX = this.x+this.l/2}
            if (fig.y < this.y)         {testY = this.y}
            else if (fig.y > this.y+this.l/2) {testY = this.y+this.l/2}
            let distX = fig.x-testX;
            let distY = fig.y-testY;
            let distance = Math.sqrt( (distX*distX) + (distY*distY) );

            if (distance <= fig.r) {
                return true;
            }
            return false;
        }

        if(fig instanceof hexagon){

        }

    }
}