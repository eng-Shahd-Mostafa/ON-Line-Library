document.addEventListener('DOMContentLoaded', () => {
  
  const header = document.querySelector('header');
  header.classList.add('flash');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('a');
    toggle.addEventListener('click', e => {
      e.preventDefault();
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });
  });

  document.addEventListener('click', e => {
    if (![...dropdowns].some(d => d.contains(e.target))) {
      dropdowns.forEach(d => d.classList.remove('show'));
    }
  });
})
