// Define constants
const highScoresList = document.querySelector("#highScoresList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []
const clearButton = document.querySelector("#reset-button")
// Map highScores and add them to listem item highScoresList
highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")
// Clear high scores list when the clearButton is pressed
clearButton.addEventListener("click", function() {
    localStorage.clear()

    highScoresList.innerHTML = ""
})
    


