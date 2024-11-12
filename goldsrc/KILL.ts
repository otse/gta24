import Data2 from "./Objects/Data.js";
import City from "./Chunks/City.js";
import Ply from "./Pawns/Ply.js";

import Phong2 from "./Shaders/Phong2.js";
import Rectangles from "./Objects/Rectangles.js";
import Surfaces from "./Objects/Shapes/Surfaces.js";
import Blocks from "./Objects/Shapes/Blocks.js";
import BoxCutter from "./Objects/Shapes/Box cutter.js";
import Sprites from "./Sprites/Sprites.js";
import Sheets from "./Sprites/Sheets.js";

import Levels from "./Generators/Levels.js";

import Cameraz from "./Unsorted/Cameraz.js";
import { Shift } from "./Unsorted/Shift.js";
import PalmTrees from "./Scenarios/Palm trees.js";
import HighWayWithEveryCar from "./Scenarios/Highway.js";
import BridgeScenario from "./Scenarios/Bridge.js";
import Scenarios from "./Scenarios/Scenarios.js";
import Fonts from "./YM/Fonts.js";
import Water from "./Unsorted/Water.js";
import Mist from "./Unsorted/Mist.js";
import Cars from "./Cars/Cars.js";
import YM from "./YM/You me.js";
import Datas from "./Objects/Datas.js";
import Chunks from "./Chunks/Chunks.js";

export namespace KILL {

	export var view: Data2;

	export var ply: Ply | null;
	export var city: City;

	var started = false;

	export function floor_random(n) {
		return Math.floor(Math.random() * n)
	}

	export enum RESOURCES {
		UNDEFINED_OR_INIT = 0,
		FONT_WHITE,
		FONT_YELLOW,
		FONT_MISSION,
		SPRITES,
		COUNT
	};

	let resources_loaded = 0b0;

	export function resourced(word: string) {

		resources_loaded |= 0b1 << RESOURCES[word];

		try_start();
	}

	function try_start() {

		let count = 0;

		let i = 0;
		for (; i < RESOURCES.COUNT; i++)
			(resources_loaded & 0b1 << i) ? count++ : void (0);

		if (count == RESOURCES.COUNT)
			start();
	}

	export function critical(mask: string) {

		// Couldn't load

		console.error('resource', mask);

	}

	export function init() {
		console.log('kill init');

		resourced('UNDEFINED_OR_INIT');

		Phong2.rig();
		Rectangles.init();
		Surfaces.init();
		Blocks.init();
		BoxCutter.init();
		Chunks.init();
		Cars.init();
		Sprites.init();
		Sheets.init();

		Fonts.init();
		
		Water.init();
		Mist.init();
		
		Shift.init();
		YM.init();

		city = new City;

		(window as any).KILL = KILL;
	}

	export function start() {

		if (started)
			return;

		console.log('kill starting');

		started = true;

		if (window.location.href.indexOf("#highway") != -1)
			HighWayWithEveryCar.init();
		
		//else if (window.location.href.indexOf("#palmtrees") != -1)
		//else
			//PalmTrees.init();
		Levels.AptsOffice();

		//else
			//BridgeScenario.init();

		let data: Data2 = {
			type: 'Ply',
			//remap: 16,
			x: 10.5,
			y: 1,
			z: 0
		};
		view = data;

		Datas.deliver(data);
		//data.remap = [40, 46, 47, 49, 50, 51][Math.floor(Math.random() * 6)];

		city.chunkList.get2(0, 0);
		city.chunkList.get2(0, 1);
	}

	export function update() {

		if (!started)
			return;

		if (ply)
			ply.manual_update();

		YM.update();

		Water.update();
		Mist.update();

		Cameraz.update();

		Scenarios.update();

		city.shift(view);
	
		city.update();
	}

}

export default KILL;