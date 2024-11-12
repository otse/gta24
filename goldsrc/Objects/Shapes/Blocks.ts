import Data2 from "../Data.js";

import Block from "./Block.js";
import BoxCutter from "./Box cutter.js";

import Four from "../../Four.js";
import Util from "../../Random.js";

export namespace Blocks {
	export var geometry

	export function init() {
		geometry = new THREE.BoxGeometry(64, 64, 64);

		Util.UV.rotatePlane(geometry, 0, 3);
		Util.UV.rotatePlane(geometry, 1, 1);
		Util.UV.rotatePlane(geometry, 2, 2);
	}

	function getBits(data: Data2): string {
		let str = '';

		for (let i = 0; i < 5; i++)
			str += data.faces![i] ? '|' : 'O';

		str = str.toString().replace(/[\s,]/g, '');

		return str;
	}

	export function getBox(block: Data2) {
		let bits = getBits(block);

		let box = BoxCutter.geometries[bits];

		return box.clone();
	}

	export function show(block: Block) {
		Four.scene.add(block.mesh);
	}

	export function hide(block: Block) {
		Four.scene.remove(block.mesh);
	}
}

export default Blocks;