import { Sprite } from "./sprite.js";
import { applyGravity } from "../physics/physics.js";

export class Fighter extends Sprite {
    constructor({ position, velocity, attackBox, sprites, scale }) {
        super({ position, velocity, scale, sprites });
        this.attackBox = attackBox || { position: { x: this.position.x, y: this.position.y }, width: 125, height: 50 };
        this.isAttacking = false;
        this.attackCooldown = 500;
        this.onAttackCooldown = false;
        this.lastKeyPressed = "";
        this.onGround = false;
    }

    update(ctx, canvas) {
        applyGravity(this, canvas);
        super.update(ctx);
    }

    attack() {
        if (this.onAttackCooldown) return;
        this.isAttacking = true;
        this.onAttackCooldown = true;

        setTimeout(() => { this.isAttacking = false; }, 400);
        setTimeout(() => { this.onAttackCooldown = false; }, this.attackCooldown);
    }

    jump() {        
        if (!this.onGround) return;
        this.velocity.y = -8.5;
    }
}

export class FighterAI extends Fighter {
    constructor(options) {
        super(options);
        this.learningFactor = 0.05;
        this.attackThreshold = 100;
        this.evadeProbability = 0.1;
    }

    updateAI(player, ctx, canvas) {
        const distance = Math.abs(player.position.x - this.position.x);
        const isToTheRight = player.position.x > this.position.x;

        if (distance > this.attackThreshold) {
            this.velocity.x = isToTheRight ? 2 : -2;
        } else {
            this.velocity.x = 0;
            if (Math.random() < 0.6) {
                this.attack();
            }
        }

        super.update(ctx, canvas);
    }
}
