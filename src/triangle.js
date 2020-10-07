import Figure from "./Figure";
import Rectangle from "./rectangle";
import hexagon from "./hexagon";
import circle from "./Circle";
import Straight from "./Straight";
import Point from "./Point";


export default class triangle extends Figure   {

    constructor(x,y,l,c = 'black',vx = 0,vy = 0,collisionCount= 0) {
        super(x,y,vx,vy,collisionCount,c);
        this.l = l
    }

    draw(context) {
        if(this.collisionCount>=3){
            return
        }
        context.beginPath();
        context.moveTo(this.x,this.y)
        context.lineTo(this.x+this.l,this.y +this.l)
        context.lineTo(this.x-this.l,this.y +this.l)
        context.fillStyle = this.c
        context.fill()
        context.closePath()
    }

    center(){
        return new Point(this.x,this.y+this.l/2,this)
    }


    get left() {
        return this.x
    }

    get right() {
        return this.x + this.l
    }

    get top() {
        return this.y
    }

    getStraights(fig){
        let st = []
        st.push(new  Straight(fig.x,fig.y,fig.x+fig.l,fig.y+fig.l))
        st.push(new  Straight(fig.x,fig.y,fig.x-fig.l,fig.y+fig.l))
        st.push(new  Straight(fig.x-fig.l,fig.y+fig.l,fig.x-fig.l+fig.l*2,fig.y+fig.l))
        return st
    }

    intersects(fig) {
        if(this.collisionCount>=3 ||fig.collisionCount>=3){
            return false
        }
        if(fig instanceof Rectangle) {
            return  (this.x <= fig.x + fig.w)
                && (fig.x <= this.x + this.l/2)
                && (this.y <= fig.y + fig.h)
                && (fig.y <= this.y + this.l/2)
        }
        if(fig instanceof triangle) {
            let st1 = fig.getStraights(fig)
            let st2 = this.getStraights(this)
            for(let i = 0;i<st1.length;i++)
                for(let j = 0;j<st2.length;j++)
                    if(st1[i].intersects(st2[j]))
                        return true;
            return false
        }

        if(fig instanceof hexagon){
            fig.intersects(this)
        }

        if(fig instanceof circle){
         let st = this.getStraights(this)
         for(let i = 0;i<st.length;i++){
            if(fig.intersects(st[i]))
                return  true
         }
        }
        return false
    }
}