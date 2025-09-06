const prologue = document.getElementById('prologue');
const gameScreen = document.getElementById('game-screen');
const continueBtn = document.getElementById('continueBtn');

continueBtn.addEventListener('click', () => {
  // Fade out prologue
  prologue.style.opacity = 0;

  setTimeout(() => {
    prologue.classList.remove('active');
    prologue.style.display = 'none';

    // Show and fade in game screen
    gameScreen.style.display = 'flex';
    setTimeout(() => {
      gameScreen.classList.add('active');
    }, 10);
  }, 1000); // Wait for fade-out before hiding
});
