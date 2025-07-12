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

  // Load current user data into form
  const currentKey = localStorage.getItem("currentUser");
  if (currentKey) {
    const userData = JSON.parse(localStorage.getItem(currentKey));
    if (userData) {
      form.firstName.value = userData.firstName || '';
      form.lastName.value = userData.lastName || '';
      form.email.value = userData.email || '';
      form.phone.value = userData.phone || '';
      form.address.value = userData.address || '';
      form.category.value = userData.category || '';
      if (userData.image) {
        profileImg.src = userData.image;
      }
      saveBtn.disabled = !validateForm();
    }
  }
});

const form = document.getElementById('edit-form');
const inputs = form.querySelectorAll('input');
const saveBtn = document.getElementById('saveBtn');
const successMsg = document.getElementById('successMsg');
const profilePictureInput = document.getElementById('profile-picture-input');
const profileImg = document.getElementById('profile-img');

// Form validation
function validateForm() {
  const first = document.getElementById('firstName').value.trim();
  const last = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const category = document.getElementById('category').value.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^[0-9]{10,15}$/.test(phone);

  return first && last && emailValid && phoneValid && address && category;
}

// Enable/disable save button based on validation
inputs.forEach(input => {
  input.addEventListener('input', () => {
    saveBtn.disabled = !validateForm();
  });
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const currentKey = localStorage.getItem("currentUser");
  if (!currentKey) return alert("No user found!");

  const existingData = JSON.parse(localStorage.getItem(currentKey)) || {};

  const updatedData = {
    ...existingData,
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    address: form.address.value.trim(),
    category: form.category.value.trim(),
    username: existingData.username // preserve username
  };

  localStorage.setItem(currentKey, JSON.stringify(updatedData));
  localStorage.setItem('profileData', JSON.stringify(updatedData)); // optional

  successMsg.style.display = 'block';
  setTimeout(() => successMsg.style.display = 'none', 3000);
});

// Handle image upload and saving
profilePictureInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageData = e.target.result;
    profileImg.src = imageData;
    localStorage.setItem('profileImage', imageData);

    const currentKey = localStorage.getItem("currentUser");
    if (currentKey) {
      const userData = JSON.parse(localStorage.getItem(currentKey)) || {};
      userData.image = imageData;
      localStorage.setItem(currentKey, JSON.stringify(userData));
    }
  };

  if (file && file.type.startsWith('image/')) {
    reader.readAsDataURL(file);
  }
});
