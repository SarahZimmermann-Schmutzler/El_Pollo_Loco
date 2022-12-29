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
    // 1.4.: packen hier alle Hühnchenbilder rein
   

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); //08
        this.loadImages(this.IMAGES_WALKING); //1.4

        this.x = 200 + Math.random() * 500; 
        //11: x hat als standardwert 200 (durch Superklasse). sobald gezeichnet, wird auf einen random Wert gesetzt,
        //der zwischen 200 und 700 liegt (Math.random() gibt nur werte zwischen 0-1 aus, deswegen * 500)
        
        this.speed = 0.15 + Math.random() * 0.25; //1.5: alle Hühnchen unterschiedliche Geschwindigkeit

        this.animate(); //1.4
    }

    animate() {
        setInterval(() => {
            this.moveLeft(); //1.5
        }, 1000 / 60);
        // 2.5: setzen das setInterval um die moveLeft funktion (vorher generell in moveLeft Funktion)
        

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            // 1.16 Funktion ausgelagert in Superklasse
        }, 200);  
    }
    // 1.4: 
}
// 07: hat alle Eigenschaften, die in Klasse Movable Object definiert sind