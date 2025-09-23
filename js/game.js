const plr = document.getElementById("plr")

let speed = 3

let plrPosX = 250
let plrPosY = 100

let plrOldPosX = 0
let plrOldPosY = 0

const keys = {}

let walking = false

let plrWidth = 95
let plrHeight = 150
plr.style.width = plrWidth + "px"
plr.style.height = plrHeight + "px"

document.addEventListener("keydown", function(e){
    keys[e.key] = true
})

document.addEventListener("keyup", function(e){
    keys[e.key] = false
})

window.addEventListener("wheel", function(e){ // trava o zoom da pagina
    if(e.ctrlKey){
        e.preventDefault()
    }
}, {passive: false})
window.addEventListener("keydown", function(e){
    if(e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')){ // trava o zoom da pagina
        e.preventDefault();
    }
});

class Obstacle{
    constructor(x, y, width, height, src){
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.element = document.createElement("img")
        this.element.src = src
        this.element.style.width = width + "px"
        this.element.style.height = height + "px"
        this.element.style.position = "absolute"
        this.element.style.left = x + "px"
        this.element.style.top = y + "px"

        document.body.appendChild(this.element)
    }

    collision(){
        if(
            plrPosX < this.x + this.width &&
            plrPosX + plrWidth > this.x &&
            plrPosY < this.y + this.height &&
            plrPosY + plrHeight > this.y
        ){
            plrPosX = plrOldPosX
            plrPosY = plrOldPosY
        }
    }
}

// array com as instâncias de objetos do cenário
let obstacles = [
    box = new Obstacle(100, 700, 300, 300, "sprites/objects/box.png"),

    bed = new Obstacle(100, 100, 150, 200, "sprites/objects/bed.png"),

    wall1 = new Obstacle(0, 0, 30, 9999, "sprites/objects/wall.png"),
    wall2 = new Obstacle(1900, 0, 30, 9999, "sprites/objects/wall.png"),
    wall3 = new Obstacle(0, 0, 1900, 30, "sprites/objects/wall.png"),
    wall4 = new Obstacle(0, 970, 1900, 999, "sprites/objects/wall.png"),
]

function MovePlayer(){ // método para mover o jogador
    walking = false

    plrOldPosX = plrPosX
    plrOldPosY = plrPosY

    if(keys["ArrowUp"]){
        walking = true
        plrPosY -= speed
    }
    if(keys["ArrowDown"]){
        walking = true
        plrPosY += speed
    }
    if(keys["ArrowLeft"]){
        walking = true
        plrPosX -= speed
    }
    if(keys["ArrowRight"]){
        walking = true
        plrPosX += speed
    }
    if(walking && !plr.src.includes("noahWalking.gif")){
        plr.src = "sprites/player/noahWalking.gif"
    }
    if(!walking && !plr.src.includes("noahIdle.gif")){
        plr.src = "sprites/player/noahIdle.gif"
    }

    for (obs of obstacles){
        obs.collision()
    }

    plr.style.top = plrPosY + "px"
    plr.style.left = plrPosX + "px"
}

function Main(){
    MovePlayer()
}

setInterval(Main, 10)