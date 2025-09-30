let currentText = 0

let cutsceneSong = new Audio("../../audio/songs/menu.mp3")

let cutsceneTexts = [
    "Após um duelo desafiador contra o Rei de Vidro...",
    "Noah lança um golpe em um ponto frágil que acaba despedaçando o Rei de Vidro por completo!",
    "Depois disso, Noah vê um portão brilhante à sua frente, e a única coisa que ele pensa em fazer...",
    "Era sair daquele lugar...",
    "Você venceu",
    "Jogo feito por: Breno Henrique da Silva Souza e Enzo Miranda Bezerra",
    "Obrigado por jogar :)"
]

document.addEventListener("keydown", function(e){
    if(e.key == "z" || e.key == "Z"){
        currentText++
        AddCutsceneText()
    }
    cutsceneSong.loop = true
    if(!cutsceneSong.onplaying){
        cutsceneSong.play()
    }
})

AddCutsceneText()

function AddCutsceneText(){
    switch(currentText){
        case 3:
            ClearTexts()
            break
        case 4:
            ClearTexts()
            break
        case 5:
            ClearTexts()
            break
        case 6:
            ClearTexts()
            break
        case 7:
            window.location.replace("../../GrayMirror.html")
            break
    }

    let cutsceneText = document.createElement("h1")
    cutsceneText.classList.add("cutsceneTextsClass")
    document.body.appendChild(cutsceneText)
    if (currentText == 4){
        cutsceneText.style.fontSize = "80px"
    }
    cutsceneText.textContent = cutsceneTexts[currentText]
}

function ClearTexts(){
    const cutsceneTextElements = document.querySelectorAll(".cutsceneTextsClass")
    
    cutsceneTextElements.forEach(function(element){
        element.remove()
    })
}