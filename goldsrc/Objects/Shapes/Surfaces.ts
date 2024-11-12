import Surface from "./Surface.js";

import Four from "../../Four.js";


export namespace Surfaces {
	export var geometry

	export function init() {
		this.geometry = new THREE.PlaneGeometry(64, 64, 1, 1);
	}

	export function show(plane: Surface) {
		Four.scene.add(plane.mesh);
	}

	export function hide(plane: Surface) {
		Four.scene.remove(plane.mesh);
	}
}

export default Surfaces;