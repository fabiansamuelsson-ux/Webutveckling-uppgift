const footerButtons = document.querySelectorAll('.footer-btn');

footerButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();

    let message = button.querySelector('.click-message');
    const text = button.dataset.message || 'text';

    if (!message) {
      message = document.createElement('span');
      message.className = 'click-message';
      button.appendChild(message);
    }

    const isVisible = button.classList.contains('show-message');
    if (isVisible) {
      button.classList.remove('show-message');
      clearTimeout(button.hideTimeout);
      return;
    }

    message.textContent = text;
    button.classList.add('show-message');

    clearTimeout(button.hideTimeout);
    button.hideTimeout = setTimeout(() => {
      button.classList.remove('show-message');
    }, 1800);
  });
});

// Contact Form Modal Functionality
const contactFormBtn = document.getElementById('contact-form-btn');
const contactModal = document.getElementById('contact-modal');
const closeBtn = document.querySelector('.close-btn');
const contactForm = document.getElementById('contact-form');

// Open modal when button is clicked
contactFormBtn.addEventListener('click', () => {
  contactModal.classList.add('show');
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
  contactModal.classList.remove('show');
});

// Close modal when clicking outside the bubble
contactModal.addEventListener('click', (event) => {
  if (event.target === contactModal) {
    contactModal.classList.remove('show');
  }
});

function isValidGmailAddress(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim().toLowerCase();
  return /^[a-z0-9._%+-]+@gmail\.com$/.test(trimmed);
}

// Handle form submission
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!isValidGmailAddress(email)) {
    alert('Please enter a valid Gmail address ending with @gmail.com.');
    return;
  }
  
  // Simple submission handling (you can add backend integration here)
  console.log('Form submitted:', { name, email, message });
  
  // Reset form
  contactForm.reset();
  
  // Close modal
  contactModal.classList.remove('show');
  
  // Optional: Show success message
  alert('Thank you for contacting us! We will get back to you soon.');
});