var mouseDown = 0;
document.body.onmousedown = function() {
    ++mouseDown;
};
document.body.onmouseup = function() {
    --mouseDown;
};
var container, stats;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var offset = -150;

init();
animate();


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 600;


    // scene

    scene = new THREE.Scene();

    // texture

    var texture2 = THREE.ImageUtils.loadTexture('./img/BottomGumDeffuse.jpg', {});
    var texture3 = THREE.ImageUtils.loadTexture('./img/TongueDeffuse.jpg', {});
    var texture4 = THREE.ImageUtils.loadTexture('./img/TopGumDeffuse.jpg', {});



    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {

        console.log(item, loaded, total);

    };

    // model
    var loader = new THREE.OBJLoader(manager);

    loader.load('./objs/body.obj', function(object) {


            object.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshPhongMaterial({
                            map: THREE.ImageUtils.loadTexture('./img/Trex_Diffuse.jpg'),
                            normalMap: THREE.ImageUtils.loadTexture('./img/Trex_Normal.jpg'),
                        });
                    }
                }
            );

            object.position.y = offset;
            object.rotation.y = 40 * Math.PI / 180;

            scene.add(object);

        }
    );

    loader.load('./objs/low_gum.obj', function(object) {
        object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshLambertMaterial({
                        map: texture2,
                        needsUpdate: true
                    });
                }

            }
        );

        object.position.y = offset;
        object.rotation.y = 40 * Math.PI / 180;

        scene.add(object);

    });
    loader.load('./objs/tongue.obj', function(object) {
        object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshLambertMaterial({
                        map: texture3,
                        needsUpdate: true
                    });
                }

            }
        );

        object.position.y = offset;
        object.rotation.y = 40 * Math.PI / 180;

        scene.add(object);

    });
    loader.load('./objs/webbing.obj', function(object) {
        object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {

                    child.material = new THREE.MeshPhongMaterial({
                        map: THREE.ImageUtils.loadTexture('./img/MouthWebbing.jpg', {}),
                        normalMap: THREE.ImageUtils.loadTexture('./img/Webbingnormal2.jpg', {})
                    });


                }
            }
        );

        object.position.y = offset;
        object.rotation.y = 40 * Math.PI / 180;

        scene.add(object);

    });
    loader.load('./objs/up_gum.obj', function(object) {
        object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshLambertMaterial({
                        map: texture4,
                        needsUpdate: true
                    });
                }

            }
        );

        object.position.y = offset;
        object.rotation.y = 40 * Math.PI / 180;

        scene.add(object);

    });
    loader.load('./objs/eyes.obj', function(object) {
        object.traverse(function(child) {

            child.material = new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('./img/dinosaureye_03c.jpg', {}),
                shininess: 100
            });

        });

        object.position.y = offset;
        object.rotation.y = 40 * Math.PI / 180;

        scene.add(object);


    });

    loader.load('./objs/tusks.obj', function(object) {

        object.position.y = offset;
        object.rotation.y = 40 * Math.PI / 180;

        scene.add(object);

    });
    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);


	var spotLight = new THREE.SpotLight( 0x666666 );
	spotLight.position.set(1000,10000,100);

	scene.add( spotLight );

	var directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);



    renderer = new THREE.WebGLRenderer({ alpha: true });


    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    controls = new THREE.TrackballControls(camera);
    controls.target.set(0, 0, 0);
    controls.addEventListener("change", render);
    document.addEventListener('dblclick', function() {
        controls.reset();
    }, false);
    var hammertime = new Hammer(document.body);
    hammertime.on('doubletap', function(ev) {
        controls.reset();
    });


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
    line.position.y = offset;
    scene.add(line);

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    if (!mouseDown) {
        return;
    }
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}
