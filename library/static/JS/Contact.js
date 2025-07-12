
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

  const form = document.getElementById('form');
  const contactForm = document.getElementById('contact-form');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // يمنع الإرسال التقليدي للفورم

    // جمع البيانات من الحقول
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // تكوين النص للرسالة باستخدام البيانات
    const mailtoBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // فتح البريد الإلكتروني مع البيانات المدخلة
    window.location.href = `mailto:example@email.com?subject=Message from ${name}&body=${encodeURIComponent(mailtoBody)}`;

    // إخفاء الفورم وعرض رسالة التأكيد
    contactForm.classList.add('hidden');
    confirmation.classList.remove('hidden');
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

  // زر البحث ينفذ نفس عمل الضغط على Enter
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
      alert('Searching for: ' + searchInput.value.trim());
      // يمكن استبدال alert بتنفيذ فعلي للبحث
    }
  });

  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
});

// FAQ toggle
function toggleAnswer(button) {
  const item = button.parentElement;
  item.classList.toggle("open");

  document.querySelectorAll(".faq-item").forEach((el) => {
    if (el !== item) {
      el.classList.remove("open");
    }
  });
}

function filterQuestions() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-question").innerText.toLowerCase();
    if (question.includes(filter)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

// Contact form behavior
const form = document.getElementById('form');
const contactForm = document.getElementById('contact-form');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  contactForm.classList.add('hidden');
  confirmation.classList.remove('hidden');
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