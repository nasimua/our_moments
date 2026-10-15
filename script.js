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

  // Find the enquiry form and handle submissions only on pages that include it.
  const enquiryForm = document.querySelector('.enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', event => {
      // Keep the browser from submitting the form as a regular page request.
      event.preventDefault();
      const formData = new FormData(enquiryForm);

      // Collect every answer; use the visible option text for dropdown fields.
      const enquiryDetails = [
        ['Full Name', formData.get('name')],
        ['Email Address', formData.get('email')],
        ['Phone Number', formData.get('phone')],
        [
          'Event Type',
          enquiryForm.querySelector('#enquiry-type').selectedOptions[0].textContent.trim()
        ],
        ['Event Date', formData.get('event-date')],
        ['Event Time', formData.get('event-time')],
        ['Estimated Guest Count', formData.get('guest-count')],
        ['Venue / Location', formData.get('venue')],
        [
          'Services You’re Interested In',
          enquiryForm.querySelector('#enquiry-services').selectedOptions[0].textContent.trim()
        ],
        ['Anything Else We Should Know', formData.get('message')]
      ];

      // Personalize the email subject and format each answer on a separate line.
      const subject = `Event Enquiry: ${formData.get('name')}`;
      const body = enquiryDetails
        .map(([label, value]) => `${label}:\r\n${value || 'Not provided'}`)
        .join('\r\n\r\n');

      // Encode the email contents for a mailto link and open the visitor's email app.
      const mailto = `mailto:ourmoments.uk@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }

  const initialTarget = window.location.hash ? window.location.hash.slice(1) : '360booth';
  showSection(initialTarget || '360booth');
  setActiveLink(initialTarget || '360booth');

  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();

});
