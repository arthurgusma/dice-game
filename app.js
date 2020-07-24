/*
the only purpose of the documentatio is for my own learning process and
has nothing to do with readability for others.
*/

var scores, roundScore, activePlayer, gamePlaying, previusDice, winningScore;


function initGame() {
  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  setDiceNone();
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
}

initGame();

// document.querySelector('#current-' + activePlayer).textContent = dice;
// .textContent = allows us to switch the content inside the object
// HTML content inside JS needs to '' to be reconized as so

// querySelector allows to select an HTML element and change it or re-store it like so:
// var x = document.querySelector('#current-' + activePlayer).textContent;
// if I console.log(x), it shows the .dice content

//DICE ROLL BTN
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    // Math.random generates a random number between 0 and 1.
    // * 6 generates it between 0 and 5
    // and adding 1 to the count makes interval 1 to 6
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice === 6 && previusDice === 6) {
      scores[activePlayer] = 0;
      dice = 0;
      document.querySelector('#current-' + activePlayer).textContent = '0';
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      roundScore += dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      document.querySelector('#current-' + activePlayer).textContent = '0';
      nextPlayer();
    }
  }
  previusDice = dice;
});

// HOLD BTN
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // add roundScore to score- activePlayer.
    scores[activePlayer] += roundScore;

    setDiceNone();
    document.querySelector('#current-' + activePlayer).textContent = '0';
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];


    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      setDiceNone();
      alert('Congrats! You\'ve won the game!')
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }

});

function nextPlayer() {
  previusDice = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // ? then / : else
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', initGame);
// NEW GAME function

function setDiceNone(){
  document.querySelector('.dice').style.display = 'none';
}


document.getElementById('winning-input').addEventListener('input', function(){
  winningScore = document.getElementById('winning-input').value;
});
/* document.getElementById('winning-input').addEventListener(function(){
  winningScore = document.getElementById('winning-input')
})

function setScore(){
  winningScore = document.getElementById('winning-input').value;
}
*/
