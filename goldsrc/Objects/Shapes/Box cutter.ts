import Blocks from "./Blocks.js";

export namespace BoxCutter {

	const picks = [
		"OOOOO", "|OOOO", "O|OOO", "||OOO",
		"OO|OO", "|O|OO", "O||OO", "|||OO",
		"OOO|O", "|OO|O", "O|O|O", "||O|O",
		"OO||O", "|O||O", "O|||O", "||||O",
		"OOOO|", "|OOO|", "O|OO|", "||OO|",
		"OO|O|", "|O|O|", "O||O|", "|||O|",
		"OOO||", "|OO||", "O|O||", "||O||",
		"OO|||", "|O|||", "O||||", "|||||"
	];

	export let geometries: any[] = [];

	// Remove faces from a Box Buffer Geometry
	export function init() {

		for (let bits of picks) {

			const geometry = Blocks.geometry.clone();

			geometries[bits] = geometry;

			const attribs = geometry.attributes;

			const position = Array.from(attribs.position.array);
			const uv = Array.from(attribs.uv.array);
			const normal = Array.from(attribs.normal.array);

			for (let i = 5; i >= 0; i--) {

				// Keep this face
				if ('|' == bits[i])
					continue;

				position.splice(i * 12, 12);
				uv.splice(i * 8, 8);
				normal.splice(i * 12, 12);

				(attribs.position.count as any) -= 4;
				(attribs.uv.count as any) -= 4;
				(attribs.normal.count as any) -= 4;

				geometry.groups.splice(i, 1);

				// three.js has .addGroup
				for (let j = 0; j < geometry.groups.length; j++) {
					let group = geometry.groups[j];
					if (j < i)
						continue;
					group.start -= 6;
				}

				(attribs.position.array as any) = new Float32Array(position as unknown as ArrayBuffer);
				(attribs.uv.array as any) = new Float32Array(uv as unknown as ArrayBuffer);
				(attribs.normal.array as any) = new Float32Array(normal as unknown as ArrayBuffer);
			}

		}

	}
}

export default BoxCutter;