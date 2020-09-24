export default class Rectangle {
    constructor(x, y, w, h,color = "none",vx = 0,vy = 0) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = color
        this.vx = vx
        this.vy = vy
    }


    get color(){
        return this.c
    }
    set color(newColor){
        this.c = newColor
    }


    get left() {
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

     intersects(rect) {
        return (this.x < rect.x + rect.w)
            && (rect.x < this.x + this.w)
            && (this.y < rect.y + rect.h)
            && (rect.y < this.y + this.w)
    }
}