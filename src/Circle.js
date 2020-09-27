import Figure from "./Figure";

export default class circle extends Figure{
    constructor(x,y,r,c = 'none',vx =0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy);
        this.r = r
        this.c = c
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.c;
        context.fill();
        context.closePath();
    }
}