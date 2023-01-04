class Character extends MovableObject {
    height = 300;
    width = 150;
    speed = 10; //1.8
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
    ]; //2.3: weiteres Array mit den Spring-Bildern

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]; //2.13: weiteres Array mit den Tot-Bildern

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]; //2.14: weiteres Array mit den Getroffen-Bildern

    world; //1.7: gehört zur Verknüpfung World mit Charakter, damit wir die Variable Keyboard benutzen können
    walking_sound = new Audio('audio/running1.mp3'); //1.15
    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30 
    }

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        // 1.2: müssen hier kein super() mehr vor loadImages Schreiben, schreibt man nur einmal
        // 1.2: geben hier die Bilder an, die in das JSON-Array ImageCache geladen werden sollen
        this.loadImages(this.IMAGES_JUMPING); //2.3:gleiches für Jump-Bilder
        this.loadImages(this.IMAGES_DEAD); //2.13:gleiches für Tot-Bilder
        this.loadImages(this.IMAGES_HURT); //2.14:gleiches für Verletzt-Bilder
        this.applyGravity(); //2.2
        this.animate();
    }
    // 08:constructor wird immer zuerst geladen
    // 08:laden die loadImage Funktion aus der Superklasse und fügen ihr den passenden Wert hinzu

    animate() {
        this.walking_sound.pause(); //1.15: Sound ist angehalten und wird abgespielt, wenn sich Figur bewegt

        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            // 1.14: durch && this.x < ... kann er nicht weiter nach rechts laufen als bis zur Variable level_end_x

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            // 1.14: durch && this.x > 0 kann er nicht weiter nach links laufen als bis zur 0

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            // 2.4: wenn Space drücken wird Initialwert der Fallfunktion auf 20 gesetzt --> springen
            // 2.5: wenn Space drücke und wenn nicht isAboveGround (also wenn wir nicht auf dem Boden sind (y > 130???))

            this.world.camera_x = -this.x + 100;
            // 1.11: wenn sich Chracter bewegt, soll ich Bildausschnitt mitbewegen
            // camera_x ist in der world.class gespeichert (100px)
            // 1.14: setzen ihn 100px nach rechts
        }, 1000 / 60);
        // 1.8.: Charakter soll sich nach vorn bewegen, nutzen dazu speed 
        // (überschreiben wir oben, weil sonst zu langsam)
        // fügen das ganze noch für Links hinzu
        //1.9: fügen die otherDirection ein


        setStoppableInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('gameover').classList.remove('d-none');
                document.getElementById('canvas').classList.add('d-none');
                document.getElementById('btn-container-restart').classList.remove('d-none');
                document.getElementById('restartbtn').classList.remove('d-none');
                stopGame()
            }
            // 2.13: wenn wir tot sind, andere Grafiken anzeigen
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } //2.14: wenn ich verletzt bin, das abspielen
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                // 2.3: wenn er über der Erde schwebt sollen die Jumping-Bilder animiert/abgespielt werden
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // let i = this.currentImage % this.IMAGES_WALKING.length;
                    // let i = 0 modulu/Mathematischer Rest 6 --> i = 0, 1, 2, 3, 4, 5, 0
                    // let path = this.IMAGES_WALKING[i];
                    // this.img = this.imageCache[path];
                    // this.currentImage++;
                    // 1.16: lagern in Funktion aus, die zur Superklasse kommt
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }
    // 1.3: Walk Animation
    //1.7: nur, wenn Taste right gedrückt wird, wird Funktion ausgeführt 
    //in if Bedingung wird getestet, ob die bedingung true ist, deswegen steht dort nur right
    //1.8: fügen zu ig Bedingung hinzu: || (oder) linke Taste gedrückt

}
// 07: hat alle Eigenschaften, die in Klasse Movable Object definiert sind + Funktion jump