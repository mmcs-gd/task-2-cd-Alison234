const color = ["#cfa37a","#b4d266","#9c71ec","#c45ddd","#39a7db","black",'yellow'];

export default class Figure{
    constructor(x,y,vx,vy,cc,color){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.collisionCount = cc
        this.c = color
    }

    draw (context){
    }

    get color(){
        return this.c
    }
    highlight(){
        if(color.indexOf(this.c) === color.length){
            this.s = color[0]
            return
        }
        this.c = color [color.indexOf(this.c) +1];

    }

    set color(newColor){
        this.c = newColor
    }

    update(){
        this.y += this.vy
        this.x += this.vx
    }
    center(){

    }

}
