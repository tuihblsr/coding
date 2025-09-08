var Game = { food: 0, water: 0, progression: 0 }

const prologue = document.getElementById('prologue');
const topBar = document.getElementById('top-bar');
const log = document.getElementById('log');

const gameScreen = document.getElementById('game-screen');
const getupScreen = document.getElementById('getup-screen');
const scavengeScreen = document.getElementById('scavenge-screen');

const getUpButton = document.getElementById('get-up-btn');
const scavengeButton = document.getElementById('scavenge-btn');

function addLog(message) {
    const entry = document.createElement('p');
    entry.textContent = message;
    if (log.childElementCount > 20) log.removeChild(log.lastChild);
    log.prepend(entry);
}

function animateButton(button, duration, onComplete) {
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = Math.min((timestamp - start) / duration, 1);

        button.style.background = `conic-gradient(rgba(245,197,24,0.4) ${progress * 360}deg, transparent 0deg)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            button.style.background = '';
            if (onComplete) onComplete(button);
        }
    }

    requestAnimationFrame(animate);
}

// Prologue continue
document.getElementById('continue-btn').addEventListener('click', () => {
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

// Get up button
getUpButton.addEventListener('click', () => {
    getUpButton.disabled = true;
    animateButton(getUpButton, 1500, () => {
        addLog("You get up slowly, pain shooting through your side.");
        startScavengePhase();
    });
});

// Scavenge phase
function startScavengePhase() {

    getupScreen.style.opacity = 0;
    setTimeout(() => {
        getupScreen.classList.remove('active');
        getupScreen.style.display = 'none';
        scavengeScreen.style.display = 'block';
        setTimeout(() => scavengeScreen.classList.add('active'), 10);
    }, 1000);

    scavengeButton.addEventListener('click', () => {
        scavengeButton.disabled = true;
        addLog("flavour text for searching...");
        animateButton(scavengeButton, 1500, () => {
            addLog("You found something.");
            scavengeButton.disabled = false;
        });
    });
}
