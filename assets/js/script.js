// ========================================
// Smooth Scroll Navigation
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});


// ========================================
// Navigation Toggle (Mobile)
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navigation')) {
        navLinks.classList.remove('active');
    }
});


// ========================================
// Sticky Navigation on Scroll
// ========================================

const navigation = document.querySelector('.navigation');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
});


// ========================================
// Interactive Location Filters
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const locationCards = document.querySelectorAll('.location-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter cards with animation
        locationCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});


// ========================================
// Animated Statistics Counter
// ========================================

const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateStats = () => {
    const statsSection = document.querySelector('.stats-container');
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !hasAnimated) {
        hasAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);


// ========================================
// Back to Top Button
// ========================================

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ========================================
// Intersection Observer for Fade-in Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe section titles and cards
document.querySelectorAll('.section-title, .location-card, .rule-card, .room-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


// ========================================
// Room Card Details (Future Enhancement)
// ========================================

const viewDetailsButtons = document.querySelectorAll('.view-details');

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const roomCard = button.closest('.room-card');
        const roomName = roomCard.querySelector('.room-name').textContent;

        // Here you can add modal or expand functionality
        console.log(`Viewing details for: ${roomName}`);
        alert(`Details for ${roomName} - This can be expanded with a modal window`);
    });
});


// ========================================
// Parallax Effect for Hero Section
// ========================================

const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


// ========================================
// Sort Location Cards by Distance
// ========================================

const sortByDistance = () => {
    const grid = document.querySelector('.location-grid');
    const cards = Array.from(locationCards);

    cards.sort((a, b) => {
        const distA = parseInt(a.getAttribute('data-distance'));
        const distB = parseInt(b.getAttribute('data-distance'));
        return distA - distB;
    });

    cards.forEach(card => grid.appendChild(card));
};

// Auto-sort on load
window.addEventListener('load', sortByDistance);


// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});