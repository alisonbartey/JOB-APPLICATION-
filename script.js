// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobApplicationForm");
  const modal = document.getElementById("previewModal");
  const previewContent = document.getElementById("previewContent");
  const confirmSubmitBtn = document.getElementById("confirmSubmit");
  const cancelSubmitBtn = document.getElementById("cancelSubmit");

  let formDataToSend = null; // store data after preview

  // Intercept form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop normal submission

    // Collect form data
    formDataToSend = new FormData(form);
    let previewHtml = "<ul style='text-align:left;'>";
    formDataToSend.forEach((value, key) => {
      if (key === "resume" && value.name) {
        previewHtml += `<li><strong>${key}:</strong> ${value.name}</li>`;
      } else {
        previewHtml += `<li><strong>${key}:</strong> ${value}</li>`;
      }
    });
    previewHtml += "</ul>";

    // Show modal with collected data
    previewContent.innerHTML = previewHtml;
    modal.style.display = "flex";
  });

  // Confirm submission → send to backend
  confirmSubmitBtn.addEventListener("click", () => {
    if (!formDataToSend) return;

    fetch(form.action, {
      method: "POST",
      body: formDataToSend
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "thankyou.html"; // ✅ redirect after success
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        alert("Network error. Please try again.");
      });

    modal.style.display = "none";
  });

  // Cancel submission
  cancelSubmitBtn.addEventListener("click", () => {
    modal.style.display = "none";
    formDataToSend = null; // reset
  });

  // Close modal if user clicks outside modal-box
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      formDataToSend = null;
    }
  });
});
