import { bleh } from './data.js';

bleh.upgrade = function (info) {
    this.name = info.name;
    this.desc = info.desc;
    this.baseprice = info.price;
    this.price = this.baseprice;
    this.own = 0;

    bleh.upgrades[this.name] = this;
};

bleh.generator = function (info) {
    this.name = info.name;
    this.id = info.id;
    this.desc = info.desc;
    this.baseprice = { ...info.price };
    this.price = { ...info.price };
    this.prod = info.prod || (() => 0);
    this.amount = 0;
    this.req = info.req || (() => true);

    this.buy = () => {
        if (bleh.spendresources(this.price)) {
            this.amount++;
            this.updateprice();
        }
    };

    this.updateprice = () => {
        for (let resource in this.baseprice) {
            this.price[resource] = Math.round(this.baseprice[resource] * Math.pow(1.15, this.amount));
        }
    };

    this.getproduction = () => this.prod() * this.amount;

    bleh.generators[this.name] = this;
};

bleh.creategenerators = function () {
    new bleh.generator({
        name: 'Glass Blower',
        id: 'glassblower',
        desc: 'Slavery at its finest',
        price: { Windows: 10 },
        prod: () => 1 + bleh.has('Stronger Pickaxes')
    });

    new bleh.generator({
        name: 'Wrecking Ball',
        id: 'wreckingball',
        desc: 'Smashes 1 Window into 10 Glass',
        price: { Windows: 20 },
        prod: () => 10,
        req: () => bleh.resources['Windows'] >= 35
    });
};

bleh.createupgrades = function () {
    new bleh.upgrade({
        name: 'Stronger Pickaxes',
        desc: 'Coal miners produce 0.1 more coal a second',
        price: { Buildings: 10 }
    });
};
