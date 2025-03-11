export const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false, hold: false },
    space: { pressed: false, hold: false },
};

export function setupControls(player) {
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft":
            case "a": keys.a.pressed = true; player.lastKeyPressed = "a"; break;
            case "ArrowRight":
            case "d": keys.d.pressed = true; player.lastKeyPressed = "d"; break;
            case "ArrowUp":
            case "w": keys.w.pressed = true; break;
            case "z":
            case " ": keys.space.pressed = true; break;
        }
    });

    window.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "ArrowLeft":
            case "a": keys.a.pressed = false; break;
            case "ArrowRight":
            case "d": keys.d.pressed = false; break;
            case "ArrowUp":
            case "w": keys.w.pressed = false; keys.w.hold = false; break;
            case "z":
            case " ": keys.space.pressed = false; keys.space.hold = false; break;
        }
    });
}

export function handleControls(player) {
    player.velocity.x = 0;
    
    if (keys.a.pressed) {
        player.velocity.x = -4;
        player.facing = "left";
    }

    if (keys.d.pressed) {
        player.velocity.x = 4;
        player.facing = "right";
    }

    if (keys.w.pressed && !keys.w.hold) {
        player.jump();
        keys.w.hold = true;
    }

    if (keys.space.pressed && !keys.space.hold) {
        player.attack();
        keys.space.hold = true;
    }
}
