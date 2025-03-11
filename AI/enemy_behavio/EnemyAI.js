class EnemyAI {
    constructor(enemy, target) {
        this.enemy = enemy;
        this.target = target;
        this.attackThreshold = 100;
        this.evadeProbability = 0.1;
        this.learningFactor = 0.05;
        this.adaptiveAggression = 0.5;
        this.lastAttackTime = 0;
        this.attackPattern = [];
        this.hitCount = 0;
    }

    update() {
        if (this.enemy.dead) return;

        const distance = Math.abs(this.target.position.x - this.enemy.position.x);
        const isToTheRight = this.target.position.x > this.enemy.position.x;
        const currentTime = performance.now();

        if (distance > this.attackThreshold) {
            this.enemy.velocity.x = isToTheRight ? 2 : -2;
            this.enemy.facing = isToTheRight ? "right" : "left";
            this.enemy.setSprite("running");
        } else {
            this.enemy.velocity.x = 0;
            this.enemy.setSprite("idle");

            if (Math.random() < this.adaptiveAggression) {
                if (currentTime - this.lastAttackTime > this.enemy.attackCooldown) {
                    this.enemy.attack();
                    this.lastAttackTime = currentTime;
                    this.attackPattern.push(currentTime);
                    if (this.attackPattern.length > 5) this.attackPattern.shift();
                }
            }
        }

        if (Math.random() < this.evadeProbability && this.enemy.onGround) {
            this.enemy.jump();
        }

        this.enemy.update();
    }

    takeHit() {
        this.hitCount++;
        this.evadeProbability = Math.min(0.3, this.evadeProbability + this.learningFactor);

        if (this.attackPattern.length >= 3) {
            const timeDiff = (this.attackPattern[this.attackPattern.length - 1] - this.attackPattern[0]) / this.attackPattern.length;
            if (timeDiff < 1500) {
                this.adaptiveAggression = Math.max(0.4, this.adaptiveAggression - 0.1);
            } else {
                this.adaptiveAggression = Math.min(0.9, this.adaptiveAggression + 0.1);
            }
        }
    }
}