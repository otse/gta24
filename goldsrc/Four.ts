
import KILL from './KILL.js';
import Points from './Objects/Points.js';
import { Shift } from './Unsorted/Shift.js';
import Util from './Random.js';
import YM from './YM/You me.js';

//export { THREE };

export namespace Four {

	export var delta = 0;
	export var aspect = 0;

	// todo, redo
	export var boxBufferGeometry
	export var clock
	export var scene
	export var camera
	export var renderer
	export var ambientLight
	export var directionalLight

	export function update() {

		delta = clock.getDelta();
		delta = Math.max(0.007, Math.min(delta, 0.033)); // cap 30 - 144 fps

		KILL.update();

		// ??
		// if (App.map[115] == 1)
		// 	Shift.enabled = !Shift.enabled;

		if (Shift.enabled) {

			Shift.update();

			Shift.composer.render();
		}

		else

			renderer.render(scene, camera);
	}

	export function init() {

		console.log('four init');

		clock = new THREE.Clock();

		camera = new THREE.PerspectiveCamera(
			70, window.innerWidth / window.innerHeight, 1, 3000);
		aspect = camera.aspect;
		camera.position.z = 200;

		scene = new THREE.Scene();

		directionalLight = new THREE.DirectionalLight(0x355886, 1.0);
		directionalLight.position.set(0, 0, 1);
		ambientLight = new THREE.AmbientLight('#ffffff'); // #5187cd
		//ambientLight = new AmbientLight('#5187cd'); // #5187cd

		//scene.add(directionalLight);
		scene.add(directionalLight.target);
		scene.add(ambientLight);

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(
			window.innerWidth, window.innerHeight);
		renderer.autoClear = true;
		//renderer.setClearColor(0x777777, 1);

		renderer.domElement.id = "main";

		document.body.appendChild(renderer.domElement);

		window.addEventListener('resize', onWindowResize, false);
	}

	function onWindowResize() {

		aspect = camera.aspect = window.innerWidth / window.innerHeight;

		camera.updateProjectionMatrix();

		Shift.resize();
		YM.resize();

		renderer.setSize(
			window.innerWidth, window.innerHeight);

		console.log('aspect ', aspect);

	}
}

window['Four'] = Four;

export default Four;