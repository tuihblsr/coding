export const bleh = {};

bleh.rewrites = 4;

bleh.start = function () {
    bleh.fps = 60;

    bleh.dayduration = 60;
    bleh.daytimer = 0;
    bleh.daycount = 0;

    bleh.fib = [1, 2];
    bleh.fibindex = 0;

    bleh.resources = { Glass: 0, Windows: 0 };
    bleh.upgrades = {};
    bleh.generators = {};

    bleh.displayelements = {
        generators: new Set(),
        upgrades: new Set(),
        achievements: new Set(),
    };

    bleh.daycounter = document.getElementById('dayCounter');
    bleh.generatorbox = document.querySelector('.generatorBox');
    bleh.glassdisplay = document.getElementById('glassDisplay');
    bleh.windowsdisplay = document.getElementById('windowsDisplay');
    bleh.glasstowindowsdisplay = document.getElementById('glassToWindowsDisplay');
    bleh.imagebox = document.querySelector('.imageBox');
};

bleh.has = function (item) {
    return bleh.upgrades[item] ? bleh.upgrades[item].own : 0;
};

bleh.canafford = function (price) {
    for (let resource in price) {
        if (!bleh.resources[resource] || bleh.resources[resource] < price[resource]) {
            return 0;
        }
    }
    return 1;
};

bleh.spendresources = function (price) {
    if (!bleh.canafford(price)) return 0;
    for (let resource in price) {
        bleh.resources[resource] -= price[resource];
    }
    return 1;
};
