import rectangle from "./rectangle";
import triangle from "./triangle";
import hexagon from "./hexagon";
import Figure from "./Figure";
import Circle from "./Circle";

const canvas = document.getElementById("cnvs");

const gameState = {};

const color = ["#cfa37a","#b4d266","#9c71ec","#c45ddd","#39a7db",'#39a7db'];

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    gameState.figures.map( function (x) {
        x.draw(context)
    })

    context.beginPath();

}

function update(tick) {
    gameState.figures.map( function (x) {
        x.update()
    })
    collisionsWithBorders()
}

function collisionsWithBorders(){
    gameState.figures.map(function (x){
        if(x.intersects(new rectangle(0,0,canvas.width,0)))
            x.vy = -1 *x.vy
        if(x.intersects(new rectangle(0,canvas.height,canvas.width,0)))
            x.vy = -1 *x.vy
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

    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let randomLen = getRandomIntInclusive(20,40)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new triangle(randomX,randomY,randomLen,color[randomColor],vx,vy))
    }

    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let randomWidth = getRandomIntInclusive(20,40)
        let randomHeight = getRandomIntInclusive(20,40)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new rectangle(randomX,randomY,randomWidth,randomHeight,color[randomColor],vx,vy))
    }


    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let randomRadius = getRandomIntInclusive(10,20)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new Circle(randomX,randomY,randomRadius,color[randomColor],vx,vy))
    }

    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let len = getRandomIntInclusive(10,30)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new hexagon(randomX,randomY,len,color[randomColor],vx,vy))
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min + 1) + min);
}

setup();
run();
