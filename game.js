import { Fighter, FighterAI } from "./entities/fighter.js";
import { Sprite } from "./entities/sprite.js";
import { handleControls, setupControls } from "./utils/controls.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const player = new Fighter({
    position: { x: 100, y: 0 },
    velocity: { x: 0, y: 10 },
    scale: 1,
    sprites: {
        idle: { src: "../assets/player/Idlle1.png", totalSpriteFrames: 6, framesPerSpriteFrame: 60 },
        running: { src: "../assets/player/running.png", totalSpriteFrames: 8, framesPerSpriteFrame: 10 },
        jumping: { src: "../assets/player/jumping.png", totalSpriteFrames: 9, framesPerSpriteFrame: 50 },
        attacking: { src: "../assets/player/attacking1.png", totalSpriteFrames: 4, framesPerSpriteFrame: 30 },
    }
});

const player2 = new FighterAI({
    position: { x: 600, y: 0 },
    velocity: { x: 0, y: 10 },
    scale: 2,
    sprites: {
        idle: { src: "../assets/inimigo/Idle.png", totalSpriteFrames: 10, framesPerSpriteFrame: 10 },
        running: { src: "../assets/inimigo/Walk.png", totalSpriteFrames: 12, framesPerSpriteFrame: 12 },
        attacking: { src: "../assets/inimigo/Attack.png", totalSpriteFrames: 4, framesPerSpriteFrame: 50 },
    }
});

setupControls(player);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleControls(player);
    player.update(ctx, canvas);
    player2.updateAI(player, ctx, canvas);
    requestAnimationFrame(animate);
}

animate();
