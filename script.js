document.addEventListener('DOMContentLoaded', () => {
  const navbars = document.querySelectorAll('.navbar');
  const serviceSections = document.querySelectorAll('.content > div[id]');
  const sidebarLinks = document.querySelectorAll('.services-navbar .nav-items a');
  const serviceHeadingLink = document.querySelector('.services-navbar h2 a');

  function updateNavbarState() {
    const scrolled = window.scrollY > 12;
    navbars.forEach((navbar) => {
      navbar.classList.toggle('is-scrolled', scrolled);
    });
  }

  function showSection(id) {
    serviceSections.forEach(section => {
      section.style.display = section.id === id ? '' : 'none';
    });
  }

  function setActiveLink(id) {
    sidebarLinks.forEach(link => {
      const target = link.getAttribute('href').slice(1);
      link.classList.toggle('active', target === id);
    });
  }

  if (serviceHeadingLink) {
    serviceHeadingLink.addEventListener('click', event => {
      event.preventDefault();
      showSection('service-home');
      setActiveLink(null);
    });
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = link.getAttribute('href').slice(1);
      if (target) {
        showSection(target);
        setActiveLink(target);
      }
    });
  });

  const initialTarget = window.location.hash ? window.location.hash.slice(1) : '360booth';
  showSection(initialTarget || '360booth');
  setActiveLink(initialTarget || '360booth');

  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();

});
