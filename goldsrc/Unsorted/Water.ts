import Four from "../Four.js";
import Util from "../Random.js";

namespace Water {

	let time
	let j
	let waters: any[]

	export var material

	export function init() {
		time = 0;
		j = 0;
		waters = [];

		for (let i = 1; i <= 12; i++)
			waters.push(Util.loadTexture(`sty/special/water/${i}.bmp`));

		material = new THREE.MeshPhongMaterial({
			map: waters[0]
		});
	}

	export function update() {
		time += Four.delta;

		if (time >= 0.11) {
			j += j < 11 ? 1 : -11;
			material.map = waters[j];
			time = 0;
		}
	}

}

export default Water;