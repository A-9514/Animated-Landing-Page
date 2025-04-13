document.addEventListener('DOMContentLoaded', function() {

    // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Existing Particles.js Configuration ---
    particlesJS("particles-js", {
        // ... (keep your existing particles.js config object here) ...
         "particles": { /* Example */ "number": {"value": 80}, "color": {"value": "#ffffff"}, "shape": {"type": "circle"}, "opacity": {"value": 0.5,"random": true}, "size": {"value": 3,"random": true}, "line_linked": {"enable": true,"distance": 150,"color": "#ffffff","opacity": 0.4,"width": 1}, "move": {"enable": true,"speed": 4,"direction": "none","random": true,"straight": false,"out_mode": "out","bounce": false}}, "interactivity": {"detect_on": "canvas","events": {"onhover": {"enable": true,"mode": "repulse"},"onclick": {"enable": true,"mode": "push"},"resize": true},"modes": {"repulse": {"distance": 100,"duration": 0.4},"push": {"particles_nb": 4}}}, "retina_detect": true
    });
    console.log("Particles initialized.");


    // === START: MODAL CONTROL JAVASCRIPT ===
    const exploreBtn = document.getElementById('explore-features-btn');
    const modalOverlay = document.getElementById('explore-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');

    // Function to open the modal
    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('visible');
        }
    }

    // Function to close the modal
    function closeModal() {
         if (modalOverlay) {
            modalOverlay.classList.remove('visible');
        }
    }

    // Event listener for the main explore button
    if (exploreBtn) {
        exploreBtn.addEventListener('click', openModal);
    } else {
        console.error("Explore features button not found!");
    }

    // Event listener for the close button inside the modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Event listener to close modal if clicking on the overlay background
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            // Check if the click was directly on the overlay, not the content inside
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
    // === END: MODAL CONTROL JAVASCRIPT ===


    // Optional: Add a small console log to confirm script ran
    console.log("Landing page script initialized.");

}); // End DOMContentLoaded

    // particles.js configuration
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80, // Number of particles
                "density": {
                    "enable": true,
                    "value_area": 800 // Area where particles will be distributed
                }
            },
            "color": {
                "value": "#ffffff" // Particle color
            },
            "shape": {
                "type": "circle", // Shape type (circle, edge, triangle, polygon, star, image)
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5, // Base opacity
                "random": true, // Make opacity random
                "anim": {
                    "enable": true, // Enable opacity animation
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3, // Base size
                "random": true, // Make size random
                "anim": {
                    "enable": false, // Size animation disabled for cleaner look
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true, // Draw lines between particles
                "distance": 150, // Max distance for lines
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true, // Enable particle movement
                "speed": 4, // Movement speed
                "direction": "none", // Movement direction (none, top, top-right, right, bottom-right, bottom, bottom-left, left, top-left)
                "random": true, // Random movement direction
                "straight": false, // Particles move straight or curve
                "out_mode": "out", // What happens when particles reach the edge (out, bounce)
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas", // Where interactivity is detected (canvas, window)
            "events": {
                "onhover": {
                    "enable": true, // Enable hover interaction
                    "mode": "repulse" // Interaction mode on hover (grab, bubble, repulse)
                },
                "onclick": {
                    "enable": true, // Enable click interaction
                    "mode": "push" // Interaction mode on click (push, remove, bubble, repulse)
                },
                "resize": true // Update canvas on window resize
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100, // Distance particles are pushed away
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4 // Number of particles added on click
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true // Adjusts for high-density displays
    });

    // Optional: Add a small console log to confirm script ran
    console.log("Landing page animations initialized.");

});

const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

animatedElements.forEach(el => {
    observer.observe(el);
});


