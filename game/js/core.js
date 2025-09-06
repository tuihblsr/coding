import { bleh } from './data.js';

bleh.convertglasstowindows = function () {
    const cost = bleh.fib[bleh.fibindex];

    if (bleh.resources['Glass'] >= cost) {
        bleh.resources['Glass'] -= cost;
        bleh.resources['Windows'] += 1;

        bleh.fibindex++;
        if (bleh.fibindex >= bleh.fib.length) {
            const nextfib = bleh.fib.at(-1) + bleh.fib.at(-2);
            bleh.fib.push(nextfib);
        }
    }
};

bleh.newday = function () {
    bleh.daycount++;

    const glassblowers = bleh.generators['Glass Blower']?.amount || 0;
    bleh.resources['Windows'] += glassblowers * bleh.generators['Glass Blower'].getproduction();

    const wreckers = bleh.generators['Wrecking Ball']?.amount || 0;
    const windowsUsed = Math.min(wreckers, bleh.resources['Windows']);
    bleh.resources['Windows'] -= windowsUsed;
    bleh.resources['Glass'] += windowsUsed * 10;

    // Reset Fibonacci conversion
    bleh.fibindex = 0;
    bleh.fib = [1, 2];
};
