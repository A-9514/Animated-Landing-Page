// Ensure Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('THREE.js not loaded!');
}

// === THREE.js Setup ===
const scene = new THREE.Scene();
const container = document.getElementById('canvas-background-container');
if (!container) {
    console.error('Canvas container not found!');
}

// Camera
const camera = new THREE.PerspectiveCamera(
    60, // Field of View - slightly less wide for background
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near plane
    1000 // Far plane
);
camera.position.z = 1; // Start very close, looking 'through' the stars

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true // Keep alpha for potential future layering effects
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0); // Transparent background for the canvas itself
container.appendChild(renderer.domElement);

// === Starfield ===
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000; // Adjust count for density
const positions = new Float32Array(starCount * 3); // x, y, z

const starColors = [];
const color = new THREE.Color();

for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;

    // Position stars in a sphere around the camera's view frustum
    // Use a slightly non-uniform distribution to feel more natural
    const radius = Math.random() * 300 + 5; // Distance range
    const theta = Math.random() * Math.PI * 2; // Angle around Z axis
    const phi = Math.acos((Math.random() * 2) - 1); // Angle from Y axis (sphere)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi) - 200; // Push stars further back initially

    // Add subtle color variations
    const randomColor = Math.random();
    if (randomColor < 0.1) { // Mostly white
         color.setHSL(Math.random() * 0.1 + 0.55, 0.8, 0.8); // Cool blues/cyans
    } else if (randomColor < 0.15) {
         color.setHSL(Math.random() * 0.1 + 0.0, 0.8, 0.8); // Warm yellows/oranges
    }
     else {
        color.setRGB(1, 1, 1); // White
    }
    starColors.push(color.r, color.g, color.b);
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(starColors), 3)); // Add color attribute

const starMaterial = new THREE.PointsMaterial({
    size: 1.0, // Adjust size
    sizeAttenuation: true,
    depthWrite: false, // Helps with transparency issues
    blending: THREE.AdditiveBlending, // Glow effect
    vertexColors: true, // Use the colors defined in the geometry
    transparent: true,
    opacity: 0.85 // Slight transparency
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// === Animation ===
const clock = new THREE.Clock();
let mouse = new THREE.Vector2();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Subtle rotation
    stars.rotation.y = elapsedTime * 0.01;
    stars.rotation.x = elapsedTime * 0.005;

     // Subtle parallax effect based on mouse position (optional)
    camera.position.x += ( (mouse.x * 0.5) - camera.position.x) * 0.02; // Adjust multiplier for sensitivity
    camera.position.y += ( (-mouse.y * 0.5) - camera.position.y) * 0.02;
    camera.lookAt(scene.position); // Keep camera looking forward


    renderer.render(scene, camera);
}

// === Handle Window Resize ===
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener('resize', onWindowResize);


// === Handle Mouse Movement (for parallax) ===
function onMouseMove(event) {
    // Normalize mouse coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove);


// === Start Animation ===
animate();

// In background_script.js

// === Camera (Set initial position far away) ===
const camera = new THREE.PerspectiveCamera(/* ... your params ... */);
camera.position.set(0, 5, 50); // START POSITION: Centered, slightly elevated, far back
camera.lookAt(scene.position); // Look at the center initially

// ... (rest of your setup: renderer, stars, objects, fog etc.) ...
// === Fog (Add this after creating the scene) ===
const fogColor = 0x000015; // Dark blue/black fog
const fogDensity = 0.03; // Adjust density for desired effect
scene.fog = new THREE.FogExp2(fogColor, fogDensity);
// Also set the renderer clear color to match the fog near the camera
renderer.setClearColor(fogColor); // Match fog color

// === Animation Loop (Keep your existing loop for object/star rotation) ===
const Clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // --- Existing animations ---
    stars.rotation.y = elapsedTime * 0.01;
    // ... rotate quantumObject, cosmicObject etc. if they exist ...

    // --- IMPORTANT: Render ---
    // If using EffectComposer, call composer.render()
    // Otherwise, call renderer.render()
    renderer.render(scene, camera);
}

// === NEW: GSAP Cinematic Intro Timeline ===
function startCinematicIntro() {
    // Ensure GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP not loaded!");
        return;
    }

    // Make sure overlay content is hidden initially (optional, better UX)
    const overlayContent = document.querySelector('.overlay-content') || document.querySelector('.your-main-content-area'); // Adjust selector
    if(overlayContent) gsap.set(overlayContent, { opacity: 0 });


    const tl = gsap.timeline({
        defaults: { duration: 3, ease: "power2.inOut" }, // Default settings for tweens in this timeline
        onComplete: () => {
             // Optional: Fade in overlay content after camera arrives
             if(overlayContent) gsap.to(overlayContent, { duration: 1.5, opacity: 1, ease: "power1.in" });
             console.log("Camera intro finished.");
             // Optional: Enable OrbitControls here if you use them, disable them during animation
             // if(controls) controls.enabled = true;
        }
    });

    // --- Define the Camera Path ---
    // Example Path: Fly in, slightly arc up, then settle
    tl.to(camera.position, {
        x: 0,
        y: 2,  // Move slightly lower than start
        z: 15, // Move much closer
        duration: 4 // Longer duration for the main approach
    }, 0); // Start at time 0

    // Simultaneously adjust where the camera is looking (optional, subtle effect)
    // tl.to(camera.rotation, {
    //     x: -Math.PI / 16, // Slight downward tilt
    // }, 0.5); // Start slightly after movement begins

    // Add another step: A smaller adjustment to the final position
    tl.to(camera.position, {
        x: 0,
        y: 1, // Settle slightly lower
        z: 7,  // Final close position
        duration: 2.5,
        ease: "power1.out"
    }, ">-1"); // Start 1 second before the previous tween ends (overlap)


    // Optional: Enable OrbitControls AFTER animation finishes (add controls setup if needed)
    // if (typeof THREE.OrbitControls !== 'undefined') {
    //     const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //     controls.enableDamping = true;
    //     controls.dampingFactor = 0.05;
    //     controls.enabled = false; // IMPORTANT: Disable during animation
    // } else { console.warn("OrbitControls not loaded."); }
}


// === Start Everything ===
animate(); // Start the regular animation loop

// Wait for the page elements (especially the canvas) to be ready, then start intro
window.addEventListener('load', () => {
     startCinematicIntro();
});

// === Don't forget your Resize Listener ===
// function onWindowResize() { ... }
// window.addEventListener('resize', onWindowResize);