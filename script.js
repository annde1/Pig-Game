'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //# is selector for IDs
const score1El = document.getElementById('score--1'); //not using selector only passing ID name
const current0El = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //declaring variables outside the function init so they will exists

//Starting conditions:

const init = function () {
  scores = [0, 0]; //storing score o both player in an array (player 1 position 0, player 2 position 1)
  currentScore = 0;
  activePlayer = 0; //begining active player is player (0)
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1el.textContent = 0;
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //reseting current score of player 0 before switching to player 1
  currentScore = 0; //reseting the score to 0 because 1 was rolled and he lost his points
  //Whenever player rolls 1 we enter this code block (switch player and reset score to 0)
  activePlayer = activePlayer === 0 ? 1 : 0; //reassiging the active player var. If the active player is play 0 then switch to 1
  player0El.classList.toggle('player--active'); //toggle check for class name and if element does  not contain the class name then toggle adds it.Player--active switches the background on the active player
  player1El.classList.toggle('player--active');
};

//Roll dice functionality:

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll betwen 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //updating the source of the displayed image

    //3.check for 1 and if true switch to next player

    if (dice !== 1) {
      //add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game:
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch player:
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init); //we do not call the function here, we are just passing it as a value. JS is calling it
