class Cloud extends MovableObject {
    y = 10;
    height = 370;
    width = 800;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.speed = 0.1;

        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}