gameData = {
    credits: {current: 100, max: 1000, gen: 0},
    command: {current: 0, max: 0},
    metal: {current: 100, max: 1000, gen: 0},
    food: {current: 100, max: 1000, gen: 0},

    buildings: [
        {
            id: "command-centre",
            name: "Command Centre",
            description: "Increases command. Each upgrade allows the construction of 5 facilities.",
            stats: {current: 0, max: 200, capIncrease: 5, cost: 12},
            req: {},
        },
        {
            id: "minebot",
            name: "Minebot",
            description: "Each upgrade increases mining income by 1.",
            stats: {current: 0, max: 100, resourceGen: 1, cost: 20},
            req: {
                show: [],
                unlock: [
                    {building: "command-centre", amount: 1}
                ]
            }
        }
    ],
}

const tabs = document.querySelectorAll('.tab'); // Get all of the tabs
const contents = document.querySelectorAll('.content > div'); // Get all of the tab contents

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
    
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(c => c.classList.remove('active'));
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

function renderBuildings(buildings) {
    const section = document.getElementById("station-content");
    section.innerHTML = "";

    buildings.forEach(building => {
        let canShow = true;
        if (building.req && building.req.show) { // Tbh don't think I need this
            for (requirement of building.req.show) {
                if (requirement.resource) {
                    if (gameData[requirement.resource].current < requirement.amount) {
                        canShow = false;
                        break;
                    }
                } else if (requirement.building) {
                    
                }
            }
        }
    })
}