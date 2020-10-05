import Rectangle from './rectangle'
import triangle from "./triangle";
import Circle from "./Circle";

let tri = new triangle(100,20,20)
describe('triangle Collision', () => {
    it('should calculate collision with triangle true', () => {
        let t = new triangle(100,30,40)
        expect(tri.intersects(t)).toBeTruthy()
    })

    it('should calculate collision with triangle true', () => {
        let t = new triangle(90,30,40)
        expect(tri.intersects(t)).toBeTruthy()
    })

    it('should calculate collision with triangle true', () => {
        let t = new triangle(90,20,40)
        expect(tri.intersects(t)).toBeTruthy()
    })

    it('should calculate collision with triangle true', () => {
        let t = new triangle(30,20,40)
        expect(tri.intersects(t)).toBeFalsy()
    })
})