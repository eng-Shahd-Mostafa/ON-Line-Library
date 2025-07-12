
  function borrowBook() {
    const book = {
      id: "B001", 
      name: "Book Name",
      author: "Author Name",
      category: "Book Category"
    };

    let data = JSON.parse(localStorage.getItem("booksData")) || {
      borrowed: [],
      returned: [],
      current: []
    };

    data.borrowed.push(book);
    data.current.push(book);

    localStorage.setItem("booksData", JSON.stringify(data));
    alert("Book borrowed successfully!");
    window.location.href = "userProfile.html";
  }
