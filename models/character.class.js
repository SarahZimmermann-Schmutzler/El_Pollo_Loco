class Character extends MovableObject {
    world; //1.7: gehört zur Verknüpfung World mit Charakter, damit wir die Variable Keyboard benutzen können
    height = 300;
    width = 150;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30
    }
    walking_sound = new Audio('audio/running1.mp3'); //1.15
    hit_sound = new Audio('audio/pepehit1.mp3');
    dead_sound = new Audio('audio/pepedead.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        // 1.2: müssen hier kein super() mehr vor loadImages Schreiben, schreibt man nur einmal
        // 1.2: geben hier die Bilder an, die in das JSON-Array ImageCache geladen werden sollen
        this.loadImages(this.IMAGES_JUMPING); //2.3:gleiches für Jump-Bilder
        this.loadImages(this.IMAGES_DEAD); //2.13:gleiches für Tot-Bilder
        this.loadImages(this.IMAGES_HURT); //2.14:gleiches für Verletzt-Bilder
        this.applyGravity();
        this.animate();
    }
    // 08:constructor wird immer zuerst geladen
    // 08:laden die loadImage Funktion aus der Superklasse und fügen ihr den passenden Wert hinzu

    
    animate() {
        this.walking_sound.pause(); //1.15: Sound ist angehalten und wird abgespielt, wenn sich Figur bewegt
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 50);
    }


    moveCharacter() {
        if (this.goesRight()) {
            this.characterMovesRight();
        }
        if (this.goesLeft()) {
            this.characterMovesLeft();
        }
        if (this.goesUpInTheAir()) {
            this.jump();
        }
        // 2.4: wenn Space drücken wird Initialwert der Fallfunktion auf 20 gesetzt --> springen
        // 2.5: wenn Space drücke und wenn nicht isAboveGround (also wenn wir nicht auf dem Boden sind (y > 130???))

        this.world.camera_x = -this.x + 100;
        // 1.11: wenn sich Chracter bewegt, soll ich Bildausschnitt mitbewegen
        // camera_x ist in der world.class gespeichert (100px)
        // 1.14: setzen ihn 100px nach rechts
    }


    goesRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    } //durch && this.x < ... kann er nicht weiter nach rechts laufen als bis zur Variable level_end_x


    goesLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    } //durch && this.x > 0 kann er nicht weiter nach links laufen als bis zur 0


    goesUpInTheAir() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    characterMovesRight() {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
    }


    characterMovesLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }


    playCharacter() {
        if (this.isDead()) {
            this.characterIsDead();
        }
        else if (this.isHurt()) {
            this.characterIsHurt();
        }
        else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.goesRightOrLeft()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    goesRightOrLeft() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.dead_sound.play();
        setTimeout(() => {
            this.showLostScreen();
        }, 2000);
        stopGame()
    }


    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.hit_sound.play();
    }


    showLostScreen() {
        document.getElementById('gameover').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('btn-container-restart').classList.remove('d-none');
        document.getElementById('restartbtn').classList.remove('d-none');
    }
}