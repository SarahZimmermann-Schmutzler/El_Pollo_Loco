class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor (imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}
// 13: laden die loadImage Funktion aus der Superklasse und geben aber keinen festen Pfad hinein
// wie bei der clou-class, sondern imagePath, weil wir verschiedene Hintergrundbilder haben
// geben allgemeine x-koordinate mit, die wir in der world.class definieren können
// width und height gebe wir fest ein, da jeder Hintergrund das ganze Bild ausfüllen soll
// 14: definieren die y-koordinate als Höhe Canvas minus die definierte Höhe von 400 
// --> warum nicht y = 0 und height 480??? --> sauberer, weil nicht y-Koordinate jedesmal mitgegeben wird
// 17: Himmelbild ist zu kurz, ändern feste height in 480