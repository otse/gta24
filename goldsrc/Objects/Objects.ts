import Data2 from "./Data.js";
import Object2 from "./Object.js";

import Block from "./Shapes/Block.js";
import Surface from "./Shapes/Surface.js";
import Wall from "./Shapes/Wall.js";
import Car from "../Cars/Car.js";
import Datas from "./Datas.js";
import Ply from "../Pawns/Ply.js";
import Points from "./Points.js";

export namespace Objects {
	function factory(data: Data2): Object2 | null {

		switch (data.type) {
			//case 'Ped': return new Ped(data);
			case 'Ply': return new Ply(data);

			case 'Car': return new Car(data);
			case 'Block': return new Block(data);
			case 'Surface': return new Surface(data);
			case 'Wall': return new Wall(data);
			//case 'Lamp': return new Lamp(data);

			default:
				return null;
		}
	}

	export function makeNullable(data: Data2): Object2 | null {
		console.warn('makeNullable', data.type);
		if (data.object)
			console.warn('Data', data.type, 'already has object2');
		let object = factory(data);
		if (!object)
			console.warn('Object2 not typable');
		return object || null;
	}

	export function relocate(object: Object2) {
		let chunk = Datas.getChunk(object.data);
		if (chunk != object.chunk) {
			object.chunk._remove(object.data);
			chunk._add(object.data);
		}
	}
}

export default Objects;