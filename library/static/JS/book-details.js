// Get the current book from local storage
let book = JSON.parse(localStorage.getItem('currentBook'));

// Display book details
let bookDetails = `
    <h2>Book Details</h2>
    <img src="${book.cover}" alt="Book Cover" style="height: 150px; object-fit: cover;">
    <p>Title: ${book.title}</p>
    <p>ID: ${book.id}</p>
    <p>Author: ${book.author}</p>
    <p>Category: ${book.category}</p>
    <p>Description: ${book.description}</p>
`;

document.getElementById('book-details').innerHTML = bookDetails;

