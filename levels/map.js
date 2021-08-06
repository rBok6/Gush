/**
 * --- Symbol Legend ---
 *
 * Structural symbols:
 * 
 * ─ horizontal wall
 * │ vertical wall
 * ┌ top-left wall (nw)
 * ┐ top-right wall (ne)
 * └ bottom-left wall (sw)
 * ┘ bottom-right wall (se)
 * & red fountain (basin should render below? also top tile?)
 * % blue fountain (see above)
 * ! goo fountain (see above)
 * { wall banner (blue)
 * } wall banner (green)
 * ( wall banner (red)
 * ) wall banner (yellow)
 * 
 * Special handling:
 * 
 * probably have to render tiles underneath on first pass,
 * then on second pass spawn objects with level.getPos()
 * 
 * + door
 * > hole/down
 * < ladder/up
 * ? chest
 * $ coin
 * # crate
 * @ player spawn
 * d small demon
 * D big demon
 * f random flask
 * g goblin
 * i imp
 * m muddy
 * n necromancer
 * o ogre
 * O random orc
 * s skeleton
 * S swampy
 * w wogol
 * Z big zombie
 * z random zombie
 */

// TODO - generate random map here
export const generateMap = () => {
  return [
    "         ┌───────┐                                               ",
    "         │.......│                                               ",
    " ┌───────┘.......│                                               ",
    "┌┘...............└─────)─(─}─{─&──%──!─{─}─(─)──────────────────┐",
    "│....................?..........................................│",
    "│...>..............................................d............│",
    "│...........^...................f...............................│",
    "│.<...................$.......................Z.............w...│",
    "│....................$$$........................................│",
    "│.........#...........$.....................z......g............│",
    "│......................................i........................│",
    "│...............................................................│",
    "│.............┌─┐..........................S............o.......│",
    "│............┌┘ └┐.............m................................│",
    "│...........┌┘   └┐............................n................│",
    "│...@......┌┘     └┐...............O.....................s......│",
    "│..........│       │............................................│",
    "└──────────┘       └─┐..........................................│",
    "                     └────────┐...┌─)─(─}─{─&──%──!─{─}─(─)─────┘",
    "                              │...│                              ",
    "                             ┌┘...│    ┌──────────────────────┐  ",
    "                         ┌───┘..┌─┘    │......................│  ",
    "                         │......│     ┌┘......................│  ",
    "                         │.┌────┘    ┌┘.......................│  ",
    "                         │.│        ┌┘........................│  ",
    "                         │.└────────┘.........................│  ",
    "                         │....................................│  ",
    "                         └────────────────────────────────────┘  ",
  ];
};