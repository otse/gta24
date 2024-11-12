import Four from "../Four.js";
import Util from "../Random.js";
import Points from "../Objects/Points.js";
import KILL from "../KILL.js";
import FontsSpelling from "./Fonts spelling.js";

export namespace Fonts {

	export const fonts: { [key: string]: HTMLImageElement } = {
		white: undefined,
		yellow: undefined,
		mission: undefined
	};

	export var canvas;

	export function init() {
		canvas = document.createElement('canvas');

		console.log('fonts init');

		load();
	}

	function load() {

		const get_font = (name, rs, func) => {

			new THREE.ImageLoader().load(`sty/fonts/${name}.png`,
				(img) => {
					func(img);
					KILL.resourced(rs);
				},
				() => { },
				() => KILL.critical(rs)
			);
		};

		get_font(`white`, `FONT_WHITE`, (e) => fonts.white = e);
		get_font(`yellow`, `FONT_YELLOW`, (e) => fonts.yellow = e);
		get_font(`mission`, `FONT_MISSION`, (e) => fonts.mission = e);
	}

	export function textOnto(inCanvas, text: string, width: number, height: number) {
		
		let symbols = FontsSpelling.symbolize(inCanvas, text, 'small');

		const context = inCanvas.getContext("2d");

		for (let s of symbols) {

			let font = s.colorize ? Fonts.fonts.yellow : Fonts.fonts.white;

			context.drawImage(
				font, s.x2, s.y2, s.w, s.h, s.x, s.y, s.w, s.h);
		}
	}

	export function textTexture(text: string, width: number, height: number) {

		canvas.width = width;
		canvas.height = height;
		
		let symbols = FontsSpelling.symbolize(canvas, text, 'small');

		let texture = new THREE.CanvasTexture(canvas);

		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;

		const context = canvas.getContext("2d");

		for (let s of symbols) {

			let font = s.colorize ? Fonts.fonts.yellow : Fonts.fonts.white;

			context.drawImage(
				font, s.x2, s.y2, s.w, s.h, s.x, s.y, s.w, s.h);
		}

		texture.needsUpdate = true;

		return texture;
	}

}

export default Fonts;