function toggleBook() {
    document.getElementById("book").classList.toggle("flipped");
}

function togglePage() {
    toggleBook();
}


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

function showBooks(status) {
    const cards = document.querySelectorAll('#bookList .book-card');

    let total = cards.length;
    let borrowed = 0;
    let returned = 0;

    cards.forEach(card => {
        const cardStatus = card.dataset.status;
        if (cardStatus === 'borrowed') borrowed++;
        if (cardStatus === 'returned') returned++;

        if (status === 'all' || cardStatus === status) {
            card.style.display = 'list-item';
        } else {
            card.style.display = 'none';
        }
    });

    // Update counts
    document.getElementById('totalBorrowed').textContent = total;
    document.getElementById('currentBorrowed').textContent = borrowed;
    document.getElementById('returnedBooks').textContent = returned;
}

document.addEventListener('DOMContentLoaded', () => {
    showBooks('all');
});