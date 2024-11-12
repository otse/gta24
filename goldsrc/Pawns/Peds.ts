import Ped from "./Ped.js";

import Util from "../Random.js";

import Anims from "../Sprites/Anims.js";
import Sheet from "../Sprites/Sheet.js";

//import { three } from "../three.js";

export namespace Peds {

    export function play(ped: Ped, word: string, square: Square | undefined = undefined) {

		const timer = ped.timers[word];

		Anims.update(timer);

		Util.UV.fromSheet(ped.geometry,
			square || timer.def.spriteArray![timer.i],
			Peds.sheet);

		return timer;
    }
    
    export var material;
    export var materialShadow;

    export const sheet: Sheet = {

        file: 'ped/template_24.png',
        width: 264,
        height: 759,
        piece: {
            w: 33,
            h: 33
        }
    };

}

export default Peds;