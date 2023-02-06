class World {
    character = new Character();
    level = level1;
    canvas; //10: müssen hier noch einmal canvas definieren, da wir es außerhalb des constructors brauchen
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    endboss = new Endboss();
    throwableObjects = [];
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    enemie_sound = new Audio('audio/hitenemie1.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        //mit der Variable Context kann man die Canvas bearbeiten
        this.canvas = canvas; //verknüpfen canvas von oben mit der canvas aus dem constructor
        this.keyboard = keyboard; //verknüpfen keyboard von oben mit keyboard aus dem constructor
        this.draw();
        this.setWorld();
        this.run();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //canvas muss immer gelöscht werden, bevor wir zeichnen, damit z.B. Character nicht an mehreren Stellen auftaucht
        this.ctx.translate(this.camera_x, 0);
        //schieben Bildausschnitt nach links
        //(an Bewegung des Characters gekoppelt bzw. automatisch um 120px verschoben, weil dieser standardmäßig x = 120 hat)
        this.addBgElements();
        //Reihenfolge des Einfügens enscheidet über Reihenfolge der Objekte auf der Canvas
        //daher Hintergrundobjekte zuerst
        this.ctx.translate(-this.camera_x, 0); //2.19: schieben Bildausschnitt zurück
        //SPACE FOR FIXED OBJECTS
        this.addStatusbars();
        this.ctx.translate(this.camera_x, 0); //schieben Bildausschnitt wieder vor
        this.addObjects();
        this.ctx.translate(-this.camera_x, 0);
        //schieben Bildausschnitt wieder nach rechts
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        //ruft draw-Funktion so oft auf, wie es Grafikkarte hergibt
    }

    addStatusbars() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if (this.character.x > 1400) {
            this.addToMap(this.statusbarEndboss);
        }
    }


    addBgElements() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    addObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        //für die Spiegelung
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawBorder(this.ctx);
        //Rückgängimachen Spiegelung für die anderen Elemente
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    setWorld() {
        this.character.world = this;
    }
    //verknüpfen den charakter mit world, damit wir auf die hier definierte Variable keyboard zugreifen können


    flipImage(mo) {
        //schauen, ob otherDirection true ist
        this.ctx.save();
        //speichern aktuelle Einstellungen des ctx
        this.ctx.translate(mo.width, 0);
        //schieben Canvas um diese Breite nach rechts, weil wir durch Spiegelung rechts oben anfangen zu zeichnen und das Bild nach links verschoben wird
        this.ctx.scale(-1, 1);
        //spiegeln Bild um 180 in andere Richtung
        mo.x = mo.x * -1;
        //spiegeln die X-Koordinate des Elements, da es bei Spiegeln das Koordinatensystem umdreht
    }


    flipImageBack(mo) {
        //schauen, ob wir oben Kontext verändert haben und wenn ja
        mo.x = mo.x * -1;
        // drehen die X-Koordinate wieder um
        this.ctx.restore();
        //machen Änderungen rückgängig, da anderen Elemente ja vorwärts eingefügt werden sollen
    }


    run() {
        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 500);

        setStoppableInterval(() => {
            this.checkCollisions();
        }, 60);

        setStoppableInterval(() => {
            this.checkCollisionsThrownBottles();
        }, 800);
    }


    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkJumpOnEnemies();
        this.checkCollisionsEndboss()
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
    }


    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // console.log('Collision with Character', enemy);
                if (!this.character.isAboveGround()) {
                    this.character.hit();
                }
                this.statusbarHealth.setPercentage(this.character.energy);
                //Prozentzahl die Statusbar einnehmen soll (Bild dass gezeigt werden soll) an Energiestand gekoppelt
            }
        });
    }


    checkCollisionsEndboss() {
        if (this.character.isColliding(this.endboss)) {
            // console.log('Collision with Character', this.endboss);
            this.character.hit();
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }


    checkJumpOnEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) &&
                this.character.isAboveGround() && 
                this.character.speedY < 0) {
                this.character.killEnemie(index);
            }
        });
    }


    checkCollisionsThrownBottles() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.endboss.isColliding(bottle)) {
                // console.log('Enemie is hit', bottle);
                this.endboss.hit(35); //schaden 35
                this.statusbarEndboss.setPercentage(this.endboss.energy);
                bottle.endbossIsHit = true;
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 300);
                
            }
        });
    }

    
    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                // console.log('Collision with Character', coin);
                this.collectingCoins(index);
            }
        });
    }


    collectingCoins(index) {
        if (this.statusbarCoinsIsEmpty()) {
            this.level.coins.splice(index, 1);
            this.character.collectCoins();
            this.statusbarCoins.setPercentage(this.character.coins);
        }
        if (this.statusbarCoinsIsFull()) {
            this.increaseStatusbarHealth();
            this.emptyStatusbarCoins();
        }
    }


    statusbarCoinsIsEmpty() {
        return this.character.coins < 100;
    }


    increaseStatusbarHealth() {
        if (this.character.energy < 100) {
            this.character.energy += 15;
        }
        this.statusbarHealth.setPercentage(this.character.energy);
    }


    emptyStatusbarCoins() {
        this.character.coins -= 100;
        this.statusbarCoins.setPercentage(this.character.coins);
    }


    statusbarCoinsIsFull() {
        return this.character.coins == 100;
    }


    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                // console.log('Collision with Character', bottle, index);
                this.collectingBottles(index);
            }
        });
    }


    collectingBottles(index) {
        if (this.character.bottles < 100) {
            this.level.bottles.splice(index, 1);
            this.character.collectBottles();
            this.statusbarBottles.setPercentage(this.character.bottles);
        }
    }


    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.throwBottle();
        }
    }


    throwBottle() {
        this.character.bottles -= 20;
        // console.log('Collision with Character, bottles', this.character.bottles);
        this.statusbarBottles.setPercentage(this.character.bottles);
    }
}

