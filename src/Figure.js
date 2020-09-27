export default class Figure{
    constructor(x,y,vx,vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    draw (context){
        //implement on sub-class
    }

    update(){
        this.y += this.vy
        this.x += this.vx
    }

    intersects(fig){
        //implement on sub-class
    }
}