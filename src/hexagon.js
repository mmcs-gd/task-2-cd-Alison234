import Figure from "./Figure";
import triangle from "./triangle";
import Rectangle from "./rectangle";
import circle from "./Circle";
import Straight from "./Straight";
import Circle from "./Circle";
import Point from "./Point";

export default class hexagon extends Figure {
    constructor(x, y, l, c = 'black', vx = 0, vy = 0, collisionCount = 0) {
        super(x, y, vx, vy,collisionCount,c);
        this.l = l
    }


    center(){
        return new Point(this.x,this.y,this)
    }


    getStraights(fig){
        let st= []
        st.push(new Straight(fig.x,fig.y - fig.l,fig.x + fig.l * Math.sqrt(3) / 2,fig.y - fig.l / 2))
        st.push(new Straight(fig.x + fig.l * Math.sqrt(3) / 2,fig.y - fig.l / 2,fig.x + fig.l * Math.sqrt(3)/2,fig.y + fig.l / 2))
        st.push(new Straight(fig.x + fig.l * Math.sqrt(3)/2,fig.y + fig.l / 2,fig.x, fig.y + fig.l))
        st.push(new Straight(fig.x, fig.y + fig.l,fig.x - fig.l * Math.sqrt(3) / 2,fig.y + fig.l / 2))
        st.push(new Straight(fig.x - fig.l * Math.sqrt(3) / 2,fig.y + fig.l / 2,fig.x-fig.l * Math.sqrt(3) / 2, fig.y - fig.l / 2))
        st.push(new Straight(fig.x-fig.l * Math.sqrt(3) / 2, fig.y - fig.l / 2,fig.x,fig.y - fig.l))
        return st
    }

    draw(context) {
        if(this.collisionCount>=3){
            return
        }
        context.beginPath();
        let coordArray = [
            [this.x,this.y - this.l],
            [this.x + this.l * Math.sqrt(3) / 2,this.y - this.l / 2],
            [this.x + this.l * Math.sqrt(3)/2, this.y + this.l / 2],
            [this.x, this.y + this.l],
            [this.x - this.l * Math.sqrt(3) / 2,this.y + this.l / 2],
            [this.x-this.l * Math.sqrt(3) / 2, this.y - this.l / 2]
        ];
        for (let i = 0; i < coordArray.length; i++) {
            if (i == 0) context.moveTo(coordArray[i][0], coordArray[i][1]);
            else context.lineTo(coordArray[i][0], coordArray[i][1]);
        }
        context.fillStyle = this.c;
        context.fill();
        context.closePath()
    }
    intersects(fig){
        if(this.collisionCount>=3 ||fig.collisionCount>=3){
            return false
        }
        if(fig instanceof Rectangle){
            return fig.intersects(this)
        }

        if(fig instanceof triangle){
            let st1 = fig.getStraights(fig)
            let st2 = this.getStraights(this)
            for(let i = 0;i<st1.length;i++)
                for(let j = 0;j<st2.length;j++)
                    if(st1[i].intersects(st2[j]))
                        return true;
            return false
        }

        if(fig instanceof Circle){
            let st1 = this.getStraights(this)

            for(let i = 0;i<st1.length;i++)
                    if(fig.intersects(st1[i]))
                        return true;
            return false
        }

        if(fig instanceof hexagon){
            let st1 = fig.getStraights(fig)
            let st2 = this.getStraights(this)
            for(let i = 0;i<st1.length;i++)
                for(let j = 0;j<st2.length;j++)
                    if(st1[i].intersects(st2[j]))
                        return true;
            return false
        }
    }
}