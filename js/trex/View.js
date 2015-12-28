var View = {
    windowX: window.innerWidth,
    windowY: window.innerHeight,
    windowHalfX: this.windowX / 2,
    windowHalfY: this.windowY / 2,
    offset: -150,
    bindEvents: function() {
        window.addEventListener('resize', this.view.onWindowResize.bind(this), false);

        document.addEventListener('dblclick', this.view.resetControls.bind(this));

        var hammertime = new Hammer(document.body);
        hammertime.on('doubletap', this.view.resetControls.bind(this));
    },
    resetControls: function() {
        this.controls.reset();
    },
    onWindowResize: function() {
        this.view.windowHalfX = window.innerWidth / 2;
        this.view.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    drawGrid: function() {
        var size = 150,
            step = 25;

        var geo = new THREE.Geometry();
        var mat = new THREE.LineBasicMaterial({
            color: "green"
        });

        for (var i = -size; i <= size; i += step) {
            geo.vertices.push(new THREE.Vector3(-size, -0.004, i));
            geo.vertices.push(new THREE.Vector3(size, -0.004, i));

            geo.vertices.push(new THREE.Vector3(i, -0.004, -size));
            geo.vertices.push(new THREE.Vector3(i, -0.004, size));
        }
        var line = new THREE.Line(geo, mat, THREE.LinePieces);
        line.position.y = this.view.offset;
        this.scene.add(line);
    },
    loadComponents: function() {
        var loader = new THREE.OBJLoader();

        for (var i in this.components) {
            this.view.loadComponent.bind(this)(i, loader);
        }
    },
    loadComponent: function(i, loader) {
        loader.load(this.components[i].obj, function(object) {


            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    var material = new THREE.MeshPhongMaterial();
                    if (this.components[i].map) {
                        material.map = THREE.ImageUtils.loadTexture(this.components[i].map);
                    }
                    if (this.components[i].normal) {
                        material.normalMap = THREE.ImageUtils.loadTexture(this.components[i].normal);
                    }
                    child.material = material;
                }
            }.bind(this));

            object.position.y = this.view.offset;
            object.rotation.y = 40 * Math.PI / 180;
            this.scene.add(object);

        }.bind(this));
    },
    addLights: function() {

        var ambientLight = new THREE.AmbientLight(0x999999);
        this.scene.add(ambientLight);


        var spotLight = new THREE.SpotLight(0x666666);
        spotLight.position.set(1000, 10000, 100);

        this.scene.add(spotLight);

        var directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(1, 1, 0);
        this.scene.add(directionalLight);
    }
};
