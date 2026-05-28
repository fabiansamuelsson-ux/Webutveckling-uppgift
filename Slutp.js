/* Skript för footer-knappar som visar informationsmeddelanden */
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

/* Funktionalitet för kontaktformulärets modal */
const contactFormBtn = document.getElementById('contact-form-btn');
const contactModal = document.getElementById('contact-modal');
const closeBtn = document.querySelector('.close-btn');
const contactForm = document.getElementById('contact-form');

// Öppna modal när knappen klickas
contactFormBtn.addEventListener('click', () => {
  contactModal.classList.add('show');
});

// Stäng modal när stängningsknappen klickas
closeBtn.addEventListener('click', () => {
  contactModal.classList.remove('show');
});

// Stäng modal när användaren klickar utanför dialogrutan
contactModal.addEventListener('click', (event) => {
  if (event.target === contactModal) {
    contactModal.classList.remove('show');
  }
});

// Validerar att e-postadressen är en Gmail-adress
function isValidGmailAddress(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim().toLowerCase();
  return /^[a-z0-9._%+-]+@gmail\.com$/.test(trimmed);
}

// Hantera kontaktformulärets inlämning
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!isValidGmailAddress(email)) {
    alert('Please enter a valid Gmail address ending with @gmail.com.');
    return;
  }
  
  // Här kan du lägga till backend-integration eller annan vidare hantering
  console.log('Form submitted:', { name, email, message });
  
  // Återställ formuläret
  contactForm.reset();
  
  // Stäng modal
  contactModal.classList.remove('show');
  
  // Valfritt: visa ett framgångsmeddelande
  alert('Thank you for contacting us! We will get back to you soon.');
});