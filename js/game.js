let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();
//Verknüpfung Objekt mit Variable, damit wir hier auf das Objekt zugreifen können
welcome_sound = new Audio('audio/intro.mp3', loop = 'loop');
background_sound = new Audio('audio/background.mp3', loop = 'loop');
welcome_sound.volume = 0.5; 
background_sound.volume = 0.5;

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


//Music Functions
function welcomeMusic() {
    setStoppableInterval(() => {
        this.welcome_sound.play();
    }, 1000 / 60);

    showSpeakerSymbol();
}


function showSpeakerSymbol() {
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('speaker').classList.remove('d-none');
}


function showMuteSymbol() {
    document.getElementById('mute').classList.remove('d-none');
    document.getElementById('speaker').classList.add('d-none');
}


function stopWelcomeMusic() {
    this.welcome_sound.pause();
    intervalIds.forEach(clearInterval);
    showMuteSymbol();
}


function resetSpeakerSymbol() {
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('speaker').classList.add('d-none');
    document.getElementById('speaker-game').classList.remove('d-none');
}


function muteSounds() {
    muteSymbolOn();
    muteCharacterSounds();
    muteEnemieSounds();
    muteCollectablesSounds();
    muteBackgroundSound();
}


function muteSymbolOn() {
    document.getElementById('speaker-game').classList.add('d-none');
    document.getElementById('mute-game').classList.remove('d-none');
}


function muteBackgroundSound() {
    this.background_sound.muted = true;
    this.background_sound.pause();
}


function muteCharacterSounds() {
    world.character.walking_sound.muted = true;
    world.character.walking_sound.pause();
    world.character.hit_sound.muted = true;
    world.character.hit_sound.pause();
    world.character.dead_sound.muted = true;
    world.character.dead_sound.pause();
}


function muteEnemieSounds() {
    world.endboss.hit_sound.muted = true;
    world.endboss.hit_sound.pause();
    world.enemie_sound.muted = true;
    world.enemie_sound.pause();
}


function muteCollectablesSounds() {
    world.coin_sound.muted = true;
    world.coin_sound.pause();
    world.bottle_sound.muted = true;
    world.bottle_sound.pause();
}


function playSounds() {
    speakerSymbolOn();
    playCharacterSounds();
    playEnemieSounds();
    playCollectableSounds();
    playBackgroundSoundAgain();
}


function speakerSymbolOn() {
    document.getElementById('speaker-game').classList.remove('d-none');
    document.getElementById('mute-game').classList.add('d-none');
}


function playBackgroundSoundAgain() {
    this.background_sound.muted = false;
    this.background_sound.play();
}


function playCharacterSounds() {
    world.character.walking_sound.muted = false;
    world.character.hit_sound.muted = false;
    world.character.dead_sound.muted = false;
}


function playEnemieSounds() {
    world.endboss.hit_sound.muted = false;
    world.enemie_sound.muted = false;
}


function playCollectableSounds() {
    world.coin_sound.muted = false;
    world.bottle_sound.muted = false;
}


//Game Functions
function startGame() {
    showGame();
    stopWelcomeMusic();
    resetSpeakerSymbol();
    initLevelOne();
    initGame();
    touchPad();
    playSounds();
    playBackgroundSound();
}

function playBackgroundSound() {
    setStoppableInterval(() => {
        this.background_sound.play();
    }, 1000 / 60);
}


function showGame() {
    showGameAfterStart();
    showGameAfterRestart();
}

function showGameAfterStart() {
    let startscreen = document.getElementById('startscreen');
    let btnContainer = document.getElementById('btn-container');
    let startbtn = document.getElementById('startbtn');
    let canvas = document.getElementById('canvas');
    startscreen.classList.add('d-none');
    startbtn.classList.add('d-none');
    btnContainer.classList.add('marginbtn');
    canvas.classList.remove('d-none');
}


function showGameAfterRestart() {
    let gameover = document.getElementById('gameover');
    let restartBtnContainer = document.getElementById('btn-container-restart');
    let restartbtn = document.getElementById('restartbtn');
    gameover.classList.add('d-none');
    restartBtnContainer.classList.add('d-none');
    restartbtn.classList.add('d-none');
}


function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // console.log('My Character is', world.character);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
    muteBackgroundSound();
}


//EventListener for Keyboard
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    // console.log(event.keyCode);
});
//wollen herausfinden, ob eine Taste gedrückt wird oder nicht
//wenn ja, spuckt es durch den eventListener ein JSON aus
//Pfeiltasten reagieren nur mit keydown, nicht keypress


window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});
//brauchen dasgleiche nochmal für die Situation, dass Taste wieder losgelassen wird
//schaltet dann um von true auf false


//EventListener for Touchpad
function touchPad() {
    document.getElementById('leftbtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('leftbtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('rightbtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('rightbtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jumpbtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('jumpbtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('throwbtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('throwbtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}


