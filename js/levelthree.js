let gameSong = new Audio("../audio/songs/supercacos.mp3")

let battleEnter = new Audio("../audio/sfx/battleEnter.wav")

const plr = document.getElementById("plr")

let speed = 3

let plrPosX = 150
let plrPosY = 300

let plrOldPosX = 0
let plrOldPosY = 0

const keys = {}

let walking = false

let plrWidth = 95
let plrHeight = 150
plr.style.width = plrWidth + "px"
plr.style.height = plrHeight + "px"

let onBattle = false

let battleOption = 1

let playerHpValue = 100
let healAmount = 3
let defendChance = 1
let magicCharge = 0

let currentEnemy

let enemiesDefeated = 0
let totalEnemies

let nextLevel = "../cutscenes/final/cutscene.html"

document.addEventListener("keydown", function(e){
    if (!onBattle){
        keys[e.key] = true
    }
    gameSong.loop = true
    if(!gameSong.onplaying){
        gameSong.play()
    }
})

document.addEventListener("keyup", function(e){
    keys[e.key] = false
})

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

    collisionFunction(Action){
        if(
            plrPosX < this.x + this.width &&
            plrPosX + plrWidth > this.x &&
            plrPosY < this.y + this.height &&
            plrPosY + plrHeight > this.y
        ){
            Action()
        }
    }

    destroy(objectsArray){
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element)
        }
        this.element = null
        const index = objectsArray.indexOf(this)
        if (index > -1) objectsArray.splice(index, 1)
    }
}

class Enemy extends Obstacle {
    constructor(x, y, width, height, src, hp, name, damageDealt1, damageDealt2) {
        super(x, y, width, height, src)
        this.hp = hp
        this.name = name
        this.damageDealt1 = damageDealt1
        this.damageDealt2 = damageDealt2

        this.hpText = document.createElement("h1")
        document.body.appendChild(this.hpText)
        Object.assign(this.hpText.style, {
            color: "white",
            position: "absolute",
            left: this.x + "px",
            top: this.y - 45 + "px",
            fontFamily: "Courier New",
            zIndex: 2
        })
    }

    takeDamage(damageTaken) {
        this.hp -= damageTaken
        UpdatePlrStatus()
        this.hpText.textContent = this.name + ": " + this.hp
        if (this.hp <= 0) {
            onBattle = false
            battleHud.element.style.display = "none"
            battleOption = 1

            if (this.hpText && this.hpText.parentNode) {
                this.hpText.parentNode.removeChild(this.hpText)
            }
            this.hpText = null

            enemiesDefeated++
            if (enemiesDefeated >= totalEnemies){
                window.location.replace(nextLevel)
            }
            this.destroy(enemies)
        }
    }

    checkBattle() {
        if (
            plrPosX < this.x + this.width &&
            plrPosX + plrWidth > this.x &&
            plrPosY < this.y + this.height &&
            plrPosY + plrHeight > this.y
        ) {
            battleEnter.play()
            this.hpText.textContent = this.name + ": " + this.hp
            onBattle = true
            currentEnemy = this
            plr.src = "../sprites/player/noahIdle.gif"
        }
    }
}

// VARIÁVEL DA FASE -----------------------------------------------------------------------------------------------------------------
let obstacles = [
    wall = new Obstacle(0, 0, 100, 999999, "../sprites/objects/wall.png"),
    wall1 = new Obstacle(1500, 0, 99999, 999999, "../sprites/objects/wall.png"),
    wall2 = new Obstacle(0, 0, 1900, 100, "../sprites/objects/wall.png"),
    wall3 = new Obstacle(0, 650, 1900, 99999, "../sprites/objects/wall.png"),
]

let enemies = [
    boss = new Enemy(600, 200, 300, 300, "../sprites/enemies/super cacos.gif", 1000, "Rei de Vidro", 10, 30),
]
// ----------------------------------------------------------------------------------------------------------------------------------

totalEnemies = enemies.length

let battleHud = new Obstacle(plrPosX - 60, plrPosY - 55, 185, 50, "../sprites/battleoptions/FightSelected.png")
battleHud.element.style.display = "none"

let playerHp = document.createElement("h1")
document.body.appendChild(playerHp)
playerHp.textContent = "Vida: " + playerHpValue

Object.assign(playerHp.style, {
    color: "white",
    fontSize: "50px",
    fontFamily: "Courier New",
    position: "absolute",
    left: "15px",
    top: "0px",
    margin: "0"
})

let defendChanceText = document.createElement("h1")
document.body.appendChild(defendChanceText)
defendChanceText.textContent = "Chance de Defesa: " + defendChance + "/5"

Object.assign(defendChanceText.style, {
    color: "white",
    fontSize: "50px",
    fontFamily: "Courier New",
    position: "absolute",
    left: "350px",
    top: "0px",
    margin: "0"
})

let magicText = document.createElement("h1")
document.body.appendChild(magicText)
magicText.textContent = "Magia: " + magicCharge + "%"

Object.assign(magicText.style, {
    color: "white",
    fontSize: "50px",
    fontFamily: "Courier New",
    position: "absolute",
    left: "1100px",
    top: "0px",
    margin: "0"
})

let healText = document.createElement("h1")
document.body.appendChild(healText)
healText.textContent = "Cura: " + healAmount

Object.assign(healText.style, {
    color: "white",
    fontSize: "50px",
    fontFamily: "Courier New",
    position: "absolute",
    left: "1500px",
    top: "0px",
    margin: "0"
})

