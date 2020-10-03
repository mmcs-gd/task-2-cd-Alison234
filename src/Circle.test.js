import Rectangle from './rectangle'
import triangle from "./triangle";
import Circle from "./Circle";

const circle = new Circle(2,3,2)
describe('Circle Collision', () => {
    it('should calculate collision with Rectangle true', () => {
        const rect = new Rectangle(0, 0, 3, 2)
        expect(circle.intersects(rect)).toBeTruthy()
    })
    it('should calculate collision with Rectangle false', () => {
        const rect = new Rectangle(6, 10, 3, 2)
        expect(circle.intersects(rect)).toBeFalsy()
    })

    it('should calculate collision with circle true', () => {
        const another = new Circle(3, 3, 2)
        expect(circle.intersects(another)).toBeTruthy()
    })

    it('should calculate collision with circle false', () => {
        const another = new Circle(8, 3, 2)
        expect(circle.intersects(another)).toBeFalsy()
    })
    //with triangle
    it('should calculate collision with trinagle true', () => {
        const another = new triangle(1,2,4)
        expect(circle.intersects(another)).toBeTruthy()
    })

    it('should calculate collision with trinagle true', () => {
        const another = new triangle(2, 3, 3)
        expect(circle.intersects(another)).toBeTruthy()
    })

    it('should calculate collision with trinagle true', () => {
        const another = new triangle(1, 4, 4)
        expect(circle.intersects(another)).toBeTruthy()
    })
    it('should calculate collision with trinagle false', () => {
        const another = new triangle(8, 10, 2)
        expect(circle.intersects(another)).toBeFalsy()
    })

})