import { bleh } from './data.js';
import './buildings.js';
import './ui.js';
import './core.js';

window.addEventListener("DOMContentLoaded", () => {
    bleh.start();
    bleh.creategenerators();
    bleh.createupgrades();

    let last = performance.now();

    function gameloop(now) {
        const delta = (now - last) / 1000;
        last = now;

        bleh.daytimer += delta;

        if (bleh.daytimer >= bleh.dayduration) {
            bleh.daytimer -= bleh.dayduration;
            bleh.newday();
        }

        bleh.convertglasstowindows();
        bleh.updateui();

        requestAnimationFrame(gameloop);
    }

    requestAnimationFrame(gameloop);
});
