class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100; 
    lastHit = 0;
    coins = 0;
    bottles = 0;
    endbossIsHit = false;


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        //let i = 0 modulu/Mathematischer Rest 6, wenn es 7 bilder sind, 
        //wie bei IMAGES_WALKING --> i = 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                //damit er nicht ins Bodenlose fällt, sondern bei 140 stehen bleibt
                //damit Funktion auch fürs Springen (speedY z.B.20) ausgeführt wird
                this.y -= this.speedY;
                //Geschwindigkeit soll negativ sein, damit Objekt fällt --> positiv heißt hoch
                this.speedY -= this.acceleration;
                //ziehen also Beschleunigung von Geschwindigkeit ab
            }
        }, 1000 / 25);
    }
    //Graviditätsfunktion fürs Fallen


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        } 
    }
    //soll angeben, ob Objekt auf dem Boden steht
    //Flaschen sollen immer weiter nach unten fallen


    jump() {
        this.speedY = 30; //je höher die Zahl, desto höher springt er
    }


    collectBottles() {
        this.bottles += 20;
        this.world.bottle_sound.play();
        // console.log('Collision with Character, bottles', this.bottles);
        if(this.bottles > 100 ) {
            this.bottles = 100;
        }
    }


    collectCoins() {
        this.coins += 20;
        this.world.coin_sound.play();
        this.world.coin_sound.volume = 0.5;
        // console.log('Collision with Character, coins', this.coins);
        if(this.coins > 100 ) {
            this.coins = 100;
        }
    }


    hit(damage) {
        this.energy -= damage ? damage : 2;
        //wird keine damage übergeben, wird standardmäßig zwei abgezogen --> brauche keine eigene Funktion für anderen damage-wert
        //console.log('Collision with Character, energy', this.energy);
        if(this.energy < 0 ) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        //speichern Zeitpunkt des letzten Treffers
    }


    isDead() {
        return this.energy == 0;
    }
    //ist Energy 0, dann gibt uns diese Funktion den Wert 0 aus --> returned true


    isHurt() {
        let timepassed =  new Date().getTime() - this.lastHit;
        //zeit in ms, die vergangen ist zwischen dem letzten Treffer und jetzt
        timepassed = timepassed / 1000; //in sekunden
        return timepassed < 1; //wurden innerhalb der letzten Sekunde getroffen --> wird 1 Sek abgespielt
    }
    //returned true, wenn wir innerhalb der letzten Sekunde getroffen wurden


    killEnemie(index) {
        this.world.enemie_sound.play();
        this.world.level.enemies.splice(index, 1);
    }
}