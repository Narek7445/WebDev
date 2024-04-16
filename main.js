// Query Selectors
const select = (selector) => document.querySelector(selector);
const gameName = select('.game-name');
const gameNameDeco = select('#game-name-deco');
const guessInfo = select('#guess-info');

const gui = select('*');

const scoreLabel = select('#maingame-score');
const triesLabel = select('#maingame-tries');
const recordtriesLabeel = select('#maingame-recordtries');

const suggestionsState = select('#suggestions-state');
const difficultyState = select('#difficulty-state');

const mainGame = select('#main-game');
const rulesMenu = select('#rules-menu');
const mainMenu = select('#main-menu');
const settingsMenu = select('#settings-menu');

const guessInput = select('#guess-input');
const accentInput = select('#accent-input');

const playButton = select('#menu-play-button');
const rulesButton = select('#menu-rules-button');
const launchButton = select('#maingame-launch');
const tryButton = select('#maingame-try');
const settingsButton = select('#menu-settings-button');
const rulesOk = select('#rules-ok');
const returnHome = select('#maingame-returnhome');
const settingsReturnHome = select('#settings-returnhome');

const accentColors = document.querySelectorAll('.accent-color');

document.querySelector('*').style.setProperty('--acent', 'red');

// Number
let score = 0;
let number = 0;
let tries = 0;
let suggestions = false;
let recordTries = 0;
let difficulty = 'Easy';

let maxNum = 100;

document.documentElement.style.setProperty('--accent', 'blueviolet');

triesLabel.textContent = 'Tries: ' + tries;
scoreLabel.textContent = 'Score: ' + score;
recordtriesLabeel.textContent = 'Record Tries: ' + recordTries;

// Decorations
gameName.addEventListener('mouseenter', () => {
    gameNameDeco.style.width = '200px';
});

gameName.addEventListener('mouseleave', () => {
    gameNameDeco.style.width = '5px';
});

// Menu buttons
playButton.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    mainGame.style.display = 'flex';
});

// Rules Menu
rulesOk.addEventListener('click', () => {
    mainMenu.style.display = null;
    rulesMenu.style.display = 'none';
});

rulesButton.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    rulesMenu.style.display = 'flex';
});


returnHome.addEventListener('click', () => {
    mainMenu.style.display = null;
    mainGame.style.display = 'none';
});
//

settingsReturnHome.addEventListener('click', () => {
    settingsMenu.style.display = null;
    mainMenu.style.display = null;
})

// Main Game
guessInput.style.display = 'none';
tryButton.style.display = 'none';
mainGame.style.display = 'none';

launchButton.addEventListener('click', () => {
    guessInfo.textContent = 'Starting game...';
    setTimeout(() => {
        number = Math.floor(Math.random() * maxNum) + 1;
        guessInfo.textContent = `Number has been chosen! Guess a number between 1 and ${maxNum}!`;
        launchButton.style.display = 'none';
        console.log(number);
        tryButton.style.display = null;
        guessInput.style.display = null;
    }, 1000);
});

tryButton.addEventListener('click', () => {
    if (guessInput.value == number) {
        guessInfo.style.color = 'green';
        guessInfo.textContent = 'Correct!';
        score++;
        scoreLabel.textContent = 'Score: ' + score;
        if (tries < recordTries || recordTries == 0) {
            recordTries = tries;
            recordtriesLabeel.textContent = 'Record Tries: ' + recordTries;
        }
    } else {

        let comment = number > guessInput.value ? ' (too small)' : ' (too big)';

        if (!suggestions) {comment=''};
        
        guessInfo.style.color = 'red';
        guessInfo.textContent = 'Incorrect!' + comment;
        tries++;
        triesLabel.textContent = 'Tries: ' + tries;
    }

    setTimeout(() => {
        guessInfo.style.color = null;
        guessInfo.textContent = 'Try again';

        if (guessInput.value == number) {
            number = Math.floor(Math.random() * maxNum) + 1;
            guessInfo.textContent = 'New number chosen! Try to guess';
        }
    }, 1000);
});

//Settings

settingsButton.onclick = () => {
    mainMenu.style.display = 'none';
    settingsMenu.style.display = 'flex';
}

for (let i = 0; i < accentColors.length; i++) {
    accentColors[i].addEventListener('click', () => {

        for (let i = 0; i < accentColors.length; i++) {
            accentColors[i].style.borderColor = 'white';
        }

        document.documentElement.style.setProperty('--accent', accentColors[i].style.background);
        accentColors[i].style.borderColor = 'lime';
    })
}

suggestionsState.onclick = () => {
    if (!suggestions) {
        suggestionsState.textContent = 'On';
    } else {
        suggestionsState.textContent = 'Off';
    }
    suggestions = !suggestions;
}

difficultyState.onclick = () => {
    if (difficulty == 'Easy') {
        difficulty = 'Normal';
        maxNum = 150;
    } else if (difficulty == 'Normal') {
        difficulty = 'Hard';
        maxNum = 200;
    } else {
        difficulty = 'Easy';
        maxNum = 100;
    }
    difficultyState.textContent = difficulty;
}