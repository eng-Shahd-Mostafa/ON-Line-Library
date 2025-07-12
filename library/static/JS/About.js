document.addEventListener('DOMContentLoaded', () => {

  // 1. تفعيل القوائم المنسدلة
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });
  });

  // 2. إخفاء القوائم المنسدلة عند الضغط خارجها
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('show'));
    }
  });

  // 3. إظهار العناصر عند التمرير
  const revealSections = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }// Reveal sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;

      if (top < windowHeight - 100) {
        section.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load
});

    });
  }, { threshold: 0.1 });

  revealSections.forEach(section => {
    observer.observe(section);
  });

  // 4. إضافة تأثير "flash" للـ navbar عند التمرير
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      header.classList.add('flash');
      setTimeout(() => header.classList.remove('flash'), 1500);
    }
    lastScrollY = window.scrollY;
  });
});

function handleSubmit(event) {
  event.preventDefault(); // يمنع التحميل التلقائي

  // إخفاء الفورم تدريجيًا
  const form = document.querySelector('.subscribe');
  form.style.transition = 'opacity 0.5s ease';
  form.style.opacity = '0';

  setTimeout(() => {
    form.style.display = 'none';
    
    // عرض الرسالة بتأثير
    const message = document.getElementById('message');
    message.style.display = 'block';
    
    // تشغيل الحركة بعد وقت بسيط
    setTimeout(() => {
      message.classList.add('show');
    }, 50);
  }, 500); // الانتظار لحين اختفاء الفورم
  }
