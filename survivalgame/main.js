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
  addLog("You get up slowly, pain shooting through your side.");
});
