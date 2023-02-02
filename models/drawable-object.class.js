class DrawableObject {
    x = 120;
    y = 80;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    //hier hinein werden die Bilder gespeichert, die wir brauchen, um verschiedene Bewegungen darzustellen
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0 
    }

    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    //diese Funktion legt den Grundstein für das Laden der Bilder
    //mit entsprechenden Wert werden sie in der entsprechenden Klasse gefüllt


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

      /**
     * diese Funktion soll die Bilder in das JSON-Array laden
     * iteriert durch Image paths durch und fügt sie zu Cache hinzu
     * @param {JSON-Array} json  - ['img/image1.png', 'img/image2.png', ...]
     */
      loadImages(json) {
        json.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    //Draw Border Function

    // drawBorder(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof CollectableObject) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }
    //Rahmen um Objekte machen, damit man später Kollision erkennen kann
    //mit instanceof die Funktion nur für Character und Chicken anwenden
}