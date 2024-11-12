import Data2 from "../../Objects/Data.js";
import Datas from "../../Objects/Datas.js";

import Util from "../../Random.js";
import Sheets from "../../Sprites/Sheets.js";
import Four from "../../Four.js";
import { Fonts } from "../Fonts.js";
import Widget from "../Widget.js";

export class WordBox {
	widget: Widget

	texture

	constructor() {
		this.make();
	}

	destroy() {
		this.widget.destroy();
	}

	make() {
		this.widget = new Widget(
			{
				x: 250,
				y: -250,
				z: 0,
				w: 512,
				h: 128
			});
			
		this.widget.scale = 3;

		this.widget.material.map = this.texture;
	}

	setText(text: string, delay = 650) {
		if (this.texture)
			this.texture.dispose();
		this.texture = Fonts.textTexture(text, 512, 128);
		//if (this.mesh) {
		this.widget.material.map = this.texture;
		this.widget.mesh.visible = false;
		setTimeout(() => {
			this.widget.mesh.visible = true;
		}, delay);
		//}
	}

	update() {
		this.widget.update();

		//let pos = Four.camera.position.clone();
		//let x = pos.x + 100 * Four.aspect;
		//let y = pos.y - 80;
		//let z = pos.z - 200;

		//this.mesh.position.set(x, y, z);
		//this.meshShadow.position.set(x + 1, y - 1, z);
	}

};

(window as any).WordBox = WordBox;

export default WordBox;