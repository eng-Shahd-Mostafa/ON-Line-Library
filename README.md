# 📚 On-Line Library

## 🧭 Overview  
*Online Library* is a full-featured web-based library management system built using the powerful *Django Framework*.  
It enables users to explore a digital book catalog, register/login, borrow books, and manage personal profiles.  
Admins can manage users, books, and borrowing records efficiently via a dedicated panel.

The platform utilizes *HTML, **CSS, **JavaScript, **AJAX, and **Python*, offering a dynamic and responsive experience.

---

## 🧰 Project Structure
```

Online_Library/
├── library/              # Django app  
│   └── templates/        # HTML views  
├── media/                # Static assets (images, PDFs)  
├── PASSWORDS.db          # SQLite DB with credentials  
├── db.sqlite3            # Main application database  
├── manage.py             # Django management  
├── *.html                # Various front-end templates  
└── README.md             # (This file)
```

---



### 🔖 Main Templates

- *User Views*:  
  index.html, login.html, Register.html, userProfile.html, book-details.html  
- *Admin Views*:  
  Admin-Main.html, Add-Books.html, Admin Users.html  
- *Utility Pages*:  
  contact.html, About Us.html, Edit.html, EditProfile.html

---

## 🌟 Features

- 👤 *User Authentication*  
  Register, login, logout, and manage profile information.

- 📚 *Book Catalog*  
  Browse and search books with full details and media content.

- 📖 *Borrowing System*  
  Users can borrow available books through a simple interface.

- 🛠 *Admin Panel*  
  Admins manage books, users, and borrowing records.

- 📄 *Static Pages*  
  “About Us” and “Contact” pages are included for user interaction.

- 📱 *Responsive Design*  
  Optimized layout for mobile, tablet, and desktop.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Python 3.8+
- pip or virtualenv
- Git (optional)

### ⚙ Installation & Run

```
# Clone the repository
git clone https://github.com/Abdelrhman-Ahmed1/Online_Library.git
cd Online_Library

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver

Access the application at http://127.0.0.1:8000/.
```
---

## 🧪 Usage

- 👥 Users:
  - Register/login → Browse books → View book details → Borrow a book

- 👑 Admins:
  - Login via /admin/ to manage users and books

- 📬 Use the About and Contact pages from the navigation bar

---


## 🧱 Database

- SQLite is used by default (db.sqlite3) for easy local development.
- PASSWORDS.db is provided for test/demo credentials.
- You can switch to PostgreSQL or MySQL for production.
- Database schema is handled via Django ORM (manage.py migrate).

---

## 🎨 Customization

- *Templates:*
  - Modify files in library/templates/ to update the UI
- *Models/Views:*
   - Extend functionality in the Django app inside library/
- *Static & Media Files:*
   - Add or update images, styles, and JS in the media/ folder
- *URL Routing:*
   - Define new routes or pages via urls.py
---


## Contact

Created by Shahd Mostafa. For questions, contact or open an issue on GitHub.
