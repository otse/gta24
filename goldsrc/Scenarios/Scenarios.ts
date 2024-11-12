import Data2 from "../Objects/Data.js";
import Datas from "../Objects/Datas.js";
import Scenario from "./Scenario.js";

export namespace Scenarios {

	export var current: Scenario;

	export function load(p: Scenario) {
		current = p;

		current.loadCb();
	}

	export function update() {
		if (current)
			current.updateCb();
	}

};

export default Scenarios;