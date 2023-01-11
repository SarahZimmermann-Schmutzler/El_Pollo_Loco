class Statusbar extends DrawableObject{
    height = 60;
    width = 200;
    percentage = 0;

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    // 2.17: können dann z.B. Funktion aufrufen mit setPercentage(50);

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
    // 2.17: return 5 steht für das 5. Objekt im Array (= 5.Bild, von 0 angefangen zu zählen)
}