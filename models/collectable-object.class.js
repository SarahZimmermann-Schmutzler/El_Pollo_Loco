class CollectableObject extends MovableObject {
    // coins = 0;
    // bottles = 0;
    // coin_sound = new Audio('audio/coin.mp3');
    // bottle_sound = new Audio('audio/bottle.mp3');

    constructor(imagePath) {
        super().loadImage(imagePath);
    }

    // collectBottles() {
    //     this.bottles += 20;
    //     this.bottle_sound.play();
    //     console.log('Collision with Character, bottles', this.bottles);
    //     if(this.bottles > 100 ) {
    //         this.bottles = 100;
    //     }
    // }

    // collectCoins() {
    //     this.coins += 20;
    //     this.coin_sound.play();
    //     console.log('Collision with Character, coins', this.coins);
    //     if(this.coins > 100 ) {
    //         this.coins = 100;
    //     }
    // }
}