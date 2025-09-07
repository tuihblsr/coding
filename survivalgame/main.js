const prologue = document.getElementById('prologue');
const gameScreen = document.getElementById('game-screen');
const topBar = document.getElementById('top-bar');
const log = document.getElementById('log');

const continueBtn = document.getElementById('continue-btn');
const getUpButton = document.getElementById('get-up-btn');

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

function animateButton(button, duration, onComplete) {
	let start = null;

	function animate(timestamp) {
		if (!start) start = timestamp;
		let progress = Math.min((timestamp - start) / duration, 1);

		button.style.background = `conic-gradient(rgba(245, 197, 24, 0.4) ${progress * 360}deg, transparent 0deg)`;
		
		if (progress < 1) {
			requestAnimationFrame(animate);
		} else {
			if (onComplete) onComplete(button);
		}
	}

	requestAnimationFrame(animate);
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

getUpButton.addEventListener("click", () => {
	getUpButton.disabled = true;
	animateButton(getUpButton, 1500, (btn) => {
		addLog("You get up slowly, pain shooting through your side.");
    	btn.textContent = 'You got up!';
    	btn.disabled = true;
	});
});