document.addEventListener('DOMContentLoaded', () => {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    const booksPerPage = 8;
    let currentPage = 1;
    let filteredBooks = books;
  
    function displayBooks(page) {
      const booksContainer = document.getElementById("booksContainer");
      booksContainer.innerHTML = "";
  
      const start = (page - 1) * booksPerPage;
      const end = start + booksPerPage;
      const booksToShow = filteredBooks.slice(start, end);
  
      booksToShow.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" loading="lazy">
          <h3>${book.title}</h3>
          <div class="overlay">
              <a href="Login.html?title=${encodeURIComponent(book.title)}" class="btn-overlay">Details</a>
          </div>
        `;
        booksContainer.appendChild(bookCard);
      });
  
      displayPagination();
    }
  
    function displayPagination() {
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";
      const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  
      for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.className = i === currentPage ? "active" : "";
        btn.onclick = () => {
          currentPage = i;
          displayBooks(currentPage);
        };
        pagination.appendChild(btn);
      }
    }
  
    // Initial load
    displayBooks(currentPage);
  });
  