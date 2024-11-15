import Four from "../Four.js";

namespace Phong2 {

	// Taken from
	// https://raw.githubusercontent.com/mrdoob/three.js/dev/src/renderers/shaders/ShaderLib/meshphong_frag.glsl.js

	//var customMaterial: THREE.ShaderMaterial;
	export function rig() {

	}

	export function carDeltaShader(phongProperties, p: any) {

		let material = new THREE.MeshPhongMaterial(phongProperties);

		material.onBeforeCompile = function(shader) {

			shader.uniforms.pink = { value: new THREE.Vector3(1, 0, 1) };

			shader.fragmentShader = shader.fragmentShader.replace(
				`#define PHONG`,
				`
				#define PHONG
				#define CARDELTASHADER
			`
			);

			shader.fragmentShader = shader.fragmentShader.replace(
				`#include <map_fragment>`,
				`
				#ifdef USE_MAP
				
					vec4 texelColor = vec4(0);
					
					vec4 mapColor = texture2D( map, vUv );

					//#ifdef PINK

					// Pink
					if ( mapColor.rgb == vec3(1, 0, 1) ) {
						mapColor.a = 0.0;
						mapColor.rgb *= 0.0;
					}

					texelColor = mapColor;

					// texelColor = mapTexelToLinear( texelColor );

					diffuseColor *= texelColor;

				#endif
			`);
			
		}

		return material;
	}

	export function rectangleShader(phongProperties, p: any) {

		let customMaterial = new THREE.MeshPhongMaterial(phongProperties);

		customMaterial.onBeforeCompile = function(shader) {
			
			shader.uniforms.blurMap = { value: p.blurMap };

			shader.uniforms.pink = { value: new THREE.Vector3(1, 0, 1) };

			shader.fragmentShader = shader.fragmentShader.replace(
				`#define PHONG`,
				`
				#define PHONG
				#define PHONG2
				
				uniform sampler2D blurMap;
			`
			);

			shader.fragmentShader = shader.fragmentShader.replace(
				`#include <map_fragment>`,
				`
				#ifdef USE_MAP
				
					vec4 texelColor = vec4(0);
					
					vec4 mapColor = texture2D( map, vUv );

					//#ifdef PINK

					// Pink
					if ( mapColor.rgb == vec3(1, 0, 1) ) {
						mapColor.a = 0.0;
						mapColor.rgb *= 0.0;
					}

					// Blur
					vec4 blurColor = texture2D( blurMap, vUv );
					blurColor.rgb *= 0.0;
					blurColor.a /= 3.0; // detensify
					//texelColor = blurColor + mapColor;
					texelColor = mapColor;

					// texelColor = mapTexelToLinear( texelColor );

					diffuseColor *= texelColor;

				#endif
			`);
			
		}

		return customMaterial;
	}

	export function rectangleShadowShader(phongProperties, p: any) {

		let customMaterial = new THREE.MeshPhongMaterial(phongProperties);

		customMaterial.onBeforeCompile = (shader) => {
			
			shader.uniforms.pink = { value: new THREE.Vector3(1, 0, 1) };

			shader.fragmentShader = shader.fragmentShader.replace(
				`#define PHONG`,
				`
				#define PHONG
				#define PHONG2

				// add uniforms here
			`
			);

			shader.fragmentShader = shader.fragmentShader.replace(
				`#include <map_fragment>`,
				`
				#ifdef USE_MAP
				
					vec4 texelColor = vec4(0);
					
					vec4 mapColor = texture2D( map, vUv );

					// Pink
					if ( mapColor.rgb == vec3(1, 0, 1) ) {
						mapColor.a = 0.0;
						mapColor.rgb *= 0.0;
					}

					texelColor = mapColor;

					// texelColor = mapTexelToLinear( texelColor );

					diffuseColor *= texelColor;

				#endif
			`);
			
		} // onBeforeCompile

		return customMaterial;
	}
}

export default Phong2;