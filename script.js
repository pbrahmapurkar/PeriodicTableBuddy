document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const feedback = document.getElementById('feedback');
    const nextLevelBtn = document.getElementById('next-level');
    const levelInfo = document.getElementById('level-info');
    const startGameButton = document.getElementById('start-game-button');
    const backButton = document.getElementById('back-button');
    const elementList = document.getElementById('element-list');
    const dropAreaList = document.getElementById('drop-area-list');
    let currentLevel = 0;
    let activeDraggedElement = null;

    const levels = [
    { elements: [{ name: 'Hydrogen', atomicNumber: 1 }, { name: 'Helium', atomicNumber: 2 }] },
    { elements: [{ name: 'Lithium', atomicNumber: 3 }, { name: 'Beryllium', atomicNumber: 4 }, { name: 'Boron', atomicNumber: 5 }, { name: 'Carbon', atomicNumber: 6 }] },
    { elements: [{ name: 'Nitrogen', atomicNumber: 7 }, { name: 'Oxygen', atomicNumber: 8 }, { name: 'Fluorine', atomicNumber: 9 }, { name: 'Neon', atomicNumber: 10 }] },
    { elements: [{ name: 'Sodium', atomicNumber: 11 }, { name: 'Magnesium', atomicNumber: 12 }, { name: 'Aluminum', atomicNumber: 13 }, { name: 'Silicon', atomicNumber: 14 }] },
    { elements: [{ name: 'Phosphorus', atomicNumber: 15 }, { name: 'Sulfur', atomicNumber: 16 }, { name: 'Chlorine', atomicNumber: 17 }, { name: 'Argon', atomicNumber: 18 }] },
    { elements: [{ name: 'Potassium', atomicNumber: 19 }, { name: 'Calcium', atomicNumber: 20 }, { name: 'Scandium', atomicNumber: 21 }, { name: 'Titanium', atomicNumber: 22 }] },
    { elements: [{ name: 'Vanadium', atomicNumber: 23 }, { name: 'Chromium', atomicNumber: 24 }, { name: 'Manganese', atomicNumber: 25 }, { name: 'Iron', atomicNumber: 26 }] },
    { elements: [{ name: 'Cobalt', atomicNumber: 27 }, { name: 'Nickel', atomicNumber: 28 }, { name: 'Copper', atomicNumber: 29 }, { name: 'Zinc', atomicNumber: 30 }] },
    { elements: [{ name: 'Gallium', atomicNumber: 31 }, { name: 'Germanium', atomicNumber: 32 }, { name: 'Arsenic', atomicNumber: 33 }, { name: 'Selenium', atomicNumber: 34 }] },
    { elements: [{ name: 'Bromine', atomicNumber: 35 }, { name: 'Krypton', atomicNumber: 36 }, { name: 'Rubidium', atomicNumber: 37 }, { name: 'Strontium', atomicNumber: 38 }] },
    { elements: [{ name: 'Yttrium', atomicNumber: 39 }, { name: 'Zirconium', atomicNumber: 40 }, { name: 'Niobium', atomicNumber: 41 }, { name: 'Molybdenum', atomicNumber: 42 }] },
    { elements: [{ name: 'Technetium', atomicNumber: 43 }, { name: 'Ruthenium', atomicNumber: 44 }, { name: 'Rhodium', atomicNumber: 45 }, { name: 'Palladium', atomicNumber: 46 }] },
    { elements: [{ name: 'Silver', atomicNumber: 47 }, { name: 'Cadmium', atomicNumber: 48 }, { name: 'Indium', atomicNumber: 49 }, { name: 'Tin', atomicNumber: 50 }] },
    { elements: [{ name: 'Antimony', atomicNumber: 51 }, { name: 'Tellurium', atomicNumber: 52 }, { name: 'Iodine', atomicNumber: 53 }, { name: 'Xenon', atomicNumber: 54 }] },
    { elements: [{ name: 'Cesium', atomicNumber: 55 }, { name: 'Barium', atomicNumber: 56 }, { name: 'Lanthanum', atomicNumber: 57 }, { name: 'Cerium', atomicNumber: 58 }] },
    { elements: [{ name: 'Praseodymium', atomicNumber: 59 }, { name: 'Neodymium', atomicNumber: 60 }, { name: 'Promethium', atomicNumber: 61 }, { name: 'Samarium', atomicNumber: 62 }] },
    { elements: [{ name: 'Europium', atomicNumber: 63 }, { name: 'Gadolinium', atomicNumber: 64 }, { name: 'Terbium', atomicNumber: 65 }, { name: 'Dysprosium', atomicNumber: 66 }] },
    { elements: [{ name: 'Holmium', atomicNumber: 67 }, { name: 'Erbium', atomicNumber: 68 }, { name: 'Thulium', atomicNumber: 69 }, { name: 'Ytterbium', atomicNumber: 70 }] },
    { elements: [{ name: 'Lutetium', atomicNumber: 71 }, { name: 'Hafnium', atomicNumber: 72 }, { name: 'Tantalum', atomicNumber: 73 }, { name: 'Tungsten', atomicNumber: 74 }] },
    { elements: [{ name: 'Rhenium', atomicNumber: 75 }, { name: 'Osmium', atomicNumber: 76 }, { name: 'Iridium', atomicNumber: 77 }, { name: 'Platinum', atomicNumber: 78 }] },
    { elements: [{ name: 'Gold', atomicNumber: 79 }, { name: 'Mercury', atomicNumber: 80 }, { name: 'Thallium', atomicNumber: 81 }, { name: 'Lead', atomicNumber: 82 }] },
    { elements: [{ name: 'Bismuth', atomicNumber: 83 }, { name: 'Polonium', atomicNumber: 84 }, { name: 'Astatine', atomicNumber: 85 }, { name: 'Radon', atomicNumber: 86 }] },
    { elements: [{ name: 'Francium', atomicNumber: 87 }, { name: 'Radium', atomicNumber: 88 }, { name: 'Actinium', atomicNumber: 89 }, { name: 'Thorium', atomicNumber: 90 }] },
    { elements: [{ name: 'Protactinium', atomicNumber: 91 }, { name: 'Uranium', atomicNumber: 92 }, { name: 'Neptunium', atomicNumber: 93 }, { name: 'Plutonium', atomicNumber: 94 }] },
    { elements: [{ name: 'Americium', atomicNumber: 95 }, { name: 'Curium', atomicNumber: 96 }, { name: 'Berkelium', atomicNumber: 97 }, { name: 'Californium', atomicNumber: 98 }] },
    { elements: [{ name: 'Einsteinium', atomicNumber: 99 }, { name: 'Fermium', atomicNumber: 100 }, { name: 'Mendelevium', atomicNumber: 101 }, { name: 'Nobelium', atomicNumber: 102 }] },
    { elements: [{ name: 'Lawrencium', atomicNumber: 103 }, { name: 'Rutherfordium', atomicNumber: 104 }, { name: 'Dubnium', atomicNumber: 105 }, { name: 'Seaborgium', atomicNumber: 106 }] },
    { elements: [{ name: 'Bohrium', atomicNumber: 107 }, { name: 'Hassium', atomicNumber: 108 }, { name: 'Meitnerium', atomicNumber: 109 }, { name: 'Darmstadtium', atomicNumber: 110 }] },
    { elements: [{ name: 'Roentgenium', atomicNumber: 111 }, { name: 'Copernicium', atomicNumber: 112 }, { name: 'Nihonium', atomicNumber: 113 }, { name: 'Flerovium', atomicNumber: 114 }] },
    { elements: [{ name: 'Moscovium', atomicNumber: 115 }, { name: 'Livermorium', atomicNumber: 116 }, { name: 'Tennessine', atomicNumber: 117 }, { name: 'Oganesson', atomicNumber: 118 }] }
];


    const motivationalPrompts = [
        "Well done!", "Keep it up!", "Awesome job!", "Great work!", "Impressive!"
    ];

    const showMotivationalPrompt = () => {
        const randomPrompt = motivationalPrompts[Math.floor(Math.random() * motivationalPrompts.length)];
        feedback.textContent = randomPrompt;
        feedback.style.color = 'darkblue'; // Set the text color to dark blue
    };

    // Shuffle array utility
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Initialize level
    const initLevel = () => {
        feedback.textContent = '';
        nextLevelBtn.style.display = 'none';
        elementList.innerHTML = '';
        dropAreaList.innerHTML = '';

        const currentElements = [...levels[currentLevel].elements];
        shuffleArray(currentElements);

        currentElements.forEach(element => {
            const elementDiv = createElementDiv(element);
            elementList.appendChild(elementDiv);
        });

        const shuffledDropAreas = [...currentElements];
        shuffleArray(shuffledDropAreas);

        shuffledDropAreas.forEach(element => {
            const dropDiv = createDropAreaDiv(element);
            dropAreaList.appendChild(dropDiv);
        });

        levelInfo.textContent = `Level ${currentLevel + 1}: Match the elements with their atomic numbers!`;
    };

    // Create element div
    const createElementDiv = element => {
        const div = document.createElement('div');
        div.classList.add('element');
        div.draggable = true;
        div.id = element.name.toLowerCase();
        div.dataset.atomicNumber = element.atomicNumber;
        div.textContent = element.name;

        // Mouse events for drag-and-drop
        div.addEventListener('dragstart', event => {
            activeDraggedElement = div;
            event.dataTransfer.setData('text/plain', event.target.id);
        });

        // Touch events for drag-and-drop
        div.addEventListener('touchstart', event => {
            event.preventDefault();
            activeDraggedElement = div;
        });

        div.addEventListener('touchmove', event => {
            event.preventDefault();
            if (activeDraggedElement) {
                const touch = event.touches[0];
                activeDraggedElement.style.position = 'absolute';
                activeDraggedElement.style.left = `${touch.pageX - activeDraggedElement.offsetWidth / 2}px`;
                activeDraggedElement.style.top = `${touch.pageY - activeDraggedElement.offsetHeight / 2}px`;
            }
        });

        div.addEventListener('touchend', event => {
            event.preventDefault();
            const dropElement = document.elementFromPoint(
                event.changedTouches[0].pageX,
                event.changedTouches[0].pageY
            );

            if (dropElement && dropElement.classList.contains('drop-area')) {
                handleDrop(dropElement, activeDraggedElement);
            }
            activeDraggedElement.style.position = 'static';
            activeDraggedElement = null;
        });

        // Touch enter, leave, and cancel events
        div.addEventListener('touchenter', () => {
            // This could be used to highlight the drop area when the finger enters the element
            div.style.border = '2px solid blue';
        });

        div.addEventListener('touchleave', () => {
            // Reset the style when the finger leaves the element
            div.style.border = 'none';
        });

        div.addEventListener('touchcancel', () => {
            // Reset the style if the touch event is interrupted
            div.style.border = 'none';
        });

        return div;
    };

    // Create drop area div
    const createDropAreaDiv = element => {
        const div = document.createElement('div');
        div.classList.add('drop-area');
        div.dataset.atomicNumber = element.atomicNumber;
        div.textContent = element.atomicNumber;

        // Mouse drop events
        div.addEventListener('dragover', event => {
            event.preventDefault();
        });

        div.addEventListener('drop', event => {
            event.preventDefault();
            const elementId = event.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(elementId);
            handleDrop(div, draggedElement);
        });

        return div;
    };

    // Handle drop logic
    const handleDrop = (dropElement, draggedElement) => {
        if (draggedElement.dataset.atomicNumber === dropElement.dataset.atomicNumber) {
            dropElement.textContent = draggedElement.textContent;
            dropElement.style.backgroundColor = '#00cc77';
            feedback.textContent = `Correct! ${draggedElement.textContent} is atomic number ${draggedElement.dataset.atomicNumber}.`;
            draggedElement.remove();

            if (!document.querySelector('.element')) {
                feedback.textContent += ' Level Complete!';
                nextLevelBtn.style.display = 'block';
                showMotivationalPrompt(); // Display a random motivational prompt
                nextLevelBtn.textContent = currentLevel === levels.length - 1 ? 'Finish' : 'Next Level';
            }
        } else {
            feedback.textContent = 'Try again!';
            feedback.style.color = 'red';
        }
    };

    // Start game button logic
    startGameButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        initLevel();
    });

    // Back button logic
    backButton.addEventListener('click', () => {
        if (currentLevel === 0) {
            gameContainer.style.display = 'none';
            startScreen.style.display = 'block';
        } else {
            currentLevel--;
            initLevel();
        }
    });

    // Next level button logic
    nextLevelBtn.addEventListener('click', () => {
        currentLevel++;
        if (currentLevel < levels.length) {
            initLevel();
            feedback.textContent = motivationalPrompts[currentLevel % motivationalPrompts.length];
        } else {
            feedback.textContent = 'Congratulations! You mastered the Periodic Table!';
            nextLevelBtn.style.display = 'none';
        }
    });
});
