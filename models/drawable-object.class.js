class DrawableObject {
    x = 120;
    y = 80; //140
    height = 150;
    width = 100;
    img;
    imageCache = {};
    // 1.2: hier hinein werden die Bilder gespeichert, die wir brauchen, um verschiedene Bewegungen darzustellen
    currentImage = 0; //1.3

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    // 08: diese Funktion legt den Grundstein für das Laden der Bilder
    // 08: mit entsprechenden Wert werden sie in der entsprechenden Klasse gefüllt

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

      /**
     * 1.2 diese Funktion soll die Bilder in das JSON-Array laden
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

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    // 2.7: Rahmen um Objekte machen, damit man später Kollision erkennen kann
    // 2.9: mit instanceof die Funktion nur für Character und Chicken anwenden
    // 2.18: hierhin mit verschoben, amit es überall verfügbar ist --> wird immer ausgeführt

}
// 2.16: aufgrund der Statusbar neu angelegt --> nehmen hier einiges von movable Object auf