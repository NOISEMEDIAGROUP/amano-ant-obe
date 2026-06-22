/* ============================================
   AMANO Group - Website Mockup Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation: transparent to solid on scroll ---
  const nav = document.getElementById('mainNav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--solid');
      } else {
        nav.classList.remove('nav--solid');
        nav.classList.add('nav--transparent');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Booking Modal ---
  const modal = document.getElementById('bookingModal');
  const backdrop = document.getElementById('bookingBackdrop');
  const closeBtn = document.getElementById('closeBooking');

  const openModal = () => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Bind all booking buttons
  document.querySelectorAll('[id^="openBooking"]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Also bind any .btn-book elements
  document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --- Set default dates on booking form ---
  const checkInInput = document.getElementById('bookingCheckIn');
  const checkOutInput = document.getElementById('bookingCheckOut');
  if (checkInInput && checkOutInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3);

    checkInInput.value = tomorrow.toISOString().split('T')[0];
    checkOutInput.value = dayAfter.toISOString().split('T')[0];
  }

  // --- Language Toggle ---
  document.querySelectorAll('.nav__lang').forEach(lang => {
    lang.addEventListener('click', () => {
      document.querySelectorAll('.nav__lang').forEach(l => l.classList.remove('nav__lang--active'));
      lang.classList.add('nav__lang--active');
    });
  });

  // --- City Nav Tabs (homepage properties section) ---
  document.querySelectorAll('.city-nav__item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.city-nav__item').forEach(t => t.classList.remove('city-nav__item--active'));
      tab.classList.add('city-nav__item--active');
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      if (isOpen) {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'fixed';
        navLinks.style.top = 'var(--nav-height)';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.bottom = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.alignItems = 'center';
        navLinks.style.justifyContent = 'center';
        navLinks.style.gap = '2rem';
        navLinks.style.background = 'rgba(12, 12, 12, 0.97)';
        navLinks.style.zIndex = '999';
      }
    });
  }

});
