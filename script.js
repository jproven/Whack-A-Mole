// Select all square elements in the grid
const squares = document.querySelectorAll('.square')

// Select the score and time display elements
const timeLeft = document.getElementById('time-left')
const score = document.getElementById('score')

// Restart button logic
const restartBtn = document.getElementById('restart-btn')

// Initialize game state
let result = 0
let currentTime = parseInt(timeLeft.textContent, 10)
let hitPosition = null

// Timer references
let moleTimerId = null
let countDownTimerId = null

// Function to randomly place the mole in one of the squares
function randomSquare() {
    // Remove existing mole from all squares
    squares.forEach(square => square.classList.remove('mole'))

    // Choose a random square to be the new mole
    const index = Math.floor(Math.random() * squares.length)
    const mole = squares[index]

    // Add the mole class and store its ID for hit detection
    mole.classList.add('mole')
    hitPosition = mole.id
}

// Add click listeners to each square to detect hits
squares.forEach(square => {
    square.addEventListener('mouseup', () => {
        // Check if the clicked square is the current mole
        if (square.id === hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

// Function to repeatedly move the mole every second
function moveMole() {
    moleTimerId = setInterval(randomSquare, 700)
}

// Function to handle the countdown timer
function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    // End the game when time runs out
    if (currentTime === 0) {
        clearInterval(countDownTimerId)
        clearInterval(moleTimerId)
        alert(`Game over! Final score: ${result}`)
    }
}

restartBtn.addEventListener('click', () => {
    // Reset game state
    result = 0
    currentTime = 60
    score.textContent = result
    timeLeft.textContent = currentTime

    // Clear any existing timers
    clearInterval(moleTimerId)
    clearInterval(countDownTimerId)

    // Start again
    randomSquare()
    moveMole()
    countDownTimerId = setInterval(countDown, 1000)
})

// Start the game
randomSquare()                       // Show first mole
moveMole()                           // Begin mole movement
countDownTimerId = setInterval(countDown, 1000) // Start countdown
