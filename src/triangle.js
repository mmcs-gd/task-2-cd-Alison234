export default class triangle{
    constructor(x,y,l,c,vx,vy) {
        this.x = x
        this.y = y
        this.c = c
        this.l = l
        this.vx = vx
        this.vy = vy
    }

    get color(){
        return this.c
    }
    set color(newColor){
        this.c = newColor
    }
}