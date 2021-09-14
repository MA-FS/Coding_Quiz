// Define constants
const username = document.querySelector("#username")
const saveScoreButton = document.querySelector("#saveScoreButton")
const finalScore = document.querySelector("#finalscore")
const mostRecentScore = localStorage.getItem("mostRecentScore")

const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const MAX_HIGH_SCORES = 5
// Get most recent score from local storage and display on page
finalScore.innerText = mostRecentScore
// Until the username contains a value, disable the saveScoreButton
username.addEventListener("keyup", () => {
    saveScoreButton.disabled = !username.value
})
// Define saveHighScore function
saveHighScore = e => {
    e.preventDefault()
    // Place values into score object
    const score = {
        score: mostRecentScore,
        name: username.value
    }
    // Add score to highScores object
    highScores.push(score)
    // Sort highScores according to score
    highScores.sort((a,b) => {
        return b.score - a.score
    })
    // Keep only MAX_HIGH_SCORES high scores, remove last element after sorting
    highScores.splice(MAX_HIGH_SCORES)
    // Save highScores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores))
    // Go to highscores page
    window.location.assign("./highscores.html")
}
