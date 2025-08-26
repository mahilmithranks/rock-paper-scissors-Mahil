let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 5;

const choices = ["rock", "paper", "scissors"];
const emojiMap = { rock: "✊", paper: "✋", scissors: "✌️" };

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const roundCountEl = document.getElementById("round-count");
const roundResultEl = document.getElementById("round-result");
const finalResultEl = document.getElementById("final-result");
const playAgainBtn = document.getElementById("play-again");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");

const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

const buttons = document.querySelectorAll(".choice");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        clickSound.play();
        playRound(button.id);
    });
});

function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection) {
    if(roundCount >= maxRounds) return;

    const compSelection = computerChoice();

    playerChoiceEl.textContent = emojiMap[playerSelection];
    computerChoiceEl.textContent = emojiMap[compSelection];

    let result = "";

    if(playerSelection === compSelection) {
        result = `Draw! ${emojiMap[playerSelection]} vs ${emojiMap[compSelection]}`;
        animateChoice("draw");
        drawSound.play();
    } else if(
        (playerSelection === "rock" && compSelection === "scissors") ||
        (playerSelection === "paper" && compSelection === "rock") ||
        (playerSelection === "scissors" && compSelection === "paper")
    ) {
        result = `You Win! ${emojiMap[playerSelection]} beats ${emojiMap[compSelection]}`;
        playerScore++;
        animateChoice("win");
        winSound.play();
    } else {
        result = `You Lose! ${emojiMap[compSelection]} beats ${emojiMap[playerSelection]}`;
        computerScore++;
        animateChoice("lose");
        loseSound.play();
    }

    roundCount++;
    updateUI(result);

    if(roundCount === maxRounds) endGame();
}

function animateChoice(type) {
    roundResultEl.classList.add(type + "-flash");
    setTimeout(() => {
        roundResultEl.classList.remove(type + "-flash");
    }, 500);
}

function updateUI(roundResult) {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundCountEl.textContent = roundCount;
    roundResultEl.textContent = roundResult;
}

function endGame() {
    let finalMessage = "";
    if(playerScore > computerScore) finalMessage = "Congratulations! You Won The Game!";
    else if(playerScore < computerScore) finalMessage = "Game Over! Computer Wins The Game!";
    else finalMessage = "It's a Tie Game! Try Again!";
    
    finalResultEl.textContent = finalMessage;
    playAgainBtn.style.display = "inline-block";
}

playAgainBtn.addEventListener("click", resetGame);

function resetGame() {
    playerScore = 0; computerScore = 0; roundCount = 0;
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    roundCountEl.textContent = 0;
    roundResultEl.textContent = "";
    finalResultEl.textContent = "";
    playerChoiceEl.textContent = "-";
    computerChoiceEl.textContent = "-";
    playAgainBtn.style.display = "none";
}
