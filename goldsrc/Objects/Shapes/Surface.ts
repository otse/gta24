import Data2 from "../Data.js";
import Object2 from "../Object.js";

import Surfaces from "../Shapes/Surfaces.js";
import Sprites from "../../Sprites/Sprites.js";
import Sheets from "../../Sprites/Sheets.js";

import Util from "../../Random.js";
import Points from "../Points.js";
import Four from "../../Four.js";
import Water from "../../Unsorted/Water.js";

const defaultSty = 'sty/commercial/storefront/577.bmp';

export class Surface extends Object2 {

	mesh
	material
	geometry

	constructor(data: Data2) {
		super(data);

		// the Defaults
		//if (!this.data.color) this.data.color = 'white';
		//if (!this.data2.faces) this.data2.faces = [];

		this.make();
	}

	// Override
	destroy() {
		super.destroy();

		Surfaces.hide(this);

		this.geometry.dispose();
		this.material.dispose();

		delete this.mesh;
		delete this.geometry;
		delete this.material;
	}

	update() {}

	make() {
		this.geometry = Surfaces.geometry.clone();

		const hasSheet = this.data.sheet && this.data.sprite;

		// Cut to prevent texture bleeding
		const cut = true;

		let map;

		//let halfPixel = 0;

		if (hasSheet) {
			let sheet = Sheets.get(this.data.sheet);

			if (cut) {
				map = Sheets.cut(sheet!, this.data.sprite);
			}
			else {
				map = Util.loadTexture(sheet.file);

				Util.UV.fromSheet(this.geometry, this.data.sprite!, sheet!);
			}
		}
		else {
			map = Util.loadTexture(this.data.sty)!;
		}

		//this.data.color = '#888888';

		this.material = new THREE.MeshPhongMaterial({
			map: map,
			shininess: 0,
			color: new THREE.Color(this.data.color),
			//side: DoubleSide
		});

		let material = this.material;

		if ('sty/special/water/1.bmp' == this.data.sty) {
			material = Water.material;
		}

		//map.offset.set(.01, .01);

		this.mesh = new THREE.Mesh(this.geometry, material);
		this.mesh.matrixAutoUpdate = false;
		this.mesh.frustumCulled = false;
		this.mesh.castShadow = false;
		this.mesh.receiveShadow = true;

		this.mesh.position.set(
			this.data.x * 64 + 32,
			this.data.y * 64 + 32,
			this.data.z * 64);

		this.mesh.updateMatrix();

		if (this.data.f) Util.UV.flipPlane(this.geometry, 0, true);
		if (this.data.r) Util.UV.rotatePlane(this.geometry, 0, this.data.r);

		Surfaces.show(this);
	}

	slope() {
		if (!this.data.slope)
			return;

		for (let i in this.data.slope) {
			let p = this.geometry.getAttribute('position').array;

			//this.geometry.attributes.position.needsUpdate = true;

			const slope = this.data.slope[i];
			const pts = 8 * slope;

			/*switch (i) {
				case 0:
					p[2] = pts;
					p[5] = pts;
					break;
				case 1:
					p[5] = pts;
					p[11] = pts;
					break;
				case 2:
					p[8] = pts;
					p[11] = pts;
					break;
				case 3:
					p[2] = pts;
					p[8] = pts;
			}*/
		}
	}
}

export default Surface;