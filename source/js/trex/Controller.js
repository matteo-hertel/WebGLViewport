var Controller = Object.create(Model);
Controller.view = Object.create(View);

Controller.init = function() {
    this.container = document.createElement('div');

    //THREE Objects
    this.createThreeObjects();
    // init scene
    this.addElementToScene();
    //init controls
    this.createControls();

    this.container.appendChild(this.renderer.domElement);

    document.body.appendChild(this.container);
    this.animate();
};
Controller.createThreeObjects = function() {
    //camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 600;
    //scene
    this.scene = new THREE.Scene();
    //renderer
    this.renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    this.renderer.setSize(this.view.windowX, this.view.windowY);
};
Controller.createControls = function() {
    //events
    this.view.bindEvents.bind(this)();
    //Controls
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.target.set(0, 0, 0);
    this.controls.addEventListener("change", this.render.bind(this));

};
Controller.addElementToScene = function() {
    // components
    this.view.loadComponents.bind(this)();
    this.view.drawGrid.bind(this)();
    //lights
    this.view.addLights.bind(this)();
};
Controller.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.render();
};
Controller.render = function() {
    this.renderer.render(this.scene, this.camera);
};

Controller.init();
