import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// =====================================================
// 1. CONTAINER
// =====================================================

const container = document.getElementById("three-container");

0
// 2. SCENE
// =====================================================

const scene = new THREE.Scene();


// =====================================================
// 3. CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0, 0, 8);


// =====================================================
// 4. RENDERER
// =====================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);


// =====================================================
// 5. MAIN WORLD
// =====================================================

const world = new THREE.Group();

scene.add(world);


// =====================================================
// 6. MATERIALS
// =====================================================

const blue = new THREE.MeshBasicMaterial({
    color: 0x3399ff
});

const cyan = new THREE.MeshBasicMaterial({
    color: 0x66d9ff
});

const white = new THREE.MeshBasicMaterial({
    color: 0xffffff
});

const wireBlue = new THREE.MeshBasicMaterial({
    color: 0x278cff,
    wireframe: true,
    transparent: true,
    opacity: 0.6
});


// =====================================================
// 7. DATA INPUT SECTION
// =====================================================

const dataGroup = new THREE.Group();

dataGroup.position.set(-2.3, 0, 0);

world.add(dataGroup);


// Data grid

const grid = new THREE.GridHelper(
    1.7,
    8,
    0x248cff,
    0x12456f
);

grid.rotation.x = Math.PI / 2;

grid.position.z = -0.1;

grid.material.transparent = true;
grid.material.opacity = 0.35;

dataGroup.add(grid);


// Data blocks

const dataBlocks = [];

for (let i = 0; i < 16; i++) {

    const block = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.10,
            0.10,
            0.10
        ),
        wireBlue
    );

    const col = i % 4;
    const row = Math.floor(i / 4);

    block.position.set(
        (col - 1.5) * 0.28,
        (row - 1.5) * 0.28,
        0
    );

    block.userData = {
        originalY: block.position.y,
        phase: Math.random() * Math.PI * 2
    };

    dataGroup.add(block);
    dataBlocks.push(block);
}


// Data label-like frame

const dataFrame = new THREE.Mesh(
    new THREE.BoxGeometry(
        1.55,
        1.55,
        0.08
    ),
    wireBlue
);

dataFrame.position.z = -0.08;

dataGroup.add(dataFrame);


// =====================================================
// 8. DATA → MODEL BEAMS
// =====================================================

const dataStreamParticles = [];

for (let i = 0; i < 14; i++) {

    const particle = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.035,
            12,
            12
        ),
        cyan
    );

    particle.position.set(
        -1.2,
        (Math.random() - 0.5) * 1.5,
        0
    );

    particle.userData = {
        speed: 0.012 + Math.random() * 0.01,
        offset: Math.random()
    };

    world.add(particle);

    dataStreamParticles.push(particle);
}


// =====================================================
// 9. CENTRAL AI MODEL
// =====================================================

const modelGroup = new THREE.Group();

world.add(modelGroup);


// Outer processor

const processor = new THREE.Mesh(
    new THREE.IcosahedronGeometry(
        0.75,
        1
    ),
    wireBlue
);

modelGroup.add(processor);


// Inner processor

const innerProcessor = new THREE.Mesh(
    new THREE.IcosahedronGeometry(
        0.38,
        1
    ),
    new THREE.MeshBasicMaterial({
        color: 0x4dc4ff,
        transparent: true,
        opacity: 0.75,
        wireframe: true
    })
);

modelGroup.add(innerProcessor);


// Central AI light

const aiCore = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.14,
        24,
        24
    ),
    white
);

modelGroup.add(aiCore);


// Processor rings

const modelRings = [];

for (let i = 0; i < 3; i++) {

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
            0.85 + i * 0.15,
            0.012,
            10,
            80
        ),
        new THREE.MeshBasicMaterial({
            color: 0x4bbcff,
            transparent: true,
            opacity: 0.3
        })
    );

    ring.rotation.x =
        i * 0.7;

    ring.rotation.y =
        i * 0.5;

    modelGroup.add(ring);

    modelRings.push(ring);
}


// =====================================================
// 10. MODEL → PREDICTION STREAM
// =====================================================

const predictionParticles = [];

for (let i = 0; i < 14; i++) {

    const particle = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.035,
            12,
            12
        ),
        cyan
    );

    particle.position.set(
        1.2,
        (Math.random() - 0.5) * 1.5,
        0
    );

    particle.userData = {
        speed: 0.012 + Math.random() * 0.01,
        offset: Math.random()
    };

    world.add(particle);

    predictionParticles.push(particle);
}


// =====================================================
// 11. PREDICTION RESULT
// =====================================================

const predictionGroup = new THREE.Group();

predictionGroup.position.set(
    2.3,
    0,
    0
);

world.add(predictionGroup);


// Result ring

const resultRing = new THREE.Mesh(
    new THREE.TorusGeometry(
        0.6,
        0.025,
        12,
        80
    ),
    cyan
);

predictionGroup.add(resultRing);


// Result core

const resultCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(
        0.28,
        1
    ),
    new THREE.MeshBasicMaterial({
        color: 0x8de5ff,
        wireframe: true
    })
);

predictionGroup.add(resultCore);


// Result pulse

const resultPulse = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.12,
        16,
        16
    ),
    white
);

predictionGroup.add(resultPulse);


// =====================================================
// 12. PREDICTION BARS
// =====================================================

const predictionBars = [];

