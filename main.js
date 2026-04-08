// Smooth Scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();

// Header Scroll Effect
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Video Hover Playback
const initVideoHover = () => {
    const igItems = document.querySelectorAll('.ig-item');
    igItems.forEach(item => {
        const video = item.querySelector('video');
        if (!video) return;

        item.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log("Auto-play prevented"));
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
};

initVideoHover();

// Metric Bar Animation
const animateMetricBars = () => {
    const bars = document.querySelectorAll('.metric-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
};

animateMetricBars();

// Counter Animation (Existing)
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    const speed = 200;

    const startCounter = (el) => {
        const target = +el.getAttribute('data-count');
        const count = +el.innerText;
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounter(el), 1);
        } else {
            el.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

animateCounters();

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
