class Bottle extends CollectableObject {
    width = 100;
    height = 100;
    y = 350;

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 1800;
    }
}