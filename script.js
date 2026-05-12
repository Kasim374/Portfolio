/* ============================================================
   SCRIPT.JS — Fresher Data Analyst Portfolio
   Features:
   - Smooth scrolling & navbar scroll detection
   - Hamburger menu toggle
   - Scroll reveal animations (IntersectionObserver)
   - Skill bar animations
   - Contact form handling
   - Active link highlighting
   - Page load animations
   ============================================================ */

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

/* ==================== NAVBAR FUNCTIONALITY ==================== */

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLink = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLink.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Update active nav link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLink.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==================== SMOOTH SCROLL ANIMATIONS ==================== */

// Intersection Observer for scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in-on-scroll elements
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
  revealObserver.observe(element);
});

/* ==================== SKILL BARS ANIMATION ==================== */

let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      animateSkillBars();
      skillsAnimated = true;
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

function animateSkillBars() {
  const skillProgresses = document.querySelectorAll('.skill-progress');
  const skillPercentages = document.querySelectorAll('.skill-percentage');

  skillProgresses.forEach((progress, index) => {
    setTimeout(() => {
      const targetValue = progress.getAttribute('data-target');
      progress.style.width = targetValue + '%';
    }, index * 100);
  });

  // Animate percentage counter
  skillPercentages.forEach((percentage, index) => {
    const targetValue = parseInt(percentage.getAttribute('data-value'));
    let currentValue = 0;

    const counter = setInterval(() => {
      currentValue += Math.ceil(targetValue / 30);
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(counter);
      }
      percentage.textContent = currentValue + '%';
    }, 30);
  });
}

/* ==================== CONTACT FORM HANDLING ==================== */

const contactForm = document.getElementById('contactForm');

function handleFormSubmit(event) {
  event.preventDefault();

  const formStatus = document.getElementById('formStatus');
  const formData = new FormData(contactForm);

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate form submission (in real scenario, send to server or use FormSubmit/Formspree)
  setTimeout(() => {
    // Success message
    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
    formStatus.classList.add('success');

    // Reset form
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Clear message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.classList.remove('success');
    }, 5000);
  }, 1500);

  // For real form submission, you can use:
  // 1. FormSubmit (https://formsubmit.co)
  // 2. Formspree (https://formspree.io)
  // 3. Netlify Forms
  // 4. Your own backend API

  /* Example with FormSubmit:
  const form = event.target;
  fetch("https://formsubmit.co/your.email@example.com", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      formStatus.textContent = '✓ Message sent successfully!';
      formStatus.classList.add('success');
      form.reset();
    }
  })
  .catch(error => {
    formStatus.textContent = '✗ Error sending message. Please try again.';
    formStatus.classList.add('error');
  })
  .finally(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
  */
}

/* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const navHeight = navbar.clientHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ==================== INITIAL PAGE LOAD ANIMATIONS ==================== */

// Fade in hero section on load
window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero-text');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroText) {
    heroText.style.animation = 'fadeInUp 0.8s ease-out 0.1s forwards';
  }
  if (heroVisual) {
    heroVisual.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
  }
});

/* ==================== SCROLL PERFORMANCE OPTIMIZATION ==================== */

// Throttle scroll events for better performance
let ticking = false;

function update() {
  // Update active nav link
  updateActiveNavLink();
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(update);
    ticking = true;
  }
}, { passive: true });

/* ==================== UTILITY: DETECT REDUCED MOTION ==================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}

/* ==================== CONSOLE GREETING ==================== */

console.log('%c🚀 Welcome to the Portfolio!', 'font-size: 20px; font-weight: bold; color: #0891b2;');
console.log('%cMade with ❤️ and Data Analytics', 'font-size: 14px; color: #0891b2;');
