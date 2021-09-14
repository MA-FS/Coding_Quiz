//  Define Constants
const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progressBarFull")
const timerText = document.querySelector("#timer")

// Define objects, variables and array
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let timeLeft = 75
let availableQuestions = []

// Create an object containing the questions to be asked
let questions = [
    {
        question: "Who invented JavaScript?",
        choice1: "Tim Berners-Lee",
        choice2: "Adam Sandler",
        choice3: "Brendan Eich",
        choice4: "Bjarne Stroustrup",
        answer: 3,
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        choice1: "npm",
        choice2: "Node.js",
        choice3: "TypeScript",
        choice4: "C++",
        answer: 1,
    },
    {
        question: "Which tool can you use to ensure code quality?",
        choice1: "Angular",
        choice2: "jQuery",
        choice3: "ESLint",
        choice4: "RequireJS",
        answer: 3,
    },
    {
        question: "JavaScript File Has An Extension of:",
        choice1: ".exe",
        choice2: ".css",
        choice3: ".html",
        choice4: ".js",
        answer: 4,
    },
    {
        question: "If Button is clicked ______ Event Handler is invoked.",
        choice1: "OnLoad()",
        choice2: "Onclick()",
        choice3: "OnSubmit()",
        choice4: "KeyUp()",
        answer: 2,
    },
    {
        question: "GetMonth() returns The Month as:",
        choice1: "Int",
        choice2: "Float",
        choice3: "Char",
        choice4: "String",
        answer: 1,
    },
    {
        question: "Which of the dialog box's display a message and a data entry field?",
        choice1: "Alert()",
        choice2: "Prompt()",
        choice3: "Msg()",
        choice4: "Confirm()",
        answer: 2,
    },
    {
        question: "What function is used to parse a String to Int?",
        choice1: "Parse.Int",
        choice2: "Array.push",
        choice3: "None",
        choice4: "Int.Parse",
        answer: 4,
    }
]

// Set how many points to score on a correct question
const CORRECT_SCORE_POINTS = 50
// Set how many points to penalise on an incorrect question
const INCORRECT_SCORE_POINTS = 30
// Set the amount of time to deduct from the timer on incorrect answers in seconds
const TIMER_PENALTY = 10
// Set the maximum number of questions
const MAX_QUESTIONS = 8

// Define the startGame function. Reset counters and source available questions
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    localStorage.setItem("mostRecentScore", 0)
    getNewQuestion()
}

// Define the getNewQuestion function
getNewQuestion = () => {
    // Once there are no more questions, save current score to local storage and send user to the end page
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("/end.html")
    }

    // Increment the questionCounter by 1 each time a new question is asked
    questionCounter++
    // Update the HUD information showing which question is being asked
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
    // Increase the HUD progressBar width depending on how many questions have been asked
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //Pick a random question from the list of available questions and fill the page
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    // For each element of the choice array, fill page with the question text from currentQuestion 
    // according to dataset number 
    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })
    // Remove 1 element from availableQuestions array at the current questionIndex
    availableQuestions.splice(questionIndex, 1)
    // Continue to accept answers
    acceptingAnswers = true
}
// Define timer function
timer = () => {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    setInterval(function () {
    // Remove 1 from timeLeft every 1000ms
      timeLeft--;
    // Update the timer on the page based on current timeLeft     
      timerText.innerText = timeLeft
    // End the game if timer reaches 0
      if(timeLeft <= 0) {
        return window.location.assign("/end.html")
      } 

    }, 1000)
}
// Listen for answers
choices.forEach(choice => {
    // Listen for when any choice text is clicked
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return
    
        acceptingAnswers = false
        // Assign selectedChoice to the specific choice text clicked
        const selectedChoice = e.target
        // Assign selectedAnswer to the dataset number of the choice that is clicked
        const selectedAnswer = selectedChoice.dataset["number"]
        // Check to see if the selectedAnswer dataset number matches the currentQuestion answer
        // Choose either correct or incorrect css class to apply to the
        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        // Create statement to apply points / timer changes depending on correctness of answer
        // Fill inner text of selectedChoice to display correctness of answer
            if(classToApply === "correct") {
                incrementScore(CORRECT_SCORE_POINTS),
                selectedChoice.innerText = "Correct!"
            } else 
                decrementScore(INCORRECT_SCORE_POINTS),
                penaliseTime(TIMER_PENALTY),
                selectedChoice.innerText = "Wrong!" 
        // Apply css class to the parent element  
        selectedChoice.parentElement.classList.add(classToApply)
        
        // Return to default class after 1000ms
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            window.scrollTo(0,0)
        }, 1000)
        
    }) 
})
// penaliseTime function to remove time from timeLeft
penaliseTime = num => {
    timeLeft -=num
}
// incrementScore function to add number to score
incrementScore = num => {
    score +=num
    scoreText.innerText = score
    localStorage.setItem("mostRecentScore", score)
}
// decrementScore function to remove number to score
decrementScore = num => {
    score -=num
    scoreText.innerText = score
    localStorage.setItem("mostRecentScore", score)
}
// Run timer function on page load
timer()
// Run start game function on page load
startGame()