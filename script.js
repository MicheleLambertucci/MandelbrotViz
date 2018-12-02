//Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer
var container;
var camera, scene, renderer;
var uniforms;
var startTime;

document.addEventListener("DOMContentLoaded", ()=>{
	init();
	animate();
}, false);

function init() {
	//get contenaire
	container = document.getElementById('container');
	
	//Create THREE.JS scene and timer
	camera = new THREE.Camera();
	camera.position.z = 1;
	scene = new THREE.Scene();
	
	//create a simple plance
	var geometry = new THREE.PlaneBufferGeometry(16, 9);
	
	//create uniform table which provide all our GLSL binding
	uniforms = {
		resolution: { type: "v2", value: new THREE.Vector2() },
		padding: {type: "v2", value: new THREE.Vector2(0, 0)},
		zoom: { type: "f", value: 100.0 },
	};
	
	//create THREE.JS material
	var material = new THREE.ShaderMaterial( {
	//set shaders and uniforms into material
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	} );

	//create mesh, add it to the scene
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	//create renderer and add it to the DOM
	renderer = new THREE.WebGLRenderer();
	container.appendChild(renderer.domElement);
	
	//check window for resize This will give us the proper resolution values to bind
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('wheel', zoomView, false);
	
	window.addEventListener('mousedown', (e)=>{drag = true}, false);
	window.addEventListener('mouseup', (e)=>{drag = false}, false);
	window.addEventListener('mousemove', (e) => {
		if(drag)
			onDrag(e);
	}, false);
}

let drag = false;
function onDrag(event){
	uniforms.padding.value.x -= event.movementX / uniforms.zoom.value;
	uniforms.padding.value.y += event.movementY / uniforms.zoom.value;
}

let zoomFactor = 0;
function zoomView(event){
	zoomFactor -= event.deltaY/100;
	uniforms.zoom.value = 100 * Math.exp(zoomFactor * 0.1)
	if(uniforms.zoom.value < 100){
		uniforms.zoom.value = 100;
		zoomFactor = 0;
	}
}

function onWindowResize(event) {
	uniforms.resolution.value.x = window.innerWidth;
	uniforms.resolution.value.y = window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}