function MovePlayer(){ // método para mover o jogador
    if(!onBattle){
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
        plr.src = "../sprites/player/noahWalking.gif"
    }
    if(!walking && !plr.src.includes("noahIdle.gif")){
        plr.src = "../sprites/player/noahIdle.gif"
    }

    for (obs of obstacles){
        obs.collision()
    }
    for (enm of enemies){
        enm.checkBattle()
    }

    battleHud.element.style.left = (plrPosX - 60) + "px"
    battleHud.element.style.top  = (plrPosY - 55) + "px"

    plr.style.top = plrPosY + "px"
    plr.style.left = plrPosX + "px"
    }
}

document.addEventListener("keydown", function(e){ // botões para batalha
    if(onBattle){
        if(e.key == "ArrowRight"){
            let battleSelectSound = new Audio("../audio/sfx/buttonHover.wav")
            battleSelectSound.play()
            battleSelectSound.addEventListener("ended", function(){
                battleSelectSound = null
            })

            battleOption++
            if(battleOption >= 5){
                battleOption = 1
            }
        }
        if(e.key == "ArrowLeft"){
            let battleSelectSound = new Audio("../audio/sfx/buttonHover.wav")
            battleSelectSound.play()
            battleSelectSound.addEventListener("ended", function(){
                battleSelectSound = null
            })
            
            battleOption--
            if(battleOption <= 0){
                battleOption = 4
            }
        }

        if(e.key == "z" || e.key == "Z"){
            switch(battleOption){
            case 1:
                let skillSound = new Audio("../audio/sfx/attack.mp3")
                skillSound.play()
                skillSound.addEventListener("ended", function(){
                    skillSound = null
                })

                magicCharge += RandomNumber(10, 15)
                currentEnemy.takeDamage(RandomNumber(5, 15))
                PlayerTakeDamage(RandomNumber(currentEnemy.damageDealt1, currentEnemy.damageDealt2))
                if (magicCharge > 100){
                    magicCharge = 100
                    UpdatePlrStatus()
                }
                if(defendChance < 5){
                    defendChance++
                    UpdatePlrStatus()
                }
                break 
            case 2:
                if(RandomNumber(1, defendChance) != 1){
                    let skillSound = new Audio("../audio/sfx/defend.wav")
                    skillSound.play()
                    skillSound.addEventListener("ended", function(){
                        skillSound = null
                    })

                    defendChance = 1
                    PlayerTakeDamage(-50)
                    if (playerHpValue >= 100){
                        playerHpValue = 100
                    }
                    currentEnemy.takeDamage(5)
                }
                else{
                    let skillSound = new Audio("../audio/sfx/attack.mp3")
                    skillSound.play()
                    skillSound.addEventListener("ended", function(){
                        skillSound = null
                    })
                    PlayerTakeDamage(RandomNumber(currentEnemy.damageDealt1, currentEnemy.damageDealt2))
                }
                break 
            case 3:
                if(magicCharge >= 100){
                    let skillSound = new Audio("../audio/sfx/magic.wav")
                    skillSound.play()
                    skillSound.addEventListener("ended", function(){
                        skillSound = null
                    })

                    magicCharge = 0
                    currentEnemy.takeDamage(RandomNumber(30, 70))
                    PlayerTakeDamage(-70)
                    if (playerHpValue >= 100){
                        playerHpValue = 100
                    }
                    UpdatePlrStatus()
                }
                break 
            case 4:
                if(healAmount > 0){
                    let skillSound = new Audio("../audio/sfx/heal.mp3")
                    skillSound.play()
                    skillSound.addEventListener("ended", function(){
                        skillSound = null
                    })

                    healAmount--
                    playerHpValue = 100
                    UpdatePlrStatus()
                }
                break 
            }
        }
    }
})

function PlayerTakeDamage(dmg){
    playerHpValue -= dmg
    UpdatePlrStatus()
}

function UpdatePlrStatus(){
    if(playerHpValue <= 0){
        location.reload()
    }

    playerHp.textContent = "Vida: " + playerHpValue
    healText.textContent = "Cura: " + healAmount
    defendChanceText.textContent = "Chance de Defesa: " + defendChance + "/5"
    magicText.textContent = "Magia: " + magicCharge + "%"

    if(healAmount <= 0){
        healText.style.color = "red"
    }
    else{
        healText.style.color = "white"
    }

    if(defendChance >= 5){
        defendChanceText.style.color = "yellow"
    }
    else if(defendChance <= 1){
        defendChanceText.style.color = "red"
    }
    else{
        defendChanceText.style.color = "white"
    }

    if(magicCharge >= 100){
        magicText.style.color = "yellow"
    }
    else{
        magicText.style.color = "white"
    }
}
UpdatePlrStatus()

function RandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function BattleController(){
    if (onBattle){
        battleHud.element.style.display = "block"
        
        switch(battleOption){
            case 1:
                battleHud.element.src = "../sprites/battleoptions/FightSelected.png"
                break 
            case 2:
                battleHud.element.src = "../sprites/battleoptions/DefendSelected.png"
                break 
            case 3:
                battleHud.element.src = "../sprites/battleoptions/MagicSelected.png"
                break 
            case 4:
                battleHud.element.src = "../sprites/battleoptions/HealSelected.png"
                break 
        }
    }
}

function BattleCheck(){
    onBattle = true
    plr.src = "../sprites/player/noahIdle.gif"
}

function Main(){
    MovePlayer()
    BattleController()
}

setInterval(Main, 10)