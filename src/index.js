import rectangle from "./rectangle";
import triangle from "./triangle";
import hexagon from "./hexagon";
import Figure from "./Figure";
import Circle from "./Circle";

const canvas = document.getElementById("cnvs");

const gameState = {};

const color = ["#cfa37a","#b4d266","#9c71ec","#c45ddd","#39a7db","black"];

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

function collision(){
    let isDone = false;
    for(let i=0;i<gameState.figures.length;i++) {
        for (let j = 0; j < gameState.figures.length; j++) {
            if (gameState.figures[i].intersects(gameState.figures[j]) && !isDone && gameState.figures[i] != gameState.figures[j]) {
                gameState.figures[i].collisionCount++
                gameState.figures[j].collisionCount++
                gameState.figures[i].color = color[color.indexOf(gameState.figures[i].color) + 1];
                gameState.figures[j].color = color[color.indexOf(gameState.figures[j].color) + 1];
                if (gameState.figures[i].collisionCount >=3) {
                    gameState.figures.splice(gameState.figures.indexOf(gameState.figures[i]), 1)
                }
                if (gameState.figures[j].collisionCount >= 3) {
                    gameState.figures.splice(gameState.figures.indexOf(gameState.figures[j]), 1)
                }
                isDone = true;
                console.log(gameState.figures[i].collisionCount)
            }
        }
    }

}
function update(tick) {
    gameState.figures.map( function (x) {
        x.update()
    })
    collisionsWithBorders()
    collision()

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
    /*
    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new rectangle(randomX,randomY,30,35,color[randomColor],vx,vy,0))
    }
    */
    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new triangle(randomX,randomY,30,color[randomColor],vx,vy))
    }


    for (let i = 0;i<40;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new Circle(randomX,randomY,15,color[randomColor],vx,vy,0))
    }
/*
    for (let i = 0;i<10;i++){
        let randomX = getRandomIntInclusive(100,canvas.width-200)
        let randomY = getRandomIntInclusive(100,canvas.height -200)
        let vx = getRandomIntInclusive(-5,5)
        let vy = getRandomIntInclusive(-5,5)
        let randomColor = getRandomIntInclusive(0,color.length-2)
        gameState.figures.push(new hexagon(randomX,randomY,20,color[0],vx,vy))
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
let c = new Circle(2,3,2)
let t = new triangle(1,4,4)
const context = canvas.getContext('2d');
c.draw(context)
t.draw(context)
*/

