class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200; //1.14

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
    // 1.13: verknüpfen enemies etc. mit den Arrays in der level1.js
}