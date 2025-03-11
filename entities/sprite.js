export class Sprite {
    constructor({ position, velocity, source, scale, offset, sprites }) {
        this.position = position;
        this.velocity = velocity;
        this.scale = scale || 1;
        this.image = new Image();
        this.image.src = source || "../assets/objects/square.svg";
        this.offset = offset || { x: 0, y: 0 };
        this.sprites = sprites || { idle: { src: this.image.src, totalSpriteFrames: 1, framesPerSpriteFrame: 1 } };
        this.currentSprite = this.sprites.idle;
        this.currentSpriteFrame = 0;
        this.elapsedTime = 0;
    }

    setSprite(sprite) {
        this.currentSprite = this.sprites[sprite] || this.sprites.idle;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update(ctx) {
        this.draw(ctx);
    }
}
