import Data2 from "../Objects/Data.js";
import Datas from "../Objects/Datas.js";

export interface Scenario {
	name: string;
	loadCb: () => void;
	updateCb: () => void;
};

export default Scenario;