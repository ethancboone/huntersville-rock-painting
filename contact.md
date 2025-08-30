---
layout: page
title: Contact
---
# Contact

<div class="row g-4">
  <div class="col-12 col-lg-7">
    <form action="https://formspree.io/f/yourFormID" method="POST" class="needs-validation" novalidate>
      <div class="mb-3">
        <label class="form-label">Your Name</label>
        <input type="text" class="form-control" name="name" required>
        <div class="invalid-feedback">Please enter your name.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" name="email" required>
        <div class="invalid-feedback">Please enter a valid email.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Location / School</label>
        <input type="text" class="form-control" name="location">
      </div>
      <div class="mb-3">
        <label class="form-label">Event Date</label>
        <input type="date" class="form-control" name="date">
      </div>
      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea class="form-control" name="message" rows="5"></textarea>
      </div>
      <input type="hidden" name="_subject" value="New Spirit Rock Inquiry" />
      <button type="submit" class="btn btn-primary"><i class="bi bi-send me-1"></i> Send</button>
    </form>
  </div>
  <div class="col-12 col-lg-5">
    <div class="p-4 bg-white rounded-3 border h-100">
      <h3 class="h5">Service Area</h3>
      <p>Huntersville, Cornelius, Davidson, North Charlotte.</p>
      <h3 class="h6">Direct Contact</h3>
      <p class="mb-0">Email: <strong>hello@yourdomain.com</strong></p>
    </div>
  </div>
</div>

<script>
  // Bootstrap client-side validation
  document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  });
</script>
