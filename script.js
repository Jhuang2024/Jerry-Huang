// Add event listener to the contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Validate form fields
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields before submitting.');
      return;
    }
  
    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Optionally validate subject length
    if (subject.length < 3) {
      alert('Subject must be at least 3 characters long.');
      return;
    }
  
    // Optionally validate message length
    if (message.length < 10) {
      alert('Message must be at least 10 characters long.');
      return;
    }
  
    // Log form data (for debugging or optional server integration)
    console.log('Contact form submitted!');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
  
    // Create a success message element
    const successMessage = document.createElement('p');
    successMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    successMessage.style.color = 'green';
    successMessage.style.textAlign = 'center';
    successMessage.style.fontWeight = 'bold';
  
    // Append success message to the contact section
    const contactSection = document.getElementById('contact');
    contactSection.appendChild(successMessage);
  
    // Automatically remove success message after 5 seconds
    setTimeout(() => {
      contactSection.removeChild(successMessage);
    }, 5000);
  
    // Reset the form fields
    document.getElementById('contact-form').reset();
  });
  
  // Accessibility improvements: Add real-time validation feedback
  const fields = document.querySelectorAll('#contact-form input, #contact-form textarea');
  fields.forEach(field => {
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
      field.style.borderColor = ''; // Reset border color during typing
    });
  });
  
  // Add event listener to reset button (if included)
  document.getElementById('contact-form').addEventListener('reset', () => {
    fields.forEach(field => {
      field.style.borderColor = ''; // Clear validation styles
      field.setAttribute('aria-invalid', 'false');
    });
  });
  
