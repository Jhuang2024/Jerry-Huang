// Get the contact form
const form = document.getElementById('contact-form');

if (form) {
  const contactSection = document.getElementById('contact');

  // Create a reusable status message element
  const statusMessage = document.createElement('p');
  statusMessage.style.textAlign = 'center';
  statusMessage.style.fontWeight = 'bold';
  statusMessage.style.marginTop = '1rem';
  contactSection.appendChild(statusMessage);

  // Submit handler
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // We'll handle sending manually

    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      statusMessage.textContent = 'Please fill out all fields before submitting.';
      statusMessage.style.color = 'red';
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      statusMessage.textContent = 'Please enter a valid email address.';
      statusMessage.style.color = 'red';
      return;
    }

    if (subject.length < 3) {
      statusMessage.textContent = 'Subject must be at least 3 characters long.';
      statusMessage.style.color = 'red';
      return;
    }

    if (message.length < 10) {
      statusMessage.textContent = 'Message must be at least 10 characters long.';
      statusMessage.style.color = 'red';
      return;
    }

    // Show sending state
    statusMessage.textContent = 'Sending your message...';
    statusMessage.style.color = '#666';

    try {
      // Use FormData to send to Formspree
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        statusMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        statusMessage.style.color = 'green';
        form.reset();
      } else {
        statusMessage.textContent = 'Something went wrong. Please try again later.';
        statusMessage.style.color = 'red';
      }
    } catch (error) {
      console.error('Form submission error:', error);
      statusMessage.textContent = 'Network error. Please check your connection and try again.';
      statusMessage.style.color = 'red';
    }
  });

  // Real-time validation styles
  const fields = document.querySelectorAll('#contact-form input, #contact-form textarea');

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value.trim() === '') {
        field.style.borderColor = 'red';
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.style.borderColor = 'green';
        field.setAttribute('aria-invalid', 'false');
      }
    });

    field.addEventListener('input', () => {
      field.style.borderColor = ''; // Reset during typing
    });
  });

  // Reset handler (if you ever add a reset button)
  form.addEventListener('reset', () => {
    fields.forEach((field) => {
      field.style.borderColor = '';
      field.setAttribute('aria-invalid', 'false');
    });
    statusMessage.textContent = '';
  });
}
