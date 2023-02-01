class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    hit_sound = new Audio('audio/chicken1.mp3');

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImagesForAnimation();
        this.x = 2000;
        this.speed = 0.2;
        this.animate();
    }


    loadImagesForAnimation() {
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }


    animate() {
        setStoppableInterval(() => {
            if (world.character.x > 1500) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setStoppableInterval(() => this.playEndboss(), 200);
    }


    playEndboss() {
        if (world.character.x > 1400) {
            this.playAnimation(this.IMAGES_ALERT);
        }
        if (world.character.x > 1500) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
        if (this.isHurt()) {
            this.endbossIsHurt();
            
        }
        if (this.isDead()) {
            this.endbossIsDead();
        }
    }


    endbossIsHurt() {
        this.hit_sound.play();
        this.playAnimation(this.IMAGES_HURT);
    }


    endbossIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => this.showEndscreen(), 2000);
        stopGame();
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