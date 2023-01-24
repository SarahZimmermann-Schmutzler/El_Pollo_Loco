class StatusbarEndboss extends Statusbar {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', //0
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' //5
    ];

    constructor () {
        super().loadImages(this.IMAGES);
        this.x = 500;
        this.y = 50;
        this.setPercentage(100);
    }
}