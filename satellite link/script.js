document.addEventListener('DOMContentLoaded', () => {

    const pageContent = document.getElementById('page-content');
    const navLinks = document.querySelectorAll('.main-nav a.internal-link');
    const body = document.body;

    // --- Intersection Observer for Scroll Animations ---
    const initScrollAnimations = () => {
        // Ensure pageContent exists before querying inside it
        if (!pageContent) {
            console.error("Element with ID 'page-content' not found. Animations disabled.");
            return;
        }
        const animatedElements = pageContent.querySelectorAll('.animate-on-scroll');

        if (animatedElements.length === 0) {
             // console.log("No elements found with '.animate-on-scroll' class."); // Optional log
             return; // No elements to observe
        }

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add a slight delay using style for potentially smoother staggering
                    const delay = entry.target.style.animationDelay || '0s'; // Get existing delay or default to 0
                     // You can also calculate stagger here if needed: const index = Array.from(animatedElements).indexOf(entry.target); delay = `${index * 100}ms`;

                    // Apply visibility class after a tiny timeout to allow delay application
                    // setTimeout(() => {
                         entry.target.classList.add('is-visible');
                    // }, parseFloat(delay) * 1000); // Convert delay string (e.g., '0.2s') to ms

                    observerInstance.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
        // console.log(`Observer initiated for ${animatedElements.length} elements.`); // Optional log
    };

    // --- Update Active Navigation Link ---
    const updateActiveNav = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Get current file name

        navLinks.forEach(link => {
             if (!link.getAttribute('href')) return; // Skip if link has no href

            const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // --- Page Transition Logic ---
    const handlePageTransition = (event) => {
         // Check if the clicked element is actually an anchor tag
         if (!event.target.closest('a.internal-link')) {
             return;
         }

        const link = event.target.closest('a.internal-link');
        const targetUrl = link.href;

        // Prevent transition if it's not a valid URL or same page
        if (!targetUrl || targetUrl === window.location.href) {
            return;
        }

        // Only prevent default for actual navigation clicks
        event.preventDefault();

        body.classList.add('is-transitioning');

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 400); // Match --transition-speed in CSS (0.4s)
    };

    // --- Initialization ---

    // Add click listener more safely to the nav container or body
     const mainNav = document.querySelector('.main-nav');
     if (mainNav) {
         mainNav.addEventListener('click', handlePageTransition);
     } else {
         // Fallback or alternative if nav structure changes
         body.addEventListener('click', (event) => {
             if (event.target.matches('.main-nav a.internal-link')) {
                 handlePageTransition(event);
             }
         });
     }


    // Initial setup on page load
    updateActiveNav();
    initScrollAnimations();

    // Ensure the transition class is removed reliably after navigation
     window.addEventListener('pageshow', function(event) {
         // The pageshow event fires after navigation, including back/forward
         // Use persisted property to check if page is from back/forward cache
         if (!event.persisted) { // If it's a fresh load, remove class
             body.classList.remove('is-transitioning');
         } else { // If from cache, ensure it's removed slightly later
             setTimeout(() => { body.classList.remove('is-transitioning'); }, 10);
         }
     });

    // Initial removal in case it was stuck from a previous load
     setTimeout(() => {
         body.classList.remove('is-transitioning');
     }, 10);


    console.log("Quantum site JS initialized successfully.");

}); // End DOMContentLoaded