import rectangle from "./rectangle";
import triangle from "./triangle";
import hexagon from "./hexagon";
import Figure from "./Figure";
import Circle from "./Circle";
import Straight from "./Straight";
import QuadTree from "./quad-tree";
import Rectangle from "./rectangle";
import Point from "./Point";

const canvas = document.getElementById("cnvs");

const gameState = {};

const color = ["faf3d4","cfa37a","#66cb94","#b6d46b","#9c71ec","#c45ddd","#39a7db","black",'yellow',];

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height)
    gameState.figures.map( function (x) {
        x.draw(context)
    })

}

function simpleCollision(){
    let isDone = false;
    for(let i=0;i<gameState.figures.length;i++) {
        for (let j = 0; j < gameState.figures.length; j++) {
            if (gameState.figures[i].intersects(gameState.figures[j]) && !isDone && gameState.figures[i] != gameState.figures[j]) {
                gameState.figures[i].collisionCount++
                gameState.figures[j].collisionCount++
                gameState.figures[i].color = color[color.indexOf(gameState.figures[i].color) + 1];
                gameState.figures[j].color = color[color.indexOf(gameState.figures[j].color) + 1];
                /*if (gameState.figures[i].collisionCount >=3)
                    gameState.figures.splice(gameState.figures.indexOf(gameState.figures[i]), 1)

                if (gameState.figures[j].collisionCount >= 3)
                    gameState.figures.splice(gameState.figures.indexOf(gameState.figures[j]), 1)
                 */
                isDone = true;
            }
        }
    }

}
function update(tick) {
    gameState.figures.map( function (x) {
        x.update()
    })
    collisionsWithBorders()
    collisionsTree()
    //simpleCollision()
}
function  collisionsTree(){
    let tree = new QuadTree(gameState.area)
    let points = []
    for(let fig of gameState.figures)
        points.push(fig.center())
    points.forEach(p=>tree.insert(p))
    let candidates =[]
    for (let i = 0;i< points.length;i++) {
        const len = 100
        const bounds = new Rectangle(points[i].x-50, points[i].y-50, len, len)
        tree.queryRange(bounds, candidates)
        for (let other of candidates) {
            if (points[i].figure != other.figure && points[i].figure.intersects(other.figure)) {
                points[i].figure.collisionCount++
                other.figure.collisionCount++
                points[i].figure.highlight()
                other.figure.highlight()
                other.figure.vy = -1 * other.figure.vy
                other.figure.vx = -1 * other.figure.vx
                points[i].figure.vy = -1 * points[i].figure.vy
                points[i].figure.vx = -1 * points[i].figure.vx
                /*
                if (points[i].figure.collisionCount >=3)
                    gameState.figures.splice(gameState.figures.indexOf(points[i].figure), 1)
                if (other.figure.collisionCount >= 3)
                    gameState.figures.splice(gameState.figures.indexOf(other.figure), 1)
                */
            }
        }
    }
}

function collisionsWithBorders(){
    gameState.figures.map(function (x){
        if(x.intersects(new rectangle(0,0,canvas.width,0)))
            x.vy = -1 *x.vy
        if(x.intersects(new rectangle(0,canvas.height,canvas.width,0)))
            x.vy = -1 *x.vy
            //x.y = 20
        if(x.intersects(new rectangle(0,0,0,canvas.height)))
            x.vx = -1 *x.vx
        if(x.intersects(new rectangle(canvas.width,0,0,canvas.height)))
            x.vx = -1 *x.vx
    })
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}


function setup() {

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms
    gameState.figures = new Array()

    gameState.area = new rectangle(0,0,canvas.width,canvas.height)


    for (let i = 0;i<5;i++){
        let randomX = getRandomIntInclusive(20,canvas.width-25)
        let randomY = getRandomIntInclusive(20,canvas.height -25)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(1,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new Circle(randomX,randomY,50,color[randomColor],vx,vy,0))
    }
    /*
    for (let i = 0;i<2;i++){
        let randomX = getRandomIntInclusive(20,canvas.width-25)
        let randomY = getRandomIntInclusive(20,canvas.height -25)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(1,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new hexagon(randomX,randomY,50,color[0],vx,vy))
    }
    */

    for (let i = 0;i<5;i++){
        let randomX = getRandomIntInclusive(20,canvas.width-25)
        let randomY = getRandomIntInclusive(20,canvas.height -25)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(1,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new triangle(randomX,randomY,50,color[randomColor],vx,vy))
    }/*
    for (let i = 0;i<2;i++){
        let randomX = getRandomIntInclusive(20,canvas.width-25)
        let randomY = getRandomIntInclusive(20,canvas.height -25)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(1,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new rectangle(randomX,randomY,30,50,color[randomColor],vx,vy,0))
    }
    */
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min + 1) + min);
}

setup();
run();
/*
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d');
gameState.figures.map( x => {
    x.draw(context)
})
/*
const area = new rectangle(0,0,canvas.width,canvas.height)
const tree = new QuadTree(area)
let points = []
for(let fig of gameState.figures){
    points.push(fig.center())
}
points.forEach(p=>tree.insert(p))
console.log(points[0])
let candidates =[]
for (let i = 0;i< points.length;i++){
    console.log(points[i])
    const len = 100
    const bounds = new Rectangle(points[i].x,points[i].y,len,len)
    tree.queryRange(bounds,candidates)

    for(const other of candidates){
        if(points[i].figure != other.figure && points[i].figure.intersects(other.figure)){
            console.log('gtht')
        }
    }
}
*/
/*
let fig = new Circle(10,50,20)
let t = new triangle(20,80,24)
let st = new Straight(t.center().x,t.center().y,10,150)
let tt = t.getStraights(t)
const context = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
st.draw(context)
*/









