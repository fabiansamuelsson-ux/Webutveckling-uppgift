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