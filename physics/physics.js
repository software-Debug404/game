export const gravity = 0.2;
export const floorHeight = 96;

export function applyGravity(entity, canvas) {
    if (entity.position.y + entity.height >= canvas.height - floorHeight) {
        entity.onGround = true;
    } else {
        entity.onGround = false;
    }

    if (entity.position.y + entity.height > canvas.height - floorHeight) {
        entity.position.y = canvas.height - entity.height - floorHeight;
        entity.velocity.y = 0;
    } else {
        if (!entity.onGround) entity.velocity.y += gravity;
    }

    entity.position.x += entity.velocity.x;
    entity.position.y += entity.velocity.y;
}
