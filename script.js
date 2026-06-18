// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('active');
  navMobile.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMobile.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-triggered reveal
const revealEls = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Placeholder link guard — alerts instead of dead-linking until real URLs are added
document.querySelectorAll('[data-placeholder]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const type = el.getAttribute('data-placeholder');
    console.info(`Add your real ${type} URL in index.html to activate this link.`);
  });
});

// Contact form — client-side validation + status message.
// NOTE: this does not send email yet. Connect to a form backend
// (e.g. Formspree, Getform) by setting the form's action/fetch endpoint.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.style.color = '#F2B84B';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.style.color = '#F2B84B';
      return;
    }

    // No backend connected yet — this is where a fetch() to your
    // form provider's endpoint would go. For now, confirm locally.
    formStatus.textContent = 'Form validated. Connect a backend (e.g. Formspree) to actually deliver this message.';
    formStatus.style.color = '#2DD4BF';
    contactForm.reset();
  });
}
