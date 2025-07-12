document.addEventListener("DOMContentLoaded", function () {

const toggle = document.querySelector(".toggle");
  const pinBox = document.getElementById("admin-pin-box");
  let isAdmin = 0;

  toggle.addEventListener("click", () => toggle.classList.toggle("active"));
  toggle.addEventListener("click", () => (isAdmin = 1 - isAdmin));
  toggle.addEventListener("click", () => (pinBox.style.display = isAdmin ? "block" : "none"));

  document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const messageBox = document.getElementById("response-message");

    if (isAdmin) {
      const pin = document.getElementById("admin-pin").value.trim();
      if (pin !== "1234") {
        messageBox.style.color = "red";
        messageBox.textContent = "Invalid Admin PIN. Access denied.";
        return; // Stop submission
      }
    }

    formData.append("is_admin", isAdmin); // Send role info

    const response = await fetch("{% url 'signup' %}", {
      method: "POST",
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
      },
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      messageBox.style.color = "green";
      messageBox.textContent = data.message;
      setTimeout(() => window.location.href = "{% url 'login' %}", 1500);
    } else {
      messageBox.style.color = "red";
      messageBox.textContent = data.message;
    }
  });


});
  