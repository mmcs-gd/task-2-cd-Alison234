import Rectangle from './rectangle'
import triangle from "./triangle";
import Circle from "./Circle";
import hexagon from "./hexagon";
import circle from "./Circle";
import Point from "./Point";

const hex = new hexagon(550,590,20)
describe('center',() =>{
    it('true if center calculated right',() =>{
        const hexcenter = hex.center();
        const  expectedCenter = new Point(550,590);
        expect(hexcenter.x == expectedCenter.x && hexcenter.y == expectedCenter.y).toBeTruthy()
    })
})

describe('hexagon Collision', () => {
    it('should calculate collision with Rectangle true', () => {
        const rect = new Rectangle(530, 560, 30, 20)
        expect(hex.intersects(rect)).toBeTruthy()
    })
    it('should calculate collision with Rectangle false', () => {
        const rect = new Rectangle(6, 10, 3, 2)
        expect(hex.intersects(rect)).toBeFalsy()
    })

    it('should calculate collision with circle true', () => {
        const c = new circle(550,550,20)
        expect(hex.intersects(c)).toBeFalsy()
    })

    it('should calculate collision with circle true', () => {
        const c = new circle(560,570,20)
        expect(hex.intersects(c)).toBeTruthy()
    })
    //with triangle
    it('should calculate collision with trinagle true', () => {
        const t = new triangle(585,580,20)
        expect(hex.intersects(t)).toBeTruthy()
    })

    it('should calculate collision with trinagle false', () => {
        const t = new triangle(550,620,20)
        expect(hex.intersects(t)).toBeFalsy()
    })

    it('should calculate collision with trinagle true', () => {
        const t = new triangle(515,580,20)
        expect(hex.intersects(t)).toBeTruthy()
    })
    it('should calculate collision with trinagle false', () => {
        const t = new triangle(560,400,20)
        expect(hex.intersects(t)).toBeFalsy()
    })

})