for (let i = 0; i < 5; i++) {

    const height =
        0.15 +
        Math.random() * 0.4;

    const bar = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.07,
            height,
            0.07
        ),
        blue
    );

    bar.position.set(
        0.85 + i * 0.12,
        -0.85,
        0
    );

    bar.userData = {
        baseHeight: height,
        phase: Math.random() * Math.PI * 2
    };

    world.add(bar);

    predictionBars.push(bar);
}


// =====================================================
// 13. FLOATING AI SYMBOLS
// =====================================================

const floatingObjects = [];

for (let i = 0; i < 8; i++) {

    const object = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.12,
            0.12,
            0.12
        ),
        wireBlue
    );

    object.position.set(
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 2
    );

    object.userData = {
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.5
    };

    world.add(object);

    floatingObjects.push(object);
}


// =====================================================
// 14. BACKGROUND PARTICLES
// =====================================================

const particleGeometry =
    new THREE.BufferGeometry();

const particlePositions = [];

for (let i = 0; i < 350; i++) {

    particlePositions.push(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
    );
}

particleGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        particlePositions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x3a9fff,
        size: 0.018,
        transparent: true,
        opacity: 0.45
    });

const backgroundParticles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(backgroundParticles);


// =====================================================
// 15. MOUSE INTERACTION
// =====================================================

let mouseX = 0;
let mouseY = 0;

container.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            container.getBoundingClientRect();

        mouseX =
            ((event.clientX - rect.left)
            / rect.width) - 0.5;

        mouseY =
            ((event.clientY - rect.top)
            / rect.height) - 0.5;
    }
);


// =====================================================
// 16. ANIMATION
// =====================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(animate);

    const time =
        clock.getElapsedTime();


    // ------------------------------------------
    // DATA BLOCKS
    // ------------------------------------------

    dataBlocks.forEach(
        (block, index) => {

            block.rotation.x += 0.004;
            block.rotation.y += 0.005;

            block.position.z =
                Math.sin(
                    time * 1.5 +
                    block.userData.phase
                ) * 0.08;
        }
    );


    // ------------------------------------------
    // DATA STREAM
    // ------------------------------------------

    dataStreamParticles.forEach(
        (particle, index) => {

            particle.position.x +=
                particle.userData.speed;

            particle.position.y =
                Math.sin(
                    time * 2 +
                    particle.userData.offset
                ) * 0.5;

            if (
                particle.position.x > 1.0
            ) {

                particle.position.x =
                    -1.2;

            }
        }
    );


    // ------------------------------------------
    // AI MODEL
    // ------------------------------------------

    processor.rotation.x += 0.002;
    processor.rotation.y += 0.004;

    innerProcessor.rotation.x -= 0.003;
    innerProcessor.rotation.y -= 0.005;


    modelRings[0].rotation.z += 0.002;
    modelRings[1].rotation.x -= 0.002;
    modelRings[2].rotation.y += 0.003;


    const aiPulse =
        1 +
        Math.sin(time * 3) * 0.08;

    aiCore.scale.set(
        aiPulse,
        aiPulse,
        aiPulse
    );


    // ------------------------------------------
    // MODEL → PREDICTION
    // ------------------------------------------

    predictionParticles.forEach(
        (particle) => {

            particle.position.x +=
                particle.userData.speed;

            particle.position.y =
                Math.sin(
                    time * 2 +
                    particle.userData.offset
                ) * 0.5;

            if (
                particle.position.x > 2.3
            ) {

                particle.position.x =
                    1.2;

            }
        }
    );


    // ------------------------------------------
    // PREDICTION
    // ------------------------------------------

    resultRing.rotation.z +=
        0.004;

    resultCore.rotation.x +=
        0.003;

    resultCore.rotation.y +=
        0.004;


    const resultScale =
        1 +
        Math.sin(time * 2.5) * 0.12;

    resultPulse.scale.set(
        resultScale,
        resultScale,
        resultScale
    );


    // ------------------------------------------
    // GRAPH
    // ------------------------------------------

    predictionBars.forEach(
        (bar) => {

            const height =
                bar.userData.baseHeight +
                Math.sin(
                    time * 2 +
                    bar.userData.phase
                ) * 0.06;

            bar.scale.y =
                height /
                bar.userData.baseHeight;
        }
    );


    // ------------------------------------------
    // FLOATING OBJECTS
    // ------------------------------------------

    floatingObjects.forEach(
        (object, index) => {

            object.rotation.x +=
                0.003;

            object.rotation.y +=
                0.004;

            object.position.y +=
                Math.sin(
                    time *
                    object.userData.speed +
                    object.userData.phase
                ) * 0.0015;
        }
    );


    // ------------------------------------------
    // BACKGROUND
    // ------------------------------------------

    backgroundParticles.rotation.y +=
        0.00025;


    // ------------------------------------------
    // MOUSE PARALLAX
    // ------------------------------------------

    const targetX =
        -mouseY * 0.18;

    const targetY =
        mouseX * 0.28;

    world.rotation.x +=
        (targetX - world.rotation.x)
        * 0.025;

    world.rotation.y +=
        (targetY - world.rotation.y)
        * 0.025;


    // ------------------------------------------
    // FLOAT
    // ------------------------------------------

    world.position.y =
        Math.sin(time * 0.6) * 0.05;


    // ------------------------------------------
    // RENDER
    // ------------------------------------------

    renderer.render(
        scene,
        camera
    );
}

animate();


// =====================================================
// 17. RESPONSIVE
// =====================================================

window.addEventListener(
    "resize",
    () => {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );
    }
);