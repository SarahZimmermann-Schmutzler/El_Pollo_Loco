class World {
    character = new Character();
    level = level1;
    canvas; //10: müssen hier noch einmal canvas definieren, da wir es außerhalb des constructors brauchen
    ctx;//09
    keyboard;//1.7
    camera_x = 0; //1.11
    statusbarHealth = new StatusbarHealth(); //2.18.
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    throwableObjects = []; //2.20
    endboss = new Endboss();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        // 09: mit der Variable Context kann man die Canvas bearbeiten
        this.canvas = canvas; //10: verknüpfen canvas von oben mit der canvas aus dem constructor
        this.keyboard = keyboard; //1.7: verknüpfen keyboard von oben mit keyboard aus dem constructor
        this.draw(); //09
        this.setWorld(); //1.7: 
        this.run(); //2.11
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 10: canvas muss immer gelöscht werden, bevor wir zeichnen, damit z.B. Character nicht an mehreren Stellen auftaucht

        this.ctx.translate(this.camera_x, 0);
        //1.11: schieben Bildausschnitt nach links
        // (an Bewegung des Characters gekoppelt bzw. automatisch um 120px verschoben, weil dieser standardmäßig x = 120 hat)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); //2.19: schieben Bildausschnitt zurück
        // SPACE FOR FIXED OBJECTS
        this.addToMap(this.statusbarHealth); //2.18.
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if(this.character.x > 1400) {
            this.addToMap(this.statusbarEndboss);
        }
        
        
        this.ctx.translate(this.camera_x, 0); //2.19: schieben Bildausschnitt wieder vor
        
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.endboss);

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.throwableObjects);
        // 15: Reihenfolge des Einfügens enscheidet über Reihenfolge der Objekte auf der Canvas
        // daher Hintergrundobjekte zuerst

        this.ctx.translate(-this.camera_x, 0);
        //1.11: schieben Bildausschnitt wieder nach rechts

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        //10: ruft draw-Funktion so oft auf, wie es Grafikkarte hergibt

    }


    // 13: wir lagern den Code in folgende 2 Funktionen aus
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        //1.9: für die Spiegelung
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);
        //1.9: Rückgängimachen Spiegelung für die anderen Elemente
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    setWorld() {
        this.character.world = this;
    }
    // 1.7: verknüpfen den charakter mit world, damit wir auf die hier definierte Variable keyboard zugreifen können


    flipImage(mo) {
        // schauen, ob otherDirection true ist
        this.ctx.save();
        // speichern aktuelle Einstellungen des ctx
        this.ctx.translate(mo.width, 0);
        //schieben Canvas um diese Breite nach rechts, weil wir durch Spiegelung rechts oben anfangen zu zeichnen und das Bild nach links verschoben wird
        this.ctx.scale(-1, 1);
        // spiegeln Bild um 180 in andere Richtung
        mo.x = mo.x * -1;
        // spiegeln die X-Koordinate des Elements, da es bei Spiegeln das Koordinatensystem umdreht
    }


    flipImageBack(mo) {
        // schauen, ob wir oben Kontext verändert haben und wenn ja
        mo.x = mo.x * -1;
        // drehen die X-Koordinate wieder um
        this.ctx.restore();
        // machen Änderungen rückgängig, da anderen Elemente ja vorwärts eingefügt werden sollen
    }


    run() {
        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 100);

        setStoppableInterval(() => {
            this.checkCollisions();
        }, 400);

        setStoppableInterval(() => {
            this.checkCollisionsThrownBottles();
        }, 800);
    }


    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkJumpOnEnemies();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
    }
    //2.11: checkt Kollsiionen ab --> isColliding steht bei movabale Objects  
    // 2.12: wenn es kollidiert, zieht es Punkt von der Energy ab
    // 2.13: Funktion ausgelagetr zu movableObjects


    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // console.log('Collision with Character', enemy);
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy); //2.19: Prozentzahl die Statusbar einnehmen soll (Bild dass gezeigt werden soll) an Energiestand gekoppelt
            }
        });
    }


    checkJumpOnEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) &&
            this.character.isAboveGround()) {
                console.log('Character jumps on', enemy);
                this.killEnemie(index);
            }
        });
    }


    killEnemie(index) {
        this.level.enemies.splice(index, 1);
    }


    checkCollisionsThrownBottles() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                console.log('Enemie is hit', bottle);
                this.endboss.hitWithBottle();
                this.statusbarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }


    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                console.log('Collision with Character', coin);
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
                console.log('Collision with Character', bottle, index);
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
        console.log('Collision with Character, bottles', this.character.bottles);
        this.statusbarBottles.setPercentage(this.character.bottles);
    }
}

