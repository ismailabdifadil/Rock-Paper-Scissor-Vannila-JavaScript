const resultElm = document.querySelector('.js-result');
const computeMoveElm = document.querySelector('.js-moves');
const scoreElm = document.querySelector('.js-score');
const autoPlayButton = document.querySelector('.auto-play-button');
const resetScoreButton = document.querySelector('.reset-score-button');
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');
const confirmation = document.querySelector('.js-confirmation');
const yesButton = document.querySelector('.js-yes-button');
const noButton = document.querySelector('.js-no-button');

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'r') {
    playGame('rock');
  } else if (e.key === 'p') {
    playGame('paper');
  } else if (e.key === 's') {
    playGame('scissors');
  } else if (e.key === 'a') {
    autoPlay();
  } else if (e.key === 'Backspace') {
    resetScore();
  } else if (e.key === ' ') {
    autoPlay();
  }
});

rockButton.addEventListener('click', () => {
  playGame('rock');
});
paperButton.addEventListener('click', () => {
  playGame('paper');
});
scissorsButton.addEventListener('click', () => {
  playGame('scissors');
});

const resetScore = () => {
  score.win = 0;
  score.lose = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElm();
};

let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  ties: 0,
};

resetScoreButton.addEventListener('click', () => {
  confirmation.style.display = 'block';

  yesButton.addEventListener('click', () => {
    resetScore();
    confirmation.style.display = 'none';
  });

  noButton.addEventListener('click', () => {
    confirmation.style.display = 'none';
  });

  // resetScore();
});

autoPlayButton.addEventListener('click', () => {
  autoPlay();
});

updateScoreElm();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (isAutoPlaying === false) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Plying';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'scissors') {
      result = 'Tie';
      score.ties++;
    } else if (computerMove === 'rock') {
      result = 'You lose';
      score.lose++;
    } else if (computerMove === 'paper') {
      result = 'You win';
      score.win++;
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'Tie';
      score.ties++;
    } else if (computerMove === 'scissors') {
      result = 'You lose';
      score.lose++;
    } else if (computerMove === 'rock') {
      result = 'You win';
      score.win++;
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
      score.ties++;
    } else if (computerMove === 'paper') {
      result = 'You lose';
      score.lose++;
    } else if (computerMove === 'scissors') {
      result = 'You win';
      score.win++;
    }
  }

  localStorage.setItem('score', JSON.stringify(score));

  resultElm.innerHTML = `${result}`;

  computeMoveElm.innerHTML = `You 
    <img src="img/${playerMove}-emoji.png" class="move-icon" alt="" />

    <img src="img/${computerMove}-emoji.png" class="move-icon" alt="" />
    Computer`;

  updateScoreElm();
}

function updateScoreElm() {
  scoreElm.innerHTML = `Win: ${score.win} Lose: ${score.lose} Ties: ${score.ties}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}
