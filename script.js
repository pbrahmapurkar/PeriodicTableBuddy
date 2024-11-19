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
        { elements: [{ name: 'Phosphorus', atomicNumber: 15 }, { name: 'Sulfur', atomicNumber: 16 }, { name: 'Chlorine', atomicNumber: 17 }, { name: 'Argon', atomicNumber: 18 }] }
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
