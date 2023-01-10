class Coin extends CollectableObject {
    width = 120;
    height = 120;
    y = 80;
    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40 
    }

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1800;
        this.y = 100 + Math.random() * 180;
    }
}