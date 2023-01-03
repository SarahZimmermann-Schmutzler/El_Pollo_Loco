let canvas;
let world;
let keyboard = new Keyboard();
//1.6: Verknüpfung Objekt mit Variable, damit wir hier auf das Objekt zugreifen können

function startGame() {
    showGame();
    initLevelOne();
    initGame();
}

function showGame() {
    let startscreen = document.getElementById('startscreen');
    let btnContainer = document.getElementById('btn-container');
    let startbtn = document.getElementById('startbtn');
    let canvas = document.getElementById('canvas');

    startscreen.classList.add('d-none');
    startbtn.classList.add('d-none');
    btnContainer.classList.add('marginbtn');
    canvas.classList.remove('d-none');
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