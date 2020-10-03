export default class Figure{
    constructor(x,y,vx,vy,cc){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.collisionCount = cc
    }

    draw (context){
        //implement on sub-class
    }

    update(){
        this.y += this.vy
        this.x += this.vx
    }


}