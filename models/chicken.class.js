class Chicken extends MovableObject {
    y = 350;
    // 16: können hier die Eigenschaften aus der Superklasse überschreiben --> Hühnchen müssen etwas weiter unten angezeigt werden

    height = 80;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); //08
        this.loadImages(this.IMAGES_WALKING); //1.4

        this.x = 300 + Math.random() * 700;
        //11: x hat als standardwert 200 (durch Superklasse). sobald gezeichnet, wird auf einen random Wert gesetzt,
        //der zwischen 200 und 700 liegt (Math.random() gibt nur werte zwischen 0-1 aus, deswegen * 500)

        this.speed = 0.15 + Math.random() * 0.25; //1.5: alle Hühnchen unterschiedliche Geschwindigkeit

        this.animate(); //1.4
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft(); //1.5
        }, 1000 / 60);


        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            // 1.16 Funktion ausgelagert in Superklasse
        }, 200);
    }
}