
// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
});

// ── Scroll behaviors ──
const header = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
    scrollTop.classList.toggle('visible', window.scrollY > 400);

    // Active nav
    document.querySelectorAll('section[id], div[id]').forEach(sec => {
        const top = sec.offsetTop - 100;
        const bottom = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
            document.querySelectorAll('nav a').forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === '#' + sec.id) a.classList.add('active');
            });
        }
    });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        // close mobile nav
        document.getElementById('mobileNav').classList.remove('open');
        document.getElementById('overlay').classList.remove('open');
    });
});

// ── Mobile nav ──
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.add('open');
    document.getElementById('overlay').classList.add('open');
});
['closeBtn', 'overlay'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        document.getElementById('mobileNav').classList.remove('open');
        document.getElementById('overlay').classList.remove('open');
    });
});

// ── Project filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            card.classList.remove('visible');
            setTimeout(() => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.add('visible');
                }
            }, 50);
        });
    });
});

// ── Reveal on scroll ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in-view'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── Swiper ──
new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
        680: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});
