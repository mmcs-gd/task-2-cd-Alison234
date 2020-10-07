import Rectangle from './rectangle'
import QuadTree from './quad-tree'
import circle from "./Circle";
import triangle from "./triangle";
import rectangle from "./rectangle";
import hexagon from "./hexagon";

describe('QuadTree', () => {
    it('should be empty in the initial state', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)

        expect(tree.length).toBe(0)
    })

    it('should throw an exception when boundary has not been passed', () => {
        expect(() => {
            const tree = new QuadTree()
        }).toThrow(TypeError)
    })

    it('should throw an exception when boundary is not a Rectangle', () => {
        expect(() => {
            const tree = new QuadTree(42)
        }).toThrow(TypeError)
    })

    it('should return true if insert in tree corect',() => {
        const area = new rectangle(0,0,1200,1920)
        const tree = new QuadTree(area)
        let fig = []
        fig.push(new circle(50,50,20))
        fig.push(new triangle(250,250,20))
        fig.push(new circle(550,550,20))
        fig.push(new circle(570,520,20))
        fig.push(new triangle(450,450,20))
        expect(() =>{
            tree.length == 5
        }).toBeTruthy()
    })

    it('should return correct candidates',() => {
        const area = new rectangle(0,0,1200,1920)
        const tree = new QuadTree(area)
        let fig = []
        fig.push(new circle(50,50,20))
        fig.push(new triangle(250,250,20))
        fig.push(new circle(550,550,20))
        fig.push(new circle(570,520,20))
        fig.push(new triangle(450,450,20))
        fig.push(new hexagon(550,590,20))
        let candidates =[]
        const len = 100
        const bounds = new Rectangle(fig[4].center().x-25,fig[4].center().x-25,len,len)
        tree.queryRange(bounds,candidates)
        let ExpectedCandidates = []
        ExpectedCandidates.push(fig[4]) //сам обьект
        ExpectedCandidates.push(fig[3]) //обьект находищийся в радиусе возможно столкновения
        ExpectedCandidates.push(fig[5]) //обьект находищийся в радиусе возможно столкновения
        expect(() => {
            ExpectedCandidates == candidates
        }).toBeTruthy()
    })
})
