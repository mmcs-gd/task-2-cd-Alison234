import rectangle from "./rectangle";
import triangle from "./triangle";
import hexagon from "./hexagon";
import Figure from "./Figure";
import Circle from "./Circle";
import Straight from "./Straight";
import QuadTree from "./quad-tree";
import Rectangle from "./rectangle";
import Point from "./Point";
import circle from "./Circle";

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
    for(let i=0;i<gameState.figures.length;i++) {
        for (let j = 0; j < gameState.figures.length; j++) {
            if (gameState.figures[i].intersects(gameState.figures[j]) &&  gameState.figures[i] != gameState.figures[j]) {
                gameState.figures[i].collisionCount++
                gameState.figures[j].collisionCount++
                gameState.figures[i].color = color[color.indexOf(gameState.figures[i].color) + 1];
                gameState.figures[j].color = color[color.indexOf(gameState.figures[j].color) + 1];
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
    for (let i = 0;i< points.length;i++) {
        let candidates =[]
        const len = 50
        const bounds = new Rectangle(points[i].x-25, points[i].y-25, len, len)
        tree.queryRange(bounds, candidates)
        for (let other of candidates) {
            if (points[i].figure != other.figure && points[i].figure.intersects(other.figure)) {
                points[i].figure.highlight()
                other.figure.highlight()
                points[i].figure.collisionCount++
                other.figure.collisionCount++
                other.figure.vy = -1 * other.figure.vy
                other.figure.vx = -1 * other.figure.vx
                points[i].figure.vy = -1 * points[i].figure.vy
                points[i].figure.vx = -1 * points[i].figure.vx
            }
        }
    }
}

function collisionsWithBorders(){
    gameState.figures.map(function (x){
        if(x.intersects(new rectangle(0,0,canvas.width,0)))
            x.vy = -1 *x.vy
        if(x.intersects(new rectangle(0,canvas.height,canvas.width,0)))
            //x.vy = -1 *x.vy
            x.y = 20
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

function RandomParam(){
    let param = []
    param.push(getRandomIntInclusive(20,canvas.width-25))
    param.push(getRandomIntInclusive(20,canvas.height -25))
    param.push(getRandomIntInclusive(-2,2))
    param.push(getRandomIntInclusive(1,2))
    param.push(getRandomIntInclusive(0,color.length-2))
    return param
}

function setup() {

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms
    gameState.figures = new Array()

    gameState.area = new rectangle(0,0,canvas.width,canvas.height)

    gameState.figuresCount = 400
    for (let i = 0;i < gameState.figuresCount/4;i++){
        let param = RandomParam()
        gameState.figures.push(
            new Circle(param[0],param[1],5,color[param[4]],param[2],param[3],0))
         param = RandomParam()
        gameState.figures.push (new triangle(param[0],param[1],5,color[param[4]],param[2],param[3],0))
         param = RandomParam()
        gameState.figures.push(new hexagon(param[0],param[1],5,color[param[4]],param[2],param[3],0))
        param = RandomParam()
        gameState.figures.push(new rectangle(param[0],param[1],5,10,color[param[4]],param[2],param[3],0))
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min + 1) + min);
}

setup();
run();





