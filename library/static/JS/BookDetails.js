
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
});

document.addEventListener("DOMContentLoaded", function () {
  const bookDetailsContainer = document.getElementById("book-details");

  // استخراج العنوان من الرابط
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  // قراءة كل الكتب من localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];

  // البحث عن الكتاب حسب العنوان
  const selectedBook = books.find(book => book.title === title);

  if (selectedBook) {
    const { title, author, category, description, image } = selectedBook;

    const bookDetails = `
      <div class="book-card">
        <div class="book-cover">
          <img src="${image}" alt="${title}">
        </div>
        <div class="book-info">
          <h2 class="book-title">${title}</h2>
          <div class="book-details">
            <div class="label-col">
              <p>Author:</p>
              <p>Category:</p>
              <p>Description:</p>
            </div>
            <div class="value-col">
              <p>${author}</p>
              <p>${category}</p>
              <p>${description}</p>
            </div>
          </div>
          <div class="buttons">
            <button onclick="window.history.back()">Back</button>
            <button onclick="borrowBook()">Borrow</button>
          </div>
        </div>
      </div>
    `;

    bookDetailsContainer.innerHTML = bookDetails;
  } else {
    bookDetailsContainer.innerHTML = "<p>Book not found or title missing.</p>";
  }
});


function borrowBook() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  const books = JSON.parse(localStorage.getItem("books")) || [];

  const selectedBook = books.find(book => book.title === title);

  if (!selectedBook) {
    alert("Error: Book not found!");
    return;
  }

  let data = JSON.parse(localStorage.getItem("booksData")) || {
    borrowed: [],
    returned: [],
    current: []
  };

  data.borrowed.push({
    name: selectedBook.title,
    author: selectedBook.author,
    category: selectedBook.category
  });
  data.current.push({
    name: selectedBook.title,
    author: selectedBook.author,
    category: selectedBook.category
  });

  localStorage.setItem("booksData", JSON.stringify(data));

  alert("Book borrowed successfully!");
  window.location.href = "userProfile.html";
}




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