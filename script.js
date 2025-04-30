document.addEventListener("DOMContentLoaded", function() {

    // --- Typed.js Initialization ---
    const typed = new Typed('.typed-text', {
        strings: ["Data Enthusiast", "Data Analyst", "IT Professional", "Problem Solver"], // Add your roles
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
        backDelay: 1500,
    });


    // --- Sticky Navbar & Active Link Highlighting ---
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]'); // Select sections with IDs

    const handleScroll = () => {
        // Sticky Navbar Background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Activate link slightly before reaching the top of the section
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                 currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
         // Ensure 'Home' is active when at the very top
        if (window.pageYOffset < window.innerHeight / 2) {
             navLinks.forEach(link => link.classList.remove('active'));
             document.querySelector('.nav-link[href="#home"]').classList.add('active');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Scroll Fade-In Animations ---
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Only animate once
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% visible

    // Observe all sections (or elements with a specific class)
    document.querySelectorAll('.section').forEach(section => {
        scrollObserver.observe(section);
    });

     // --- Smooth Scrolling for Nav Links --- (Basic implementation)
     navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Check if it's an internal link
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault(); // Prevent default anchor jump
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate position considering the fixed header height
                    const headerOffset = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

});