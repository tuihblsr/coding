const prologue = document.getElementById('prologue');
const gameScreen = document.getElementById('game-screen');
const continueBtn = document.getElementById('continueBtn');
const topBar = document.getElementById('top-bar');
const log = document.getElementById('log');


function addLog(message) {
    const entry = document.createElement('p');
    entry.textContent = message;
    if (log.childElementCount > 20) {
        log.removeChild(log.lastChild);
        log.prepend(entry);
    } else {
        log.prepend(entry);
    }
}

// Prologue "continue"
continueBtn.addEventListener('click', () => {
    prologue.style.opacity = 0;

    setTimeout(() => {
        prologue.classList.remove('active');
        prologue.style.display = 'none';

        gameScreen.style.display = 'flex';
        setTimeout(() => {
            gameScreen.classList.add('active');
            topBar.classList.add('visible');
            log.classList.add('visible');

            addLog("need flavour text");
        }, 10);
    }, 1000);
});

const getUpButton = gameScreen.querySelector('button');

getUpButton.addEventListener('click', () => {
  getUpButton.disabled = true;
  const duration = 1500; // ms
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let progress = Math.min((timestamp - start) / duration, 1);
    getUpButton.style.background = `linear-gradient(to right, rgba(245,197,24,0.4) ${progress * 100}%, transparent ${progress * 100}%)`;
    getUpButton.textContent = `get up... ${Math.floor(progress * 100)}%`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      addLog("You get up slowly, pain shooting through your side.");
      getUpButton.textContent = 'You got up!';
    }
  }

  requestAnimationFrame(animate);
});