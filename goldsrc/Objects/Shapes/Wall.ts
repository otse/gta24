import Data2 from "../Data.js";
import Object2 from "../Object.js";

import Surfaces from "../Shapes/Surfaces.js";
import Sprites from "../../Sprites/Sprites.js";
import Sheets from "../../Sprites/Sheets.js";

import Util from "../../Random.js";
import Points from "../Points.js";
import Four from "../../Four.js";

export class Wall extends Object2 {

    mesh
    material
    geometry

    constructor(data: Data2) {
        super(data);

        console.log('Wall');


        this.make();
    }

    destroy() {
        super.destroy();
    }

    make() {
        this.geometry = new THREE.PlaneBufferGeometry(64, 64, 1, 1);

		let style = `sty/interiors/${this.data.style}`;
        
        let sty, mask;
        
        if ('concave' == this.data.wall) {
            sty = `concave.bmp`;
            mask = `concaveMask.bmp`;
        }
        else
        {
            sty = `side.bmp`;
            mask = `sideMask.bmp`;
        }

        let map = Util.loadTexture(`${style}/${sty}`);
        let maskMap = Util.loadTexture(`${style}/${mask}`);

        this.material = new THREE.MeshPhongMaterial({
            map: map,
            shininess: 0,
            transparent: true,
            color: new THREE.Color(this.data.color),
            //side: DoubleSide
        });
        
        this.material.onBeforeCompile = function (shader) {

			shader.uniforms.maskMap = { value: maskMap };

            shader.fragmentShader = shader.fragmentShader.replace(
				`#define PHONG`,
				`
                #define PHONG
                
				#define INTERIOR_WALL
				
				uniform sampler2D maskMap;
			`
            );

            // https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderChunk/map_fragment.glsl.js
            
            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <map_fragment>`,
                `
				#ifdef USE_MAP
				
                    vec4 texelColor = texture2D( map, vUv );
                    vec4 maskColor = texture2D( maskMap, vUv );
                    
                    texelColor.rgb *= maskColor.r;

					// texelColor = mapTexelToLinear( texelColor );
					diffuseColor *= texelColor;

				#endif
			`);
        };


        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.matrixAutoUpdate = false;
        this.mesh.frustumCulled = false;

        this.mesh.position.set(
            this.data.x * 64 + 32,
            this.data.y * 64 + 32,
            this.data.z * 64);

        this.mesh.updateMatrix();

        if (this.data.f)
            Util.UV.flipPlane(this.geometry, 0, true);
        if (this.data.r)
            Util.UV.rotatePlane(this.geometry, 0, this.data.r);

        Four.scene.add(this.mesh);
    }
}

export default Wall;