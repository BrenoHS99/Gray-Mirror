let currentText = 0

let cutsceneTexts = [
    "Em uma madrugada chuvosa...",
    "Noah acorda com o som de relâmpagos...",
    "Após isso, por não conseguir dormir, Noah se levanta e procura por uma blusa em seu armário...",
    "Até que ele encontra um portal dentro de seu armário.",
    "E ao atravessar o portal...",
    "...",
    "O mundo mudou...",
    "Existem criaturas que parecem ser feitas de vidro.",
    "O Objetivo de Noah, apesar de não ter conseguido retornar pelo portal",
    "É sair desse mundo.",
    "Derrote o Rei de Vidro."

]

document.addEventListener("keydown", function(e){
    if(e.key == "z" || e.key == "Z"){
        currentText++
        AddCutsceneText()
    }
})

AddCutsceneText()

function AddCutsceneText(){
    switch(currentText){
        case 4:
            ClearTexts()
            break
        case 5:
            ClearTexts()
            break
        case 6:
            ClearTexts()
            break
        case 8:
            ClearTexts()
            break
        case 10:
            ClearTexts()
            break
        case 11:
            window.location.replace("../../levels/levelone.html")
            break
    }

    let cutsceneText = document.createElement("h1")
    cutsceneText.classList.add("cutsceneTextsClass")
    document.body.appendChild(cutsceneText)
    cutsceneText.textContent = cutsceneTexts[currentText]
}

function ClearTexts(){
    const cutsceneTextElements = document.querySelectorAll(".cutsceneTextsClass")
    
    cutsceneTextElements.forEach(function(element){
        element.remove()
    })
}