// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobApplicationForm");
  const modal = document.getElementById("previewModal");
  const previewContent = document.getElementById("previewContent");
  const confirmSubmitBtn = document.getElementById("confirmSubmit");
  const cancelSubmitBtn = document.getElementById("cancelSubmit");

  // Intercept form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop normal submission

    // Collect form data
    const formData = new FormData(form);
    let previewHtml = "<ul style='text-align:left;'>";
    formData.forEach((value, key) => {
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

  // Confirm submission
  confirmSubmitBtn.addEventListener("click", () => {
    modal.style.display = "none";
    form.submit(); // now actually submit to Formspree
  });

  // Cancel submission
  cancelSubmitBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Optional: Close modal if user clicks outside modal-box
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
