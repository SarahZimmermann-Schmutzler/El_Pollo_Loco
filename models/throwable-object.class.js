class ThrowableObject extends MovableObject {
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.throw();
        this.animate();
    }

    throw () {
        this.speedY = 30;
        this.applyGravity();
        setStoppableInterval( () => {
            this.x += 10;
        }, 25);
    }

    
    animate() {
        setStoppableInterval(() => {
            if (this.endbossIsHit = true) {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 200);
    }
}