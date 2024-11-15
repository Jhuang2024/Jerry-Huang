// Add event listener to the contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

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

  // Simple email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Log form data (for debugging or optional server integration)
  console.log('Contact form submitted!');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);

  // Simulate successful submission (you can replace this with actual server logic)
  alert(`Thank you, ${name}! Your message has been sent successfully.`);

  // Reset the form fields
  document.getElementById('contact-form').reset();
});
