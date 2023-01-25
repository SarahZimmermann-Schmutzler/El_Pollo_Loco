class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2000;
        this.speed = 0.10;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            if(world.character.x > 1400) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.showEndscreen();
                stopGame();
            }
        }, 200);
    }

    showEndscreen() {
        document.getElementById('gameover').classList.remove('d-none');
        document.getElementById('gameover').classList.remove('gameover');
        document.getElementById('gameover').classList.add('endscreen');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('btn-container-restart').classList.remove('d-none');
        document.getElementById('restartbtn').classList.remove('d-none');
    }
}