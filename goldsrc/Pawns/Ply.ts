import Data2 from "../Objects/Data.js";

import Ped from "./Ped.js";
import Peds from "./Peds.js";

import Util from "../Random.js";
import Anims from "../Sprites/Anims.js";
import KILL from "../KILL.js";
import App from "../App.js";

export class Ply extends Ped {

	constructor(data: Data2) {
		super(data);

		console.log('Ply');

		KILL.ply = this;

		(window as any).ply = this;
	}

	update() {
		this.update_position();
	}

	manual_update() {
		//super.Update();

		const skooma = App.get_key(['x']); // x
		
		if (App.get_key(['shift']) == 1)
			this.run = !this.run;
		
		const A = App.get_key(['a']) && !App.get_key(['d']);
		const S = App.get_key(['s']) && !App.get_key(['w']);
		const W = App.get_key(['w']) && !App.get_key(['s']);
		const D = App.get_key(['d']) && !App.get_key(['a']);
		
		if (A || D) {
			const r = this.idle ? 50 : !this.run ? 55 : 60;

			this.data.r! += A ? Math.PI / r : Math.PI / -r;
		}

		if (W || S) {
			const dist = !this.run ? 0.5 / 64 : 1.5 / 64;
			let speed = W ? -dist : dist / 2;

			if (skooma)
				speed *= 2;

			this.data.x += speed * Math.sin(-this.data.r!);
			this.data.y += speed * Math.cos(-this.data.r!);

			Peds.play(this, this.run ? 'run' : 'walk');

			this.idle = false;
		}
		else if (!this.idle) {

			Anims.zero(this.timers.walk);
			Anims.zero(this.timers.run);

			Util.UV.fromSheet(this.geometry, { x: 1, y: 8 }, Peds.sheet);

			this.idle = true;
		}

		////this.gravitate();

		this.update_position();
	}
}

export default Ply;