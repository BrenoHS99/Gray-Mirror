let mainMenuTheme = new Audio("audio/songs/menu.mp3")

const startButton = document.getElementById("startButton")

startButton.addEventListener("mouseenter", function(){
    let buttonHoverSound = new Audio("audio/sfx/buttonHover.wav")
    buttonHoverSound.play()
    buttonHoverSound.addEventListener("ended", function(){
        buttonHoverSound = null
    })
})

document.addEventListener("mousemove", function(){
    mainMenuTheme.loop = true
    if (!mainMenuTheme.onplaying){
        mainMenuTheme.play()
    }
})

startButton.addEventListener("click", function(){
    window.location.replace("cutscenes/intro/cutscene.html")
})