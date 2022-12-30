class Cloud extends MovableObject {
    y = 10;
    height = 370;
    width = 800;
    // 12: statische Werte werden hier eingepflegt

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.speed = 0.1;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}

//12: Klasse Cloud erstellt