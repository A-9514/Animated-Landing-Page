document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animation for Feature Cards ---
    const featureCards = document.querySelectorAll('.animate-on-scroll');

    if (featureCards.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay based on the card's order
                    // entry.target.style.transitionDelay = `${index * 100}ms`; // Alternative: use CSS transition delay
                    entry.target.style.animationDelay = `${index * 100}ms`; // Use animation delay

                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the card is visible
        });

        featureCards.forEach(card => {
            observer.observe(card);
        });
    }

    console.log("Features page animations initialized.");

    // --- Add any other JS specific to the features page here ---
    document.addEventListener('DOMContentLoaded', () => {

        // === ADD: Particles.js Initialization for Starfield ===
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 250, // More particles for stars
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff" // White stars
                },
                "shape": {
                    "type": "circle", // Simple circle shape
                },
                "opacity": {
                    "value": 0.8, // Base opacity
                    "random": true, // Random opacity for twinkling
                    "anim": {
                        "enable": true, // Enable opacity animation (twinkling)
                        "speed": 0.5,   // Slow twinkle speed
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 1.5, // Small stars
                    "random": true,
                    "anim": {
                        "enable": false, // No size animation
                    }
                },
                "line_linked": {
                    "enable": false // Disable lines between stars
                },
                "move": {
                    "enable": true,
                    "speed": 0.3, // Very slow movement
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false // Disable hover effect
                    },
                    "onclick": {
                        "enable": false // Disable click effect
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
        console.log("Features page particles initialized.");
        // === END: Particles.js Initialization ===
    
    
        // --- Keep Existing Scroll Animation for Feature Cards ---
        const animatedElements = document.querySelectorAll('.animate-on-scroll'); // Target new OR old cards
    
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach((entry, index) => { // Changed projectCards to animatedElements
                    if (entry.isIntersecting) {
                        // Apply delay based on inline style if present, otherwise use index
                        let delay = entry.target.style.animationDelay;
                        if (!delay) {
                            entry.target.style.animationDelay = `${index * 100}ms`;
                        }
    
                        entry.target.classList.add('is-visible');
                        observerInstance.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
    
            animatedElements.forEach(el => { // Changed card to el
                observer.observe(el);
            });
            console.log(`Observing ${animatedElements.length} elements for scroll animation.`);
        } else {
            console.log("No elements found for scroll animation.");
        }
        // --- END Existing Scroll Animation ---
    
        console.log("Features page script initialized.");
    
    }); // End DOMContentLoaded

    
    document.addEventListener('DOMContentLoaded', () => {

        // === Particles.js Initialization for Starfield ===
        particlesJS("particles-js", {
            "particles": {
                "number": { /* Keep as before */ "value": 250, "density": { "enable": true, "value_area": 800 } },
                "color": { /* Keep as before */ "value": "#ffffff" },
                "shape": { /* Keep as before */ "type": "circle" },
                "opacity": { /* Keep existing twinkle config */
                    "value": 0.8,
                    "random": true,
                    "anim": { "enable": true, "speed": 0.6, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 1.5, // Base size
                    "random": true,
                    // === ENABLE SIZE ANIMATION ===
                    "anim": {
                        "enable": true,     // <-- Set to true
                        "speed": 3,         // <-- Adjust speed of pulsing (lower is slower)
                        "size_min": 0.6,    // <-- Minimum size during pulse
                        "sync": false       // <-- Make stars pulse independently
                    }
                    // === END SIZE ANIMATION CHANGES ===
                },
                "line_linked": { /* Keep as before */ "enable": false },
                "move": { /* Keep existing slow movement */
                    "enable": true, "speed": 0.3, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false }
                }
            },
            "interactivity": { /* Keep as before */
                "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
            },
            "retina_detect": true
        });
        console.log("Features page particles initialized with size animation.");
        // === END: Particles.js Initialization ===
    
    
        // --- Keep Existing Scroll Animation for Feature Cards ---
        // ... (Your existing Intersection Observer code remains here) ...
        // --- END Existing Scroll Animation ---
    
        console.log("Features page script initialized.");
    
    }); // End DOMContentLoaded
});

// --- Scroll Animation Logic ---
document.addEventListener('DOMContentLoaded', () => {

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is now visible
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible
                // observer.unobserve(entry.target);
            }
             else {
                // Optional: If you want the animation to reverse when scrolling back up
                 // entry.target.classList.remove('is-visible');
             }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each target element
    revealElements.forEach(el => {
        intersectionObserver.observe(el);
    });

}); // End DOMContentLoaded wrapper if using it