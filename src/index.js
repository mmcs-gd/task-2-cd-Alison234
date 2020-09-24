import rectangle from "./rectangle";
import triangle from "./triangle";

const canvas = document.getElementById("cnvs");

const gameState = {};

const color = ["red","blue","green","yellow","gray",'#39a7db'];

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
    drawRectangle(context)
    drawTriangle(context)
    context.beginPath();

}

function update(tick) {
    gameState.rectangles.map( function (x) {
        x.y += x.vy
        x.x += x.vx
    })
    gameState.triangles.map( function (x) {
        x.y += x.vy
        x.x += x.vx
    })
    collisions()
}

function collisions(){
    gameState.rectangles.map(function (x){
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

function drawRectangle(context){
    gameState.rectangles.map( function (x) {
        context.beginPath();
        context.rect(x.x, x.y, x.w, x.h);
        context.fillStyle = x.color;
        context.shadowColor = x.color;
        context.shadowBlur = 10;
        context.fill();
        context.closePath();
    })
}

function drawTriangle(context){
    gameState.triangles.map( function (x) {
        context.beginPath();
        context.moveTo(x.x,x.y)
        context.lineTo(x.x+x.l,x.y +x.l)
        context.lineTo(x.x-x.l,x.y +x.l)
        context.fillStyle = x.c
        context.fill()
        context.closePath()
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

function setupRectangles(){
    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let randomWidth = getRandomIntInclusive(20,40)
        let randomHeight = getRandomIntInclusive(20,40)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.rectangles.push(new rectangle(randomX,randomY,randomWidth,randomHeight,color[randomColor],vx,vy))
    }
}

function setupTriangles(){
    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let randomLen = getRandomIntInclusive(20,40)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.triangles.push(new triangle(randomX,randomY,randomLen,color[randomColor],vx,vy))
    }
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms
    gameState.rectanglesVx = 5
    gameState.rectanglesVy = 5
    gameState.rectangles = new Array()
    gameState.triangles = new Array()
    setupRectangles()
    setupTriangles()
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min + 1) + min);
}

setup();
run();
console.log(gameState.triangles)