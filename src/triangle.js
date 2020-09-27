import Figure from "./Figure";
import Rectangle from "./rectangle";

export default class triangle extends Figure   {

    constructor(x,y,l,c = "none",vx = 0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy);
        this.c = c
        this.l = l
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
            return false
        }

    }
}