let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();
//1.6: Verknüpfung Objekt mit Variable, damit wir hier auf das Objekt zugreifen können
welcome_sound = new Audio('audio/intro.mp3', loop='loop');

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


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
    document.getElementById('speaker-game').classList.add('d-none');
    document.getElementById('mute-game').classList.remove('d-none');
    world.character.walking_sound.muted = true;
    world.character.walking_sound.pause();
    world.character.hit_sound.muted = true;
    world.character.hit_sound.pause();
    world.character.dead_sound.muted = true;
    world.character.dead_sound.pause();
    world.endboss.hit_sound.muted = true;
    world.endboss.hit_sound.pause();
}


function playSounds() {
    document.getElementById('speaker-game').classList.remove('d-none');
    document.getElementById('mute-game').classList.add('d-none');
    world.character.walking_sound.muted = false;
    world.character.walking_sound.play();
    world.character.hit_sound.muted = false;
    world.character.hit_sound.play();
    world.character.dead_sound.muted = false;
    world.character.dead_sound.play();
    world.endboss.hit_sound.muted = false;
    world.endboss.hit_sound.play();
}


function startGame() {
    showGame();
    stopWelcomeMusic();
    resetSpeakerSymbol();
    initLevelOne();
    initGame();
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

    console.log('My Character is', world.character);
}


window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38) {
        keyboard.UP = true;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    // console.log(event.keyCode);
});
// 1.6: wollen herausfinden, ob eine Taste gedrückt wird oder nicht
// wenn ja, spuckt es durch den eventListener ein JSON aus
// 1.7: Pfeiltasten reagieren nur mit keydown, nicht keypress


window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38) {
        keyboard.UP = false;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});
// 1.7: brauchen dasgleiche nochmal für die Situation, dass Taste wieder losgelassen wird
// schaltet dann um von true auf false


function stopGame() {
    intervalIds.forEach(clearInterval);
}