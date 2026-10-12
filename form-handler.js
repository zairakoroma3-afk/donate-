
document.querySelectorAll('form[data-ajax-form]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = form.querySelector('.form-submit-button');
    const status = form.querySelector('.form-status');
    const originalText = button ? button.textContent : '';

    if (button) {
      button.disabled = true;
      button.textContent = 'SENDING...';
    }
    if (status) {
      status.className = 'form-status sending';
      status.textContent = 'Sending your information...';
    }

    try {
      const ajaxUrl = form.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
      const response = await fetch(ajaxUrl, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === 'false' || data.success === false) {
        throw new Error('Form submission was not completed.');
      }

      if (status) {
        status.className = 'form-status success';
        status.textContent = 'Thank you! Your information was submitted successfully.';
      }
      form.reset();
    } catch (error) {
      if (status) {
        status.className = 'form-status error';
        status.textContent = 'We could not send the form in the background. Opening the regular secure submission now...';
      }
      setTimeout(() => {
        form.removeAttribute('data-ajax-form');
        form.submit();
      }, 800);
      return;
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
});
