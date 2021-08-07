import { k } from "/kaboom.js";
import { config } from "/config.js";

// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

// cached player to prevent any duplicates
let cachedPlayer = null;

/**
 * Add a new player to the game. There can only be one at a time.
 * types: elf_f, elf_m, knight, lizard_f, lizard_m, wizard_f, wizard_m
 * names:
 *  - Stabby Elf
 *  - Shooty Elf
 *  - Swordy Boi
 *  - Hammer Lizard
 *  - Smashy Dino
 *  - Burny Mage
 *  - LASER WIZARD
 */
export const createPlayer = (type, attrs) => {
  if (cachedPlayer) return cachedPlayer;

  const player = k.add([
    k.origin("center"),
    k.sprite(type, { animSpeed: 0.3, noArea: true }),
    k.area(k.vec2(-5, -2), k.vec2(5, 12)),
    k.layer("game"),
    "player",
    "killable",
    {
      dir: k.vec2(0, 0),
      speed: 77,
      moving: false,
      hit: false,
      canBurp: true,
    },
    ...(attrs ?? []),
  ]);

  // TODO - should these be called every frame, or only change on events?
  const handleAnimation = () => {
    const anim = player.curAnim();
    if (player.hit) {
      if (anim !== "hit") {
        const hitTime = 0.5;
        player.play("hit");
        player.animSpeed = hitTime;
        k.wait(hitTime, () => player.hit = false);
      }
    } else if (player.moving) {
      if (anim !== "run") {
        player.play("run");
        player.animSpeed = 0.1;
      }
    } else if (anim !== "idle") {
      player.play("idle");
      player.animSpeed = 0.3;
    }
  };

  const handleMoving = () => {
    if (player.moving) {
      player.flipX(player.dir.x < 0);
      player.move(player.dir.scale(player.speed));
    }
  };

  const handleCamera = () => {
    const scale = k.width() / config.viewableWidth;
    k.camScale(scale);
    k.camPos(player.pos);
  };

  player.action(() => {
    handleMoving();
    handleAnimation();
    handleCamera();
    player.pushOutAll();
  });

  k.keyPress("b", () => {
    if (!player.canBurp) return;
    player.canBurp = false;
    player.hit = true;
    k.burp();
    k.camShake(7);
    k.wait(1, () => player.canBurp = true);
  });

  k.keyDown("w", () => {
    player.dir.y = -1;
    player.moving = true;
  });
  k.keyRelease("w", () => {
    player.dir.y = 0;
    player.moving = false;
  });

  k.keyDown("a", () => {
    player.dir.x = -1;
    player.moving = true;
  });
  k.keyRelease("a", () => {
    player.dir.x = 0;
    player.moving = false;
  });

  k.keyDown("s", () => {
    player.dir.y = 1;
    player.moving = true;
  });
  k.keyRelease("s", () => {
    player.dir.y = 0;
    player.moving = false;
  });

  k.keyDown("d", () => {
    player.dir.x = 1;
    player.moving = true;
  });
  k.keyRelease("d", () => {
    player.dir.x = 0;
    player.moving = false; 
  });

  // hide off-screen non-player objects to improve performance
  k.action("non-player", (obj) => {
    obj.hidden = player.pos.dist(obj.pos) > config.viewableDist;
  });

  cachedPlayer = player;
  return cachedPlayer;
};

export const destroyPlayer = () => {
  k.destroy(cachedPlayer);
  cachedPlayer = null;
}