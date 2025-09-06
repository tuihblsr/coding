import { bleh } from './data.js';

bleh.creategeneratorelement = function (generator) {
    const btn = document.createElement('button');
    btn.id = `${generator.id}Btn`;

    const btnname = document.createElement('p');
    btnname.textContent = generator.name;
    btn.appendChild(btnname);

    const btnactions = document.createElement('p');
    btn.appendChild(btnactions);

    const btnbuy = document.createElement('a');
    btnbuy.onclick = () => generator.buy();
    btnbuy.id = `buy${generator.id}`;
    btnbuy.textContent = 'Buy 1';
    btnbuy.style.marginRight = '10px';
    btnactions.appendChild(btnbuy);

    const btnsell = document.createElement('a');
    btnsell.id = `sell${generator.id}`;
    btnsell.textContent = 'Sell';
    btnactions.appendChild(btnsell);

    const btnowned = document.createElement('p');
    btnowned.id = `owned${generator.id}`;
    btnowned.textContent = 'Owned:';
    btn.appendChild(btnowned);

    const btnprice = document.createElement('p');
    btnprice.textContent = 'Price:';
    btn.appendChild(btnprice);

    const btnpricecontent = document.createElement('p');
    btnpricecontent.id = `price${generator.id}`;
    btnprice.appendChild(btnpricecontent);

    return btn;
};

bleh.updateui = function () {
    bleh.glassdisplay.textContent = Math.floor(bleh.resources['Glass']);
    bleh.windowsdisplay.textContent = Math.floor(bleh.resources['Windows']);
    bleh.glasstowindowsdisplay.textContent = `${bleh.fib[bleh.fibindex]} -> 1 Window`;
    bleh.daycounter.textContent = `Time until next day: ${(bleh.dayduration - bleh.daytimer).toFixed(2)}s`;

    for (let generator of Object.values(bleh.generators)) {
        if (!bleh.displayelements.generators.has(generator.id) && generator.req()) {
            const genelement = bleh.creategeneratorelement(generator);
            bleh.generatorbox.appendChild(genelement);
            bleh.displayelements.generators.add(generator.id);
        }

        if (!bleh.displayelements.generators.has(generator.id)) continue;

        const btnowned = document.getElementById(`owned${generator.id}`);
        btnowned.textContent = `Owned: ${generator.amount}`;

        const btnPriceContent = document.getElementById(`price${generator.id}`);
        let priceText = "";
        for (let resource in generator.price) {
            priceText += `${generator.price[resource]} ${resource} `;
        }
        btnPriceContent.textContent = priceText.trim();

        const btnbuy = document.getElementById(`buy${generator.id}`);
        if (bleh.canafford(generator.price)) {
            btnbuy.style.textDecoration = "underline";
            btnbuy.style.pointerEvents = "auto";
            btnbuy.style.color = "inherit";
        } else {
            btnbuy.style.textDecoration = "line-through";
            btnbuy.style.pointerEvents = "none";
            btnbuy.style.color = "grey";
        }
    }
};
