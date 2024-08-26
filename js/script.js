document.addEventListener('DOMContentLoaded', function() {
    const bar = document.querySelector('.bar');
    const right = document.querySelector('header');
    
    console.log(right, bar);
    

    bar.addEventListener('click', function() {
        // If the navigation is collapsed
        if (!right.classList.contains('expanded')) {
            right.style.height = right.scrollHeight + 'px'; // Set height to the scrollHeight
            right.classList.add('expanded');
        } else {
            right.style.height = '5.5rem'; // Collapse 
            right.classList.remove('expanded');
        }
    });

    // Reset height to auto after transition to allow further content to be added
    right.addEventListener('transitionend', function() {
        if (right.classList.contains('expanded')) {
            right.style.height = 'auto';
        }
    });

    window.addEventListener("scroll", ()=>{
        if (right.classList.contains('expanded')) {
            right.style.height = '5.5rem'; // Collapse 
            right.classList.remove('expanded');
        }
    })
});


document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('header');
    const hero = document.getElementById('home');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // If the hero section is not visible, make the nav sticky
                nav.classList.add('sticky');
            } else {
                // If the hero section is visible, remove the sticky class
                nav.classList.remove('sticky');
            }
        });
    }, { threshold: 0 }); // Callback triggered when 0% of the hero section is visible

    // Observe the hero section
    observer.observe(hero);
});



document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('header');
    const hero = document.getElementById('home');
    let lastScrollY = window.scrollY;
    let passedHero = false;

    // Intersection Observer to detect when we pass the hero section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            passedHero = !entry.isIntersecting;
            if (!passedHero) {
                nav.classList.remove('visible');
            }
        });
    }, { threshold: 0 });

    // Observe the hero section
    observer.observe(hero);

    // Scroll event to detect scroll direction and show/hide nav
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (passedHero) {
            if (currentScrollY < lastScrollY) {
                // Scrolling up, show the nav
                nav.classList.add('visible');
            } else {
                // Scrolling down, hide the nav
                nav.classList.remove('visible');
            }
        }

        lastScrollY = currentScrollY;
    });
});
