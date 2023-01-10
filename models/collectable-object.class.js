class CollectableObject extends MovableObject {
    constructor(imagePath) {
        super().loadImage(imagePath);
        
        this.collect();
    }

    collect() {

    }
}