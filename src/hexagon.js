import Figure from "./Figure";
import triangle from "./triangle";
import Rectangle from "./rectangle";
import circle from "./Circle";

export default class hexagon extends Figure {
    constructor(x, y, l, c = "none", vx = 0, vy = 0, collisionCount = 0) {
        super(x, y, vx, vy);
        this.c = c
        this.l = l
        this.collisionCount = collisionCount
    }

    draw(context) {
        context.beginPath();
        let coordArray = [
            [this.x,this.y - this.l],
            [this.x + this.l * Math.sqrt(3) / 2,this.y - this.l / 2],
            [this.x + this.l * Math.sqrt(3)/2, this.y + this.l / 2],
            [this.x, this.y + this.l],
            [this.x - this.l * Math.sqrt(3) / 2,this.y + this.l / 2],
            [this.x-this.l * Math.sqrt(3) / 2, this.y - this.l / 2]
        ];
        for (var i = 0; i < coordArray.length; i++) {
            if (i == 0) context.moveTo(coordArray[i][0], coordArray[i][1]);
            else context.lineTo(coordArray[i][0], coordArray[i][1]);
        }
        context.fillStyle = this.c;
        context.fill();
        context.closePath()
    }
    intersects(fig){

        if(fig instanceof Rectangle){
            return fig.intersects(this)
        }

        if(fig instanceof triangle){

        }

        if(fig instanceof circle){

        }
        if(fig instanceof hexagon){

        }
    }
}