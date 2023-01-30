class LittleChicken extends MovableObject {
    y = 370;
    height = 50;
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 1200;
        this.speed = 0.5 + Math.random() * 0.25; //1.5: alle Hühnchen unterschiedliche Geschwindigkeit
        this.animate();
    }

    animate() {
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);
        setStoppableInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
    }
}